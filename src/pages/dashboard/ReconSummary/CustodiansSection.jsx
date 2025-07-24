import { Icon } from '@iconify/react';
import {
  alpha,
  Avatar,
  Box,
  Button,
  Card,
  CircularProgress,
  Grid,
  IconButton,
  Stack,
  Tab,
  Tabs,
  Typography,
  useMediaQuery,
  useTheme
} from '@mui/material';
import { useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { useNavigate } from 'react-router';

const CustodiansSection = ({ isLoading }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState('list');
  const [activeTab, setActiveTab] = useState(0);
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  // Custodian data
  const custodianData = [
    {
      id: 'albilad',
      name: 'Albilad Account',
      icon: 'mdi:bank',
      color: theme.palette.secondary.main, // GIB Yellow
      totalAccounts: 154,
      reconciledAccounts: 142,
      unreconciledAccounts: 12,
      lastUpdate: '2 hours ago'
    },
    {
      id: 'riyad',
      name: 'Riyad Account',
      icon: 'mdi:city',
      color: theme.palette.primary.main, // Dark Grey
      totalAccounts: 98,
      reconciledAccounts: 87,
      unreconciledAccounts: 11,
      lastUpdate: '5 hours ago'
    },
    {
      id: 'at',
      name: 'At Account',
      icon: 'mdi:office-building',
      color: theme.palette.secondary.main, // GIB Yellow
      totalAccounts: 76,
      reconciledAccounts: 74,
      unreconciledAccounts: 2,
      lastUpdate: 'Yesterday'
    },
    {
      id: 'statestreet',
      name: 'State Street',
      icon: 'mdi:domain',
      color: theme.palette.primary.main, // Dark Grey
      totalAccounts: 56,
      reconciledAccounts: 52,
      unreconciledAccounts: 4,
      lastUpdate: '2 days ago'
    }
  ];

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleViewModeChange = (mode) => {
    setViewMode(mode);
  };

  const handleNavigateToDetailRecon = (custodianId) => {
    navigate('/detail-recon-tool');
  };

  // Chart configuration
  const getChartOptions = (custodian) => {
    return {
      chart: {
        type: 'donut',
        background: 'transparent',
        toolbar: {
          show: false
        },
        fontFamily: theme.typography.fontFamily
      },
      colors: [theme.palette.secondary.main, theme.palette.primary.main],
      labels: ['Reconciled', 'Unreconciled'],
      stroke: {
        width: 1,
        colors: [theme.palette.background.paper]
      },
      legend: {
        show: false
      },
      dataLabels: {
        enabled: true,
        formatter: function (val, opts) {
          return opts.w.config.series[opts.seriesIndex];
        },
        style: {
          fontSize: '12px',
          fontWeight: 600,
          fontFamily: theme.typography.fontFamily
        },
        dropShadow: {
          enabled: false
        }
      },
      tooltip: {
        enabled: true,
        y: {
          formatter: function (val) {
            return val + ' accounts';
          }
        }
      },
      plotOptions: {
        pie: {
          donut: {
            size: '70%',
            labels: {
              show: true,
              total: {
                show: true,
                fontSize: '16px',
                fontWeight: 600,
                label: 'Total',
                color: theme.palette.text.primary,
                formatter: function (w) {
                  return w.globals.seriesTotals.reduce((a, b) => a + b, 0);
                }
              },
              value: {
                show: true,
                fontSize: '22px',
                fontWeight: 700,
                color: theme.palette.text.primary
              }
            }
          }
        }
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              height: 200
            },
            legend: {
              show: false
            }
          }
        }
      ]
    };
  };

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 1,
        boxShadow: theme.shadows[1]
      }}
    >
      <Box
        sx={{
          p: isMobile ? 1.5 : 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: `1px solid ${theme.palette.divider}`
        }}
      >
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
              bgcolor: alpha(theme.palette.secondary.main, 0.2),
              color: theme.palette.secondary.main
            }}
          >
            <Icon icon="solar:buildings-3-bold-duotone" width={16} />
          </Avatar>
          Custodians
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ mx: 0.75 }}>
            <IconButton
              size="small"
              color={viewMode === 'list' ? 'secondary' : 'default'}
              onClick={() => handleViewModeChange('list')}
              sx={{
                mr: 0.75,
                bgcolor: viewMode === 'list' ? alpha(theme.palette.secondary.main, 0.1) : 'transparent'
              }}
            >
              <Icon icon="mdi:format-list-bulleted" width={20} />
            </IconButton>
            <IconButton
              size="small"
              color={viewMode === 'chart' ? 'secondary' : 'default'}
              onClick={() => handleViewModeChange('chart')}
              sx={{
                bgcolor: viewMode === 'chart' ? alpha(theme.palette.secondary.main, 0.1) : 'transparent'
              }}
            >
              <Icon icon="mdi:chart-pie" width={20} />
            </IconButton>
          </Box>

          <IconButton
            size="small"
            sx={{
              color: theme.palette.primary.main,
              '&:hover': {
                bgcolor: alpha(theme.palette.primary.main, 0.1)
              }
            }}
          >
            <Icon icon="mdi:refresh" width={20} />
          </IconButton>
        </Box>
      </Box>

      {viewMode === 'chart' && (
        <Box sx={{ px: 1.5, pt: 1, borderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            variant="scrollable"
            scrollButtons="auto"
            TabIndicatorProps={{
              style: { backgroundColor: theme.palette.secondary.main }
            }}
            sx={{
              '& .MuiTab-root.Mui-selected': {
                color: theme.palette.secondary.main
              }
            }}
          >
            {custodianData.map((custodian, index) => (
              <Tab
                key={custodian.id}
                icon={<Icon icon={custodian.icon} width={20} />}
                iconPosition="start"
                label={isMobile ? null : custodian.name}
                sx={{
                  minWidth: 'auto',
                  px: 1.5,
                  '& .MuiTab-iconWrapper': {
                    mr: 1
                  }
                }}
              />
            ))}
          </Tabs>
        </Box>
      )}

      {isLoading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', p: 3, flexGrow: 1 }}>
          <CircularProgress sx={{ color: theme.palette.secondary.main }} />
        </Box>
      ) : viewMode === 'list' ? (
        <Box sx={{ p: isMobile ? 1 : 1.5, pt: 1.5, overflow: 'auto', flexGrow: 1 }}>
          <Stack spacing={1.5}>
            {custodianData.map((custodian) => (
              <Card
                key={custodian.id}
                variant="outlined"
                sx={{
                  display: 'flex',
                  flexDirection: isMobile ? 'column' : 'row',
                  alignItems: isMobile ? 'flex-start' : 'center',
                  justifyContent: 'space-between',
                  p: 1.5,
                  borderColor: alpha(custodian.color, 0.3),
                  borderRadius: 1,
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    borderColor: custodian.color,
                    boxShadow: `0 0 0 1px ${alpha(custodian.color, 0.3)}`
                  }
                }}
              >
                {/* Left - Logo + Name */}
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    mb: isMobile ? 1.5 : 0,
                    width: isMobile ? '100%' : 'auto'
                  }}
                >
                  <Avatar
                    sx={{
                      bgcolor: alpha(custodian.color, 0.1),
                      color: custodian.color,
                      width: 36,
                      height: 36,
                      mr: 1.5
                    }}
                  >
                    <Icon icon={custodian.icon} width={24} />
                  </Avatar>
                  <Box>
                    <Typography variant="subtitle1" fontWeight={500}>
                      {custodian.name}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Last updated: {custodian.lastUpdate}
                    </Typography>
                  </Box>
                </Box>

                {/* Right - Stats */}
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: isMobile ? 1.5 : 2,
                    width: isMobile ? '100%' : 'auto',
                    justifyContent: isMobile ? 'space-between' : 'flex-end'
                  }}
                >
                  {/* Total */}
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h6" fontWeight={600} color="text.primary">
                      {custodian.totalAccounts}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Total
                    </Typography>
                  </Box>

                  {/* Reconciled */}
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h6" fontWeight={600} color="text.primary">
                      {custodian.reconciledAccounts}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Reconciled
                    </Typography>
                  </Box>

                  {/* Unreconciled */}
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography
                      variant="h6"
                      fontWeight={600}
                      color={custodian.unreconciledAccounts > 0 ? 'primary.main' : 'text.disabled'}
                    >
                      {custodian.unreconciledAccounts}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Unreconciled
                    </Typography>
                  </Box>

                  {/* View Button */}
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => handleNavigateToDetailRecon(custodian.id)}
                    sx={{
                      minWidth: 70,
                      borderColor: alpha(custodian.color, 0.5),
                      color: custodian.color,
                      '&:hover': {
                        backgroundColor: alpha(custodian.color, 0.05),
                        borderColor: custodian.color
                      }
                    }}
                  >
                    View
                  </Button>
                </Box>
              </Card>
            ))}
          </Stack>
        </Box>
      ) : (
        <Box sx={{ p: 0, overflow: 'auto', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
          {custodianData.map((custodian, index) => {
            const chartSeries = [custodian.reconciledAccounts, custodian.unreconciledAccounts];

            return (
              <Box
                key={custodian.id}
                sx={{
                  px: 1.5,
                  py: 1.5,
                  display: activeTab === index ? 'flex' : 'none',
                  flexDirection: 'column',
                  alignItems: 'center',
                  flexGrow: 1
                }}
              >
                {/* Chart and details side by side */}
                <Grid container spacing={isMobile ? 1.5 : 2} sx={{ flexGrow: 1, alignItems: 'center' }}>
                  {/* Left side - Chart */}
                  <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Box sx={{ width: '100%', maxWidth: 220, height: isMobile ? 160 : 200 }}>
                      <ReactApexChart
                        options={getChartOptions(custodian)}
                        series={chartSeries}
                        type="donut"
                        height={isMobile ? 160 : 200}
                        width="100%"
                      />
                    </Box>
                  </Grid>

                  {/* Right side - Stats and button */}
                  <Grid item xs={12} md={6}>
                    <Card
                      elevation={0}
                      sx={{
                        p: 2,
                        border: `1px solid ${alpha(theme.palette.divider, 0.5)}`,
                        bgcolor: alpha(theme.palette.background.default, 0.4),
                        borderRadius: 1
                      }}
                    >
                      <Box sx={{ mb: 1.5 }}>
                        <Grid container spacing={0.75}>
                          <Grid item xs={6}>
                            <Typography variant="body2" color="text.secondary">
                              Total Accounts:
                            </Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography variant="body2" fontWeight={600}>
                              {custodian.totalAccounts}
                            </Typography>
                          </Grid>
                        </Grid>
                      </Box>

                      <Box sx={{ mb: 1.5 }}>
                        <Grid container spacing={0.75}>
                          <Grid item xs={6}>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <Box
                                sx={{
                                  width: 8,
                                  height: 8,
                                  borderRadius: '50%',
                                  bgcolor: theme.palette.secondary.main,
                                  mr: 0.75
                                }}
                              />
                              <Typography variant="body2" color="text.secondary">
                                Reconciled:
                              </Typography>
                            </Box>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography variant="body2" fontWeight={600} color="primary.main">
                              {custodian.reconciledAccounts}
                            </Typography>
                          </Grid>
                        </Grid>
                      </Box>

                      <Box sx={{ mb: 2 }}>
                        <Grid container spacing={0.75}>
                          <Grid item xs={6}>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <Box
                                sx={{
                                  width: 8,
                                  height: 8,
                                  borderRadius: '50%',
                                  bgcolor: theme.palette.primary.main,
                                  mr: 0.75
                                }}
                              />
                              <Typography variant="body2" color="text.secondary">
                                Unreconciled:
                              </Typography>
                            </Box>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography
                              variant="body2"
                              fontWeight={600}
                              color={custodian.unreconciledAccounts > 0 ? 'primary.main' : 'text.disabled'}
                            >
                              {custodian.unreconciledAccounts}
                            </Typography>
                          </Grid>
                        </Grid>
                      </Box>

                      <Button
                        variant="contained"
                        fullWidth
                        onClick={() => handleNavigateToDetailRecon(custodian.id)}
                        sx={{
                          bgcolor: custodian.color,
                          color: custodian.color === theme.palette.primary.main ? '#fff' : 'rgba(0,0,0,0.87)',
                          '&:hover': {
                            bgcolor: alpha(custodian.color, 0.8)
                          }
                        }}
                      >
                        View Account Details
                      </Button>
                    </Card>
                  </Grid>
                </Grid>
              </Box>
            );
          })}
        </Box>
      )}
    </Card>
  );
};

export default CustodiansSection;
