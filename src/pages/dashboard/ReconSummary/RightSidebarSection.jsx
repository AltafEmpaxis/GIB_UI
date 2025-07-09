import { Icon } from '@iconify/react';
import { alpha, Avatar, Box, Button, Card, Stack, Typography, useMediaQuery, useTheme } from '@mui/material';

const RightSidebarSection = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  // Common styles
  const cardStyle = {
    bgcolor: alpha(theme.palette.background.paper, 0.1),
    borderRadius: 1,
    border: `1px solid ${alpha(theme.palette.background.paper, 0.2)}`,
    mb: 1.5
  };

  const sectionHeaderStyle = {
    color: theme.palette.primary.contrastText,
    mb: 1.5,
    display: 'flex',
    alignItems: 'center',
    fontWeight: 600
  };

  const activityItemStyle = {
    display: 'flex',
    alignItems: 'flex-start',
    p: 1.5,
    borderRadius: 1,
    bgcolor: alpha(theme.palette.background.paper, 0.08),
    border: `1px solid ${alpha(theme.palette.background.paper, 0.15)}`,
    transition: 'all 0.2s ease',
    '&:hover': {
      bgcolor: alpha(theme.palette.background.paper, 0.12),
      transform: 'translateY(-2px)'
    }
  };

  const actionButtonStyle = {
    color: theme.palette.primary.main,
    bgcolor: theme.palette.primary.contrastText,
    borderRadius: 1,
    textTransform: 'none',
    fontWeight: 600,
    '&:hover': {
      bgcolor: alpha(theme.palette.primary.contrastText, 0.9)
    }
  };

  // Data
  const taskNotifications = [
    {
      text: 'Pending Reconciliation Tasks',
      time: '3 tasks pending',
      icon: 'solar:hourglass-bold-duotone',
      color: theme.palette.warning.main
    },
    {
      text: 'Portfolio Review Required',
      time: 'High priority',
      icon: 'solar:folder-check-bold-duotone',
      color: theme.palette.error.main
    },
    {
      text: 'Completed Reconciliations',
      time: '5 tasks today',
      icon: 'solar:check-circle-bold-duotone',
      color: theme.palette.success.main
    }
  ];

  const adHocStatuses = [
    {
      label: 'Completed',
      value: '18',
      icon: 'solar:check-circle-bold-duotone',
      color: theme.palette.success.main
    },
    {
      label: 'In Progress',
      value: '5',
      icon: 'solar:clock-circle-bold-duotone',
      color: theme.palette.warning.main
    },
    {
      label: 'Pending',
      value: '3',
      icon: 'solar:hourglass-bold-duotone',
      color: theme.palette.info.main
    }
  ];

  const adHocActivities = [
    {
      text: 'Custom Report Requested',
      time: '2 hours ago',
      icon: 'tabler:report-analytics',
      color: theme.palette.info.main
    },
    {
      text: 'Ad Hoc Reconciliation',
      time: 'Just now',
      icon: 'solar:refresh-bold-duotone',
      color: theme.palette.warning.main
    },
    {
      text: 'Data Export Completed',
      time: '1 day ago',
      icon: 'solar:upload-square-bold-duotone',
      color: theme.palette.success.main
    }
  ];

  return (
    <Stack spacing={1.5} sx={{ p: 1.5 }}>
      {/* Header */}
      <Box sx={{ textAlign: 'center', mb: 1 }}>
        <Typography
          variant="h5"
          sx={{
            fontWeight: 700,
            color: theme.palette.primary.contrastText,
            mb: 0.75
          }}
        >
          Notifications
        </Typography>
        <Typography
          variant="body2"
          sx={{
            color: alpha(theme.palette.primary.contrastText, 0.85)
          }}
        >
          System Updates & Alerts
        </Typography>
      </Box>

      {/* Task Notification Status */}
      <Card sx={cardStyle}>
        <Box sx={{ p: 1.5 }}>
          <Typography variant="h6" sx={sectionHeaderStyle}>
            <Icon
              icon="solar:bell-bold-duotone"
              width={20}
              style={{ marginRight: '8px', color: alpha(theme.palette.secondary.main, 0.9) }}
            />
            Task Notification Status
          </Typography>
          <Stack spacing={1.5}>
            {taskNotifications.map((activity, index) => (
              <Box key={index} sx={activityItemStyle}>
                <Avatar
                  sx={{
                    width: 32,
                    height: 32,
                    bgcolor: alpha(activity.color, 0.2),
                    color: activity.color,
                    borderRadius: 1,
                    mr: 1.5
                  }}
                >
                  <Icon icon={activity.icon} width={18} />
                </Avatar>
                <Box sx={{ flex: 1 }}>
                  <Typography
                    variant="body2"
                    sx={{
                      fontWeight: 600,
                      color: theme.palette.primary.contrastText
                    }}
                  >
                    {activity.text}
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{
                      color: alpha(theme.palette.primary.contrastText, 0.85)
                    }}
                  >
                    {activity.time}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Stack>

          <Button
            fullWidth
            variant="contained"
            sx={{
              ...actionButtonStyle,
              mt: 1.5
            }}
            endIcon={<Icon icon="solar:arrow-right-bold" style={{ color: theme.palette.primary.main }} />}
          >
            View All Activities
          </Button>
        </Box>
      </Card>

      {/* Ad Hoc Status Section */}
      <Card sx={cardStyle}>
        <Box sx={{ p: 1.5 }}>
          <Typography variant="h6" sx={sectionHeaderStyle}>
            <Icon
              icon="solar:chart-bold-duotone"
              width={20}
              style={{ marginRight: '8px', color: alpha(theme.palette.secondary.main, 0.9) }}
            />
            ad-hoc Status
          </Typography>

          <Stack spacing={1.5}>
            {adHocStatuses.map((item, index) => (
              <Box key={index} sx={activityItemStyle}>
                <Avatar
                  sx={{
                    width: 32,
                    height: 32,
                    bgcolor: alpha(item.color, 0.2),
                    color: item.color,
                    borderRadius: 1,
                    mr: 1.5
                  }}
                >
                  <Icon icon={item.icon} width={18} />
                </Avatar>
                <Box sx={{ flex: 1 }}>
                  <Typography
                    variant="body2"
                    sx={{
                      fontWeight: 500,
                      color: alpha(theme.palette.primary.contrastText, 0.85)
                    }}
                  >
                    {item.label}
                  </Typography>
                </Box>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 700,
                    color: theme.palette.primary.contrastText
                  }}
                >
                  {item.value}
                </Typography>
              </Box>
            ))}
          </Stack>
        </Box>
      </Card>

      {/* Ad Hoc Activities Section */}
      <Card sx={cardStyle}>
        <Box sx={{ p: 1.5 }}>
          <Typography variant="h6" sx={sectionHeaderStyle}>
            <Icon
              icon="solar:activity-bold-duotone"
              width={20}
              style={{ marginRight: '8px', color: alpha(theme.palette.secondary.main, 0.9) }}
            />
            ad-hoc Activities
          </Typography>

          <Stack spacing={1.5}>
            {adHocActivities.map((activity, index) => (
              <Box key={index} sx={activityItemStyle}>
                <Avatar
                  sx={{
                    width: 32,
                    height: 32,
                    bgcolor: alpha(activity.color, 0.2),
                    color: activity.color,
                    borderRadius: 1,
                    mr: 1.5
                  }}
                >
                  <Icon icon={activity.icon} width={18} />
                </Avatar>
                <Box sx={{ flex: 1 }}>
                  <Typography
                    variant="body2"
                    sx={{
                      fontWeight: 600,
                      color: theme.palette.primary.contrastText
                    }}
                  >
                    {activity.text}
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{
                      color: alpha(theme.palette.primary.contrastText, 0.85),
                      display: 'flex',
                      alignItems: 'center',
                      mt: 0.75
                    }}
                  >
                    <Icon icon="solar:clock-circle-linear" width={12} style={{ marginRight: 4 }} />
                    {activity.time}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Stack>

          <Button
            fullWidth
            variant="contained"
            sx={{
              ...actionButtonStyle,
              mt: 1.5
            }}
            endIcon={<Icon icon="solar:arrow-right-bold" style={{ color: theme.palette.primary.main }} />}
          >
            View All ad-hoc Activities
          </Button>
        </Box>
      </Card>
    </Stack>
  );
};

export default RightSidebarSection;
