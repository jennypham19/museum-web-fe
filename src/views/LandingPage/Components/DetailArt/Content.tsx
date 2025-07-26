import { Box, Card, IconButton, Stack, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import image_exhibition from "@/assets/images/users/image_exhibition.png";
import CommonImage from "@/components/Image/index";
import { ChevronRight } from "@mui/icons-material";
import LiveStream from "../../Dashboard/components/LiveStream";


const Content = () => {
    return(
        <Box>
            <Card
                sx={{ height: '100%'}}
            >
                <Grid container spacing={{ xs: 1, md: 3}}>
                    <Grid size={{ xs: 12, md: 5}}>
                        <CommonImage
                            src={image_exhibition}
                            sx={{ 
                                width: '100%',
                                height: { xs: 200, md: 300},
                                p:2,
                            }}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, md: 7}}>
                        <Box mt={{ xs: 0, md: 10 }} display='flex' flexDirection='column' px={2} pb={{ xs: 1, md: 0}}>
                            <Typography fontSize={{ xs: '18px', md: '28px'}} mb={1} fontWeight={600}>Bản đồ Nghệ thuật Châu Phi</Typography>
                            <Typography fontSize={{ xs: '14px', md: '16px'}} mb={1} sx={{ whiteSpace: 'normal', wordBreak: 'break-word' }}>
                                Chúng tôi rất mong được chào đón bạn đến với bảo tàng. Vui lòng xem lại kỹ các hướng dẫn bên dưới trước khi bạn tới thăm. Chúng tôi có quyền từ chối bất kì khách hàng nào vi phạm quy định của bảo tàng. Xin cảm ơn!
                            </Typography>
                            <Stack sx={{ cursor: 'pointer'}} direction='row' onClick={() => {}}>
                                <Typography pt={0.5} fontWeight={600} variant="subtitle2">Xem tất cả</Typography>
                                <IconButton>
                                    <ChevronRight/>
                                </IconButton>
                            </Stack>
                        </Box>
                    </Grid>
                </Grid>
            </Card>
            <LiveStream title="Bài viết liên quan khác" isDisabled={true}/>
        </Box>
    )
}

export default Content;