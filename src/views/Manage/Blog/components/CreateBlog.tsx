import IconButton from "@/components/IconButton/IconButton";
import { ArrowBack } from "@mui/icons-material";
import { Box, Paper, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import Grid from "@mui/material/Grid2";
import InputSelect from "@/components/InputSelect";
import { CategoryPost } from "@/constants/data";
import InputText from "@/components/InputText";
import dayjs from "dayjs";
import Collection from "./categorys/Collection";


interface CreateBlogProps {
    handleBack: () => void;
}

const CreateBlog: React.FC<CreateBlogProps> = ({ handleBack }) => {
    const [category, setCategory] = useState<string | number>('');
    const [imageFile, setImageFile] = useState<File | null>(null);

    const handleInputChange = (name: string, value: any) => {

    };
    const handleSelectCategory = (name: string, value: any) => {
        setCategory(value)
    }

    const handleFileSelect = (file: File) => {
        setImageFile(file)
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
                            name="categgory"
                            label="Thể loại"
                            value={category}
                            onChange={handleSelectCategory}
                            options={CategoryPost}
                            transformOptions={(data) =>
                                data.map((item) => ({
                                    value: item.category,
                                    label: item.category_label
                                }))
                            }
                        />
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <InputText
                            name="date"
                            label="Thời gian"
                            value={dayjs()}
                            onChange={handleInputChange}
                            type="date"
                            placeholder="Thời gian"
                        />
                    </Grid>
                    {category === 3 && (
                        <Collection
                            onInputChange={handleInputChange}
                            onFileSelect={handleFileSelect}
                        />
                    )}
                </Grid>
            </Paper>
        </Box>
    )
}

export default CreateBlog;