import { useLayoutEffect, useState } from 'react';

import { Box } from '@mui/material';
import { useLocation } from 'react-router';

import menuItems from 'menu-items';
import useAuth from 'hooks/useAuth';

import NavGroup from './NavGroup';

const Navigation = () => {
  const location = useLocation();
  const [selectedItems, setSelectedItems] = useState('');
  const [selectedLevel, setSelectedLevel] = useState(0);
  const { user } = useAuth();
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
        px: 0.15,
        py: 1.5,
        '& > .MuiList-root:not(:last-child)': {
          mb: 2
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
