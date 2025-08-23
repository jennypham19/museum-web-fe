import DialogComponent from "@/components/DialogComponent";
import { Button, Typography } from "@mui/material";

interface DialogConfirmSuccessProps{
    open: boolean,
    onClose: () => void;
    title: string;
}

const DialogConfirmSuccess = ({ open, onClose, title} : DialogConfirmSuccessProps) => {
    return (
        <DialogComponent
            dialogKey={open}
            handleClose={onClose}
            isActiveHeader={false}
            isActiveFooter={false}
            isCenter={false}
        >
            <Typography fontWeight={700}>{title}</Typography>
            <Button
                variant="contained"
                onClick={onClose}
                sx={{ mt: 2, ml: 2, color: 'white', backgroundColor: "#1C1A1B", borderRadius: '20px', width: '100px' }}
            >
                Đóng
            </Button>
        </DialogComponent>
    )
}

export default DialogConfirmSuccess;