import { Box, Typography, useTheme } from '@mui/material';
import { useMemo } from 'react';
import ReusableTable from 'components/Table/ReusableTable';
import mockData from './mockdata.json';

const PortfolioTable = () => {
  const theme = useTheme();

  // Memoize the data
  const data = useMemo(() => {
    return Array.isArray(mockData) ? mockData : [];
  }, []);

  // Format number with comma separators
  const formatNumber = (value) => {
    if (value === null || value === undefined) return 'N/A';
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value);
  };

  // Color code for market value difference using theme colors
  const getDiffColor = (value) => {
    if (value === null || value === undefined) return 'inherit';
    if (value > 0) return theme.palette.success.main;
    if (value < 0) return theme.palette.error.main;
    return 'inherit';
  };

  const columns = useMemo(
    () => [
      {
        accessorKey: 'portfolioCode',
        header: 'Portfolio Code',
        size: 250
      },
      {
        accessorKey: 'assetClass',
        header: 'Asset Class',
        size: 250
      },
      {
        accessorKey: 'apxMarketValue',
        header: 'APX Market Value',
        size: 280,
        Cell: ({ cell }) => formatNumber(cell.getValue())
      },
      {
        accessorKey: 'brokerMarketValue',
        header: 'Broker Market Value',
        size: 280,
        Cell: ({ cell }) => formatNumber(cell.getValue())
      },
      {
        accessorKey: 'marketValueDiff',
        header: 'Market Value Diff',
        size: 260,
        Cell: ({ cell }) => {
          const value = cell.getValue();
          return <span style={{ color: getDiffColor(value), fontWeight: 'bold' }}>{formatNumber(value)}</span>;
        }
      }
    ],
    [theme]
  );

  const tableProps = {
    columns,
    data: data,
    initialState: {
      density: 'compact',
      pagination: { pageSize: 10, pageIndex: 0 },
      showColumnFilters: true,
      showGlobalFilter: true
    },

    enableRowSelection: false,
    manualPagination: true,
    manualFiltering: true,
    manualSorting: true
  };

  return (
    <Box sx={{ m: 2.5 }}>
      <ReusableTable tableProps={tableProps} />
    </Box>
  );
};

export default PortfolioTable;
