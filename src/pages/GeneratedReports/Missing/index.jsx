import { Icon } from '@iconify/react';
import { Box, Divider, Tab, Tabs, useTheme } from '@mui/material';
import { useMemo, useState } from 'react';

import AxysNotInGeneva from './AxysNotInGeneva';
import GenevaNotInAxys from './GenevaNotInAxys';

const Missing = () => {
  const [currentTab, setCurrentTab] = useState('Missing_AxysNotInGeneva');
  const theme = useTheme();

  const tabs = useMemo(
    () => [
      {
        value: 'Missing_AxysNotInGeneva',
        label: 'Missing- Custodian Not in APX',
        icon: <Icon icon="solar:danger-triangle-bold-duotone" width={22} height={22} />,
        color: theme.palette.warning.dark,
        component: <AxysNotInGeneva />
      },
      {
        value: 'Missing_GenevaNotInAxys',
        label: 'Missing- APX Not in Custodian',
        icon: <Icon icon="solar:danger-triangle-bold-duotone" width={22} height={22} />,
        color: theme.palette.warning.dark,
        component: <GenevaNotInAxys />
      }
    ],
    [theme]
  );

  return (
    <Box>
      <Tabs
        value={currentTab}
        onChange={(event, newValue) => setCurrentTab(newValue)}
        TabIndicatorProps={{
          style: {
            backgroundColor: tabs.find((tab) => tab.value === currentTab)?.color
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
    </Box>
  );
};

export default Missing;
