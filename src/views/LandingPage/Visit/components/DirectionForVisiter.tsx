import IconBtn from "@/components/IconButton/IconButton";
import { Box, IconButton, List, ListItem, ListItemText, Paper, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home';
import { useState } from "react";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { DATA_DIRECT_VISTITOR } from "@/constants/data";

const DirectionForVister = () => {
    const navigate = useNavigate();
    const [openId, setOpenId] = useState<number | null>(1);
    const toggleOpen = (id: number) => {
        setOpenId((prevId) => (prevId === id ? null : id))
    };
    return(
        <Box mb={5}>
            <Box display='flex' flexDirection='row' py={{ xs: 0, md: 1.5}} px={{ xs: 2, md: 10}}>
                <IconBtn
                    handleFunt={() => navigate(-1)}
                    icon={<HomeIcon sx={{ width: { xs: 20, md: 30 }, height: { xs: 20, md: 30 }, color: '#000'}}/>}
                />
                <Typography mt={{ xs: 1, md: 1}} fontWeight={600} fontSize={{ xs: '12px', md: '18px'}}>
                    / Kế hoạch tham quan/ Tìm hiểu về bảo tàng/ Hướng dẫn khách thăm quan
                </Typography>
            </Box>
            <Box display='flex' flexDirection='column' py={{ xs: 1.5, md: 2}} px={{ xs: 2, md: 10}}>
                <Typography variant="h5" fontWeight={600}>Hướng dẫn khách thăm quan</Typography>
                <Typography fontSize={{ xs: '13px', md: '16px'}} pt={2} pb={2} sx={{ whiteSpace: 'normal', wordBreak: 'break-word', borderBottom: '1px solid grey'}}>
                    Chúng tôi rất mong được chào đón bạn đến với bảo tàng. Vui lòng xem lại kỹ các hướng dẫn bên dưới trước khi bạn tới thăm. Chúng tôi có quyền từ chối bất kì khách hàng nào vi phạm quy định của bảo tàng. Xin cảm ơn!
                </Typography>
            </Box>
            {DATA_DIRECT_VISTITOR.map((data, index) => {
                return(
                    <Box key={index} display='flex' flexDirection='column' py={{ xs: 1.5, md: 2}} px={{ xs: 2, md: 10}}>
                        <Paper variant="outlined" sx={{ p: 2, borderRadius: 1, bgcolor: '#f5f5f5', border: '1px solid black' }}>
                            <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ borderBottom: '1px solid grey'}}>
                                <Typography variant="subtitle1" fontWeight={700}>
                                    {data.title}
                                </Typography>
                                <IconButton onClick={() => data.id && toggleOpen(data.id)} size="small">
                                {openId === data.id ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                                </IconButton>
                            </Box>

                            {openId === data.id && (
                                <Box mt={1}>
                                    { data.label && (<Typography variant="subtitle2">{data.label}</Typography>)}
                                    {data.content.split('\n').map((item, idx) => {
                                        return(
                                            <List dense key={idx}>
                                                <ListItemText sx={{ ml: 2}} primary={`• ${item}`}/>
                                            </List>
                                        )
                                    })}
                                </Box>
                            )}
                        </Paper>
                    </Box>
                )
            })}
        </Box>
    )
}

export default DirectionForVister;