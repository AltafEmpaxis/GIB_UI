import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Grid,
  Box,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  IconButton,
  TextField,
  InputAdornment,
  Skeleton,
  Tabs,
  Tab,
  useMediaQuery
} from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';
import { motion } from 'framer-motion';
import { Icon } from '@iconify/react';

// project imports
import MainCard from 'components/MainCard';

// Mock data for trades
const createMockTradeData = () => {
  const trades = [
    {
      id: 'TR7821',
      security: 'ARAMCO - Saudi Arabian Oil Co.',
      ticker: '2222.SE',
      type: 'Buy',
      quantity: '1,500',
      price: 'SAR 31.85',
      value: 'SAR 47,775.00',
      date: '2023-11-20',
      status: 'Executed',
      broker: 'Al Rajhi Capital'
    },
    {
      id: 'TR7822',
      security: 'SABIC - Saudi Basic Industries Corp.',
      ticker: '2010.SE',
      type: 'Sell',
      quantity: '800',
      price: 'SAR 87.40',
      value: 'SAR 69,920.00',
      date: '2023-11-20',
      status: 'Executed',
      broker: 'NCB Capital'
    },
    {
      id: 'TR7823',
      security: 'Al Rajhi Bank',
      ticker: '1120.SE',
      type: 'Buy',
      quantity: '650',
      price: 'SAR 93.50',
      value: 'SAR 60,775.00',
      date: '2023-11-19',
      status: 'Executed',
      broker: 'SABB Securities'
    },
    {
      id: 'TR7824',
      security: 'Saudi Telecom Company',
      ticker: '7010.SE',
      type: 'Sell',
      quantity: '300',
      price: 'SAR 102.80',
      value: 'SAR 30,840.00',
      date: '2023-11-19',
      status: 'Failed',
      broker: 'Al Rajhi Capital'
    },
    {
      id: 'TR7825',
      security: 'Saudi Electricity Company',
      ticker: '5110.SE',
      type: 'Buy',
      quantity: '1,200',
      price: 'SAR 22.36',
      value: 'SAR 26,832.00',
      date: '2023-11-18',
      status: 'Pending',
      broker: 'ANB Invest'
    },
    {
      id: 'TR7826',
      security: 'Alinma Bank',
      ticker: '1150.SE',
      type: 'Buy',
      quantity: '2,000',
      price: 'SAR 19.68',
      value: 'SAR 39,360.00',
      date: '2023-11-18',
      status: 'Executed',
      broker: 'SABB Securities'
    },
    {
      id: 'TR7827',
      security: "Ma'aden - Saudi Arabian Mining Co.",
      ticker: '1211.SE',
      type: 'Sell',
      quantity: '400',
      price: 'SAR 43.65',
      value: 'SAR 17,460.00',
      date: '2023-11-17',
      status: 'Executed',
      broker: 'NCB Capital'
    }
  ];

  return trades;
};

// TradesTab component
const TradesTab = ({ isLoading }) => {
  const theme = useTheme();
  const matchDownMD = useMediaQuery(theme.breakpoints.down('lg'));
  const [tradeTabValue, setTradeTabValue] = useState(0);
  const trades = createMockTradeData();

  const handleTradeTabChange = (event, newValue) => {
    setTradeTabValue(newValue);
  };

  const getStatusChipProps = (status) => {
    switch (status) {
      case 'Executed':
        return {
          icon: <Icon icon="solar:check-circle-bold-duotone" />,
          color: 'success'
        };
      case 'Failed':
        return {
          icon: <Icon icon="solar:close-circle-bold-duotone" />,
          color: 'error'
        };
      case 'Pending':
        return {
          icon: <Icon icon="solar:hourglass-bold-duotone" />,
          color: 'warning'
        };
      default:
        return {
          icon: <Icon icon="solar:info-circle-bold-duotone" />,
          color: 'primary'
        };
    }
  };

  const getTypeChipProps = (type) => {
    return {
      icon:
        type === 'Buy' ? <Icon icon="solar:arrow-down-bold-duotone" /> : <Icon icon="solar:arrow-up-bold-duotone" />,
      color: type === 'Buy' ? 'success' : 'primary'
    };
  };

  const itemVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15
      }
    }
  };

  if (isLoading) {
    return (
      <Box component={motion.div} variants={itemVariant}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1.5 }}>
          <Skeleton variant="text" width={180} height={32} />
          <Skeleton variant="rectangular" width={120} height={36} sx={{ borderRadius: 1 }} />
        </Box>

        <MainCard sx={{ mb: 1.5 }}>
          <Skeleton variant="rectangular" height={48} sx={{ mb: 1.5, borderRadius: 1 }} />
          <Skeleton variant="rectangular" height={300} sx={{ borderRadius: 1 }} />
        </MainCard>
      </Box>
    );
  }

  return (
    <Box component={motion.div} variants={itemVariant}>
      {/* Tab Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1.5 }}>
        <Typography variant="h5" sx={{ fontWeight: 600, fontSize: '1.1rem' }}>
          Trading Activity
        </Typography>
        <Button
          variant="contained"
          size="small"
          startIcon={<Icon icon="solar:add-circle-bold-duotone" width={18} />}
          sx={{
            backgroundColor: theme.palette.primary.main,
            px: 1.5,
            py: 0.75,
            fontSize: '0.8125rem'
          }}
        >
          New Trade Order
        </Button>
      </Box>

      <MainCard sx={{ mb: 1.5, '& .MuiCardContent-root': { p: { xs: 1, md: 2 } } }}>
        {/* Trade Tabs */}
        <Tabs
          value={tradeTabValue}
          onChange={handleTradeTabChange}
          sx={{
            mb: 2,
            borderBottom: '1px solid',
            borderColor: 'divider',
            '& .MuiTab-root': {
              py: 1.5,
              px: { xs: 1, md: 2 },
              fontSize: '0.8125rem',
              minHeight: 40
            }
          }}
        >
          <Tab label="All Trades" icon={<Icon icon="solar:list-bold-duotone" width={16} />} iconPosition="start" />
          <Tab
            label="Buy Orders"
            icon={<Icon icon="solar:arrow-down-bold-duotone" width={16} />}
            iconPosition="start"
          />
          <Tab label="Sell Orders" icon={<Icon icon="solar:arrow-up-bold-duotone" width={16} />} iconPosition="start" />
          <Tab
            label="Pending"
            icon={<Icon icon="solar:hourglass-broken-bold-duotone" width={16} />}
            iconPosition="start"
          />
        </Tabs>

        {/* Search and Filter */}
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 1,
            mb: 2
          }}
        >
          <TextField
            size="small"
            placeholder="Search by ID, Security or Broker"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Icon icon="solar:magnifer-bold-duotone" width={18} />
                </InputAdornment>
              )
            }}
            sx={{
              width: { xs: '100%', md: 300 },
              '& .MuiOutlinedInput-root': {
                fontSize: '0.8125rem',
                height: 40
              }
            }}
          />

          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button
              variant="outlined"
              size="small"
              startIcon={<Icon icon="solar:filter-bold-duotone" width={16} />}
              sx={{
                fontSize: '0.75rem',
                px: 1.5,
                height: 40
              }}
            >
              Filter
            </Button>
            <Button
              variant="outlined"
              size="small"
              startIcon={<Icon icon="solar:sort-from-bottom-to-top-bold-duotone" width={16} />}
              sx={{
                fontSize: '0.75rem',
                px: 1.5,
                height: 40
              }}
            >
              Sort
            </Button>
            <Button
              variant="outlined"
              size="small"
              startIcon={<Icon icon="solar:restart-bold-duotone" width={16} />}
              sx={{
                fontSize: '0.75rem',
                px: 1.5,
                height: 40
              }}
            >
              Reset
            </Button>
          </Box>
        </Box>

        {/* Trades Table */}
        <TableContainer
          component={Paper}
          sx={{
            boxShadow: 'none',
            border: '1px solid',
            borderColor: alpha(theme.palette.divider, 0.5),
            borderRadius: 1
          }}
        >
          <Table
            sx={{
              minWidth: 650,
              '& .MuiTableCell-root': {
                fontSize: '0.8125rem',
                py: 1.5,
                px: { xs: 1, md: 2 }
              },
              '& .MuiTableCell-head': {
                fontWeight: 600,
                bgcolor: alpha(theme.palette.primary.main, 0.05)
              }
            }}
            aria-label="trades table"
          >
            <TableHead>
              <TableRow>
                <TableCell>Trade ID</TableCell>
                <TableCell>Security</TableCell>
                <TableCell align="center">Type</TableCell>
                <TableCell align="right">Quantity</TableCell>
                <TableCell align="right">Price</TableCell>
                <TableCell align="right">Value</TableCell>
                <TableCell>Date</TableCell>
                <TableCell align="center">Status</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {trades.map((trade, index) => {
                const statusChipProps = getStatusChipProps(trade.status);
                const typeChipProps = getTypeChipProps(trade.type);

                return (
                  <TableRow
                    key={trade.id}
                    sx={{
                      '&:last-child td, &:last-child th': { border: 0 },
                      backgroundColor: index % 2 === 0 ? 'inherit' : alpha(theme.palette.background.default, 0.5)
                    }}
                  >
                    <TableCell component="th" scope="row">
                      <Typography
                        variant="subtitle2"
                        sx={{
                          fontWeight: 600,
                          fontSize: '0.8125rem',
                          color: theme.palette.primary.main
                        }}
                      >
                        {trade.id}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                          {trade.security}
                        </Typography>
                        <Typography variant="caption" color="textSecondary">
                          {trade.ticker}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell align="center">
                      <Chip
                        label={trade.type}
                        size="small"
                        color={typeChipProps.color}
                        icon={typeChipProps.icon}
                        variant="filled"
                        sx={{
                          fontSize: '0.7rem',
                          fontWeight: 500,
                          height: 24,
                          '& .MuiChip-icon': { fontSize: '0.8rem' }
                        }}
                      />
                    </TableCell>
                    <TableCell align="right">
                      <Typography variant="body2">{trade.quantity}</Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Typography variant="body2">{trade.price}</Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>
                        {trade.value}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">{new Date(trade.date).toLocaleDateString('en-SA')}</Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Chip
                        label={trade.status}
                        size="small"
                        color={statusChipProps.color}
                        icon={statusChipProps.icon}
                        variant="outlined"
                        sx={{
                          fontSize: '0.7rem',
                          fontWeight: 500,
                          height: 24,
                          '& .MuiChip-icon': { fontSize: '0.8rem' }
                        }}
                      />
                    </TableCell>
                    <TableCell align="right">
                      <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 0.5 }}>
                        <IconButton
                          size="small"
                          sx={{
                            color: theme.palette.primary.main,
                            width: 28,
                            height: 28
                          }}
                        >
                          <Icon icon="solar:eye-bold-duotone" width={16} />
                        </IconButton>
                        <IconButton
                          size="small"
                          sx={{
                            color: theme.palette.warning.main,
                            width: 28,
                            height: 28
                          }}
                        >
                          <Icon icon="solar:pen-bold-duotone" width={16} />
                        </IconButton>
                        <IconButton
                          size="small"
                          sx={{
                            color: theme.palette.error.main,
                            width: 28,
                            height: 28
                          }}
                        >
                          <Icon icon="solar:trash-bin-trash-bold-duotone" width={16} />
                        </IconButton>
                      </Box>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Pagination info */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mt: 2,
            flexWrap: 'wrap',
            gap: 1
          }}
        >
          <Typography variant="caption" color="textSecondary">
            Showing 1-7 of 42 trades
          </Typography>

          <Box sx={{ display: 'flex', gap: 0.5 }}>
            <IconButton size="small" disabled sx={{ width: 28, height: 28 }}>
              <Icon icon="solar:arrow-left-bold-duotone" width={16} />
            </IconButton>
            <Button
              variant="contained"
              size="small"
              sx={{
                minWidth: 30,
                width: 30,
                height: 28,
                p: 0,
                fontSize: '0.75rem'
              }}
            >
              1
            </Button>
            <Button
              variant="text"
              size="small"
              sx={{
                minWidth: 30,
                width: 30,
                height: 28,
                p: 0,
                fontSize: '0.75rem'
              }}
            >
              2
            </Button>
            <Button
              variant="text"
              size="small"
              sx={{
                minWidth: 30,
                width: 30,
                height: 28,
                p: 0,
                fontSize: '0.75rem'
              }}
            >
              3
            </Button>
            <IconButton size="small" sx={{ width: 28, height: 28 }}>
              <Icon icon="solar:arrow-right-bold-duotone" width={16} />
            </IconButton>
          </Box>
        </Box>
      </MainCard>

      {/* Summary Cards */}
      <Grid container spacing={matchDownMD ? 1 : 1.5}>
        <Grid item xs={12} md={4}>
          <MainCard
            sx={{
              height: '100%',
              '& .MuiCardContent-root': { p: { xs: 1.5, md: 2 } }
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6" sx={{ fontSize: '1rem', fontWeight: 600 }}>
                Buy/Sell Ratio
              </Typography>
              <IconButton size="small" sx={{ width: 28, height: 28 }}>
                <Icon icon="solar:refresh-bold-duotone" width={16} />
              </IconButton>
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'space-around', mb: 1 }}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography
                  variant="h4"
                  sx={{
                    color: theme.palette.success.main,
                    fontSize: '1.5rem',
                    fontWeight: 700,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <Icon icon="solar:arrow-down-bold-duotone" style={{ marginRight: theme.spacing(0.5) }} width={20} />
                  65%
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Buy Orders
                </Typography>
              </Box>
              <Box sx={{ textAlign: 'center' }}>
                <Typography
                  variant="h4"
                  sx={{
                    color: theme.palette.primary.main,
                    fontSize: '1.5rem',
                    fontWeight: 700,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <Icon icon="solar:arrow-up-bold-duotone" style={{ marginRight: theme.spacing(0.5) }} width={20} />
                  35%
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Sell Orders
                </Typography>
              </Box>
            </Box>

            <Box
              sx={{
                height: 8,
                bgcolor: alpha(theme.palette.primary.main, 0.2),
                borderRadius: 4,
                mb: 2
              }}
            >
              <Box
                sx={{
                  height: '100%',
                  width: '65%',
                  bgcolor: theme.palette.success.main,
                  borderRadius: 4
                }}
              />
            </Box>

            <Typography variant="caption" color="textSecondary" sx={{ display: 'block', textAlign: 'center' }}>
              Net position trending towards accumulation
            </Typography>
          </MainCard>
        </Grid>

        <Grid item xs={12} md={4}>
          <MainCard
            sx={{
              height: '100%',
              '& .MuiCardContent-root': { p: { xs: 1.5, md: 2 } }
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6" sx={{ fontSize: '1rem', fontWeight: 600 }}>
                Trade Success Rate
              </Typography>
              <Chip
                label="98.7%"
                color="success"
                size="small"
                sx={{
                  height: 24,
                  fontWeight: 600,
                  fontSize: '0.75rem'
                }}
              />
            </Box>

            <Grid container spacing={1}>
              <Grid item xs={4}>
                <Paper
                  sx={{
                    p: 1.5,
                    textAlign: 'center',
                    bgcolor: alpha(theme.palette.success.main, 0.1)
                  }}
                >
                  <Typography
                    variant="h5"
                    sx={{
                      color: theme.palette.success.main,
                      fontWeight: 700,
                      fontSize: '1.25rem'
                    }}
                  >
                    216
                  </Typography>
                  <Typography variant="caption" sx={{ display: 'block' }}>
                    Executed
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={4}>
                <Paper
                  sx={{
                    p: 1.5,
                    textAlign: 'center',
                    bgcolor: alpha(theme.palette.warning.main, 0.1)
                  }}
                >
                  <Typography
                    variant="h5"
                    sx={{
                      color: theme.palette.warning.main,
                      fontWeight: 700,
                      fontSize: '1.25rem'
                    }}
                  >
                    6
                  </Typography>
                  <Typography variant="caption" sx={{ display: 'block' }}>
                    Pending
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={4}>
                <Paper
                  sx={{
                    p: 1.5,
                    textAlign: 'center',
                    bgcolor: alpha(theme.palette.error.main, 0.1)
                  }}
                >
                  <Typography
                    variant="h5"
                    sx={{
                      color: theme.palette.error.main,
                      fontWeight: 700,
                      fontSize: '1.25rem'
                    }}
                  >
                    3
                  </Typography>
                  <Typography variant="caption" sx={{ display: 'block' }}>
                    Failed
                  </Typography>
                </Paper>
              </Grid>
            </Grid>

            <Typography
              variant="caption"
              color="textSecondary"
              sx={{
                display: 'block',
                textAlign: 'center',
                mt: 2
              }}
            >
              Trade execution trending better than last month (+0.8%)
            </Typography>
          </MainCard>
        </Grid>

        <Grid item xs={12} md={4}>
          <MainCard
            sx={{
              height: '100%',
              '& .MuiCardContent-root': { p: { xs: 1.5, md: 2 } }
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6" sx={{ fontSize: '1rem', fontWeight: 600 }}>
                Today's Activity
              </Typography>
              <IconButton size="small" sx={{ width: 28, height: 28 }}>
                <Icon icon="solar:calendar-mark-bold-duotone" width={16} />
              </IconButton>
            </Box>

            <Box sx={{ mb: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                <Typography variant="body2" color="textSecondary">
                  Total Value
                </Typography>
                <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                  SAR 3.84M
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                <Typography variant="body2" color="textSecondary">
                  Buy Orders
                </Typography>
                <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                  12 Trades
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                <Typography variant="body2" color="textSecondary">
                  Sell Orders
                </Typography>
                <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                  8 Trades
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body2" color="textSecondary">
                  Avg. Execution Time
                </Typography>
                <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                  3.2 sec
                </Typography>
              </Box>
            </Box>

            <Button
              fullWidth
              variant="outlined"
              size="small"
              startIcon={<Icon icon="solar:document-text-bold-duotone" width={16} />}
              sx={{
                fontSize: '0.8125rem',
                mt: 1
              }}
            >
              View Trading Report
            </Button>
          </MainCard>
        </Grid>
      </Grid>
    </Box>
  );
};

TradesTab.propTypes = {
  isLoading: PropTypes.bool
};

export default TradesTab;
