import IconButton from "@/components/IconButton/IconButton";
import { Home } from "@mui/icons-material";
import { Box, Button, Card, CardContent, List, ListItem, ListItemText, Paper, Stack, Typography } from "@mui/material"
import { useNavigate } from "react-router-dom";
import image_card_member from "@/assets/images/users/image-card-member.png";
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import PersonIcon from '@mui/icons-material/Person';
import React from "react";
import { IPackageMember } from "@/types/landingpage";
import Grid from "@mui/material/Grid2";
import { DATA_MEMBER, DATA_PACKAGE_MEMBER } from "@/constants/data";
import PlanVisit from "../Dashboard/components/PlanVisit";

interface MembershipPackageProps{
    data: IPackageMember[];
}

const MembershipPackage: React.FC<MembershipPackageProps> = ({ data}) => {
    return(
        <Grid container spacing={3}>
            {data.map((item, index) => {
                return(
                    <Grid size={{ xs: 12, sm: 6, lg: 4}} key={index}>
                        <Card
                            sx={{ height: '100%', display: 'flex', flexDirection: 'column', borderRadius: 3, boxShadow: '0px 1px 3px 1px rgba(0, 0, 0, 0.03), 0px 1px 2px 0px rgba(0, 0, 0, 0.3)'}}
                        >
                            <CardContent sx={{ flexGrow: 1,  px: { xs: 2, md: 4}}}>
                                <Typography fontWeight={500} fontSize={{ xs: '18px', md: '22px'}}>{item.title}</Typography>
                                <Typography fontWeight={800} fontSize={{ xs: '14px', md: '16px'}} mt={1}>
                                    {item.price}
                                </Typography>
                                <Box mt={2} display='flex' flexDirection='row'>
                                    {[...Array(item.members)].map((_, i) => (
                                        <Box mr={1.5} pt={{ xs: 2.5, md: 2}} border='1px solid' borderRadius={2}>
                                            <PersonIcon key={`m-${i}`} sx={{ mx: 0.5, width: {xs: 20, md: 30}, height: {xs: 20, md: 30}}}/>
                                        </Box>
                                    ))}
                                    <Typography fontWeight={700} m={2} fontSize='25px'> + </Typography>
                                    {[...Array(item.guests)].map((_, i) => (
                                        <Box pt={{ xs: 2.5, md: 2}}>
                                            <PersonIcon key={`g-${i}`} sx={{  width: {xs: 20, md: 30}, height: {xs: 20, md: 30}}}/>
                                        </Box>
                                    ))}
                                </Box>
                                <Typography fontWeight={600} fontSize={{ xs: '13px', md: '14px'}} my={2}>
                                    {item.includes}
                                </Typography>
                                <Button
                                    variant="contained"
                                    sx={{
                                        color: 'white',
                                        height: 40,
                                        width: 150,
                                        background: 'linear-gradient(45deg, #D30000 30%, #780000 90%)',
                                        fontSize: '18px'
                                    }}
                                >
                                    Tham gia
                                </Button>

                            </CardContent>
                            <Box height={{ xs: '100%', md: 250}} bgcolor='#E6E6E6' sx={{ px: { xs: 2, md: 4}, py: 2}}>
                                <Typography fontWeight={700} fontSize={{ xs: '14px', md: '16px'}}>
                                    {`QUYỀN LỢI CHO HẠNG ${item.title.split(' ')[2].toUpperCase()}`}
                                </Typography>
                                <List dense disablePadding>
                                    {item.benefits.split('\n').map((benefit, index) => (
                                        <ListItem key={index} sx={{ py: 0.5}}>
                                            <ListItemText primary={`• ${benefit}`}/>
                                        </ListItem>
                                    ))}
                                </List>
                            </Box>
                        </Card>
                    </Grid>
            )})}
        </Grid>
    )
}

const CardMember = () => {
    const navigate = useNavigate();
    return(
        <Box>
            <Box display='flex' flexDirection='row' py={{ xs: 0, md: 1.5}} px={{ xs: 2, md: 10}}>
                <IconButton
                    handleFunt={() => navigate('/home')}
                    icon={<Home sx={{ width: { xs: 20, md: 30}, height: { xs: 20, md: 30}, color: '#000'}}/>}
                />
                <Typography mt={{ xs: 1, md: 1}} fontWeight={600} fontSize={{ xs: '12px', md: '18px'}}>/ Thẻ thành viên</Typography>
            </Box>
            <Box
                sx={{
                    height: { xs: 300, md: 480},
                    width: '100%',
                    backgroundImage: `url(${image_card_member})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textAlign: 'center'
                }}
            />
            <Box px={{ xs: 3, md: 10}} mb={{ xs: 2, md: 6}}>
                {/* Trở thành thành viên của bảo tàng */}
                <Box mb={1} mt={{ xs: 4, md: 5}}>
                    <Typography fontSize={{ xs: '1.4 rem', sm: '1.8rem'}} fontWeight={600} sx={{ borderBottom: '1px solid grey'}}>Trở thành thành viên của bảo tàng</Typography>
                </Box>
                <Stack py={1.5} direction={{ xs: 'column', md: 'row'}}>
                    <Typography px={{ xs: 0, md: 2}} fontSize={{ xs: '14px', md: '18px'}}>Hạng thành viên:</Typography>
                    <Typography px={{ xs: 0, md: 2}} fontSize={{ xs: '14px', md: '18px'}} fontWeight={600}>Titan</Typography>
                    <Typography px={{ xs: 0, md: 2}} fontSize={{ xs: '14px', md: '18px'}} fontWeight={600}>Kim cương</Typography>
                    <Typography px={{ xs: 0, md: 2}} fontSize={{ xs: '14px', md: '18px'}} fontWeight={600}>Bạch kim</Typography>
                    <Typography px={{ xs: 0, md: 2}} fontSize={{ xs: '14px', md: '18px'}} fontWeight={600}>Vàng</Typography>
                    <Typography px={{ xs: 0, md: 2}} fontSize={{ xs: '14px', md: '18px'}} fontWeight={600}>Bạc</Typography>
                    <Typography px={{ xs: 0, md: 2}} fontSize={{ xs: '14px', md: '18px'}} fontWeight={600}>Đồng</Typography>
                </Stack>
                <Paper 
                    sx={{ 
                        bgcolor: '#FFFFFF', mt: { xs: 1, md: 2}, 
                        p: { xs: 3, md: 4}, display: 'flex', flexDirection: 'column', 
                        borderRadius: '10px', 
                        boxShadow: '0px 1px 3px 1px rgba(0, 0, 0, 0.03), 0px 1px 2px 0px rgba(0, 0, 0, 0.3)'
                    }}
                >
                    <Stack direction='row' mb={2}>
                        <ConfirmationNumberIcon sx={{ fontSize: { xs: '20px', md: '30px'}}}/>
                        <Typography px={{ xs: 1, md: 2}} fontSize={{ xs: '14px', md: '20px'}} fontWeight={600}>Quyền lợi</Typography>
                    </Stack>
                    <Typography fontWeight={500} fontSize={{ xs: '13px', md: '17px'}}>
                        Xem chi tiết một số quyền lợi của hạng thành viên tại phía bên dưới. Bạn hãy xem chi tiết các gói thành viên và quyền ưu đãi khi làm hội viên của bảo tàng.
                    </Typography>
                </Paper>
                {/* End trở thành thành viên của bảo tàng */}

                {/* Gói hội viên tiềm năng */}
                <Box mb={1} mt={{ xs: 4, md: 5}}>
                    <Typography fontSize={{ xs: '1.4 rem', sm: '1.8rem'}} fontWeight={600}>Gói hội viên tiềm năng</Typography>
                </Box>
                <Box mb={1} mt={{ xs: 4, md: 5}}>
                    <MembershipPackage data={DATA_PACKAGE_MEMBER}/>
                </Box>
                {/* Gói hội viên tiềm năng */}
            </Box>
            <Box px={{ xs: 0, md: 4}} mb={{ xs: 2, md: 4}}>
                <PlanVisit data={DATA_MEMBER} label="Đăng ký thành viên" md={6}/>
            </Box>
        </Box>
    )
}

export default CardMember;