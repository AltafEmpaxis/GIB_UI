import { useEffect, useState } from 'react';

// material-ui
import { Icon } from '@iconify/react';
import { alpha, Avatar, Box, Card, CardContent, Chip, Grid, Paper, Stack, Typography, useTheme } from '@mui/material';
import { motion } from 'framer-motion';

// project imports
import MainCard from 'components/MainCard';
import { GRID_SPACING } from 'config';
import DateTimeWeather from './DateTimeWeather';
import LeadershipCard from './LeadershipCard';
import TadawulFeed from './TadawulFeed';
import WelcomeCard from './WelcomeCard';

// ==============================|| HOME PAGE ||============================== //

const Home = () => {
  const theme = useTheme();

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.4, ease: 'easeOut' }
    }
  };

  return (
    <Box component={motion.div} initial="hidden" animate="visible" variants={containerVariants}>
      <Grid container spacing={GRID_SPACING}>
        {/* Welcome Message */}
        <Grid item xs={12} component={motion.div} variants={itemVariants}>
          <WelcomeCard />
        </Grid>

        {/* Mission & Vision */}
        <Grid item xs={12} md={6} component={motion.div} variants={itemVariants}>
          <MainCard
            sx={{
              height: '100%',
              borderRadius: 2,
              overflow: 'hidden',
              boxShadow: theme.palette.mode === 'dark' ? '0 3px 14px rgba(0,0,0,0.3)' : '0 3px 14px rgba(58,53,65,0.1)',
              position: 'relative',
              '&:before': {
                content: '""',
                position: 'absolute',
                width: 210,
                height: 210,
                background: `linear-gradient(140.9deg, ${theme.palette.primary.main} -14.02%, rgba(144, 202, 249, 0) 77.58%)`,
                borderRadius: '50%',
                top: -85,
                right: -95,
                opacity: 0.2,
                transition: 'all 0.3s ease-in-out'
              },
              '&:hover:before': {
                transform: 'scale(1.05) translate(-5px, 5px)',
                opacity: 0.25
              }
            }}
            title={
              <Stack direction="row" alignItems="center" spacing={1.5}>
                <Avatar
                  sx={{
                    width: 34,
                    height: 34,
                    bgcolor: alpha(theme.palette.primary.main, 0.2),
                    color: theme.palette.primary.main
                  }}
                >
                  <Icon icon="solar:flag-bold-duotone" width={22} height={22} />
                </Avatar>
                <Typography variant="h5">Our Mission & Vision</Typography>
              </Stack>
            }
          >
            <Box sx={{ height: '100%' }}>
              <Paper
                elevation={0}
                sx={{
                  p: 2,
                  mb: 2,
                  borderRadius: 1.5,
                  bgcolor: alpha(theme.palette.primary.light, 0.1),
                  border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`
                }}
              >
                <Typography
                  variant="h5"
                  sx={{
                    color: theme.palette.primary.main,
                    mb: 1,
                    display: 'flex',
                    alignItems: 'center'
                  }}
                >
                  <Icon
                    icon="streamline-ultimate-color:business-team-goal"
                    style={{ marginRight: '8px', fontSize: '22px' }}
                  />
                  Mission
                </Typography>
                <Typography variant="body1" sx={{ mb: 0.5 }}>
                  To deliver exceptional investment solutions through cutting-edge technology, ensuring accuracy,
                  efficiency, and transparency in all investment operations.
                </Typography>
              </Paper>

              <Paper
                elevation={0}
                sx={{
                  p: 2,
                  borderRadius: 1.5,
                  bgcolor: alpha(theme.palette.primary.light, 0.1),
                  border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`
                }}
              >
                <Typography
                  variant="h5"
                  sx={{
                    color: theme.palette.primary.main,
                    mb: 1,
                    display: 'flex',
                    alignItems: 'center'
                  }}
                >
                  <Icon icon="solar:telescope-bold-duotone" style={{ marginRight: '8px', fontSize: '22px' }} />
                  Vision
                </Typography>
                <Typography variant="body1">
                  To be the industry leader in investment verification and reconciliation services, transforming data
                  into actionable insights that drive successful investment strategies.
                </Typography>
              </Paper>
            </Box>
          </MainCard>
        </Grid>

        {/* Date, Time & Weather */}
        <Grid item xs={12} md={6} component={motion.div} variants={itemVariants}>
          <DateTimeWeather />
        </Grid>

        {/* Live Market Feed */}
        <Grid item xs={12} md={8} component={motion.div} variants={itemVariants}>
          <MainCard
            sx={{
              height: '100%',
              borderRadius: 2,
              overflow: 'hidden',
              boxShadow: theme.palette.mode === 'dark' ? '0 3px 14px rgba(0,0,0,0.3)' : '0 3px 14px rgba(58,53,65,0.1)'
            }}
            title={
              <Stack direction="row" alignItems="center" spacing={1.5}>
                <Avatar
                  sx={{
                    width: 34,
                    height: 34,
                    bgcolor: alpha(theme.palette.success.main, 0.2),
                    color: theme.palette.success.main
                  }}
                >
                  <Icon icon="solar:chart-bold-duotone" width={22} height={22} />
                </Avatar>
                <Typography variant="h5">Live Market Feed (Tadawul)</Typography>
              </Stack>
            }
            secondary={
              <Chip
                label="Real-time Data"
                size="small"
                color="success"
                variant="filled"
                sx={{
                  fontSize: '0.75rem',
                  height: 24
                }}
                icon={<Icon icon="solar:refresh-bold-duotone" width={14} />}
              />
            }
          >
            <TadawulFeed />
          </MainCard>
        </Grid>

        {/* Leadership Insights */}
        <Grid item xs={12} md={4} component={motion.div} variants={itemVariants}>
          <LeadershipCard />
        </Grid>

        {/* Internal Updates */}
        <Grid item xs={12} component={motion.div} variants={itemVariants}>
          <MainCard
            sx={{
              borderRadius: 2,
              overflow: 'hidden',
              boxShadow: theme.palette.mode === 'dark' ? '0 3px 14px rgba(0,0,0,0.3)' : '0 3px 14px rgba(58,53,65,0.1)',
              '&:before': {
                content: '""',
                position: 'absolute',
                width: 300,
                height: 300,
                background: `radial-gradient(circle, ${alpha(theme.palette.info.main, 0.1)} 0%, rgba(255,255,255,0) 70%)`,
                borderRadius: '50%',
                bottom: -150,
                right: -100,
                zIndex: 0
              }
            }}
            title={
              <Stack direction="row" alignItems="center" spacing={1.5}>
                <Avatar
                  sx={{
                    width: 38,
                    height: 38,
                    bgcolor: alpha(theme.palette.info.main, 0.2),
                    color: theme.palette.info.main,
                    boxShadow: `0 2px 10px ${alpha(theme.palette.info.main, 0.2)}`
                  }}
                >
                  <Icon icon="solar:bell-bold-duotone" width={24} height={24} />
                </Avatar>
                <Typography variant="h5" sx={{ fontWeight: 600, letterSpacing: '0.02em' }}>
                  Internal Updates
                </Typography>
              </Stack>
            }
            secondary={
              <Stack direction="row" spacing={1}>
                <Chip
                  label="New"
                  size="small"
                  color="error"
                  variant="filled"
                  sx={{
                    fontSize: '0.75rem',
                    height: 24,
                    borderRadius: '12px',
                    fontWeight: 500,
                    boxShadow: `0 2px 6px ${alpha(theme.palette.error.main, 0.25)}`
                  }}
                />
                <Chip
                  label="3 updates"
                  size="small"
                  color="info"
                  variant="outlined"
                  sx={{
                    fontSize: '0.75rem',
                    height: 24,
                    borderRadius: '12px',
                    fontWeight: 500
                  }}
                  icon={<Icon icon="solar:document-text-bold-duotone" width={14} />}
                />
              </Stack>
            }
          >
            <Grid container spacing={3} sx={{ position: 'relative', zIndex: 1 }}>
              <Grid item xs={12} md={4}>
                <Card
                  component={motion.div}
                  whileHover={{ y: -8, boxShadow: theme.shadows[5] }}
                  sx={{
                    borderRadius: 3,
                    overflow: 'hidden',
                    boxShadow: `0 5px 20px ${alpha(theme.palette.primary.main, 0.1)}`,
                    position: 'relative',
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
                        letterSpacing: '0.02em',
                        boxShadow: `0 2px 10px ${alpha(theme.palette.primary.main, 0.3)}`
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
                          mr: 2,
                          boxShadow: `0 4px 12px ${alpha(theme.palette.primary.main, 0.2)}`
                        }}
                      >
                        <Icon icon="solar:chat-line-bold-duotone" width={28} />
                      </Avatar>
                      <Box>
                        <Typography
                          variant="h6"
                          sx={{
                            fontWeight: 600,
                            mb: 0.5,
                            color:
                              theme.palette.mode === 'dark' ? theme.palette.primary.light : theme.palette.primary.dark
                          }}
                        >
                          CEO Message
                        </Typography>
                        <Typography
                          variant="caption"
                          sx={{
                            color: theme.palette.text.secondary,
                            display: 'flex',
                            alignItems: 'center'
                          }}
                        >
                          <Icon
                            icon="solar:calendar-date-bold-duotone"
                            style={{ marginRight: '4px', fontSize: '14px' }}
                          />
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
                        Together, we're building a culture of excellence and innovation that will drive our success in
                        the years ahead.
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

              <Grid item xs={12} md={4}>
                <Card
                  component={motion.div}
                  whileHover={{ y: -8, boxShadow: theme.shadows[5] }}
                  sx={{
                    borderRadius: 3,
                    overflow: 'hidden',
                    boxShadow: `0 5px 20px ${alpha(theme.palette.success.main, 0.1)}`,
                    position: 'relative',
                    '&:after': {
                      content: '""',
                      position: 'absolute',
                      height: '3px',
                      width: '100%',
                      bottom: 0,
                      left: 0,
                      background: `linear-gradient(90deg, ${theme.palette.success.main} 0%, ${alpha(theme.palette.success.light, 0.6)} 100%)`
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
                      color="success"
                      variant="filled"
                      sx={{
                        fontSize: '0.7rem',
                        height: 22,
                        fontWeight: 500,
                        letterSpacing: '0.02em',
                        boxShadow: `0 2px 10px ${alpha(theme.palette.success.main, 0.3)}`
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
                          bgcolor: alpha(theme.palette.success.main, 0.15),
                          color: theme.palette.success.main,
                          borderRadius: 2,
                          mr: 2,
                          boxShadow: `0 4px 12px ${alpha(theme.palette.success.main, 0.2)}`
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
                            color:
                              theme.palette.mode === 'dark' ? theme.palette.success.light : theme.palette.success.dark
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
                          <Icon
                            icon="solar:calendar-date-bold-duotone"
                            style={{ marginRight: '4px', fontSize: '14px' }}
                          />
                          Next 30 days
                        </Typography>
                      </Box>
                    </Box>
                    <Stack spacing={1.5}>
                      <Box
                        sx={{
                          p: 1.5,
                          borderRadius: 2,
                          bgcolor: alpha(theme.palette.success.main, 0.08),
                          border: `1px dashed ${alpha(theme.palette.success.main, 0.2)}`,
                          display: 'flex',
                          alignItems: 'center'
                        }}
                      >
                        <Box
                          sx={{
                            width: 36,
                            height: 36,
                            borderRadius: 1,
                            bgcolor: alpha(theme.palette.success.main, 0.15),
                            color: theme.palette.success.main,
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
                            bgcolor: alpha(theme.palette.success.main, 0.1),
                            borderColor: theme.palette.success.main
                          }
                        }}
                        icon={<Icon icon="solar:alt-arrow-right-bold-duotone" width={12} />}
                      />
                    </Box>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12} md={4}>
                <Card
                  component={motion.div}
                  whileHover={{ y: -8, boxShadow: theme.shadows[5] }}
                  sx={{
                    borderRadius: 3,
                    overflow: 'hidden',
                    boxShadow: `0 5px 20px ${alpha(theme.palette.warning.main, 0.1)}`,
                    position: 'relative',
                    '&:after': {
                      content: '""',
                      position: 'absolute',
                      height: '3px',
                      width: '100%',
                      bottom: 0,
                      left: 0,
                      background: `linear-gradient(90deg, ${theme.palette.warning.main} 0%, ${alpha(theme.palette.warning.light, 0.6)} 100%)`
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
                      color="warning"
                      variant="filled"
                      sx={{
                        fontSize: '0.7rem',
                        height: 22,
                        fontWeight: 500,
                        letterSpacing: '0.02em',
                        boxShadow: `0 2px 10px ${alpha(theme.palette.warning.main, 0.3)}`
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
                          bgcolor: alpha(theme.palette.warning.main, 0.15),
                          color: theme.palette.warning.main,
                          borderRadius: 2,
                          mr: 2,
                          boxShadow: `0 4px 12px ${alpha(theme.palette.warning.main, 0.2)}`
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
                            color:
                              theme.palette.mode === 'dark' ? theme.palette.warning.light : theme.palette.warning.dark
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
                          <Icon
                            icon="solar:calendar-date-bold-duotone"
                            style={{ marginRight: '4px', fontSize: '14px' }}
                          />
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
                            color: theme.palette.warning.main
                          }}
                        />
                        Birthdays
                      </Typography>

                      <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
                        <Avatar
                          sx={{
                            width: 36,
                            height: 36,
                            bgcolor: alpha(theme.palette.warning.main, 0.1),
                            color: theme.palette.warning.main,
                            fontSize: '0.85rem',
                            fontWeight: 600,
                            border: `2px solid ${alpha(theme.palette.warning.main, 0.3)}`
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
                            color: theme.palette.warning.main
                          }}
                        />
                        Work Anniversaries
                      </Typography>

                      <Stack direction="row" spacing={1}>
                        <Avatar
                          sx={{
                            width: 36,
                            height: 36,
                            bgcolor: alpha(theme.palette.warning.light, 0.2),
                            color: theme.palette.warning.dark,
                            fontSize: '0.85rem',
                            fontWeight: 600,
                            border: `2px solid ${alpha(theme.palette.warning.main, 0.3)}`
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
                        color="warning"
                        variant="outlined"
                        sx={{
                          fontSize: '0.7rem',
                          height: 24,
                          borderRadius: 1.5,
                          cursor: 'pointer',
                          '&:hover': {
                            bgcolor: alpha(theme.palette.warning.main, 0.1)
                          }
                        }}
                        icon={<Icon icon="solar:emoji-funny-square-bold-duotone" width={12} />}
                      />
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </MainCard>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Home;
