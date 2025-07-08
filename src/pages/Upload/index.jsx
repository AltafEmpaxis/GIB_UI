import { Icon } from '@iconify/react';
import { Box, Divider, IconButton, Stack, Tab, Tabs, Tooltip, Typography, useTheme } from '@mui/material';
import MainCard from 'components/MainCard';
import { useEffect, useMemo, useState } from 'react';
import DetailReconTool from './DetailReconTool';
import UploadData from './UploadData';
import ViewData from './ViewData';

const Upload = () => {
  const [currentTab, setCurrentTab] = useState('upload');
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
        value: 'upload',
        label: 'Upload Data',
        icon: <Icon icon="mdi:cloud-upload" width={20} height={20} />,
        component: <UploadData isLoading={isLoading} />,
        color: theme.palette.primary.main
      },
      {
        value: 'view',
        label: 'View Data',
        icon: <Icon icon="mdi:eye" width={20} height={20} />,
        component: <ViewData isLoading={isLoading} />,
        color: theme.palette.secondary.main
      },
      {
        value: 'detailReconTool',
        label: 'Detail Recon Tool',
        icon: <Icon icon="mdi:eye" width={20} height={20} />,
        component: <DetailReconTool />,
        color: theme.palette.secondary.main
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
              <Icon icon="mdi:database-import" />
              Data Management
            </Typography>
          </Box>
        </Stack>
        <Tooltip title="Refresh Data" placement="left">
          <IconButton size="medium">
            <Icon icon="solar:refresh-bold-duotone" width={22} height={22} />
          </IconButton>
        </Tooltip>
      </Stack>
    </Box>
  );

  return (
    <>
      <title>Data Management - GIB UI</title>
      <meta name="description" content="Upload and view data for GIB application" />
      <meta property="og:title" content="Data Management - GIB UI" />
      <meta property="og:description" content="Upload and view data for GIB application" />

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
            sx={{
              '& .Mui-selected': {
                color: currentTabInfo?.color
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
                  minHeight: 48
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

export default Upload;
