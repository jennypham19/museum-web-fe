import IconButton from "@/components/IconButton/IconButton";
import { Box, Button, Typography } from "@mui/material"
import { useNavigate } from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home';
import image_blue_shine from "@/assets/images/users/slide_blue_shine.png";
import Grid from "@mui/material/Grid2"
import PlanVisit from "./components/PlanVisit";
import { DATA_PLAN_VISIT } from "@/constants/data";

const ExhibitionOfBlueShine = () => {
    const navigate = useNavigate();
    return (
        <Box>
            <Box display='flex' flexDirection='row' py={{ xs: 0, md: 1.5}} px={{ xs: 2, md: 10}}>
                <IconButton
                    handleFunt={() => navigate(-1)}
                    icon={<HomeIcon sx={{ width: { xs: 20, md: 30 }, height: { xs: 20, md: 30 }, color: '#000'}}/>}
                />
                <Typography mt={{ xs: 1, md: 1}} fontWeight={600} fontSize={{ xs: '12px', md: '18px'}}>/ Kế hoạch tham quan/ Triễn lãm "Ánh dương xanh"</Typography>
            </Box>
            <Box
                sx={{
                    height: { xs: 300, md: 480},
                    width: '100%',
                    backgroundImage: `url(${image_blue_shine})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textAlign: 'center'
                }}
            />
            <Box px={{ xs: 3, md: 6}} mb={{ xs: 3, md: 6}}>
                <Box pb={4} mt={{ xs: 4, md: 5}}>
                    <Typography sx={{ fontSize: { xs: '1.2rem', sm: '1.8rem'} , borderBottom: '1px solid grey'}} fontWeight={600}>Triển lãm "Ánh dương xanh"</Typography>
                </Box>
                <Grid container spacing={3}>
                    <Grid size={{ xs: 12, md: 9}}>
                        <Typography fontSize={{ xs: '14px', md: '16px'}} sx={{ whiteSpace: 'normal', wordBreak: 'break-word'}}>Triển lãm đèn Tiffany mang đến trải nghiệm tinh tế của phong cách Art Nouveau qua các tác phẩm thủy tinh pha chì lấp lánh, do Louis Comfort Tiffany và đặc biệt là Clara Driscoll – "bà hoàng" của nhóm “Tiffany Girls” – kiến tạo</Typography>
                    </Grid>
                    <Grid size={{ xs: 12, md: 3}}>
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
            </Box>
                <PlanVisit data={DATA_PLAN_VISIT} label="Thăm quan ngay" md={3} handleNavigate={() => {}}/>
        </Box>
    )
}

export default ExhibitionOfBlueShine;