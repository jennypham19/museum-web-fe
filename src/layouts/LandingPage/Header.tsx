import { Box,  Stack, Typography, useMediaQuery } from '@mui/material';
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
import logo_museum from "@/assets/images/users/logo_museum.png"

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

const MENU_DASHBOARD: MenuProps[] = [
    {
      id:1,
      label: 'Trang chủ',
      path: '/home'
    },
    {
      id: 2,
      label: 'Thăm quan',
      path: '#',
      children: [
        { label: 'Kế hoạch thăm quan', path: '/visit-plan'},
        { label: 'Mua vé thăm quan', path: '/ticket-visit'},
        { label: 'Thẻ thành viên', path: '/card-member'},
        { label: 'Trải nghiệm miễn phí', path: '/free-experience'},
        { label: 'Bản đồ bảo tàng', path: '/map-museum'},
      ]
    },
    {
      id: 3,
      label: 'Triển lãm và sự kiện',
      path: '#',
      children: [
        { label: 'Triển lãm', path: '/exhibition'},
        { label: 'Sự kiện & biểu diễn', path: '/event-performance'},
        { label: 'Trải nghiệm miễn phí', path: '/free-experience'},
      ]
    },
    {
      id: 4,
      label: 'Nghệ thuật',
      path: '#',
      children: [
        { label: 'Bộ sưu tập bảo tàng', path: '/museum-collection'},
      ]
    },
    {
      id: 5,
      label: 'Về chúng tôi',
      path: 'about-us'
    }
  ]

const Header = (props: Props) => {
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
                      <Typography mr={2} variant='subtitle2'>Mua vé</Typography>
                      <Typography variant='subtitle2'>Thẻ thành viên</Typography>
                    </Box>
                    <Box px={2}>
                      <Typography variant='subtitle2'>Quyên góp cũ</Typography>
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
                      sx={{ height: 80, mb: 2.5, px: 2 }}
                    />
                  <Stack flexGrow={1} direction="row" spacing={3}>
                    {MENU_DASHBOARD.map((item) => (
                      <HoverDropdownMenu key={item.label} menu={item} />
                    ))}
                  </Stack>                                    
                </Box>
                <Box margin='auto 0' sx={{ width: '100%'}}>
                  <InputSearch
                    initialValue={searchTerm}
                    placeholder='Tìm kiếm'
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
