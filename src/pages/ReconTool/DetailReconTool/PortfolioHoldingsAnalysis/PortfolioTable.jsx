import { Icon } from '@iconify/react';
import { Box, Chip, Stack, Typography, useTheme } from '@mui/material';
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

  // Format currency using SAR
  const formatCurrency = (value) => {
    if (value === null || value === undefined) return 'N/A';
    return new Intl.NumberFormat('en-SA', {
      style: 'currency',
      currency: 'SAR',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value);
  };

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

  // Calculate totals
  const totals = useMemo(() => {
    const apxTotal = data.reduce((sum, row) => sum + (row.apxMarketValue || 0), 0);
    const brokerTotal = data.reduce((sum, row) => sum + (row.brokerMarketValue || 0), 0);
    const diffTotal = data.reduce((sum, row) => sum + (row.marketValueDiff || 0), 0);
    return { apxTotal, brokerTotal, diffTotal };
  }, [data]);

  const columns = useMemo(
    () => [
      {
        accessorKey: 'portfolioCode',
        header: '📊 Portfolio Code',
        size: 250,
        enableGrouping: true,
        Cell: ({ cell }) => (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Icon icon="solar:folder-bold-duotone" width={16} style={{ color: theme.palette.secondary.main }} />
            <Typography variant="body2" sx={{ fontWeight: 600, fontFamily: 'monospace', color: 'primary.main' }}>
              {cell.getValue() || 'N/A'}
            </Typography>
          </Box>
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
              {cell.getValue()} ({table.getRowModel().rows.length} items)
            </Typography>
          </Box>
        )
      },
      {
        accessorKey: 'assetClass',
        header: '🏷️ Asset Class Type',
        size: 250,
        enableGrouping: true,
        Cell: ({ cell }) => {
          const value = cell.getValue();
          const isCash = value && value.toLowerCase().includes('cash');
          return (
            <Chip
              label={value || 'N/A'}
              variant="outlined"
              size="small"
              sx={{
                backgroundColor: isCash ? 'success.lighter' : 'secondary.lighter',
                color: isCash ? 'success.main' : 'secondary.main',
                borderColor: isCash ? 'success.main' : 'secondary.main',
                fontWeight: 600
              }}
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
            variant="filled"
            size="small"
            sx={{
              backgroundColor: 'secondary.main',
              color: 'primary.contrastText',
              fontWeight: 600
            }}
            icon={<Icon icon="solar:layers-bold-duotone" width={16} />}
          />
        ),
        AggregatedCell: ({ cell, table }) => (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, py: 1 }}>
            <Chip
              label={`${cell.getValue()} (${table.getRowModel().rows.length})`}
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
        accessorKey: 'apxMarketValue',
        header: '💼 APX Market Value (SAR)',
        size: 250,
        Cell: ({ cell }) => (
          <Typography variant="body2" sx={{ fontWeight: 600, fontFamily: 'monospace' }}>
            {formatCurrency(cell.getValue())}
          </Typography>
        ),
        Footer: () => (
          <Box
            sx={{
              p: 1,
              backgroundColor: 'primary.lighter',
              borderRadius: 1,
              border: `1px solid ${theme.palette.primary.main}`
            }}
          >
            <Typography variant="caption" color="primary.main" sx={{ fontSize: '0.7rem', fontWeight: 600 }}>
              Total APX Value
            </Typography>
            <Typography
              variant="subtitle2"
              sx={{
                fontWeight: 'bold',
                color: 'primary.main',
                display: 'flex',
                alignItems: 'center',
                gap: 0.5,
                fontFamily: 'monospace'
              }}
            >
              <Icon icon="solar:chart-square-bold-duotone" width={14} />
              {formatCurrency(totals.apxTotal)}
            </Typography>
          </Box>
        ),
        AggregatedCell: ({ table }) => {
          const groupSum = table.getRowModel().rows.reduce((sum, row) => sum + (row.original.apxMarketValue || 0), 0);
          return (
            <Box sx={{ p: 1, backgroundColor: 'primary.50', borderRadius: 1 }}>
              <Typography variant="caption" color="primary.main" sx={{ fontWeight: 600 }}>
                Group Total APX
              </Typography>
              <Typography
                variant="subtitle2"
                sx={{
                  fontWeight: 'bold',
                  color: 'primary.main',
                  fontFamily: 'monospace'
                }}
              >
                {formatCurrency(groupSum)}
              </Typography>
            </Box>
          );
        }
      },
      {
        accessorKey: 'brokerMarketValue',
        header: '🏦 Broker Market Value (SAR)',
        size: 250,
        Cell: ({ cell }) => (
          <Typography variant="body2" sx={{ fontWeight: 600, fontFamily: 'monospace' }}>
            {formatCurrency(cell.getValue())}
          </Typography>
        ),
        Footer: () => (
          <Box
            sx={{
              p: 1,
              backgroundColor: 'tertiary.lighter',
              borderRadius: 1,
              border: `1px solid ${theme.palette.tertiary?.main || theme.palette.grey[500]}`
            }}
          >
            <Typography variant="caption" color="tertiary.main" sx={{ fontSize: '0.7rem', fontWeight: 600 }}>
              Total Broker Value
            </Typography>
            <Typography
              variant="subtitle2"
              sx={{
                fontWeight: 'bold',
                color: 'tertiary.main',
                display: 'flex',
                alignItems: 'center',
                gap: 0.5,
                fontFamily: 'monospace'
              }}
            >
              <Icon icon="solar:wallet-money-bold-duotone" width={14} />
              {formatCurrency(totals.brokerTotal)}
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
                Group Total Broker
              </Typography>
              <Typography
                variant="subtitle2"
                sx={{
                  fontWeight: 'bold',
                  color: 'tertiary.main',
                  fontFamily: 'monospace'
                }}
              >
                {formatCurrency(groupSum)}
              </Typography>
            </Box>
          );
        }
      },
      {
        accessorKey: 'marketValueDiff',
        header: '⚖️ Market Value Difference (SAR)',
        size: 280,
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
                {formatCurrency(value)}
              </Typography>
            </Box>
          );
        },
        Footer: () => (
          <Box
            sx={{
              p: 1,
              backgroundColor: totals.diffTotal >= 0 ? 'success.lighter' : 'error.lighter',
              borderRadius: 1,
              border: `1px solid ${totals.diffTotal >= 0 ? theme.palette.success.main : theme.palette.error.main}`
            }}
          >
            <Typography variant="caption" sx={{ fontSize: '0.7rem', fontWeight: 600 }}>
              Total Difference
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              {totals.diffTotal !== 0 && (
                <Icon
                  icon={totals.diffTotal > 0 ? 'solar:arrow-up-bold-duotone' : 'solar:arrow-down-bold-duotone'}
                  width={14}
                  style={{ color: getDiffColor(totals.diffTotal) }}
                />
              )}
              <Typography
                variant="subtitle2"
                sx={{
                  color: getDiffColor(totals.diffTotal),
                  fontWeight: 'bold',
                  fontFamily: 'monospace'
                }}
              >
                {formatCurrency(Math.abs(totals.diffTotal))}
              </Typography>
            </Box>
          </Box>
        ),
        AggregatedCell: ({ table }) => {
          const groupSum = table.getRowModel().rows.reduce((sum, row) => sum + (row.original.marketValueDiff || 0), 0);
          return (
            <Box
              sx={{
                p: 1,
                backgroundColor: groupSum >= 0 ? 'success.50' : 'error.50',
                borderRadius: 1
              }}
            >
              <Typography variant="caption" sx={{ fontWeight: 600 }}>
                Group Difference
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
      }
    ],
    [theme.palette, totals, data.length, getDiffColor]
  );

  const tableProps = {
    columns,
    data,
    initialState: {
      density: 'compact',
      pagination: { pageSize: 10, pageIndex: 0 },
      showColumnFilters: true,
      showGlobalFilter: true
    },
    enableRowSelection: false,
    enableColumnFooters: true,
    enableGrouping: true,
    enableSorting: true,
    enableFiltering: true
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
        p: 2
      }}
      contentSX={{ p: '0 !important', m: '0 !important' }}
      title={
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
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
            <Icon icon="solar:layers-bold-duotone" width={24} style={{ color: theme.palette.secondary.main }} />
            Asset Class Summary - Reconciliation View
          </Typography>
          <Stack direction="row" spacing={1} alignItems="center">
            <Chip
              label={`${data.length} Classes`}
              size="small"
              variant="outlined"
              icon={<Icon icon="solar:document-text-bold-duotone" width={16} />}
            />
            <Chip label={portfolioCode || 'All Portfolios'} size="small" />
          </Stack>
        </Box>
      }
    >
      <ReusableTable tableProps={tableProps} />
    </MainCard>
  );
};

PortfolioTable.propTypes = {
  data: PropTypes.array,
  portfolioCode: PropTypes.string
};

PortfolioTable.defaultProps = {
  data: [],
  portfolioCode: null
};

export default PortfolioTable;
