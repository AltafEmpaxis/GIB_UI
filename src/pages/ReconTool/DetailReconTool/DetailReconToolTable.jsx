import { Icon } from '@iconify/react';
import { Box, Button, Card, Chip, Grid, Typography, useTheme } from '@mui/material';
import MainCard from 'components/MainCard';
import ReusableTable from 'components/Table/ReusableTable';
import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router';
import MetricCard from './ReconMetricsCards';

// Mock data for reconciliation details - updated with real Saudi companies and GIB funds
// Account numbers now correspond to actual portfolio codes for easy mapping
const mockAccounts = [
  {
    id: 1,
    account_number: 'DPM01',
    account_name: 'GIB MENA ESG Equity Fund',
    status: 'reconciled',
    date: '2024-06-10',
    amount: 14621719.88,
    currency: 'SAR',
    reconciled_by: 'Ahmad Al-Saud',
    portfolio: 'ESG Investments',
    location: 'Riyadh',
    quantity: 12500,
    security_symbol: 'GIBMESG',
    security_name: 'GIB MENA ESG Equity Fund',
    cash_balance: 178730.99
  },
  {
    id: 2,
    account_number: 'DPM07',
    account_name: 'GIB Opportunistic MENA Equity Fund',
    status: 'reconciled',
    date: '2024-06-10',
    amount: 62304291.5,
    currency: 'SAR',
    reconciled_by: 'Mohammed Al-Qahtani',
    portfolio: 'Opportunistic Investments',
    location: 'Riyadh',
    quantity: 18500,
    security_symbol: 'GIBOMEF',
    security_name: 'GIB Opportunistic MENA Equity Fund',
    cash_balance: 1249860.08
  },
  {
    id: 3,
    account_number: 'DPM16',
    account_name: 'Saudi Aramco Portfolio',
    status: 'unreconciled',
    date: '2024-06-09',
    amount: 20211097.81,
    currency: 'SAR',
    reconciled_by: '-',
    portfolio: 'Saudi Equities',
    location: 'Riyadh',
    quantity: 25000,
    security_symbol: '2222.SR',
    security_name: 'Saudi Arabian Oil Co',
    cash_balance: 53387.77
  },
  {
    id: 4,
    account_number: 'DPM34',
    account_name: 'SABIC Portfolio',
    status: 'reconciled',
    date: '2024-06-10',
    amount: 128452610.19,
    currency: 'SAR',
    reconciled_by: 'Fatima Al-Otaibi',
    portfolio: 'Saudi Equities',
    location: 'Riyadh',
    quantity: 12500,
    security_symbol: '2010.SR',
    security_name: 'Saudi Basic Industries Corp',
    cash_balance: 512818.39
  },
  {
    id: 5,
    account_number: 'DPM40',
    account_name: 'Al Rajhi Bank Portfolio',
    status: 'reconciled',
    date: '2024-06-10',
    amount: 43932954.81,
    currency: 'SAR',
    reconciled_by: 'Ali Al-Ghamdi',
    portfolio: 'Saudi Banking',
    location: 'Riyadh',
    quantity: 17500,
    security_symbol: '1120.SR',
    security_name: 'Al Rajhi Banking & Investment Corp',
    cash_balance: 460697.86
  },
  {
    id: 6,
    account_number: 'DPM41',
    account_name: 'Saudi Telecom Portfolio',
    status: 'unreconciled',
    date: '2024-06-09',
    amount: 25568380.49,
    currency: 'SAR',
    reconciled_by: '-',
    portfolio: 'Saudi Telecom',
    location: 'Riyadh',
    quantity: 14500,
    security_symbol: '7010.SR',
    security_name: 'Saudi Telecom Company',
    cash_balance: 144909.32
  },
  {
    id: 7,
    account_number: 'DPM42',
    account_name: 'GIB Sukuk Fund',
    status: 'reconciled',
    date: '2024-06-10',
    amount: 24112951.48,
    currency: 'SAR',
    reconciled_by: 'Khalid Al-Sharif',
    portfolio: 'Fixed Income',
    location: 'Riyadh',
    quantity: 22500,
    security_symbol: 'GIBSUK',
    security_name: 'GIB Sukuk Fund',
    cash_balance: 150146.54
  },
  {
    id: 8,
    account_number: 'DPM45',
    account_name: 'Saudi National Bank Portfolio',
    status: 'unreconciled',
    date: '2024-06-09',
    amount: 124193348.09,
    currency: 'SAR',
    reconciled_by: '-',
    portfolio: 'Saudi Banking',
    location: 'Riyadh',
    quantity: 12800,
    security_symbol: '1180.SR',
    security_name: 'Saudi National Bank',
    cash_balance: 8341503.49
  },
  {
    id: 9,
    account_number: 'DPM53',
    account_name: 'ACWA Power Portfolio',
    status: 'reconciled',
    date: '2024-06-10',
    amount: 8083789.33,
    currency: 'SAR',
    reconciled_by: 'Noura Al-Zahrani',
    portfolio: 'Saudi Utilities',
    location: 'Riyadh',
    quantity: 9800,
    security_symbol: '2082.SR',
    security_name: 'ACWA Power Company',
    cash_balance: 56591.84
  }
];

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
              onClick={() => navigate(`/Portfolio-Holdings-Analysis?portfolio=${portfolioCode}`)}
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
    state: { columnFilters },
    onColumnFiltersChange: setColumnFilters,
    enableFilters: true,
    enableColumnFilters: true,
    enableGlobalFilter: true,
    enableSorting: true,
    initialState: {},
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
        <ReusableTable
          columns={columns}
          data={mockAccounts}
          initialState={{ showGlobalFilter: true }}
          tableProps={tableProps}
        />
      </Card>
    </Box>
  );
}
