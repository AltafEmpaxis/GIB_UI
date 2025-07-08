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
      color: theme.palette.primary.main,
      totalAccounts: 76,
      reconciledAccounts: 74,
      unreconciledAccounts: 2,
      lastUpdate: 'Yesterday'
    },
    {
      id: 'statestreet',
      name: 'State Street',
      icon: 'mdi:domain',
      color: theme.palette.secondary.main,
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
      colors: [theme.palette.primary.main, theme.palette.secondary.main || '#f59e0b'],
      labels: ['Reconciled', 'Unreconciled'],
      // stroke: {
      //   width: 0
      // },
      legend: {
        show: false
        // position: 'bottom',
        // fontSize: '13px',
        // fontWeight: 500,
        // labels: {
        //   colors: theme.palette.text.secondary
        // },
        // markers: {
        //   width: 12,
        //   height: 12,
        //   radius: 6
        // },
        // formatter: function (seriesName, opts) {
        //   // Add the count value to the legend
        //   return [seriesName, ': ', opts.w.globals.series[opts.seriesIndex]].join('');
        // }
      },
      dataLabels: {
        enabled: true
      },
      tooltip: {
        enabled: true
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
                label: 'Total',
                formatter: function () {
                  return custodian.totalAccounts;
                }
              },
              value: {
                show: true
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
                icon={<Icon icon={custodian.icon} width={20} />}
                iconPosition="start"
                label={custodian.name}
                sx={{
                  minWidth: 'auto',
                  px: 2,
                  '& .MuiTab-iconWrapper': {
                    mr: 1
                  },
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
                    <Typography variant="h6" fontWeight={600} color="primary.main">
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
                      color={custodian.unreconciledAccounts > 0 ? 'secondary.main' : 'text.disabled'}
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
                  px: 1.5,
                  display: activeTab === index ? 'flex' : 'none',
                  flexDirection: 'column',
                  alignItems: 'center',
                  flexGrow: 1
                }}
              >
                {/* Header with bank info
                <Box sx={{ mb: 3, width: '100%', display: 'flex', alignItems: 'center' }}>
                  <Avatar
                    sx={{
                      bgcolor: alpha(custodian.color, 0.1),
                      color: custodian.color,
                      width: 48,
                      height: 48,
                      mr: 2
                    }}
                  >
                    <Icon icon={custodian.icon} width={28} />
                  </Avatar>
                  <Box>
                    <Typography variant="h6">{custodian.name}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      Last updated: {custodian.lastUpdate}
                    </Typography>
                  </Box>
                </Box>
                <Divider sx={{ width: '100%', mb: 3 }} />*/}
                {/* Chart and details side by side */}
                <Grid container spacing={3} sx={{ flexGrow: 1, alignItems: 'center' }}>
                  {/* Left side - Chart */}
                  <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Box sx={{ width: '100%', maxWidth: 200, height: 200 }}>
                      <ReactApexChart
                        options={getChartOptions(custodian)}
                        series={chartSeries}
                        type="donut"
                        height={200}
                        width="100%"
                      />
                    </Box>
                  </Grid>

                  {/* Right side - Stats and button */}
                  <Grid item xs={12} md={6}>
                    <Card
                      elevation={0}
                      sx={{
                        p: 3,
                        border: `1px solid ${alpha(theme.palette.divider, 0.5)}`,
                        bgcolor: alpha(theme.palette.background.default, 0.4)
                      }}
                    >
                      <Box sx={{ mb: 2 }}>
                        <Grid container spacing={1}>
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

                      <Box sx={{ mb: 2 }}>
                        <Grid container spacing={1}>
                          <Grid item xs={6}>
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

                      <Box sx={{ mb: 3 }}>
                        <Grid container spacing={1}>
                          <Grid item xs={6}>
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
                              <Typography variant="body2" color="text.secondary">
                                Unreconciled:
                              </Typography>
                            </Box>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography
                              variant="body2"
                              fontWeight={600}
                              color={custodian.unreconciledAccounts > 0 ? 'secondary.main' : 'text.disabled'}
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
