import { useState, useEffect } from 'react';
import {
  Grid,
  Container,
  Box,
  useTheme,
  useMediaQuery,
  alpha,
  Typography,
  Card,
  Tabs,
  Tab,
  IconButton,
  Stack,
  Paper,
  Divider,
  InputBase,
  Tooltip,
  Badge,
  Menu,
  MenuItem,
  Drawer,
  Button,
  Switch,
  FormControlLabel,
  Avatar,
  Fade,
  Chip,
  Zoom
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { Icon } from '@iconify/react';

// Project imports
import GIBDashboard from './GIBDashboard';
import RecentReconActivity from './RecentReconActivity';
import PortfolioSecuritiesActivity from './PortfolioSecuritiesActivity';
import CorporateActionActivity from './CorporateActionActivity';
import TradesActivity from './TradesActivity';

const Dashboard = () => {
  const theme = useTheme();
  const isExtraLargeScreen = useMediaQuery(theme.breakpoints.up('xl'));
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('lg'));
  const isMediumScreen = useMediaQuery(theme.breakpoints.up('md'));
  const [isLoading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState(0);
  const [activeSubTab, setActiveSubTab] = useState(0);
  const [searchValue, setSearchValue] = useState('');
  const [notificationsAnchor, setNotificationsAnchor] = useState(null);
  const [notificationDrawerOpen, setNotificationDrawerOpen] = useState(false);
  const [userMenuAnchor, setUserMenuAnchor] = useState(null);
  const [darkMode, setDarkMode] = useState(theme.palette.mode === 'dark');

  // GIB Brand Colors
  const primaryGreen = theme.palette.mode === 'dark' ? theme.palette.success.dark : '#007B5F'; // GIB primary green
  const secondaryBlue = theme.palette.mode === 'dark' ? theme.palette.primary.dark : '#0F345E'; // GIB dark blue
  const accentYellow = theme.palette.mode === 'dark' ? theme.palette.warning.dark : '#F5A623'; // GIB accent yellow

  // Quick action buttons
  const quickActions = [
    { icon: 'solar:upload-bold-duotone', label: 'Upload', color: primaryGreen },
    { icon: 'solar:download-bold-duotone', label: 'Reports', color: secondaryBlue },
    { icon: 'solar:settings-bold-duotone', label: 'Settings', color: accentYellow },
    { icon: 'solar:refresh-bold-duotone', label: 'Refresh', color: theme.palette.primary.main }
  ];

  // Activity tabs for the Dashboard Overview
  const activityTabs = [
    {
      label: 'Overview',
      icon: 'solar:widget-bold-duotone',
      color: primaryGreen
    },
    {
      label: 'Markets',
      icon: 'solar:chart-bold-duotone',
      color: secondaryBlue
    },
    {
      label: 'Activities',
      icon: 'solar:clock-circle-bold-duotone',
      color: accentYellow
    },
    {
      label: 'Analytics',
      icon: 'solar:chart-line-bold-duotone',
      color: theme.palette.info.main
    }
  ];

  // Sample notifications
  const notifications = [
    {
      id: 1,
      title: 'Portfolio Reconciled',
      description: 'Treasury Portfolio has been reconciled with 99.2% match rate',
      time: '10 minutes ago',
      type: 'success'
    },
    {
      id: 2,
      title: 'Exception Detected',
      description: 'Saudi Equity Fund has 12 new exceptions that require attention',
      time: '45 minutes ago',
      type: 'warning'
    },
    {
      id: 3,
      title: 'System Update',
      description: 'System maintenance scheduled for 10:00 PM today',
      time: '2 hours ago',
      type: 'info'
    }
  ];

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleSubTabChange = (event, newValue) => {
    setActiveSubTab(newValue);
  };

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  const handleNotificationsOpen = (event) => {
    setNotificationDrawerOpen(true);
  };

  const handleNotificationsClose = () => {
    setNotificationDrawerOpen(false);
  };

  const handleUserMenuOpen = (event) => {
    setUserMenuAnchor(event.currentTarget);
  };

  const handleUserMenuClose = () => {
    setUserMenuAnchor(null);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    // Note: In a real implementation, this would trigger theme change
    // through your theme context or state management
  };

  const containerVariant = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariant = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15
      }
    }
  };

  const tabContentVariant = {
    hidden: { opacity: 0, x: 20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3,
        ease: 'easeOut'
      }
    },
    exit: {
      opacity: 0,
      x: -20,
      transition: {
        duration: 0.2
      }
    }
  };

  return (
    <Container maxWidth={false} sx={{ height: '100%', overflow: 'hidden' }}>
      <Box sx={{ pt: 2, pb: 3, height: '100%' }}>
        <motion.div variants={containerVariant} initial="hidden" animate="visible">
          {/* Header with Tabs */}
          <Paper
            elevation={0}
            component={motion.div}
            variants={itemVariant}
            sx={{
              mb: 3,
              borderRadius: 3,
              boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
              overflow: 'hidden',
              border: '1px solid',
              borderColor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(230,230,230,0.8)'
            }}
          >
            <Box sx={{ p: { xs: 2, md: 3 } }}>
              <Stack
                direction={{ xs: 'column', sm: 'row' }}
                alignItems={{ xs: 'flex-start', sm: 'center' }}
                justifyContent="space-between"
                spacing={2}
                sx={{ mb: 2 }}
              >
                <Stack direction="row" alignItems="center" spacing={2}>
                  <Box
                    sx={{
                      p: 1,
                      px: 2,
                      borderRadius: 2,
                      bgcolor: alpha(primaryGreen, 0.08),
                      display: 'flex',
                      alignItems: 'center'
                    }}
                    component={motion.div}
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: 'spring', stiffness: 400 }}
                  >
                    <Typography
                      variant="h5"
                      sx={{
                        fontWeight: 700,
                        color: primaryGreen,
                        display: 'flex',
                        alignItems: 'center'
                      }}
                    >
                      <Icon icon="fluent-emoji:bank" style={{ marginRight: '8px', fontSize: '28px' }} />
                      GIB SmartOPS
                    </Typography>
                  </Box>

                  {/* Search Bar */}
                  {isMediumScreen && (
                    <Paper
                      component={motion.div}
                      whileHover={{ scale: 1.02 }}
                      sx={{
                        p: '2px 4px',
                        display: 'flex',
                        alignItems: 'center',
                        width: 280,
                        borderRadius: 10,
                        border: '1px solid',
                        borderColor: alpha(theme.palette.divider, 0.5),
                        bgcolor: alpha(theme.palette.background.paper, 0.5)
                      }}
                    >
                      <InputBase
                        sx={{ ml: 1, flex: 1 }}
                        placeholder="Search dashboard..."
                        value={searchValue}
                        onChange={handleSearchChange}
                      />
                      <IconButton sx={{ p: '10px', color: primaryGreen }}>
                        <Icon icon="solar:magnifer-linear" />
                      </IconButton>
                    </Paper>
                  )}
                </Stack>

                <Stack direction="row" spacing={1} alignItems="center">
                  {/* Quick Action Buttons */}
                  {isMediumScreen && (
                    <Stack direction="row" spacing={1} sx={{ mr: 2 }}>
                      {quickActions.map((action, index) => (
                        <Tooltip key={index} title={action.label}>
                          <IconButton
                            size="small"
                            sx={{
                              bgcolor: alpha(action.color, 0.08),
                              '&:hover': { bgcolor: alpha(action.color, 0.15) }
                            }}
                            component={motion.div}
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            transition={{ type: 'spring', stiffness: 400 }}
                          >
                            <Icon icon={action.icon} width={20} color={action.color} />
                          </IconButton>
                        </Tooltip>
                      ))}
                    </Stack>
                  )}

                  {/* Notification Button */}
                  <IconButton
                    size="small"
                    onClick={handleNotificationsOpen}
                    sx={{
                      bgcolor: alpha(primaryGreen, 0.08),
                      '&:hover': { bgcolor: alpha(primaryGreen, 0.15) }
                    }}
                    component={motion.div}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: 'spring', stiffness: 400 }}
                  >
                    <Badge
                      badgeContent={3}
                      color="error"
                      sx={{
                        '& .MuiBadge-badge': {
                          animation: 'pulse 2s infinite',
                          '@keyframes pulse': {
                            '0%': { transform: 'scale(0.95)' },
                            '70%': { transform: 'scale(1)' },
                            '100%': { transform: 'scale(0.95)' }
                          }
                        }
                      }}
                    >
                      <Icon icon="solar:bell-bold-duotone" width={22} color={primaryGreen} />
                    </Badge>
                  </IconButton>

                  {/* User Menu Button */}
                  <IconButton
                    size="small"
                    onClick={handleUserMenuOpen}
                    sx={{
                      bgcolor: alpha(secondaryBlue, 0.08),
                      '&:hover': { bgcolor: alpha(secondaryBlue, 0.15) }
                    }}
                    component={motion.div}
                    whileHover={{ scale: 1.1, rotate: -5 }}
                    transition={{ type: 'spring', stiffness: 400 }}
                  >
                    <Avatar
                      src="/assets/images/users/avatar-1.png"
                      sx={{
                        width: 24,
                        height: 24,
                        border: `2px solid ${alpha(primaryGreen, 0.3)}`
                      }}
                    />
                  </IconButton>
                </Stack>
              </Stack>

              <Divider sx={{ mb: 2 }} />

              <Tabs
                value={activeTab}
                onChange={handleTabChange}
                variant={isMediumScreen ? 'standard' : 'scrollable'}
                scrollButtons="auto"
                sx={{
                  '& .MuiTab-root': {
                    minWidth: 'auto',
                    fontWeight: 500,
                    mx: 1,
                    '&.Mui-selected': {
                      color: primaryGreen
                    },
                    borderRadius: 1,
                    transition: 'all 0.2s',
                    '&:hover': {
                      bgcolor: alpha(primaryGreen, 0.05)
                    }
                  },
                  '& .MuiTabs-indicator': {
                    backgroundColor: primaryGreen,
                    height: 3,
                    borderRadius: 1.5
                  }
                }}
              >
                <Tab
                  icon={<Icon icon="solar:widget-bold-duotone" width={20} />}
                  iconPosition="start"
                  label="Dashboard Overview"
                />
                <Tab
                  icon={<Icon icon="solar:clipboard-list-bold-duotone" width={20} />}
                  iconPosition="start"
                  label="Activities"
                />
              </Tabs>
            </Box>
          </Paper>

          {/* Dashboard Content based on active tab */}
          <AnimatePresence mode="wait">
            {activeTab === 0 && (
              <motion.div
                key="dashboard-tab"
                variants={tabContentVariant}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                {/* Dashboard Sub-Tabs */}
                <Paper
                  elevation={0}
                  sx={{
                    mb: 3,
                    p: 1,
                    borderRadius: 3,
                    overflow: 'hidden',
                    border: '1px solid',
                    borderColor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(230,230,230,0.8)'
                  }}
                >
                  <Tabs
                    value={activeSubTab}
                    onChange={handleSubTabChange}
                    variant={isMediumScreen ? 'fullWidth' : 'scrollable'}
                    scrollButtons="auto"
                    aria-label="dashboard sub-tabs"
                    sx={{
                      minHeight: 48,
                      '& .MuiTab-root': {
                        minHeight: 48,
                        fontWeight: 500,
                        '&.Mui-selected': {
                          color: activityTabs[activeSubTab].color
                        }
                      },
                      '& .MuiTabs-indicator': {
                        backgroundColor: activityTabs[activeSubTab].color,
                        height: 3,
                        borderRadius: 1.5
                      }
                    }}
                  >
                    {activityTabs.map((tab, index) => (
                      <Tab
                        key={index}
                        icon={<Icon icon={tab.icon} width={18} />}
                        iconPosition="start"
                        label={tab.label}
                        sx={{
                          minHeight: 48,
                          '&.Mui-selected .MuiIcon-root': {
                            color: tab.color
                          }
                        }}
                      />
                    ))}
                  </Tabs>
                </Paper>

                <Box
                  sx={{
                    height: isLargeScreen ? 'calc(100vh - 250px)' : 'auto',
                    overflow: 'auto',
                    pb: 2
                  }}
                >
                  <AnimatePresence mode="wait">
                    {activeSubTab === 0 && (
                      <motion.div
                        key="overview-tab"
                        variants={tabContentVariant}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                      >
                        <GIBDashboard />
                      </motion.div>
                    )}

                    {activeSubTab === 1 && (
                      <motion.div
                        key="market-tab"
                        variants={tabContentVariant}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                      >
                        <Box sx={{ mb: 3 }}>
                          <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
                            Market Analysis
                          </Typography>
                          <Grid container spacing={3}>
                            <Grid item xs={12} lg={12}>
                              <motion.div variants={itemVariant}>
                                <Card
                                  sx={{
                                    borderRadius: 3,
                                    boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                                    overflow: 'hidden'
                                  }}
                                >
                                  <GIBDashboard />
                                </Card>
                              </motion.div>
                            </Grid>
                          </Grid>
                        </Box>
                      </motion.div>
                    )}

                    {activeSubTab === 2 && (
                      <motion.div
                        key="activities-tab"
                        variants={tabContentVariant}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                      >
                        <Grid container spacing={3}>
                          <Grid item xs={12} md={6}>
                            <motion.div variants={itemVariant}>
                              <RecentReconActivity isLoading={isLoading} />
                            </motion.div>
                          </Grid>
                          <Grid item xs={12} md={6}>
                            <motion.div variants={itemVariant}>
                              <PortfolioSecuritiesActivity isLoading={isLoading} />
                            </motion.div>
                          </Grid>
                          <Grid item xs={12} md={6}>
                            <motion.div variants={itemVariant}>
                              <CorporateActionActivity isLoading={isLoading} />
                            </motion.div>
                          </Grid>
                          <Grid item xs={12} md={6}>
                            <motion.div variants={itemVariant}>
                              <TradesActivity isLoading={isLoading} />
                            </motion.div>
                          </Grid>
                        </Grid>
                      </motion.div>
                    )}

                    {activeSubTab === 3 && (
                      <motion.div
                        key="analytics-tab"
                        variants={tabContentVariant}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                      >
                        <Box sx={{ mb: 3 }}>
                          <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
                            Performance Analytics
                          </Typography>
                          <Grid container spacing={3}>
                            <Grid item xs={12} lg={12}>
                              <motion.div variants={itemVariant}>
                                <GIBDashboard />
                              </motion.div>
                            </Grid>
                          </Grid>
                        </Box>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Box>
              </motion.div>
            )}

            {/* Activities Content based on active tab */}
            {activeTab === 1 && (
              <motion.div
                key="activities-tab"
                variants={tabContentVariant}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <motion.div variants={itemVariant}>
                      <RecentReconActivity isLoading={isLoading} />
                    </motion.div>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <motion.div variants={itemVariant}>
                      <PortfolioSecuritiesActivity isLoading={isLoading} />
                    </motion.div>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <motion.div variants={itemVariant}>
                      <CorporateActionActivity isLoading={isLoading} />
                    </motion.div>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <motion.div variants={itemVariant}>
                      <TradesActivity isLoading={isLoading} />
                    </motion.div>
                  </Grid>
                </Grid>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </Box>

      {/* Notification Drawer */}
      <Drawer
        anchor="right"
        open={notificationDrawerOpen}
        onClose={handleNotificationsClose}
        sx={{
          '& .MuiDrawer-paper': {
            width: { xs: '100%', sm: 380 },
            boxSizing: 'border-box',
            borderRadius: { xs: 0, sm: '16px 0 0 16px' },
            border: 'none',
            boxShadow: '0 8px 24px rgba(0,0,0,0.15)'
          }
        }}
      >
        <Box sx={{ p: 2 }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Notifications
            </Typography>
            <IconButton onClick={handleNotificationsClose}>
              <Icon icon="solar:close-circle-bold" />
            </IconButton>
          </Stack>
          <Divider sx={{ mb: 2 }} />

          <Box>
            {notifications.map((notification, index) => (
              <Fade in key={notification.id} style={{ transitionDelay: `${index * 100}ms` }}>
                <Card
                  sx={{
                    mb: 2,
                    borderRadius: 2,
                    p: 2,
                    border: '1px solid',
                    borderColor: theme.palette.divider,
                    boxShadow: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                      transform: 'translateY(-3px)'
                    }
                  }}
                >
                  <Stack direction="row" spacing={2} alignItems="flex-start">
                    <Avatar
                      sx={{
                        bgcolor: alpha(
                          notification.type === 'success'
                            ? primaryGreen
                            : notification.type === 'warning'
                              ? accentYellow
                              : secondaryBlue,
                          0.1
                        ),
                        color:
                          notification.type === 'success'
                            ? primaryGreen
                            : notification.type === 'warning'
                              ? accentYellow
                              : secondaryBlue
                      }}
                    >
                      <Icon
                        icon={
                          notification.type === 'success'
                            ? 'solar:check-circle-bold-duotone'
                            : notification.type === 'warning'
                              ? 'solar:bell-bold-duotone'
                              : 'solar:info-circle-bold-duotone'
                        }
                        width={20}
                      />
                    </Avatar>
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="subtitle2">{notification.title}</Typography>
                      <Typography variant="body2" color="textSecondary" sx={{ mt: 0.5 }}>
                        {notification.description}
                      </Typography>
                      <Typography variant="caption" color="textSecondary" sx={{ mt: 1, display: 'block' }}>
                        {notification.time}
                      </Typography>
                    </Box>
                  </Stack>
                </Card>
              </Fade>
            ))}
          </Box>

          <Button
            fullWidth
            variant="contained"
            color="primary"
            sx={{
              mt: 2,
              bgcolor: primaryGreen,
              '&:hover': {
                bgcolor: alpha(primaryGreen, 0.8)
              }
            }}
          >
            View All Notifications
          </Button>
        </Box>
      </Drawer>

      {/* User Menu */}
      <Menu
        anchorEl={userMenuAnchor}
        open={Boolean(userMenuAnchor)}
        onClose={handleUserMenuClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.15))',
            mt: 1.5,
            borderRadius: 2,
            minWidth: 240,
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: theme.palette.background.paper,
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0
            }
          }
        }}
      >
        <Box sx={{ p: 2, pb: 1.5 }}>
          <Stack direction="row" spacing={2} alignItems="center">
            <Avatar
              src="/assets/images/users/avatar-1.png"
              sx={{
                width: 40,
                height: 40,
                border: `2px solid ${alpha(primaryGreen, 0.3)}`
              }}
            />
            <Box>
              <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                James Edward
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Administrator
              </Typography>
            </Box>
          </Stack>
        </Box>
        <Divider />
        <MenuItem onClick={handleUserMenuClose}>
          <Icon icon="solar:user-bold-duotone" width={18} style={{ marginRight: 8, color: secondaryBlue }} />
          My Profile
        </MenuItem>
        <MenuItem onClick={handleUserMenuClose}>
          <Icon icon="solar:settings-bold-duotone" width={18} style={{ marginRight: 8, color: secondaryBlue }} />
          Settings
        </MenuItem>
        <MenuItem>
          <FormControlLabel
            control={<Switch checked={darkMode} onChange={toggleDarkMode} size="small" />}
            label="Dark Mode"
          />
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleUserMenuClose}>
          <Icon
            icon="solar:logout-bold-duotone"
            width={18}
            style={{ marginRight: 8, color: theme.palette.error.main }}
          />
          Logout
        </MenuItem>
      </Menu>
    </Container>
  );
};

export default Dashboard;
