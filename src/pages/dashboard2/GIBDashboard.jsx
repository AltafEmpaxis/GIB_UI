import { useEffect, useState, useMemo } from 'react';

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
  LinearProgress,
  Tooltip,
  Select,
  FormControl,
  InputLabel
} from '@mui/material';
import { Icon } from '@iconify/react';
import ReactApexChart from 'react-apexcharts';

// project imports
import MainCard from 'components/MainCard';
import useAuth from 'hooks/useAuth';

// mock data
import dashboardData from './dashbord-mockData.json';

const GIBDashboard = () => {
  const theme = useTheme();

  const [isLoading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState(0);
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

  // Theme-based colors
  const neutralGray = theme.palette.mode === 'dark' ? theme.palette.grey[700] : theme.palette.grey[200];

  // Activity summary counts
  const activityCounts = {
    recon: dashboardData.reconActivity.length,
    securities: dashboardData.portfolioActivity.length,
    corporateActions: dashboardData.corporateActions.length,
    trades: dashboardData.tradesActivity.length
  };

  // Side menu items with enhanced icons
  const sideMenuItems = useMemo(
    () => [
      { name: 'Upload Files', icon: 'solar:upload-minimalistic-bold-duotone', color: theme.palette.success.main },
      { name: 'Analytics', icon: 'solar:chart-bold-duotone', active: true, color: theme.palette.primary.main },
      { name: 'Settings', icon: 'solar:tuning-bold-duotone', align: 'right', color: theme.palette.warning.main }
    ],
    [theme.palette.primary.main, theme.palette.success.main, theme.palette.warning.main]
  );

  // Enhanced Chart Options - Collection Trend Line Chart
  const collectionTrendOptions = {
    chart: {
      type: 'line',
      height: 200,
      fontFamily: theme.typography.fontFamily,
      toolbar: {
        show: false
      },
      zoom: {
        enabled: false
      },
      sparkline: {
        enabled: false
      },
      animations: {
        enabled: false
      },
      background: 'transparent'
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'smooth',
      width: [3, 2],
      dashArray: [0, 0],
      colors: [theme.palette.success.main, theme.palette.warning.main]
    },
    colors: [theme.palette.success.main, theme.palette.warning.main],
    fill: {
      type: ['gradient', 'solid'],
      gradient: {
        shade: 'light',
        type: 'vertical',
        shadeIntensity: 0.5,
        gradientToColors: [alpha(theme.palette.success.main, 0.6)],
        inverseColors: false,
        opacityFrom: 0.7,
        opacityTo: 0.1,
        stops: [0, 100]
      }
    },
    grid: {
      borderColor: alpha(theme.palette.divider, 0.6),
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
        right: 10,
        bottom: 0,
        left: 10
      }
    },
    xaxis: {
      categories: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      labels: {
        style: {
          colors: theme.palette.text.secondary,
          fontSize: '11px',
          fontWeight: 500
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
          fontSize: '11px',
          fontWeight: 500
        },
        formatter: (value) => {
          return `$${(value / 1000).toFixed(0)}k`;
        }
      }
    },
    markers: {
      size: [5, 5],
      strokeWidth: 0,
      fillOpacity: 1,
      strokeOpacity: 1,
      hover: {
        size: 7
      }
    },
    tooltip: {
      theme: theme.palette.mode === 'dark' ? 'dark' : 'light',
      style: {
        fontSize: '12px',
        fontFamily: theme.typography.fontFamily
      },
      y: {
        formatter: (value) => {
          return `$${value.toLocaleString()}`;
        }
      },
      marker: {
        show: true
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
      },
      animations: {
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
    colors: [theme.palette.success.main],
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
      },
      animations: {
        enabled: false
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
    colors: [alpha(theme.palette.success.main, 0.5)],
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

  return (
    <Box
      sx={{
        bgcolor:
          theme.palette.mode === 'dark' ? theme.palette.background.default : alpha(theme.palette.primary.light, 0.04),
        borderRadius: 0,
        p: 0
      }}
    >
      <Grid container>
        {/* Main Content Area */}
        <Grid item xs={12} lg={9} sx={{ p: 3 }}>
          {/* Modern Header */}

          {/* Modern Interactive Navigation Bar */}
          <Card
            sx={{
              mb: 4,
              borderRadius: 3,
              boxShadow: theme.customShadows?.z1 || '0 8px 24px rgba(0,0,0,0.07)',
              bgcolor: theme.palette.background.paper,
              overflow: 'hidden',
              border: `1px solid ${alpha(theme.palette.divider, 0.8)}`
            }}
          >
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              sx={{
                px: 3,
                py: 1.75,
                borderBottom: `1px solid ${alpha(theme.palette.divider, 0.5)}`
              }}
            >
              {sideMenuItems
                .filter((item) => !item.align)
                .map((item, index) => (
                  <Box
                    key={index}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      cursor: 'pointer',
                      px: 2.5,
                      py: 1.25,
                      borderRadius: 2,
                      bgcolor: item.active ? alpha(item.color, 0.12) : 'transparent',
                      color: item.active ? item.color : theme.palette.text.secondary,
                      transition: 'all 0.2s ease',
                      '&:hover': {
                        bgcolor: alpha(item.color, 0.1)
                      }
                    }}
                  >
                    <Icon
                      icon={item.icon}
                      width={22}
                      height={22}
                      style={{
                        marginRight: '10px',
                        color: item.active ? item.color : theme.palette.text.secondary
                      }}
                    />
                    <Typography
                      variant="body2"
                      sx={{
                        fontWeight: item.active ? 600 : 500,
                        letterSpacing: item.active ? '0.015em' : 'normal'
                      }}
                    >
                      {item.name}
                    </Typography>
                    {item.active && (
                      <Box
                        sx={{
                          ml: 1,
                          width: 6,
                          height: 6,
                          borderRadius: '50%',
                          bgcolor: item.color
                        }}
                      />
                    )}
                  </Box>
                ))}

              <Box>
                {sideMenuItems
                  .filter((item) => item.align === 'right')
                  .map((item, index) => (
                    <Box
                      key={index}
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        cursor: 'pointer',
                        px: 2.5,
                        py: 1.25,
                        borderRadius: 2,
                        bgcolor: item.active ? alpha(item.color, 0.12) : 'transparent',
                        color: item.active ? item.color : theme.palette.text.secondary,
                        transition: 'all 0.2s ease',
                        '&:hover': {
                          bgcolor: alpha(item.color, 0.08)
                        }
                      }}
                    >
                      <Icon
                        icon={item.icon}
                        width={22}
                        height={22}
                        style={{
                          marginRight: '10px',
                          color: item.color
                        }}
                      />
                      <Typography
                        variant="body2"
                        sx={{
                          fontWeight: item.active ? 600 : 500,
                          letterSpacing: '0.01em'
                        }}
                      >
                        {item.name}
                      </Typography>
                    </Box>
                  ))}
              </Box>
            </Stack>
          </Card>

          {/* Financial Summary Section */}
          <Box sx={{ mb: 3 }}>
            <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 3 }}>
              <Typography variant="h3" sx={{ fontWeight: 700, letterSpacing: '-0.01em' }}>
                $19,249.81
              </Typography>
              <Chip
                label="+12.5% this month"
                color="success"
                size="small"
                icon={<Icon icon="solar:arrow-up-bold" width={14} />}
                sx={{
                  fontWeight: 600,
                  bgcolor: alpha(theme.palette.success.main, 0.15),
                  color: theme.palette.success.main,
                  border: `1px solid ${alpha(theme.palette.success.main, 0.2)}`
                }}
              />
            </Stack>

            <Grid container spacing={3}>
              <Grid item xs={12} md={8}>
                {/* Collection Trend Chart - Enhanced */}
                <Card
                  sx={{
                    height: '100%',
                    p: 2.5,
                    boxShadow: theme.customShadows?.z1 || '0 8px 25px rgba(0,0,0,0.07)',
                    borderRadius: 3,
                    border: `1px solid ${alpha(theme.palette.divider, 0.8)}`
                  }}
                >
                  <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
                    <Typography variant="h6" sx={{ fontWeight: 600, color: theme.palette.primary.main }}>
                      Collection Trend
                    </Typography>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Box
                          sx={{
                            width: 10,
                            height: 10,
                            borderRadius: '50%',
                            bgcolor: theme.palette.success.main,
                            mr: 1
                          }}
                        />
                        <Typography variant="caption" color="textSecondary">
                          Collection
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Box
                          sx={{
                            width: 10,
                            height: 10,
                            borderRadius: '50%',
                            bgcolor: theme.palette.warning.main,
                            mr: 1
                          }}
                        />
                        <Typography variant="caption" color="textSecondary">
                          Target
                        </Typography>
                      </Box>
                    </Stack>
                  </Stack>

                  <ReactApexChart
                    options={collectionTrendOptions}
                    series={[
                      {
                        name: 'Collection',
                        data: [14000, 12500, 18000, 15500, 17000, 19200, 16800, 15000]
                      },
                      {
                        name: 'Target',
                        data: [15000, 15000, 15000, 15000, 15000, 15000, 15000, 15000]
                      }
                    ]}
                    type="line"
                    height={200}
                  />
                </Card>
              </Grid>

              <Grid item xs={12} md={4}>
                <Grid container spacing={2.5}>
                  {/* Yearly Turnover - Enhanced */}
                  <Grid item xs={6}>
                    <Card
                      sx={{
                        p: 2.5,
                        boxShadow: theme.customShadows?.z1 || '0 8px 25px rgba(0,0,0,0.07)',
                        borderRadius: 3,
                        height: '100%',
                        position: 'relative',
                        overflow: 'hidden',
                        background: `linear-gradient(135deg, ${theme.palette.success.main} 0%, ${alpha(theme.palette.success.main, 0.8)} 100%)`,
                        color: theme.palette.success.contrastText,
                        border: `1px solid ${alpha(theme.palette.success.main, 0.2)}`
                      }}
                    >
                      {/* Background decorative element */}
                      <Box
                        sx={{
                          position: 'absolute',
                          top: -30,
                          right: -20,
                          opacity: 0.15,
                          zIndex: 0
                        }}
                      >
                        <Icon icon="solar:money-bag-bold-duotone" width={90} />
                      </Box>

                      <Box sx={{ position: 'relative', zIndex: 1 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                          <Typography variant="body2" sx={{ opacity: 0.9, fontWeight: 500 }}>
                            Yearly Turnover
                          </Typography>
                          <Box
                            sx={{
                              bgcolor: alpha('#fff', 0.25),
                              p: 0.75,
                              borderRadius: 1.5,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center'
                            }}
                          >
                            <Icon icon="solar:graph-up-bold-duotone" width={16} />
                          </Box>
                        </Box>
                        <Typography variant="h5" sx={{ mt: 2, fontWeight: 700, letterSpacing: '-0.01em' }}>
                          $29M
                        </Typography>
                        <Typography variant="caption" sx={{ opacity: 0.8, display: 'block', mt: 0.5 }}>
                          +8% from previous
                        </Typography>
                      </Box>
                    </Card>
                  </Grid>

                  {/* Last Month - Enhanced */}
                  <Grid item xs={6}>
                    <Card
                      sx={{
                        p: 2.5,
                        boxShadow: theme.customShadows?.z1 || '0 8px 25px rgba(0,0,0,0.07)',
                        borderRadius: 3,
                        height: '100%',
                        position: 'relative',
                        overflow: 'hidden',
                        background: `linear-gradient(135deg, ${theme.palette.warning.main} 0%, ${alpha(theme.palette.warning.main, 0.8)} 100%)`,
                        color: theme.palette.warning.contrastText,
                        border: `1px solid ${alpha(theme.palette.warning.main, 0.2)}`
                      }}
                    >
                      {/* Background decorative element */}
                      <Box
                        sx={{
                          position: 'absolute',
                          top: -25,
                          right: -15,
                          opacity: 0.15,
                          zIndex: 0
                        }}
                      >
                        <Icon icon="solar:calendar-bold-duotone" width={80} />
                      </Box>

                      <Box sx={{ position: 'relative', zIndex: 1 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                          <Typography variant="body2" sx={{ opacity: 0.9, fontWeight: 500 }}>
                            Last Month
                          </Typography>
                          <Box
                            sx={{
                              bgcolor: alpha('#fff', 0.25),
                              p: 0.75,
                              borderRadius: 1.5,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center'
                            }}
                          >
                            <Icon icon="solar:calendar-mark-bold-duotone" width={16} />
                          </Box>
                        </Box>
                        <Typography variant="h5" sx={{ mt: 2, fontWeight: 700, letterSpacing: '-0.01em' }}>
                          $1.4M
                        </Typography>
                        <Typography variant="caption" sx={{ opacity: 0.8, display: 'block', mt: 0.5 }}>
                          +3.2% from October
                        </Typography>
                      </Box>
                    </Card>
                  </Grid>

                  {/* Today's Activity - Enhanced */}
                  <Grid item xs={12}>
                    <Card
                      sx={{
                        p: 2.5,
                        boxShadow: theme.customShadows?.z1 || '0 8px 25px rgba(0,0,0,0.07)',
                        borderRadius: 3,
                        bgcolor:
                          theme.palette.mode === 'dark'
                            ? alpha(theme.palette.primary.main, 0.3)
                            : alpha(theme.palette.grey[100], 0.5),
                        border: `1px solid ${alpha(theme.palette.divider, 0.8)}`
                      }}
                    >
                      <Stack spacing={2.5}>
                        <Box>
                          <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
                            <Icon
                              icon="solar:clock-circle-bold-duotone"
                              color={theme.palette.success.main}
                              width={18}
                            />
                            <Typography variant="body2" color="textSecondary" sx={{ fontWeight: 500 }}>
                              Today's Received
                            </Typography>
                          </Stack>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Typography variant="h6" sx={{ fontWeight: 700 }}>
                              $2,890
                            </Typography>
                            <Box>
                              <Chip
                                size="small"
                                label="Live"
                                sx={{
                                  bgcolor: alpha(theme.palette.warning.main, 0.15),
                                  color: theme.palette.warning.main,
                                  fontWeight: 600,
                                  height: 24
                                }}
                              />
                            </Box>
                          </Box>
                          <LinearProgress
                            variant="determinate"
                            value={35}
                            sx={{
                              mt: 1,
                              height: 6,
                              borderRadius: 3,
                              bgcolor: alpha(theme.palette.divider, 0.3),
                              '& .MuiLinearProgress-bar': {
                                bgcolor: theme.palette.success.main,
                                borderRadius: 3
                              }
                            }}
                          />
                        </Box>
                        <Box>
                          <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
                            <Icon
                              icon="solar:dollar-minimalistic-bold-duotone"
                              color={theme.palette.primary.main}
                              width={18}
                            />
                            <Typography variant="body2" color="textSecondary" sx={{ fontWeight: 500 }}>
                              Monthly Total
                            </Typography>
                          </Stack>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Typography variant="h6" sx={{ fontWeight: 700 }}>
                              $82,890
                            </Typography>
                            <Chip
                              size="small"
                              label="+18%"
                              icon={<Icon icon="solar:arrow-up-bold" width={14} />}
                              sx={{
                                bgcolor: alpha(theme.palette.success.main, 0.15),
                                color: theme.palette.success.main,
                                fontWeight: 600,
                                height: 24
                              }}
                            />
                          </Box>
                          <LinearProgress
                            variant="determinate"
                            value={82}
                            sx={{
                              mt: 1,
                              height: 6,
                              borderRadius: 3,
                              bgcolor: alpha(theme.palette.divider, 0.3),
                              '& .MuiLinearProgress-bar': {
                                bgcolor: theme.palette.primary.main,
                                borderRadius: 3
                              }
                            }}
                          />
                        </Box>
                      </Stack>
                    </Card>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Box>

          {/* Top Sales Agent & Cash at Bank - Enhanced Section */}
          <Box sx={{ mb: 4 }}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Card
                  sx={{
                    p: 2.5,
                    boxShadow: '0 8px 25px rgba(0,0,0,0.07)',
                    borderRadius: 3,
                    border: `1px solid ${alpha(theme.palette.divider, 0.8)}`,
                    height: '100%'
                  }}
                >
                  <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2.5 }}>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 600,
                        color: theme.palette.primary.main,
                        display: 'flex',
                        alignItems: 'center'
                      }}
                    >
                      <Icon
                        icon="solar:user-check-bold-duotone"
                        style={{
                          marginRight: '8px',
                          color: theme.palette.success.main,
                          fontSize: '20px'
                        }}
                      />
                      Top Sales Agents
                    </Typography>
                    <Chip
                      label="This Month"
                      size="small"
                      sx={{
                        bgcolor: alpha(theme.palette.success.main, 0.08),
                        color: theme.palette.success.main,
                        fontWeight: 500,
                        border: `1px solid ${alpha(theme.palette.success.main, 0.2)}`
                      }}
                    />
                  </Stack>

                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2.5 }}>
                    <AvatarGroup
                      max={5}
                      sx={{
                        '& .MuiAvatar-root': {
                          width: 36,
                          height: 36,
                          fontSize: '1rem',
                          fontWeight: 600,
                          border: `2px solid ${theme.palette.background.paper}`,
                          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                        }
                      }}
                    >
                      <Avatar sx={{ bgcolor: theme.palette.success.main }}>JD</Avatar>
                      <Avatar sx={{ bgcolor: theme.palette.warning.main }}>JS</Avatar>
                      <Avatar sx={{ bgcolor: theme.palette.primary.main }}>RJ</Avatar>
                      <Avatar sx={{ bgcolor: theme.palette.primary.main }}>AM</Avatar>
                      <Avatar sx={{ bgcolor: theme.palette.error.main }}>KS</Avatar>
                      <Avatar sx={{ bgcolor: theme.palette.success.main }}>FN</Avatar>
                    </AvatarGroup>
                    <Box
                      sx={{
                        ml: 'auto',
                        p: 1,
                        px: 1.5,
                        borderRadius: 2,
                        bgcolor: alpha(theme.palette.primary.main, 0.08),
                        border: `1px solid ${alpha(theme.palette.primary.main, 0.15)}`,
                        display: 'flex',
                        alignItems: 'center'
                      }}
                    >
                      <Icon
                        icon="solar:users-group-rounded-bold-duotone"
                        color={theme.palette.primary.main}
                        width={18}
                        style={{ marginRight: '6px' }}
                      />
                      <Typography variant="body2" fontWeight={500} color={theme.palette.primary.main}>
                        Team Performance
                      </Typography>
                    </Box>
                  </Box>

                  <Stack
                    spacing={1}
                    sx={{
                      p: 2,
                      borderRadius: 2,
                      bgcolor: alpha(theme.palette.background.default, 0.6),
                      border: `1px solid ${alpha(theme.palette.divider, 0.5)}`
                    }}
                  >
                    {[
                      { name: 'Total Sales', value: '$285,400', change: '+12.5%', color: theme.palette.success.main },
                      {
                        name: 'Average per Agent',
                        value: '$47,567',
                        change: '+8.2%',
                        color: theme.palette.warning.main
                      }
                    ].map((item, index) => (
                      <Box
                        key={index}
                        sx={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          py: 0.75
                        }}
                      >
                        <Typography variant="body2" color="textSecondary" fontWeight={500}>
                          {item.name}
                        </Typography>
                        <Stack direction="row" spacing={1} alignItems="center">
                          <Typography variant="body2" fontWeight={700} color="textPrimary">
                            {item.value}
                          </Typography>
                          <Chip
                            size="small"
                            label={item.change}
                            icon={<Icon icon="solar:arrow-up-bold" width={12} />}
                            sx={{
                              height: 20,
                              fontSize: '0.7rem',
                              fontWeight: 600,
                              bgcolor: alpha(item.color, 0.12),
                              color: item.color,
                              border: `1px solid ${alpha(item.color, 0.2)}`
                            }}
                          />
                        </Stack>
                      </Box>
                    ))}
                  </Stack>

                  <Button
                    fullWidth
                    variant="text"
                    sx={{
                      mt: 2.5,
                      color: theme.palette.primary.contrastText,
                      bgcolor: alpha(theme.palette.background.paper, 0.1),
                      '&:hover': {
                        bgcolor: alpha(theme.palette.background.paper, 0.15)
                      }
                    }}
                    endIcon={<Icon icon="solar:arrow-right-bold" />}
                  >
                    View All Performance Metrics
                  </Button>
                </Card>
              </Grid>

              <Grid item xs={12} md={6}>
                <Card
                  sx={{
                    p: 2.5,
                    boxShadow: '0 8px 25px rgba(0,0,0,0.07)',
                    borderRadius: 3,
                    border: `1px solid ${alpha(theme.palette.divider, 0.8)}`,
                    height: '100%',
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                >
                  {/* Background decorative elements */}
                  <Box
                    sx={{
                      position: 'absolute',
                      top: -40,
                      right: -30,
                      opacity: 0.04,
                      zIndex: 0,
                      transform: 'rotate(10deg)'
                    }}
                  >
                    <Icon icon="solar:card-bold-duotone" width={160} />
                  </Box>

                  <Box sx={{ position: 'relative', zIndex: 1 }}>
                    <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2.5 }}>
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 600,
                          color: theme.palette.primary.main,
                          display: 'flex',
                          alignItems: 'center'
                        }}
                      >
                        <Icon
                          icon="solar:buildings-3-bold-duotone"
                          style={{
                            marginRight: '8px',
                            color: theme.palette.primary.main,
                            fontSize: '20px'
                          }}
                        />
                        Banking Summary
                      </Typography>
                      <IconButton
                        size="small"
                        sx={{
                          bgcolor: alpha(theme.palette.primary.main, 0.08),
                          color: theme.palette.primary.main
                        }}
                      >
                        <Icon icon="solar:refresh-bold" width={16} />
                      </IconButton>
                    </Stack>

                    <Box
                      sx={{
                        p: 2.5,
                        borderRadius: 3,
                        bgcolor: alpha(theme.palette.primary.main, 0.04),
                        border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                        mb: 2.5
                      }}
                    >
                      <Stack spacing={1}>
                        <Typography variant="body2" color="textSecondary" fontWeight={500}>
                          Total Cash at Bank
                        </Typography>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <Typography variant="h4" sx={{ fontWeight: 700, color: theme.palette.primary.main }}>
                            $9.38M
                          </Typography>
                          <Chip
                            size="small"
                            label="+3.6% this week"
                            icon={<Icon icon="solar:arrow-up-bold" width={14} />}
                            sx={{
                              bgcolor: alpha(theme.palette.success.main, 0.15),
                              color: theme.palette.success.main,
                              fontWeight: 600,
                              height: 24
                            }}
                          />
                        </Box>
                        <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
                          {['SABB', 'NCB', 'Alinma'].map((bank, i) => (
                            <Chip
                              key={i}
                              label={bank}
                              size="small"
                              sx={{
                                bgcolor: theme.palette.background.paper,
                                border: `1px solid ${alpha(theme.palette.divider, 0.5)}`,
                                height: 24,
                                fontWeight: 500
                              }}
                            />
                          ))}
                        </Stack>
                      </Stack>
                    </Box>

                    <Stack spacing={2}>
                      {[
                        {
                          name: 'Available Funds',
                          value: '$3.85M',
                          icon: 'solar:wallet-money-bold-duotone',
                          color: theme.palette.success.main
                        },
                        {
                          name: 'Reserved Amounts',
                          value: '$5.53M',
                          icon: 'solar:lock-bold-duotone',
                          color: theme.palette.warning.main
                        }
                      ].map((item, index) => (
                        <Box
                          key={index}
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            p: 1.5,
                            borderRadius: 2,
                            bgcolor: alpha(theme.palette.background.default, 0.6),
                            border: `1px solid ${alpha(theme.palette.divider, 0.5)}`
                          }}
                        >
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Box
                              sx={{
                                width: 36,
                                height: 36,
                                mr: 1.5,
                                bgcolor: alpha(item.color, 0.12),
                                borderRadius: 1.5,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: item.color,
                                border: `1px solid ${alpha(item.color, 0.2)}`
                              }}
                            >
                              <Icon icon={item.icon} width={20} />
                            </Box>
                            <Typography variant="body2" fontWeight={500} color="textSecondary">
                              {item.name}
                            </Typography>
                          </Box>
                          <Typography variant="body1" fontWeight={700}>
                            {item.value}
                          </Typography>
                        </Box>
                      ))}
                    </Stack>
                  </Box>
                </Card>
              </Grid>
            </Grid>
          </Box>

          {/* Data Analysis & Monthly Invoices - Enhanced Section */}
          <Box sx={{ mb: 3 }}>
            <Grid container spacing={3}>
              {/* Data Analysis - Enhanced */}
              <Grid item xs={12} md={6}>
                <Card
                  sx={{
                    p: 2.5,
                    boxShadow: '0 8px 25px rgba(0,0,0,0.07)',
                    borderRadius: 3,
                    border: `1px solid ${alpha(theme.palette.divider, 0.8)}`,
                    height: '100%'
                  }}
                >
                  <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 600,
                        color: theme.palette.primary.main,
                        display: 'flex',
                        alignItems: 'center'
                      }}
                    >
                      <Icon
                        icon="solar:chart-bold-duotone"
                        style={{
                          marginRight: '8px',
                          color: theme.palette.primary.main,
                          fontSize: '20px'
                        }}
                      />
                      Data Analysis
                    </Typography>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        bgcolor: alpha(theme.palette.success.main, 0.1),
                        color: theme.palette.success.main,
                        py: 0.5,
                        px: 1.5,
                        borderRadius: 1.5,
                        border: `1px solid ${alpha(theme.palette.success.main, 0.2)}`
                      }}
                    >
                      <Icon icon="solar:arrow-up-bold" style={{ marginRight: '4px', fontSize: '14px' }} />
                      <Typography variant="caption" fontWeight={600}>
                        +12% Growth
                      </Typography>
                    </Box>
                  </Stack>

                  <Box sx={{ height: 180, position: 'relative' }}>
                    <ReactApexChart
                      options={{
                        ...dataAnalysisOptions,
                        chart: {
                          ...dataAnalysisOptions.chart
                        },
                        fill: {
                          type: 'gradient',
                          gradient: {
                            shade: 'light',
                            type: 'vertical',
                            shadeIntensity: 0.5,
                            gradientToColors: [alpha(theme.palette.success.main, 0.1)],
                            inverseColors: false,
                            opacityFrom: 0.8,
                            opacityTo: 0.2,
                            stops: [0, 100]
                          }
                        }
                      }}
                      series={[
                        {
                          name: 'Data',
                          data: [30, 40, 25, 50, 49]
                        }
                      ]}
                      type="area"
                      height={180}
                    />
                    <Box
                      sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 60,
                        height: 60,
                        bgcolor: theme.palette.success.main,
                        color: '#fff',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 700,
                        fontSize: '18px',
                        boxShadow: '0 4px 15px rgba(0,0,0,0.15)'
                      }}
                    >
                      38%
                    </Box>
                  </Box>

                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      p: 1.5,
                      borderRadius: 2,
                      bgcolor: alpha(theme.palette.background.default, 0.6),
                      border: `1px solid ${alpha(theme.palette.divider, 0.5)}`,
                      mt: 2
                    }}
                  >
                    {[
                      {
                        label: 'Total Users',
                        value: '2.4K',
                        icon: 'solar:users-group-rounded-bold-duotone',
                        color: theme.palette.success.main
                      },
                      {
                        label: 'Avg. Time',
                        value: '3:45',
                        icon: 'solar:clock-circle-bold-duotone',
                        color: theme.palette.warning.main
                      },
                      {
                        label: 'Bounce Rate',
                        value: '24%',
                        icon: 'solar:sort-by-time-bold-duotone',
                        color: theme.palette.primary.main
                      }
                    ].map((item, index) => (
                      <Box
                        key={index}
                        sx={{
                          textAlign: 'center',
                          px: 1
                        }}
                      >
                        <Icon icon={item.icon} style={{ fontSize: '20px', color: item.color, marginBottom: '4px' }} />
                        <Typography variant="caption" display="block" color="textSecondary" fontWeight={500}>
                          {item.label}
                        </Typography>
                        <Typography variant="body2" fontWeight={700}>
                          {item.value}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                </Card>
              </Grid>

              {/* Monthly Invoices - Enhanced */}
              <Grid item xs={12} md={6}>
                <Card
                  sx={{
                    p: 2.5,
                    boxShadow: '0 8px 25px rgba(0,0,0,0.07)',
                    borderRadius: 3,
                    border: `1px solid ${alpha(theme.palette.divider, 0.8)}`,
                    height: '100%',
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                >
                  {/* Background decorative element */}
                  <Box
                    sx={{
                      position: 'absolute',
                      top: -20,
                      right: -20,
                      opacity: 0.04,
                      transform: 'rotate(-10deg)',
                      zIndex: 0
                    }}
                  >
                    <Icon icon="solar:bill-list-bold-duotone" width={130} />
                  </Box>

                  <Box sx={{ position: 'relative', zIndex: 1 }}>
                    <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 600,
                          color: theme.palette.primary.main,
                          display: 'flex',
                          alignItems: 'center'
                        }}
                      >
                        <Icon
                          icon="solar:document-text-bold-duotone"
                          style={{
                            marginRight: '8px',
                            color: theme.palette.warning.main,
                            fontSize: '20px'
                          }}
                        />
                        Monthly Invoices
                      </Typography>
                      <Select
                        displayEmpty
                        size="small"
                        defaultValue="thisyear"
                        sx={{
                          minWidth: 120,
                          height: 32,
                          fontSize: '0.8rem',
                          '& .MuiOutlinedInput-notchedOutline': {
                            borderColor: alpha(theme.palette.divider, 0.8)
                          }
                        }}
                      >
                        <MenuItem value="thisyear">This Year</MenuItem>
                        <MenuItem value="lastyear">Last Year</MenuItem>
                      </Select>
                    </Stack>

                    <Box
                      sx={{
                        p: 2.5,
                        borderRadius: 3,
                        bgcolor: alpha(theme.palette.warning.main, 0.06),
                        border: `1px solid ${alpha(theme.palette.warning.main, 0.1)}`,
                        mb: 3,
                        position: 'relative'
                      }}
                    >
                      <Box
                        sx={{
                          position: 'absolute',
                          top: -1,
                          right: -1,
                          bg: 'transparent',
                          width: 40,
                          height: 40,
                          borderRadius: '0 8px 0 8px',
                          overflow: 'hidden'
                        }}
                      >
                        <Box
                          sx={{
                            width: '100%',
                            height: '100%',
                            bgcolor: theme.palette.warning.main,
                            transform: 'rotate(45deg) translate(20%, -20%)'
                          }}
                        />
                      </Box>

                      <Stack spacing={1}>
                        <Typography variant="body2" color="textSecondary" fontWeight={500}>
                          Total Monthly Invoices
                        </Typography>
                        <Typography variant="h3" sx={{ fontWeight: 700, color: theme.palette.warning.main }}>
                          $24,000
                        </Typography>
                        <Typography
                          variant="caption"
                          sx={{
                            color: theme.palette.success.main,
                            display: 'flex',
                            alignItems: 'center'
                          }}
                        >
                          <Icon icon="solar:arrow-up-bold" style={{ fontSize: '12px', marginRight: '4px' }} />
                          +8.3% from previous month
                        </Typography>
                      </Stack>
                    </Box>

                    <Box>
                      <ReactApexChart
                        options={{
                          ...monthlyInvoicesOptions,
                          chart: {
                            ...monthlyInvoicesOptions.chart
                          },
                          colors: [alpha(theme.palette.warning.main, 0.8)],
                          tooltip: {
                            theme: theme.palette.mode === 'dark' ? 'dark' : 'light',
                            y: {
                              formatter: function (val) {
                                return `$${val}k`;
                              }
                            }
                          },
                          plotOptions: {
                            bar: {
                              borderRadius: 4,
                              columnWidth: '60%',
                              colors: {
                                ranges: [
                                  {
                                    from: 0,
                                    to: 20,
                                    color: alpha(theme.palette.warning.main, 0.5)
                                  },
                                  {
                                    from: 21,
                                    to: 30,
                                    color: alpha(theme.palette.warning.main, 0.8)
                                  },
                                  {
                                    from: 31,
                                    to: 100,
                                    color: theme.palette.warning.main
                                  }
                                ]
                              }
                            }
                          }
                        }}
                        series={[
                          {
                            name: 'Monthly Invoices',
                            data: [19, 28, 30, 22, 25, 28, 30, 35, 25, 28, 32, 28]
                          }
                        ]}
                        type="bar"
                        height={120}
                      />
                    </Box>

                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        px: 1,
                        mt: 1
                      }}
                    >
                      {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map(
                        (month, index) => (
                          <Typography
                            key={index}
                            variant="caption"
                            color="textSecondary"
                            sx={{
                              fontSize: '8px',
                              fontWeight: 500
                            }}
                          >
                            {month}
                          </Typography>
                        )
                      )}
                    </Box>
                  </Box>
                </Card>
              </Grid>
            </Grid>
          </Box>
        </Grid>

        {/* Right Sidebar */}
        <Grid
          item
          xs={12}
          lg={3}
          sx={{
            display: { xs: 'none', lg: 'block' },
            bgcolor:
              theme.palette.mode === 'dark' ? alpha(theme.palette.primary.dark, 0.8) : theme.palette.primary.main,
            p: 2.5,
            color: theme.palette.primary.contrastText,
            boxShadow: '-4px 0 20px rgba(0,0,0,0.1)'
          }}
        >
          <Stack spacing={3}>
            {/* Sidebar Top Spacing */}
            <Box sx={{ mb: 2 }}></Box>

            {/* GIB Logo */}
            <Box sx={{ textAlign: 'center', mb: 2 }}>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 700,
                  color: theme.palette.primary.contrastText,
                  letterSpacing: '0.02em'
                }}
              >
                GIB SmartOPS
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: alpha(theme.palette.primary.contrastText, 0.85),
                  mt: 0.5
                }}
              >
                Gulf International Bank
              </Typography>
            </Box>

            {/* Activity Card - GIB Styled */}
            <Card
              sx={{
                p: 2.5,
                bgcolor: alpha(theme.palette.background.paper, 0.12),
                backdropFilter: 'blur(10px)',
                borderRadius: 3,
                boxShadow: theme.customShadows?.z1 || '0 8px 24px rgba(0,0,0,0.12)',
                border: `1px solid ${alpha(theme.palette.background.paper, 0.2)}`
              }}
            >
              <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 2.5 }}>
                <Box
                  sx={{
                    p: 0.75,
                    borderRadius: 1.5,
                    bgcolor: alpha(theme.palette.background.paper, 0.15),
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <Icon icon="solar:clock-circle-bold-duotone" color={theme.palette.primary.contrastText} width={18} />
                </Box>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 600,
                    color: theme.palette.primary.contrastText,
                    textShadow: '0 1px 2px rgba(0,0,0,0.1)'
                  }}
                >
                  Recent Activity
                </Typography>
              </Stack>

              <Stack spacing={2.5}>
                {[
                  {
                    text: 'Reconciliation Completed',
                    time: '10:23 AM',
                    icon: 'solar:check-circle-bold-duotone',
                    color: theme.palette.success.main
                  },
                  {
                    text: 'New Portfolio Added',
                    time: 'Yesterday',
                    icon: 'solar:folder-add-bold-duotone',
                    color: theme.palette.info.main
                  },
                  {
                    text: 'Report Generated',
                    time: '2 days ago',
                    icon: 'solar:file-bold-duotone',
                    color: theme.palette.warning.main
                  }
                ].map((activity, index) => (
                  <Box
                    key={index}
                    sx={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      p: 1.5,
                      borderRadius: 2,
                      bgcolor: alpha(theme.palette.background.paper, 0.08),
                      border: `1px solid ${alpha(theme.palette.background.paper, 0.15)}`,
                      '&:hover': {
                        bgcolor: alpha(theme.palette.background.paper, 0.12)
                      }
                    }}
                  >
                    <Box
                      sx={{
                        width: 32,
                        height: 32,
                        bgcolor: alpha(activity.color, 0.2),
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mr: 1.5
                      }}
                    >
                      <Icon icon={activity.icon} width={18} color={activity.color} />
                    </Box>
                    <Box sx={{ flex: 1 }}>
                      <Typography
                        variant="body2"
                        sx={{
                          fontWeight: 600,
                          color: theme.palette.primary.contrastText,
                          textShadow: '0 1px 1px rgba(0,0,0,0.1)'
                        }}
                      >
                        {activity.text}
                      </Typography>
                      <Typography
                        variant="caption"
                        sx={{
                          color: alpha(theme.palette.primary.contrastText, 0.85)
                        }}
                      >
                        {activity.time}
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </Stack>

              <Button
                fullWidth
                variant="text"
                sx={{
                  mt: 2,
                  color: theme.palette.primary.contrastText,
                  bgcolor: alpha(theme.palette.background.paper, 0.1),
                  borderRadius: 2,
                  border: `1px solid ${alpha(theme.palette.background.paper, 0.15)}`,
                  '&:hover': {
                    bgcolor: alpha(theme.palette.background.paper, 0.15)
                  }
                }}
                endIcon={<Icon icon="solar:arrow-right-bold" />}
              >
                View All Activities
              </Button>
            </Card>

            {/* GIB Stats Card */}
            <Card
              sx={{
                p: 2.5,
                bgcolor: alpha(theme.palette.background.paper, 0.12),
                backdropFilter: 'blur(10px)',
                borderRadius: 3,
                boxShadow: theme.customShadows?.z1 || '0 8px 24px rgba(0,0,0,0.12)',
                border: `1px solid ${alpha(theme.palette.background.paper, 0.2)}`
              }}
            >
              <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 2.5 }}>
                <Box
                  sx={{
                    p: 0.75,
                    borderRadius: 1.5,
                    bgcolor: alpha(theme.palette.background.paper, 0.15),
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <Icon icon="solar:chart-bold-duotone" color={theme.palette.primary.contrastText} width={18} />
                </Box>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 600,
                    color: theme.palette.primary.contrastText,
                    textShadow: '0 1px 2px rgba(0,0,0,0.1)'
                  }}
                >
                  GIB Stats
                </Typography>
              </Stack>

              <Stack spacing={2}>
                {[
                  { label: 'Total Portfolios', value: '24', icon: 'solar:folder-bold-duotone' },
                  { label: 'Active Securities', value: '1,458', icon: 'solar:document-bold-duotone' },
                  { label: 'Daily Trades', value: '128', icon: 'solar:graph-new-up-bold-duotone' }
                ].map((stat, index) => (
                  <Box
                    key={index}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      p: 1.5,
                      borderRadius: 2,
                      bgcolor: alpha(theme.palette.background.paper, 0.08),
                      border: `1px solid ${alpha(theme.palette.background.paper, 0.15)}`
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Box
                        sx={{
                          width: 32,
                          height: 32,
                          bgcolor: alpha(theme.palette.background.paper, 0.15),
                          borderRadius: '50%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          mr: 1.5
                        }}
                      >
                        <Icon icon={stat.icon} width={18} color={theme.palette.primary.contrastText} />
                      </Box>
                      <Typography
                        variant="body2"
                        sx={{
                          fontWeight: 500,
                          color: alpha(theme.palette.primary.contrastText, 0.85)
                        }}
                      >
                        {stat.label}
                      </Typography>
                    </Box>
                    <Typography
                      variant="body1"
                      sx={{
                        fontWeight: 700,
                        color: theme.palette.primary.contrastText
                      }}
                    >
                      {stat.value}
                    </Typography>
                  </Box>
                ))}
              </Stack>
            </Card>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
};

export default GIBDashboard;
