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
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
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
        <IconButton size="small">
          <Icon icon="solar:refresh-linear" />
        </IconButton>
      </Box>

      {isLoading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', p: 4, flexGrow: 1 }}>
          <CircularProgress />
        </Box>
      ) : (
        <Box sx={{ p: 2, pt: 1.5, overflow: 'auto', flexGrow: 1 }}>
          <Stack spacing={1}>
            {custodianData.map((custodian) => (
              <Card
                key={custodian.id}
                variant="outlined"
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  p: 1.5,
                  borderColor: 'divider'
                }}
              >
                {/* Left - Logo + Name */}
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
                    <Typography variant="subtitle1" fontWeight={500}>
                      {custodian.name}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Last updated: {custodian.lastUpdate}
                    </Typography>
                  </Box>
                </Box>

                {/* Right - Stats */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                  {/* Total */}
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h6" fontWeight={600} color="text.primary">
                      {custodian.totalAccounts}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Total
                    </Typography>
                  </Box>

                  {/* Reconciled */}
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h6" fontWeight={600} color="success.main">
                      {custodian.reconciledAccounts}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Reconciled
                    </Typography>
                  </Box>

                  {/* Unreconciled */}
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography
                      variant="h6"
                      fontWeight={600}
                      color={custodian.unreconciledAccounts > 0 ? 'warning.main' : 'text.disabled'}
                    >
                      {custodian.unreconciledAccounts}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Unreconciled
                    </Typography>
                  </Box>

                  {/* View Button */}
                  <Button
                    variant="outlined"
                    size="small"
                    sx={{
                      minWidth: 80,
                      borderColor: alpha(custodian.color, 0.5),
                      color: custodian.color,
                      '&:hover': {
                        backgroundColor: alpha(custodian.color, 0.05),
                        borderColor: custodian.color
                      }
                    }}
                  >
                    View
                  </Button>
                </Box>
              </Card>
            ))}
          </Stack>
        </Box>
      )}
    </Card>
  );
};

export default CustodiansSection;
