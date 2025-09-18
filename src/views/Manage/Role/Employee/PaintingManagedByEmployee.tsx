import { Alert, Box, Button, Stack, TableCell, TableRow, Typography } from "@mui/material";
import { useState } from "react";
import SearchBox from "../../components/SearchBox";
import { COLORS } from "@/constants/colors";
import { Add, Delete, Edit, Visibility } from "@mui/icons-material";
import { IPainting, FormDataPainting } from "@/types/display";
import Backdrop from "@/components/Backdrop";
import TableData from "../../components/TableData";
import CommonImage from "@/components/Image/index";
import IconButton from "@/components/IconButton/IconButton";
import CustomPagination from "@/components/Pagination/CustomPagination";
import Grid from "@mui/material/Grid2";
import useNotification from "@/hooks/useNotification";
import InputText from "@/components/InputText";
import ImageUpload from "../../Blog/components/ImageUpload";
import ImagesUpload from "../../Blog/components/ImagesUpload";
import { uploadImage, uploadImages } from "@/services/upload-service";
import { createPainting } from "@/services/display-service";

export type FormErrors = {
    [K in keyof FormDataPainting]?: string;
};

const PaintingManagedByEmployee = () => {
    const notify = useNotification();
    const [searchTerm, setSearchTerm] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [paintings, setPaintings] = useState<IPainting[]>([]);
    const [page, setPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [total, setTotal] = useState(0);
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
    const [errorImg, setErrorImg] = useState<string>('');
    const [errorImgs, setErrorImgs] = useState<string>('');
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [openPainting, setOpenPainting] = useState<{type: string, open: boolean}>({
        type: '',
        open: false
    });
    const handleSearch = (value: string) => {
        setSearchTerm(value)
    };
    const handleOpenAddPainting = () => {
        setOpenPainting({
            type: 'add',
            open: true
        })
    }
    const handlePageChange = (newPage: number) => {
        setPage(newPage);
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
    }

    const handleInputChange = (name: string, value: any) => {
        setFormData(prev => ({ ...prev, [name]: value}));
        if(errors[name as keyof typeof errors]) {
            setErrors(prev => ({ ...prev, [name]: undefined}))
        }
    }
    const handleFileSelect = (file: File | null) => {
        setImageFile(file);
        setErrorImg('')
    }
    const handleFilesSelect = (files: File[]) => {
        setImageFiles(files);
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

            console.log("payload: ",payload);
            let res: any;
            switch (openPainting.type) {
                case 'add':
                    res = await createPainting(payload)
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

    return (
        <Box>
            <SearchBox
                initialValue={searchTerm}
                onSearch={handleSearch}
                placeholder="Tìm kiếm theo tên, tác giả, thời kỳ"
            >
                <Button
                    sx={{ border: COLORS.BUTTON, bgcolor: COLORS.BUTTON}}
                    startIcon={<Add/>}
                    onClick={handleOpenAddPainting}
                >
                    Thêm mới tác phẩm
                </Button>
            </SearchBox>
            {!openPainting.open && (
                <>
                    {loading && (
                        <Backdrop open={loading}/>
                        )}
                    {error && !loading && (
                        <Alert severity="error" sx={{ my: 2 }}>{error}</Alert>
                    )}
                    {!loading && !error && (
                        <Box my={2}>
                            <TableData
                                label="painting"
                                array={['STT', 'Tác phẩm', 'Tác giả/ Thời kỳ', 'Mô tả', 'Thao tác']}
                                data={paintings}
                                colSpan={5}
                                renderRow={(painting, index) => (
                                    <TableRow key={index}>
                                        <TableCell align="center">{index + 1}</TableCell>
                                        <TableCell align="center">
                                            <Stack direction={{ xs: 'column', md: 'row'}}>
                                                <CommonImage
                                                    src={painting.imageUrl}
                                                    sx={{ width: 60, height: 60}}
                                                />
                                                <Typography variant="subtitle2">{painting.name}</Typography>
                                            </Stack>
                                        </TableCell>
                                        <TableCell>{`${painting.author}/${painting.period}`}</TableCell>
                                        <TableCell>{painting.description}</TableCell>
                                        <TableCell>
                                            <IconButton
                                                handleFunt={() => {}}
                                                icon={<Visibility color="primary"/>}
                                                tooltip="Xem chi tiết"
                                            />
                                            <IconButton
                                                handleFunt={() => {}}
                                                icon={<Edit color="info"/>}
                                                tooltip="Chỉnh sửa"
                                            />
                                            <IconButton
                                                handleFunt={() => {}}
                                                icon={<Delete color="error"/>}
                                                tooltip="Xóa"
                                            />
                                        </TableCell>
                                    </TableRow>
                                )}
                            />
                            <Box display='flex' justifyContent='center' mt={2}>
                                <CustomPagination
                                    count={total}
                                    page={page}
                                    rowsPerPage={rowsPerPage}
                                    onPageChange={handlePageChange}
                                />
                            </Box>
                        </Box>
                    )}
                </>
            )}
            {openPainting.open && (
                <Grid container spacing={3}>
                    <Grid size={{ xs: 12, md: 4 }}>
                        <Box m={3} bgcolor='#fff' p={4}>
                            <Typography mb={1} textAlign='center' fontWeight={700} variant="h5">
                                {openPainting.type === 'edit' ? 'Chỉnh sửa tác phẩm' : 'Thêm mới tác phẩm'}
                            </Typography>
                            <Grid container spacing={3}>
                                <Grid size={{ xs: 12}}>
                                    <Typography fontWeight={700} fontSize='15px'>Hình ảnh</Typography>
                                    <ImageUpload
                                        onFileSelect={handleFileSelect}
                                    />
                                    {errorImg && (<Typography color="error" variant="caption" sx={{ mt: 1}}>{errorImg}</Typography>)}
                                </Grid>
                                <Grid size={{ xs: 12 }}>
                                    <Typography fontWeight={700} fontSize='15px'>Tên</Typography>
                                    <InputText
                                        label=""
                                        name="name"
                                        type="text"
                                        value={formData.name}
                                        placeholder="Nhập thông tin"
                                        onChange={handleInputChange}
                                        error={!!errors.name}
                                        helperText={errors.name}
                                    />
                                </Grid>
                                <Grid size={{ xs: 12}}>
                                    <Typography fontWeight={700} fontSize='15px'>Tác giả</Typography>
                                    <InputText
                                        label=""
                                        name="author"
                                        type="text"
                                        value={formData.author}
                                        placeholder="Nhập thông tin"
                                        onChange={handleInputChange}
                                        error={!!errors.author}
                                        helperText={errors.author}
                                    />
                                </Grid>
                                <Grid size={{ xs: 12}}>
                                    <Typography fontWeight={700} fontSize='15px'>Thời kỳ</Typography>
                                    <InputText
                                        label=""
                                        name="period"
                                        type="text"
                                        value={formData.period}
                                        placeholder="Nhập thông tin"
                                        onChange={handleInputChange}
                                        error={!!errors.period}
                                        helperText={errors.period}
                                    />
                                </Grid>
                                <Grid size={{ xs: 12}}>
                                    <Typography fontWeight={700} fontSize='15px'>Mô tả</Typography>
                                    <InputText
                                        label=""
                                        name="description"
                                        type="text"
                                        value={formData.description}
                                        placeholder="Nhập thông tin"
                                        onChange={handleInputChange}
                                        error={!!errors.description}
                                        helperText={errors.description}
                                        rows={5}
                                        multiline
                                    />
                                </Grid>
                                <Grid size={{ xs: 12}}>
                                    <Typography fontWeight={700} fontSize='15px'>Hình ảnh bổ sung thêm</Typography>
                                    <ImagesUpload
                                        onFilesSelect={handleFilesSelect}
                                    />
                                    {errorImgs && (<Typography color="error" variant="caption">{errorImgs}</Typography>)}
                                </Grid>
                            </Grid>
                            <Stack display='flex' direction='row' justifyContent='center' spacing={2} sx={{ my: 3 }}>
                                <Button
                                    sx={{ bgcolor: COLORS.BUTTON, width: 120}}
                                    onClick={handleSubmit}
                                >
                                    Tạo
                                </Button>
                                <Button
                                    variant="outlined"
                                    sx={{ border: '1px solid #000', color: '#000', width: 120}}
                                    onClick={handleClose}
                                >
                                    Hủy
                                </Button>
                            </Stack>
                        </Box>
                        <Backdrop open={isSubmitting}/>
                    </Grid>
                    <Grid size={{ xs: 12, md: 8 }}>
                        {loading && (
                            <Backdrop open={loading}/>
                        )}
                        {error && !loading && (
                            <Alert severity="error" sx={{ my: 2 }}>{error}</Alert>
                        )}
                        {!loading && !error && (
                            <Box my={3} mr={3}>
                                <TableData
                                    label="painting"
                                    array={['STT', 'Tác phẩm', 'Tác giả/Thời kỳ', 'Mô tả', 'Thao tác']}
                                    data={paintings}
                                    colSpan={5}
                                    renderRow={(painting, index) => (
                                        <TableRow key={index}>
                                            <TableCell align="center">{index + 1}</TableCell>
                                            <TableCell align="center">
                                                <Stack direction={{ xs: 'column', md: 'row'}}>
                                                    <CommonImage
                                                        src={painting.imageUrl}
                                                        sx={{ width: 60, height: 60}}
                                                    />
                                                    <Typography variant="subtitle2">{painting.name}</Typography>
                                                </Stack>
                                            </TableCell>
                                            <TableCell align="center">{`${painting.author}/${painting.period}`}</TableCell>
                                            <TableCell align="center">{painting.description}</TableCell>
                                            <TableCell align="center">
                                                <IconButton
                                                    handleFunt={() => {}}
                                                    icon={<Visibility color="primary"/>}
                                                    tooltip="Xem chi tiết"
                                                />
                                                <IconButton
                                                    handleFunt={() => {}}
                                                    icon={<Edit color="info"/>}
                                                    tooltip="Chỉnh sửa"
                                                />
                                                <IconButton
                                                    handleFunt={() => {}}
                                                    icon={<Delete color="error"/>}
                                                    tooltip="Xóa"
                                                />
                                            </TableCell>
                                        </TableRow>
                                    )}
                                />
                            </Box>
                        )}
                    </Grid>
                </Grid>
            )}
        </Box>
    )
}

export default PaintingManagedByEmployee;