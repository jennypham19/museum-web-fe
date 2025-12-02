import { Box, IconButton } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useRef, useState } from "react";
import { IImageDetailObject } from "@/types/landingpage";
import "yet-another-react-lightbox/styles.css";
import LightboxComponent from "../../Components/Lightbox";

interface Props {
  images: IImageDetailObject[];
  onSelected: (image: IImageDetailObject) => void;
  onScrollLeft?: () => void;   // callback khi click nút trái
  onScrollRight?: () => void;  // callback khi click nút phải
}

export default function ImageCarousel({ images, onSelected, onScrollLeft, onScrollRight }: Props) {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [selected, setSelected] = useState<string>(images[0]?.url || '');
  const [hover, setHover] = useState(false);

  // Mở Lightbox
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const scroll = (offset: number) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: offset,
        behavior: "smooth",
      });
    }
  };

  const handleSelected = (image: IImageDetailObject) => {
    onSelected(image);
    setSelected(image.url);
  }

  const handleLeft = () => {
    scroll(-200);
    onScrollLeft && onScrollLeft(); // callback
  };

  const handleRight = () => {
    scroll(200);
    onScrollRight && onScrollRight(); // callback
  };


  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        overflow: "hidden",
        py: 1,
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {/* Scrollable images */}
      <Box
        ref={scrollRef}
        sx={{
          display: "flex", 
          overflowX: "auto",
          whiteSpace: "nowrap",
          gap: 2,
          px: 1,
          scrollbarWidth: "none",
          "&::-webkit-scrollbar": { display: "none" },
        }}
      >
        {images.map((src, index) => (
          <Box
            key={index}
            onClick={() => handleSelected(src)}
            onDoubleClick={() => {
              setLightboxIndex(index);
              setLightboxOpen(true);
            }}
            sx={{
              width: 100,
              height: 140,
              backgroundImage: `url(${src.url})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              borderRadius: 1,
              cursor: "pointer",
              transition: "0.25s",
              opacity: selected === src.url ? 1 : 0.4,
              "&:hover": {
                opacity: 0.9,
              },
              flexShrink: 0,
            }}
          />
        ))}
      </Box>

      {/* Left button */}
      {(hover && images.length > 9) && (
        <IconButton
          sx={{
            position: "absolute",
            top: "50%",
            left: 0,
            transform: "translateY(-50%)",
            bgcolor: "white",
            boxShadow: 2,
            "&:hover": { bgcolor: "white" },
          }}
          onClick={handleLeft}
        >
          <ChevronLeftIcon />
        </IconButton>
      )}

      {/* Right button */}
      {(hover && images.length > 9) && (
        <IconButton
          sx={{
            position: "absolute",
            top: "50%",
            right: 0,
            transform: "translateY(-50%)",
            bgcolor: "white",
            boxShadow: 2,
            "&:hover": { bgcolor: "white" },
          }}
          onClick={handleRight}
        >
          <ChevronRightIcon />
        </IconButton>
      )}
      {/* Lightbox */}
      <LightboxComponent
        open={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        index={lightboxIndex}
        images={images}
        type="multiline"
      />
    </Box>
  );
}
