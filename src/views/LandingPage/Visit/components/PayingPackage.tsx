import { IPackageMember } from "@/types/landingpage";
import { FormDataMember } from "./InfomationMember";
import React, { useState } from "react";
import { Box, Button, Paper, Stack, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import IconButton from "@/components/IconButton/IconButton";
import { ArrowBack, MenuBook } from "@mui/icons-material";
import CommonImage from "@/components/Image/index";
import QRbank from "@/assets/images/users/QRbank.png"

interface PayingPackageProps{
    formDataMember: FormDataMember;
    inforMember: IPackageMember,
    handleBack: () => void;
}

const PayingPackage: React.FC<PayingPackageProps> = ({ formDataMember, inforMember, handleBack }) => {
    const [openBuyTicket, setOpenBuyTicket] = useState(false)

    const handleBuyTicket = () => {
        setOpenBuyTicket(true)
    }
    return(
        <Box px={{ xs: 3, md: 10}} mb={{ xs: 2, md: 6}}>
            <Box borderBottom='1px solid grey' display='flex' flexDirection='row' mb={1} mt={{ xs: 4, md: 5}}>
                <IconButton
                    handleFunt={handleBack}
                    icon={<ArrowBack sx={{ width: { xs: 20, md: 20}, height: { xs: 20, md: 20}, color: '#000'}}/>}
                    title="Quay lại"
                />
                <Typography fontSize={{ xs: '1.2rem', sm: '1.8rem'}} fontWeight={600}>Thanh toán gói hội viên</Typography>
            </Box>
            <Stack py={1.5} direction={{ xs: 'column', md: 'row'}}>
                <Typography px={{ xs: 0, md: 2}} fontSize={{ xs: '14px', md: '18px'}}>Thông tin cơ bản:</Typography>
                {['Họ tên', 'Email', 'Số điện thoại', 'Ngày gia nhập', 'Ngày hết hạn', 'Quyền lợi']. map((item, index) => (
                    <Typography 
                        key={index}
                        px={{ xs: 0, md: 2}}
                        fontSize={{ xs: '14px', md: '18px'}}
                        fontWeight={600}
                    >
                        {item}
                    </Typography>
                ))}
            </Stack>
            <Grid container spacing={3}>
                <Grid size={{ xs: 12, md: 8}}>
                    <Box pr={{ xs: 0, md: 20}}>
                        <Box 
                            display='flex' 
                            flexDirection='column'
                            sx={{ boxShadow: '0px 1px 3px 1px rgba(0, 0, 0, 0.15), 0px 1px 2px 0px rgba(0, 0, 0, 0.3)'}}
                            p={2}
                            borderRadius={2}
                        >
                            <Typography pb={1} borderBottom='1px solid #000' fontWeight={700}>Thông tin thành viên</Typography>
                            <Stack py={0.5} borderBottom='1px solid #E6E6E6' direction='row' display='flex' justifyContent='space-between'>
                                <Typography sx={{ fontSize: { xs: '14px', md: '15px'}}}>{formDataMember.full_name}</Typography>
                                <Typography sx={{ fontSize: { xs: '14px', md: '15px'}}} fontWeight={600}>{`Thành viên ${inforMember.title}`}</Typography>
                            </Stack>
                            <Stack py={0.5} direction='row' display='flex' justifyContent='space-between'>
                                <Typography sx={{ fontSize: { xs: '14px', md: '15px'}}}>Email</Typography>
                                <Typography sx={{ fontSize: { xs: '14px', md: '15px'}}}>{formDataMember.email}</Typography>
                            </Stack>
                            <Stack py={0.5} direction='row' display='flex' justifyContent='space-between'>
                                <Typography sx={{ fontSize: { xs: '14px', md: '15px'}}}>Số điện thoại</Typography>
                                <Typography sx={{ fontSize: { xs: '14px', md: '15px'}}}>{formDataMember.phone}</Typography>
                            </Stack>
                            <Stack py={0.5} direction='row' display='flex' justifyContent='space-between'>
                                <Typography sx={{ fontSize: { xs: '14px', md: '15px'}}}>Quyền lợi</Typography>
                                <Typography sx={{ fontSize: { xs: '14px', md: '15px'}}}>{inforMember.title}</Typography>
                            </Stack>
                        </Box>
                    </Box>
                </Grid>
                <Grid size={{ xs: 12, md: 4}}>
                    <Box
                        sx={{
                            mt: {xs: 2, md: 4},
                            boxShadow: '0px 1px 3px 1px rgba(0, 0, 0, 0.15), 0px 1px 2px 0px rgba(0, 0, 0, 0.3)',
                            display: 'flex', flexDirection: 'column', p: { xs: 2, md: 4}, borderRadius: 2, bgcolor: 'white'
                        }}
                    >
                        <Stack mb={1} direction='row' display='flex' justifyContent='space-between'>
                            <Typography fontWeight={700}>Tổng thanh toán</Typography>
                            {inforMember ? <Typography>{`${inforMember.price} VNĐ`}</Typography> : <Typography>{`0 VNĐ`}</Typography>}
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
                            onClick={handleBuyTicket}
                            disabled={!!openBuyTicket}
                        >
                            Mua vé
                        </Button>
                    </Box>
                </Grid>
            </Grid>

            <Grid container spacing={3} sx={{ mt: 5}}>
                <Grid size={{ xs: 12, md: 4}}>
                    {openBuyTicket && (
                        <CommonImage
                            src={QRbank}
                            sx={{ height: 500}}
                        />
                    )}
                </Grid>
                <Grid size={{ xs: 12, md: 8}}>
                    <Box pl={{ xs: 0, md: 20}}>
                        <Box 
                            display='flex' 
                            flexDirection='column'
                            sx={{ boxShadow: '0px 1px 3px 1px rgba(0, 0, 0, 0.15), 0px 1px 2px 0px rgba(0, 0, 0, 0.3)'}}
                            p={2}
                            borderRadius={2}
                        >
                            <Typography pb={1} borderBottom='1px solid #000' fontWeight={700}>Thông tin xuất hóa đơn</Typography>
                            <Stack py={0.5} borderBottom='1px solid #E6E6E6' direction='row' display='flex' justifyContent='space-between'>
                                <Typography sx={{ fontSize: { xs: '14px', md: '15px'}}}>Thổng thanh toán</Typography>
                                <Typography sx={{ fontSize: { xs: '14px', md: '15px'}}} fontWeight={600}>{`Thành viên ${inforMember.price}`}</Typography>
                            </Stack>
                            <Stack py={0.5} direction='row' display='flex' justifyContent='space-between'>
                                <Typography sx={{ fontSize: { xs: '14px', md: '15px'}}}>Số lượng</Typography>
                                <Typography sx={{ fontSize: { xs: '14px', md: '15px'}}}>01 gói</Typography>
                            </Stack>
                            <Stack py={0.5} direction='row' display='flex' justifyContent='space-between'>
                                <Typography sx={{ fontSize: { xs: '14px', md: '15px'}}}>Thành viên</Typography>
                                <Typography sx={{ fontSize: { xs: '14px', md: '15px'}}}>{`${inforMember.members} thành viên`}</Typography>
                            </Stack>
                            <Stack py={0.5} direction='row' display='flex' justifyContent='space-between'>
                                <Typography sx={{ fontSize: { xs: '14px', md: '15px'}}}>Quyền lợi</Typography>
                                <Typography sx={{ fontSize: { xs: '14px', md: '15px'}}}>{inforMember.title}</Typography>
                            </Stack>
                        </Box>
                        <Paper sx={{ bgcolor: '#E6E6E6', p: { xs: 3, md: 4}, display: 'flex', flexDirection: 'column', borderRadius: '10px', mt: 5}}>
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
                    </Box>
                </Grid>
            </Grid>
        </Box>
    )
}

export default PayingPackage;