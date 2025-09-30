import React, { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import {
  Box,
  Button,
  Card,
  CardMedia,
  Chip,
  Dialog,
  DialogContent,
  Grid,
  IconButton,
  Typography,
} from '@mui/material';
import { IImage } from '@/types/post';
import { COLORS } from '@/constants/colors';
import { ArrowBackIosNew, ArrowForwardIos } from '@mui/icons-material';
import DialogSlideImages from './DialogSlideImages';

interface ArtworkGalleryProps {
  images: IImage[];
  numberShowImg: number;
}
const ArtworkGallery: React.FC<ArtworkGalleryProps> = ({ images, numberShowImg = 10 }) => {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0); // index ảnh đang mở
  const [showAll, setShowAll] = useState(false);
  const handleOpen = (idx: number) => {
    setIndex(idx);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handlePrev = () => {
    setIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };
  const handleNext = () => {
    setIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };
  const visibleImages = showAll ? images : images.slice(0, numberShowImg);

  return (
    <Box>
      {/* Ảnh bổ sung */}
      {images.length > 0 && (
        <>
          <Box display='flex' alignItems='center' justifyContent='space-between' mb={1}>
            <Typography fontWeight={600} variant='subtitle1'>Ảnh bổ sung</Typography> {/* Counter bằng Chip */}
            <Chip
              label={`Hiển thị ${visibleImages.length}/${images.length} ảnh`}
              size='small'
              color='default'
              variant='outlined'
              sx={{ fontWeight: 700}}
            />
          </Box>
          <Grid container spacing={2}>
            {visibleImages.map((img, idx) => (
              <Grid item xs={6} sm={4} md={3} key={img.id}>
                <Card sx={{ cursor: 'pointer' }}>
                  <CardMedia
                    component='img'
                    image={img.url}
                    alt='Ảnh bổ sung'
                    sx={{ height: 140, objectFit: 'fill' }}
                    onClick={() => handleOpen(idx)}
                  />
                </Card>
              </Grid>
            ))}
          </Grid>
          {/* Nút xem thêm / ẩn bớt */}
          {images.length > numberShowImg && (
            <Box mt={2}>
              <Button variant='contained' sx={{ bgcolor: COLORS.BUTTON}} onClick={() => setShowAll((prev) => !prev)}>
                {showAll ? 'Ẩn bớt' : 'Xem thêm'}
              </Button>
            </Box>
          )}
        </>
      )}
      {/* Dialog slide ảnh */} 
        <DialogSlideImages
          open={open}
          index={index}
          images={images}
          onClose={handleClose}
          onPrev={handlePrev}
          onNext={handleNext}
        />
    </Box>
  );
};
export default ArtworkGallery;
