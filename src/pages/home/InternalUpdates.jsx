import { alpha, Avatar, Box, Card, CardContent, Chip, Grid, Stack, Typography, useTheme } from '@mui/material';
import { Icon } from '@iconify/react';

// ==============================|| INTERNAL UPDATES ||============================== //

const InternalUpdates = () => {
  const theme = useTheme();

  return (
    <Grid container spacing={3} sx={{ position: 'relative', zIndex: 1 }}>
      <Grid item xs={12} sm={6} md={4}>
        <Card
          sx={{
            borderRadius: 3,
            overflow: 'hidden',
            position: 'relative',
            border: `1px solid ${alpha(theme.palette.divider, 0.2)}`,
            boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
            '&:after': {
              content: '""',
              position: 'absolute',
              height: '3px',
              width: '100%',
              bottom: 0,
              left: 0,
              background: `linear-gradient(90deg, ${theme.palette.primary.main} 0%, ${alpha(theme.palette.primary.light, 0.6)} 100%)`
            }
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              right: 0,
              p: 1.5,
              zIndex: 1
            }}
          >
            <Chip
              label="Important"
              size="small"
              color="primary"
              variant="filled"
              sx={{
                fontSize: '0.7rem',
                height: 22,
                fontWeight: 500,
                letterSpacing: '0.02em'
              }}
            />
          </Box>
          <CardContent sx={{ pt: 4.5 }}>
            <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2.5 }}>
              <Avatar
                sx={{
                  width: 48,
                  height: 48,
                  bgcolor: alpha(theme.palette.primary.main, 0.15),
                  color: theme.palette.primary.main,
                  borderRadius: 2,
                  mr: 2
                }}
              >
                <Icon icon="solar:chat-line-bold-duotone" width={28} />
              </Avatar>
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5, color: theme.palette.primary.dark }}>
                  CEO Message
                </Typography>
                <Typography
                  variant="caption"
                  sx={{ color: theme.palette.text.secondary, display: 'flex', alignItems: 'center' }}
                >
                  <Icon icon="solar:calendar-date-bold-duotone" style={{ marginRight: '4px', fontSize: '14px' }} />
                  Posted on June 10, 2023
                </Typography>
              </Box>
            </Box>
            <Box
              sx={{
                p: 2,
                borderRadius: 2,
                bgcolor: alpha(theme.palette.primary.main, 0.08),
                border: `1px dashed ${alpha(theme.palette.primary.main, 0.2)}`,
                mb: 1
              }}
            >
              <Typography variant="body2" sx={{ fontStyle: 'italic', position: 'relative' }}>
                <Icon
                  icon="solar:quote-up-square-bold"
                  style={{
                    fontSize: '18px',
                    opacity: 0.4,
                    marginRight: '4px',
                    verticalAlign: 'top',
                    color: theme.palette.primary.main
                  }}
                />
                Together, we're building a culture of excellence and innovation that will drive our success in the years
                ahead.
                <Icon
                  icon="solar:quote-down-square-bold"
                  style={{
                    fontSize: '18px',
                    opacity: 0.4,
                    marginLeft: '4px',
                    verticalAlign: 'bottom',
                    color: theme.palette.primary.main
                  }}
                />
              </Typography>
            </Box>
            <Typography
              variant="caption"
              sx={{
                color: theme.palette.text.secondary,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
                mt: 1
              }}
            >
              <Icon icon="solar:user-circle-bold-duotone" style={{ marginRight: '4px', fontSize: '14px' }} />
              Ahmed Al-Sayed, CEO
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} sm={6} md={4}>
        <Card
          sx={{
            borderRadius: 3,
            overflow: 'hidden',
            position: 'relative',
            border: `1px solid ${alpha(theme.palette.divider, 0.2)}`,
            boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
            '&:after': {
              content: '""',
              position: 'absolute',
              height: '3px',
              width: '100%',
              bottom: 0,
              left: 0,
              background: `linear-gradient(90deg, ${theme.palette.primary.main} 0%, ${alpha(theme.palette.primary.light, 0.6)} 100%)`
            }
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              right: 0,
              p: 1.5,
              zIndex: 1
            }}
          >
            <Chip
              label="Upcoming"
              size="small"
              color="primary"
              variant="filled"
              sx={{
                fontSize: '0.7rem',
                height: 22,
                fontWeight: 500,
                letterSpacing: '0.02em'
              }}
            />
          </Box>
          <CardContent sx={{ pt: 4.5 }}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'flex-start',
                mb: 2.5
              }}
            >
              <Avatar
                sx={{
                  width: 48,
                  height: 48,
                  bgcolor: alpha(theme.palette.primary.main, 0.15),
                  color: theme.palette.primary.main,
                  borderRadius: 2,
                  mr: 2
                }}
              >
                <Icon icon="solar:calendar-mark-bold-duotone" width={28} />
              </Avatar>
              <Box>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 600,
                    mb: 0.5,
                    color: theme.palette.mode === 'dark' ? theme.palette.primary.light : theme.palette.primary.dark
                  }}
                >
                  Upcoming Events
                </Typography>
                <Typography
                  variant="caption"
                  sx={{
                    color: theme.palette.text.secondary,
                    display: 'flex',
                    alignItems: 'center'
                  }}
                >
                  <Icon icon="solar:calendar-date-bold-duotone" style={{ marginRight: '4px', fontSize: '14px' }} />
                  Next 30 days
                </Typography>
              </Box>
            </Box>
            <Stack spacing={1.5}>
              <Box
                sx={{
                  p: 1.5,
                  borderRadius: 2,
                  bgcolor: alpha(theme.palette.primary.main, 0.08),
                  border: `1px dashed ${alpha(theme.palette.primary.main, 0.2)}`,
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                <Box
                  sx={{
                    width: 36,
                    height: 36,
                    borderRadius: 1,
                    bgcolor: alpha(theme.palette.primary.main, 0.15),
                    color: theme.palette.primary.main,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mr: 1.5
                  }}
                >
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    15
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    Quarterly Strategy Meeting
                  </Typography>
                  <Typography variant="caption" sx={{ color: theme.palette.text.secondary }}>
                    <Icon
                      icon="solar:clock-circle-bold-duotone"
                      style={{ fontSize: '12px', marginRight: '4px', verticalAlign: 'middle' }}
                    />
                    10:00 AM - 12:00 PM
                  </Typography>
                </Box>
              </Box>
              <Box
                sx={{
                  p: 1.5,
                  borderRadius: 2,
                  bgcolor: alpha(theme.palette.background.paper, 0.7),
                  border: `1px solid ${alpha(theme.palette.divider, 0.15)}`,
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                <Box
                  sx={{
                    width: 36,
                    height: 36,
                    borderRadius: 1,
                    bgcolor: alpha(theme.palette.grey[500], 0.1),
                    color: theme.palette.text.primary,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mr: 1.5
                  }}
                >
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    22
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    Team Building Workshop
                  </Typography>
                  <Typography variant="caption" sx={{ color: theme.palette.text.secondary }}>
                    <Icon
                      icon="solar:clock-circle-bold-duotone"
                      style={{ fontSize: '12px', marginRight: '4px', verticalAlign: 'middle' }}
                    />
                    2:00 PM - 5:00 PM
                  </Typography>
                </Box>
              </Box>
            </Stack>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1.5 }}>
              <Chip
                label="View All Events"
                size="small"
                color="default"
                variant="outlined"
                sx={{
                  fontSize: '0.7rem',
                  height: 24,
                  borderRadius: 1.5,
                  cursor: 'pointer',
                  '&:hover': {
                    bgcolor: alpha(theme.palette.primary.main, 0.1),
                    borderColor: theme.palette.primary.main
                  }
                }}
                icon={<Icon icon="solar:alt-arrow-right-bold-duotone" width={12} />}
              />
            </Box>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} sm={12} md={4}>
        <Card
          sx={{
            borderRadius: 3,
            overflow: 'hidden',
            position: 'relative',
            border: `1px solid ${alpha(theme.palette.divider, 0.2)}`,
            boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
            '&:after': {
              content: '""',
              position: 'absolute',
              height: '3px',
              width: '100%',
              bottom: 0,
              left: 0,
              background: `linear-gradient(90deg, ${theme.palette.secondary.main} 0%, ${alpha(theme.palette.secondary.light, 0.6)} 100%)`
            }
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              right: 0,
              p: 1.5,
              zIndex: 1
            }}
          >
            <Chip
              label="Celebrate"
              size="small"
              color="secondary"
              variant="filled"
              sx={{
                fontSize: '0.7rem',
                height: 22,
                fontWeight: 500,
                letterSpacing: '0.02em'
              }}
            />
          </Box>
          <CardContent sx={{ pt: 4.5 }}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'flex-start',
                mb: 2.5
              }}
            >
              <Avatar
                sx={{
                  width: 48,
                  height: 48,
                  bgcolor: alpha(theme.palette.secondary.main, 0.15),
                  color: theme.palette.secondary.main,
                  borderRadius: 2,
                  mr: 2
                }}
              >
                <Icon icon="solar:confetti-bold-duotone" width={28} />
              </Avatar>
              <Box>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 600,
                    mb: 0.5,
                    color: theme.palette.mode === 'dark' ? theme.palette.secondary.light : theme.palette.secondary.dark
                  }}
                >
                  Birthdays & Anniversaries
                </Typography>
                <Typography
                  variant="caption"
                  sx={{
                    color: theme.palette.text.secondary,
                    display: 'flex',
                    alignItems: 'center'
                  }}
                >
                  <Icon icon="solar:calendar-date-bold-duotone" style={{ marginRight: '4px', fontSize: '14px' }} />
                  This month
                </Typography>
              </Box>
            </Box>

            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle2" sx={{ mb: 1, color: theme.palette.text.secondary }}>
                <Icon
                  icon="solar:gift-bold-duotone"
                  style={{
                    marginRight: '6px',
                    fontSize: '16px',
                    verticalAlign: 'middle',
                    color: theme.palette.secondary.main
                  }}
                />
                Birthdays
              </Typography>

              <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
                <Avatar
                  sx={{
                    width: 36,
                    height: 36,
                    bgcolor: alpha(theme.palette.secondary.main, 0.1),
                    color: theme.palette.secondary.main,
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    border: `2px solid ${alpha(theme.palette.secondary.main, 0.3)}`
                  }}
                >
                  SA
                </Avatar>
                <Box>
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    Sarah Al-Mahmoud
                  </Typography>
                  <Typography variant="caption" sx={{ color: theme.palette.text.secondary }}>
                    Finance Department • June 15
                  </Typography>
                </Box>
              </Stack>
            </Box>

            <Box>
              <Typography variant="subtitle2" sx={{ mb: 1, color: theme.palette.text.secondary }}>
                <Icon
                  icon="solar:medal-ribbon-bold-duotone"
                  style={{
                    marginRight: '6px',
                    fontSize: '16px',
                    verticalAlign: 'middle',
                    color: theme.palette.secondary.main
                  }}
                />
                Work Anniversaries
              </Typography>

              <Stack direction="row" spacing={1}>
                <Avatar
                  sx={{
                    width: 36,
                    height: 36,
                    bgcolor: alpha(theme.palette.secondary.light, 0.2),
                    color: theme.palette.secondary.dark,
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    border: `2px solid ${alpha(theme.palette.secondary.main, 0.3)}`
                  }}
                >
                  JT
                </Avatar>
                <Box>
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    John Thompson
                  </Typography>
                  <Typography variant="caption" sx={{ color: theme.palette.text.secondary }}>
                    Operations • 5 Years • June 24
                  </Typography>
                </Box>
              </Stack>
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
              <Chip
                label="Send Wishes"
                size="small"
                color="secondary"
                variant="outlined"
                sx={{
                  fontSize: '0.7rem',
                  height: 24,
                  borderRadius: 1.5,
                  cursor: 'pointer',
                  '&:hover': {
                    bgcolor: alpha(theme.palette.secondary.main, 0.1)
                  }
                }}
                icon={<Icon icon="solar:emoji-funny-square-bold-duotone" width={12} />}
              />
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default InternalUpdates;
