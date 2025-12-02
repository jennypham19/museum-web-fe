import InputMaskTextField from "@/components/InputMaskTextField";
import InputText from "@/components/InputText";
import { DATA_TYPE_EVENT } from "@/constants/data";
import ImageUpload from "@/views/Manage/Blog/components/ImageUpload";
import NavigateBack from "@/views/Manage/components/NavigateBack";
import { Box, Checkbox, FormControl, FormControlLabel, List, ListItemButton, ListItemIcon, ListItemText, Radio, RadioGroup, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import dayjs from "dayjs";
import { useState } from "react";

interface CreateEventProps{
    onClose: () =>  void;
    image: string | null;
    onFileSelect: (file: File | null) => void;
    error: { errorImg: string};
    onInputChange: (name: string, value: any) =>  void;
}

const LabelTypo = (props: { label: string}) => {
    const { label } = props;
    return (
        <Typography fontWeight={700} fontSize='15px'>{label}</Typography>
    )
}

const CreateEvent = (props: CreateEventProps) => {
    const { onClose, image, onFileSelect, error, onInputChange } = props;
    const [startHour, setStartHour] = useState('');
    const [topic, setTopic] = useState(1);
    return(
        <>
            <NavigateBack
                onBack={onClose}
                title="Thêm mới sự kiện"
            />
            <Box m={3} bgcolor='#fff' p={4}>
                <Grid container spacing={3}>
                    <Grid size={{ xs: 12 }}>
                        <LabelTypo label="Hình ảnh"/>
                        <ImageUpload
                            onFileSelect={onFileSelect}
                            initialImage={image}
                        />
                        {error.errorImg && (
                            <Typography color="error" variant="caption" sx={{ mt: 1 }}>
                                {error.errorImg}
                            </Typography>
                        )}
                    </Grid>
                    <Grid size={{ xs: 12 }}>
                        <LabelTypo label="Tên"/>
                        <InputText
                            label=""
                            name="name"
                            value={''}
                            placeholder="Nhập thông tin"
                            onChange={onInputChange}
                            type="text"
                        />
                    </Grid>
                    <Grid size={{ xs: 12, md: 6}}>
                        <LabelTypo label="Chủ đề"/>
                        <FormControl>
                            <RadioGroup
                                name="radio-buttons-group"
                                defaultValue={topic}
                            >
                                {DATA_TYPE_EVENT.map((data, index) => {
                                    return(
                                        <FormControlLabel
                                            key={index}
                                            value={data.id}
                                            label={data.label}
                                            control={<Radio/>}
                                            slotProps={{
                                                typography: {
                                                    sx: {
                                                        fontSize: '14px'
                                                    }
                                                }
                                            }}
                                        />
                                    )
                                })}
                            </RadioGroup>
                        </FormControl>
                    </Grid>
                    <Grid size={{ xs: 12, md: 6}}>
                        <LabelTypo label="Chi tiết"/>
                    </Grid>
                    <Grid size={{ xs: 12 }}>
                        <LabelTypo label="Mô tả"/>
                        <InputText
                            label=""
                            name="description"
                            value={''}
                            placeholder="Nhập thông tin"
                            onChange={onInputChange}
                            type="text"
                            multiline
                            rows={6}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, md: 4}}>
                        <LabelTypo label="Ngày bắt đầu"/>
                        <InputText
                            label=""
                            name="startDate"
                            value={dayjs()}
                            placeholder="Nhập thông tin"
                            onChange={onInputChange}
                            type="date"
                        />
                    </Grid>
                    <Grid size={{ xs: 12, md: 4}}>
                        <LabelTypo label="Ngày kết thúc"/>
                        <InputText
                            label=""
                            name="endDate"
                            value={dayjs()}
                            placeholder="Nhập thông tin"
                            onChange={onInputChange}
                            type="date"
                        />
                    </Grid>
                    <Grid size={{ xs: 6, md: 2}}>
                        <LabelTypo label="Giờ bắt đầu"/>
                        <InputMaskTextField
                            mask="99:99"
                            value={startHour}
                            onChange={setStartHour}
                            placeholder="__:__"
                        />
                    </Grid>
                    <Grid size={{ xs: 6, md: 2}}>
                        <LabelTypo label="Giờ kết thúc"/>
                        <InputMaskTextField
                            mask="99:99"
                            value={startHour}
                            onChange={setStartHour}
                            placeholder="__:__"
                        />
                    </Grid>
                </Grid>
            </Box>
        </>
    )
}

export default CreateEvent;