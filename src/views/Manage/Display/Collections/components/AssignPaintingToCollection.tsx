import React, { useState, useMemo } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Checkbox,
  TextField,
  Button,
  Pagination,
  Paper,
} from "@mui/material";

interface Artwork {
  id: number;
  name: string;
  author: string;
  thumbnail: string;
}

interface CollectionInfo {
  id: number;
  name: string;
  description?: string;
  currentCount?: number;
}

interface AssignArtworkToCollectionCardViewProps {
  artworks: Artwork[];
  collection: CollectionInfo;
  onAssign: (selectedIds: number[]) => void;
}

const PAGE_SIZE = 6;

const AssignArtworkToCollectionCardView: React.FC<
  AssignArtworkToCollectionCardViewProps
> = ({ artworks, collection, onAssign }) => {
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  // Bộ lọc theo tên
  const filteredArtworks = useMemo(
    () =>
      artworks.filter((a) =>
        a.name.toLowerCase().includes(search.toLowerCase())
      ),
    [artworks, search]
  );

  // Phân trang
  const totalPages = Math.ceil(filteredArtworks.length / PAGE_SIZE);
  const paginatedArtworks = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return filteredArtworks.slice(start, start + PAGE_SIZE);
  }, [filteredArtworks, page]);

  const handleSelect = (id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const handleAssign = () => {
    onAssign(selectedIds);
  };

  return (
    <Paper sx={{ p: 3 }}>
      {/* --- Thông tin bộ sưu tập --- */}
      <Box mb={3}>
        <Typography variant="h5">{collection.name}</Typography>
        {collection.description && (
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            {collection.description}
          </Typography>
        )}
        <Typography variant="body2">
          Số tác phẩm hiện tại: {collection.currentCount ?? 0}
        </Typography>
      </Box>

      {/* --- Tìm kiếm --- */}
      <TextField
        label="Tìm kiếm tác phẩm"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setPage(1);
        }}
        size="small"
        fullWidth
        sx={{ mb: 3 }}
      />

      {/* --- Lưới thẻ tác phẩm --- */}
      <Grid container spacing={2}>
        {paginatedArtworks.map((art) => (
          <Grid item xs={12} sm={6} md={4} key={art.id}>
            <Card
              sx={{
                position: "relative",
                border: selectedIds.includes(art.id)
                  ? "2px solid #1976d2"
                  : "1px solid #ddd",
                transition: "0.3s",
              }}
            >
              <Checkbox
                checked={selectedIds.includes(art.id)}
                onChange={() => handleSelect(art.id)}
                sx={{
                  position: "absolute",
                  top: 8,
                  right: 8,
                  backgroundColor: "rgba(255,255,255,0.7)",
                  borderRadius: "50%",
                }}
              />
              <CardMedia
                component="img"
                height="160"
                image={art.thumbnail}
                alt={art.name}
                sx={{ objectFit: "cover" }}
              />
              <CardContent>
                <Typography
                  variant="subtitle1"
                  fontWeight="bold"
                  sx={{ mb: 0.5 }}
                >
                  {art.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {art.author}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* --- Phân trang --- */}
      {totalPages > 1 && (
        <Box display="flex" justifyContent="center" mt={3}>
          <Pagination
            count={totalPages}
            page={page}
            onChange={(_, val) => setPage(val)}
            color="primary"
          />
        </Box>
      )}

      {/* --- Nút gán --- */}
      <Box display="flex" justifyContent="flex-end" mt={3}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleAssign}
          disabled={selectedIds.length === 0}
        >
          Gán {selectedIds.length > 0 ? `(${selectedIds.length})` : ""} vào bộ sưu tập
        </Button>
      </Box>
    </Paper>
  );
};

export default AssignArtworkToCollectionCardView;
