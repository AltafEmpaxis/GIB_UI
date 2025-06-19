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
    <Card sx={{ p: 1, borderRadius: 2 }}>
      <Container maxWidth={false}>
        <Box sx={{ pt: 2, pb: 3 }}>
          {/* Header with Tabs */}
          <Paper elevation={0}>
            <Box>
              <Stack
                direction={{ xs: 'column', sm: 'row' }}
                alignItems={{ xs: 'flex-start', sm: 'center' }}
                justifyContent="space-between"
                spacing={2}
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
          </Box>
        </Box>
      </Container>
    </Card>
  );
};

export default Dashboard;
