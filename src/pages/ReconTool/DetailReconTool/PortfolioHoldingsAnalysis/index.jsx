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

// Reconciliation configuration
const RECONCILIATION_CONFIG = {
  THRESHOLD: 1.0, // SAR - difference threshold for reconciliation
  TOLERANCE_PERCENTAGE: 0.01 // 1% tolerance for percentage-based reconciliation
};

export default function PortfolioHoldingsAnalysis() {
  const theme = useTheme();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const portfolioCode = searchParams.get('portfolio') || ''; // Default to DPM01
  const status = searchParams.get('status') || '';
  const date = searchParams.get('date') || '';

  // Filter data for the selected portfolio
  const { filteredSummary, filteredGroup, metrics, hasData, portfolioStats, accountStatus } = useMemo(() => {
    const summary = mockData.filter((row) => row.portfolioCode === portfolioCode);
    const group = mockDataGroup.filter((row) => row.portfolioCode === portfolioCode);
    const hasPortfolioData = summary.length > 0 || group.length > 0;

    // **RECONCILIATION LOGIC**: Check total market value differences from summary data
    const totalMarketValueDiff = summary.reduce((sum, item) => sum + (item.marketValueDiff || 0), 0);

    // Portfolio is RECONCILED if total difference is exactly zero (or very close to zero due to rounding)
    const isReconciled = Math.abs(totalMarketValueDiff) < 0.01; // Tolerance for rounding errors

    // Count positions with differences in detailed data for analysis
    const positionsWithDiff = group.filter((row) => Math.abs(row.marketValueDiff || 0) > 0.01).length;

    // Simple account info object based on portfolio data
    const accountInfo = {
      status: isReconciled ? 'reconciled' : 'unreconciled',
      reconciled_by: isReconciled ? 'Auto-reconciled' : '-',
      account_name: `Portfolio ${portfolioCode}`,
      date: new Date().toISOString().split('T')[0],
      total_difference: totalMarketValueDiff,
      positions_with_diff: positionsWithDiff
    };

    // Calculate portfolio metrics
    const totalMarketValue = summary.reduce((sum, row) => sum + (row.apxMarketValue || 0), 0);

    // RECONCILIATION LOGIC BASED ON TOTAL DIFFERENCES
    // 1. Data-level reconciliation: Check total market value difference
    const reconciledPositions = group.length - positionsWithDiff;
    const dataReconciliationRate = group.length > 0 ? ((reconciledPositions / group.length) * 100).toFixed(1) : 100;

    // 2. Account-level reconciliation: Based on total difference being zero
    const isAccountApproved = accountInfo.status === 'reconciled';

    // 3. Overall reconciliation status
    const hasDataDiscrepancies = !isReconciled;
    const isFullyReconciled = isReconciled;

    // 4. Determine final status for display
    let reconciledStatus, statusMessage;
    if (isFullyReconciled) {
      reconciledStatus = 'fully-reconciled';
      statusMessage = 'All positions reconciled - Total difference is zero';
    } else {
      reconciledStatus = 'unreconciled';
      statusMessage = `Portfolio unreconciled - Total difference: ${new Intl.NumberFormat('en-SA', { style: 'currency', currency: 'SAR' }).format(totalMarketValueDiff)}`;
    }

    // Portfolio statistics with clear reconciliation logic
    const stats = {
      totalSecurities: group.length,
      uniqueSecurities: new Set(group.map((row) => row.symbol)).size,
      assetClasses: new Set(summary.map((row) => row.assetClass).filter(Boolean)).size,
      dataReconciliationRate: parseFloat(dataReconciliationRate),
      totalDifference: totalMarketValueDiff,
      reconciledStatus,
      statusMessage,
      positionsWithDifferences: positionsWithDiff,
      reconciledPositions,
      isAccountApproved,
      hasDataDiscrepancies,
      isFullyReconciled
    };

    const formatter = new Intl.NumberFormat('en-SA', { style: 'currency', currency: 'SAR' });

    const calculatedMetrics = [
      {
        title: 'Portfolio Market Value',
        value: formatter.format(totalMarketValue),
        subtitle: `Difference: ${formatter.format(Math.abs(totalMarketValueDiff))}`,
        icon: 'solar:money-bag-bold-duotone',
        color: theme.palette.secondary.main, // GIB Yellow - main brand color
        trend:
          totalMarketValueDiff >= 0
            ? `+${formatter.format(Math.abs(totalMarketValueDiff))}`
            : `-${formatter.format(Math.abs(totalMarketValueDiff))}`
      },
      {
        title: 'Account Status',
        value: isAccountApproved ? 'APPROVED' : 'PENDING',
        subtitle: isAccountApproved ? `Approved by ${accountInfo.reconciled_by}` : 'Awaiting approval',
        icon: isAccountApproved ? 'solar:shield-check-bold-duotone' : 'solar:shield-cross-bold-duotone',
        color: isAccountApproved ? theme.palette.success.main : theme.palette.error.main,
        trend: `Date: ${accountInfo.date}`
      },
      {
        title: 'Data Reconciliation',
        value: `${dataReconciliationRate}%`,
        subtitle: `${reconciledPositions} of ${group.length} positions match`,
        icon: dataReconciliationRate >= 95 ? 'solar:check-circle-bold-duotone' : 'solar:danger-circle-bold-duotone',
        color: dataReconciliationRate >= 95 ? theme.palette.success.main : theme.palette.secondary.main,
        trend: positionsWithDiff > 0 ? `${positionsWithDiff} need review` : 'All positions match'
      },
      {
        title: 'Overall Status',
        value: isFullyReconciled ? 'RECONCILED' : 'PENDING',
        subtitle: statusMessage,
        icon: isFullyReconciled ? 'solar:check-square-bold-duotone' : 'solar:danger-square-bold-duotone',
        color: isFullyReconciled
          ? theme.palette.success.main
          : reconciledStatus === 'data-pending' || reconciledStatus === 'approval-pending'
            ? theme.palette.secondary.main
            : theme.palette.error.main,
        trend: `${accountInfo.account_name}`
      }
    ];

    return {
      filteredSummary: summary,
      filteredGroup: group,
      metrics: calculatedMetrics,
      hasData: hasPortfolioData,
      portfolioStats: stats,
      accountStatus: accountInfo
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

      {/* Clear Status Alerts */}
      {hasData && (
        <>
          {/* Fully Reconciled - Success */}
          {portfolioStats.reconciledStatus === 'fully-reconciled' && (
            <Alert severity="success" sx={{ mb: 2 }} icon={<Icon icon="solar:check-circle-bold-duotone" />}>
              <Typography variant="body2">
                <strong>✅ Fully Reconciled</strong>
                <br />
                Account is approved and all position data matches within tolerance (±{
                  RECONCILIATION_CONFIG.THRESHOLD
                }{' '}
                SAR).
                <br />
                <em>
                  Approved by: {accountStatus.reconciled_by} | Date: {accountStatus.date}
                </em>
              </Typography>
            </Alert>
          )}

          {/* Account Approved but Data Issues - Warning */}
          {portfolioStats.reconciledStatus === 'data-pending' && (
            <Alert severity="warning" sx={{ mb: 2 }} icon={<Icon icon="solar:danger-triangle-bold-duotone" />}>
              <Typography variant="body2">
                <strong>⚠️ Data Review Required</strong>
                <br />
                Account is approved by {accountStatus.reconciled_by}, but {portfolioStats.positionsWithDifferences}{' '}
                positions have differences exceeding {RECONCILIATION_CONFIG.THRESHOLD} SAR.
                <br />
                <em>
                  Data Match Rate: {portfolioStats.dataReconciliationRate}% | Next: Review and resolve position
                  differences
                </em>
              </Typography>
            </Alert>
          )}

          {/* Data Good but Account Not Approved - Info */}
          {portfolioStats.reconciledStatus === 'approval-pending' && (
            <Alert severity="info" sx={{ mb: 2 }} icon={<Icon icon="solar:shield-cross-bold-duotone" />}>
              <Typography variant="body2">
                <strong>📋 Approval Pending</strong>
                <br />
                All position data is reconciled ({portfolioStats.dataReconciliationRate}% match), but account requires
                approval.
                <br />
                <em>Next: Contact reconciliation team for account approval | Last Update: {accountStatus.date}</em>
              </Typography>
            </Alert>
          )}

          {/* Both Account and Data Issues - Error */}
          {portfolioStats.reconciledStatus === 'unreconciled' && (
            <Alert severity="error" sx={{ mb: 2 }} icon={<Icon icon="solar:shield-cross-bold-duotone" />}>
              <Typography variant="body2">
                <strong>❌ Reconciliation Required</strong>
                <br />
                Account approval pending AND {portfolioStats.positionsWithDifferences} positions have data
                discrepancies.
                <br />
                <em>
                  Data Match: {portfolioStats.dataReconciliationRate}% | Next: Resolve data differences, then request
                  approval
                </em>
              </Typography>
            </Alert>
          )}
        </>
      )}

      {/* Header Section */}
      <MainCard
        title={
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography variant="h5" sx={{ fontWeight: 600 }}>
              Portfolio Holdings Analysis
            </Typography>
            <Chip label={portfolioCode} color="secondary" variant="filled" size="small" sx={{ fontWeight: 600 }} />-
            <Chip label={status} color="secondary" variant="outlined" size="small" sx={{ fontWeight: 600 }} />-
            <Chip label={date} color="secondary" variant="outlined" size="small" sx={{ fontWeight: 600 }} />
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
              <>
                <Chip
                  icon={
                    <Icon
                      icon={
                        portfolioStats.isAccountApproved
                          ? 'solar:shield-check-bold-duotone'
                          : 'solar:shield-cross-bold-duotone'
                      }
                      width={16}
                    />
                  }
                  label={portfolioStats.isAccountApproved ? 'Account Approved' : 'Account Pending'}
                  color={portfolioStats.isAccountApproved ? 'success' : 'error'}
                  variant="filled"
                  size="small"
                />
                <Chip
                  icon={
                    <Icon
                      icon={
                        portfolioStats.dataReconciliationRate >= 95
                          ? 'solar:check-circle-bold-duotone'
                          : 'solar:danger-circle-bold-duotone'
                      }
                      width={16}
                    />
                  }
                  label={`${portfolioStats.dataReconciliationRate}% Data Match`}
                  color={portfolioStats.dataReconciliationRate >= 95 ? 'success' : 'secondary'}
                  variant="outlined"
                  size="small"
                />
                <Chip
                  icon={
                    <Icon
                      icon={
                        portfolioStats.isFullyReconciled
                          ? 'solar:check-square-bold-duotone'
                          : 'solar:danger-square-bold-duotone'
                      }
                      width={16}
                    />
                  }
                  label={portfolioStats.isFullyReconciled ? 'Fully Reconciled' : 'Pending'}
                  color={portfolioStats.isFullyReconciled ? 'success' : 'secondary'}
                  variant={portfolioStats.isFullyReconciled ? 'filled' : 'outlined'}
                  size="small"
                />
              </>
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
