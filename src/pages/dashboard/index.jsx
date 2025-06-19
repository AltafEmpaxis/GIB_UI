import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

// material-ui
import { Grid, Box, useMediaQuery, Typography, Tabs, Tab, Divider, IconButton, Button } from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';
import { Icon } from '@iconify/react';

// project imports
import MainCard from 'components/MainCard';
import { GRID_SPACING } from 'config';
import WelcomeCard from './WelcomeCard';
import RecentActivity from './RecentActivity';
import PerformanceMetrics from './PerformanceMetrics';
import PortfolioDistribution from './PortfolioDistribution';
import TradingVolumeChart from './TradingVolumeChart';
import MarketOverview from './MarketOverview';
import KeyAccountsWidget from './KeyAccountsWidget';
import QuickTasksWidget from './QuickTasksWidget';

// Tab content components
import PortfoliosTab from './tabs/PortfoliosTab';
import TradesTab from './tabs/TradesTab';
import ReportsTab from './tabs/ReportsTab';

const Dashboard = () => {
  const theme = useTheme();
  const matchDownMD = useMediaQuery(theme.breakpoints.down('lg'));
  const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
  const [isLoading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    // Simulate API loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleChangeTab = (event, newValue) => {
    setActiveTab(newValue);
  };

  const containerVariant = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08
      }
    }
  };

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
      {/* Dashboard Header */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: matchDownSM ? 'column' : 'row',
          alignItems: matchDownSM ? 'flex-start' : 'center',
          justifyContent: 'space-between',
          mb: 1.5
        }}
      >
        <Box>
          <Typography
            variant="h3"
            sx={{
              fontWeight: 700,
              color: theme.palette.mode === 'dark' ? 'text.primary' : 'primary.dark',
              mb: 0.5
            }}
          >
            GIB Investment Dashboard
          </Typography>
          <Typography variant="body1" color="textSecondary">
            {new Date().toLocaleDateString('en-SA', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', mt: matchDownSM ? 1 : 0 }}>
          <Button
            variant="contained"
            startIcon={<Icon icon="solar:add-circle-bold-duotone" />}
            sx={{
              mr: 2,
              backgroundColor: theme.palette.primary.main,
              px: 2,
              py: 1
            }}
          >
            New Trade
          </Button>

          <IconButton
            sx={{
              mr: 1.5,
              width: 40,
              height: 40,
              background: alpha(theme.palette.primary.main, 0.1),
              '&:hover': {
                background: alpha(theme.palette.primary.main, 0.2)
              }
            }}
          >
            <Icon icon="solar:calendar-mark-bold-duotone" width={22} height={22} />
          </IconButton>

          <IconButton
            sx={{
              width: 40,
              height: 40,
              background: alpha(theme.palette.primary.main, 0.1),
              '&:hover': {
                background: alpha(theme.palette.primary.main, 0.2)
              }
            }}
          >
            <Icon icon="solar:settings-bold-duotone" width={22} height={22} />
          </IconButton>
        </Box>
      </Box>

      {/* Main Dashboard Content */}
      <Box
        component={motion.div}
        variants={containerVariant}
        initial="hidden"
        animate="visible"
        sx={{
          background: alpha(theme.palette.background.paper, theme.palette.mode === 'dark' ? 0.8 : 1),
          borderRadius: 3,
          boxShadow: theme.palette.mode === 'dark' ? '0 8px 40px rgba(0,0,0,0.1)' : '0 4px 20px rgba(0,0,0,0.08)',
          overflow: 'hidden'
        }}
      >
        {/* Welcome Card - Top Section */}
        <Box component={motion.div} variants={itemVariant} sx={{ m: 1 }}>
          <WelcomeCard isLoading={isLoading} />
        </Box>

        {/* Dashboard Tabs */}
        <Box sx={{ borderBottom: 1, borderColor: 'divider', px: { xs: 1, md: 1.5 }, mb: 0 }}>
          <Tabs
            value={activeTab}
            onChange={handleChangeTab}
            variant="scrollable"
            scrollButtons="auto"
            aria-label="dashboard tabs"
            sx={{
              '& .MuiTab-root': {
                py: 2,
                px: { xs: 1, md: 1.5 },
                fontSize: '0.875rem',
                fontWeight: 500,
                minHeight: 48
              }
            }}
          >
            <Tab label="Overview" icon={<Icon icon="solar:home-bold-duotone" />} iconPosition="start" />
            <Tab label="Portfolios" icon={<Icon icon="solar:folder-bold-duotone" />} iconPosition="start" />
            <Tab label="Trades" icon={<Icon icon="solar:document-add-bold-duotone" />} iconPosition="start" />
            <Tab label="Reports" icon={<Icon icon="solar:chart-bold-duotone" />} iconPosition="start" />
          </Tabs>
        </Box>

        {/* Tab Content */}
        <Box sx={{ p: { xs: 1, md: 1.5 } }}>
          {/* Overview Tab */}
          {activeTab === 0 && (
            <Grid container spacing={matchDownMD ? 1 : 1.5}>
              {/* Performance Metrics */}
              <Grid item xs={12} component={motion.div} variants={itemVariant}>
                <PerformanceMetrics isLoading={isLoading} />
              </Grid>

              {/* Main Content - Two Column Layout */}
              <Grid container item spacing={matchDownMD ? 1 : 1.5} xs={12}>
                {/* Left Column - 8 units wide */}
                <Grid item xs={12} lg={8} container spacing={matchDownMD ? 1 : 1.5}>
                  <Grid item xs={12} component={motion.div} variants={itemVariant}>
                    <TradingVolumeChart isLoading={isLoading} />
                  </Grid>

                  <Grid item xs={12} component={motion.div} variants={itemVariant}>
                    <MarketOverview isLoading={isLoading} />
                  </Grid>

                  {/* Recent Activity */}
                  <Grid item xs={12} component={motion.div} variants={itemVariant}>
                    <RecentActivity />
                  </Grid>
                </Grid>

                {/* Right Column - 4 units wide */}
                <Grid item xs={12} lg={4} container spacing={matchDownMD ? 1 : 1.5}>
                  <Grid item xs={12} component={motion.div} variants={itemVariant}>
                    <PortfolioDistribution isLoading={isLoading} />
                  </Grid>

                  <Grid item xs={12} component={motion.div} variants={itemVariant}>
                    <KeyAccountsWidget isLoading={isLoading} />
                  </Grid>

                  <Grid item xs={12} component={motion.div} variants={itemVariant}>
                    <QuickTasksWidget isLoading={isLoading} />
                  </Grid>

                  {/* This grid item is no longer needed as all activities are in the RecentActivity component */}
                </Grid>
              </Grid>
            </Grid>
          )}

          {/* Portfolios Tab */}
          {/* {activeTab === 1 && <PortfoliosTab isLoading={isLoading} />}

          {/* Trades Tab */}
          {/* {activeTab === 2 && <TradesTab isLoading={isLoading} />} */}

          {/* Reports Tab */}
          {/* {activeTab === 3 && <ReportsTab isLoading={isLoading} />} */}
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
