import React, { useState } from "react";
import {
  Box,
  TextField,
  Typography,
  Grid,
  InputAdornment,
  Button,
} from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import LanguageIcon from "@mui/icons-material/Language";

interface SourceLinks {
  facebook: string;
  instagram: string;
  youtube: string;
  website: string;
}

const SourceLinksForm: React.FC = () => {
  const [links, setLinks] = useState<SourceLinks>({
    facebook: "",
    instagram: "",
    youtube: "",
    website: "",
  });

  const handleChange = (field: keyof SourceLinks, value: string) => {
    setLinks((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <Box mt={2}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Facebook"
            fullWidth
            value={links.facebook}
            onChange={(e) => handleChange("facebook", e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <FacebookIcon color="primary" />
                </InputAdornment>
              ),
            }}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            label="Instagram"
            fullWidth
            value={links.instagram}
            onChange={(e) => handleChange("instagram", e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <InstagramIcon sx={{ color: "#E1306C" }} />
                </InputAdornment>
              ),
            }}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            label="YouTube"
            fullWidth
            value={links.youtube}
            onChange={(e) => handleChange("youtube", e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <YouTubeIcon sx={{ color: "red" }} />
                </InputAdornment>
              ),
            }}
          />
        </Grid>

        <Grid item xs={6}>
          <TextField
            label="Website khác"
            fullWidth
            value={links.website}
            onChange={(e) => handleChange("website", e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LanguageIcon color="action" />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default SourceLinksForm;
