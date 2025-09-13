import React, { useState } from "react";
import {
  Box,
  Button,
  Grid,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

interface ImagePreview {
  file: File;
  url: string;
}

const ImagesUpload: React.FC = () => {
  const [images, setImages] = useState<ImagePreview[]>([]);

  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    const newImages: ImagePreview[] = Array.from(files).map((file) => ({
      file,
      url: URL.createObjectURL(file),
    }));

    setImages((prev) => [...prev, ...newImages]);
    
    // reset input để có thể chọn lại cùng 1 file
    event.target.value = "";
  };

  const handleRemove = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <Box>
      <Button variant="contained" component="label">
        Chọn ảnh
        <input
          type="file"
          hidden
          multiple
          accept="image/*"
          onChange={handleUpload}
        />
      </Button>

      <Grid container spacing={2} mt={2}>
        {images.map((img, index) => (
          <Grid item xs={6} sm={4} md={3} key={index}>
            <Box
              sx={{
                position: "relative",
                overflow: "hidden",
              }}
            >
              <img
                src={img.url}
                alt={`upload-${index}`}
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

export default ImagesUpload;