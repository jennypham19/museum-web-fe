import { useState } from 'react';
import { Menu, MenuItem, Typography, Box, Divider } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { MenuProps } from '../Header';

interface HoverDropdownMenuProps{
    menu: MenuProps
    
}

const HoverDropdownMenu = ({ menu } : HoverDropdownMenuProps) => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const isActive = (path: string) => location.pathname === path;
  const styleMenu = (path: string) => ({
    fontWeight: 500,
    whiteSpace: 'nowrap',
    cursor: 'pointer',
    transition: 'border-bottom 0.3s',
    color: 'white',
    fontSize: '16px',
    borderBottom: isActive(path) ? '1px solid white' : 'none',
    '&:hover': { borderBottom: '1px solid white' },
  });

  return (
    <Box 
      sx={{
        display: 'flex',
        alignItems: 'center',
        px: 3,
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
        <Typography sx={styleMenu(menu.path)}>
          {menu.label}
        </Typography>
      )}

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
        PaperProps={{
          sx: {
            bgcolor: '#D30000',
            minWidth: anchorEl?.clientWidth || 'auto',
            mt: -1.6,
            borderRadius: 0
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
              sx={{ color: 'white', '&:hover': { fontWeight: 600}, fontSize: 14, px: 4 }}
            >
              {child.label}
            </MenuItem>
            {menu.children && menu.children.length - 1 > index && <Divider sx={{ border: 'solid 1.5px rgba(122, 119, 119, 0.5)'}}/> }
          </>
        ))}
      </Menu>
    </Box>
  );
};

export default HoverDropdownMenu;