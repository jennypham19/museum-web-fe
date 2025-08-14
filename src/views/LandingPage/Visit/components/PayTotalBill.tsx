import IconButton from "@/components/IconButton/IconButton";
import { ArrowBack, MenuBook, Timer } from "@mui/icons-material";
import { Box, Paper, Stack, Typography } from "@mui/material";
import React from "react";
import Grid from "@mui/material/Grid2";
import QRBank from "./QRbank";
import CommonImage from "@/components/Image/index";
import QRbank from "@/assets/images/users/QRbank.png"

interface PayTotalBillProps{
    handleBack: () => void;
}
const PayTotalBill: React.FC<PayTotalBillProps> = ({ handleBack }) => {
    return(
        <Box px={{ xs: 3, md: 6}} mb={{ xs: 2, md: 6}}>
            <Box borderBottom='1px solid grey' display='flex' flexDirection='row' mb={2.5} mt={{ xs: 4, md: 5}}>
                <IconButton
                    handleFunt={handleBack}
                    icon={<ArrowBack sx={{ width: { xs: 20, md: 20}, height: { xs: 20, md: 20}, color: '#000'}}/>}
                    title="Quay lại"
                />
                <Typography fontSize={{ xs: '1.2rem', sm: '1.8rem'}} fontWeight={600}>Thanh toán tổng chi phí</Typography>
            </Box>

            {/* Kiểm tra thông tin */}
            <Grid container spacing={3} sx={{ mt: { xs: 2, md: 5}}}>
                <Grid size={{ xs: 12, md: 8}}>
                    <Box 
                        display='flex' 
                        flexDirection='column'
                        sx={{ boxShadow: '0px 1px 3px 1px rgba(0, 0, 0, 0.15), 0px 1px 2px 0px rgba(0, 0, 0, 0.3)'}}
                        p={2}
                        borderRadius={2}
                    >
                        <Typography pb={1} borderBottom='1px solid #000' fontWeight={700}>Thông tin xuất hóa đơn vé</Typography>
                        <Stack py={0.5} borderBottom='1px solid #E6E6E6' direction='row' display='flex' justifyContent='space-between'>
                            <Typography sx={{ fontSize: { xs: '14px', md: '15px'}}}>Tổng thanh toán</Typography>
                            <Typography sx={{ fontSize: { xs: '14px', md: '15px'}}} fontWeight={600}>Thứ hai_30 th06, 2025</Typography>
                        </Stack>
                        <Stack py={0.5} direction='row' display='flex' justifyContent='space-between'>
                            <Typography sx={{ fontSize: { xs: '14px', md: '15px'}}}>120.000VNĐ</Typography>
                            <Typography sx={{ fontSize: { xs: '14px', md: '15px'}}}>Người trưởng thành</Typography>
                        </Stack>
                        <Stack py={0.5} direction='row' display='flex' justifyContent='space-between'>
                            <Typography sx={{ fontSize: { xs: '14px', md: '15px'}}}>Miễn phí</Typography>
                            <Typography sx={{ fontSize: { xs: '14px', md: '15px'}}}>Người cao tuổi (trên 65 tuổi)</Typography>
                        </Stack>
                        <Stack py={0.5} direction='row' display='flex' justifyContent='space-between'>
                            <Typography sx={{ fontSize: { xs: '14px', md: '15px'}}}>80.000VNĐ</Typography>
                            <Typography sx={{ fontSize: { xs: '14px', md: '15px'}}}>Sinh viên (từ 16 tuổi trở nên)</Typography>
                        </Stack>
                        <Stack py={0.5} direction='row' display='flex' justifyContent='space-between'>
                            <Typography sx={{ fontSize: { xs: '14px', md: '15px'}}}>20.000VNĐ</Typography>
                            <Typography sx={{ fontSize: { xs: '14px', md: '15px'}}}>Học sinh (từ dưới 12 tuổi)</Typography>
                        </Stack>
                    </Box>
                    <Box 
                        my={4}
                        display='flex' 
                        flexDirection='column'
                        sx={{ boxShadow: '0px 1px 3px 1px rgba(0, 0, 0, 0.15), 0px 1px 2px 0px rgba(0, 0, 0, 0.3)'}}
                        p={2}
                        borderRadius={2}
                    >
                        <Stack py={0.5} direction='row' display='flex' justifyContent='space-between'>
                            <Stack direction='row'>
                                <Timer/>
                                <Typography fontWeight={600}> Thời gian thanh toán còn lại</Typography>
                            </Stack>
                            <Typography variant="h5" sx={{ color: '#D30000'}} fontWeight={700}>15:00:00</Typography>
                        </Stack>
                    </Box>
                    <Paper sx={{ bgcolor: '#E6E6E6', p: { xs: 3, md: 4}, display: 'flex', flexDirection: 'column', borderRadius: '10px'}}>
                        <Stack direction='row' mb={2}>
                            <MenuBook sx={{ fontSize: { xs: '20px', md: '30px'}}}/>
                            <Typography px={{ xs: 1, md: 2}} fontSize={{ xs: '14px', md: '20px'}} fontWeight={600}>
                                Hướng dẫn thanh toán
                            </Typography>
                        </Stack>
                        <Typography fontSize={{ xs: '13px', md: '17px'}}>
                            1. Bước 1: Bạn quét mã thanh toán bên tay phải bằng cách vào <b>Ứng dụng ngân hàng &gt; Chọn quét mã QR &gt; Thanh toán</b>
                        </Typography>
                        <Typography fontSize={{ xs: '13px', md: '17px'}}>
                            2. Bước 2: Sau khi bạn quét mã thanh toán, màn hình website sẽ tự động hiển thị trạng thái thanh toán thành công. <b>Bạn vui lòng chờ khoảng 15 giây</b>
                        </Typography>
                        <Typography fontSize={{ xs: '13px', md: '17px'}}>
                            3. Bước 3: Sau khi thanh toán thành công tin nhắn sẽ tự động gửi về email của bạn <b>Hãy giữ tin nhắn email và đến quầy nhận vé tại bảo tàng</b>
                        </Typography>
                    </Paper>
                </Grid>
                <Grid size={{ xs: 12, md: 4}}>
                    <Box display='flex' justifyContent='center'>
                        <CommonImage
                            src={QRbank}
                            sx={{ height: 500}}
                        />
                        {/* <QRBank
                            accountName="NGUYEN THI HOA"
                            accountNumber="21410002642929"
                            bankName="Ngân hàng TMCP Đầu tư và Phát triển Việt Nam"
                            qrValue="https://img.vietqr.io/image/BIDV-21410002642929-compact.png"
                        /> */}
                    </Box>
                </Grid>
            </Grid>
            {/* End kiểm tra thông tin */}
        </Box>
    )
}

export default PayTotalBill;