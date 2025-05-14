import { useMemo, useState } from 'react';

import { Icon } from '@iconify/react';
import { Box, Divider, Tab, Tabs, useTheme } from '@mui/material';

import MainCard from 'components/MainCard';
import FullMatch from './FullMatchReport';
import Missing from './Missing';
import NearMatch from './NearMatchReports';
import Skipped from './SkippedReport';
import Tolerance from './ToleranceReports';

const GeneratedReports = () => {
  const [currentTab, setCurrentTab] = useState('FullMatch');
  const theme = useTheme();

  const tabs = useMemo(
    () => [
      {
        value: 'FullMatch',
        label: 'Full Match',
        icon: <Icon icon="solar:check-circle-bold-duotone" width={22} height={22} />,
        color: theme.palette.primary.main,
        component: <FullMatch />,
        title: 'Full Match Report',
        description: 'Full Match Report - View and analyze full match reconciliation data'
      },
      {
        value: 'Tolerance',
        label: 'Tolerance',
        icon: <Icon icon="solar:shield-check-bold-duotone" width={22} height={22} />,
        color: theme.palette.primary.main,
        component: <Tolerance />,
        title: 'Tolerance Report',
        description: 'Tolerance Report - View and analyze tolerance-based reconciliation data'
      },
      {
        value: 'NearMatch',
        label: 'Near Match',
        icon: <Icon icon="solar:bell-bold-duotone" width={22} height={22} />,
        color: theme.palette.primary.main,
        component: <NearMatch />,
        title: 'Near Match Report',
        description: 'Near Match Report - View and analyze near-match reconciliation data'
      },
      {
        value: 'Missing',
        label: 'Missing',
        icon: <Icon icon="solar:danger-triangle-bold-duotone" width={22} height={22} />,
        color: theme.palette.primary.main,
        component: <Missing />,
        title: 'Missing Report',
        description: 'Missing Report - View and analyze missing reconciliation data'
      },
      {
        value: 'Skipped',
        label: 'Skipped',
        icon: <Icon icon="solar:skip-previous-bold-duotone" width={22} height={22} />,
        color: theme.palette.primary.main,
        component: <Skipped />,
        title: 'Skipped Report',
        description: 'Skipped Report - View and analyze skipped reconciliation data'
      }
    ],
    [theme]
  );

  // Find the current tab information
  const currentTabInfo = tabs.find((tab) => tab.value === currentTab);

  return (
    <Box>
      {/* Conditionally render meta tags based on the current tab */}
      <title>{currentTabInfo?.title}</title>
      <meta name="description" content={currentTabInfo?.description} />
      <meta property="og:title" content={currentTabInfo?.title} />
      <meta property="og:description" content={currentTabInfo?.description} />

      <MainCard title="Generated Reports" elevation={0} sx={{ p: '0 !important' }} contentSX={{ p: '0 !important' }}>
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
  );
};

export default GeneratedReports;
