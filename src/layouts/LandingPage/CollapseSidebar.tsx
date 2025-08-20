import { Close,} from "@mui/icons-material";
import { Avatar, Box,Drawer, IconButton, Stack, Typography } from "@mui/material";
import { createContext } from "react";
import logo_museum from "@/assets/images/users/logo.jpg"
import CommonImage from "@/components/Image/index";
import CollapseMenu from "./components/CollapseMenu";
import { MenuProps } from "./Header";
import HomeIcon from '@mui/icons-material/Home';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import EventIcon from '@mui/icons-material/Event';
import MuseumIcon from '@mui/icons-material/Museum';
import InfoIcon from '@mui/icons-material/Info';


export const CollapseContext = createContext<boolean | null>(null);
export const SidebarContext = createContext<boolean | null>(null);

interface CollapsedSideBarProps{
  collapsed: boolean;
  onToggleCollapsed: () => void;
}



const CollapsedSideBar = (props: CollapsedSideBarProps) => {
    const { collapsed, onToggleCollapsed} = props;

const MENU_DASHBOARD: MenuProps[] = [
    {
      id:1,
      label: 'Trang chủ',
      path: '/home',
      icon: HomeIcon
    },
    {
      id: 2,
      label: 'Thăm quan',
      path: '#',
      icon: TravelExploreIcon,
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
      icon: EventIcon,
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
      icon: MuseumIcon,
      children: [
        { label: 'Bộ sưu tập bảo tàng', path: '/museum-collection'},
      ]
    },
    {
      id: 5,
      label: 'Về chúng tôi',
      path: 'about-us',
      icon: InfoIcon
    }
  ]

    return (
        <Drawer anchor="left" open={collapsed} onClose={onToggleCollapsed}>
            <Box
                sx={{
                width: '75vw',
                height: '100vh',
                display: 'flex',
                flexDirection: 'column',
                }}
            >
                {/* Header */}
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'end',
                        px: 2,
                        py: 1.5,
                        borderBottom: '1px solid #eee',
                    }}
                >
                <IconButton onClick={onToggleCollapsed}>
                    <Close />
                </IconButton>
                </Box>
                <Box py={2} display='flex' flexDirection='row' justifyContent='center' borderBottom='1px solid #eee'>
                    <Typography mr={2} variant='subtitle2'>Mua vé</Typography>
                    <Typography variant='subtitle2'>Thẻ thành viên</Typography>
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexDirection: 'column',
                        px: 2,
                        py: 1.5,
                    }} 
                >
                    <Avatar src={logo_museum} alt="Logo" sx={{ height: 150, width: 150, bgcolor: 'grey.300', borderRadius: '50%', mb: 2 }} />
                    <Stack flexGrow={1} direction="column" spacing={3}>
                        {MENU_DASHBOARD.map((item, index) => {
                            const Icon = item.icon;
                            if(!Icon) return null;
                            return(
                                <CollapseMenu key={index} menu={item} icon={Icon} />
                            )
                        })}
                    </Stack>  
                </Box>
            </Box>
        </Drawer>
    )
}

export default CollapsedSideBar;