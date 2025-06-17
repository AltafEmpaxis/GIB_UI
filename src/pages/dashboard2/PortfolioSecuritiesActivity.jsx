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

const PortfolioSecuritiesActivity = ({ isLoading }) => {
  const theme = useTheme();

  // Theme-based colors instead of hardcoded values
  const primaryColor = theme.palette.primary.main;
  const successColor = theme.palette.success.main;
  const warningColor = theme.palette.warning.main;

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
    { label: 'Total Portfolios', value: '18', icon: 'solar:folder-bold-duotone', color: successColor },
    { label: 'Securities', value: '265', icon: 'solar:document-text-bold-duotone', color: primaryColor },
    { label: 'Changes Today', value: '14', icon: 'solar:pen-bold-duotone', color: warningColor }
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
            <Typography variant="h5">Overview, Recent Activity on New Portfolio & Securities</Typography>
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
          <Icon icon="solar:folder-bold-duotone" width={24} style={{ color: primaryColor }} />
          <Typography variant="h5">Overview, Recent Activity on New Portfolio & Securities</Typography>
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
            const activityColor = getActivityColor(activity.category);
            const iconName = getActivityIcon(activity.category, activity.type);
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
                        color: activityColor.main,
                        bgcolor: activityColor.lighter,
                        width: 36,
                        height: 36,
                        border: `1px solid ${activityColor.border}`
                      }}
                    >
                      <Icon icon={iconName} width={20} height={20} />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Stack direction="row" alignItems="center" justifyContent="space-between">
                        <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                          {activity.activity}
                          <Typography component="span" variant="caption" sx={{ ml: 1, opacity: 0.7 }}>
                            • {activity.time}
                          </Typography>
                        </Typography>
                        <Chip
                          label={activity.user}
                          size="small"
                          sx={{
                            bgcolor: alpha(activityColor.main, 0.1),
                            color: activityColor.main,
                            borderRadius: '4px',
                            border: `1px solid ${activityColor.border}`,
                            fontWeight: 500,
                            '& .MuiChip-label': {
                              px: 1
                            }
                          }}
                        />
                      </Stack>
                    }
                    secondary={
                      <Typography
                        variant="caption"
                        color="textSecondary"
                        sx={{ mt: 0.5, display: 'block', fontWeight: 500 }}
                      >
                        {activity.name}
                      </Typography>
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
            startIcon={<Icon icon="solar:folder-bold-duotone" />}
            sx={{
              fontWeight: 500,
              color: primaryColor,
              '&:hover': {
                background: alpha(primaryColor, 0.1)
              }
            }}
          >
            View All Portfolio Activities
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
