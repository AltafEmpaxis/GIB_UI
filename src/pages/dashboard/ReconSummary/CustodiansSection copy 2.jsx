import { Icon } from '@iconify/react';
import {
  alpha,
  Avatar,
  Box,
  Button,
  Card,
  CircularProgress,
  IconButton,
  Stack,
  Tab,
  Tabs,
  Typography,
  useTheme
} from '@mui/material';
import { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';

const CustodiansSection = ({ isLoading }) => {
  const theme = useTheme();
  const [viewMode, setViewMode] = useState('list');
  const [activeTab, setActiveTab] = useState(0);
  // Add a state to track if ApexCharts is available in the browser environment
  const [chartReady, setChartReady] = useState(false);

  // Make sure ApexCharts initializes properly in browser environment
  useEffect(() => {
    setChartReady(true);
  }, []);

  // Custodian data
  const custodianData = [
    {
      id: 'albilad',
      name: 'Albilad Account',
      icon: 'mdi:bank',
      color: theme.palette.primary.main,
      totalAccounts: 154,
      reconciledAccounts: 142,
      unreconciledAccounts: 12,
      lastUpdate: '2 hours ago'
    },
    {
      id: 'riyad',
      name: 'Riyad Account',
      icon: 'mdi:city',
      color: theme.palette.secondary.main,
      totalAccounts: 98,
      reconciledAccounts: 87,
      unreconciledAccounts: 11,
      lastUpdate: '5 hours ago'
    },
    {
      id: 'at',
      name: 'At Account',
      icon: 'mdi:office-building',
      color: theme.palette.warning.main,
      totalAccounts: 76,
      reconciledAccounts: 74,
      unreconciledAccounts: 2,
      lastUpdate: 'Yesterday'
    },
    {
      id: 'statestreet',
      name: 'State Street Account',
      icon: 'mdi:domain',
      color: theme.palette.info.main,
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

  // Define the chart configuration outside of the render function
  const getChartOptions = (custodian) => {
    return {
      chart: {
        type: 'donut',
        background: 'transparent',
        fontFamily: theme.typography.fontFamily
      },
      colors: [theme.palette.success.main, theme.palette.warning.main || '#f59e0b'],
      labels: ['Reconciled', 'Unreconciled'],
      stroke: { width: 2, colors: [theme.palette.background.paper] },
      legend: {
        show: true,
        position: 'bottom',
        fontSize: '14px',
        markers: {
          width: 12,
          height: 12,
          radius: 6
        }
      },
      dataLabels: {
        enabled: false
      },
      tooltip: {
        enabled: true,
        y: {
          formatter: (value) => `${value} accounts`
        }
      },
      plotOptions: {
        pie: {
          donut: {
            size: '70%',
            labels: {
              show: true,
              name: {
                show: true
              },
              value: {
                show: true,
                fontSize: '20px',
                fontWeight: 600,
                formatter: function (val) {
                  return val;
                }
              },
              total: {
                show: true,
                label: 'Total',
                fontSize: '16px',
                fontWeight: 600,
                formatter: function (w) {
                  return custodian.totalAccounts;
                }
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
              height: 280
            },
            legend: {
              position: 'bottom'
            }
          }
        }
      ]
    };
  };

  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box
        sx={{
          p: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: `1px solid ${theme.palette.divider}`
        }}
      >
        <Typography variant="h6">Custodians</Typography>

        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ mx: 1 }}>
            <IconButton
              size="small"
              color={viewMode === 'list' ? 'primary' : 'default'}
              onClick={() => handleViewModeChange('list')}
              sx={{
                mr: 1,
                bgcolor: viewMode === 'list' ? alpha(theme.palette.primary.main, 0.1) : 'transparent'
              }}
            >
              <Icon icon="mdi:format-list-bulleted" width={20} />
            </IconButton>
            <IconButton
              size="small"
              color={viewMode === 'chart' ? 'primary' : 'default'}
              onClick={() => handleViewModeChange('chart')}
              sx={{
                bgcolor: viewMode === 'chart' ? alpha(theme.palette.primary.main, 0.1) : 'transparent'
              }}
            >
              <Icon icon="mdi:chart-pie" width={20} />
            </IconButton>
          </Box>

          <IconButton size="small">
            <Icon icon="mdi:refresh" width={20} />
          </IconButton>
        </Box>
      </Box>

      {viewMode === 'chart' && (
        <Box sx={{ px: 2, pt: 1, borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={activeTab} onChange={handleTabChange} variant="scrollable" scrollButtons="auto">
            {custodianData.map((custodian, index) => (
              <Tab
                key={custodian.id}
                label={custodian.name}
                sx={{
                  minWidth: 'auto',
                  px: 2,
                  '&.Mui-selected': {
                    color: custodian.color
                  }
                }}
              />
            ))}
          </Tabs>
        </Box>
      )}

      {isLoading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', p: 4, flexGrow: 1 }}>
          <CircularProgress />
        </Box>
      ) : viewMode === 'list' ? (
        <Box sx={{ p: 2, pt: 1.5, overflow: 'auto', flexGrow: 1 }}>
          <Stack spacing={1}>
            {custodianData.map((custodian) => (
              <Card
                key={custodian.id}
                variant="outlined"
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  p: 1.5,
                  borderColor: 'divider'
                }}
              >
                {/* Left - Logo + Name */}
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Avatar
                    sx={{
                      bgcolor: alpha(custodian.color, 0.1),
                      color: custodian.color,
                      width: 40,
                      height: 40,
                      mr: 2
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
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
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
                    <Typography variant="h6" fontWeight={600} color="success.main">
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
                      color={custodian.unreconciledAccounts > 0 ? 'warning.main' : 'text.disabled'}
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
                    sx={{
                      minWidth: 80,
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
                  p: 3,
                  display: activeTab === index ? 'flex' : 'none',
                  flexDirection: 'column',
                  alignItems: 'center',
                  flexGrow: 1,
                  height: '100%'
                }}
              >
                <Box sx={{ mb: 2 }}>
                  <Avatar
                    sx={{
                      bgcolor: alpha(custodian.color, 0.1),
                      color: custodian.color,
                      width: 56,
                      height: 56,
                      mb: 1,
                      mx: 'auto'
                    }}
                  >
                    <Icon icon={custodian.icon} width={32} />
                  </Avatar>
                  <Typography variant="h6" align="center">
                    {custodian.name}
                  </Typography>
                  <Typography variant="caption" color="text.secondary" align="center" display="block">
                    Last updated: {custodian.lastUpdate}
                  </Typography>
                </Box>

                {/* ApexCharts Pie Chart */}
                <Box
                  sx={{
                    mt: 1,
                    mb: 3,
                    width: '100%',
                    maxWidth: 250,
                    height: 250,
                    mx: 'auto'
                  }}
                >
                  {chartReady && (
                    <ReactApexChart
                      options={getChartOptions(custodian)}
                      series={chartSeries}
                      type="donut"
                      height={350}
                    />
                  )}
                </Box>

                {/* Stats */}
                <Box sx={{ display: 'flex', justifyContent: 'center', gap: 4, mt: 2 }}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Box
                        sx={{
                          width: 12,
                          height: 12,
                          borderRadius: '50%',
                          bgcolor: theme.palette.success.main,
                          mr: 1
                        }}
                      />
                      <Typography variant="h6" fontWeight={600} color="success.main">
                        {custodian.reconciledAccounts}
                      </Typography>
                    </Box>
                    <Typography variant="body2" color="text.secondary">
                      Reconciled
                    </Typography>
                  </Box>

                  <Box sx={{ textAlign: 'center' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Box
                        sx={{
                          width: 12,
                          height: 12,
                          borderRadius: '50%',
                          bgcolor:
                            custodian.unreconciledAccounts > 0
                              ? theme.palette.warning.main
                              : alpha(theme.palette.text.disabled, 0.3),
                          mr: 1
                        }}
                      />
                      <Typography
                        variant="h6"
                        fontWeight={600}
                        color={custodian.unreconciledAccounts > 0 ? 'warning.main' : 'text.disabled'}
                      >
                        {custodian.unreconciledAccounts}
                      </Typography>
                    </Box>
                    <Typography variant="body2" color="text.secondary">
                      Unreconciled
                    </Typography>
                  </Box>
                </Box>

                <Box sx={{ mt: 'auto', pt: 3 }}>
                  <Button
                    variant="contained"
                    size="medium"
                    sx={{
                      bgcolor: custodian.color,
                      '&:hover': {
                        bgcolor: alpha(custodian.color, 0.8)
                      }
                    }}
                  >
                    View Details
                  </Button>
                </Box>
              </Box>
            );
          })}
        </Box>
      )}
    </Card>
  );
};

export default CustodiansSection;
