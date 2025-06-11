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
  Divider,
  Grid,
  LinearProgress,
  List,
  ListItem,
  ListItemText,
  Stack,
  Typography,
  useTheme
} from '@mui/material';

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
      background: 'transparent'
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'smooth',
      width: 2
    },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.3,
        stops: [0, 90, 100],
        colorStops: [
          {
            offset: 0,
            color: theme.palette.success.main,
            opacity: 0.7
          },
          {
            offset: 100,
            color: theme.palette.success.light,
            opacity: 0.3
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
      }
    },
    yaxis: {
      min: 0
    },
    colors: [theme.palette.success.main],
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

  return (
    <Box sx={{ height: '100%' }}>
      {isLoading || !marketData ? (
        <Box sx={{ width: '100%', mt: 2 }}>
          <LinearProgress />
        </Box>
      ) : (
        <Grid container spacing={2}>
          {/* Main Index Card */}
          <Grid item xs={12}>
            <Card sx={{ boxShadow: theme.shadows[2], bgcolor: alpha(theme.palette.background.paper, 0.9) }}>
              <CardContent>
                <Grid container alignItems="center" spacing={2}>
                  <Grid item xs={12} md={6}>
                    <Stack spacing={1}>
                      <Typography variant="h5">{marketData.indexName}</Typography>
                      <Stack direction="row" alignItems="center" spacing={1}>
                        <Typography variant="h3">{marketData.lastPrice.toLocaleString()}</Typography>
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
                          sx={{ fontWeight: 500 }}
                        />
                      </Stack>
                      <Typography variant="caption">Last updated: {marketData.lastUpdate}</Typography>
                    </Stack>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Box sx={{ height: 120, mt: { xs: 1, md: 0 } }}>
                      <Chart options={chartOptions} series={chartSeries} type="area" height={120} />
                    </Box>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>

          {/* Stats */}
          <Grid item xs={12} md={5}>
            <Card sx={{ boxShadow: theme.shadows[2], height: '100%' }}>
              <CardContent>
                <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 500 }}>
                  Market Statistics
                </Typography>
                <Grid container spacing={1}>
                  <Grid item xs={6}>
                    <Stack spacing={1}>
                      <Box>
                        <Typography variant="caption" color="textSecondary">
                          Open
                        </Typography>
                        <Typography variant="body1">{marketData.open.toLocaleString()}</Typography>
                      </Box>
                      <Box>
                        <Typography variant="caption" color="textSecondary">
                          Previous Close
                        </Typography>
                        <Typography variant="body1">{marketData.previousClose.toLocaleString()}</Typography>
                      </Box>
                    </Stack>
                  </Grid>
                  <Grid item xs={6}>
                    <Stack spacing={1}>
                      <Box>
                        <Typography variant="caption" color="textSecondary">
                          Today's High
                        </Typography>
                        <Typography variant="body1">{marketData.high.toLocaleString()}</Typography>
                      </Box>
                      <Box>
                        <Typography variant="caption" color="textSecondary">
                          Today's Low
                        </Typography>
                        <Typography variant="body1">{marketData.low.toLocaleString()}</Typography>
                      </Box>
                    </Stack>
                  </Grid>
                  <Grid item xs={12}>
                    <Divider sx={{ my: 1 }} />
                  </Grid>
                  <Grid item xs={6}>
                    <Box>
                      <Typography variant="caption" color="textSecondary">
                        Volume
                      </Typography>
                      <Typography variant="body1">{marketData.volume}</Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={6}>
                    <Box>
                      <Typography variant="caption" color="textSecondary">
                        Turnover (SAR)
                      </Typography>
                      <Typography variant="body1">{marketData.turnover}</Typography>
                    </Box>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>

          {/* Top Movers */}
          <Grid item xs={12} md={7}>
            <Card sx={{ boxShadow: theme.shadows[2], height: '100%' }}>
              <CardContent>
                <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 500 }}>
                  Top Movers
                </Typography>
                <List dense disablePadding>
                  {marketData.topMovers.map((stock, index) => (
                    <ListItem key={stock.symbol} divider={index !== marketData.topMovers.length - 1} sx={{ py: 0.75 }}>
                      <ListItemText
                        primary={
                          <Stack direction="row" justifyContent="space-between" alignItems="center">
                            <Stack>
                              <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                {stock.name}
                              </Typography>
                              <Typography variant="caption" color="textSecondary">
                                {stock.symbol}
                              </Typography>
                            </Stack>
                            <Stack alignItems="flex-end">
                              <Typography variant="body2">{stock.lastPrice.toFixed(2)}</Typography>
                              <Typography
                                variant="caption"
                                sx={{ color: stock.isPositive ? theme.palette.success.main : theme.palette.error.main }}
                              >
                                {stock.isPositive ? '+' : ''}
                                {stock.change.toFixed(2)} ({stock.changePercent}%)
                              </Typography>
                            </Stack>
                          </Stack>
                        }
                      />
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
