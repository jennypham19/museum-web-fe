import { useContext } from 'react';
import { Link as RouterLink } from 'react-router-dom';

import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { CollapseContext } from '.';
import { ROUTE_PATH } from '@/constants/routes';
import logo_museum from "@/assets/images/users/logo.png"

const Logo = () => {
  const collapsed = useContext(CollapseContext);

  if (collapsed) {
    return (
      <Box
        component={RouterLink}
        to={ROUTE_PATH.HOME}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
          px: 1,
          padding: '5px 0'
        }} 
      >
        <Box
          component='img'
          src={logo_museum}
          sx={{
            width: 32,
            height: 32,
            borderRadius: '50%',
          }}
          alt='Art Glass Museum'
        />
      </Box>
    );
  }

  return (
    <Toolbar
      component={RouterLink}
      to={ROUTE_PATH.HOME}
      sx={{ 
        whiteSpace: 'nowrap',
        textDecoration: 'none',
        color: 'inherit',
        display: 'flex',
        alignItems: 'center',
        gap: 1.5,
        padding: '5px 0' 
      }}
      >
        <Box
          component='img'
          src={logo_museum}
          sx={{
            width: 64,
            height: 64,
            borderRadius: '50%'
          }}
          alt='Art Glass Museum'
        />
        <Typography variant="h6" component="div" sx={{ fontWeight: 600,  }}>
          Art Glass Museum
        </Typography>
    </Toolbar>
  );
};

export default Logo;
