import { Box, Typography } from "@mui/material";
import React from "react";
import HomeIcon from '@mui/icons-material/Home';
import IconButton from "@/components/IconButton/IconButton";
import { useNavigate } from "react-router-dom";

interface CommonNavbarProps{
    title: string
}

const CommonNavbar: React.FC<CommonNavbarProps> = ({ title }) => {
    const navigate = useNavigate();
    return(
        <Box display='flex' flexDirection='row' py={{ xs: 0, md: 1.5}} px={{ xs: 2, md: 10}}>
            <IconButton
                handleFunt={() => navigate('/home')}
                icon={<HomeIcon sx={{ width: { xs: 20, md: 30 }, height: { xs: 20, md: 30 }, color: '#000'}}/>}
            />
            <Typography mt={{ xs: 1, md: 1}} fontWeight={600} fontSize={{ xs: '12px', md: '18px'}}>{title}</Typography>
        </Box>
    )
}
export default CommonNavbar;