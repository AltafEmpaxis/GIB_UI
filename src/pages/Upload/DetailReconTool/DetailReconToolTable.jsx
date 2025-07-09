import { Icon } from '@iconify/react';
import { Box, Button, Card, Chip, Grid, Typography, useTheme } from '@mui/material';
import MainCard from 'components/MainCard';
import ReusableTable from 'components/Table/ReusableTable';
import { useMemo, useState } from 'react';
import MetricCard from './ReconMetricsCards';

// Mock data for reconciliation details
const mockAccounts = [
  {
    id: 1,
    account_number: 'GIB-1001',
    account_name: 'Savings Corporate',
    status: 'reconciled',
    date: '2023-08-15',
    amount: 15000.5,
    currency: 'SAR',
    reconciled_by: 'Ahmad Al-Saud',
    portfolio: 'Corporate Investments',
    location: 'Riyadh'
  },
  {
    id: 2,
    account_number: 'GIB-1002',
    account_name: 'Trading Account',
    status: 'unreconciled',
    date: '2023-08-16',
    amount: 27350.75,
    currency: 'SAR',
    reconciled_by: '-',
    portfolio: 'Equity Trading',
    location: 'Riyadh'
  },
  {
    id: 3,
    account_number: 'GIB-1003',
    account_name: 'Fixed Income Account',
    status: 'reconciled',
    date: '2023-08-15',
    amount: 52000.0,
    currency: 'SAR',
    reconciled_by: 'Mohammed Al-Qahtani',
    portfolio: 'Bond Portfolio',
    location: 'Riyadh'
  },
  {
    id: 4,
    account_number: 'GIB-1004',
    account_name: 'ETF Portfolio',
    status: 'unreconciled',
    date: '2023-08-16',
    amount: 18720.25,
    currency: 'SAR',
    reconciled_by: '-',
    portfolio: 'ETF Collection',
    location: 'Riyadh'
  },
  {
    id: 5,
    account_number: 'GIB-1005',
    account_name: 'Real Estate Fund',
    status: 'reconciled',
    date: '2023-08-15',
    amount: 1250000.0,
    currency: 'SAR',
    reconciled_by: 'Fatima Al-Otaibi',
    portfolio: 'Real Estate',
    location: 'Riyadh'
  },
  {
    id: 6,
    account_number: 'GIB-1006',
    account_name: 'Foreign Exchange',
    status: 'reconciled',
    date: '2023-08-14',
    amount: 435000.0,
    currency: 'SAR',
    reconciled_by: 'Ali Al-Ghamdi',
    portfolio: 'FX Portfolio',
    location: 'Riyadh'
  },
  {
    id: 7,
    account_number: 'GIB-1007',
    account_name: 'Balanced Fund',
    status: 'unreconciled',
    date: '2023-08-16',
    amount: 67500.5,
    currency: 'SAR',
    reconciled_by: '-',
    portfolio: 'Mixed Assets',
    location: 'Riyadh'
  }
];

export default function DetailReconToolTable() {
  const theme = useTheme();
  const [activeFilter, setActiveFilter] = useState('all');
  const [columnFilters, setColumnFilters] = useState([]);

  // Simple metrics calculation
  const metrics = useMemo(() => {
    // Basic counts
    const totalAccounts = mockAccounts.length;
    const reconciled = mockAccounts.filter((account) => account.status === 'reconciled').length;
    const unreconciled = totalAccounts - reconciled;

    // Total amount calculation
    const formatter = new Intl.NumberFormat('en-SA', { style: 'currency', currency: 'SAR' });
    const totalAmount = mockAccounts.reduce((sum, account) => sum + account.amount, 0);

    return [
      {
        id: 'all',
        title: 'Total Accounts',
        value: totalAccounts,
        subtitle: 'All accounts in system',
        icon: 'solar:files-bold-duotone',
        color: theme.palette?.primary?.main || '#53565A',
        trend: '+2.5%'
      },
      {
        id: 'reconciled',
        title: 'Reconciled',
        value: reconciled,
        subtitle: 'Matched accounts',
        icon: 'solar:check-circle-bold-duotone',
        color: theme.palette?.success?.main || '#4caf50',
        trend: '+8%'
      },
      {
        id: 'unreconciled',
        title: 'Unreconciled',
        value: unreconciled,
        subtitle: 'Unmatched accounts',
        icon: 'solar:close-circle-bold-duotone',
        color: theme.palette?.error?.main || '#f44336',
        trend: '-3.2%'
      },
      {
        id: 'amount',
        title: 'Total Amount',
        value: formatter.format(totalAmount),
        subtitle: 'Total reconciliation value',
        icon: 'solar:dollar-minimalistic-bold-duotone',
        color: theme.palette?.secondary?.main || '#FFC72C',
        trend: '+5.1%'
      }
    ];
  }, [theme.palette]);

  // Define columns for the table
  const columns = useMemo(
    () => [
      {
        accessorKey: 'account_number',
        header: 'Account Number',
        size: 250
      },
      {
        accessorKey: 'account_name',
        header: 'Account Name',
        size: 280
      },
      {
        accessorKey: 'status',
        header: 'Status',
        size: 200,
        filterVariant: 'select',
        filterSelectOptions: ['reconciled', 'unreconciled'],
        Cell: ({ cell }) => (
          <Chip
            label={cell.getValue() === 'reconciled' ? 'Reconciled' : 'Unreconciled'}
            color={cell.getValue() === 'reconciled' ? 'success' : 'error'}
            size="small"
            variant="outlined"
          />
        )
      },
      {
        accessorKey: 'date',
        header: 'Date',
        size: 200,
        filterVariant: 'date'
      },
      {
        accessorKey: 'amount',
        header: 'Amount',
        size: 200,
        filterVariant: 'range',
        Cell: ({ cell }) => (
          <Typography variant="body2">
            {new Intl.NumberFormat('en-SA', { style: 'currency', currency: 'SAR' }).format(cell.getValue())}
          </Typography>
        )
      },
      {
        accessorKey: 'portfolio',
        header: 'Portfolio',
        size: 260,
        filterVariant: 'multi-select',
        filterSelectOptions: [...new Set(mockAccounts.map((account) => account.portfolio))]
      },
      {
        accessorKey: 'reconciled_by',
        header: 'Reconciled By',
        size: 250
      },
      {
        accessorKey: 'location',
        header: 'Location',
        size: 200
      },
      {
        id: 'actions',
        header: 'Actions',
        size: 200,
        enableColumnFilter: false,
        Cell: () => (
          <Button
            variant="outlined"
            size="small"
            color="primary"
            startIcon={<Icon icon="solar:eye-bold-duotone" width="16" height="16" />}
          >
            Detail
          </Button>
        )
      }
    ],
    []
  );

  // Handle filter change from metric cards
  const handleMetricCardFilter = (filter) => {
    // Toggle filter if clicking the same one
    const newFilter = activeFilter === filter ? 'all' : filter;
    setActiveFilter(newFilter);

    // Apply filter to table
    if (newFilter === 'all') {
      setColumnFilters([]);
    } else if (newFilter !== 'amount') {
      setColumnFilters([{ id: 'status', value: newFilter }]);
    }
  };

  // Table props configuration
  const tableProps = {
    state: { columnFilters },
    onColumnFiltersChange: setColumnFilters,
    enableFilters: true,
    enableColumnFilters: true,
    enableGlobalFilter: true,
    manualFiltering: false
  };

  return (
    <Box sx={{ pt: 3 }}>
      <MainCard
        title="Reconciliation Detail Report"
        secondary={
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              variant="contained"
              color="primary"
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
            Reconciliation Summary
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
                  onClick={() => handleMetricCardFilter(card.id)}
                  isActive={activeFilter === card.id}
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
