import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

// material-ui
import { Icon } from '@iconify/react';
import {
  alpha,
  Box,
  Card,
  CardContent,
  Chip,
  Grid,
  LinearProgress,
  List,
  ListItem,
  Paper,
  Stack,
  Typography,
  useTheme
} from '@mui/material';
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
      colors: [marketData?.isPositive ? theme.palette.success.main : theme.palette.error.main]
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
            color: marketData?.isPositive ? theme.palette.success.main : theme.palette.error.main,
            opacity: 0.6
          },
          {
            offset: 100,
            color: marketData?.isPositive ? theme.palette.success.light : theme.palette.error.light,
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

  const StatItem = ({ label, value, isSpecial = false }) => (
    <Box>
      <Typography
        variant="caption"
        color="textSecondary"
        sx={{
          fontSize: '0.75rem',
          display: 'block',
          mb: 0.5
        }}
      >
        {label}
      </Typography>
      <Typography
        variant="body2"
        sx={{
          fontWeight: 600,
          color: isSpecial
            ? marketData?.isPositive
              ? theme.palette.success.main
              : theme.palette.error.main
            : 'inherit',
          fontSize: '0.9rem'
        }}
      >
        {value}
      </Typography>
    </Box>
  );

  return (
    <Box component={motion.div} variants={containerVariants} initial="hidden" animate="visible" sx={{ height: '100%' }}>
      {isLoading || !marketData ? (
        <Box sx={{ width: '100%', mt: 2 }}>
          <LinearProgress />
        </Box>
      ) : (
        <Grid container spacing={2}>
          {/* Main Index Card */}
          <Grid item xs={12} component={motion.div} variants={itemVariants}>
            <Card
              sx={{
                borderRadius: 2,
                boxShadow: 'none',
                border: `1px solid ${alpha(theme.palette.divider, 0.15)}`,
                bgcolor: alpha(theme.palette.background.paper, 0.8),
                overflow: 'hidden'
              }}
            >
              <CardContent>
                <Grid container alignItems="center" spacing={2}>
                  <Grid item xs={12} md={6}>
                    <Stack spacing={1}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Icon
                          icon="solar:saudi-arabia-bold-duotone"
                          style={{
                            marginRight: '8px',
                            fontSize: '22px',
                            color: theme.palette.primary.main
                          }}
                        />
                        <Typography variant="h5">{marketData.indexName}</Typography>
                      </Box>
                      <Stack direction="row" alignItems="center" spacing={1}>
                        <Typography
                          variant="h3"
                          sx={{
                            fontWeight: 600,
                            color: theme.palette.text.primary
                          }}
                        >
                          {marketData.lastPrice.toLocaleString()}
                        </Typography>
                        <Stack direction="column">
                          <Chip
                            icon={
                              <Icon
                                icon={marketData.isPositive ? 'solar:arrow-up-bold' : 'solar:arrow-down-bold'}
                                width={16}
                                height={16}
                              />
                            }
                            label={`${marketData.change.toLocaleString()} (${marketData.changePercent}%)`}
                            size="small"
                            color={marketData.isPositive ? 'success' : 'error'}
                            sx={{ fontWeight: 500, height: 28 }}
                          />
                          <Typography
                            variant="caption"
                            sx={{
                              mt: 0.5,
                              display: 'flex',
                              alignItems: 'center'
                            }}
                          >
                            <Icon
                              icon="solar:clock-circle-bold"
                              style={{
                                marginRight: '4px',
                                fontSize: '14px'
                              }}
                            />
                            Last updated: {marketData.lastUpdate}
                          </Typography>
                        </Stack>
                      </Stack>
                    </Stack>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Box
                      sx={{
                        height: 120,
                        mt: { xs: 1, md: 0 },
                        position: 'relative',
                        '&::after': {
                          content: '""',
                          position: 'absolute',
                          bottom: 0,
                          left: 0,
                          right: 0,
                          height: '30%',
                          background: `linear-gradient(to top, ${alpha(theme.palette.background.paper, 0.3)}, transparent)`,
                          zIndex: 1,
                          pointerEvents: 'none'
                        }
                      }}
                    >
                      <Chart options={chartOptions} series={chartSeries} type="area" height={120} />
                    </Box>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>

          {/* Stats */}
          <Grid item xs={12} md={5} component={motion.div} variants={itemVariants}>
            <Card
              sx={{
                height: '100%',
                borderRadius: 2,
                boxShadow: 'none',
                border: `1px solid ${alpha(theme.palette.divider, 0.15)}`,
                bgcolor: alpha(theme.palette.background.paper, 0.8)
              }}
            >
              <CardContent>
                <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
                  <Box
                    sx={{
                      width: 36,
                      height: 36,
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      bgcolor: alpha(theme.palette.primary.main, 0.1)
                    }}
                  >
                    <Icon
                      icon="solar:chart-square-bold-duotone"
                      style={{
                        fontSize: '20px',
                        color: theme.palette.primary.main
                      }}
                    />
                  </Box>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    Market Statistics
                  </Typography>
                </Stack>

                <Grid container spacing={1.5}>
                  <Grid item xs={6}>
                    <Paper
                      elevation={0}
                      sx={{
                        p: 1.5,
                        borderRadius: 1.5,
                        bgcolor: alpha(theme.palette.background.default, 0.6),
                        border: `1px solid ${alpha(theme.palette.divider, 0.1)}`
                      }}
                    >
                      <StatItem label="Open" value={marketData.open.toLocaleString()} />
                    </Paper>
                  </Grid>
                  <Grid item xs={6}>
                    <Paper
                      elevation={0}
                      sx={{
                        p: 1.5,
                        borderRadius: 1.5,
                        bgcolor: alpha(theme.palette.background.default, 0.6),
                        border: `1px solid ${alpha(theme.palette.divider, 0.1)}`
                      }}
                    >
                      <StatItem label="Previous Close" value={marketData.previousClose.toLocaleString()} />
                    </Paper>
                  </Grid>
                  <Grid item xs={6}>
                    <Paper
                      elevation={0}
                      sx={{
                        p: 1.5,
                        borderRadius: 1.5,
                        bgcolor: alpha(theme.palette.background.default, 0.6),
                        border: `1px solid ${alpha(theme.palette.divider, 0.1)}`
                      }}
                    >
                      <StatItem label="Today's High" value={marketData.high.toLocaleString()} isSpecial={true} />
                    </Paper>
                  </Grid>
                  <Grid item xs={6}>
                    <Paper
                      elevation={0}
                      sx={{
                        p: 1.5,
                        borderRadius: 1.5,
                        bgcolor: alpha(theme.palette.background.default, 0.6),
                        border: `1px solid ${alpha(theme.palette.divider, 0.1)}`
                      }}
                    >
                      <StatItem label="Today's Low" value={marketData.low.toLocaleString()} isSpecial={true} />
                    </Paper>
                  </Grid>
                  <Grid item xs={12}>
                    <Paper
                      elevation={0}
                      sx={{
                        p: 1.5,
                        borderRadius: 1.5,
                        bgcolor: alpha(theme.palette.primary.main, 0.05),
                        border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`
                      }}
                    >
                      <Grid container spacing={1}>
                        <Grid item xs={6}>
                          <StatItem label="Volume" value={marketData.volume} />
                        </Grid>
                        <Grid item xs={6}>
                          <StatItem label="Turnover (SAR)" value={marketData.turnover} />
                        </Grid>
                      </Grid>
                    </Paper>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>

          {/* Top Movers */}
          <Grid item xs={12} md={7} component={motion.div} variants={itemVariants}>
            <Card
              sx={{
                height: '100%',
                borderRadius: 2,
                boxShadow: 'none',
                border: `1px solid ${alpha(theme.palette.divider, 0.15)}`,
                bgcolor: alpha(theme.palette.background.paper, 0.8)
              }}
            >
              <CardContent sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
                  <Box
                    sx={{
                      width: 36,
                      height: 36,
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      bgcolor: alpha(theme.palette.success.main, 0.1)
                    }}
                  >
                    <Icon
                      // icon="solar:stock-up-bold-duotone"
                      // icon="cbi:top-radio"
                      icon="streamline-freehand-color:analytics-graph-stock"
                      style={{
                        fontSize: '20px',
                        color: theme.palette.success.main
                      }}
                    />
                  </Box>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    Top Movers
                  </Typography>
                </Stack>

                <List
                  sx={{
                    p: 0,
                    flex: 1,
                    overflow: 'hidden',
                    '& .MuiListItem-root': {
                      px: 0
                    }
                  }}
                >
                  {marketData.topMovers.map((stock, index) => (
                    <ListItem
                      key={stock.symbol}
                      sx={{
                        py: 1.5,
                        borderBottom:
                          index !== marketData.topMovers.length - 1
                            ? `1px solid ${alpha(theme.palette.divider, 0.1)}`
                            : 'none'
                      }}
                    >
                      <Box sx={{ width: '100%' }}>
                        <Grid container alignItems="center">
                          <Grid item xs={7} sm={8}>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <Box
                                sx={{
                                  width: 32,
                                  height: 32,
                                  borderRadius: '50%',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  bgcolor: alpha(
                                    stock.isPositive ? theme.palette.success.main : theme.palette.error.main,
                                    0.1
                                  ),
                                  mr: 1.5
                                }}
                              >
                                <Typography
                                  variant="caption"
                                  sx={{
                                    fontWeight: 600,
                                    color: stock.isPositive ? theme.palette.success.main : theme.palette.error.main
                                  }}
                                >
                                  {stock.symbol}
                                </Typography>
                              </Box>
                              <Box>
                                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                  {stock.name}
                                </Typography>
                                <Typography variant="caption" color="textSecondary">
                                  Saudi Stock Exchange
                                </Typography>
                              </Box>
                            </Box>
                          </Grid>
                          <Grid item xs={5} sm={4}>
                            <Box sx={{ textAlign: 'right' }}>
                              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                {stock.lastPrice.toFixed(2)}
                              </Typography>
                              <Typography
                                variant="caption"
                                sx={{
                                  color: stock.isPositive ? theme.palette.success.main : theme.palette.error.main,
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'flex-end'
                                }}
                              >
                                <Icon
                                  icon={stock.isPositive ? 'solar:arrow-up-bold' : 'solar:arrow-down-bold'}
                                  width={14}
                                  height={14}
                                  style={{ marginRight: '4px' }}
                                />
                                {stock.isPositive ? '+' : ''}
                                {stock.change.toFixed(2)} ({stock.changePercent}%)
                              </Typography>
                            </Box>
                          </Grid>
                        </Grid>
                      </Box>
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}
    </Box>
  );
};

TadawulFeed.propTypes = {
  isLoading: PropTypes.bool
};

export default TadawulFeed;
