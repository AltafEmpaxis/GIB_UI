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
import mockData from './dashbord-mockData.json';

const CorporateActionActivity = ({ isLoading }) => {
  const theme = useTheme();

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

  const getStatusColor = (status) => {
    switch (status) {
      case 'new':
        return theme.palette.info;
      case 'processed':
        return theme.palette.success;
      case 'pending':
        return theme.palette.warning;
      case 'rejected':
        return theme.palette.error;
      default:
        return theme.palette.primary;
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
          <Typography variant="h6" fontWeight={600} fontSize="1rem">
            Corporate Actions - Saudi Market
          </Typography>
        }
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
                  px: { xs: 1.5, md: 2 },
                  borderColor: theme.palette.divider
                }}
              >
                <ListItemAvatar sx={{ minWidth: 40, mt: 0 }}>
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
        <Typography variant="h6" fontWeight={600} fontSize="1rem">
          Corporate Actions - Saudi Market
        </Typography>
      }
      secondary={
        <IconButton
          color="primary"
          size="small"
          component={motion.button}
          whileHover={{ rotate: 180, scale: 1.1 }}
          transition={{ duration: 0.3 }}
          sx={{ width: 30, height: 30 }}
        >
          <Icon icon="solar:refresh-bold" width={18} height={18} />
        </IconButton>
      }
      sx={{
        height: '100%',
        boxShadow: theme.palette.mode === 'dark' ? '0 4px 12px rgba(0,0,0,0.1)' : '0 4px 12px rgba(0,0,0,0.05)',
        '& .MuiCardContent-root': { p: 0 }
      }}
    >
      <CardContent>
        <List sx={{ py: 0 }}>
          {activities.map((activity, index) => {
            const statusColor = getStatusColor(activity.status);
            const iconName = getActionIcon(activity.action);
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
                  px: { xs: 1.5, md: 2 },
                  borderColor: theme.palette.divider,
                  '&:hover': {
                    bgcolor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.01)'
                  },
                  cursor: 'pointer'
                }}
              >
                <ListItemAvatar sx={{ minWidth: 40, mt: 0 }}>
                  <Avatar
                    sx={{
                      color: statusColor.main,
                      bgcolor: statusColor.lighter,
                      width: 36,
                      height: 36
                    }}
                  >
                    <Icon icon={iconName} width={18} height={18} />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Typography variant="subtitle1" sx={{ fontSize: '0.875rem' }}>
                      {activity.action}
                      <Typography component="span" variant="caption" sx={{ ml: 1, fontSize: '0.75rem', opacity: 0.7 }}>
                        • {activity.time}
                      </Typography>
                    </Typography>
                  }
                  secondary={
                    <Stack spacing={0.5} mt={0.5}>
                      <Typography
                        variant="caption"
                        color="textSecondary"
                        sx={{ fontWeight: 500, fontSize: '0.75rem', display: 'block' }}
                      >
                        {activity.security}
                      </Typography>
                      <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1}>
                        <Typography variant="caption" color="textSecondary" sx={{ fontSize: '0.75rem' }}>
                          {activity.details}
                        </Typography>
                        <Chip
                          label={activity.user}
                          size="small"
                          sx={{
                            bgcolor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)',
                            borderRadius: '4px',
                            height: 22,
                            fontSize: '0.7rem'
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
            p: { xs: 1.5, md: 2 },
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
            endIcon={<Icon icon="solar:document-bold-duotone" width={16} />}
            sx={{
              fontWeight: 500,
              fontSize: '0.8125rem',
              '&:hover': {
                background: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)'
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
