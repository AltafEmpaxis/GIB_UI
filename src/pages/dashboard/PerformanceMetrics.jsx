import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Box, Typography, Skeleton } from '@mui/material';
import { styled, alpha, useTheme } from '@mui/material/styles';
import { motion } from 'framer-motion';
import { Icon } from '@iconify/react';

// project imports
import MainCard from 'components/MainCard';

// styled components
const MetricCard = styled(Box)(({ theme, color }) => ({
  padding: theme.spacing(3),
  borderRadius: theme.spacing(2),
  background: color ? alpha(theme.palette[color].main, 0.15) : alpha(theme.palette.primary.main, 0.15),
  position: 'relative',
  overflow: 'hidden',
  height: '100%',
  transition: 'transform 0.3s, box-shadow 0.3s',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: `0 10px 20px ${alpha(theme.palette.common.black, 0.1)}`
  },
  '&::before': {
    content: '""',
    position: 'absolute',
    width: 210,
    height: 210,
    background: color
      ? `linear-gradient(140.9deg, ${alpha(theme.palette[color].dark, 0.2)} 0%, ${alpha(theme.palette[color].main, 0)} 50%)`
      : `linear-gradient(140.9deg, ${alpha(theme.palette.primary.dark, 0.2)} 0%, ${alpha(theme.palette.primary.main, 0)} 50%)`,
    borderRadius: '50%',
    top: -85,
    right: -95
  }
}));

const ValueNumber = styled(Typography)(({ theme }) => ({
  fontSize: '2rem',
  fontWeight: 600,
  lineHeight: 1.25
}));

const PerformanceMetrics = ({ isLoading }) => {
  const theme = useTheme();

  const metrics = [
    {
      title: 'Total Assets',
      value: 'SAR 1.45B',
      change: '+2.5%',
      isPositive: true,
      color: 'primary',
      icon: 'solar:wallet-money-bold-duotone'
    },
    {
      title: 'Daily Trades',
      value: '243',
      change: '+12%',
      isPositive: true,
      color: 'success',
      icon: 'solar:chart-bold-duotone'
    },
    {
      title: 'Reconciliation Rate',
      value: '98.7%',
      change: '+0.6%',
      isPositive: true,
      color: 'info',
      icon: 'solar:check-square-bold-duotone'
    },
    {
      title: 'Pending Actions',
      value: '27',
      change: '-5%',
      isPositive: false,
      color: 'warning',
      icon: 'solar:clock-circle-bold-duotone'
    }
  ];

  if (isLoading) {
    return (
      <Grid container spacing={3}>
        {[1, 2, 3, 4].map((item) => (
          <Grid item xs={12} sm={6} md={3} key={item}>
            <Box
              sx={{
                p: 3,
                bgcolor: 'background.paper',
                borderRadius: 2,
                boxShadow: theme.palette.mode === 'dark' ? '0 4px 20px rgba(0,0,0,0.1)' : '0 4px 20px rgba(0,0,0,0.05)'
              }}
            >
              <Skeleton variant="text" height={24} width="60%" />
              <Skeleton variant="text" height={40} width="40%" sx={{ mt: 1.5 }} />
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1.5, alignItems: 'center' }}>
                <Skeleton variant="text" height={20} width="30%" />
                <Skeleton variant="circular" height={40} width={40} />
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
    );
  }

  return (
    <Grid container spacing={1}>
      {metrics.map((metric, index) => (
        <Grid
          key={index}
          item
          xs={12}
          sm={6}
          md={3}
          component={motion.div}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <MetricCard
            color={metric.color}
            sx={{
              boxShadow: theme.palette.mode === 'dark' ? '0 4px 20px rgba(0,0,0,0.1)' : '0 4px 20px rgba(0,0,0,0.05)'
            }}
          >
            <Typography
              variant="h6"
              color="textSecondary"
              sx={{
                mb: 1.5,
                fontSize: '0.875rem',
                fontWeight: 500
              }}
            >
              {metric.title}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Box>
                <ValueNumber
                  color="textPrimary"
                  sx={{
                    fontSize: { xs: '1.5rem', md: '2rem' }
                  }}
                >
                  {metric.value}
                </ValueNumber>
                <Typography
                  variant="body2"
                  color={metric.isPositive ? 'success.main' : 'error.main'}
                  display="inline-flex"
                  alignItems="center"
                  sx={{ mt: 0.75, fontSize: '0.8125rem' }}
                >
                  <Icon
                    icon={metric.isPositive ? 'solar:arrow-up-bold-duotone' : 'solar:arrow-down-bold-duotone'}
                    width={16}
                    height={16}
                    style={{ marginRight: theme.spacing(0.5), verticalAlign: 'text-bottom' }}
                  />
                  {metric.change} from last month
                </Typography>
              </Box>
              <Box
                sx={{
                  width: 54,
                  height: 54,
                  borderRadius: '50%',
                  bgcolor: alpha(theme.palette[metric.color].main, 0.2),
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: `0 8px 16px ${alpha(theme.palette[metric.color].main, 0.2)}`
                }}
              >
                <Icon icon={metric.icon} color={theme.palette[metric.color].main} width={28} height={28} />
              </Box>
            </Box>
          </MetricCard>
        </Grid>
      ))}
    </Grid>
  );
};

PerformanceMetrics.propTypes = {
  isLoading: PropTypes.bool
};

export default PerformanceMetrics;
