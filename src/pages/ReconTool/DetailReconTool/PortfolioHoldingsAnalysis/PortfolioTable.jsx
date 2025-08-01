// import { Icon } from '@iconify/react';
// import { Box, Chip, Divider, Stack, Typography, useTheme } from '@mui/material';
// import MainCard from 'components/MainCard';
// import ReusableTable from 'components/Table/ReusableTable';
// import PropTypes from 'prop-types';
// import { useCallback, useMemo } from 'react';

// const PortfolioTable = ({ data: propData, portfolioCode }) => {
//   const theme = useTheme();

//   // Use provided data or empty array
//   const data = useMemo(() => {
//     return Array.isArray(propData) ? propData : [];
//   }, [propData]);

//   // Format number with comma separators
//   const formatNumber = (value) => {
//     if (value === null || value === undefined) return 'N/A';
//     return new Intl.NumberFormat('en-US', {
//       minimumFractionDigits: 2,
//       maximumFractionDigits: 2
//     }).format(value);
//   };

//   // Color code for market value difference using theme colors

//   const getDiffColor = useCallback(
//     (value) => {
//       if (value === null || value === undefined) return 'inherit';
//       if (value > 0) return theme.palette.success.main;
//       if (value < 0) return theme.palette.error.main;
//       return 'inherit';
//     },
//     [theme.palette]
//   );

//   const columns = useMemo(
//     () => [
//       {
//         accessorKey: 'portfolioCode',
//         header: 'Portfolio Code',
//         size: 250
//       },
//       {
//         accessorKey: 'assetClass',
//         header: 'Asset Class',
//         size: 250,
//         Cell: ({ cell }) => {
//           const value = cell.getValue();
//           const isCash = value && value.toLowerCase().includes('cash');
//           return (
//             <Chip
//               label={value || 'N/A'}
//               variant="outlined"
//               size="small"
//               color={isCash ? 'success' : 'secondary'}
//               icon={
//                 <Icon
//                   icon={isCash ? 'solar:wallet-money-bold-duotone' : 'solar:chart-square-bold-duotone'}
//                   width={16}
//                 />
//               }
//             />
//           );
//         }
//       },
//       {
//         accessorKey: 'apxMarketValue',
//         header: 'APX Market Value',
//         size: 280,
//         Cell: ({ cell }) => formatNumber(cell.getValue())
//       },
//       {
//         accessorKey: 'brokerMarketValue',
//         header: 'Broker Market Value',
//         size: 280,
//         Cell: ({ cell }) => formatNumber(cell.getValue())
//       },
//       {
//         accessorKey: 'marketValueDiff',
//         header: 'Market Value Diff',
//         size: 260,
//         Cell: ({ cell }) => {
//           const value = cell.getValue();
//           const isPositive = value > 0;
//           const isZero = value === 0;

//           return (
//             <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//               {!isZero && (
//                 <Icon
//                   icon={isPositive ? 'solar:arrow-up-bold-duotone' : 'solar:arrow-down-bold-duotone'}
//                   width={16}
//                   style={{ color: getDiffColor(value) }}
//                 />
//               )}
//               <Typography
//                 variant="body2"
//                 sx={{
//                   color: getDiffColor(value),
//                   fontWeight: 'bold',
//                   fontFamily: 'monospace'
//                 }}
//               >
//                 {formatNumber(value)}
//               </Typography>
//             </Box>
//           );
//         }
//       }
//     ],
//     [getDiffColor]
//   );

//   const tableProps = {
//     columns,
//     data: data,
//     initialState: {
//       density: 'compact',
//       pagination: { pageSize: 10, pageIndex: 0 },
//       showColumnFilters: true,
//       showGlobalFilter: true
//     },

//     enableRowSelection: false,
//     manualPagination: true,
//     manualFiltering: true,
//     manualSorting: true
//   };

//   // Calculate summary stats
//   const totalAPXValue = data.reduce((sum, row) => sum + (row.apxMarketValue || 0), 0);
//   const totalBrokerValue = data.reduce((sum, row) => sum + (row.brokerMarketValue || 0), 0);
//   const totalDiff = data.reduce((sum, row) => sum + (row.marketValueDiff || 0), 0);

//   return (
//     <MainCard sx={{ m: 0, p: 2 }} contentSX={{ p: '0 !important', m: '0 !important' }}>
//       <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
//         <Typography variant="h6" sx={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: 1 }}>
//           <Icon icon="solar:layers-bold-duotone" width={24} />
//           Asset Class Summary
//         </Typography>
//         <Stack direction="row" spacing={1}>
//           <Chip
//             label={`${data.length} Classes`}
//             size="small"
//             variant="outlined"
//             icon={<Icon icon="solar:document-text-bold-duotone" width={16} />}
//           />
//           <Chip label={portfolioCode} size="small" color="secondary" />
//         </Stack>
//       </Box>

//       {/* Summary Cards */}
//       <Box sx={{ mb: 3 }}>
//         <Stack direction="row" spacing={2}>
//           <Box
//             sx={{
//               p: 2,
//               bgcolor: 'grey.100', // Use GIB Light Grey for backgrounds
//               borderRadius: 1,
//               flex: 1,
//               border: `1px solid ${theme.palette.grey[200]}`
//             }}
//           >
//             <Typography variant="caption" color="text.secondary">
//               APX Total
//             </Typography>
//             <Typography variant="h6" sx={{ fontWeight: 600, color: 'primary.main' }}>
//               {new Intl.NumberFormat('en-SA', { style: 'currency', currency: 'SAR' }).format(totalAPXValue)}
//             </Typography>
//           </Box>
//           <Box
//             sx={{
//               p: 2,
//               bgcolor: 'secondary.100', // Use GIB Yellow light variant for secondary info
//               borderRadius: 1,
//               flex: 1,
//               border: `1px solid ${theme.palette.secondary.light}`
//             }}
//           >
//             <Typography variant="caption" color="text.secondary">
//               Broker Total
//             </Typography>
//             <Typography variant="h6" sx={{ fontWeight: 600, color: 'secondary.dark' }}>
//               {new Intl.NumberFormat('en-SA', { style: 'currency', currency: 'SAR' }).format(totalBrokerValue)}
//             </Typography>
//           </Box>
//           <Box
//             sx={{
//               p: 2,
//               bgcolor: totalDiff >= 0 ? 'success.lighter' : 'error.lighter',
//               borderRadius: 1,
//               flex: 1,
//               border: `1px solid ${totalDiff >= 0 ? theme.palette.success.light : theme.palette.error.light}`
//             }}
//           >
//             <Typography variant="caption" color="text.secondary">
//               Total Difference
//             </Typography>
//             <Typography
//               variant="h6"
//               sx={{
//                 fontWeight: 600,
//                 color: totalDiff >= 0 ? 'success.main' : 'error.main',
//                 display: 'flex',
//                 alignItems: 'center',
//                 gap: 0.5
//               }}
//             >
//               <Icon
//                 icon={totalDiff >= 0 ? 'solar:arrow-up-bold-duotone' : 'solar:arrow-down-bold-duotone'}
//                 width={16}
//               />
//               {new Intl.NumberFormat('en-SA', { style: 'currency', currency: 'SAR' }).format(Math.abs(totalDiff))}
//             </Typography>
//           </Box>
//         </Stack>
//       </Box>

//       <Divider sx={{ my: 2, borderColor: 'divider' }} />
//       <ReusableTable tableProps={tableProps} />
//     </MainCard>
//   );
// };

// PortfolioTable.propTypes = {
//   data: PropTypes.array,
//   portfolioCode: PropTypes.string
// };

// PortfolioTable.defaultProps = {
//   data: []
// };

// export default PortfolioTable;

import { Icon } from '@iconify/react';
import { Box, Chip, Divider, Stack, Typography, useTheme } from '@mui/material';
import MainCard from 'components/MainCard';
import ReusableTable from 'components/Table/ReusableTable';
import PropTypes from 'prop-types';
import { useCallback, useMemo } from 'react';

const PortfolioTable = ({ data: propData, portfolioCode }) => {
  const theme = useTheme();

  // Use provided data or empty array
  const data = useMemo(() => {
    return Array.isArray(propData) ? propData : [];
  }, [propData]);

  // Format number with comma separators
  const formatNumber = (value) => {
    if (value === null || value === undefined) return 'N/A';
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
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

  // Color code for market value difference using theme colors
  const getDiffColor = useCallback(
    (value) => {
      if (value === null || value === undefined) return 'inherit';
      if (value > 0) return theme.palette.success.main;
      if (value < 0) return theme.palette.error.main;
      return 'inherit';
    },
    [theme.palette]
  );

  // Calculate summary stats
  const totalAPXValue = data.reduce((sum, row) => sum + (row.apxMarketValue || 0), 0);
  const totalBrokerValue = data.reduce((sum, row) => sum + (row.brokerMarketValue || 0), 0);
  const totalDiff = data.reduce((sum, row) => sum + (row.marketValueDiff || 0), 0);

  const columns = useMemo(
    () => [
      {
        accessorKey: 'portfolioCode',
        header: 'Portfolio Code',
        size: 250,
        // Footer for portfolio code column
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
        // AggregatedCell for grouping
        AggregatedCell: ({ cell, table }) => (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Icon icon="solar:folder-bold-duotone" width={16} />
            <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
              {cell.getValue()} ({table.getRowModel().rows.length} items)
            </Typography>
          </Box>
        )
      },
      {
        accessorKey: 'assetClass',
        header: 'Asset Class',
        size: 250,
        Cell: ({ cell }) => {
          const value = cell.getValue();
          const isCash = value && value.toLowerCase().includes('cash');
          return (
            <Chip
              label={value || 'N/A'}
              variant="outlined"
              size="small"
              color={isCash ? 'success' : 'secondary'}
              icon={
                <Icon
                  icon={isCash ? 'solar:wallet-money-bold-duotone' : 'solar:chart-square-bold-duotone'}
                  width={16}
                />
              }
            />
          );
        },
        Footer: () => (
          <Chip
            label={`${data.length} Classes`}
            variant="outlined"
            size="small"
            color="primary"
            icon={<Icon icon="solar:layers-bold-duotone" width={16} />}
          />
        ),
        // AggregatedCell for asset class grouping
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
        accessorKey: 'apxMarketValue',
        header: 'APX Market Value',
        size: 280,
        Cell: ({ cell }) => formatNumber(cell.getValue()),
        Footer: () => (
          <Box
            sx={{
              p: 1,
              backgroundColor: 'primary.lighter',
              borderRadius: 1,
              border: `1px solid ${theme.palette.primary.light}`
            }}
          >
            <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.7rem' }}>
              Total APX Market Value
            </Typography>
            <Typography
              variant="subtitle2"
              sx={{
                fontWeight: 'bold',
                color: 'primary.main',
                display: 'flex',
                alignItems: 'center',
                gap: 0.5
              }}
            >
              <Icon icon="solar:chart-square-bold-duotone" width={14} />
              {formatCurrency(totalAPXValue)}
            </Typography>
          </Box>
        ),
        // AggregatedCell for APX Market Value
        AggregatedCell: ({ cell, table }) => {
          const groupSum = table.getRowModel().rows.reduce((sum, row) => sum + (row.original.apxMarketValue || 0), 0);
          const groupName = table.getColumn(cell.row.groupingColumnId ?? '').columnDef.header;

          return (
            <Box sx={{ p: 1, backgroundColor: 'primary.50', borderRadius: 1 }}>
              <Typography variant="caption" color="text.secondary">
                Total APX {groupName}
              </Typography>
              <Typography
                variant="subtitle2"
                sx={{
                  fontWeight: 'bold',
                  color: 'primary.main',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 0.5
                }}
              >
                <Icon icon="solar:calculator-bold-duotone" width={14} />
                {formatCurrency(groupSum)}
              </Typography>
            </Box>
          );
        }
      },
      {
        accessorKey: 'brokerMarketValue',
        header: 'Broker Market Value',
        size: 280,
        Cell: ({ cell }) => formatNumber(cell.getValue()),
        Footer: () => (
          <Box
            sx={{
              p: 1,
              backgroundColor: 'secondary.lighter',
              borderRadius: 1,
              border: `1px solid ${theme.palette.secondary.light}`
            }}
          >
            <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.7rem' }}>
              Total Broker Market Value
            </Typography>
            <Typography
              variant="subtitle2"
              sx={{
                fontWeight: 'bold',
                color: 'secondary.main',
                display: 'flex',
                alignItems: 'center',
                gap: 0.5
              }}
            >
              <Icon icon="solar:wallet-money-bold-duotone" width={14} />
              {formatCurrency(totalBrokerValue)}
            </Typography>
          </Box>
        ),
        // AggregatedCell for Broker Market Value
        AggregatedCell: ({ cell, table }) => {
          const groupSum = table
            .getRowModel()
            .rows.reduce((sum, row) => sum + (row.original.brokerMarketValue || 0), 0);
          const groupName = table.getColumn(cell.row.groupingColumnId ?? '').columnDef.header;

          return (
            <Box sx={{ p: 1, backgroundColor: 'secondary.50', borderRadius: 1 }}>
              <Typography variant="caption" color="text.secondary">
                Total Broker {groupName}
              </Typography>
              <Typography
                variant="subtitle2"
                sx={{
                  fontWeight: 'bold',
                  color: 'secondary.main',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 0.5
                }}
              >
                <Icon icon="solar:calculator-bold-duotone" width={14} />
                {formatCurrency(groupSum)}
              </Typography>
            </Box>
          );
        }
      },
      {
        accessorKey: 'marketValueDiff',
        header: 'Market Value Diff',
        size: 260,
        Cell: ({ cell }) => {
          const value = cell.getValue();
          const isPositive = value > 0;
          const isZero = value === 0;

          return (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              {!isZero && (
                <Icon
                  icon={isPositive ? 'solar:arrow-up-bold-duotone' : 'solar:arrow-down-bold-duotone'}
                  width={16}
                  style={{ color: getDiffColor(value) }}
                />
              )}
              <Typography
                variant="body2"
                sx={{
                  color: getDiffColor(value),
                  fontWeight: 'bold',
                  fontFamily: 'monospace'
                }}
              >
                {formatNumber(value)}
              </Typography>
            </Box>
          );
        },
        Footer: () => (
          <Box
            sx={{
              p: 1,
              backgroundColor: totalDiff >= 0 ? 'success.lighter' : 'error.lighter',
              borderRadius: 1,
              border: `1px solid ${totalDiff >= 0 ? theme.palette.success.light : theme.palette.error.light}`
            }}
          >
            <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.7rem' }}>
              Total Market Value Diff
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              {totalDiff !== 0 && (
                <Icon
                  icon={totalDiff > 0 ? 'solar:arrow-up-bold-duotone' : 'solar:arrow-down-bold-duotone'}
                  width={14}
                  style={{ color: getDiffColor(totalDiff) }}
                />
              )}
              <Typography
                variant="subtitle2"
                sx={{
                  color: getDiffColor(totalDiff),
                  fontWeight: 'bold',
                  fontFamily: 'monospace'
                }}
              >
                {formatCurrency(Math.abs(totalDiff))}
              </Typography>
            </Box>
          </Box>
        ),
        // AggregatedCell for Market Value Difference
        AggregatedCell: ({ cell, table }) => {
          const groupSum = table.getRowModel().rows.reduce((sum, row) => sum + (row.original.marketValueDiff || 0), 0);
          const groupName = table.getColumn(cell.row.groupingColumnId ?? '').columnDef.header;

          return (
            <Box
              sx={{
                p: 1,
                backgroundColor: groupSum >= 0 ? 'success.50' : 'error.50',
                borderRadius: 1
              }}
            >
              <Typography variant="caption" color="text.secondary">
                Total Diff {groupName}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                {groupSum !== 0 && (
                  <Icon
                    icon={groupSum > 0 ? 'solar:arrow-up-bold-duotone' : 'solar:arrow-down-bold-duotone'}
                    width={14}
                    style={{ color: getDiffColor(groupSum) }}
                  />
                )}
                <Typography
                  variant="subtitle2"
                  sx={{
                    color: getDiffColor(groupSum),
                    fontWeight: 'bold',
                    fontFamily: 'monospace'
                  }}
                >
                  {formatCurrency(Math.abs(groupSum))}
                </Typography>
              </Box>
            </Box>
          );
        }
      }
    ],
    [getDiffColor, totalAPXValue, totalBrokerValue, totalDiff, data.length, theme.palette]
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
    manualSorting: true,
    enableStickyHeader: true,
    enableStickyFooter: true,

    // Enable footer
    enableColumnFooters: true,
    // Enable grouping for AggregatedCell functionality
    enableGrouping: true,
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

  return (
    <MainCard sx={{ m: 0, p: 2 }} contentSX={{ p: '0 !important', m: '0 !important' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: 1 }}>
          <Icon icon="solar:layers-bold-duotone" width={24} />
          Asset Class Summary
        </Typography>
        <Stack direction="row" spacing={1}>
          <Chip
            label={`${data.length} Classes`}
            size="small"
            variant="outlined"
            icon={<Icon icon="solar:document-text-bold-duotone" width={16} />}
          />
          <Chip label={portfolioCode} size="small" color="secondary" />
        </Stack>
      </Box>

      {/* Summary Cards */}
      {/* <Box sx={{ mb: 3 }}>
        <Stack direction="row" spacing={2}>
          <Box
            sx={{
              p: 2,
              bgcolor: 'grey.100',
              borderRadius: 1,
              flex: 1,
              border: `1px solid ${theme.palette.grey[200]}`
            }}
          >
            <Typography variant="caption" color="text.secondary">
              APX Total
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: 600, color: 'primary.main' }}>
              {formatCurrency(totalAPXValue)}
            </Typography>
          </Box>
          <Box
            sx={{
              p: 2,
              bgcolor: 'secondary.100',
              borderRadius: 1,
              flex: 1,
              border: `1px solid ${theme.palette.secondary.light}`
            }}
          >
            <Typography variant="caption" color="text.secondary">
              Broker Total
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: 600, color: 'secondary.dark' }}>
              {formatCurrency(totalBrokerValue)}
            </Typography>
          </Box>
          <Box
            sx={{
              p: 2,
              bgcolor: totalDiff >= 0 ? 'success.lighter' : 'error.lighter',
              borderRadius: 1,
              flex: 1,
              border: `1px solid ${totalDiff >= 0 ? theme.palette.success.light : theme.palette.error.light}`
            }}
          >
            <Typography variant="caption" color="text.secondary">
              Total Difference
            </Typography>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
                color: totalDiff >= 0 ? 'success.main' : 'error.main',
                display: 'flex',
                alignItems: 'center',
                gap: 0.5
              }}
            >
              <Icon
                icon={totalDiff >= 0 ? 'solar:arrow-up-bold-duotone' : 'solar:arrow-down-bold-duotone'}
                width={16}
              />
              {formatCurrency(Math.abs(totalDiff))}
            </Typography>
          </Box>
        </Stack>
      </Box> */}

      <Divider sx={{ my: 2, borderColor: 'divider' }} />
      <ReusableTable tableProps={tableProps} />
    </MainCard>
  );
};

PortfolioTable.propTypes = {
  data: PropTypes.array,
  portfolioCode: PropTypes.string
};

PortfolioTable.defaultProps = {
  data: []
};

export default PortfolioTable;
