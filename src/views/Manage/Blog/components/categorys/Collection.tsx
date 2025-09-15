import { FC, useState } from "react";
import Grid from "@mui/material/Grid2";
import InputText from "@/components/InputText";
import ImageUpload from "../ImageUpload";
import Editor from "@/components/Editor";
import { Typography } from "@mui/material";
import ImagesUpload from "../ImagesUpload";
import SourceLinksForm from "../SourceLinksForm";
import VideoUpload from "../VideoUpload";
import { FormDataPostAboutCollection, SourceLinks } from "@/types/post";
import { FormErrors } from "../CreateBlog";

interface CollectionProps{
    onInputChange: (name: string, value: any) => void;
    onFileSelect: (file: File) => void;
    formData: FormDataPostAboutCollection;
    onContentChange: (value: string) => void;
    errors: FormErrors;
    onSourceLinks: (data: SourceLinks) => void;
    onFilesSelect: (files: File[]) => void;
    onFilesVideoSelect: (files: File[]) => void;
    error: { errorImg: string, errorImgs: string, errorVideos: string }
}

const Collection: FC<CollectionProps> = ({ onInputChange, onFileSelect, formData, onContentChange, errors, onSourceLinks, onFilesSelect, onFilesVideoSelect, error }) => {
    const handleInputChange = (name: string, value: any) => {
        onInputChange(name, value)
    }

    const handleContentChange = (value: string) => {
        onContentChange(value);
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
                />
            </Grid>
            <Grid size={{ xs: 12}}>
                <ImageUpload
                    onFileSelect={onFileSelect}
                />
                {error.errorImg && (<Typography color="error" variant="caption" sx={{ mt: 1 }}>{error.errorImg}</Typography>)}
            </Grid>
            <Grid size={{ xs: 12}}>
                <Editor
                    value={formData.content}
                    onChange={handleContentChange}
                />
                {errors.content && (<Typography color="error" variant="caption" sx={{ mt: 1 }}>{errors.content}</Typography>)}
            </Grid>
            <Grid size={{ xs: 12}}>
                <Typography fontWeight={700}>Hình ảnh</Typography>
                <ImagesUpload
                    onFilesSelect={onFilesSelect}
                />
                {error.errorImgs && (<Typography color="error" variant="caption">{error.errorImgs}</Typography>)}
            </Grid>
            <Grid size={{ xs: 12}}>
                <Typography fontWeight={700}>Video</Typography>
                <VideoUpload
                    onFilesSelect={onFilesVideoSelect}
                />
                {error.errorVideos && (<Typography color="error" variant="caption">{error.errorVideos}</Typography>)}
            </Grid>
            <Typography fontWeight={700} variant="h6"> Tài liệu tham khảo</Typography>
            <Grid size={{ xs: 12}}>
                <Typography fontWeight={700}>Trích nguồn</Typography>
                <SourceLinksForm
                    onSourceLinks={onSourceLinks}
                />
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