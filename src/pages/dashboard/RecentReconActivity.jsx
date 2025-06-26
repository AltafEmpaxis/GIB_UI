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
  Grid,
  Tooltip
} from '@mui/material';
import PropTypes from 'prop-types';

// project imports
import MainCard from 'components/MainCard';
import mockData from './dashbord-mockData.json';

const RecentReconActivity = ({ isLoading }) => {
  const theme = useTheme();

  // Theme-based colors instead of hardcoded values
  const primaryColor = theme.palette.primary.main;
  const successColor = theme.palette.success.main;
  const warningColor = theme.palette.warning.main;
  const errorColor = theme.palette.error.main;
  const infoColor = theme.palette.info.main;

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
    {
      label: 'Total Reconciliations',
      value: '24',
      icon: 'solar:checkmark-circle-bold-duotone',
      color: successColor,
      trend: '+8%',
      trendUp: true
    },
    {
      label: 'Exceptions',
      value: '12',
      icon: 'solar:danger-triangle-bold-duotone',
      color: warningColor,
      trend: '-3%',
      trendUp: false
    },
    {
      label: 'Success Rate',
      value: '94%',
      icon: 'solar:stars-bold-duotone',
      color: primaryColor,
      trend: '+2%',
      trendUp: true
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'success':
        return {
          main: successColor,
          lighter: alpha(successColor, 0.1),
          border: alpha(successColor, 0.2)
        };
      case 'warning':
        return {
          main: warningColor,
          lighter: alpha(warningColor, 0.1),
          border: alpha(warningColor, 0.2)
        };
      case 'error':
        return {
          main: errorColor,
          lighter: alpha(errorColor, 0.1),
          border: alpha(errorColor, 0.2)
        };
      case 'info':
      default:
        return {
          main: infoColor,
          lighter: alpha(infoColor, 0.1),
          border: alpha(infoColor, 0.2)
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

  if (isLoading) {
    return (
      <MainCard
        title={
          <Stack direction="row" alignItems="center" spacing={1}>
            <Icon icon="solar:settings-bold-duotone" width={24} style={{ color: primaryColor }} />
            <Typography variant="h5">Reconciliation Activity</Typography>
          </Stack>
        }
        sx={{
          height: '100%',
          boxShadow: theme.customShadows ? theme.customShadows.z1 : '0 4px 12px rgba(0,0,0,0.05)',
          '& .MuiCardContent-root': { p: 0 },
          borderRadius: 3
        }}
      >
        <CardContent>
          <Box sx={{ p: 2 }}>
            <Skeleton variant="rectangular" height={110} sx={{ borderRadius: 2, mb: 2 }} />
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
          <Avatar
            variant="rounded"
            sx={{
              width: 32,
              height: 32,
              background: `linear-gradient(135deg, ${alpha(primaryColor, 0.16)} 0%, ${alpha(primaryColor, 0.24)} 100%)`,
              color: primaryColor
            }}
          >
            <Icon icon="solar:settings-bold-duotone" width={20} />
          </Avatar>
          <Typography variant="h5">Reconciliation Activity</Typography>
        </Stack>
      }
      secondary={
        <Tooltip title="Refresh activity data">
          <IconButton
            color="primary"
            size="small"
            sx={{
              bgcolor: alpha(primaryColor, 0.1),
              '&:hover': { bgcolor: alpha(primaryColor, 0.16) },
              border: `1px solid ${alpha(primaryColor, 0.2)}`,
              backdropFilter: 'blur(4px)'
            }}
          >
            <Icon icon="solar:refresh-bold" width={18} height={18} />
          </IconButton>
        </Tooltip>
      }
      sx={{
        height: '100%',
        boxShadow: theme.customShadows ? theme.customShadows.z1 : '0 4px 16px rgba(0,0,0,0.08)',
        '& .MuiCardContent-root': { p: 0 },
        borderRadius: 3,
        border: '1px solid',
        borderColor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(230,230,230,0.8)',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: -24,
          right: -24,
          width: 150,
          height: 150,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${alpha(primaryColor, 0.1)} 0%, rgba(0,0,0,0) 70%)`,
          zIndex: 0
        }}
      />

      <CardContent>
        {/* Activity Overview Section */}
        <Box sx={{ p: 2 }}>
          <Grid container spacing={2}>
            {activityMetrics.map((metric, index) => (
              <Grid item xs={4} key={index}>
                <Card
                  sx={{
                    p: 1.5,
                    borderRadius: 2,
                    boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                    bgcolor: alpha(metric.color, 0.06),
                    border: `1px solid ${alpha(metric.color, 0.2)}`,
                    transition: 'all 0.2s ease-in-out',
                    '&:hover': {
                      boxShadow: `0 4px 12px ${alpha(metric.color, 0.2)}`,
                      transform: 'translateY(-2px)'
                    }
                  }}
                >
                  <Stack spacing={1} alignItems="center" direction="row">
                    <Avatar
                      sx={{
                        bgcolor: alpha(metric.color, 0.15),
                        color: metric.color,
                        width: 36,
                        height: 36,
                        borderRadius: 1.5
                      }}
                    >
                      <Icon icon={metric.icon} width={18} />
                    </Avatar>
                    <Box>
                      <Stack direction="row" alignItems="center" spacing={0.75}>
                        <Typography variant="h5" sx={{ fontWeight: 700, color: theme.palette.text.primary }}>
                          {metric.value}
                        </Typography>
                        <Chip
                          label={metric.trend}
                          size="small"
                          sx={{
                            height: 20,
                            fontSize: '0.625rem',
                            fontWeight: 600,
                            bgcolor: metric.trendUp ? alpha(successColor, 0.12) : alpha(errorColor, 0.12),
                            color: metric.trendUp ? successColor : errorColor,
                            borderRadius: 1
                          }}
                          icon={
                            <Icon
                              icon={
                                metric.trendUp ? 'solar:alt-arrow-up-bold-duotone' : 'solar:alt-arrow-down-bold-duotone'
                              }
                              width={12}
                              style={{
                                marginLeft: '2px',
                                marginRight: '-4px',
                                color: metric.trendUp ? successColor : errorColor
                              }}
                            />
                          }
                        />
                      </Stack>
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

        {/* Activity List */}
        <List sx={{ py: 0 }}>
          {activities.map((activity, index) => {
            const statusColors = getStatusColor(activity.status);
            return (
              <ListItem
                key={activity.id}
                divider={index !== activities.length - 1}
                sx={{
                  py: 1.5,
                  px: 2.5,
                  transition: 'all 0.2s ease-in-out',
                  '&:hover': {
                    bgcolor: alpha(theme.palette.primary.main, 0.04)
                  }
                }}
              >
                <ListItemAvatar sx={{ minWidth: 44 }}>
                  <Avatar
                    variant="rounded"
                    sx={{
                      bgcolor: statusColors.lighter,
                      color: statusColors.main,
                      width: 36,
                      height: 36,
                      borderRadius: 1.5
                    }}
                  >
                    <Icon icon={getStatusIcon(activity.status)} width={20} />
                  </Avatar>
                </ListItemAvatar>

                <ListItemText
                  primary={
                    <Typography variant="subtitle1" sx={{ fontWeight: 600, fontSize: '0.9rem', mb: 0.5 }}>
                      {activity.task}
                    </Typography>
                  }
                  secondary={
                    <>
                      <Typography variant="body2" color="textSecondary" sx={{ mb: 0.5 }}>
                        {activity.details}
                      </Typography>

                      <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={1}>
                        <Typography variant="caption" sx={{ color: alpha(theme.palette.text.primary, 0.6) }}>
                          <Box component="span" sx={{ mr: 1 }}>
                            <Icon
                              icon="solar:user-outline"
                              width={14}
                              style={{ verticalAlign: 'middle', marginRight: '4px' }}
                            />
                            {activity.user}
                          </Box>
                          <Box component="span">
                            <Icon
                              icon="solar:clock-circle-outline"
                              width={14}
                              style={{ verticalAlign: 'middle', marginRight: '4px' }}
                            />
                            {activity.time}
                          </Box>
                        </Typography>

                        <Chip
                          label={activity.status.charAt(0).toUpperCase() + activity.status.slice(1)}
                          size="small"
                          sx={{
                            bgcolor: statusColors.lighter,
                            color: statusColors.main,
                            borderRadius: '4px',
                            fontSize: '0.7rem',
                            height: 22,
                            fontWeight: 600,
                            border: `1px solid ${statusColors.border}`
                          }}
                        />
                      </Stack>
                    </>
                  }
                />
              </ListItem>
            );
          })}
        </List>

        {/* View All Button */}
        <Box sx={{ p: 2, textAlign: 'center' }}>
          <Button
            variant="outlined"
            color="primary"
            size="small"
            startIcon={<Icon icon="solar:document-list-bold-duotone" width={16} />}
            sx={{
              borderRadius: 1.5,
              fontWeight: 600,
              boxShadow: `inset 0 0 0 1px ${alpha(primaryColor, 0.3)}`,
              '&:hover': {
                boxShadow: `inset 0 0 0 1px ${primaryColor}`,
                bgcolor: alpha(primaryColor, 0.04)
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
