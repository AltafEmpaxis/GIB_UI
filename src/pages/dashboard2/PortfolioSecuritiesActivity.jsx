// material-ui
import { Icon } from '@iconify/react';
import {
  Avatar,
  Box,
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
  Button,
  alpha,
  Divider,
  Card,
  Fade,
  Grid,
  Tooltip
} from '@mui/material';
import PropTypes from 'prop-types';

// project imports
import MainCard from 'components/MainCard';
import mockData from './dashbord-mockData.json';

const PortfolioSecuritiesActivity = ({ isLoading }) => {
  const theme = useTheme();

  // Theme-based colors instead of hardcoded values
  const primaryColor = theme.palette.primary.main;
  const successColor = theme.palette.success.main;
  const warningColor = theme.palette.warning.main;
  const infoColor = theme.palette.info.main;

  // Use mock data from the JSON file, or fallback to hardcoded if unavailable
  const activities = mockData?.portfolioActivity || [
    {
      id: 1,
      activity: 'New Portfolio Created',
      name: 'GIB Saudi Equity Fund',
      time: '30 minutes ago',
      user: 'Noura Al-Zahrani',
      category: 'portfolio',
      type: 'create'
    },
    {
      id: 2,
      activity: 'Security Added',
      name: 'ARAMCO - Saudi Arabian Oil Co. (2222.SE)',
      time: '1 hour ago',
      user: 'Khalid Al-Otaibi',
      category: 'security',
      type: 'add'
    },
    {
      id: 3,
      activity: 'Portfolio Updated',
      name: 'GIB Sukuk Fund',
      time: '2 hours ago',
      user: 'Ahmad Al-Farsi',
      category: 'portfolio',
      type: 'update'
    },
    {
      id: 4,
      activity: 'Security Modified',
      name: 'SABB - Saudi British Bank (1060.SE)',
      time: '3 hours ago',
      user: 'Layla Al-Ghamdi',
      category: 'security',
      type: 'update'
    }
  ];

  // Activity metrics for the overview section
  const activityMetrics = [
    {
      label: 'Total Portfolios',
      value: '18',
      icon: 'solar:folder-bold-duotone',
      color: primaryColor,
      trend: '+2',
      trendUp: true
    },
    {
      label: 'Securities',
      value: '265',
      icon: 'solar:document-text-bold-duotone',
      color: successColor,
      trend: '+12',
      trendUp: true
    },
    {
      label: 'Changes Today',
      value: '14',
      icon: 'solar:pen-bold-duotone',
      color: warningColor,
      trend: '↑5',
      trendUp: true
    }
  ];

  const getActivityIcon = (category, type) => {
    if (category === 'portfolio') {
      switch (type) {
        case 'create':
          return 'solar:add-folder-bold-duotone';
        case 'update':
          return 'solar:folder-check-bold-duotone';
        case 'delete':
          return 'solar:folder-remove-bold-duotone';
        default:
          return 'solar:folder-bold-duotone';
      }
    } else {
      switch (type) {
        case 'add':
          return 'solar:add-circle-bold-duotone';
        case 'update':
          return 'solar:pen-bold-duotone';
        case 'delete':
          return 'solar:trash-bin-bold-duotone';
        default:
          return 'solar:document-bold-duotone';
      }
    }
  };

  const getActivityColor = (category) => {
    if (category === 'portfolio') {
      return {
        main: primaryColor,
        lighter: alpha(primaryColor, 0.1),
        border: alpha(primaryColor, 0.2)
      };
    } else {
      return {
        main: successColor,
        lighter: alpha(successColor, 0.1),
        border: alpha(successColor, 0.2)
      };
    }
  };

  if (isLoading) {
    return (
      <MainCard
        title={
          <Stack direction="row" alignItems="center" spacing={1}>
            <Icon icon="solar:folder-bold-duotone" width={24} style={{ color: primaryColor }} />
            <Typography variant="h5">Portfolio & Securities</Typography>
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
                    <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1} mt={0.5}>
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
            <Icon icon="solar:folder-bold-duotone" width={20} />
          </Avatar>
          <Typography variant="h5">Portfolio & Securities</Typography>
        </Stack>
      }
      secondary={
        <Tooltip title="Refresh data">
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
      {/* Decorative element */}
      <Box
        sx={{
          position: 'absolute',
          top: -24,
          left: -24,
          width: 150,
          height: 150,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${alpha(primaryColor, 0.08)} 0%, rgba(0,0,0,0) 70%)`,
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
                            bgcolor: alpha(successColor, 0.12),
                            color: successColor,
                            borderRadius: 1
                          }}
                          icon={
                            <Icon
                              icon="solar:alt-arrow-up-bold-duotone"
                              width={12}
                              style={{
                                marginLeft: '2px',
                                marginRight: '-4px',
                                color: successColor
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
            const activityColor = getActivityColor(activity.category);
            const iconName = getActivityIcon(activity.category, activity.type);

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
                      bgcolor: activityColor.lighter,
                      color: activityColor.main,
                      width: 36,
                      height: 36,
                      borderRadius: 1.5
                    }}
                  >
                    <Icon icon={iconName} width={20} />
                  </Avatar>
                </ListItemAvatar>

                <ListItemText
                  primary={
                    <Typography variant="subtitle1" sx={{ fontWeight: 600, fontSize: '0.9rem', mb: 0.5 }}>
                      {activity.activity}
                    </Typography>
                  }
                  secondary={
                    <>
                      <Typography
                        variant="body2"
                        sx={{
                          color: theme.palette.text.primary,
                          fontWeight: 500,
                          mb: 0.5
                        }}
                      >
                        {activity.name}
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
                          label={activity.category.charAt(0).toUpperCase() + activity.category.slice(1)}
                          size="small"
                          sx={{
                            bgcolor: activityColor.lighter,
                            color: activityColor.main,
                            borderRadius: '4px',
                            fontSize: '0.7rem',
                            height: 22,
                            fontWeight: 600,
                            border: `1px solid ${activityColor.border}`
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
            startIcon={<Icon icon="solar:folder-with-files-bold-duotone" width={16} />}
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
            View All Portfolios
          </Button>
        </Box>
      </CardContent>
    </MainCard>
  );
};

PortfolioSecuritiesActivity.propTypes = {
  isLoading: PropTypes.bool
};

export default PortfolioSecuritiesActivity;
