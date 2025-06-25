import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

// material-ui
import { Icon } from '@iconify/react';
import { alpha, Box, Grid, LinearProgress, List, ListItem, Paper, Stack, Typography, useTheme } from '@mui/material';
import { motion } from 'framer-motion';

// chart
import Chart from 'react-apexcharts';

// ==============================|| TADAWUL MARKET FEED ||============================== //

const TadawulFeed = ({ isLoading = false }) => {
  const theme = useTheme();
  const [marketData, setMarketData] = useState(null);

  // Mock data based on the real Tadawul index
  useEffect(() => {
    // In a real implementation, this would be an API call
    const fetchMarketData = () => {
      const mockData = {
        indexName: 'Tadawul All Share Index (TASI)',
        lastPrice: 11004.53,
        change: 172.1,
        changePercent: 1.59,
        isPositive: true,
        open: 10861.08,
        previousClose: 10832.43,
        high: 11005.48,
        low: 10858.48,
        volume: '183,271,357',
        turnover: '4,619,250,454.14',
        lastUpdate: 'Wednesday, June 04',
        topIndices: [
          { name: 'Tadawul IPO Index', value: 5070.11, change: 94.89, changePercent: 1.91, isPositive: true },
          { name: 'Tadawul Large Cap', value: 4625.85, change: 88.35, changePercent: 1.95, isPositive: true },
          { name: 'Tadawul Small Cap', value: 4930.83, change: 33.0, changePercent: 0.67, isPositive: true }
        ],
        topMovers: [
          { symbol: '2222', name: 'ACWA Power', lastPrice: 159.8, change: 5.4, changePercent: 3.5, isPositive: true },
          {
            symbol: '1010',
            name: 'Saudi Basic Industries',
            lastPrice: 83.4,
            change: 1.7,
            changePercent: 2.08,
            isPositive: true
          },
          {
            symbol: '2350',
            name: 'Saudi Aramco',
            lastPrice: 28.65,
            change: 0.45,
            changePercent: 1.6,
            isPositive: true
          },
          { symbol: '1211', name: "Ma'aden", lastPrice: 52.7, change: -0.3, changePercent: -0.57, isPositive: false }
        ]
      };

      setMarketData(mockData);
    };

    fetchMarketData();

    // In a real implementation, we might set up a websocket or polling
    const interval = setInterval(() => {
      fetchMarketData();
    }, 60000); // Refresh every minute

    return () => clearInterval(interval);
  }, []);

  // Chart options for the mini chart
  const chartOptions = {
    chart: {
      id: 'tadawul-area-chart',
      toolbar: {
        show: false
      },
      sparkline: {
        enabled: true
      },
      background: 'transparent',
      fontFamily: theme.typography.fontFamily
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'smooth',
      width: 2.5,
      colors: [marketData?.isPositive ? theme.palette.primary.main : theme.palette.secondary.main]
    },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.6,
        opacityTo: 0.1,
        stops: [0, 95, 100],
        colorStops: [
          {
            offset: 0,
            color: marketData?.isPositive ? theme.palette.primary.main : theme.palette.secondary.main,
            opacity: 0.6
          },
          {
            offset: 100,
            color: marketData?.isPositive ? theme.palette.primary.light : theme.palette.secondary.light,
            opacity: 0.1
          }
        ]
      }
    },
    tooltip: {
      fixed: {
        enabled: false
      },
      x: {
        show: false
      },
      marker: {
        show: false
      },
      theme: theme.palette.mode
    },
    grid: {
      show: false,
      padding: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
      }
    }
  };

  // Sample chart series data - in a real app would come from API
  const chartSeries = [
    {
      name: 'TASI',
      data: [10861, 10875, 10900, 10940, 10970, 10990, 11005, 11004]
    }
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        when: 'beforeChildren',
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 10, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.4, ease: 'easeOut' }
    }
  };

  return (
    <Box component={motion.div} variants={containerVariants} initial="hidden" animate="visible" sx={{ height: '100%' }}>
      {isLoading || !marketData ? (
        <Box sx={{ width: '100%', mt: 2 }}>
          <LinearProgress color="primary" />
        </Box>
      ) : (
        <Stack spacing={2.5} sx={{ height: '100%' }}>
          {/* Main Index Card */}
          <Box component={motion.div} variants={itemVariants}>
            <Paper
              elevation={0}
              sx={{
                p: 2.5,
                borderRadius: 2,
                bgcolor: theme.palette.background.paper,
                border: `1px solid ${alpha(theme.palette.divider, 0.1)}`
              }}
            >
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} md={7}>
                  <Box sx={{ mb: { xs: 1, md: 0 } }}>
                    <Typography
                      variant="caption"
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        color: theme.palette.text.secondary,
                        mb: 0.5
                      }}
                    >
                      <Icon icon="solar:clock-circle-bold" style={{ marginRight: '4px', fontSize: '14px' }} />
                      Last updated: {marketData.lastUpdate}
                    </Typography>

                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 600,
                        mb: 1,
                        color: theme.palette.text.primary
                      }}
                    >
                      {marketData.indexName}
                    </Typography>

                    <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 2 }}>
                      <Typography
                        variant="h3"
                        sx={{
                          fontWeight: 700,
                          lineHeight: 1.2,
                          color: theme.palette.text.primary
                        }}
                      >
                        {marketData.lastPrice.toLocaleString()}
                      </Typography>

                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          py: 0.5,
                          px: 1.5,
                          borderRadius: 1.5,
                          bgcolor: alpha(
                            marketData.isPositive ? theme.palette.primary.main : theme.palette.secondary.main,
                            theme.palette.mode === 'dark' ? 0.2 : 0.1
                          ),
                          border: `1px solid ${alpha(
                            marketData.isPositive ? theme.palette.primary.main : theme.palette.secondary.main,
                            0.2
                          )}`
                        }}
                      >
                        <Icon
                          icon={marketData.isPositive ? 'solar:arrow-up-bold' : 'solar:arrow-down-bold'}
                          width={18}
                          height={18}
                          style={{
                            marginRight: '6px',
                            color: marketData.isPositive ? theme.palette.primary.main : theme.palette.secondary.main
                          }}
                        />
                        <Typography
                          variant="body2"
                          sx={{
                            fontWeight: 600,
                            color: marketData.isPositive ? theme.palette.primary.main : theme.palette.secondary.main
                          }}
                        >
                          {marketData.change.toLocaleString()} ({marketData.changePercent}%)
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </Grid>

                <Grid item xs={12} md={5}>
                  <Box sx={{ height: 100, position: 'relative' }}>
                    <Chart options={chartOptions} series={chartSeries} type="area" height={100} />
                  </Box>
                </Grid>
              </Grid>
            </Paper>
          </Box>

          {/* Top Movers */}
          <Box component={motion.div} variants={itemVariants} sx={{ flexGrow: 1 }}>
            <Paper
              elevation={0}
              sx={{
                height: '100%',
                borderRadius: 2,
                overflow: 'hidden',
                bgcolor: theme.palette.background.paper,
                border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <Box
                sx={{
                  p: 2,
                  bgcolor: alpha(theme.palette.primary.main, 0.04),
                  borderBottom: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`
                }}
              >
                <Typography
                  variant="subtitle1"
                  sx={{
                    fontWeight: 600,
                    display: 'flex',
                    alignItems: 'center',
                    color: theme.palette.primary.main
                  }}
                >
                  <Icon
                    icon="solar:stock-up-bold-duotone"
                    style={{
                      fontSize: '20px',
                      marginRight: '8px',
                      color: theme.palette.primary.main
                    }}
                  />
                  Top Market Movers
                </Typography>
              </Box>

              <List
                sx={{
                  p: 0,
                  flexGrow: 1,
                  overflow: 'auto',
                  '& .MuiListItem-root': {
                    px: 2,
                    py: 1.5
                  }
                }}
              >
                {marketData.topMovers.map((stock, index) => (
                  <ListItem
                    key={stock.symbol}
                    sx={{
                      transition: 'all 0.2s ease',
                      '&:hover': {
                        bgcolor: alpha(theme.palette.primary.main, 0.04)
                      },
                      borderBottom:
                        index !== marketData.topMovers.length - 1
                          ? `1px solid ${alpha(theme.palette.divider, 0.1)}`
                          : 'none'
                    }}
                  >
                    <Grid container alignItems="center">
                      <Grid item xs={2} sm={1.5}>
                        <Box
                          sx={{
                            width: 32,
                            height: 32,
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            bgcolor: stock.isPositive ? theme.palette.primary.main : theme.palette.secondary.main
                          }}
                        >
                          <Typography
                            variant="caption"
                            sx={{
                              fontWeight: 700,
                              color: theme.palette.common.white
                            }}
                          >
                            {stock.symbol}
                          </Typography>
                        </Box>
                      </Grid>

                      <Grid item xs={6} sm={6.5}>
                        <Typography
                          variant="body2"
                          sx={{
                            fontWeight: 600,
                            fontSize: '0.9rem',
                            color: theme.palette.text.primary
                          }}
                        >
                          {stock.name}
                        </Typography>
                        <Typography
                          variant="caption"
                          sx={{
                            fontSize: '0.75rem',
                            color: theme.palette.text.secondary
                          }}
                        >
                          Saudi Stock Exchange
                        </Typography>
                      </Grid>

                      <Grid item xs={4} sx={{ textAlign: 'right' }}>
                        <Typography
                          variant="body2"
                          sx={{
                            fontWeight: 700,
                            fontSize: '0.95rem',
                            color: theme.palette.text.primary
                          }}
                        >
                          {stock.lastPrice.toFixed(2)}
                        </Typography>

                        <Box
                          sx={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            py: 0.25,
                            px: 0.75,
                            mt: 0.5,
                            borderRadius: 1,
                            bgcolor: alpha(
                              stock.isPositive ? theme.palette.primary.main : theme.palette.secondary.main,
                              0.1
                            )
                          }}
                        >
                          <Icon
                            icon={stock.isPositive ? 'solar:arrow-up-bold' : 'solar:arrow-down-bold'}
                            width={12}
                            height={12}
                            style={{
                              marginRight: '4px',
                              color: stock.isPositive ? theme.palette.primary.main : theme.palette.secondary.main
                            }}
                          />
                          <Typography
                            variant="caption"
                            sx={{
                              fontWeight: 600,
                              fontSize: '0.75rem',
                              color: stock.isPositive ? theme.palette.primary.main : theme.palette.secondary.main
                            }}
                          >
                            {stock.isPositive ? '+' : ''}
                            {stock.change.toFixed(2)} ({stock.changePercent}%)
                          </Typography>
                        </Box>
                      </Grid>
                    </Grid>
                  </ListItem>
                ))}
              </List>
            </Paper>
          </Box>
        </Stack>
      )}
    </Box>
  );
};

TadawulFeed.propTypes = {
  isLoading: PropTypes.bool
};

export default TadawulFeed;
