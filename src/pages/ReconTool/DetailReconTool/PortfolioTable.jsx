import { MaterialReactTable, useMaterialReactTable } from 'material-react-table';
import { useMemo } from 'react';
import mockData from './mockdata.json';

const PortfolioTable = () => {
  // console.log('Mock Data:', mockData);
  // console.log('Mock Data length:', mockData?.length);

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

  // Color code for market value difference
  const getDiffColor = (value) => {
    if (value === null || value === undefined) return 'inherit';
    if (value > 0) return '#4caf50';
    if (value < 0) return '#f44336';
    return 'inherit';
  };

  const columns = useMemo(
    () => [
      {
        accessorKey: 'portfolioCode',
        header: 'Portfolio Code'
      },
      {
        accessorKey: 'assetClass',
        header: 'Asset Class'
      },
      {
        accessorKey: 'apxMarketValue',
        header: 'APX Market Value',
        Cell: ({ cell }) => formatNumber(cell.getValue())
      },
      {
        accessorKey: 'brokerMarketValue',
        header: 'Broker Market Value',
        Cell: ({ cell }) => formatNumber(cell.getValue())
      },
      {
        accessorKey: 'marketValueDiff',
        header: 'Market Value Diff',
        Cell: ({ cell }) => {
          const value = cell.getValue();
          return <span style={{ color: getDiffColor(value), fontWeight: 'bold' }}>{formatNumber(value)}</span>;
        }
      }
    ],
    []
  );

  const table = useMaterialReactTable({
    columns,
    data
  });

  return (
    <div style={{ margin: '20px' }}>
      <h2>Portfolio Market Value Analysis</h2>
      <MaterialReactTable table={table} />
    </div>
  );
};

export default PortfolioTable;
