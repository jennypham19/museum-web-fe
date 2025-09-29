import React from "react";



import { Box, Stack, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import ArtworkGallery from "./ArtworkGallery";
import DialogComponent from "@/components/DialogComponent";
import CommonImage from "@/components/Image/index";



import { IPainting } from "@/types/display";
import ImageListCarousel from "@/views/Manage/components/ImageListCarousel";


interface ViewPaintingProps{
    open: boolean,
    data: IPainting,
    onClose: () => void;
}

const mockImages = [
  { id: 1, imageUrl: 'https://picsum.photos/id/1018/800/600', isMain: true },
  { id: 2, imageUrl: 'https://picsum.photos/id/1025/400/300', isMain: false },
  { id: 3, imageUrl: 'https://picsum.photos/id/1035/400/300', isMain: false },
  { id: 4, imageUrl: 'https://picsum.photos/id/1049/400/300', isMain: false },
  { id: 5, imageUrl: 'https://picsum.photos/id/1049/400/300', isMain: false },
  { id: 6, imageUrl: 'https://picsum.photos/id/1049/400/300', isMain: false },
  { id: 7, imageUrl: 'https://picsum.photos/id/1049/400/300', isMain: false },
  { id: 8, imageUrl: 'https://picsum.photos/id/1049/400/300', isMain: false },
  { id: 9, imageUrl: 'https://picsum.photos/id/1049/400/300', isMain: false },
  { id: 10, imageUrl: 'https://picsum.photos/id/1049/400/300', isMain: false },
  { id: 11, imageUrl: 'https://picsum.photos/id/1049/400/300', isMain: false },
  { id: 12, imageUrl: 'https://picsum.photos/id/1049/400/300', isMain: false },
];

const ViewPainting: React.FC<ViewPaintingProps> = ({ open, data, onClose }) => {
  const handleClose = () => {
    onClose();
  };
    const demoImages = Array.from({ length: 15 }).map(
      (_, i) => `https://picsum.photos/300/200?random=${i + 1}`,
    );
  return (
    <DialogComponent
      dialogKey={open}
      handleClose={handleClose}
      dialogTitle='Chi tiết tác phẩm'
      isActiveFooter={false}
      maxWidth={'lg'}
    >
      <ArtworkGallery images={demoImages}/>
      {/* <div style={{ padding: 20 }}>
        <ArtworkGallery title='Tác phẩm: Mùa Xuân' images={mockImages} />
      </div> */}
      {/* <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Stack direction='column'>
            <Typography fontWeight={700} fontSize={{ xs: '18px', md: '25px' }}>
              {data.name}
            </Typography>
            <Typography
              fontSize={{ xs: '14px', md: '15px' }}
            >{`Nghệ sĩ: ${data.author}`}</Typography>
            <Typography
              pb={2}
              fontSize={{ xs: '14px', md: '15px' }}
            >{`Thời gian: ${data.period}`}</Typography>
            {data.description.split('\n').map((item, idx) => {
              return (
                <Stack key={idx} direction='column' mb={2}>
                  <Typography fontSize={{ xs: '14px', md: '15px' }}>{item}</Typography>
                </Stack>
              );
            })}
          </Stack>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <CommonImage
            src={data.imageUrl}
            alt={data.name}
            sx={{
              width: '100%',
              height: { xs: 200, md: 380 },
            }}
          />
        </Grid>
      </Grid>
      <ImageListCarousel images={data.images} /> */}
    </DialogComponent>
  );
};

export default ViewPainting;