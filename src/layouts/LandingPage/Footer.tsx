import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { __VERSION__ } from '@/config';
import { Box, Divider, InputAdornment, Stack, TextField } from '@mui/material';
import Grid from '@mui/material/Grid2';
import IconButton from '@/components/IconButton/IconButton';
import { Language } from '@mui/icons-material';
import { FaFacebookF, FaInstagram, FaPinterestP, FaYoutube} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import CommonImage from '@/components/Image/index';
import image_museum from "@/assets/images/users/logo_museum.png";
import React from 'react';

interface TextProps{
  data: string
}

const Footer = () => {
  const navigate = useNavigate();

  const InputHeader = () => (
    <TextField
      placeholder='Đóng góp ý kiến'
      InputProps={{
        endAdornment: (
          <InputAdornment
            position='end'
            sx={{
              height: '100%',
              maxHeight: 'none',
              marginRight: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              paddingLeft: '12px',
              paddingRight: '12px'
            }}
          >
            <Inventory2OutlinedIcon sx={{ color: 'grey', fontSize: '23px'}}/>
          </InputAdornment>
        ),
        sx:{
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: '#C1C1C1'
          },
          "&:hover .MuiOutlinedInput-notchedOutline":{
            borderColor: '#C1C1C1'
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline":{
            border: '1px solid #C1C1C1'
          }
        }
      }}
      sx={{
        "& .MuiInputBase-root":{
          padding:0,
          borderRadius: '20px',
          bgcolor: '#FFFEF2',
          color: 'black'
        }
      }}
    />
  )

  const RenderText: React.FC<TextProps> = ({ data }) => (
    <Stack m={{ xs: 2, md: 5}} display='flex' alignItems='center'>
      <Typography fontSize={{ xs: '13px', md: '20px', whiteSpace: 'normal', wordBreak: 'break-word'}}>{data}</Typography>
    </Stack>
  )

  return (
    <FooterRoot>
        <Box color='white' bgcolor='#D30000' height={{ xs: '100%', md: 80}}>
            <Grid container spacing={3}>
              <Grid size={{ xs: 12, md: 8}}>
                <Typography ml={{ xs: 4, md: 15}} mt={{ xs: 3, md: 2}} fontWeight={600} fontSize={{ xs: '18px', md: '28px'}}>Đóng góp ý kiến của bạn cho chúng tôi!</Typography>
              </Grid>
              <Grid size={{ xs: 12, md: 4}}>
                <Box px={{ xs: 2, md: 4}} py={{ xs: 0, md: 2.6}} mb={{ xs: 2, md: 0}}>
                  <InputHeader/>
                </Box>
              </Grid>
            </Grid>
        </Box>
        <Grid container>
          <Grid size={{ xs: 12, md: 4}} sx={{ borderRight: { xs: 'none', md: '1px solid'}, borderBottom: '1px solid'}}>
            <Box p={{ xs: 3, md: 6}} display='flex' flexDirection='row'>
              <CommonImage
                src={image_museum}
                sx={{ height: 120}}
              />
              <Stack pl={3} direction='column'>
                <Typography fontSize={{ xs: '16px', md: '24px', whiteSpace: 'normal', wordBreak: 'break-word'}} fontWeight={600}>Bảo tàng triển lãm đèn Tiffany</Typography>
                <Typography fontSize={{ xs: '13px', md: '20px', whiteSpace: 'normal', wordBreak: 'break-word'}} color='text.secondary'>Cơ sở 1 - 32 Trường Chinh - Khương Trung - Thanh Xuân - Hà Nội</Typography>
                <Typography fontSize={{ xs: '13px', md: '20px', whiteSpace: 'normal', wordBreak: 'break-word'}} color='text.secondary'>Hotline: 1900 8976</Typography>
              </Stack>
            </Box>
            <Box px={{ xs: 3, md: 6}} pb={{ xs: 4, md: 6}} display='flex' flexDirection='row'>
              <Stack pl={{ xs: 0, md: 18}} direction='column'>
                <Typography fontSize={{ xs: '16px', md: '24px', whiteSpace: 'normal', wordBreak: 'break-word'}} fontWeight={600}>Bảo tàng triển lãm đèn Tiffany</Typography>
                <Typography fontSize={{ xs: '13px', md: '20px', whiteSpace: 'normal', wordBreak: 'break-word'}} color='text.secondary'>Cơ sở 2 - 123 Võ Chí Công - Ba Đình - Hà Nội</Typography>
                <Typography fontSize={{ xs: '13px', md: '20px', whiteSpace: 'normal', wordBreak: 'break-word'}} color='text.secondary'>Hotline: 1900 8976</Typography>
              </Stack>
            </Box>
          </Grid>
          <Grid size={{ xs: 12, md: 8}} sx={{ borderBottom: '1px solid'}}>
            <Grid container>
              <Grid size={{ xs: 4}} sx={{ borderBottom: '1px solid', borderRight: '1px solid'}}>
                <RenderText data='About Tiffany'/>
                <RenderText data='Mission and History'/>
                <RenderText data='Collection Areas'/>
                <RenderText data='Conservation Departments'/>
                <RenderText data='Accessibility'/>
                <RenderText data='Press'/>
              </Grid>
              <Grid size={{ xs: 4}} sx={{ borderBottom: '1px solid', borderRight: '1px solid'}}>
                <RenderText data='Support'/>
                <RenderText data='Membership'/>
                <RenderText data='Host an Events'/>
                <RenderText data='Corporate Support'/>
              </Grid>
              <Grid size={{ xs: 4}} sx={{ borderBottom: '1px solid'}}>
                <RenderText data='Opportunities'/>
                <RenderText data='Careers'/>
                <RenderText data='Volunteer'/>
                <RenderText data='Fellowships'/>
                <RenderText data='Internship'/>
              </Grid>
              <Grid size={{ xs: 12, md: 4}} sx={{ borderRight: { xs: 'none', md: '1px solid'}, borderBottom: { xs: '1px solid', md: 'none'}}}>
                <Box py={{ xs: 2, md:4}} px={{ xs: 2, md: 5}} display='flex' flexDirection='column'>
                  <Typography ml={0.5} mb={1} fontWeight={600} fontSize={{ xs: '13px', md: '16px'}}>Follow us</Typography>
                  <Box px={1} display='flex' flexDirection='row'>
                    <IconButton
                      handleFunt={() => {}}
                      icon={<FaFacebookF size={20} color="#fff"/>}
                      backgroundColor="black"
                      // href="https://www.facebook.com/profile.php?id=61576721774771"
                      borderRadius='50%'
                      sx={{ mr: 1, mt: { xs: 0, md: 0.5}}}
                    />
                    <IconButton
                      handleFunt={() => {}}
                      icon={<FaInstagram size={20} color='#fff'/>}
                      backgroundColor="black"
                      borderRadius='50%'
                      sx={{ mr: 1, mt: { xs: 0, md: 0.5}}}
                    />
                    <IconButton
                      handleFunt={() => {}}
                      icon={<FaPinterestP size={20} color='#fff'/>}
                      backgroundColor="black"
                      borderRadius='50%'
                      sx={{ mr: 3, mt: { xs: 0, md: 0.5}}}
                    />
                    <Stack direction='row'>
                      <IconButton
                        handleFunt={() => {}}
                        icon={<FaYoutube size={100} color='#000'/>}
                        sx={{ mt: { xs: 0, md: 0.5}}}
                      />
                      <Typography pt={{ xs: 0.5, md: 0}} fontSize={{ xs: '20px', md: '30px'}} fontWeight={600}>YouTube</Typography>
                    </Stack>
                  </Box>
                </Box>
              </Grid>
              <Grid size={{ xs: 12, md: 8}}>
                <Box py={{ xs: 2, md:4}} px={{ xs: 2, md: 5}} display='flex' flexDirection='column'>
                  <Typography ml={0.5} mb={1} fontWeight={600} fontSize={{ xs: '13px', md: '16px'}}>Đóng góp ý kiến của bạn tại đây !</Typography>
                  <InputHeader/>
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Box px={{ xs: 2, md: 6}} py={2} display='flex' flexDirection={{ xs: 'column', md: 'row'}} justifyContent={{ xs: 'flex-start', md: 'space-between'}}>
          <Stack direction='row'>
            <Typography fontSize={{ xs: '14px', md: '18px'}} fontWeight={600}>Side Index</Typography>
            <Typography fontSize={{ xs: '14px', md: '18px'}} fontWeight={600}>Terms and Conditions</Typography>
            <Typography fontSize={{ xs: '14px', md: '18px'}} fontWeight={600}>Privacy Policy</Typography>
            <Typography fontSize={{ xs: '14px', md: '18px'}} fontWeight={600}>Contact Information</Typography>
          </Stack>
          <Typography fontSize={{ xs: '14px', md: '18px'}} mt={{ xs: 2, md: 0}} fontWeight={600}>© 2000 - 2025 The Metropolitan Museum of Art. All rights reserved.</Typography>
        </Box>
    </FooterRoot>
  );
};

const FooterRoot = styled('footer')(({ theme }) => ({
  display: 'flex',
  flexDirection:'column',
  // justifyContent: 'center',
  // alignItems: 'center',
  backgroundColor: 'white',
  color: 'black',
}));

export default Footer;
