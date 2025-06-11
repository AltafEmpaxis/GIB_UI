import { Icon } from '@iconify/react';
import { Box, Card, Divider, Tab, Tabs, useTheme } from '@mui/material';
import { useMemo, useState } from 'react';
import NormalizedAxysData from './NormalizedAxysData';
import NormalizedGenevaData from './NormalizedGenevaData';

const NormalizedData = () => {
  const theme = useTheme();
  const [currentTab, setCurrentTab] = useState('NormalizedAxys');

  const tabs = useMemo(
    () => [
      {
        label: 'Normalized Custodian Data',
        icon: <Icon icon="mdi:database-import" width={20} height={20} color={theme.palette.primary.main} />,
        value: 'NormalizedAxys',
        component: <NormalizedAxysData />,
        color: theme.palette.primary.main
      },
      {
        label: 'Normalized APX Data',
        icon: <Icon icon="mdi:database-export" width={20} height={20} color={theme.palette.primary.main} />,
        value: 'NormalizedGeneva',
        component: <NormalizedGenevaData />,
        color: theme.palette.primary.main
      }
    ],
    [theme]
  );

  const currentTabInfo = tabs.find((tab) => tab.value === currentTab);

  return (
    <>
      <title>Normalized Data</title>
      <meta name="description" content="View and analyze normalized tax lots data from both systems" />
      <meta property="og:title" content="Normalized Data" />
      <meta property="og:description" content="View and analyze normalized tax lots data from both systems" />

      <Box>
        <Card>
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
        </Card>
      </Box>
    </>
  );
};

export default NormalizedData;
