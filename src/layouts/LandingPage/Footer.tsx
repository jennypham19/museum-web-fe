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
import image_museum from "@/assets/images/users/logo_1.png";
import React from 'react';
import { useTranslation } from 'react-i18next';

interface TextProps{
  data: string
}

const Footer = () => {
  const navigate = useNavigate();
  const { t } = useTranslation('footer');

  const InputHeader = () => (
    <TextField
      placeholder={t('nav_search_footer')}
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
                <Typography ml={{ xs: 4, md: 15}} mt={{ xs: 3, md: 2}} fontWeight={600} fontSize={{ xs: '18px', md: '28px'}}>{t('nav_title_footer')}</Typography>
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
                sx={{ height: 100}}
              />
              <Stack pl={6} direction='column'>
                <Typography fontSize={{ xs: '16px', md: '24px', whiteSpace: 'normal', wordBreak: 'break-word'}} fontWeight={600}>{t('logo_name_footer.name_museum')}</Typography>
                <Typography fontSize={{ xs: '13px', md: '20px', whiteSpace: 'normal', wordBreak: 'break-word'}} color='text.secondary'>{t('logo_name_footer.address_museum')}</Typography>
                <Typography fontSize={{ xs: '13px', md: '20px', whiteSpace: 'normal', wordBreak: 'break-word'}} color='text.secondary'>Hotline: 1900 8976</Typography>
              </Stack>
            </Box>
          </Grid>
          <Grid size={{ xs: 12, md: 8}} sx={{ borderBottom: '1px solid'}}>
            <Grid container>
              <Grid size={{ xs: 4}} sx={{ borderBottom: '1px solid', borderRight: '1px solid'}}>
                <RenderText data={t('label_footer.about_the_art')}/>
                <RenderText data={t('label_footer.mission_and_history')}/>
                <RenderText data={t('label_footer.collection_areas')}/>
                <RenderText data={t('label_footer.conservation_departments')}/>
                <RenderText data={t('label_footer.accessibility')}/>
                <RenderText data={t('label_footer.press')}/>
              </Grid>
              <Grid size={{ xs: 4}} sx={{ borderBottom: '1px solid', borderRight: '1px solid'}}>
                <RenderText data={t('label_footer.support')}/>
                <RenderText data={t('label_footer.membership')}/>
                <RenderText data={t('label_footer.host_an_events')}/>
                <RenderText data={t('label_footer.corporate_support')}/>
              </Grid>
              <Grid size={{ xs: 4}} sx={{ borderBottom: '1px solid'}}>
                <RenderText data={t('label_footer.opportunities')}/>
                <RenderText data={t('label_footer.careers')}/>
                <RenderText data={t('label_footer.volunteer')}/>
                <RenderText data={t('label_footer.fellowships')}/>
                <RenderText data={t('label_footer.internship')}/>
              </Grid>
              <Grid size={{ xs: 12, md: 4}} sx={{ borderRight: { xs: 'none', md: '1px solid'}, borderBottom: { xs: '1px solid', md: 'none'}}}>
                <Box py={{ xs: 2, md:4}} px={{ xs: 2, md: 5}} display='flex' flexDirection='column'>
                  <Typography ml={0.5} mb={1} fontWeight={600} fontSize={{ xs: '13px', md: '16px'}}>{t('social_title_footer')}</Typography>
                  <Box px={1} display='flex' flexDirection={{ xs: 'row', md: 'column', lg: 'row'}}>
                    <Stack direction='row'>
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
                    </Stack>
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
                  <Typography ml={0.5} mb={1} fontWeight={600} fontSize={{ xs: '13px', md: '16px'}}>{t('feedback_footer')}</Typography>
                  <InputHeader/>
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Box px={{ xs: 2, md: 6}} py={2} display='flex' flexDirection={{ xs: 'column', md: 'row'}} justifyContent={{ xs: 'flex-start', md: 'space-between'}}>
          <Stack direction='row'>
            <Typography pr={2} fontSize={{ xs: '14px', md: '18px'}} fontWeight={600}>{t('label_last_footer.side_index')}</Typography>
            <Typography pr={2} fontSize={{ xs: '14px', md: '18px'}} fontWeight={600}>{t('label_last_footer.terms_and_conditions')}</Typography>
            <Typography pr={2} fontSize={{ xs: '14px', md: '18px'}} fontWeight={600}>{t('label_last_footer.privacy_policy')}</Typography>
            <Typography fontSize={{ xs: '14px', md: '18px'}} fontWeight={600}>{t('label_last_footer.contact_information')}</Typography>
          </Stack>
          <Typography fontSize={{ xs: '14px', md: '18px'}} mt={{ xs: 2, md: 0}} fontWeight={600}>{t('label_last_footer.label')}</Typography>
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
