import { useRef, useState } from 'react';

import { Icon } from '@iconify/react';
import {
  Avatar,
  Badge,
  Box,
  ClickAwayListener,
  Divider,
  IconButton,
  List,
  ListItemButton,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
  Paper,
  Popper,
  Stack,
  Typography,
  useMediaQuery
} from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';

// project import
import MainCard from 'components/MainCard';
import Transitions from 'components/@extended/Transitions';

// sample notification data
const notifications = [
  {
    id: '1',
    type: 'message',
    title: 'New Message',
    subtitle: 'John Smith sent you a message',
    time: '2 min ago',
    status: 'unread',
    avatar: null
  },
  {
    id: '2',
    type: 'update',
    title: 'System Update',
    subtitle: 'Your system is up to date',
    time: '1 hour ago',
    status: 'read',
    avatar: null
  },
  {
    id: '3',
    type: 'alert',
    title: 'Security Alert',
    subtitle: 'Suspicious login attempt blocked',
    time: 'Yesterday',
    status: 'unread',
    avatar: null
  },
  {
    id: '4',
    type: 'update',
    title: 'Update Available',
    subtitle: 'New features have been released',
    time: '3 days ago',
    status: 'read',
    avatar: null
  }
];

// notification types with icons
const notificationIcons = {
  message: <Icon icon="solar:chat-round-dots-bold-duotone" width={20} height={20} />,
  update: <Icon icon="solar:refresh-bold-duotone" width={20} height={20} />,
  alert: <Icon icon="solar:shield-warning-bold-duotone" width={20} height={20} />
};

// ==============================|| NOTIFICATION ||============================== //

const NotificationSection = () => {
  const theme = useTheme();
  const matchesXs = useMediaQuery(theme.breakpoints.down('md'));
  const isDark = theme.palette.mode === 'dark';

  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);

  // Count unread notifications
  const unreadCount = notifications.filter((item) => item.status === 'unread').length;

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  return (
    <>
      <Box sx={{ flexShrink: 0, ml: 0.75 }}>
        <IconButton
          color="secondary"
          sx={{
            color: theme.palette.text.primary,
            bgcolor: 'transparent',
            borderRadius: 1.5,
            width: 40,
            height: 40,
            transition: 'all 0.2s ease-in-out',
            '&:hover': {
              bgcolor: isDark ? alpha(theme.palette.primary.main, 0.15) : alpha(theme.palette.primary.lighter, 0.5)
            }
          }}
          ref={anchorRef}
          aria-haspopup="true"
          onClick={handleToggle}
          aria-controls={open ? 'notification-grow' : undefined}
        >
          <Badge
            badgeContent={unreadCount}
            color="error"
            max={9}
            sx={{
              '& .MuiBadge-badge': {
                fontSize: '0.65rem',
                height: 18,
                minWidth: 18,
                boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
              }
            }}
          >
            <Icon icon="solar:bell-bold-duotone" width={24} height={24} color={theme.palette.text.primary} />
          </Badge>
        </IconButton>
      </Box>

      <Popper
        placement={matchesXs ? 'bottom' : 'bottom-end'}
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
        popperOptions={{
          modifiers: [
            {
              name: 'offset',
              options: {
                offset: [matchesXs ? -5 : 0, 9]
              }
            }
          ]
        }}
        sx={{ zIndex: theme.zIndex.popup }}
      >
        {({ TransitionProps }) => (
          <Transitions type="fade" in={open} {...TransitionProps}>
            <Paper
              sx={{
                boxShadow: theme.customShadows.z1,
                borderRadius: theme.shape.borderRadius,
                border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                width: '100%',
                minWidth: 285,
                maxWidth: 420
              }}
            >
              <ClickAwayListener onClickAway={handleClose}>
                <MainCard
                  title="Notifications"
                  elevation={0}
                  border={false}
                  content={false}
                  secondary={
                    <Typography variant="subtitle2" color="primary" sx={{ cursor: 'pointer', fontWeight: 500 }}>
                      Mark all as read
                    </Typography>
                  }
                >
                  <List
                    component="nav"
                    sx={{
                      p: 0,
                      '& .MuiListItemButton-root': {
                        py: 1.5,
                        borderBottom: `1px solid ${theme.palette.divider}`,
                        '&:hover': {
                          bgcolor: isDark
                            ? alpha(theme.palette.primary.main, 0.08)
                            : alpha(theme.palette.primary.lighter, 0.4)
                        }
                      },
                      '& .MuiListItemButton-root.Mui-selected': {
                        bgcolor: isDark
                          ? alpha(theme.palette.primary.main, 0.1)
                          : alpha(theme.palette.primary.lighter, 0.6)
                      }
                    }}
                  >
                    {notifications.length > 0 ? (
                      <>
                        {notifications.map((item) => (
                          <ListItemButton
                            key={item.id}
                            sx={{
                              bgcolor:
                                item.status === 'unread'
                                  ? isDark
                                    ? alpha(theme.palette.primary.main, 0.08)
                                    : alpha(theme.palette.primary.lighter, 0.4)
                                  : 'transparent'
                            }}
                          >
                            <ListItemAvatar>
                              <Avatar
                                sx={{
                                  color: theme.palette.primary.main,
                                  bgcolor: isDark
                                    ? alpha(theme.palette.primary.main, 0.15)
                                    : alpha(theme.palette.primary.lighter, 0.7)
                                }}
                              >
                                {notificationIcons[item.type]}
                              </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                              primary={<Typography variant="subtitle1">{item.title}</Typography>}
                              secondary={
                                <Typography variant="body2" color="textSecondary">
                                  {item.subtitle}
                                </Typography>
                              }
                            />
                            <ListItemSecondaryAction>
                              <Typography variant="caption" color="textSecondary">
                                {item.time}
                              </Typography>
                            </ListItemSecondaryAction>
                          </ListItemButton>
                        ))}
                      </>
                    ) : (
                      <Box sx={{ p: 4, textAlign: 'center' }}>
                        <Typography variant="subtitle1" color="textSecondary">
                          No notifications
                        </Typography>
                      </Box>
                    )}
                  </List>

                  <Divider />
                  <Box sx={{ p: 1 }}>
                    <ListItemButton sx={{ borderRadius: 1, justifyContent: 'center' }}>
                      <Typography variant="subtitle1" color="primary">
                        View All
                      </Typography>
                    </ListItemButton>
                  </Box>
                </MainCard>
              </ClickAwayListener>
            </Paper>
          </Transitions>
        )}
      </Popper>
    </>
  );
};

export default NotificationSection;
