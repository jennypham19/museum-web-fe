import React, { useState } from "react";
import {
  Box,
  TextField,
  InputAdornment,
} from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import LanguageIcon from "@mui/icons-material/Language";
import Grid from "@mui/material/Grid2";
import { SourceLinks } from "@/types/post";
import InputText from "@/components/InputText";

interface SourceLinksFormProps{
  onSourceLinks: (data: SourceLinks) => void;
}

const SourceLinksForm: React.FC<SourceLinksFormProps> = ({ onSourceLinks }) => {
  const [links, setLinks] = useState<SourceLinks>({
    link_facebook: "",
    link_instagram: "",
    link_youtube: "",
    link_web: "",
  });

  const handleChange = (name: string, value: any) => {
    setLinks((prev) => ({ ...prev, [name]: value }));
    onSourceLinks(links)
  };

  return (
    <Box mt={2}>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 6}}>
          <InputText
            label="Facebook"
            name="link_facebook"
            type="text"
            value={links.link_facebook}
            onChange={handleChange}
            startAdornment={(
              <InputAdornment position="start">
                <FacebookIcon color="primary"/>
              </InputAdornment>
            )}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6}}>
          <InputText
            label="Instagram"
            name="link_instagram"
            type="text"
            value={links.link_instagram}
            onChange={handleChange}
            startAdornment={(
              <InputAdornment position="start">
                <InstagramIcon sx={{ color: '#E1306C'}}/>
              </InputAdornment>
            )}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6}}>
          <InputText
            label="YouTube"
            name="link_youtube"
            type="text"
            value={links.link_youtube}
            onChange={handleChange}
            startAdornment={(
              <InputAdornment position="start">
                <YouTubeIcon sx={{ color: '#E1306C'}}/>
              </InputAdornment>
            )}
          />
        </Grid>

        <Grid size={{ xs: 6}}>
          <InputText
            label="Website khác"
            name="link_web"
            type="text"
            value={links.link_web}
            onChange={handleChange}
            startAdornment={(
              <InputAdornment position="start">
                <LanguageIcon color="action"/>
              </InputAdornment>
            )}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default SourceLinksForm;
