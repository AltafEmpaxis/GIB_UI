import { useState, useEffect } from 'react';
import {
  Grid,
  Container,
  Box,
  useTheme,
  alpha,
  Typography,
  Tabs,
  Tab,
  IconButton,
  Stack,
  Paper,
  Divider,
  Tooltip,
  Card
} from '@mui/material';
import { Icon } from '@iconify/react';

// Project imports
import MainCard from 'components/MainCard';
import GIBDashboard from './GIBDashboard';
import RecentReconActivity from './RecentReconActivity';
import PortfolioSecuritiesActivity from './PortfolioSecuritiesActivity';
import CorporateActionActivity from './CorporateActionActivity';
import TradesActivity from './TradesActivity';

const Dashboard = () => {
  const theme = useTheme();

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

  return (
    <MainCard>
      {/* Header with Tabs */}
      <Card
        sx={{
          mb: 3,
          overflow: 'hidden'
        }}
        content={false}
      >
        <Box sx={{ px: 3, pt: 2.5, pb: 0 }}>
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            alignItems={{ xs: 'flex-start', sm: 'center' }}
            justifyContent="space-between"
            spacing={2}
            sx={{ mb: 1.5 }}
          >
            <Stack direction="row" alignItems="center" spacing={2}>
              <Box
                sx={{
                  borderRadius: 2,
                  display: 'flex',
                  alignItems: 'center'
                }}
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
                  <Icon icon="fluent-emoji:bank" style={{ marginRight: '10px', fontSize: '28px' }} />
                  GIB SmartOPS
                </Typography>
              </Box>
            </Stack>

            {/* Refresh Button */}
            <Tooltip title="Refresh Dashboard" placement="left">
              <IconButton
                size="medium"
                sx={{
                  bgcolor: alpha(theme.palette.primary.main, 0.12),
                  color: theme.palette.primary.main,
                  borderRadius: 2,
                  '&:hover': {
                    bgcolor: alpha(theme.palette.primary.main, 0.2)
                  },
                  transition: 'all 0.2s ease-in-out',
                  transform: 'translateZ(0)',
                  boxShadow: `0 0 0 1px ${alpha(theme.palette.primary.main, 0.1)}`,
                  backdropFilter: 'blur(4px)'
                }}
              >
                <Icon icon="solar:refresh-bold-duotone" width={22} height={22} />
              </IconButton>
            </Tooltip>
          </Stack>

          {/* Tabs - Enhanced UI */}
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            variant="scrollable"
            scrollButtons="auto"
            aria-label="dashboard tabs"
            sx={{
              '& .MuiTab-root': {
                minHeight: 48,
                color: theme.palette.text.secondary,
                fontWeight: 500,
                fontSize: '0.875rem',
                textTransform: 'none',
                '&.Mui-selected': {
                  color: theme.palette.primary.main,
                  fontWeight: 600
                }
              }
            }}
          >
            <Tab
              label={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Icon icon="solar:home-2-bold-duotone" />
                  <span>Recon Summary</span>
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
      </Card>

      {/* Tab Content */}
      <Box>
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
            <Grid item xs={12} md={6} lg={6}>
              <RecentReconActivity isLoading={isLoading} />
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <TradesActivity isLoading={isLoading} />
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <PortfolioSecuritiesActivity isLoading={isLoading} />
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <CorporateActionActivity isLoading={isLoading} />
            </Grid>
          </Grid>
        )}
      </Box>
    </MainCard>
  );
};

export default Dashboard;
