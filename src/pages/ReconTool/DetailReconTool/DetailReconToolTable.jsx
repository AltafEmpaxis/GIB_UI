import { Icon } from '@iconify/react';
import { Alert, Box, Button, Card, Chip, Grid, Typography, useTheme } from '@mui/material';
import MainCard from 'components/MainCard';
import ReusableTable from 'components/Table/ReusableTable';
import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router';
import mockData from './PortfolioHoldingsAnalysis/mockdata.json';
import mockDataGroup from './PortfolioHoldingsAnalysis/mockdataGroup.json';
import MetricCard from './ReconMetricsCards';

// Reconciliation configuration - standardized across all components
const RECONCILIATION_CONFIG = {
  THRESHOLD: 1.0, // SAR - difference threshold for reconciliation
  TOLERANCE: 0.01 // Tolerance for rounding errors
};

// Generate account data from portfolio summary data with proper reconciliation logic
const generateAccountData = () => {
  const portfolioCodes = [...new Set(mockData.map((item) => item.portfolioCode))];

  return portfolioCodes.map((portfolioCode, index) => {
    const portfolioData = mockData.filter((item) => item.portfolioCode === portfolioCode);

    // Calculate total amounts for different asset classes
    const totalAmount = portfolioData.reduce((sum, item) => sum + (item.apxMarketValue || 0), 0);

    // **RECONCILIATION LOGIC**: Check if total market value differences are zero
    // Sum all marketValueDiff (not absolute values) to see net difference
    const totalMarketValueDiff = portfolioData.reduce((sum, item) => sum + (item.marketValueDiff || 0), 0);

    // Get equity and cash differences separately for analysis
    const equityData = portfolioData.filter((item) => item.assetClass === 'Equity');
    const cashData = portfolioData.filter((item) => item.assetClass && item.assetClass.includes('CASH'));

    const equityDiff = equityData.reduce((sum, item) => sum + (item.marketValueDiff || 0), 0);
    const cashDiff = cashData.reduce((sum, item) => sum + (item.marketValueDiff || 0), 0);

    // Portfolio is RECONCILED if total difference is exactly zero (or very close to zero due to rounding)
    const isReconciled = Math.abs(totalMarketValueDiff) < RECONCILIATION_CONFIG.TOLERANCE;

    // Get cash balance from CASH SAR entries
    const cashEntry = portfolioData.find((item) => item.assetClass === 'CASH SAR');
    const cashBalance = cashEntry ? cashEntry.apxMarketValue : 0;

    // Count positions with differences for analysis (use detailed group data)
    const portfolioGroupData = mockDataGroup.filter((item) => item.portfolioCode === portfolioCode);
    const positionsWithDiff = portfolioGroupData.filter(
      (item) => Math.abs(item.marketValueDiff || 0) >= RECONCILIATION_CONFIG.THRESHOLD
    ).length;

    return {
      id: index + 1,
      account_number: portfolioCode,
      account_name: `Portfolio ${portfolioCode}`,
      status: isReconciled ? 'reconciled' : 'unreconciled',
      date: new Date().toISOString().split('T')[0],
      amount: totalAmount,
      currency: 'SAR',
      reconciled_by: isReconciled ? 'System Auto-reconciled' : `-`,
      portfolio: `Portfolio ${portfolioCode}`,
      location: 'Riyadh',
      quantity: Math.floor(totalAmount / 100), // Estimated quantity
      security_symbol: portfolioCode,
      security_name: `Portfolio ${portfolioCode}`,
      cash_balance: cashBalance,
      // Additional reconciliation details
      total_difference: totalMarketValueDiff,
      equity_difference: equityDiff,
      cash_difference: cashDiff,
      positions_with_diff: positionsWithDiff,
      reconciliation_status: isReconciled ? 'RECONCILED' : 'UNRECONCILED',
      reconciliation_details: isReconciled
        ? 'All positions match between APX and Broker'
        : `${positionsWithDiff} position(s) with differences. Total diff: ${new Intl.NumberFormat('en-SA', { style: 'currency', currency: 'SAR' }).format(totalMarketValueDiff)}`
    };
  });
};

const mockAccounts = generateAccountData();

// Console log for debugging reconciliation logic
// console.log(
//   '📊 Reconciliation Analysis:',
//   mockAccounts.map((account) => ({
//     portfolio: account.account_number,
//     status: account.status,
//     totalDiff: account.total_difference,
//     equityDiff: account.equity_difference,
//     cashDiff: account.cash_difference,
//     positionsWithDiff: account.positions_with_diff,
//     details: account.reconciliation_details
//   }))
// );

export default function DetailReconToolTable() {
  const theme = useTheme();
  const [columnFilters, setColumnFilters] = useState([]);
  const navigate = useNavigate();

  // Metrics calculation
  const metrics = useMemo(() => {
    // Basic counts
    const totalAccounts = mockAccounts.length;
    const reconciled = mockAccounts.filter((account) => account.status === 'reconciled').length;
    const unreconciled = totalAccounts - reconciled;

    // Total amount calculation
    const formatter = new Intl.NumberFormat('en-SA', { style: 'currency', currency: 'SAR' });
    const totalAmount = mockAccounts.reduce((sum, account) => sum + account.amount, 0);

    // Total positions (quantity)
    const totalPositions = mockAccounts.reduce((sum, account) => sum + account.quantity, 0);

    // Cash balance calculation
    const totalCashBalance = mockAccounts.reduce((sum, account) => sum + account.cash_balance, 0);

    return [
      {
        id: 'market_value',
        title: 'Market Value Reconciliation',
        value: formatter.format(totalAmount),
        subtitle: 'Total portfolio value',
        icon: 'solar:money-bag-bold-duotone',
        color: theme.palette?.secondary?.main || '#FFC72C', // GIB Yellow
        trend: '+7.3%'
      },
      {
        id: 'positions',
        title: 'Positions',
        value: totalPositions.toLocaleString(),
        subtitle: 'Total shares held',
        icon: 'solar:document-text-bold-duotone',
        color: theme.palette?.success?.main || '#4caf50',
        trend: '+5.8%'
      },
      {
        id: 'cash_balance',
        title: 'Cash Balance',
        value: formatter.format(totalCashBalance),
        subtitle: 'Available funds',
        icon: 'solar:wallet-money-bold-duotone',
        color: theme.palette?.info?.main || '#2196f3',
        trend: '+3.2%'
      },
      {
        id: 'all',
        title: 'Total Accounts',
        value: totalAccounts.toString(),
        subtitle: `${reconciled} reconciled, ${unreconciled} unreconciled`,
        icon: 'solar:check-square-bold-duotone',
        color: theme.palette?.primary?.main || '#53565A', // GIB Dark Grey
        trend: '+2.5%'
      }
    ];
  }, [theme.palette]);

  // Define columns for the table
  const columns = useMemo(
    () => [
      {
        accessorKey: 'account_number',
        header: 'Portfolio Code',
        size: 250,
        enableColumnFilter: true,
        filterVariant: 'text',
        Cell: ({ cell }) => {
          // Account number IS the portfolio code - simple direct mapping
          const portfolioCode = cell.getValue();

          return (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Icon icon="solar:folder-bold-duotone" width={16} style={{ color: theme.palette.secondary.main }} />
              <Button
                variant="text"
                color="secondary"
                onClick={() =>
                  navigate(
                    `/Portfolio-Holdings-Analysis?portfolio=${portfolioCode}&status=${cell.row.original.status}&date=${cell.row.original.date}`
                  )
                }
                sx={{
                  textDecoration: 'underline',
                  color: theme.palette.secondary.main,
                  textTransform: 'none',
                  padding: 0,
                  minWidth: 0,
                  fontWeight: 600
                }}
                title={`Click to view detailed holdings for ${portfolioCode}`}
              >
                {cell.getValue()}
              </Button>
            </Box>
          );
        }
      },
      {
        accessorKey: 'status',
        header: 'Reconciliation Status',
        size: 200,
        filterVariant: 'select',
        filterSelectOptions: [
          { label: '✅ Reconciled (All Match)', value: 'reconciled' },
          { label: '❌ Unreconciled (Has Differences)', value: 'unreconciled' }
        ],
        Cell: ({ cell, row }) => {
          const isReconciled = cell.getValue() === 'reconciled';
          return (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Chip
                label={isReconciled ? 'RECONCILED' : 'UNRECONCILED'}
                color={isReconciled ? 'success' : 'error'}
                size="small"
                variant="filled"
                sx={{
                  fontWeight: 600,
                  '&:hover': {
                    cursor: 'help'
                  }
                }}
                title={
                  isReconciled
                    ? 'All positions match between APX and Broker systems'
                    : `${row.original.positions_with_diff} position(s) have differences requiring review`
                }
                icon={
                  <Icon
                    icon={isReconciled ? 'solar:check-circle-bold' : 'solar:close-circle-bold'}
                    width={14}
                    height={14}
                  />
                }
              />
              {!isReconciled && (
                <Typography variant="caption" sx={{ color: 'error.main', fontWeight: 500 }}>
                  {row.original.positions_with_diff} issues
                </Typography>
              )}
            </Box>
          );
        }
      },
      {
        accessorKey: 'date',
        header: 'Report Date',
        size: 250,
        filterVariant: 'date',
        Cell: ({ cell }) => (
          <Typography variant="body2" sx={{ fontWeight: 500, fontFamily: 'monospace' }}>
            {new Date(cell.getValue()).toLocaleDateString('en-GB')}
          </Typography>
        )
      },
      {
        accessorKey: 'amount',
        header: 'Total Market Value',
        size: 350,
        filterVariant: 'range',
        Cell: ({ cell }) => (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Icon icon="solar:money-bag-bold-duotone" width={14} style={{ color: theme.palette.success.main }} />
            <Typography variant="body2" sx={{ fontWeight: 600, fontFamily: 'monospace', color: 'success.main' }}>
              {new Intl.NumberFormat('en-SA', { style: 'currency', currency: 'SAR' }).format(cell.getValue())}
            </Typography>
          </Box>
        )
      },
      {
        accessorKey: 'cash_balance',
        header: 'Available Cash',
        size: 350,
        filterVariant: 'range',
        Cell: ({ cell }) => (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Icon icon="solar:wallet-money-bold-duotone" width={14} style={{ color: theme.palette.info.main }} />
            <Typography variant="body2" sx={{ fontWeight: 600, fontFamily: 'monospace', color: 'info.main' }}>
              {new Intl.NumberFormat('en-SA', { style: 'currency', currency: 'SAR' }).format(cell.getValue())}
            </Typography>
          </Box>
        )
      },
      {
        accessorKey: 'equity_difference',
        header: 'Equity Difference',
        size: 350,
        filterVariant: 'range',
        Cell: ({ cell }) => {
          const value = cell.getValue();
          const isPositive = value > 0;
          const isNegative = value < 0;
          const color = isPositive
            ? theme.palette.success.main
            : isNegative
              ? theme.palette.error.main
              : theme.palette.text.secondary;

          return (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Icon
                icon={
                  isPositive
                    ? 'solar:arrow-up-bold-duotone'
                    : isNegative
                      ? 'solar:arrow-down-bold-duotone'
                      : 'solar:minus-circle-bold-duotone'
                }
                width={14}
                style={{ color }}
              />
              <Typography variant="body2" sx={{ fontWeight: 600, fontFamily: 'monospace', color }}>
                {new Intl.NumberFormat('en-SA', { style: 'currency', currency: 'SAR' }).format(Math.abs(value))}
              </Typography>
            </Box>
          );
        }
      },
      {
        accessorKey: 'cash_difference',
        header: 'Cash Difference',
        size: 350,
        filterVariant: 'range',
        Cell: ({ cell }) => {
          const value = cell.getValue();
          const isPositive = value > 0;
          const isNegative = value < 0;
          const color = isPositive
            ? theme.palette.success.main
            : isNegative
              ? theme.palette.error.main
              : theme.palette.text.secondary;

          return (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Icon
                icon={
                  isPositive
                    ? 'solar:arrow-up-bold-duotone'
                    : isNegative
                      ? 'solar:arrow-down-bold-duotone'
                      : 'solar:minus-circle-bold-duotone'
                }
                width={14}
                style={{ color }}
              />
              <Typography variant="body2" sx={{ fontWeight: 600, fontFamily: 'monospace', color }}>
                {new Intl.NumberFormat('en-SA', { style: 'currency', currency: 'SAR' }).format(Math.abs(value))}
              </Typography>
            </Box>
          );
        }
      },
      {
        accessorKey: 'total_difference',
        header: 'Total Net Difference',
        size: 350,
        filterVariant: 'range',
        Cell: ({ cell }) => {
          const value = cell.getValue();
          const isPositive = value > 0;
          const isNegative = value < 0;
          const color = isPositive
            ? theme.palette.success.main
            : isNegative
              ? theme.palette.error.main
              : theme.palette.text.secondary;

          return (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Icon
                icon={
                  isPositive
                    ? 'solar:trending-up-bold-duotone'
                    : isNegative
                      ? 'solar:trending-down-bold-duotone'
                      : 'solar:check-circle-bold-duotone'
                }
                width={16}
                style={{ color }}
              />
              <Typography variant="body2" sx={{ fontWeight: 700, fontFamily: 'monospace', color, fontSize: '0.9rem' }}>
                {Math.abs(value) < 0.01
                  ? 'MATCHED'
                  : new Intl.NumberFormat('en-SA', { style: 'currency', currency: 'SAR' }).format(value)}
              </Typography>
            </Box>
          );
        }
      },
      {
        accessorKey: 'reconciliation_details',
        header: 'Reconciliation Summary',
        size: 400,
        Cell: ({ cell, row }) => (
          <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
              <Icon
                icon={row.original.status === 'reconciled' ? 'solar:check-circle-bold' : 'solar:danger-circle-bold'}
                width={14}
                style={{
                  color: row.original.status === 'reconciled' ? theme.palette.success.main : theme.palette.error.main
                }}
              />
              <Typography
                variant="caption"
                sx={{
                  color: row.original.status === 'reconciled' ? 'success.main' : 'error.main',
                  fontWeight: 600,
                  textTransform: 'uppercase'
                }}
              >
                {row.original.reconciliation_status}
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ fontSize: '0.75rem', color: 'text.primary', mb: 0.5 }}>
              {cell.getValue()}
            </Typography>
            {row.original.status === 'unreconciled' && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
                <Icon icon="solar:calculator-bold" width={12} style={{ color: theme.palette.error.main }} />
                <Typography variant="caption" sx={{ color: 'error.main', fontWeight: 600 }}>
                  Net Difference:{' '}
                  {new Intl.NumberFormat('en-SA', { style: 'currency', currency: 'SAR' }).format(
                    Math.abs(row.original.total_difference)
                  )}
                </Typography>
              </Box>
            )}
          </Box>
        )
      }
    ],
    [
      navigate,
      theme.palette.secondary.main,
      theme.palette.error.main,
      theme.palette.info.main,
      theme.palette.success.main,
      theme.palette.text.secondary
    ]
  );

  // Table props configuration - showing all portfolios by default
  const tableProps = {
    columns: columns,
    data: mockAccounts,
    state: {
      columnFilters: columnFilters
    },
    initialState: {
      showGlobalFilter: true,
      showColumnFilters: true,
      sorting: [
        {
          id: 'status',
          desc: true // Show reconciled first, then unreconciled
        }
      ]
    },
    onColumnFiltersChange: setColumnFilters,
    enableFilters: true,
    enableColumnFilters: true,
    enableGlobalFilter: true,
    enableSorting: true,
    manualFiltering: false,
    enableColumnResizing: false
  };

  return (
    <Box sx={{ pt: 3 }}>
      <MainCard
        title="GIB Capital Reconciliation Report"
        secondary={
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              variant="contained"
              color="secondary"
              startIcon={<Icon icon="solar:export-bold-duotone" width="16" height="16" />}
            >
              Export
            </Button>
            <Button
              variant="outlined"
              color="primary"
              startIcon={<Icon icon="solar:refresh-bold-duotone" width="16" height="16" />}
            >
              Refresh
            </Button>
          </Box>
        }
      >
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
            Portfolio Reconciliation Summary
          </Typography>
          <Grid container spacing={1}>
            {metrics.map((card) => (
              <Grid item xs={12} sm={6} md={3} key={card.id}>
                <MetricCard
                  title={card.title}
                  value={card.value}
                  subtitle={card.subtitle}
                  icon={card.icon}
                  color={card.color}
                  trend={card.trend}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
      </MainCard>

      {/* Help Banner explaining reconciliation and default filter */}
      <Alert
        severity="warning"
        sx={{
          mt: 2,
          mb: 2
        }}
      >
        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
          📊 Reconciliation Guide
        </Typography>
        <Typography variant="body2" sx={{ mb: 1 }}>
          <strong>Showing ALL portfolios</strong> - use filters to focus on specific reconciliation status or value
          ranges.
        </Typography>
        <Typography variant="body2">
          • ✅ <strong>Reconciled:</strong> Total portfolio difference &lt; {RECONCILIATION_CONFIG.TOLERANCE} SAR
          (within tolerance)
        </Typography>
        <Typography variant="body2">
          • ❌ <strong>Unreconciled:</strong> One or more positions have differences ≥ {RECONCILIATION_CONFIG.THRESHOLD}{' '}
          SAR requiring review
        </Typography>
        <Typography variant="body2">
          • 📊 <strong>Difference Columns:</strong> Show equity, cash, and total net differences for each portfolio
        </Typography>
        <Typography variant="body2">
          • 🔍 <strong>Click Portfolio Code</strong> to view detailed position-by-position analysis with{' '}
          {new Intl.NumberFormat().format(
            Math.max(
              ...mockAccounts.map(
                (acc) => mockDataGroup.filter((item) => item.portfolioCode === acc.account_number).length
              )
            )
          )}
          positions max per portfolio
        </Typography>
      </Alert>

      <Card sx={{ mt: 2 }}>
        <ReusableTable tableProps={tableProps} />
      </Card>
    </Box>
  );
}
