import { Icon } from '@iconify/react';
import { Box, Button, Card, Chip, Grid, Typography, useTheme } from '@mui/material';
import MainCard from 'components/MainCard';
import ReusableTable from 'components/Table/ReusableTable';
import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router';
import mockData from './PortfolioHoldingsAnalysis/mockdata.json';
import MetricCard from './ReconMetricsCards';

// Generate account data from portfolio summary data
const generateAccountData = () => {
  const portfolioCodes = [...new Set(mockData.map((item) => item.portfolioCode))];
  return portfolioCodes.map((portfolioCode, index) => {
    const portfolioData = mockData.filter((item) => item.portfolioCode === portfolioCode);
    const totalAmount = portfolioData.reduce((sum, item) => sum + (item.apxMarketValue || 0), 0);
    const totalDiff = portfolioData.reduce((sum, item) => sum + Math.abs(item.marketValueDiff || 0), 0);
    const isReconciled = totalDiff < 1000; // Threshold for reconciliation

    // Get cash balance from CASH SAR entries
    const cashEntry = portfolioData.find((item) => item.assetClass === 'CASH SAR');
    const cashBalance = cashEntry ? cashEntry.apxMarketValue : 0;

    return {
      id: index + 1,
      account_number: portfolioCode,
      account_name: `Portfolio ${portfolioCode}`,
      status: isReconciled ? 'reconciled' : 'unreconciled',
      date: new Date().toISOString().split('T')[0],
      amount: totalAmount,
      currency: 'SAR',
      reconciled_by: isReconciled ? 'System Auto-reconciled' : '-',
      portfolio: `Portfolio ${portfolioCode}`,
      location: 'Riyadh',
      quantity: Math.floor(totalAmount / 100), // Estimated quantity
      security_symbol: portfolioCode,
      security_name: `Portfolio ${portfolioCode}`,
      cash_balance: cashBalance
    };
  });
};

const mockAccounts = generateAccountData();

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
        header: 'Account Number',
        size: 220,
        Cell: ({ cell }) => {
          // Account number IS the portfolio code - simple direct mapping
          const portfolioCode = cell.getValue();

          return (
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
                minWidth: 0
              }}
            >
              {cell.getValue()}
            </Button>
          );
        }
      },
      {
        accessorKey: 'account_name',
        header: 'Account Name',
        size: 300
      },
      {
        accessorKey: 'status',
        header: 'Status',
        size: 380,
        filterVariant: 'select',
        filterSelectOptions: ['reconciled', 'unreconciled'],
        Cell: ({ cell }) => (
          <Chip
            label={cell.getValue() === 'reconciled' ? 'Reconciled' : 'Unreconciled'}
            color={cell.getValue() === 'reconciled' ? 'success' : 'error'}
            size="small"
            variant="outlined"
            icon={
              <Icon
                icon={cell.getValue() === 'reconciled' ? 'solar:check-circle-bold' : 'solar:close-circle-bold'}
                width={14}
                height={14}
                style={{ marginRight: -4 }}
              />
            }
          />
        )
      },
      {
        accessorKey: 'date',
        header: 'Date',
        size: 350,
        filterVariant: 'date'
      },
      {
        accessorKey: 'quantity',
        header: 'Quantity',
        size: 250,
        filterVariant: 'range',
        Cell: ({ cell }) => (
          <Typography variant="body2" sx={{ fontWeight: 500 }}>
            {Number(cell.getValue()).toLocaleString()}
          </Typography>
        )
      },
      {
        accessorKey: 'security_symbol',
        header: 'Security Symbol',
        size: 350
      },
      {
        accessorKey: 'security_name',
        header: 'Security Name',
        size: 350
      },
      {
        accessorKey: 'amount',
        header: 'Market Value',
        size: 350,
        filterVariant: 'range',
        Cell: ({ cell }) => (
          <Typography variant="body2" sx={{ fontWeight: 500 }}>
            {new Intl.NumberFormat('en-SA', { style: 'currency', currency: 'SAR' }).format(cell.getValue())}
          </Typography>
        )
      },
      {
        accessorKey: 'cash_balance',
        header: 'Cash Balance',
        size: 350,
        filterVariant: 'range',
        Cell: ({ cell }) => (
          <Typography variant="body2" sx={{ fontWeight: 500 }}>
            {new Intl.NumberFormat('en-SA', { style: 'currency', currency: 'SAR' }).format(cell.getValue())}
          </Typography>
        )
      },
      {
        accessorKey: 'portfolio',
        header: 'Portfolio',
        size: 250,
        filterVariant: 'multi-select',
        filterSelectOptions: [...new Set(mockAccounts.map((account) => account.portfolio))]
      },
      {
        accessorKey: 'reconciled_by',
        header: 'Reconciled By',
        size: 220
      },
      {
        id: 'actions',
        header: 'Actions',
        size: 150,
        enableColumnFilter: false,
        Cell: () => (
          <Button
            variant="outlined"
            size="small"
            color="secondary"
            startIcon={<Icon icon="solar:eye-bold-duotone" width="16" height="16" />}
          >
            Detail
          </Button>
        )
      }
    ],
    [navigate, theme.palette.secondary.main]
  );

  // Table props configuration
  const tableProps = {
    columns: columns,
    data: mockAccounts,
    state: { columnFilters },
    initialState: { showGlobalFilter: true },
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

      <Card sx={{ mt: 3 }}>
        <ReusableTable tableProps={tableProps} />
      </Card>
    </Box>
  );
}
