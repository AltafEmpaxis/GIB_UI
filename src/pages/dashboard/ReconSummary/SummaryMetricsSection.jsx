import { Icon } from '@iconify/react';
import {
  alpha,
  Avatar,
  Box,
  Button,
  Card,
  Chip,
  Divider,
  Grid,
  LinearProgress,
  Stack,
  Typography,
  useMediaQuery,
  useTheme
} from '@mui/material';
import { useNavigate } from 'react-router';

const SummaryMetricsSection = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // Consistent spacing value
  const spacing = 1.5;

  const handleViewReconcileDetails = () => {
    // Navigate to the recon-tool page and set the tab to detailReconTool
    navigate('/recon-tool', { state: { defaultTab: 'detailReconTool' } });
  };

  // Metric card styles
  const metricCardStyle = {
    p: 0,
    overflow: 'hidden',
    borderRadius: 1,
    height: '100%',
    boxShadow: '0 2px 10px 0 rgba(32, 40, 45, 0.08)',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    '&:hover': {
      transform: 'translateY(-4px)',
      boxShadow: '0 4px 16px 0 rgba(32, 40, 45, 0.12)'
    }
  };

  // Progress bar styles based on theme
  const progressStyle = (color) => ({
    mt: 0.75,
    height: 6,
    borderRadius: 1,
    bgcolor: alpha(theme.palette.grey[200], theme.palette.mode === 'dark' ? 0.2 : 1),
    '& .MuiLinearProgress-bar': {
      bgcolor: color,
      borderRadius: 1
    }
  });

  return (
    <Grid container spacing={spacing}>
      {/* Reconcile Accounts Card */}
      <Grid item xs={12} sm={6}>
        <Card sx={metricCardStyle}>
          <Box
            sx={{
              bgcolor: theme.palette.secondary.main, // GIB Yellow
              p: 1.5,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <Typography variant="subtitle1" sx={{ fontWeight: 600, color: 'rgba(0, 0, 0, 0.87)' }}>
              Reconcile Accounts
            </Typography>
            <Avatar
              sx={{
                width: 28,
                height: 28,
                bgcolor: alpha('#000', 0.15),
                color: 'rgba(0, 0, 0, 0.87)'
              }}
            >
              <Icon icon="solar:check-circle-bold-duotone" width={16} />
            </Avatar>
          </Box>

          <Box sx={{ p: spacing, pt: spacing }}>
            <Stack direction="row" alignItems="center" spacing={spacing}>
              <Typography variant="h3" sx={{ fontWeight: 700, color: theme.palette.secondary.main }}>
                384
              </Typography>
              <Chip
                size="small"
                label="+8%"
                icon={<Icon icon="solar:arrow-up-bold" width={14} />}
                sx={{
                  bgcolor: alpha(theme.palette.success.main, 0.1),
                  color: theme.palette.success.main,
                  fontWeight: 600,
                  height: 24
                }}
              />
            </Stack>

            <Typography variant="body2" color="textSecondary" sx={{ mt: 0.75 }}>
              from previous period
            </Typography>

            <LinearProgress variant="determinate" value={75} sx={progressStyle(theme.palette.secondary.main)} />

            <Box sx={{ mt: spacing, textAlign: 'right' }}>
              <Button
                size="small"
                variant="text"
                onClick={handleViewReconcileDetails}
                sx={{
                  color: theme.palette.secondary.main,
                  fontWeight: 600,
                  fontSize: '0.75rem',
                  '&:hover': {
                    bgcolor: alpha(theme.palette.secondary.main, 0.08)
                  }
                }}
                endIcon={<Icon icon="solar:arrow-right-bold" width={16} />}
              >
                View Details
              </Button>
            </Box>
          </Box>
        </Card>
      </Grid>

      {/* Unreconcile Accounts Card */}
      <Grid item xs={12} sm={6}>
        <Card sx={metricCardStyle}>
          <Box
            sx={{
              bgcolor: theme.palette.primary.main, // Dark Grey
              p: 1.5,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <Typography variant="subtitle1" sx={{ fontWeight: 600, color: theme.palette.primary.contrastText }}>
              Unreconcile Accounts
            </Typography>
            <Avatar
              sx={{
                width: 28,
                height: 28,
                bgcolor: alpha('#fff', 0.15),
                color: theme.palette.primary.contrastText
              }}
            >
              <Icon icon="solar:warning-bold-duotone" width={16} />
            </Avatar>
          </Box>

          <Box sx={{ p: spacing, pt: spacing }}>
            <Stack direction="row" alignItems="center" spacing={spacing}>
              <Typography variant="h3" sx={{ fontWeight: 700, color: theme.palette.primary.main }}>
                27
              </Typography>
              <Chip
                size="small"
                label="-3.2%"
                icon={<Icon icon="solar:arrow-down-bold" width={14} />}
                sx={{
                  bgcolor: alpha(theme.palette.error.main, 0.1),
                  color: theme.palette.error.main,
                  fontWeight: 600,
                  height: 24
                }}
              />
            </Stack>

            <Typography variant="body2" color="textSecondary" sx={{ mt: 0.75 }}>
              from yesterday
            </Typography>

            <LinearProgress variant="determinate" value={27} sx={progressStyle(theme.palette.primary.main)} />

            <Box sx={{ mt: spacing, textAlign: 'right' }}>
              <Button
                size="small"
                variant="text"
                onClick={handleViewReconcileDetails}
                sx={{
                  color: theme.palette.primary.main,
                  fontWeight: 600,
                  fontSize: '0.75rem',
                  '&:hover': {
                    bgcolor: alpha(theme.palette.primary.main, 0.08)
                  }
                }}
                endIcon={<Icon icon="solar:arrow-right-bold" width={16} />}
              >
                View Details
              </Button>
            </Box>
          </Box>
        </Card>
      </Grid>

      {/* Today's Activity Card */}
      <Grid item xs={12}>
        <Card sx={{ p: spacing, borderRadius: 1, boxShadow: '0 2px 10px 0 rgba(32, 40, 45, 0.08)' }}>
          <Stack spacing={spacing}>
            {/* Today's Received */}
            <Box>
              <Stack direction="row" alignItems="center" spacing={0.75} sx={{ mb: 0.75 }}>
                <Avatar
                  variant="rounded"
                  sx={{
                    width: 20,
                    height: 20,
                    bgcolor: alpha(theme.palette.secondary.main, 0.2),
                    color: theme.palette.secondary.main
                  }}
                >
                  <Icon icon="solar:clock-circle-bold-duotone" width={12} />
                </Avatar>
                <Typography variant="body2" color="textSecondary" sx={{ fontWeight: 500 }}>
                  Today's Received
                </Typography>
              </Stack>

              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h6" sx={{ fontWeight: 700, color: theme.palette.secondary.main }}>
                  $2,890
                </Typography>
                <Chip
                  size="small"
                  label="Live"
                  sx={{
                    bgcolor: alpha(theme.palette.secondary.main, 0.1),
                    color: theme.palette.secondary.main,
                    fontWeight: 600,
                    height: 24
                  }}
                />
              </Box>

              <LinearProgress variant="determinate" value={35} sx={progressStyle(theme.palette.secondary.main)} />
            </Box>

            <Divider sx={{ opacity: 0.6 }} />

            {/* Monthly Total */}
            <Box>
              <Stack direction="row" alignItems="center" spacing={0.75} sx={{ mb: 0.75 }}>
                <Avatar
                  variant="rounded"
                  sx={{
                    width: 20,
                    height: 20,
                    bgcolor: alpha(theme.palette.primary.main, 0.2),
                    color: theme.palette.primary.main
                  }}
                >
                  <Icon icon="solar:dollar-minimalistic-bold-duotone" width={12} />
                </Avatar>
                <Typography variant="body2" color="textSecondary" sx={{ fontWeight: 500 }}>
                  Monthly Total
                </Typography>
              </Stack>

              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h6" sx={{ fontWeight: 700, color: theme.palette.primary.main }}>
                  $82,890
                </Typography>
                <Chip
                  size="small"
                  label="+18%"
                  icon={<Icon icon="solar:arrow-up-bold" width={14} />}
                  sx={{
                    bgcolor: alpha(theme.palette.primary.main, 0.1),
                    color: theme.palette.primary.main,
                    fontWeight: 600,
                    height: 24
                  }}
                />
              </Box>

              <LinearProgress variant="determinate" value={82} sx={progressStyle(theme.palette.primary.main)} />
            </Box>
          </Stack>
        </Card>
      </Grid>
    </Grid>
  );
};

export default SummaryMetricsSection;
