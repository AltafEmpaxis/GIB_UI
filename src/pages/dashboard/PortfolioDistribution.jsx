import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Skeleton, Typography, Tab, Tabs, Paper, useMediaQuery } from '@mui/material';
import { useTheme, alpha } from '@mui/material/styles';
import ReactApexChart from 'react-apexcharts';
import { motion } from 'framer-motion';
import { Icon } from '@iconify/react';
import { Chip } from '@mui/material';

// project imports
import MainCard from 'components/MainCard';

const TabPanel = ({ children, value, index, ...other }) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ pt: 2 }}>{children}</Box>}
    </div>
  );
};

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired
};

const PortfolioDistribution = ({ isLoading }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [tabValue, setTabValue] = useState(0);

  // Custom theme-based colors for charts
  const getChartColors = () => {
    const baseColors = [
      theme.palette.primary.main,
      theme.palette.primary.light,
      theme.palette.secondary.main,
      theme.palette.secondary.light,
      theme.palette.success.main,
      theme.palette.warning.main,
      theme.palette.info.main
    ];

    // Generate more theme-consistent colors
    if (theme.palette.mode === 'dark') {
      return [
        baseColors[0],
        alpha(baseColors[0], 0.8),
        baseColors[2],
        alpha(baseColors[2], 0.8),
        baseColors[4],
        alpha(baseColors[4], 0.8),
        baseColors[5]
      ];
    } else {
      return baseColors;
    }
  };

  // Data for the pie chart
  const portfolioData = [
    {
      // Sector allocation
      series: [34, 23, 18, 12, 8, 5],
      labels: ['Banking & Finance', 'Energy', 'Petrochemicals', 'Real Estate', 'Telecom', 'Others']
    },
    {
      // Asset class allocation
      series: [45, 25, 20, 10],
      labels: ['Equities', 'Sukuk', 'Real Estate', 'Cash & Equivalents']
    },
    {
      // Risk level allocation
      series: [30, 40, 20, 10],
      labels: ['Low Risk', 'Medium Risk', 'High Risk', 'Very High Risk']
    }
  ];

  // Chart options
  const chartOptions = {
    chart: {
      type: 'donut',
      height: 380,
      background: 'transparent',
      fontFamily: theme.typography.fontFamily
    },
    labels: portfolioData[tabValue].labels,
    colors: getChartColors(),
    plotOptions: {
      pie: {
        donut: {
          size: '70%',
          background: 'transparent',
          labels: {
            show: true,
            name: {
              show: true,
              fontSize: '14px',
              fontWeight: 500,
              offsetY: -10,
              color: theme.palette.text.primary
            },
            value: {
              show: true,
              fontSize: '20px',
              fontWeight: 600,
              color: theme.palette.text.primary,
              formatter: function (val) {
                return val + '%';
              }
            },
            total: {
              show: true,
              label: 'Total',
              color: theme.palette.text.primary,
              fontWeight: 600,
              fontSize: '16px',
              formatter: function (w) {
                return '100%';
              }
            }
          }
        }
      }
    },
    dataLabels: {
      enabled: !isMobile,
      formatter: function (val) {
        return val + '%';
      },
      style: {
        fontSize: '12px',
        fontWeight: 500,
        colors: ['#fff'],
        textShadow: '0px 1px 2px rgba(0, 0, 0, 0.5)'
      },
      dropShadow: {
        enabled: true,
        blur: 2,
        opacity: 0.3
      }
    },
    legend: {
      show: true,
      position: 'bottom',
      horizontalAlign: 'center',
      fontFamily: theme.typography.fontFamily,
      fontSize: '13px',
      fontWeight: 500,
      itemMargin: {
        horizontal: 10,
        vertical: 6
      },
      formatter: function (seriesName, opts) {
        return [seriesName, ' - ', opts.w.globals.series[opts.seriesIndex] + '%'];
      },
      labels: {
        colors: theme.palette.text.primary,
        useSeriesColors: false
      },
      markers: {
        width: 12,
        height: 12,
        strokeWidth: 0,
        radius: 4,
        customHTML: undefined,
        offsetX: -3
      },
      onItemClick: {
        toggleDataSeries: true
      },
      onItemHover: {
        highlightDataSeries: true
      }
    },
    stroke: {
      width: 2,
      colors: [theme.palette.background.paper]
    },
    tooltip: {
      theme: theme.palette.mode,
      fillSeriesColor: false,
      style: {
        fontSize: '13px',
        fontFamily: theme.typography.fontFamily
      },
      marker: {
        show: false
      },
      y: {
        formatter: function (val) {
          return val + '%';
        }
      }
    },
    states: {
      hover: {
        filter: {
          type: 'darken',
          value: 0.9
        }
      },
      active: {
        filter: {
          type: 'darken',
          value: 0.9
        }
      }
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            height: 290
          },
          legend: {
            position: 'bottom',
            offsetY: 5,
            fontSize: '11px',
            itemMargin: {
              horizontal: 8,
              vertical: 5
            }
          }
        }
      }
    ]
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  // Tab styling
  const StyledTab = (props) => (
    <Tab
      {...props}
      sx={{
        minHeight: '48px',
        fontSize: '0.875rem',
        fontWeight: 500,
        color: theme.palette.text.secondary,
        '&.Mui-selected': {
          color: theme.palette.mode === 'dark' ? theme.palette.primary.light : theme.palette.primary.main,
          fontWeight: 600
        },
        '&:hover': {
          color: theme.palette.primary.main,
          opacity: 0.8
        }
      }}
    />
  );

  const containerAnimation = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.6 }
    }
  };

  const chartAnimation = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: 'easeOut' }
    }
  };

  return (
    <MainCard
      component={motion.div}
      initial="hidden"
      animate="visible"
      variants={containerAnimation}
      contentSX={{ p: '0 !important' }}
      title={
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Icon
            icon="solar:chart-pie-bold-duotone"
            style={{ marginRight: '10px', fontSize: '22px', color: theme.palette.primary.main }}
          />
          <Typography variant="h5" color="textPrimary">
            Portfolio Distribution
          </Typography>
        </Box>
      }
      sx={{
        p: '0 !important',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 2,
        overflow: 'hidden',
        boxShadow: theme.palette.mode === 'dark' ? '0 4px 15px rgba(0,0,0,0.3)' : '0 4px 15px rgba(58,53,65,0.1)'
      }}
      secondary={
        <Chip
          label={`${portfolioData[tabValue].series.length} Categories`}
          size="small"
          variant="filled"
          sx={{
            background: alpha(theme.palette.primary.main, 0.2),
            color: theme.palette.primary.main,
            fontWeight: 500,
            fontSize: '0.75rem'
          }}
        />
      }
    >
      {isLoading ? (
        <Box sx={{ p: 2 }}>
          <Box sx={{ display: 'flex' }}>
            <Skeleton variant="rectangular" width={100} height={30} sx={{ mr: 1, borderRadius: 1 }} />
            <Skeleton variant="rectangular" width={100} height={30} sx={{ mr: 1, borderRadius: 1 }} />
            <Skeleton variant="rectangular" width={100} height={30} sx={{ borderRadius: 1 }} />
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 300, mt: 2 }}>
            <Skeleton variant="circular" width={250} height={250} />
          </Box>
        </Box>
      ) : (
        <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
          <Paper
            elevation={0}
            sx={{
              borderRadius: 0,
              borderBottom: `1px solid ${alpha(theme.palette.divider, 0.3)}`,
              background:
                theme.palette.mode === 'dark'
                  ? alpha(theme.palette.background.paper, 0.5)
                  : alpha(theme.palette.background.paper, 0.8)
            }}
          >
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              aria-label="portfolio distribution tabs"
              sx={{
                minHeight: '48px',
                '& .MuiTabs-indicator': {
                  backgroundColor: theme.palette.primary.main,
                  height: 3,
                  borderRadius: '3px 3px 0 0'
                }
              }}
              variant="fullWidth"
              centered
            >
              <StyledTab
                icon={<Icon icon="solar:buildings-bold-duotone" width="18" />}
                iconPosition="start"
                label="Sectors"
              />
              <StyledTab
                icon={<Icon icon="solar:wallet-money-bold-duotone" width="18" />}
                iconPosition="start"
                label="Asset Classes"
              />
              <StyledTab
                icon={<Icon icon="solar:shield-warning-bold-duotone" width="18" />}
                iconPosition="start"
                label="Risk Levels"
              />
            </Tabs>
          </Paper>

          <TabPanel value={tabValue} index={0}>
            <Box
              component={motion.div}
              variants={chartAnimation}
              sx={{
                p: { xs: 1, md: 2 },
                height: { xs: 'auto', md: '420px' }
              }}
            >
              <ReactApexChart
                options={chartOptions}
                series={portfolioData[0].series}
                type="donut"
                height={isMobile ? 300 : 380}
              />
              <Typography
                variant="body2"
                color="textSecondary"
                sx={{
                  textAlign: 'center',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mt: 1,
                  p: 1,
                  borderRadius: 1,
                  background: alpha(theme.palette.background.default, 0.6),
                  boxShadow: `inset 0 0 5px ${alpha(theme.palette.divider, 0.2)}`
                }}
              >
                <Icon
                  icon="solar:buildings-3-bold-duotone"
                  style={{
                    marginRight: '8px',
                    color: getChartColors()[0],
                    fontSize: '18px'
                  }}
                />
                Saudi Banking & Finance sector shows highest allocation
              </Typography>
            </Box>
          </TabPanel>

          <TabPanel value={tabValue} index={1}>
            <Box
              component={motion.div}
              variants={chartAnimation}
              sx={{
                p: { xs: 1, md: 2 },
                height: { xs: 'auto', md: '420px' }
              }}
            >
              <ReactApexChart
                options={chartOptions}
                series={portfolioData[1].series}
                type="donut"
                height={isMobile ? 300 : 380}
              />
              <Typography
                variant="body2"
                color="textSecondary"
                sx={{
                  textAlign: 'center',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mt: 1,
                  p: 1,
                  borderRadius: 1,
                  background: alpha(theme.palette.background.default, 0.6),
                  boxShadow: `inset 0 0 5px ${alpha(theme.palette.divider, 0.2)}`
                }}
              >
                <Icon
                  icon="solar:dollar-minimalistic-bold-duotone"
                  style={{
                    marginRight: '8px',
                    color: getChartColors()[0],
                    fontSize: '18px'
                  }}
                />
                Shariah-compliant equities dominate the portfolio
              </Typography>
            </Box>
          </TabPanel>

          <TabPanel value={tabValue} index={2}>
            <Box
              component={motion.div}
              variants={chartAnimation}
              sx={{
                p: { xs: 1, md: 2 },
                height: { xs: 'auto', md: '420px' }
              }}
            >
              <ReactApexChart
                options={chartOptions}
                series={portfolioData[2].series}
                type="donut"
                height={isMobile ? 300 : 380}
              />
              <Typography
                variant="body2"
                color="textSecondary"
                sx={{
                  textAlign: 'center',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mt: 1,
                  p: 1,
                  borderRadius: 1,
                  background: alpha(theme.palette.background.default, 0.6),
                  boxShadow: `inset 0 0 5px ${alpha(theme.palette.divider, 0.2)}`
                }}
              >
                <Icon
                  icon="solar:shield-warning-bold-duotone"
                  style={{
                    marginRight: '8px',
                    color: getChartColors()[1],
                    fontSize: '18px'
                  }}
                />
                Portfolio maintains a medium risk profile overall
              </Typography>
            </Box>
          </TabPanel>
        </Box>
      )}
    </MainCard>
  );
};

PortfolioDistribution.propTypes = {
  isLoading: PropTypes.bool
};

export default PortfolioDistribution;
