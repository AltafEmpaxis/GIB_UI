import { Icon } from '@iconify/react';
import {
  alpha,
  Avatar,
  Box,
  Button,
  Card,
  CircularProgress,
  IconButton,
  Stack,
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

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        bgcolor: theme.palette.background.paper
      }}
    >
      {/* Header */}
      <Box
        sx={{
          p: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: `1px solid ${theme.palette.divider}`
        }}
      >
        <Typography variant="h6">Custodians</Typography>
        <IconButton size="small" color="primary">
          <Icon icon="solar:refresh-linear" />
        </IconButton>
      </Box>

      {/* Content */}
      <Box
        sx={{
          flexGrow: 1,
          overflow: 'auto',
          px: 2,
          py: 1
        }}
      >
        {isLoading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
            <CircularProgress />
          </Box>
        ) : (
          <Stack spacing={1.5} sx={{ pt: 1, pb: 2 }}>
            {custodianData.map((custodian) => {
              const percent = Math.round((custodian.reconciledAccounts / custodian.totalAccounts) * 100);

              return (
                <Card
                  key={custodian.id}
                  elevation={0}
                  sx={{
                    border: '1px solid',
                    borderColor: theme.palette.divider,
                    bgcolor: '#fff',
                    borderRadius: 1.5,
                    p: 2,
                    '&:hover': {
                      boxShadow: theme.shadows[2],
                      borderColor: alpha(custodian.color, 0.3)
                    },
                    transition: 'all 0.2s ease-in-out',
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                >
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    {/* Left: Custodian info */}
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Avatar
                        sx={{
                          bgcolor: alpha(custodian.color, 0.12),
                          color: custodian.color,
                          width: 42,
                          height: 42
                        }}
                      >
                        <Icon icon={custodian.icon} width={24} />
                      </Avatar>

                      <Box sx={{ ml: 2 }}>
                        <Typography variant="subtitle1" fontWeight={500}>
                          {custodian.name}
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Icon icon="solar:clock-linear" width={14} style={{ opacity: 0.7 }} />
                          <Typography variant="caption" color="text.secondary" sx={{ ml: 0.5 }}>
                            {custodian.lastUpdate}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>

                    {/* Right: Stats and button */}
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Box
                        sx={{
                          px: 2.5,
                          py: 0.5,
                          borderLeft: `1px dashed ${alpha(theme.palette.divider, 0.8)}`,
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          mr: 2
                        }}
                      >
                        <Typography variant="h6" fontWeight={700} color="text.primary">
                          {custodian.totalAccounts}
                        </Typography>
                        <Typography variant="caption" color="text.secondary" fontWeight={500}>
                          TOTAL
                        </Typography>
                      </Box>

                      <Box
                        sx={{
                          px: 2.5,
                          py: 0.5,
                          borderLeft: `1px dashed ${alpha(theme.palette.divider, 0.8)}`,
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          mr: 2
                        }}
                      >
                        <Typography variant="h6" fontWeight={700} color="success.main">
                          {custodian.reconciledAccounts}
                        </Typography>
                        <Typography variant="caption" color="text.secondary" fontWeight={500}>
                          RECONCILED
                        </Typography>
                      </Box>

                      <Box
                        sx={{
                          px: 2.5,
                          py: 0.5,
                          borderLeft: `1px dashed ${alpha(theme.palette.divider, 0.8)}`,
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          mr: 3
                        }}
                      >
                        <Typography
                          variant="h6"
                          fontWeight={700}
                          color={custodian.unreconciledAccounts > 0 ? 'warning.main' : 'text.disabled'}
                        >
                          {custodian.unreconciledAccounts}
                        </Typography>
                        <Typography variant="caption" color="text.secondary" fontWeight={500}>
                          UNRECONCILED
                        </Typography>
                      </Box>

                      <Button
                        variant="contained"
                        size="small"
                        sx={{
                          bgcolor: custodian.color,
                          '&:hover': { bgcolor: alpha(custodian.color, 0.8) },
                          minWidth: 100,
                          height: 36,
                          borderRadius: 1
                        }}
                      >
                        View
                      </Button>
                    </Box>
                  </Box>

                  {/* Bottom progress bar */}
                  <Box
                    sx={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      width: '100%',
                      height: 4
                    }}
                  >
                    <Box
                      sx={{
                        width: `${percent}%`,
                        height: '100%',
                        bgcolor: percent === 100 ? theme.palette.success.main : theme.palette.warning.main,
                        transition: 'width 0.4s ease-in-out'
                      }}
                    />
                  </Box>
                </Card>
              );
            })}
          </Stack>
        )}
      </Box>
    </Card>
  );
};

export default CustodiansSection;
