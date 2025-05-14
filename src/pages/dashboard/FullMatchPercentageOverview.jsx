import { Box } from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';
import PropTypes from 'prop-types';
import ReactApexChart from 'react-apexcharts';
import { fullMatchPercentageData } from './mockData';

// ==============================|| FULL MATCH PERCENTAGE OVERVIEW ||============================== //

const FullMatchPercentageOverview = ({ showHistorical }) => {
  const theme = useTheme();
  const data = showHistorical ? fullMatchPercentageData.historical : fullMatchPercentageData.current;

  const options = {
    chart: {
      type: 'bar',
      toolbar: {
        show: true
      },
      zoom: {
        enabled: true
      },
      background: 'transparent'
    },
    plotOptions: {
      bar: {
        horizontal: true,
        barHeight: '60%',
        borderRadius: 4,
        distributed: true,
        dataLabels: {
          position: 'center'
        }
      }
    },
    dataLabels: {
      enabled: true,
      textAnchor: 'middle',
      formatter: (value) => `${value}%`,
      style: {
        fontSize: '14px',
        fontWeight: 600,
        colors: [theme.palette.common.white]
      },
      dropShadow: {
        enabled: true,
        top: 1,
        left: 1,
        blur: 3,
        opacity: 0.3
      }
    },
    legend: {
      show: true,
      labels: {
        colors: theme.palette.text.primary
      }
    },
    stroke: {
      show: true,
      width: 1,
      colors: ['transparent']
    },
    xaxis: {
      categories: data.categories,
      axisBorder: {
        show: true
      },
      axisTicks: {
        show: true
      },
      labels: {
        style: {
          colors: theme.palette.text.secondary,
          fontFamily: theme.typography.fontFamily
        }
      }
    },
    yaxis: {
      min: 0,
      max: 100,
      labels: {
        style: {
          colors: theme.palette.text.secondary,
          fontFamily: theme.typography.fontFamily
        },
        formatter: (value) => `${value}%`
      }
    },
    grid: {
      borderColor: theme.palette.divider,
      strokeDashArray: 4,
      xaxis: {
        lines: {
          show: true
        }
      },
      yaxis: {
        lines: {
          show: true
        }
      }
    },
    tooltip: {
      theme: theme.palette.mode,
      y: {
        formatter: (value) => `${value}%`
      }
    },
    colors: [alpha(theme.palette.primary.main, 0.85), alpha(theme.palette.warning.main, 0.85)]
  };

  return (
    <Box sx={{ pr: 1.75 }}>
      <ReactApexChart
        options={options}
        series={[
          {
            name: 'Match Percentage',
            data: data.series[0].data
          }
        ]}
        type="bar"
        height={251}
      />
    </Box>
  );
};

FullMatchPercentageOverview.propTypes = {
  showHistorical: PropTypes.bool
};

FullMatchPercentageOverview.defaultProps = {
  showHistorical: false
};

export default FullMatchPercentageOverview;
