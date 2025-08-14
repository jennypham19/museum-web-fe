import IconButton from "@/components/IconButton/IconButton";
import { ArrowBack, Report } from "@mui/icons-material";
import { Box, Button, Paper, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import Grid from "@mui/material/Grid2";
import PayTotalBill from "./PayTotalBill";

interface ShoppingCartOfYouProps{
    handleBack: () => void;
    total: number
}
const ShoppingCartOfYou: React.FC<ShoppingCartOfYouProps> = ({ handleBack, total }) => {
    const [openPayTotalBill, setOpenPayTotalBill] = useState(false);
    const handleOpenPayTotalBill = () => {
        setOpenPayTotalBill(true)
    }
    return(
        <>
        {!openPayTotalBill && (
            <Box px={{ xs: 3, md: 6}} mb={{ xs: 2, md: 6}}>
                <Box borderBottom='1px solid grey' display='flex' flexDirection='row' mb={2.5} mt={{ xs: 4, md: 5}}>
                    <IconButton
                        handleFunt={handleBack}
                        icon={<ArrowBack sx={{ width: { xs: 20, md: 20}, height: { xs: 20, md: 20}, color: '#000'}}/>}
                        title="Quay lại"
                    />
                    <Typography fontSize={{ xs: '1.2rem', sm: '1.8rem'}} fontWeight={600}>Giỏ hàng của bạn</Typography>
                </Box>
                <Paper sx={{ bgcolor: '#E6E6E6', p: { xs: 3, md: 4}, display: 'flex', flexDirection: 'column', borderRadius: '10px'}}>
                    <Stack direction='row' mb={2}>
                        <Report sx={{ fontSize: { xs: '20px', md: '30px'}}}/>
                            <Typography px={{ xs: 1, md: 2}} fontSize={{ xs: '14px', md: '20px'}} fontWeight={600}>
                                Lưu ý
                            </Typography>
                    </Stack>
                    <Typography fontWeight={500} fontSize={{ xs: '13px', md: '17px'}}>
                        Kiểm tra kỹ các thông tin đặt hàng của bạn tại đây. Tránh sai sót về thời điểm, số lượng người tham gia và giờ tham gia thăm quan tại bảo tàng
                    </Typography>
                </Paper>

                {/* Kiểm tra thông tin */}
                <Grid container spacing={3}>
                    <Grid size={{ xs: 12, md: 8}}>
                        <Typography py={4} sx={{ fontSize: { xs: '1.2rem', sm: '1.6rem'}}} fontWeight={600}>Kiểm tra thông tin</Typography>
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
                            mt={4}
                            display='flex' 
                            flexDirection='column'
                            sx={{ boxShadow: '0px 1px 3px 1px rgba(0, 0, 0, 0.15), 0px 1px 2px 0px rgba(0, 0, 0, 0.3)'}}
                            p={2}
                            borderRadius={2}
                        >
                            <Typography pb={1} borderBottom='1px solid #000' fontWeight={700}>Thông tin gửi xe</Typography>
                            <Stack py={0.5} borderBottom='1px solid #E6E6E6' direction='row' display='flex' justifyContent='space-between'>
                                <Stack width='30%' direction='row' display='flex' justifyContent='space-between'>
                                    <Typography sx={{ fontSize: { xs: '14px', md: '15px'}}}>Loại xe</Typography>
                                    <Typography sx={{ fontSize: { xs: '14px', md: '15px'}}}>Số lượng</Typography> 
                                </Stack>
                                <Typography sx={{ fontSize: { xs: '14px', md: '15px'}}} fontWeight={600}>Tổng thanh toán</Typography>
                            </Stack>
                            <Stack py={0.5} direction='row' display='flex' justifyContent='space-between'>
                                <Stack width='30%' direction='row' display='flex' justifyContent='space-between'>
                                    <Typography sx={{ fontSize: { xs: '14px', md: '15px'}}}>Xe máy</Typography>
                                    <Typography sx={{ fontSize: { xs: '14px', md: '15px'}}}>02</Typography> 
                                </Stack>
                                <Typography sx={{ fontSize: { xs: '14px', md: '15px'}}}>Thanh toán trực tiếp</Typography>
                            </Stack>
                        </Box>
                    </Grid>
                    <Grid size={{ xs: 12, md: 4}}>
                                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 'auto'}}>
                                    <Box
                                        sx={{
                                            mt: {xs: 2, md: 4},
                                            boxShadow: '0px 1px 3px 1px rgba(0, 0, 0, 0.15), 0px 1px 2px 0px rgba(0, 0, 0, 0.3)',
                                            width: { xs: '100%', md: '70%'},
                                            display: 'flex', flexDirection: 'column', p: { xs: 2, md: 4}, borderRadius: 2, bgcolor: 'white'
                                        }}
                                    >
                                        <Stack mb={1} direction='row' display='flex' justifyContent='space-between'>
                                            <Typography fontWeight={700}>Tổng thanh toán</Typography>
                                            {total ? <Typography>{`${total}.000 VNĐ`}</Typography> : <Typography>{`0 VNĐ`}</Typography>}
                                        </Stack>
                                        <Button
                                            variant="contained"
                                            fullWidth
                                            sx={{
                                                color: 'white',
                                                height: 40,
                                                background: 'linear-gradient(45deg, #D30000 30%, #780000 90%)',
                                                fontSize: '18px', mt: 2
                                            }}
                                            onClick={handleOpenPayTotalBill}
                                        >
                                            Mua vé
                                        </Button>
                                    </Box>
                                </Box>
                    </Grid>
                </Grid>
                {/* End kiểm tra thông tin */}
            </Box>
        )}
        {openPayTotalBill && (
            <PayTotalBill
                handleBack={() => {
                    setOpenPayTotalBill(false)
                }}
            />
        )}
        </>
    )
}

export default ShoppingCartOfYou;