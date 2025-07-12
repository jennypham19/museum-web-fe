import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { __VERSION__ } from '@/config';
import { Box, Button, Divider, Stack } from '@mui/material';
import Grid from '@mui/material/Grid2';
import IconButton from '@/components/IconButton/IconButton';
import { Facebook, Instagram,Language,Twitter } from '@mui/icons-material';
import InputText from '@/components/InputText';
import { useState } from 'react';
import { Dayjs } from 'dayjs';
import { FaTiktok, FaFacebookF } from 'react-icons/fa';

interface ProfileFormData {
  email: string;
}

const Footer = () => {
  const [errors, setErrors] = useState<Partial<Record<'email' , string>>>({});
  const [formData, setFormData] = useState<ProfileFormData>({ email: '' });
  const handleCustomInputChange = (name: string, value: string | null | Dayjs | number ) => {
          if (Object.prototype.hasOwnProperty.call(formData, name)) {
          const validName = name as keyof ProfileFormData; 
      
          setFormData((prevData) => ({
              ...prevData,
              [validName]: String(value ?? ''), 
          }));

          if(validName === 'email' && typeof value === 'string'){
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // chuẩn email đơn giản
            if(!emailRegex.test(value)){
              setErrors(prev => ({
                ...prev,
                email: "Email không hợp lệ"
              }));
              return;
            }
            }
  
          if (validName === 'email') {
              if (errors[validName as 'email']) {
                  setErrors(prev => {
                      const newErrors = { ...prev };
                      delete newErrors[validName as 'email'];
                      return newErrors;
                  });
              }
          }
          } else {
          console.warn(`CustomInput called onChange with an unexpected name: ${name}`);
          }
      };
  return (
    <FooterRoot>
        <Box sx={{ height: {xs: '300px', md: '250px'}}}>
          <Grid container spacing={2} sx={{ height: '100%' }}>
            <Grid size={{ xs: 12, md: 6}}>
                <Box
                  sx={{
                    height:'100%',
                    display:'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    
                  }}
                >
                  <Box
                    sx={{
                      mt: 2
                    }}
                  >
                  <Typography fontFamily='Rozha One' sx={{ color: '#F4E2D4'}} variant='h4' fontWeight={800}>AMUSE</Typography>
                  <Typography variant='h6' sx={{ whiteSpace: 'wrap'}} fontWeight={500}>Số 62/128 đường Tôn Thất Thuyết - quận Nam Tử Liêm - thành phố Hà Nội</Typography>
                  </Box>
                </Box>

            </Grid>
            <Grid size={{ xs: 12, md: 6}}>
              <Box
                sx={{
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <Stack direction='column' sx={{ width: { xs: '100%', md: '60%'}, mb: { xs: 2, md: 0}}}>
                  <Typography fontWeight={500} textAlign={{ xs: 'center', md: 'start'}}>Đăng ký nhận thông báo</Typography>
                  <Box display='flex' flexDirection={{ xs: 'column', md: 'row'}}>
                    <InputText
                      label=''
                      name='email'
                      onChange={handleCustomInputChange}
                      type='text'
                      value={formData.email}
                      placeholder='Email của bạn'
                      sx={{ mt: 0, mr: 2 }}
                      margin="dense"
                      error={!!errors.email}
                      helperText={errors.email}
                    />
                    <Button sx={{ width: { xs: '100%', md: '105px'}, height: '35px', bgcolor: '#1C1A1B', mt: { xs: 1, md: 0}}}>
                      Gửi đi
                    </Button>    
                  </Box>
                </Stack>
              </Box>
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
  height: '220px',
  display: 'flex',
  flexDirection:'column',
  // justifyContent: 'center',
  // alignItems: 'center',
  padding: theme.spacing(1, 2),
  backgroundColor: '#160E0D',
  color: 'white',
  // responsive cho xs
  [theme.breakpoints.down('sm')]: {
    height: '400px',
  },
}));

export default Footer;
