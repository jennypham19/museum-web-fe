import image_slide from "@/assets/images/users/image_bg.png";
import image_slide_1 from "@/assets/images/users/image_bg_1.jpg";
import { FiberManualRecord } from "@mui/icons-material";
import { Box, Button, IconButton, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

const fixedImages = [
    { id: 1, name: 'image_slide', url: `${image_slide}`, srcSet1200: `${image_slide}`, srcSet768: `${image_slide}`},
    { id: 2, name: 'image_slide_1', url: `${image_slide_1}`, srcSet1200: `${image_slide_1}`, srcSet768: `${image_slide_1}`},
]

const ImageCarousel: React.FC = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [fade, setFade] = useState(false);

    const totalSlides = fixedImages.length;

    useEffect(() => {
        const interval = setInterval(() => {
            const index = (currentIndex + 1) % totalSlides;
            setCurrentIndex(index);
            setFade(true)
        }, 5000);

        return () => clearInterval(interval)
    }, [currentIndex, totalSlides]);

    useEffect(() => {
        if(fade) {
            const timeout = setTimeout(() =>  setFade(false), 500);
            return () => clearTimeout(timeout)
        }
    }, [fade]);
    return(
        <Box>
            {fixedImages.length > 0 && (
                <Box
                    sx={{
                        position: 'relative',
                        height: { xs: 450, md: 600},
                        transition: "opacity 0.5s ease-in-out",
                        width: '100%',
                        backgroundImage:`url(${fixedImages[currentIndex].url})`,
                        backgroundSize: '100% 100%',
                        backgroundPosition: 'center',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        textAlign: 'center',
                    }}
                >
                    <Box
                        sx={{
                            position: 'absolute',
                            inset: 0,
                            bgcolor: 'rgba(0,0,0,0.5)',
                            zIndex: 1 
                        }}
                    >
                        <Box
                            sx={{
                                zIndex: 2,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                height: '100%',
                            }}
                        >
                            <Typography sx={{ fontSize: { xs: '13px', md: '22px'}, color: 'white'}} mb={1}>
                                Thứ 6, 25/05/2025 - Thứ 2, 15/06/2025
                            </Typography>
                            <Typography sx={{ fontSize: { xs: '1.5rem', md: '3rem'}, color: 'white'}} fontWeight={700} mb={1}>
                                Triễn lãm "Ngược dòng ánh dương xanh"
                            </Typography>
                            <Button
                                variant="contained"
                                // onClick={() => navigate('/about-us')}
                                sx={{
                                    backgroundColor: 'white',
                                    color: 'black',
                                    mt: 2,
                                    px: 4,
                                    py: 1,
                                    fontWeight: 600,
                                    fontSize: '14px',
                                    borderRadius: '20px',
                                    '&:hover': {
                                        backgroundColor: 'black',
                                        color: 'white'
                                    },
                                }}
                            >
                                Xem ngay
                            </Button>
                        </Box>
                        {/* Chấm điều hướng */}
                        {fixedImages.length > 1 && (
                            <Box
                            sx={{
                                position: "absolute",
                                bottom: 0,
                                width: "100%",
                                zIndex: 2,
                            }}
                            >
                            <Stack direction="row" justifyContent="center" sx={{ mt: 1 }}>
                                {fixedImages.map((img, index) => (
                                <IconButton
                                    key={img.id}
                                    onClick={() => {
                                        setCurrentIndex(index);
                                    }}
                                    size="small"
                                    sx={{ color: currentIndex === index ? "#AC7D4F" : "grey.400" }}
                                >
                                    <FiberManualRecord sx={{ fontSize: {xs: '14px', md: '18px'}}}  />
                                </IconButton>
                                ))}
                            </Stack>
                            </Box>
                        )} 
                    </Box>
                </Box>
            )}
        </Box>

    )
}

export default ImageCarousel;