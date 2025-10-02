import React, { useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Chip,
  Stack,
  Button,
  Divider,
  Drawer,
  IconButton,
  Avatar,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

// Types
export type Artwork = {
  id: number;
  title: string;
  artist?: string;
  year?: string; // chỉnh thành string để đồng bộ
  thumbnailUrl: string;
  description?: string;
};

export type Collection = {
  id: number;
  title: string;
  shortDescription?: string;
  description?: string;
  coverImage?: string;
  tags?: string[];
  curator?: { id: number; name: string; avatarUrl?: string } | null;
  status?: string;
  startDate?: string | null;
  endDate?: string | null;
  artworks: Artwork[];
};

interface CollectionDetailProps {
  collection: Collection;
}

// Component
const CollectionDetail: React.FC<CollectionDetailProps> = ({ collection }) => {
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const additionalCount = Math.max(0, collection.artworks.length - 10);
  const [showAll, setShowAll] = useState(false);

  const visibleArtworks = showAll ? collection.artworks : collection.artworks.slice(0, 10);

  const openArtwork = (a: Artwork) => {
    setSelectedArtwork(a);
    setDrawerOpen(true);
  };

  const closeDrawer = () => {
    setDrawerOpen(false);
    setSelectedArtwork(null);
  };

  return (
    <Box>
      {/* Header */}
      <Grid container spacing={3} alignItems="flex-start">
        <Grid item xs={12} md={5}>
          <Card elevation={2}>
            <CardMedia
              component="img"
              src={collection.coverImage || "https://picsum.photos/800/600?blur=2"}
              alt={collection.title}
              height={360}
            />
            <CardContent>
              <Stack direction="row" spacing={1} alignItems="center" justifyContent="space-between">
                <Box>
                  <Typography variant="h5">{collection.title}</Typography>
                  {collection.shortDescription && (
                    <Typography variant="body2" color="text.secondary" mt={0.5}>
                      {collection.shortDescription}
                    </Typography>
                  )}
                </Box>
                <Stack direction="row" spacing={1} alignItems="center">
                  {collection.curator && (
                    <Stack direction="row" spacing={1} alignItems="center">
                      <Avatar src={collection.curator.avatarUrl} sx={{ width: 32, height: 32 }} />
                      <Typography variant="body2">{collection.curator.name}</Typography>
                    </Stack>
                  )}
                </Stack>
              </Stack>

              <Stack direction="row" spacing={1} mt={2} flexWrap="wrap">
                {(collection.tags || []).map((t) => (
                  <Chip key={t} label={t} size="small" sx={{ mr: 1, mb: 1 }} />
                ))}
                {collection.status && (
                  <Chip label={collection.status} size="small" color="primary" variant="outlined" sx={{ mb: 1 }} />
                )}
              </Stack>

              <Divider sx={{ my: 2 }} />

              <Stack spacing={1}>
                <Typography variant="body2" color="text.secondary">
                  {collection.description || "Không có mô tả chi tiết."}
                </Typography>

                <Stack direction="row" spacing={1} mt={1}>
                  {collection.startDate && <Typography variant="caption">Bắt đầu: {collection.startDate}</Typography>}
                  {collection.endDate && <Typography variant="caption">Kết thúc: {collection.endDate}</Typography>}
                </Stack>

                <Box mt={2}>
                  <Button variant="contained">Ghé thăm bộ sưu tập</Button>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        {/* Artworks grid */}
        <Grid item xs={12} md={7}>
          <Stack direction="row" justifyContent="space-between" alignItems="center" mb={1}>
            <Typography variant="h6">Tác phẩm ({collection.artworks.length})</Typography>
            <Stack direction="row" spacing={1} alignItems="center">
              <Typography variant="body2" color="text.secondary">
                Hiển thị {visibleArtworks.length}/{collection.artworks.length}
              </Typography>
              {additionalCount > 0 && (
                <Button size="small" onClick={() => setShowAll((s) => !s)}>
                  {showAll ? "Thu gọn" : `Xem thêm (${additionalCount})`}
                </Button>
              )}
            </Stack>
          </Stack>

          <Grid container spacing={2}>
            {visibleArtworks.map((art) => (
              <Grid item xs={6} sm={4} md={3} key={art.id}>
                <Card
                  onClick={() => openArtwork(art)}
                  sx={{ cursor: "pointer", height: "100%", display: "flex", flexDirection: "column" }}
                >
                  <CardMedia component="img" image={art.thumbnailUrl} alt={art.title} height={160} />
                  <CardContent sx={{ pt: 1, pb: 2, flexGrow: 1 }}>
                    <Typography variant="subtitle2" noWrap>
                      {art.title}
                    </Typography>
                    {art.artist && (
                      <Typography variant="caption" color="text.secondary" display="block">
                        {art.artist} {art.year ? `· ${art.year}` : ""}
                      </Typography>
                    )}
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>

      {/* Drawer for artwork detail */}
      <Drawer anchor="right" open={drawerOpen} onClose={closeDrawer} PaperProps={{ sx: { width: { xs: "100%", sm: 520 } } }}>
        <Box sx={{ position: "relative", height: "100%" }}>
          <Box sx={{ p: 1, display: "flex", justifyContent: "flex-end" }}>
            <IconButton onClick={closeDrawer} aria-label="close">
              <CloseIcon />
            </IconButton>
          </Box>
          {selectedArtwork ? (
            <Box sx={{ p: 2 }}>
              <Card>
                <CardMedia component="img" image={selectedArtwork.thumbnailUrl} alt={selectedArtwork.title} height={300} />
                <CardContent>
                  <Typography variant="h6">{selectedArtwork.title}</Typography>
                  {selectedArtwork.artist && (
                    <Typography variant="body2" color="text.secondary">
                      {selectedArtwork.artist} {selectedArtwork.year ? `· ${selectedArtwork.year}` : ""}
                    </Typography>
                  )}

                  <Divider sx={{ my: 1 }} />

                  <Typography variant="body2">{selectedArtwork.description || "Không có mô tả."}</Typography>

                  <Box mt={2}>
                    <Button variant="outlined">Xem chi tiết</Button>
                  </Box>
                </CardContent>
              </Card>
            </Box>
          ) : null}
        </Box>
      </Drawer>
    </Box>
  );
};

export default CollectionDetail;

// ------------------------------
// Demo usage with mock data (you can remove in production)
// ------------------------------

export const DemoCollectionPage = () => {
  const mock: Collection = {
    id: 1,
    title: "Nghệ thuật từ Châu Á – Đèn Tiffany và Tranh Kính",
    shortDescription: "Sự giao thoa giữa kính màu Tiffany và họa tiết Á Đông.",
    description:
      "Bộ sưu tập giới thiệu các đèn Tiffany và tranh kính chịu ảnh hưởng mỹ thuật châu Á: hoa sen, chim hạc, họa tiết thiên nhiên và hình học.",
    coverImage: "https://picsum.photos/1200/800?image=1067",
    tags: ["Tiffany", "Stained Glass", "Art Nouveau", "Asia-inspired"],
    curator: { id: 1, name: "Nguyễn Curator", avatarUrl: "https://i.pravatar.cc/150?img=12" },
    status: "Published",
    startDate: "1898",
    endDate: null,
    artworks: Array.from({ length: 18 }).map((_, i) => ({
      id: i + 1,
      title: `Tác phẩm ${i + 1}`,
      artist: i % 2 === 0 ? "Tiffany Studios" : "Unknown",
      year: (1900 + (i % 20)).toString(), // đổi sang string
      thumbnailUrl: `https://picsum.photos/seed/tiffany-${i}/600/400`,
      description: "Mô tả ngắn về tác phẩm, chất liệu và họa tiết.",
    })),
  };

  return (
    <Box p={3}>
      <CollectionDetail collection={mock} />
    </Box>
  );
};