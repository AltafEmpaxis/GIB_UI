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
  Grid
} from '@mui/material';
import PropTypes from 'prop-types';

// project imports
import MainCard from 'components/MainCard';
import mockData from './dashbord-mockData.json';

const CorporateActionActivity = ({ isLoading }) => {
  const theme = useTheme();

  // Theme-based colors instead of hardcoded values
  const primaryColor = theme.palette.primary.main;
  const successColor = theme.palette.success.main;
  const warningColor = theme.palette.warning.main;

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
    { label: 'Dividends', value: '12', icon: 'solar:money-bag-bold-duotone', color: successColor },
    { label: 'Rights Issues', value: '3', icon: 'solar:widget-add-bold-duotone', color: primaryColor },
    { label: 'Other Actions', value: '8', icon: 'solar:document-text-bold-duotone', color: warningColor }
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
          main: successColor,
          lighter: alpha(successColor, 0.1),
          border: alpha(successColor, 0.2)
        };
      case 'pending':
        return {
          main: warningColor,
          lighter: alpha(warningColor, 0.1),
          border: alpha(warningColor, 0.2)
        };
      case 'rejected':
        return {
          main: theme.palette.error.main,
          lighter: alpha(theme.palette.error.main, 0.1),
          border: alpha(theme.palette.error.main, 0.2)
        };
      default:
        return {
          main: theme.palette.primary.main,
          lighter: alpha(theme.palette.primary.main, 0.1),
          border: alpha(theme.palette.primary.main, 0.2)
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
      <MainCard
        title={
          <Stack direction="row" alignItems="center" spacing={1}>
            <Icon icon="solar:document-bold-duotone" width={24} style={{ color: primaryColor }} />
            <Typography variant="h5">Overview, Recent Activity on Corporate Action</Typography>
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
          <Icon icon="solar:document-bold-duotone" width={24} style={{ color: primaryColor }} />
          <Typography variant="h5">Overview, Recent Activity on Corporate Action</Typography>
        </Stack>
      }
      secondary={
        <IconButton
          color="primary"
          size="small"
          sx={{
            bgcolor: alpha(primaryColor, 0.1),
            '&:hover': { bgcolor: alpha(primaryColor, 0.2) }
          }}
        >
          <Icon icon="solar:refresh-bold" width={20} height={20} style={{ color: primaryColor }} />
        </IconButton>
      }
      sx={{
        height: '100%',
        boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
        '& .MuiCardContent-root': { p: 0 },
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

        {/* Activity List */}
        <List sx={{ py: 0 }}>
          {activities.map((activity, index) => {
            const statusColor = getStatusColor(activity.status);
            const iconName = getActionIcon(activity.action);
            return (
              <Fade key={activity.id} in={!isLoading} style={{ transitionDelay: `${index * 150}ms` }}>
                <ListItem
                  divider
                  sx={{
                    py: 1.5,
                    px: 2,
                    borderColor: theme.palette.divider,
                    '&:hover': {
                      bgcolor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.03)' : alpha(primaryColor, 0.05)
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
                    >
                      <Icon icon={iconName} width={20} height={20} />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Stack direction="row" alignItems="center" justifyContent="space-between">
                        <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                          {activity.action}
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
                      <Stack spacing={0.5} mt={0.5}>
                        <Typography variant="caption" color="textSecondary" sx={{ fontWeight: 500 }}>
                          {activity.security}
                        </Typography>
                        <Typography variant="caption" color="textSecondary">
                          {activity.details}
                        </Typography>
                      </Stack>
                    }
                  />
                </ListItem>
              </Fade>
            );
          })}
        </List>
        <Box
          sx={{
            p: 2,
            display: 'flex',
            justifyContent: 'center',
            borderTop: `1px solid ${theme.palette.divider}`,
            background: alpha(primaryColor, 0.03)
          }}
        >
          <Button
            variant="text"
            startIcon={<Icon icon="solar:document-bold-duotone" />}
            sx={{
              fontWeight: 500,
              color: primaryColor,
              '&:hover': {
                background: alpha(primaryColor, 0.1)
              }
            }}
          >
            View All Corporate Actions
          </Button>
        </Box>
      </CardContent>
    </MainCard>
  );
};

CorporateActionActivity.propTypes = {
  isLoading: PropTypes.bool
};

export default CorporateActionActivity;
