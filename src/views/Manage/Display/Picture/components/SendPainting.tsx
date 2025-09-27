import DialogComponent from "@/components/DialogComponent";
import InputSelect from "@/components/InputSelect";
import { IPainting } from "@/types/display";
import { Stack, Typography } from "@mui/material";
import { useState } from "react";

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
    return (
        <DialogComponent
            dialogKey={open}
            handleClose={onClose}
            dialogTitle="Gửi lên Admin"
            isActiveFooter={false}
        >
            <Stack direction='column' spacing={2}>
                <Typography>Chọn lý do gửi lên Admin cho tác phẩm: <b>{data.name}</b></Typography>
                <InputSelect
                    label=""
                    name="reason_send"
                    value={sendReason}
                    options={REASON_SENT}
                    transformOptions={(data) =>
                        data.map((item) => ({
                            value: item.value,
                            label: item.label
                        }))
                    }
                    onChange={(name, value: any) => setSendReason(value)}
                    placeholder="--- Chọn lý do ---"
                />
            </Stack>
        </DialogComponent>
    )
};

export default SendPainting;
