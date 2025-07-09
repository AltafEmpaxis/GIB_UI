// material-ui
import { Icon } from '@iconify/react';
import {
  alpha,
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Divider,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Skeleton,
  Stack,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme
} from '@mui/material';
import PropTypes from 'prop-types';

// project imports
import mockData from '../dashbord-mockData.json';

const CorporateActionActivity = ({ isLoading }) => {
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('lg'));
  const spacing = 1.5;

  // Theme-based colors instead of hardcoded values
  const primaryColor = theme.palette.primary.main;
  const secondaryColor = theme.palette.secondary.main;

  // Use mock data from the JSON file, or fallback to hardcoded
  const activities = mockData?.corporateActions || [
    {
      id: 1,
      action: 'Dividend Announcement',
      security: 'SABB - Saudi British Bank (1060.SE)',
      details: "0.83 SAR per share, Ex-Date: 15 Dhul Qa'dah",
      time: '15 minutes ago',
      user: 'System',
      status: 'new'
    },
    {
      id: 2,
      action: 'Stock Split',
      security: 'ARAMCO - Saudi Arabian Oil Co (2222.SE)',
      details: '2:1 Split, Effective Date: 10 Dhul Hijjah',
      time: '1 hour ago',
      user: 'Mohammed Al-Otaibi',
      status: 'processed'
    },
    {
      id: 3,
      action: 'Sukuk Maturity Notice',
      security: 'GACA - General Authority of Civil Aviation',
      details: 'Sukuk maturity on 20 Safar, 1446H',
      time: '3 hours ago',
      user: 'Fahad Al-Shammari',
      status: 'pending'
    },
    {
      id: 4,
      action: 'Rights Issue',
      security: 'ALRAJHI - Al Rajhi Bank (1120.SE)',
      details: '1:5 Rights Issue, Subscription: 1-15 Muharram',
      time: '5 hours ago',
      user: 'Nora Al-Dosari',
      status: 'processed'
    }
  ];

  // Activity metrics for the overview section
  const activityMetrics = [
    {
      label: 'Dividends',
      value: '12',
      icon: 'solar:money-bag-bold-duotone',
      color: secondaryColor,
      trend: '+3',
      trendUp: true
    },
    {
      label: 'Rights Issues',
      value: '3',
      icon: 'solar:widget-add-bold-duotone',
      color: primaryColor,
      trend: '0',
      trendUp: null
    },
    {
      label: 'Other Actions',
      value: '8',
      icon: 'solar:document-text-bold-duotone',
      color: secondaryColor,
      trend: '+2',
      trendUp: true
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'new':
        return {
          main: primaryColor,
          lighter: alpha(primaryColor, 0.1),
          border: alpha(primaryColor, 0.2)
        };
      case 'processed':
        return {
          main: secondaryColor,
          lighter: alpha(secondaryColor, 0.1),
          border: alpha(secondaryColor, 0.2)
        };
      case 'pending':
        return {
          main: theme.palette.warning.main,
          lighter: alpha(theme.palette.warning.main, 0.1),
          border: alpha(theme.palette.warning.main, 0.2)
        };
      case 'rejected':
        return {
          main: theme.palette.error.main,
          lighter: alpha(theme.palette.error.main, 0.1),
          border: alpha(theme.palette.error.main, 0.2)
        };
      default:
        return {
          main: primaryColor,
          lighter: alpha(primaryColor, 0.1),
          border: alpha(primaryColor, 0.2)
        };
    }
  };

  const getActionIcon = (action) => {
    if (action.includes('Dividend')) {
      return 'solar:money-bag-bold-duotone';
    } else if (action.includes('Split')) {
      return 'solar:cell-divided-bold-duotone';
    } else if (action.includes('Sukuk')) {
      return 'solar:document-text-bold-duotone';
    } else if (action.includes('Rights')) {
      return 'solar:widget-add-bold-duotone';
    } else if (action.includes('Merger')) {
      return 'solar:arrow-right-bold-duotone';
    } else {
      return 'solar:document-text-bold-duotone';
    }
  };

  if (isLoading) {
    return (
      <Card
        sx={{
          height: '100%',
          boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
          '& .MuiCardContent-root': { p: 0 },
          borderRadius: 1
        }}
      >
        <CardContent>
          <Box sx={{ p: spacing, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Stack direction="row" alignItems="center" spacing={1}>
              <Skeleton variant="circular" width={32} height={32} />
              <Skeleton variant="text" width={180} height={28} />
            </Stack>
            <Skeleton variant="circular" width={32} height={32} />
          </Box>
          <Box sx={{ p: spacing }}>
            <Skeleton variant="rectangular" height={110} sx={{ borderRadius: 2, mb: spacing }} />
          </Box>
          <Divider />
          <List sx={{ py: 0 }}>
            {[...Array(4)].map((_, index) => (
              <ListItem
                key={index}
                divider
                sx={{
                  py: 1.5,
                  px: spacing,
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
      </Card>
    );
  }

  return (
    <Card
      sx={{
        height: '100%',
        boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
        '& .MuiCardContent-root': { p: 0 },
        borderRadius: 1,
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
          background: `radial-gradient(circle, ${alpha(primaryColor, 0.1)} 0%, rgba(0,0,0,0) 70%)`,
          zIndex: 0
        }}
      />

      <CardContent>
        <Box sx={{ p: spacing, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
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
              <Icon icon="solar:document-bold-duotone" width={20} />
            </Avatar>
            <Typography variant="h5">Corporate Actions</Typography>
          </Stack>

          <Tooltip title="Refresh corporate actions">
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
              <Icon icon="solar:refresh-bold" width={18} height={18} style={{ color: primaryColor }} />
            </IconButton>
          </Tooltip>
        </Box>

        {/* Activity Overview Section */}
        <Box sx={{ p: spacing }}>
          <Grid container spacing={spacing}>
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
                        {metric.trendUp !== null && (
                          <Chip
                            label={metric.trend}
                            size="small"
                            sx={{
                              height: 20,
                              fontSize: '0.625rem',
                              fontWeight: 600,
                              bgcolor:
                                metric.trendUp === true
                                  ? alpha(secondaryColor, 0.12)
                                  : alpha(theme.palette.text.secondary, 0.12),
                              color: metric.trendUp === true ? secondaryColor : theme.palette.text.secondary,
                              borderRadius: 1
                            }}
                            icon={
                              metric.trendUp === true && (
                                <Icon
                                  icon="solar:alt-arrow-up-bold-duotone"
                                  width={12}
                                  style={{
                                    marginLeft: '2px',
                                    marginRight: '-4px',
                                    color: metric.trendUp === true ? secondaryColor : theme.palette.text.secondary
                                  }}
                                />
                              )
                            }
                          />
                        )}
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
            const iconName = getActionIcon(activity.action);

            return (
              <ListItem
                key={activity.id}
                divider={index !== activities.length - 1}
                sx={{
                  py: 1.5,
                  px: spacing,
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
                    <Icon icon={iconName} width={20} />
                  </Avatar>
                </ListItemAvatar>

                <ListItemText
                  primary={
                    <Typography variant="subtitle1" sx={{ fontWeight: 600, fontSize: '0.9rem', mb: 0.5 }}>
                      {activity.action}
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
                        {activity.security}
                      </Typography>

                      <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={1}>
                        <Typography
                          variant="caption"
                          sx={{
                            color: alpha(theme.palette.text.primary, 0.6)
                          }}
                        >
                          <Box component="span" sx={{ display: 'inline-flex', alignItems: 'center', mr: 1 }}>
                            <Icon
                              icon="solar:clock-circle-outline"
                              width={14}
                              style={{ verticalAlign: 'middle', marginRight: '4px' }}
                            />
                            {activity.time}
                          </Box>
                          <Box component="span" sx={{ display: 'inline-flex', alignItems: 'center' }}>
                            <Icon
                              icon="solar:user-outline"
                              width={14}
                              style={{ verticalAlign: 'middle', marginRight: '4px' }}
                            />
                            {activity.user}
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
        <Box sx={{ p: spacing, textAlign: 'center' }}>
          <Button
            variant="outlined"
            color="primary"
            size="small"
            startIcon={<Icon icon="solar:calendar-mark-bold-duotone" width={16} />}
            sx={{
              borderRadius: 1.5,
              fontWeight: 600,
              boxShadow: `inset 0 0 0 1px ${alpha(primaryColor, 0.3)}`,
              color: primaryColor,
              borderColor: alpha(primaryColor, 0.3),
              '&:hover': {
                boxShadow: `inset 0 0 0 1px ${primaryColor}`,
                bgcolor: alpha(primaryColor, 0.04),
                borderColor: primaryColor
              }
            }}
          >
            View All Corporate Actions
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

CorporateActionActivity.propTypes = {
  isLoading: PropTypes.bool
};

export default CorporateActionActivity;
