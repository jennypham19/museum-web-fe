import image_slide from "@/assets/images/users/slide.png";
import { Box, Button, IconButton, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

const ImageCarousel: React.FC = () => {

    return(
        <Box
            sx={{
                position: 'relative',
                height: { xs: 450, md: 600},
                width: '100%',
                backgroundImage:`url(${image_slide})`,
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
                    <Typography sx={{ fontSize: { xs: '1.5rem', md: '3.5rem'}, color: 'white'}} fontWeight={700} mb={1}>
                        Chào mừng đến Tiffany
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
                            fontSize: '16px',
                            borderRadius: '20px',
                            '&:hover': {
                                backgroundColor: 'black',
                                color: 'white'
                            },
                        }}
                    >
                        Kế hoạch tham quan
                    </Button>
                </Box> 
            </Box>
        </Box>

    )
}

export default ImageCarousel;