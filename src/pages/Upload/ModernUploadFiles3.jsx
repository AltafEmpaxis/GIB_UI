import { Icon } from '@iconify/react';
import {
  alpha,
  Avatar,
  Box,
  Chip,
  Grid,
  InputBase,
  Paper,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tabs,
  Typography,
  useTheme
} from '@mui/material';
import { useState } from 'react';

function ModernUploadFiles3() {
  const theme = useTheme();
  const [view, setView] = useState('upload'); // 'upload' or 'viewData'
  const [activeTab, setActiveTab] = useState('custodian');

  const handleTabChange = (event, newTab) => {
    setActiveTab(newTab);
  };

  // Mock data for custodian cards
  const custodianOptions = [
    {
      id: 'albilad',
      title: 'albilad',
      subtitle: 'Upload Albilad data',
      icon: 'mdi:bank',
      color: '#4CAF50', // Green
      bgcolor: '#F0FFF4' // Light green background
    },
    {
      id: 'riyadh',
      title: 'Riyadh',
      subtitle: 'Upload Riyadh data',
      icon: 'mdi:credit-card',
      color: '#F59E0B', // Amber
      bgcolor: '#FEFCE8' // Light yellow background
    },
    {
      id: 'at',
      title: 'AT',
      subtitle: 'Upload AT data',
      icon: 'mdi:chart-line',
      color: '#EC4899', // Pink
      bgcolor: '#FDF2F8' // Light pink background
    }
  ];

  // Mock data for view data cards
  const viewDataCards = [
    {
      id: 'albilad',
      title: 'View Albilad Data',
      author: 'Author: Md Altaf Raja, Sayantan Roy',
      records: 1234,
      lastUpdated: 'Last Updated: 2023-10-26 10:30 AM'
    },
    {
      id: 'riyadh',
      title: 'View Riyadh Data',
      author: 'Author: Md Altaf Raja, Sayantan Roy',
      records: 5678,
      lastUpdated: 'Last Updated: 2023-10-25 03:15 PM'
    },
    {
      id: 'at',
      title: 'View AT Data',
      author: 'Author: Md Altaf Raja, Sayantan Roy',
      records: 9101,
      lastUpdated: 'Last Updated: 2023-10-26 09:00 AM'
    },
    {
      id: 'apx',
      title: 'View APX Data',
      author: 'Author: Md Altaf Raja, Sayantan Roy',
      records: 1121,
      lastUpdated: 'Last Updated: 2023-10-24 11:45 AM'
    }
  ];

  // Mock data for loaded data table
  const loadedData = [
    {
      id: 'ACC001',
      name: 'Savings Account',
      timestamp: '2023-10-26 10:30 AM',
      status: 'Active',
      amount: '$10,500.75'
    },
    {
      id: 'ACC002',
      name: 'Checking Account',
      timestamp: '2023-10-25 03:15 PM',
      status: 'Active',
      amount: '$2,300.00'
    },
    {
      id: 'ACC003',
      name: 'Investment Account',
      timestamp: '2023-10-26 09:00 AM',
      status: 'Pending',
      amount: '$50,000.00'
    },
    {
      id: 'ACC004',
      name: 'Loan Account',
      timestamp: '2023-10-24 11:45 AM',
      status: 'Closed',
      amount: '($15,000.00)'
    }
  ];

  // Helper for rendering status chips
  const getStatusChip = (status) => {
    let color = 'default';
    let bgcolor = '';

    switch (status) {
      case 'Active':
        color = 'success';
        bgcolor = '#ECFDF5';
        break;
      case 'Pending':
        color = 'warning';
        bgcolor = '#FFFBEB';
        break;
      case 'Closed':
        color = 'error';
        bgcolor = '#FEF2F2';
        break;
      default:
        color = 'default';
    }

    return (
      <Chip
        label={status}
        size="small"
        sx={{
          bgcolor: bgcolor,
          color: theme.palette[color].main,
          fontWeight: 600,
          border: `1px solid ${alpha(theme.palette[color].main, 0.2)}`,
          px: 1
        }}
      />
    );
  };

  // Navigation header
  const Header = () => (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        p: 2,
        borderBottom: `1px solid ${theme.palette.divider}`
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Icon icon="mdi:view-dashboard" color="#4F46E5" width={28} height={28} />
        <Typography variant="h5" sx={{ ml: 1, fontWeight: 600 }}>
          Data Dashboard
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', gap: 3 }}>
        <Box
          sx={{
            typography: 'subtitle1',
            fontWeight: view === 'upload' ? 600 : 400,
            color: view === 'upload' ? theme.palette.primary.main : theme.palette.text.primary,
            cursor: 'pointer',
            '&:hover': { color: theme.palette.primary.main }
          }}
          onClick={() => setView('upload')}
        >
          Upload Data
        </Box>
        <Box
          sx={{
            typography: 'subtitle1',
            fontWeight: view === 'viewData' ? 600 : 400,
            color: view === 'viewData' ? theme.palette.primary.main : theme.palette.text.primary,
            cursor: 'pointer',
            '&:hover': { color: theme.palette.primary.main }
          }}
          onClick={() => setView('viewData')}
        >
          View Data
        </Box>
        <Box sx={{ typography: 'subtitle1', cursor: 'pointer', '&:hover': { color: theme.palette.primary.main } }}>
          Settings
        </Box>
        <Box sx={{ typography: 'subtitle1', cursor: 'pointer', '&:hover': { color: theme.palette.primary.main } }}>
          Help
        </Box>
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Paper
          component="form"
          sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 250, borderRadius: 20 }}
        >
          <InputBase sx={{ ml: 1, flex: 1 }} placeholder="Search Reports" />
          <Icon icon="mdi:magnify" />
        </Paper>
        <Icon icon="mdi:bell-outline" width={22} height={22} />
        <Avatar sx={{ width: 32, height: 32 }}>JE</Avatar>
      </Box>
    </Box>
  );

  // Upload Data View
  const UploadDataView = () => (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" sx={{ mb: 3 }}>
        Upload Data
      </Typography>

      {/* Tabs */}
      <Paper sx={{ mb: 3, borderRadius: 1 }} variant="outlined">
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          textColor="primary"
          indicatorColor="primary"
          sx={{
            '.MuiTabs-indicator': {
              height: 3
            }
          }}
        >
          <Tab value="custodian" label="Custodian TAB" />
          <Tab value="apx" label="APX TAB" />
        </Tabs>
      </Paper>

      {/* Custodian Options */}
      {activeTab === 'custodian' && (
        <Grid container spacing={3}>
          {custodianOptions.map((option) => (
            <Grid item xs={12} md={4} key={option.id}>
              <Paper
                variant="outlined"
                sx={{
                  p: 3,
                  bgcolor: option.bgcolor,
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  cursor: 'pointer',
                  '&:hover': {
                    boxShadow: theme.shadows[1]
                  }
                }}
              >
                <Icon icon={option.icon} color={option.color} width={48} height={48} />
                <Typography variant="h6" sx={{ mt: 2, fontWeight: 600, color: option.color }}>
                  {option.title}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary', textAlign: 'center' }}>
                  {option.subtitle}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      )}

      {/* APX Tab */}
      {activeTab === 'apx' && (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 300 }}>
          <Typography variant="h6">APX Upload functionality will be added here</Typography>
        </Box>
      )}
    </Box>
  );

  // View Data Page
  const ViewDataPage = () => (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" sx={{ mb: 3 }}>
        View Data Page
      </Typography>

      <Paper
        sx={{
          mb: 4,
          bgcolor: theme.palette.primary.main,
          color: 'white',
          p: 2
        }}
      >
        <Typography variant="h6">Tab</Typography>
      </Paper>

      {/* Data Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {viewDataCards.map((card) => (
          <Grid item xs={12} sm={6} md={3} key={card.id}>
            <Paper variant="outlined" sx={{ p: 2, height: '100%' }}>
              <Typography variant="h6" gutterBottom>
                {card.title}
              </Typography>
              <Typography variant="caption" display="block">
                {card.author}
              </Typography>
              <Typography variant="body2" sx={{ mt: 1, fontWeight: 600 }}>
                Total Records: {card.records.toLocaleString()}
              </Typography>
              <Typography variant="caption">{card.lastUpdated}</Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* Loaded Data Table */}
      <Typography variant="h5" sx={{ mb: 2, textTransform: 'uppercase' }}>
        VIEW LOADED DATA
      </Typography>
      <TableContainer component={Paper} variant="outlined">
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 600 }}>ACCOUNT ID</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>ACCOUNT NAME</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>TIMESTAMP</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>STATUS</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>AMOUNT</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loadedData.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.timestamp}</TableCell>
                <TableCell>{getStatusChip(row.status)}</TableCell>
                <TableCell>{row.amount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );

  // Footer
  const Footer = () => (
    <Box sx={{ bgcolor: '#1E293B', color: 'white', p: 2, textAlign: 'center' }}>
      <Typography variant="body2">
        © 2023 Modern Dashboard. All rights reserved. Designed with Tailwind CSS.
      </Typography>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      {view === 'upload' ? <UploadDataView /> : <ViewDataPage />}
      <Box sx={{ flexGrow: 1 }} /> {/* Spacer to push footer down */}
      <Footer />
    </Box>
  );
}

export default ModernUploadFiles3;
