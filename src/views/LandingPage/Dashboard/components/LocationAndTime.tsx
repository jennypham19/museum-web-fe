import { DATA_EXHIBITION, DATA_LOCATION_TIME } from "@/constants/data";
import { Box,Card,CardContent,CardMedia,IconButton,Stack,Typography } from "@mui/material";
import Grid from '@mui/material/Grid2';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import CommonImage from "@/components/Image/index";
import { ChevronRight } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

interface ExhibitionDataProps{
    id: number,
    image_url: string,
    title: string,
    content: string,
    isReverse: boolean

}

const LocationAndTime = () => {
    const navigate = useNavigate();
    const exhibitionData: ExhibitionDataProps[] = DATA_EXHIBITION.map(
        (data, index) => {
            return {
                ...data,
                isReverse: !isNaN(data.id) && data.id % 2 !== 0
            }
        }
    )

    const handleNavigate = () => {
        navigate('/home/exhibition-tiffany-light')
    }

    const handleNavigateEx = () => {
        navigate('/home/exhibition-blue-shine')
    }
    return(
        <Box px={{ xs: 2, md: 6}}>
            <Box py={1}>
                <Typography sx={{ fontSize: { xs: '1.2rem', sm: '1.8rem', md: '2rem'}}} fontWeight={600}>Địa điểm và thời gian</Typography>
            </Box>
            <Box sx={{ cursor: 'pointer'}} px={{ xs: 0, sm: 5}} onClick={handleNavigate}>
                <Grid container spacing={2}>
                    {DATA_LOCATION_TIME.slice(0,2).map((data, index) => {
                        return (
                            <Grid size={{ xs: 12, sm: 6}}>
                                <Card
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        height: '100%',
                                        position: 'relative',
                                        bgcolor: '#FFFEF2'
                                    }}
                                >
                                    <Box
                                        display='flex' flexDirection='row' py={0.5} px={2}
                                        sx={{ color: 'black', bgcolor: 'white', position: 'absolute', zIndex: 1, bottom: { xs: '48%', sm: '50%', md: '52%', lg: '48%' }, left: { xs: 8, sm: 25}, borderRadius: '20px' }}
                                    >
                                        <AccessAlarmIcon sx={{ mr: 2}}/>
                                        <Typography fontSize={{ xs: '14px', md: '16px'}} fontWeight={500}>Thời gian mở cửa: 10 AM</Typography>
                                    </Box>
                                    <CardMedia
                                        component='img'
                                        image={data.image_url}
                                        alt={data.title}
                                        sx={{
                                            objectFit: 'fill',
                                            height: { xs: 250, md: 300},
                                            width:"100%",
                                        }}
                                    />
                                    <Box px={{ xs: 0, md: 2}}>
                                        <CardContent>
                                            <Typography py={1} fontSize={{ xs: '1rem', sm: '1.4rem', md: '1.6rem'}} fontWeight={700}>Triễn lãm đèn Tiffany</Typography>
                                            <Stack direction='row'>
                                                <Typography fontSize={{ xs: '12px', md: '16px' }} fontWeight={600}>Thời gian: </Typography>
                                                <Typography fontSize={{ xs: '12px', md: '16px' }} color="text.secondary">{data.date}</Typography>
                                            </Stack>
                                            <Stack direction='row'>
                                                <Typography fontSize={{ xs: '12px', md: '16px' }} fontWeight={600}>Thời gian mở lại: </Typography>
                                                <Typography fontSize={{ xs: '12px', md: '16px' }} color="text.secondary">{data.time_open}</Typography>
                                            </Stack>
                                            <Stack direction='row'>
                                                <Typography fontSize={{ xs: '12px', md: '16px' }} fontWeight={600}>Đóng cửa: </Typography>
                                                <Typography fontSize={{ xs: '12px', md: '16px' }} color="text.secondary">{data.time_close}</Typography>
                                            </Stack>
                                            <Typography py={{ xs: 2, md: 3}} fontSize={{ xs: '12px', md: '16px' }} color="text.secondary">{data.reason}</Typography>
                                        </CardContent>                                        
                                    </Box>

                                </Card>
                            </Grid>
                        )
                    })}
                </Grid>
            </Box>
            <Box px={{ xs: 0, sm: 5}} py={5}>
                {exhibitionData.slice(0,4).map((data, index) => {
                    return(
                        <Grid sx={{ mt: 3}} key={index} container spacing={4} direction={data.isReverse === true ? 'row' : 'row-reverse'}>
                            <Grid size={{ xs: 12, md: 6}}>
                                <CommonImage
                                    src={data.image_url}
                                    sx={{ 
                                        width: '100%',
                                        height: { xs: 200, md: 300},
                                    }}
                                />
                            </Grid>
                            <Grid size={{ xs: 12, md: 6}}>
                                <Typography fontSize={{ xs: '18px', md: '28px'}} mb={1} fontWeight={600}>{data.title}</Typography>
                                <Typography fontSize={{ xs: '14px', md: '20px'}} mb={1} sx={{ whiteSpace: 'normal', wordBreak: 'break-word' }}>{data.content}</Typography>
                                <Stack sx={{ cursor: 'pointer'}} direction='row' onClick={handleNavigateEx}>
                                    <Typography pt={0.5} fontWeight={600} variant="subtitle2">Xem tất cả</Typography>
                                    <IconButton>
                                        <ChevronRight/>
                                    </IconButton>
                                </Stack>
                            </Grid>
                        </Grid>
                    )
                })}   
            </Box>
        </Box>
    )
}
export default LocationAndTime;