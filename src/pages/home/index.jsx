import { useState } from 'react';

// material-ui
import { Icon } from '@iconify/react';
import { alpha, Avatar, Box, Card, CardContent, Chip, Grid, Stack, Typography, useTheme } from '@mui/material';

// project imports
import MainCard from 'components/MainCard';
import { GRID_SPACING } from 'config';
import LeadershipCard from './LeadershipCard';
import MissionVisionSlider from './MissionVisionSlider';
import TadawulFeed from './TadawulFeed';
import InternalUpdates from './InternalUpdates';
import LatestNewsAndInsights from './LatestNewsAndInsights';

// ==============================|| HOME PAGE ||============================== //

const Home = () => {
  const theme = useTheme();
  const [isLoading, setIsLoading] = useState(false);

  return (
    <Card sx={{ p: 1, borderRadius: 2 }}>
      <Grid container spacing={GRID_SPACING}>
        {/* Mission & Vision - Full width with 100dvh height */}
        <Grid item xs={12} sx={{ mb: 2 }}>
          <MissionVisionSlider />
        </Grid>

        {/* Leadership Insights - 8/12 width */}
        <Grid item xs={12} md={8} sx={{ mb: { xs: 3, md: 0 } }}>
          <MainCard
            contentSX={{ p: '0 !important' }}
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
                  <Icon icon="solar:users-group-rounded-bold-duotone" width={22} height={22} />
                </Avatar>
                <Typography variant="h5">Our Leadership Team</Typography>
              </Stack>
            }
          >
            <LeadershipCard />
          </MainCard>
        </Grid>

        {/* Live Market Feed - 4/12 width */}
        <Grid item xs={12} md={4}>
          <MainCard
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
                  <Icon icon="solar:chart-bold-duotone" width={22} height={22} />
                </Avatar>
                <Typography variant="h5">Live Market Feed (Tadawul)</Typography>
              </Stack>
            }
            secondary={
              <Chip
                label="Real-time Data"
                size="small"
                color="secondary"
                variant="filled"
                sx={{
                  fontSize: '0.75rem',
                  height: 24,
                  color: theme.palette.secondary.contrastText,
                  fontWeight: 500
                }}
                icon={
                  <Icon icon="solar:refresh-bold-duotone" width={14} color={theme.palette.secondary.contrastText} />
                }
              />
            }
          >
            <TadawulFeed isLoading={isLoading} />
          </MainCard>
        </Grid>

        {/* Internal Updates - Full width */}
        <Grid item xs={12} sx={{ mt: 1 }}>
          <MainCard
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
                  color="secondary"
                  variant="filled"
                  sx={{
                    color: theme.palette.secondary.contrastText,
                    fontWeight: 500
                  }}
                />
                <Chip
                  label="3 updates"
                  size="small"
                  color="primary"
                  variant="outlined"
                  icon={<Icon icon="solar:document-text-bold-duotone" width={14} />}
                  sx={{ fontWeight: 500 }}
                />
              </Stack>
            }
          >
            <InternalUpdates />
          </MainCard>
        </Grid>

        {/* Latest News & Insights - Full width */}
        <Grid item xs={12} sx={{ mt: 3 }}>
          <MainCard contentSX={{ p: { xs: 2, sm: 3 } }} color="secondary">
            <LatestNewsAndInsights />
          </MainCard>
        </Grid>
      </Grid>
    </Card>
  );
};

export default Home;
