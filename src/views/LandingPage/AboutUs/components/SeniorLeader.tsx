import IconButton from "@/components/IconButton/IconButton";
import { Home } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import React from "react";
import image_senior_leader from "@/assets/images/users/image_senior_leader.png";
import Overall from "../../Components/DetailArt/Overall";


interface SeniorLeaderProps{
    handleBack: () => void;
}
const SeniorLeader: React.FC<SeniorLeaderProps> = ({ handleBack }) => {
    return(
        <Box>
            <Box display='flex' flexDirection='row' py={{ xs: 0, md: 1.5}} px={{ xs: 2, md: 10}}>
                <IconButton
                    handleFunt={handleBack}
                    icon={<Home sx={{ width: { xs: 20, md: 30}, height: { xs: 20, md: 30}, color: '#000'}}/>}
                />
                <Typography mt={{ xs: 1, md: 1}} fontWeight={600} fontSize={{ xs: '12px', md: '18px'}}>/ About us/ Bài viết</Typography>
            </Box>
            <Box
                sx={{
                    height: { xs: 300, md: 480},
                    width: '100%',
                    backgroundImage: `url(${image_senior_leader})`,
                    backgroundSize: 'fill',
                    backgroundPosition: 'center',
                }}
            />
            <Box
                px={{ xs: 3, md: 6}} mb={{ xs: 2, md: 4}} pt={{ xs: 3, md: 6}}
                sx={{
                    width: '100%',
                    bgcolor: '#E6E6E6'
                }}
            >
                <Typography fontWeight={700} fontSize={{ xs: '16px', md: '25px'}}>Người lãnh đạo của bảo tàng</Typography>
                <Typography pt={1} pb={5} fontSize={{ xs: '14px', md: '16px'}}>
                    Chúng tôi rất mong được chào đón bạn đến với bảo tàng. Vui lòng xem lại kỹ các hướng dẫn bên dưới trước khi bạn tới thăm. Chúng tôi có quyền từ chối bất kì khách 
                    hàng nào vi phạm quy định của bảo tàng. Xin cảm ơn
                </Typography>
            </Box>
            <Box px={{ xs: 3, md: 6}} mb={{ xs: 2, md: 4}} pt={{ xs: 3, md: 3}}>
                <Overall/>
            </Box>
        </Box>
    )
}

export default SeniorLeader;