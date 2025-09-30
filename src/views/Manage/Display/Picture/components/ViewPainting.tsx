import React from "react";
import { Stack, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import ArtworkGallery from "./ArtworkGallery";
import DialogComponent from "@/components/DialogComponent";
import CommonImage from "@/components/Image/index";
import { IPainting } from "@/types/display";

interface ViewPaintingProps{
    open: boolean,
    data: IPainting,
    onClose: () => void;
}

const ViewPainting: React.FC<ViewPaintingProps> = ({ open, data, onClose }) => {
  const handleClose = () => {
    onClose();
  };
  
  return (
    <DialogComponent
      dialogKey={open}
      handleClose={handleClose}
      dialogTitle='Chi tiết tác phẩm'
      isActiveFooter={false}
      maxWidth={'lg'}
    >
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Stack direction='column'>
            <Typography fontWeight={700} fontSize={{ xs: '18px', md: '25px' }}>
              {data.name}
            </Typography>
            <Typography
              fontSize={{ xs: '14px', md: '15px' }}
            >
              {`Nghệ sĩ: ${data.author}`}
            </Typography>
            <Typography
              pb={2}
              fontSize={{ xs: '14px', md: '15px' }}
            >
              {`Thời gian: ${data.period}`}
            </Typography>
            {/* <Typography
              fontSize={{ xs: "14px", md: "15px" }}
              sx={{
                whiteSpace: "pre-line", // giữ xuống dòng
                wordBreak: "break-word", // bẻ từ dài
                lineHeight: 1.8,
              }}
            >
              {data.description}
            </Typography> */}
            {data.description.split("\n").map((item, idx) => (
              <Stack mb={3} direction='column'>
                <Typography
                  key={idx}
                  fontSize={{ xs: "14px", md: "15px" }}
                  sx={{
                    whiteSpace: "pre-wrap", // giữ format cơ bản
                    wordBreak: "break-word", // bẻ từ dính liền
                  }}
                >
                  {item}
                </Typography>
              </Stack>
            ))}
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
      <ArtworkGallery numberShowImg={4} images={data.images}/>
    </DialogComponent>
  );
};

export default ViewPainting;