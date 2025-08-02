import { Box, Button, Stack, Typography } from "@mui/material";
import React from "react"
import IconButton from "@/components/IconButton/IconButton";
import HomeIcon from '@mui/icons-material/Home';
import image_event from "@/assets/images/users/image_event.png";
import Grid from "@mui/material/Grid2";
import image_content_event from "@/assets/images/users/image_content_event.png";
import CommonImage from "@/components/Image/index";
import { FaFacebookF, FaInstagram, FaPinterestP, FaYoutube } from "react-icons/fa";
import video from "@/assets/images/users/video_design.mp4"
import image_content_event_1 from "@/assets/images/users/image_content_event_1.png";
import image_content_event_2 from "@/assets/images/users/image_content_event_2.png";
import VideoThumbnailPlayer from "../Dashboard/components/VideoThumbnailPlayer";
import { useNavigate } from "react-router-dom";

interface ContentInfoEventAndPerformanceProps{
    id: number,
    handBack: () => void;
}

const DATA_CONTENT = 
    "1. Cá nhân hóa sự chào đón\n" +
    "Chúng tôi không chỉ muốn nói “Chào mừng!”, mà còn muốn bạn cảm thấy mình thật đặc biệt. Ban đầu, hãy để mọi người biết tên bạn, vị trí bạn đảm nhiệm, và một chút cảm hứng nhỏ về sở thích hoặc điểm mạnh mà bạn mang đến. Mỗi cá nhân đều có dấu ấn riêng – và dấu ấn đó sẽ được trân trọng. Việc cá nhân hóa giúp tạo kết nối nhanh chóng, giảm bớt sự bỡ ngỡ khi bạn mới tham gia.\n" +
    "2. Thể hiện sự nhiệt thành, tích cực \n" +
    "Một lời chào thân thiện, chân thành và đầy năng lượng sẽ để lại ấn tượng tốt ở mọi người. Hãy dùng ngôn từ tích cực như “Chúng tôi rất vui khi bạn ở đây!”, “Chúng tôi mong đợi được làm việc cùng bạn!”, hoặc “Kỹ năng và đam mê của bạn sẽ đóng góp rất lớn cho tập thể.” Một tinh thần thân thiện, cởi mở ngay từ đầu luôn là chìa khóa giúp bạn dễ dàng hòa nhập.\n" +
    "3. Kêu gọi kết nối, hợp tác và phát triển chung \n" +
    "Bạn không chỉ là một cá thể độc lập, mà là thành viên trong một tập thể – nơi mà “chúng ta” luôn mạnh hơn “một mình”. Cộng đồng này chờ đón sự tham gia của bạn: chia sẻ ý tưởng, cùng nhau thực hiện dự án, học hỏi từ nhau. Bạn hãy chủ động bắt chuyện, hỏi han, đề xuất và đồng hành cùng mọi người. Đây cũng là cơ hội để bạn mở rộng kiến thức, kỹ năng và kết nối chuyên môn – lời mời hợp tác từ hôm nay 🌱.\n" +
    "4. Cam kết hỗ trợ và đồng hành \n" +
    "Chúng tôi cam kết luôn sẵn sàng hỗ trợ bạn: từ việc hướng dẫn quy trình, giải đáp thắc mắc, hỗ trợ kỹ thuật, đến tổ chức các hoạt động vui chơi, kết nối hay đào tạo. Bạn sẽ không lẻ loi – mỗi bước đi, dù là nhỏ, cũng sẽ được đồng hành bởi những người sẵn sàng lắng nghe, trợ giúp và cổ vũ. \n" +
    "5. Tầm quan trọng của ấn tượng đầu tiên \n" +
    "Nghiên cứu cho thấy, những ngày đầu tiên là thời điểm quyết định bạn có gắn bó lâu dài và cảm thấy động lực hay không . Một lời chào nồng hậu, một sự chờ đón chân thành và một cộng đồng thân thiện sẽ tạo nên tiền đề cho một hành trình đáng nhớ."

const ContentInfoEventAndPerformance: React.FC<ContentInfoEventAndPerformanceProps> = ({ id, handBack }) => {
    const navigate = useNavigate()
    return(
        <Box>
            <Box display='flex' flexDirection='row' py={{ xs: 0, md: 1.5}} px={{ xs: 2, md: 10}}>
                <IconButton
                    handleFunt={handBack}
                    icon={<HomeIcon sx={{ width: { xs: 20, md: 30 }, height: { xs: 20, md: 30 }, color: '#000'}}/>}
                />
                <Typography mt={{ xs: 1, md: 1}} fontWeight={600} fontSize={{ xs: '12px', md: '18px'}}>/ Sự kiện và biểu diễn</Typography>
            </Box>
            <Box
                sx={{
                    height: { xs: 300, md: 480},
                    width: '100%',
                    backgroundImage: `url(${image_event})`,
                    backgroundSize: '100% 100%',
                    backgroundPosition: 'center',
                }}
            />
            <Box py={{ xs: 2, md: 5}} px={{ xs: 2, md: 5}}>
                <Typography fontWeight={700} fontSize={{ xs: '18px', md: "26px"}}>Sự kiện tiếp đón thành viên mới</Typography>
                <Grid pb={3} borderBottom='1px solid #C1C1C1' mt={3} container spacing={{ xs: 3, md: 10}}>
                    <Grid size={{ xs: 12, md: 8}}>
                        <Typography fontSize={{ xs: '15px', md: '16px'}}>
                            🌟 Chào mừng thành viên mới – Cùng nhau viết lên hành trình mới
                                Chào mừng bạn đã gia nhập “Gia đình chúng ta”! Sự hiện diện của bạn không chỉ là một con số trong danh sách thành viên.
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
                                onClick={() => navigate("/ticket-visit")}
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
                                src={image_content_event}
                                sx={{
                                    height: { xs: 150, md: 450}
                                }}
                            />
                            {DATA_CONTENT.split("\n").map((item, index) => {
                                return(
                                    <Typography
                                        key={index}
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
                    <Grid size={{ xs: 12, md: 4}} sx={{ display: 'flex', flexDirection: 'column' }}>
                        <Box display='flex' justifyContent={{ xs: 'flex-start', md: 'center'}} >
                            <Box display='flex' flexDirection='column'>
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
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 'auto'}}>
                            <Box 
                                sx={{
                                    display: 'flex', flexDirection: 'column',
                                    mt: { xs: 3, md: 0}
                                }} 
                            >
                                <VideoThumbnailPlayer
                                    thumbnail={image_content_event_1}
                                    videoSrc={video}
                                />
                                <VideoThumbnailPlayer
                                    thumbnail={image_content_event_2}
                                    videoSrc={video}
                                />                                    
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    )
}

export default ContentInfoEventAndPerformance;