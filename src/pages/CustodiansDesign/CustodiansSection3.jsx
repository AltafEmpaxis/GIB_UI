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
  Stack,
  Typography,
  useTheme
} from '@mui/material';
import { useState } from 'react';

const CustodiansSection = ({ isLoading }) => {
  const theme = useTheme();
  const [selectedCustodianId, setSelectedCustodianId] = useState(null);

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

  // Handle selecting a custodian
  const handleSelectCustodian = (id) => {
    setSelectedCustodianId(id === selectedCustodianId ? null : id);
  };

  return (
    <Card sx={{ height: '100%' }}>
      <Box
        sx={{
          p: 2,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: `1px solid ${theme.palette.divider}`
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          Custodians
        </Typography>

        <IconButton size="small" color="primary">
          <Icon icon="solar:refresh-linear" width={20} />
        </IconButton>
      </Box>

      {isLoading ? (
        <Box sx={{ height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <CircularProgress />
        </Box>
      ) : (
        <Box sx={{ p: 2, overflow: 'auto', height: 'calc(100% - 57px)' }}>
          <Stack spacing={2}>
            {custodianData.map((custodian) => {
              const isSelected = selectedCustodianId === custodian.id;
              const reconciliationPercent = Math.round((custodian.reconciledAccounts / custodian.totalAccounts) * 100);

              return (
                <Card
                  key={custodian.id}
                  variant="outlined"
                  sx={{
                    overflow: 'hidden',
                    cursor: 'pointer',
                    borderColor: isSelected ? custodian.color : theme.palette.divider,
                    transition: 'all 0.2s',
                    '&:hover': {
                      borderColor: alpha(custodian.color, 0.5),
                      boxShadow: theme.shadows[2]
                    }
                  }}
                  onClick={() => handleSelectCustodian(custodian.id)}
                >
                  {/* Main content - always visible */}
                  <Box sx={{ p: 2 }}>
                    <Grid container spacing={2} alignItems="center">
                      {/* Icon and name */}
                      <Grid item xs={7} sm={6}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Avatar
                            sx={{
                              bgcolor: alpha(custodian.color, 0.1),
                              color: custodian.color,
                              width: 40,
                              height: 40,
                              mr: 2
                            }}
                          >
                            <Icon icon={custodian.icon} width={24} />
                          </Avatar>

                          <Box>
                            <Typography variant="subtitle1" fontWeight={600}>
                              {custodian.name}
                            </Typography>
                            <Typography variant="caption" sx={{ display: 'flex', alignItems: 'center' }}>
                              <Icon icon="solar:clock-circle-linear" width={12} style={{ marginRight: 4 }} />
                              Last updated: {custodian.lastUpdate}
                            </Typography>
                          </Box>
                        </Box>
                      </Grid>

                      {/* Total count */}
                      <Grid item xs={5} sm={2}>
                        <Box sx={{ textAlign: 'center' }}>
                          <Typography variant="h5" fontWeight={700}>
                            {custodian.totalAccounts}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            Total
                          </Typography>
                        </Box>
                      </Grid>

                      {/* Reconciled / Unreconciled counts */}
                      <Grid item xs={12} sm={4}>
                        <Stack direction="row" spacing={2} justifyContent={{ xs: 'center', sm: 'flex-end' }}>
                          <Box sx={{ textAlign: 'center' }}>
                            <Typography variant="subtitle1" color="success.main" fontWeight={600}>
                              {custodian.reconciledAccounts}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              Reconciled
                            </Typography>
                          </Box>

                          <Box sx={{ textAlign: 'center' }}>
                            <Typography
                              variant="subtitle1"
                              color={custodian.unreconciledAccounts > 0 ? 'warning.main' : 'text.disabled'}
                              fontWeight={600}
                            >
                              {custodian.unreconciledAccounts}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              Unreconciled
                            </Typography>
                          </Box>
                        </Stack>
                      </Grid>
                    </Grid>
                  </Box>

                  {/* Simple progress bar */}
                  <Box sx={{ height: 4, width: '100%', bgcolor: alpha(theme.palette.divider, 0.5) }}>
                    <Box
                      sx={{
                        height: '100%',
                        width: `${reconciliationPercent}%`,
                        bgcolor:
                          reconciliationPercent === 100 ? theme.palette.success.main : theme.palette.warning.main,
                        transition: 'width 0.5s ease-in-out'
                      }}
                    />
                  </Box>

                  {/* Action button - only if selected */}
                  {isSelected && (
                    <Box sx={{ p: 2, pt: 1.5, bgcolor: alpha(custodian.color, 0.05), textAlign: 'center' }}>
                      <Button
                        variant="contained"
                        size="small"
                        sx={{
                          bgcolor: custodian.color,
                          '&:hover': { bgcolor: alpha(custodian.color, 0.8) }
                        }}
                      >
                        View Details
                      </Button>
                    </Box>
                  )}
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
