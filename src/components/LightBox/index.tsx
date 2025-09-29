import Lightbox from "yet-another-react-lightbox";
import Captions from "yet-another-react-lightbox/plugins/captions";
import Fullscreen from 'yet-another-react-lightbox/plugins/fullscreen';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import Thumbnails from 'yet-another-react-lightbox/plugins/thumbnails';
import { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { IImage } from '@/types/post';
import 'yet-another-react-lightbox/styles.css';
import 'yet-another-react-lightbox/plugins/captions.css';

interface LightBoxProps {
  images: IImage[];
  index: number;
  visibleCount: number;
}

const LightBox = (props: LightBoxProps) => {
    const { images, index, visibleCount } = props;
    const [isOpenLightBox, setIsOpenLightBox] = useState(false);
    const [photoIndex, setPhotoIndex] = useState(0);
    useEffect(() => {
        const container = document.querySelector('.image-light-box');
        if(!container) return;

        const handleImageClick = (e: Event) => {
            const target = e.target as HTMLImageElement;
            const index = images.findIndex((i) => i.url === target.src);
            if(index !== -1){
                setPhotoIndex(index);
                setIsOpenLightBox(true)
            }
            
        }
        container.addEventListener('click', handleImageClick);
        return () => {
            container.removeEventListener('click', handleImageClick);
        };
    },[images])
    return (
      <>
        <Box
          className='image-light-box'
          display='flex'
          sx={{
            transform: `translateX(-${(index * 100) / visibleCount}%)`,
            transition: 'transform 0.5s ease-in-out',
            width: `${(images.length * 100) / visibleCount}%`,
          }}
        >
          {images.map((img, idx) => (
            <Box key={idx} flex={`0 0 ${100 / images.length}%`} p={1}>
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
        {isOpenLightBox && (
          <Lightbox
            open={isOpenLightBox}
            close={() => setIsOpenLightBox(false)}
            slides={images.map((img) => ({
              id: img.id,
              src: img.url,
              title: img.name,
            }))}
            index={photoIndex}
            plugins={[Captions, Fullscreen, Thumbnails, Zoom]}
            zoom={{
              maxZoomPixelRatio: 4, // mặc định là 3 -> cho phép zoom lớn hơn
              zoomInMultiplier: 1.5, // tốc độ zoom khi click
            }}
            captions={{ descriptionTextAlign: 'center' }}
          />
        )}
      </>
    );
}

export default LightBox;