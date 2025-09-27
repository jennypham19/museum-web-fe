import { useState } from "react";



import { NavigateBefore } from "@mui/icons-material";
import { Box, Button, Divider, Menu, MenuItem, Paper, Stack, Typography } from "@mui/material";
import Grid from '@mui/material/Grid2';
import IconButton from "@/components/IconButton/IconButton";
import CommonImage from "@/components/Image/index";
import InputText from "@/components/InputText";



import { COLORS } from "@/constants/colors";
import { IPainting } from "@/types/display";
import useAuth from "@/hooks/useAuth";
import { ROLE } from "@/constants/roles";


interface ApproveAndRejectPaintingProps {
    type: string,
    data: IPainting,
    onClose: () => void;
}

const ApproveAndRejectPainting = (props: ApproveAndRejectPaintingProps) => {
    const { type, data, onClose } = props;
    const { profile } = useAuth();
    const [openReject, setOpenReject] = useState(false);
    const [reason, setReason] = useState<string>('');
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popper' : undefined;

    const handleClick = (event: any) => {
        setAnchorEl(anchorEl ? null : event.currentTarget);
    };
    
    const handleReject = () => {
        setOpenReject(true);
    }
    
    return(
       <Box>
            <Stack my={1}>
                <IconButton
                    handleFunt={onClose}
                    icon={<NavigateBefore sx={{ width: '28px', height: '28px'}}/>}
                />
                <Typography pt={0.2} fontWeight={600} variant="h6">{type === 'approve' ? "Duyệt tác phẩm" : 'Từ chối phê duyệt tác phẩm'}</Typography>
            </Stack>
            <Paper sx={{ m: 3, p: 3}}>
                <Typography fontWeight={700} variant="h5">{data.name}</Typography>
                <CommonImage
                    src={data.imageUrl}
                    sx={{ width: '100%', height: 400, my: 2 }}
                />
                {data.description.split('\n').map((item, idx) => {
                    return (
                        <Stack key={idx} direction='column' mb={1}>
                        <Typography fontSize={{ xs: '14px', md: '15px' }}>{item}</Typography>
                        </Stack>
                    );
                })}
                <Stack mt={3} display='flex' justifyContent='space-between' direction={{ xs: 'column', md: 'row'}}>
                    <Typography fontSize={{ xs: '14px', md: '15px' }}>Tác giả: <b>{data.author}</b></Typography>
                    <Typography fontSize={{ xs: '14px', md: '15px' }}>Thời kỳ: <b>{data.period}</b></Typography>
                </Stack>
                <Typography mt={4} fontWeight={700}>Hình ảnh minh họa</Typography>
                <Grid container spacing={2}>
                    {data.images.map((img, index) => {
                        return (
                          <Grid key={index} size={{ xs: 12, sm: 4, md: 3 }}>
                            <CommonImage
                              key={index}
                              src={img.url}
                              alt={img.name}
                              sx={{
                                width: { xs: '100%', md: 200 },
                                height: { xs: 200, sm: 450,  md: 200 },
                                py: { xs: 1, md: 0 },
                                margin: '0 auto',
                              }}
                            />
                          </Grid>
                        );
                    })}
                </Grid>
                {!openReject && (
                    <Box mt={3} display='flex' justifyContent='flex-end'>
                        {type === 'approve' && (
                            profile?.role === ROLE.MOD ? (
                            <>
                                <Button
                                    sx={{
                                        bgcolor: COLORS.BUTTON,
                                        mr: 2, width: 120,
                                    }}
                                    onClick={handleClick}
                                    aria-describedby={id}
                                >
                                    Duyệt
                                </Button>
                                <Menu anchorEl={anchorEl} open={open} onClose={handleClick}>
                                    <MenuItem>
                                        Duyệt
                                    </MenuItem>
                                    <Divider/>
                                    <MenuItem>
                                        Quản trị viên duyệt
                                    </MenuItem>
                                </Menu>
                            </>
                            ) : (
                                <Button sx={{ bgcolor: COLORS.BUTTON, mr: 2, width: 120 }}>Duyệt</Button>
                            )
                        )}
                        {type === 'reject' && (
                            <Button
                                onClick={handleReject}
                                sx={{ bgcolor: COLORS.BUTTON, mr: 2, width: 120 }}
                            >
                                Từ chối
                            </Button>
                        )}
                        <Button onClick={onClose} variant="outlined" sx={{ border: '1px solid #000', color: '#000', width: 120}}>Quay lại</Button>
                    </Box>
                )}
                {openReject && (
                    <>
                        <Box mt={2}>
                            <Typography fontWeight={700} fontSize='15px'>Lý do từ chối</Typography>
                            <InputText
                                label=""
                                type="text"
                                name="rejection_reason"
                                value={reason}
                                onChange={(name: string, value: any) => setReason(value)}
                                multiline
                                rows={5}
                            />
                        </Box>
                        <Box mt={2} display='flex' justifyContent='center'>
                            <Button sx={{ bgcolor: COLORS.BUTTON, mr: 2, width: 120 }}>Lưu</Button>
                            <Button onClick={() => setOpenReject(false)} variant="outlined" sx={{ border: '1px solid #000', color: '#000', width: 100}}>Hủy</Button>
                        </Box>
                    </>
                )}
            </Paper>
       </Box> 
    )
}
export default ApproveAndRejectPainting;