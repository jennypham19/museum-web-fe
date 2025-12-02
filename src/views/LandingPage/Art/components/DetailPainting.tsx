import CommonImage from "@/components/Image/index";
import { IImageDetailObject, IObjectArt } from "@/types/landingpage";
import NavigateBack from "@/views/Manage/components/NavigateBack";
import { Download, Fullscreen, LocationOn } from "@mui/icons-material";
import { Box, IconButton, Stack, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useState } from "react";
import { v4 as uuidv4} from "uuid";
import ImageCarousel from "./ImageCarousel";
import LightboxComponent from "../../Components/Lightbox";
import DetailArtwork from "./DetailArtwork";
import MoreArtwork from "./MoreArtwork";
import AdditionalObject from "./AdditionalObject";

interface DetailPaintingProps{
    onBack: () => void;
    data: IObjectArt;
}

const DetailPainting = (props: DetailPaintingProps) => {
    const { onBack, data } = props;
    const images: IImageDetailObject[]  = [{ id: uuidv4(), name: `object_1`, url: data.image_url}, ...data.images ?? []];
    const [image, setImage] = useState<IImageDetailObject | null>(null);
    const [lightboxOpen, setLightboxOpen] = useState(false);

    const handleClickImage = (image: IImageDetailObject) => {
        setImage(image)
    }

    return(
        <Box>
            <NavigateBack
                onBack={onBack}
                title={`Nghệ thuật từ Châu Á/ ${data.title}`}
            />
            <Box m={2}>
                <Grid container spacing={2}>
                    <Grid size={{ xs: 12, md: 5 }}>
                        <Typography mb={1} fontSize={{ xs: '20px', md: '32px'}} fontWeight={700}>{data.title}</Typography>
                        <Typography fontWeight={500} sx={{ textDecoration: 'underline'}} mb={1}>{`Nghệ sĩ: ${data.artist}`}</Typography>
                        <Typography mb={5}>{`Thời gian: ${data.time}`}</Typography>
                        <Stack mb={5} direction='row'>
                            <LocationOn/>
                            <Typography fontWeight={500}>Trưng bày tại The Art Glass Avenue ở <a href="#" style={{ color: '#000'}}>Phòng trưng bày 344</a></Typography>
                        </Stack>
                        {data.content.split('\n').map((item, idx) => {
                            return(
                                <Stack key={idx} direction='column' mb={2}>
                                    <Typography fontSize={{ xs: '16px', md: '18px'}}>{item}</Typography>
                                </Stack>
                            )
                        })}
                    </Grid>
                    <Grid sx={{ display: 'flex', flexDirection: 'column' }} size={{ xs: 12, md: 7 }}>
                        <Box sx={{ bgcolor: '#dbdbdbff', display: 'flex', justifyContent: 'center' }}>
                            <Box width='50%' onClick={() => { setLightboxOpen(true)}}>
                                <CommonImage
                                    src={image?.url || data.image_url}
                                    alt={data.title}
                                    sx={{
                                        width: '100%',
                                        height: { xs: 200, md: 500}
                                    }}
                                />
                            </Box>
                        </Box>
                        <Typography variant="subtitle1" color="text.secondary" display='flex' justifyContent='center'>{image?.name || 'object_1'}</Typography>
                        <Box display='flex' flexDirection='row' justifyContent='flex-end'>
                            <IconButton component="a" href={data.image_url} target="_blank">
                                <Download sx={{ width: 25, height: 25 }}/>
                            </IconButton>
                            <IconButton onClick={() => { setLightboxOpen(true)}}>
                                <Fullscreen sx={{ width: 25, height: 25 }}/>
                            </IconButton>
                        </Box>
                        <Box display='flex' flexDirection={{ xs: 'column', md: 'row'}}>
                            <ImageCarousel
                                images={images}
                                onSelected={handleClickImage}
                            />                        
                        </Box>
                    </Grid>
                </Grid>
                <DetailArtwork data={data}/>
                <MoreArtwork/>
                <AdditionalObject/>
            </Box>
            <LightboxComponent
                type="single"
                open={lightboxOpen}
                onClose={() => { setLightboxOpen(false)}}
                index={0}
                image={{ name: "object_1", url: data.image_url }}
            />
        </Box>
    )
};

export default DetailPainting;