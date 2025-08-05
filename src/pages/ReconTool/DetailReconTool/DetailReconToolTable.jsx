import { Icon } from '@iconify/react';
import { Alert, Box, Button, Card, Chip, Grid, Typography, useTheme } from '@mui/material';
import MainCard from 'components/MainCard';
import ReusableTable from 'components/Table/ReusableTable';
import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router';
import mockData from './PortfolioHoldingsAnalysis/mockdata.json';
import MetricCard from './ReconMetricsCards';

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
    const isReconciled = Math.abs(totalMarketValueDiff) < 0.01; // Tolerance for rounding errors

    // Get cash balance from CASH SAR entries
    const cashEntry = portfolioData.find((item) => item.assetClass === 'CASH SAR');
    const cashBalance = cashEntry ? cashEntry.apxMarketValue : 0;

    // Count positions with differences for analysis
    const positionsWithDiff = portfolioData.filter((item) => Math.abs(item.marketValueDiff || 0) > 0.01).length;

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
console.log(
  '📊 Reconciliation Analysis:',
  mockAccounts.map((account) => ({
    portfolio: account.account_number,
    status: account.status,
    totalDiff: account.total_difference,
    equityDiff: account.equity_difference,
    cashDiff: account.cash_difference,
    positionsWithDiff: account.positions_with_diff,
    details: account.reconciliation_details
  }))
);

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
        header: '📊 Portfolio Code',
        size: 220,
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
        accessorKey: 'account_name',
        header: '📁 Portfolio Name',
        size: 300,
        enableColumnFilter: true,
        filterVariant: 'text',
        Cell: ({ cell }) => (
          <Typography variant="body2" sx={{ fontWeight: 500, color: 'text.primary' }}>
            {cell.getValue()}
          </Typography>
        )
      },
      {
        accessorKey: 'status',
        header: '⚖️ Reconciliation Status',
        size: 380,
        filterVariant: 'select',
        filterSelectOptions: [
          { text: '✅ Reconciled (All Match)', value: 'reconciled' },
          { text: '❌ Unreconciled (Has Differences)', value: 'unreconciled' }
        ],
        Cell: ({ cell, row }) => {
          const isReconciled = cell.getValue() === 'reconciled';
          return (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Chip
                label={isReconciled ? '✅ RECONCILED' : '❌ UNRECONCILED'}
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
        header: '📅 Report Date',
        size: 350,
        filterVariant: 'date',
        Cell: ({ cell }) => (
          <Typography variant="body2" sx={{ fontWeight: 500, fontFamily: 'monospace' }}>
            {new Date(cell.getValue()).toLocaleDateString('en-GB')}
          </Typography>
        )
      },
      {
        accessorKey: 'quantity',
        header: '📈 Total Shares',
        size: 250,
        filterVariant: 'range',
        Cell: ({ cell }) => (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Icon icon="solar:chart-2-bold-duotone" width={14} style={{ color: theme.palette.info.main }} />
            <Typography variant="body2" sx={{ fontWeight: 500, fontFamily: 'monospace' }}>
              {Number(cell.getValue()).toLocaleString()}
            </Typography>
          </Box>
        )
      },
      {
        accessorKey: 'security_symbol',
        header: '🏷️ Primary Symbol',
        size: 350,
        enableColumnFilter: true,
        filterVariant: 'text',
        Cell: ({ cell }) => (
          <Typography variant="body2" sx={{ fontWeight: 600, fontFamily: 'monospace', color: 'primary.main' }}>
            {cell.getValue()}
          </Typography>
        )
      },
      {
        accessorKey: 'security_name',
        header: '🏢 Primary Security',
        size: 350,
        enableColumnFilter: true,
        filterVariant: 'text',
        Cell: ({ cell }) => (
          <Typography variant="body2" sx={{ fontWeight: 500, color: 'text.primary' }}>
            {cell.getValue()}
          </Typography>
        )
      },
      {
        accessorKey: 'amount',
        header: '💰 Total Market Value (SAR)',
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
        header: '💵 Available Cash (SAR)',
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
        accessorKey: 'portfolio',
        header: '📂 Portfolio Group',
        size: 250,
        filterVariant: 'multi-select',
        filterSelectOptions: [...new Set(mockAccounts.map((account) => account.portfolio))],
        Cell: ({ cell }) => (
          <Chip
            label={cell.getValue()}
            size="small"
            variant="outlined"
            sx={{
              borderColor: 'secondary.main',
              color: 'secondary.main',
              fontWeight: 600
            }}
            icon={<Icon icon="solar:folder-bold-duotone" width={14} />}
          />
        )
      },
      {
        accessorKey: 'reconciled_by',
        header: '👤 Reconciled By',
        size: 220,
        Cell: ({ cell, row }) => (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {row.original.status === 'reconciled' ? (
              <>
                <Icon icon="solar:settings-bold-duotone" width={14} style={{ color: theme.palette.success.main }} />
                <Typography variant="body2" sx={{ color: 'success.main', fontWeight: 500 }}>
                  {cell.getValue()}
                </Typography>
              </>
            ) : (
              <Typography variant="body2" sx={{ color: 'text.secondary', fontStyle: 'italic' }}>
                Pending Review
              </Typography>
            )}
          </Box>
        )
      },
      {
        accessorKey: 'reconciliation_details',
        header: '📋 Reconciliation Summary',
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
      },
      {
        id: 'actions',
        header: '🔧 Actions',
        size: 150,
        enableColumnFilter: false,
        Cell: ({ row }) => (
          <Button
            variant="outlined"
            size="small"
            color="secondary"
            startIcon={<Icon icon="solar:eye-bold-duotone" width="16" height="16" />}
            title={`View detailed holdings for ${row.original.account_number}`}
            onClick={() =>
              navigate(
                `/Portfolio-Holdings-Analysis?portfolio=${row.original.account_number}&status=${row.original.status}&date=${row.original.date}`
              )
            }
          >
            View Details
          </Button>
        )
      }
    ],
    [
      navigate,
      theme.palette.secondary.main,
      theme.palette.error.main,
      theme.palette.info.main,
      theme.palette.success.main
    ]
  );

  // Table props configuration with default filter set to unreconciled
  const tableProps = {
    columns: columns,
    data: mockAccounts,
    state: {
      columnFilters: columnFilters.length > 0 ? columnFilters : [{ id: 'status', value: 'unreconciled' }]
    },
    initialState: {
      showGlobalFilter: true,
      showColumnFilters: true,
      columnFilters: [
        {
          id: 'status',
          value: 'unreconciled' // Default filter to show unreconciled accounts
        }
      ],
      sorting: [
        {
          id: 'status',
          desc: false // Show unreconciled first
        }
      ]
    },
    onColumnFiltersChange: setColumnFilters,
    enableFilters: true,
    enableColumnFilters: true,
    enableGlobalFilter: true,
    enableSorting: true,
    manualFiltering: false
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
          <Grid container spacing={2}>
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
        severity="info"
        sx={{
          mt: 3,
          mb: 2,
          '& .MuiAlert-icon': {
            color: theme.palette.secondary.main
          }
        }}
        icon={<Icon icon="solar:info-circle-bold-duotone" width={20} />}
      >
        <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
          📊 Reconciliation Guide
        </Typography>
        <Typography variant="body2" sx={{ mb: 1 }}>
          <strong>By default, showing UNRECONCILED portfolios</strong> - accounts that have differences between APX and
          Broker systems requiring your attention.
        </Typography>
        <Typography variant="body2">
          • ✅ <strong>Reconciled:</strong> All security positions match exactly between APX and Broker • ❌{' '}
          <strong>Unreconciled:</strong> One or more securities have quantity/value differences • 🔍{' '}
          <strong>Click Portfolio Code</strong> to view detailed position-by-position analysis
        </Typography>
      </Alert>

      <Card sx={{ mt: 2 }}>
        <ReusableTable tableProps={tableProps} />
      </Card>
    </Box>
  );
}
