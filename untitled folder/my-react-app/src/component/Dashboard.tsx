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
import ResultsChart from "./ResultChart";

const Dashboard: React.FC = () => {
  const { results, loading, error } = useCrux();
  const [activeTab, setActiveTab] = React.useState<"table" | "chart">("table");

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
          <TabPanel
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            tabs={[
              { value: "table", label: "Table View" },
              { value: "chart", label: "Chart View" },
            ]}
          >
            {activeTab === "table" ? <ResultsTable /> : <ResultsChart />}
          </TabPanel>
        </>
      )}
    </Container>
  );
};

export default Dashboard;
