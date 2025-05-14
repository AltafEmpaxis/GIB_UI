import { useState, useCallback } from 'react';
import { Box, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';

import ExportData from 'components/Export/ExportData';
import ReusableTable from 'components/Table/ReusableTable';
import axios, { endpoints } from 'utils/axios';
import { FullMatchColumns } from 'components/Table/Columns/Columns';
import useAuth from 'hooks/useAuth';

const FullMatchReport = () => {
  const { user } = useAuth();
  const columns = FullMatchColumns();
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
  const fetchFullMatchData = useCallback(async () => {
    try {
      const response = await axios.get(endpoints.generateReconTable, {
        params: {
          userId: user?.user_id,
          reconciliationType: 'FullMatch',
          pageNumber: pagination.pageIndex + 1,
          pageSize: pagination.pageSize
          // filters: JSON.stringify(columnFilters ?? [])
        }
      });
      return response.data;
    } catch (err) {
      console.error('Error fetching full match report:', err);
      throw err;
    }
  }, [pagination.pageIndex, pagination.pageSize, user?.user_id]);

  // Optimized React Query usage with structured keys
  const { data, isLoading, error, isError, isPending } = useQuery({
    queryKey: [
      'Page',
      'GeneratedReports',
      'Tab',
      'fullMatchReport',
      'apiEnd',
      'generate-recon',
      { page: pagination.pageIndex, size: pagination.pageSize, userId: user?.user_id }
    ],
    queryFn: fetchFullMatchData,
    // These are now set globally in queryClient.jsx but can be overridden if needed
    // staleTime: 7 * 60 * 1000,
    // gcTime: 15 * 60 * 1000,
    keepPreviousData: true,
    onError: (err) => {
      console.error('Query error:', err?.message || 'An error occurred while fetching data');
    }
  });

  // Extract data with fallbacks for better reliability
  const tableData = data?.data ?? [];
  const rowCount = data?.totalRecords ?? 0;
  const pageCount = data?.totalPages ?? 0;

  // Memoized pagination change handler
  const handlePaginationChange = useCallback((newPagination) => {
    setPagination(newPagination);
  }, []);

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
    onPaginationChange: handlePaginationChange,
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
          ExportFileName="FullMatch_Report"
          isLoading={isLoading}
          variant="contained"
          color="primary"
          size="small"
          componentVariant="Menu"
          aria-label="Export Full Match Report"
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

export default FullMatchReport;
