import React from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Chip,
  Skeleton,
  Divider,
  IconButton,
  Button
} from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';
import { Icon } from '@iconify/react';
import { motion } from 'framer-motion';

// project import
import MainCard from 'components/MainCard';

// ==============================|| KEY ACCOUNTS WIDGET ||============================== //

const KeyAccountsWidget = ({ isLoading }) => {
  const theme = useTheme();

  const accounts = [
    {
      id: '1',
      name: 'Saudi Aramco',
      type: 'Corporate',
      avatar: 'A',
      avatarColor: 'success',
      amount: 'SAR 245.6M',
      trend: '+3.2%',
      isPositive: true,
      tag: 'Premium'
    },
    {
      id: '2',
      name: 'SABIC',
      type: 'Institutional',
      avatar: 'S',
      avatarColor: 'primary',
      amount: 'SAR 158.3M',
      trend: '+1.8%',
      isPositive: true,
      tag: 'VIP'
    },
    {
      id: '3',
      name: 'Al Rajhi Bank',
      type: 'Banking',
      avatar: 'R',
      avatarColor: 'warning',
      amount: 'SAR 97.4M',
      trend: '-0.5%',
      isPositive: false,
      tag: 'Key'
    },
    {
      id: '4',
      name: 'Saudi Telecom Company',
      type: 'Corporate',
      avatar: 'S',
      avatarColor: 'error',
      amount: 'SAR 83.9M',
      trend: '+2.1%',
      isPositive: true,
      tag: 'Premium'
    }
  ];

  if (isLoading) {
    return (
      <MainCard
        title={<Skeleton variant="text" width={140} height={20} />}
        secondary={<Skeleton variant="circular" width={24} height={24} />}
        sx={{
          height: '100%',
          '& .MuiCardContent-root': { p: { xs: 1.5, md: 2 } }
        }}
      >
        <List sx={{ py: 0 }}>
          {[1, 2, 3, 4].map((item) => (
            <React.Fragment key={item}>
              <ListItem
                sx={{
                  py: 1.5,
                  px: { xs: 0, md: 0.5 }
                }}
                secondaryAction={<Skeleton variant="text" width={50} />}
              >
                <ListItemAvatar>
                  <Skeleton variant="circular" width={40} height={40} />
                </ListItemAvatar>
                <ListItemText
                  primary={<Skeleton variant="text" width={120} />}
                  secondary={<Skeleton variant="text" width={60} />}
                />
              </ListItem>
              {item !== 4 && <Divider sx={{ opacity: 0.5 }} />}
            </React.Fragment>
          ))}
        </List>
      </MainCard>
    );
  }

  return (
    <MainCard
      contentSX={{ px: '0.5rem !important', py: '0 !important' }}
      title={
        <Typography variant="h6" sx={{ fontSize: '1rem', fontWeight: 600 }}>
          Key Client Accounts
        </Typography>
      }
      secondary={
        <IconButton
          size="small"
          sx={{
            width: 28,
            height: 28,
            color: theme.palette.primary.main
          }}
        >
          <Icon icon="solar:star-line-duotone" width={18} />
        </IconButton>
      }
      sx={{
        height: '100%',
        '& .MuiCardContent-root': { p: { xs: 1.5, md: 2 } }
      }}
    >
      <List sx={{ py: 0 }}>
        {accounts.map((account, index) => (
          <Box
            component={motion.div}
            key={account.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <ListItem
              sx={{
                py: 1.5,
                px: 0.5,
                borderRadius: 1,
                transition: 'all 0.2s',
                '&:hover': { bgcolor: alpha(theme.palette.primary.main, 0.08) }
              }}
              secondaryAction={
                <Box sx={{ textAlign: 'right' }}>
                  <Typography
                    variant="subtitle1"
                    sx={{
                      fontWeight: 600,
                      mb: 0.5,
                      fontSize: '0.9rem'
                    }}
                  >
                    {account.amount}
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{
                      color: account.isPositive ? theme.palette.success.main : theme.palette.error.main,
                      display: 'inline-flex',
                      alignItems: 'center',
                      fontSize: '0.75rem'
                    }}
                  >
                    <Icon
                      icon={account.isPositive ? 'solar:arrow-up-bold-duotone' : 'solar:arrow-down-bold-duotone'}
                      width={14}
                      style={{ marginRight: theme.spacing(0.5) }}
                    />
                    {account.trend}
                  </Typography>
                </Box>
              }
            >
              <ListItemAvatar>
                <Avatar
                  sx={{
                    bgcolor: theme.palette[account.avatarColor].main,
                    boxShadow: `0 4px 10px ${alpha(theme.palette[account.avatarColor].main, 0.4)}`,
                    width: 36,
                    height: 36,
                    fontSize: '1rem'
                  }}
                >
                  {account.avatar}
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography
                      variant="subtitle1"
                      sx={{
                        fontWeight: 600,
                        fontSize: '0.875rem'
                      }}
                    >
                      {account.name}
                    </Typography>
                    <Chip
                      label={account.tag}
                      size="small"
                      sx={{
                        ml: 1,
                        fontSize: '0.65rem',
                        height: 20,
                        bgcolor: alpha(theme.palette.primary.main, 0.1),
                        color: theme.palette.primary.main,
                        fontWeight: 500
                      }}
                    />
                  </Box>
                }
                secondary={
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    sx={{
                      fontSize: '0.75rem'
                    }}
                  >
                    {account.type}
                  </Typography>
                }
              />
            </ListItem>
            {index !== accounts.length - 1 && <Divider sx={{ opacity: 0.5 }} />}
          </Box>
        ))}
      </List>

      <Box
        sx={{
          mt: 2,
          display: 'flex',
          justifyContent: 'center'
        }}
      >
        <Button
          variant="text"
          color="primary"
          endIcon={<Icon icon="solar:alt-arrow-right-line-duotone" width={16} />}
          sx={{
            fontWeight: 500,
            fontSize: '0.8125rem',
            '&:hover': {
              backgroundColor: alpha(theme.palette.primary.main, 0.08)
            }
          }}
        >
          View All Client Accounts
        </Button>
      </Box>
    </MainCard>
  );
};

KeyAccountsWidget.propTypes = {
  isLoading: PropTypes.bool
};

export default KeyAccountsWidget;
