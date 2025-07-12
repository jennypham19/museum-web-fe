import { Box, Button, Card, CardContent, CardMedia, IconButton, Stack, Tooltip, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Grid from '@mui/material/Grid2';
import { DATA_COLLECTION, DATA_EXHIBITION } from "@/constants/data";
import { ArrowForward } from "@mui/icons-material";


const CollectionDashboard = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const mdUp = useMediaQuery(theme.breakpoints.up('md'));
    return(
        <Box p={{ xs: 2, md: 6}}>
            <Box py={1} display='flex' justifyContent='space-between' borderBottom='1px solid black'>
                <Typography variant="h5" fontWeight={600}> Bộ sưu tập siêu hot !</Typography>
                {mdUp ? (
                    <Stack direction='row'>
                        <Typography sx={{ pt:1, cursor: 'pointer' }} variant="body2" fontWeight={600} onClick={() => navigate('/outstanding-collection')}> Xem tất cả</Typography>
                        <IconButton sx={{ border: 'solid 0.5px #757373ff', borderRadius: '50%'}}>
                            <ArrowForwardIcon/>
                        </IconButton>
                    </Stack>  
                ):(
                    <Tooltip title='Xem tất cả'>
                        <IconButton sx={{ border: 'solid 0.5px #757373ff', borderRadius: '50%'}}>
                            <ArrowForwardIcon fontSize="small"/>
                        </IconButton>
                    </Tooltip>
                )}
            </Box>
            <Box p={3}>
                <Grid container spacing={3}>
                    {DATA_COLLECTION.map((item, index) => {
                    return(
                        <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3}} key={item.id}>
                            <Card sx={{ color: 'black'}}>
                                <CardMedia
                                component='img'
                                image={item.image_url}
                                alt={item.title}
                                sx={{
                                    objectFit: 'fill',
                                    backgroundColor: '#f5f5f5',
                                    height: "250px",
                                    width:"100%",
                                }}
                                />
                                <CardContent>
                                <Typography variant="h6" sx={{ mt: 1, fontWeight: 600 }}>
                                    {item.title}
                                </Typography>
                                <Typography variant="body2" 
                                    sx={{ 
                                        mt: 1,
                                    }}
                                >
                                    {item.content}
                                </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    )
                    })}
                </Grid>
            </Box>
            <Box mt={{ xs: 0, md: 3}} display='flex' justifyContent='center' alignItems='center'>
                <Button
                    sx={{
                        bgcolor: 'white', color: 'black',
                        boxShadow: '0px 1px 3px 1px rgba(0, 0, 0, 0.15), 0px 1px 2px 0px rgba(0, 0, 0, 0.3)',
                        borderRadius: '30px',
                        width: { xs: '150px', md: '180px'}, height: { xs: '100%', md: '40px'},
                        '&:hover': {
                            boxShadow: '0px 1px 3px 1px rgba(0, 0, 0, 0.15), 0px 1px 2px 0px rgba(0, 0, 0, 0.3)',
                        }
                    }}
                    endIcon={<ArrowForward/>}
                    onClick={() => navigate('/outstanding-collection')}
                >
                    Tìm hiểu thêm
                </Button> 
            </Box>
        </Box>
    )
}

export default CollectionDashboard;