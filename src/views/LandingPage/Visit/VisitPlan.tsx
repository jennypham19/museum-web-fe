import IconButton from "@/components/IconButton/IconButton";
import { Box, Button, Paper, Stack, Typography } from "@mui/material"
import { useNavigate } from "react-router-dom";
import image_plan_visit from "@/assets/images/users/image_plan_visit.png"
import ReportIcon from '@mui/icons-material/Report';
import TimerIcon from '@mui/icons-material/Timer';
import Grid from "@mui/material/Grid2";
import CommonImage from "@/components/Image/index";
import img from "@/assets/images/users/img.png";
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import LiveStream from "../Dashboard/components/LiveStream";
import { DATA_ABOUT_MUSEUM } from "@/constants/data";
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import CommonNavbar from "../Components/CommonNavbar";

const VisitPlan = () => {
    const navigate = useNavigate();
    return(
        <Box>
            <CommonNavbar
                title="/ Kế hoạch thăm quan"
            />
            <Box
                sx={{
                    height: { xs: 300, md: 480},
                    width: '100%',
                    backgroundImage: `url(${image_plan_visit})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textAlign: 'center'
                }}
            />
            <Box px={{ xs: 3, md: 6}} mb={{ xs: 2, md: 6}}>
                {/* Kế hoạch thăm quan */}
                <Box mb={1} mt={{ xs: 4, md: 5}}>
                    <Typography sx={{ fontSize: { xs: '1.2rem', sm: '1.8rem'} , borderBottom: '1px solid grey'}} fontWeight={600}>Kế hoạch thăm quan của bạn</Typography>
                    <Stack py={2} direction={{ xs: 'column', md: 'row'}}>
                        <Typography px={{ xs: 0, md: 2}} fontSize={{ xs: '14px', md: '18px'}}>Lộ trình: </Typography>
                        <Typography px={{ xs: 0, md: 2}} fontSize={{ xs: '14px', md: '18px'}} fontWeight={600}>Đóng cửa</Typography>
                        <Typography px={{ xs: 0, md: 2}} fontSize={{ xs: '14px', md: '18px'}} fontWeight={600}>Địa điểm và giờ làm việc</Typography>
                        <Typography px={{ xs: 0, md: 2}} fontSize={{ xs: '14px', md: '18px'}} fontWeight={600}>Mua vé trực tuyến</Typography>
                        <Typography px={{ xs: 0, md: 2}} fontSize={{ xs: '14px', md: '18px'}} fontWeight={600}>Tìm hiểu về bảo tàng</Typography>
                        <Typography px={{ xs: 0, md: 2}} fontSize={{ xs: '14px', md: '18px'}} fontWeight={600}>Triển lãm đang mở</Typography>
                        <Typography px={{ xs: 0, md: 2}} fontSize={{ xs: '14px', md: '18px'}} fontWeight={600}>Khám phá</Typography>
                    </Stack>
                </Box>
                <Paper sx={{ bgcolor: '#E6E6E6', p: { xs: 3, md: 4}, display: 'flex', flexDirection: 'column', borderRadius: '10px'}}>
                    <Stack direction='row' mb={2}>
                        <ReportIcon sx={{ fontSize: { xs: '20px', md: '30px'}}}/>
                        <Typography px={{ xs: 1, md: 2}} fontSize={{ xs: '14px', md: '20px'}} fontWeight={600}>Đóng cửa</Typography>
                    </Stack>
                    <Typography fontWeight={500} fontSize={{ xs: '13px', md: '17px'}}>Hiện tại, đây là một số triển lãm đang tạm dừng hoạt động để chuẩn bị cho đợt triển lãm tiếp theo vào mùa thu 2025</Typography>
                    <Typography py={{ xs: 2, md: 3}} component='a' fontSize={{ xs: '13px', md: '16px'}} href="/visit-plan/close-location" rel="noopener noreferrer" fontWeight={600} sx={{ color: 'black'}}>
                        Xem danh sách các triển lãm hiện đang đóng cửa
                    </Typography>
                </Paper>
                {/* End kế hoạch thăm quan */}

                {/* Địa điểm và giờ làm việc */}
                <Typography py={4} sx={{ fontSize: { xs: '1.2rem', sm: '1.6rem'}}} fontWeight={600}>Địa điểm và giờ làm việc</Typography>
                <Typography sx={{ fontSize: { xs: '15px', sm: '18px'}}} fontWeight={700}>Giờ làm việc của bảo tàng</Typography>
                <Typography py={1} fontSize={{ xs: '13px', md: '16px'}}>Hơn 5000 chiếc đèn Tiffany nghệ thuật từ khắp nơi trên thế giới</Typography>
                <Typography fontSize={{ xs: '12px', md: '14px'}} target="_blank" component='a' href="#" rel="noopener noreferrer" sx={{ color: 'black'}} fontWeight={600}>Tìm hiểu thêm về bảo tàng</Typography>
                <Grid container spacing={3} sx={{ mt: 2}}>
                    <Grid size={{ xs: 12, md: 6}}>
                        <CommonImage
                            src={img}
                            alt="img"
                            sx={{ height: { xs: 200, md: 520}, width: '100%'}}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, md: 6}}>
                        <Box py={{ xs: 1, md: 2}} px={{ xs: 0, md: 5}}>
                            <Stack direction='row' mb={2}>
                                <TimerIcon sx={{ fontSize: { xs: '20px', md: '30px'}}}/>
                                <Typography fontSize={{ xs: '14px', md: '20px'}} fontWeight={600}>Thời gian mở cửa từ: 10 AM - 21 PM</Typography>
                            </Stack>
                            <Typography pb={1} sx={{ fontSize: { xs: '14px', sm: '18px'} , borderBottom: '1px solid grey'}}>Ngày trong tuần</Typography>
                            <Stack py={{ xs: 1, md: 1.5}} sx={{ borderBottom: '1px solid #E6E6E6'}} direction='row' display='flex' justifyContent='space-between'>
                                <Typography fontSize={{ xs: '13px', md: '17px'}}>Thứ Hai</Typography>
                                <Typography fontSize={{ xs: '13px', md: '17px'}}>10 AM - 21 PM</Typography>
                            </Stack>
                            <Stack py={{ xs: 1, md: 1.5}} sx={{ borderBottom: '1px solid #E6E6E6'}} direction='row' display='flex' justifyContent='space-between'>
                                <Typography fontSize={{ xs: '13px', md: '17px'}}>Thứ Ba</Typography>
                                <Typography fontSize={{ xs: '13px', md: '17px'}}>10 AM - 21 PM</Typography>
                            </Stack>
                            <Stack py={{ xs: 1, md: 1.5}} sx={{ borderBottom: '1px solid #E6E6E6'}} direction='row' display='flex' justifyContent='space-between'>
                                <Typography fontSize={{ xs: '13px', md: '17px'}}>Thứ Tư</Typography>
                                <Typography fontSize={{ xs: '13px', md: '17px'}}>10 AM - 21 PM</Typography>
                            </Stack>
                            <Stack py={{ xs: 1, md: 1.5}} sx={{ borderBottom: '1px solid #E6E6E6'}} direction='row' display='flex' justifyContent='space-between'>
                                <Typography fontSize={{ xs: '13px', md: '17px'}}>Thứ Năm</Typography>
                                <Typography fontSize={{ xs: '13px', md: '17px'}}>10 AM - 21 PM</Typography>
                            </Stack>
                            <Stack py={{ xs: 1, md: 1.5}} sx={{ borderBottom: '1px solid #E6E6E6'}} direction='row' display='flex' justifyContent='space-between'>
                                <Typography fontSize={{ xs: '13px', md: '17px'}}>Thứ Sáu</Typography>
                                <Typography fontSize={{ xs: '13px', md: '17px'}}>10 AM - 21 PM</Typography>
                            </Stack>
                            <Stack py={{ xs: 1, md: 1.5}} sx={{ borderBottom: '1px solid #E6E6E6'}} direction='row' display='flex' justifyContent='space-between'>
                                <Typography fontSize={{ xs: '13px', md: '17px'}}>Thứ Bảy</Typography>
                                <Typography fontSize={{ xs: '13px', md: '17px'}}>12 AM - 16 PM</Typography>
                            </Stack>
                            <Stack py={{ xs: 1, md: 1.5}} direction='row' display='flex' justifyContent='space-between'>
                                <Typography fontSize={{ xs: '13px', md: '17px'}}>Chủ Nhật</Typography>
                                <Typography fontSize={{ xs: '13px', md: '17px'}}>12 AM - 16 PM</Typography>
                            </Stack>
                            <Typography pt={{ xs: 1, md: 3}} fontSize={{ xs: '13px', md: '17px'}}>Đóng cửa vào các ngày lễ trọng đại không tiếp đón khách. Mong quý khách thông cảm</Typography>
                        </Box>
                    </Grid>
                </Grid>
                {/* End địa điểm và giờ làm việc */}

                {/* Mua vé */}
                <Typography py={{ xs: 2.5, md: 4}} sx={{ fontSize: { xs: '1.2rem', sm: '1.6rem'}}} fontWeight={600}>Mua vé trực tuyến</Typography>
                <Grid container spacing={{ xs: 4, md: 12}}>
                    {/* Giá vé  */}
                    <Grid size={{ xs: 12, md: 8}}>
                        <Typography mb={1} fontWeight={600} fontSize={{ xs: '15px', md: '20px'}}>Giá vé đối với người già và sinh viên</Typography>
                        <Typography mb={0.5} fontSize={{ xs: '14px', md: '16px'}} pl={{ xs: 0, md: 1}} sx={{ whiteSpace: 'normal', wordBreak: 'break-word'}}>
                            1. Giá vé đối với người già trên 65 tuổi: được miễn giảm khoản phí tham gia chương trình triển lãm và chỉ mất chi phí chi tiêu cho các sản phẩm bên ngoài
                        </Typography>
                        <Typography mb={0.5} fontSize={{ xs: '14px', md: '16px'}} pl={{ xs: 0, md: 1}} sx={{ whiteSpace: 'normal', wordBreak: 'break-word'}}>
                            2. Giá vé đối với người vị thành niên từ dưới 16 tuổi: được giảm 30% giá vé vào xem triển lãm và mất các khoản phí chi tiêu bên ngoài.
                        </Typography>
                        <Typography mb={1} fontSize={{ xs: '14px', md: '16px'}} pl={{ xs: 0, md: 1}} sx={{ whiteSpace: 'normal', wordBreak: 'break-word'}}>
                            3. Khi có sự kiện khai trương hoặc chương trình ưu đãi từ bảo tàng, các khoản giá vé sẽ thay đổi tùy theo mức độ ưu đãi của bảo tàng dành cho mỗi vị trí.
                            Vì vậy quý khách thắc mắc vui lòng góp ý với page hoặc liên hệ offline của bảo tàng
                        </Typography>
                        <Typography fontSize={{ xs: '13px', md: '15px'}} target="_blank" component='a' href="#" rel="noopener noreferrer" sx={{ color: 'black'}} fontWeight={600}>
                            Liên hệ đóng góp ý kiến của bạn
                        </Typography>

                        {/* Giá vé vào cửa chúng */}
                        <Box p={{ xs: 2, md: 4}}>
                            <Stack direction='row' mb={2}>
                                <ConfirmationNumberIcon sx={{ fontSize: { xs: '20px', md: '30px'}}}/>
                                <Typography fontSize={{ xs: '14px', md: '20px'}} fontWeight={600}>Giá vé vào cửa chung</Typography>
                            </Stack>
                            <Typography pb={1} sx={{ fontSize: { xs: '14px', sm: '18px'} , borderBottom: '1px solid grey'}}>Ngày trong tuần</Typography>
                            <Stack py={{ xs: 1, md: 1.5}} sx={{ borderBottom: '1px solid #E6E6E6'}} direction='row' display='flex' justifyContent='space-between'>
                                <Typography fontSize={{ xs: '13px', md: '16px'}}>Người trưởng thành</Typography>
                                <Typography fontSize={{ xs: '13px', md: '16px'}}>120.000 VNĐ</Typography>
                            </Stack>
                            <Stack py={{ xs: 1, md: 1.5}} sx={{ borderBottom: '1px solid #E6E6E6'}} direction='row' display='flex' justifyContent='space-between'>
                                <Typography fontSize={{ xs: '13px', md: '16px'}}>Người cao tuổi (trên 65 tuổi)</Typography>
                                <Typography fontSize={{ xs: '13px', md: '16px'}}>Miễn phí</Typography>
                            </Stack>
                            <Stack py={{ xs: 1, md: 1.5}} sx={{ borderBottom: '1px solid #E6E6E6'}} direction='row' display='flex' justifyContent='space-between'>
                                <Typography fontSize={{ xs: '13px', md: '16px'}}>Sinh viên (từ 16 tuổi trở lên)</Typography>
                                <Typography fontSize={{ xs: '13px', md: '16px'}}>80.000 VNĐ</Typography>
                            </Stack>
                            <Stack py={{ xs: 1, md: 1.5}} sx={{ borderBottom: '1px solid #E6E6E6'}} direction='row' display='flex' justifyContent='space-between'>
                                <Typography fontSize={{ xs: '13px', md: '16px'}}>Học sinh (từ dưới 16 tuổi)</Typography>
                                <Typography fontSize={{ xs: '13px', md: '16px'}}>50.000 VNĐ</Typography>
                            </Stack>
                            <Stack py={{ xs: 1, md: 1.5}} sx={{ borderBottom: '1px solid #E6E6E6'}} direction='row' display='flex' justifyContent='space-between'>
                                <Typography fontSize={{ xs: '13px', md: '16px'}}>Học sinh (từ dưới 12 tuổi)</Typography>
                                <Typography fontSize={{ xs: '13px', md: '16px'}}>20.000 VNĐ</Typography>
                            </Stack>
                            <Stack py={{ xs: 1, md: 1.5}} direction='row' display='flex' justifyContent='space-between'>
                                <Typography fontSize={{ xs: '13px', md: '16px'}}>Trẻ em (0 - 3 tuổi)</Typography>
                                <Typography fontSize={{ xs: '13px', md: '16px'}}>Miễn phí</Typography>
                            </Stack>
                            <Typography pt={{ xs: 1, md: 2}} fontSize={{ xs: '13px', md: '17px'}}>Giá vé tại đây đã bao gồm thuế VAT và các khoản phí thăm quan toàn bộ bảo tàng</Typography>
                            <Box py={4}>
                                <Button
                                    variant="contained"
                                    sx={{
                                        color: 'white',
                                        height: { xs: 35, md: 40},
                                        width: 120,
                                        background: 'linear-gradient(45deg, #D30000 30%, #780000 90%)',
                                        fontSize: { xs: '14px', md: '16px'},
                                        mr: 2,
                                        borderRadius: '0'
                                    }}
                                >
                                    Mua vé
                                </Button>
                                <Button
                                    variant="outlined"
                                    sx={{ 
                                        border: '1px solid black', color: 'black',
                                        height: { xs: 35, md: 40},
                                        width: { xs: 160, md: 180},
                                        fontSize: { xs: '14px', md: '16px'},
                                        borderRadius: '0'
                                    }}
                                >
                                    Đăng ký thành viên
                                </Button>
                            </Box>
                        </Box>
                        {/* End giá vé vào cửa chúng */}
                    </Grid>
                    {/* End giá vé  */}

                    {/* Đặt chỗ  */}
                    <Grid size={{ xs: 12, md: 4}}>
                        <Typography mb={1} fontWeight={600} fontSize={{ xs: '15px', md: '20px'}}>Đặt chỗ trực tuyến</Typography>
                        <Typography mb={0.5} fontSize={{ xs: '14px', md: '16px'}} pl={{ xs: 0, md: 1}} sx={{ whiteSpace: 'normal', wordBreak: 'break-word'}}>
                            1. Khi vào bên trong bảo tàng bạn vui lòng xuất trình vé đã mua trực tuyến để bảo vệ kiểm tra.
                        </Typography>
                        <Typography mb={0.5} fontSize={{ xs: '14px', md: '16px'}} pl={{ xs: 0, md: 1}} sx={{ whiteSpace: 'normal', wordBreak: 'break-word'}}>
                            2. Tất cả tiền phí bạn mua vé đã bao gồm toàn bộ lộ phí thăm quan tất cả các điểm trong bảo tàng.
                        </Typography>
                        <Typography mb={0.5} fontSize={{ xs: '14px', md: '16px'}} pl={{ xs: 0, md: 1}} sx={{ whiteSpace: 'normal', wordBreak: 'break-word'}}>
                            3. Đối với người đăng ký thành viên sẽ được giảm giá ưu đãi không giới hạn. Hãy quét thẻ thành viên của bạn tại lối vào
                        </Typography>
                        <Typography mb={2} fontSize={{ xs: '14px', md: '16px'}} pl={{ xs: 0, md: 1}} sx={{ whiteSpace: 'normal', wordBreak: 'break-word'}}>
                            4. Đối với các nhóm từ 20 người trở lên khi thăm quan bảo tàng sẽ nhận được ưu đãi hấp dẫn.
                        </Typography>
                        <Paper sx={{ borderRadius: '8px', p: { xs: 1, md: 2}, border: '1px solid #D30000', bgcolor: '#f5f5f5', mb: 2}}>
                            <Typography fontSize={{ xs: '14px', md: '16px'}} sx={{ whiteSpace: 'normal', wordBreak: 'break-word'}}>
                                Đối với các trường hợp khách hàng mua vé trực tuyế phải có địa chỉ tại Việt Nam. Mỗi vé mua sẽ yêu cầu phải có giấy tờ tùy thân để xác minh
                                thân phận của bạn. Sau khi mua vé hệ thống sẽ gửi hóa đơn về email của bạn, vé đã mua không thể hủy bỏ và phải thanh toán trước. Quý khách vui
                                lòng chấp hành quy định mua vé trực tuyến của bảo tàng.
                            </Typography>
                        </Paper>
                        <Typography fontSize={{ xs: '13px', md: '15px'}} target="_blank" component='a' href="#" rel="noopener noreferrer" sx={{ color: 'black'}} fontWeight={600}>
                            Đăng ký thẻ thành viên tại đây
                        </Typography>
                    </Grid>
                    {/* End đặt chỗ  */}
                </Grid>

                {/* End mua vé */}

                {/* Tìm hiểu về bảo tàng */}
                <Typography py={{ xs: 2.5, md: 1}} sx={{ fontSize: { xs: '1.2rem', sm: '1.8rem'}}} fontWeight={600}>Tìm hiểu về bảo tàng</Typography>
                <Grid mt={{ xs: 0, md: 3}} container spacing={3}>
                    {DATA_ABOUT_MUSEUM.map((item, index) => {
                        return(
                            <Grid size={{ xs: 12, md: 6}}>
                                <Box sx={{ cursor: 'pointer'}} onClick={() => navigate(`${item.url}`)} border='1px solid black' p={2} borderRadius={2} display='flex' justifyContent='space-between'>
                                    <Stack direction='column'>
                                        <Typography fontWeight={600} fontSize={{ xs: '14px', md: '18px'}}>{item.title}</Typography>
                                        <Typography fontSize={{ xs: '12px', md: '16px'}}>{item.label}</Typography>
                                    </Stack>
                                    <IconButton
                                        handleFunt={() => {}}
                                        icon={<NavigateNextIcon sx={{ color: 'white'}}/>}
                                        borderRadius='50%'
                                        backgroundColor="black"
                                        sx={{ 
                                            mt: 1.5,
                                            height:{ xs: 25, md: 35},
                                            width:{ xs: 25, md: 35},
                                        }}
                                    />
                                </Box>
                            </Grid>
                        )
                    })}
                </Grid>
                {/* End tìm hiểu về bảo tàng */}

                
            </Box>
            {/* Triễn lãm đang mở */}
                <LiveStream title="Triễn lãm đang mở"/>
            {/* End triễn lãm đang mở */}
        </Box>
    )
}

export default VisitPlan;