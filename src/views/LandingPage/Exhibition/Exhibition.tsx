import { Box, Card, CardContent, CardMedia, Stack, Typography} from "@mui/material";
import CommonNavbar from "../Components/CommonNavbar";
import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid2";
import { DATA_EXHIBITION_ABOUT_TO_CLOSE, DATA_EXHIBITION_IN_PROGRESS, DATA_EXHIBITION_RECENTLY_OPENED, DATA_LOCATION_TIME } from "@/constants/data";
import { AccessAlarm } from "@mui/icons-material";
import LiveStream from "../Dashboard/components/LiveStream";
import CardExhibition from "./components/CardExhibition";

const Exhibition = () => {
    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate('/home/exhibition-tiffany-light')
    }
    return(
        <Box>
            <CommonNavbar
                title="/ Triển lãm"
            />
            <Box px={{ xs: 3, md: 10}} mb={{ xs: 2, md: 6}}>
                <Box mb={1} mt={{ xs: 2, md: 3}}>
                    <Typography sx={{ fontSize: { xs: '1.2rem', sm: '1.8rem'}}} fontWeight={600}>Kế hoạch thăm quan của bạn</Typography>
                </Box>
                <Box mb={1} mt={{ xs: 2, md: 3}}>
                    <Typography pb={1} fontSize={{ xs: '13px', md: '17px'}} borderBottom='1px solid grey'>Tất cả các cuộc triển lãm đều được miễn phí khi vào bảo tàng</Typography>
                </Box>
                {/* Triển lãm hiện tại */}
                <Typography fontSize={{ xs: '22px', sm: '27px', md: '32px'}} fontWeight={700} mt={{ xs: 4, md:6}}>Triển lãm hiện tại</Typography>
                <Box mb={1} mt={{ xs: 2, md: 3}} sx={{ cursor: 'pointer'}} px={{ xs: 0, sm: 5}} onClick={handleNavigate}>
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
                                            <AccessAlarm sx={{ mr: 2}}/>
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
                {/* End triển lãm hiện tại */}

                {/* Mới mở gần đây */}
                <Typography fontSize={{ xs: '22px', sm: '27px', md: '32px'}} fontWeight={700} mt={{ xs: 4, md:6}}>Mới mở gần đây</Typography>
                <Box mb={1} mt={{ xs: 2, md: 3}} sx={{ cursor: 'pointer'}}>
                    <CardExhibition
                        data={DATA_EXHIBITION_RECENTLY_OPENED}
                    />
                </Box>
                {/* End mới mở gần đây */}

                {/* Sắp đóng cửa */}
                <Typography fontSize={{ xs: '22px', sm: '27px', md: '32px'}} fontWeight={700} mt={{ xs: 4, md:6}}>Sắp đóng cửa</Typography>
                <Box mb={1} mt={{ xs: 2, md: 3}} sx={{ cursor: 'pointer'}}>
                    <CardExhibition
                        data={DATA_EXHIBITION_ABOUT_TO_CLOSE}
                    />
                </Box>
                {/* End sắp đóng cửa */}

                {/* Đang diễn ra */}
                <Typography fontSize={{ xs: '22px', sm: '27px', md: '32px'}} fontWeight={700} mt={{ xs: 4, md:6}}>Đang diễn ra</Typography>
                <Box mb={1} mt={{ xs: 2, md: 3}} sx={{ cursor: 'pointer'}}>
                    <CardExhibition
                        data={DATA_EXHIBITION_IN_PROGRESS}
                    />
                </Box>
                {/* End đang diễn ra */}

            </Box>
            {/* Triễn lãm sắp tới */}
            <LiveStream title="Triển lãm sắp tới" isDisabled={true}/>
            {/* End triễn lãm sắp tới */}            
        </Box>
    )
}

export default Exhibition;