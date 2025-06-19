import { useState, useMemo } from 'react';

import { Icon } from '@iconify/react';
import { Tab, Tabs, Box, Divider, useTheme } from '@mui/material';

import CorporateActionActivity from './CorporateActionActivity';
import PortfolioSecuritiesActivity from './PortfolioSecuritiesActivity';
import TradesActivity from './TradesActivity';
import RecentReconActivity from './RecentReconActivity';
import MainCard from 'components/MainCard';

// project imports
const RecentActivity = () => {
  const [currentTab, setCurrentTab] = useState('CorporateAction');
  const theme = useTheme();

  const tabs = useMemo(
    () => [
      {
        value: 'CorporateAction',
        label: 'Corporate Action',
        icon: (
          <Icon icon="solar:diploma-verified-bold-duotone" width={22} height={22} color={theme.palette.success.main} />
        ),
        color: theme.palette.success.main,
        component: <CorporateActionActivity />,
        title: 'Corporate Action Report',
        description: 'Corporate Action Report - View and analyze corporate action data'
      },
      {
        value: 'PortfolioSecurities',
        label: 'New Portfolio & Securities',
        icon: <Icon icon="solar:folder-check-bold-duotone" width={22} height={22} color={theme.palette.primary.main} />,
        color: theme.palette.primary.main,
        component: <PortfolioSecuritiesActivity />,
        title: 'Portfolio Securities Report',
        description: 'Portfolio Securities Report - View and analyze portfolio securities data'
      },
      {
        value: 'Trades',
        label: 'Posting of Trades',
        icon: <Icon icon="solar:document-text-bold-duotone" width={22} height={22} color={theme.palette.info.main} />,
        color: theme.palette.info.main,
        component: <TradesActivity />,
        title: 'Trades Report',
        description: 'Trades Report - View and analyze trades data'
      },
      {
        value: 'Reconciliation',
        label: 'Recon Tool',
        icon: <Icon icon="solar:check-square-bold-duotone" width={22} height={22} color={theme.palette.warning.main} />,
        color: theme.palette.warning.main,
        component: <RecentReconActivity />,
        title: 'Reconciliation Report',
        description: 'Reconciliation Report - View and analyze reconciliation data'
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

      <MainCard title="Recent Activity" elevation={0} sx={{ p: '0 !important' }} contentSX={{ p: '0 !important' }}>
        <Tabs
          value={currentTab}
          onChange={(event, newValue) => setCurrentTab(newValue)}
          TabIndicatorProps={{
            style: {
              backgroundColor: currentTabInfo?.color
            }
          }}
          variant="scrollable"
          scrollButtons="auto"
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

export default RecentActivity;
