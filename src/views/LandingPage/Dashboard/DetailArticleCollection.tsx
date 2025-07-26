import IconButton from "@/components/IconButton/IconButton";
import { Box, Button, Stack, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home';
import Grid from "@mui/material/Grid2"
import CommonImage from "@/components/Image/index";
import detail_image from "@/assets/images/users/detail_image.png"
import { FaFacebookF, FaInstagram, FaPinterestP, FaYoutube } from "react-icons/fa";
import VideoThumbnailPlayer from "./components/VideoThumbnailPlayer";
import video from "@/assets/images/users/videoplayback.mp4"

const DATA_CONTENT = 
    "Tranh kính Tiffany là một tuyệt tác nghệ thuật gắn liền với tên tuổi Louis Comfort Tiffany (1848–1933), người Mỹ tiên phong trong phong trào Art Nouveau cuối thế kỷ 19 – đầu thế kỷ 20. Ông sáng lập Tiffany Studios ở Queens, New York, và phát triển loại kính Favrile – kính màu lam rực “nhúng” sâu trong chất liệu, bằng sáng chế năm 1894, cho khả năng óng ánh thay đổi theo góc nhìn.\n" +
    "Không sử dụng kỹ thuật vẽ lên kính, tranh kính Tiffany được ghép từ các miếng kính màu đa dạng, đủ độ trong – mờ, có vân rủ như đá quý, tạo hiệu ứng sống động dưới ánh sáng tự nhiên .\n" + 
    "Tiffany cũng là người khai phá kỹ thuật khung đồng – copper‑foil soldering, cho phép tạo chi tiết nhỏ tinh xảo hơn kỹ thuật chì truyền thống . Nổi bật là tranh cửa sổ tôn giáo như “Angel of the Resurrection” (1904) tại bảo tàng Indianapolis, bên cạnh các mẫu đèn “Dragonfly”, “Wisteria” do Clara Driscoll thiết kế – một trong những “Tiffany Girls” đóng góp quan trọng cho hình ảnh chiếc đèn Tiffany cổ điển.\n" +
    "Tiffany không chỉ chú trọng phần kính mà còn thiết kế chân đế đúc đồng – thép tinh xảo, đồng điệu với chao kính, như mẫu “Nautilus” với hình nàng tiên cá ôm vỏ ốc ngaynay.vn. Các tác phẩm của ông hiện diện tại Nhà Trắng, các nhà thờ và viện bảo tàng lớn, tiếp tục là biểu tượng rực rỡ của nghệ thuật decor kết hợp ánh sáng và màu sắc, đậm chất thiên nhiên theo tinh thần Art Nouveau."

const DetailArticleCollection = () => {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string}>();

    return(
        <Box>
            <Box display='flex' flexDirection='row' py={{ xs: 0, md: 1.5}} px={{ xs: 2, md: 10}}>
                <IconButton
                    handleFunt={() => navigate(-1)}
                    icon={<HomeIcon sx={{ width: { xs: 20, md: 30 }, height: { xs: 20, md: 30 }, color: '#000'}}/>}
                />
                <Typography mt={{ xs: 1, md: 1}} fontWeight={600} fontSize={{ xs: '12px', md: '18px'}}>
                    / Kế hoạch thăm quan/ Khám phá nhiều hơn/ Bài viết chi tiết
                </Typography>
            </Box>
            <Box display='flex' flexDirection='column' py={{ xs: 1.6, md: 2}} px={{ xs: 2, md: 10}}>
                <Typography variant="h5" fontWeight={600}>Tranh kính ảo diệu</Typography>
                <Grid container spacing={3} sx={{ pt: { xs: 2, md: 3}, pb: 2,borderBottom: '1px solid grey'}}>
                    <Grid size={{ xs: 12, md: 8}}>
                        <Typography fontSize={{ xs: '13px', md: '16px'}} sx={{ whiteSpace: 'normal', wordBreak: 'break-word'}}>
                            Bộ sưu tập nhà Sen khi kết hợp các mảnh kính đầy màu sắc quy tụ với nhau tạo nên một bức tranh kính hoàn hảo độc đáo, từng mảnh ghép tinh tế kếp hợp
                            nên bộ sưu tập đầy màu sắc này.
                        </Typography>                        
                    </Grid>
                    <Grid size={{ xs: 12, md: 4}}>
                        <Box display='flex' justifyContent={{ xs: 'center', md: 'flex-end'}}>
                            <Button
                                variant="contained"
                                sx={{
                                    color: 'white',
                                    height: 30,
                                    width: 100,
                                    background: 'linear-gradient(45deg, #D30000 30%, #780000 90%)',
                                    fontSize: '15px'
                                }}
                            >
                                Mua vé
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
                <Grid container spacing={{ xs: 3, md: 10}} sx={{ pt: { xs: 2, md: 3}, pb: 2}}>
                    <Grid size={{ xs: 12, md: 8}}>
                        <Box display='flex' flexDirection='column'>
                            <CommonImage
                                src={detail_image}
                                sx={{
                                    height: { xs: 150, md: 350}
                                }}
                            />
                            {DATA_CONTENT.split('\n').map((item, idx) => {
                                return(
                                    <Typography
                                        key={idx}
                                        textAlign='left'
                                        sx={{ 
                                            whiteSpace: 'normal', wordBreak: 'break-word',fontSize: {xs: '13px', md: '15px'},
                                            pt: { xs: 2, md: 3}
                                        }}
                                    >
                                        {item}
                                    </Typography>
                                )
                            })}
                        </Box>
                    </Grid>
                    <Grid size={{ xs: 12, md: 4}}>
                        <Box ml={{ xs: 0, md: 7}} display='flex' flexDirection='column' justifyContent={{ xs: 'flex-start', md: 'flex-end'}}>
                            <Typography ml={0.5} mb={1} fontWeight={600} fontSize={{ xs: '14px', md: '16px'}}>Trích nguồn</Typography>
                            <Box px={1} display='flex' flexDirection='row'>
                                <IconButton
                                    handleFunt={() => {}}
                                    icon={<FaFacebookF size={20} color="#fff"/>}
                                    backgroundColor="black"
                                    // href="https://www.facebook.com/profile.php?id=61576721774771"
                                    borderRadius='50%'
                                    sx={{ mr: 1, mt: { xs: 0, md: 0.5}, width: { xs: 28, md: 36}, height: { xs: 28, md: 36}}}
                                />
                                <IconButton
                                    handleFunt={() => {}}
                                    icon={<FaInstagram size={20} color='#fff'/>}
                                    backgroundColor="black"
                                    borderRadius='50%'
                                    sx={{ mr: 1, mt: { xs: 0, md: 0.5}, width: { xs: 28, md: 36}, height: { xs: 28, md: 36}}}
                                />
                                <IconButton
                                    handleFunt={() => {}}
                                    icon={<FaPinterestP size={20} color='#fff'/>}
                                    backgroundColor="black"
                                    borderRadius='50%'
                                    sx={{ mr: 3, mt: { xs: 0, md: 0.5}, width: { xs: 28, md: 36}, height: { xs: 28, md: 36}}}
                                />
                                <Stack direction='row'>
                                    <IconButton
                                        handleFunt={() => {}}
                                        icon={<FaYoutube size={100} color='#000'/>}
                                        sx={{ mt: { xs: 0, md: 0.5}, width: { xs: 28, md: 36}, height: { xs: 28, md: 36}}}
                                    />
                                    <Typography fontSize={{ xs: '20px', md: '30px'}} fontWeight={600}>YouTube</Typography>
                                </Stack>
                            </Box>
                        </Box>
                        <Box mt={{ xs: 2, md: 8}}>
                            <VideoThumbnailPlayer
                                thumbnail={detail_image}
                                videoSrc={video}
                            />
                        </Box>
                        <Box mt={{ xs: 2, md: 3}}>
                            <VideoThumbnailPlayer
                                thumbnail={detail_image}
                                videoSrc={video}
                            />
                        </Box>
                    </Grid>
                </Grid>               
            </Box>
        </Box>
    )
}
export default DetailArticleCollection;