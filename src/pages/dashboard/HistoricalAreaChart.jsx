// material-ui
import { useTheme } from '@mui/material/styles';
import PropTypes from 'prop-types';
// third-party
import ReactApexChart from 'react-apexcharts';

const HistoricalAreaChart = ({ data }) => {
  const theme = useTheme();

  const options = {
    chart: {
      type: 'area',
      toolbar: {
        show: true
      },
      zoom: {
        enabled: true
      },
      background: 'transparent',
      fontFamily: theme.typography.fontFamily
    },
    title: {
      text: 'Historical Match Trend Analysis',
      align: 'center'
    },
    dataLabels: {
      enabled: true,
      formatter: (value) => `${value}%`,
      style: {
        fontSize: theme.typography.body2.fontSize,
        fontFamily: theme.typography.fontFamily,
        colors: [theme.palette.mode === 'dark' ? theme.palette.text.secondary[800] : theme.palette.text.secondary[800]]
      }
    },
    stroke: {
      width: 2,
      curve: 'smooth',
      lineCap: 'round'
    },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        inverseColors: false,
        opacityTo: 0.05,
        stops: [20, 100, 100, 100]
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
      },
      padding: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
      }
    },
    xaxis: {
      type: 'category',
      categories: data.categories,
      axisBorder: {
        show: true,
        color: theme.palette.divider
      },
      axisTicks: {
        show: true,
        color: theme.palette.divider
      },

      title: {
        text: 'Monthly Trend'
      }
    },
    yaxis: {
      labels: {
        formatter: (value) => `${value}%`
      },
      title: {
        text: 'Match Percentage (%)'
      }
    },
    legend: {
      show: true,
      position: 'bottom',
      horizontalAlign: 'center',
      labels: {
        colors: theme.palette.text.primary
      }
    },
    tooltip: {
      theme: theme.palette.mode,

      y: {
        formatter: (value) => `${value}%`
      },
      marker: {
        show: true
      }
    },
    colors: [theme.palette.primary.main, theme.palette.success.main]
  };

  return <ReactApexChart options={options} series={data.series} type="area" height={350} width="100%" />;
};

HistoricalAreaChart.propTypes = {
  data: PropTypes.shape({
    series: PropTypes.arrayOf(PropTypes.object).isRequired,
    categories: PropTypes.arrayOf(PropTypes.string).isRequired
  }).isRequired
};

export default HistoricalAreaChart;
