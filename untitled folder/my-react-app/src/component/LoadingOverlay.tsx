import React from "react";
import { Box, CircularProgress, Typography } from "@mui/material";

const LoadingOverlay: React.FC = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        p: 4,
        mb: 3,
        borderRadius: 2,
        bgcolor: "background.paper",
      }}
    >
      <CircularProgress size={40} sx={{ mb: 2 }} />
      <Typography variant="body1">Fetching Chrome UX Report data...</Typography>
    </Box>
  );
};

export default LoadingOverlay;
