import { Box, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useCallback, useState } from 'react';

import ExportData from 'components/Export/ExportData';
import { NormalizedGenevaDataColumns } from 'components/Table/Columns/Columns';
import ReusableTable from 'components/Table/ReusableTable';
import useAuth from 'hooks/useAuth';
import axios from 'utils/axios';

const NormalizedGenevaData = () => {
  const { user } = useAuth();
  const columns = NormalizedGenevaDataColumns();
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
  const fetchNormalizedGenevaData = useCallback(async () => {
    try {
      const response = await axios.get('/api/NormaliseFile/GetNormalizedGenevaData/normalized-geneva-data', {
        params: {
          userId: user?.user_id,
          pageNumber: pagination.pageIndex + 1,
          pageSize: pagination.pageSize
          // filters: columnFilters.length ? JSON.stringify(columnFilters) : undefined,
          // globalFilter: globalFilter || undefined,
          // sorting: sorting.length ? JSON.stringify(sorting) : undefined
        }
      });
      return response.data;
    } catch (err) {
      console.error('Error fetching normalized APX data:', err);
      throw err;
    }
  }, [pagination.pageIndex, pagination.pageSize, user?.user_id]);

  // Data fetching with React Query
  const { data, isLoading, error, isError, isPending } = useQuery({
    queryKey: [
      'Page',
      'ViewData',
      'Tab',
      'NormalizedData',
      'SubTab',
      'NormalizedGenevaData',
      'apiEnd',
      'normalized-geneva-data',
      { page: pagination.pageIndex, size: pagination.pageSize, userId: user?.user_id }
    ],
    queryFn: fetchNormalizedGenevaData,
    keepPreviousData: true,
    onError: (err) => {
      console.error('Query error:', err?.message || 'An error occurred while fetching data');
    }
  });

  // Derived state
  const tableData = data?.data?.data ?? [];
  const rowCount = data?.data?.totalRecords ?? 0;
  const pageCount = data?.data?.totalPages ?? 0;

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

    enableRowSelection: false,
    manualPagination: true,
    manualFiltering: true,
    manualSorting: true,
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
          ExportFileName="NormalizedGenevaData"
          isLoading={isLoading}
          variant="contained"
          color="primary"
          size="small"
          componentVariant="Menu"
        />
      </Box>
    ),
    renderBottomToolbarCustomActions: () => (
      <Box px={2}>
        <Typography variant="subtitle2" color="text.secondary" sx={{ fontWeight: 500 }}>
          Total Records: {rowCount}
        </Typography>
      </Box>
    )
  };

  return (
    <>
      <title>APX Normalized Data</title>
      <meta name="description" content="View and analyze normalized tax lots data from APX system" />
      <meta property="og:title" content="APX Normalized Data" />
      <meta property="og:description" content="View and analyze normalized tax lots data from APX system" />

      <ReusableTable tableProps={tableProps} />
    </>
  );
};

export default NormalizedGenevaData;
