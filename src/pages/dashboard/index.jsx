// material-ui
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import Switch from '@mui/material/Switch';
import Typography from '@mui/material/Typography';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

// project import
import Analytics from 'components/cards/statistics/Analytics';
import MainCard from 'components/MainCard';
import useAuth from 'hooks/useAuth';
import axios, { endpoints } from 'utils/axios';
import { fNumber, fRoundPercent } from 'utils/formatNumber';
import { analyticsSummaryData } from './mockData';

// dashboard components
import FullMatchPercentageOverview from './FullMatchPercentageOverview';
import FullMatchTrend from './FullMatchTrend';
import IssuesSummaryTable from './IssuesSummaryTable';
import WelcomeCard from './WelcomeCard';

// ==============================|| DASHBOARD - DEFAULT ||============================== //

export default function DashboardDefault() {
  const [showHistorical, setShowHistorical] = useState(false);
  const { user } = useAuth();

  const {
    data: apiData,
    isLoading,
    error,
    refetch,
    isFetching
  } = useQuery({
    queryKey: ['reconCounts', showHistorical, user?.user_id],
    queryFn: async () => {
      const response = await axios.get(endpoints.getReconCounts, {
        params: {
          userId: user?.user_id,
          historical: showHistorical
        }
      });
      return response.data;
    },
    retry: 2,
    retryDelay: 3000,
    onError: (err) => {
      console.error('Failed to fetch reconciliation statistics:', err);
    }
  });

  const handleHistoricalToggle = (e) => {
    setShowHistorical(e.target.checked);
  };

  if (isLoading) {
    return (
      <Grid container spacing={1}>
        {/* Header - Always shown */}
        <Grid item xs={12}>
          <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 0.5 }}>
            <Typography variant="h3">Reconciliation Summary</Typography>
            <FormControlLabel
              control={<Switch checked={showHistorical} onChange={handleHistoricalToggle} disabled={true} />}
              label={showHistorical ? 'Historical Data' : 'Current Data'}
            />
          </Stack>
          <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
            {showHistorical ? 'Historical Overview' : 'Current Overview'} - {new Date().toLocaleString()}
          </Typography>
        </Grid>

        {/* Welcome Card - Always shown */}
        <Grid item xs={12}>
          <WelcomeCard />
        </Grid>

        {/* Analytics Cards Skeleton */}
        <Grid item xs={12}>
          <Grid container spacing={1}>
            {[1, 2, 3, 4, 5].map((item) => (
              <Grid item xs={12} sm={6} md={4} lg={2.4} key={item}>
                <MainCard contentSX={{ p: 1.5 }}>
                  <Stack spacing={0.5}>
                    <Skeleton variant="text" width={80} height={16} />
                    <Skeleton variant="text" width={50} height={32} />
                    <Skeleton variant="text" width={120} height={16} />
                  </Stack>
                </MainCard>
              </Grid>
            ))}
          </Grid>
        </Grid>

        {/* Charts and Tables Skeleton */}
        <Grid item xs={12}>
          <Grid container spacing={1}>
            {/* Main Chart Skeleton */}
            <Grid item xs={12} md={8}>
              <MainCard contentSX={{ p: 1.5, pb: 1 }}>
                <Skeleton variant="text" width={200} height={24} sx={{ mb: 1.5 }} />
                <Skeleton variant="rectangular" height={320} sx={{ borderRadius: 1 }} />
              </MainCard>
            </Grid>
            {/* Overview Box Skeleton */}
            <Grid item xs={12} md={4}>
              <MainCard contentSX={{ p: 1.5, height: '100%' }}>
                <Skeleton variant="text" width={150} height={24} sx={{ mb: 1.5 }} />
                <Stack spacing={2} sx={{ height: '100%', justifyContent: 'center' }}>
                  <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Stack spacing={0.5}>
                      <Skeleton variant="text" width={60} height={20} />
                      <Skeleton variant="text" width={45} height={32} />
                    </Stack>
                    <Stack spacing={0.5}>
                      <Skeleton variant="text" width={60} height={20} />
                      <Skeleton variant="text" width={45} height={32} />
                    </Stack>
                  </Stack>
                  <Skeleton variant="rectangular" height={200} sx={{ borderRadius: 1 }} />
                </Stack>
              </MainCard>
            </Grid>
            {/* Bottom Charts Skeleton */}
            <Grid item xs={12} md={6}>
              <MainCard contentSX={{ p: 1.5, pb: 1 }}>
                <Skeleton variant="text" width={180} height={24} sx={{ mb: 1.5 }} />
                <Skeleton variant="rectangular" height={250} sx={{ borderRadius: 1 }} />
              </MainCard>
            </Grid>
            <Grid item xs={12} md={6}>
              <MainCard contentSX={{ p: 1.5, pb: 1 }}>
                <Skeleton variant="text" width={180} height={24} sx={{ mb: 1.5 }} />
                <Skeleton variant="rectangular" height={250} sx={{ borderRadius: 1 }} />
              </MainCard>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }

  if (error) {
    return (
      <Box sx={{ width: '100%', p: 2 }}>
        <Alert
          severity="error"
          sx={{ mb: 2 }}
          action={
            <Button color="inherit" size="small" onClick={refetch}>
              Try Again
            </Button>
          }
        >
          {error?.response?.data?.message || error?.message || 'Failed to fetch dashboard data'}
        </Alert>
      </Box>
    );
  }

  if (!apiData) {
    return (
      <Alert
        severity="warning"
        sx={{ mb: 2 }}
        action={
          <Button color="inherit" size="small" onClick={refetch}>
            Retry
          </Button>
        }
      >
        No data available. Please try again later.
      </Alert>
    );
  }

  const mockStats = showHistorical ? analyticsSummaryData.historical : analyticsSummaryData.current;

  // Calculate percentages from API data
  const fullMatchPercent = Math.round((apiData.fullMatch / apiData.total) * 10000) / 100;
  const tolerancePercent = Math.round((apiData.tolerance / apiData.total) * 10000) / 100;
  const nearMatchPercent = Math.round((apiData.nearMatch / apiData.total) * 10000) / 100;
  const missingPercent = Math.round((apiData.totalMissing / apiData.total) * 10000) / 100;
  const skippedPercent = Math.round((apiData.skipped / apiData.total) * 10000) / 100;

  return (
    <>
      <title>Dashboard - Reconciliation Summary</title>
      <meta name="description" content="Dashboard - View and analyze various reconciliation reports" />
      <meta property="og:title" content="Dashboard - Reconciliation Summary" />
      <meta property="og:description" content="Dashboard - View and analyze various reconciliation reports" />
      <Grid container rowSpacing={1} columnSpacing={1}>
        {/* Title Section with Switch */}
        <Grid item xs={12}>
          <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 1 }}>
            <Typography variant="h3">
              Reconciliation Summary
              {isFetching && (
                <Typography component="span" variant="caption" color="text.secondary" sx={{ ml: 1 }}>
                  (Refreshing...)
                </Typography>
              )}
            </Typography>
            <FormControlLabel
              control={
                <Switch
                  checked={showHistorical}
                  onChange={handleHistoricalToggle}
                  color="primary"
                  disabled={isFetching}
                />
              }
              label={
                <Typography variant="subtitle1" color="text.secondary">
                  {showHistorical ? 'Historical Data' : 'Current Data'}
                </Typography>
              }
              sx={{
                ml: 2,
                '& .MuiFormControlLabel-label': {
                  minWidth: '100px'
                }
              }}
            />
          </Stack>
          <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 2 }}>
            {showHistorical ? 'Historical Overview' : 'Current Overview'} - {new Date().toLocaleString()}
          </Typography>
        </Grid>

        {/* Welcome Section */}
        <Grid item xs={12}>
          <WelcomeCard />
        </Grid>

        {/* Analytics Cards Section - Using API Data */}
        <Grid item xs={12}>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={6} md={4} lg={2.4}>
              <Analytics
                title="Full Match"
                count={fNumber(apiData.fullMatch)}
                percentage={fullMatchPercent}
                color="success"
                extra={`Custodian: ${fRoundPercent(apiData.fullMatchPercentageAxys)}, APX: ${fRoundPercent(apiData.fullMatchPercentageGeneva)}`}
                showChip={!showHistorical}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={2.4}>
              <Analytics
                title="Tolerance"
                count={fNumber(apiData.tolerance)}
                percentage={tolerancePercent}
                color="warning"
                extra={`Tolerance Exceeded: ${fNumber(apiData.tolerance)}`}
                showChip={!showHistorical}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={2.4}>
              <Analytics
                title="Near Match"
                count={fNumber(apiData.nearMatch)}
                percentage={nearMatchPercent}
                color="info"
                extra={`Mismatches Found: ${fNumber(apiData.nearMatch)}`}
                showChip={!showHistorical}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={2.4}>
              <Analytics
                title="Missing"
                count={fNumber(apiData.totalMissing)}
                percentage={missingPercent}
                isLoss
                color="error"
                extra={`Custodian: ${fNumber(apiData.axysNotInGeneva)}, APX: ${fNumber(apiData.genevaNotInAxys)}`}
                showChip={!showHistorical}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={2.4}>
              <Analytics
                title="Skipped"
                count={fNumber(apiData.skipped)}
                percentage={skippedPercent}
                color="secondary"
                extra={`Records Skipped: ${fNumber(apiData.skipped)}`}
                showChip={!showHistorical}
              />
            </Grid>
          </Grid>
        </Grid>

        {/* Rest of the components using mock data */}
        <Grid item xs={12}>
          <Grid container spacing={1}>
            {/* Left Column */}
            <Grid item xs={12} md={8}>
              <MainCard contentSX={{ px: '0px !important', pb: '0px !important' }}>
                <Typography variant="h5" sx={{ mb: 2, px: 2 }}>
                  Full Match Percentage Overview (Custodian vs. APX)
                </Typography>
                <FullMatchPercentageOverview showHistorical={showHistorical} />
              </MainCard>
            </Grid>

            {/* Right Column */}
            <Grid item xs={12} md={4}>
              <Stack spacing={1}>
                <MainCard contentSX={{ minHeight: '325px' }}>
                  <Typography variant="h5" sx={{ mb: 2 }}>
                    Full Match Overview
                  </Typography>
                  <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 2 }}>
                    {showHistorical ? 'Historical' : 'Current'} Statistics
                  </Typography>
                  <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Box>
                      <Typography variant="h6">Custodian</Typography>
                      <Typography variant="h4" color="success.main">
                        {fRoundPercent(mockStats.fullMatch.axysPercentage)}
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant="h6">APX</Typography>
                      <Typography variant="h4" color="info.main">
                        {fRoundPercent(mockStats.fullMatch.genevaPercentage)}
                      </Typography>
                    </Box>
                  </Stack>
                </MainCard>
                {/* <MissingSummary showHistorical={showHistorical} /> */}
              </Stack>
            </Grid>

            {/* Reconciliation Issues Summary */}
            <Grid item xs={12} md={6}>
              <MainCard contentSX={{ px: '0px !important', pb: '0px !important' }}>
                <Typography variant="h5" sx={{ mb: 2, px: 2 }}>
                  Reconciliation Issues Summary
                </Typography>
                <IssuesSummaryTable showHistorical={showHistorical} />
              </MainCard>
            </Grid>

            {/* Full Match Trend Section */}
            <Grid item xs={12} md={6}>
              <MainCard contentSX={{ px: '0px !important', pb: '0px !important' }}>
                <Typography variant="h5" sx={{ mb: 2, px: 2 }}>
                  {showHistorical ? 'Full Match Trend' : 'Category-Wise Reconciliation Overview (%)'}
                </Typography>
                <FullMatchTrend showHistorical={showHistorical} />
              </MainCard>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
