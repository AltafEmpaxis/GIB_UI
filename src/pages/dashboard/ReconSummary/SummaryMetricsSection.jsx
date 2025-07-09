import { Icon } from '@iconify/react';
import { alpha, Avatar, Box, Card, LinearProgress, Stack, Typography, useMediaQuery, useTheme } from '@mui/material';
import { useNavigate } from 'react-router';

const SummaryMetricsSection = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  const handleViewReconcileDetails = () => {
    navigate('/detail-recon-tool');
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
    mt: 0.5,
    height: 6,
    borderRadius: 1,
    bgcolor: alpha(theme.palette.grey[200], theme.palette.mode === 'dark' ? 0.2 : 1),
    '& .MuiLinearProgress-bar': {
      bgcolor: color,
      borderRadius: 1
    }
  });

  // Metrics data
  const metricsData = [
    {
      title: 'Total Accounts',
      value: 384,
      change: '+12',
      isPositive: true,
      icon: 'solar:user-id-bold-duotone',
      color: theme.palette.secondary.main, // Yellow
      progress: 100
    },
    {
      title: 'Reconciled',
      value: 355,
      change: '+15',
      isPositive: true,
      icon: 'solar:check-circle-bold-duotone',
      color: theme.palette.success.main, // Green
      progress: 92
    },
    {
      title: 'Unreconciled',
      value: 29,
      change: '-3',
      isPositive: true,
      icon: 'solar:close-circle-bold-duotone',
      color: theme.palette.error.main, // Red
      progress: 8
    },
    {
      title: 'Reconciliation Rate',
      value: '92.5%',
      change: '+1.2%',
      isPositive: true,
      icon: 'solar:chart-line-bold-duotone',
      color: theme.palette.info.main, // Blue
      progress: 92.5
    }
  ];

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 1,
        boxShadow: theme.shadows[1]
      }}
    >
      <Box
        sx={{
          p: 1.5,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: `1px solid ${theme.palette.divider}`
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontWeight: 600,
            color: theme.palette.text.primary,
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <Avatar
            variant="rounded"
            sx={{
              width: 24,
              height: 24,
              mr: 1,
              bgcolor: alpha(theme.palette.secondary.main, 0.2),
              color: theme.palette.secondary.main
            }}
          >
            <Icon icon="solar:chart-bold-duotone" width={16} />
          </Avatar>
          Summary Metrics
        </Typography>
      </Box>

      <Box sx={{ p: 1.5, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Stack spacing={1.5} sx={{ flexGrow: 1 }}>
          {metricsData.map((metric, index) => (
            <Card key={index} sx={metricCardStyle}>
              <Box
                sx={{
                  p: 1.5,
                  display: 'flex',
                  flexDirection: 'column'
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    mb: 1
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Avatar
                      sx={{
                        width: 36,
                        height: 36,
                        bgcolor: alpha(metric.color, 0.2),
                        color: metric.color,
                        mr: 1.5
                      }}
                    >
                      <Icon icon={metric.icon} width={20} />
                    </Avatar>
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        {metric.title}
                      </Typography>
                      <Typography variant="h6" fontWeight={600} color="text.primary">
                        {metric.value}
                      </Typography>
                    </Box>
                  </Box>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      color: metric.isPositive ? theme.palette.success.main : theme.palette.error.main,
                      bgcolor: alpha(metric.isPositive ? theme.palette.success.main : theme.palette.error.main, 0.1),
                      borderRadius: 1,
                      py: 0.5,
                      px: 1
                    }}
                  >
                    <Icon
                      icon={metric.isPositive ? 'solar:arrow-up-bold' : 'solar:arrow-down-bold'}
                      width={16}
                      style={{ marginRight: 4 }}
                    />
                    <Typography variant="caption" fontWeight={600}>
                      {metric.change}
                    </Typography>
                  </Box>
                </Box>
                <LinearProgress variant="determinate" value={metric.progress} sx={progressStyle(metric.color)} />
              </Box>
            </Card>
          ))}
        </Stack>
      </Box>
    </Card>
  );
};

export default SummaryMetricsSection;
