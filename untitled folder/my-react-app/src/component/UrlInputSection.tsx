import React from "react";
import {
  Paper,
  Typography,
  Box,
  TextField,
  Button,
  IconButton,
  Stack,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";
import { useCrux } from "../context/CruxContext";
const UrlInputSection: React.FC = () => {
  const { urls, setUrls, fetchData, loading } = useCrux();

  const handleUrlChange = (index: number, value: string) => {
    const newUrls = [...urls];
    newUrls[index] = value;
    setUrls(newUrls);
  };

  const addUrlField = () => {
    setUrls([...urls, ""]);
  };

  const removeUrlField = (index: number) => {
    if (urls.length > 1) {
      const newUrls = [...urls];
      newUrls.splice(index, 1);
      setUrls(newUrls);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchData();
  };

  return (
    <Paper
      elevation={2}
      sx={{
        p: 3,
        mb: 3,
        borderRadius: 2,
      }}
    >
      <Typography variant="h2" component="h2" gutterBottom>
        Enter URLs to Analyze
      </Typography>

      <form onSubmit={handleSubmit}>
        <Stack spacing={2}>
          {urls.map((url, index) => (
            <Box key={index} sx={{ display: "flex", gap: 1 }}>
              <TextField
                fullWidth
                label={`URL ${index + 1}`}
                variant="outlined"
                value={url}
                onChange={(e) => handleUrlChange(index, e.target.value)}
                placeholder="https://example.com"
                size="small"
                required
              />
              {urls.length > 1 && (
                <IconButton
                  color="error"
                  onClick={() => removeUrlField(index)}
                  disabled={loading}
                  aria-label="Remove URL"
                >
                  <DeleteIcon />
                </IconButton>
              )}
            </Box>
          ))}

          <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
            <Button
              variant="outlined"
              startIcon={<AddIcon />}
              onClick={addUrlField}
              disabled={loading}
            >
              Add URL
            </Button>

            <Button
              variant="contained"
              startIcon={<SearchIcon />}
              type="submit"
              disabled={loading || urls.every((url) => url.trim() === "")}
            >
              {loading ? "Loading..." : "Analyze"}
            </Button>
          </Box>
        </Stack>
      </form>
    </Paper>
  );
};

export default UrlInputSection;
