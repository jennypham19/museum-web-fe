;

// import React, { useState } from 'react';

// import CloseIcon from '@mui/icons-material/Close';
// import {
//   Box,
//   Button,
//   Card,
//   CardMedia,
//   Chip,
//   Dialog,
//   DialogContent,
//   Grid,
//   IconButton,
//   Typography,
// } from '@mui/material';

// interface ArtworkImage {
//   id: number;
//   imageUrl: string;
//   isMain: boolean;
// }
// interface ArtworkGalleryProps {
//   title: string;
//   images: ArtworkImage[];
// }
// const ArtworkGallery: React.FC<ArtworkGalleryProps> = ({ title, images }) => {
//   const mainImage = images.find((img) => img.isMain);
//   const additionalImages = images.filter((img) => !img.isMain);
//   const [open, setOpen] = useState(false);
//   const [selectedImage, setSelectedImage] = useState<string | null>(null);
//   const [showAll, setShowAll] = useState(false);
//   const handleOpen = (url: string) => {
//     setSelectedImage(url);
//     setOpen(true);
//   };
//   const handleClose = () => {
//     setOpen(false);
//     setSelectedImage(null);
//   };
//   const visibleImages = showAll ? additionalImages : additionalImages.slice(0, 10);
//   return (
//     <Box>
//       {' '}
//       <Typography variant='h5' gutterBottom>
//         {' '}
//         {title}{' '}
//       </Typography>{' '}
//       {/* Ảnh chính */}{' '}
//       {mainImage && (
//         <Card sx={{ maxWidth: 600, marginBottom: 2 }}>
//           {' '}
//           <CardMedia
//             component='img'
//             image={mainImage.imageUrl}
//             alt='Ảnh chính'
//             sx={{ cursor: 'pointer' }}
//             onClick={() => handleOpen(mainImage.imageUrl)}
//           />{' '}
//         </Card>
//       )}{' '}
//       {/* Ảnh bổ sung */}{' '}
//       {additionalImages.length > 0 && (
//         <>
//           {' '}
//           <Box display='flex' alignItems='center' justifyContent='space-between' mb={1}>
//             {' '}
//             <Typography variant='subtitle1'>Ảnh bổ sung</Typography> {/* Counter bằng Chip */}{' '}
//             <Chip
//               label={`Hiển thị ${visibleImages.length}/${additionalImages.length} ảnh`}
//               size='small'
//               color='default'
//               variant='outlined'
//             />{' '}
//           </Box>{' '}
//           <Grid container spacing={2}>
//             {' '}
//             {visibleImages.map((img) => (
//               <Grid item xs={4} sm={3} md={2} key={img.id}>
//                 {' '}
//                 <Card sx={{ cursor: 'pointer' }}>
//                   {' '}
//                   <CardMedia
//                     component='img'
//                     image={img.imageUrl}
//                     alt='Ảnh bổ sung'
//                     sx={{ height: 120, objectFit: 'cover' }}
//                     onClick={() => handleOpen(img.imageUrl)}
//                   />{' '}
//                 </Card>{' '}
//               </Grid>
//             ))}{' '}
//           </Grid>{' '}
//           {/* Nút xem thêm / ẩn bớt */}{' '}
//           {additionalImages.length > 10 && (
//             <Box mt={2}>
//               {' '}
//               <Button variant='outlined' onClick={() => setShowAll((prev) => !prev)}>
//                 {' '}
//                 {showAll ? 'Ẩn bớt' : 'Xem thêm'}{' '}
//               </Button>{' '}
//             </Box>
//           )}{' '}
//         </>
//       )}{' '}
//       {/* Dialog xem ảnh lớn */}{' '}
//       <Dialog open={open} onClose={handleClose} maxWidth='lg'>
//         {' '}
//         <DialogContent sx={{ position: 'relative', p: 0 }}>
//           {' '}
//           <IconButton
//             onClick={handleClose}
//             sx={{ position: 'absolute', right: 8, top: 8, color: 'white', zIndex: 10 }}
//           >
//             {' '}
//             <CloseIcon />{' '}
//           </IconButton>{' '}
//           {selectedImage && (
//             <img
//               src={selectedImage}
//               alt='Xem chi tiết'
//               style={{ width: '100%', height: 'auto', display: 'block', borderRadius: 8 }}
//             />
//           )}{' '}
//         </DialogContent>{' '}
//       </Dialog>{' '}
//     </Box>
//   );
// };
// export default ArtworkGallery;

import React, { useState } from "react";



import { Box, Button, Card, CardMedia, Grid } from "@mui/material";





;












































































































































interface ArtworkImagesProps {
  images: string[];
}

const ArtworkGallery: React.FC<ArtworkImagesProps> = ({ images }) => {
  const [showAll, setShowAll] = useState(false);

  // Hiển thị 10 ảnh đầu nếu chưa mở rộng
  const displayedImages = showAll ? images : images.slice(0, 10);

  return (
    <Box>
      <Grid container spacing={2}>
        {displayedImages.map((img, index) => (
          <Grid item xs={6} sm={4} md={3} key={index}>
            <Card>
              <CardMedia
                component='img'
                height='140'
                image={img}
                alt={`Artwork image ${index + 1}`}
              />
            </Card>
          </Grid>
        ))}
      </Grid>

      {images.length > 10 && (
        <Box mt={2} textAlign='center'>
          <Button variant='outlined' onClick={() => setShowAll((prev) => !prev)}>
            {showAll ? 'Thu gọn' : 'Xem thêm'}
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default ArtworkGallery;