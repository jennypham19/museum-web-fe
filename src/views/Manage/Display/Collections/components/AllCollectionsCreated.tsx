import { useState } from "react";
import { Add } from "@mui/icons-material";
import { Alert, Box, Button, Stack, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import AttactArtCollection from "./AttactArtCollection";
import CreateCollection from "./CreateCollection";
import EditCollection from "./EditCollection";
import ViewCollection from "./ViewCollection";
import Backdrop from "@/components/Backdrop";
import CustomPagination from "@/components/Pagination/CustomPagination";
import { COLORS } from "@/constants/colors";
import useAuth from "@/hooks/useAuth";
import { useDataList } from "@/hooks/useDataList";
import useNotification from "@/hooks/useNotification";
import { createCollection, getCollections, updateCollection } from "@/services/display-service";
import { uploadImage } from "@/services/upload-service";
import { FormDataCollection, ICollection } from "@/types/display";
import CardData from "@/views/Manage/components/CardData";
import SearchBox from "@/views/Manage/components/SearchBox";
import ApproveCollection from "./ApproveCollection";
import NavigateBack from "@/views/Manage/components/NavigateBack";


interface AllCollectionsCreatedProps{
    onBack: () => void;
}

export type FormErrors = {
    [K in keyof FormDataCollection]?: string
}

const AllCollectionsCreated = (props: AllCollectionsCreatedProps) => {
    const notify = useNotification();
    const { profile } = useAuth();
    const { onBack } = props;
    const [errors, setErrors] = useState<FormErrors>({});
    const [formData, setFormData] = useState<FormDataCollection>({
        name: '',
        tags: [],
        description: ''
    })
    const [nameImg, setNameImg] = useState('');
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [image, setImage] = useState<string | null>(null);
    const [errorImg, setErrorImg] = useState<string>('');
    const [errorImgs, setErrorImgs] = useState<string>('');
    const [openCollection, setOpenCollection] = useState<{open: boolean, type: string}>({
        open: false,
        type: '' //add, edit, attact-art, send-approval, view
    });
    const [openDeleteCollection, setOpenDeleteCollection] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [collection, setCollection] = useState<ICollection | null>(null);

    const { listData, searchTerm, loading, error, handlePageChange, handleSearch, total, page, rowsPerPage, fetchData } = useDataList<ICollection>(getCollections, 8, 'created', profile?.id);
    
    
    const handleFileSelect = (file: File | null) => {
        setImageFile(file);
        setErrorImg('');
    }

    const reset = () => {
        setErrorImg('');
        setErrorImgs('');
        setImage(null);     // reset ảnh chính
        setImageFile(null);
        setErrors({});
        setFormData({ name: '', tags: [], description: ''})
    }

    // Thêm mới bộ sưu tập
    const handleOpenCreateCollection = () => {
        setOpenCollection({
            open: true,
            type: 'add'
        })
    }

    const handleCloseCreateCollection = () => {
        setOpenCollection({
            open: false,
            type: 'add'
        });
        reset();
        onBack();
        fetchData(page, rowsPerPage, 'created', profile?.id)
    }

    // Xem chi tiết bộ sưu tập
    const handleOpenViewCollection = (data: ICollection) => {
        setCollection(data);
        setOpenCollection({ open: true, type: 'view' })
    }

    const handleCloseViewCollection = () => {
        setCollection(null);
        setOpenCollection({ open: false, type: 'view'})
    }

    // Chỉnh sửa bộ sưu tập
    const handleOpenEditCollection = (data: ICollection) => {
        setImage(data.imageUrl)
        setNameImg(data.name)
        setFormData({
            name: data.name,
            tags: data.tags.split(','),
            description: data.description
        })
        setOpenCollection({ open: true, type: 'edit' })
        setCollection(data)
    }
    
    const handleCloseEditCollection = () => {
        reset();
        onBack();
        setOpenCollection({ open: false, type: 'edit' });
        setCollection(null);
        fetchData(page, rowsPerPage, 'created', profile?.id)
    }

    // Gán tác phẩm vào bộ sưu tập
    const handleOpenAttactArtCollection = (data: ICollection) => {
        setCollection(data)
        setOpenCollection({ open: true, type: 'attach' })
    }
    const handleCloseAttactArtCollection = () => {
        setCollection(null)
        setOpenCollection({ open: false, type: 'attach' });
        fetchData(page, rowsPerPage, 'created', profile?.id)
    }

    // Duyệt bộ sưu tập
    const handleOpenApproveCollection = (data: ICollection) => {
        setCollection(data);
        setOpenCollection({ open: true, type: 'approve' })
    }

    const handleCloseApproveCollection = () => {
        reset();
        setOpenCollection({ open: false, type: 'approve'})
        setCollection(null);
        fetchData(page, rowsPerPage, 'created', profile?.id)
    }
    
    const handleInputChange = (name: string, value: any) => {
        setFormData(prev => ({ ...prev, [name]: value}));
        if(errors[name as keyof typeof errors]){
            setErrors(prev => ({ ...prev, [name]: undefined }))
        }
    }

    const handleSubTopicsChange = (name: string, value: any) => {
        setFormData(prev => ({ ...prev, [name]: value}));
        if(errors[name as keyof typeof errors]){
            setErrors(prev => ({ ...prev, [name]: undefined }))
        }
    }

    const validateFormAdd = (): boolean => {
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

    const validateFormEdit = (): boolean => {
        const newErrors: FormErrors = {};
        if(!formData.tags) newErrors.tags = 'Vui lòng chọn chủ đề';
        if(!formData.name) newErrors.name = 'Vui lòng nhập tên';
        if(!formData.description) newErrors.description = 'Vui lòng nhập mô tả';
        if(!imageFile && !image){
            setErrorImg("Vui lòng tải lên hình ảnh")
        };
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0
    }

    const handleSubmitAdd = async() => {
        if(!validateFormAdd()){
            return;
        }
        setIsSubmitting(true)
        try {
            // 1 ảnh
            let uploadResponse: any
            uploadResponse = await uploadImage(imageFile!, 'display/paintings/image');
            if(!uploadResponse.success || !uploadResponse.data?.file){
                throw new Error('Upload ảnh thất bại hoặc không nhận được URL ảnh');
            }
            const payload = {
                name: formData.name,
                tags: formData.tags.join(", "),
                description: formData.description,
                imageUrl: uploadResponse.data.file.imageUrl,
                nameImage: uploadResponse.data.file.fileName,
                curatorId: profile && profile.id  
            };
            const res = await createCollection(payload);
            notify({
                message: res.message,
                severity: 'success'
            });
            handleCloseCreateCollection()
        } catch (error: any) {
            notify({
                message: error.message,
                severity: 'error'
            })
        } finally {
            setIsSubmitting(false)
        }
    }

    const handleSubmitEdit = async() => {
        if(!validateFormEdit()){
            return;
        }
        setIsSubmitting(true)
        try {
            let imageUrl = image;
            let nameImage = nameImg;
            // 1 ảnh
            if(imageFile){
                let uploadResponse: any
                uploadResponse = await uploadImage(imageFile!, 'display/paintings/image');
                if(!uploadResponse.success || !uploadResponse.data?.file){
                    throw new Error('Upload ảnh thất bại hoặc không nhận được URL ảnh');
                }
                imageUrl = uploadResponse.data.file.imageUrl;
                nameImage = uploadResponse.data.file.fileName
            }
            const payload = {
                name: formData.name,
                tags: formData.tags.join(", "),
                description: formData.description,
                imageUrl: imageUrl,
                nameImage: nameImage,
                curatorId: profile && profile.id  
            };
            const res = await updateCollection(Number(collection?.id), payload)
            notify({
                message: res.message,
                severity: 'success'
            })
            handleCloseEditCollection()
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
                        initialValue={searchTerm}
                        onSearch={handleSearch}
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
                    <NavigateBack
                        onBack={onBack}
                        title="Bộ sưu tập vừa tạo"
                    />
                    {loading && (
                        <Backdrop open={loading}/>
                    )}
                    {error && !loading && (
                        <Alert severity="error" sx={{ my: 2 }}>{error}</Alert>
                    )}
                    {!loading && !error && (
                        <>
                            <Grid sx={{ px: 1.5 }} container spacing={3}>
                                {listData.length === 0 ? (
                                    <Typography fontWeight={700} p={2}>Không tồn tại bản ghi nào.</Typography>
                                ) : (
                                    listData.map((collection, index)=> {
                                        return(
                                            <Grid key={index} size={{ xs: 12, sm: 6, md: 4, xxl: 3}}>
                                                <CardData
                                                    data={collection}
                                                    imageUrl={collection.imageUrl}
                                                    title={collection.name}
                                                    onOpenDetail={handleOpenViewCollection}
                                                    renderData={(collection) => (
                                                        <>
                                                            <Stack px={2} pb={2} direction='column'>
                                                                <Typography fontWeight={700} fontSize={{ xs: '16px', md: '20px'}}>{collection.name}</Typography>
                                                                <Typography 
                                                                    fontSize={{ xs: '14px', md: '15px'}}
                                                                    sx={{
                                                                        opacity: 0.8, 
                                                                        overflow: 'hidden',
                                                                        textOverflow: 'ellipsis',
                                                                        display: '-webkit-box',
                                                                        WebkitLineClamp: 2,
                                                                        WebkitBoxOrient: 'vertical',
                                                                        whiteSpace: 'normal',
                                                                        wordBreak: 'break-word',  
                                                                    }}
                                                                >
                                                                    {collection.description}
                                                                </Typography>
                                                            </Stack>
                                                            <Box px={2} pb={{ xs: 0, lg: 2}} display='flex' flexDirection={{ xs: 'column', lg: 'row'}} justifyContent='space-between'>
                                                                <Button
                                                                    fullWidth
                                                                    onClick={(e) => {
                                                                        e.stopPropagation();
                                                                        collection && handleOpenEditCollection(collection)
                                                                    }}
                                                                    variant="outlined"
                                                                    sx={{ border: '1px solid #000', color: '#000'}}
                                                                >
                                                                    Chỉnh sửa
                                                                </Button>
                                                                <Button
                                                                    fullWidth
                                                                    onClick={(e) => {
                                                                        e.stopPropagation();
                                                                        collection && handleOpenAttactArtCollection(collection)
                                                                    }}
                                                                    variant="outlined"
                                                                    sx={{ border: '1px solid #000', color: '#000', my: { xs: 1, lg: 0}, mx: { xs: 0, lg: 1.5}}}
                                                                >
                                                                    Gán tác phẩm
                                                                </Button>
                                                            </Box>
                                                            <Box px={2} pb={2} display='flex' flexDirection={{ xs: 'column', lg: 'row'}} justifyContent='space-between'>
                                                                <Button
                                                                    fullWidth
                                                                    onClick={(e) => {
                                                                        e.stopPropagation();
                                                                        collection && handleOpenApproveCollection(collection)
                                                                    }}
                                                                    variant="outlined"
                                                                    sx={{ border: '1px solid #000', color: '#000'}}
                                                                    disabled={collection.arts && collection.arts.length === 0}
                                                                >
                                                                    Gửi phê duyệt
                                                                </Button>
                                                                <Button
                                                                    fullWidth
                                                                    onClick={() => {}}
                                                                    variant="outlined"
                                                                    sx={{ border: '1px solid #000', color: '#000', my: { xs: 1, lg: 0}, mx: { xs: 0, lg: 1.5}}}
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
                        onSubmit={handleSubmitAdd}
                        onSubTopicsChange={handleSubTopicsChange}
                    />
                    <Backdrop open={isSubmitting}/>
                </>
            )}
            {openCollection.open && openCollection.type === 'edit' && (
                <>
                    <EditCollection
                        onClose={handleCloseEditCollection}
                        onFileSelect={handleFileSelect}
                        image={image}
                        error={{ errorImg }}
                        errors={errors}
                        formData={formData}
                        onInputChange={handleInputChange}
                        onSubmit={handleSubmitEdit}
                        onSubTopicsChange={handleSubTopicsChange}
                    />
                    <Backdrop open={isSubmitting}/>
                </>
            )}
            {openCollection.open && openCollection.type === 'view' && collection && (
                <ViewCollection
                    data={collection}
                    onClose={handleCloseViewCollection}
                />
            )}
            {openCollection.open && openCollection.type === 'attach' && collection && (
                <>
                    <AttactArtCollection
                        onClose={handleCloseAttactArtCollection}
                        id={collection.id}
                    />
                </>
            )}
            {openCollection.open && openCollection.type === 'approve' && collection && (
                <>
                    <ApproveCollection
                        data={collection}
                        onClose={handleCloseApproveCollection}
                    />
                </>
            )}
        </Box>
    )
}

export default AllCollectionsCreated;