import React from "react";
import {
  Paper,
  Typography,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  Slider,
  Box,
} from "@mui/material";
import { ProcessedResult, useCrux } from "../context/CruxContext";

const FilterControls: React.FC = () => {
  const {
    sortField,
    setSortField,
    sortDirection,
    setSortDirection,
    thresholds,
    setThresholds,
  } = useCrux();

  const handleSortFieldChange = (event: SelectChangeEvent) => {
    setSortField(event.target.value as keyof ProcessedResult["metrics"]);
  };

  const handleSortDirectionChange = (event: SelectChangeEvent) => {
    setSortDirection(event.target.value as "asc" | "desc");
  };

  const handleThresholdChange = (
    event: Event,
    newValue: number | number[],
    activeThumb: number
  ) => {
    if (typeof newValue === "number") {
      setThresholds({
        ...thresholds,
        [sortField]: newValue,
      });
    }
  };

  // Get max values for sliders
  const getMaxValue = (field: keyof ProcessedResult["metrics"]) => {
    switch (field) {
      case "fcp":
        return 5000;
      case "inp":
        return 1000;
      case "lcp":
        return 6000;
      case "cls":
        return 1;
      case "ttfb":
        return 3000;
      default:
        return 5000;
    }
  };

  // Get step values for sliders
  const getStepValue = (field: keyof ProcessedResult["metrics"]) => {
    return field === "cls" ? 0.01 : 50;
  };

  // Format the value display
  const formatValue = (
    field: keyof ProcessedResult["metrics"],
    value: number
  ) => {
    return field === "cls" ? value.toFixed(2) : `${value}ms`;
  };

  return (
    <Paper elevation={2} sx={{ p: 3, mb: 3, borderRadius: 2 }}>
      <Typography
        variant="h2"
        component="h2"
        gutterBottom
        sx={{ marginBottom: "16px" }}
      >
        Filters and Controls
      </Typography>

      <Grid container spacing={3}>
        <Grid>
          <FormControl fullWidth size="small">
            <InputLabel id="sort-field-label">Sort by Metric</InputLabel>
            <Select
              labelId="sort-field-label"
              id="sort-field"
              value={sortField}
              label="Sort by Metric"
              onChange={handleSortFieldChange}
            >
              <MenuItem value="fcp">First Contentful Paint</MenuItem>
              <MenuItem value="inp">Interaction to Next Paint</MenuItem>
              <MenuItem value="lcp">Largest Contentful Paint</MenuItem>
              <MenuItem value="cls">Cumulative Layout Shift</MenuItem>
              <MenuItem value="ttfb">Time to First Byte</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid>
          <FormControl fullWidth size="small">
            <InputLabel id="sort-direction-label">Sort Direction</InputLabel>
            <Select
              labelId="sort-direction-label"
              id="sort-direction"
              value={sortDirection}
              label="Sort Direction"
              onChange={handleSortDirectionChange}
            >
              <MenuItem value="asc">Ascending</MenuItem>
              <MenuItem value="desc">Descending</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid>
          <Box sx={{ width: "100%" }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                mb: 1,
                mt: "-16px",
              }}
            >
              <Typography variant="body2">
                Threshold: {formatValue(sortField, thresholds[sortField])}
              </Typography>
            </Box>
            <Slider
              value={thresholds[sortField]}
              onChange={handleThresholdChange}
              min={0}
              max={getMaxValue(sortField)}
              step={getStepValue(sortField)}
              aria-labelledby="threshold-slider"
            />
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default FilterControls;
