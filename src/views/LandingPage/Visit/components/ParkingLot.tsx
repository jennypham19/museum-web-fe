import IconBtn from "@/components/IconButton/IconButton";
import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Divider, Paper, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home';
import Grid from "@mui/material/Grid2";
import React, { useState } from "react";
import ReportIcon from '@mui/icons-material/Report';
import IconButton from "@/components/IconButton/IconButton";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

interface TypoTextProps {
    label: string,
    borderBottom?: string,
}

interface VehicleItemProps{
    name: string, 
    count: number;
    onChange: (newCount: number) => void;
}

const TypoText: React.FC<TypoTextProps> = ({ label, borderBottom}) => (
    <Typography height={40} fontSize={{ xs: '13px', md: '16px'}} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', borderBottom: borderBottom}} fontWeight={500}>
        {label}
    </Typography>
)

const VehicleItem: React.FC<VehicleItemProps> = ({ name, count, onChange }) => {

    return(
        <Paper
            elevation={1}
            sx={{
                px: 2,
                py: 2,
                mb: 1.5,
                borderRadius: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                boxShadow: '0px 1px 3px 1px rgba(0, 0, 0, 0.15), 0px 1px 2px 0px rgba(0, 0, 0, 0.3)',
            }}
        >
            <Typography fontSize={{ xs: '14px', md: '18px'}} fontWeight={700}>{name}</Typography>
            <Stack direction='row' spacing={1} alignItems='center'>
                <IconButton
                    handleFunt={() => onChange(Math.max(count - 1, 0))}
                    icon={<RemoveIcon/>}
                    sx={{
                        "&:hover":{
                            bgcolor: 'white'
                        }
                    }}
                    border="1px solid"
                    height={20}
                    width={20}
                    disabled={count === 0}
                />
                <Typography pt={0.5} px={2} color="text.secondary" textAlign='center'>{count.toString().padStart(2, '0')}</Typography>
                <IconButton
                    handleFunt={() => onChange(count + 1)}
                    icon={<AddIcon/>}
                    sx={{
                        "&:hover":{
                            bgcolor: 'white'
                        }
                    }}
                    border="1px solid"
                    height={20}
                    width={20}
                />
            </Stack>
        </Paper>
    )
}

const ParkingLot = () => {
    const navigate = useNavigate();
    const [expanded, setExpanded] = useState(true);
    const [summaryText, setSummaryText] = useState('Hệ khách hàng');
    const [xeMayCount, setXeMayCount] = useState(0);
    const [xeOtoCount, setXeOtoCount] = useState(0);

    const handleSelectText = (text: string) => {
        setSummaryText(text);
        setExpanded(false)
    };

    const total = xeMayCount + xeOtoCount;

    return(
        <Box mb={5}>
            <Box display='flex' flexDirection='row' py={{ xs: 0, md: 1.5}} px={{ xs: 2, md: 10}}>
                <IconBtn
                    handleFunt={() => navigate(-1)}
                    icon={<HomeIcon sx={{ width: { xs: 20, md: 30 }, height: { xs: 20, md: 30 }, color: '#000'}}/>}
                />
                <Typography mt={{ xs: 1, md: 1}} fontWeight={600} fontSize={{ xs: '12px', md: '18px'}}>
                    / Kế hoạch tham quan/ Tìm hiểu về bảo tàng/ Hướng dẫn bãi đỗ xe
                </Typography>
            </Box>
            <Box display='flex' flexDirection='column' py={{ xs: 1.5, md: 2}} px={{ xs: 2, md: 10}}>
                <Typography variant="h5" fontWeight={600}>Hướng dẫn vào bãi đỗ xe</Typography>
                <Typography fontSize={{ xs: '13px', md: '16px'}} pt={2} pb={2} sx={{ whiteSpace: 'normal', wordBreak: 'break-word', borderBottom: '1px solid grey'}}>
                    Bãi đỗ xe của bảo tàng nằm trên 128 Phạm Hùng_cửa số 5_đường Phạm Hùng mở cửa 24/24 giờ hằng ngày. Bãi đỗ xe dành cho du khách và một số người xung quang
                    đăng kí gửi. Nếu bạn muốn gửi xe tại đây vui lòng mua vé trực tiếp tại quầy.
                </Typography>
            </Box>
            {/* Giá gửi xe */}
            <Box display='flex' flexDirection='column' py={{ xs: 1.5, md: 2}} px={{ xs: 2, md: 10}}>
                <Typography fontWeight={600} fontSize={{ xs: '18px', md: '22px'}}>Giá gửi xe cho từng loại xe</Typography>
                <Typography mt={1} fontSize={{ xs: '13px', md: '16px'}}>Hiện có 128 tác phẩm đang trong quá trình sửa chữa</Typography>
                <Box mt={3} width={{ xs: '100%', md: '70%'}}>
                    <Grid container sx={{ border: '1px solid black', display:'flex', justifyContent:'center'}}>
                        {/* Tiêu đề */}
                        <Grid size={{ xs: 3}} sx={{ borderRight: '1px solid black', borderBottom: '1px solid black'}}>
                            <TypoText label="Loại xe"/>
                        </Grid>
                        <Grid size={{ xs: 3}} sx={{ borderRight: '1px solid black', borderBottom: '1px solid black'}}>
                            <TypoText label="Thời gian"/>
                        </Grid>
                        <Grid size={{ xs: 3}} sx={{ borderRight: '1px solid black', borderBottom: '1px solid black'}}>
                            <TypoText label="Giá thường"/>
                        </Grid>
                        <Grid size={{ xs: 3}} sx={{ borderBottom: '1px solid black'}}>
                            <TypoText label="Giá thành viên"/>
                        </Grid>

                        {/* Xe máy */}
                        <Grid size={{ xs: 3}} sx={{ borderRight: '1px solid black', borderBottom: '1px solid black'}}>
                            <Typography height='100%' fontSize={{ xs: '13px', md: '16px'}} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center'}} fontWeight={500}>
                                Xe máy
                            </Typography>
                        </Grid>
                        <Grid size={{ xs: 3}} sx={{ borderRight: '1px solid black', borderBottom: '1px solid black'}}>
                            <Stack direction='column'>
                                <TypoText borderBottom='1px solid #C1C1C1' label="0 - 3 tiếng" />
                                <TypoText borderBottom='1px solid #C1C1C1' label="3 - 5 tiếng" />
                                <TypoText borderBottom='1px solid #C1C1C1' label="5 - 7 tiếng" />
                                <TypoText label="< 7 tiếng" />
                            </Stack>
                        </Grid>
                        <Grid size={{ xs: 3}} sx={{ borderRight: '1px solid black', borderBottom: '1px solid black'}}>
                            <Stack direction='column'>
                                <TypoText borderBottom='1px solid #C1C1C1' label="5.000 VNĐ" />
                                <TypoText borderBottom='1px solid #C1C1C1' label="7.000 VNĐ" />
                                <TypoText borderBottom='1px solid #C1C1C1' label="10.000 VNĐ" />
                                <TypoText label="20.000 VNĐ" />
                            </Stack>
                        </Grid>
                        <Grid size={{ xs: 3}} sx={{ borderBottom: '1px solid black'}}>
                            <Stack direction='column'>
                                <TypoText borderBottom='1px solid #C1C1C1' label="Miễn phí" />
                                <TypoText borderBottom='1px solid #C1C1C1' label="Miễn phí" />
                                <TypoText borderBottom='1px solid #C1C1C1' label="Miễn phí" />
                                <TypoText label="10.000 VNĐ" />
                            </Stack>
                        </Grid>

                        {/* Xe Ô tô */}
                        <Grid size={{ xs: 3}} sx={{ borderRight: '1px solid black'}}>
                            <Typography height='100%' fontSize={{ xs: '13px', md: '16px'}} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center'}} fontWeight={500}>
                                Xe Ô tô
                            </Typography>
                        </Grid>
                        <Grid size={{ xs: 3}} sx={{ borderRight: '1px solid black'}}>
                            <Stack direction='column'>
                                <TypoText borderBottom='1px solid #C1C1C1' label="0 - 5 tiếng" />
                                <TypoText borderBottom='1px solid #C1C1C1' label="5 - 7 tiếng" />
                                <TypoText borderBottom='1px solid #C1C1C1' label="7 - 9 tiếng" />
                                <TypoText label="< 12 tiếng" />
                            </Stack>
                        </Grid>
                        <Grid size={{ xs: 3}} sx={{ borderRight: '1px solid black'}}>
                            <Stack direction='column'>
                                <TypoText borderBottom='1px solid #C1C1C1' label="20.000 VNĐ" />
                                <TypoText borderBottom='1px solid #C1C1C1' label="30.000 VNĐ" />
                                <TypoText borderBottom='1px solid #C1C1C1' label="50.000 VNĐ" />
                                <TypoText label="120.000 VNĐ" />
                            </Stack>
                        </Grid>
                        <Grid size={{ xs: 3}}>
                            <Stack direction='column'>
                                <TypoText borderBottom='1px solid #C1C1C1' label="Miễn phí" />
                                <TypoText borderBottom='1px solid #C1C1C1' label="Miễn phí" />
                                <TypoText borderBottom='1px solid #C1C1C1' label="20.000 VNĐ" />
                                <TypoText label="50.000 VNĐ" />
                            </Stack>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
            {/* End giá gửi xe */}

            {/* Đặt trước chỗ để xe */}
            <Box display='flex' flexDirection='column' py={{ xs: 1.5, md: 2}} px={{ xs: 2, md: 10}}>
                <Typography fontWeight={600} fontSize={{ xs: '18px', md: '22px'}}>Đặt trước chỗ gửi xe</Typography>
                <Typography mt={1} mb={2.5} fontSize={{ xs: '13px', md: '16px'}}>Chọn phương tiện và số lượng phương tiện của bạn</Typography>
                <Paper sx={{ bgcolor: '#E6E6E6', p: { xs: 3, md: 4}, display: 'flex', flexDirection: 'column', borderRadius: '10px'}}>
                    <Stack direction='row' mb={2}>
                        <ReportIcon sx={{ fontSize: { xs: '20px', md: '30px'}}}/>
                        <Typography px={{ xs: 1, md: 2}} fontSize={{ xs: '14px', md: '20px'}} fontWeight={600}>Lưu ý</Typography>
                    </Stack>
                    <Typography sx={{  whiteSpace: 'normal', wordBreak: 'break-word' }} fontWeight={500} fontSize={{ xs: '13px', md: '17px'}}>
                        Khi đặt trước chỗ gửi xe ban quản lý sẽ lưu lại thông tin xe của bạn và giữ chỗ cho bạn, vui lòng đọc biển số xe để lấy vé gửi xe tại quầy.
                        Xin lỗi quý khách vì thanh toán gửi xe không thể thanh toán bằng hình thức online vì số lượng thời gian không xác định, sau khi ra về hãy thanh
                        toán trực tiếp phí gửi xe tại quầy và đưa trả thẻ gửi cho ban quản lý. Xin cảm ơn
                    </Typography>
                </Paper>
                <Grid sx={{ mt: 3}} container spacing={3}>
                    <Grid size={{ xs: 12, md: 8}}>
                        <VehicleItem name="Xe máy" count={xeMayCount} onChange={setXeMayCount}/>
                        <VehicleItem name="Xe Ô tô" count={xeOtoCount} onChange={setXeOtoCount}/>
                        <Accordion
                            expanded={expanded}
                            onChange={() => setExpanded(!expanded)}
                            sx={{ borderRadius: 2, boxShadow: '0px 1px 3px 1px rgba(0, 0, 0, 0.15), 0px 1px 2px 0px rgba(0, 0, 0, 0.3)', mt: 1, py: 0.6}}
                        >
                            <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ fontSize: '30px'}}/>}>
                                <Typography fontSize={{ xs: '14px', md: '18px'}} fontWeight={700}>{summaryText}</Typography>
                            </AccordionSummary>
                            <AccordionDetails sx={{ p: 0 }}>
                                <Divider sx={{ mx: 2, border: '0.5px solid grey'}}/>
                                <Box px={2} py={1.5} sx={{ cursor: 'pointer'}} onClick={() => handleSelectText("Khách hàng ghé thăm bảo tàng")}>
                                    <Typography fontSize={{ xs: '13px', md: '16px'}}>Khách hàng ghé thăm bảo tàng</Typography>
                                </Box>
                                <Divider sx={{ mx: 2}}/>
                                <Box px={2} py={1.5} sx={{ cursor: 'pointer'}} onClick={() => handleSelectText("Thành viên bảo tàng")}>
                                    <Typography fontSize={{ xs: '13px', md: '16px'}}>Thành viên bảo tàng</Typography>
                                </Box>
                            </AccordionDetails>
                        </Accordion>
                    </Grid>
                    <Grid size={{ xs: 12, md: 4}} sx={{ display: 'flex', justifyContent: 'flex-end'}}>
                        <Box
                            sx={{
                                boxShadow: '0px 1px 3px 1px rgba(0, 0, 0, 0.15), 0px 1px 2px 0px rgba(0, 0, 0, 0.3)',
                                width: { xs: '100%', md: '70%'},
                                display: 'flex', flexDirection: 'column', p: { xs: 2, md: 4}, borderRadius: 2, bgcolor: 'white', height: { xs: 160, md: 180}
                            }}
                        >
                            <Stack mb={1} direction='row' display='flex' justifyContent='space-between'>
                                <Typography fontWeight={700}>Tổng số xe</Typography>
                                <Typography>{`${total} xe`}</Typography>
                            </Stack>
                                {xeMayCount > 0 && (<Typography>{`• ${xeMayCount} xe máy`}</Typography>)}
                                {xeOtoCount > 0 && (<Typography>{`• ${xeOtoCount} xe ô tô`}</Typography>)}
                            <Button
                                variant="contained"
                                fullWidth
                                sx={{
                                    color: 'white',
                                    height: 40,
                                    background: 'linear-gradient(45deg, #D30000 30%, #780000 90%)',
                                    fontSize: '18px', mt: 2
                                }}
                            >
                                Đặt chỗ
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
            {/* End đặt trước chỗ để xe */}

        </Box>
    )
}

export default ParkingLot;