import { Icon } from '@iconify/react';
import {
  alpha,
  Avatar,
  Box,
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
    <Card sx={{ height: '100%', boxShadow: 0, border: '1px solid', borderColor: theme.palette.divider }}>
      <Box
        sx={{
          p: 2,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: `1px solid ${theme.palette.divider}`,
          bgcolor: alpha(theme.palette.background.default, 0.5)
        }}
      >
        <Typography variant="h6">Custodians</Typography>

        <IconButton size="small" color="primary">
          <Icon icon="solar:refresh-linear" width={18} />
        </IconButton>
      </Box>

      {isLoading ? (
        <Box sx={{ height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <CircularProgress />
        </Box>
      ) : (
        <Box sx={{ p: 2, overflow: 'auto', height: 'calc(100% - 57px)' }}>
          <Stack spacing={1.5}>
            {custodianData.map((custodian) => {
              const isSelected = selectedCustodianId === custodian.id;

              return (
                <Card
                  key={custodian.id}
                  elevation={0}
                  sx={{
                    p: 2,
                    borderLeft: `4px solid ${custodian.color}`,
                    bgcolor: 'background.paper',
                    border: '1px solid',
                    borderColor: theme.palette.divider,
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    '&:hover': {
                      bgcolor: alpha(custodian.color, 0.05),
                      transform: 'translateY(-1px)'
                    }
                  }}
                  onClick={() => handleSelectCustodian(custodian.id)}
                >
                  <Grid container spacing={1} alignItems="center">
                    {/* Bank icon and name */}
                    <Grid item xs={5} md={5}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Avatar
                          sx={{
                            bgcolor: alpha(custodian.color, 0.1),
                            color: custodian.color,
                            width: 36,
                            height: 36,
                            mr: 1.5
                          }}
                        >
                          <Icon icon={custodian.icon} width={20} />
                        </Avatar>
                        <Box>
                          <Typography variant="body1" fontWeight={500}>
                            {custodian.name}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            Last updated: {custodian.lastUpdate}
                          </Typography>
                        </Box>
                      </Box>
                    </Grid>

                    {/* Total */}
                    <Grid item xs={2} md={2}>
                      <Box sx={{ textAlign: 'center' }}>
                        <Typography variant="h5" fontWeight={600}>
                          {custodian.totalAccounts}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          Total
                        </Typography>
                      </Box>
                    </Grid>

                    {/* Reconciled */}
                    <Grid item xs={2} md={2}>
                      <Box sx={{ textAlign: 'center' }}>
                        <Typography variant="h5" color="success.main" fontWeight={600}>
                          {custodian.reconciledAccounts}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          Reconciled
                        </Typography>
                      </Box>
                    </Grid>

                    {/* Unreconciled */}
                    <Grid item xs={2} md={2}>
                      <Box sx={{ textAlign: 'center' }}>
                        <Typography
                          variant="h5"
                          color={custodian.unreconciledAccounts > 0 ? 'warning.main' : 'text.disabled'}
                          fontWeight={600}
                        >
                          {custodian.unreconciledAccounts}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          Unreconciled
                        </Typography>
                      </Box>
                    </Grid>

                    {/* Action */}
                    <Grid item xs={1} md={1} sx={{ textAlign: 'right' }}>
                      <IconButton
                        size="small"
                        color="primary"
                        sx={{
                          bgcolor: alpha(custodian.color, 0.1),
                          color: custodian.color,
                          visibility: isSelected ? 'visible' : 'hidden',
                          opacity: isSelected ? 1 : 0,
                          transition: 'all 0.2s',
                          '&:hover': {
                            bgcolor: alpha(custodian.color, 0.2)
                          }
                        }}
                      >
                        <Icon icon="solar:arrow-right-bold" width={18} />
                      </IconButton>
                    </Grid>
                  </Grid>
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
