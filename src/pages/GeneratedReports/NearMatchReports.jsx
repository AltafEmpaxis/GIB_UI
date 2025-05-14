import { useState, useCallback } from 'react';
import { Box, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';

import ExportData from 'components/Export/ExportData';
import ReusableTable from 'components/Table/ReusableTable';
import axios, { endpoints } from 'utils/axios';
import { NearMatchColumns } from 'components/Table/Columns/Columns';
import useAuth from 'hooks/useAuth';

const NearMatchReports = () => {
  const { user } = useAuth();
  const columns = NearMatchColumns();
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
    pageCount: 0,
    totalRecords: 0
  });
  // const [columnFilters, setColumnFilters] = useState([]);
  // const [globalFilter, setGlobalFilter] = useState('');
  // const [sorting, setSorting] = useState([]);

  // Memoized query function to prevent unnecessary recreations
  const fetchNearMatchData = useCallback(async () => {
    try {
      const response = await axios.get(endpoints.generateReconTable, {
        params: {
          userId: user?.user_id,
          reconciliationType: 'NearMatch',
          pageNumber: pagination.pageIndex + 1,
          pageSize: pagination.pageSize
          // filters: JSON.stringify(columnFilters ?? [])
        }
      });
      return response.data;
    } catch (err) {
      console.error('Error fetching near match report:', err);
      throw err;
    }
  }, [pagination.pageIndex, pagination.pageSize, user?.user_id]);

  const { data, isLoading, error, isError, isPending } = useQuery({
    queryKey: [
      'Page',
      'GeneratedReports',
      'Tab',
      'NearMatchReport',
      'apiEnd',
      'generate-recon',
      { page: pagination.pageIndex, size: pagination.pageSize, userId: user?.user_id }
    ],
    queryFn: fetchNearMatchData,
    keepPreviousData: true,
    onError: (err) => {
      console.error('Query error:', err?.message || 'An error occurred while fetching data');
    }
  });

  // Derived state
  const tableData = data?.data ?? [];
  const rowCount = data?.totalRecords ?? 0;
  const pageCount = data?.totalPages ?? 0;

  const tableProps = {
    columns,
    data: tableData,
    initialState: {
      density: 'compact',
      pagination: { pageSize: 10, pageIndex: 0 },
      showColumnFilters: true,
      showGlobalFilter: true
    },

    // enableRowSelection: false,
    manualPagination: true,
    // manualFiltering: true,
    // manualSorting: true,
    rowCount,
    pageCount,
    state: {
      isLoading: isPending,
      showAlertBanner: isError,
      showProgressBars: isLoading,
      pagination
      // columnFilters,
      // globalFilter,
      // sorting
    },
    // onColumnFiltersChange: setColumnFilters,
    // onGlobalFilterChange: setGlobalFilter,
    // onSortingChange: setSorting,
    onPaginationChange: setPagination,
    muiToolbarAlertBannerProps: error
      ? {
          color: 'error',
          children: error?.response?.data?.message || error?.message || 'Failed to fetch data'
        }
      : undefined,
    renderTopToolbarCustomActions: () => (
      <Box sx={{ display: 'flex', gap: 2, p: 1 }}>
        <ExportData
          data={tableData}
          columns={columns.filter((col) => !['actions', 'mrt-row-actions'].includes(col.id))}
          exportTypes={['csv', 'excel', 'pdf', 'txt', 'xml', 'json']}
          ExportFileName="Near_Match_Report"
          isLoading={isLoading}
          variant="contained"
          color="primary"
          size="small"
          componentVariant="Menu"
          aria-label="Export Near Match Report"
        />
      </Box>
    ),
    renderBottomToolbarCustomActions: () => {
      if (!rowCount) return null;

      const start = pagination.pageSize * pagination.pageIndex + 1;
      const end = Math.min(pagination.pageSize * (pagination.pageIndex + 1), rowCount);

      return (
        <Box px={2}>
          <Typography variant="body2" color="text.secondary">
            {start}-{end} of {rowCount}
          </Typography>
        </Box>
      );
    }
  };

  return <ReusableTable tableProps={tableProps} />;
};

export default NearMatchReports;
