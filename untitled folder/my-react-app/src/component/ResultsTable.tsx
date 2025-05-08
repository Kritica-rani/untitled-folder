import React from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Typography,
  Box,
} from "@mui/material";
import { ProcessedResult, useCrux } from "../context/CruxContext";

const ResultsTable: React.FC = () => {
  const { filteredResults } = useCrux();

  // Get color for rating
  const getRatingColor = (rating: string) => {
    switch (rating) {
      case "good":
        return { bg: "#e8f5e9", text: "#2e7d32" };
      case "needs-improvement":
        return { bg: "#fff3e0", text: "#e65100" };
      case "poor":
        return { bg: "#ffebee", text: "#c62828" };
      default:
        return { bg: "#e8f5e9", text: "#2e7d32" };
    }
  };

  // Format metric value
  const formatMetricValue = (
    metric: ProcessedResult["metrics"][keyof ProcessedResult["metrics"]]
  ) => {
    return `${metric.value}${metric.unit}`;
  };

  return (
    <>
      <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
        {filteredResults.length > 0 ? (
          <Table sx={{ minWidth: 650 }} aria-label="performance metrics table">
            <TableHead>
              <TableRow>
                <TableCell>URL</TableCell>
                <TableCell>Form Factor</TableCell>
                <TableCell>FCP</TableCell>
                <TableCell>INP</TableCell>
                <TableCell>LCP</TableCell>
                <TableCell>CLS</TableCell>
                <TableCell>TTFB</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredResults.map((result, index) => (
                <TableRow key={index} hover>
                  <TableCell
                    component="th"
                    scope="row"
                    sx={{
                      maxWidth: 200,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    <Typography variant="body2" title={result.normalizedUrl}>
                      {result.normalizedUrl}
                    </Typography>
                  </TableCell>
                  <TableCell>{result.formFactor}</TableCell>
                  {Object.keys(result.metrics).map((key) => {
                    const metricKey = key as keyof ProcessedResult["metrics"];
                    const metric = result.metrics[metricKey];
                    const { bg, text } = getRatingColor(metric.rating);

                    return (
                      <TableCell key={key}>
                        <Chip
                          label={formatMetricValue(metric)}
                          size="small"
                          sx={{
                            backgroundColor: bg,
                            color: text,
                            fontWeight: 500,
                          }}
                        />
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <Box sx={{ p: 4, textAlign: "center" }}>
            <Typography variant="body1" color="text.secondary">
              No results match your filter criteria
            </Typography>
          </Box>
        )}
      </TableContainer>
    </>
  );
};

export default ResultsTable;
