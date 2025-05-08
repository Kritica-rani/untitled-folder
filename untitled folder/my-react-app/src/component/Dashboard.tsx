import React from "react";
import { Container, Typography, Box } from "@mui/material";
import { useCrux } from "../context/CruxContext";
import UrlInputSection from "./UrlInputSection";
import ErrorAlert from "./ErrorAlert";
import LoadingOverlay from "./LoadingOverlay";
import FilterControls from "./FilterControls";
import SummaryStats from "./SummaryStats";
import TabPanel from "./TabPanel";
import ResultsTable from "./ResultsTable";

const Dashboard: React.FC = () => {
  const { results, loading, error } = useCrux();

  return (
    <Container
      maxWidth="lg"
      sx={{
        py: 4,
        width: "100%",
      }}
    >
      <Typography variant="h1" component="h1" align="center" gutterBottom>
        Chrome UX Report Dashboard
      </Typography>

      <UrlInputSection />

      {error && <ErrorAlert message={error} />}

      {loading && <LoadingOverlay />}

      {results.length > 0 && (
        <>
          <FilterControls />
          <SummaryStats />
          <ResultsTable />
        </>
      )}
    </Container>
  );
};

export default Dashboard;
