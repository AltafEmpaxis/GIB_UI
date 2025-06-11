import { useRef, useState } from 'react';

import { Icon } from '@iconify/react';
import {
  Avatar,
  Box,
  ButtonBase,
  CardContent,
  ClickAwayListener,
  Fade,
  Grid2,
  Paper,
  Popper,
  Stack,
  Tab,
  Tabs,
  Typography
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import PropTypes from 'prop-types';
import Swal from 'sweetalert2';

// project import
import MainCard from 'components/MainCard';
import useAuth from 'hooks/useAuth';

import ProfileTab from './ProfileTab';

function TabPanel({ children, value, index, ...other }) {
  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      id={`profile-tabpanel-${index}`}
      aria-labelledby={`profile-tab-${index}`}
      {...other}
    >
      {value === index && children}
    </Box>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};

function a11yProps(index) {
  return {
    id: `profile-tab-${index}`,
    'aria-controls': `profile-tabpanel-${index}`
  };
}

const Profile = () => {
  const theme = useTheme();
  const { logout, user } = useAuth();
  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(0);
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

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 0.75 }}>
      <ButtonBase
        sx={{
          p: 0.25,
          bgcolor: open ? theme.palette.action.hover : 'transparent',
          borderRadius: 1,
          '&:hover': {
            bgcolor: theme.palette.action.hover
          }
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
                ...theme.typography.mediumAvatar,
                bgcolor: isDark ? 'dark.800' : 'primary.light',
                color: isDark ? 'primary.main' : 'primary.dark'
              }}
              aria-label="profile user"
            />
          ) : (
            <Avatar
              sx={{
                ...theme.typography.mediumAvatar,
                bgcolor: isDark ? 'dark.800' : 'primary.light',
                color: isDark ? 'primary.main' : 'primary.dark'
              }}
              aria-label="profile user"
            >
              {getInitials()}
            </Avatar>
          )}
          <Typography variant="subtitle1" color="textPrimary">
            {getDisplayName()}
          </Typography>
        </Stack>
      </ButtonBase>

      <Popper
        placement="bottom-end"
        open={open}
        anchorEl={anchorRef.current}
        transition
        disablePortal
        sx={{ zIndex: theme.zIndex.popup }}
      >
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Paper
              sx={{
                boxShadow: theme.customShadows.z1,
                mt: 1.5,
                borderRadius: theme.shape.borderRadius,
                border: `1px solid ${theme.palette.divider}`
              }}
            >
              <ClickAwayListener onClickAway={handleClose}>
                <MainCard
                  elevation={0}
                  border={false}
                  content={false}
                  sx={{
                    bgcolor: theme.palette.background.paper,
                    border: `1px solid ${theme.palette.divider}`,
                    p: 0
                  }}
                >
                  <CardContent sx={{ px: 2.5, pt: 3 }}>
                    <Grid2 container justifyContent="space-between" alignItems="center">
                      <Grid2>
                        <Stack direction="row" spacing={1.25} alignItems="center">
                          {user?.image ? (
                            <Avatar
                              src={user.image}
                              sx={{
                                width: 36,
                                height: 36,
                                border: `2px solid ${theme.palette.primary.main}`
                              }}
                            />
                          ) : (
                            <Avatar
                              sx={{
                                width: 36,
                                height: 36,
                                border: `2px solid ${theme.palette.primary.main}`,
                                bgcolor: isDark ? 'dark.800' : 'primary.light',
                                color: isDark ? 'primary.main' : 'primary.dark'
                              }}
                            >
                              {getInitials()}
                            </Avatar>
                          )}
                          <Stack>
                            <Typography variant="subtitle1">{getDisplayName()}</Typography>
                            <Typography variant="body2" color="textSecondary">
                              {getUserRole()}
                            </Typography>
                          </Stack>
                        </Stack>
                      </Grid2>
                    </Grid2>
                  </CardContent>

                  <Box sx={{ borderBottom: 1, borderColor: 'divider', mt: 1 }}>
                    <Tabs variant="fullWidth" value={value} onChange={handleChange} aria-label="profile tabs">
                      <Tab
                        sx={{
                          display: 'flex',
                          flexDirection: 'row',
                          justifyContent: 'center',
                          alignItems: 'center',
                          textTransform: 'capitalize',
                          minHeight: 48
                        }}
                        icon={
                          <Icon
                            icon="solar:user-bold-duotone"
                            width={24}
                            height={24}
                            style={{ marginBottom: 0, marginRight: 8 }}
                          />
                        }
                        label="Profile"
                        {...a11yProps(0)}
                      />
                      {/* <Tab
                        sx={{
                          display: 'flex',
                          flexDirection: 'row',
                          justifyContent: 'center',
                          alignItems: 'center',
                          textTransform: 'capitalize',
                          minHeight: 48
                        }}
                        icon={
                          <Icon
                            icon="solar:settings-bold-duotone"
                            width={24}
                            height={24}
                            style={{ marginBottom: 0, marginRight: 8 }}
                          />
                        }
                        label="Setting"
                        {...a11yProps(1)}
                      /> */}
                    </Tabs>
                  </Box>

                  <Box sx={{ p: 0 }}>
                    <TabPanel value={value} index={0} dir={theme.direction}>
                      <ProfileTab handleLogout={handleLogout} />
                    </TabPanel>
                    {/* <TabPanel value={value} index={1} dir={theme.direction}>
                      <SettingTab />
                    </TabPanel> */}
                  </Box>
                </MainCard>
              </ClickAwayListener>
            </Paper>
          </Fade>
        )}
      </Popper>
    </Box>
  );
};

export default Profile;
