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
  Button
} from '@mui/material';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

// project imports
import MainCard from 'components/MainCard';
import mockData from '../dashbord-mockData.json';

const TradesActivity = ({ isLoading }) => {
  const theme = useTheme();

  // Use mock data from the JSON file, or fallback to hardcoded if unavailable
  const activities = mockData?.tradesActivity || [
    {
      id: 1,
      action: 'Buy Order Executed',
      security: 'ARAMCO - Saudi Arabian Oil Co. (2222.SE)',
      details: '250 shares @ 31.15 SAR',
      time: '5 minutes ago',
      user: 'Trading Desk',
      type: 'buy',
      status: 'completed'
    },
    {
      id: 2,
      action: 'Sell Order Executed',
      security: 'ALRAJHI - Al Rajhi Bank (1120.SE)',
      details: '150 shares @ 85.70 SAR',
      time: '30 minutes ago',
      user: 'Yousef Al-Qahtani',
      type: 'sell',
      status: 'completed'
    },
    {
      id: 3,
      action: 'Trade Rejected',
      security: 'SABB - Saudi British Bank (1060.SE)',
      details: 'Insufficient funds',
      time: '1 hour ago',
      user: 'System',
      type: 'buy',
      status: 'rejected'
    },
    {
      id: 4,
      action: 'Block Trade Posted',
      security: 'TASI - Tadawul All Share Index',
      details: '10,000 shares @ Index Value',
      time: '2 hours ago',
      user: 'Institutional Desk',
      type: 'block',
      status: 'completed'
    }
  ];

  const getStatusColor = (status, type) => {
    if (status === 'rejected') {
      return theme.palette.error;
    } else if (status === 'pending') {
      return theme.palette.warning;
    } else if (type === 'buy') {
      return theme.palette.success;
    } else if (type === 'sell') {
      return theme.palette.primary;
    } else {
      return theme.palette.info;
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
        title="Saudi Market Trades"
        sx={{
          height: '100%',
          '& .MuiCardContent-root': { p: 0 }
        }}
      >
        <CardContent>
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
      title="Saudi Market Trades"
      secondary={
        <IconButton
          color="primary"
          size="small"
          component={motion.button}
          whileHover={{ rotate: 180, scale: 1.1 }}
          transition={{ duration: 0.3 }}
        >
          <Icon icon="solar:refresh-bold" width={20} height={20} />
        </IconButton>
      }
      sx={{
        height: '100%',
        boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
        '& .MuiCardContent-root': { p: 0 }
      }}
    >
      <CardContent>
        <List sx={{ py: 0 }}>
          {activities.map((activity, index) => {
            const statusColor = getStatusColor(activity.status, activity.type);
            const iconName = getActionIcon(activity.type, activity.status);
            return (
              <ListItem
                key={activity.id}
                component={motion.li}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                divider
                sx={{
                  py: 1.5,
                  px: 2,
                  borderColor: theme.palette.divider,
                  '&:hover': {
                    bgcolor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.01)'
                  },
                  cursor: 'pointer'
                }}
              >
                <ListItemAvatar sx={{ minWidth: 45 }}>
                  <Avatar
                    sx={{
                      color: statusColor.main,
                      bgcolor: statusColor.lighter,
                      width: 36,
                      height: 36
                    }}
                  >
                    <Icon icon={iconName} width={20} height={20} />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Typography variant="subtitle1">
                      {activity.action}
                      <Typography component="span" variant="caption" sx={{ ml: 1 }}>
                        • {activity.time}
                      </Typography>
                    </Typography>
                  }
                  secondary={
                    <Stack spacing={0.5} mt={0.5}>
                      <Typography variant="caption" color="textSecondary" sx={{ fontWeight: 500 }}>
                        {activity.security}
                      </Typography>
                      <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1}>
                        <Typography variant="caption" color="textSecondary">
                          {activity.details}
                        </Typography>
                        <Chip
                          label={activity.user}
                          size="small"
                          sx={{
                            bgcolor: theme.palette.mode === 'dark' ? 'background.default' : 'grey.50',
                            borderRadius: '4px'
                          }}
                        />
                      </Stack>
                    </Stack>
                  }
                />
              </ListItem>
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
            background: theme.palette.mode === 'dark' ? 'rgba(0,0,0,0.1)' : 'rgba(0,0,0,0.01)',
            transition: 'all 0.3s ease'
          }}
        >
          <Button
            variant="text"
            color="primary"
            endIcon={<Icon icon="solar:chart-bold-duotone" />}
            sx={{
              fontWeight: 500,
              '&:hover': {
                background: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)'
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
