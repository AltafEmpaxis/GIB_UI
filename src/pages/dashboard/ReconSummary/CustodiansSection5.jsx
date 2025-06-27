import { Icon } from '@iconify/react';
import {
  alpha,
  Avatar,
  Box,
  Button,
  Card,
  CircularProgress,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
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
      {/* Header */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          p: 2,
          borderBottom: `1px solid ${theme.palette.divider}`
        }}
      >
        <Typography variant="h6">Custodians</Typography>
        <IconButton size="small">
          <Icon icon="solar:refresh-linear" width={20} />
        </IconButton>
      </Box>

      {isLoading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', p: 4, flexGrow: 1 }}>
          <CircularProgress />
        </Box>
      ) : (
        <TableContainer sx={{ flexGrow: 1, overflow: 'auto' }}>
          <Table sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 600 }}>Custodian</TableCell>
                <TableCell align="center" sx={{ fontWeight: 600 }}>
                  Total
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: 600 }}>
                  Reconciled
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: 600 }}>
                  Unreconciled
                </TableCell>
                <TableCell align="right" sx={{ fontWeight: 600 }}>
                  Last Updated
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: 600 }}>
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {custodianData.map((custodian) => (
                <TableRow
                  key={custodian.id}
                  hover
                  sx={{
                    '&:hover': {
                      bgcolor: alpha(custodian.color, 0.05)
                    },
                    transition: 'background-color 0.2s ease'
                  }}
                >
                  {/* Custodian Name */}
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Avatar
                        sx={{
                          width: 36,
                          height: 36,
                          bgcolor: alpha(custodian.color, 0.12),
                          color: custodian.color,
                          mr: 2
                        }}
                      >
                        <Icon icon={custodian.icon} width={20} />
                      </Avatar>
                      <Typography variant="body2" fontWeight={500}>
                        {custodian.name}
                      </Typography>
                    </Box>
                  </TableCell>

                  {/* Total */}
                  <TableCell align="center">
                    <Typography variant="h6" fontWeight={600}>
                      {custodian.totalAccounts}
                    </Typography>
                  </TableCell>

                  {/* Reconciled */}
                  <TableCell align="center">
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Box
                        sx={{
                          width: 10,
                          height: 10,
                          borderRadius: '50%',
                          bgcolor: theme.palette.success.main,
                          mr: 1
                        }}
                      />
                      <Typography variant="body1" color="success.main" fontWeight={600}>
                        {custodian.reconciledAccounts}
                      </Typography>
                    </Box>
                  </TableCell>

                  {/* Unreconciled */}
                  <TableCell align="center">
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Box
                        sx={{
                          width: 10,
                          height: 10,
                          borderRadius: '50%',
                          bgcolor:
                            custodian.unreconciledAccounts > 0
                              ? theme.palette.warning.main
                              : alpha(theme.palette.text.disabled, 0.3),
                          mr: 1
                        }}
                      />
                      <Typography
                        variant="body1"
                        fontWeight={600}
                        color={custodian.unreconciledAccounts > 0 ? 'warning.main' : 'text.disabled'}
                      >
                        {custodian.unreconciledAccounts}
                      </Typography>
                    </Box>
                  </TableCell>

                  {/* Last Updated */}
                  <TableCell align="right">
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}
                    >
                      <Icon icon="solar:clock-circle-linear" width={14} style={{ marginRight: 6, opacity: 0.7 }} />
                      {custodian.lastUpdate}
                    </Typography>
                  </TableCell>

                  {/* Action */}
                  <TableCell align="center">
                    <Button
                      variant="outlined"
                      size="small"
                      startIcon={<Icon icon="solar:eye-linear" width={16} />}
                      sx={{
                        borderColor: alpha(custodian.color, 0.5),
                        color: custodian.color,
                        '&:hover': {
                          borderColor: custodian.color,
                          bgcolor: alpha(custodian.color, 0.08)
                        }
                      }}
                    >
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Card>
  );
};

export default CustodiansSection;
