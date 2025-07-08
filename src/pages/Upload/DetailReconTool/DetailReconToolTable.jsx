import { Icon } from '@iconify/react';
import {
  Box,
  Button,
  Card,
  Chip,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  useTheme
} from '@mui/material';
import MainCard from 'components/MainCard';
import ReusableTable from 'components/Table/ReusableTable';
import { useEffect, useMemo, useState } from 'react';
import ReconMetricsCards from './ReconMetricsCards';

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
  const [filterStatus, setFilterStatus] = useState('all');
  const [filteredData, setFilteredData] = useState(mockAccounts);

  // Filter data based on status
  useEffect(() => {
    let result = mockAccounts;

    // Filter by status
    if (filterStatus !== 'all') {
      result = result.filter((account) => account.status === filterStatus);
    }

    setFilteredData(result);
  }, [filterStatus]);

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
        size: 180,
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
        size: 180
      },
      {
        accessorKey: 'amount',
        header: 'Amount',
        size: 150,
        Cell: ({ cell }) => (
          <Typography variant="body2">
            {new Intl.NumberFormat('en-SA', { style: 'currency', currency: 'SAR' }).format(cell.getValue())}
          </Typography>
        )
      },
      {
        accessorKey: 'portfolio',
        header: 'Portfolio',
        size: 260
      },
      {
        accessorKey: 'reconciled_by',
        header: 'Reconciled By',
        size: 250
      },
      {
        accessorKey: 'location',
        header: 'Location',
        size: 180
      },
      {
        id: 'actions',
        header: 'Actions',
        size: 180,
        Cell: ({ row }) => (
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

  // Table initial state with integrated search/filter
  const initialState = {
    showGlobalFilter: true
  };

  // Extra props for ReusableTable
  const tableProps = {
    enableGlobalFilter: true,
    renderTopToolbarCustomActions: () => (
      <Box sx={{ display: 'flex', gap: 1, p: 1 }}>
        <FormControl sx={{ minWidth: 200 }} size="small">
          <InputLabel id="status-filter-label">Filter by Status</InputLabel>
          <Select
            labelId="status-filter-label"
            id="status-filter"
            value={filterStatus}
            label="Filter by Status"
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <MenuItem value="all">All Accounts</MenuItem>
            <MenuItem value="reconciled">Reconciled</MenuItem>
            <MenuItem value="unreconciled">Unreconciled</MenuItem>
          </Select>
        </FormControl>
      </Box>
    )
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
          <ReconMetricsCards data={mockAccounts} />
        </Box>
      </MainCard>
      <Card sx={{ mt: 3 }}>
        <ReusableTable columns={columns} data={filteredData} initialState={initialState} tableProps={tableProps} />
      </Card>
    </Box>
  );
}
