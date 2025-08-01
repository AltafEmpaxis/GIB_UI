import { Icon } from '@iconify/react';
import { Alert, Box, Breadcrumbs, Chip, Grid, Link, Stack, Typography, useTheme } from '@mui/material';
import MainCard from 'components/MainCard';
import { useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import MetricCard from '../ReconMetricsCards';
import PortfolioTable from './PortfolioTable';
import PortfolioTableGroup from './PortfolioTableGroup';
import mockData from './mockdata.json';
import mockDataGroup from './mockdataGroup.json';

export default function PortfolioHoldingsAnalysis() {
  const theme = useTheme();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const portfolioCode = searchParams.get('portfolio') || ''; // Default to DPM01

  // Filter data for the selected portfolio
  const { filteredSummary, filteredGroup, metrics, hasData, portfolioStats } = useMemo(() => {
    const summary = mockData.filter((row) => row.portfolioCode === portfolioCode);
    const group = mockDataGroup.filter((row) => row.portfolioCode === portfolioCode);
    const hasPortfolioData = summary.length > 0 || group.length > 0;

    // Calculate advanced metrics
    const totalMarketValue = summary.reduce((sum, row) => sum + (row.apxMarketValue || 0), 0);
    const totalBrokerValue = summary.reduce((sum, row) => sum + (row.brokerMarketValue || 0), 0);
    const totalPositions = group.reduce((sum, row) => sum + (row.apxQuantity || 0), 0);
    const totalCash = summary
      .filter((row) => row.assetClass && row.assetClass.toLowerCase().includes('cash'))
      .reduce((sum, row) => sum + (row.apxMarketValue || 0), 0);
    // Calculate reconciliation status
    const reconciled = group.filter((row) => Math.abs(row.marketValueDiff || 0) < 1).length;
    const unreconciled = group.length - reconciled;
    const reconciliationRate = group.length > 0 ? ((reconciled / group.length) * 100).toFixed(1) : 0;

    // Calculate total differences
    const totalMarketValueDiff = summary.reduce((sum, row) => sum + (row.marketValueDiff || 0), 0);

    // Portfolio statistics
    const stats = {
      totalSecurities: group.length,
      uniqueSecurities: new Set(group.map((row) => row.symbol)).size,
      assetClasses: new Set(summary.map((row) => row.assetClass).filter(Boolean)).size,
      reconciliationRate: parseFloat(reconciliationRate),
      totalDifference: totalMarketValueDiff
    };

    const formatter = new Intl.NumberFormat('en-SA', { style: 'currency', currency: 'SAR' });

    const calculatedMetrics = [
      {
        title: 'Portfolio Market Value',
        value: formatter.format(totalMarketValue),
        subtitle: `APX: ${formatter.format(totalMarketValue)} | Broker: ${formatter.format(totalBrokerValue)}`,
        icon: 'solar:money-bag-bold-duotone',
        color: theme.palette.secondary.main, // GIB Yellow - main brand color
        trend:
          totalMarketValueDiff >= 0
            ? `+${formatter.format(Math.abs(totalMarketValueDiff))}`
            : `-${formatter.format(Math.abs(totalMarketValueDiff))}`
      },
      {
        title: 'Reconciliation Status',
        value: `${reconciliationRate}%`,
        subtitle: `${reconciled} reconciled, ${unreconciled} pending`,
        icon: reconciliationRate > 95 ? 'solar:check-circle-bold-duotone' : 'solar:danger-circle-bold-duotone',
        color: reconciliationRate > 95 ? theme.palette.success.main : theme.palette.secondary.main, // Use GIB Yellow for warnings per guidelines
        trend: `${stats.totalSecurities} positions`
      },
      {
        title: 'Total Positions',
        value: totalPositions.toLocaleString(),
        subtitle: `${stats.uniqueSecurities} unique securities`,
        icon: 'solar:document-text-bold-duotone',
        color: theme.palette.primary.main, // GIB Dark Grey for secondary information
        trend: `${stats.assetClasses} asset classes`
      },
      {
        title: 'Cash Balance',
        value: formatter.format(totalCash),
        subtitle: totalCash >= 0 ? 'Available funds' : 'Overdraft position',
        icon: 'solar:wallet-money-bold-duotone',
        color: totalCash >= 0 ? theme.palette.success.main : theme.palette.error.main,
        trend: `${((totalCash / totalMarketValue) * 100).toFixed(1)}% of portfolio`
      }
    ];

    return {
      filteredSummary: summary,
      filteredGroup: group,
      metrics: calculatedMetrics,
      hasData: hasPortfolioData,
      portfolioStats: stats
    };
  }, [portfolioCode, theme.palette]);

  return (
    <Box sx={{ pt: 2, px: 1 }}>
      {/* Breadcrumb Navigation */}
      <Breadcrumbs sx={{ mb: 2 }}>
        <Link
          color="inherit"
          onClick={() => navigate('/recon-tool')}
          sx={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 0.5 }}
        >
          <Icon icon="solar:home-bold-duotone" width={16} />
          Recon Tool
        </Link>
        <Typography color="text.primary" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <Icon icon="solar:chart-square-bold-duotone" width={16} />
          Portfolio Analysis
        </Typography>
      </Breadcrumbs>

      {/* Status Alert */}
      {hasData && portfolioStats.reconciliationRate < 95 && (
        <Alert severity="warning" sx={{ mb: 3 }} icon={<Icon icon="solar:danger-triangle-bold-duotone" />}>
          <Typography variant="body2">
            <strong>Reconciliation Required:</strong> {portfolioStats.reconciliationRate}% of positions are reconciled.
            {100 - portfolioStats.reconciliationRate}% require attention.
          </Typography>
        </Alert>
      )}

      {/* Header Section */}
      <MainCard
        title={
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography variant="h5" sx={{ fontWeight: 600 }}>
              Portfolio Holdings Analysis
            </Typography>
            <Chip label={portfolioCode} color="secondary" variant="filled" size="small" sx={{ fontWeight: 600 }} />
          </Box>
        }
        secondary={
          <Stack direction="row" spacing={2} alignItems="center">
            <Chip
              icon={<Icon icon="solar:document-text-bold-duotone" width={16} />}
              label={`${filteredGroup.length} Holdings`}
              variant="outlined"
              size="small"
            />
            <Chip
              icon={<Icon icon="solar:layers-bold-duotone" width={16} />}
              label={`${filteredSummary.length} Asset Classes`}
              variant="outlined"
              size="small"
            />
            {hasData && (
              <Chip
                icon={
                  <Icon
                    icon={
                      portfolioStats.reconciliationRate > 95
                        ? 'solar:check-circle-bold-duotone'
                        : 'solar:danger-circle-bold-duotone'
                    }
                    width={16}
                  />
                }
                label={`${portfolioStats.reconciliationRate}% Reconciled`}
                color={portfolioStats.reconciliationRate > 95 ? 'success' : 'secondary'}
                variant="filled"
                size="small"
              />
            )}
          </Stack>
        }
        sx={{ mb: 3 }}
      >
        {/* Metrics Cards Section */}
        <Box sx={{ mb: 0 }}>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 3, color: 'text.primary' }}>
            Portfolio Summary
          </Typography>
          <Grid container spacing={1}>
            {metrics.map((card) => (
              <Grid item xs={12} sm={6} md={3} key={card.title}>
                <MetricCard {...card} />
              </Grid>
            ))}
          </Grid>
        </Box>
      </MainCard>

      {/* Tables Section */}
      {hasData ? (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <PortfolioTableGroup data={filteredGroup} portfolioCode={portfolioCode} />
          <PortfolioTable data={filteredSummary} portfolioCode={portfolioCode} />
        </Box>
      ) : (
        <MainCard sx={{ textAlign: 'center', py: 6 }}>
          <Icon
            icon="solar:folder-open-bold-duotone"
            width={64}
            height={64}
            style={{ color: 'rgba(0,0,0,0.3)', marginBottom: 16 }}
          />
          <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
            No Portfolio Data Found
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            No data available for portfolio <strong>{portfolioCode}</strong>. This could mean the portfolio doesn't
            exist or hasn't been loaded yet.
          </Typography>
          <Stack direction="row" spacing={1} justifyContent="center">
            <Chip
              label="Try a different portfolio"
              variant="outlined"
              size="small"
              onClick={() => navigate('/recon-tool')}
              clickable
            />
          </Stack>
        </MainCard>
      )}
    </Box>
  );
}
