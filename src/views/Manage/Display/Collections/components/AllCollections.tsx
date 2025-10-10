import Backdrop from "@/components/Backdrop";
import useAuth from "@/hooks/useAuth";
import { useDataList } from "@/hooks/useDataList";
import useNotification from "@/hooks/useNotification";
import { getCollections, publish, Published, updateCollection } from "@/services/display-service";
import { DataStatusProps, FormDataCollection, ICollection } from "@/types/display";
import FilterTabs from "@/views/Manage/components/FilterTabs";
import NavigateBack from "@/views/Manage/components/NavigateBack";
import SearchBox from "@/views/Manage/components/SearchBox";
import { Alert, Box, Button, Chip, Stack, Typography} from "@mui/material";
import React, { useState } from "react";
import Grid from "@mui/material/Grid2"
import CardData from "@/views/Manage/components/CardData";
import { getStatusLabel, getStatusLabelColor } from "@/utils/labelEntoVni";
import CustomPagination from "@/components/Pagination/CustomPagination";
import ViewCollection from "./ViewCollection";
import EditCollection from "./EditCollection";
import { uploadImage } from "@/services/upload-service";
import DialogConfirm from "@/views/Manage/components/DialogConfirm";

interface AllCollectionProps{
    onBack: () => void;
}

const DataStatus: DataStatusProps[] = [
  {
    id: 1,
    value: 'all',
    label: 'Tất cả',
  },
  {
    id: 2,
    value: 'pending',
    label: 'Bộ sưu tập chờ duyệt',
  },
  {
    id: 3,
    value: 'reviewing',
    label: 'Bộ sưu tập đang duyệt',
  },
  {
    id: 4,
    value: 'approved',
    label: 'Bộ sưu tập đã phê duyệt',
  },
  {
    id: 5,
    value: 'rejected',
    label: 'Bộ sưu tập thất bại',
  },
];

export type FormErrors = {
    [K in keyof FormDataCollection]?: string;
};

const AllCollections: React.FC<AllCollectionProps> = ({ onBack }) => {
    const notify = useNotification();
    const { profile } = useAuth();
    const [errors, setErrors ] = useState<FormErrors>({});
    const [formData, setFormData] = useState<FormDataCollection>({
        name: '',
        description: '',
        tags: []
    });
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [image, setImage] = useState<string | null>(null);
    const [nameImg, setNameImg] = useState('');
    const [errorImg, setErrorImg] = useState<string>('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [viewMode, setViewMode] = useState<'all' | 'pending' | 'reviewing' | 'approved' | 'rejected'>('all');
    const [openCollection, setOpenCollection] = useState<{open: boolean, type: string}>({
        open: false,
        type: ''
    });
    const [openPublishCollection, setOpenPublishCollection] = useState(false);
    const [collection, setCollection] = useState<ICollection | null>(null);
    const {
        listData,
        searchTerm,
        loading,
        error,
        handlePageChange,
        handleSearch,
        total,
        page,
        rowsPerPage,
        fetchData
    } = useDataList<ICollection>(getCollections, 8, viewMode, profile?.id);

    const handleFileSelect = (file: File | null) => {
        setImageFile(file);
        setErrorImg('');
        setImage(null);
    }

    const reset = () => {
        setErrorImg('');
        setImage(null);     // reset ảnh chính
        setImageFile(null);
        setErrors({});
        setFormData({ name: '', tags: [], description: ''})
    }

    // Chi tiết bộ sưu tập
    const handleOpenViewCollection = (data: ICollection) => {
        setCollection(data)
        setOpenCollection({ open: true, type: 'view' })
    }

    const handleCloseViewCollection = () => {
        setCollection(null);
        setOpenCollection({ open: false, type: 'view' })
    }

    // Chỉnh sửa bộ sưu tập
    const handleOpenEditCollection = (data: ICollection) => {
        setImage(data.imageUrl)
        setNameImg(data.nameImage)
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
        setOpenCollection({ open: false, type: 'edit' });
        setCollection(null);
    }

    // Đăng tải/ Hủy bộ sưu tập
    const handleOpenPublishCollection = (data: ICollection) => {
        setOpenPublishCollection(true);
        setCollection(data)
    }

    const handleClosePublishCollection = () => {
        setOpenPublishCollection(false);
        setCollection(null)
    }

    const handlePublishCollection = async() => {
        try {
            const payload: Published = {
                is_published: !collection?.isPublished
            };
            const res = collection && await publish(Number(collection.id), 'collection', payload);
            notify({
                message: res?.message,
                severity: 'success'
            })
            handleClosePublishCollection();
            fetchData(page, rowsPerPage, viewMode, profile?.id)
        } catch (error: any) {
            notify({
                message: error.message,
                severity: 'error'
            })
        }
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

    const validateForm = (): boolean => {
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
    
    const handleSubmit = async() => {
        if(!validateForm()){
            return;
        }
        setIsSubmitting(true);
        try {
            let imageUrl = image;
            let nameImage = nameImg;

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
            }
            const res = await updateCollection(Number(collection?.id), payload);
            notify({
                message: res.message,
                severity: 'success'
            })
            reset();
            onBack()
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
                        placeholder="Tìm kiếm theo tên, chủ đề...."
                    />
                    <NavigateBack onBack={onBack} title="Trạng thái bộ sưu tập"/>
                    <Box m={2}>
                        <FilterTabs data={DataStatus} viewMode={viewMode} onChange={setViewMode}/>
                    </Box>
                    {loading && <Backdrop open={loading}/>}
                    {error && !loading && (
                        <Alert severity="error" sx={{ my: 2 }}>{error}</Alert>
                    )}
                    {!loading && !error && (
                        <>
                            <Grid sx={{ px: 1.5 }} container spacing={3}>
                                {listData.length === 0 ? (
                                    <Typography>Không tồn tại bản ghi nào.</Typography>
                                ) : (
                                    listData.map((collection, index) => {
                                        return (
                                            <Grid key={index} size={{ xs: 12, sm: 6, md: 3 }}>
                                                <CardData
                                                    data={collection}
                                                    imageUrl={collection.imageUrl}
                                                    title={collection.name}
                                                    onOpenDetail={handleOpenViewCollection}
                                                    renderData={(collection) => (
                                                        <>
                                                            <Stack px={2} pb={2} direction='column'>
                                                                <Stack display='flex' justifyContent='flex-end'>
                                                                    {collection.status && (
                                                                        <Chip
                                                                            label={getStatusLabel(collection.status)}
                                                                            color={getStatusLabelColor(collection.status).color}
                                                                        />
                                                                    )}
                                                                </Stack>
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
                                                            <Box px={2} pb={2}>
                                                                {(collection.status === 'pending' || collection.status === 'rejected') && (
                                                                    <Button
                                                                        fullWidth
                                                                        variant="outlined"
                                                                        sx={{ border: '1px solid #000', color: '#000'}}
                                                                        onClick={(e) => {
                                                                            e.stopPropagation();
                                                                            collection && handleOpenEditCollection(collection)
                                                                        }}
                                                                    >
                                                                        Chỉnh sửa
                                                                    </Button>
                                                                )}
                                                                {collection.status === 'approved' && (
                                                                    <Button
                                                                        fullWidth
                                                                        variant="outlined"
                                                                        sx={{ border: '1px solid #000', color: '#000'}}
                                                                        onClick={(e) => {
                                                                            e.stopPropagation();
                                                                            collection && handleOpenPublishCollection(collection)
                                                                        }}
                                                                    >
                                                                        {collection.isPublished ? 'Hủy đăng tải' : 'Đăng tải'}
                                                                    </Button>
                                                                )}
                                                            </Box>
                                                        </>
                                                    )}
                                                />
                                            </Grid>
                                        )
                                    })
                                )}
                            </Grid>
                            <Box display='flex' justifyContent='center' alignItems='center'>
                                <CustomPagination
                                    page={page}
                                    rowsPerPage={rowsPerPage}
                                    onPageChange={handlePageChange}
                                    count={total}
                                    sx={{ my: 1.5}}
                                />
                            </Box>
                        </>
                    )}
                </>
            )}
            {openCollection.open && openCollection.type === 'view' && collection && (
                <ViewCollection
                    data={collection}
                    onClose={handleCloseViewCollection}
                />
            )}
            {openCollection.open && openCollection.type === 'edit' && collection && (
                <>
                    <EditCollection
                        data={collection}
                        onClose={handleCloseEditCollection}
                        onFileSelect={handleFileSelect}
                        image={image}
                        error={{ errorImg }}
                        errors={errors}
                        formData={formData}
                        onInputChange={handleInputChange}
                        onSubmit={handleSubmit}
                        onSubTopicsChange={handleSubTopicsChange}
                    />
                    <Backdrop open={isSubmitting}/>
                </>
            )}
            {openPublishCollection && collection && (
                <DialogConfirm
                    open={openPublishCollection}
                    title={collection.isPublished ? 'Bạn chắc chắn muốn hủy đăng tải bộ sưu tập?' : 'Bạn chắc chắn muốn đăng bộ sưu tập lên page hay không?'}
                    onClose={handleClosePublishCollection}
                    handleAgree={handlePublishCollection}
                />
            )}
        </Box>
    )
}

export default AllCollections;