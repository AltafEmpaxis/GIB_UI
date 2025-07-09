import { Box, Grid, useMediaQuery, useTheme } from '@mui/material';
import AnalyticsSection from './AnalyticsSection';
import BankingSummarySection from './BankingSummarySection';
import CorporateActionsSection from './CorporateActionsSection';
import CustodiansSection from './CustodiansSection';
import RightSidebarSection from './RightSidebarSection';
import SummaryMetricsSection from './SummaryMetricsSection';

const ReconSummary = ({ isLoading }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('lg'));

  // Calculate dynamic spacing based on theme
  const sidebarWidth = 320; // Width of the sidebar
  const gridSpacing = 1.5;
  const dynamicSpacing = theme.spacing(isLargeScreen ? gridSpacing : 0);

  return (
    <Box
      sx={{
        py: 1,
        px: 1,
        display: 'flex',
        flexDirection: { xs: 'column', lg: 'row' },
        position: 'relative',
        minHeight: '100%',
        gap: gridSpacing
      }}
    >
      {/* Main Content Area */}
      <Box
        sx={{
          flexGrow: 1,
          width: { xs: '100%', lg: `calc(100% - ${sidebarWidth}px - ${theme.spacing(gridSpacing)})` },
          pr: isLargeScreen ? 0 : 0,
          mb: !isLargeScreen ? gridSpacing : 0
        }}
      >
        {/* Financial Summary Section */}
        <Box sx={{ pb: gridSpacing }}>
          <Grid container spacing={gridSpacing}>
            <Grid
              item
              xs={12}
              md={8}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                order: { xs: 2, md: 1 }
              }}
            >
              {/* Custodian Component */}
              <CustodiansSection isLoading={isLoading} />
            </Grid>

            <Grid
              item
              xs={12}
              md={4}
              sx={{
                order: { xs: 1, md: 2 },
                mb: { xs: 0, md: 0 }
              }}
            >
              {/* Summary Metrics Component */}
              <SummaryMetricsSection />
            </Grid>
          </Grid>
        </Box>

        {/* Corporate Action & Banking Summary Section */}
        <Box sx={{ mb: gridSpacing }}>
          <Grid container spacing={gridSpacing}>
            <Grid item xs={12} md={6}>
              <CorporateActionsSection />
            </Grid>

            <Grid item xs={12} md={6}>
              <BankingSummarySection />
            </Grid>
          </Grid>
        </Box>

        {/* Analytics Section */}
        <Box sx={{ mb: 0 }}>
          <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
              <AnalyticsSection />
            </Grid>
          </Grid>
        </Box>
      </Box>

      {/* Right Sidebar */}
      <Box
        sx={{
          display: { xs: 'block', sm: 'block', lg: 'block' },
          bgcolor: theme.palette.primary.main,
          p: 0,
          color: theme.palette.primary.contrastText,
          borderRadius: {
            xs: 1,
            lg: 1
          },
          position: { lg: 'relative' },
          width: { xs: '100%', lg: sidebarWidth },
          height: { lg: '100%' },
          overflowY: { lg: 'auto' },
          ml: isLargeScreen ? 0 : 0
        }}
      >
        <RightSidebarSection />
      </Box>
    </Box>
  );
};

export default ReconSummary;
