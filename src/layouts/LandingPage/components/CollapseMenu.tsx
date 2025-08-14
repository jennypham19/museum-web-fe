import { useState } from 'react';
import { Menu, MenuItem, Typography, Box, Divider, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { MenuProps } from '../Header';
import { SvgIconComponent } from '@mui/icons-material';

interface CollapseMenuProps{
    menu: MenuProps,
    icon: SvgIconComponent
    
}

const CollapseMenu = ({ menu, icon: Icon } : CollapseMenuProps) => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const isActive = (menu: MenuProps) : boolean => {
    const currentPath = location.pathname;
    if(menu.id === 1){
      //Trang chủ: gạch chân nếu đang ở /home hoặc các trang mà điều hướng từ /home
      return currentPath.startsWith('/home');
    }
    if(menu.children){
      return menu.children.some(child => child.path && currentPath.startsWith(child.path))
    };

    return currentPath === menu.path
  };
  
  const styleMenu = (menu: MenuProps) => ({
    fontWeight: 500,
    whiteSpace: 'nowrap',
    cursor: 'pointer',
    transition: 'border-bottom 0.3s',
    color: 'black',
    fontSize: '16px',
    borderBottom: isActive(menu) ? '1px solid black' : 'none',
    '&:hover': { borderBottom: '1px solid black' },
  });

  return (
    <Box 
      sx={{
        display: 'flex',
        alignItems: 'center',
        py: 1,
        cursor: 'pointer',
        color: 'white',
        fontWeight: menu.children ? 'bold' : 'normal'
      }}
      onClick={(e) => {
        if (menu.path) navigate(menu.path);
        if (menu.children) {
          if (anchorEl !== e.currentTarget) {
            // Nếu click thằng cha khác -> set anchor mới
            setAnchorEl(e.currentTarget);
          } else {
            // Nếu click lại cùng thằng cha -> toggle đóng
            setAnchorEl(null);
          }
        }
      }}
    >
      {menu.path && (
        <Stack direction='row'>
            <Icon sx={{ color: 'black'}}/>
            <Typography sx={styleMenu(menu)}>
            {menu.label}
            </Typography>
        </Stack>
      )}

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
        PaperProps={{
          sx: {
            bgcolor: '#fff',
            minWidth: anchorEl?.clientWidth || 'auto',
            borderRadius: 2,
            boxShadow: "0px 4px 12px rgba(0,0,0,0.15)",
          }
        }}
        MenuListProps={{
          onMouseLeave: () => setAnchorEl(null)
        }}
      >
        {menu.children?.map((child, index) => (
          <>
            <MenuItem
              key={child.path}
              onClick={(e) => {
                e.stopPropagation();
                child.path && navigate(child.path);
                setAnchorEl(null);
              }}
              sx={{
                color: "black",
                fontSize: 15,
                px: 2,
                "&:hover": {
                  bgcolor: "#f5f5f5",
                  borderRadius: 1,
                },
              }}
            >
              {child.label}
            </MenuItem>
            {menu.children && menu.children.length - 1 > index && <hr /> }
          </>
        ))}
      </Menu>
    </Box>
  );
};

export default CollapseMenu;