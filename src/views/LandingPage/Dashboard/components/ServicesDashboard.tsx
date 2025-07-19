// import { DATA_SERVICES } from "@/constants/data";
// import { Box, Divider, IconButton, Stack, Typography } from "@mui/material";
// import Grid from "@mui/material/Grid2";

// const ServicesDashboard = () => {
//     return(
//         <Box p={{ xs: 2, md: 6}}>
//             <Box mb={{ xs: 4}} py={1} borderBottom='1px solid black'>
//                 <Typography variant="h5" fontWeight={600}> Dịch vụ tiện ích</Typography>
//             </Box>
//             <Box
//                 p={{ xs: 2, md: 6}}
//                 sx={{
//                     position: 'relative',
//                     '&::after': {
//                         content: '""',
//                         position: 'absolute',
//                         top: 0,
//                         bottom: 0,
//                         left: '33.33%',
//                         width: '1px',
//                         bgcolor: '#ccc',
//                     },
//                     '&::before': {
//                         content: '""',
//                         position: 'absolute',
//                         top: 0,
//                         bottom: 0,
//                         left: '66.66%',
//                         width: '1px',
//                         bgcolor: '#ccc',
//                     },
//                 }}
//             >
//                 <Grid container>
//                     {DATA_SERVICES.map((data, idx) => {
//                         const Icon = data.icon;
//                         return(
//                             <Grid 
//                                 key={data.id}  size={{ xs: 12, sm: 6, md: 4}}
//                                 sx={{ 
//                                     display: "flex", alignItems: "center", gap: 2,  
//                                     pb: { xs: 2, sm: 2},
//                                     pt: { xs: 2, sm: 2},
//                                     borderTop: {
//                                         sx: idx >= 1 ? '1px solid #ccc' : 'none',
//                                         sm: idx >= 2 ? '1px solid #ccc' : 'none',
//                                         md: idx >= 3 ? '1px solid #ccc' : 'none'  
//                                     },
//                                 }}
//                             >                             
//                                 <Box
//                                     sx={{
//                                         width: 60,
//                                         height: 60,
//                                         display: 'flex',
//                                         alignItems: 'center',
//                                         justifyContent: 'center',
//                                         bgcolor: '#eee',
//                                         borderRadius: 2
//                                     }}
//                                 >
//                                     {Icon && <Icon sx={{ fontSize: 50, color: '#333'}} />}
//                                 </Box>
//                                 <Typography fontWeight={600}>{data.name}</Typography>
//                             </Grid> 
//                         )
//                     })}
//                 </Grid>
//             </Box>
//         </Box>
//     )
// }


// export default ServicesDashboard;

import React from 'react';
import { Box, Grid, Typography, Paper, Divider } from '@mui/material';
import { styled } from '@mui/system';

// --- Icon Imports/Placeholders ---
// Replace these with actual SVG icons if available, or use MUI equivalents.
// For this example, we'll use simple placeholders or standard MUI icons.
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import PublicIcon from '@mui/icons-material/Public';
import LocalCafeIcon from '@mui/icons-material/LocalCafe';
import MapIcon from '@mui/icons-material/Map';
import StorefrontIcon from '@mui/icons-material/Storefront';

// --- Styled Components & Interfaces ---

// Interface for service data
interface ServiceItem {
  icon: React.ElementType;
  text: string;
}

// Styled component for the main container
const SectionContainer = styled(Box)(({ theme }) => ({
  backgroundColor: '#f9f5ed', // Light beige background color based on the image
  padding: '60px 40px',
}));

// Styled component for the Service Card (Paper wrapper)
const ServiceCard = styled(Paper)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: '20px 0',
  backgroundColor: 'transparent',
  boxShadow: 'none',
}));

// Styled component for the icon container
const IconContainer = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '60px',
  height: '60px',
  marginRight: '16px',
});

// Styled component for the icons themselves
const ServiceIcon = styled(Box)({
  fontSize: '56px', // Adjust size to match the image icons
  color: '#2e2e2e', // Dark color for the icon
});

// --- Service Data ---
const services: ServiceItem[] = [
  { icon: MusicNoteIcon, text: 'Phát nhạc nền cho bảo tàng' },
  { icon: CameraAltIcon, text: 'Chụp photobooth vintage' },
  { icon: PublicIcon, text: 'Khám phá các tác phẩm hot' },
  { icon: LocalCafeIcon, text: 'Cafe chill cực chill Amuse' },
  { icon: MapIcon, text: 'Hành trình tour siêu vui vẻ' },
  { icon: StorefrontIcon, text: 'Mua sắm tiện lợi từ online' },
];

// --- Main Component ---
const UtilityServices: React.FC = () => {
  return (
    <SectionContainer>
      <Box sx={{ maxWidth: '1200px', margin: '0 auto' }}>
        
        {/* Section Header */}
        <Typography 
          variant="h4" 
          component="h2" 
          sx={{ 
            fontWeight: 'bold', 
            mb: 4, 
            color: '#2e2e2e',
            borderBottom: '1px solid #ccc',
            pb: 2
          }}
        >
          Dịch vụ tiện ích
        </Typography>

        {/* Services Grid */}
        <Grid container spacing={4}>
          {services.map((service, index) => (
            <Grid 
              item 
              xs={12} 
              md={4} 
              key={index}
              sx={{ 
                // Add vertical dividers between rows based on the image structure
                borderBottom: {xs: '1px solid #ccc' , md: index < 3 ? '1px solid #ccc' : 'none'},
                pb: index < 3 ? 4 : 0,
                pt: index >= 3 ? 4 : 0
              }}
            >
              <ServiceItemCard icon={service.icon} text={service.text} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </SectionContainer>
  );
};

// --- Reusable Service Item Card Component ---
interface ServiceItemCardProps {
  icon: React.ElementType;
  text: string;
}

const ServiceItemCard: React.FC<ServiceItemCardProps> = ({ icon: Icon, text }) => {
  return (
    <ServiceCard>
      <IconContainer>
        {/* Render the icon using the MUI component passed in */}
        <ServiceIcon as={Icon} />
      </IconContainer>
      <Typography variant="body1" sx={{ fontSize: '1.1rem', color: '#2e2e2e', fontWeight: 500 }}>
        {text}
      </Typography>
    </ServiceCard>
  );
};

export default UtilityServices;