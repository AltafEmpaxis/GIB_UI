import { Icon } from '@iconify/react';
import { Box, Card, Divider, Tab, Tabs, useTheme } from '@mui/material';
import { useMemo, useState } from 'react';
import AxysTaxLots from './AxysTaxLots';
import GenevaTaxLots from './GenevaTaxLots';

const RowDataIndex = () => {
  const [currentTab, setCurrentTab] = useState('GenevaTaxLots');
  const theme = useTheme();

  const tabs = useMemo(
    () => [
      {
        value: 'GenevaTaxLots',
        label: 'APX Tax Lots',
        icon: <Icon icon="mdi:file-table" width={20} height={20} color={theme.palette.primary.main} />,
        component: <GenevaTaxLots />
      },
      {
        value: 'AxysTaxLots',
        label: 'Custodian Tax Lots',
        icon: <Icon icon="mdi:file-table-outline" width={20} height={20} color={theme.palette.primary.main} />,
        component: <AxysTaxLots />
      }
    ],
    [theme]
  );

  return (
    <>
      <title>Raw Data View - GIB UI</title>
      <meta name="description" content="View and analyze raw tax lots data from APX and Custodian systems" />
      <meta property="og:title" content="Raw Data View - GIB UI" />
      <meta property="og:description" content="View and analyze raw tax lots data from APX and Custodian systems" />

      <Box>
        <Card>
          <Tabs value={currentTab} onChange={(event, newValue) => setCurrentTab(newValue)}>
            {tabs.map((tab) => (
              <Tab key={tab.value} value={tab.value} label={tab.label} icon={tab.icon} iconPosition="start" />
            ))}
          </Tabs>
          <Divider />
          {tabs.map((tab) => tab.value === currentTab && <Box key={tab.value}>{tab.component}</Box>)}
        </Card>
      </Box>
    </>
  );
};

export default RowDataIndex;
