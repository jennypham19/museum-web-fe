import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import art_work from "@/assets/images/users/artglass.mp4"

interface ImageCarouselProps{
    image_url: string,
    label: string,
    labelBtn: string,
    title?: string,
    isDisabled?: boolean;
}
const ImageCarousel: React.FC<ImageCarouselProps> = ({ image_url, label, title, isDisabled = false, labelBtn}) => {
    const navigate = useNavigate();
    return(
        <Box
            sx={{
                position: 'relative',
                height: { xs: 450, md: 600},
                width: '100%',
                // backgroundImage:`url(${image_url})`,
                // backgroundSize: '100% 100%',
                // backgroundPosition: 'center',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
            }}
        >
            <video 
                autoPlay
                loop
                muted
                playsInline 
                style={{ width: "100%", height: '100%', objectFit: 'fill' }} 
                src={art_work}
            />
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
                    <Typography sx={{ fontSize: { xs: '1.5rem', md: '3.5rem'}, color: 'white'}} fontWeight={700} mb={1}>
                        {label}
                    </Typography>
                    {title && (
                        <Typography sx={{ fontSize: { xs: '16px', md: '25px'}, color: 'white'}} fontWeight={600} mt={2}>
                            {title}
                        </Typography>
                    )}
                    {!isDisabled && (
                        <Button
                            variant="contained"
                            onClick={() => navigate('/visit-plan')}
                            sx={{
                                backgroundColor: 'white',
                                color: 'black',
                                mt: 2,
                                px: 4,
                                py: 1,
                                fontWeight: 600,
                                fontSize: '16px',
                                borderRadius: '20px',
                                '&:hover': {
                                    backgroundColor: 'black',
                                    color: 'white'
                                },
                            }}
                        >
                            {labelBtn}
                        </Button>
                    )}
                </Box> 
            </Box>
        </Box>

    )
}

export default ImageCarousel;