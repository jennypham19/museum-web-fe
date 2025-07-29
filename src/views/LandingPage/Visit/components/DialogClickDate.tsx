import DialogComponent from "@/components/DialogComponent";
import { Box, Button } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import React, { useState } from "react";

interface DialogClickDateProps{
    open: boolean,
    onClose: () => void;
    onConfirm: (date: Dayjs | null) => void;
}

const DialogClickDate: React.FC<DialogClickDateProps> = ({ open, onClose , onConfirm }) => {
    const [selectedDate, setSelectedDate] = useState<Dayjs | null>(dayjs());

    const handleConfirm = () => {
        if(!selectedDate) return;
        onConfirm(selectedDate);
    };

    const handleClose = () => {
        onClose()
    }
    return(
        <DialogComponent
            dialogKey={open}
            handleClose={handleClose}
            isActiveFooter={false}
            maxWidth='sm'
            dialogTitle="Chọn ngày cụ thể"
        >
            <DatePicker
                label="Chọn ngày tham quan"
                value={selectedDate}
                onChange={(newDate) => setSelectedDate(newDate)}
                format="DD/MM/YYYY"
                slotProps={{
                    textField: { fullWidth: true, size: "small" }
                }}
            />
            <Box display='flex' justifyContent='center' mt={3}>
                <Button onClick={handleConfirm} variant="contained" sx={{ bgcolor: '#160E0D', fontWeight: 600, mr: 2}}>Xác nhận</Button>
                <Button onClick={onClose} variant="outlined" sx={{ border: '1px solid #160E0D', color: '#160E0D', fontWeight: 600, mr: 2}}>Hủy</Button>
            </Box>
        </DialogComponent>
    )
}

export default DialogClickDate;