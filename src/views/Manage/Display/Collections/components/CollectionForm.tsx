import React, { useState } from "react";
import {
  Box,
  Button,
  Chip,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  OutlinedInput,
  Typography,
} from "@mui/material";

const topicOptions: Record<string, string[]> = {
  "Theo khu vực/ văn hóa": ["Asia-inspired", "Europe", "Africa", "Latin America"],
  "Theo loại hình nghệ thuật": ["Tiffany", "Stained Glass", "Art Nouveau", "Art Deco"],
  "Theo họa tiết": ["Dragonfly", "Lotus", "Peacock", "Geometric"],
};

const CollectionForm = () => {
  const [mainTopic, setMainTopic] = useState("");
  const [subTopics, setSubTopics] = useState<string[]>([]);

  const handleMainTopicChange = (event: any) => {
    setMainTopic(event.target.value);
    setSubTopics([]); // reset khi đổi chủ đề chính
  };

  const handleSubTopicsChange = (event: any) => {
    const { value } = event.target;
    setSubTopics(typeof value === "string" ? value.split(",") : value);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h6">Thêm mới bộ sưu tập</Typography>

      {/* Select chủ đề chính */}
      <FormControl fullWidth sx={{ mt: 2 }}>
        <InputLabel>Chủ đề</InputLabel>
        <Select value={mainTopic} onChange={handleMainTopicChange} label="Chủ đề">
          {Object.keys(topicOptions).map((key) => (
            <MenuItem key={key} value={key}>
              {key}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Select giá trị chi tiết nếu đã chọn chủ đề chính */}
      {mainTopic && (
        <FormControl fullWidth sx={{ mt: 2 }}>
          <InputLabel>Chi tiết</InputLabel>
          <Select
            multiple
            value={subTopics}
            onChange={handleSubTopicsChange}
            input={<OutlinedInput label="Chi tiết" />}
          >
            {topicOptions[mainTopic].map((opt) => (
              <MenuItem key={opt} value={opt}>
                {opt}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}

      {/* Preview hiển thị Chip */}
      {subTopics.length > 0 && (
        <Box sx={{ mt: 3, display: "flex", gap: 1, flexWrap: "wrap" }}>
          {subTopics.map((topic) => (
            <Chip key={topic} label={topic} />
          ))}
        </Box>
      )}

      <Box sx={{ mt: 3 }}>
        <Button variant="contained" color="error">
          Tạo
        </Button>
      </Box>
    </Box>
  );
};

export default CollectionForm;
