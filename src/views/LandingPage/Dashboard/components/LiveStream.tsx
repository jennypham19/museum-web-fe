import { Box, Card, CardContent, CardMedia, IconButton, Stack, Tooltip, Typography, useMediaQuery, useTheme } from "@mui/material";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useNavigate } from "react-router-dom";
import Grid from '@mui/material/Grid2';
import { DATA_LIVE_STREAM } from "@/constants/data";
import React from "react";

interface LiveStreamProps{
    title: string,
    isDisabled?: boolean
}

const LiveStream: React.FC<LiveStreamProps> = ({title, isDisabled=false}) => {
    const theme = useTheme();
    const navigate = useNavigate();
    const mdUp = useMediaQuery(theme.breakpoints.up('lg'));

    const handleNavigate = (id: number) => {
        navigate(`/visit-plan/detail-art/${id}`)
    }

    return(
        <Box px={{ xs: 2, md: 6}} py={{ xs: 2, md: 4}}>
            <Box py={1} display='flex' justifyContent='space-between'>
                <Typography sx={{ fontSize: { xs: '1.2rem', sm: '1.8rem', md: '2rem'}}} fontWeight={600}>{title}</Typography>
                {mdUp ? (
                    <>
                        {!isDisabled && (
                            <Stack direction='row'>
                                <Typography sx={{ pt:1, cursor: 'pointer' }} variant="body2" fontWeight={600} onClick={() => navigate('/center-exhibition')}> Xem tất cả</Typography>
                                <IconButton sx={{ border: 'solid 0.5px #757373ff', borderRadius: '50%', width: 36, height: 36}}>
                                    <ArrowForwardIcon fontSize="small"/>
                                </IconButton>
                            </Stack> 
                        )}
                    </> 
                ):(
                    <>
                        {!isDisabled && (
                            <Tooltip title='Xem tất cả'>
                                <IconButton sx={{ border: 'solid 0.5px #757373ff', borderRadius: '50%', width: 36, height: 36}}>
                                    <ArrowForwardIcon fontSize="small"/>
                                </IconButton>
                            </Tooltip>                            
                        )}
                    </>

                )}

            </Box>
            <Box py={2}>
                <Grid container spacing={3} sx={{ mt: { xs: 2, md: 0}}}>
                    {DATA_LIVE_STREAM.slice(0,3).map((data, index) => {
                        return(                      
                                <Grid key={index} size={{ xs: 12, sm: 4}}>
                                    <Card
                                        sx={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            height: '100%',
                                            cursor: 'pointer',
                                        }}
                                        onClick={() => data.id && handleNavigate(data.id)}
                                    >
                                        <CardMedia
                                            component='img'
                                            image={data.image_url}
                                            alt={data.title}
                                            sx={{
                                                objectFit: 'fill',
                                                backgroundColor: '#f5f5f5',
                                                height: { xs: 200, md: 250},
                                                width:"100%",
                                            }}
                                        />
                                        <CardContent>
                                            <Typography fontWeight={600}>{data.title}</Typography>
                                            <Typography variant="subtitle2" color='text.secondary'>{`${data.date} - ${data.status}`}</Typography>
                                        </CardContent>
                                    </Card>                                    
                                

                                </Grid>
                        )
                    })}
                </Grid> 
            </Box>    
        </Box>
    )
}

export default LiveStream