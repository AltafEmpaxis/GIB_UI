import { Icon } from '@iconify/react';
import { Alert, Box, Chip, Divider, Stack, Typography, useTheme } from '@mui/material';
import MainCard from 'components/MainCard';
import ReusableTable from 'components/Table/ReusableTable';
import PropTypes from 'prop-types';
import { useCallback, useMemo } from 'react';

// Reconciliation configuration - standardized across all components
const RECONCILIATION_CONFIG = {
  THRESHOLD: 1.0, // SAR - difference threshold for reconciliation
  TOLERANCE: 0.01 // Tolerance for rounding errors
};

const PortfolioTableGroup = ({ data: propData, portfolioCode }) => {
  const theme = useTheme();

  // Use provided data or empty array
  const data = useMemo(() => {
    return Array.isArray(propData) ? propData : [];
  }, [propData]);

  // Format number - simplified logic
  const formatNumber = useCallback((value, assetClass) => {
    if (value === null || value === undefined) return assetClass === 'Cash' ? '' : 'N/A';
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value);
  }, []);

  // Format integer quantities
  const formatInteger = useCallback((value, assetClass) => {
    if (value === null || value === undefined) return assetClass === 'Cash' ? '' : 'N/A';
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  }, []);

  // Format currency using SAR
  const formatCurrency = useCallback((value) => {
    if (value === null || value === undefined) return 'N/A';
    return new Intl.NumberFormat('en-SA', {
      style: 'currency',
      currency: 'SAR',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value);
  }, []);

  // Get color for difference values - using GIB theme colors
  const getDiffColor = useCallback(
    (value) => {
      if (value === null || value === undefined) return theme.palette.primary.main;
      if (value > 0) return theme.palette.success.main;
      if (value < 0) return theme.palette.error.main;
      return theme.palette.primary.main;
    },
    [theme.palette]
  );

  // Format difference with proper sign
  const formatDiff = useCallback((value, isInteger = false) => {
    if (value === null || value === undefined) return '';
    const sign = value > 0 ? '+' : value < 0 ? '−' : '';
    const formattedValue = isInteger
      ? new Intl.NumberFormat('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(Math.abs(value))
      : new Intl.NumberFormat('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(Math.abs(value));
    return sign + formattedValue;
  }, []);

  // Calculate totals and reconciliation stats - simplified
  const totals = useMemo(() => {
    const apxQty = data.reduce((sum, row) => sum + (row.apxQuantity || 0), 0);
    const brokerQty = data.reduce((sum, row) => sum + (row.brokerQuantity || 0), 0);
    const qtyDiff = data.reduce((sum, row) => sum + (row.qtyDiff || 0), 0);
    const apxMarketValue = data.reduce((sum, row) => sum + (row.apxMarketValue || 0), 0);
    const brokerMarketValue = data.reduce((sum, row) => sum + (row.brokerMarketValue || 0), 0);
    const marketValueDiff = data.reduce((sum, row) => sum + (row.marketValueDiff || 0), 0);

    // Calculate reconciliation statistics
    const positionsWithDifferences = data.filter(
      (row) => Math.abs(row.marketValueDiff || 0) >= RECONCILIATION_CONFIG.THRESHOLD
    ).length;
    const reconciledPositions = data.length - positionsWithDifferences;
    const reconciliationRate = data.length > 0 ? ((reconciledPositions / data.length) * 100).toFixed(1) : 100;

    // Calculate averages for prices (excluding null/undefined values)
    const validAPXPrices = data.filter((row) => row.apxPrice !== null && row.apxPrice !== undefined);
    const validBrokerPrices = data.filter((row) => row.brokerPrice !== null && row.brokerPrice !== undefined);
    const validPriceDiffs = data.filter((row) => row.priceDiff !== null && row.priceDiff !== undefined);

    const avgAPXPrice =
      validAPXPrices.length > 0
        ? validAPXPrices.reduce((sum, row) => sum + row.apxPrice, 0) / validAPXPrices.length
        : 0;
    const avgBrokerPrice =
      validBrokerPrices.length > 0
        ? validBrokerPrices.reduce((sum, row) => sum + row.brokerPrice, 0) / validBrokerPrices.length
        : 0;
    const avgPriceDiff =
      validPriceDiffs.length > 0
        ? validPriceDiffs.reduce((sum, row) => sum + row.priceDiff, 0) / validPriceDiffs.length
        : 0;

    return {
      apxQty,
      brokerQty,
      qtyDiff,
      apxMarketValue,
      brokerMarketValue,
      marketValueDiff,
      avgAPXPrice,
      avgBrokerPrice,
      avgPriceDiff,
      positionsWithDifferences,
      reconciledPositions,
      reconciliationRate
    };
  }, [data]);

  const columns = useMemo(
    () => [
      {
        accessorKey: 'portfolioCode',
        header: 'Portfolio Code',
        size: 300,
        enableGrouping: true,
        enableSorting: true,
        Cell: ({ cell }) => (
          <Typography variant="body2" sx={{ fontWeight: 600, fontFamily: 'monospace', color: 'primary.main' }}>
            {cell.getValue() || 'N/A'}
          </Typography>
        ),
        Footer: () => (
          <Typography
            variant="subtitle2"
            sx={{
              fontWeight: 'bold',
              color: 'primary.main',
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
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, py: 1 }}>
            <Icon icon="solar:folder-bold-duotone" width={16} style={{ color: theme.palette.secondary.main }} />
            <Typography variant="subtitle2" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
              {cell.getValue()} ({table.getRowModel().rows.length} positions)
            </Typography>
          </Box>
        )
      },
      {
        accessorKey: 'assetClass',
        header: 'Asset Class',
        size: 300,
        enableGrouping: true,
        enableSorting: true,
        Cell: ({ cell }) => {
          const value = cell.getValue();
          const isCash = value && value.toLowerCase().includes('cash');
          return value ? (
            <Chip
              label={value}
              variant="outlined"
              size="small"
              sx={{
                backgroundColor: isCash ? 'success.lighter' : 'secondary.lighter',
                color: isCash ? 'success.main' : 'secondary.main',
                borderColor: isCash ? 'success.main' : 'secondary.main',
                fontWeight: 600,
                fontSize: '0.75rem'
              }}
              icon={
                <Icon
                  icon={isCash ? 'solar:wallet-money-bold-duotone' : 'solar:chart-square-bold-duotone'}
                  width={14}
                />
              }
            />
          ) : (
            <Typography variant="caption" color="tertiary.main">
              N/A
            </Typography>
          );
        },
        Footer: () => (
          <Chip
            label={`${data.length} Positions`}
            variant="filled"
            size="small"
            sx={{
              backgroundColor: 'secondary.main',
              color: 'primary.contrastText',
              fontWeight: 600
            }}
            icon={<Icon icon="solar:chart-square-bold-duotone" width={16} />}
          />
        ),
        AggregatedCell: ({ cell, table }) => (
          <Box>
            <Chip
              label={`${cell.getValue() || 'N/A'} (${table.getRowModel().rows.length})`}
              variant="filled"
              size="small"
              sx={{
                backgroundColor: 'secondary.main',
                color: 'primary.contrastText',
                fontWeight: 600
              }}
              icon={<Icon icon="solar:layers-bold-duotone" width={16} />}
            />
          </Box>
        )
      },
      {
        accessorKey: 'symbol',
        header: 'Security Symbol',
        size: 300,
        enableSorting: true,
        Cell: ({ cell }) => (
          <Typography variant="body2" sx={{ fontWeight: 600, fontFamily: 'monospace', color: 'primary.main' }}>
            {cell.getValue() || 'N/A'}
          </Typography>
        ),
        Footer: () => null,
        AggregatedCell: ({ table }) => (
          <Typography variant="body2" sx={{ fontStyle: 'italic', color: 'tertiary.main', fontWeight: 600 }}>
            {table.getRowModel().rows.length} securities
          </Typography>
        )
      },
      {
        accessorKey: 'secType',
        header: 'Sec Type',
        size: 300,
        enableSorting: true,
        Cell: ({ cell }) => {
          const value = cell.getValue();
          return value ? (
            <Chip
              label={value.toUpperCase()}
              size="small"
              variant="outlined"
              sx={{
                borderColor: 'tertiary.main',
                color: 'tertiary.main',
                fontWeight: 600,
                fontSize: '0.7rem'
              }}
            />
          ) : (
            <Typography variant="caption" color="tertiary.main">
              N/A
            </Typography>
          );
        },
        Footer: () => null,
        AggregatedCell: ({ table }) => (
          <Chip
            label={`${table.getRowModel().rows.length} types`}
            size="small"
            variant="outlined"
            sx={{
              borderColor: 'tertiary.main',
              color: 'tertiary.main',
              fontWeight: 600
            }}
          />
        )
      },
      {
        accessorKey: 'securityName',
        header: 'Security Name',
        size: 300,
        enableSorting: true,
        Cell: ({ cell }) => (
          <Typography
            variant="body2"
            sx={{
              color: 'text.primary',
              fontSize: '0.8rem',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap'
            }}
          >
            {cell.getValue() || 'N/A'}
          </Typography>
        ),
        Footer: () => null,
        AggregatedCell: ({ table }) => (
          <Typography variant="body2" sx={{ fontStyle: 'italic', color: 'tertiary.main', fontWeight: 600 }}>
            {table.getRowModel().rows.length} securities
          </Typography>
        )
      },
      {
        accessorKey: 'apxQuantity',
        header: 'APX Quantity',
        size: 300,
        enableSorting: true,
        Cell: ({ cell, row }) => (
          <Typography variant="body2" sx={{ fontWeight: 600, fontFamily: 'monospace' }}>
            {formatInteger(cell.getValue(), row.original.assetClass)}
          </Typography>
        ),
        Footer: () => (
          <Box sx={{ p: 1, backgroundColor: 'primary.lighter', borderRadius: 1 }}>
            <Typography variant="caption" color="primary.main" sx={{ fontSize: '0.7rem', fontWeight: 600 }}>
              Total APX Qty
            </Typography>
            <Typography variant="subtitle2" sx={{ fontWeight: 'bold', color: 'primary.main', fontFamily: 'monospace' }}>
              {formatInteger(totals.apxQty)}
            </Typography>
          </Box>
        ),
        AggregatedCell: ({ table }) => {
          const groupSum = table.getRowModel().rows.reduce((sum, row) => sum + (row.original.apxQuantity || 0), 0);
          return (
            <Box sx={{ p: 1, backgroundColor: 'primary.50', borderRadius: 1 }}>
              <Typography variant="caption" color="primary.main" sx={{ fontWeight: 600 }}>
                Group Total
              </Typography>
              <Typography
                variant="subtitle2"
                sx={{ fontWeight: 'bold', color: 'primary.main', fontFamily: 'monospace' }}
              >
                {formatInteger(groupSum)}
              </Typography>
            </Box>
          );
        }
      },
      {
        accessorKey: 'brokerQuantity',
        header: 'Broker Quantity',
        size: 300,
        enableSorting: true,
        Cell: ({ cell, row }) => (
          <Typography variant="body2" sx={{ fontWeight: 600, fontFamily: 'monospace' }}>
            {formatInteger(cell.getValue(), row.original.assetClass)}
          </Typography>
        ),
        Footer: () => (
          <Box sx={{ p: 1, backgroundColor: 'tertiary.lighter', borderRadius: 1 }}>
            <Typography variant="caption" color="tertiary.main" sx={{ fontSize: '0.7rem', fontWeight: 600 }}>
              Total Broker Qty
            </Typography>
            <Typography
              variant="subtitle2"
              sx={{ fontWeight: 'bold', color: 'tertiary.main', fontFamily: 'monospace' }}
            >
              {formatInteger(totals.brokerQty)}
            </Typography>
          </Box>
        ),
        AggregatedCell: ({ table }) => {
          const groupSum = table.getRowModel().rows.reduce((sum, row) => sum + (row.original.brokerQuantity || 0), 0);
          return (
            <Box sx={{ p: 1, backgroundColor: 'tertiary.50', borderRadius: 1 }}>
              <Typography variant="caption" color="tertiary.main" sx={{ fontWeight: 600 }}>
                Group Total
              </Typography>
              <Typography
                variant="subtitle2"
                sx={{ fontWeight: 'bold', color: 'tertiary.main', fontFamily: 'monospace' }}
              >
                {formatInteger(groupSum)}
              </Typography>
            </Box>
          );
        }
      },
      {
        accessorKey: 'qtyDiff',
        header: 'Quantity Difference',
        size: 300,
        enableSorting: true,
        Cell: ({ cell }) => {
          const value = cell.getValue();
          return (
            <Typography
              variant="body2"
              sx={{
                color: getDiffColor(value),
                fontWeight: 'bold',
                fontFamily: 'monospace'
              }}
            >
              {value === null || value === undefined ? '' : formatDiff(value, true)}
            </Typography>
          );
        },
        Footer: () => (
          <Box
            sx={{ p: 1, backgroundColor: totals.qtyDiff >= 0 ? 'success.lighter' : 'error.lighter', borderRadius: 1 }}
          >
            <Typography variant="caption" sx={{ fontSize: '0.7rem', fontWeight: 600 }}>
              Total Qty Diff
            </Typography>
            <Typography
              variant="subtitle2"
              sx={{
                fontWeight: 'bold',
                color: getDiffColor(totals.qtyDiff),
                fontFamily: 'monospace'
              }}
            >
              {formatDiff(totals.qtyDiff, true)}
            </Typography>
          </Box>
        ),
        AggregatedCell: ({ table }) => {
          const groupSum = table.getRowModel().rows.reduce((sum, row) => sum + (row.original.qtyDiff || 0), 0);
          return (
            <Box sx={{ p: 1, backgroundColor: groupSum >= 0 ? 'success.50' : 'error.50', borderRadius: 1 }}>
              <Typography variant="caption" sx={{ fontWeight: 600 }}>
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
        size: 300,
        enableSorting: true,
        Cell: ({ cell }) => (
          <Typography variant="body2" sx={{ fontWeight: 600, fontFamily: 'monospace' }}>
            {formatCurrency(cell.getValue())}
          </Typography>
        ),
        Footer: () => (
          <Box sx={{ p: 1, backgroundColor: 'primary.lighter', borderRadius: 1 }}>
            <Typography variant="caption" color="primary.main" sx={{ fontSize: '0.7rem', fontWeight: 600 }}>
              Total APX Value
            </Typography>
            <Typography variant="subtitle2" sx={{ fontWeight: 'bold', color: 'primary.main', fontFamily: 'monospace' }}>
              {formatCurrency(totals.apxMarketValue)}
            </Typography>
          </Box>
        ),
        AggregatedCell: ({ table }) => {
          const groupSum = table.getRowModel().rows.reduce((sum, row) => sum + (row.original.apxMarketValue || 0), 0);
          return (
            <Box sx={{ p: 1, backgroundColor: 'primary.50', borderRadius: 1 }}>
              <Typography variant="caption" color="primary.main" sx={{ fontWeight: 600 }}>
                Group Total
              </Typography>
              <Typography
                variant="subtitle2"
                sx={{ fontWeight: 'bold', color: 'primary.main', fontFamily: 'monospace' }}
              >
                {formatCurrency(groupSum)}
              </Typography>
            </Box>
          );
        }
      },
      {
        accessorKey: 'brokerMarketValue',
        header: 'Broker Market Value',
        size: 350,
        enableSorting: true,
        Cell: ({ cell }) => (
          <Typography variant="body2" sx={{ fontWeight: 600, fontFamily: 'monospace' }}>
            {formatCurrency(cell.getValue())}
          </Typography>
        ),
        Footer: () => (
          <Box sx={{ p: 1, backgroundColor: 'tertiary.lighter', borderRadius: 1 }}>
            <Typography variant="caption" color="tertiary.main" sx={{ fontSize: '0.7rem', fontWeight: 600 }}>
              Total Broker Value
            </Typography>
            <Typography
              variant="subtitle2"
              sx={{ fontWeight: 'bold', color: 'tertiary.main', fontFamily: 'monospace' }}
            >
              {formatCurrency(totals.brokerMarketValue)}
            </Typography>
          </Box>
        ),
        AggregatedCell: ({ table }) => {
          const groupSum = table
            .getRowModel()
            .rows.reduce((sum, row) => sum + (row.original.brokerMarketValue || 0), 0);
          return (
            <Box sx={{ p: 1, backgroundColor: 'tertiary.50', borderRadius: 1 }}>
              <Typography variant="caption" color="tertiary.main" sx={{ fontWeight: 600 }}>
                Group Total
              </Typography>
              <Typography
                variant="subtitle2"
                sx={{ fontWeight: 'bold', color: 'tertiary.main', fontFamily: 'monospace' }}
              >
                {formatCurrency(groupSum)}
              </Typography>
            </Box>
          );
        }
      },
      {
        accessorKey: 'marketValueDiff',
        header: 'Market Value Difference',
        size: 350,
        enableSorting: true,
        enableColumnFilter: true,
        filterVariant: 'text', // Use text filter for custom filtering
        filterFn: 'notEquals', // Set filter function to notEquals
        Cell: ({ cell }) => {
          const value = cell.getValue();
          return (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Icon
                icon={
                  value > 0
                    ? 'solar:arrow-up-bold-duotone'
                    : value < 0
                      ? 'solar:arrow-down-bold-duotone'
                      : 'solar:minus-circle-bold-duotone'
                }
                width={14}
                style={{ color: getDiffColor(value) }}
              />
              <Typography
                variant="body2"
                sx={{
                  color: getDiffColor(value),
                  fontWeight: 'bold',
                  fontFamily: 'monospace'
                }}
              >
                {value === null || value === undefined ? 'N/A' : formatCurrency(value)}
              </Typography>
            </Box>
          );
        },
        Footer: () => (
          <Box
            sx={{
              p: 1,
              backgroundColor: totals.marketValueDiff >= 0 ? 'success.lighter' : 'error.lighter',
              borderRadius: 1
            }}
          >
            <Typography variant="caption" sx={{ fontSize: '0.7rem', fontWeight: 600 }}>
              Total Value Diff
            </Typography>
            <Typography
              variant="subtitle2"
              sx={{
                fontWeight: 'bold',
                color: getDiffColor(totals.marketValueDiff),
                fontFamily: 'monospace'
              }}
            >
              {formatCurrency(Math.abs(totals.marketValueDiff))}
            </Typography>
          </Box>
        ),
        AggregatedCell: ({ table }) => {
          const groupSum = table.getRowModel().rows.reduce((sum, row) => sum + (row.original.marketValueDiff || 0), 0);
          return (
            <Box sx={{ p: 1, backgroundColor: groupSum >= 0 ? 'success.50' : 'error.50', borderRadius: 1 }}>
              <Typography variant="caption" sx={{ fontWeight: 600 }}>
                Group Diff
              </Typography>
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
          );
        }
      },
      {
        accessorKey: 'apxPrice',
        header: 'APX Price',
        size: 350,
        enableSorting: true,
        Cell: ({ cell, row }) => formatNumber(cell.getValue(), row.original.assetClass),
        Footer: () => (
          <Box sx={{ p: 1, backgroundColor: 'info.lighter', borderRadius: 1 }}>
            <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.7rem' }}>
              Avg APX Price
            </Typography>
            <Typography variant="subtitle2" sx={{ fontWeight: 'bold', color: 'info.main' }}>
              {formatNumber(totals.avgAPXPrice)}
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
        size: 350,
        enableSorting: true,
        Cell: ({ cell, row }) => formatNumber(cell.getValue(), row.original.assetClass),
        Footer: () => (
          <Box sx={{ p: 1, backgroundColor: 'warning.lighter', borderRadius: 1 }}>
            <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.7rem' }}>
              Avg Broker Price
            </Typography>
            <Typography variant="subtitle2" sx={{ fontWeight: 'bold', color: 'warning.main' }}>
              {formatNumber(totals.avgBrokerPrice)}
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
        size: 350,
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
              backgroundColor: totals.avgPriceDiff >= 0 ? 'success.lighter' : 'error.lighter',
              borderRadius: 1
            }}
          >
            <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.7rem' }}>
              Avg Price Diff
            </Typography>
            <Typography
              variant="subtitle2"
              sx={{
                fontWeight: 'bold',
                color: getDiffColor(totals.avgPriceDiff),
                fontFamily: 'monospace'
              }}
            >
              {formatDiff(totals.avgPriceDiff, false)}
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
    [theme.palette, totals, data.length, getDiffColor, formatCurrency, formatNumber, formatInteger, formatDiff]
  );

  const tableProps = {
    columns,
    data,
    enableGrouping: true,
    enableSorting: true,
    enableFiltering: true,
    enableColumnFilters: true,
    enableGlobalFilter: true,
    enableColumnFooters: true,
    initialState: {
      density: 'compact',
      pagination: { pageSize: 15, pageIndex: 0 },
      showColumnFilters: true,
      showGlobalFilter: true,
      grouping: ['portfolioCode'],
      expanded: true,
      columnFilters: [
        {
          id: 'marketValueDiff',
          value: 0 // Filter positions with differences >= threshold
        }
      ]
    },
    state: {
      isLoading: data.length === 0
    }

    // Grouping row styling with GIB theme colors
    // muiTableBodyRowProps: ({ row }) => ({
    //   sx: row.getIsGrouped()
    //     ? {
    //         backgroundColor: 'secondary.50',
    //         fontWeight: 'bold',
    //         '&:hover': {
    //           backgroundColor: 'secondary.100'
    //         }
    //       }
    //     : {
    //         '&:hover': {
    //           backgroundColor: 'action.hover'
    //         }
    //       }
    // })
  };

  return (
    <MainCard
      sx={{
        m: 0,
        mb: 3,
        p: 2,
        border: `1px solid ${theme.palette.secondary.main}`,
        borderRadius: 2
      }}
      contentSX={{ p: '0 !important', m: '0 !important' }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            color: 'primary.main'
          }}
        >
          <Icon icon="solar:document-text-bold-duotone" width={24} style={{ color: theme.palette.secondary.main }} />
          Detailed Position-by-Position Analysis
        </Typography>
        <Stack direction="row" spacing={1}>
          <Chip
            label={`${data.length} Positions`}
            size="small"
            variant="outlined"
            sx={{
              borderColor: 'secondary.main',
              color: 'secondary.main',
              fontWeight: 600
            }}
            icon={<Icon icon="solar:chart-square-bold-duotone" width={16} />}
          />
          <Chip
            label={portfolioCode || 'All Portfolios'}
            size="small"
            sx={{
              backgroundColor: 'secondary.main',
              color: 'primary.contrastText',
              fontWeight: 600
            }}
          />
        </Stack>
      </Box>

      {/* Filter Information Alert */}
      <Alert
        severity="info"
        sx={{
          my: 2,
          '& .MuiAlert-icon': {
            color: theme.palette.secondary.main
          }
        }}
        icon={<Icon icon="solar:filter-bold-duotone" width={20} />}
      >
        <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
          📊 Filtered View: Positions Requiring Review (≥{RECONCILIATION_CONFIG.THRESHOLD} SAR difference)
        </Typography>
        <Typography variant="body2">
          <strong>Showing positions with differences only.</strong> This helps you focus on reconciliation tasks. Clear
          the "Market Value Difference" filter to see all positions including those that match exactly.
        </Typography>
      </Alert>

      {/* Quick Reconciliation Stats */}
      <Box sx={{ mb: 3 }}>
        <Stack direction="row" spacing={2}>
          <Box
            sx={{
              p: 1.5,
              bgcolor: 'error.100',
              borderRadius: 1,
              flex: 1,
              border: '1px solid',
              borderColor: 'error.light'
            }}
          >
            <Stack direction="row" alignItems="center" spacing={1}>
              <Icon icon="solar:danger-circle-bold-duotone" width={20} style={{ color: '#f44336' }} />
              <Box>
                <Typography variant="caption" color="text.secondary">
                  Unreconciled
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: 600, color: 'error.main' }}>
                  {totals.positionsWithDifferences}
                </Typography>
              </Box>
            </Stack>
          </Box>
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
                  {totals.reconciledPositions}
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
              <Icon icon="solar:calculator-bold-duotone" width={20} style={{ color: theme.palette.secondary.main }} />
              <Box>
                <Typography variant="caption" color="text.secondary">
                  Net Difference
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 600,
                    color: getDiffColor(totals.marketValueDiff),
                    fontFamily: 'monospace'
                  }}
                >
                  {formatCurrency(totals.marketValueDiff)}
                </Typography>
              </Box>
            </Stack>
          </Box>
          <Box
            sx={{
              p: 1.5,
              bgcolor: 'info.100',
              borderRadius: 1,
              flex: 1,
              border: '1px solid',
              borderColor: 'info.light'
            }}
          >
            <Stack direction="row" alignItems="center" spacing={1}>
              <Icon icon="solar:chart-2-bold-duotone" width={20} style={{ color: theme.palette.info.main }} />
              <Box>
                <Typography variant="caption" color="text.secondary">
                  Match Rate
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: 600, color: 'info.main' }}>
                  {totals.reconciliationRate}%
                </Typography>
              </Box>
            </Stack>
          </Box>
        </Stack>
      </Box>

      {/* Show Alert if there are unreconciled positions */}
      {totals.positionsWithDifferences > 0 && (
        <Alert
          severity="warning"
          sx={{
            mb: 2,
            '& .MuiAlert-icon': {
              color: '#FFC72C'
            }
          }}
          icon={<Icon icon="solar:danger-triangle-bold-duotone" width={20} />}
        >
          <Typography variant="body2">
            <strong>⚠️ {totals.positionsWithDifferences} Position(s) Require Review</strong>
            <br />
            These positions have differences between APX and Broker systems. Review each position to determine if
            adjustments are needed.
          </Typography>
        </Alert>
      )}

      <Divider sx={{ my: 2, borderColor: 'secondary.main' }} />
      <ReusableTable tableProps={tableProps} />
    </MainCard>
  );
};

PortfolioTableGroup.propTypes = {
  data: PropTypes.array,
  portfolioCode: PropTypes.string
};

PortfolioTableGroup.defaultProps = {
  data: [],
  portfolioCode: null
};

export default PortfolioTableGroup;
