import { Box, Card, CardContent, CardMedia, IconButton, Stack, Tooltip, Typography, useMediaQuery, useTheme } from "@mui/material";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useNavigate } from "react-router-dom";
import Grid from '@mui/material/Grid2';
import { DATA_LIVE_STREAM } from "@/constants/data";

const LiveStream = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const mdUp = useMediaQuery(theme.breakpoints.up('lg'));

    return(
        <Box p={{ xs: 2, md: 6}}>
            <Box py={1} display='flex' justifyContent='space-between'>
                <Typography sx={{ fontSize: { xs: '1.2rem', sm: '1.8rem', md: '2rem'}}} fontWeight={600}> Xem trực tiếp</Typography>
                {mdUp ? (
                    <Stack direction='row'>
                        <Typography sx={{ pt:1, cursor: 'pointer' }} variant="body2" fontWeight={600} onClick={() => navigate('/center-exhibition')}> Xem tất cả</Typography>
                        <IconButton sx={{ border: 'solid 0.5px #757373ff', borderRadius: '50%', width: 36, height: 36}}>
                            <ArrowForwardIcon fontSize="small"/>
                        </IconButton>
                    </Stack>  
                ):(
                    <Tooltip title='Xem tất cả'>
                        <IconButton sx={{ border: 'solid 0.5px #757373ff', borderRadius: '50%', width: 36, height: 36}}>
                            <ArrowForwardIcon fontSize="small"/>
                        </IconButton>
                    </Tooltip>
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
                                        }}
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