import { Close,} from "@mui/icons-material";
import { Avatar, Box,Drawer, IconButton, Stack, Typography } from "@mui/material";
import { createContext } from "react";
import logo_museum from "@/assets/images/users/logo_1.png"
import CommonImage from "@/components/Image/index";
import CollapseMenu from "./components/CollapseMenu";
import { MenuProps } from "./Header";
import HomeIcon from '@mui/icons-material/Home';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import EventIcon from '@mui/icons-material/Event';
import MuseumIcon from '@mui/icons-material/Museum';
import InfoIcon from '@mui/icons-material/Info';
import LanguageSelect from "./components/LanguageSelect";
import { useTranslation } from "react-i18next";


export const CollapseContext = createContext<boolean | null>(null);
export const SidebarContext = createContext<boolean | null>(null);

interface CollapsedSideBarProps{
  collapsed: boolean;
  onToggleCollapsed: () => void;
}



const CollapsedSideBar = (props: CollapsedSideBarProps) => {
    const { collapsed, onToggleCollapsed} = props;
    const { t } = useTranslation('header')

const MENU_DASHBOARD: MenuProps[] = [
    {
      id:1,
      label: t('menu_home'),
      path: '/home',
      icon: HomeIcon
    },
    {
      id: 2,
      label: t('menu_visit'),
      path: '#',
      icon: TravelExploreIcon,
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
      icon: EventIcon,
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
      icon: MuseumIcon,
      children: [
        { label: t('menu_child_collection'), path: '/museum-collection'},
      ]
    },
    {
      id: 5,
      label: t('menu_about_us'),
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
                    <Typography sx={{ color: '#000', textDecoration: 'none'}} mr={2} component='a' href='/ticket-visit' variant='subtitle2'>Mua vé</Typography>
                    <Typography sx={{ color: '#000', textDecoration: 'none'}} component='a' href='/card-member' variant='subtitle2'>Thẻ thành viên</Typography>
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
                    <Avatar src={logo_museum} alt="Logo" sx={{ height: 150, width: 150, bgcolor: 'white', borderRadius: '50%', mb: 2 }} />
                    <Stack flexGrow={1} direction="column" spacing={3}>
                        {MENU_DASHBOARD.map((item, index) => {
                            const Icon = item.icon;
                            if(!Icon) return null;
                            return(
                                <CollapseMenu key={index} menu={item} icon={Icon} />
                            )
                        })}
                        <LanguageSelect from='collapse'/>
                    </Stack>  
                </Box>
            </Box>
        </Drawer>
    )
}

export default CollapsedSideBar;