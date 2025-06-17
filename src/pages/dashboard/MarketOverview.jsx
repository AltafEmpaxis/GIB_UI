import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Grid,
  Skeleton,
  Typography,
  ToggleButtonGroup,
  ToggleButton,
  Tabs,
  Tab,
  Stack,
  Divider,
  Paper,
  Chip,
  ButtonBase,
  useMediaQuery
} from '@mui/material';
import { useTheme, alpha } from '@mui/material/styles';
import ReactApexChart from 'react-apexcharts';
import { motion } from 'framer-motion';
import { Icon } from '@iconify/react';

// project imports
import MainCard from 'components/MainCard';

const MarketOverview = ({ isLoading }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [timeRange, setTimeRange] = useState('weekly');
  const [chartView, setChartView] = useState('sectors');
  const [expandedInsight, setExpandedInsight] = useState(null);

  // Handle time range change
  const handleTimeRangeChange = (event, newTimeRange) => {
    if (newTimeRange !== null) {
      setTimeRange(newTimeRange);
    }
  };

  // Handle chart view change
  const handleChartViewChange = (event, newView) => {
    setChartView(newView);
  };

  // Toggle insight expansion
  const toggleInsight = (index) => {
    setExpandedInsight(expandedInsight === index ? null : index);
  };

  // Data for the market sectors bar chart
  const sectorPerformanceData = {
    weekly: [
      { sector: 'Banking', value: 8.3 },
      { sector: 'Technology', value: 6.7 },
      { sector: 'Healthcare', value: 4.2 },
      { sector: 'Consumer', value: -1.5 },
      { sector: 'Telecom', value: 2.1 },
      { sector: 'Energy', value: 3.8 },
      { sector: 'Materials', value: -2.4 },
      { sector: 'Real Estate', value: -3.1 }
    ],
    monthly: [
      { sector: 'Banking', value: 12.5 },
      { sector: 'Technology', value: 9.3 },
      { sector: 'Healthcare', value: 7.8 },
      { sector: 'Consumer', value: 3.2 },
      { sector: 'Telecom', value: 5.4 },
      { sector: 'Energy', value: 8.7 },
      { sector: 'Materials', value: -1.2 },
      { sector: 'Real Estate', value: 2.6 }
    ],
    yearly: [
      { sector: 'Banking', value: 24.7 },
      { sector: 'Technology', value: 31.2 },
      { sector: 'Healthcare', value: 18.5 },
      { sector: 'Consumer', value: 12.8 },
      { sector: 'Telecom', value: 9.3 },
      { sector: 'Energy', value: 15.6 },
      { sector: 'Materials', value: 7.2 },
      { sector: 'Real Estate', value: -5.4 }
    ]
  };

  // Market capitalization data for donut chart
  const marketCapData = {
    series: [35, 25, 15, 10, 8, 7],
    labels: ['Banking', 'Energy', 'Materials', 'Technology', 'Telecom', 'Others']
  };

  // Trading volume data
  const tradingVolumeData = {
    series: [
      {
        name: 'Trading Volume',
        data: [3.2, 4.1, 2.8, 5.3, 3.9, 4.5, 3.8, 4.7, 5.2, 4.8, 5.7, 6.1]
      }
    ]
  };

  // Market indices data with sparkline data
  const indices = [
    {
      name: 'TASI',
      value: 12387.45,
      change: '+1.2%',
      color: 'success',
      sparkline: [11980, 12050, 12180, 12240, 12310, 12387]
    },
    {
      name: 'MSCI Saudi',
      value: 1457.82,
      change: '+0.7%',
      color: 'success',
      sparkline: [1430, 1442, 1438, 1445, 1452, 1458]
    },
    {
      name: 'SAIB Sukuk',
      value: 187.56,
      change: '-0.2%',
      color: 'error',
      sparkline: [188.4, 188.2, 187.9, 187.7, 187.8, 187.6]
    },
    {
      name: 'GCC Index',
      value: 3214.67,
      change: '+0.5%',
      color: 'success',
      sparkline: [3195, 3205, 3190, 3200, 3210, 3215]
    }
  ];

  // Chart options for horizontal bar chart
  const barChartOptions = {
    chart: {
      type: 'bar',
      height: 350,
      toolbar: {
        show: false
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
    plotOptions: {
      bar: {
        borderRadius: 4,
        horizontal: true,
        barHeight: '70%',
        distributed: true,
        dataLabels: {
          position: 'bottom'
        }
      }
    },
    colors: sectorPerformanceData[timeRange].map((item) =>
      item.value >= 0 ? theme.palette.success.main : theme.palette.error.main
    ),
    dataLabels: {
      enabled: true,
      textAnchor: 'start',
      style: {
        colors: [theme.palette.mode === 'dark' ? '#fff' : '#000'],
        fontSize: '12px',
        fontWeight: 500
      },
      formatter: function (val, opt) {
        return val + '%';
      },
      offsetX: 0
    },
    xaxis: {
      categories: sectorPerformanceData[timeRange].map((item) => item.sector),
      labels: {
        style: {
          colors: theme.palette.text.secondary,
          fontSize: '12px'
        }
      },
      axisBorder: {
        show: false
      }
    },
    yaxis: {
      labels: {
        style: {
          colors: theme.palette.text.secondary,
          fontSize: '12px'
        }
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
          show: false
        }
      }
    },
    tooltip: {
      theme: theme.palette.mode === 'dark' ? 'dark' : 'light',
      y: {
        formatter: function (val) {
          return val + '%';
        }
      }
    },
    legend: {
      show: false
    }
  };

  // Chart options for donut chart
  const donutChartOptions = {
    chart: {
      type: 'donut',
      height: 350,
      fontFamily: theme.typography.fontFamily
    },
    labels: marketCapData.labels,
    colors: [
      theme.palette.primary.main,
      theme.palette.success.main,
      theme.palette.warning.main,
      theme.palette.info.main,
      theme.palette.error.main,
      theme.palette.grey[500]
    ],
    plotOptions: {
      pie: {
        donut: {
          size: '65%',
          labels: {
            show: true,
            total: {
              show: true,
              label: 'Total Market Cap',
              formatter: function (w) {
                return '$2.47T';
              }
            }
          }
        }
      }
    },
    dataLabels: {
      enabled: true,
      formatter: function (val) {
        return val.toFixed(1) + '%';
      },
      style: {
        fontSize: '12px',
        fontWeight: 500
      },
      dropShadow: {
        enabled: false
      }
    },
    legend: {
      position: 'bottom',
      fontSize: '13px',
      fontWeight: 500,
      labels: {
        colors: theme.palette.text.primary
      },
      markers: {
        width: 12,
        height: 12,
        radius: 6
      },
      itemMargin: {
        horizontal: 10,
        vertical: 5
      }
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          legend: {
            position: 'bottom'
          }
        }
      }
    ],
    tooltip: {
      theme: theme.palette.mode === 'dark' ? 'dark' : 'light'
    }
  };

  // Chart options for trading volume column chart
  const volumeChartOptions = {
    chart: {
      type: 'bar',
      height: 350,
      toolbar: {
        show: false
      },
      animations: {
        enabled: true,
        easing: 'easeinout',
        speed: 800
      },
      fontFamily: theme.typography.fontFamily
    },
    plotOptions: {
      bar: {
        columnWidth: '60%',
        borderRadius: 4,
        dataLabels: {
          position: 'top'
        }
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      width: 0
    },
    colors: [alpha(theme.palette.primary.main, 0.85)],
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      labels: {
        style: {
          colors: theme.palette.text.secondary,
          fontSize: '12px'
        }
      },
      axisBorder: {
        show: false
      }
    },
    yaxis: {
      title: {
        text: 'Volume (Billion SAR)',
        style: {
          color: theme.palette.text.secondary,
          fontSize: '12px'
        }
      },
      labels: {
        style: {
          colors: theme.palette.text.secondary
        },
        formatter: function (val) {
          return val.toFixed(1);
        }
      }
    },
    grid: {
      borderColor: theme.palette.divider,
      strokeDashArray: 4
    },
    tooltip: {
      theme: theme.palette.mode === 'dark' ? 'dark' : 'light',
      y: {
        formatter: function (val) {
          return val.toFixed(1) + ' Billion SAR';
        }
      }
    },
    fill: {
      opacity: 1,
      type: 'gradient',
      gradient: {
        shade: 'light',
        type: 'vertical',
        shadeIntensity: 0.4,
        inverseColors: false,
        opacityFrom: 1,
        opacityTo: 0.7,
        stops: [0, 100]
      }
    }
  };

  // Chart options for sparklines
  const getSparklineOptions = (data, color) => {
    return {
      chart: {
        type: 'line',
        sparkline: {
          enabled: true
        },
        toolbar: {
          show: false
        },
        animations: {
          enabled: false
        }
      },
      stroke: {
        curve: 'smooth',
        width: 2
      },
      colors: [theme.palette[color].main],
      tooltip: {
        fixed: {
          enabled: false
        },
        x: {
          show: false
        },
        y: {
          title: {
            formatter: function (seriesName) {
              return '';
            }
          }
        },
        marker: {
          show: false
        }
      },
      grid: {
        padding: {
          top: 5,
          bottom: 5,
          left: 0,
          right: 0
        }
      },
      legend: {
        show: false,
        showForSingleSeries: false,
        showForNullSeries: false,
        showForZeroSeries: false
      }
    };
  };

  const marketInsights = [
    {
      title: 'Saudi banking sector leads performance with +8.3% weekly gain',
      content:
        'Banking stocks have outperformed all other sectors this week, driven by strong Q2 earnings reports and increased lending activities.'
    },
    {
      title: 'Tech sector shows resilience amid global market volatility',
      content:
        'Saudi tech companies continue to show growth despite global tech sector challenges, with several announcing new government contracts.'
    },
    {
      title: 'ARAMCO stock up 2.5% following dividend announcement',
      content:
        'Saudi Aramco shares rose after the company announced a higher-than-expected dividend payout for shareholders in Q2.'
    },
    {
      title: 'New Tadawul regulations boost investor confidence',
      content:
        'Recent regulatory changes by the Saudi Capital Market Authority have been positively received by institutional investors.'
    }
  ];

  // Top performing stocks
  const topStocks = [
    { name: 'Al Rajhi Bank', ticker: 'RJHI.SR', change: '+2.7%', price: 103.2 },
    { name: 'Saudi Aramco', ticker: 'ARAMCO.SR', change: '+2.5%', price: 32.15 },
    { name: 'SABIC', ticker: 'SABIC.SR', change: '+1.9%', price: 89.75 },
    { name: 'STC', ticker: 'STC.SR', change: '+1.4%', price: 152.3 }
  ];

  // Key market metrics
  const keyMetrics = [
    { name: 'Market P/E', value: '16.4x' },
    { name: 'Avg Volume', value: '5.7B SAR' },
    { name: 'Volatility', value: 'Moderate' },
    { name: 'Foreign Flow', value: '+1.2B SAR' }
  ];

  return (
    <MainCard
      contentSX={{ p: '0 !important' }}
      title={
        <Stack direction="row" alignItems="center" spacing={1}>
          <Icon icon="solar:saudi-arabia-bold" width={24} height={24} style={{ color: theme.palette.success.main }} />
          <Typography variant="h5">Saudi Market Overview</Typography>
        </Stack>
      }
      secondary={
        <ToggleButtonGroup
          value={timeRange}
          exclusive
          onChange={handleTimeRangeChange}
          size="small"
          sx={{
            '& .MuiToggleButtonGroup-grouped': {
              border: `1px solid ${alpha(theme.palette.primary.main, 0.15)}`,
              '&.Mui-selected': {
                bgcolor: alpha(theme.palette.primary.main, 0.1),
                color: theme.palette.primary.main,
                borderColor: alpha(theme.palette.primary.main, 0.25)
              }
            }
          }}
        >
          <ToggleButton value="weekly">Weekly</ToggleButton>
          <ToggleButton value="monthly">Monthly</ToggleButton>
          <ToggleButton value="yearly">Yearly</ToggleButton>
        </ToggleButtonGroup>
      }
    >
      {isLoading ? (
        <Box sx={{ p: 3 }}>
          <Skeleton variant="rectangular" height={350} />
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
            {[1, 2, 3, 4].map((item) => (
              <Box key={item} sx={{ width: '23%' }}>
                <Skeleton variant="text" height={30} />
                <Skeleton variant="text" height={20} />
              </Box>
            ))}
          </Box>
        </Box>
      ) : (
        <Box sx={{ p: { xs: 1.5, md: 2 } }}>
          {/* Summary Row */}
          <Box
            sx={{
              mb: 3,
              p: 2,
              borderRadius: 2,
              bgcolor: alpha(theme.palette.primary.main, 0.04),
              border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-between'
            }}
          >
            {keyMetrics.map((metric, idx) => (
              <Box
                key={idx}
                sx={{
                  textAlign: 'center',
                  px: { xs: 1, sm: 2 },
                  width: { xs: '50%', sm: '25%' },
                  mb: { xs: idx < 2 ? 2 : 0, sm: 0 }
                }}
              >
                <Typography variant="caption" color="textSecondary">
                  {metric.name}
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  {metric.value}
                </Typography>
              </Box>
            ))}
          </Box>

          {/* Tabs for chart content */}
          <Box sx={{ mb: 2 }}>
            <Tabs
              value={chartView}
              onChange={handleChartViewChange}
              variant={isMobile ? 'scrollable' : 'standard'}
              scrollButtons={isMobile ? 'auto' : false}
              sx={{
                '& .MuiTab-root': {
                  minWidth: 'auto',
                  px: { xs: 1.5, sm: 2 },
                  py: 1.5,
                  fontWeight: 500
                },
                '& .MuiTabs-indicator': {
                  backgroundColor: theme.palette.primary.main,
                  height: 3
                },
                borderBottom: `1px solid ${theme.palette.divider}`
              }}
            >
              <Tab
                value="sectors"
                label="Sector Performance"
                icon={<Icon icon="solar:chart-bold-duotone" width={18} />}
                iconPosition="start"
              />
              <Tab
                value="marketCap"
                label="Market Capitalization"
                icon={<Icon icon="solar:pie-chart-2-bold-duotone" width={18} />}
                iconPosition="start"
              />
              <Tab
                value="volume"
                label="Trading Volume"
                icon={<Icon icon="solar:graph-new-bold-duotone" width={18} />}
                iconPosition="start"
              />
            </Tabs>
          </Box>

          <Grid container spacing={2}>
            {/* Main Chart Section */}
            <Grid item xs={12} md={7}>
              <Paper
                elevation={0}
                variant="outlined"
                sx={{
                  height: '100%',
                  p: 2,
                  borderRadius: 2,
                  // overflow: 'hidden',
                  borderColor: theme.palette.divider
                }}
              >
                <Box
                  component={motion.div}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  sx={{ height: { xs: 300, sm: 380 } }}
                >
                  {chartView === 'sectors' && (
                    <ReactApexChart
                      options={barChartOptions}
                      series={[{ data: sectorPerformanceData[timeRange].map((item) => item.value) }]}
                      type="bar"
                      height="100%"
                      width="100%"
                    />
                  )}

                  {chartView === 'marketCap' && (
                    <ReactApexChart
                      options={donutChartOptions}
                      series={marketCapData.series}
                      type="donut"
                      height="100%"
                      width="100%"
                    />
                  )}

                  {chartView === 'volume' && (
                    <ReactApexChart
                      options={volumeChartOptions}
                      series={tradingVolumeData.series}
                      type="bar"
                      height="100%"
                      width="100%"
                    />
                  )}
                </Box>
              </Paper>
            </Grid>

            {/* Right Side Content */}
            <Grid item xs={12} md={5}>
              <Grid container spacing={2} sx={{ height: '100%' }}>
                {/* Market Indices */}
                <Grid item xs={12}>
                  <Paper
                    elevation={0}
                    variant="outlined"
                    sx={{
                      p: 2,
                      borderRadius: 2,
                      borderColor: theme.palette.divider
                    }}
                  >
                    <Typography
                      variant="h6"
                      sx={{
                        mb: 2,
                        display: 'flex',
                        alignItems: 'center',
                        fontWeight: 600,
                        fontSize: '0.95rem'
                      }}
                    >
                      <Icon
                        icon="solar:stocks-bold-duotone"
                        style={{
                          marginRight: '8px',
                          fontSize: '20px',
                          color: theme.palette.primary.main
                        }}
                      />
                      Market Indices
                    </Typography>

                    <Grid container spacing={2}>
                      {indices.map((index, i) => (
                        <Grid item xs={12} sm={6} key={index.name}>
                          <Box
                            component={motion.div}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 + i * 0.1 }}
                            sx={{
                              p: 1.5,
                              borderRadius: 1,
                              bgcolor: alpha(theme.palette[index.color].main, 0.08),
                              border: `1px solid ${alpha(theme.palette[index.color].main, 0.2)}`,
                              display: 'flex',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                              height: '100%'
                            }}
                          >
                            <Stack spacing={0.5}>
                              <Typography variant="subtitle2">{index.name}</Typography>
                              <Typography
                                variant="caption"
                                sx={{
                                  color:
                                    index.color === 'success' ? theme.palette.success.main : theme.palette.error.main,
                                  display: 'flex',
                                  alignItems: 'center'
                                }}
                              >
                                <Icon
                                  icon={
                                    index.color === 'success'
                                      ? 'solar:arrow-up-bold-duotone'
                                      : 'solar:arrow-down-bold-duotone'
                                  }
                                  width={14}
                                  height={14}
                                  style={{ marginRight: '4px' }}
                                />
                                {index.change}
                              </Typography>
                            </Stack>

                            <Stack spacing={0.5} alignItems="flex-end">
                              <Typography variant="body1" sx={{ fontWeight: 600 }}>
                                {index.value}
                              </Typography>
                              <Box
                                sx={{
                                  width: 60,
                                  height: 30,
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center'
                                  // overflow: 'hidden'
                                }}
                              >
                                <ReactApexChart
                                  options={getSparklineOptions(index.sparkline, index.color)}
                                  series={[{ data: index.sparkline }]}
                                  type="line"
                                  height={30}
                                  width={60}
                                />
                              </Box>
                            </Stack>
                          </Box>
                        </Grid>
                      ))}
                    </Grid>
                  </Paper>
                </Grid>

                {/* Top Stocks */}
                <Grid item xs={12}>
                  <Paper
                    elevation={0}
                    variant="outlined"
                    sx={{
                      p: 2,
                      borderRadius: 2,
                      borderColor: theme.palette.divider
                    }}
                  >
                    <Typography
                      variant="h6"
                      sx={{
                        mb: 2,
                        display: 'flex',
                        alignItems: 'center',
                        fontWeight: 600,
                        fontSize: '0.95rem'
                      }}
                    >
                      <Icon
                        icon="solar:chart-up-bold-duotone"
                        style={{
                          marginRight: '8px',
                          fontSize: '20px',
                          color: theme.palette.success.main
                        }}
                      />
                      Top Performing Stocks
                    </Typography>

                    <Grid container spacing={1}>
                      {topStocks.map((stock, idx) => (
                        <Grid item xs={6} key={stock.ticker}>
                          <Paper
                            sx={{
                              p: 1,
                              borderRadius: 1,
                              bgcolor: alpha(theme.palette.background.default, 0.8),
                              '&:hover': {
                                bgcolor: alpha(theme.palette.primary.main, 0.05)
                              }
                            }}
                          >
                            <Typography variant="subtitle2" noWrap>
                              {stock.name}
                            </Typography>
                            <Stack direction="row" justifyContent="space-between" alignItems="center">
                              <Typography variant="caption" color="textSecondary">
                                {stock.ticker}
                              </Typography>
                              <Typography
                                variant="body2"
                                sx={{
                                  color: theme.palette.success.main,
                                  fontWeight: 600
                                }}
                              >
                                {stock.change}
                              </Typography>
                            </Stack>
                          </Paper>
                        </Grid>
                      ))}
                    </Grid>
                  </Paper>
                </Grid>
              </Grid>
            </Grid>

            {/* Market Insights */}
            <Grid item xs={12}>
              <Paper
                elevation={0}
                variant="outlined"
                sx={{
                  p: 2,
                  borderRadius: 2,
                  borderColor: theme.palette.divider
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    mb: 2,
                    display: 'flex',
                    alignItems: 'center',
                    fontWeight: 600,
                    fontSize: '0.95rem'
                  }}
                >
                  <Icon
                    icon="solar:lightbulb-bold-duotone"
                    style={{
                      marginRight: '8px',
                      fontSize: '20px',
                      color: theme.palette.warning.main
                    }}
                  />
                  Market Insights
                </Typography>

                <Grid container spacing={2}>
                  {marketInsights.map((insight, i) => (
                    <Grid item xs={12} sm={6} key={i}>
                      <ButtonBase
                        onClick={() => toggleInsight(i)}
                        sx={{
                          width: '100%',
                          textAlign: 'left',
                          borderRadius: 1,
                          overflow: 'hidden'
                        }}
                      >
                        <Paper
                          component={motion.div}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.2 + i * 0.1 }}
                          elevation={0}
                          sx={{
                            width: '100%',
                            p: 2,
                            borderRadius: 1,
                            bgcolor:
                              expandedInsight === i
                                ? alpha(theme.palette.primary.main, 0.08)
                                : alpha(theme.palette.background.default, 0.5),
                            border: `1px solid ${
                              expandedInsight === i ? alpha(theme.palette.primary.main, 0.2) : theme.palette.divider
                            }`
                          }}
                        >
                          <Stack spacing={1}>
                            <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                              <Icon
                                icon="solar:info-circle-bold-duotone"
                                color={theme.palette.primary.main}
                                width={18}
                                style={{ marginRight: '8px', marginTop: '3px' }}
                              />
                              <Typography
                                variant="body2"
                                sx={{
                                  fontWeight: expandedInsight === i ? 600 : 500,
                                  color: expandedInsight === i ? theme.palette.primary.main : 'inherit'
                                }}
                              >
                                {insight.title}
                              </Typography>
                            </Box>

                            {expandedInsight === i && (
                              <Typography variant="body2" color="textSecondary" sx={{ pl: 3.5, pt: 0.5 }}>
                                {insight.content}
                              </Typography>
                            )}

                            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                              <Chip
                                icon={
                                  <Icon
                                    icon={
                                      expandedInsight === i
                                        ? 'solar:minimise-square-bold'
                                        : 'solar:maximise-square-bold'
                                    }
                                    width={14}
                                  />
                                }
                                label={expandedInsight === i ? 'Less' : 'More'}
                                size="small"
                                color={expandedInsight === i ? 'primary' : 'default'}
                                variant={expandedInsight === i ? 'filled' : 'outlined'}
                                sx={{
                                  height: 24,
                                  fontSize: '0.7rem'
                                }}
                              />
                            </Box>
                          </Stack>
                        </Paper>
                      </ButtonBase>
                    </Grid>
                  ))}
                </Grid>
              </Paper>
            </Grid>
          </Grid>
        </Box>
      )}
    </MainCard>
  );
};

MarketOverview.propTypes = {
  isLoading: PropTypes.bool
};

export default MarketOverview;
