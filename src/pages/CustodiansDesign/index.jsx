import CustodiansSection1 from './CustodiansSection1';
import CustodiansSection10 from './CustodiansSection10';
import CustodiansSection11 from './CustodiansSection11';
import CustodiansSection12 from './CustodiansSection12';
import CustodiansSection2 from './CustodiansSection2';
import CustodiansSection3 from './CustodiansSection3';
import CustodiansSection4 from './CustodiansSection4';
import CustodiansSection5 from './CustodiansSection5';
import CustodiansSection6 from './CustodiansSection6';
import CustodiansSection7 from './CustodiansSection7';
import CustodiansSection8 from './CustodiansSection8';
import CustodiansSection9 from './CustodiansSection9';

import { alpha, Paper, useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

export default function CustodiansDesign() {
  const theme = useTheme();

  // Helper component for section titles
  const SectionTitle = ({ title, description }) => (
    <Box sx={{ mb: 2, mt: 3 }}>
      <Typography variant="h5" fontWeight={600} color="primary">
        {title}
      </Typography>
      {description && (
        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
          {description}
        </Typography>
      )}
      <Divider sx={{ mt: 1 }} />
    </Box>
  );

  return (
    <Box sx={{ width: '100%', p: 2 }}>
      {/* Page Header */}
      <Paper
        elevation={0}
        sx={{
          p: 3,
          mb: 3,
          borderRadius: 2,
          bgcolor: alpha(theme.palette.primary.main, 0.05),
          border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`
        }}
      >
        <Typography variant="h4" component="h1" fontWeight={700} gutterBottom>
          Custodian Dashboard Design Variations
        </Typography>
        <Typography variant="body1">
          This page displays various design options for the Custodians component. Each row demonstrates different UI
          patterns and visualization techniques for displaying custodian data.
        </Typography>
      </Paper>

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <SectionTitle
            title="Interactive Components with View Modes"
            description="These components offer multiple view options (list/chart) and interactive features"
          />
        </Grid>

        {/* Row 1 - Enhanced components with view modes */}
        <Grid item xs={12} md={6}>
          <CustodiansSection12 />
        </Grid>
        <Grid item xs={12} md={6}>
          <CustodiansSection10 />
        </Grid>

        <Grid item xs={12}>
          <SectionTitle
            title="Expandable Card Components"
            description="Components with collapsible sections for detailed information"
          />
        </Grid>

        {/* Row 2 - Collapsible components */}
        <Grid item xs={12} md={6}>
          <CustodiansSection1 />
        </Grid>
        <Grid item xs={12} md={6}>
          <CustodiansSection4 />
        </Grid>

        <Grid item xs={12}>
          <SectionTitle title="Tabular Data Components" description="Data-driven components with structured layouts" />
        </Grid>

        {/* Row 3 - Component with data tables */}
        <Grid item xs={12} md={6}>
          <CustodiansSection5 />
        </Grid>
        <Grid item xs={12} md={6}>
          <CustodiansSection3 />
        </Grid>

        <Grid item xs={12}>
          <SectionTitle
            title="Grid Card Layouts"
            description="Components that present custodian information in a grid format"
          />
        </Grid>

        {/* Row 4 - Card grid layouts */}
        <Grid item xs={12} md={6}>
          <CustodiansSection6 />
        </Grid>
        <Grid item xs={12} md={6}>
          <CustodiansSection2 />
        </Grid>

        <Grid item xs={12}>
          <SectionTitle title="List View Components" description="Simple list-based layouts for custodian data" />
        </Grid>

        {/* Row 5 - List view components */}
        <Grid item xs={12} md={6}>
          <CustodiansSection9 />
        </Grid>
        <Grid item xs={12} md={6}>
          <CustodiansSection11 />
        </Grid>

        <Grid item xs={12}>
          <SectionTitle
            title="Progress Tracking Components"
            description="Components focused on visualizing reconciliation progress"
          />
        </Grid>

        {/* Row 6 - Progress bar focused components */}
        <Grid item xs={12} md={6}>
          <CustodiansSection7 />
        </Grid>
        <Grid item xs={12} md={6}>
          <CustodiansSection8 />
        </Grid>
      </Grid>
    </Box>
  );
}
