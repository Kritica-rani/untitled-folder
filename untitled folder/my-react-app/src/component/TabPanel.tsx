import React from "react";
import { Box, Tabs, Tab } from "@mui/material";

interface TabPanelProps {
  children: React.ReactNode;
  activeTab: string;
  setActiveTab: (value: any) => void;
  tabs: Array<{
    value: string;
    label: string;
  }>;
}

const TabPanel: React.FC<TabPanelProps> = ({
  children,
  activeTab,
  setActiveTab,
  tabs,
}) => {
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setActiveTab(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 2 }}>
        <Tabs
          value={activeTab}
          onChange={handleChange}
          aria-label="results tabs"
        >
          {tabs.map((tab) => (
            <Tab
              key={tab.value}
              label={tab.label}
              value={tab.value}
              id={`tab-${tab.value}`}
              aria-controls={`tabpanel-${tab.value}`}
            />
          ))}
        </Tabs>
      </Box>
      <Box
        role="tabpanel"
        id={`tabpanel-${activeTab}`}
        aria-labelledby={`tab-${activeTab}`}
      >
        {children}
      </Box>
    </Box>
  );
};

export default TabPanel;
