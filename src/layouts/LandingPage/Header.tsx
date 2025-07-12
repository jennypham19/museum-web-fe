import { Box,  Stack, Typography, useMediaQuery } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import { CSSObject, Theme, useTheme } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { DensityMedium } from '@mui/icons-material';
import CollapsedSideBar from './CollapseSidebar';
import HoverDropdownMenu from './components/HoverDropdownMenu';
import Grid from "@mui/material/Grid2";
import AlarmIcon from '@mui/icons-material/Alarm';
import LanguageIcon from '@mui/icons-material/Language';
import InputSearch from '@/components/SearchBar';

interface MenuChildProps{
  label: string,
  path?: string
}

export interface MenuProps{
  label: string, 
  path: string,
  children?: MenuChildProps[]
}

interface Props {
  collapsed: boolean;
  onToggleSidebar: () => void;
  onToggleCollapsed: () => void;
}

const Header = (props: Props) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState('');
    const handleSearch = (value: string) => {
        setSearchTerm(value.trim())
    }

  const handleToggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const mdUp = useMediaQuery(theme.breakpoints.up('md'));

  const isActive = (path: string) => location.pathname === path;


  const handleMenuClick = (path: string) => {
    navigate(path)
  }

  const styleMenu = (path: string) => ({
    fontWeight: 500,
    whiteSpace: 'nowrap',
    cursor: 'pointer',
    pb: 1,
    mt: 1,
    transition: 'border-bottom 0.3s',
    '&:hover':{
      bgcolor: '#000',
      with: '100%',
    },
    color: isActive(path) ? "#AC7D4F" : 'white',
    fontSize: '15px'
  });

  const MENU_DASHBOARD: MenuProps[] = [
    {
      label: 'Trang chủ',
      path: '/home',
      children: [
        { label: 'Trung tâm triển lãm', path: '/center-exhibition'},
        { label: 'Giới thiệu bảo tàng', path: '/introduce-museum'},
        { label: 'Bộ sưu tập nổi tiếng', path: '/outstanding-collection'},
        { label: 'Thông tin vé bán', path: '/information-ticket'},
        { label: 'Dịch vụ tiện ích', path: '/utility-service'},
      ]
    },
    {
      label: 'Triển lãm',
      path: '',
      children: [
        { label: 'Trung tâm triển lãm', path: '/center-exhibition'},
        { label: 'Lịch triển lãm', path: '/schedule-exhibition'},
      ]
    },
  ]

  if(mdUp){
    return(
      <AppBar
            position='fixed'
            sx={{
              color: 'common.white',
              backgroundColor: '#160E0D',
              height: 140,
              marginLeft: 'auto',
              zIndex: 9,
              width: '100%',
            }}
          >
              <Grid container>
                <Grid size={{ xs: 12, md: 8}} sx={{ borderRight: 'solid 1px white', borderBottom: 'solid 1px white'}}>
                  <Box py={1.5} px={2} display='flex' justifyContent='space-between'>
                    <Stack direction='row'>
                      <AlarmIcon/>
                      <Typography variant='subtitle2' sx={{ color: '#C1C1C1'}}> Bảo tàng mở cửa từ 08:00 AM - 20:00 PM</Typography>
                    </Stack>
                    <Typography variant='subtitle2' sx={{ color: '#C1C1C1'}}>62 Tôn Thất Thuyết - Nam Từ Liêm - Hà Nội</Typography>
                  </Box>
                </Grid>
                <Grid size={{ xs: 12, md: 3}} sx={{ borderRight: 'solid 1px white', borderBottom: 'solid 1px white'}}>
                    <InputSearch
                      initialValue={searchTerm}
                      placeholder='Tìm kiếm'
                      onSearch={handleSearch}
                    />
                </Grid>
                <Grid size={{ xs: 12, md: 1}} sx={{ borderBottom: 'solid 1px white'}}>
                  <Stack py={1.5} direction='row' justifyContent='center' alignItems='center'>
                    <LanguageIcon/>
                    <Typography variant='subtitle2' sx={{ color: '#C1C1C1'}}> Ngôn ngữ</Typography>
                  </Stack>
                </Grid>
              </Grid> 
            <Toolbar 
              disableGutters 
              sx={{ 
                display: 'flex', justifyContent: 'center', flexDirection: 'column', mt:1.5,
                alignItems: 'center', px: 4, // padding ngang để giới hạn chiều rộng
              }}>

              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10}}>
                <Stack flexGrow={1} direction="row" spacing={3}>
                  {MENU_DASHBOARD.map((item) => (
                    <HoverDropdownMenu key={item.label} menu={item} />
                  ))}
                </Stack>
                <Typography sx={styleMenu('/outstanding-collection')} onClick={() =>  handleMenuClick('/outstanding-collection')}>Sưu tập</Typography>
                <Typography sx={styleMenu('/introduce-museum')} onClick={() =>  handleMenuClick('/introduce-museum')}>Giới thiệu</Typography>

                <Typography fontFamily='Rozha One' variant='h3' fontWeight={700}>AMUSE</Typography>

                <Typography sx={styleMenu('/pages')} onClick={() =>  handleMenuClick('/pages')}>Pages</Typography>
                <Typography sx={styleMenu('/visit')} onClick={() =>  handleMenuClick('/visit')}>Visit</Typography>
                <Typography sx={styleMenu('/shop')} onClick={() =>  handleMenuClick('/shop')}>Shop</Typography>
                <Typography sx={styleMenu('/contact')} onClick={() =>  handleMenuClick('/contact')}>Liên hệ</Typography>

              </Box>
            </Toolbar>
          </AppBar>
    )
  }

  return (
    <AppBar
      position='fixed'
      sx={{
        color: 'common.black',
        backgroundColor: '#fff',
        height: '64px',
        borderBottom: 'thin solid #E6E8F0',
        marginLeft: 'auto',
        zIndex: 9,
        width: '100%',
        display:'flex',
        flexDirection:'row'
      }}
    >
      <IconButton
        onClick={handleToggleCollapsed}
        sx={{
          color: '#000',
          borderRadius: '4px',
          width: '36px',
          height: '36px',
          fontSize: '1rem',
          margin: 'auto 0px',
          // backgroundColor: '#f0f0f0',
        }}
      >
        <DensityMedium />
      </IconButton>
      <Toolbar 
        disableGutters 
        sx={{ 
          display: 'flex', justifyContent: 'center', alignItems: 'center', height: 64, px: 6, // padding ngang để giới hạn chiều rộng
          margin: 'auto'
        }}>
        <Typography fontFamily='Rozha One' variant='h3' fontWeight={700}>AMUSE</Typography>
      </Toolbar>
      <CollapsedSideBar
        collapsed={collapsed}
        onToggleCollapsed={handleToggleCollapsed}
      />
    </AppBar>
  );
};

export default Header;
