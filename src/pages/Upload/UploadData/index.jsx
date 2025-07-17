import { Icon } from '@iconify/react';
import { Box, Tab, Tabs, useTheme } from '@mui/material';
import { alpha } from '@mui/material/styles';
import React, { useState } from 'react';
import CustodianUpload from './CustodianUpload';

const UploadData = ({ isLoading }) => {
  const theme = useTheme();
  const [activeTab, setActiveTab] = useState('custodian');

  const handleTabChange = (e, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <Box sx={{ p: 2 }}>
      {/* Tab selection */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
        <Tabs value={activeTab} onChange={handleTabChange} aria-label="upload tabs">
          <Tab
            icon={<Icon icon="mdi:folder-multiple" width={20} />}
            iconPosition="start"
            label="Custodian"
            value="custodian"
          />
          <Tab icon={<Icon icon="mdi:chart-box" width={20} />} iconPosition="start" label="APX" value="apx" />
        </Tabs>
      </Box>

      {/* Render CustodianUpload component which will handle both tabs internally */}
      <CustodianUpload activeTab={activeTab} />
    </Box>
  );
};

export default UploadData;
