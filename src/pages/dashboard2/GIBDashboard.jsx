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
import { GRID_SPACING } from 'config';

const GIBDashboard = () => {
  const theme = useTheme();

  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Collection Trend Line Chart
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
      width: [2, 2],
      dashArray: [0, 0],
      colors: [theme.palette.primary.main, theme.palette.secondary.main]
    },
    colors: [theme.palette.primary.main, theme.palette.secondary.main],
    fill: {
      type: ['solid', 'solid'],
      opacity: [1, 1]
    },
    grid: {
      borderColor: theme.palette.divider,
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
      size: [4, 4],
      strokeWidth: 0,
      fillOpacity: 1,
      strokeOpacity: 1,
      hover: {
        size: 5
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
    colors: [theme.palette.primary.main],
    fill: {
      type: 'solid',
      opacity: 0.2
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
    colors: [theme.palette.secondary.main],
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
    <Box>
      <Grid container>
        {/* Main Content Area */}
        <Grid item xs={12} lg={9} sx={{ pr: 2 }}>
          {/* Financial Summary Section */}
          <Box sx={{ pb: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={8}>
                {/* Collection Trend Chart */}
                <Card
                  sx={{
                    height: '100%',
                    p: 2
                  }}
                >
                  <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
                    <Typography
                      variant="h6"
                      sx={{ fontWeight: 600, color: theme.palette.text.primary, display: 'flex', alignItems: 'center' }}
                    >
                      <Avatar
                        variant="rounded"
                        sx={{
                          width: 24,
                          height: 24,
                          mr: 1,
                          bgcolor: theme.palette.primary.lighter,
                          color: theme.palette.primary.main
                        }}
                      >
                        <Icon icon="solar:chart-line-bold-duotone" width={16} />
                      </Avatar>
                      Collection Trend
                    </Typography>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Box
                          sx={{
                            width: 10,
                            height: 10,
                            borderRadius: '50%',
                            bgcolor: theme.palette.primary.main,
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
                            bgcolor: theme.palette.secondary.main,
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
                <Grid container spacing={2}>
                  {/* Yearly Turnover - Enhanced */}
                  <Grid item xs={6}>
                    <Card
                      sx={{
                        height: '100%',
                        bgcolor: theme.palette.primary.main,
                        color: theme.palette.common.white,
                        p: 2
                      }}
                    >
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <Typography
                          variant="body2"
                          sx={{ fontWeight: 500, color: theme.palette.common.white, opacity: 0.95 }}
                        >
                          Yearly Turnover
                        </Typography>
                        <Box
                          sx={{
                            bgcolor: alpha('#fff', 0.25),
                            p: 0.75,
                            borderRadius: 1,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}
                        >
                          <Icon icon="solar:graph-up-bold-duotone" width={16} />
                        </Box>
                      </Box>
                      <Typography variant="h5" sx={{ mt: 2, fontWeight: 700, color: theme.palette.common.white }}>
                        $29M
                      </Typography>
                      <Typography
                        variant="caption"
                        sx={{ color: theme.palette.common.white, opacity: 0.9, display: 'block', mt: 0.5 }}
                      >
                        +8% from previous
                      </Typography>
                    </Card>
                  </Grid>

                  {/* Last Month - Enhanced */}
                  <Grid item xs={6}>
                    <Card
                      sx={{
                        height: '100%',
                        bgcolor: theme.palette.secondary.main,
                        color: theme.palette.common.white,
                        p: 2
                      }}
                    >
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <Typography
                          variant="body2"
                          sx={{ fontWeight: 500, color: theme.palette.common.white, opacity: 0.95 }}
                        >
                          Last Month
                        </Typography>
                        <Box
                          sx={{
                            bgcolor: alpha('#fff', 0.25),
                            p: 0.75,
                            borderRadius: 1,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}
                        >
                          <Icon icon="solar:calendar-mark-bold-duotone" width={16} />
                        </Box>
                      </Box>
                      <Typography variant="h5" sx={{ mt: 2, fontWeight: 700, color: theme.palette.common.white }}>
                        $1.4M
                      </Typography>
                      <Typography
                        variant="caption"
                        sx={{ color: theme.palette.common.white, opacity: 0.9, display: 'block', mt: 0.5 }}
                      >
                        +3.2% from October
                      </Typography>
                    </Card>
                  </Grid>

                  {/* Today's Activity - Enhanced */}
                  <Grid item xs={12}>
                    <Card sx={{ p: 2 }}>
                      <Stack spacing={2}>
                        <Box>
                          <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
                            <Avatar
                              variant="rounded"
                              sx={{
                                width: 22,
                                height: 22,
                                bgcolor: theme.palette.primary.lighter,
                                color: theme.palette.primary.main
                              }}
                            >
                              <Icon icon="solar:clock-circle-bold-duotone" width={14} />
                            </Avatar>
                            <Typography variant="body2" color="textSecondary" sx={{ fontWeight: 500 }}>
                              Today's Received
                            </Typography>
                          </Stack>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Typography variant="h6" sx={{ fontWeight: 700, color: theme.palette.primary.main }}>
                              $2,890
                            </Typography>
                            <Box>
                              <Chip
                                size="small"
                                label="Live"
                                sx={{
                                  bgcolor: theme.palette.primary.lighter,
                                  color: theme.palette.primary.main,
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
                              borderRadius: 1,
                              bgcolor: theme.palette.grey[200],
                              '& .MuiLinearProgress-bar': {
                                bgcolor: theme.palette.primary.main,
                                borderRadius: 1
                              }
                            }}
                          />
                        </Box>
                        <Box>
                          <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
                            <Avatar
                              variant="rounded"
                              sx={{
                                width: 22,
                                height: 22,
                                bgcolor: theme.palette.secondary.lighter || alpha(theme.palette.secondary.main, 0.2),
                                color: theme.palette.secondary.main
                              }}
                            >
                              <Icon icon="solar:dollar-minimalistic-bold-duotone" width={14} />
                            </Avatar>
                            <Typography variant="body2" color="textSecondary" sx={{ fontWeight: 500 }}>
                              Monthly Total
                            </Typography>
                          </Stack>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Typography variant="h6" sx={{ fontWeight: 700, color: theme.palette.secondary.main }}>
                              $82,890
                            </Typography>
                            <Chip
                              size="small"
                              label="+18%"
                              icon={<Icon icon="solar:arrow-up-bold" width={14} />}
                              sx={{
                                bgcolor: theme.palette.secondary.lighter || alpha(theme.palette.secondary.main, 0.2),
                                color: theme.palette.secondary.main,
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
                              borderRadius: 1,
                              bgcolor: theme.palette.grey[200],
                              '& .MuiLinearProgress-bar': {
                                bgcolor: theme.palette.secondary.main,
                                borderRadius: 1
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
          <Box sx={{ mb: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <MainCard>
                  <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 600,
                        color: theme.palette.text.primary,
                        display: 'flex',
                        alignItems: 'center'
                      }}
                    >
                      <Avatar
                        variant="rounded"
                        sx={{
                          width: 24,
                          height: 24,
                          mr: 1,
                          bgcolor: theme.palette.primary.lighter,
                          color: theme.palette.primary.main
                        }}
                      >
                        <Icon icon="solar:user-check-bold-duotone" width={16} />
                      </Avatar>
                      Top Sales Agents
                    </Typography>
                    <Chip
                      label="This Month"
                      size="small"
                      sx={{
                        bgcolor: theme.palette.primary.lighter,
                        color: theme.palette.primary.main,
                        fontWeight: 500
                      }}
                    />
                  </Stack>

                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <AvatarGroup
                      max={5}
                      sx={{
                        '& .MuiAvatar-root': {
                          width: 36,
                          height: 36,
                          fontSize: '1rem',
                          fontWeight: 600,
                          border: `2px solid ${theme.palette.background.paper}`
                        }
                      }}
                    >
                      <Avatar sx={{ bgcolor: theme.palette.primary.main }}>JD</Avatar>
                      <Avatar sx={{ bgcolor: theme.palette.secondary.main }}>JS</Avatar>
                      <Avatar sx={{ bgcolor: theme.palette.primary.main }}>RJ</Avatar>
                      <Avatar sx={{ bgcolor: theme.palette.primary.dark }}>AM</Avatar>
                      <Avatar sx={{ bgcolor: theme.palette.secondary.main }}>KS</Avatar>
                      <Avatar sx={{ bgcolor: theme.palette.primary.main }}>FN</Avatar>
                    </AvatarGroup>
                    <Box
                      sx={{
                        ml: 'auto',
                        p: 1,
                        px: 1.5,
                        borderRadius: 1,
                        bgcolor: theme.palette.primary.lighter,
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
                      borderRadius: 1,
                      bgcolor: theme.palette.grey[100],
                      border: `1px solid ${theme.palette.divider}`
                    }}
                  >
                    {[
                      { name: 'Total Sales', value: '$285,400', change: '+12.5%', color: theme.palette.primary.main },
                      {
                        name: 'Average per Agent',
                        value: '$47,567',
                        change: '+8.2%',
                        color: theme.palette.secondary.main
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
                              bgcolor: alpha(item.color, 0.1),
                              color: item.color
                            }}
                          />
                        </Stack>
                      </Box>
                    ))}
                  </Stack>

                  <Button
                    fullWidth
                    variant="outlined"
                    sx={{
                      mt: 2,
                      color: theme.palette.primary.main,
                      borderColor: theme.palette.primary.main,
                      borderRadius: 1,
                      textTransform: 'none',
                      fontWeight: 600
                    }}
                    endIcon={<Icon icon="solar:arrow-right-bold" />}
                  >
                    View All Performance Metrics
                  </Button>
                </MainCard>
              </Grid>

              <Grid item xs={12} md={6}>
                <Card sx={{ p: 2 }}>
                  <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 600,
                        color: theme.palette.text.primary,
                        display: 'flex',
                        alignItems: 'center'
                      }}
                    >
                      <Avatar
                        variant="rounded"
                        sx={{
                          width: 24,
                          height: 24,
                          mr: 1,
                          bgcolor: theme.palette.primary.lighter,
                          color: theme.palette.primary.main
                        }}
                      >
                        <Icon icon="solar:user-check-bold-duotone" width={16} />
                      </Avatar>
                      Banking Summary
                    </Typography>
                    <Tooltip title="Refresh banking data">
                      <IconButton
                        size="small"
                        sx={{
                          bgcolor: theme.palette.primary.lighter,
                          color: theme.palette.primary.main
                        }}
                      >
                        <Icon icon="solar:refresh-bold" width={16} />
                      </IconButton>
                    </Tooltip>
                  </Stack>

                  <Box
                    sx={{
                      p: 1
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
                            bgcolor: theme.palette.primary.lighter,
                            color: theme.palette.primary.main,
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
                              border: `1px solid ${theme.palette.divider}`,
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
                        color: theme.palette.primary.main
                      },
                      {
                        name: 'Reserved Amounts',
                        value: '$5.53M',
                        icon: 'solar:lock-bold-duotone',
                        color: theme.palette.secondary.main
                      }
                    ].map((item, index) => (
                      <Box
                        key={index}
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          p: 1.5,
                          borderRadius: 1,
                          bgcolor: theme.palette.grey[100],
                          border: `1px solid ${theme.palette.divider}`
                        }}
                      >
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Box
                            sx={{
                              width: 36,
                              height: 36,
                              mr: 1.5,
                              bgcolor: alpha(item.color, 0.1),
                              borderRadius: 1,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              color: item.color
                            }}
                          >
                            <Icon icon={item.icon} width={20} />
                          </Box>
                          <Typography variant="body2" color="textSecondary" fontWeight={500}>
                            {item.name}
                          </Typography>
                        </Box>
                        <Typography variant="body1" fontWeight={700}>
                          {item.value}
                        </Typography>
                      </Box>
                    ))}
                  </Stack>
                </Card>
              </Grid>
            </Grid>
          </Box>

          {/* Data Analysis & Monthly Invoices - Enhanced Section */}
          <Box sx={{ mb: 2 }}>
            <Grid container spacing={2}>
              {/* Data Analysis - Enhanced */}
              <Grid item xs={12} md={6}>
                <Card
                  sx={{
                    height: '100%',
                    p: 2
                  }}
                >
                  <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 600,
                        color: theme.palette.text.primary,
                        display: 'flex',
                        alignItems: 'center'
                      }}
                    >
                      <Avatar
                        variant="rounded"
                        sx={{
                          width: 24,
                          height: 24,
                          mr: 1,
                          bgcolor: theme.palette.primary.lighter,
                          color: theme.palette.primary.main
                        }}
                      >
                        <Icon icon="solar:chart-bold-duotone" width={16} />
                      </Avatar>
                      Data Analysis
                    </Typography>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        bgcolor: theme.palette.primary.lighter,
                        color: theme.palette.primary.main,
                        py: 0.5,
                        px: 1.5,
                        borderRadius: 1
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
                      options={dataAnalysisOptions}
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
                        bgcolor: theme.palette.secondary.main,
                        color: theme.palette.primary.contrastText,
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 700,
                        fontSize: '18px'
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
                      borderRadius: 1,
                      bgcolor: theme.palette.grey[100],
                      border: `1px solid ${theme.palette.divider}`,
                      mt: 2
                    }}
                  >
                    {[
                      {
                        label: 'Total Users',
                        value: '2.4K',
                        icon: 'solar:users-group-rounded-bold-duotone',
                        color: theme.palette.primary.main
                      },
                      {
                        label: 'Avg. Time',
                        value: '3:45',
                        icon: 'solar:clock-circle-bold-duotone',
                        color: theme.palette.secondary.main
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
                        <Avatar
                          variant="rounded"
                          sx={{
                            width: 20,
                            height: 20,
                            mx: 'auto',
                            mb: 0.5,
                            bgcolor: alpha(item.color, 0.1),
                            color: item.color
                          }}
                        >
                          <Icon icon={item.icon} width={12} />
                        </Avatar>
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
                    height: '100%',
                    p: 2
                  }}
                >
                  <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 600,
                        color: theme.palette.text.primary,
                        display: 'flex',
                        alignItems: 'center'
                      }}
                    >
                      <Avatar
                        variant="rounded"
                        sx={{
                          width: 24,
                          height: 24,
                          mr: 1,
                          bgcolor: theme.palette.secondary.lighter || alpha(theme.palette.secondary.main, 0.1),
                          color: theme.palette.secondary.main
                        }}
                      >
                        <Icon icon="solar:document-text-bold-duotone" width={16} />
                      </Avatar>
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
                          borderColor: theme.palette.divider
                        }
                      }}
                    >
                      <MenuItem value="thisyear">This Year</MenuItem>
                      <MenuItem value="lastyear">Last Year</MenuItem>
                    </Select>
                  </Stack>

                  <Box sx={{ p: 2 }}>
                    <Stack spacing={1}>
                      <Typography variant="body2" color="textSecondary" fontWeight={500}>
                        Total Monthly Invoices
                      </Typography>
                      <Typography variant="h3" sx={{ fontWeight: 700, color: theme.palette.secondary.main }}>
                        $24,000
                      </Typography>
                      <Typography
                        variant="caption"
                        sx={{
                          color: theme.palette.primary.main,
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
                        colors: [theme.palette.secondary.main],
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
                            borderRadius: 2,
                            columnWidth: '60%'
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
            bgcolor: theme.palette.primary.main,
            p: 2,
            color: theme.palette.primary.contrastText,
            borderRadius: '0 8px 8px 0'
          }}
        >
          <Stack spacing={2}>
            {/* GIB Logo */}
            <Box sx={{ textAlign: 'center', mb: 1 }}>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 700,
                  color: theme.palette.primary.contrastText
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
                bgcolor: alpha(theme.palette.background.paper, 0.1),
                borderRadius: 2,
                border: `1px solid ${alpha(theme.palette.background.paper, 0.2)}`
              }}
            >
              <Box sx={{ p: 2 }}>
                <Typography
                  variant="h6"
                  sx={{
                    color: theme.palette.primary.contrastText,
                    mb: 2
                  }}
                >
                  Recent Activity
                </Typography>
                <Stack spacing={2}>
                  {[
                    {
                      text: 'Reconciliation Completed',
                      time: '10:23 AM',
                      icon: 'solar:check-circle-bold-duotone',
                      color: theme.palette.primary.main
                    },
                    {
                      text: 'New Portfolio Added',
                      time: 'Yesterday',
                      icon: 'solar:folder-add-bold-duotone',
                      color: theme.palette.secondary.main
                    },
                    {
                      text: 'Report Generated',
                      time: '2 days ago',
                      icon: 'solar:file-bold-duotone',
                      color: theme.palette.primary.light
                    }
                  ].map((activity, index) => (
                    <Box
                      key={index}
                      sx={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        p: 1.5,
                        borderRadius: 1,
                        bgcolor: alpha(theme.palette.background.paper, 0.08),
                        border: `1px solid ${alpha(theme.palette.background.paper, 0.15)}`
                      }}
                    >
                      <Avatar
                        sx={{
                          width: 32,
                          height: 32,
                          bgcolor: alpha(activity.color, 0.2),
                          color: activity.color,
                          borderRadius: 1,
                          mr: 1.5
                        }}
                      >
                        <Icon icon={activity.icon} width={18} />
                      </Avatar>
                      <Box sx={{ flex: 1 }}>
                        <Typography
                          variant="body2"
                          sx={{
                            fontWeight: 600,
                            color: theme.palette.primary.contrastText
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
                  variant="contained"
                  sx={{
                    mt: 2,
                    color: theme.palette.primary.main,
                    bgcolor: theme.palette.primary.contrastText,
                    borderRadius: 1,
                    textTransform: 'none',
                    fontWeight: 600
                  }}
                  endIcon={<Icon icon="solar:arrow-right-bold" style={{ color: theme.palette.primary.main }} />}
                >
                  View All Activities
                </Button>
              </Box>
            </Card>

            {/* GIB Stats Card */}
            <Card
              sx={{
                bgcolor: alpha(theme.palette.background.paper, 0.1),
                borderRadius: 2,
                border: `1px solid ${alpha(theme.palette.background.paper, 0.2)}`
              }}
            >
              <Box sx={{ p: 2 }}>
                <Typography
                  variant="h6"
                  sx={{
                    color: theme.palette.primary.contrastText,
                    mb: 2
                  }}
                >
                  GIB Stats
                </Typography>
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
                        borderRadius: 1,
                        bgcolor: alpha(theme.palette.background.paper, 0.08),
                        border: `1px solid ${alpha(theme.palette.background.paper, 0.15)}`
                      }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Avatar
                          variant="rounded"
                          sx={{
                            width: 32,
                            height: 32,
                            bgcolor: alpha(theme.palette.background.paper, 0.15),
                            color: theme.palette.primary.contrastText,
                            mr: 1.5,
                            borderRadius: 1
                          }}
                        >
                          <Icon icon={stat.icon} width={18} />
                        </Avatar>
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
              </Box>
            </Card>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
};

export default GIBDashboard;
