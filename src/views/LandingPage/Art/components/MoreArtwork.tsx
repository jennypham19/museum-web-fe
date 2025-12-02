import { COLORS } from "@/constants/colors";
import { CategoryType, ViewModeProps } from "@/types/tab";
import { Box, Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useState } from "react";
import TabsViewSwitcher from "./TabsViewSwitcher";

interface MoreArtworkProps{

}

const DataViewMode: ViewModeProps[] = [
    {
        id: 1,
        label: 'Có liên quan',
        value: 1,

    },
    {
        id: 2,
        label: 'Từ cùng thời gian & địa điểm',
        value: 2,
    },
    {
        id: 3,
        label: 'Trong cùng một phòng trưng bày',
        value: 3
    },
    {
        id: 4,
        label: 'Trong cùng một bộ sưu tập',
        value: 4
    }
]

const MoreArtwork = (props: MoreArtworkProps) => {
    const [activeCategory, setActiveCategory] = useState<CategoryType>(1);
    const theme = useTheme();
    const mdUp = useMediaQuery(theme.breakpoints.down('md'));
    const handleActiveCategory = (category: CategoryType) => {
        setActiveCategory(category); 
    }

    return(
        <Box mt={5} flexDirection='column' p={{ xs: 0, md: 5 }}>
            <Typography mb={2} fontSize={{ xs: '20px', md: '30px'}} fontWeight={700}>Thêm tác phẩm nghệ thuật</Typography> 
            {mdUp ? (
                <Stack
                    direction='column'
                    spacing={1}
                    sx={{
                        width: '100%'
                    }}
                >
                    {DataViewMode.map((category, index) => (
                        <Box
                            key={index}
                            onClick={() => category.value && handleActiveCategory(category.value)}
                            sx={{
                                px: 2,
                                py: 1,
                                borderRadius: 2,
                                cursor: 'pointer',
                                textAlign: 'left',
                                bgcolor: activeCategory === category.value ? COLORS.BUTTON : 'transparent',
                                color: activeCategory === category.value ? '#fff' : '#000',
                                fontWeight: activeCategory === category.value ? 700 : 400,
                                border: '1px solid #000',
                                transition: '0.3s',
                                "&:hover": {
                                    bgcolor: activeCategory === category.value ? '#fff' : 'rgba(255,255,255,0.1)'
                                }
                            }}
                        >
                            {category.label}
                        </Box>
                    ))}
                </Stack>
            ) : (
                <TabsViewSwitcher DataViewMode={DataViewMode} viewMode={activeCategory} onChange={handleActiveCategory}/>
            )}
        </Box>
    )
}

export default MoreArtwork;