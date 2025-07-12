import Grid from "@mui/material/Grid2";
import image_ticket from "@/assets/images/users/image_ticket.png"
import CommonImage from "@/components/Image/index";
import { Box, Button, Stack, Typography } from "@mui/material";
import { ArrowForward } from "@mui/icons-material";

const InforOfTicket = () => {
    return(
        <Grid container>
            <Grid size={{ xs: 12, md: 6}}>
                <Box color='white' pt={{ xs: 3, lg: 8}} pb={{ xs: 2, lg: 3}} bgcolor='#160E0D'>
                    <Box margin='auto' px={{ xs: 2, md: 10}} display='flex' flexDirection='column' >
                        <Typography sx={{ fontSize: { xs: '20px', lg: '35px'}}} fontWeight={700}>Thông tin vé vào cửa</Typography>
                        <Box py={1} borderBottom='1px solid white'>
                            <Typography variant="body2" fontWeight={600}> Giá vé bán</Typography>
                        </Box>
                        <Grid container spacing={2}>
                            <Grid size={{ xs: 6}} >
                                <Stack my={2} direction='column' sx={{ borderRight: '1px solid white'}}>
                                    <Typography sx={{ fontSize: { xs: '14px', md: '16px'}}}>Người già</Typography>
                                    <Typography sx={{ fontSize: { xs: '14px', md: '16px'}}}>Người trưởng thành</Typography>
                                    <Typography sx={{ fontSize: { xs: '14px', md: '16px'}}}>Sinh viên</Typography>
                                    <Typography sx={{ fontSize: { xs: '14px', md: '16px'}}}>Trẻ vị thành niên</Typography>
                                </Stack>
                            </Grid>
                            <Grid size={{ xs: 6}}>
                                <Stack my={2} direction='column' display='flex' alignItems='end'>
                                    <Typography sx={{ fontSize: { xs: '14px', md: '16px'}}}>30.000 VNĐ</Typography>
                                    <Typography sx={{ fontSize: { xs: '14px', md: '16px'}}}>60.000 VNĐ</Typography>
                                    <Typography sx={{ fontSize: { xs: '14px', md: '16px'}}}>35.000 VNĐ</Typography>
                                    <Typography sx={{ fontSize: { xs: '14px', md: '16px'}}}>20.000 VNĐ</Typography>
                                </Stack> 
                            </Grid>
                        </Grid>
                        <Box py={1} borderBottom='1px solid white'>
                            <Typography variant="body2" fontWeight={600}> Thời gian hoạt động</Typography>
                        </Box>
                        <Grid container spacing={2}>
                            <Grid size={{ xs: 6}} >
                                <Stack my={2} direction='column' sx={{ borderRight: '1px solid white'}}>
                                    <Typography sx={{ fontSize: { xs: '14px', md: '16px'}}}>Thứ 2 - Thứ 6</Typography>
                                    <Typography sx={{ fontSize: { xs: '14px', md: '16px'}}}>Thứ 7 - Chủ nhật</Typography>
                                </Stack>
                            </Grid>
                            <Grid size={{ xs: 6}}>
                                <Stack my={2} direction='column' display='flex' alignItems='end'>
                                    <Typography sx={{ fontSize: { xs: '14px', md: '16px'}}}>08:00 am - 20:30 pm</Typography>
                                    <Typography sx={{ fontSize: { xs: '14px', md: '16px'}}}>09:00 am - 19:30 pm</Typography>
                                </Stack> 
                            </Grid>
                        </Grid>
                    </Box>
                    <Box display='flex' justifyContent='center' pb={{ xs: 2, md: 3}} pt={{ xs: 0, md: 3}}>
                        <Button
                            sx={{
                                bgcolor: 'white', color: 'black',
                                borderRadius: '20px',
                                width: { xs: '150px', md: '180px'}, height: { xs: '100%', md: '40px'},
                            }}
                            endIcon={<ArrowForward/>}
                        >
                            Tìm hiểu ngay
                        </Button>
                    </Box>
                </Box>
            </Grid>
            <Grid size={{ xs: 12, md: 6}}>
                <CommonImage
                    src={image_ticket}
                    fallbackSrc={image_ticket}
                    alt="image_ticket"
                    sx={{ width: '100%', height: { xs: '100%', md: 472, lg: 542}}}
                />
            </Grid>
        </Grid>
    )
};

export default InforOfTicket;