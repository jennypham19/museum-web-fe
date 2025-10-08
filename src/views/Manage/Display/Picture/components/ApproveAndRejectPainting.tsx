import { useState } from "react";



import { NavigateBefore } from "@mui/icons-material";
import { Box, Button, Paper, Stack, Typography } from "@mui/material";
import Grid from '@mui/material/Grid2';
import SendPainting from "./SendPainting";
import IconButton from "@/components/IconButton/IconButton";
import CommonImage from "@/components/Image/index";
import InputText from "@/components/InputText";



import { COLORS } from "@/constants/colors";
import { ROLE } from "@/constants/roles";
import useAuth from "@/hooks/useAuth";
import useNotification from "@/hooks/useNotification";
import { approvePainting, Payload, ApprovalReject, rejectApproval } from "@/services/display-service";
import { IPainting } from "@/types/display";
import DialogConfirm from "@/views/Manage/components/DialogConfirm";


interface ApproveAndRejectPaintingProps {
    type: string,
    data: IPainting,
    onClose: () => void;
}

const ApproveAndRejectPainting = (props: ApproveAndRejectPaintingProps) => {
    const { type, data, onClose } = props;
    const notify = useNotification();
    const { profile } = useAuth();
    const [openReject, setOpenReject] = useState(false);
    const [reason, setReason] = useState<string>('');
    const [errorReason, setErrorReason] = useState<string>('');
    const [painting, setPainting] = useState<IPainting | null>(null);
    const [sendOrApprove, setSendOrApprove] = useState<{ open: boolean, type: string }>({
        open: false,
        type: ''
    })
    
    const handleReject = () => {
        setOpenReject(true);
    }

    const handleOpenApprove = () => {
        setSendOrApprove({
            open: true,
            type: 'approve'
        })
    }

    const handleApprove = async() => {
        try {
            const payload: Payload = {
                status: 'approved',
                userIdApprove: profile?.id
            }
            const res = await approvePainting(data.id, payload);
            notify({
                message: res.message,
                severity: 'success'
            })
            onClose();
        } catch (error: any) {
            notify({
                message: error.message,
                severity: 'error'
            })
        }
    }

    const handleOpenSend = (data: IPainting) => {
        setSendOrApprove({
            open: true,
            type: 'send'
        })
        setPainting(data)
    }

    const handleRejectPainting = async() => {
        if(!reason){
            setErrorReason('Lý do không được để trống');
            return
        }
        try {
            const payload: ApprovalReject = {
              status: 'rejected',
              userIdApprove: profile?.id,
              rejectionReason: reason,
            };
            const res = await rejectApproval(data.id, 'painting', payload);
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
    
    return (
      <Box>
        <Stack my={1}>
          <IconButton
            handleFunt={onClose}
            icon={<NavigateBefore sx={{ width: '28px', height: '28px' }} />}
          />
          <Typography pt={0.2} fontWeight={600} variant='h6'>
            {type === 'approve' ? 'Duyệt tác phẩm' : 'Từ chối phê duyệt tác phẩm'}
          </Typography>
        </Stack>
        <Paper sx={{ m: 3, p: 3 }}>
          <Typography fontWeight={700} variant='h5'>
            {data.name}
          </Typography>
          <CommonImage src={data.imageUrl} sx={{ width: '100%', height: 400, my: 2 }} />
          {data.description.split('\n').map((item, idx) => {
            return (
              <Stack key={idx} direction='column' mb={1}>
                <Typography fontSize={{ xs: '14px', md: '15px' }}>{item}</Typography>
              </Stack>
            );
          })}
          <Stack
            mt={3}
            display='flex'
            justifyContent='space-between'
            direction={{ xs: 'column', md: 'row' }}
          >
            <Typography fontSize={{ xs: '14px', md: '15px' }}>
              Tác giả: <b>{data.author}</b>
            </Typography>
            <Typography fontSize={{ xs: '14px', md: '15px' }}>
              Thời kỳ: <b>{data.period}</b>
            </Typography>
          </Stack>
          <Typography mt={4} fontWeight={700}>
            Hình ảnh minh họa
          </Typography>
          <Grid container spacing={2}>
            {data.images.map((img, index) => {
              return (
                <Grid key={index} size={{ xs: 12, sm: 4, md: 3 }}>
                  <CommonImage
                    key={index}
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
          {!openReject && (
            <Box mt={3} display='flex' justifyContent='flex-end'>
              {type === 'approve' &&
                (profile?.role === ROLE.MOD ? (
                  <>
                    <Button
                      sx={{
                        bgcolor: COLORS.BUTTON,
                        mr: 2,
                        width: 120,
                      }}
                      onClick={handleOpenApprove}
                    >
                      Duyệt
                    </Button>
                    <Button
                      sx={{
                        bgcolor: COLORS.BUTTON,
                        mr: 2,
                        width: 120,
                      }}
                      onClick={() => handleOpenSend(data)}
                    >
                      Gửi lên Admin
                    </Button>
                  </>
                ) : (
                  <Button
                    onClick={handleOpenApprove}
                    sx={{ bgcolor: COLORS.BUTTON, mr: 2, width: 120 }}
                  >
                    Duyệt
                  </Button>
                ))}
              {type === 'reject' && (
                <Button onClick={handleReject} sx={{ bgcolor: COLORS.BUTTON, mr: 2, width: 120 }}>
                  Từ chối
                </Button>
              )}
              <Button
                onClick={onClose}
                variant='outlined'
                sx={{ border: '1px solid #000', color: '#000', width: 120 }}
              >
                Quay lại
              </Button>
            </Box>
          )}
          {openReject && (
            <>
              <Box mt={2}>
                <Typography fontWeight={700} fontSize='15px'>
                  Lý do từ chối
                </Typography>
                <InputText
                  label=''
                  type='text'
                  name='rejection_reason'
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
                  onClick={handleRejectPainting}
                  sx={{ bgcolor: COLORS.BUTTON, mr: 2, width: 120 }}
                >
                  Gửi
                </Button>
                <Button
                  onClick={() => {
                    setOpenReject(false);
                    setErrorReason('')
                  }}
                  variant='outlined'
                  sx={{ border: '1px solid #000', color: '#000', width: 100 }}
                >
                  Hủy
                </Button>
              </Box>
            </>
          )}
          {sendOrApprove.open && sendOrApprove.type === 'approve' && (
            <DialogConfirm
              open={sendOrApprove.open}
              title={`Bạn có chắc muốn duyệt tác phẩm "${data.name}" không? Hành động này sẽ chuyển tác phẩm sang trạng thái Đã duyệt`}
              handleAgree={handleApprove}
              onClose={() => {
                setSendOrApprove({
                  open: false,
                  type: 'approve',
                });
              }}
            />
          )}
          {sendOrApprove.open && sendOrApprove.type === 'send' && painting && (
            <SendPainting
              data={painting}
              open={sendOrApprove.open}
              onClose={() => {
                setSendOrApprove({
                  open: false,
                  type: 'send',
                });
              }}
            />
          )}
        </Paper>
      </Box>
    );
}
export default ApproveAndRejectPainting;