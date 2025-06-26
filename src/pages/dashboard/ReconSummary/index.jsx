import { Box, Grid, useTheme } from '@mui/material';
import AnalyticsSection from './AnalyticsSection';
import BankingSummarySection from './BankingSummarySection';
import CorporateActionsSection from './CorporateActionsSection';
import CustodiansSection from './CustodiansSection';
import RightSidebarSection from './RightSidebarSection';
import SummaryMetricsSection from './SummaryMetricsSection';

const ReconSummary = ({ isLoading }) => {
  const theme = useTheme();

  return (
    <Box>
      <Grid container spacing={2} sx={{ mt: 2 }}>
        {/* Main Content Area */}
        <Grid item xs={12} lg={9} sx={{ pr: 2 }}>
          {/* Financial Summary Section */}
          <Box sx={{ pb: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={8} sx={{ display: 'flex', flexDirection: 'column' }}>
                {/* Custodian Component */}
                <CustodiansSection isLoading={isLoading} />
              </Grid>

              <Grid item xs={12} md={4}>
                {/* Summary Metrics Component */}
                <SummaryMetricsSection />
              </Grid>
            </Grid>
          </Box>

          {/* Corporate Action & Banking Summary Section */}
          <Box sx={{ mb: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <CorporateActionsSection />
              </Grid>

              <Grid item xs={12} md={6}>
                <BankingSummarySection />
              </Grid>
            </Grid>
          </Box>

          {/* Analytics Section */}
          <Box sx={{ mb: 2 }}>
            <AnalyticsSection />
          </Box>
        </Grid>

        {/* Right Sidebar */}
        <Grid
          item
          xs={12}
          lg={3}
          sx={{
            display: { xs: 'none', lg: 'block' },
            bgcolor: theme.palette.primary.main,
            p: 2,
            color: theme.palette.primary.contrastText,
            borderRadius: '0 8px 8px 0'
          }}
        >
          <RightSidebarSection />
        </Grid>
      </Grid>
    </Box>
  );
};

export default ReconSummary;
