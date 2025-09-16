import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Grid,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

interface VideosUploadProps{
  onFilesSelect: (files: File[]) => void;
  initialVideos?: string[]
}

const VideoUpload: React.FC<VideosUploadProps> = ({ onFilesSelect, initialVideos }) => {
  const [videos, setVideos] = useState<string[]>([]);

  useEffect(() => {
    if (initialVideos) {
      setVideos(initialVideos);
    }
  }, [initialVideos]);

  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    onFilesSelect(Array.from(files));
    const urls = Array.from(files).map((file) => URL.createObjectURL(file));

    setVideos((prev) => [...prev, ...urls]);

    // reset input để có thể chọn lại cùng 1 file
    event.target.value = "";
  };

  const handleRemove = (index: number) => {
    setVideos((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <Box>
      <Button variant="contained" component="label">
        Chọn video
        <input
          type="file"
          hidden
          multiple // nếu chỉ muốn upload 1 video thì bỏ dòng này
          accept="video/*"
          onChange={handleUpload}
        />
      </Button>

      <Grid container spacing={2} mt={2}>
        {videos.map((video, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Box
              sx={{
                position: "relative",
                borderRadius: 2,
                overflow: "hidden",
                boxShadow: 2,
              }}
            >
              <video
                src={video}
                controls
                style={{ width: "100%", height: 200, objectFit: "fill" }}
              />
              <IconButton
                onClick={() => handleRemove(index)}
                sx={{
                  position: "absolute",
                  top: 4,
                  right: 4,
                  bgcolor: "rgba(0,0,0,0.5)",
                  color: "white",
                  "&:hover": { bgcolor: "rgba(0,0,0,0.7)" },
                }}
                size="small"
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default VideoUpload;
