import { useState } from "react";



import { Add, NavigateNext } from "@mui/icons-material";
import { Box, Button, Stack, Typography } from "@mui/material";
import SearchBox from "../../components/SearchBox";
import CreatePainting from "../../Display/Picture/components/CreatePainting";
import EditPainting from "../../Display/Picture/components/EditPainting";
import ViewPainting from "../../Display/Picture/components/ViewPainting";
import Backdrop from "@/components/Backdrop";
import IconButton from "@/components/IconButton/IconButton";



import { COLORS } from "@/constants/colors";
import { useDataList } from "@/hooks/useDataList";
import useNotification from "@/hooks/useNotification";
import { createPainting, getPaintings } from "@/services/display-service";
import { uploadImage, uploadImages } from "@/services/upload-service";
import { FormDataPainting, IPainting } from "@/types/display";


interface PaintingManagedByEmployeeProps {
  
}

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
    const [openPainting, setOpenPainting] = useState<{ type: string; open: boolean }>({
      type: '',
      open: false,
    });
    const [showAll, setShowAll] = useState(false);
    const [showAllPaintings, setShowAllPaintings] = useState<{ open: boolean; type: string }>({
      open: false,
      type: '',
    });
    const [painting, setPainting] = useState<IPainting | null> (null);

    const { listData, fetchData, page, rowsPerPage, total, loading, searchTerm, handlePageChange, handleSearch, error } = useDataList<IPainting>(getPaintings)

    const handleOpenAddPainting = () => {
        setOpenPainting({
            type: 'add',
            open: true
        })
        setShowAll(true)
    }

    const handleShowAllPaintingsCreate = () => {
      setShowAll(true);
      setShowAllPaintings({
        open: true,
        type: 'pending',
      });
    };

    const handleShowAllPaintings = () => {
      setShowAll(true);
      setShowAllPaintings({
        open: true,
        type: 'all',
      });
    };

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
        {!showAll && (
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
            {/* Tác phẩm vừa tạo */}
            <Box
              p={2}
              onClick={handleShowAllPaintingsCreate}
              sx={{ cursor: 'pointer' }}
              display='flex'
              justifyContent='space-between'
            >
              <Typography variant='h6' fontWeight={600}>
                Tác phẩm vừa tạo
              </Typography>
              <Stack>
                <Typography pt={1} fontWeight={600} variant='subtitle2'>
                  Xem thêm
                </Typography>
                <IconButton
                  handleFunt={handleShowAllPaintingsCreate}
                  icon={<NavigateNext sx={{ width: '28px', height: '28px' }} />}
                />
              </Stack>
            </Box>
            {/* Trạng thái tác phẩm */}
            <Box
              p={2}
              onClick={handleShowAllPaintings}
              sx={{ cursor: 'pointer' }}
              display='flex'
              justifyContent='space-between'
            >
              <Typography variant='h6' fontWeight={600}>
                Trạng thái tác phẩm
              </Typography>
              <Stack>
                <Typography pt={1} fontWeight={600} variant='subtitle2'>
                  Xem thêm
                </Typography>
                <IconButton
                  handleFunt={handleShowAllPaintings}
                  icon={<NavigateNext sx={{ width: '28px', height: '28px' }} />}
                />
              </Stack>
            </Box>
          </>
        )}

        {/* Thêm mới bản ghi */}
        {showAll && openPainting.open && openPainting.type === 'add' && (
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
              images={formData.images.map((img) => img.url)}
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