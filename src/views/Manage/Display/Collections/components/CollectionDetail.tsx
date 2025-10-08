import { ICollection, IPainting } from "@/types/display";
import { Avatar, Box, Button, Card, CardContent, CardMedia, Chip, Divider, Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useState } from "react";
import Grid from "@mui/material/Grid2";
import DrawerObject from "@/views/Manage/components/DrawerObject";

interface CollectionDetailProps {
    collection: ICollection;
    onBack: () => void;
    type?: string;
    children?: React.ReactNode;
}

const CollectionDetail: React.FC<CollectionDetailProps> = ({ children, collection, onBack, type }) => {
    const theme = useTheme();
    const lg = useMediaQuery(theme.breakpoints.up('lg'));
    const [selectedArt, setSelectedArt] = useState<IPainting | null>(null);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const additionalCount = Math.max(0, collection.arts.length - 10);
    const [showAll, setShowAll] = useState(false);

    const visibleArtworks = showAll ? collection.arts : collection.arts.slice(0, 10);
    
      const openArt = (a: IPainting) => {
        setSelectedArt(a);
        setDrawerOpen(true);
    };

    const closeDrawer = () => {
        setDrawerOpen(false);
        setSelectedArt(null);
    };
    return(
        <Box>
            <Grid container spacing={3} alignItems='flex-start'>
                <Grid size={{ xs: 12, md: 5 }}>
                    <Card>
                        <CardMedia
                            component='img'
                            image={collection.imageUrl}
                            alt={collection.name}
                            height={300}
                            sx={{ objectFit: 'fill'}}
                        />
                        <CardContent>
                            <Stack gap={2} direction='row' spacing={1} alignItems="center" justifyContent="space-between">
                                <Typography variant="h5">{collection.name}</Typography>
                                <Stack direction='row' spacing={1} alignItems='center'>
                                    <Avatar src={collection.curator.avatarUrl} sx={{ width: 32, height: 32 }}/>
                                    <Typography variant="body2">{collection.curator.fullName}</Typography>
                                </Stack>
                            </Stack>
                            <Stack direction='column' spacing={1} mt={2} flexWrap='wrap'>
                                {lg ? (
                                    <Stack direction='row'>
                                        {collection.tags.split(",").map((tag) => (
                                            <Chip key={tag} label={tag} size="small"/>
                                        ))}
                                    </Stack>
                                ) : (
                                    <Grid container spacing={2} sx={{ mb: 1 }}>
                                        {collection.tags.split(",").map((tag, idx) => (
                                            <Grid key={idx} size={{ xs: 6 }}>
                                                <Chip label={tag} size="small"/>
                                            </Grid>
                                        ))}
                                    </Grid>
                                )}
                                <Stack sx={{ mb: 1 }}>
                                    {collection.status && (
                                        <Chip label={collection.status.toUpperCase()} size="small" color="primary" variant="outlined"/>
                                    )}
                                </Stack>
                            </Stack>
                            <Divider sx={{ my: 2 }}/>
                            <Typography variant="body2" color="text.secondary">
                                {collection.description}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid size={{ xs: 12, md: 7 }}>
                    <Stack direction='row' justifyContent="space-between" alignItems="center" mb={1}>
                        <Typography variant="h6">Tác phẩm ({collection.arts.length})</Typography>
                        <Stack direction="row" spacing={1} alignItems="center">
                            <Typography variant="body2">
                                Hiển thị {visibleArtworks.length}/{collection.arts.length}
                            </Typography>
                            {additionalCount > 0 && (
                                <Button size="small" onClick={() => setShowAll((s) => !s)}>
                                    {showAll ? "Thu gọn" : `Xem thêm (${additionalCount})`}
                                </Button>
                            )}
                        </Stack>
                    </Stack>
                    <Grid container spacing={2}>
                        {collection.arts.length === 0 ? (
                            <Typography fontWeight={700}>Không tồn tại tác phẩm nào</Typography>
                        ) : (
                            collection.arts.map((art, index) => (
                                <Grid key={index} size={{ xs: 6, sm: 4, md: 3 }}>
                                    <Card
                                        onClick={() => openArt(art)}
                                        sx={{ cursor: 'pointer', height: '100%', display: "flex", flexDirection: "column" }}
                                    >
                                        <CardMedia component="img" image={art.imageUrl} alt={art.name} height={160} sx={{ objectFit: 'fill'}} />
                                        <CardContent sx={{ pt: 1, pb: 2, flexGrow: 1 }}>
                                            <Typography variant="subtitle2" noWrap>
                                                {art.name}
                                            </Typography>
                                            <Typography variant="caption" color="text.secondary" display="block">
                                                {`${art.author} · ${art.period}`}
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            ))
                        )}
                    </Grid>
                </Grid>
            </Grid>
            {children}
            {/* Drawer for artwork detail */}
            {selectedArt && (
                <DrawerObject
                    open={drawerOpen}
                    onClose={closeDrawer}
                    data={selectedArt}
                />
            )}
        </Box>
    )
}

export default CollectionDetail;