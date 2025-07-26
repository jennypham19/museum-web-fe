import IconButton from "@/components/IconButton/IconButton";
import CommonImage from "@/components/Image/index";
import { PlayCircle } from "@mui/icons-material";
import { Box } from "@mui/material";
import React, { useRef, useState } from "react";

interface VideoThumbnailPlayerProps{
    thumbnail: string;
    videoSrc: string;
}

const VideoThumbnailPlayer: React.FC<VideoThumbnailPlayerProps> = ({ thumbnail, videoSrc }) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const handlePlay = () => {
        setIsPlaying(true);
        setTimeout(() => {
            videoRef.current?.play();
        }, 0);
    }
    return(
        <Box
            sx={{
                position: 'relative',
                width: '100%',
                maxWidth: 400,
                aspectRatio: '16 / 9',
                margin: 'auto',
                borderRadius: 0,
                overflow: 'hidden',
            }}
        >
            {!isPlaying ? (
                <CommonImage
                    src={thumbnail}
                    alt="Video thumbnail"
                    sx={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        display: 'block'
                    }}
                />
            ) : (
                <video
                    ref={videoRef}
                    src={videoSrc}
                    controls
                    style={{ width: '100%', height: '100%', display: 'block'}}
                />
            )}
            {!isPlaying && (
                <IconButton
                    handleFunt={handlePlay}
                    icon={<PlayCircle sx={{ fontSize: { xs: 50, md: 65}}}/>}
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        color: 'white',
                        fontSize: { xs: 50, md: 65},
                        bgcolor: 'rgba(0, 0, 0, 0.4)',
                        '&:hover': { bgcolor: 'rgba(0, 0, 0, 0.6)'}
                    }}
                />
            )}
        </Box>
    )
}

export default VideoThumbnailPlayer;