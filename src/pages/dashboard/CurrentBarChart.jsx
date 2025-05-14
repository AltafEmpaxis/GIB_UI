// material-ui
import { alpha, useTheme } from '@mui/material/styles';
import PropTypes from 'prop-types';
// third-party
import ReactApexChart from 'react-apexcharts';

const CurrentBarChart = ({ data }) => {
  const theme = useTheme();

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
    title: {
      text: '',
      align: 'center',
      style: {
        fontSize: '14px',
        fontWeight: 600,
        fontFamily: theme.typography.fontFamily,
        color: theme.palette.text.primary
      }
    },
    subtitle: {
      text: 'Distribution of Match Categories',
      align: 'center',
      style: {
        fontSize: '12px',
        fontFamily: theme.typography.fontFamily,
        color: theme.palette.text.secondary
      }
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '50%',
        borderRadius: 4,
        distributed: true,
        dataLabels: {
          position: 'top'
        }
      }
    },
    dataLabels: {
      enabled: true,
      formatter: (value) => `${value}%`,
      offsetY: 0,
      style: {
        fontSize: '12px',
        colors: [theme.palette.text.secondary]
      }
    },
    legend: {
      show: false
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
    xaxis: {
      type: 'category',
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
      },
      title: {
        text: 'Match Categories',
        style: {
          fontSize: '12px',
          fontWeight: 500,
          fontFamily: theme.typography.fontFamily,
          color: theme.palette.text.primary
        }
      }
    },
    yaxis: {
      labels: {
        style: {
          colors: theme.palette.text.secondary,
          fontFamily: theme.typography.fontFamily
        },
        formatter: (value) => `${value}%`
      },
      title: {
        text: 'Percentage (%)',
        style: {
          fontSize: '12px',
          fontWeight: 500,
          fontFamily: theme.typography.fontFamily,
          color: theme.palette.text.primary
        }
      }
    },
    tooltip: {
      theme: theme.palette.mode,
      y: {
        formatter: (value) => `${value}%`
      }
    },
    colors: [
      alpha(theme.palette.success.main, 0.85),
      alpha(theme.palette.warning.main, 0.85),
      alpha(theme.palette.info.main, 0.85),
      alpha(theme.palette.error.main, 0.85),
      alpha(theme.palette.secondary.main, 0.85)
    ]
  };

  return <ReactApexChart options={options} series={data.series} type="bar" height={300} />;
};

CurrentBarChart.propTypes = {
  data: PropTypes.shape({
    series: PropTypes.arrayOf(PropTypes.object).isRequired,
    categories: PropTypes.arrayOf(PropTypes.string).isRequired
  }).isRequired
};

export default CurrentBarChart;
