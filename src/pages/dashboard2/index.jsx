import { useState, useEffect } from 'react';
import {
  Grid,
  Container,
  Box,
  useTheme,
  useMediaQuery,
  alpha,
  Typography,
  Card,
  CardContent,
  Tabs,
  Tab,
  IconButton,
  Stack,
  Paper,
  Divider,
  Tooltip
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { Icon } from '@iconify/react';

// Project imports
import GIBDashboard from './GIBDashboard';
import RecentReconActivity from './RecentReconActivity';
import PortfolioSecuritiesActivity from './PortfolioSecuritiesActivity';
import CorporateActionActivity from './CorporateActionActivity';
import TradesActivity from './TradesActivity';

const Dashboard = () => {
  const theme = useTheme();
  const isExtraLargeScreen = useMediaQuery(theme.breakpoints.up('xl'));
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('lg'));
  const isMediumScreen = useMediaQuery(theme.breakpoints.up('md'));
  const [isLoading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const containerVariant = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
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

  const tabContentVariant = {
    hidden: { opacity: 0, x: 20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3,
        ease: 'easeOut'
      }
    },
    exit: {
      opacity: 0,
      x: -20,
      transition: {
        duration: 0.2
      }
    }
  };

  return (
    <Container maxWidth={false}>
      <Box sx={{ pt: 2, pb: 3 }}>
        <motion.div variants={containerVariant} initial="hidden" animate="visible">
          {/* Header with Tabs */}
          <Paper
            elevation={0}
            component={motion.div}
            variants={itemVariant}
            sx={{
              mb: 3,
              borderRadius: 3,
              boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
              overflow: 'hidden',
              border: '1px solid',
              borderColor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(230,230,230,0.8)'
            }}
          >
            <Box sx={{ p: { xs: 2, md: 3 } }}>
              <Stack
                direction={{ xs: 'column', sm: 'row' }}
                alignItems={{ xs: 'flex-start', sm: 'center' }}
                justifyContent="space-between"
                spacing={2}
                sx={{ mb: 2 }}
              >
                <Stack direction="row" alignItems="center" spacing={2}>
                  <Box
                    sx={{
                      p: 1,
                      px: 2,
                      borderRadius: 2,
                      bgcolor: alpha(theme.palette.primary.main, 0.08),
                      display: 'flex',
                      alignItems: 'center'
                    }}
                    component={motion.div}
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: 'spring', stiffness: 400 }}
                  >
                    <Typography
                      variant="h5"
                      sx={{
                        fontWeight: 700,
                        color: theme.palette.primary.main,
                        display: 'flex',
                        alignItems: 'center'
                      }}
                    >
                      <Icon icon="fluent-emoji:bank" style={{ marginRight: '8px', fontSize: '28px' }} />
                      GIB SmartOPS
                    </Typography>
                  </Box>
                </Stack>

                {/* Refresh Button Only */}
                <Tooltip title="Refresh">
                  <IconButton
                    size="medium"
                    sx={{
                      bgcolor: alpha(theme.palette.primary.main, 0.12),
                      color: theme.palette.primary.main,
                      borderRadius: 2,
                      '&:hover': {
                        bgcolor: alpha(theme.palette.primary.main, 0.2)
                      }
                    }}
                    component={motion.button}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Icon icon="solar:refresh-bold-duotone" width={24} height={24} />
                  </IconButton>
                </Tooltip>
              </Stack>

              {/* Tabs - Keeping only Overview and Activity */}
              <Tabs
                value={activeTab}
                onChange={handleTabChange}
                variant="scrollable"
                scrollButtons="auto"
                aria-label="dashboard tabs"
                sx={{
                  minHeight: 54,
                  '& .MuiTabs-indicator': {
                    backgroundColor: theme.palette.primary.main,
                    height: 3,
                    borderTopLeftRadius: 3,
                    borderTopRightRadius: 3
                  },
                  '& .MuiTab-root': {
                    minHeight: 54,
                    color: theme.palette.mode === 'dark' ? theme.palette.grey[500] : theme.palette.grey[700]
                  },
                  '& .Mui-selected': {
                    color: theme.palette.primary.main,
                    fontWeight: 600
                  }
                }}
              >
                <Tab
                  label={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Icon icon="solar:home-2-bold-duotone" />
                      <span>Overview</span>
                    </Box>
                  }
                />
                <Tab
                  label={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Icon icon="solar:folder-check-bold-duotone" />
                      <span>Activity</span>
                    </Box>
                  }
                />
              </Tabs>
            </Box>
          </Paper>

          {/* Tab Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={tabContentVariant}
              style={{ width: '100%' }}
            >
              {activeTab === 0 && (
                <Grid container spacing={3}>
                  {/* Main Dashboard */}
                  <Grid item xs={12}>
                    <GIBDashboard isLoading={isLoading} />
                  </Grid>
                </Grid>
              )}

              {activeTab === 1 && (
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <RecentReconActivity isLoading={isLoading} />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TradesActivity isLoading={isLoading} />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <PortfolioSecuritiesActivity isLoading={isLoading} />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <CorporateActionActivity isLoading={isLoading} />
                  </Grid>
                </Grid>
              )}
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </Box>
    </Container>
  );
};

export default Dashboard;
