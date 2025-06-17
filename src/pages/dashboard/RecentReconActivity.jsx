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
  Button
} from '@mui/material';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

// project imports
import MainCard from 'components/MainCard';
import mockData from './dashbord-mockData.json';

const RecentReconActivity = ({ isLoading }) => {
  const theme = useTheme();

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

  const getStatusColor = (status) => {
    switch (status) {
      case 'success':
        return theme.palette.success;
      case 'warning':
        return theme.palette.warning;
      case 'error':
        return theme.palette.error;
      case 'info':
      default:
        return theme.palette.info;
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
        title="Recent Activity on Recon Tool"
        sx={{
          height: '100%',
          boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
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
      title="Recent Activity on Recon Tool"
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
        boxShadow: '0 2px 14px 0 rgba(32, 40, 45, 0.08)',
        '& .MuiCardContent-root': { p: 0 },
        '& .MuiCard-root': {
          overflow: 'hidden',
          transition: 'all 0.3s ease'
        },
        '&:hover': {
          boxShadow: '0 4px 18px 0 rgba(32, 40, 45, 0.12)'
        },
        border: '1px solid',
        borderColor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(230,230,230,0.8)',
        borderRadius: 2
      }}
    >
      <CardContent>
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
                        {activity.task}
                        <Typography component="span" variant="caption" sx={{ ml: 1 }}>
                          • {activity.time}
                        </Typography>
                      </Typography>
                    }
                    secondary={
                      <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1} mt={0.5}>
                        <Typography variant="caption" color="textSecondary">
                          {activity.details}
                        </Typography>
                        <Chip
                          label={activity.user}
                          size="small"
                          sx={{
                            bgcolor: theme.palette.mode === 'dark' ? 'background.default' : 'grey.50',
                            borderRadius: '4px',
                            '& .MuiChip-label': {
                              px: 1
                            }
                          }}
                        />
                      </Stack>
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
            background: theme.palette.mode === 'dark' ? 'rgba(0,0,0,0.1)' : 'rgba(0,0,0,0.01)',
            transition: 'all 0.3s ease'
          }}
        >
          <Button
            variant="text"
            color="primary"
            endIcon={<Icon icon="solar:list-bold-duotone" />}
            sx={{
              fontWeight: 500,
              '&:hover': {
                background: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)'
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
