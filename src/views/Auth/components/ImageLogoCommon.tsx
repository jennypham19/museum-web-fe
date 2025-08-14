import logo_login from "@/assets/images/users/logo_login.png";
import { Box } from "@mui/material";
const ImageLogoCommon = () => {
    return(
        <>
          <Box
            component="img"
            src={logo_login}
            alt="Drum"
            sx={{
              position: 'absolute',
              top: '15%',
              left: '50%',
              transform: 'translateX(-50%)',
              width: { xs: '50%', lg: 560},
              height: { xs: '50%', lg: 560},
              zIndex: 1,
              bgcolor: '#780000',
              borderRadius: '50%'
            }}
          />
          <Box
            sx={{
              position: 'absolute',
              inset: '45% 0 0 0',
              backdropFilter: 'blur(20px)',
              background: 'rgba(255, 255, 255, 0.2)',
              zIndex: 2,
            }}
          />
        </>
    )
}

export default ImageLogoCommon;