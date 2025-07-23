import { useMemo, useState } from 'react';

import { Icon } from '@iconify/react';
import { Box, Divider, Tab, Tabs, useTheme } from '@mui/material';

import MainCard from 'components/MainCard';
import CustodianFile from './CustodianUpload/CustodianFile';
import APXFile from './Apx/APXFile';

const CustodianUpload = () => {
  const [currentTab, setCurrentTab] = useState('custodian-file');
  const theme = useTheme();

  const tabs = useMemo(
    () => [
      {
        value: 'custodian-file',
        label: 'Custodian File',
        icon: <Icon icon="solar:check-circle-bold-duotone" width={22} height={22} />,
        color: theme.palette.primary.main,
        component: <CustodianFile />,
        title: 'Custodian File',
        description: 'Custodian File - Upload custodian data'
      },
      {
        value: 'apx-file',
        label: 'APX File',
        icon: <Icon icon="solar:shield-check-bold-duotone" width={22} height={22} />,
        color: theme.palette.primary.main,
        component: <APXFile />,
        title: 'APX File',
        description: 'APX File - Upload APX data'
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

      <MainCard elevation={0} sx={{ mt: '10px !important', p: '0 !important' }} contentSX={{ p: '0 !important' }}>
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

export default CustodianUpload;
