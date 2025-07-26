import IconButton from "@/components/IconButton/IconButton";
import { Box, Button, Stack, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2"
import CommonImage from "@/components/Image/index";
import detail_image from "@/assets/images/users/detail_image.png"
import { FaFacebookF, FaInstagram, FaPinterestP, FaYoutube } from "react-icons/fa";
import video from "@/assets/images/users/videoplayback.mp4";
import detail_object_2 from "@/assets/images/users/detail_object_2.png"
import VideoThumbnailPlayer from "../../Dashboard/components/VideoThumbnailPlayer";

const DATA_CONTENT = 
    "Tranh kính Tiffany là một tuyệt tác nghệ thuật gắn liền với tên tuổi Louis Comfort Tiffany (1848–1933), người Mỹ tiên phong trong phong trào Art Nouveau cuối thế kỷ 19 – đầu thế kỷ 20. Ông sáng lập Tiffany Studios ở Queens, New York, và phát triển loại kính Favrile – kính màu lam rực “nhúng” sâu trong chất liệu, bằng sáng chế năm 1894, cho khả năng óng ánh thay đổi theo góc nhìn.\n" +
    "Không sử dụng kỹ thuật vẽ lên kính, tranh kính Tiffany được ghép từ các miếng kính màu đa dạng, đủ độ trong – mờ, có vân rủ như đá quý, tạo hiệu ứng sống động dưới ánh sáng tự nhiên." 
    

const DATA_CONTENT_2 =
 "Tiffany cũng là người khai phá kỹ thuật khung đồng – copper‑foil soldering, cho phép tạo chi tiết nhỏ tinh xảo hơn kỹ thuật chì truyền thống . Nổi bật là tranh cửa sổ tôn giáo như “Angel of the Resurrection” (1904) tại bảo tàng Indianapolis, bên cạnh các mẫu đèn “Dragonfly”, “Wisteria” do Clara Driscoll thiết kế – một trong những “Tiffany Girls” đóng góp quan trọng cho hình ảnh chiếc đèn Tiffany cổ điển.\n" +
    "Tiffany không chỉ chú trọng phần kính mà còn thiết kế chân đế đúc đồng – thép tinh xảo, đồng điệu với chao kính, như mẫu “Nautilus” với hình nàng tiên cá ôm vỏ ốc ngaynay.vn. Các tác phẩm của ông hiện diện tại Nhà Trắng, các nhà thờ và viện bảo tàng lớn, tiếp tục là biểu tượng rực rỡ của nghệ thuật decor kết hợp ánh sáng và màu sắc, đậm chất thiên nhiên theo tinh thần Art Nouveau."

const InsideExhibition = () => {
    return(
        <Box>
            <Box display='flex' flexDirection='column' py={{ xs: 1.6, md: 2}} px={{ xs: 2, md: 10}}>
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
                            <CommonImage
                                src={detail_object_2}
                                sx={{
                                    height: { xs: 150, md: 350},
                                    mt:2
                                }}
                            />
                            {DATA_CONTENT_2.split('\n').map((item, idx) => {
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
                        <Box mt={{ xs: 2, md: 60}}>
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

export default InsideExhibition;