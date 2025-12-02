import { Box, Stack, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";

interface AdditionalObjectProps{

}

const AdditionalObject = (props: AdditionalObjectProps) => {
    const { } = props;
    return(
        <Box mt={{ xs: 5, md: 8 }} display='flex' px={{ xs: 0, md: 40 }} justifyContent={{ xs: 'center', md: 'flex-start'}}>
            <Grid container spacing={{ xs: 2, md: 4 }}>
                <Grid size={{ xs: 12, md: 4 }}>
                    <Typography fontSize={{ xs: '20px', md: '30px'}} fontWeight={700}>Tài nguyên nghiên cứu</Typography>
                </Grid>
                <Grid size={{ xs: 12, md: 8 }}>
                    <Typography fontSize={{ xs: '16px', md: '18px'}}>
                        Bảo tàng Met cung cấp nguồn tài nguyên nghiên cứu vô song và chào đón cộng đồng sinh viên và học giả quốc tế. API Truy cập Mở của Bảo tàng Met là nơi các nhà sáng tạo và nhà nghiên cứu có thể kết nối với bộ sưu tập của Bảo tàng. Dữ liệu Truy cập Mở và hình ảnh thuộc phạm vi công cộng có sẵn để sử dụng không hạn chế cho mục đích thương mại và phi thương mại mà không cần xin phép hoặc trả phí.
                    </Typography>
                    <Typography mt={2} fontSize={{ xs: '16px', md: '18px'}}>
                        Để yêu cầu hình ảnh có bản quyền và các hạn chế khác, vui lòng sử dụng Mẫu yêu cầu hình ảnh này .
                    </Typography>
                </Grid>
                <Grid size={{ xs: 12, md: 4 }}>
                    <Typography fontSize={{ xs: '20px', md: '30px'}} fontWeight={700}>Nhận xét</Typography>
                </Grid>
                <Grid size={{ xs: 12, md: 8 }}>
                    <Typography mb={2} fontSize={{ xs: '16px', md: '18px'}}>
                        Chúng tôi tiếp tục nghiên cứu và xem xét bối cảnh lịch sử và văn hóa của các hiện vật trong bộ sưu tập của Bảo tàng Met. Nếu bạn có bất kỳ ý kiến ​​đóng góp hoặc thắc mắc nào về hồ sơ hiện vật này, vui lòng liên hệ với chúng tôi qua biểu mẫu bên dưới. Bảo tàng rất mong nhận được ý kiến ​​đóng góp của bạn.                       
                    </Typography>
                    <Typography 
                        href="/feedback" 
                        component='a' 
                        fontWeight={500}
                        fontSize={{ xs: '16px', md: '18px'}}
                        target="_blank"
                        sx={{
                            textDecoration: 'none',
                            color: '#000',
                            "&:hover":{
                                textDecoration: 'underline'
                            }
                        }}
                    >
                        Gửi phản hồi
                    </Typography>
                </Grid>
            </Grid>
        </Box>
    )
}

export default AdditionalObject;