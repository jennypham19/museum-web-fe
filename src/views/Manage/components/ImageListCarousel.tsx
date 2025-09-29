import { useState } from "react";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import { Box } from "@mui/material";
import IconButton from "@/components/IconButton/IconButton";
import { IImage } from "@/types/post";
import LightBox from "@/components/LightBox";

interface ImageListCarouselPrps {
  images: IImage[];
  visibleCount?: number; // Số ảnh hiển thị cùng lúc
}

const ImageListCarousel = (props: ImageListCarouselPrps) => {
    const { images, visibleCount = 5 } = props;
    const [index, setIndex] = useState(0);
    const handlePrev = () => {
        setIndex((prev) => prev === 0 ? images.length - visibleCount : prev - 1);
    }

    const handleNext = () => {
        setIndex((prev) => prev >=images.length - visibleCount ? 0 : prev + 1);
    }
    return (
      <Box position='relative' overflow='hidden' p={2} borderRadius={2} boxShadow={3}>
        {/* Container trượt ngang */}
        <LightBox
          index={index}
          visibleCount={visibleCount}
          images={images}
        />
        {/* Nút điều khiển */}
        <IconButton
          handleFunt={handlePrev}
          icon={<ArrowBackIos />}
          sx={{
            position: 'absolute',
            top: '50%',
            left: 8,
            transform: 'translateY(-50%)',
            bgcolor: 'rgba(0,0,0,0.4)',
            color: 'white',
          }}
          backgroundColor='rgba(0,0,0,0.4)'
        />
        <IconButton
          handleFunt={handleNext}
          icon={<ArrowForwardIos />}
          sx={{
            position: 'absolute',
            top: '50%',
            right: 8,
            transform: 'translateY(-50%)',
            bgcolor: 'rgba(0,0,0,0.4)',
            color: 'white',
          }}
          backgroundColor='rgba(0,0,0,0.4)'
        />
      </Box>
    );
};

export default ImageListCarousel;