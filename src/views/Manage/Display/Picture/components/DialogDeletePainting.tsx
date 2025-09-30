import DialogComponent from "@/components/DialogComponent";
import { IPainting } from "@/types/display";
import { Stack, Typography } from "@mui/material";

interface DialogDeletePaintingProps{
    open: boolean;
    data: IPainting;
    onClose: () => void;
}

const DialogDeletePainting = (props: DialogDeletePaintingProps) => {
    const { open, data, onClose } = props;
    return (
        <DialogComponent
            dialogKey={open}
            isActiveFooter={false}
            dialogTitle="Xóa tác phẩm"
            handleClose={onClose}
        >
            <Stack direction='column' spacing={2}>
                <Typography>
                    Chọn lý do gửi lên Admin cho tác phẩm: <b>{data.name}</b>
                </Typography>
            </Stack>
        </DialogComponent>
    )
}

export default DialogDeletePainting;