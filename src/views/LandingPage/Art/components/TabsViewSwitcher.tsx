import { COLORS } from '@/constants/colors';
import { CategoryType, ViewModeProps } from '@/types/tab';
import { Box, Tabs, Tab } from '@mui/material';
import React from 'react';


interface Props {
  viewMode: CategoryType;
  onChange: (mode: CategoryType) => void;
  DataViewMode: ViewModeProps[];
  type?: string
}

const TabsViewSwitcher: React.FC<Props> = ({ viewMode, onChange, DataViewMode, type }) => {
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    onChange(newValue as CategoryType);
  };

  return (
    <Box mb={1} sx={{flexGrow: 1, display: 'flex', height: '100%', borderBottom: type ? 'none' : '1px solid #d3d3d3ff' }}>
      <Tabs
        orientation={type ? 'vertical' : 'horizontal'} 
        value={viewMode} 
        onChange={handleChange} 
        variant="standard"
        textColor='inherit'
        indicatorColor="secondary"
        sx={{
          '& .MuiTab-root': { color: '#000', fontWeight: 500 },
          '& .MuiTabs-indicator': { backgroundColor: COLORS.BUTTON, width: 5, height: 5 },
          borderRight: type ? '1px solid #d3d3d3ff' : 'none',
        }}
    >
        {DataViewMode.map((data, index) => {
            return (
                <Tab 
                    key={index}
                    label={data.label} value={data.value} 
                    sx={{
                        color: '#000',
                        px: 4,
                        py: 2,
                        bgcolor: data.value === viewMode ? '#dbdadaff' : 'transparent',
                        fontSize: '16px'
                    }}
                />
            )
        })}
      </Tabs>
    </Box>
  );
};

export default TabsViewSwitcher;