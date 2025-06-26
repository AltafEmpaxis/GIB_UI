import Grid from '@mui/material/Grid';
import CorporateActionActivity from './CorporateActionActivity';
import PortfolioSecuritiesActivity from './PortfolioSecuritiesActivity';
import RecentReconActivity from './RecentReconActivity';
import TradesActivity from './TradesActivity';

// Accept isLoading as a prop
export default function Activity({ isLoading }) {
  return (
    <div>
      <Grid container spacing={3} sx={{ mt: 2 }}>
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
    </div>
  );
}
