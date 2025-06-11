import { useState } from 'react';

import { Icon } from '@iconify/react';
import { List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router';

const ProfileTab = ({ handleLogout }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleListItemClick = (index, route = '') => {
    setSelectedIndex(index);
    if (route && route !== '/logout') {
      navigate(route);
    } else if (route === '/logout') {
      handleLogout();
    }
  };

  const menuItems = [
    {
      icon: 'solar:user-id-bold-duotone',
      label: 'View Profile',
      route: '/profile'
    },
    {
      icon: 'solar:settings-minimalistic-bold-duotone',
      label: 'Account Settings',
      route: '/account-settings'
    },
    {
      icon: 'solar:logout-3-bold-duotone',
      label: 'Logout',
      route: '/logout'
    }
  ];

  return (
    <List
      component="nav"
      sx={{
        p: 0
      }}
    >
      {menuItems.map((item, index) => (
        <ListItemButton
          key={item.label}
          selected={selectedIndex === index}
          onClick={() => handleListItemClick(index, item.route)}
        >
          <ListItemIcon sx={{ minWidth: 32 }}>
            <Icon
              icon={item.icon}
              width={20}
              height={20}
              color={selectedIndex === index ? theme.palette.primary.main : theme.palette.text.primary}
            />
          </ListItemIcon>
          <ListItemText primary={item.label} />
        </ListItemButton>
      ))}
    </List>
  );
};

ProfileTab.propTypes = {
  handleLogout: PropTypes.func
};

export default ProfileTab;
