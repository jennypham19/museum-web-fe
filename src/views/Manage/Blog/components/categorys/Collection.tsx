import { FC, useState } from "react";
import Grid from "@mui/material/Grid2";
import InputText from "@/components/InputText";
import ImageUpload from "../ImageUpload";
import Editor from "@/components/Editor";
import { Stack, Typography } from "@mui/material";
import ImagesUpload from "../ImagesUpload";
import SourceLinksForm from "../SourceLinksForm";
import VideoUpload from "../VideoUpload";

interface CollectionProps{
    onInputChange: (name: string, value: any) => void;
    onFileSelect: (file: File) => void;
}

const Collection: FC<CollectionProps> = ({ onInputChange, onFileSelect }) => {
    const [image, setImage] = useState<string>('')

    const handleInputChange = (name: string, value: any) => {
        onInputChange(name, value)
    }

    const handleImage = (image: string) => {
        setImage(image)
    }
    return(
        <>
            <Grid size={{ xs: 12}}>
                <InputText
                    label="Tiêu đề"
                    name="title"
                    type="text"
                    value={''}
                    placeholder="Tiêu đề"
                    onChange={handleInputChange}
                />
            </Grid>
            <Grid size={{ xs: 12}}>
                <InputText
                    label="Tóm tắt"
                    name="summary"
                    type="text"
                    value={''}
                    placeholder="Tóm tắt"
                    onChange={handleInputChange}
                />
            </Grid>
            <Grid size={{ xs: 12, md: 6}}>
                <InputText
                    label="Tác giả"
                    name="author"
                    type="text"
                    value={''}
                    placeholder="Tác giả"
                    onChange={handleInputChange}
                />
            </Grid>
            <Grid size={{ xs: 12, md: 6}}>
                <InputText
                    label="Thời kỳ"
                    name="period"
                    type="text"
                    value={''}
                    placeholder="Thời kỳ"
                    onChange={handleInputChange}
                />
            </Grid>
            <Grid size={{ xs: 12}}>
                <ImageUpload
                    onFileSelect={onFileSelect}
                    onImage={handleImage}
                />
            </Grid>
            <Grid size={{ xs: 12}}>
                <Editor
                    value={''}
                    onChange={() => {}}
                />
            </Grid>
            <Typography fontWeight={700} variant="h6"> Tài liệu tham khảo</Typography>
            <Grid size={{ xs: 12}}>
                <Typography fontWeight={700}>Trích nguồn</Typography>
                <SourceLinksForm/>
            </Grid>
            <Grid size={{ xs: 12}}>
                <Typography fontWeight={700}>Hình ảnh</Typography>
                <ImagesUpload/>
            </Grid>
            <Grid size={{ xs: 12}}>
                <Typography fontWeight={700}>Video</Typography>
                <VideoUpload/>
            </Grid>
        </>
    )
}

export default Collection;