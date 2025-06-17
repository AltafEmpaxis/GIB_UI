// material-ui
import { Icon } from '@iconify/react';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Chip,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Stack,
  Typography,
  useTheme,
  Skeleton,
  Fade,
  Button,
  alpha,
  Divider,
  Grid
} from '@mui/material';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

// project imports
import MainCard from 'components/MainCard';
import mockData from './dashbord-mockData.json';

const RecentReconActivity = ({ isLoading }) => {
  const theme = useTheme();

  // GIB Brand Colors
  const primaryGreen = theme.palette.mode === 'dark' ? theme.palette.success.dark : '#007B5F'; // GIB primary green
  const secondaryBlue = theme.palette.mode === 'dark' ? theme.palette.primary.dark : '#0F345E'; // GIB dark blue
  const accentYellow = theme.palette.mode === 'dark' ? theme.palette.warning.dark : '#F5A623'; // GIB accent yellow

  // Use mock data from JSON or fallback to hardcoded data
  const activities = mockData?.reconActivity || [
    {
      id: 1,
      task: 'Treasury Portfolio Reconciliation',
      time: '10 minutes ago',
      user: 'Abdullah Al-Qahtani',
      status: 'success',
      details: 'Sukuk & Fixed Income - 99.2% match rate'
    },
    {
      id: 2,
      task: 'Exception Report Generated',
      time: '45 minutes ago',
      user: 'Mohammed Al-Harbi',
      status: 'warning',
      details: 'Saudi Equity Fund - 12 exceptions identified'
    },
    {
      id: 3,
      task: 'Manual Reconciliation Required',
      time: '2 hours ago',
      user: 'Fatima Al-Sulaiman',
      status: 'error',
      details: 'GIB Shariah Compliant Fund - NAV discrepancy'
    },
    {
      id: 4,
      task: 'Daily Reconciliation Initiated',
      time: '4 hours ago',
      user: 'System',
      status: 'info',
      details: 'All Saudi Capital Market portfolios - automatic process'
    }
  ];

  // Activity metrics for the overview section
  const activityMetrics = [
    { label: 'Total Reconciliations', value: '24', icon: 'solar:checkmark-circle-bold-duotone', color: primaryGreen },
    { label: 'Exceptions', value: '12', icon: 'solar:danger-triangle-bold-duotone', color: accentYellow },
    { label: 'Success Rate', value: '94%', icon: 'solar:stars-bold-duotone', color: secondaryBlue }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'success':
        return {
          main: primaryGreen,
          lighter: alpha(primaryGreen, 0.1),
          border: alpha(primaryGreen, 0.2)
        };
      case 'warning':
        return {
          main: accentYellow,
          lighter: alpha(accentYellow, 0.1),
          border: alpha(accentYellow, 0.2)
        };
      case 'error':
        return {
          main: theme.palette.error.main,
          lighter: alpha(theme.palette.error.main, 0.1),
          border: alpha(theme.palette.error.main, 0.2)
        };
      case 'info':
      default:
        return {
          main: secondaryBlue,
          lighter: alpha(secondaryBlue, 0.1),
          border: alpha(secondaryBlue, 0.2)
        };
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'success':
        return 'solar:check-circle-bold-duotone';
      case 'warning':
        return 'solar:bell-bold-duotone';
      case 'error':
        return 'solar:danger-bold-duotone';
      case 'info':
      default:
        return 'solar:info-circle-bold-duotone';
    }
  };

  const listItemAnimation = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };

  if (isLoading) {
    return (
      <MainCard
        title={
          <Stack direction="row" alignItems="center" spacing={1}>
            <Icon icon="solar:settings-bold-duotone" width={24} style={{ color: primaryGreen }} />
            <Typography variant="h5">Overview, Recent Activity on Recon Tool</Typography>
          </Stack>
        }
        sx={{
          height: '100%',
          boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
          '& .MuiCardContent-root': { p: 0 }
        }}
      >
        <CardContent>
          <Box sx={{ p: 2 }}>
            <Skeleton variant="rectangular" height={80} sx={{ borderRadius: 2, mb: 2 }} />
          </Box>
          <Divider />
          <List sx={{ py: 0 }}>
            {[...Array(4)].map((_, index) => (
              <ListItem
                key={index}
                divider
                sx={{
                  py: 1.5,
                  px: 2,
                  borderColor: theme.palette.divider
                }}
              >
                <ListItemAvatar sx={{ minWidth: 45 }}>
                  <Skeleton variant="circular" width={36} height={36} />
                </ListItemAvatar>
                <ListItemText
                  primary={<Skeleton variant="text" width="60%" height={24} />}
                  secondary={
                    <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={1} mt={0.5}>
                      <Skeleton variant="text" width="40%" height={20} />
                      <Skeleton variant="rectangular" width={60} height={24} sx={{ borderRadius: 1 }} />
                    </Stack>
                  }
                />
              </ListItem>
            ))}
          </List>
        </CardContent>
      </MainCard>
    );
  }

  return (
    <MainCard
      title={
        <Stack direction="row" alignItems="center" spacing={1}>
          <Icon
            icon="solar:settings-bold-duotone"
            width={24}
            style={{ color: primaryGreen }}
            component={motion.div}
            animate={{
              rotate: [0, 10, 0, -10, 0]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              repeatType: 'loop'
            }}
          />
          <Typography variant="h5">Overview, Recent Activity on Recon Tool</Typography>
        </Stack>
      }
      secondary={
        <IconButton
          color="primary"
          size="small"
          component={motion.button}
          whileHover={{ rotate: 180, scale: 1.1 }}
          transition={{ duration: 0.3 }}
          sx={{
            bgcolor: alpha(primaryGreen, 0.1),
            '&:hover': { bgcolor: alpha(primaryGreen, 0.2) }
          }}
        >
          <Icon icon="solar:refresh-bold" width={20} height={20} style={{ color: primaryGreen }} />
        </IconButton>
      }
      sx={{
        height: '100%',
        boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
        '& .MuiCardContent-root': { p: 0 },
        '& .MuiCard-root': {
          overflow: 'hidden',
          transition: 'all 0.3s ease'
        },
        '&:hover': {
          boxShadow: '0 6px 18px rgba(0,0,0,0.12)'
        },
        borderRadius: 3,
        border: '1px solid',
        borderColor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(230,230,230,0.8)'
      }}
    >
      <CardContent>
        {/* Activity Overview Section */}
        <Box sx={{ p: 2 }}>
          <Grid container spacing={2}>
            {activityMetrics.map((metric, index) => (
              <Grid item xs={4} key={index}>
                <Card
                  component={motion.div}
                  whileHover={{ y: -5, boxShadow: '0 8px 16px rgba(0,0,0,0.1)' }}
                  transition={{ type: 'spring', stiffness: 300 }}
                  sx={{
                    p: 1.5,
                    borderRadius: 2,
                    boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                    bgcolor: alpha(metric.color, 0.08),
                    border: `1px solid ${alpha(metric.color, 0.2)}`
                  }}
                >
                  <Stack spacing={1} alignItems="center" direction="row">
                    <Avatar
                      sx={{
                        bgcolor: alpha(metric.color, 0.2),
                        color: metric.color,
                        width: 32,
                        height: 32
                      }}
                    >
                      <Icon icon={metric.icon} width={18} />
                    </Avatar>
                    <Box>
                      <Typography variant="h5" sx={{ fontWeight: 600, color: metric.color }}>
                        {metric.value}
                      </Typography>
                      <Typography variant="caption" color="textSecondary">
                        {metric.label}
                      </Typography>
                    </Box>
                  </Stack>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        <Divider />

        <List sx={{ py: 0 }}>
          {activities.map((activity, index) => {
            const statusColor = getStatusColor(activity.status);
            const iconName = getStatusIcon(activity.status);
            return (
              <Fade key={activity.id} in={!isLoading} style={{ transitionDelay: `${index * 150}ms` }}>
                <ListItem
                  component={motion.li}
                  variants={listItemAnimation}
                  initial="hidden"
                  animate="visible"
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  divider
                  sx={{
                    py: 1.5,
                    px: 2,
                    borderColor: theme.palette.divider,
                    '&:hover': {
                      bgcolor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.03)' : alpha(primaryGreen, 0.05)
                    },
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <ListItemAvatar sx={{ minWidth: 45 }}>
                    <Avatar
                      sx={{
                        color: statusColor.main,
                        bgcolor: statusColor.lighter,
                        width: 36,
                        height: 36,
                        border: `1px solid ${statusColor.border}`
                      }}
                      component={motion.div}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: 'spring', stiffness: 400 }}
                    >
                      <Icon icon={iconName} width={20} height={20} />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Stack direction="row" alignItems="center" justifyContent="space-between">
                        <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                          {activity.task}
                          <Typography component="span" variant="caption" sx={{ ml: 1, opacity: 0.7 }}>
                            • {activity.time}
                          </Typography>
                        </Typography>
                        <Chip
                          label={activity.user}
                          size="small"
                          sx={{
                            bgcolor: alpha(statusColor.main, 0.1),
                            color: statusColor.main,
                            borderRadius: '4px',
                            border: `1px solid ${statusColor.border}`,
                            fontWeight: 500,
                            '& .MuiChip-label': {
                              px: 1
                            }
                          }}
                        />
                      </Stack>
                    }
                    secondary={
                      <Typography variant="caption" color="textSecondary" sx={{ mt: 0.5, display: 'block' }}>
                        {activity.details}
                      </Typography>
                    }
                  />
                </ListItem>
              </Fade>
            );
          })}
        </List>
        <Box
          component={motion.div}
          whileHover={{ scale: 1.02 }}
          sx={{
            p: 2,
            display: 'flex',
            justifyContent: 'center',
            borderTop: `1px solid ${theme.palette.divider}`,
            background: alpha(primaryGreen, 0.03),
            transition: 'all 0.3s ease'
          }}
        >
          <Button
            variant="text"
            startIcon={<Icon icon="solar:list-bold-duotone" />}
            sx={{
              fontWeight: 500,
              color: primaryGreen,
              '&:hover': {
                background: alpha(primaryGreen, 0.1)
              }
            }}
          >
            View All Activity
          </Button>
        </Box>
      </CardContent>
    </MainCard>
  );
};

RecentReconActivity.propTypes = {
  isLoading: PropTypes.bool
};

export default RecentReconActivity;
