import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Button, ButtonGroup, Skeleton, Typography, useMediaQuery } from '@mui/material';
import { useTheme, alpha } from '@mui/material/styles';
import ReactApexChart from 'react-apexcharts';
import { Icon } from '@iconify/react';
import { motion } from 'framer-motion';

// project imports
import MainCard from 'components/MainCard';

const TradingVolumeChart = ({ isLoading }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [timeRange, setTimeRange] = useState('week');

  // Chart data
  const chartData = {
    week: {
      series: [
        {
          name: 'Buy Volume',
          data: [1540000, 1850000, 1200000, 1750000, 2100000, 1800000, 2300000]
        },
        {
          name: 'Sell Volume',
          data: [1300000, 1700000, 1400000, 1600000, 1900000, 1650000, 2100000]
        }
      ],
      categories: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    },
    month: {
      series: [
        {
          name: 'Buy Volume',
          data: [5100000, 7200000, 8500000, 6800000]
        },
        {
          name: 'Sell Volume',
          data: [4800000, 6700000, 7900000, 6400000]
        }
      ],
      categories: ['Week 1', 'Week 2', 'Week 3', 'Week 4']
    },
    year: {
      series: [
        {
          name: 'Buy Volume',
          data: [
            2850000, 3100000, 2950000, 3300000, 3200000, 3450000, 3600000, 3800000, 3700000, 3900000, 4100000, 4350000
          ]
        },
        {
          name: 'Sell Volume',
          data: [
            2650000, 2900000, 2800000, 3050000, 3000000, 3200000, 3400000, 3550000, 3500000, 3750000, 3850000, 4050000
          ]
        }
      ],
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    }
  };

  // Chart options
  const chartOptions = {
    chart: {
      type: 'bar',
      height: 380,
      stacked: false,
      toolbar: {
        show: true,
        offsetX: 0,
        offsetY: 0,
        tools: {
          download: true,
          selection: true,
          zoom: true,
          zoomin: true,
          zoomout: true,
          pan: true,
          reset: true
        }
      },
      zoom: {
        enabled: true
      },
      animations: {
        enabled: true,
        easing: 'easeinout',
        speed: 800,
        animateGradually: {
          enabled: true,
          delay: 150
        },
        dynamicAnimation: {
          enabled: true,
          speed: 350
        }
      },
      fontFamily: theme.typography.fontFamily
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          legend: {
            position: 'bottom',
            offsetX: -10,
            offsetY: 0
          }
        }
      }
    ],
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '55%',
        borderRadius: 6,
        dataLabels: {
          position: 'top'
        }
      }
    },
    xaxis: {
      type: 'category',
      categories: chartData[timeRange].categories,
      labels: {
        style: {
          colors: theme.palette.text.secondary,
          fontSize: '0.75rem',
          fontFamily: theme.typography.fontFamily
        }
      },
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: false
      }
    },
    yaxis: {
      title: {
        text: 'Trading Volume (SAR)',
        style: {
          color: theme.palette.text.secondary,
          fontFamily: theme.typography.fontFamily,
          fontSize: '0.875rem'
        }
      },
      labels: {
        style: {
          colors: theme.palette.text.secondary,
          fontFamily: theme.typography.fontFamily,
          fontSize: '0.75rem'
        },
        formatter: (value) => {
          return `${(value / 1000000).toFixed(1)}M`;
        }
      }
    },
    legend: {
      position: 'top',
      horizontalAlign: 'right',
      offsetY: -30,
      markers: {
        width: 10,
        height: 10,
        radius: 5
      },
      itemMargin: {
        horizontal: 10,
        vertical: 0
      },
      labels: {
        colors: theme.palette.text.primary,
        fontSize: '0.85rem',
        fontFamily: theme.typography.fontFamily
      }
    },
    fill: {
      opacity: 1
    },
    colors: [theme.palette.primary.main, theme.palette.success.main],
    dataLabels: {
      enabled: false
    },
    grid: {
      borderColor: alpha(theme.palette.divider, 0.7),
      strokeDashArray: 4,
      xaxis: {
        lines: {
          show: false
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
        left: 10
      }
    },
    tooltip: {
      theme: theme.palette.mode === 'dark' ? 'dark' : 'light',
      y: {
        formatter: (value) => {
          return `SAR ${(value / 1000000).toFixed(2)}M`;
        }
      },
      style: {
        fontSize: '0.75rem',
        fontFamily: theme.typography.fontFamily
      }
    }
  };

  return (
    <MainCard
      title={
        <Typography variant="h6" fontSize="1rem" fontWeight={600}>
          Trading Volume Analysis
        </Typography>
      }
      secondary={
        <ButtonGroup
          size="small"
          variant="outlined"
          aria-label="time range"
          sx={{
            '& .MuiButton-root': {
              m: 0.5
            }
          }}
        >
          <Button onClick={() => setTimeRange('week')} variant={timeRange === 'week' ? 'contained' : 'outlined'}>
            Week
          </Button>
          <Button onClick={() => setTimeRange('month')} variant={timeRange === 'month' ? 'contained' : 'outlined'}>
            Month
          </Button>
          <Button onClick={() => setTimeRange('year')} variant={timeRange === 'year' ? 'contained' : 'outlined'}>
            Year
          </Button>
        </ButtonGroup>
      }
      sx={{
        height: '100%',
        '& .MuiCardContent-root': {
          p: { xs: 2, md: 3 },
          pb: { xs: '16px !important', md: '24px !important' } // override default CardContent styling
        }
      }}
    >
      {isLoading ? (
        <Box sx={{ p: { xs: 1, md: 2 } }}>
          <Skeleton variant="rectangular" height={380} sx={{ borderRadius: 1 }} />
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 2 }}>
            <Skeleton variant="text" width="50%" height={20} />
            <Skeleton variant="text" width="25%" height={20} />
          </Box>
        </Box>
      ) : (
        <Box component={motion.div} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
          <Box
            sx={{
              height: isMobile ? 300 : 380,
              mt: { xs: 0.5, md: 1.5 },
              mb: { xs: 1, md: 2 }
            }}
          >
            <ReactApexChart
              options={chartOptions}
              series={chartData[timeRange].series}
              type="bar"
              height="100%"
              width="100%"
            />
          </Box>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexDirection: { xs: 'column', sm: 'row' },
              mt: { xs: 1, md: 1.5 },
              gap: { xs: 1, sm: 0 }
            }}
          >
            <Typography
              variant="body2"
              color="textSecondary"
              sx={{
                display: 'flex',
                alignItems: 'center',
                fontSize: '0.775rem'
              }}
            >
              <Icon
                icon="solar:info-circle-bold-duotone"
                style={{
                  verticalAlign: 'middle',
                  marginRight: theme.spacing(0.5),
                  color: theme.palette.primary.main
                }}
                width={18}
              />
              Market trends show a 12.5% increase in monthly trading volume
            </Typography>
            <Typography
              variant="body2"
              color="primary"
              sx={{
                display: 'flex',
                alignItems: 'center',
                cursor: 'pointer',
                fontWeight: 500,
                fontSize: '0.775rem',
                '&:hover': {
                  textDecoration: 'underline'
                }
              }}
            >
              View Detailed Analysis
              <Icon icon="solar:alt-arrow-right-bold" style={{ marginLeft: theme.spacing(0.5) }} width={16} />
            </Typography>
          </Box>
        </Box>
      )}
    </MainCard>
  );
};

TradingVolumeChart.propTypes = {
  isLoading: PropTypes.bool
};

export default TradingVolumeChart;
