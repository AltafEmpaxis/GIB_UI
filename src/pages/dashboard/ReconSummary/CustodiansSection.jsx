import { Icon } from '@iconify/react';
import {
  alpha,
  Avatar,
  Box,
  Button,
  Card,
  Chip,
  CircularProgress,
  Collapse,
  Divider,
  Grid,
  IconButton,
  LinearProgress,
  Stack,
  Tooltip,
  Typography,
  useTheme
} from '@mui/material';
import { useState } from 'react';

const CustodiansSection = ({ isLoading }) => {
  const theme = useTheme();
  const [expandedCustodian, setExpandedCustodian] = useState('albilad'); // Default expanded custodian

  // Custodian data
  const custodianData = [
    {
      id: 'albilad',
      name: 'Albilad Account',
      icon: 'mdi:bank',
      color: theme.palette.primary.main,
      totalAccounts: 154,
      activeAccounts: 142,
      pendingReconciliation: 12,
      lastUpdate: '2 hours ago',
      trend: '+8%',
      trendPositive: true
    },
    {
      id: 'riyad',
      name: 'Riyad Account',
      icon: 'mdi:city',
      color: theme.palette.secondary.main,
      totalAccounts: 98,
      activeAccounts: 87,
      pendingReconciliation: 11,
      lastUpdate: '5 hours ago',
      trend: '+3%',
      trendPositive: true
    },
    {
      id: 'at',
      name: 'At Account',
      icon: 'mdi:office-building',
      color: theme.palette.warning.main,
      totalAccounts: 76,
      activeAccounts: 74,
      pendingReconciliation: 2,
      lastUpdate: 'Yesterday',
      trend: '-1%',
      trendPositive: false
    },
    {
      id: 'statestreet',
      name: 'State Street Account',
      icon: 'mdi:domain',
      color: theme.palette.info.main,
      totalAccounts: 56,
      activeAccounts: 52,
      pendingReconciliation: 4,
      lastUpdate: '2 days ago',
      trend: '+5%',
      trendPositive: true
    }
  ];

  // Handle custodian expansion toggle
  const handleExpandCustodian = (custodianId) => {
    setExpandedCustodian(expandedCustodian === custodianId ? null : custodianId);
  };

  return (
    <Card sx={{ height: '100%' }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          p: 2
        }}
      >
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2, flexShrink: 0 }}>
          <Typography
            variant="h6"
            sx={{ fontWeight: 600, color: theme.palette.text.primary, display: 'flex', alignItems: 'center' }}
          >
            <Avatar
              variant="rounded"
              sx={{
                width: 24,
                height: 24,
                mr: 1,
                bgcolor: theme.palette.primary.lighter,
                color: theme.palette.primary.main
              }}
            >
              <Icon icon="solar:buildings-3-bold-duotone" width={16} />
            </Avatar>
            Custodians
          </Typography>

          <Tooltip title="Refresh custodian data">
            <IconButton
              size="small"
              sx={{
                bgcolor: alpha(theme.palette.primary.main, 0.1),
                '&:hover': { bgcolor: alpha(theme.palette.primary.main, 0.2) }
              }}
            >
              <Icon icon="solar:refresh-bold" width={16} color={theme.palette.primary.main} />
            </IconButton>
          </Tooltip>
        </Stack>

        {isLoading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', py: 6, flexGrow: 1 }}>
            <CircularProgress size={40} />
          </Box>
        ) : (
          <Box
            sx={{
              flexGrow: 1,
              overflow: 'auto',
              position: 'relative',
              pr: 0.5, // Add a little padding for the scrollbar
              mr: -0.5
            }}
          >
            <Stack spacing={1.5}>
              {custodianData.map((custodian) => (
                <Card
                  key={custodian.id}
                  sx={{
                    border: 1,
                    borderColor: expandedCustodian === custodian.id ? alpha(custodian.color, 0.5) : 'divider',
                    borderRadius: 1,
                    boxShadow: expandedCustodian === custodian.id ? `0 0 0 1px ${alpha(custodian.color, 0.3)}` : 'none',
                    overflow: 'hidden',
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      borderColor: alpha(custodian.color, 0.5),
                      transform: 'translateY(-2px)',
                      boxShadow: theme.shadows[3]
                    }
                  }}
                >
                  {/* Header (always visible) */}
                  <Box
                    onClick={() => handleExpandCustodian(custodian.id)}
                    sx={{
                      p: 1.5,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      cursor: 'pointer',
                      bgcolor: expandedCustodian === custodian.id ? alpha(custodian.color, 0.05) : 'transparent'
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Avatar
                        sx={{
                          bgcolor: alpha(custodian.color, 0.15),
                          color: custodian.color,
                          width: 36,
                          height: 36,
                          mr: 1.5
                        }}
                      >
                        <Icon icon={custodian.icon} width={20} />
                      </Avatar>
                      <Box>
                        <Typography variant="subtitle1" fontWeight={600}>
                          {custodian.name}
                        </Typography>
                        <Typography
                          variant="caption"
                          color="textSecondary"
                          sx={{ display: 'flex', alignItems: 'center' }}
                        >
                          <Icon icon="solar:clock-circle-linear" width={12} style={{ marginRight: 4 }} />
                          Last updated: {custodian.lastUpdate}
                        </Typography>
                      </Box>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Chip
                        size="small"
                        label={custodian.trend}
                        icon={
                          <Icon
                            icon={custodian.trendPositive ? 'solar:arrow-up-bold' : 'solar:arrow-down-bold'}
                            width={12}
                          />
                        }
                        sx={{
                          mr: 2,
                          bgcolor: alpha(
                            custodian.trendPositive ? theme.palette.success.main : theme.palette.error.main,
                            0.1
                          ),
                          color: custodian.trendPositive ? theme.palette.success.main : theme.palette.error.main,
                          fontWeight: 600,
                          height: 20
                        }}
                      />
                      <Typography variant="h6" sx={{ fontWeight: 700, mr: 1, minWidth: 40, textAlign: 'right' }}>
                        {custodian.totalAccounts}
                      </Typography>
                      <IconButton
                        size="small"
                        sx={{
                          transition: 'transform 0.3s ease',
                          transform: expandedCustodian === custodian.id ? 'rotate(180deg)' : 'rotate(0deg)'
                        }}
                      >
                        <Icon icon="solar:alt-arrow-down-bold" width={16} />
                      </IconButton>
                    </Box>
                  </Box>

                  {/* Expanded details */}
                  <Collapse in={expandedCustodian === custodian.id}>
                    <Box
                      sx={{
                        p: 2,
                        pt: 0.5,
                        bgcolor: alpha(custodian.color, 0.03),
                        borderTop: 1,
                        borderColor: alpha(custodian.color, 0.1)
                      }}
                    >
                      <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                          <Box sx={{ mb: 1 }}>
                            <Typography variant="caption" color="textSecondary" sx={{ display: 'block' }}>
                              Active Accounts
                            </Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <Typography variant="h6" color="primary" sx={{ fontWeight: 700, mr: 1 }}>
                                {custodian.activeAccounts}
                              </Typography>
                              <LinearProgress
                                variant="determinate"
                                value={(custodian.activeAccounts / custodian.totalAccounts) * 100}
                                sx={{
                                  flexGrow: 1,
                                  height: 6,
                                  borderRadius: 1,
                                  bgcolor: alpha(theme.palette.success.main, 0.15),
                                  '& .MuiLinearProgress-bar': {
                                    bgcolor: theme.palette.success.main
                                  }
                                }}
                              />
                            </Box>
                          </Box>

                          <Box>
                            <Typography variant="caption" color="textSecondary" sx={{ display: 'block' }}>
                              Pending Reconciliation
                            </Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <Typography
                                variant="h6"
                                color={custodian.pendingReconciliation > 0 ? 'warning.main' : 'success.main'}
                                sx={{ fontWeight: 700, mr: 1 }}
                              >
                                {custodian.pendingReconciliation}
                              </Typography>
                              <LinearProgress
                                variant="determinate"
                                value={(custodian.pendingReconciliation / custodian.totalAccounts) * 100}
                                sx={{
                                  flexGrow: 1,
                                  height: 6,
                                  borderRadius: 1,
                                  bgcolor: alpha(theme.palette.warning.main, 0.15),
                                  '& .MuiLinearProgress-bar': {
                                    bgcolor: theme.palette.warning.main
                                  }
                                }}
                              />
                            </Box>
                          </Box>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                          <Box
                            sx={{
                              p: 1.5,
                              borderRadius: 1,
                              bgcolor: alpha(custodian.color, 0.06),
                              border: `1px solid ${alpha(custodian.color, 0.1)}`,
                              height: '100%',
                              display: 'flex',
                              flexDirection: 'column',
                              justifyContent: 'center'
                            }}
                          >
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                              <Typography variant="caption" color="textSecondary">
                                Reconciliation Status
                              </Typography>
                              <Chip
                                size="small"
                                label={custodian.pendingReconciliation === 0 ? 'Completed' : 'In Progress'}
                                sx={{
                                  height: 20,
                                  bgcolor: alpha(
                                    custodian.pendingReconciliation === 0
                                      ? theme.palette.success.main
                                      : theme.palette.warning.main,
                                    0.1
                                  ),
                                  color:
                                    custodian.pendingReconciliation === 0
                                      ? theme.palette.success.main
                                      : theme.palette.warning.main,
                                  fontSize: '0.7rem'
                                }}
                              />
                            </Box>

                            <Box sx={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
                              <CircularProgress
                                variant="determinate"
                                value={100}
                                size={80}
                                thickness={4}
                                sx={{ color: alpha(custodian.color, 0.15) }}
                              />
                              <CircularProgress
                                variant="determinate"
                                value={
                                  ((custodian.activeAccounts - custodian.pendingReconciliation) /
                                    custodian.activeAccounts) *
                                  100
                                }
                                size={80}
                                thickness={4}
                                sx={{
                                  color:
                                    custodian.pendingReconciliation === 0
                                      ? theme.palette.success.main
                                      : theme.palette.warning.main,
                                  position: 'absolute',
                                  left: 0
                                }}
                              />
                              <Box
                                sx={{
                                  position: 'absolute',
                                  top: 0,
                                  left: 0,
                                  right: 0,
                                  bottom: 0,
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center'
                                }}
                              >
                                <Typography variant="body2" fontWeight={700}>
                                  {Math.round(
                                    ((custodian.activeAccounts - custodian.pendingReconciliation) /
                                      custodian.activeAccounts) *
                                      100
                                  )}
                                  %
                                </Typography>
                              </Box>
                            </Box>
                          </Box>
                        </Grid>
                      </Grid>

                      <Divider sx={{ my: 1.5 }} />

                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Button
                          size="small"
                          startIcon={<Icon icon="solar:eye-bold" width={16} />}
                          sx={{ color: custodian.color, fontSize: '0.8rem' }}
                        >
                          View Details
                        </Button>
                        <Button
                          size="small"
                          variant="outlined"
                          startIcon={<Icon icon="solar:refresh-bold" width={16} />}
                          sx={{
                            borderColor: custodian.color,
                            color: custodian.color,
                            fontSize: '0.8rem',
                            '&:hover': {
                              borderColor: custodian.color,
                              bgcolor: alpha(custodian.color, 0.08)
                            }
                          }}
                        >
                          Update Status
                        </Button>
                      </Box>
                    </Box>
                  </Collapse>
                </Card>
              ))}
            </Stack>
          </Box>
        )}
      </Box>
    </Card>
  );
};

export default CustodiansSection;
