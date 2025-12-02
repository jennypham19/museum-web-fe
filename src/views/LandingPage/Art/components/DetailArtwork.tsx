import { CategoryType, ViewModeProps } from "@/types/tab";
import { Box, Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useState } from "react";
import Grid from "@mui/material/Grid2";
import TabsViewSwitcher from "./TabsViewSwitcher";
import Overview from "./tabs/Overview";
import { COLORS } from "@/constants/colors";
import { IObjectArt } from "@/types/landingpage";
import Provenance from "./tabs/Provenance";
import ExhibitionHistory from "./tabs/ExhibitionHistorty";
import References from "./tabs/References";

interface DetailArtworkProps{
    data: IObjectArt;
}

const DataViewMode: ViewModeProps[] = [
    {
        id: 1,
        label: 'Tổng quan',
        value: 1,

    },
    {
        id: 2,
        label: 'Nguồn gốc',
        value: 2,
    },
    {
        id: 3,
        label: 'Lịch sử triển lãm',
        value: 3
    },
    {
        id: 4,
        label: 'Tài liệu tham khảo',
        value: 4
    }
]

const DetailArtwork = (props: DetailArtworkProps) => {
    const { data } = props;
    const [activeCategory, setActiveCategory] = useState<CategoryType>(1);
    const theme = useTheme();
    const mdUp = useMediaQuery(theme.breakpoints.down('md'));

    const handleActiveCategory = (category: CategoryType) => {
        setActiveCategory(category); 
    }

    return(
        <Box flexDirection='column' mt={{ xs: 5, md: 8 }} display='flex' px={{ xs: 0, md: 50 }} justifyContent={{ xs: 'center', md: 'flex-start'}}>
            <Typography mb={2} fontSize={{ xs: '20px', md: '30px'}} fontWeight={700}>Chi tiết tác phẩm nghệ thuật</Typography>
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
                <Grid container spacing={3}>
                    <Grid size={{ xs: 3 }}>
                        <TabsViewSwitcher type='ver' DataViewMode={DataViewMode} viewMode={activeCategory} onChange={handleActiveCategory}/>
                    </Grid>
                    <Grid size={{ xs: 9 }} sx={{ pl: 2 }}>
                        {activeCategory === 1 && (
                            <Overview data={data}/>
                        )}
                        {activeCategory === 2 && (
                            <Provenance/>
                        )}
                        {activeCategory === 3 && (
                            <ExhibitionHistory/>
                        )}
                        {activeCategory === 4 && (
                            <References/>
                        )} 
                    </Grid>

                </Grid>
            )}

            {mdUp && (
                <Box mt={3} borderBottom='1px solid #d3d3d3ff'>
                    {activeCategory === 1 && (
                        <Overview data={data}/>
                    )}
                    {activeCategory === 2 && (
                        <Provenance/>
                    )}
                    {activeCategory === 3 && (
                        <ExhibitionHistory/>
                    )}
                    {activeCategory === 4 && (
                        <References/>
                    )}                         
                </Box>
            )}
        </Box>
    )
}

export default DetailArtwork;