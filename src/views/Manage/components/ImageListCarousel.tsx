import { useState } from "react";



import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import { Box } from "@mui/material";
import IconButton from "@/components/IconButton/IconButton";



import { IImage } from "@/types/post";


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
        <Box
          display='flex'
          sx={{
            transform: `translateX(-${index * (100 / visibleCount)}%)`,
            transition: 'transform 0.5s ease-in-out',
            width: `${(images.length / visibleCount) * 100}%`,
          }}
        >
          {images.map((img, idx) => (
            <Box key={idx} flex={`0 0 ${100 / visibleCount}%`} p={1}>
              <img
                src={img.url}
                alt={img.name}
                style={{
                  width: '100%',
                  height: 200,
                  borderRadius: '8px',
                  objectFit: 'cover',
                }}
              />
            </Box>
          ))}
        </Box>
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
            right: 0,
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