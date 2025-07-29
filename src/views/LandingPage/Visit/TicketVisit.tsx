import IconButton from "@/components/IconButton/IconButton";
import { Home, Report } from "@mui/icons-material";
import { Box, Button, Divider, Paper, Stack, Typography } from "@mui/material"
import { useNavigate } from "react-router-dom";
import ticket_image from "@/assets/images/users/ticket_image.png";
import Grid from "@mui/material/Grid2";
import { DATA_TICKET_LOCATION } from "@/constants/data";
import CommonImage from "@/components/Image/index";
import React, { useRef, useState } from "react";
import SignpostIcon from '@mui/icons-material/Signpost';
import DetailContentAboutLoction from "./components/DetailContentAboutLocation";
import ShoppingCartOfYou from "./components/ShoppingCartOfYou";

const TicketVisit = () => {
    const navigate = useNavigate();
    const locationRef = useRef<HTMLDivElement>(null);
    const locationContentDetailRef = useRef<HTMLDivElement>(null);
    const [openContentWhenClickLocation, setOpenContentWhenClickLocation] = useState(false);
    const [isClick, setIsClick] = useState(false);
    const [idDetailContentLocation, setIdDetailContentLocation] = useState<number | null>(null);
    const [total, setTotal] = useState<number | null>(null);
    const [openShoppingCard, setOpenShoppingCard] = useState(false);
    const [openPayingBill, setOpenPayingBill] = useState(false);
    
    const scrollToLocation = () => {
        locationRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const scrollToLocationContentDetail = () => {
        setTimeout(() => {
            locationContentDetailRef.current?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
    };

    const handleClick = (id: number) => {
        setIdDetailContentLocation(id)
        setIsClick(true)
        setOpenContentWhenClickLocation(true);
        scrollToLocationContentDetail()
    }

    const totalPrice = (total: number) => {
        setTotal(total)
    }

    const handleOpenShoppingCart = () => {
        setOpenShoppingCard(true)
    }
  
    return(
        <Box>
            <Box display='flex' flexDirection='row' py={{ xs: 0, md: 1.5}} px={{xs: 2, md: 10}}>
                <IconButton
                    handleFunt={() => navigate('/home')}
                    icon={<Home sx={{ width: { xs: 20, md: 30}, height: { xs: 20, md: 30}, color: '#000'}}/>}
                />
                <Typography mt={{ xs: 1, md: 1}} fontWeight={600} fontSize={{ xs: '12px', md: '18px'}}>/ Mua vé thăm quan</Typography>
            </Box>
            <Box
                sx={{
                    height: { xs: 300, md: 480},
                    width: '100%',
                    backgroundImage: `url(${ticket_image})`,
                    backgroundSize:'cover',
                    backgroundPosition: 'center'
                }}
            />
            {!openShoppingCard && (
                <Box px={{ xs: 3, md: 6}} mb={{ xs: 2, md: 6}}>
                    {/* Vé thăm quan dành cho bạn */}
                    <Box mb={1} mt={{ xs: 4, md: 5}}>
                        <Typography fontSize={{ xs: '1.2rem', sm: '1.8rem'}} borderBottom='1px solid grey' fontWeight={600}>Vé thăm quan dành cho bạn</Typography>
                        <Stack py={2} direction={{ xs: 'column', md: 'row'}}>
                            <Typography pr={{ xs: 0, md: 2}} fontSize={{ xs: '14px', md: '18px'}}>Địa điểm hot gần đây:</Typography>
                            <Typography px={{ xs: 0, md: 2}} fontSize={{ xs: '14px', md: '18px'}} fontWeight={600}>
                                Triễn lãm "Ánh dương xanh"
                            </Typography>
                            <Typography px={{ xs: 0, md: 2}} fontSize={{ xs: '14px', md: '18px'}} fontWeight={600}>
                                Chương trình khai trương
                            </Typography>
                            <Typography px={{ xs: 0, md: 2}} fontSize={{ xs: '14px', md: '18px'}} fontWeight={600}>
                                Tiffany và các tác phẩm
                            </Typography>
                            <Typography px={{ xs: 0, md: 2}} fontSize={{ xs: '14px', md: '18px'}} fontWeight={600}>
                                Khu triển lãm nghệ thuật
                            </Typography>
                        </Stack>
                    </Box>
                    <Paper sx={{ bgcolor: '#E6E6E6', p: { xs: 3, md: 4}, display: 'flex', flexDirection: 'column', borderRadius: '10px'}}>
                        <Stack direction='row' mb={2}>
                            <Report sx={{ fontSize: { xs: '20px', md: '30px'}}}/>
                            <Typography px={{ xs: 1, md: 2}} fontSize={{ xs: '14px', md: '20px'}} fontWeight={600}>
                                Lưu ý
                            </Typography>
                        </Stack>
                        <Typography fontWeight={500} fontSize={{ xs: '13px', md: '17px'}}>
                            Trường hợp được miễn phí vé vào cửa bạn vẫn phải thêm số lượng người dưới hàng vé để chúng tôi kiểm soát được số lượng khách hàng trong buổi triển lãm
                        </Typography>
                        <Typography py={{ xs: 2, md: 3}} component='a' fontSize={{ xs: '13px', md: '16px'}} href="#" rel="noopener noreferrer" fontWeight={600} sx={{ color: 'black'}}>
                            Tìm hiểu về quy định của bảo tàng
                        </Typography>
                    </Paper>
                    {/* End vé thăm quan dành cho bạn */}

                    {/* Địa điểm bạn tới */}
                    <Grid container spacing={3}>
                        <Grid size={{ xs: 12, md: 8}}>
                            <Typography py={4} sx={{ fontSize: { xs: '1.2rem', sm: '1.6rem'}}} fontWeight={600}>Địa điểm bạn tới</Typography>
                            <Typography sx={{ fontSize: { xs: '15px', sm: '18px'}}} fontWeight={700}>
                                Lựa chọn địa điểm bạn tới
                            </Typography>
                            <Typography py={1} fontSize={{ xs: '13px', md: '15px'}}>
                                Lựa chọn một địa điểm trong các địa điểm dưới đây
                            </Typography>
                            <Typography fontSize={{ xs: '12px', md: '14px'}} target="_blank" component='a' href="#" rel="noopener noreferrer" sx={{ color: 'black'}} fontWeight={600}>
                                Tìm hiểu thêm về bảo tàng
                            </Typography>
                            <Box ref={locationRef} display='flex' flexDirection='column'>
                                {DATA_TICKET_LOCATION.map((data, index) => {
                                    return(
                                        <Paper onClick={() => handleClick(data.id)} key={index} 
                                            sx={{ 
                                                boxShadow: '0px 1px 3px 1px rgba(0, 0, 0, 0.03), 0px 1px 2px 0px rgba(0, 0, 0, 0.3)',
                                                my: 2,
                                                display: 'flex',
                                                flexDirection: { xs: 'column', md: 'row'},
                                                cursor: 'pointer',
                                                bgcolor: isClick && idDetailContentLocation === index + 1 ? 'black' : 'white',
                                                color: isClick && idDetailContentLocation === index + 1 ? 'white' : 'black'
                                            }}>
                                            <CommonImage
                                                src={data.image_url}
                                                alt={data.title}
                                                sx={{ width: { xs: '100%', md: 500}, height: { xs: 200, md: 250}, p: 2}}
                                            />
                                            <Box py={{ xs: 1, md: 5}} px={2} display='flex' flexDirection='column' width='100%'>
                                                <Stack pb={1} direction='row' borderBottom='1px solid'>
                                                    <SignpostIcon sx={{ fontSize: { xs: '20px', md: '30px'}}}/>
                                                    <Typography fontSize={{ xs: '15px', md: '20px'}} fontWeight={700}>{data.title}</Typography>
                                                </Stack>
                                                <Box display='flex' justifyContent='space-between' flexDirection='column'>
                                                        {data.open.split('\n').map((item, index) => {
                                                            const openLength = data.open.split('\n')
                                                            return (
                                                                <React.Fragment key={index}>
                                                                    <Stack direction='row' justifyContent='space-between' alignItems='center' py={1}>
                                                                        <Typography fontSize={{ xs: '12px', md: '15px'}}>{item}</Typography>
                                                                        <Typography fontSize={{ xs: '12px', md: '15px'}}>{data.hour.split('\n')[index]}</Typography>
                                                                    </Stack>
                                                                    {openLength?.length - 1 > index && <Divider />}
                                                                </React.Fragment>
                                                            )
                                                        })}
                                                </Box>
                                            </Box>
                                        </Paper>
                                        )
                                    })}
                            </Box>
                            <Typography py={4} sx={{ fontSize: { xs: '1.2rem', sm: '1.6rem'}}} fontWeight={600}>Ngày bạn đi thăm quan</Typography> 
                            <Typography sx={{ fontSize: { xs: '15px', sm: '18px'}}} fontWeight={700}>
                                Lựa chọn ngày bạn thăm quan
                            </Typography>
                            {!openContentWhenClickLocation ? (
                                <>
                                    <Typography py={1} fontSize={{ xs: '13px', md: '15px'}}>
                                        Lựa chọn một địa điểm để xem ngày hoạt động
                                    </Typography>
                                    <Typography fontSize={{ xs: '12px', md: '14px'}} onClick={scrollToLocation} sx={{ color: 'black', cursor: 'pointer', textDecoration: 'underline'}} fontWeight={600}>
                                        Xem các địa điểm
                                    </Typography>                            
                                </>
                            ) : (
                                <DetailContentAboutLoction locationId={idDetailContentLocation} ref={locationContentDetailRef} totalPrice={totalPrice}/>
                            )}
                        
                        </Grid>
                        <Grid size={{ xs: 12, md: 4}} sx={{ display: 'flex', flexDirection: 'column' }}>
                            {/* Nút hoặc nội dung muốn đẩy xuống đáy */}
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
                                        onClick={handleOpenShoppingCart}
                                        disabled={!total}
                                    >
                                        Mua vé
                                    </Button>
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>

                    {/* End địa điểm bạn tới */}
                </Box>
            )}
            {/* Giỏ hàng của bạn */}
            {openShoppingCard && total && (
                <ShoppingCartOfYou
                    handleBack={() => {
                        setOpenShoppingCard(false)
                        handleClick
                    }}
                    total={total}
                />
            )}
            {/* End giỏ hàng của bạn */}
        </Box>
    )
}

export default TicketVisit;