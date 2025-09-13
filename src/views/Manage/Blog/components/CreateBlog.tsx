import IconButton from "@/components/IconButton/IconButton";
import { ArrowBack } from "@mui/icons-material";
import { Box, Button, Paper, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import Grid from "@mui/material/Grid2";
import InputSelect from "@/components/InputSelect";
import { CategoryPost } from "@/constants/data";
import InputText from "@/components/InputText";
import dayjs from "dayjs";
import Collection from "./categorys/Collection";
import { FormDataPostAboutCollection } from "@/types/post";
import useNotification from "@/hooks/useNotification";
import useAuth from "@/hooks/useAuth";
import { COLORS } from "@/constants/colors";


interface CreateBlogProps {
    onBack: () => void;
}

export type FormErrors = {
  [K in keyof FormDataPostAboutCollection]?: string;
};

const CreateBlog: React.FC<CreateBlogProps> = ({ onBack }) => {
    const { profile } = useAuth();
    const notify = useNotification();
    const [formData, setFormData] = useState<FormDataPostAboutCollection>({
        category: 0,
        date: dayjs(),
        title: '',
        summary: '',
        author: '',
        period: '',
        content: '',
        source: null,
        images: [],
        videos: [],
        authorName: profile ? profile.full_name : ''
    });
    const [errors, setErrors] = useState<FormErrors>({});
    const [imageFile, setImageFile] = useState<File | null>(null);

    const handleBack = () => {
        onBack();
        setFormData({
            category: 0, date: dayjs(), title: '', summary: '', author: '',
            period: '', content: '', source: null, images: [], videos: [], authorName: profile ? profile.full_name : ''
        })
    }

    const handleInputChange = (name: string, value: any) => {
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name as keyof typeof errors]) {
        setErrors(prev => ({ ...prev, [name]: undefined }));
        }
    };

    const handleContentChange = (value: string) => {
        setFormData(prev => ({ ...prev, content: value}));
        if(errors.content){
            setErrors(prev => ({ ...prev, content: undefined}))
        }
    }

    const handleFileSelect = (file: File) => {
        setImageFile(file)
    }

    const validateForm = (): boolean => {
        const newErrors: FormErrors = {};
        if (!formData.category) newErrors.category = 'Vui lòng nhập thể loại.';
        if (!formData.title.trim()) newErrors.title = 'Vui lòng nhập tiêu đề.';
        if (!formData.summary.trim()) newErrors.summary = 'Vui lòng nhập tóm tắt.';
        if (!formData.author) newErrors.author = 'Vui lòng nhập tác giả.';
        if (!formData.period) newErrors.period = 'Vui lòng nhập thời kỳ.';
        if (!formData.content.trim() || formData.content === '<p><br></p>') newErrors.content = 'Nội dung không được để trống.';

        if (!imageFile) {
            notify({ severity: 'error', message: 'Vui lòng tải lên hình ảnh.' });
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0 && !!imageFile;
    };

    const handleSubmit = async () => {
        if(!validateForm()) {
            return;
        }
    }

    return(
        <Box>
            <Paper sx={{ p: 1, borderTop: '2px solid #d3d3d3ff', borderRadius: 0}}>
                <Stack>
                    <IconButton
                        handleFunt={handleBack}
                        icon={<ArrowBack sx={{ width: "28px", height: "28px" }} />}
                    />
                    <Typography pt={1} fontWeight={600} variant="subtitle2">Tạo bài viết</Typography>
                </Stack>
            </Paper>
            <Paper sx={{ m: 2, p: 2, boxShadow: '0px 1px 3px 1px rgba(0, 0, 0, 0.1), 0px 1px 2px 0px rgba(0, 0, 0, 0.3)'}}>
                <Typography fontWeight={700} variant="h6">Thông tin bài viết</Typography>
                <Grid sx={{ mt: 2}} container spacing={2}>
                    <Grid size={{ xs: 12, md:6 }}>
                        <InputSelect
                            name="category"
                            label="Thể loại"
                            value={formData.category}
                            onChange={handleInputChange}
                            options={CategoryPost}
                            transformOptions={(data) =>
                                data.map((item) => ({
                                    value: item.category,
                                    label: item.category_label
                                }))
                            }
                            error={!!errors.category}
                            helperText={errors.category}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <InputText
                            name="date"
                            label="Thời gian"
                            value={formData.date}
                            onChange={handleInputChange}
                            type="date"
                            placeholder="Thời gian"
                            disabled
                        />
                    </Grid>
                    {formData.category === 3 && (
                        <Collection
                            onInputChange={handleInputChange}
                            onFileSelect={handleFileSelect}
                            formData={formData}
                            onContentChange={handleContentChange}
                            errors={errors}
                        />
                    )}
                </Grid>
                <Stack display='flex' direction="row" justifyContent="flex-end" spacing={2} sx={{ my: 3 }}>
                    <Button
                        sx={{ bgcolor: COLORS.BUTTON, width: 120}}
                        onClick={handleSubmit}
                    >
                        Tạo
                    </Button>
                    <Button
                        variant="outlined"
                        sx={{ border: '1px solid #000', color: '#000', width: 120 }}
                        onClick={handleBack}
                    >
                        Hủy
                    </Button>
                </Stack>
            </Paper>
        </Box>
    )
}

export default CreateBlog;