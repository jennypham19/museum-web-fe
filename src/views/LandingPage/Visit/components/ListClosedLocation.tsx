import IconButton from "@/components/IconButton/IconButton";
import { Box, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { DATA_LIST_CLOSED_LOCATION } from "@/constants/data";


const ListClosedLocation = () => {
    const navigate = useNavigate();
    return(
        <Box>
            <Box display='flex' flexDirection='row' py={{ xs: 0, md: 1.5}} px={{ xs: 2, md: 10}}>
                <IconButton
                    handleFunt={() => navigate(-1)}
                    icon={<HomeIcon sx={{ width: { xs: 20, md: 30 }, height: { xs: 20, md: 30 }, color: '#000'}}/>}
                />
                <Typography mt={{ xs: 1, md: 1}} fontWeight={600} fontSize={{ xs: '12px', md: '18px'}}>
                    / Kế hoạch tham quan/ Địa điểm đóng cửa
                </Typography>
            </Box>
            <Box display='flex' flexDirection='column' py={{ xs: 1.5, md: 2}} px={{ xs: 2, md: 10}}>
                <Typography variant="h5" fontWeight={600}>Địa điểm đóng cửa</Typography>
                <Typography fontSize={{ xs: '13px', md: '16px'}} pt={2} pb={2} sx={{ whiteSpace: 'normal', wordBreak: 'break-word', borderBottom: '1px solid grey'}}>
                    Chúng tôi sẽ đóng cửa tới khi có thông báo mở lại.
                </Typography>
            </Box>
            {DATA_LIST_CLOSED_LOCATION.map((data, index) => {
                return(
                    <Box display='flex' flexDirection='column' py={{ xs: 1.5, md: 1.5}} px={{ xs: 2, md: 10}} mb={2}>
                        <Typography fontSize={{ xs: '16px', md: '22px'}} mb={0.5} fontWeight={600}>{data.title}</Typography>
                        <Typography fontSize={{ xs: '14px', md: '16px'}} mb={0.5}>{data.label}</Typography>
                        <Stack direction='row'>
                            <Typography fontSize={{ xs: '12px', md: '14px'}} fontWeight={600}>Xem trên bản đồ</Typography>
                            <NavigateNextIcon/>
                        </Stack>
                    </Box>
                )
            })}
        </Box>
    )
}

export default ListClosedLocation;