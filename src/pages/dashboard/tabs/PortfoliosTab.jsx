import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Box, Typography, Button, Chip, Avatar, useMediaQuery } from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';
import { motion } from 'framer-motion';
import { Icon } from '@iconify/react';

// project imports
import MainCard from 'components/MainCard';

// Portfolio cards component
const PortfolioCard = ({ portfolio, isLoading }) => {
  const theme = useTheme();

  return (
    <MainCard
      sx={{
        height: '100%',
        boxShadow: theme.palette.mode === 'dark' ? '0 4px 12px rgba(0,0,0,0.1)' : '0 4px 12px rgba(0,0,0,0.05)',
        p: 0,
        overflow: 'hidden',
        position: 'relative',
        '&:hover': {
          boxShadow: '0 6px 16px rgba(0,0,0,0.12)',
          '& .portfolio-action': {
            opacity: 1,
            transform: 'translateY(0)'
          }
        }
      }}
    >
      {/* Color indicator based on performance */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: 4,
          bgcolor: portfolio.performanceColor
        }}
      />

      <Box sx={{ p: { xs: 1.5, md: 2 } }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1.5 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Avatar
              sx={{
                bgcolor: alpha(portfolio.bgColor, 0.2),
                color: portfolio.bgColor,
                width: 36,
                height: 36,
                mr: 1.5
              }}
            >
              <Icon icon={portfolio.icon} width={20} />
            </Avatar>
            <Typography variant="h6" sx={{ fontWeight: 600, fontSize: '1rem' }}>
              {portfolio.name}
            </Typography>
          </Box>
          <Chip
            label={portfolio.type}
            size="small"
            sx={{
              bgcolor: alpha(theme.palette.primary.main, 0.1),
              color: theme.palette.primary.main,
              fontSize: '0.7rem',
              fontWeight: 500,
              height: 22
            }}
          />
        </Box>

        <Grid container spacing={1} sx={{ mb: 1.5 }}>
          <Grid item xs={6}>
            <Typography variant="caption" color="textSecondary" sx={{ fontSize: '0.75rem' }}>
              Asset Value
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: 600, fontSize: '0.9rem' }}>
              {portfolio.value}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="caption" color="textSecondary" sx={{ fontSize: '0.75rem' }}>
              Return
            </Typography>
            <Typography
              variant="body1"
              sx={{
                fontWeight: 600,
                fontSize: '0.9rem',
                color: portfolio.isPositive ? theme.palette.success.main : theme.palette.error.main,
                display: 'flex',
                alignItems: 'center'
              }}
            >
              <Icon
                icon={portfolio.isPositive ? 'solar:arrow-up-bold-duotone' : 'solar:arrow-down-bold-duotone'}
                width={14}
                style={{ marginRight: theme.spacing(0.5) }}
              />
              {portfolio.return}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="caption" color="textSecondary" sx={{ fontSize: '0.75rem' }}>
              Holdings
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: 600, fontSize: '0.9rem' }}>
              {portfolio.holdings}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="caption" color="textSecondary" sx={{ fontSize: '0.75rem' }}>
              Last Updated
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: 600, fontSize: '0.9rem' }}>
              {portfolio.lastUpdated}
            </Typography>
          </Grid>
        </Grid>

        <Box
          className="portfolio-action"
          sx={{
            mt: 1.5,
            opacity: 0,
            transform: 'translateY(10px)',
            transition: 'all 0.3s ease',
            display: 'flex',
            justifyContent: 'space-between'
          }}
        >
          <Button
            variant="text"
            size="small"
            startIcon={<Icon icon="solar:eye-bold-duotone" width={16} />}
            sx={{ fontSize: '0.75rem', fontWeight: 500 }}
          >
            View Details
          </Button>
          <Button
            variant="text"
            size="small"
            startIcon={<Icon icon="solar:pen-bold-duotone" width={16} />}
            sx={{ fontSize: '0.75rem', fontWeight: 500 }}
          >
            Edit
          </Button>
        </Box>
      </Box>
    </MainCard>
  );
};

PortfolioCard.propTypes = {
  portfolio: PropTypes.object.isRequired,
  isLoading: PropTypes.bool
};

// PortfoliosTab component
const PortfoliosTab = ({ isLoading }) => {
  const theme = useTheme();
  const matchDownMD = useMediaQuery(theme.breakpoints.down('lg'));

  // Sample portfolio data
  const portfolios = [
    {
      id: 1,
      name: 'Saudi Equity Fund',
      type: 'Shariah Compliant',
      value: 'SAR 245.6M',
      return: '+8.2%',
      isPositive: true,
      holdings: '42 Securities',
      lastUpdated: 'Today',
      icon: 'solar:folder-bold-duotone',
      bgColor: theme.palette.primary.main,
      performanceColor: theme.palette.success.main
    },
    {
      id: 2,
      name: 'GCC Fixed Income',
      type: 'Sukuk',
      value: 'SAR 128.3M',
      return: '+3.5%',
      isPositive: true,
      holdings: '27 Securities',
      lastUpdated: 'Yesterday',
      icon: 'solar:document-text-bold-duotone',
      bgColor: theme.palette.warning.main,
      performanceColor: theme.palette.success.main
    },
    {
      id: 3,
      name: 'Saudi Real Estate',
      type: 'Alternative',
      value: 'SAR 87.4M',
      return: '-1.2%',
      isPositive: false,
      holdings: '15 Properties',
      lastUpdated: '2 days ago',
      icon: 'solar:buildings-bold-duotone',
      bgColor: theme.palette.error.main,
      performanceColor: theme.palette.error.main
    },
    {
      id: 4,
      name: 'Saudi Money Market',
      type: 'Capital Protected',
      value: 'SAR 156.2M',
      return: '+2.1%',
      isPositive: true,
      holdings: '31 Securities',
      lastUpdated: 'Today',
      icon: 'solar:dollar-minimalistic-bold-duotone',
      bgColor: theme.palette.success.main,
      performanceColor: theme.palette.success.main
    },
    {
      id: 5,
      name: 'MENA Technology',
      type: 'Growth',
      value: 'SAR 62.8M',
      return: '+12.4%',
      isPositive: true,
      holdings: '18 Securities',
      lastUpdated: 'Yesterday',
      icon: 'solar:chip-bold-duotone',
      bgColor: theme.palette.info.main,
      performanceColor: theme.palette.success.main
    },
    {
      id: 6,
      name: 'Islamic ETF',
      type: 'Shariah Compliant',
      value: 'SAR 93.5M',
      return: '-0.7%',
      isPositive: false,
      holdings: '8 ETFs',
      lastUpdated: '3 days ago',
      icon: 'solar:graph-bold-duotone',
      bgColor: theme.palette.secondary.main,
      performanceColor: theme.palette.warning.main
    }
  ];

  const itemVariant = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15
      }
    }
  };

  return (
    <Box>
      {/* Tab Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1.5 }}>
        <Typography variant="h5" sx={{ fontWeight: 600, fontSize: '1.1rem' }}>
          Investment Portfolios
        </Typography>
        <Button
          variant="contained"
          size="small"
          startIcon={<Icon icon="solar:add-circle-bold-duotone" width={18} />}
          sx={{
            backgroundColor: theme.palette.primary.main,
            px: 1.5,
            py: 0.75,
            fontSize: '0.8125rem'
          }}
        >
          New Portfolio
        </Button>
      </Box>

      {/* Filter/Search Area */}
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 1,
          mb: 2,
          p: 1.5,
          borderRadius: 1,
          bgcolor: alpha(theme.palette.primary.main, 0.05)
        }}
      >
        <Chip label="All Portfolios" variant="filled" size="small" color="primary" sx={{ fontSize: '0.75rem' }} />
        <Chip label="Shariah Compliant" variant="outlined" size="small" sx={{ fontSize: '0.75rem' }} />
        <Chip label="Sukuk" variant="outlined" size="small" sx={{ fontSize: '0.75rem' }} />
        <Chip label="Alternative" variant="outlined" size="small" sx={{ fontSize: '0.75rem' }} />
        <Chip label="Growth" variant="outlined" size="small" sx={{ fontSize: '0.75rem' }} />
      </Box>

      {/* Portfolios Grid */}
      <Grid container spacing={matchDownMD ? 1 : 1.5}>
        {portfolios.map((portfolio, index) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            key={portfolio.id}
            component={motion.div}
            variants={itemVariant}
            initial="hidden"
            animate="visible"
            transition={{ delay: index * 0.1 }}
          >
            <PortfolioCard portfolio={portfolio} isLoading={isLoading} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

PortfoliosTab.propTypes = {
  isLoading: PropTypes.bool
};

export default PortfoliosTab;
