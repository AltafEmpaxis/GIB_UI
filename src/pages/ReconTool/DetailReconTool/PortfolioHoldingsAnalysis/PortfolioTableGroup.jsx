// import { Icon } from '@iconify/react';
// import { Alert, Box, Chip, Divider, Stack, Typography } from '@mui/material';
// import MainCard from 'components/MainCard';
// import ReusableTable from 'components/Table/ReusableTable';
// import PropTypes from 'prop-types';
// import { useMemo } from 'react';

// const PortfolioTableGroup = ({ data: propData, portfolioCode }) => {
//   // Use provided data or empty array
//   const data = useMemo(() => {
//     return Array.isArray(propData) ? propData : [];
//   }, [propData]);

//   const formatNumber = (value, assetClass) => {
//     if (value === null || value === undefined) return assetClass === 'Cash' ? '' : 'N/A';
//     return new Intl.NumberFormat('en-US', {
//       minimumFractionDigits: 2,
//       maximumFractionDigits: 2
//     }).format(value);
//   };

//   const formatInteger = (value, assetClass) => {
//     if (value === null || value === undefined) return assetClass === 'Cash' ? '' : 'N/A';
//     return new Intl.NumberFormat('en-US', {
//       minimumFractionDigits: 0,
//       maximumFractionDigits: 0
//     }).format(value);
//   };

//   const getDiffColor = (value) => {
//     if (value === null || value === undefined) return 'inherit';
//     if (value > 0) return '#4caf50'; // Success green - standard MUI
//     if (value < 0) return '#f44336'; // Error red - standard MUI
//     return 'inherit'; // zero or null
//   };

//   // Helper to format difference with plus/minus sign
//   const formatDiff = (value, isInteger = false) => {
//     if (value === null || value === undefined) return '';
//     const sign = value > 0 ? '+' : value < 0 ? '−' : ''; // Use unicode minus sign for negative
//     const formattedValue = isInteger
//       ? new Intl.NumberFormat('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(Math.abs(value))
//       : new Intl.NumberFormat('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(Math.abs(value));
//     return sign + formattedValue;
//   };

//   const columns = useMemo(
//     () => [
//       {
//         accessorKey: 'portfolioCode',
//         header: 'Portfolio Code',
//         size: 250,
//         enableGrouping: true,
//         enableSorting: true
//       },
//       {
//         accessorKey: 'assetClass',
//         header: 'Asset Class',
//         size: 250,
//         enableGrouping: true,
//         enableSorting: true
//       },
//       {
//         accessorKey: 'symbol',
//         header: 'Symbol',
//         size: 250,
//         enableSorting: true,
//         Cell: ({ cell }) => (
//           <Typography variant="body2" sx={{ fontWeight: 600, fontFamily: 'monospace' }}>
//             {cell.getValue() || 'N/A'}
//           </Typography>
//         )
//       },
//       {
//         accessorKey: 'secType',
//         header: 'Sec Type',
//         size: 200,
//         enableSorting: true,
//         Cell: ({ cell }) => {
//           const value = cell.getValue();
//           return <Chip label={value || 'N/A'} size="small" variant="outlined" color="default" />;
//         }
//       },
//       {
//         accessorKey: 'securityName',
//         header: 'Security Name',
//         size: 250,
//         enableSorting: true
//       },
//       {
//         accessorKey: 'apxQuantity',
//         header: 'APX Quantity',
//         size: 300,
//         enableSorting: true,
//         Cell: ({ cell, row }) => formatInteger(cell.getValue(), row.original.assetClass)
//       },
//       {
//         accessorKey: 'brokerQuantity',
//         header: 'Broker Quantity',
//         size: 200,
//         enableSorting: true,
//         Cell: ({ cell, row }) => formatInteger(cell.getValue(), row.original.assetClass)
//       },
//       {
//         accessorKey: 'qtyDiff',
//         header: 'Qty Diff',
//         size: 150,
//         enableSorting: true,
//         Cell: ({ cell }) => {
//           const value = cell.getValue();
//           const color = getDiffColor(value);
//           return (
//             <span style={{ color, fontWeight: 'bold' }}>
//               {value === null || value === undefined ? '' : formatDiff(value, true)}
//             </span>
//           );
//         }
//       },
//       {
//         accessorKey: 'apxMarketValue',
//         header: 'APX Market Value',
//         size: 250,
//         enableSorting: true,
//         Cell: ({ cell, row }) => formatNumber(cell.getValue(), row.original.assetClass)
//       },
//       {
//         accessorKey: 'brokerMarketValue',
//         header: 'Broker Market Value',
//         size: 250,
//         enableSorting: true,
//         Cell: ({ cell, row }) => formatNumber(cell.getValue(), row.original.assetClass)
//       },
//       {
//         accessorKey: 'marketValueDiff',
//         header: 'Market Value Diff',
//         size: 250,
//         enableSorting: true,
//         Cell: ({ cell }) => {
//           const value = cell.getValue();
//           const color = getDiffColor(value);
//           return (
//             <span style={{ color, fontWeight: 'bold' }}>
//               {value === null || value === undefined ? '' : formatDiff(value, false)}
//             </span>
//           );
//         }
//       },
//       {
//         accessorKey: 'apxPrice',
//         header: 'APX Price',
//         size: 250,
//         enableSorting: true,
//         Cell: ({ cell, row }) => formatNumber(cell.getValue(), row.original.assetClass)
//       },
//       {
//         accessorKey: 'brokerPrice',
//         header: 'Broker Price',
//         size: 250,
//         enableSorting: true,
//         Cell: ({ cell, row }) => formatNumber(cell.getValue(), row.original.assetClass)
//       },
//       {
//         accessorKey: 'priceDiff',
//         header: 'Price Diff',
//         size: 250,
//         enableSorting: true,
//         Cell: ({ cell }) => {
//           const value = cell.getValue();
//           const color = getDiffColor(value);
//           return (
//             <span style={{ color, fontWeight: 'bold' }}>
//               {value === null || value === undefined ? '' : formatDiff(value, false)}
//             </span>
//           );
//         }
//       }
//     ],
//     []
//   );

//   const tableProps = {
//     columns,
//     data,
//     enableGrouping: true,
//     enableSorting: true,
//     enableFiltering: true,
//     enablePagination: true,
//     // enableRowSelection: true,
//     enableColumnFilters: true,
//     enableGlobalFilter: true,
//     enableDensityToggle: true,
//     enableFullScreenToggle: true,
//     enableColumnOrdering: true,
//     enableColumnResizing: true,
//     initialState: {
//       density: 'compact',
//       pagination: { pageSize: 10, pageIndex: 0 },
//       showColumnFilters: true,
//       showGlobalFilter: true,
//       grouping: ['portfolioCode'],
//       expanded: true
//     },

//     state: {
//       isLoading: data.length === 0
//     }
//   };

//   // Calculate detailed stats
//   const reconciledCount = data.filter((row) => Math.abs(row.marketValueDiff || 0) < 1).length;
//   const unreconciledCount = data.length - reconciledCount;
//   const totalDiff = data.reduce((sum, row) => sum + (row.marketValueDiff || 0), 0);

//   return (
//     <MainCard sx={{ m: 0, mb: 3, p: 2 }} contentSX={{ p: '0 !important', m: '0 !important' }}>
//       <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
//         <Typography variant="h6" sx={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: 1 }}>
//           <Icon icon="solar:document-text-bold-duotone" width={24} />
//           Portfolio Holdings Details
//         </Typography>
//         <Stack direction="row" spacing={1}>
//           <Chip
//             label={`${data.length} Positions`}
//             size="small"
//             variant="outlined"
//             icon={<Icon icon="solar:chart-square-bold-duotone" width={16} />}
//           />
//           <Chip label={portfolioCode} size="small" color="secondary" />
//         </Stack>
//       </Box>

//       {/* Reconciliation Status Alert */}
//       {unreconciledCount > 0 && (
//         <Alert severity="warning" sx={{ mb: 2 }} icon={<Icon icon="solar:danger-triangle-bold-duotone" />}>
//           <Typography variant="body2">
//             <strong>{unreconciledCount} positions</strong> require reconciliation attention. Review market value
//             differences and resolve discrepancies.
//           </Typography>
//         </Alert>
//       )}

//       {/* Quick Stats */}
//       <Box sx={{ mb: 3 }}>
//         <Stack direction="row" spacing={2}>
//           <Box
//             sx={{
//               p: 1.5,
//               bgcolor: 'success.100', // Use lighter success variant
//               borderRadius: 1,
//               flex: 1,
//               border: '1px solid',
//               borderColor: 'success.light'
//             }}
//           >
//             <Stack direction="row" alignItems="center" spacing={1}>
//               <Icon icon="solar:check-circle-bold-duotone" width={20} style={{ color: '#4caf50' }} />
//               <Box>
//                 <Typography variant="caption" color="text.secondary">
//                   Reconciled
//                 </Typography>
//                 <Typography variant="h6" sx={{ fontWeight: 600, color: 'success.main' }}>
//                   {reconciledCount}
//                 </Typography>
//               </Box>
//             </Stack>
//           </Box>
//           <Box
//             sx={{
//               p: 1.5,
//               bgcolor: 'secondary.100', // Use GIB Yellow light for warnings per guidelines
//               borderRadius: 1,
//               flex: 1,
//               border: '1px solid',
//               borderColor: 'secondary.light'
//             }}
//           >
//             <Stack direction="row" alignItems="center" spacing={1}>
//               <Icon icon="solar:danger-circle-bold-duotone" width={20} style={{ color: '#FFC72C' }} />
//               <Box>
//                 <Typography variant="caption" color="text.secondary">
//                   Pending
//                 </Typography>
//                 <Typography variant="h6" sx={{ fontWeight: 600, color: 'secondary.dark' }}>
//                   {unreconciledCount}
//                 </Typography>
//               </Box>
//             </Stack>
//           </Box>
//           <Box
//             sx={{
//               p: 1.5,
//               bgcolor: totalDiff >= 0 ? 'grey.100' : 'error.100', // Use GIB Light Grey for positive, light error for negative
//               borderRadius: 1,
//               flex: 2,
//               border: '1px solid',
//               borderColor: totalDiff >= 0 ? 'grey.300' : 'error.light'
//             }}
//           >
//             <Stack direction="row" alignItems="center" spacing={1}>
//               <Icon
//                 icon={totalDiff >= 0 ? 'solar:arrow-up-bold-duotone' : 'solar:arrow-down-bold-duotone'}
//                 width={20}
//                 style={{ color: totalDiff >= 0 ? '#4caf50' : '#f44336' }}
//               />
//               <Box>
//                 <Typography variant="caption" color="text.secondary">
//                   Net Difference
//                 </Typography>
//                 <Typography
//                   variant="h6"
//                   sx={{
//                     fontWeight: 600,
//                     color: totalDiff >= 0 ? 'success.main' : 'error.main',
//                     fontFamily: 'monospace'
//                   }}
//                 >
//                   {new Intl.NumberFormat('en-SA', { style: 'currency', currency: 'SAR' }).format(totalDiff)}
//                 </Typography>
//               </Box>
//             </Stack>
//           </Box>
//         </Stack>
//       </Box>

//       <Divider sx={{ my: 2, borderColor: 'divider' }} />
//       <ReusableTable tableProps={tableProps} />
//     </MainCard>
//   );
// };

// PortfolioTableGroup.propTypes = {
//   data: PropTypes.array,
//   portfolioCode: PropTypes.string
// };

// PortfolioTableGroup.defaultProps = {
//   data: []
// };

// export default PortfolioTableGroup;

import { Icon } from '@iconify/react';
import { Box, Chip, Divider, Stack, Typography, useTheme } from '@mui/material';
import MainCard from 'components/MainCard';
import ReusableTable from 'components/Table/ReusableTable';
import PropTypes from 'prop-types';
import { useMemo } from 'react';

const PortfolioTableGroup = ({ data: propData, portfolioCode }) => {
  const theme = useTheme();

  // Use provided data or empty array
  const data = useMemo(() => {
    return Array.isArray(propData) ? propData : [];
  }, [propData]);

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

  // Format currency
  const formatCurrency = (value) => {
    if (value === null || value === undefined) return 'N/A';
    return new Intl.NumberFormat('en-SA', {
      style: 'currency',
      currency: 'SAR'
    }).format(value);
  };

  const getDiffColor = (value) => {
    if (value === null || value === undefined) return 'inherit';
    if (value > 0) return '#4caf50'; // Success green - standard MUI
    if (value < 0) return '#f44336'; // Error red - standard MUI
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

  // Calculate totals for footer
  const totalAPXQuantity = data.reduce((sum, row) => sum + (row.apxQuantity || 0), 0);
  const totalBrokerQuantity = data.reduce((sum, row) => sum + (row.brokerQuantity || 0), 0);
  const totalQtyDiff = data.reduce((sum, row) => sum + (row.qtyDiff || 0), 0);
  const totalAPXMarketValue = data.reduce((sum, row) => sum + (row.apxMarketValue || 0), 0);
  const totalBrokerMarketValue = data.reduce((sum, row) => sum + (row.brokerMarketValue || 0), 0);
  const totalMarketValueDiff = data.reduce((sum, row) => sum + (row.marketValueDiff || 0), 0);

  // Calculate average prices (excluding null/undefined values)
  const validAPXPrices = data.filter((row) => row.apxPrice !== null && row.apxPrice !== undefined);
  const validBrokerPrices = data.filter((row) => row.brokerPrice !== null && row.brokerPrice !== undefined);
  const validPriceDiffs = data.filter((row) => row.priceDiff !== null && row.priceDiff !== undefined);

  const avgAPXPrice =
    validAPXPrices.length > 0 ? validAPXPrices.reduce((sum, row) => sum + row.apxPrice, 0) / validAPXPrices.length : 0;
  const avgBrokerPrice =
    validBrokerPrices.length > 0
      ? validBrokerPrices.reduce((sum, row) => sum + row.brokerPrice, 0) / validBrokerPrices.length
      : 0;
  const avgPriceDiff =
    validPriceDiffs.length > 0
      ? validPriceDiffs.reduce((sum, row) => sum + row.priceDiff, 0) / validPriceDiffs.length
      : 0;

  const columns = useMemo(
    () => [
      {
        accessorKey: 'portfolioCode',
        header: 'Portfolio Code',
        size: 250,
        enableGrouping: true,
        enableSorting: true,
        Footer: () => (
          <Typography
            variant="subtitle2"
            sx={{
              fontWeight: 'bold',
              color: 'text.primary',
              display: 'flex',
              alignItems: 'center',
              gap: 1
            }}
          >
            <Icon icon="solar:calculator-bold-duotone" width={16} />
            TOTAL
          </Typography>
        ),
        AggregatedCell: ({ cell, table }) => (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Icon icon="solar:folder-bold-duotone" width={16} />
            <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
              {cell.getValue()} ({table.getRowModel().rows.length} positions)
            </Typography>
          </Box>
        )
      },
      {
        accessorKey: 'assetClass',
        header: 'Asset Class',
        size: 250,
        enableGrouping: true,
        enableSorting: true,
        Footer: () => (
          <Chip
            label={`${data.length} Positions`}
            variant="outlined"
            size="small"
            color="primary"
            icon={<Icon icon="solar:chart-square-bold-duotone" width={16} />}
          />
        ),
        AggregatedCell: ({ cell, table }) => (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Chip
              label={`${cell.getValue()} (${table.getRowModel().rows.length})`}
              variant="filled"
              size="small"
              color="secondary"
              icon={<Icon icon="solar:layers-bold-duotone" width={16} />}
            />
          </Box>
        )
      },
      {
        accessorKey: 'symbol',
        header: 'Symbol',
        size: 250,
        enableSorting: true,
        Cell: ({ cell }) => (
          <Typography variant="body2" sx={{ fontWeight: 600, fontFamily: 'monospace' }}>
            {cell.getValue() || 'N/A'}
          </Typography>
        ),
        Footer: () => null,
        AggregatedCell: ({ table }) => (
          <Typography variant="body2" sx={{ fontStyle: 'italic', color: 'text.secondary' }}>
            {table.getRowModel().rows.length} securities
          </Typography>
        )
      },
      {
        accessorKey: 'secType',
        header: 'Sec Type',
        size: 200,
        enableSorting: true,
        Cell: ({ cell }) => {
          const value = cell.getValue();
          return <Chip label={value || 'N/A'} size="small" variant="outlined" color="default" />;
        },
        Footer: () => null,
        AggregatedCell: ({ table }) => (
          <Chip label={`${table.getRowModel().rows.length} types`} size="small" variant="outlined" color="default" />
        )
      },
      {
        accessorKey: 'securityName',
        header: 'Security Name',
        size: 250,
        enableSorting: true,
        Footer: () => null,
        AggregatedCell: ({ table }) => (
          <Typography variant="body2" sx={{ fontStyle: 'italic', color: 'text.secondary' }}>
            {table.getRowModel().rows.length} securities
          </Typography>
        )
      },
      {
        accessorKey: 'apxQuantity',
        header: 'APX Quantity',
        size: 300,
        enableSorting: true,
        Cell: ({ cell, row }) => formatInteger(cell.getValue(), row.original.assetClass),
        Footer: () => (
          <Box sx={{ p: 1, backgroundColor: 'primary.lighter', borderRadius: 1 }}>
            <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.7rem' }}>
              Total APX Qty
            </Typography>
            <Typography variant="subtitle2" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
              {formatInteger(totalAPXQuantity)}
            </Typography>
          </Box>
        ),
        AggregatedCell: ({ table }) => {
          const groupSum = table.getRowModel().rows.reduce((sum, row) => sum + (row.original.apxQuantity || 0), 0);
          return (
            <Box sx={{ p: 1, backgroundColor: 'primary.50', borderRadius: 1 }}>
              <Typography variant="caption" color="text.secondary">
                Group Total
              </Typography>
              <Typography variant="subtitle2" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                {formatInteger(groupSum)}
              </Typography>
            </Box>
          );
        }
      },
      {
        accessorKey: 'brokerQuantity',
        header: 'Broker Quantity',
        size: 200,
        enableSorting: true,
        Cell: ({ cell, row }) => formatInteger(cell.getValue(), row.original.assetClass),
        Footer: () => (
          <Box sx={{ p: 1, backgroundColor: 'secondary.lighter', borderRadius: 1 }}>
            <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.7rem' }}>
              Total Broker Qty
            </Typography>
            <Typography variant="subtitle2" sx={{ fontWeight: 'bold', color: 'secondary.main' }}>
              {formatInteger(totalBrokerQuantity)}
            </Typography>
          </Box>
        ),
        AggregatedCell: ({ table }) => {
          const groupSum = table.getRowModel().rows.reduce((sum, row) => sum + (row.original.brokerQuantity || 0), 0);
          return (
            <Box sx={{ p: 1, backgroundColor: 'secondary.50', borderRadius: 1 }}>
              <Typography variant="caption" color="text.secondary">
                Group Total
              </Typography>
              <Typography variant="subtitle2" sx={{ fontWeight: 'bold', color: 'secondary.main' }}>
                {formatInteger(groupSum)}
              </Typography>
            </Box>
          );
        }
      },
      {
        accessorKey: 'qtyDiff',
        header: 'Qty Diff',
        size: 150,
        enableSorting: true,
        Cell: ({ cell }) => {
          const value = cell.getValue();
          const color = getDiffColor(value);
          return (
            <span style={{ color, fontWeight: 'bold' }}>
              {value === null || value === undefined ? '' : formatDiff(value, true)}
            </span>
          );
        },
        Footer: () => (
          <Box sx={{ p: 1, backgroundColor: totalQtyDiff >= 0 ? 'success.lighter' : 'error.lighter', borderRadius: 1 }}>
            <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.7rem' }}>
              Total Qty Diff
            </Typography>
            <Typography
              variant="subtitle2"
              sx={{
                fontWeight: 'bold',
                color: getDiffColor(totalQtyDiff),
                fontFamily: 'monospace'
              }}
            >
              {formatDiff(totalQtyDiff, true)}
            </Typography>
          </Box>
        ),
        AggregatedCell: ({ table }) => {
          const groupSum = table.getRowModel().rows.reduce((sum, row) => sum + (row.original.qtyDiff || 0), 0);
          return (
            <Box sx={{ p: 1, backgroundColor: groupSum >= 0 ? 'success.50' : 'error.50', borderRadius: 1 }}>
              <Typography variant="caption" color="text.secondary">
                Group Diff
              </Typography>
              <Typography
                variant="subtitle2"
                sx={{
                  fontWeight: 'bold',
                  color: getDiffColor(groupSum),
                  fontFamily: 'monospace'
                }}
              >
                {formatDiff(groupSum, true)}
              </Typography>
            </Box>
          );
        }
      },
      {
        accessorKey: 'apxMarketValue',
        header: 'APX Market Value',
        size: 250,
        enableSorting: true,
        Cell: ({ cell, row }) => formatNumber(cell.getValue(), row.original.assetClass),
        Footer: () => (
          <Box sx={{ p: 1, backgroundColor: 'primary.lighter', borderRadius: 1 }}>
            <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.7rem' }}>
              Total APX Market Value
            </Typography>
            <Typography variant="subtitle2" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
              {formatCurrency(totalAPXMarketValue)}
            </Typography>
          </Box>
        ),
        AggregatedCell: ({ table }) => {
          const groupSum = table.getRowModel().rows.reduce((sum, row) => sum + (row.original.apxMarketValue || 0), 0);
          return (
            <Box sx={{ p: 1, backgroundColor: 'primary.50', borderRadius: 1 }}>
              <Typography variant="caption" color="text.secondary">
                Group Total
              </Typography>
              <Typography variant="subtitle2" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                {formatCurrency(groupSum)}
              </Typography>
            </Box>
          );
        }
      },
      {
        accessorKey: 'brokerMarketValue',
        header: 'Broker Market Value',
        size: 250,
        enableSorting: true,
        Cell: ({ cell, row }) => formatNumber(cell.getValue(), row.original.assetClass),
        Footer: () => (
          <Box sx={{ p: 1, backgroundColor: 'secondary.lighter', borderRadius: 1 }}>
            <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.7rem' }}>
              Total Broker Market Value
            </Typography>
            <Typography variant="subtitle2" sx={{ fontWeight: 'bold', color: 'secondary.main' }}>
              {formatCurrency(totalBrokerMarketValue)}
            </Typography>
          </Box>
        ),
        AggregatedCell: ({ table }) => {
          const groupSum = table
            .getRowModel()
            .rows.reduce((sum, row) => sum + (row.original.brokerMarketValue || 0), 0);
          return (
            <Box sx={{ p: 1, backgroundColor: 'secondary.50', borderRadius: 1 }}>
              <Typography variant="caption" color="text.secondary">
                Group Total
              </Typography>
              <Typography variant="subtitle2" sx={{ fontWeight: 'bold', color: 'secondary.main' }}>
                {formatCurrency(groupSum)}
              </Typography>
            </Box>
          );
        }
      },
      {
        accessorKey: 'marketValueDiff',
        header: 'Market Value Diff',
        size: 250,
        enableSorting: true,
        Cell: ({ cell }) => {
          const value = cell.getValue();
          const color = getDiffColor(value);
          return (
            <span style={{ color, fontWeight: 'bold' }}>
              {value === null || value === undefined ? '' : formatDiff(value, false)}
            </span>
          );
        },
        Footer: () => (
          <Box
            sx={{
              p: 1,
              backgroundColor: totalMarketValueDiff >= 0 ? 'success.lighter' : 'error.lighter',
              borderRadius: 1
            }}
          >
            <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.7rem' }}>
              Total Market Value Diff
            </Typography>
            <Typography
              variant="subtitle2"
              sx={{
                fontWeight: 'bold',
                color: getDiffColor(totalMarketValueDiff),
                fontFamily: 'monospace'
              }}
            >
              {formatCurrency(Math.abs(totalMarketValueDiff))}
            </Typography>
          </Box>
        ),
        AggregatedCell: ({ table }) => {
          const groupSum = table.getRowModel().rows.reduce((sum, row) => sum + (row.original.marketValueDiff || 0), 0);
          return (
            <Box sx={{ p: 1, backgroundColor: groupSum >= 0 ? 'success.50' : 'error.50', borderRadius: 1 }}>
              <Typography variant="caption" color="text.secondary">
                Group Diff
              </Typography>
              <Typography
                variant="subtitle2"
                sx={{
                  fontWeight: 'bold',
                  color: getDiffColor(groupSum),
                  fontFamily: 'monospace'
                }}
              >
                {formatCurrency(Math.abs(groupSum))}
              </Typography>
            </Box>
          );
        }
      },
      {
        accessorKey: 'apxPrice',
        header: 'APX Price',
        size: 250,
        enableSorting: true,
        Cell: ({ cell, row }) => formatNumber(cell.getValue(), row.original.assetClass),
        Footer: () => (
          <Box sx={{ p: 1, backgroundColor: 'info.lighter', borderRadius: 1 }}>
            <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.7rem' }}>
              Avg APX Price
            </Typography>
            <Typography variant="subtitle2" sx={{ fontWeight: 'bold', color: 'info.main' }}>
              {formatNumber(avgAPXPrice)}
            </Typography>
          </Box>
        ),
        AggregatedCell: ({ table }) => {
          const validPrices = table
            .getRowModel()
            .rows.filter((row) => row.original.apxPrice !== null && row.original.apxPrice !== undefined);
          const groupAvg =
            validPrices.length > 0
              ? validPrices.reduce((sum, row) => sum + row.original.apxPrice, 0) / validPrices.length
              : 0;
          return (
            <Box sx={{ p: 1, backgroundColor: 'info.50', borderRadius: 1 }}>
              <Typography variant="caption" color="text.secondary">
                Group Avg
              </Typography>
              <Typography variant="subtitle2" sx={{ fontWeight: 'bold', color: 'info.main' }}>
                {formatNumber(groupAvg)}
              </Typography>
            </Box>
          );
        }
      },
      {
        accessorKey: 'brokerPrice',
        header: 'Broker Price',
        size: 250,
        enableSorting: true,
        Cell: ({ cell, row }) => formatNumber(cell.getValue(), row.original.assetClass),
        Footer: () => (
          <Box sx={{ p: 1, backgroundColor: 'warning.lighter', borderRadius: 1 }}>
            <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.7rem' }}>
              Avg Broker Price
            </Typography>
            <Typography variant="subtitle2" sx={{ fontWeight: 'bold', color: 'warning.main' }}>
              {formatNumber(avgBrokerPrice)}
            </Typography>
          </Box>
        ),
        AggregatedCell: ({ table }) => {
          const validPrices = table
            .getRowModel()
            .rows.filter((row) => row.original.brokerPrice !== null && row.original.brokerPrice !== undefined);
          const groupAvg =
            validPrices.length > 0
              ? validPrices.reduce((sum, row) => sum + row.original.brokerPrice, 0) / validPrices.length
              : 0;
          return (
            <Box sx={{ p: 1, backgroundColor: 'warning.50', borderRadius: 1 }}>
              <Typography variant="caption" color="text.secondary">
                Group Avg
              </Typography>
              <Typography variant="subtitle2" sx={{ fontWeight: 'bold', color: 'warning.main' }}>
                {formatNumber(groupAvg)}
              </Typography>
            </Box>
          );
        }
      },
      {
        accessorKey: 'priceDiff',
        header: 'Price Diff',
        size: 250,
        enableSorting: true,
        Cell: ({ cell }) => {
          const value = cell.getValue();
          const color = getDiffColor(value);
          return (
            <span style={{ color, fontWeight: 'bold' }}>
              {value === null || value === undefined ? '' : formatDiff(value, false)}
            </span>
          );
        },
        Footer: () => (
          <Box sx={{ p: 1, backgroundColor: avgPriceDiff >= 0 ? 'success.lighter' : 'error.lighter', borderRadius: 1 }}>
            <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.7rem' }}>
              Avg Price Diff
            </Typography>
            <Typography
              variant="subtitle2"
              sx={{
                fontWeight: 'bold',
                color: getDiffColor(avgPriceDiff),
                fontFamily: 'monospace'
              }}
            >
              {formatDiff(avgPriceDiff, false)}
            </Typography>
          </Box>
        ),
        AggregatedCell: ({ table }) => {
          const validDiffs = table
            .getRowModel()
            .rows.filter((row) => row.original.priceDiff !== null && row.original.priceDiff !== undefined);
          const groupAvg =
            validDiffs.length > 0
              ? validDiffs.reduce((sum, row) => sum + row.original.priceDiff, 0) / validDiffs.length
              : 0;
          return (
            <Box sx={{ p: 1, backgroundColor: groupAvg >= 0 ? 'success.50' : 'error.50', borderRadius: 1 }}>
              <Typography variant="caption" color="text.secondary">
                Group Avg
              </Typography>
              <Typography
                variant="subtitle2"
                sx={{
                  fontWeight: 'bold',
                  color: getDiffColor(groupAvg),
                  fontFamily: 'monospace'
                }}
              >
                {formatDiff(groupAvg, false)}
              </Typography>
            </Box>
          );
        }
      }
    ],
    [
      totalAPXQuantity,
      totalBrokerQuantity,
      totalQtyDiff,
      totalAPXMarketValue,
      totalBrokerMarketValue,
      totalMarketValueDiff,
      avgAPXPrice,
      avgBrokerPrice,
      avgPriceDiff,
      data.length
    ]
  );

  const tableProps = {
    columns,
    data,
    enableGrouping: true,
    enableSorting: true,
    enableFiltering: true,
    enablePagination: true,
    enableColumnFilters: true,
    enableGlobalFilter: true,
    enableDensityToggle: true,
    enableFullScreenToggle: true,
    enableColumnOrdering: true,
    enableColumnResizing: true,
    // Enable footer
    enableColumnFooters: true,
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
    },
    // Footer styling
    muiTableFooterRowProps: {
      sx: {
        backgroundColor: 'grey.50',
        borderTop: `2px solid ${theme.palette.divider}`,
        '& td': {
          fontWeight: 'bold',
          borderTop: `1px solid ${theme.palette.divider}`,
          py: 2
        }
      }
    },
    // Grouping row styling for AggregatedCell
    muiTableBodyRowProps: ({ row }) => ({
      sx: row.getIsGrouped()
        ? {
            backgroundColor: 'grey.25',
            fontWeight: 'bold',
            '&:hover': {
              backgroundColor: 'grey.100'
            }
          }
        : {}
    })
  };

  // // Calculate detailed stats
  // const reconciledCount = data.filter((row) => Math.abs(row.marketValueDiff || 0) < 1).length;
  // const unreconciledCount = data.length - reconciledCount;
  // const totalDiff = data.reduce((sum, row) => sum + (row.marketValueDiff || 0), 0);

  return (
    <MainCard sx={{ m: 0, mb: 3, p: 2 }} contentSX={{ p: '0 !important', m: '0 !important' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: 1 }}>
          <Icon icon="solar:document-text-bold-duotone" width={24} />
          Portfolio Holdings Details
        </Typography>
        <Stack direction="row" spacing={1}>
          <Chip
            label={`${data.length} Positions`}
            size="small"
            variant="outlined"
            icon={<Icon icon="solar:chart-square-bold-duotone" width={16} />}
          />
          <Chip label={portfolioCode} size="small" color="secondary" />
        </Stack>
      </Box>

      {/* Reconciliation Status Alert */}
      {/* {unreconciledCount > 0 && (
        <Alert severity="warning" sx={{ mb: 2 }} icon={<Icon icon="solar:danger-triangle-bold-duotone" />}>
          <Typography variant="body2">
            <strong>{unreconciledCount} positions</strong> require reconciliation attention. Review market value
            differences and resolve discrepancies.
          </Typography>
        </Alert>
      )} */}

      {/* Quick Stats */}

      {/* <Box sx={{ mb: 3 }}>
        <Stack direction="row" spacing={2}>
          <Box
            sx={{
              p: 1.5,
              bgcolor: 'success.100',
              borderRadius: 1,
              flex: 1,
              border: '1px solid',
              borderColor: 'success.light'
            }}
          >
            <Stack direction="row" alignItems="center" spacing={1}>
              <Icon icon="solar:check-circle-bold-duotone" width={20} style={{ color: '#4caf50' }} />
              <Box>
                <Typography variant="caption" color="text.secondary">
                  Reconciled
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: 600, color: 'success.main' }}>
                  {reconciledCount}
                </Typography>
              </Box>
            </Stack>
          </Box>
          <Box
            sx={{
              p: 1.5,
              bgcolor: 'secondary.100',
              borderRadius: 1,
              flex: 1,
              border: '1px solid',
              borderColor: 'secondary.light'
            }}
          >
            <Stack direction="row" alignItems="center" spacing={1}>
              <Icon icon="solar:danger-circle-bold-duotone" width={20} style={{ color: '#FFC72C' }} />
              <Box>
                <Typography variant="caption" color="text.secondary">
                  Pending
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: 600, color: 'secondary.dark' }}>
                  {unreconciledCount}
                </Typography>
              </Box>
            </Stack>
          </Box>
          <Box
            sx={{
              p: 1.5,
              bgcolor: totalDiff >= 0 ? 'grey.100' : 'error.100',
              borderRadius: 1,
              flex: 2,
              border: '1px solid',
              borderColor: totalDiff >= 0 ? 'grey.300' : 'error.light'
            }}
          >
            <Stack direction="row" alignItems="center" spacing={1}>
              <Icon
                icon={totalDiff >= 0 ? 'solar:arrow-up-bold-duotone' : 'solar:arrow-down-bold-duotone'}
                width={20}
                style={{ color: totalDiff >= 0 ? '#4caf50' : '#f44336' }}
              />
              <Box>
                <Typography variant="caption" color="text.secondary">
                  Net Difference
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 600,
                    color: totalDiff >= 0 ? 'success.main' : 'error.main',
                    fontFamily: 'monospace'
                  }}
                >
                  {new Intl.NumberFormat('en-SA', { style: 'currency', currency: 'SAR' }).format(totalDiff)}
                </Typography>
              </Box>
            </Stack>
          </Box>
        </Stack>
      </Box> */}

      <Divider sx={{ my: 2, borderColor: 'divider' }} />
      <ReusableTable tableProps={tableProps} />
    </MainCard>
  );
};

PortfolioTableGroup.propTypes = {
  data: PropTypes.array,
  portfolioCode: PropTypes.string
};

PortfolioTableGroup.defaultProps = {
  data: []
};

export default PortfolioTableGroup;
