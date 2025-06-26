import { Icon } from '@iconify/react';
import { alpha, Avatar, Box, Button, Card, Stack, Typography, useTheme } from '@mui/material';

const RightSidebarSection = () => {
  const theme = useTheme();

  return (
    <Stack spacing={2}>
      {/* GIB Logo */}
      <Box sx={{ textAlign: 'center', mb: 1 }}>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
            color: theme.palette.primary.contrastText
          }}
        >
          Notifications
        </Typography>
        <Typography
          variant="body2"
          sx={{
            color: alpha(theme.palette.primary.contrastText, 0.85),
            mt: 0.5
          }}
        >
          System Updates & Alerts
        </Typography>
      </Box>

      {/* Activity Card - GIB Styled */}
      <Card
        sx={{
          bgcolor: alpha(theme.palette.background.paper, 0.1),
          borderRadius: 2,
          border: `1px solid ${alpha(theme.palette.background.paper, 0.2)}`
        }}
      >
        <Box sx={{ p: 2 }}>
          <Typography
            variant="h6"
            sx={{
              color: theme.palette.primary.contrastText,
              mb: 2
            }}
          >
            Task Notification Status
          </Typography>
          <Stack spacing={2}>
            {[
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
            ].map((activity, index) => (
              <Box
                key={index}
                sx={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  p: 1.5,
                  borderRadius: 1,
                  bgcolor: alpha(theme.palette.background.paper, 0.08),
                  border: `1px solid ${alpha(theme.palette.background.paper, 0.15)}`
                }}
              >
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
              mt: 2,
              color: theme.palette.primary.main,
              bgcolor: theme.palette.primary.contrastText,
              borderRadius: 1,
              textTransform: 'none',
              fontWeight: 600
            }}
            endIcon={<Icon icon="solar:arrow-right-bold" style={{ color: theme.palette.primary.main }} />}
          >
            View All Activities
          </Button>
        </Box>
      </Card>

      {/* Ad Hoc Status Section */}
      <Card
        sx={{
          bgcolor: alpha(theme.palette.background.paper, 0.1),
          borderRadius: 2,
          border: `1px solid ${alpha(theme.palette.background.paper, 0.2)}`,
          mt: 3
        }}
      >
        <Box sx={{ p: 2 }}>
          <Typography
            variant="h6"
            sx={{
              color: theme.palette.primary.contrastText,
              mb: 2,
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <Icon
              icon="solar:chart-bold-duotone"
              width={20}
              style={{ marginRight: '8px', color: alpha(theme.palette.primary.contrastText, 0.9) }}
            />
            Ad Hoc Status
          </Typography>

          <Stack spacing={2}>
            {[
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
            ].map((item, index) => (
              <Box
                key={index}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  p: 1.5,
                  borderRadius: 1,
                  bgcolor: alpha(theme.palette.background.paper, 0.08),
                  border: `1px solid ${alpha(theme.palette.background.paper, 0.15)}`
                }}
              >
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
      <Card
        sx={{
          bgcolor: alpha(theme.palette.background.paper, 0.1),
          borderRadius: 2,
          border: `1px solid ${alpha(theme.palette.background.paper, 0.2)}`,
          mt: 3
        }}
      >
        <Box sx={{ p: 2 }}>
          <Typography
            variant="h6"
            sx={{
              color: theme.palette.primary.contrastText,
              mb: 2,
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <Icon
              icon="solar:activity-bold-duotone"
              width={20}
              style={{ marginRight: '8px', color: alpha(theme.palette.primary.contrastText, 0.9) }}
            />
            Ad Hoc Activities
          </Typography>

          <Stack spacing={2}>
            {[
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
            ].map((activity, index) => (
              <Box
                key={index}
                sx={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  p: 1.5,
                  borderRadius: 1,
                  bgcolor: alpha(theme.palette.background.paper, 0.08),
                  border: `1px solid ${alpha(theme.palette.background.paper, 0.15)}`
                }}
              >
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
                      mt: 0.5
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
              mt: 2,
              color: theme.palette.primary.main,
              bgcolor: theme.palette.primary.contrastText,
              borderRadius: 1,
              textTransform: 'none',
              fontWeight: 600
            }}
            endIcon={<Icon icon="solar:arrow-right-bold" style={{ color: theme.palette.primary.main }} />}
          >
            View All Ad Hoc Activities
          </Button>
        </Box>
      </Card>
    </Stack>
  );
};

export default RightSidebarSection;
