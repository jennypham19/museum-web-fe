import IconButton from "@/components/IconButton/IconButton";
import { ExpandLess, ExpandMore, Home } from "@mui/icons-material";
import { Box, List, ListItemText, Paper, Typography } from "@mui/material";
import React, { useState } from "react";
import image_about_us_2 from "@/assets/images/users/image_about_us_2.png";


interface ContactInformationProps{
    handleBack: () => void;
}

const ContactInformation: React.FC<ContactInformationProps> = ({ handleBack }) => {
    const [openInformation, setOpenInformation] = useState<boolean>(false);
    const [openContact, setOpenContact] = useState<boolean>(false);

    const toggleOpenInformation = () => {
        setOpenInformation(prevId => !prevId)
    };
    const toggleOpenContact = () => {
        setOpenContact(prevId => !prevId)
    };
    return (
        <Box>
            <Box display='flex' flexDirection='row' py={{ xs: 0, md: 1.5}} px={{ xs: 2, md: 10}}>
                <IconButton
                    handleFunt={handleBack}
                    icon={<Home sx={{ width: { xs: 20, md: 30}, height: { xs: 20, md: 30}, color: '#000'}}/>}
                />
                <Typography mt={{ xs: 1, md: 1}} fontWeight={600} fontSize={{ xs: '12px', md: '18px'}}>/ About us/ Liên lạc</Typography>
            </Box>
            <Box
                sx={{
                    height: { xs: 300, md: 480},
                    width: '100%',
                    backgroundImage: `url(${image_about_us_2})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            />
            <Box display='flex' flexDirection='column' mt={4} py={{ xs: 1.5, md: 2}} px={{ xs: 2, md: 10}}>
                <Typography variant="h5" fontWeight={600}>Liên lạc với bảo tàng</Typography>
                <Typography fontSize={{ xs: '13px', md: '16px'}} pt={2} pb={2} sx={{ whiteSpace: 'normal', wordBreak: 'break-word', borderBottom: '1px solid grey'}}>
                    Chúng tôi rất mong được chào đón bạn đến với bảo tàng. Vui lòng xem lại kỹ các hướng dẫn bên dưới trước khi bạn tới thăm. Chúng tôi có quyền từ chối bất kì khách hàng nào vi phạm quy định của bảo tàng. Xin cảm ơn!
                </Typography>
            </Box>
            {/* Thông tin chung */}
            <Box display='flex' flexDirection='column' py={{ xs: 1.5, md: 2}} px={{ xs: 2, md: 10}}>
                <Paper variant="outlined" sx={{ p: 2, borderRadius: 1, bgcolor: '#f5f5f5', border: '1px solid black' }}>
                    <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ borderBottom: '1px solid grey'}}>
                        <Typography variant="subtitle1" fontWeight={700}>
                            Thông tin chung
                        </Typography>
                        <IconButton
                            handleFunt={toggleOpenInformation}
                            icon={openInformation ? <ExpandLess/> : <ExpandMore/>}
                            sx={{
                                "&:hover":{
                                    bgcolor: '#f5f5f5'
                                }
                            }}
                        />
                     </Box>

                    {openInformation && (
                        <Box mt={1}>
                            <List dense>
                                <ListItemText sx={{ ml: 2}} primary='• Chi nhánh 1: cơ sở 1 - 323 Nguyễn Khánh Toàn - Cầu Giấy - Hà Nội'/>
                                <ListItemText sx={{ ml: 2}} primary='• Chi nhánh 2: cơ sở 2 - 123 Nguyễn Khánh Toàn - Cầu Giấy - Hà Nội'/>
                            </List>
                        </Box>
                    )}
                </Paper>
            </Box>
            {/* End thông tin chung */}

            {/* Liên lạc */}
            <Box display='flex' flexDirection='column' py={{ xs: 1.5, md: 2}} px={{ xs: 2, md: 10}}>
                <Paper variant="outlined" sx={{ p: 2, borderRadius: 1, bgcolor: '#f5f5f5', border: '1px solid black' }}>
                    <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ borderBottom: '1px solid grey'}}>
                        <Typography variant="subtitle1" fontWeight={700}>
                            Liên lạc
                        </Typography>
                        <IconButton
                            handleFunt={toggleOpenContact}
                            icon={openContact ? <ExpandLess/> : <ExpandMore/>}
                            sx={{
                                "&:hover":{
                                    bgcolor: '#f5f5f5'
                                }
                            }}
                        />
                     </Box>

                    {openContact && (
                        <Box mt={1}>
                            <Typography variant="subtitle2">Các thông tin có thể liên lạc</Typography>
                            <List dense>
                                <ListItemText sx={{ ml: 2}} primary='• Số điện thoại: 0929628434'/>
                                <ListItemText sx={{ ml: 2}} primary='• Hotline: 190003737437'/>
                                <ListItemText sx={{ ml: 2}} primary='• Email: Tiffany@gmail.com'/>
                                <ListItemText sx={{ ml: 2}} primary='• Gmail: Hungthinh@gmail.com'/>
                            </List>
                        </Box>
                    )}
                </Paper>
            </Box>
            {/* End liên lạc */}
        </Box>
    )
}

export default ContactInformation;