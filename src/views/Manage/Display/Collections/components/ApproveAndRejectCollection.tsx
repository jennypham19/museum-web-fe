import IconButton from "@/components/IconButton/IconButton";
import useNotification from "@/hooks/useNotification";
import { ICollection } from "@/types/display";
import { NavigateBefore } from "@mui/icons-material";
import { Box, Button, Stack, Typography} from "@mui/material";

import CollectionDetail from "./CollectionDetail";
import { COLORS } from "@/constants/colors";
import useAuth from "@/hooks/useAuth";
import { useState } from "react";
import { ROLE } from "@/constants/roles";
import InputText from "@/components/InputText";
import { ApprovalReject, rejectApproval } from "@/services/display-service";

interface ApproveAndRejectCollecionProps{
    type: string,
    data: ICollection,
    onClose: () => void;
}

const ApproveAndRejectCollecion = (props: ApproveAndRejectCollecionProps) => {
    const { type, data, onClose } = props;
    const notify = useNotification();
    const { profile } = useAuth();
    const [openReject, setOpenReject] = useState(false);
    const [reason, setReason] = useState<string>('');
    const [errorReason, setErrorReason] = useState<string>('');
    const [collection, setCollection] = useState<ICollection | null>(null);
    const [sendOrApprove, setSendOrApprove] = useState<{ open: boolean, type: string }>({
        open: false,
        type: ''
    })
    const handleReject = () => {
        setOpenReject(true);
    }
    const handleRejectCollection = async() => {
        if(!reason){
            setErrorReason('Lý do không được để trống');
            return;
        }
        try {
            const payload: ApprovalReject = {
                status: 'rejected',
                userIdApprove: profile?.id,
                rejectionReason: reason
            };
            const res = await rejectApproval(data.id, 'collection', payload);
            notify({
                message: res.message,
                severity: 'success'
            });
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
                    icon={<NavigateBefore sx={{ width: 28, height: 28}}/>}
                />
                <Typography pt={0.2} fontWeight={600} variant='h6'>
                    {type === 'approve' ? 'Duyệt tác phẩm' : 'Từ chối phê duyệt tác phẩm'}
                </Typography>
            </Stack>
            <Box p={3}>
                <CollectionDetail
                    collection={data}
                    onBack={onClose}
                    type={type}
                >
                    {!openReject && (
                        <Box mt={2} display='flex' justifyContent='flex-end'>
                            {type === 'approve' && 
                                (profile?.role === ROLE.MOD ? (
                                    <>
                                        <Button
                                            sx={{
                                                bgcolor: COLORS.BUTTON,
                                                width: 120,
                                            }}
                                            onClick={() => {}}
                                        >
                                            Duyệt
                                        </Button>
                                        <Button
                                            sx={{
                                                mx: 2,
                                                bgcolor: COLORS.BUTTON,
                                                width: 120,
                                            }}
                                            onClick={() => {}}
                                        >
                                            Gửi lên Admin
                                        </Button>
                                    </>
                                ) : (
                                    <Button
                                        onClick={() => {}}
                                        sx={{ bgcolor: COLORS.BUTTON, mr: 2, width: 120}}
                                    >
                                        Duyệt
                                    </Button>
                                ))
                            }
                            {type === 'reject' && (
                                <Button onClick={handleReject} sx={{ bgcolor: COLORS.BUTTON, mr: 2, width: 120}}>
                                    Từ chối
                                </Button>
                            )}
                            <Button
                                variant="outlined"
                                sx={{ 
                                    border: '1px solid #000',
                                    color: '#000',
                                    width: 100
                                }}
                                onClick={onClose}
                            >
                                Quay lại
                            </Button>
                        </Box>
                    )}
                </CollectionDetail>
                {openReject && (
                    <>
                        <Box mt={2}>
                            <Typography fontWeight={700} fontSize='15px'>
                                Lý do từ chối
                            </Typography>
                            <InputText
                                label=""
                                type="text"
                                name="rejection_reason"
                                value={reason}
                                onChange={(name: string, value: any) => {
                                    setReason(value);
                                    setErrorReason('');
                                }}
                                multiline
                                rows={5}
                                error={!!errorReason}
                                helperText={errorReason}
                            />
                        </Box>
                        <Box mt={2} display='flex' justifyContent='center'>
                            <Button
                                onClick={handleRejectCollection}
                                sx={{ bgcolor: COLORS.BUTTON, mr: 2, width: 120}}
                            >
                                Gửi
                            </Button>
                            <Button
                                onClick={() => {
                                    setOpenReject(false);
                                    setErrorReason('')
                                }}
                                variant="outlined"
                                sx={{ border: '1px solid #000', color: '#000', width: 120}}
                            >
                                Hủy
                            </Button>
                        </Box>
                    </>
                )}
            </Box>
        </Box>
    )
}

export default ApproveAndRejectCollecion;