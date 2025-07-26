import { IICommonLandingPage } from "@/types/landingpage";
import { Box, Card, CardMedia, Paper, Stack, Typography } from "@mui/material";
import React from "react";
import Grid from "@mui/material/Grid2"

interface CommonInfoProps{
    data: IICommonLandingPage[]
}

const CommonInfo: React.FC<CommonInfoProps> = ({ data }) => {
    return(
        <Box px={{ xs: 2, md: 6}} py={{ xs: 2, md: 4}}>
            <Grid container spacing={3}>
                {data.map((item, index) => {
                    return(
                        <Grid key={item.id} size={{ xs: 12, sm: 6, md: 4}}>
                            <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%', borderRadius: '0', bgcolor: '#f5f5f5'}}>
                                <CardMedia
                                    component='img'
                                    image={item.image_url}
                                    alt={item.title}
                                    sx={{ 
                                        height: { xs: 180, md: 250},
                                        objectFit: 'fill',
                                        backgroundColor: '#f5f5f5',
                                    }}
                                />
                                <Stack p={{ xs: 2, md: 3}} direction='column'>
                                    <Typography fontWeight={600} fontSize={{ xs: '14px', md: '18px'}}>{item.title}</Typography>
                                    <Typography sx={{ whiteSpace: 'normal', wordBreak: 'break-word'}} fontSize={{ xs: '12px', md: '14px'}}>{item.content}</Typography>
                                </Stack>
                            </Card>
                        </Grid>
                    )
                })}
            </Grid>
        </Box>
    )
}

export default CommonInfo;