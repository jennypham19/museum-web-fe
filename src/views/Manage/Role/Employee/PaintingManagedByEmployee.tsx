import { useState } from "react";



import { Add, Delete, Edit, Visibility } from "@mui/icons-material";
import { Alert, Box, Button, Stack, TableCell, TableRow, Tooltip, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import ImagesUpload from "../../Blog/components/ImagesUpload";
import ImageUpload from "../../Blog/components/ImageUpload";
import SearchBox from "../../components/SearchBox";
import TableData from "../../components/TableData";
import CreatePainting from "../../Display/Picture/components/CreatePainting";
import EditPainting from "../../Display/Picture/components/EditPainting";
import ViewPainting from "../../Display/Picture/components/ViewPainting";
import Backdrop from "@/components/Backdrop";
import IconButton from "@/components/IconButton/IconButton";
import CommonImage from "@/components/Image/index";
import InputText from "@/components/InputText";
import CustomPagination from "@/components/Pagination/CustomPagination";



import { COLORS } from "@/constants/colors";
import { useDataList } from "@/hooks/useDataList";
import useNotification from "@/hooks/useNotification";
import { createPainting, getPaintings } from "@/services/display-service";
import { uploadImage, uploadImages } from "@/services/upload-service";
import { FormDataPainting, IPainting } from "@/types/display";


export type FormErrors = {
    [K in keyof FormDataPainting]?: string;
};

const PaintingManagedByEmployee = () => {
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

    const { listData, fetchData, page, rowsPerPage, total, loading, searchTerm, handlePageChange, handleSearch, error } = useDataList<IPainting>(getPaintings)

    const handleOpenAddPainting = () => {
        setOpenPainting({
            type: 'add',
            open: true
        })
    }

    const handleOpenViewPainting = (data: IPainting) => {
        setOpenPainting({
            type: 'view',
            open: true
        });
        setPainting(data)
    }

    const handleOpenEditPainting = (data: IPainting) => {
        setOpenPainting({
            type: 'edit',
            open: true
        });
        setFormData({
            name: data.name,
            author: data.author,
            period: data.period,
            description: data.description,
            images: data.images
        })
        setImage(data.imageUrl)
    }

    const handleCloseViewPainting = () => {
        setOpenPainting({
            type: 'view',
            open: false
        });
        setPainting(null)
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
        if (file) {
            const previewUrl = URL.createObjectURL(file);
            setImage(previewUrl);   // 👈 cái này mới đẩy vào ImageUpload
        } else {
            setImage(null);
        }
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
                    setFormData({ name: '', author: '', period: '', description: '', images: []})
                    setErrors({});
                    setErrorImg('');
                    setErrorImgs('');
                    setImageFile(null);
                    setImageFiles([]);
                    setImage(null);
                    setImages([])
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
        {!openPainting.open && (
          <>
            <SearchBox
              initialValue={searchTerm}
              onSearch={handleSearch}
              placeholder='Tìm kiếm theo tên, tác giả, thời kỳ'
            >
              <Button
                sx={{ border: COLORS.BUTTON, bgcolor: COLORS.BUTTON }}
                startIcon={<Add />}
                onClick={handleOpenAddPainting}
              >
                Thêm mới tác phẩm
              </Button>
            </SearchBox>
            {loading && <Backdrop open={loading} />}
            {error && !loading && (
              <Alert severity='error' sx={{ my: 2 }}>
                {error}
              </Alert>
            )}
            {!loading && !error && (
              <Box my={2}>
                <TableData
                  label='painting'
                  array={['STT', 'Tác phẩm', 'Tác giả/ Thời kỳ', 'Mô tả', 'Thao tác']}
                  data={listData}
                  colSpan={5}
                  renderRow={(painting, index) => (
                    <TableRow key={index}>
                      <TableCell align='center'>{index + 1}</TableCell>
                      <TableCell align='center'>
                        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' } }}>
                          <CommonImage src={painting.imageUrl} sx={{ width: 60, height: 60 }} />
                          <Stack sx={{ height: 60, ml: { xs: 0, md: 2 }, mt: { xs: 1, md: 0 } }}>
                            <Typography margin='auto 0' variant='subtitle2'>
                              {painting.name}
                            </Typography>
                          </Stack>
                        </Box>
                      </TableCell>
                      <TableCell align='center'>{`${painting.author}/${painting.period}`}</TableCell>
                      <TableCell align='center' sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Tooltip title={painting.description}>
                          <Typography
                            variant='body2'
                            sx={{
                              mt: 1,
                              overflow: 'hidden',
                              whiteSpace: 'normal',
                              wordBreak: 'break-word',
                              color: '#000',
                              width: 400,
                              textOverflow: 'ellipsis',
                              display: '-webkit-box',
                              WebkitLineClamp: 3,
                              WebkitBoxOrient: 'vertical',
                            }}
                          >
                            {painting.description}
                          </Typography>
                        </Tooltip>
                      </TableCell>
                      <TableCell align='center'>
                        <IconButton
                          handleFunt={() => painting && handleOpenViewPainting(painting)}
                          icon={<Visibility color='primary' />}
                          tooltip='Xem chi tiết'
                        />
                        <IconButton
                          handleFunt={() => painting && handleOpenEditPainting(painting)}
                          icon={<Edit color='info' />}
                          tooltip='Chỉnh sửa'
                        />
                        <IconButton
                          handleFunt={() => {}}
                          icon={<Delete color='error' />}
                          tooltip='Xóa'
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
      </Box>
    );
}

export default PaintingManagedByEmployee;