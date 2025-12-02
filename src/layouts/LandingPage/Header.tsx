import { Box,  MenuItem,  Select,  Stack, Typography, useMediaQuery } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import { useTheme } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import { useState } from 'react';
import { DensityMedium, SvgIconComponent } from '@mui/icons-material';
import CollapsedSideBar from './CollapseSidebar';
import HoverDropdownMenu from './components/HoverDropdownMenu';
import InputSearch from '@/components/SearchBar';
import CommonImage from '@/components/Image/index';
import logo_museum from "@/assets/images/users/logo.png"
import { useNavigate } from 'react-router-dom';
import i18n from '@/i18n';
import LanguageSelect from './components/LanguageSelect';
import { useTranslation } from 'react-i18next';

interface MenuChildProps{
  label: string,
  path?: string
}

export interface MenuProps{
  id: number,
  label: string, 
  path?: string,
  icon?: SvgIconComponent,
  children?: MenuChildProps[]
}

interface Props {
  collapsed: boolean;
  onToggleSidebar: () => void;
  onToggleCollapsed: () => void;
}


const Header = (props: Props) => {
  const { t } = useTranslation('header');
  const MENU_DASHBOARD: MenuProps[] = [
      {
        id:1,
        label: t('menu_home'),
        path: '/home'
      },
      {
        id: 2,
        label: t('menu_visit'),
        path: '#',
        children: [
          { label: t('menu_child_visit_plan'), path: '/visit-plan'},
          { label: t('menu_child_buy_tickets'), path: '/ticket-visit'},
          { label: t('menu_child_member'), path: '/card-member'},
          { label: t('menu_child_free_tours'), path: '/free-experience'},
          { label: t('menu_museum_map'), path: '/map-museum'},
        ]
      },
      {
        id: 3,
        label: t('menu_exhibitions_and_events'),
        path: '#',
        children: [
          { label: t('menu_child_exhibitions'), path: '/exhibition'},
          { label: t('menu_child_event_performances'), path: '/event-performance'},
          { label: t('menu_child_free_tours'), path: '/free-experience'},
        ]
      },
      {
        id: 4,
        label: t('menu_art'),
        path: '#',
        children: [
          { label: t('menu_child_collection'), path: '/museum-collection'},
        ]
      },
      {
        id: 5,
        label: t('menu_about_us'),
        path: '/about-us'
      }
  ]
  const navigate = useNavigate();
  const theme = useTheme();
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState('');
    const handleSearch = (value: string) => {
        setSearchTerm(value.trim())
    }

  const handleToggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const lgUp = useMediaQuery(theme.breakpoints.up('lg'));

  if(lgUp){
    return(
      <AppBar
            position='fixed'
            sx={{
              color: 'common.white',
              backgroundColor: '#D30000',
              height: 140,
              marginLeft: 'auto',
              zIndex: 9,
              width: '100%',
            }}
          >
              <Box py={2} display='flex' justifyContent='space-around'>
                <Box></Box>
                <Box display='flex' justifyContent='center' alignItems='center'>
                    <Box display='flex' flexDirection='row' px={2} borderRight='solid 1px white'>
                      <Typography sx={{ color: 'white', textDecoration: 'none'}} component='a' href='/ticket-visit' mr={2} variant='subtitle2'>{t('nav_ticket')}</Typography>
                      <Typography sx={{ color: 'white', textDecoration: 'none'}} component='a' href='/card-member' variant='subtitle2'>{t('nav_member')}</Typography>
                    </Box>
                    <Box px={2}>
                      <Typography variant='subtitle2'>{t('nav_donation')}</Typography>
                    </Box>
                </Box>
              </Box> 
            <Toolbar 
              disableGutters 
              sx={{ 
                display: 'flex', justifyContent: 'center', flexDirection: 'column', mt:1.5,
                alignItems: 'center', px: 4, // padding ngang để giới hạn chiều rộng,
              }}>

              <Box sx={{ display: 'flex', flexDirection: 'row', gap:40}}>
                <Box display='flex' flexDirection='row'>
                    <CommonImage
                      src={logo_museum}
                      alt="museum logo"
                      sx={{ height: 100, mb: 2.5, px: 1 }}
                      route='/home'
                    />
                  <Stack flexGrow={1} direction="row" spacing={3}>
                    {MENU_DASHBOARD.map((item) => (
                      <HoverDropdownMenu key={item.label} menu={item} />
                    ))}
                    <LanguageSelect/>
                  </Stack>                                    
                </Box>
                <Box margin='auto 0' sx={{ width: '100%'}}>
                  <InputSearch
                    initialValue={searchTerm}
                    placeholder={t('header_search')}
                    onSearch={handleSearch}
                    borderColor='#D30000'
                  />                  
                </Box>
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
        borderBottom: 'thin solid #E6E8F0',
        marginLeft: 'auto',
        zIndex: 9,
        width: '100%',
        display:'flex',
        flexDirection:'row',
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
          display: 'flex', justifyContent: 'center', alignItems: 'center', px: 6, // padding ngang để giới hạn chiều rộng
          margin: 'auto'
        }}>
        <Typography fontFamily='Rozha One' variant='h3' fontWeight={700}>ART GLASS</Typography>
      </Toolbar>
      <CollapsedSideBar
        collapsed={collapsed}
        onToggleCollapsed={handleToggleCollapsed}
      />
    </AppBar>
  );
};

export default Header;
