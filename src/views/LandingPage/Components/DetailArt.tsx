import IconButton from "@/components/IconButton/IconButton";
import { Home, Label } from "@mui/icons-material";
import { Box, Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import image_detail_art from "@/assets/images/users/image_detail_art.png"
import { TITLE_CONTENT_ART_LABELS, TitleContentArt } from "@/constants/status";
import { useState } from "react";
import Overall from "./DetailArt/Overall";
import ObjectExhibited from "./DetailArt/ObjectExhibited";
import Content from "./DetailArt/Content";
import InsideExhibition from "./DetailArt/InsideExhibition";

export type ContentArtType = 1 | 2 | 3 | 4;

export interface ViewModeProps{
    id: number,
    label: string,
    value: number
}

const DataViewMode: ViewModeProps[] = [
    {
        id: 1,
        label: 'Tổng quan',
        value: 1
    },
    {
        id: 2,
        label: 'Đối tượng triển lãm',
        value: 2
    },
    {
        id: 3,
        label: 'Nội dung liên quan',
        value: 3
    },
    {
        id: 4,
        label: 'Bên trong triển lãm',
        value: 4
    },
]

export const getTitleContentArtLabel = (title: TitleContentArt | null | undefined): string => {
    if(!title) return "Không xác định";
    return TITLE_CONTENT_ART_LABELS[title] || title;
}

const DetailArt = () => {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string}>();
    const [activeLabelContentArt, setActiveLabelContentArt] = useState(1);
    const theme = useTheme();
    const mdUp = useMediaQuery(theme.breakpoints.down('md'));

    const handleActiveCategory = (label: number) => {
        setActiveLabelContentArt(label);
    }

    return(
        <Box>
            <Box display='flex' flexDirection='row' py={{ xs: 0, md: 1.5}} px={{ xs: 2, md: 10}}>
                <IconButton
                    handleFunt={() => navigate(-1)}
                    icon={<Home sx={{ width: { xs: 20, md: 30}, height: { xs: 20, md: 30}, color: '#000'}}/>}
                />
                <Typography mt={{ xs: 1, md: 1}} fontWeight={600} fontSize={{ xs: '12px', md: '18px'}}>/ Kế hoạch thăm quan/ Triển lãm đang mở/ Nghệ thuật từ Châu Á</Typography>
            </Box>
            <Box
                sx={{
                    height: { xs: 300, md: 480},
                    width: '100%',
                    backgroundImage: `url(${image_detail_art})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            />
            <Box
                px={{ xs: 3, md: 6}} mb={{ xs: 2, md: 4}} pt={{ xs: 3, md: 6}}
                sx={{
                    width: '100%',
                    bgcolor: '#E6E6E6'
                }}
            >
                <Typography fontWeight={700} fontSize={{ xs: '16px', md: '25px'}}>Nghệ thuật từ Châu Á</Typography>
                <Typography mt={1} fontSize={{ xs: '14px', md: '16px'}}>
                    Chúng tôi rất mong được chào đón bạn đến với bảo tàng. Vui lòng xem lại kỹ các hướng dẫn bên dưới trước khi bạn tới thăm. Chúng tôi có quyền từ chối bất kì khách 
                    hàng nào vi phạm quy định của bảo tàng. Xin cảm ơn
                </Typography>
                {mdUp ? (
                    <Stack
                    direction='column'
                    spacing={1}
                    sx={{
                        pb: 2,
                        mt: 2,
                        width: '100%'
                    }}
                    >
                    {DataViewMode.map((label, index) => (
                        <Box
                        key={index}
                        onClick={() => label.value && handleActiveCategory(label.value)}
                        sx={{
                            px: 2,
                            py: 1,
                            borderRadius: 2,
                            cursor: 'pointer',
                            textAlign: 'left',
                            bgcolor: activeLabelContentArt === label.value ? 'none' : 'transparent',
                            color: activeLabelContentArt === label.value ? 'black' : 'black',
                            fontWeight: activeLabelContentArt === label.value ? 700 : 400,
                            border: '1px solid black',
                            transition: '0.3s',
                            "&:hover": {
                            bgcolor: activeLabelContentArt === label.value ? "none" : 'rgba(255,255,255,0.1)'
                            }
                        }}
                        >
                        {label.label}
                        </Box>
                    ))}
                    </Stack>
                ) : (
                    <Stack
                        sx={{
                            pb: 2,
                            mt: 2,
                            width: '100%'
                        }}
                    >
                        {DataViewMode.map((data, index) => {
                            return(
                                <Stack sx={{ pr: 5}}>
                                    <Typography
                                        onClick={() => data.value && handleActiveCategory(data.value)}
                                        fontWeight={700} 
                                        fontSize='20px'
                                        sx={{
                                            cursor: 'pointer',
                                            borderBottom: activeLabelContentArt === data.value ? '2px solid black' : 'none'
                                        }}
                                    >
                                        {data.label}
                                    </Typography>
                                </Stack>
                            )
                        })}
                    </Stack>
                )}
            </Box>
            <Box px={{ xs: 3, md: 6}} mb={{ xs: 2, md: 4}} pt={{ xs: 3, md: 3}}>
                {activeLabelContentArt === 1 && (<Overall/>)}
                {activeLabelContentArt === 2 && (<ObjectExhibited/>)}
                {activeLabelContentArt === 3 && (<Content/>)}
                {activeLabelContentArt === 4 && (<InsideExhibition/>)}
            </Box>
        </Box>
    )
}

export default DetailArt;