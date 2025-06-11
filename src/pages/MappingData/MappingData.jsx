import { useMemo, useState } from 'react';

import { Icon } from '@iconify/react';
import { Box, Divider, Tab, Tabs, useTheme } from '@mui/material';
// project imports
import MainCard from 'components/MainCard';
import LookupCashMapping1 from './LookupCashMapping1/ViewLookupCashMapping1';
import LookupCashMapping2 from './LookupCashMapping2/ViewLookupCashMapping2';
import LookupInvestments from './LookupInvestments/ViewLookupInvestments';
import LookupPortfolios from './LookupPortfolios/ViewLookupPortfolios';

const MappingData = () => {
  const [currentTab, setCurrentTab] = useState('LookupCashMapping1');
  const theme = useTheme();

  const tabs = useMemo(
    () => [
      {
        value: 'LookupCashMapping1',
        label: 'Cash Mapping 1',
        icon: <Icon icon="solar:money-bag-linear" width={22} height={22} />,
        color: theme.palette.primary.main,
        component: <LookupCashMapping1 />,
        title: 'Cash Mapping Configuration 1',
        description: 'Create and manage primary cash mapping rules'
      },
      {
        value: 'LookupCashMapping2',
        label: 'Cash Mapping 2',
        icon: <Icon icon="solar:wallet-money-linear" width={22} height={22} />,
        color: theme.palette.primary.main,
        component: <LookupCashMapping2 />,
        title: 'Cash Mapping Configuration 2',
        description: 'Set up secondary cash mapping parameters'
      },
      {
        value: 'LookupInvestments',
        label: 'Investment Mapping',
        icon: <Icon icon="solar:graph-linear" width={22} height={22} />,
        color: theme.palette.primary.main,
        component: <LookupInvestments />,
        title: 'Investment Mapping',
        description: 'Configure investment reconciliation mappings'
      },
      {
        value: 'LookupPortfolios',
        label: 'Portfolio Mapping',
        icon: <Icon icon="solar:folder-with-files-linear" width={22} height={22} />,
        color: theme.palette.primary.main,
        component: <LookupPortfolios />,
        title: 'Portfolio Mapping',
        description: 'Manage portfolio mapping configurations'
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

      <MainCard title="Mapping Data" elevation={0} sx={{ p: '0 !important' }} contentSX={{ p: '0 !important' }}>
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

export default MappingData;
