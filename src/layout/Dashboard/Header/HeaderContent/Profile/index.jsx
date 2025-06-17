import { useRef, useState } from 'react';

import { Icon } from '@iconify/react';
import {
  Avatar,
  Box,
  ButtonBase,
  CardContent,
  ClickAwayListener,
  Divider,
  Grid2,
  Paper,
  Popper,
  Stack,
  Typography
} from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';
import PropTypes from 'prop-types';
import Swal from 'sweetalert2';

// project import
import MainCard from 'components/MainCard';
import Transitions from 'components/@extended/Transitions';
import useAuth from 'hooks/useAuth';

import ProfileTab from './ProfileTab';

const Profile = () => {
  const theme = useTheme();
  const { logout, user } = useAuth();
  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);
  const isDark = theme.palette.mode === 'dark';

  // Get display name based on available user info
  const getDisplayName = () => {
    if (user?.first_name || user?.last_name) {
      return `${user.first_name || ''} ${user.last_name || ''}`.trim();
    }
    return user?.username || 'Guest User';
  };

  // Get user role
  const getUserRole = () => {
    return user?.isAdmin === 1 ? 'Administrator' : 'User';
  };

  // Get user initials for avatar fallback
  const getInitials = () => {
    if (user?.first_name && user?.last_name) {
      return `${user.first_name[0]}${user.last_name[0]}`.toUpperCase();
    }
    return user?.username?.[0]?.toUpperCase() || 'U';
  };

  const handleLogout = async () => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'You will be logged out of your account',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: theme.palette.primary.main,
      cancelButtonColor: theme.palette.error.main,
      confirmButtonText: 'Yes, logout',
      cancelButtonText: 'Cancel'
    });

    if (result.isConfirmed) {
      try {
        await logout();
        Swal.fire({
          title: 'Logged Out!',
          text: 'You have been successfully logged out',
          icon: 'success',
          timer: 1500,
          showConfirmButton: false
        });
      } catch (error) {
        Swal.fire({
          title: 'Error!',
          text: 'Failed to logout. Please try again.',
          icon: 'error'
        });
      }
    }
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  // Generate gradient based on theme
  const getAvatarGradient = () => {
    if (isDark) {
      return `linear-gradient(135deg, ${alpha(theme.palette.primary.dark, 0.8)}, ${alpha(theme.palette.primary.main, 0.4)})`;
    }
    return `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.7)}, ${alpha(theme.palette.secondary.main, 0.4)})`;
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 0.75 }}>
      <ButtonBase
        sx={{
          p: 0.25,
          bgcolor: open ? alpha(theme.palette.primary.main, 0.12) : 'transparent',
          borderRadius: 1.5,
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            bgcolor: isDark ? alpha(theme.palette.primary.main, 0.18) : alpha(theme.palette.primary.lighter, 0.5),
            transform: 'translateY(-2px)'
          },
          ...(open && {
            '&::after': {
              content: '""',
              position: 'absolute',
              bottom: -10,
              left: '50%',
              transform: 'translateX(-50%) rotate(45deg)',
              width: 14,
              height: 14,
              bgcolor: isDark ? alpha(theme.palette.background.paper, 0.9) : theme.palette.background.paper,
              borderLeft: `1px solid ${alpha(theme.palette.divider, 0.08)}`,
              borderTop: `1px solid ${alpha(theme.palette.divider, 0.08)}`,
              zIndex: 1201
            }
          })
        }}
        aria-label="open profile"
        ref={anchorRef}
        aria-controls={open ? 'profile-grow' : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
      >
        <Stack direction="row" spacing={1.5} alignItems="center" sx={{ p: 0.5 }}>
          {user?.image ? (
            <Avatar
              src={user.image}
              sx={{
                width: 36,
                height: 36,
                background: getAvatarGradient(),
                color: '#fff',
                border: `2px solid ${alpha(theme.palette.primary.main, 0.2)}`,
                transition: 'all 0.25s ease-in-out',
                '&:hover': {
                  boxShadow: `0 0 10px ${alpha(theme.palette.primary.main, 0.4)}`,
                  transform: 'scale(1.05)'
                }
              }}
              aria-label="profile user"
            />
          ) : (
            <Avatar
              sx={{
                width: 36,
                height: 36,
                background: getAvatarGradient(),
                color: '#fff',
                border: `2px solid ${alpha(theme.palette.primary.main, 0.2)}`,
                transition: 'all 0.25s ease-in-out',
                '&:hover': {
                  boxShadow: `0 0 10px ${alpha(theme.palette.primary.main, 0.4)}`,
                  transform: 'scale(1.05)'
                }
              }}
              aria-label="profile user"
            >
              {getInitials()}
            </Avatar>
          )}
          <Typography
            variant="subtitle1"
            sx={{
              color: open ? theme.palette.primary.main : theme.palette.text.primary,
              fontWeight: open ? 600 : 500,
              transition: 'all 0.2s ease-in-out'
            }}
          >
            {getDisplayName()}
          </Typography>
          <Box
            sx={{
              color: theme.palette.text.secondary,
              transition: 'transform 0.3s ease-in-out',
              transform: open ? 'rotate(-180deg)' : 'rotate(0deg)'
            }}
          >
            <Icon icon="solar:alt-arrow-down-bold-duotone" width={16} height={16} />
          </Box>
        </Stack>
      </ButtonBase>

      <Popper
        placement="bottom-end"
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
                offset: [0, 14]
              }
            }
          ]
        }}
        sx={{ zIndex: theme.zIndex.popup }}
      >
        {({ TransitionProps }) => (
          <Transitions type="fade" in={open} {...TransitionProps} sx={{ transformOrigin: 'top right' }}>
            <Paper
              sx={{
                boxShadow: isDark ? '0 8px 24px rgba(0,0,0,0.2)' : '0 8px 24px rgba(0,0,0,0.1)',
                borderRadius: 2,
                border: `1px solid ${alpha(theme.palette.divider, 0.08)}`,
                background: isDark
                  ? `linear-gradient(${alpha(theme.palette.background.paper, 0.96)}, ${alpha(theme.palette.background.paper, 0.98)})`
                  : `linear-gradient(${alpha(theme.palette.background.paper, 0.98)}, ${alpha(theme.palette.background.paper, 1)})`,
                backdropFilter: 'blur(8px)',
                width: 290,
                overflow: 'hidden'
              }}
              elevation={0}
            >
              <ClickAwayListener onClickAway={handleClose}>
                <MainCard elevation={0} border={false} content={false} sx={{ p: 0 }}>
                  <CardContent>
                    <Grid2 container justifyContent="space-between" alignItems="center">
                      <Grid2>
                        <Stack direction="row" spacing={1.5} alignItems="center">
                          {user?.image ? (
                            <Avatar
                              src={user.image}
                              sx={{
                                width: 48,
                                height: 48,
                                background: getAvatarGradient(),
                                border: `3px solid ${theme.palette.background.paper}`,
                                boxShadow: `0 0 0 2px ${theme.palette.primary.main}, 0 4px 12px ${alpha(theme.palette.primary.main, 0.4)}`,
                                transition: 'all 0.3s ease-in-out'
                              }}
                            />
                          ) : (
                            <Avatar
                              sx={{
                                width: 48,
                                height: 48,
                                background: getAvatarGradient(),
                                border: `3px solid ${theme.palette.background.paper}`,
                                boxShadow: `0 0 0 2px ${theme.palette.primary.main}, 0 4px 12px ${alpha(theme.palette.primary.main, 0.4)}`,
                                color: '#fff',
                                transition: 'all 0.3s ease-in-out',
                                fontSize: '1.25rem',
                                fontWeight: 700
                              }}
                            >
                              {getInitials()}
                            </Avatar>
                          )}
                          <Stack>
                            <Typography
                              variant="h6"
                              sx={{
                                fontWeight: 600,
                                color: theme.palette.text.primary,
                                lineHeight: 1.2
                              }}
                            >
                              {getDisplayName()}
                            </Typography>
                            <Stack direction="row" spacing={0.5} alignItems="center">
                              <Icon
                                icon="solar:shield-user-bold-duotone"
                                width={14}
                                height={14}
                                color={isDark ? theme.palette.primary.light : theme.palette.primary.main}
                              />
                              <Typography
                                variant="caption"
                                sx={{
                                  color: isDark ? theme.palette.primary.light : theme.palette.primary.main,
                                  fontWeight: 500
                                }}
                              >
                                {getUserRole()}
                              </Typography>
                            </Stack>
                          </Stack>
                        </Stack>
                      </Grid2>
                    </Grid2>
                  </CardContent>

                  <Divider
                    sx={{
                      opacity: 0.7,
                      borderColor: alpha(theme.palette.divider, 0.2)
                    }}
                  />

                  <Box sx={{ p: 0 }}>
                    <ProfileTab handleLogout={handleLogout} />
                  </Box>
                </MainCard>
              </ClickAwayListener>
            </Paper>
          </Transitions>
        )}
      </Popper>
    </Box>
  );
};

export default Profile;
