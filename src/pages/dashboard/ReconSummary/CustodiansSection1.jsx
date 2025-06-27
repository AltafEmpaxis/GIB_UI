import { Icon } from '@iconify/react';
import {
  alpha,
  Avatar,
  Box,
  Button,
  Card,
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
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 700,
                          mr: 1,
                          minWidth: 40,
                          textAlign: 'right',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        <Tooltip title="Total Accounts">
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Icon icon="solar:document-text-linear" width={16} style={{ marginRight: 4 }} />
                            {custodian.totalAccounts}
                          </Box>
                        </Tooltip>
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
                        <Grid item xs={12}>
                          <Box sx={{ mb: 2 }}>
                            <Typography variant="body2" color="textSecondary" sx={{ mb: 0.5 }}>
                              Account Summary
                            </Typography>

                            <Box sx={{ mb: 2 }}>
                              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                                <Typography variant="body2">Total Accounts</Typography>
                                <Typography variant="body2" fontWeight={600}>
                                  {custodian.totalAccounts}
                                </Typography>
                              </Box>
                              <LinearProgress
                                variant="determinate"
                                value={100}
                                sx={{
                                  height: 8,
                                  borderRadius: 1,
                                  bgcolor: alpha(theme.palette.primary.main, 0.15),
                                  '& .MuiLinearProgress-bar': {
                                    bgcolor: theme.palette.primary.main
                                  }
                                }}
                              />
                            </Box>

                            <Box sx={{ mb: 2 }}>
                              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                  <Box
                                    sx={{
                                      width: 8,
                                      height: 8,
                                      borderRadius: '50%',
                                      bgcolor: theme.palette.success.main,
                                      mr: 1
                                    }}
                                  />
                                  <Typography variant="body2">Reconciled Accounts</Typography>
                                </Box>
                                <Typography variant="body2" fontWeight={600}>
                                  {custodian.reconciledAccounts}
                                </Typography>
                              </Box>
                              <LinearProgress
                                variant="determinate"
                                value={(custodian.reconciledAccounts / custodian.totalAccounts) * 100}
                                sx={{
                                  height: 8,
                                  borderRadius: 1,
                                  bgcolor: alpha(theme.palette.success.main, 0.15),
                                  '& .MuiLinearProgress-bar': {
                                    bgcolor: theme.palette.success.main
                                  }
                                }}
                              />
                            </Box>

                            <Box>
                              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                  <Box
                                    sx={{
                                      width: 8,
                                      height: 8,
                                      borderRadius: '50%',
                                      bgcolor: theme.palette.warning.main,
                                      mr: 1
                                    }}
                                  />
                                  <Typography variant="body2">Unreconciled Accounts</Typography>
                                </Box>
                                <Typography
                                  variant="body2"
                                  fontWeight={600}
                                  color={custodian.unreconciledAccounts > 0 ? 'warning.main' : 'text.primary'}
                                >
                                  {custodian.unreconciledAccounts}
                                </Typography>
                              </Box>
                              <LinearProgress
                                variant="determinate"
                                value={(custodian.unreconciledAccounts / custodian.totalAccounts) * 100}
                                sx={{
                                  height: 8,
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
                      </Grid>

                      <Divider sx={{ my: 1.5 }} />

                      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Button
                          size="small"
                          variant="contained"
                          startIcon={<Icon icon="solar:eye-bold" width={16} />}
                          sx={{
                            bgcolor: alpha(custodian.color, 0.9),
                            color: '#fff',
                            fontSize: '0.8rem',
                            '&:hover': {
                              bgcolor: custodian.color
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
          </Box>
        )}
      </Box>
    </Card>
  );
};

export default CustodiansSection;
