import { Icon } from '@iconify/react';
import {
  alpha,
  Avatar,
  Box,
  Button,
  Card,
  Chip,
  Grid,
  LinearProgress,
  Stack,
  Typography,
  useTheme
} from '@mui/material';
import { useNavigate } from 'react-router';

const SummaryMetricsSection = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const handleViewReconcileDetails = () => {
    navigate('/detail-recon-tool');
  };

  return (
    <Grid container spacing={2}>
      {/* Yearly Turnover - Enhanced */}
      <Grid item xs={6}>
        <Card
          sx={{
            height: '100%',
            bgcolor: theme.palette.primary.main,
            color: theme.palette.common.white,
            p: 2,
            cursor: 'pointer',
            '&:hover': {
              boxShadow: theme.shadows[10],
              transform: 'translateY(-2px)',
              transition: 'all 0.3s'
            }
          }}
          onClick={handleViewReconcileDetails}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <Typography variant="body2" sx={{ fontWeight: 500, color: theme.palette.common.white, opacity: 0.95 }}>
              Reconcile Accounts
            </Typography>
            <Box
              sx={{
                bgcolor: alpha('#fff', 0.25),
                p: 0.75,
                borderRadius: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Icon icon="solar:graph-up-bold-duotone" width={16} />
            </Box>
          </Box>
          <Typography variant="h5" sx={{ mt: 2, fontWeight: 700, color: theme.palette.common.white }}>
            384
          </Typography>
          <Typography
            variant="caption"
            sx={{ color: theme.palette.common.white, opacity: 0.9, display: 'block', mt: 0.5 }}
          >
            +8% from previous
          </Typography>
          <Button
            size="small"
            variant="contained"
            fullWidth
            sx={{
              bgcolor: alpha('#fff', 0.25),
              color: '#fff',
              fontSize: '0.7rem',
              mt: 1.5,
              '&:hover': {
                bgcolor: alpha('#fff', 0.35)
              }
            }}
          >
            View Detail
          </Button>
        </Card>
      </Grid>

      {/* Last Month - Enhanced */}
      <Grid item xs={6}>
        <Card
          sx={{
            height: '100%',
            bgcolor: theme.palette.secondary.main,
            color: theme.palette.common.white,
            p: 2,
            cursor: 'pointer',
            '&:hover': {
              boxShadow: theme.shadows[10],
              transform: 'translateY(-2px)',
              transition: 'all 0.3s'
            }
          }}
          onClick={handleViewReconcileDetails}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <Typography variant="body2" sx={{ fontWeight: 500, color: theme.palette.common.white, opacity: 0.95 }}>
              UnReconcile Accounts
            </Typography>
            <Box
              sx={{
                bgcolor: alpha('#fff', 0.25),
                p: 0.75,
                borderRadius: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Icon icon="solar:calendar-mark-bold-duotone" width={16} />
            </Box>
          </Box>
          <Typography variant="h5" sx={{ mt: 2, fontWeight: 700, color: theme.palette.common.white }}>
            27
          </Typography>
          <Typography
            variant="caption"
            sx={{ color: theme.palette.common.white, opacity: 0.9, display: 'block', mt: 0.5 }}
          >
            -3.2% from yesterday
          </Typography>
          <Button
            size="small"
            variant="contained"
            fullWidth
            sx={{
              bgcolor: alpha('#fff', 0.25),
              color: '#fff',
              fontSize: '0.7rem',
              mt: 1.5,
              '&:hover': {
                bgcolor: alpha('#fff', 0.35)
              }
            }}
          >
            View Detail
          </Button>
        </Card>
      </Grid>

      {/* Today's Activity - Enhanced */}
      <Grid item xs={12}>
        <Card sx={{ p: 2 }}>
          <Stack spacing={2}>
            <Box>
              <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
                <Avatar
                  variant="rounded"
                  sx={{
                    width: 22,
                    height: 22,
                    bgcolor: theme.palette.primary.lighter,
                    color: theme.palette.primary.main
                  }}
                >
                  <Icon icon="solar:clock-circle-bold-duotone" width={14} />
                </Avatar>
                <Typography variant="body2" color="textSecondary" sx={{ fontWeight: 500 }}>
                  Today's Received
                </Typography>
              </Stack>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h6" sx={{ fontWeight: 700, color: theme.palette.primary.main }}>
                  $2,890
                </Typography>
                <Box>
                  <Chip
                    size="small"
                    label="Live"
                    sx={{
                      bgcolor: theme.palette.primary.lighter,
                      color: theme.palette.primary.main,
                      fontWeight: 600,
                      height: 24
                    }}
                  />
                </Box>
              </Box>
              <LinearProgress
                variant="determinate"
                value={35}
                sx={{
                  mt: 1,
                  height: 6,
                  borderRadius: 1,
                  bgcolor: theme.palette.grey[200],
                  '& .MuiLinearProgress-bar': {
                    bgcolor: theme.palette.primary.main,
                    borderRadius: 1
                  }
                }}
              />
            </Box>
            <Box>
              <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
                <Avatar
                  variant="rounded"
                  sx={{
                    width: 22,
                    height: 22,
                    bgcolor: theme.palette.secondary.lighter || alpha(theme.palette.secondary.main, 0.2),
                    color: theme.palette.secondary.main
                  }}
                >
                  <Icon icon="solar:dollar-minimalistic-bold-duotone" width={14} />
                </Avatar>
                <Typography variant="body2" color="textSecondary" sx={{ fontWeight: 500 }}>
                  Monthly Total
                </Typography>
              </Stack>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h6" sx={{ fontWeight: 700, color: theme.palette.secondary.main }}>
                  $82,890
                </Typography>
                <Chip
                  size="small"
                  label="+18%"
                  icon={<Icon icon="solar:arrow-up-bold" width={14} />}
                  sx={{
                    bgcolor: theme.palette.secondary.lighter || alpha(theme.palette.secondary.main, 0.2),
                    color: theme.palette.secondary.main,
                    fontWeight: 600,
                    height: 24
                  }}
                />
              </Box>
              <LinearProgress
                variant="determinate"
                value={82}
                sx={{
                  mt: 1,
                  height: 6,
                  borderRadius: 1,
                  bgcolor: theme.palette.grey[200],
                  '& .MuiLinearProgress-bar': {
                    bgcolor: theme.palette.secondary.main,
                    borderRadius: 1
                  }
                }}
              />
            </Box>
          </Stack>
        </Card>
      </Grid>
    </Grid>
  );
};

export default SummaryMetricsSection;
