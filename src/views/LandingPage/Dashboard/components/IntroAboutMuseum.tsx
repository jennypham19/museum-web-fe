import CommonImage from "@/components/Image/index";
import { Box, Button, Stack, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import image_intro from "@/assets/images/users/f9618ff9dbdb73e89459bc2d6880ebb7f8c0739f.png";
import { ArrowForward } from "@mui/icons-material";

const IntroAboutMuseum = () => {
    return(
        <Grid container>
            <Grid size={{ xs: 12, md: 6}}>
                <Box pt={{ xs: 3, lg: 8}} pb={{ xs: 2, lg: 3}} height={{ xs: '100%', lg: 638}} bgcolor='#F4E2D4' display='flex' justifyContent='center' alignItems='center'>
                    <Box margin='auto' px={{ xs: 2, md: 5, lg: 30}} display='flex' flexDirection='column' justifyContent='center' alignItems='center'>
                        <Typography textAlign='center' sx={{ whiteSpace: 'wrap', fontSize: { xs: '20px', lg: '40px'}}} fontWeight={600}>
                            Chào mừng bạn đến với Bảo tàng nghệ thuật Amuse
                        </Typography>
                        <Typography p={2} textAlign='center' sx={{ whiteSpace: 'wrap', fontSize: { xs: '14px', lg: '16px'}}}>
                            Tiffany là cái tên rất quen thuộc với người Mỹ. Không phải vì nó trùng với tên một bộ phim kinh điển ra đời năm 1961 gắn với tên tuổi của huyền thoại màn bạc Audrey Hepburn, Breakfast at Tiffany's.    
                        </Typography> 
                        <Button
                            sx={{
                                bgcolor: 'white', color: 'black',
                                boxShadow: '0px 1px 3px 1px rgba(0, 0, 0, 0.15), 0px 1px 2px 0px rgba(0, 0, 0, 0.3)',
                                borderRadius: '30px',
                                width: { xs: '150px', md: '180px'}, height: { xs: '100%', md: '40px'},
                                '&:hover': {
                                    boxShadow: '0px 1px 3px 1px rgba(0, 0, 0, 0.15), 0px 1px 2px 0px rgba(0, 0, 0, 0.3)',
                                }
                            }}
                            endIcon={<ArrowForward/>}
                        >
                            Tìm hiểu thêm
                        </Button>                       
                    </Box>
                </Box>
            </Grid>
            <Grid size={{ xs: 12, md: 6}}>
                <CommonImage
                    src={image_intro}
                    fallbackSrc={image_intro}
                    alt="image_intro"
                    sx={{
                        height:{ xs: '100%', lg: 638}
                    }}
                />
            </Grid>
        </Grid>
    )
}
export default IntroAboutMuseum;