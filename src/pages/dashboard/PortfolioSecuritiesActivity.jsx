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

const PortfolioSecuritiesActivity = ({ isLoading }) => {
  const theme = useTheme();

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
    return category === 'portfolio' ? theme.palette.primary : theme.palette.info;
  };

  if (isLoading) {
    return (
      <MainCard
        title="Portfolio & Securities Management"
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
      title="Portfolio & Securities Management"
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
            const activityColor = getActivityColor(activity.category);
            const iconName = getActivityIcon(activity.category, activity.type);
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
                      color: activityColor.main,
                      bgcolor: activityColor.lighter,
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
                      {activity.activity}
                      <Typography component="span" variant="caption" sx={{ ml: 1 }}>
                        • {activity.time}
                      </Typography>
                    </Typography>
                  }
                  secondary={
                    <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1} mt={0.5}>
                      <Typography variant="caption" color="textSecondary" sx={{ fontWeight: 500 }}>
                        {activity.name}
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
            endIcon={<Icon icon="solar:alt-arrow-right-bold" />}
            sx={{
              fontWeight: 500,
              '&:hover': {
                background: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)'
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
