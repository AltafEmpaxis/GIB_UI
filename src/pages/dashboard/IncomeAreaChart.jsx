import { useState, useEffect } from 'react';

import { useTheme } from '@mui/material/styles';
import PropTypes from 'prop-types';
import ReactApexChart from 'react-apexcharts';
import { incomeAreaChartData } from './mockData';

const areaChartOptions = {
  chart: {
    height: 450,
    type: 'area',
    toolbar: {
      show: false
    }
  },
  dataLabels: {
    enabled: false
  },
  stroke: {
    curve: 'smooth',
    width: 2
  },
  grid: {
    strokeDashArray: 0
  },
  tooltip: {
    theme: 'light'
  }
};

export default function IncomeAreaChart({ slot }) {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const data = slot === 'month' ? incomeAreaChartData.monthly : incomeAreaChartData.weekly;

  const [options, setOptions] = useState(areaChartOptions);
  const [series] = useState([
    {
      name: 'Page Views',
      data: data.pageViews
    },
    {
      name: 'Sessions',
      data: data.sessions
    }
  ]);

  useEffect(() => {
    setOptions((prevState) => ({
      ...prevState,
      chart: {
        ...prevState.chart,
        background: 'transparent'
      },
      colors: [theme.palette.warning.main, theme.palette.primary.main],
      theme: {
        mode: isDark ? 'dark' : 'light'
      },
      xaxis: {
        categories: data.categories,
        labels: {
          style: {
            colors: Array(data.categories.length).fill(theme.palette.text.secondary)
          }
        },
        axisBorder: {
          show: true,
          color: theme.palette.divider
        },
        tickAmount: slot === 'month' ? 11 : 7
      },
      yaxis: {
        labels: {
          style: {
            colors: [theme.palette.text.secondary]
          }
        }
      },
      grid: {
        borderColor: theme.palette.divider
      }
    }));
  }, [theme, slot, isDark, data]);

  return <ReactApexChart options={options} series={series} type="area" height={450} />;
}

IncomeAreaChart.propTypes = {
  slot: PropTypes.string
};
