import { Icon } from '@iconify/react';
import {
  alpha,
  Avatar,
  Box,
  Button,
  Card,
  CircularProgress,
  Collapse,
  Grid,
  IconButton,
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

  // Handle custodian expansion toggle
  const handleExpandCustodian = (custodianId) => {
    setExpandedCustodian(expandedCustodian === custodianId ? null : custodianId);
  };

  return (
    <Card sx={{ height: '100%', boxShadow: theme.shadows[2] }}>
      <Box
        sx={{
          p: 2,
          borderBottom: `1px solid ${theme.palette.divider}`,
          bgcolor: alpha(theme.palette.background.paper, 0.8)
        }}
      >
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography
            variant="h6"
            sx={{ fontWeight: 600, color: theme.palette.text.primary, display: 'flex', alignItems: 'center' }}
          >
            <Avatar
              variant="rounded"
              sx={{
                width: 28,
                height: 28,
                mr: 1.5,
                bgcolor: alpha(theme.palette.primary.main, 0.15),
                color: theme.palette.primary.main
              }}
            >
              <Icon icon="solar:buildings-3-bold" width={16} />
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
      </Box>

      <Box
        sx={{
          height: 'calc(100% - 60px)',
          overflow: 'auto',
          p: 2,
          pt: 1.5
        }}
      >
        {isLoading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
            <CircularProgress size={40} />
          </Box>
        ) : (
          <Stack spacing={2}>
            {custodianData.map((custodian) => (
              <Card
                key={custodian.id}
                elevation={0}
                sx={{
                  border: 1,
                  borderColor: theme.palette.divider,
                  borderRadius: 1,
                  overflow: 'hidden',
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    borderColor: alpha(custodian.color, 0.5),
                    boxShadow: theme.shadows[3]
                  }
                }}
              >
                {/* Custodian Header */}
                <Box
                  onClick={() => handleExpandCustodian(custodian.id)}
                  sx={{
                    p: 2,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    cursor: 'pointer',
                    bgcolor: alpha(custodian.color, 0.05),
                    borderLeft: `4px solid ${custodian.color}`
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Box
                      sx={{
                        width: 40,
                        height: 40,
                        borderRadius: 1,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        bgcolor: alpha(custodian.color, 0.15),
                        color: custodian.color,
                        mr: 2
                      }}
                    >
                      <Icon icon={custodian.icon} width={24} />
                    </Box>

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
                        Last updated: {custodian.lastUpdate}
                      </Typography>
                    </Box>
                  </Box>

                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Box sx={{ textAlign: 'center', mr: 2 }}>
                      <Typography variant="h5" fontWeight={700} sx={{ lineHeight: 1.2 }}>
                        {custodian.totalAccounts}
                      </Typography>
                      <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.7rem' }}>
                        Total
                      </Typography>
                    </Box>

                    <IconButton
                      size="small"
                      sx={{
                        bgcolor: alpha(custodian.color, 0.1),
                        transition: 'transform 0.2s ease',
                        transform: expandedCustodian === custodian.id ? 'rotate(180deg)' : 'rotate(0deg)',
                        '&:hover': { bgcolor: alpha(custodian.color, 0.2) }
                      }}
                    >
                      <Icon icon="solar:alt-arrow-down-bold" width={16} />
                    </IconButton>
                  </Box>
                </Box>

                {/* Expanded Details */}
                <Collapse in={expandedCustodian === custodian.id}>
                  <Box sx={{ p: 2, bgcolor: alpha(theme.palette.background.paper, 0.5) }}>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <Box sx={{ mb: 1 }}>
                          <Box
                            sx={{
                              width: '100%',
                              height: 10,
                              borderRadius: 5,
                              bgcolor: alpha(theme.palette.divider, 0.5),
                              mb: 2,
                              position: 'relative',
                              overflow: 'hidden'
                            }}
                          >
                            <Box
                              sx={{
                                position: 'absolute',
                                left: 0,
                                top: 0,
                                height: '100%',
                                width: `${(custodian.reconciledAccounts / custodian.totalAccounts) * 100}%`,
                                bgcolor: theme.palette.success.main,
                                borderRadius: 5
                              }}
                            />
                          </Box>

                          <Grid container spacing={2}>
                            <Grid item xs={6}>
                              <Box
                                sx={{
                                  p: 1.5,
                                  border: `1px solid ${alpha(theme.palette.success.main, 0.3)}`,
                                  borderRadius: 1,
                                  bgcolor: alpha(theme.palette.success.main, 0.05)
                                }}
                              >
                                <Typography variant="caption" color="text.secondary">
                                  Reconciled
                                </Typography>
                                <Box sx={{ display: 'flex', alignItems: 'baseline' }}>
                                  <Typography variant="h6" fontWeight={700} color="success.main">
                                    {custodian.reconciledAccounts}
                                  </Typography>
                                  <Typography variant="caption" color="text.secondary" sx={{ ml: 0.5 }}>
                                    accounts
                                  </Typography>
                                </Box>
                                <Typography
                                  variant="caption"
                                  fontWeight={500}
                                  sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}
                                >
                                  <Icon
                                    icon="solar:check-circle-bold"
                                    color={theme.palette.success.main}
                                    width={12}
                                    style={{ marginRight: 4 }}
                                  />
                                  {Math.round((custodian.reconciledAccounts / custodian.totalAccounts) * 100)}% complete
                                </Typography>
                              </Box>
                            </Grid>

                            <Grid item xs={6}>
                              <Box
                                sx={{
                                  p: 1.5,
                                  border: `1px solid ${alpha(theme.palette.warning.main, 0.3)}`,
                                  borderRadius: 1,
                                  bgcolor: alpha(theme.palette.warning.main, 0.05)
                                }}
                              >
                                <Typography variant="caption" color="text.secondary">
                                  Unreconciled
                                </Typography>
                                <Box sx={{ display: 'flex', alignItems: 'baseline' }}>
                                  <Typography
                                    variant="h6"
                                    fontWeight={700}
                                    color={custodian.unreconciledAccounts > 0 ? 'warning.main' : 'text.disabled'}
                                  >
                                    {custodian.unreconciledAccounts}
                                  </Typography>
                                  <Typography variant="caption" color="text.secondary" sx={{ ml: 0.5 }}>
                                    accounts
                                  </Typography>
                                </Box>
                                <Typography
                                  variant="caption"
                                  fontWeight={500}
                                  sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}
                                >
                                  <Icon
                                    icon={
                                      custodian.unreconciledAccounts > 0
                                        ? 'solar:clock-circle-bold'
                                        : 'solar:check-circle-bold'
                                    }
                                    color={
                                      custodian.unreconciledAccounts > 0
                                        ? theme.palette.warning.main
                                        : theme.palette.success.main
                                    }
                                    width={12}
                                    style={{ marginRight: 4 }}
                                  />
                                  {custodian.unreconciledAccounts > 0 ? 'Needs attention' : 'All reconciled'}
                                </Typography>
                              </Box>
                            </Grid>
                          </Grid>
                        </Box>
                      </Grid>
                    </Grid>

                    <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
                      <Button
                        variant="contained"
                        size="small"
                        startIcon={<Icon icon="solar:document-text-bold" width={16} />}
                        sx={{
                          bgcolor: custodian.color,
                          '&:hover': {
                            bgcolor: alpha(custodian.color, 0.9)
                          }
                        }}
                      >
                        View Account Details
                      </Button>
                    </Box>
                  </Box>
                </Collapse>
              </Card>
            ))}
          </Stack>
        )}
      </Box>
    </Card>
  );
};

export default CustodiansSection;
