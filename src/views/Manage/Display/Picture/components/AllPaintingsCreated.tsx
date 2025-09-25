import IconButton from "@/components/IconButton/IconButton";
import { COLORS } from "@/constants/colors";
import useNotification from "@/hooks/useNotification";
import { createPainting, getPaintings } from "@/services/display-service";
import { uploadImage, uploadImages } from "@/services/upload-service";
import { FormDataPainting, IPainting } from "@/types/display";
import { Add, NavigateBefore } from "@mui/icons-material";
import { Alert, Box, Button, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import CreatePainting from "./CreatePainting";
import EditPainting from "./EditPainting";
import { useDataList } from "@/hooks/useDataList";
import SearchBox from "@/views/Manage/components/SearchBox";
import Grid from "@mui/material/Grid2";
import CardData from "@/views/Manage/components/CardData";
import CustomPagination from "@/components/Pagination/CustomPagination";
import Backdrop from "@/components/Backdrop";
import ViewPainting from "./ViewPainting";
import SendApproval from "./SendApproval";

interface AllPaintingsCreatedProps {
    onBack: () => void;
}

export type FormErrors = {
    [K in keyof FormDataPainting]?: string;
};

const AllPaintingsCreated: React.FC<AllPaintingsCreatedProps> = ({ onBack }) => {
    const notify = useNotification();
    const [errors, setErrors] = useState<FormErrors>({});
    const [formData, setFormData] = useState<FormDataPainting>({
        name: '',
        author: '',
        period: '',
        description: '',
        images: []
    });
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imageFiles, setImageFiles] = useState<File[]>([]);
    const [image, setImage] = useState<string | null>(null);
    const [images, setImages] = useState<string[]>([]);
    const [errorImg, setErrorImg] = useState<string>('');
    const [errorImgs, setErrorImgs] = useState<string>('');
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [openPainting, setOpenPainting] = useState<{type: string, open: boolean}>({
        type: '',
        open: false
    });
    const [painting, setPainting] = useState<IPainting | null> (null);
    
    const { listData, searchTerm, loading, error, handlePageChange, handleSearch, total, page, rowsPerPage, fetchData } = useDataList<IPainting>(getPaintings, 8, 'created');
    const handleOpenAddPainting = () => {
        setOpenPainting({
            type: 'add',
            open: true
        })
    }
    const handleClose = () => {
        setOpenPainting({
            type: 'add',
            open: false
        })
        setFormData({ name: '', author: '', period: '', description: '', images: []})
        setErrors({});
        setErrorImg('');
        setErrorImgs('');
        setImage(null);     // reset ảnh chính
        setImages([]);      // reset nhiều ảnh
        setImageFile(null);
        setImageFiles([]);
    }
    const handleInputChange = (name: string, value: any) => {
        setFormData(prev => ({ ...prev, [name]: value}));
        if(errors[name as keyof typeof errors]) {
            setErrors(prev => ({ ...prev, [name]: undefined}))
        }
    }
    const handleFileSelect = (file: File | null) => {
        setImageFile(file);
        setErrorImg('');
    }
    const handleFilesSelect = (files: File[]) => {
        setImageFiles(prev => [...prev, ...files]);
        setErrorImgs('')
    }
    const validateForm = (): boolean => {
        const newErrors: FormErrors = {};
        if(!formData.name) newErrors.name = 'Vui lòng nhập tên.';
        if(!formData.author) newErrors.author = 'Vui lòng nhập tác giả';
        if(!formData.period) newErrors.period = 'Vui lòng nhập thời kỳ';
        if(!formData.description) newErrors.description = 'Vui lòng nhập mô tả';
        if(!imageFile) {
            setErrorImg('Vui lòng tải lên hình ảnh.');
        };
        if(imageFiles.length === 0) {
            setErrorImgs('Vui lòng tải lên các hình ảnh.')
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0 && !!imageFile && imageFiles.length > 0;
    }

    const handleSubmit = async () => {
        if(!validateForm()) {
            return;
        }
        setIsSubmitting(true)
        try {
            // 1 ảnh
            const uploadResponse = await uploadImage(imageFile!, 'display/paintings/image');
            if(!uploadResponse.success || !uploadResponse.data?.file){
                throw new Error('Upload ảnh thất bại hoặc không nhận được URL ảnh');
            }

            // nhiều ảnh
            const uploadImgsResponses = await uploadImages(imageFiles, 'display/paintings/image');
            if(!uploadImgsResponses.success || !uploadImgsResponses.data?.files){
                throw new Error('Upload ảnh thất bại hoặc không nhận được URL ảnh');
            }

            const payload = {
                ...formData,
                imageUrl: uploadResponse.data.file.imageUrl,
                images: uploadImgsResponses.data.files
            }

            let res: any;
            switch (openPainting.type) {
                case 'add':
                    res = await createPainting(payload);
                    notify({
                        message: res.message,
                        severity: 'success'
                    });
                    handleClose();
                    fetchData(page, rowsPerPage, 'created')
                break;
            
                default:
                    break;
            }
        } catch (error: any) {
            notify({ message: error.message, severity: 'error'})
        }finally {
            setIsSubmitting(false )
        }
    }

    const handleOpenViewPainting = (data: IPainting) => {
        setOpenPainting({
            type: 'view',
            open: true
        });
        setPainting(data)
    }

    const handleCloseViewPainting = () => {
        setOpenPainting({
            type: 'view',
            open: false
        });
        setPainting(null)
    }

    const handleOpenEditPainting = (data: IPainting) => {
        setOpenPainting({ type: 'edit', open: true});
        setFormData({
            name: data.name,
            author: data.author,
            period: data.period,
            description: data.description,
            images: data.images
        })
        setImage(data.imageUrl)
    }

    const handleOpenSendApproval = (data: IPainting) => {
        setOpenPainting({ type: 'send-approval', open: true });
        setPainting(data)
    }

    const handleCloseSendApprovalPainting = () => {
        setOpenPainting({
            type: 'send-approval',
            open: false
        });
        setPainting(null)
        fetchData(page, rowsPerPage, 'created')
    }
    
    return (
        <Box>
            {!openPainting.open && (
                <>
                    <SearchBox
                        initialValue={searchTerm}
                        onSearch={handleSearch}
                        placeholder="Tìm kiếm theo tên, tác giả, thời kỳ...."
                    >
                        <Button
                            sx={{ border: COLORS.BUTTON, bgcolor: COLORS.BUTTON }}
                            startIcon={<Add />}
                            onClick={handleOpenAddPainting}
                        >
                            Thêm mới tác phẩm
                        </Button>
                    </SearchBox>
                    <Stack my={1}>
                        <IconButton
                            handleFunt={onBack}
                            icon={<NavigateBefore sx={{ width: '28px', height: '28px'}}/>}
                        />
                        <Typography pt={0.2} fontWeight={600} variant="h6">Tác phẩm vừa tạo</Typography>
                    </Stack>
                    {loading && (
                        <Backdrop open={loading}/>
                    )}
                    {error && !loading && (
                        <Alert severity="error" sx={{ my: 2 }}>{error}</Alert>
                    )}
                    {!loading && !error && (
                        <>
                            <Grid sx={{ px: 1.5}} container spacing={3}>
                                {listData.length === 0 ? (
                                    <Typography fontWeight={700} p={2}>Không tồn tại bản ghi nào.</Typography>
                                ) : (
                                    listData.map((painting, index) => {
                                        return(
                                            <Grid key={index} size={{ xs: 12, sm: 6, md: 4, lg: 3}}>
                                                <CardData
                                                    data={painting}
                                                    imageUrl={painting.imageUrl}
                                                    title={painting.name}
                                                    onOpenDetail={handleOpenViewPainting}
                                                    renderData={(painting) => (
                                                        <>
                                                            <Stack px={2} pb={2} direction='column'>
                                                                <Typography fontWeight={700} fontSize={{ xs: '16px', md: '20px'}}>{painting.name}</Typography>
                                                                <Typography fontSize={{ xs: '14px', md: '15px'}}>{`Nghệ sĩ: ${painting.author}`}</Typography>
                                                                <Typography fontSize={{ xs: '14px', md: '15px'}}>{`Thời gian: ${painting.period}`}</Typography>
                                                            </Stack>
                                                            <Box px={2} pb={2} display='flex' flexDirection={{ xs: 'column', lg: 'row'}} justifyContent='space-between'>
                                                                <Button 
                                                                    fullWidth 
                                                                    onClick={(e) => { 
                                                                        e.stopPropagation(); 
                                                                        painting && handleOpenSendApproval(painting)
                                                                    }} 
                                                                    variant="outlined" 
                                                                    sx={{ border: '1px solid #000', color: '#000'}}
                                                                >
                                                                    Gửi phê duyệt
                                                                </Button>
                                                                <Button 
                                                                    fullWidth 
                                                                    onClick={(e) => { 
                                                                        e.stopPropagation(); 
                                                                        painting && handleOpenEditPainting(painting)
                                                                    }} 
                                                                    variant="outlined" 
                                                                    sx={{ border: '1px solid #000', color: '#000', my: { xs: 1, lg: 0}, mx: { xs: 0, lg: 1.5} }}
                                                                >
                                                                    Chỉnh sửa
                                                                </Button>
                                                                <Button 
                                                                    fullWidth 
                                                                    variant="outlined" 
                                                                    sx={{ border: '1px solid #000', color: '#000'}}
                                                                >
                                                                    Xóa
                                                                </Button>
                                                            </Box>
                                                        </>
                                                    )}
                                                />
                                            </Grid>
                                        )
                                    })
                                )}

                            </Grid>
                            <CustomPagination
                                page={page}
                                rowsPerPage={rowsPerPage}
                                onPageChange={handlePageChange}
                                count={total}
                                sx={{ my: 1.5 }}
                            />
                        </>
                    )}

                </>
            )}
            {/* Thêm mới bản ghi */}
            {openPainting.open && openPainting.type === 'add' && (
                <>
                    <CreatePainting
                        error={{ errorImg, errorImgs }}
                        onFileSelect={handleFileSelect}
                        onFilesSelect={handleFilesSelect}
                        errors={errors}
                        formData={formData}
                        image={image}
                        images={images}
                        onInputChange={handleInputChange}
                        onSubmit={handleSubmit}
                        onClose={handleClose}
                    />
                    <Backdrop open={isSubmitting} />
                </>
            )}
            {/* Chỉnh sửa bản ghi */}
            {openPainting.open && openPainting.type === 'edit' && (
                <>
                    <EditPainting
                        error={{ errorImg, errorImgs }}
                        onFileSelect={handleFileSelect}
                        onFilesSelect={handleFilesSelect}
                        errors={errors}
                        formData={formData}
                        image={image}
                        images={formData.images.map(img => img.url)}
                        onInputChange={handleInputChange}
                        onSubmit={handleSubmit}
                        onClose={handleClose}
                    />
                    <Backdrop open={isSubmitting} />
                </>
            )}
            {/* Chi tiết bản ghi */}
            {openPainting.open && openPainting.type === 'view' && painting && (
                <ViewPainting
                    open={openPainting.open}
                    data={painting}
                    onClose={handleCloseViewPainting}
                />
            )}
            {/* Gửi phê duyệt bản ghi */}
            {openPainting.open && openPainting.type === 'send-approval' && painting && (
                <SendApproval
                    data={painting}
                    onClose={handleCloseSendApprovalPainting}
                />
            )}
        </Box>
    )
};

export default AllPaintingsCreated;