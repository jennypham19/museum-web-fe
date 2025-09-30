import DialogComponent from "@/components/DialogComponent";
import { Button, Typography } from "@mui/material";

interface DialogConfirmProps{
    open: boolean,
    onClose: () => void;
    title: string;
    handleAgree: () => void,
}

const DialogConfirm = ({ open, onClose, title, handleAgree} : DialogConfirmProps) => {
    return (
        <DialogComponent
            dialogKey={open}
            handleClose={onClose}
            isActiveHeader={false}
            isActiveFooter={false}
            isCenter={false}
            PaperProps={{
                sx: {
                position: "relative",
                zIndex: (theme) => theme.zIndex.modal + 1, // luôn cao hơn backdrop
                },
            }}
            BackdropProps={{
                sx: {
                zIndex: (theme) => theme.zIndex.modal, // backdrop dưới dialog
                backgroundColor: "rgba(0, 0, 0, 0.5)", // màu tối mờ
                },
            }}
        >
            <Typography fontWeight={700}>{title}</Typography>
            <Button
                
                variant="outlined"
                onClick={handleAgree}
                sx={{ mt: 2, border: "1px solid #1C1A1B", borderRadius: '20px', color: '#1C1A1B', width: '100px' }}
            >
                Đồng ý
            </Button>
            <Button
                variant="contained"
                onClick={onClose}
                sx={{ mt: 2, ml: 2, color: 'white', backgroundColor: "#1C1A1B", borderRadius: '20px', width: '100px' }}
            >
                Quay lại
            </Button>
        </DialogComponent>
    )
}

export default DialogConfirm;