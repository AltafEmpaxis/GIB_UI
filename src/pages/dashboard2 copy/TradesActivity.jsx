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
  Tooltip
} from '@mui/material';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import { useState } from 'react';

// project imports
import MainCard from 'components/MainCard';
import mockData from './dashbord-mockData.json';

// Add Grid import
import { Grid } from '@mui/material';

const TradesActivity = ({ isLoading: parentLoading }) => {
  const theme = useTheme();
  const [isLoading, setLoading] = useState(parentLoading);
  const [refreshing, setRefreshing] = useState(false);
  const [expandedId, setExpandedId] = useState(null);
  const [filter, setFilter] = useState('all');

  // GIB Brand Colors
  const primaryGreen = theme.palette.mode === 'dark' ? theme.palette.success.dark : '#007B5F'; // GIB primary green
  const secondaryBlue = theme.palette.mode === 'dark' ? theme.palette.primary.dark : '#0F345E'; // GIB dark blue
  const accentYellow = theme.palette.mode === 'dark' ? theme.palette.warning.dark : '#F5A623'; // GIB accent yellow

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
    { label: 'Total Trades', value: '142', icon: 'solar:chart-bold-duotone', color: primaryGreen },
    { label: 'Buy Orders', value: '87', icon: 'solar:arrow-down-bold-duotone', color: secondaryBlue },
    { label: 'Sell Orders', value: '55', icon: 'solar:arrow-up-bold-duotone', color: accentYellow }
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
        main: theme.palette.error.main,
        lighter: alpha(theme.palette.error.main, 0.1),
        border: alpha(theme.palette.error.main, 0.2)
      };
    } else if (status === 'pending') {
      return {
        main: accentYellow,
        lighter: alpha(accentYellow, 0.1),
        border: alpha(accentYellow, 0.2)
      };
    } else if (type === 'buy') {
      return {
        main: primaryGreen,
        lighter: alpha(primaryGreen, 0.1),
        border: alpha(primaryGreen, 0.2)
      };
    } else if (type === 'sell') {
      return {
        main: secondaryBlue,
        lighter: alpha(secondaryBlue, 0.1),
        border: alpha(secondaryBlue, 0.2)
      };
    } else {
      return {
        main: theme.palette.info.main,
        lighter: alpha(theme.palette.info.main, 0.1),
        border: alpha(theme.palette.info.main, 0.2)
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

  const listItemAnimation = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };

  if (isLoading) {
    return (
      <MainCard
        title={
          <Stack direction="row" alignItems="center" spacing={1}>
            <Icon icon="solar:chart-bold-duotone" width={24} style={{ color: primaryGreen }} />
            <Typography variant="h5">Overview, Recent Activity on Posting of Trades</Typography>
          </Stack>
        }
        sx={{
          height: '100%',
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
                    <Stack spacing={0.5} mt={0.5}>
                      <Skeleton variant="text" width="40%" height={20} />
                      <Stack direction="row" justifyContent="space-between" spacing={1}>
                        <Skeleton variant="text" width="50%" height={20} />
                        <Skeleton variant="rectangular" width={60} height={24} sx={{ borderRadius: 1 }} />
                      </Stack>
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
            icon="solar:chart-bold-duotone"
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
          <Typography variant="h5">Overview, Recent Activity on Posting of Trades</Typography>
        </Stack>
      }
      secondary={
        <Tooltip title="Refresh trade data">
          <IconButton
            color="primary"
            size="small"
            component={motion.button}
            whileHover={{ rotate: 180, scale: 1.1 }}
            onClick={handleRefresh}
            disabled={refreshing}
            sx={{
              bgcolor: alpha(primaryGreen, 0.1),
              '&:hover': { bgcolor: alpha(primaryGreen, 0.2) }
            }}
          >
            {refreshing ? (
              <CircularProgress size={20} color="inherit" />
            ) : (
              <Icon icon="solar:refresh-bold" width={20} height={20} style={{ color: primaryGreen }} />
            )}
          </IconButton>
        </Tooltip>
      }
      sx={{
        height: '100%',
        boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
        '& .MuiCardContent-root': { p: 0 },
        borderRadius: 3,
        transition: 'all 0.3s ease',
        '&:hover': {
          boxShadow: '0 6px 18px rgba(0,0,0,0.1)'
        },
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

        {/* Filter Buttons */}
        <Box sx={{ px: 2, mb: 2 }}>
          <ButtonGroup
            size="small"
            variant="outlined"
            sx={{
              '& .MuiButton-root': {
                borderColor: alpha(theme.palette.divider, 0.5),
                color: theme.palette.text.secondary,
                '&.active': {
                  bgcolor: alpha(primaryGreen, 0.1),
                  color: primaryGreen,
                  borderColor: alpha(primaryGreen, 0.5)
                }
              }
            }}
          >
            <Button className={filter === 'all' ? 'active' : ''} onClick={() => handleFilterChange('all')}>
              All Trades
            </Button>
            <Button className={filter === 'buy' ? 'active' : ''} onClick={() => handleFilterChange('buy')}>
              Buy Orders
            </Button>
            <Button className={filter === 'sell' ? 'active' : ''} onClick={() => handleFilterChange('sell')}>
              Sell Orders
            </Button>
            <Button className={filter === 'block' ? 'active' : ''} onClick={() => handleFilterChange('block')}>
              Block Trades
            </Button>
          </ButtonGroup>
        </Box>

        <Divider />

        {/* Activity List */}
        <List sx={{ py: 0 }}>
          {activities.map((activity, index) => {
            const statusColor = getStatusColor(activity.status, activity.type);
            const iconName = getActionIcon(activity.type, activity.status);
            const isExpanded = expandedId === activity.id;

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
                    flexDirection: 'column',
                    alignItems: 'stretch',
                    '&:hover': {
                      bgcolor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.03)' : alpha(primaryGreen, 0.05)
                    },
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                  onClick={() => toggleExpand(activity.id)}
                >
                  <Stack direction="row" alignItems="flex-start">
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

                    <Box sx={{ flex: 1, width: '100%' }}>
                      <Stack direction="row" alignItems="center" justifyContent="space-between">
                        <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                          {activity.action}
                          <Typography component="span" variant="caption" sx={{ ml: 1, opacity: 0.7 }}>
                            • {activity.time}
                          </Typography>
                        </Typography>
                        <Stack direction="row" spacing={1} alignItems="center">
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
                          <IconButton
                            size="small"
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleExpand(activity.id);
                            }}
                          >
                            <Icon
                              icon={isExpanded ? 'solar:alt-arrow-up-bold' : 'solar:alt-arrow-down-bold'}
                              width={16}
                            />
                          </IconButton>
                        </Stack>
                      </Stack>

                      <Typography variant="caption" color="textSecondary" sx={{ fontWeight: 500 }}>
                        {activity.security}
                      </Typography>

                      <Typography variant="caption" color="textSecondary" sx={{ display: 'block', mt: 0.5 }}>
                        {activity.details}
                      </Typography>
                    </Box>
                  </Stack>

                  {/* Expandable Details */}
                  <Collapse in={isExpanded} timeout="auto" unmountOnExit>
                    <Box
                      sx={{
                        mt: 2,
                        ml: 5.5,
                        p: 1.5,
                        borderLeft: `1px dashed ${statusColor.border}`,
                        bgcolor: alpha(statusColor.lighter, 0.5),
                        borderRadius: 1
                      }}
                    >
                      <Grid container spacing={2}>
                        <Grid item xs={6}>
                          <Typography variant="caption" color="textSecondary">
                            Value
                          </Typography>
                          <Typography variant="body2" sx={{ fontWeight: 500 }}>
                            {activity.value}
                          </Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="caption" color="textSecondary">
                            Settlement
                          </Typography>
                          <Typography variant="body2" sx={{ fontWeight: 500 }}>
                            {activity.settlement}
                          </Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="caption" color="textSecondary">
                            Broker
                          </Typography>
                          <Typography variant="body2" sx={{ fontWeight: 500 }}>
                            {activity.broker}
                          </Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="caption" color="textSecondary">
                            Status
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{
                              fontWeight: 500,
                              color: statusColor.main
                            }}
                          >
                            {activity.status.charAt(0).toUpperCase() + activity.status.slice(1)}
                          </Typography>
                        </Grid>
                      </Grid>

                      <Stack direction="row" spacing={1} justifyContent="flex-end" sx={{ mt: 1 }}>
                        <Button
                          size="small"
                          variant="outlined"
                          startIcon={<Icon icon="solar:eye-bold" width={16} />}
                          sx={{
                            borderColor: statusColor.border,
                            color: statusColor.main,
                            '&:hover': {
                              bgcolor: statusColor.lighter
                            }
                          }}
                          onClick={(e) => e.stopPropagation()}
                        >
                          View Details
                        </Button>

                        {activity.status !== 'rejected' && (
                          <Button
                            size="small"
                            variant="contained"
                            startIcon={<Icon icon="solar:printer-bold" width={16} />}
                            sx={{
                              bgcolor: statusColor.main,
                              '&:hover': {
                                bgcolor: alpha(statusColor.main, 0.8)
                              }
                            }}
                            onClick={(e) => e.stopPropagation()}
                          >
                            Print Confirmation
                          </Button>
                        )}
                      </Stack>
                    </Box>
                  </Collapse>
                </ListItem>
              </Fade>
            );
          })}
        </List>

        {activities.length === 0 && (
          <Box sx={{ py: 6, textAlign: 'center' }}>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <Icon
                icon="solar:box-minimalistic-broken"
                width={60}
                height={60}
                style={{ color: alpha(theme.palette.text.secondary, 0.5), margin: '0 auto' }}
              />
              <Typography variant="h6" color="textSecondary" sx={{ mt: 2 }}>
                No trades found
              </Typography>
              <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
                Try changing your filter or check back later
              </Typography>
              <Button
                variant="outlined"
                startIcon={<Icon icon="solar:refresh-bold" />}
                onClick={() => handleFilterChange('all')}
              >
                Show All Trades
              </Button>
            </motion.div>
          </Box>
        )}

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
            startIcon={<Icon icon="solar:chart-bold-duotone" />}
            sx={{
              fontWeight: 500,
              color: primaryGreen,
              '&:hover': {
                background: alpha(primaryGreen, 0.1)
              }
            }}
          >
            View All Trades
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
