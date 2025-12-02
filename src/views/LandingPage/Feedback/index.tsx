import Page from "@/components/Page";
import image_slide from "@/assets/images/users/slide.png";
import { Box, Button, Paper, Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import logo_museum from "@/assets/images/users/logo_1.png"
import CommonImage from "@/components/Image/index";
import { COLORS } from "@/constants/colors";
import Grid from "@mui/material/Grid2";
import InputText from "@/components/InputText";


const Feedback = () => {
    const theme = useTheme();
    const mdUp = useMediaQuery(theme.breakpoints.down('md'));

    if(mdUp) {
        return(
            <Page title="Phản hồi về Bộ sưu tập của Art Glass">
                <img
                    src={image_slide}
                    style={{
                        height: 250,
                        width: '100%',
                        objectFit: "fill",
                    }}
                />
                <Box>
                    <Paper sx={{ p: 3 }}>
                        <Box display='flex' flexDirection='row' gap={2}>
                            <CommonImage
                                src={logo_museum}
                                alt="museum logo"
                                sx={{ height: 80, mb: 2.5 }}
                            />
                            <Typography fontWeight={600} fontSize='25px' sx={{ margin: 'auto 0', color: COLORS.BUTTON }}>THE ART GLASS</Typography>
                        </Box>
                        <Typography mt={2} fontWeight={500} fontSize='20px'>Phản hồi về Bộ sưu tập của Art Glass</Typography>
                        <Typography mt={1} fontSize='16px'>
                            Chúng tôi tiếp tục nghiên cứu và xem xét bối cảnh lịch sử và văn hóa của các hiện vật trong Bộ sưu tập Met. Nếu bạn có ý kiến ​​đóng góp hoặc thắc mắc về hồ sơ hiện vật bạn đang xem, vui lòng gửi biểu mẫu này. Chúng tôi đã đọc tất cả các bình luận, nhưng không thể trả lời tất cả tin nhắn.
                        </Typography>
                        <Grid container spacing={2} sx={{ mt: 5 }}>
                            <Grid size={{ xs: 12 }}>
                                <Typography>Tên của bạn <span style={{ color: COLORS.BUTTON }}>*</span></Typography>
                                <InputText
                                    label=""
                                    value={''}
                                    type="text"
                                    name=''
                                    onChange={() => {}}
                                />
                            </Grid>
                            <Grid size={{ xs: 12 }} sx={{ my: 2 }}>
                                <Typography>Email của bạn <span style={{ color: COLORS.BUTTON }}>*</span></Typography>
                                <InputText
                                    label=""
                                    value={''}
                                    type="text"
                                    name=''
                                    onChange={() => {}}
                                />
                            </Grid>
                            <Grid size={{ xs: 12 }} sx={{ my: 2 }}>
                                <Typography>Phản hồi của bạn <span style={{ color: COLORS.BUTTON }}>*</span></Typography>
                                <InputText
                                    multiline
                                    rows={5}
                                    label=""
                                    value={''}
                                    type="text"
                                    name=''
                                    onChange={() => {}}
                                />
                            </Grid>
                             <Grid size={{ xs: 12 }}>
                                <Button
                                    sx={{ bgcolor: COLORS.BUTTON }}
                                >
                                    Gửi phản hồi của bạn
                                </Button>
                            </Grid>
                         </Grid>
                    </Paper>
                </Box>   
            </Page>   
        )
    }
    return(
        <Page title="Phản hồi về Bộ sưu tập của Art Glass">
            <img
                src={image_slide}
                style={{
                    height: 300,
                    width: '100%',
                    objectFit: "fill",
                }}
            />
            <Box 
                sx={{ 
                    display: 'flex',
                    justifyContent: 'center',
                    bgcolor: '#fff'
                }} 
            >
                <Paper sx={{ p: 3, width: '50%', boxShadow: '0 2px 3px rgba(8, 8, 8, 0.1)' }}>
                    <Box display='flex' flexDirection='row' gap={2}>
                        <CommonImage
                            src={logo_museum}
                            alt="museum logo"
                            sx={{ height: 80, mb: 2.5 }}
                        />
                        <Typography fontWeight={600} fontSize='25px' sx={{ margin: 'auto 0', color: COLORS.BUTTON }}>THE ART GLASS</Typography>
                    </Box>
                    <Typography mt={2} fontWeight={500} fontSize='20px'>Phản hồi về Bộ sưu tập của Art Glass</Typography>
                    <Typography mt={1} fontSize='16px'>
                        Chúng tôi tiếp tục nghiên cứu và xem xét bối cảnh lịch sử và văn hóa của các hiện vật trong Bộ sưu tập Met. Nếu bạn có ý kiến ​​đóng góp hoặc thắc mắc về hồ sơ hiện vật bạn đang xem, vui lòng gửi biểu mẫu này. Chúng tôi đã đọc tất cả các bình luận, nhưng không thể trả lời tất cả tin nhắn.
                    </Typography>
                    <Grid container spacing={2} sx={{ mt: 5 }}>
                        <Grid size={{ xs: 12 }}>
                            <Typography>Tên của bạn <span style={{ color: COLORS.BUTTON }}>*</span></Typography>
                            <InputText
                                label=""
                                value={''}
                                type="text"
                                name=''
                                onChange={() => {}}
                            />
                        </Grid>
                        <Grid size={{ xs: 12 }} sx={{ my: 2 }}>
                            <Typography>Email của bạn <span style={{ color: COLORS.BUTTON }}>*</span></Typography>
                            <InputText
                                label=""
                                value={''}
                                type="text"
                                name=''
                                onChange={() => {}}
                            />
                        </Grid>
                        <Grid size={{ xs: 12 }} sx={{ my: 2 }}>
                            <Typography>Phản hồi của bạn <span style={{ color: COLORS.BUTTON }}>*</span></Typography>
                            <InputText
                                multiline
                                rows={5}
                                label=""
                                value={''}
                                type="text"
                                name=''
                                onChange={() => {}}
                            />
                        </Grid>
                        <Grid size={{ xs: 12 }}>
                            <Button
                                sx={{ bgcolor: COLORS.BUTTON }}
                            >
                                Gửi phản hồi của bạn
                            </Button>
                        </Grid>
                    </Grid>
                </Paper>
            </Box>
        </Page>
    )
}

export default Feedback;