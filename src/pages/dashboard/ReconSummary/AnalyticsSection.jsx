import { Icon } from '@iconify/react';
import {
  alpha,
  Avatar,
  Box,
  Card,
  Chip,
  Grid,
  MenuItem,
  Select,
  Stack,
  Typography,
  useMediaQuery,
  useTheme
} from '@mui/material';
import ReactApexChart from 'react-apexcharts';

const AnalyticsSection = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  // Common styles
  const cardStyle = {
    height: '100%',
    p: isMobile ? 1 : 1.5,
    borderRadius: 1,
    boxShadow: theme.shadows[1]
  };

  const headerStyle = {
    fontWeight: 600,
    color: theme.palette.text.primary,
    display: 'flex',
    alignItems: 'center'
  };

  const avatarStyle = {
    width: 24,
    height: 24,
    mr: 1,
    borderRadius: 1
  };

  // Data Analysis Area Chart
  const dataAnalysisOptions = {
    chart: {
      type: 'area',
      height: isMobile ? 120 : 150,
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
      fontFamily: theme.typography.fontFamily
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'smooth',
      width: 2
    },
    colors: [theme.palette.secondary.main], // GIB Yellow
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.4,
        opacityTo: 0.1,
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
      theme: theme.palette.mode === 'dark' ? 'dark' : 'light',
      x: {
        show: true
      },
      y: {
        title: {
          formatter: () => 'Reports:'
        }
      }
    },
    legend: {
      show: false
    }
  };

  // Monthly Invoices Bar Chart
  const monthlyInvoicesOptions = {
    chart: {
      type: 'bar',
      height: isMobile ? 80 : 100,
      toolbar: {
        show: false
      },
      sparkline: {
        enabled: true
      },
      animations: {
        enabled: false
      },
      fontFamily: theme.typography.fontFamily
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
    colors: [theme.palette.secondary.main], // GIB Yellow
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
      },
      y: {
        formatter: (val) => `$${val}k`
      }
    },
    legend: {
      show: false
    }
  };

  return (
    <Grid container spacing={1}>
      {/* Data Analysis - Enhanced */}
      <Grid item xs={12} md={6}>
        <Card sx={cardStyle}>
          <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1.5 }}>
            <Typography variant="h6" sx={headerStyle}>
              <Avatar
                variant="rounded"
                sx={{
                  ...avatarStyle,
                  bgcolor: alpha(theme.palette.secondary.main, 0.2),
                  color: theme.palette.secondary.main
                }}
              >
                <Icon icon="solar:documents-minimalistic-bold-duotone" width={16} />
              </Avatar>
              ad-hoc Reports
            </Typography>
            <Chip
              label="This Week"
              size="small"
              sx={{
                bgcolor: alpha(theme.palette.secondary.main, 0.1),
                color: theme.palette.secondary.main,
                fontWeight: 500
              }}
            />
          </Stack>

          <Box sx={{ mb: 1.5 }}>
            <Stack direction="row" spacing={1.5} alignItems="center">
              <Typography variant="h3" sx={{ fontWeight: 700, color: theme.palette.secondary.main }}>
                24
              </Typography>
              <Stack spacing={0.5}>
                <Typography variant="body2" color="textSecondary">
                  ad-hoc Reports Generated
                </Typography>
                <Chip
                  size="small"
                  label="+8 from last week"
                  icon={<Icon icon="solar:arrow-up-bold" width={14} />}
                  sx={{
                    bgcolor: alpha(theme.palette.success.main, 0.1),
                    color: theme.palette.success.main,
                    fontWeight: 600,
                    height: 20
                  }}
                />
              </Stack>
            </Stack>
          </Box>

          <ReactApexChart
            options={dataAnalysisOptions}
            series={[
              {
                name: 'Reports',
                data: [6, 9, 5, 3, 1]
              }
            ]}
            type="area"
            height={isMobile ? 120 : 150}
          />

          <Box sx={{ display: 'flex', justifyContent: 'space-between', px: 1, mt: 0.5 }}>
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].map((day, index) => (
              <Typography
                key={index}
                variant="caption"
                color="textSecondary"
                sx={{
                  fontSize: '10px',
                  fontWeight: 500
                }}
              >
                {day}
              </Typography>
            ))}
          </Box>
        </Card>
      </Grid>

      {/* Monthly Invoices - Enhanced */}
      <Grid item xs={12} md={6}>
        <Card sx={cardStyle}>
          <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 1.5 }}>
            <Typography variant="h6" sx={headerStyle}>
              <Avatar
                variant="rounded"
                sx={{
                  ...avatarStyle,
                  bgcolor: alpha(theme.palette.primary.main, 0.2),
                  color: theme.palette.primary.main
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
                minWidth: 100,
                height: 32,
                fontSize: '0.8rem',
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: theme.palette.divider
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: theme.palette.secondary.main
                }
              }}
            >
              <MenuItem value="thisyear">This Year</MenuItem>
              <MenuItem value="lastyear">Last Year</MenuItem>
            </Select>
          </Stack>

          <Box sx={{ p: 1.5 }}>
            <Stack spacing={0.75}>
              <Typography variant="body2" color="textSecondary" fontWeight={500}>
                Total Monthly Invoices
              </Typography>
              <Typography variant="h3" sx={{ fontWeight: 700, color: theme.palette.primary.main }}>
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
                colors: [theme.palette.primary.main],
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
              height={isMobile ? 80 : 100}
            />
          </Box>

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              px: 1,
              mt: 0.5,
              flexWrap: isMobile ? 'wrap' : 'nowrap',
              '& .month-label': {
                width: isMobile ? '16.66%' : 'auto',
                textAlign: 'center',
                mb: isMobile ? 0.5 : 0
              }
            }}
          >
            {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map(
              (month, index) => (
                <Typography
                  key={index}
                  className="month-label"
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
  );
};

export default AnalyticsSection;
