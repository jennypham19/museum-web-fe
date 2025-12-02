import { COLORS } from "@/constants/colors";
import NavigateBack from "@/views/Manage/components/NavigateBack";
import SearchBox from "@/views/Manage/components/SearchBox";
import { Add } from "@mui/icons-material";
import { Box, Button } from "@mui/material";
import { useState } from "react";
import CreateEvent from "./CreateEvent";

interface AllEventCreatedProps {
    onBack: () => void;
}

const AllEventCreated = (props: AllEventCreatedProps) => {
    const { onBack } = props;
    const [openEvent, setOpenEvent] = useState<{ open: boolean, type: string}>({
        open: false,
        type: ''
    })
    const [nameImg, setNameImg] = useState('');
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [image, setImage] = useState<string | null>(null);
    const [errorImg, setErrorImg] = useState<string>('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleFileSelect = (file: File | null) => {
        setImageFile(file);
        setErrorImg('');
    }

    const reset = () => {
        setErrorImg('');
        setImage(null);     // reset ảnh chính
        setImageFile(null);
    }

    /* Thêm mới sự kiện */
    const handleOpenCreateEvent = () => {
        setOpenEvent({ open: true, type: 'add' })
    }
    const handleCloseCreateEvent = () => {
        setOpenEvent({ open: false, type: 'add' });
        reset()
    }

    const handleInputChange = (name: string, value: any) => {

    }

    const handleSubmitAdd = async () => {

    }
    
    const handleSubmitEdit = async () => {

    }
    return(
        <Box>
            {!openEvent.open && (
                <>
                    <SearchBox
                        initialValue=""
                        onSearch={() => {}}
                        placeholder="Tìm kiếm theo tên...."
                    >
                        <Button
                            sx={{ border: COLORS.BUTTON, bgcolor: COLORS.BUTTON }}
                            startIcon={<Add/>}
                            onClick={handleOpenCreateEvent}
                        >
                            Thêm mới sự kiện
                        </Button>
                    </SearchBox>
                    <NavigateBack
                        onBack={onBack}
                        title="Sự kiện vừa tạo"
                    />
                </>
            )}
            {openEvent.open && openEvent.type === 'add' && (
                <>
                    <CreateEvent
                        onClose={handleCloseCreateEvent}
                        error={{ errorImg }}
                        onFileSelect={handleFileSelect}
                        image={image}
                        onInputChange={handleInputChange}
                    />
                </>
            )}
        </Box>
    )
}

export default AllEventCreated;