// material-ui
import { Box } from '@mui/material';
import PropTypes from 'prop-types';
// components
import HistoricalAreaChart from './HistoricalAreaChart';
import CurrentBarChart from './CurrentBarChart';
// data
import { fullMatchTrendData } from './mockData';

// ==============================|| FULL MATCH TREND ||============================== //

const FullMatchTrend = ({ showHistorical }) => {
  const data = showHistorical ? fullMatchTrendData.historical : fullMatchTrendData.current;

  return <Box>{showHistorical ? <HistoricalAreaChart data={data} /> : <CurrentBarChart data={data} />}</Box>;
};

FullMatchTrend.propTypes = {
  showHistorical: PropTypes.bool
};

FullMatchTrend.defaultProps = {
  showHistorical: false
};

export default FullMatchTrend;
