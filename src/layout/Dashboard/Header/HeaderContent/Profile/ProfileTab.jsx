import { useState } from 'react';

import { Icon } from '@iconify/react';
import {
  Badge,
  Box,
  Chip,
  Divider,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  alpha,
  useTheme
} from '@mui/material';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router';

const ProfileTab = ({ handleLogout }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [selectedIndex, setSelectedIndex] = useState(null);
  const isDark = theme.palette.mode === 'dark';

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
      route: '/profile',
      badge: false
    },
    {
      icon: 'solar:settings-minimalistic-bold-duotone',
      label: 'Account Settings',
      route: '/account-settings',
      badge: false
    },
    {
      icon: 'solar:document-bold-duotone',
      label: 'Activity Log',
      route: '/activity-log',
      badge: {
        content: 'New',
        color: 'success'
      }
    },
    {
      icon: 'solar:shield-keyhole-minimalistic-bold-duotone',
      label: 'Privacy Settings',
      route: '/privacy-settings',
      badge: false
    },
    {
      divider: true
    },
    {
      icon: 'solar:logout-3-bold-duotone',
      label: 'Logout',
      route: '/logout',
      badge: false,
      color: 'error'
    }
  ];

  return (
    <List
      component="nav"
      sx={{
        p: 1.5,
        '& .MuiListItemButton-root': {
          py: 1,
          px: 2,
          my: 0.5,
          borderRadius: 1.5,
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            bgcolor: isDark ? alpha(theme.palette.primary.main, 0.08) : alpha(theme.palette.primary.lighter, 0.4),
            transform: 'translateX(4px)'
          }
        }
      }}
    >
      {menuItems.map((item, index) =>
        item.divider ? (
          <Divider
            key={`divider-${index}`}
            sx={{
              my: 1.5,
              opacity: 0.6,
              borderColor: alpha(theme.palette.divider, 0.2)
            }}
          />
        ) : (
          <ListItemButton
            key={item.label}
            selected={selectedIndex === index}
            onClick={() => handleListItemClick(index, item.route)}
            sx={{
              position: 'relative',
              bgcolor:
                selectedIndex === index
                  ? isDark
                    ? alpha(theme.palette.primary.main, 0.12)
                    : alpha(theme.palette.primary.lighter, 0.5)
                  : 'transparent',
              '&::before':
                selectedIndex === index
                  ? {
                      content: '""',
                      position: 'absolute',
                      left: 0,
                      top: '50%',
                      transform: 'translateY(-50%)',
                      height: '60%',
                      width: 3,
                      borderRadius: '0 2px 2px 0',
                      bgcolor: item.color ? theme.palette[item.color].main : theme.palette.primary.main,
                      boxShadow: isDark
                        ? `0 0 5px ${alpha(item.color ? theme.palette[item.color].main : theme.palette.primary.main, 0.5)}`
                        : `0 0 8px ${alpha(item.color ? theme.palette[item.color].light : theme.palette.primary.light, 0.5)}`
                    }
                  : {}
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 36,
                color: item.color
                  ? theme.palette[item.color].main
                  : selectedIndex === index
                    ? theme.palette.primary.main
                    : theme.palette.text.primary,
                transition: 'all 0.2s ease-in-out'
              }}
            >
              <Icon icon={item.icon} width={22} height={22} />
            </ListItemIcon>
            <ListItemText
              primary={item.label}
              sx={{
                '& .MuiTypography-root': {
                  fontWeight: selectedIndex === index ? 600 : 400,
                  color: item.color
                    ? theme.palette[item.color].main
                    : selectedIndex === index
                      ? theme.palette.primary.main
                      : theme.palette.text.primary,
                  fontSize: '0.875rem',
                  transition: 'all 0.2s ease-in-out',
                  ...(selectedIndex === index &&
                    isDark &&
                    !item.color && {
                      background: `-webkit-linear-gradient(${theme.palette.primary.light}, ${alpha(theme.palette.primary.main, 0.9)})`,
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent'
                    })
                }
              }}
            />
            {item.badge && (
              <Chip
                label={item.badge.content}
                color={item.badge.color}
                variant="filled"
                size="small"
                sx={{
                  height: 20,
                  fontSize: '0.625rem',
                  fontWeight: 600,
                  borderRadius: 1,
                  ml: 1,
                  '& .MuiChip-label': { px: 0.75 }
                }}
              />
            )}
          </ListItemButton>
        )
      )}
    </List>
  );
};

ProfileTab.propTypes = {
  handleLogout: PropTypes.func
};

export default ProfileTab;
