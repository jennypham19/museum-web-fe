import { Box, Button, Divider, IconButton, Stack, Tooltip, Typography, useMediaQuery, useTheme } from "@mui/material";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useNavigate } from "react-router-dom";
import CommonImage from "@/components/Image/index";
import image_exhibition from "@/assets/images/users/9754d5ba4737b3dce9e88607c3f940ef2108906d.png";
import Grid from '@mui/material/Grid2';
import { DATA_EXHIBITION } from "@/constants/data";

const ExhibitionDashBoard = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const mdUp = useMediaQuery(theme.breakpoints.up('md'));
    return(
        <Box p={{ xs: 2, md: 6}}>
            <Box py={1} display='flex' justifyContent='space-between' borderBottom='1px solid black'>
                <Typography variant="h5" fontWeight={600}> Triển lãm sắp tới có gì hot !</Typography>
                {mdUp ? (
                    <Stack direction='row'>
                        <Typography sx={{ pt:1, cursor: 'pointer' }} variant="body2" fontWeight={600} onClick={() => navigate('/center-exhibition')}> Xem tất cả</Typography>
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
            <CommonImage
                src={image_exhibition}
                alt="image_exhibition"
                fallbackSrc={image_exhibition}
                sx={{ py: { xs: 2, md: 4}}}
            />
            <Box>
                {DATA_EXHIBITION.map((data, index) => {
                    return(
                        <>
                        <Grid container>
                            <Grid size={{ xs: 12, md: 3}}>
                                <Box pb={{ xs: 2, md: 3}} pt={{ xs: 2, md: 2}} display='flex' flexDirection='column'>
                                    <Typography variant="h6" fontWeight={600} sx={{ whiteSpace: 'wrap' }}>{data.title}</Typography>
                                    <Typography color="text.secondary" fontWeight={500} sx={{ fontSize: '15px'}} mt={1}>{`${data.startedAt} - ${data.endedAt}`}</Typography>
                                </Box>
                            </Grid>
                            <Grid size={{ xs: 12, md: 8}}>
                                <Box pb={{ xs: 2, md: 3}} pt={{ xs: 0, md: 3}}>
                                    <Typography sx={{ whiteSpace: 'wrap' }} variant="body2">{data.content}</Typography>
                                </Box>
                            </Grid>
                            <Grid size={{ xs: 12, md: 1}}>
                                <Box display='flex' justifyContent='flex-end' pb={{ xs: 2, md: 3}} pt={{ xs: 0, md: 3}}>
                                    <Button
                                        sx={{
                                            bgcolor: 'white', color: 'black',
                                            boxShadow: '0px 1px 3px 1px rgba(0, 0, 0, 0.15), 0px 1px 2px 0px rgba(0, 0, 0, 0.3)',
                                            borderRadius: '20px',
                                            width: '100px',
                                            '&:hover': {
                                                boxShadow: '0px 1px 3px 1px rgba(0, 0, 0, 0.15), 0px 1px 2px 0px rgba(0, 0, 0, 0.3)',
                                            }
                                        }}
                                    >
                                        Xem ngay
                                    </Button>
                                </Box>
                            </Grid>
                        </Grid>
                        {DATA_EXHIBITION.length - 1 > index && (<Divider sx={{ border: 'solid 1px grey'}}/>)}
                        </>
                    )
                })}
            </Box>    
        </Box>
    )
}

export default ExhibitionDashBoard