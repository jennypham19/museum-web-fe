import InputSelect from "@/components/InputSelect";
import InputText from "@/components/InputText";
import { COLORS } from "@/constants/colors";
import ImageUpload from "@/views/Manage/Blog/components/ImageUpload";
import NavigateBack from "@/views/Manage/components/NavigateBack";
import { Box, Button, Stack, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { FormErrors } from "./AllCollectionsCreated";
import { FormDataCollection } from "@/types/display";
import { TAGS, TOPICS } from "@/constants/display";
import { useState } from "react";


interface CreateCollectionProps {
    onClose: () => void;
    onFileSelect: (file: File | null) => void;
    image: string | null;
    error: { errorImg: string; errorImgs: string};
    errors: FormErrors;
    formData: FormDataCollection;
    onSubmit: () => void;
    onInputChange: (name: string, value: any) => void;
    onSubTopicsChange: (name: string, value: any) => void;
}
const CreateCollection = (props: CreateCollectionProps) => {
    const { onClose, onFileSelect, image, error, errors, formData, onInputChange, onSubmit, onSubTopicsChange } = props;
    const [mainTopic, setMainTopic] = useState("");
    const handleMainTopicChange = (name: string, value: any) => {
        setMainTopic(value)
    }

    const handleSubTopicsChange = (name: string, value: any) => {
        onSubTopicsChange(name, value)
    }

    return(
        <>
            <NavigateBack
                title="Thêm mới bộ sưu tập"
                onBack={onClose}
            />
            <Box m={3} bgcolor='#fff' p={4}>
                <Grid container spacing={3}>
                    <Grid size={{ xs: 12}}>
                        <Typography fontWeight={700} fontSize='15px'>
                            Hình ảnh
                        </Typography>
                        <ImageUpload onFileSelect={onFileSelect} initialImage={image}/>
                        {error.errorImg && (
                            <Typography color='error' variant='caption' sx={{ mt: 1 }}>
                                {error.errorImg}
                            </Typography>
                        )}
                    </Grid>
                    <Grid size={{ xs: 12 }}>
                        <Typography fontWeight={700} fontSize='15px'>Chủ đề</Typography>
                        <InputSelect
                            label=""
                            name="topic"
                            onChange={handleMainTopicChange}
                            value={mainTopic}
                            options={TOPICS}
                            transformOptions={(data) => 
                                data.map((item) => ({
                                    value: item.value,
                                    label: item.label
                                }))
                            }
                            error={!!errors.tags}
                            helperText={errors.tags}
                            placeholder="Chọn chủ đề"
                        />
                    </Grid>
                    <Grid size={{ xs: 12 }}>
                        <Typography fontWeight={700} fontSize='15px'>Chi tiết</Typography>
                        <InputSelect
                            multiple
                            renderChips
                            title="Chưa có dữ liệu"
                            label=""
                            name="tags"
                            onChange={handleSubTopicsChange}
                            value={formData.tags}
                            options={TAGS.filter((tags) => tags.topic === mainTopic)}
                            transformOptions={(data) => 
                                data.map((item) => ({
                                    value: item.value,
                                    label: item.label
                                }))
                            }
                            error={!!errors.tags}
                            helperText={errors.tags}
                            placeholder="Chọn chi tiết"
                        />
                    </Grid>
                    <Grid size={{ xs: 12 }}>
                        <Typography fontWeight={700} fontSize='15px'>Tên</Typography>
                        <InputText
                            label=""
                            name="name"
                            onChange={onInputChange}
                            value={formData.name}
                            type="text"
                            placeholder="Nhập thông tin"
                            margin="none"
                            error={!!errors.name}
                            helperText={errors.name}
                        />
                    </Grid>
                    <Grid size={{ xs: 12 }}>
                        <Typography fontWeight={600} fontSize='15px'>Mô tả</Typography>
                        <InputText
                            label=""
                            name="description"
                            onChange={onInputChange}
                            value={formData.description}
                            type="text"
                            placeholder="Nhập thông tin"
                            margin="none"
                            multiline
                            rows={6}
                            error={!!errors.description}
                            helperText={errors.description}
                        />
                    </Grid>
                </Grid>
                <Stack
                    display='flex'
                    direction='row'
                    justifyContent='center'
                    spacing={2}
                    sx={{ my: 3 }}
                >
                    <Button
                        sx={{ bgcolor: COLORS.BUTTON, width: 120 }}
                        onClick={onSubmit}
                    >
                        Tạo
                    </Button>
                    <Button
                        variant="outlined"
                        sx={{ border: '1px solid #000', color: '#000', width: 120 }}
                        onClick={onClose}
                    >
                        Hủy
                    </Button>
                </Stack>
            </Box>
        </>
    )
}

export default CreateCollection;