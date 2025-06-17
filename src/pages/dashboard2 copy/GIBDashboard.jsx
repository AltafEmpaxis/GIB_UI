import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

// material-ui
import {
  Grid,
  Box,
  useMediaQuery,
  Stack,
  Typography,
  Avatar,
  Card,
  Chip,
  IconButton,
  Paper,
  Tab,
  Tabs,
  Menu,
  MenuItem,
  Button,
  Divider,
  Badge,
  useTheme,
  alpha,
  AvatarGroup,
  ToggleButtonGroup,
  ToggleButton
} from '@mui/material';
import { Icon } from '@iconify/react';
import ReactApexChart from 'react-apexcharts';

// project imports
import MainCard from 'components/MainCard';
import useAuth from 'hooks/useAuth';
import WelcomeCard from './WelcomeCard';

// mock data
import dashboardData from './dashbord-mockData.json';

// Saudi Market Overview data
const marketOverviewData = {
  sectorPerformance: {
    weekly: [
      { sector: 'Banking', value: 8.3 },
      { sector: 'Technology', value: 6.7 },
      { sector: 'Healthcare', value: 4.2 },
      { sector: 'Consumer', value: -1.5 },
      { sector: 'Energy', value: 3.8 },
      { sector: 'Materials', value: -2.4 }
    ],
    monthly: [
      { sector: 'Banking', value: 12.5 },
      { sector: 'Technology', value: 9.3 },
      { sector: 'Healthcare', value: 7.8 },
      { sector: 'Consumer', value: 3.2 },
      { sector: 'Energy', value: 8.7 },
      { sector: 'Materials', value: -1.2 }
    ]
  },
  marketIndices: [
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
  ],
  topStocks: [
    { name: 'Al Rajhi Bank', ticker: 'RJHI.SR', change: '+2.7%', price: 103.2 },
    { name: 'Saudi Aramco', ticker: 'ARAMCO.SR', change: '+2.5%', price: 32.15 },
    { name: 'SABIC', ticker: 'SABIC.SR', change: '+1.9%', price: 89.75 },
    { name: 'STC', ticker: 'STC.SR', change: '+1.4%', price: 152.3 }
  ],
  marketInsights: [
    {
      title: 'Saudi banking sector leads performance with +8.3% weekly gain',
      content: 'Banking stocks have outperformed all other sectors this week, driven by strong Q2 earnings reports.'
    },
    {
      title: 'Tech sector shows resilience amid global market volatility',
      content: 'Saudi tech companies continue to show growth despite global tech sector challenges.'
    }
  ]
};

const GIBDashboard = () => {
  const theme = useTheme();
  const { user } = useAuth();
  const matchDownLG = useMediaQuery(theme.breakpoints.down('lg'));
  const matchDownMD = useMediaQuery(theme.breakpoints.down('md'));
  const [isLoading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState(0);
  const [userMenuAnchor, setUserMenuAnchor] = useState(null);
  const [notificationsAnchor, setNotificationsAnchor] = useState(null);
  const [timeRange, setTimeRange] = useState('weekly');
  const [selectedInsight, setSelectedInsight] = useState(null);

  useEffect(() => {
    // Simulate API loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleUserMenuOpen = (event) => {
    setUserMenuAnchor(event.currentTarget);
  };

  const handleUserMenuClose = () => {
    setUserMenuAnchor(null);
  };

  const handleNotificationsOpen = (event) => {
    setNotificationsAnchor(event.currentTarget);
  };

  const handleNotificationsClose = () => {
    setNotificationsAnchor(null);
  };

  const containerVariant = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12
      }
    }
  };

  const itemVariant = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15
      }
    }
  };

  // GIB Brand Colors
  const primaryGreen = theme.palette.mode === 'dark' ? theme.palette.success.dark : '#007B5F'; // GIB primary green
  const secondaryBlue = theme.palette.mode === 'dark' ? theme.palette.primary.dark : '#0F345E'; // GIB dark blue
  const accentYellow = theme.palette.mode === 'dark' ? theme.palette.warning.dark : '#F5A623'; // GIB accent yellow

  // Activity summary counts
  const activityCounts = {
    recon: dashboardData.reconActivity.length,
    securities: dashboardData.portfolioActivity.length,
    corporateActions: dashboardData.corporateActions.length,
    trades: dashboardData.tradesActivity.length
  };

  // Chart Options - Collection Trend Line Chart
  const collectionTrendOptions = {
    chart: {
      type: 'line',
      height: 150,
      toolbar: {
        show: false
      },
      zoom: {
        enabled: false
      },
      sparkline: {
        enabled: false
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'smooth',
      width: 2
    },
    colors: [primaryGreen, accentYellow],
    grid: {
      borderColor: theme.palette.divider,
      strokeDashArray: 3,
      xaxis: {
        lines: {
          show: false
        }
      },
      yaxis: {
        lines: {
          show: false
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
      categories: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      labels: {
        style: {
          colors: theme.palette.text.secondary,
          fontSize: '10px'
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
      labels: {
        show: false
      }
    },
    tooltip: {
      theme: theme.palette.mode === 'dark' ? 'dark' : 'light',
      fixed: {
        enabled: false
      },
      x: {
        show: false
      },
      marker: {
        show: false
      }
    },
    legend: {
      show: false
    }
  };

  // Data Analysis Area Chart
  const dataAnalysisOptions = {
    chart: {
      type: 'area',
      height: 180,
      toolbar: {
        show: false
      },
      zoom: {
        enabled: false
      },
      sparkline: {
        enabled: false
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'smooth',
      width: 2
    },
    colors: [primaryGreen],
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.2,
        stops: [0, 90, 100]
      }
    },
    grid: {
      borderColor: theme.palette.divider,
      strokeDashArray: 3,
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
        top: 5,
        right: 0,
        bottom: 0,
        left: 10
      }
    },
    xaxis: {
      categories: ['10 AM', '11 AM', '12 PM', '1 PM', '2 PM'],
      labels: {
        style: {
          colors: theme.palette.text.secondary,
          fontSize: '10px'
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
      labels: {
        show: true,
        style: {
          colors: theme.palette.text.secondary,
          fontSize: '10px'
        }
      }
    },
    tooltip: {
      theme: theme.palette.mode === 'dark' ? 'dark' : 'light'
    },
    legend: {
      show: false
    }
  };

  // Monthly Invoices Bar Chart
  const monthlyInvoicesOptions = {
    chart: {
      type: 'bar',
      height: 120,
      toolbar: {
        show: false
      },
      sparkline: {
        enabled: true
      }
    },
    plotOptions: {
      bar: {
        borderRadius: 2,
        columnWidth: '60%'
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      show: false
    },
    colors: [alpha(primaryGreen, 0.5)],
    grid: {
      padding: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
      }
    },
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      labels: {
        show: false
      },
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: false
      }
    },
    yaxis: {
      labels: {
        show: false
      }
    },
    tooltip: {
      theme: theme.palette.mode === 'dark' ? 'dark' : 'light',
      x: {
        show: false
      }
    },
    legend: {
      show: false
    }
  };

  // Side menu items with enhanced icons
  const sideMenuItems = [
    { name: 'File Upload', icon: 'solar:upload-bold-duotone', color: primaryGreen },
    { name: 'Dashboard', icon: 'solar:widget-bold-duotone', active: true, color: secondaryBlue },
    { name: 'Manage', icon: 'solar:settings-bold-duotone', align: 'right', color: accentYellow }
  ];

  // Sparkline chart options
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
            formatter: function () {
              return '';
            }
          }
        },
        marker: {
          show: false
        }
      }
    };
  };

  // Sector performance chart options
  const sectorChartOptions = {
    chart: {
      type: 'bar',
      height: 200,
      toolbar: {
        show: false
      },
      animations: {
        enabled: true,
        easing: 'easeinout',
        speed: 800
      }
    },
    plotOptions: {
      bar: {
        borderRadius: 4,
        horizontal: true,
        barHeight: '70%',
        distributed: true
      }
    },
    colors: marketOverviewData.sectorPerformance[timeRange].map((item) =>
      item.value >= 0 ? primaryGreen : theme.palette.error.main
    ),
    dataLabels: {
      enabled: true,
      textAnchor: 'start',
      style: {
        colors: [theme.palette.mode === 'dark' ? '#fff' : '#000'],
        fontSize: '11px',
        fontWeight: 500
      },
      formatter: function (val) {
        return val + '%';
      },
      offsetX: 0
    },
    xaxis: {
      categories: marketOverviewData.sectorPerformance[timeRange].map((item) => item.sector),
      labels: {
        style: {
          colors: theme.palette.text.secondary,
          fontSize: '11px'
        }
      },
      axisBorder: {
        show: false
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

  return (
    <motion.div variants={containerVariant} initial="hidden" animate="visible">
      <Grid container spacing={3}>
        {/* Welcome Card */}
        <Grid item xs={12} md={6} lg={4}>
          <motion.div variants={itemVariant}>
            <WelcomeCard user={user} />
          </motion.div>
        </Grid>

        {/* Activity Summary Card */}
        <Grid item xs={12} md={6} lg={8}>
          <motion.div variants={itemVariant}>
            <MainCard
              title={
                <Stack direction="row" alignItems="center" spacing={1}>
                  <Icon icon="solar:widget-bold-duotone" width={22} height={22} style={{ color: secondaryBlue }} />
                  <Typography variant="h6">Activity Summary</Typography>
                </Stack>
              }
              secondary={
                <IconButton sx={{ color: secondaryBlue }}>
                  <Icon icon="solar:refresh-bold-duotone" />
                </IconButton>
              }
              contentSX={{ p: 2 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Box
                    component={motion.div}
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    sx={{
                      p: 2,
                      backgroundColor: alpha(primaryGreen, 0.08),
                      borderRadius: 2,
                      border: `1px solid ${alpha(primaryGreen, 0.2)}`
                    }}
                  >
                    <Stack direction="row" alignItems="center" spacing={2}>
                      <Avatar
                        variant="rounded"
                        sx={{
                          bgcolor: alpha(primaryGreen, 0.2),
                          color: primaryGreen
                        }}
                      >
                        <Icon icon="solar:chart-bold-duotone" />
                      </Avatar>
                      <Box>
                        <Typography color="textSecondary" variant="caption">
                          Portfolio & Securities
                        </Typography>
                        <Typography variant="h5" sx={{ fontWeight: 600 }}>
                          {activityCounts.securities}
                        </Typography>
                      </Box>
                    </Stack>
                    <Box sx={{ mt: 1.5 }}>
                      <ReactApexChart
                        options={collectionTrendOptions}
                        series={[
                          {
                            name: 'This Week',
                            data: [12, 18, 16, 25, 38, 42, 47]
                          },
                          {
                            name: 'Last Week',
                            data: [8, 14, 12, 20, 32, 37, 40]
                          }
                        ]}
                        type="line"
                        height={60}
                      />
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box
                    component={motion.div}
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    sx={{
                      p: 2,
                      backgroundColor: alpha(secondaryBlue, 0.08),
                      borderRadius: 2,
                      border: `1px solid ${alpha(secondaryBlue, 0.2)}`
                    }}
                  >
                    <Stack direction="row" alignItems="center" spacing={2}>
                      <Avatar
                        variant="rounded"
                        sx={{
                          bgcolor: alpha(secondaryBlue, 0.2),
                          color: secondaryBlue
                        }}
                      >
                        <Icon icon="solar:clock-circle-bold-duotone" />
                      </Avatar>
                      <Box>
                        <Typography color="textSecondary" variant="caption">
                          Reconciliation
                        </Typography>
                        <Typography variant="h5" sx={{ fontWeight: 600 }}>
                          {activityCounts.recon}
                        </Typography>
                      </Box>
                    </Stack>
                    <Box sx={{ mt: 1.5 }}>
                      <ReactApexChart
                        options={{
                          ...collectionTrendOptions,
                          colors: [secondaryBlue, alpha(secondaryBlue, 0.5)]
                        }}
                        series={[
                          {
                            name: 'This Week',
                            data: [42, 38, 45, 35, 28, 32, 35]
                          },
                          {
                            name: 'Last Week',
                            data: [35, 30, 38, 30, 24, 28, 30]
                          }
                        ]}
                        type="line"
                        height={60}
                      />
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box
                    component={motion.div}
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    sx={{
                      p: 2,
                      backgroundColor: alpha(accentYellow, 0.08),
                      borderRadius: 2,
                      border: `1px solid ${alpha(accentYellow, 0.2)}`
                    }}
                  >
                    <Stack direction="row" alignItems="center" spacing={2}>
                      <Avatar
                        variant="rounded"
                        sx={{
                          bgcolor: alpha(accentYellow, 0.2),
                          color: accentYellow
                        }}
                      >
                        <Icon icon="solar:document-bold-duotone" />
                      </Avatar>
                      <Box>
                        <Typography color="textSecondary" variant="caption">
                          Corporate Actions
                        </Typography>
                        <Typography variant="h5" sx={{ fontWeight: 600 }}>
                          {activityCounts.corporateActions}
                        </Typography>
                      </Box>
                    </Stack>
                    <Box sx={{ mt: 1.5 }}>
                      <ReactApexChart
                        options={{
                          ...collectionTrendOptions,
                          colors: [accentYellow, alpha(accentYellow, 0.5)]
                        }}
                        series={[
                          {
                            name: 'This Week',
                            data: [22, 28, 24, 18, 15, 28, 35]
                          },
                          {
                            name: 'Last Week',
                            data: [18, 22, 19, 15, 12, 22, 30]
                          }
                        ]}
                        type="line"
                        height={60}
                      />
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box
                    component={motion.div}
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    sx={{
                      p: 2,
                      backgroundColor: alpha(theme.palette.info.main, 0.08),
                      borderRadius: 2,
                      border: `1px solid ${alpha(theme.palette.info.main, 0.2)}`
                    }}
                  >
                    <Stack direction="row" alignItems="center" spacing={2}>
                      <Avatar
                        variant="rounded"
                        sx={{
                          bgcolor: alpha(theme.palette.info.main, 0.2),
                          color: theme.palette.info.main
                        }}
                      >
                        <Icon icon="solar:dollar-bold-duotone" />
                      </Avatar>
                      <Box>
                        <Typography color="textSecondary" variant="caption">
                          Trades
                        </Typography>
                        <Typography variant="h5" sx={{ fontWeight: 600 }}>
                          {activityCounts.trades}
                        </Typography>
                      </Box>
                    </Stack>
                    <Box sx={{ mt: 1.5 }}>
                      <ReactApexChart
                        options={{
                          ...collectionTrendOptions,
                          colors: [theme.palette.info.main, alpha(theme.palette.info.main, 0.5)]
                        }}
                        series={[
                          {
                            name: 'This Week',
                            data: [32, 28, 35, 42, 38, 45, 52]
                          },
                          {
                            name: 'Last Week',
                            data: [28, 24, 30, 35, 32, 38, 45]
                          }
                        ]}
                        type="line"
                        height={60}
                      />
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </MainCard>
          </motion.div>
        </Grid>

        {/* Saudi Market Overview */}
        <Grid item xs={12}>
          <motion.div variants={itemVariant}>
            <MainCard
              contentSX={{ p: '16px !important' }}
              title={
                <Stack direction="row" alignItems="center" spacing={1}>
                  <Icon icon="solar:saudi-arabia-bold" width={22} height={22} style={{ color: primaryGreen }} />
                  <Typography variant="h6">Saudi Market Overview</Typography>
                </Stack>
              }
              secondary={
                <ToggleButtonGroup
                  value={timeRange}
                  exclusive
                  onChange={(e, newValue) => newValue && setTimeRange(newValue)}
                  size="small"
                  sx={{
                    '& .MuiToggleButtonGroup-grouped': {
                      border: `1px solid ${alpha(primaryGreen, 0.15)}`,
                      '&.Mui-selected': {
                        bgcolor: alpha(primaryGreen, 0.1),
                        color: primaryGreen,
                        borderColor: alpha(primaryGreen, 0.25)
                      }
                    }
                  }}
                >
                  <ToggleButton value="weekly">Weekly</ToggleButton>
                  <ToggleButton value="monthly">Monthly</ToggleButton>
                </ToggleButtonGroup>
              }
            >
              <Grid container spacing={2}>
                {/* Market Indices */}
                <Grid item xs={12} md={6}>
                  <Box
                    sx={{
                      p: 1.5,
                      bgcolor: alpha(theme.palette.background.paper, 0.5),
                      borderRadius: 2,
                      border: `1px solid ${theme.palette.divider}`
                    }}
                  >
                    <Typography variant="subtitle2" sx={{ mb: 1.5, display: 'flex', alignItems: 'center' }}>
                      <Icon icon="solar:stocks-bold-duotone" style={{ marginRight: 8, color: secondaryBlue }} />
                      Market Indices
                    </Typography>

                    <Grid container spacing={1.5}>
                      {marketOverviewData.marketIndices.map((index, i) => (
                        <Grid item xs={6} key={i}>
                          <Box
                            component={motion.div}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 + i * 0.1 }}
                            sx={{
                              p: 1.5,
                              borderRadius: 1.5,
                              bgcolor: alpha(theme.palette[index.color].main, 0.08),
                              border: `1px solid ${alpha(theme.palette[index.color].main, 0.2)}`,
                              display: 'flex',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                              height: '100%'
                            }}
                          >
                            <Stack spacing={0.5}>
                              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                {index.name}
                              </Typography>
                              <Typography
                                variant="caption"
                                sx={{
                                  color: theme.palette[index.color].main,
                                  display: 'flex',
                                  alignItems: 'center'
                                }}
                              >
                                <Icon
                                  icon={index.color === 'success' ? 'solar:arrow-up-bold' : 'solar:arrow-down-bold'}
                                  width={12}
                                  height={12}
                                  style={{ marginRight: '4px' }}
                                />
                                {index.change}
                              </Typography>
                            </Stack>

                            <Stack spacing={0.5} alignItems="flex-end">
                              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                {index.value}
                              </Typography>
                              <Box sx={{ width: 50, height: 24 }}>
                                <ReactApexChart
                                  options={getSparklineOptions(index.sparkline, index.color)}
                                  series={[{ data: index.sparkline }]}
                                  type="line"
                                  height={24}
                                  width={50}
                                />
                              </Box>
                            </Stack>
                          </Box>
                        </Grid>
                      ))}
                    </Grid>
                  </Box>
                </Grid>

                {/* Top Stocks */}
                <Grid item xs={12} md={6}>
                  <Box
                    sx={{
                      p: 1.5,
                      bgcolor: alpha(theme.palette.background.paper, 0.5),
                      borderRadius: 2,
                      border: `1px solid ${theme.palette.divider}`,
                      height: '100%'
                    }}
                  >
                    <Typography variant="subtitle2" sx={{ mb: 1.5, display: 'flex', alignItems: 'center' }}>
                      <Icon icon="solar:chart-up-bold-duotone" style={{ marginRight: 8, color: primaryGreen }} />
                      Top Performing Stocks
                    </Typography>

                    <Grid container spacing={1.5}>
                      {marketOverviewData.topStocks.map((stock, i) => (
                        <Grid item xs={6} key={i}>
                          <Box
                            component={motion.div}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 + i * 0.1 }}
                            sx={{
                              p: 1.5,
                              borderRadius: 1.5,
                              bgcolor: alpha(primaryGreen, 0.05),
                              border: `1px solid ${alpha(primaryGreen, 0.1)}`,
                              '&:hover': {
                                bgcolor: alpha(primaryGreen, 0.1)
                              }
                            }}
                          >
                            <Typography variant="body2" sx={{ fontWeight: 600 }} noWrap>
                              {stock.name}
                            </Typography>
                            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mt: 0.5 }}>
                              <Typography variant="caption" color="textSecondary">
                                {stock.ticker}
                              </Typography>
                              <Typography
                                variant="caption"
                                sx={{
                                  color: primaryGreen,
                                  fontWeight: 600,
                                  bgcolor: alpha(primaryGreen, 0.1),
                                  px: 0.75,
                                  py: 0.25,
                                  borderRadius: 1
                                }}
                              >
                                {stock.change}
                              </Typography>
                            </Stack>
                          </Box>
                        </Grid>
                      ))}
                    </Grid>
                  </Box>
                </Grid>

                {/* Sector Performance */}
                <Grid item xs={12} md={7}>
                  <Box
                    sx={{
                      p: 1.5,
                      bgcolor: alpha(theme.palette.background.paper, 0.5),
                      borderRadius: 2,
                      border: `1px solid ${theme.palette.divider}`
                    }}
                  >
                    <Typography variant="subtitle2" sx={{ mb: 1.5, display: 'flex', alignItems: 'center' }}>
                      <Icon icon="solar:chart-bold-duotone" style={{ marginRight: 8, color: secondaryBlue }} />
                      Sector Performance
                    </Typography>

                    <Box
                      component={motion.div}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      sx={{ height: 200 }}
                    >
                      <ReactApexChart
                        options={sectorChartOptions}
                        series={[{ data: marketOverviewData.sectorPerformance[timeRange].map((item) => item.value) }]}
                        type="bar"
                        height="100%"
                      />
                    </Box>
                  </Box>
                </Grid>

                {/* Market Insights */}
                <Grid item xs={12} md={5}>
                  <Box
                    sx={{
                      p: 1.5,
                      bgcolor: alpha(theme.palette.background.paper, 0.5),
                      borderRadius: 2,
                      border: `1px solid ${theme.palette.divider}`,
                      height: '100%'
                    }}
                  >
                    <Typography variant="subtitle2" sx={{ mb: 1.5, display: 'flex', alignItems: 'center' }}>
                      <Icon icon="solar:lightbulb-bold-duotone" style={{ marginRight: 8, color: accentYellow }} />
                      Market Insights
                    </Typography>

                    <Stack spacing={1.5}>
                      {marketOverviewData.marketInsights.map((insight, i) => (
                        <Paper
                          key={i}
                          component={motion.div}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.2 + i * 0.1 }}
                          elevation={0}
                          onClick={() => setSelectedInsight(selectedInsight === i ? null : i)}
                          sx={{
                            p: 1.5,
                            borderRadius: 1.5,
                            cursor: 'pointer',
                            bgcolor:
                              selectedInsight === i
                                ? alpha(secondaryBlue, 0.08)
                                : alpha(theme.palette.background.default, 0.5),
                            border: `1px solid ${selectedInsight === i ? alpha(secondaryBlue, 0.2) : theme.palette.divider}`,
                            '&:hover': {
                              bgcolor: alpha(secondaryBlue, 0.08)
                            }
                          }}
                        >
                          <Stack spacing={1}>
                            <Typography
                              variant="body2"
                              sx={{
                                fontWeight: 600,
                                color: selectedInsight === i ? secondaryBlue : 'text.primary'
                              }}
                            >
                              {insight.title}
                            </Typography>

                            {selectedInsight === i && (
                              <Typography variant="caption" color="textSecondary">
                                {insight.content}
                              </Typography>
                            )}

                            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                              <Chip
                                icon={
                                  <Icon
                                    icon={
                                      selectedInsight === i
                                        ? 'solar:minimise-square-bold'
                                        : 'solar:maximise-square-bold'
                                    }
                                    width={12}
                                  />
                                }
                                label={selectedInsight === i ? 'Less' : 'More'}
                                size="small"
                                color={selectedInsight === i ? 'primary' : 'default'}
                                variant={selectedInsight === i ? 'filled' : 'outlined'}
                                sx={{
                                  height: 22,
                                  fontSize: '0.7rem'
                                }}
                              />
                            </Box>
                          </Stack>
                        </Paper>
                      ))}
                    </Stack>
                  </Box>
                </Grid>
              </Grid>
            </MainCard>
          </motion.div>
        </Grid>

        {/* Data Analysis Chart */}
        <Grid item xs={12} md={6}>
          <motion.div variants={itemVariant}>
            <MainCard
              title={
                <Stack direction="row" alignItems="center" spacing={1}>
                  <Icon icon="solar:analysis-bold-duotone" width={22} height={22} style={{ color: primaryGreen }} />
                  <Typography variant="h6">Data Analysis</Typography>
                </Stack>
              }
              secondary={
                <IconButton sx={{ color: primaryGreen }}>
                  <Icon icon="solar:refresh-bold-duotone" />
                </IconButton>
              }
              contentSX={{ p: 2 }}
            >
              <ReactApexChart
                options={dataAnalysisOptions}
                series={[{ name: 'Data Volume', data: [220, 280, 250, 350, 400] }]}
                type="area"
                height={180}
              />
              <Grid container spacing={2} sx={{ mt: 1 }}>
                {[
                  { label: 'Total Data', value: '1,524 GB', icon: 'solar:database-bold-duotone', color: primaryGreen },
                  {
                    label: 'Processing',
                    value: '284 GB',
                    icon: 'solar:settings-bold-duotone',
                    color: secondaryBlue
                  },
                  { label: 'Archived', value: '5,283 GB', icon: 'solar:box-bold-duotone', color: accentYellow }
                ].map((item, index) => (
                  <Grid item xs={4} key={index}>
                    <Stack alignItems="center" spacing={1}>
                      <Avatar
                        sx={{
                          bgcolor: alpha(item.color, 0.1),
                          color: item.color,
                          width: 36,
                          height: 36
                        }}
                      >
                        <Icon icon={item.icon} width={18} />
                      </Avatar>
                      <Box sx={{ textAlign: 'center' }}>
                        <Typography variant="caption" color="textSecondary">
                          {item.label}
                        </Typography>
                        <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                          {item.value}
                        </Typography>
                      </Box>
                    </Stack>
                  </Grid>
                ))}
              </Grid>
            </MainCard>
          </motion.div>
        </Grid>

        {/* Recent Reconciliation */}
        <Grid item xs={12} md={6}>
          <motion.div variants={itemVariant}>
            <MainCard
              title={
                <Stack direction="row" alignItems="center" spacing={1}>
                  <Icon
                    icon="solar:clipboard-check-bold-duotone"
                    width={22}
                    height={22}
                    style={{ color: secondaryBlue }}
                  />
                  <Typography variant="h6">Recent Reconciliation</Typography>
                </Stack>
              }
              secondary={
                <Button
                  size="small"
                  variant="contained"
                  sx={{
                    bgcolor: secondaryBlue,
                    '&:hover': {
                      bgcolor: alpha(secondaryBlue, 0.9)
                    }
                  }}
                  endIcon={<Icon icon="solar:arrow-right-bold" />}
                >
                  View All
                </Button>
              }
              contentSX={{ p: 2 }}
            >
              <Stack spacing={2}>
                {dashboardData.reconActivity.slice(0, 4).map((item, index) => (
                  <Box
                    key={index}
                    sx={{
                      p: 1.5,
                      borderRadius: 2,
                      bgcolor: alpha(theme.palette.background.default, 0.7),
                      border: `1px solid ${theme.palette.divider}`,
                      '&:hover': {
                        boxShadow: `0 4px 8px ${alpha(theme.palette.common.black, 0.05)}`,
                        bgcolor: alpha(theme.palette.background.paper, 0.9)
                      }
                    }}
                  >
                    <Stack direction="row" alignItems="center" spacing={2}>
                      <Avatar
                        sx={{
                          bgcolor:
                            item.matchRate > 99
                              ? alpha(theme.palette.success.main, 0.1)
                              : item.matchRate > 95
                                ? alpha(theme.palette.warning.main, 0.1)
                                : alpha(theme.palette.error.main, 0.1),
                          color:
                            item.matchRate > 99
                              ? theme.palette.success.main
                              : item.matchRate > 95
                                ? theme.palette.warning.main
                                : theme.palette.error.main
                        }}
                      >
                        <Icon
                          icon={
                            item.matchRate > 99
                              ? 'solar:check-circle-bold'
                              : item.matchRate > 95
                                ? 'solar:bell-bold'
                                : 'solar:danger-bold'
                          }
                        />
                      </Avatar>
                      <Box sx={{ flex: 1 }}>
                        <Typography variant="subtitle2">{item.portfolio}</Typography>
                        <Stack direction="row" alignItems="center" spacing={1} sx={{ mt: 0.5 }}>
                          <Icon
                            icon="solar:calendar-bold-duotone"
                            fontSize="small"
                            style={{
                              color: theme.palette.text.secondary,
                              width: 14,
                              height: 14
                            }}
                          />
                          <Typography variant="caption" color="textSecondary">
                            {item.date}
                          </Typography>
                        </Stack>
                      </Box>
                      <Box sx={{ textAlign: 'right' }}>
                        <Chip
                          label={`${item.matchRate}%`}
                          size="small"
                          color={item.matchRate > 99 ? 'success' : item.matchRate > 95 ? 'warning' : 'error'}
                          sx={{ fontWeight: 600, borderRadius: 1 }}
                        />
                        <Typography variant="caption" color="textSecondary" sx={{ display: 'block', mt: 0.5 }}>
                          {item.exceptions} exceptions
                        </Typography>
                      </Box>
                    </Stack>
                  </Box>
                ))}
              </Stack>
            </MainCard>
          </motion.div>
        </Grid>
      </Grid>
    </motion.div>
  );
};

export default GIBDashboard;
