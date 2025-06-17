import { useLayoutEffect, useState } from 'react';

import { Box, alpha, useTheme } from '@mui/material';
import { useLocation } from 'react-router';

import menuItems from 'menu-items';
import useAuth from 'hooks/useAuth';

import NavGroup from './NavGroup';

const Navigation = () => {
  const location = useLocation();
  const [selectedItems, setSelectedItems] = useState('');
  const [selectedLevel, setSelectedLevel] = useState(0);
  const { user } = useAuth();
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const currentRole = user?.isAdmin === 1 ? 'admin' : 'user';

  useLayoutEffect(() => {
    const currentPath = location.pathname;

    menuItems.items.forEach((item) => {
      if (item.type === 'group') {
        item.children?.forEach((menu) => {
          if (currentPath.includes(menu.url)) {
            setSelectedItems(menu.id);
            setSelectedLevel(1);
          }
        });
      }
    });
  }, [location]);

  // Filter menu items based on user role
  const filteredItems = menuItems.items
    .map((item) => {
      if (item.type === 'group' && item.children) {
        return {
          ...item,
          children: item.children.filter((child) => !child.roles || child.roles.includes(currentRole))
        };
      }
      return item;
    })
    .filter((item) => {
      if (item.type === 'group') {
        return item.children && item.children.length > 0;
      }
      return true;
    });

  return (
    <Box
      sx={{
        px: { xs: 1, md: 1.25 },
        py: { xs: 1.5, md: 2 },
        '& > .MuiList-root:not(:last-child)': {
          mb: 1.5
        },
        position: 'relative',
        '&:before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: '10%',
          right: '10%',
          height: '1px',
          background: isDark
            ? `linear-gradient(90deg, ${alpha(theme.palette.divider, 0)}, ${alpha(theme.palette.divider, 0.1)}, ${alpha(theme.palette.divider, 0)})`
            : `linear-gradient(90deg, ${alpha(theme.palette.divider, 0)}, ${alpha(theme.palette.divider, 0.15)}, ${alpha(theme.palette.divider, 0)})`
        }
      }}
    >
      {filteredItems.map((item) => (
        <NavGroup
          key={item.id}
          item={item}
          selectedItems={selectedItems}
          selectedLevel={selectedLevel}
          setSelectedItems={setSelectedItems}
          setSelectedLevel={setSelectedLevel}
        />
      ))}
    </Box>
  );
};

export default Navigation;
