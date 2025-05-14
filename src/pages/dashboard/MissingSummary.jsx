import { Stack, Typography } from '@mui/material';
import MainCard from 'components/MainCard';
import PropTypes from 'prop-types';
import { missingSummaryData } from './mockData';

function MissingSummary({ showHistorical }) {
  const data = showHistorical ? missingSummaryData.historical : missingSummaryData.current;

  return (
    <MainCard>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Missing Summary
      </Typography>
      <Stack spacing={2}>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography variant="body1" color="text.secondary">
            Custodian Only
          </Typography>
          <Typography variant="h6" color="info.main" sx={{ fontWeight: 600 }}>
            {data.axysOnly}
          </Typography>
        </Stack>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography variant="body1" color="text.secondary">
            APX Only
          </Typography>
          <Typography variant="h6" color="info.main" sx={{ fontWeight: 600 }}>
            {data.genevaOnly}
          </Typography>
        </Stack>
      </Stack>
    </MainCard>
  );
}

MissingSummary.propTypes = {
  showHistorical: PropTypes.bool
};

MissingSummary.defaultProps = {
  showHistorical: true
};

export default MissingSummary;
