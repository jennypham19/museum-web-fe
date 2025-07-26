import { Box, Button, Divider, Stack, Typography } from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
import IconButton from "@/components/IconButton/IconButton";
import { useNavigate } from "react-router-dom";
import image_exhi from "@/assets/images/users/image-exhi.png";
import image_1 from "@/assets/images/users/image_1.png";
import Grid from "@mui/material/Grid2";
import CommonImage from "@/components/Image/index";
import LiveStream from "./components/LiveStream";
import PlanVisit from "./components/PlanVisit";
import { DATA_COMMON, DATA_PLAN_VISIT } from "@/constants/data";
import CommonInfo from "./components/ComonInfo";

const ExhibitionOfTiffanyLight = () => {
    const navigate = useNavigate();
    return (
        <Box>
            <Box display='flex' flexDirection='row' py={{ xs: 0, md: 1.5}} px={{ xs: 2, md: 10}}>
                <IconButton
                    handleFunt={() => navigate(-1)}
                    icon={<HomeIcon sx={{ width: { xs: 20, md: 30 }, height: { xs: 20, md: 30 }, color: '#000'}}/>}
                />
                <Typography mt={{ xs: 1, md: 1}} fontWeight={600} fontSize={{ xs: '12px', md: '18px'}}>/ Kế hoạch tham quan/ Triển lãm đèn Tiffany</Typography>
            </Box>
            <Box
                sx={{
                    height: { xs: 300, md: 480},
                    width: '100%',
                    backgroundImage:`url(${image_exhi})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textAlign: 'center',
                }}
            />
            <Box px={{ xs: 3, md: 6}} mb={{ xs: 3, md: 6}}>
                <Box pb={4} mt={{ xs: 4, md: 5}}>
                    <Typography sx={{ fontSize: { xs: '1.2rem', sm: '1.8rem'} , borderBottom: '1px solid grey'}} fontWeight={600}>Triển lãm đèn Tiffany</Typography>
                </Box>
                <Grid container spacing={4} sx={{ borderBottom: '1px solid grey'}}>
                    <Grid size={{ xs: 12, md: 5}}>
                        <Typography mb={3} fontSize={{ xs: '16px', md: '22px'}} fontWeight={600}>Triển lãm đèn Tiffany</Typography>
                        <Stack direction='row'>
                            <Typography fontSize={{ xs: '13px', md: '16px'}} fontWeight={600}>Thời gian: </Typography>
                            <Typography fontSize={{ xs: '13px', md: '16px'}} color="text.secondary">Chủ nhật - Thứ Ba: 10 AM - 17 PM </Typography>
                        </Stack>
                        <Stack direction='row'>
                            <Typography fontSize={{ xs: '13px', md: '16px'}} fontWeight={600}>Thời gian mở lại: </Typography>
                            <Typography fontSize={{ xs: '13px', md: '16px'}} color="text.secondary">Thứ Sáu - Thứ Bảy: 10 AM - 17 PM </Typography>
                        </Stack>
                        <Stack direction='row'>
                            <Typography fontSize={{ xs: '13px', md: '16px'}} fontWeight={600}>Đóng cửa: </Typography>
                            <Typography fontSize={{ xs: '13px', md: '16px'}} color="text.secondary">Thứ Tư - Thứ Năm</Typography>
                        </Stack>
                        <Stack direction='row' mt={{ xs: 3, md: 5}}>
                            <Typography fontSize={{ xs: '13px', md: '16px'}} fontWeight={600}>Địa điểm: </Typography>
                            <Typography fontSize={{ xs: '13px', md: '16px'}} color="text.secondary">153 Đội Cấn - Ba Đình - Hà Nội</Typography>
                        </Stack>
                        <Stack direction='row'>
                            <Typography fontSize={{ xs: '13px', md: '16px'}} fontWeight={600}>Địa điểm cụ thể: </Typography>
                            <Typography target="_blank" component='a' fontSize={{ xs: '13px', md: '16px'}} href="#" rel="noopener noreferrer" sx={{ color: 'black'}}>Nhấn vào đây để xem chi tiết</Typography>
                        </Stack>
                        <Stack direction='row'>
                            <Typography fontSize={{ xs: '13px', md: '16px'}} fontWeight={600}>Quy định: </Typography>
                            <Typography target="_blank" component='a' fontSize={{ xs: '13px', md: '16px'}} href="#" rel="noopener noreferrer" sx={{ color: 'black'}}>Xem chi tiết</Typography>
                        </Stack>
                        <Box py={4}>
                            <Button
                                variant="contained"
                                sx={{
                                    color: 'white',
                                    height: 50,
                                    width: 120,
                                    background: 'linear-gradient(45deg, #D30000 30%, #780000 90%)',
                                    fontSize: '18px'
                                }}
                            >
                                Mua vé
                            </Button>
                        </Box>
                        <Stack direction='row'>
                            <Typography fontSize={{ xs: '13px', md: '16px'}} fontWeight={600}>Tình trạng: </Typography>
                            <Typography fontSize={{ xs: '13px', md: '16px'}} sx={{ color: '#34C759'}}>Đang mở cửa</Typography>
                        </Stack>
                        <Stack direction='row'>
                            <Typography fontSize={{ xs: '13px', md: '16px'}} fontWeight={600}>Hiện vật: </Typography>
                            <Typography fontSize={{ xs: '13px', md: '16px'}} sx={{ whiteSpace: 'normal', wordBreak: 'break-word'}}>Hiện vật trưng bày gồm đèn Tiffany và một số tác phẩm Nghệ thuật ghép kính hiện đại</Typography>
                        </Stack>
                        <Stack direction='row'>
                            <Typography fontSize={{ xs: '13px', md: '16px'}} fontWeight={600}>Hình ảnh: </Typography>
                            <Typography target="_blank" component='a' fontSize={{ xs: '13px', md: '16px'}} href="#" rel="noopener noreferrer" sx={{ color: 'black'}}>Nhấn vào đây để xem hình ảnh</Typography>
                        </Stack>
                    </Grid>
                    <Grid size={{ xs: 12, md: 7}}>
                        <CommonImage
                            src={image_1}
                            alt="image"
                            sx={{ height: { xs: '100%', md: '70%'}, width: { xs: '100%', md: '100%'}, pb: {xs: 5, md: 0}}}
                        />
                    </Grid>
                </Grid>
            <LiveStream title="Sự kiện"/>
            <LiveStream title="Trải nghiệm miễn phí"/>
            <PlanVisit data={DATA_PLAN_VISIT} label="Thăm quan ngay" md={3}/>
            <CommonInfo data={DATA_COMMON} />             
            </Box>

        </Box>
    )
}

export default ExhibitionOfTiffanyLight;