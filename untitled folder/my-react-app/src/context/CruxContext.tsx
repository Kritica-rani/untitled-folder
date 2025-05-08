import { toast } from "react-toastify";
import React, {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";

// Define types for the API response
export interface CruxHistogramBin {
  start: number | string;
  end?: number | string;
  density: number;
}

export interface CruxMetricPercentiles {
  p75: number | string;
}

export interface CruxMetric {
  histogram: CruxHistogramBin[];
  percentiles: CruxMetricPercentiles;
}

export interface CruxMetrics {
  first_contentful_paint: CruxMetric;
  interaction_to_next_paint: CruxMetric;
  largest_contentful_paint: CruxMetric;
  cumulative_layout_shift: CruxMetric;
  experimental_time_to_first_byte: CruxMetric;
}

export interface CruxDate {
  year: number;
  month: number;
  day: number;
}

export interface CruxCollectionPeriod {
  firstDate: CruxDate;
  lastDate: CruxDate;
}

export interface CruxRecord {
  key: {
    formFactor: string;
    url: string;
  };
  metrics: CruxMetrics;
  collectionPeriod: CruxCollectionPeriod;
}

export interface CruxUrlNormalization {
  originalUrl: string;
  normalizedUrl: string;
}

export interface CruxData {
  record: CruxRecord;
  urlNormalizationDetails: CruxUrlNormalization;
}

export interface CruxResult {
  url?: string;
  data?: CruxData;
  status?: "success" | "error";
  error?: string;
  code?: number;
}

export interface CruxApiResponse {
  results: CruxResult[];
}

export interface ProcessedMetric {
  name: string;
  value: number | string;
  rating: "good" | "needs-improvement" | "poor";
  unit: string;
}

export interface ProcessedResult {
  url: string;
  normalizedUrl: string;
  formFactor: string;
  collectionPeriod: string;
  metrics: {
    fcp: ProcessedMetric;
    inp: ProcessedMetric;
    lcp: ProcessedMetric;
    cls: ProcessedMetric;
    ttfb: ProcessedMetric;
  };
}

// Define the context type
interface CruxContextType {
  urls: string[];
  setUrls: React.Dispatch<React.SetStateAction<string[]>>;
  results: ProcessedResult[];
  loading: boolean;
  error: string | null;
  fetchData: () => Promise<void>;
  sortField: keyof ProcessedResult["metrics"];
  setSortField: React.Dispatch<
    React.SetStateAction<keyof ProcessedResult["metrics"]>
  >;
  sortDirection: "asc" | "desc";
  setSortDirection: React.Dispatch<React.SetStateAction<"asc" | "desc">>;
  thresholds: Record<keyof ProcessedResult["metrics"], number>;
  setThresholds: React.Dispatch<
    React.SetStateAction<Record<keyof ProcessedResult["metrics"], number>>
  >;
  filteredResults: ProcessedResult[];
}

// Create the context
const CruxContext = createContext<CruxContextType | undefined>(undefined);

// Create a provider component
export const CruxProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [urls, setUrls] = useState<string[]>([""]);
  const [results, setResults] = useState<ProcessedResult[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [sortField, setSortField] =
    useState<keyof ProcessedResult["metrics"]>("lcp");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [thresholds, setThresholds] = useState<
    Record<keyof ProcessedResult["metrics"], number>
  >({
    fcp: 0,
    inp: 0,
    lcp: 0,
    cls: 0,
    ttfb: 0,
  });

  // Process the raw API data into a more usable format
  const processApiResponse = (result: CruxResult): ProcessedResult | null => {
    if (result.status === "error" || !result.data) {
      return null;
    }

    const { data, url } = result;
    const { record, urlNormalizationDetails } = data;
    const { metrics, key, collectionPeriod } = record;

    // Format collection period
    const startDate = new Date(
      collectionPeriod.firstDate.year,
      collectionPeriod.firstDate.month - 1,
      collectionPeriod.firstDate.day
    ).toLocaleDateString();
    const endDate = new Date(
      collectionPeriod.lastDate.year,
      collectionPeriod.lastDate.month - 1,
      collectionPeriod.lastDate.day
    ).toLocaleDateString();
    const periodString = `${startDate} - ${endDate}`;

    // Helper function to determine rating
    const getRating = (
      metric: string,
      value: number | string
    ): "good" | "needs-improvement" | "poor" => {
      const numValue =
        typeof value === "string" ? Number.parseFloat(value) : value;

      switch (metric) {
        case "fcp":
          return numValue < 1800
            ? "good"
            : numValue < 3000
            ? "needs-improvement"
            : "poor";
        case "inp":
          return numValue < 200
            ? "good"
            : numValue < 500
            ? "needs-improvement"
            : "poor";
        case "lcp":
          return numValue < 2500
            ? "good"
            : numValue < 4000
            ? "needs-improvement"
            : "poor";
        case "cls":
          return numValue < 0.1
            ? "good"
            : numValue < 0.25
            ? "needs-improvement"
            : "poor";
        case "ttfb":
          return numValue < 800
            ? "good"
            : numValue < 1800
            ? "needs-improvement"
            : "poor";
        default:
          return "good";
      }
    };

    // Extract and process metrics
    const fcpValue = metrics.first_contentful_paint.percentiles.p75;
    const inpValue = metrics.interaction_to_next_paint.percentiles.p75;
    const lcpValue = metrics.largest_contentful_paint.percentiles.p75;
    const clsValue = metrics.cumulative_layout_shift.percentiles.p75;
    const ttfbValue = metrics.experimental_time_to_first_byte.percentiles.p75;

    return {
      url: url || "",
      normalizedUrl: urlNormalizationDetails?.normalizedUrl || key.url,
      formFactor: key.formFactor,
      collectionPeriod: periodString,
      metrics: {
        fcp: {
          name: "First Contentful Paint",
          value: fcpValue,
          rating: getRating("fcp", fcpValue),
          unit: "ms",
        },
        inp: {
          name: "Interaction to Next Paint",
          value: inpValue,
          rating: getRating("inp", inpValue),
          unit: "ms",
        },
        lcp: {
          name: "Largest Contentful Paint",
          value: lcpValue,
          rating: getRating("lcp", lcpValue),
          unit: "ms",
        },
        cls: {
          name: "Cumulative Layout Shift",
          value: clsValue,
          rating: getRating("cls", clsValue),
          unit: "",
        },
        ttfb: {
          name: "Time to First Byte",
          value: ttfbValue,
          rating: getRating("ttfb", ttfbValue),
          unit: "ms",
        },
      },
    };
  };

  // Fetch data from the API
  const fetchData = async () => {
    setLoading(true);
    setError(null);

    try {
      const validUrls = urls.filter((url) => url.trim() !== "");

      if (validUrls.length === 0) {
        setError("Please enter at least one valid URL");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch("http://localhost:3000/api/crux", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ urls: validUrls }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Failed to fetch data");
        }

        const data: CruxApiResponse = await response.json();

        // Handle errors and successes
        let hasSuccessfulResults = false;
        const processedResults: ProcessedResult[] = [];

        data.results.forEach((result) => {
          if (result.status === "error") {
            // Display error toast for this URL
            toast.error(`Error for ${result.url}: ${result.error}`);
          } else {
            // Process successful result
            const processed = processApiResponse(result);
            if (processed) {
              processedResults.push(processed);
              hasSuccessfulResults = true;
            }
          }
        });
        if (hasSuccessfulResults) {
          setResults(processedResults);
        } else {
          setError("No data could be retrieved for any of the provided URLs");
        }
      } catch (err) {
        setError(
          typeof err === "string"
            ? err
            : (err as Error).message ||
                "Failed to fetch data. Please try again."
        );
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    } catch (err) {
      setError("Failed to fetch data. Please try again.");
      console.error("Error fetching data:", err);
    } finally {
      setLoading(false);
    }
  };

  // Apply filters and sorting to get filtered results
  const filteredResults = React.useMemo(() => {
    // Apply thresholds
    const filtered = results.filter((result) => {
      const metricValue = result.metrics[sortField].value;
      const numericValue =
        typeof metricValue === "string"
          ? Number.parseFloat(metricValue as string)
          : (metricValue as number);
      return numericValue >= thresholds[sortField];
    });

    // Apply sorting
    return [...filtered].sort((a, b) => {
      const aValue = a.metrics[sortField].value;
      const bValue = b.metrics[sortField].value;

      const aNumeric =
        typeof aValue === "string" ? Number.parseFloat(aValue) : aValue;
      const bNumeric =
        typeof bValue === "string" ? Number.parseFloat(bValue) : bValue;

      return sortDirection === "asc"
        ? (aNumeric as number) - (bNumeric as number)
        : (bNumeric as number) - (aNumeric as number);
    });
  }, [results, sortField, sortDirection, thresholds]);

  const contextValue: CruxContextType = {
    urls,
    setUrls,
    results,
    loading,
    error,
    fetchData,
    sortField,
    setSortField,
    sortDirection,
    setSortDirection,
    thresholds,
    setThresholds,
    filteredResults,
  };

  return (
    <CruxContext.Provider value={contextValue}>{children}</CruxContext.Provider>
  );
};

export const useCrux = () => {
  const context = useContext(CruxContext);
  if (context === undefined) {
    throw new Error("useCrux must be used within a CruxProvider");
  }
  return context;
};
