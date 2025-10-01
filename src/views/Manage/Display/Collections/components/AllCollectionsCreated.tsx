import IconButton from "@/components/IconButton/IconButton";
import { COLORS } from "@/constants/colors";
import SearchBox from "@/views/Manage/components/SearchBox";
import { Add, NavigateBefore } from "@mui/icons-material";
import { Box, Button, Stack, Typography } from "@mui/material";
import { useState } from "react";
import CreateCollection from "./CreateCollection";
import { FormDataCollection } from "@/types/display";
import useNotification from "@/hooks/useNotification";
import Backdrop from "@/components/Backdrop";
import { uploadImage } from "@/services/upload-service";

interface AllCollectionsCreatedProps{
    onBack: () => void;
}

export type FormErrors = {
    [K in keyof FormDataCollection]?: string
}

const AllCollectionsCreated = (props: AllCollectionsCreatedProps) => {
    const notify = useNotification();
    const { onBack } = props;
    const [errors, setErrors] = useState<FormErrors>({});
    const [formData, setFormData] = useState<FormDataCollection>({
        name: '',
        tags: '',
        description: ''
    })
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [image, setImage] = useState<string | null>(null);
    const [errorImg, setErrorImg] = useState<string>('');
    const [errorImgs, setErrorImgs] = useState<string>('');
    const [openCollection, setOpenCollection] = useState<{open: boolean, type: string}>({
        open: false,
        type: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleFileSelect = (file: File | null) => {
        setImageFile(file);
        setErrorImg('');
    }

    const handleOpenCreateCollection = () => {
        setOpenCollection({
            open: true,
            type: 'add'
        })
    }

    const reset = () => {
        setErrorImg('');
        setErrorImgs('');
        setImage(null);     // reset ảnh chính
        setImageFile(null);
        setErrors({});
        setFormData({ name: '', tags: '', description: ''})
    }

    const handleCloseCreateCollection = () => {
        setOpenCollection({
            open: false,
            type: 'add'
        });
        reset()
    }
    
    const handleInputChange = (name: string, value: any) => {
        setFormData(prev => ({ ...prev, [name]: value}));
        if(errors[name as keyof typeof errors]){
            setErrors(prev => ({ ...prev, [name]: undefined }))
        }
    }

    const validateForm = (): boolean => {
        const newErrors: FormErrors = {};
        if(!formData.tags) newErrors.tags = 'Vui lòng chọn chủ đề';
        if(!formData.name) newErrors.name = 'Vui lòng nhập tên';
        if(!formData.description) newErrors.description = 'Vui lòng nhập mô tả';
        if(!imageFile){
            setErrorImg("Vui lòng tải lên hình ảnh")
        };
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0 && !!imageFile
    }

    const handleSubmit = async() => {
        if(!validateForm()){
            return;
        }
        setIsSubmitting(true)
        try {
            // 1 ảnh
            const uploadResponse = await uploadImage(imageFile!, 'display/paintings/image');
            if(!uploadResponse.success || !uploadResponse.data?.file){
                throw new Error('Upload ảnh thất bại hoặc không nhận được URL ảnh');
            }
            console.log("uploadResponse.data: ",uploadResponse.data);
            
            let res: any;
            switch (openCollection.type) {
                case 'add':
                    
                    break;
            
                default:
                    break;
            }
        } catch (error: any) {
            notify({
                message: error.message,
                severity: 'error'
            })
        } finally {
            setIsSubmitting(false)
        }
    }
    
    return(
        <Box>
            {!openCollection.open && (
                <>
                    <SearchBox
                        initialValue=""
                        onSearch={() => {}}
                        placeholder="Tìm kiếm theo tên...."
                    >
                        <Button
                            sx={{ border: COLORS.BUTTON, bgcolor: COLORS.BUTTON}}
                            startIcon={<Add/>}
                            onClick={handleOpenCreateCollection}
                        >
                            Thêm mới bộ sưu tập
                        </Button>
                    </SearchBox>
                    <Stack my={1}>
                        <IconButton
                            handleFunt={onBack}
                            icon={<NavigateBefore sx={{ width: '28px', height: '28px'}}/>}
                        />
                        <Typography pt={0.2} fontWeight={600} variant="h6">Bộ sưu tập vừa tạo</Typography>
                    </Stack>
                </>
            )}
            {openCollection.open && openCollection.type === 'add' && (
                <>
                    <CreateCollection
                        onClose={handleCloseCreateCollection}
                        onFileSelect={handleFileSelect}
                        image={image}
                        error={{ errorImg, errorImgs }}
                        errors={errors}
                        formData={formData}
                        onInputChange={handleInputChange}
                        onSubmit={handleSubmit}
                    />
                    <Backdrop open={isSubmitting}/>
                </>
            )}
        </Box>
    )
}

export default AllCollectionsCreated;