import { useEffect, useState } from 'react';

// material-ui
import { Icon } from '@iconify/react';
import { alpha, Avatar, Box, Card, CardContent, Divider, Grid, Stack, Typography, useTheme } from '@mui/material';

// project imports
import MainCard from 'components/MainCard';
import { gridSpacing } from 'config';
import LeadershipCard from './LeadershipCard';
import TadawulFeed from './TadawulFeed';
import WelcomeCard from './WelcomeCard';

// ==============================|| HOME PAGE ||============================== //

const Home = () => {
  const theme = useTheme();
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 60000); // Update every minute

    return () => clearInterval(timer);
  }, []);

  const formatDate = (date) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <Grid container spacing={gridSpacing}>
      {/* Welcome Message */}
      <Grid item xs={12}>
        <WelcomeCard />
      </Grid>

      {/* Mission & Vision */}
      <Grid item xs={12} md={6}>
        <MainCard
          sx={{
            backgroundColor: theme.palette.mode === 'dark' ? 'background.default' : 'grey.50',
            position: 'relative',
            overflow: 'hidden',
            '&:before': {
              content: '""',
              position: 'absolute',
              width: 210,
              height: 210,
              background: `linear-gradient(140.9deg, ${theme.palette.primary.main} -14.02%, rgba(144, 202, 249, 0) 77.58%)`,
              borderRadius: '50%',
              top: -85,
              right: -95,
              opacity: 0.2
            }
          }}
          title="Our Mission & Vision"
          secondary={
            <Avatar
              sx={{
                width: 34,
                height: 34,
                bgcolor: theme.palette.primary.light,
                color: theme.palette.primary.dark
              }}
            >
              <Icon icon="solar:flag-bold-duotone" width={22} height={22} />
            </Avatar>
          }
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h4" sx={{ color: theme.palette.primary.main, mb: 1 }}>
                Mission
              </Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                To deliver exceptional investment solutions through cutting-edge technology, ensuring accuracy,
                efficiency, and transparency in all investment operations.
              </Typography>
              <Divider sx={{ my: 2 }} />
              <Typography variant="h4" sx={{ color: theme.palette.primary.main, mb: 1 }}>
                Vision
              </Typography>
              <Typography variant="body1">
                To be the industry leader in investment verification and reconciliation services, transforming data into
                actionable insights that drive successful investment strategies.
              </Typography>
            </Grid>
          </Grid>
        </MainCard>
      </Grid>

      {/* Date, Time & Weather */}
      <Grid item xs={12} md={6}>
        <MainCard
          sx={{
            backgroundColor: theme.palette.mode === 'dark' ? 'background.default' : 'grey.50'
          }}
          title="Date, Time & Weather"
          secondary={
            <Avatar
              sx={{
                width: 34,
                height: 34,
                bgcolor: theme.palette.primary.light,
                color: theme.palette.primary.dark
              }}
            >
              <Icon icon="solar:calendar-bold-duotone" width={22} height={22} />
            </Avatar>
          }
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Card
                sx={{
                  boxShadow: theme.shadows[2],
                  bgcolor: theme.palette.primary.light,
                  color: theme.palette.primary.darker
                }}
              >
                <CardContent>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Icon icon="solar:calendar-bold-duotone" width={32} height={32} />
                    <Box>
                      <Typography variant="h6">Date</Typography>
                      <Typography variant="subtitle1">{formatDate(currentDateTime)}</Typography>
                    </Box>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Card
                sx={{
                  boxShadow: theme.shadows[2],
                  bgcolor: theme.palette.secondary.light,
                  color: theme.palette.secondary.darker
                }}
              >
                <CardContent>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Icon icon="solar:clock-circle-bold-duotone" width={32} height={32} />
                    <Box>
                      <Typography variant="h6">Time</Typography>
                      <Typography variant="subtitle1">{formatTime(currentDateTime)}</Typography>
                    </Box>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12}>
              <Card sx={{ boxShadow: theme.shadows[2], bgcolor: alpha(theme.palette.primary.main, 0.05) }}>
                <CardContent>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Icon icon="solar:sun-fog-bold-duotone" width={36} height={36} color={theme.palette.warning.main} />
                    <Box>
                      <Typography variant="h6">Weather</Typography>
                      <Typography variant="body2" color="textSecondary">
                        Connect to a weather API for real-time weather data
                      </Typography>
                    </Box>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </MainCard>
      </Grid>

      {/* Live Market Feed */}
      <Grid item xs={12} md={8}>
        <MainCard
          sx={{
            height: '100%',
            backgroundColor: theme.palette.mode === 'dark' ? 'background.default' : 'grey.50'
          }}
          title="Live Market Feed (Tadawul)"
          secondary={
            <Avatar
              sx={{
                width: 34,
                height: 34,
                bgcolor: theme.palette.success.light,
                color: theme.palette.success.dark
              }}
            >
              <Icon icon="solar:chart-bold-duotone" width={22} height={22} />
            </Avatar>
          }
        >
          <TadawulFeed />
        </MainCard>
      </Grid>

      {/* Leadership Insights */}
      <Grid item xs={12} md={4}>
        <LeadershipCard />
      </Grid>

      {/* Internal Updates */}
      <Grid item xs={12}>
        <MainCard
          sx={{
            backgroundColor: theme.palette.mode === 'dark' ? 'background.default' : 'grey.50'
          }}
          title="Internal Updates"
          secondary={
            <Avatar
              sx={{
                width: 34,
                height: 34,
                bgcolor: theme.palette.info.light,
                color: theme.palette.info.dark
              }}
            >
              <Icon icon="solar:bell-bold-duotone" width={22} height={22} />
            </Avatar>
          }
        >
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <Card sx={{ boxShadow: theme.shadows[2], bgcolor: alpha(theme.palette.primary.light, 0.1) }}>
                <CardContent>
                  <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: theme.palette.primary.main, mb: 2 }}>
                    <Icon icon="solar:chat-line-bold-duotone" style={{ verticalAlign: 'middle', marginRight: '8px' }} />{' '}
                    CEO Message
                  </Typography>
                  <Typography variant="body2">
                    "Together, we're building a culture of excellence and innovation that will drive our success in the
                    years ahead."
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={4}>
              <Card sx={{ boxShadow: theme.shadows[2], bgcolor: alpha(theme.palette.success.light, 0.1) }}>
                <CardContent>
                  <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: theme.palette.success.main, mb: 2 }}>
                    <Icon
                      icon="solar:calendar-mark-bold-duotone"
                      style={{ verticalAlign: 'middle', marginRight: '8px' }}
                    />{' '}
                    Upcoming Events
                  </Typography>
                  <Typography variant="body2">Quarterly Strategy Meeting - June 15, 2023</Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={4}>
              <Card sx={{ boxShadow: theme.shadows[2], bgcolor: alpha(theme.palette.warning.light, 0.1) }}>
                <CardContent>
                  <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: theme.palette.warning.main, mb: 2 }}>
                    <Icon icon="solar:confetti-bold-duotone" style={{ verticalAlign: 'middle', marginRight: '8px' }} />{' '}
                    Birthdays & Anniversaries
                  </Typography>
                  <Typography variant="body2">
                    Happy Birthday to Sarah (Finance) & 5-Year Anniversary for John (Operations)
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </MainCard>
      </Grid>
    </Grid>
  );
};

export default Home;
