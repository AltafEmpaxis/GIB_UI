import { useEffect, useMemo, useState } from 'react';
import mockData from './mockdataGroup.json';
import ReusableTable from 'components/Table/ReusableTable';

const PortfolioTableGroup = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(mockData);
    console.log('Mock Data:', mockData);
    console.log('Mock Data length:', mockData?.length);
  }, []);

  const formatNumber = (value, assetClass) => {
    if (value === null || value === undefined) return assetClass === 'Cash' ? '' : 'N/A';
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value);
  };

  const formatInteger = (value, assetClass) => {
    if (value === null || value === undefined) return assetClass === 'Cash' ? '' : 'N/A';
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  const getDiffColor = (value) => {
    if (value === null || value === undefined) return 'inherit';
    if (value > 0) return '#4caf50'; // Green
    if (value < 0) return '#f44336'; // Red
    return 'inherit'; // zero or null
  };

  // Helper to format difference with plus/minus sign
  const formatDiff = (value, isInteger = false) => {
    if (value === null || value === undefined) return '';
    const sign = value > 0 ? '+' : value < 0 ? '−' : ''; // Use unicode minus sign for negative
    const formattedValue = isInteger
      ? new Intl.NumberFormat('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(Math.abs(value))
      : new Intl.NumberFormat('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(Math.abs(value));
    return sign + formattedValue;
  };

  const columns = useMemo(
    () => [
      {
        accessorKey: 'portfolioCode',
        header: 'Portfolio Code',
        size: 250,
        enableGrouping: true,
        enableSorting: true
      },
      {
        accessorKey: 'assetClass',
        header: 'Asset Class',
        size: 250,
        enableGrouping: true,
        enableSorting: true
      },
      {
        accessorKey: 'symbol',
        header: 'Symbol',
        size: 250,
        enableSorting: true
      },
      {
        accessorKey: 'secType',
        header: 'Sec Type',
        size: 200,
        enableSorting: true
      },
      {
        accessorKey: 'securityName',
        header: 'Security Name',
        size: 250,
        enableSorting: true
      },
      {
        accessorKey: 'apxQuantity',
        header: 'APX Quantity',
        size: 300,
        enableSorting: true,
        Cell: ({ cell, row }) => formatInteger(cell.getValue(), row.original.assetClass)
      },
      {
        accessorKey: 'brokerQuantity',
        header: 'Broker Quantity',
        size: 200,
        enableSorting: true,
        Cell: ({ cell, row }) => formatInteger(cell.getValue(), row.original.assetClass)
      },
      {
        accessorKey: 'qtyDiff',
        header: 'Qty Diff',
        size: 150,
        enableSorting: true,
        Cell: ({ cell, row }) => {
          const value = cell.getValue();
          const color = getDiffColor(value);
          return (
            <span style={{ color, fontWeight: 'bold' }}>
              {value === null || value === undefined ? '' : formatDiff(value, true)}
            </span>
          );
        }
      },
      {
        accessorKey: 'apxMarketValue',
        header: 'APX Market Value',
        size: 180,
        enableSorting: true,
        Cell: ({ cell, row }) => formatNumber(cell.getValue(), row.original.assetClass)
      },
      {
        accessorKey: 'brokerMarketValue',
        header: 'Broker Market Value',
        size: 180,
        enableSorting: true,
        Cell: ({ cell, row }) => formatNumber(cell.getValue(), row.original.assetClass)
      },
      {
        accessorKey: 'marketValueDiff',
        header: 'Market Value Diff',
        size: 160,
        enableSorting: true,
        Cell: ({ cell, row }) => {
          const value = cell.getValue();
          const color = getDiffColor(value);
          return (
            <span style={{ color, fontWeight: 'bold' }}>
              {value === null || value === undefined ? '' : formatDiff(value, false)}
            </span>
          );
        }
      },
      {
        accessorKey: 'apxPrice',
        header: 'APX Price',
        size: 150,
        enableSorting: true,
        Cell: ({ cell, row }) => formatNumber(cell.getValue(), row.original.assetClass)
      },
      {
        accessorKey: 'brokerPrice',
        header: 'Broker Price',
        size: 150,
        enableSorting: true,
        Cell: ({ cell, row }) => formatNumber(cell.getValue(), row.original.assetClass)
      },
      {
        accessorKey: 'priceDiff',
        header: 'Price Diff',
        size: 150,
        enableSorting: true,
        Cell: ({ cell, row }) => {
          const value = cell.getValue();
          const color = getDiffColor(value);
          return (
            <span style={{ color, fontWeight: 'bold' }}>
              {value === null || value === undefined ? '' : formatDiff(value, false)}
            </span>
          );
        }
      }
    ],
    []
  );

  const tableProps = {
    columns,
    data,
    enableGrouping: true,
    enableSorting: true,
    enableFiltering: true,
    enablePagination: true,
    // enableRowSelection: true,
    enableColumnFilters: true,
    enableGlobalFilter: true,
    enableDensityToggle: true,
    enableFullScreenToggle: true,
    enableColumnOrdering: true,
    enableColumnResizing: true,
    initialState: {
      density: 'compact',
      pagination: { pageSize: 10, pageIndex: 0 },
      showColumnFilters: true,
      showGlobalFilter: true,
      grouping: ['portfolioCode'],
      expanded: true
    },

    state: {
      isLoading: data.length === 0
    }
  };

  return (
    <div style={{ margin: '20px' }}>
      <h2>Portfolio Holdings Analysis ({data.length} records)</h2>
      <ReusableTable tableProps={tableProps} />
    </div>
  );
};

export default PortfolioTableGroup;
