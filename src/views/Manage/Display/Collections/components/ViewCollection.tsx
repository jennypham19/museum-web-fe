import IconButton from "@/components/IconButton/IconButton";
import { COLORS } from "@/constants/colors";
import { ICollection, IPainting } from "@/types/display";
import NavigateBack from "@/views/Manage/components/NavigateBack";
import { Close } from "@mui/icons-material";
import { Avatar, Box, Button, Card, CardContent, CardMedia, Chip, Divider, Drawer, Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import Grid from "@mui/material/Grid2";
import React, { useState } from "react";

interface ViewCollectionProps{
    data: ICollection;
    onBack: () => void;
}

interface CollectionDetailProps{
    collection: ICollection
}

const CollectionDetail: React.FC<CollectionDetailProps> = ({ collection }) => {
    const theme = useTheme();
    const lg = useMediaQuery(theme.breakpoints.up('lg'));
    const [selectedArt, setSelectedArt] = useState<IPainting | null>(null);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const additionalCount = Math.max(0, collection.arts.length - 10);
    const [showAll, setShowAll] = useState(false);
    const [showAllImage, setShowAllImage] = useState(false);
    const [openViewImage, setOpenViewImage] = useState(false)

    const visibleArtworks = showAll ? collection.arts : collection.arts.slice(0, 10);
    const visibleImages = showAllImage ? selectedArt?.images : selectedArt?.images.slice(0, 4);
    
      const openArt = (a: IPainting) => {
        setSelectedArt(a);
        setDrawerOpen(true);
    };

    const closeDrawer = () => {
        setDrawerOpen(false);
        setSelectedArt(null);
        setOpenViewImage(false)
    };

    const handleOpenViewImage = () => {
        setOpenViewImage(true)
    }
    
    return(
        <Box>
            <Grid container spacing={3} alignItems='flex-start'>
                <Grid size={{ xs: 12, md: 5 }}>
                    <Card elevation={2}>
                        <CardMedia
                            component='img'
                            src={collection.imageUrl}
                            alt={collection.name}
                            height={360}
                        />
                        <CardContent>
                            <Stack gap={2} direction="row" spacing={1} alignItems="center" justifyContent="space-between">
                                <Typography variant="h5">{collection.name}</Typography>
                                <Stack direction='row' spacing={1} alignItems='center'>
                                    <Avatar src={collection.curator.avatarUrl} sx={{ width: 32, height: 32}}/>
                                    <Typography variant="body2">{collection.curator.fullName}</Typography>
                                </Stack>
                            </Stack>
                            <Stack direction='column' spacing={1} mt={2} flexWrap='wrap'>
                                {lg ? (
                                    <Stack direction='row'>
                                        {collection.tags.split(",").map((tag) => (
                                            <Chip key={tag} label={tag} size="small"  />
                                        ))}
                                    </Stack>  
                                ) : (
                                <Grid container spacing={2} sx={{ mb: 1 }}>
                                    {collection.tags.split(",").map((tag) => (
                                        <Grid size={{ xs: 6}}>
                                            <Chip key={tag} label={tag} size="small"  />
                                        </Grid>
                                    ))}
                                </Grid>
                                )}
                                <Stack sx={{ mb: 1 }}>
                                    {collection.status && (
                                        <Chip label={collection.status.toUpperCase()} size="small" color="primary" variant="outlined"  />
                                    )}
                                </Stack>
                            </Stack>
                            <Divider sx={{ my: 2 }}/>
                            <Typography variant="body2" color="text.secondary">{collection.description}</Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid size={{ xs: 12, md: 7 }}>
                    <Stack direction="row" justifyContent="space-between" alignItems="center" mb={1}>
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
                                        <CardMedia component="img" image={art.imageUrl} alt={art.name} height={160} />
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
            {/* Drawer for artwork detail */}
            <Drawer anchor="right" open={drawerOpen} onClose={closeDrawer} PaperProps={{ sx: { width: { xs: "100%", sm: 520 } } }}>
                <Box sx={{ position: "relative", height: "100%" }}>
                    <Box sx={{ p: 1, display: "flex", justifyContent: "flex-end" }}>
                        <IconButton handleFunt={closeDrawer} icon={<Close/>} aria-label="close"/>
                    </Box>
                    <Box sx={{ p: 2 }}>
                        <Card>
                            <Card>
                                <CardMedia
                                    component='img'
                                    image={selectedArt?.imageUrl}
                                    alt={selectedArt?.name} 
                                    height={300}
                                />
                                <CardContent>
                                    <Typography variant="h6">{selectedArt?.name}</Typography>
                                    <Typography variant="body2">
                                        {`${selectedArt?.author} · ${selectedArt?.period}`}
                                    </Typography>
                                    <Divider sx={{ my: 1}}/>
                                    <Typography variant="body2">{selectedArt?.description}</Typography>
                                    <Box mt={2}>
                                        <Button onClick={handleOpenViewImage} variant="outlined">Xem chi tiết</Button>
                                    </Box>
                                    {openViewImage && (
                                        <Box mt={2}>
                                            <Box display='flex' alignItems='center' justifyContent='space-between' mb={1}>
                                                <Typography variant='subtitle2'>Ảnh bổ sung</Typography> {/* Counter bằng Chip */}
                                                <Chip
                                                    label={`Hiển thị ${visibleImages?.length}/${selectedArt?.images.length} ảnh`}
                                                    size='small'
                                                    color='default'
                                                    variant='outlined'
                                                />
                                            </Box>
                                            <Grid container spacing={2}>
                                                {visibleImages?.map((img, idx) => (
                                                    <Grid size={{ xs: 6, sm: 4, md: 3 }} key={img.id}>
                                                        <Card sx={{ cursor: 'pointer' }}>
                                                        <CardMedia
                                                            component='img'
                                                            image={img.url}
                                                            alt='Ảnh bổ sung'
                                                            sx={{ height: 140, objectFit: 'fill' }}
                                                        />
                                                        </Card>
                                                    </Grid>
                                                ))}
                                            </Grid>
                                            {/* Nút xem thêm / ẩn bớt */}
                                            {selectedArt && selectedArt.images?.length > 4 && (
                                                <Box mt={2}>
                                                <Button variant='contained' sx={{ bgcolor: COLORS.BUTTON}} onClick={() => setShowAllImage((prev) => !prev)}>
                                                    {showAll ? 'Ẩn bớt' : 'Xem thêm'}
                                                </Button>
                                                </Box>
                                            )}
                                        </Box>
                                    )}
                                </CardContent>
                            </Card>
                        </Card>
                    </Box>
                </Box>
            </Drawer>
        </Box>
    )
}


const ViewCollection = (props: ViewCollectionProps) => {
    const { onBack, data } = props;
    return(
        <>
            <NavigateBack onBack={onBack} title="Chi tiết bộ sưu tập"/>
            <Box p={3}>
                <CollectionDetail collection={data}/>
            </Box>
        </>
    )
}

export default ViewCollection;