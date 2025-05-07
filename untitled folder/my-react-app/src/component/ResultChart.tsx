import React from "react";
import { Paper, Typography, Box } from "@mui/material";
import { useCrux } from "../context/CruxContext";

const ResultsChart: React.FC = () => {
  const { filteredResults, sortField } = useCrux();

  return (
    <Paper
      elevation={2}
      sx={{
        p: 3,
        borderRadius: 2,
        height: 400,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box sx={{ textAlign: "center" }}>
        <Typography variant="body1" color="text.secondary">
          Chart visualization would be implemented here with a library like
          Chart.js or Recharts
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          {filteredResults.length} results would be displayed in a bar chart
          comparing {sortField} values
        </Typography>
      </Box>
    </Paper>
  );
};

export default ResultsChart;
