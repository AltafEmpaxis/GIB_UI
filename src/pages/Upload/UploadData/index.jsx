import { Icon } from '@iconify/react';
import { Avatar, Box, Grid, Paper, Tab, Tabs, Typography, useTheme } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { useState } from 'react';

const UploadData = ({ isLoading }) => {
  const theme = useTheme();
  const [activeTab, setActiveTab] = useState('custodian');

  const handleTabChange = (e, newValue) => {
    setActiveTab(newValue);
  };

  // Custodian options
  const custodianOptions = [
    {
      title: 'Albilad',
      icon: 'mdi:bank',
      color: theme.palette.primary.main
    },
    {
      title: 'Riyadh',
      icon: 'mdi:city',
      color: theme.palette.secondary.main
    },
    {
      title: 'AT',
      icon: 'mdi:office-building',
      color: '#FF9800' // Orange
    },
    {
      title: 'State Street',
      icon: 'mdi:bank-outline',
      color: '#673AB7' // Deep Purple
    }
  ];

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h5" gutterBottom>
        Upload Data
      </Typography>

      {/* Tab selection */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          aria-label="upload tabs"
          sx={{
            '& .MuiTabs-indicator': {
              height: 3,
              borderTopLeftRadius: 3,
              borderTopRightRadius: 3
            },
            '& .Mui-selected': {
              fontWeight: 600
            }
          }}
        >
          <Tab
            icon={<Icon icon="mdi:folder-multiple" width={20} />}
            iconPosition="start"
            label="Custodian"
            value="custodian"
            sx={{ minHeight: 48, px: 2 }}
          />
          <Tab
            icon={<Icon icon="mdi:chart-box" width={20} />}
            iconPosition="start"
            label="APX"
            value="apx"
            sx={{ minHeight: 48, px: 2 }}
          />
        </Tabs>
      </Box>

      {/* Custodian Tab */}
      {activeTab === 'custodian' && (
        <Grid container spacing={2}>
          {custodianOptions.map((option, index) => (
            <Grid item xs={12} md={6} lg={3} key={index}>
              <CustodianCard title={option.title} icon={option.icon} color={option.color} />
            </Grid>
          ))}
        </Grid>
      )}

      {/* APX Tab */}
      {activeTab === 'apx' && (
        <Box sx={{ textAlign: 'center', p: 3 }}>
          <Avatar
            sx={{
              width: 60,
              height: 60,
              bgcolor: alpha(theme.palette.success.main, 0.1),
              color: theme.palette.success.main,
              margin: '0 auto 16px'
            }}
          >
            <Icon icon="mdi:database-import" width={32} />
          </Avatar>

          <Typography variant="h5" gutterBottom>
            APX Data Loading
          </Typography>

          <Typography variant="body2" color="text.secondary" sx={{ mb: 2, maxWidth: 600, mx: 'auto' }}>
            Connect to APX system and import financial data for reconciliation and reporting. The system securely
            retrieves current portfolio data and prepares it for analysis.
          </Typography>

          <Paper
            elevation={0}
            sx={{
              p: 3,
              maxWidth: 500,
              mx: 'auto',
              bgcolor: alpha(theme.palette.success.main, 0.05),
              border: `1px dashed ${alpha(theme.palette.success.main, 0.3)}`,
              borderRadius: 2,
              cursor: 'pointer',
              '&:hover': {
                bgcolor: alpha(theme.palette.success.main, 0.08),
                boxShadow: theme.shadows[2]
              }
            }}
          >
            <Icon
              icon="mdi:cloud-upload"
              width={40}
              height={40}
              style={{ color: theme.palette.success.main, marginBottom: 8 }}
            />
            <Typography variant="h6" color="success.main">
              Load APX Data
            </Typography>
          </Paper>
        </Box>
      )}
    </Box>
  );
};

// Simple Custodian Card Component
const CustodianCard = ({ title, icon, color }) => {
  const theme = useTheme();

  return (
    <Paper
      elevation={1}
      sx={{
        p: 2,
        height: '100%',
        transition: 'all 0.3s',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: theme.shadows[4],
          borderColor: alpha(color, 0.5)
        },
        border: `1px solid ${alpha(color, 0.2)}`
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <Avatar
          sx={{
            width: 48,
            height: 48,
            bgcolor: alpha(color, 0.1),
            color: color,
            mr: 2
          }}
        >
          <Icon icon={icon} width={24} height={24} />
        </Avatar>
        <Typography variant="h5">{title}</Typography>
      </Box>

      <Box
        sx={{
          p: 2,
          borderRadius: 1,
          border: '1px dashed',
          borderColor: alpha(color, 0.4),
          bgcolor: alpha(color, 0.04),
          textAlign: 'center',
          mb: 2
        }}
      >
        <Icon icon="mdi:file-upload-outline" width={30} height={30} style={{ color: alpha(color, 0.7) }} />
        <Typography variant="body2" sx={{ mt: 1 }}>
          Click or drop files here
        </Typography>
      </Box>

      <Typography variant="caption" color="text.secondary">
        Accepts Excel, CSV, PDF and JSON files
      </Typography>
    </Paper>
  );
};

export default UploadData;
