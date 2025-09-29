import React, { useState } from "react";



import { NavigateBefore } from "@mui/icons-material";
import { Box, Button, Paper, Stack, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import IconButton from "@/components/IconButton/IconButton";
import CommonImage from "@/components/Image/index";



import { COLORS } from "@/constants/colors";
import useNotification from "@/hooks/useNotification";
import { PaintingPayload, sendApproval } from "@/services/display-service";
import { IPainting } from "@/types/display";
import DialogConfirm from "@/views/Manage/components/DialogConfirm";


interface SendApprovalProps {
    data: IPainting;
    onClose: () => void;
}

const SendApproval: React.FC<SendApprovalProps> = ({ data, onClose }) => {
    const notify = useNotification();
    const [openSendApproval, setOpenSendApproval] = useState(false);

    const handleOpenSendApproval = () => {
        setOpenSendApproval(true)
    }

    const handleSendApproval = async() => {
        try {
            const payload: PaintingPayload = {
                status: 'pending'
            }
            const res = await sendApproval(data.id, payload);
            notify({
                message: res.message,
                severity: 'success'
            })
            onClose() 
        } catch (error: any) {
            notify({
                message: error.message,
                severity: 'error'
            })
        }
    }
    return(
        <Box>
            <Stack my={1}>
                <IconButton
                handleFunt={onClose}
                icon={<NavigateBefore sx={{ width: '28px', height: '28px'}}/>}
                />
                <Typography pt={0.2} fontWeight={600} variant="h6">Chi tiết tác phẩm</Typography>
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
                <Grid container spacing={3}>
                    {data.images.map((img, index) => {
                        return (
                          <Grid key={index} size={{ xs: 12, sm: 4, md: 3 }}>
                            <CommonImage
                              src={img.url}
                              alt={img.name}
                              sx={{
                                width: { xs: '100%', md: 400 },
                                height: { xs: 200, sm: 450, md: 200 },
                                py: { xs: 1, md: 0 },
                                margin: '0 auto',
                              }}
                            />
                          </Grid>
                        );
                    })}
                </Grid>
                <Box mt={3} display='flex' justifyContent='flex-end'>
                    <Button onClick={handleOpenSendApproval} sx={{ bgcolor: COLORS.BUTTON, mr: 2 }}>Gửi phê duyệt</Button>
                    <Button onClick={onClose} variant="outlined" sx={{ border: '1px solid #000', color: '#000'}}>Quay lại</Button>
                </Box>
            </Paper>
            {openSendApproval && (
                <DialogConfirm
                    open={openSendApproval}
                    title="Bạn chắc chắn muốn gửi tác phẩm cho quản lý phê duyệt hay không?"
                    handleAgree={handleSendApproval}
                    onClose={() => setOpenSendApproval(false)}
                />
            )}
        </Box>
    )
}

export default SendApproval;