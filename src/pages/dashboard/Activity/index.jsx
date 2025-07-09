import { Box } from '@mui/material';
import Grid from '@mui/material/Grid';
import CorporateActionActivity from './CorporateActionActivity';
import PortfolioSecuritiesActivity from './PortfolioSecuritiesActivity';
import RecentReconActivity from './RecentReconActivity';
import TradesActivity from './TradesActivity';

// Accept isLoading as a prop
export default function Activity({ isLoading }) {
  // Use consistent grid spacing of 1.5
  const gridSpacing = 1.5;

  return (
    <Box sx={{ px: 0 }}>
      <Grid container spacing={gridSpacing}>
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
    </Box>
  );
}
