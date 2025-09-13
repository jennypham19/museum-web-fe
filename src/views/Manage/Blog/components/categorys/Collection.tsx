import { FC, useState } from "react";
import Grid from "@mui/material/Grid2";
import InputText from "@/components/InputText";
import ImageUpload from "../ImageUpload";
import Editor from "@/components/Editor";
import { InputAdornment, Typography } from "@mui/material";
import ImagesUpload from "../ImagesUpload";
import SourceLinksForm from "../SourceLinksForm";
import VideoUpload from "../VideoUpload";
import { FormDataPostAboutCollection } from "@/types/post";
import { FormErrors } from "../CreateBlog";
import { Facebook } from "@mui/icons-material";

interface CollectionProps{
    onInputChange: (name: string, value: any) => void;
    onFileSelect: (file: File) => void;
    formData: FormDataPostAboutCollection;
    onContentChange: (value: string) => void;
    errors: FormErrors;
}

const Collection: FC<CollectionProps> = ({ onInputChange, onFileSelect, formData, onContentChange, errors }) => {
    const [image, setImage] = useState<string>('')

    const handleInputChange = (name: string, value: any) => {
        onInputChange(name, value)
    }

    const handleContentChange = (value: string) => {
        onContentChange(value);
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
                    value={formData.title}
                    placeholder="Tiêu đề"
                    onChange={handleInputChange}
                    error={!!errors.title}
                    helperText={errors.title}
                />
            </Grid>
            <Grid size={{ xs: 12}}>
                <InputText
                    label="Tóm tắt"
                    name="summary"
                    type="text"
                    value={formData.summary}
                    placeholder="Tóm tắt"
                    onChange={handleInputChange}
                    error={!!errors.summary}
                    helperText={errors.summary}
                />
            </Grid>
            <Grid size={{ xs: 12, md: 6}}>
                <InputText
                    label="Tác giả"
                    name="author"
                    type="text"
                    value={formData.author}
                    placeholder="Tác giả"
                    onChange={handleInputChange}
                    error={!!errors.author}
                    helperText={errors.author}
                />
            </Grid>
            <Grid size={{ xs: 12, md: 6}}>
                <InputText
                    label="Thời kỳ"
                    name="period"
                    type="text"
                    value={formData.period}
                    placeholder="Thời kỳ"
                    onChange={handleInputChange}
                    error={!!errors.period}
                    helperText={errors.period}
                    startAdornment={(
                        <InputAdornment position="start">
                            <Facebook color="primary" />
                        </InputAdornment>
                    )}
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
                    value={formData.content}
                    onChange={handleContentChange}
                />
                {errors.content && (<Typography color="error" variant="caption" sx={{ mt: 1 }}>{errors.content}</Typography>)}
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
            <Grid size={{ xs: 12}}>
                <InputText
                    name='authorName'
                    type="text"
                    value={formData.authorName}
                    onChange={handleInputChange}
                    label="Tên người viết"
                    disabled
                />
            </Grid>
        </>
    )
}

export default Collection;