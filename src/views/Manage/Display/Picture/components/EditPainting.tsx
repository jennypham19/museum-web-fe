import React from "react";
import { Box, Button, Stack, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import InputText from "@/components/InputText";
import { COLORS } from "@/constants/colors";
import { FormDataPainting, IPainting } from "@/types/display";
import ImagesUpload from "@/views/Manage/Blog/components/ImagesUpload";
import ImageUpload from "@/views/Manage/Blog/components/ImageUpload";
import { FormErrors } from "@/views/Manage/Role/Employee/PaintingManagedByEmployee";
import IconButton from "@/components/IconButton/IconButton";
import { NavigateBefore } from "@mui/icons-material";
import { StatusObject } from "@/constants/status";


interface EditPaintingProps {
  error: { errorImg: string; errorImgs: string};
  onFileSelect: (file: File | null) => void;
  onFilesSelect: (files: File[]) => void;
  errors: FormErrors;
  formData: FormDataPainting;
  image: string | null;
  images: string[];
  onInputChange: (name: string, value: any) => void; 
  onSubmit: () => void; 
  onClose: () => void;
  data?: IPainting;
}

const EditPainting: React.FC<EditPaintingProps> = ({
  error,
  onFileSelect,
  onFilesSelect,
  errors,
  formData,
  image,
  images,
  onInputChange,
  onSubmit,
  onClose,
  data
}) => {
  return (
    <>
      <Stack my={1}>
        <IconButton
          handleFunt={onClose}
          icon={<NavigateBefore sx={{ width: '28px', height: '28px'}}/>}
        />
        <Typography pt={0.2} fontWeight={600} variant="h6">Chỉnh sửa tác phẩm</Typography>
      </Stack>
      <Box m={3} bgcolor='#fff' p={4}>
        {data?.rejectionReason && data.status === StatusObject.REJECTED && (
          <Typography py={0.5} mb={1} fontSize='15px' borderBottom='1px solid #000'>
            <b>Lý do phê duyệt thất bại: </b>{data.rejectionReason}
          </Typography>
        )}
        <Grid container spacing={3}>
          <Grid size={{ xs: 12 }}>
            <Typography fontWeight={700} fontSize='15px'>
              Hình ảnh
            </Typography>
            <ImageUpload onFileSelect={onFileSelect} initialImage={image} />
            {error.errorImg && (
              <Typography color='error' variant='caption' sx={{ mt: 1 }}>
                {error.errorImg}
              </Typography>
            )}
          </Grid>
          <Grid size={{ xs: 12 }}>
            <Typography fontWeight={700} fontSize='15px'>
              Tên
            </Typography>
            <InputText
              label=''
              name='name'
              type='text'
              value={formData.name}
              onChange={onInputChange}
              error={!!errors.name}
              helperText={errors.name}
            />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <Typography fontWeight={700} fontSize='15px'>
              Tác giả
            </Typography>
            <InputText
              label=''
              name='author'
              type='text'
              value={formData.author}
              onChange={onInputChange}
              error={!!errors.author}
              helperText={errors.author}
            />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <Typography fontWeight={700} fontSize='15px'>
              Thời kỳ
            </Typography>
            <InputText
              label=''
              name='period'
              type='text'
              value={formData.period}
              onChange={onInputChange}
              error={!!errors.period}
              helperText={errors.period}
            />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <Typography fontWeight={700} fontSize='15px'>
              Mô tả
            </Typography>
            <InputText
              label=''
              name='description'
              type='text'
              value={formData.description}
              onChange={onInputChange}
              error={!!errors.description}
              helperText={errors.description}
              rows={5}
              multiline
            />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <Typography fontWeight={700} fontSize='15px'>
              Hình ảnh bổ sung thêm
            </Typography>
            <ImagesUpload onFilesSelect={onFilesSelect} initialImages={images} />
            {error.errorImgs && (
              <Typography color='error' variant='caption'>
                {error.errorImgs}
              </Typography>
            )}
          </Grid>
        </Grid>
        <Stack display='flex' direction='row' justifyContent='center' spacing={2} sx={{ my: 3 }}>
          <Button sx={{ bgcolor: COLORS.BUTTON, width: 120 }} onClick={onSubmit}>
            Lưu
          </Button>
          <Button
            variant='outlined'
            sx={{ border: '1px solid #000', color: '#000', width: 120 }}
            onClick={onClose}
          >
            Hủy
          </Button>
        </Stack>
      </Box> 
    </>
  );
};

export default EditPainting;