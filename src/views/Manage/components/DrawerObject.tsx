import IconButton from "@/components/IconButton/IconButton";
import { IPainting } from "@/types/display";
import { Close } from "@mui/icons-material";
import { Box, Button, Card, CardContent, CardMedia, Chip, Divider, Drawer, Typography } from "@mui/material";
import { useState } from "react";
import Grid from "@mui/material/Grid2";
import { COLORS } from "@/constants/colors";

interface DrawerObjectProps {
    open: boolean;
    onClose: () => void;
    data: IPainting;
}

const DrawerObject = (props: DrawerObjectProps) => {
    const { open, onClose, data } = props;
    const [showAllImage, setShowAllImage] = useState(false);
    const [openViewImage, setOpenViewImage] = useState(false)

    const handleClose = () => {
        onClose();
        setOpenViewImage(false)
    }

    const handleOpenViewImage = () => {
        setOpenViewImage(true)
    }

    const visibleImages = showAllImage ? data.images : data.images.slice(0, 4);
    return (
        <Drawer
            anchor="right"
            open={open}
            onClose={handleClose}
            PaperProps={{ sx: { width: { xs: "100%", sm: 520 } } }}
        >
            <Box sx={{ position: 'relative', height: '100%'}}>
                <Box sx={{ p: 1, display: "flex", justifyContent: "flex-end" }}>
                    <IconButton
                        handleFunt={handleClose}
                        icon={<Close/>}
                        aria-label="close"
                    />
                </Box>
                <Box p={2}>
                    <Card>
                        <CardMedia
                            component='img'
                            image={data.imageUrl}
                            alt={data.name}
                            height={300}
                        />
                        <CardContent>
                            <Typography variant="h6">{data.name}</Typography>
                            <Typography variant="body2">
                                {`${data.author} · ${data.period}`}
                            </Typography>
                            <Divider sx={{ my: 1}}/>
                            <Typography variant="body2">
                                {data.description}
                            </Typography>
                            <Box mt={2}>
                                <Button
                                    onClick={handleOpenViewImage}
                                    variant="outlined"
                                >
                                    Xem chi tiết
                                </Button>
                            </Box>
                            {openViewImage && (
                                <Box mt={2}>
                                    <Box mb={1} display='flex' alignItems='center' justifyContent='space-between'>
                                        <Typography variant="subtitle1">Ảnh bổ sung</Typography>
                                        <Chip
                                            label={`Hiển thị ${visibleImages.length}/${data.images.length} ảnh`}
                                            size="small"
                                            color="default"
                                            variant="outlined"
                                        />
                                    </Box>
                                    <Grid container spacing={2}>
                                        {visibleImages.map((img, idx) => (
                                            <Grid size={{ xs: 6, sm: 4, md: 3}} key={idx}>
                                                <Card sx={{ cursor: 'pointer'}}>
                                                    <CardMedia
                                                        component='img'
                                                        image={img.url}
                                                        alt={img.name}
                                                        sx={{ height: 140, objectFit: 'cover'}}
                                                    />
                                                </Card>
                                            </Grid>
                                        ))}
                                    </Grid>
                                    {/* Nút xem thêm / ẩn bớt */}
                                    {data && data.images.length > 4 && (
                                        <Box mt={2}>
                                            <Button
                                                variant="contained"
                                                sx={{ bgcolor: COLORS.BUTTON }}
                                                onClick={() => setShowAllImage((prev) => !prev)}
                                            >
                                                {showAllImage ? 'Ẩn bớt' : 'Xem thêm'}
                                            </Button>
                                        </Box>
                                    )}
                                </Box>
                            )}
                        </CardContent>
                    </Card>
                </Box>
            </Box>
        </Drawer>
    )
}

export default DrawerObject;