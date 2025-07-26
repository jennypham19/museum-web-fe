import React from "react";
import { ContentArtType, ViewModeProps } from "../DetailArt";
import { Box, Tab, Tabs } from "@mui/material";

interface Props{
    viewMode: ContentArtType;
    onChange: (mode: ContentArtType) => void;
    DataViewMode: ViewModeProps[];
}

const TabsViewSwitcher: React.FC<Props> = ({ viewMode, onChange, DataViewMode}) => {
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        onChange(newValue as ContentArtType)
    };
    return(
        <Box sx={{flexGrow: 1, mt: 2, pb: 0.5 }}>
            <Tabs
                value={viewMode}
                onChange={handleChange}
                variant="standard"
                textColor="inherit"
                indicatorColor="secondary"
                sx={{
                    mb: 2,
                    '& .MuiTab-root': { color: 'black', fontWeight: 600},
                    '& .MuiTabs-indicator': { bgcolor: 'black'}
                }}
            >
                {DataViewMode.map((data, index) => {
                    return(
                        <Tab
                            key={index}
                            label={data.label} value={data.value}
                            sx={{
                                color: '#fff',
                                px: 6
                            }}
                        />
                    )
                })}
            </Tabs>
        </Box>
    )
}

export default TabsViewSwitcher;