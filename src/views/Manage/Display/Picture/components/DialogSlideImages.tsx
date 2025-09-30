import DialogComponent from "@/components/DialogComponent";
import CommonImage from "@/components/Image/index";
import { IImage } from "@/types/post";
import { ArrowBackIosNew, ArrowForwardIos } from "@mui/icons-material";
import { Box, IconButton, Typography } from "@mui/material";

interface DialogSlideImagesProps{
    open: boolean,
    index: number;
    images: IImage[];
    onClose: () => void;
    onPrev: () => void;
    onNext: () => void;
}

const DialogSlideImages = (props: DialogSlideImagesProps) => {
    const { open, index, images, onClose, onPrev, onNext } = props;
    return (
        <DialogComponent
            dialogKey={open}
            handleClose={onClose}
            isActiveFooter={false}
            dialogTitle={images[index].name}
            maxWidth='md'
        >   
            {images.length > 1 ? (
                <Box sx={{ position: "relative", pt: 2, bgcolor: "black" }}>
                    {/* Nút prev */} 
                    <IconButton 
                        onClick={onPrev} 
                        sx={{ 
                        position: "absolute", 
                        top: "50%", left: 8, 
                        transform: "translateY(-50%)", 
                        color: "white", 
                        bgcolor: "rgba(0,0,0,0.3)", 
                        "&:hover": { bgcolor: "rgba(0,0,0,0.5)" }
                        }} 
                    > 
                        <ArrowBackIosNew /> 
                    </IconButton> 
                    {/* Nút next */} 
                    <IconButton 
                        onClick={onNext} 
                        sx={{ 
                        position: "absolute", 
                        top: "50%", right: 8, 
                        transform: "translateY(-50%)", 
                        color: "white", 
                        bgcolor: "rgba(0,0,0,0.3)", 
                        "&:hover": { bgcolor: "rgba(0,0,0,0.5)" }
                        }} 
                    > 
                        <ArrowForwardIos /> 
                    </IconButton> 
                    {/* Ảnh chính */} 
                    <Box sx={{ textAlign: "center" }}> 
                        <img src={images[index].url} alt="slide" style={{ maxHeight: "60vh", maxWidth: "100%", borderRadius: 8 }} /> 
                    </Box> 
                    {/* Caption / số trang */} 
                    <Typography 
                        textAlign='center'
                        variant="body1" 
                        fontWeight={600}
                        sx={{  
                            color: "white", 
                            bgcolor: "rgba(0,0,0,0.5)", 
                            px: 1.5, borderRadius: 1, 
                        }} 
                    > 
                            {index + 1}/{images.length} 
                    </Typography> 
                </Box>
            ) : (
                <Box sx={{ pt: 2, bgcolor: "black" }}>
                    <Box sx={{ textAlign: "center" }}>
                        <CommonImage
                            src={images[index].url}
                            sx={{
                                maxHeight: "60vh", maxWidth: "100%"
                            }}
                        />
                    </Box>
                </Box>
            )}

        </DialogComponent>
    )
}

export default DialogSlideImages;