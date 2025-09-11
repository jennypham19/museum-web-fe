import Box from '@mui/material/Box';
import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Footer from './Footer';
import Header from './Header';
import Sidebar from './Sidebar';
import { SidebarTitleContext } from '@/contexts/SidebarTitleContext'
import { useAppSelector } from '@/store';
import { IPermission } from '@/types/permisstion';
import { getRoleGroupToUser } from '@/services/permission-service';

const DashboardLayout = () => {
  const [openSidebar, setOpenSidebar] = useState<boolean>(false);
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const [title, setTitle] = useState('');

  const { profile } = useAppSelector((state) => state.auth);
  const [menuData, setMenuData] = useState<IPermission | null>(null);

  useEffect(() => {
    if(profile){
      const getRoleGroupAssignedUser = async(id: number) => {
        const res = await getRoleGroupToUser(id);
        const data = res.data as any as IPermission;
        const menuCodes = data?.permissions.map(el => el.code);
        localStorage.setItem('menuCodes', JSON.stringify(menuCodes));
        setMenuData(data)
      }
      getRoleGroupAssignedUser(profile?.id);      
    }
  }, [profile])

  const handleToggleSidebar = () => {
    setOpenSidebar(!openSidebar);
  };

  const handleToggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Box
      sx={{
        overflowY: 'auto',
        '&::-webkit-scrollbar': { width: '6px', height: '6px' },
        '&::-webkit-scrollbar-thumb': { bgcolor: 'rgba(0,0,0,0.2)', borderRadius: 1 },
        '&::-webkit-scrollbar-track': {
          backgroundColor: '#f1f1f1',
        },
      }}
    >
    <SidebarTitleContext.Provider value={{ title, setTitle }}>
    <Box 
      sx={{ 
        display: 'flex',
      }}
    >
      <Sidebar
        collapsed={collapsed}
        openSidebar={openSidebar}
        onCloseSidebar={handleToggleSidebar}
        onToggleCollapsed={handleToggleCollapsed}
        menuData={menuData ? menuData :  null}
      />
      <Box
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100svh',
          paddingTop: '64px',
          overflow: 'hidden',
        }}
      >
        <Header
          collapsed={collapsed}
          onToggleSidebar={handleToggleSidebar}
          onToggleCollapsed={handleToggleCollapsed}
        />

        <Box sx={{ flexGrow: 1 }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
    </SidebarTitleContext.Provider>
    </Box>
  );
};

export default DashboardLayout;
