import { Icon } from '@iconify/react';
import { Box, Divider, Tab, Tabs, useTheme } from '@mui/material';
import MainCard from 'components/MainCard';
import { useMemo, useState } from 'react';
import NormalizedData from './NormalizedData';
import RowData from './RowData';

const ViewDataIndex = () => {
  const [currentTab, setCurrentTab] = useState('RawData');
  const theme = useTheme();

  const tabs = useMemo(
    () => [
      {
        value: 'RawData',
        label: 'Raw Data',
        icon: <Icon icon="mdi:database" width={20} height={20} color={theme.palette.primary.main} />,
        component: <RowData />,
        color: theme.palette.primary.main
      },
      {
        value: 'NormalizedData',
        label: 'Normalized Data',
        icon: <Icon icon="mdi:database-check" width={20} height={20} color={theme.palette.primary.main} />,
        component: <NormalizedData />,
        color: theme.palette.primary.main
      }
    ],
    [theme]
  );

  // Find the current tab information
  const currentTabInfo = tabs.find((tab) => tab.value === currentTab);

  return (
    <>
      <title>View Data - GIB UI</title>
      <meta name="description" content="View and analyze raw and normalized investment data in GIB UI" />
      <meta property="og:title" content="View Data - GIB UI" />
      <meta property="og:description" content="View and analyze raw and normalized investment data in GIB UI" />

      <Box>
        <MainCard title="View Data" elevation={0} sx={{ p: '0 !important' }} contentSX={{ p: '0 !important' }}>
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

export default ViewDataIndex;
