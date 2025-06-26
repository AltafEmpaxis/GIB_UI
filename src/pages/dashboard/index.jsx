import { Icon } from '@iconify/react';
import { Box, Divider, IconButton, Stack, Tab, Tabs, Tooltip, Typography, useTheme } from '@mui/material';
import MainCard from 'components/MainCard';
import { useEffect, useMemo, useState } from 'react';
import Activity from './Activity';
import ReconSummary from './ReconSummary';

const Dashboard = () => {
  const [currentTab, setCurrentTab] = useState('ReconSummary');
  const theme = useTheme();
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const tabs = useMemo(
    () => [
      {
        value: 'ReconSummary',
        label: 'Recon Summary',
        icon: <Icon icon="solar:home-2-bold-duotone" width={20} height={20} color={theme.palette.primary.main} />,
        component: <ReconSummary isLoading={isLoading} />,
        color: theme.palette.primary.main
      },
      {
        value: 'Activity',
        label: 'Activity',
        icon: <Icon icon="hugeicons:activity-01" width={20} height={20} color={theme.palette.primary.main} />,
        component: <Activity isLoading={isLoading} />,
        color: theme.palette.primary.main
      }
    ],
    [theme, isLoading]
  );

  // Find the current tab information
  const currentTabInfo = tabs.find((tab) => tab.value === currentTab);

  // Header JSX
  const header = (
    <Box>
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        alignItems={{ xs: 'flex-start', sm: 'center' }}
        justifyContent="space-between"
        spacing={2}
      >
        <Stack direction="row" alignItems="center" spacing={2}>
          <Box>
            <Typography
              variant="h5"
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                fontSize: '1.5rem'
              }}
            >
              <Icon icon="fluent-emoji:bank" />
              GIB SmartOPS
            </Typography>
          </Box>
        </Stack>
        <Tooltip title="Refresh Dashboard" placement="left">
          <IconButton size="medium">
            <Icon icon="solar:refresh-bold-duotone" width={22} height={22} />
          </IconButton>
        </Tooltip>
      </Stack>
    </Box>
  );

  return (
    <>
      <title>View Data - GIB UI</title>
      <meta name="description" content="" />
      <meta property="og:title" content="" />
      <meta property="og:description" content="" />

      <Box>
        <MainCard title={header} elevation={0} sx={{ p: '0!important' }} contentSX={{ p: '0.5rem !important' }}>
          <Tabs
            value={currentTab}
            onChange={(event, newValue) => setCurrentTab(newValue)}
            TabIndicatorProps={{
              style: {
                backgroundColor: currentTabInfo?.color
              }
            }}
          >
            {tabs.map((tab) => (
              <Tab
                key={tab.value}
                value={tab.value}
                label={tab.label}
                icon={tab.icon}
                iconPosition="start"
                sx={{
                  fontWeight: 500,
                  '&.Mui-selected': {
                    color: tab.color
                  }
                }}
              />
            ))}
          </Tabs>
          <Divider />
          {tabs.map((tab) => tab.value === currentTab && <Box key={tab.value}>{tab.component}</Box>)}
        </MainCard>
      </Box>
    </>
  );
};

export default Dashboard;
