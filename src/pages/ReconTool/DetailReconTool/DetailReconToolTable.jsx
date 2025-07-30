import { Icon } from '@iconify/react';
import { Box, Button, Card, Chip, Grid, Typography, useTheme } from '@mui/material';
import MainCard from 'components/MainCard';
import ReusableTable from 'components/Table/ReusableTable';
import { useMemo, useState } from 'react';
import MetricCard from './ReconMetricsCards';

// Mock data for reconciliation details - updated with real Saudi companies and GIB funds
const mockAccounts = [
  {
    id: 1,
    account_number: 'GIB-1001',
    account_name: 'GIB MENA ESG Equity Fund',
    status: 'reconciled',
    date: '2024-06-10',
    amount: 3250000.75,
    currency: 'SAR',
    reconciled_by: 'Ahmad Al-Saud',
    portfolio: 'ESG Investments',
    location: 'Riyadh',
    quantity: 12500,
    security_symbol: 'GIBMESG',
    security_name: 'GIB MENA ESG Equity Fund',
    cash_balance: 812500.19
  },
  {
    id: 2,
    account_number: 'GIB-1002',
    account_name: 'GIB Opportunistic MENA Equity Fund',
    status: 'reconciled',
    date: '2024-06-10',
    amount: 4750000.25,
    currency: 'SAR',
    reconciled_by: 'Mohammed Al-Qahtani',
    portfolio: 'Opportunistic Investments',
    location: 'Riyadh',
    quantity: 18500,
    security_symbol: 'GIBOMEF',
    security_name: 'GIB Opportunistic MENA Equity Fund',
    cash_balance: 1187500.06
  },
  {
    id: 3,
    account_number: 'GIB-1003',
    account_name: 'Saudi Aramco',
    status: 'unreconciled',
    date: '2024-06-09',
    amount: 8520000.0,
    currency: 'SAR',
    reconciled_by: '-',
    portfolio: 'Saudi Equities',
    location: 'Riyadh',
    quantity: 25000,
    security_symbol: '2222.SR',
    security_name: 'Saudi Arabian Oil Co',
    cash_balance: 2130000.0
  },
  {
    id: 4,
    account_number: 'GIB-1004',
    account_name: 'SABIC',
    status: 'reconciled',
    date: '2024-06-10',
    amount: 3720500.5,
    currency: 'SAR',
    reconciled_by: 'Fatima Al-Otaibi',
    portfolio: 'Saudi Equities',
    location: 'Riyadh',
    quantity: 12500,
    security_symbol: '2010.SR',
    security_name: 'Saudi Basic Industries Corp',
    cash_balance: 930125.13
  },
  {
    id: 5,
    account_number: 'GIB-1005',
    account_name: 'Al Rajhi Bank',
    status: 'reconciled',
    date: '2024-06-10',
    amount: 5250000.0,
    currency: 'SAR',
    reconciled_by: 'Ali Al-Ghamdi',
    portfolio: 'Saudi Banking',
    location: 'Riyadh',
    quantity: 17500,
    security_symbol: '1120.SR',
    security_name: 'Al Rajhi Banking & Investment Corp',
    cash_balance: 1312500.0
  },
  {
    id: 6,
    account_number: 'GIB-1006',
    account_name: 'Saudi Telecom Company',
    status: 'unreconciled',
    date: '2024-06-09',
    amount: 4350000.0,
    currency: 'SAR',
    reconciled_by: '-',
    portfolio: 'Saudi Telecom',
    location: 'Riyadh',
    quantity: 14500,
    security_symbol: '7010.SR',
    security_name: 'Saudi Telecom Company',
    cash_balance: 1087500.0
  },
  {
    id: 7,
    account_number: 'GIB-1007',
    account_name: 'GIB Sukuk Fund',
    status: 'reconciled',
    date: '2024-06-10',
    amount: 6750000.5,
    currency: 'SAR',
    reconciled_by: 'Khalid Al-Sharif',
    portfolio: 'Fixed Income',
    location: 'Riyadh',
    quantity: 22500,
    security_symbol: 'GIBSUK',
    security_name: 'GIB Sukuk Fund',
    cash_balance: 1687500.13
  },
  {
    id: 8,
    account_number: 'GIB-1008',
    account_name: 'Saudi National Bank',
    status: 'unreconciled',
    date: '2024-06-09',
    amount: 3850000.25,
    currency: 'SAR',
    reconciled_by: '-',
    portfolio: 'Saudi Banking',
    location: 'Riyadh',
    quantity: 12800,
    security_symbol: '1180.SR',
    security_name: 'Saudi National Bank',
    cash_balance: 962500.06
  },
  {
    id: 9,
    account_number: 'GIB-1009',
    account_name: 'ACWA Power',
    status: 'reconciled',
    date: '2024-06-10',
    amount: 2950000.75,
    currency: 'SAR',
    reconciled_by: 'Noura Al-Zahrani',
    portfolio: 'Saudi Utilities',
    location: 'Riyadh',
    quantity: 9800,
    security_symbol: '2082.SR',
    security_name: 'ACWA Power Company',
    cash_balance: 737500.19
  }
];

export default function DetailReconToolTable() {
  const theme = useTheme();
  const [columnFilters, setColumnFilters] = useState([]);

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
        size: 220
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
    []
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
