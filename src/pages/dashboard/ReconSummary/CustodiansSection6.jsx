import { Icon } from '@iconify/react';
import {
  alpha,
  Avatar,
  Box,
  Button,
  Card,
  CircularProgress,
  Divider,
  Grid,
  IconButton,
  Paper,
  Typography,
  useTheme
} from '@mui/material';
import { useState } from 'react';

const CustodiansSection = ({ isLoading }) => {
  const theme = useTheme();
  const [selectedCustodian, setSelectedCustodian] = useState(null);

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

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: theme.shadows[2]
      }}
    >
      {/* Header */}
      <Box
        sx={{
          p: 2,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: `1px solid ${theme.palette.divider}`,
          bgcolor: theme.palette.background.neutral || alpha(theme.palette.primary.main, 0.03)
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Avatar
            sx={{
              bgcolor: alpha(theme.palette.primary.main, 0.15),
              color: theme.palette.primary.main,
              width: 34,
              height: 34,
              mr: 1.5
            }}
          >
            <Icon icon="solar:buildings-2-bold" width={20} />
          </Avatar>
          <Typography variant="h6">Custodians</Typography>
        </Box>

        <IconButton
          size="small"
          sx={{
            bgcolor: alpha(theme.palette.primary.main, 0.1),
            '&:hover': { bgcolor: alpha(theme.palette.primary.main, 0.2) }
          }}
        >
          <Icon icon="solar:refresh-bold" width={18} color={theme.palette.primary.main} />
        </IconButton>
      </Box>

      {/* Content */}
      {isLoading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', py: 8, flexGrow: 1 }}>
          <CircularProgress />
        </Box>
      ) : (
        <Box sx={{ p: 3, overflow: 'auto', flexGrow: 1 }}>
          <Grid container spacing={3}>
            {custodianData.map((custodian) => {
              const reconciledPercent = Math.round((custodian.reconciledAccounts / custodian.totalAccounts) * 100);

              return (
                <Grid item xs={12} md={6} key={custodian.id}>
                  <Paper
                    elevation={3}
                    sx={{
                      overflow: 'hidden',
                      borderRadius: 2,
                      transition: 'all 0.3s ease',
                      border: `1px solid ${alpha(custodian.color, 0.2)}`,
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: theme.shadows[8],
                        borderColor: alpha(custodian.color, 0.5)
                      }
                    }}
                  >
                    {/* Card Header */}
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        p: 2,
                        borderBottom: `1px solid ${alpha(custodian.color, 0.1)}`,
                        bgcolor: alpha(custodian.color, 0.05)
                      }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Avatar
                          sx={{
                            bgcolor: alpha(custodian.color, 0.2),
                            color: custodian.color,
                            mr: 1.5
                          }}
                        >
                          <Icon icon={custodian.icon} width={24} />
                        </Avatar>
                        <Box>
                          <Typography variant="subtitle1" fontWeight={600}>
                            {custodian.name}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            Last updated: {custodian.lastUpdate}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>

                    {/* Card Body */}
                    <Box sx={{ p: 0 }}>
                      <Box
                        sx={{
                          width: '100%',
                          height: 8,
                          bgcolor: alpha(theme.palette.divider, 0.3),
                          position: 'relative',
                          overflow: 'hidden'
                        }}
                      >
                        <Box
                          sx={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            height: '100%',
                            width: `${reconciledPercent}%`,
                            bgcolor:
                              reconciledPercent === 100 ? theme.palette.success.main : theme.palette.warning.main,
                            transition: 'width 0.5s'
                          }}
                        />
                      </Box>

                      {/* Numbers */}
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'center',
                          p: 2.5,
                          pb: 2,
                          position: 'relative'
                        }}
                      >
                        <Box
                          sx={{
                            width: 90,
                            height: 90,
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexDirection: 'column',
                            bgcolor: alpha(custodian.color, 0.15),
                            border: `4px solid ${alpha(custodian.color, 0.3)}`
                          }}
                        >
                          <Typography variant="h4" fontWeight={700} sx={{ lineHeight: 1 }}>
                            {custodian.totalAccounts}
                          </Typography>
                          <Typography
                            variant="caption"
                            sx={{
                              opacity: 0.7,
                              textTransform: 'uppercase',
                              fontWeight: 500,
                              letterSpacing: '0.5px'
                            }}
                          >
                            Total
                          </Typography>
                        </Box>
                      </Box>

                      <Grid container spacing={0}>
                        <Grid item xs={6}>
                          <Box
                            sx={{
                              display: 'flex',
                              flexDirection: 'column',
                              alignItems: 'center',
                              p: 2,
                              pt: 0,
                              borderRight: `1px solid ${alpha(theme.palette.divider, 0.5)}`
                            }}
                          >
                            <Typography variant="h5" fontWeight={600} color="success.main" sx={{ lineHeight: 1.2 }}>
                              {custodian.reconciledAccounts}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              <Box
                                component="span"
                                sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                              >
                                <Box
                                  component="span"
                                  sx={{
                                    width: 8,
                                    height: 8,
                                    borderRadius: '50%',
                                    bgcolor: 'success.main',
                                    mr: 0.5,
                                    display: 'inline-block'
                                  }}
                                />
                                Reconciled
                              </Box>
                            </Typography>
                          </Box>
                        </Grid>
                        <Grid item xs={6}>
                          <Box
                            sx={{
                              display: 'flex',
                              flexDirection: 'column',
                              alignItems: 'center',
                              p: 2,
                              pt: 0
                            }}
                          >
                            <Typography
                              variant="h5"
                              fontWeight={600}
                              color={custodian.unreconciledAccounts > 0 ? 'warning.main' : 'text.disabled'}
                              sx={{ lineHeight: 1.2 }}
                            >
                              {custodian.unreconciledAccounts}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              <Box
                                component="span"
                                sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                              >
                                <Box
                                  component="span"
                                  sx={{
                                    width: 8,
                                    height: 8,
                                    borderRadius: '50%',
                                    bgcolor: 'warning.main',
                                    mr: 0.5,
                                    display: 'inline-block'
                                  }}
                                />
                                Unreconciled
                              </Box>
                            </Typography>
                          </Box>
                        </Grid>
                      </Grid>

                      <Divider />

                      {/* Action Footer */}
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'center',
                          p: 2
                        }}
                      >
                        <Button
                          variant="text"
                          size="small"
                          startIcon={<Icon icon="solar:eye-linear" width={16} />}
                          sx={{
                            color: custodian.color,
                            fontWeight: 500,
                            '&:hover': { bgcolor: alpha(custodian.color, 0.08) }
                          }}
                        >
                          View Details
                        </Button>
                      </Box>
                    </Box>
                  </Paper>
                </Grid>
              );
            })}
          </Grid>
        </Box>
      )}
    </Card>
  );
};

export default CustodiansSection;
