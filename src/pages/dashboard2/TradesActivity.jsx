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
  ButtonGroup,
  Collapse,
  CircularProgress,
  Tooltip,
  Grid
} from '@mui/material';
import PropTypes from 'prop-types';
import { useState } from 'react';

// project imports
import MainCard from 'components/MainCard';
import mockData from './dashbord-mockData.json';

const TradesActivity = ({ isLoading: parentLoading }) => {
  const theme = useTheme();
  const [isLoading, setLoading] = useState(parentLoading);
  const [refreshing, setRefreshing] = useState(false);
  const [expandedId, setExpandedId] = useState(null);
  const [filter, setFilter] = useState('all');

  // Theme-based colors instead of hardcoded values
  const primaryColor = theme.palette.primary.main;
  const successColor = theme.palette.success.main;
  const warningColor = theme.palette.warning.main;
  const errorColor = theme.palette.error.main;
  const infoColor = theme.palette.info.main;

  // Use mock data from the JSON file, or fallback to hardcoded if unavailable
  const allActivities = mockData?.tradesActivity || [
    {
      id: 1,
      action: 'Buy Order Executed',
      security: 'ARAMCO - Saudi Arabian Oil Co. (2222.SE)',
      details: '250 shares @ 31.15 SAR',
      time: '5 minutes ago',
      user: 'Trading Desk',
      type: 'buy',
      status: 'completed',
      value: '7,787.50 SAR',
      settlement: 'T+2 (18 Aug)',
      broker: 'GIB Capital'
    },
    {
      id: 2,
      action: 'Sell Order Executed',
      security: 'ALRAJHI - Al Rajhi Bank (1120.SE)',
      details: '150 shares @ 85.70 SAR',
      time: '30 minutes ago',
      user: 'Yousef Al-Qahtani',
      type: 'sell',
      status: 'completed',
      value: '12,855.00 SAR',
      settlement: 'T+2 (18 Aug)',
      broker: 'NCB Capital'
    },
    {
      id: 3,
      action: 'Trade Rejected',
      security: 'SABB - Saudi British Bank (1060.SE)',
      details: 'Insufficient funds',
      time: '1 hour ago',
      user: 'System',
      type: 'buy',
      status: 'rejected',
      value: '21,500.00 SAR',
      settlement: 'N/A',
      broker: 'SABB Securities'
    },
    {
      id: 4,
      action: 'Block Trade Posted',
      security: 'TASI - Tadawul All Share Index',
      details: '10,000 shares @ Index Value',
      time: '2 hours ago',
      user: 'Institutional Desk',
      type: 'block',
      status: 'completed',
      value: '1,250,000.00 SAR',
      settlement: 'T+3 (19 Aug)',
      broker: 'GIB Capital'
    }
  ];

  // Filter activities based on selected filter
  const activities = filter === 'all' ? allActivities : allActivities.filter((activity) => activity.type === filter);

  // Activity metrics for the overview section
  const activityMetrics = [
    {
      label: 'Total Trades',
      value: '142',
      icon: 'solar:chart-bold-duotone',
      color: infoColor,
      trend: '+8',
      trendUp: true
    },
    {
      label: 'Buy Orders',
      value: '87',
      icon: 'solar:arrow-down-bold-duotone',
      color: successColor,
      trend: '+5',
      trendUp: true
    },
    {
      label: 'Sell Orders',
      value: '55',
      icon: 'solar:arrow-up-bold-duotone',
      color: primaryColor,
      trend: '+3',
      trendUp: true
    }
  ];

  // Handle refresh
  const handleRefresh = () => {
    setRefreshing(true);
    // Simulate refresh
    setTimeout(() => {
      setRefreshing(false);
    }, 1500);
  };

  // Toggle expanded details
  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  // Handle filter change
  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  const getStatusColor = (status, type) => {
    if (status === 'rejected') {
      return {
        main: errorColor,
        lighter: alpha(errorColor, 0.1),
        border: alpha(errorColor, 0.2)
      };
    } else if (status === 'pending') {
      return {
        main: warningColor,
        lighter: alpha(warningColor, 0.1),
        border: alpha(warningColor, 0.2)
      };
    } else if (type === 'buy') {
      return {
        main: successColor,
        lighter: alpha(successColor, 0.1),
        border: alpha(successColor, 0.2)
      };
    } else if (type === 'sell') {
      return {
        main: primaryColor,
        lighter: alpha(primaryColor, 0.1),
        border: alpha(primaryColor, 0.2)
      };
    } else {
      return {
        main: infoColor,
        lighter: alpha(infoColor, 0.1),
        border: alpha(infoColor, 0.2)
      };
    }
  };

  const getActionIcon = (type, status) => {
    if (status === 'rejected') {
      return 'solar:close-circle-bold-duotone';
    } else if (status === 'pending') {
      return 'solar:clock-circle-bold-duotone';
    } else if (type === 'buy') {
      return 'solar:arrow-down-bold-duotone';
    } else if (type === 'sell') {
      return 'solar:arrow-up-bold-duotone';
    } else if (type === 'block') {
      return 'solar:widget-3-bold-duotone';
    } else {
      return 'solar:dollar-minimalistic-bold-duotone';
    }
  };

  if (isLoading) {
    return (
      <MainCard
        title={
          <Stack direction="row" alignItems="center" spacing={1}>
            <Icon icon="solar:chart-bold-duotone" width={24} style={{ color: successColor }} />
            <Typography variant="h5">Trading Activity</Typography>
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
              background: `linear-gradient(135deg, ${alpha(successColor, 0.16)} 0%, ${alpha(successColor, 0.24)} 100%)`,
              color: successColor
            }}
          >
            <Icon icon="solar:chart-bold-duotone" width={20} />
          </Avatar>
          <Typography variant="h5">Trading Activity</Typography>
        </Stack>
      }
      secondary={
        <Stack direction="row" spacing={1}>
          <Tooltip title="Filter trades">
            <ButtonGroup
              size="small"
              sx={{
                borderRadius: 1.5,
                boxShadow: `0 2px 8px ${alpha(theme.palette.common.black, 0.08)}`,
                '.MuiButtonGroup-grouped': {
                  borderColor: alpha(theme.palette.divider, 0.5)
                }
              }}
            >
              <Button
                variant={filter === 'all' ? 'contained' : 'outlined'}
                onClick={() => handleFilterChange('all')}
                size="small"
                sx={{
                  fontSize: '0.75rem',
                  px: 1.5,
                  borderRadius: '6px 0 0 6px',
                  minHeight: 28
                }}
              >
                All
              </Button>
              <Button
                variant={filter === 'buy' ? 'contained' : 'outlined'}
                onClick={() => handleFilterChange('buy')}
                size="small"
                sx={{
                  fontSize: '0.75rem',
                  px: 1.5,
                  minHeight: 28
                }}
              >
                Buy
              </Button>
              <Button
                variant={filter === 'sell' ? 'contained' : 'outlined'}
                onClick={() => handleFilterChange('sell')}
                size="small"
                sx={{
                  fontSize: '0.75rem',
                  px: 1.5,
                  borderRadius: '0 6px 6px 0',
                  minHeight: 28
                }}
              >
                Sell
              </Button>
            </ButtonGroup>
          </Tooltip>
          <Tooltip title="Refresh trading data">
            <IconButton
              color="primary"
              size="small"
              onClick={handleRefresh}
              disabled={refreshing}
              sx={{
                bgcolor: alpha(successColor, 0.1),
                '&:hover': { bgcolor: alpha(successColor, 0.16) },
                border: `1px solid ${alpha(successColor, 0.2)}`,
                backdropFilter: 'blur(4px)'
              }}
            >
              {refreshing ? (
                <CircularProgress size={18} thickness={2} />
              ) : (
                <Icon icon="solar:refresh-bold" width={18} height={18} style={{ color: successColor }} />
              )}
            </IconButton>
          </Tooltip>
        </Stack>
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
          right: -24,
          width: 150,
          height: 150,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${alpha(successColor, 0.1)} 0%, rgba(0,0,0,0) 70%)`,
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
            const statusColors = getStatusColor(activity.status, activity.type);
            const iconName = getActionIcon(activity.type, activity.status);
            const isExpanded = expandedId === activity.id;

            return (
              <Box key={activity.id}>
                <ListItem
                  divider={index !== activities.length - 1 || isExpanded}
                  sx={{
                    py: 1.5,
                    px: 2.5,
                    transition: 'all 0.2s ease-in-out',
                    '&:hover': {
                      bgcolor: alpha(theme.palette.primary.main, 0.04)
                    },
                    cursor: 'pointer'
                  }}
                  onClick={() => toggleExpand(activity.id)}
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
                          <Stack direction="row" spacing={1} alignItems="center">
                            <Typography
                              variant="caption"
                              sx={{
                                color: alpha(theme.palette.text.primary, 0.6),
                                display: 'flex',
                                alignItems: 'center',
                                gap: 0.5
                              }}
                            >
                              <Icon icon="solar:clock-circle-outline" width={14} style={{ verticalAlign: 'middle' }} />
                              {activity.time}
                            </Typography>
                            <Typography
                              variant="caption"
                              sx={{
                                color: alpha(theme.palette.text.primary, 0.6),
                                display: 'flex',
                                alignItems: 'center',
                                gap: 0.5
                              }}
                            >
                              <Icon
                                icon={
                                  activity.type === 'buy' ? 'solar:money-bag-bold-duotone' : 'solar:dollar-bold-duotone'
                                }
                                width={14}
                                style={{ verticalAlign: 'middle' }}
                              />
                              {activity.value}
                            </Typography>
                          </Stack>

                          <Chip
                            label={activity.type.charAt(0).toUpperCase() + activity.type.slice(1)}
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

                  <Icon
                    icon={isExpanded ? 'solar:minus-circle-bold-duotone' : 'solar:add-circle-bold-duotone'}
                    width={20}
                    style={{
                      color: alpha(theme.palette.text.primary, 0.5),
                      marginLeft: 8
                    }}
                  />
                </ListItem>

                {/* Expanded Details */}
                <Collapse in={isExpanded} timeout="auto" unmountOnExit>
                  <Box
                    sx={{
                      p: 2,
                      bgcolor: alpha(theme.palette.background.default, 0.5),
                      borderBottom: index !== activities.length - 1 ? `1px solid ${theme.palette.divider}` : 'none'
                    }}
                  >
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <Stack spacing={1}>
                          <Typography variant="caption" color="textSecondary">
                            Trade Details
                          </Typography>
                          <Typography variant="body2">{activity.details}</Typography>
                        </Stack>
                      </Grid>
                      <Grid item xs={6}>
                        <Stack spacing={1}>
                          <Typography variant="caption" color="textSecondary">
                            Settlement
                          </Typography>
                          <Typography variant="body2">{activity.settlement}</Typography>
                        </Stack>
                      </Grid>
                      <Grid item xs={6}>
                        <Stack spacing={1}>
                          <Typography variant="caption" color="textSecondary">
                            Broker
                          </Typography>
                          <Typography variant="body2">{activity.broker}</Typography>
                        </Stack>
                      </Grid>
                      <Grid item xs={6}>
                        <Stack spacing={1}>
                          <Typography variant="caption" color="textSecondary">
                            Initiated By
                          </Typography>
                          <Typography variant="body2">{activity.user}</Typography>
                        </Stack>
                      </Grid>
                    </Grid>
                  </Box>
                </Collapse>
              </Box>
            );
          })}
        </List>

        {/* View All Button */}
        <Box sx={{ p: 2, textAlign: 'center' }}>
          <Button
            variant="outlined"
            color="primary"
            size="small"
            startIcon={<Icon icon="solar:graph-new-up-bold-duotone" width={16} />}
            sx={{
              borderRadius: 1.5,
              fontWeight: 600,
              boxShadow: `inset 0 0 0 1px ${alpha(successColor, 0.3)}`,
              color: successColor,
              borderColor: alpha(successColor, 0.3),
              '&:hover': {
                boxShadow: `inset 0 0 0 1px ${successColor}`,
                bgcolor: alpha(successColor, 0.04),
                borderColor: successColor
              }
            }}
          >
            View All Trading Activity
          </Button>
        </Box>
      </CardContent>
    </MainCard>
  );
};

TradesActivity.propTypes = {
  isLoading: PropTypes.bool
};

export default TradesActivity;
