import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { __VERSION__ } from '@/config';
import { Box, Divider, Stack } from '@mui/material';
import Grid from '@mui/material/Grid2';
import IconButton from '@/components/IconButton/IconButton';
import { Language } from '@mui/icons-material';
import { FaTiktok, FaFacebookF } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { DATA_INFO, DATA_LINKS, DATA_SOCIAL } from '@/constants/data';
 

const Footer = () => {
  const navigate = useNavigate();

  return (
    <FooterRoot>
        <Box sx={{ height: {xs: '520px', sm: '350px', md: '400px'}}}>
          <Grid container spacing={2} sx={{ height: '100%' }}>
            <Grid size={{ xs: 12, md: 6}}>
                <Box
                  sx={{
                    height:'100%',
                    display:'flex',
                    alignItems: { xs: 'start', md: 'center'},
                    justifyContent: { xs: 'start', md: 'center'},
                    
                  }}
                >
                  <Box
                    sx={{
                      mt: 2
                    }}
                  >
                  <Typography fontFamily='Rozha One' sx={{ color: '#F4E2D4'}} variant='h3' fontWeight={800}>AMUSE</Typography>
                  <Typography sx={{ whiteSpace: 'wrap', fontSize: { xs: '15px', md: '20px'}}} fontWeight={500}>Số 62/128 đường Tôn Thất Thuyết - quận Nam Từ Liêm - thành phố Hà Nội</Typography>
                  </Box>
                </Box>

            </Grid>
            <Grid size={{ xs: 12, md: 6}}>
              <Grid container spacing={2}>
                <Grid size={{ xs: 6, sm: 4}}>
                    <Box pt={{ xs: 0, md: 6}} pb={{ xs: 2, sm: 3}} display='flex' flexDirection='column'>
                      <Typography fontWeight={700} sx={{ fontSize: { xs: '16px', md: '24px'}}}>Links</Typography>
                    </Box>
                    {DATA_LINKS.map((data, index) => {
                      return(
                        <Stack key={index} direction='column'>
                          <Typography py={1} onClick={() => navigate(`${data.path}`)} sx={{ fontSize: { xs: '13px', md: '16px'}, cursor: 'pointer'}}>{data.name}</Typography>
                        </Stack>
                      )
                    })}
                </Grid>
                <Grid size={{ xs: 6, sm: 4}}>
                    <Box pt={{ xs: 0, md: 6}} pb={{ xs: 2, sm: 3}} display='flex' flexDirection='column'>
                      <Typography fontWeight={700} sx={{ fontSize: { xs: '16px', md: '24px'}}}>Info</Typography>
                    </Box>
                    {DATA_INFO.map((data, index) => {
                      return(
                        <Stack key={index} direction='column'>
                          <Typography py={1} onClick={() => navigate(`${data.path}`)} sx={{ fontSize: { xs: '13px', md: '16px'}, cursor: 'pointer'}}>{data.name}</Typography>
                        </Stack>
                      )
                    })}
                </Grid>
                <Grid size={{ xs: 6, sm: 4}}>
                    <Box pt={{ xs: 0, md: 6}} pb={{ xs: 2, sm: 3}} display='flex' flexDirection='column'>
                      <Typography fontWeight={700} sx={{ fontSize: { xs: '16px', md: '24px'}}}>Social</Typography>
                    </Box>
                    {DATA_SOCIAL.map((data, index) => {
                      return(
                        <Stack key={index} direction='column'>
                          <Typography py={1} onClick={() => navigate(`${data.path}`)} sx={{ fontSize: { xs: '13px', md: '16px'}, cursor: 'pointer'}}>{data.name}</Typography>
                        </Stack>
                      )
                    })}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
        <Divider sx={{ border: 'solid 0.5px white'}} />
        <Box sx={{ height: '40px', px: { xs: 0, md: 2}, mt: { xs: 1, md: 0}}} display='flex' justifyContent='space-between'  alignItems={{ xs: 'flex-start', md: 'center'}} flexDirection={{ xs: 'column', md:'row'}}>
            <Box mt={1.5} display="flex" alignItems='center'>
              <IconButton
                handleFunt={() => {}}
                icon={<FaFacebookF size={20} color="#000"/>}
                backgroundColor="white"
                // href="https://www.facebook.com/profile.php?id=61576721774771"
                borderRadius='50%'
              />
              <IconButton
                handleFunt={() => {}}
                icon={<FaTiktok size={20} color="#000"/>}
                backgroundColor="white"
                border="1px solid black"
                sx={{ mx: 1}}
                borderRadius='50%'
              />
              <IconButton
                handleFunt={() => {}}
                icon={<Language sx={{ fontSize: 25, color: 'black'}}/>}
                backgroundColor="white"
                border="1px solid black"
                borderRadius='50%'
              />
            </Box>
            <Typography>Amusegroup@museum.vn </Typography>
        </Box>
    </FooterRoot>
  );
};

const FooterRoot = styled('footer')(({ theme }) => ({
  height: '620px',
  display: 'flex',
  flexDirection:'column',
  // justifyContent: 'center',
  // alignItems: 'center',
  padding: theme.spacing(1, 2),
  backgroundColor: '#160E0D',
  color: 'white',
  // responsive cho sm
  [theme.breakpoints.up('sm')]: {
    height: '440px',
  },
}));

export default Footer;
