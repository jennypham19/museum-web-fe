import { useState } from "react";



import { Alert, Button, Stack, Typography } from "@mui/material";
import DialogComponent from "@/components/DialogComponent";
import InputSelect from "@/components/InputSelect";
import InputText from "@/components/InputText";



import { COLORS } from "@/constants/colors";
import { IPainting } from "@/types/display";


interface SendPaintingProps{
    open: boolean;
    data: IPainting;
    onClose: () => void;
}

interface reasonSent {
    id: number,
    value: string,
    label: string
}

const REASON_SENT: reasonSent[] = [
    {
        id: 1,
        value: 'suspicious_content',
        label: 'Nghi ngờ nội dung nhạy cảm'
    },
    {
        id: 2,
        value: 'copyright',
        label: 'Nghi ngờ vi phạm bản quyền'
    },
    {
        id: 3,
        value: 'needs_quality_review',
        label: 'Cần kiểm tra chất lượng'
    },
    {
        id: 4,
        value: 'other',
        label: 'Khác'
    }
]

const SendPainting = (props: SendPaintingProps) => {
    const { open, data, onClose } = props;
    const [sendReason, setSendReason] = useState<string>('');
    const [errorReason, setErrorReason] = useState<string>('');
    const [errorNote, setErrorNote] = useState<string>('');
    const [openNote, setOpenNote] = useState(false);
    const [note, setNote] = useState<string>('');

    const handleChangeSendReason = (value: any) => {
        setSendReason(value);
        setErrorReason('')
        if(value === "other") {
            setOpenNote(true)
        }else{
            setOpenNote(false)
        }
    }

    const handleSend = async () => {
        if(!sendReason) {
            setErrorReason('Mục chọn lý do không được để trống.')
            return
        }
        if(!note) {
            setErrorNote('Mục ghi chú không được để trống.')
            return
        }
    }

    
    return (
      <DialogComponent
        dialogKey={open}
        handleClose={onClose}
        dialogTitle='Gửi lên Admin'
        isActiveFooter={false}
      >
        <Stack direction='column' spacing={2}>
          <Typography>
            Chọn lý do gửi lên Admin cho tác phẩm: <b>{data.name}</b>
          </Typography>
          <InputSelect
            label=''
            name='reason_send'
            value={sendReason}
            options={REASON_SENT}
            transformOptions={(data) =>
              data.map((item) => ({
                value: item.value,
                label: item.label,
              }))
            }
            onChange={(name, value: any) => handleChangeSendReason(value)}
            placeholder='--- Chọn lý do ---'
            error={!!errorReason}
            helperText={errorReason}
          />
          {openNote && (
            <InputText
              label='Ghi chú'
              placeholder='Ghi chi tiết lý do gửi...'
              name='note'
              type='text'
              value={note}
              onChange={(name, value: any) => {
                setNote(value);
                setErrorNote('')
              }}
              multiline
              rows={5}
              error={!!errorNote}
              helperText={errorNote}
            />
          )}
          <Alert severity='info'>Sau khi gửi, Admin sẽ nhận được thông báo và xử lý tiếp</Alert>
          <Stack display='flex' justifyContent='center' direction={{ xs: 'column', md: 'row' }}>
            <Button onClick={handleSend} sx={{ bgcolor: COLORS.BUTTON, width: 100 }}>
              Gửi
            </Button>
            <Button
              onClick={onClose}
              variant='outlined'
              sx={{ border: '1px solid #000', color: '#000', width: 100 }}
            >
              Hủy
            </Button>
          </Stack>
        </Stack>
      </DialogComponent>
    );
};

export default SendPainting;