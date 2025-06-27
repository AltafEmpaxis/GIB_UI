import { Icon } from '@iconify/react';
import {
  alpha,
  Avatar,
  Box,
  Button,
  Card,
  CircularProgress,
  Grid,
  IconButton,
  LinearProgress,
  Stack,
  Tooltip,
  Typography,
  useTheme
} from '@mui/material';

const CustodiansSection = ({ isLoading }) => {
  const theme = useTheme();

  // Custodian data
  const custodianData = [
    {
      id: 'albilad',
      name: 'Albilad Account',
      icon: 'mdi:bank',
      color: theme.palette.primary.main,
      totalAccounts: 154,
      reconciledAccounts: 142,
      unreconciledAccounts: 12,
      lastUpdate: '2 hours ago'
    },
    {
      id: 'riyad',
      name: 'Riyad Account',
      icon: 'mdi:city',
      color: theme.palette.secondary.main,
      totalAccounts: 98,
      reconciledAccounts: 87,
      unreconciledAccounts: 11,
      lastUpdate: '5 hours ago'
    },
    {
      id: 'at',
      name: 'At Account',
      icon: 'mdi:office-building',
      color: theme.palette.warning.main,
      totalAccounts: 76,
      reconciledAccounts: 74,
      unreconciledAccounts: 2,
      lastUpdate: 'Yesterday'
    },
    {
      id: 'statestreet',
      name: 'State Street Account',
      icon: 'mdi:domain',
      color: theme.palette.info.main,
      totalAccounts: 56,
      reconciledAccounts: 52,
      unreconciledAccounts: 4,
      lastUpdate: '2 days ago'
    }
  ];

  // This component uses a horizontal card layout with progress indicators
  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <Box
        sx={{
          p: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: `1px solid ${theme.palette.divider}`,
          bgcolor: alpha(theme.palette.background.default, 0.5)
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 600, display: 'flex', alignItems: 'center' }}>
          <Icon icon="solar:chart-line-linear-bold" width={24} style={{ marginRight: 8 }} />
          Custodian Progress Dashboard
        </Typography>
        <Tooltip title="Refresh data">
          <IconButton size="small">
            <Icon icon="solar:refresh-linear" width={20} />
          </IconButton>
        </Tooltip>
      </Box>

      {/* Legend for progress bars */}
      <Box sx={{ px: 2, pt: 1.5, pb: 0.5, display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ width: 12, height: 12, bgcolor: alpha(theme.palette.grey[700], 0.7), borderRadius: 1, mr: 0.5 }} />
          <Typography variant="caption" color="text.secondary">
            Total
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ width: 12, height: 12, bgcolor: theme.palette.success.main, borderRadius: 1, mr: 0.5 }} />
          <Typography variant="caption" color="text.secondary">
            Reconciled
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ width: 12, height: 12, bgcolor: theme.palette.warning.main, borderRadius: 1, mr: 0.5 }} />
          <Typography variant="caption" color="text.secondary">
            Unreconciled
          </Typography>
        </Box>
      </Box>

      {isLoading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', py: 6, flexGrow: 1 }}>
          <CircularProgress size={40} />
        </Box>
      ) : (
        <Box sx={{ p: 2, pt: 0.5, overflow: 'auto', flexGrow: 1 }}>
          <Stack spacing={2}>
            {custodianData.map((custodian) => {
              const reconciledPercent = Math.round((custodian.reconciledAccounts / custodian.totalAccounts) * 100);

              return (
                <Card
                  key={custodian.id}
                  variant="outlined"
                  sx={{
                    borderLeft: `6px solid ${custodian.color}`,
                    boxShadow: theme.shadows[1],
                    '&:hover': {
                      boxShadow: theme.shadows[3],
                      transform: 'translateY(-2px)'
                    },
                    transition: 'all 0.2s ease'
                  }}
                >
                  <Box sx={{ p: 2 }}>
                    <Grid container spacing={2}>
                      {/* Bank name and icon */}
                      <Grid item xs={12} sm={4}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Avatar
                            sx={{
                              bgcolor: alpha(custodian.color, 0.15),
                              color: custodian.color,
                              width: 42,
                              height: 42,
                              mr: 2
                            }}
                          >
                            <Icon icon={custodian.icon} width={24} />
                          </Avatar>
                          <Box>
                            <Typography variant="subtitle1" fontWeight={600}>
                              {custodian.name}
                            </Typography>
                            <Typography
                              variant="caption"
                              color="text.secondary"
                              sx={{ display: 'flex', alignItems: 'center' }}
                            >
                              <Icon icon="solar:clock-circle-linear" width={12} style={{ marginRight: 4 }} />
                              {custodian.lastUpdate}
                            </Typography>
                          </Box>
                        </Box>
                      </Grid>

                      {/* Progress bars */}
                      <Grid item xs={12} sm={5}>
                        <Box>
                          <Box sx={{ mb: 1 }}>
                            <Box
                              sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 0.5 }}
                            >
                              <Typography variant="caption" color="text.secondary">
                                Total: {custodian.totalAccounts}
                              </Typography>
                              <Typography variant="caption" fontWeight={600}>
                                100%
                              </Typography>
                            </Box>
                            <Tooltip title={`${custodian.totalAccounts} total accounts`}>
                              <LinearProgress
                                variant="determinate"
                                value={100}
                                sx={{
                                  height: 6,
                                  borderRadius: 1,
                                  bgcolor: alpha(theme.palette.grey[500], 0.2),
                                  '& .MuiLinearProgress-bar': {
                                    borderRadius: 1,
                                    bgcolor: alpha(theme.palette.grey[700], 0.7),
                                    animation: 'pulse 2s infinite ease-in-out',
                                    '@keyframes pulse': {
                                      '0%': { opacity: 0.8 },
                                      '50%': { opacity: 1 },
                                      '100%': { opacity: 0.8 }
                                    }
                                  }
                                }}
                              />
                            </Tooltip>
                          </Box>

                          <Box sx={{ mb: 1 }}>
                            <Box
                              sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 0.5 }}
                            >
                              <Typography variant="caption" color="text.secondary">
                                Reconciled: {custodian.reconciledAccounts}
                              </Typography>
                              <Typography variant="caption" fontWeight={600} color="success.main">
                                {reconciledPercent}%
                              </Typography>
                            </Box>
                            <Tooltip
                              title={`${custodian.reconciledAccounts} reconciled accounts (${reconciledPercent}%)`}
                            >
                              <LinearProgress
                                variant="determinate"
                                value={reconciledPercent}
                                sx={{
                                  height: 6,
                                  borderRadius: 1,
                                  bgcolor: alpha(theme.palette.success.main, 0.15),
                                  '& .MuiLinearProgress-bar': {
                                    borderRadius: 1,
                                    bgcolor: theme.palette.success.main,
                                    animation: 'pulse 2s infinite ease-in-out',
                                    '@keyframes pulse': {
                                      '0%': { opacity: 0.8 },
                                      '50%': { opacity: 1 },
                                      '100%': { opacity: 0.8 }
                                    }
                                  }
                                }}
                              />
                            </Tooltip>
                          </Box>

                          <Box>
                            <Box
                              sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 0.5 }}
                            >
                              <Typography variant="caption" color="text.secondary">
                                Unreconciled: {custodian.unreconciledAccounts}
                              </Typography>
                              <Typography
                                variant="caption"
                                fontWeight={600}
                                color={custodian.unreconciledAccounts > 0 ? 'warning.main' : 'text.disabled'}
                              >
                                {100 - reconciledPercent}%
                              </Typography>
                            </Box>
                            <Tooltip
                              title={`${custodian.unreconciledAccounts} unreconciled accounts (${100 - reconciledPercent}%)`}
                            >
                              <LinearProgress
                                variant="determinate"
                                value={100 - reconciledPercent}
                                sx={{
                                  height: 6,
                                  borderRadius: 1,
                                  bgcolor: alpha(theme.palette.warning.main, 0.15),
                                  '& .MuiLinearProgress-bar': {
                                    borderRadius: 1,
                                    bgcolor:
                                      custodian.unreconciledAccounts > 0
                                        ? theme.palette.warning.main
                                        : alpha(theme.palette.text.disabled, 0.5),
                                    animation:
                                      custodian.unreconciledAccounts > 0 ? 'pulse 1.5s infinite ease-in-out' : 'none',
                                    '@keyframes pulse': {
                                      '0%': { opacity: 0.8 },
                                      '50%': { opacity: 1 },
                                      '100%': { opacity: 0.8 }
                                    }
                                  }
                                }}
                              />
                            </Tooltip>
                          </Box>
                        </Box>
                      </Grid>

                      {/* Action button */}
                      <Grid
                        item
                        xs={12}
                        sm={3}
                        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}
                      >
                        <Tooltip title="View detailed reconciliation status">
                          <Button
                            variant="contained"
                            size="small"
                            startIcon={<Icon icon="solar:eye-bold" width={16} />}
                            sx={{
                              bgcolor: custodian.color,
                              '&:hover': {
                                bgcolor: alpha(custodian.color, 0.8)
                              },
                              transition: 'background-color 0.3s ease'
                            }}
                          >
                            View Details
                          </Button>
                        </Tooltip>
                      </Grid>
                    </Grid>
                  </Box>
                </Card>
              );
            })}
          </Stack>
        </Box>
      )}
    </Card>
  );
};

export default CustodiansSection;
