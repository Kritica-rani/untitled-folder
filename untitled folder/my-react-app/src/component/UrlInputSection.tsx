import React, { useState } from "react";
import {
  Paper,
  Typography,
  Box,
  TextField,
  Button,
  IconButton,
  Stack,
  FormHelperText,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";
import { useCrux } from "../context/CruxContext";

const UrlInputSection: React.FC = () => {
  const { urls, setUrls, fetchData, loading } = useCrux();
  const [urlErrors, setUrlErrors] = useState<string[]>([]);

  const isValidUrl = (url: string) => {
    const urlPattern = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
    return urlPattern.test(url);
  };

  const handleUrlChange = (index: number, value: string) => {
    const trimmedValue = value.trim();
    const newUrls = [...urls];
    newUrls[index] = trimmedValue;
    setUrls(newUrls);

    // Validate URL and update errors state
    const newErrors = [...urlErrors];

    if (trimmedValue === "") {
      newErrors[index] = "URL cannot be empty";
    } else if (!isValidUrl(trimmedValue)) {
      newErrors[index] = "Invalid URL format";
    } else if (
      newUrls.filter((url, i) => url === trimmedValue && i !== index).length > 0
    ) {
      newErrors[index] = "URL must be unique";
    } else {
      newErrors[index] = "";
    }

    setUrlErrors(newErrors);
  };

  const addUrlField = () => {
    setUrls([...urls, ""]);
    setUrlErrors([...urlErrors, ""]);
  };

  const removeUrlField = (index: number) => {
    if (urls.length > 1) {
      const newUrls = [...urls];
      newUrls.splice(index, 1);
      setUrls(newUrls);

      const newErrors = [...urlErrors];
      newErrors.splice(index, 1);
      setUrlErrors(newErrors);
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
            <Box
              key={index}
              sx={{ display: "flex", gap: 1, alignItems: "center" }}
            >
              <TextField
                fullWidth
                label={`URL ${index + 1}`}
                variant="outlined"
                value={url}
                onChange={(e) => handleUrlChange(index, e.target.value)}
                placeholder="https://example.com"
                size="small"
                required
                error={!!urlErrors[index]}
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

          {/* Show error message below the input */}
          {urls.map(
            (url, index) =>
              urlErrors[index] && (
                <FormHelperText key={index} error>
                  {urlErrors[index]}
                </FormHelperText>
              )
          )}

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
              disabled={
                loading ||
                urls.every((url) => url.trim() === "") ||
                urlErrors.some((error) => error !== "")
              }
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
