import React from "react";
import Grid from "@mui/material/Grid";
import { Paper, Typography, Box } from "@mui/material";
import { ProcessedResult, useCrux } from "../context/CruxContext";

const SummaryStats: React.FC = () => {
  const { results } = useCrux();

  // Calculate average for a metric
  const calculateAverage = (metric: keyof ProcessedResult["metrics"]) => {
    if (results.length === 0) return 0;

    const sum = results.reduce((acc, result) => {
      const value = result.metrics[metric].value;
      const numValue =
        typeof value === "string" ? Number.parseFloat(value) : value;
      return acc + numValue;
    }, 0);

    const avg = sum / results.length;
    return metric === "cls" ? avg.toFixed(2) : Math.round(avg);
  };

  // Get color based on rating
  const getColorForRating = (
    metric: keyof ProcessedResult["metrics"],
    value: number | string
  ) => {
    const numValue =
      typeof value === "string" ? Number.parseFloat(value) : value;

    switch (metric) {
      case "fcp":
        return numValue < 1800
          ? "#4caf50"
          : numValue < 3000
          ? "#ff9800"
          : "#f44336";
      case "inp":
        return numValue < 200
          ? "#4caf50"
          : numValue < 500
          ? "#ff9800"
          : "#f44336";
      case "lcp":
        return numValue < 2500
          ? "#4caf50"
          : numValue < 4000
          ? "#ff9800"
          : "#f44336";
      case "cls":
        return numValue < 0.1
          ? "#4caf50"
          : numValue < 0.25
          ? "#ff9800"
          : "#f44336";
      case "ttfb":
        return numValue < 800
          ? "#4caf50"
          : numValue < 1800
          ? "#ff9800"
          : "#f44336";
      default:
        return "#4caf50";
    }
  };

  const metrics: Array<{
    key: keyof ProcessedResult["metrics"];
    label: string;
    unit: string;
  }> = [
    { key: "fcp", label: "First Contentful Paint", unit: "ms" },
    { key: "inp", label: "Interaction to Next Paint", unit: "ms" },
    { key: "lcp", label: "Largest Contentful Paint", unit: "ms" },
    { key: "cls", label: "Cumulative Layout Shift", unit: "" },
    { key: "ttfb", label: "Time to First Byte", unit: "ms" },
  ];

  return (
    <Paper elevation={2} sx={{ p: 3, mb: 3, borderRadius: 2 }}>
      <Typography variant="h2" component="h2" gutterBottom>
        Summary Statistics
      </Typography>

      <Grid container spacing={2}>
        {metrics.map((metric) => {
          const avgValue = calculateAverage(metric.key);
          const color = getColorForRating(metric.key, avgValue);

          return (
            <Grid key={metric.key}>
              <Box
                sx={{
                  bgcolor: "background.default",
                  p: 2,
                  borderRadius: 2,
                  textAlign: "center",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Avg. {metric.label}
                </Typography>
                <Typography
                  variant="h5"
                  component="div"
                  sx={{
                    fontWeight: "bold",
                    color: color,
                  }}
                >
                  {avgValue}
                  {metric.unit}
                </Typography>
              </Box>
            </Grid>
          );
        })}
      </Grid>
    </Paper>
  );
};

export default SummaryStats;
