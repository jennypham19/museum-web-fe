import DialogComponent from "@/components/DialogComponent";
import { Avatar, Box, Button, Stack, Typography } from "@mui/material";
import React from "react";
import avatar from "@/assets/images/users/avatar.png";
import Grid from "@mui/material/Grid2";
import { IUser } from "@/types/user";
import { getRoleLabel } from "@/utils/labelEntoVni";

interface DialogDetailUserProps{
    open: boolean,
    onClose: () => void;
    userDetail: IUser;
}

const DialogDetailUser: React.FC<DialogDetailUserProps> = ({ open, onClose, userDetail}) => {
    return(
        <DialogComponent
            dialogKey={open}
            handleClose={onClose}
            isActiveFooter={false}
            isActiveHeader={false}
        >
            <Box p={2} display='flex' flexDirection='column'>
                <Grid container spacing={1}>
                    <Grid size={{ xs: 12}}>
                        <Stack direction='column' flexGrow={1} display='flex' justifyContent='center' alignItems='center' sx={{ my: 2}}>
                            <Avatar
                                src={userDetail.avatar_url ? userDetail.avatar_url : avatar}
                                sx={{ width: '150px', height: '150px', mb: 2, bgcolor: 'grey.600', borderRadius:'50%', boxShadow: 4 }}
                            />
                        </Stack>
                    </Grid>
                    <Grid size={{ xs: 12}}>
                        <Typography variant="h6" fontWeight={700}>{`NV ${userDetail.code}`}</Typography>
                    </Grid>
                    <Grid size={{ xs: 12}}>
                        <Grid container >
                            <Grid size={{ xs: 4}}>
                                <Typography variant="body2" fontWeight={500}>Tên đầy đủ:</Typography>
                            </Grid>
                            <Grid size={{ xs: 8}} sx={{ display: 'flex', justifyContent: 'start'}}>
                                <Typography variant="body2">{userDetail.full_name || '-'}</Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid size={{ xs: 12}}>
                        <Grid container spacing={1}>
                            <Grid size={{ xs: 4}}>
                                <Typography variant="body2" fontWeight={500}>Email:</Typography>
                            </Grid>
                            <Grid size={{ xs: 8}}>
                                <Typography variant="body2" sx={{ whiteSpace: 'pre-wrap'}}>{userDetail.email || '-'}</Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid size={{ xs: 12}}>
                        <Grid container spacing={1}>
                            <Grid size={{ xs: 4}}>
                                <Typography variant="body2" fontWeight={500}>Chức vụ:</Typography>
                            </Grid>
                            <Grid size={{ xs: 8}}>
                                <Typography variant="body2">{getRoleLabel(userDetail.role) || '-'}</Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid size={{ xs: 12}}>
                        <Grid container spacing={1}>
                            <Grid size={{ xs: 4}}>
                                <Typography variant="body2" fontWeight={500}>Số điện thoại:</Typography>
                            </Grid>
                            <Grid size={{ xs: 8}}>
                                <Typography variant="body2">{userDetail.phone_number || '-'}</Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
                <Box display="flex" justifyContent="flex-end">
                    <Button
                        variant="outlined"
                        sx={{ width: '100px', color: '#1C1A1B', border: '1px solid #1C1A1B'}}
                        onClick={onClose}
                    >
                        Đóng
                    </Button>
                </Box>
            
        </DialogComponent>
    )
}
export default DialogDetailUser;