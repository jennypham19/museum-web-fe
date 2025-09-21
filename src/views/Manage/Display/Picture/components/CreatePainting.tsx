import React from "react";
import { Box, Button, Stack, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import InputText from "@/components/InputText";
import { FormDataPainting } from "@/types/display";
import ImageUpload from "@/views/Manage/Blog/components/ImageUpload";
import { FormErrors } from "@/views/Manage/Role/Employee/PaintingManagedByEmployee";
import ImagesUpload from "@/views/Manage/Blog/components/ImagesUpload";
import { COLORS } from "@/constants/colors";


interface CreatePaintingProps {
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
}

const CreatePainting: React.FC<CreatePaintingProps> = ({ 
    error, onFileSelect, onFilesSelect, errors, formData, image, images, onInputChange, onSubmit, onClose  
}) => {
  return (
    <Box m={3} bgcolor='#fff' p={4}>
      <Typography mb={1} textAlign='center' fontWeight={700} variant='h5'>
        Thêm tác phẩm
      </Typography>
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
            label=""
            name="period"
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
            label=""
            name="description"
            type="text"
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
            <ImagesUpload onFilesSelect={onFilesSelect} initialImages={images}/>
            {error.errorImgs && (
                <Typography color="error" variant="caption">
                    {error.errorImgs}
                </Typography>
            )}
        </Grid>
      </Grid>
        <Stack
            display='flex'
            direction='row'
            justifyContent='center'
            spacing={2}
            sx={{ my: 3 }}
        >
            <Button
                sx={{ bgcolor: COLORS.BUTTON, width: 120 }}
                onClick={onSubmit}
            >
                Tạo
            </Button>
            <Button
                variant="outlined"
                sx={{ border: '1px solid #000', color: '#000', width: 120 }}
                onClick={onClose}
            >
                Hủy
            </Button>
        </Stack>
    </Box>
  );
};

export default CreatePainting;