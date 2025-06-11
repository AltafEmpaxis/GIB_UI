import { Icon } from '@iconify/react';
import {
  alpha,
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Divider,
  Grid,
  Paper,
  Stack,
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

// Mock data
const dataCards = [
  {
    id: 'albilad',
    title: 'Bank Albilad Data',
    description: 'Upload and manage data files specific to albilad operations.',
    icon: 'mingcute:bank-line',
    iconColor: '#2563EB', // Blue color for icon
    recent: 12,
    bgColor: '#F8FAFC' // Light blue-gray background
  },
  {
    id: 'riyadh',
    title: 'Bank Riyadh Data',
    description: 'Import and process data related to Riyadh region activities.',
    icon: 'clarity:building-line',
    iconColor: '#10B981', // Green color for icon
    recent: 7,
    bgColor: '#F8FAFC'
  },
  {
    id: 'at',
    title: 'Bank at Data',
    description: 'Handle data feeds and records from AT systems.',
    icon: 'carbon:network-4',
    iconColor: '#F59E0B', // Amber color for icon
    recent: 25,
    bgColor: '#F8FAFC'
  }
];

const uploads = [
  { name: 'albilad_report_Q1_2024.csv', date: '2024-07-28', status: 'Completed' },
  { name: 'riyadh_sales_data_July.xlsx', date: '2024-07-27', status: 'Completed' },
  { name: 'AT_logs_20240726.json', date: '2024-07-26', status: 'Completed' },
  { name: 'albilad_financial_data_v2.csv', date: '2024-07-26', status: 'Processing' },
  { name: 'riyadh_inventory_update.xml', date: '2024-07-25', status: 'Completed' },
  { name: 'AT_error_report_Latest.txt', date: '2024-07-25', status: 'Failed' },
  { name: 'albilad_customer_list.csv', date: '2024-07-24', status: 'Completed' },
  { name: 'riyadh_marketing_stats.xlsx', date: '2024-07-24', status: 'Completed' },
  { name: 'AT_system_performance.json', date: '2024-07-23', status: 'Completed' },
  { name: 'albilad_backup_20240722.zip', date: '2024-07-22', status: 'Completed' }
];

// Data categories for view data page
const dataCategories = [
  {
    id: 'albilad',
    title: 'Bank Albilad Data',
    owner: 'Md Altaf Raja',
    records: 2458,
    lastUpdated: '2024-05-29 14:30 PM',
    color: '#4CAF50' // Green
  },
  {
    id: 'riyadh',
    title: 'Bank Riyadh Data',
    owner: 'Md Altaf Raja',
    records: 1872,
    lastUpdated: '2024-05-30 09:15 AM',
    color: '#2196F3' // Blue
  },
  {
    id: 'at',
    title: 'Bank at Data',
    owner: 'Md Altaf Raja',
    records: 945,
    lastUpdated: '2024-05-28 16:45 PM',
    color: '#FF9800' // Orange
  },
  {
    id: 'apx',
    title: 'Bank APX Data',
    owner: 'Sayantan Roy',
    records: 1234,
    lastUpdated: '2024-05-31 10:45 AM',
    color: '#9C27B0' // Purple
  }
];

// Data for the VIEW LOADED DATA table
const loadedData = [
  {
    name: 'Bank Albilad Financial Reports',
    records: 1245,
    lastUpload: '2024-05-29 14:30',
    status: 'Completed'
  },
  {
    name: 'Bank Riyadh Transaction Data',
    records: 873,
    lastUpload: '2024-05-30 09:15',
    status: 'Completed'
  },
  {
    name: 'Bank AT Investment Portfolio',
    records: 945,
    lastUpload: '2024-05-28 16:45',
    status: 'Processing'
  },
  {
    name: 'Bank APX System Data',
    records: 1234,
    lastUpload: '2024-05-31 10:45',
    status: 'Completed'
  },
  {
    name: 'Bank Legacy System Import',
    records: 523,
    lastUpload: '2024-05-25 11:20',
    status: 'Failed'
  }
];

// Status chip styling
const statusStyles = {
  Completed: {
    backgroundColor: '#ECFDF5', // Light green bg
    color: '#059669', // Green text
    border: '1px solid #A7F3D0' // Light green border
  },
  Processing: {
    backgroundColor: '#FFFBEB', // Light yellow bg
    color: '#D97706', // Yellow text
    border: '1px solid #FDE68A' // Light yellow border
  },
  Failed: {
    backgroundColor: '#FEF2F2', // Light red bg
    color: '#DC2626', // Red text
    border: '1px solid #FECACA' // Light red border
  }
};

function ModernUploadFiles2() {
  const theme = useTheme();
  const [mainView, setMainView] = useState('upload'); // 'upload' or 'view'
  const [activeTab, setActiveTab] = useState(0); // 0: Custodian, 1: APX
  const [loading, setLoading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState(null);

  // Handle simulated uploads for Custodian data
  const handleCustodianUpload = (custodianType) => {
    setLoading(true);
    setUploadStatus(`Uploading ${custodianType} data...`);

    // Simulate API call with timeout
    setTimeout(() => {
      setLoading(false);
      setUploadStatus(`${custodianType} data uploaded successfully!`);

      // Clear status after 3 seconds
      setTimeout(() => setUploadStatus(null), 3000);
    }, 1500);
  };

  // Handle simulated APX data load
  const handleLoadAPX = () => {
    setLoading(true);
    setUploadStatus('Connecting to APX server...');

    // Simulate multi-step process
    setTimeout(() => {
      setUploadStatus('Retrieving APX data...');

      setTimeout(() => {
        setLoading(false);
        setUploadStatus('APX data loaded successfully!');

        // Clear status after 3 seconds
        setTimeout(() => setUploadStatus(null), 3000);
      }, 1500);
    }, 1500);
  };

  return (
    <Card sx={{ maxWidth: 1200, mx: 'auto' }}>
      {/* View Selector */}
      <Box sx={{ display: 'flex', mb: theme.spacing(3), p: theme.spacing(3) }}>
        <Button
          variant={mainView === 'upload' ? 'contained' : 'outlined'}
          onClick={() => setMainView('upload')}
          sx={{
            mr: theme.spacing(2),
            px: theme.spacing(3),
            py: theme.spacing(1),
            transition: theme.transitions.create(['background-color', 'box-shadow', 'transform']),
            '&:hover': {
              transform: 'translateY(-2px)',
              boxShadow: theme.shadows[2]
            }
          }}
        >
          Upload Data
        </Button>
        <Button
          variant={mainView === 'view' ? 'contained' : 'outlined'}
          onClick={() => setMainView('view')}
          sx={{
            px: theme.spacing(3),
            py: theme.spacing(1),
            transition: theme.transitions.create(['background-color', 'box-shadow', 'transform']),
            '&:hover': {
              transform: 'translateY(-2px)',
              boxShadow: theme.shadows[2]
            }
          }}
        >
          View Data
        </Button>
      </Box>

      {/* UPLOAD DATA VIEW */}
      {mainView === 'upload' && (
        <>
          {/* Status message */}
          {uploadStatus && (
            <Paper
              elevation={0}
              sx={{
                mb: theme.spacing(3),
                p: theme.spacing(2),
                bgcolor: loading ? alpha(theme.palette.info.main, 0.1) : alpha(theme.palette.success.main, 0.1),
                border: `1px solid ${loading ? alpha(theme.palette.info.main, 0.2) : alpha(theme.palette.success.main, 0.2)}`,
                transition: theme.transitions.create(['background-color', 'border-color'], {
                  duration: theme.transitions.duration.standard
                })
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                {loading ? (
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Box
                      component="span"
                      sx={{
                        display: 'inline-block',
                        width: 16,
                        height: 16,
                        borderRadius: '50%',
                        border: `3px solid ${theme.palette.info.main}`,
                        borderTopColor: 'transparent',
                        mr: theme.spacing(2),
                        animation: 'spin 1s linear infinite',
                        '@keyframes spin': {
                          '0%': { transform: 'rotate(0deg)' },
                          '100%': { transform: 'rotate(360deg)' }
                        }
                      }}
                    />
                    <Typography>{uploadStatus}</Typography>
                  </Box>
                ) : (
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Icon
                      icon="mdi:check-circle"
                      width={20}
                      height={20}
                      style={{
                        color: theme.palette.success.main,
                        marginRight: theme.spacing(1.5)
                      }}
                    />
                    <Typography>{uploadStatus}</Typography>
                  </Box>
                )}
              </Box>
            </Paper>
          )}

          {/* Tabs */}
          <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: theme.spacing(3) }}>
            <Tabs
              value={activeTab}
              onChange={(_, v) => setActiveTab(v)}
              TabIndicatorProps={{
                style: {
                  height: 3
                }
              }}
              sx={{
                '& .MuiTab-root': {
                  fontWeight: 500,
                  py: theme.spacing(1.5),
                  px: theme.spacing(3),
                  minWidth: 120,
                  transition: theme.transitions.create('color'),
                  '&.Mui-selected': {
                    color: theme.palette.primary.main,
                    fontWeight: 600
                  }
                }
              }}
            >
              <Tab label="Custodian TAB" />
              <Tab label="APX TAB" />
            </Tabs>
          </Box>

          {/* Custodian TAB Content */}
          {activeTab === 0 && (
            <>
              <Grid container spacing={theme.spacing(3)} sx={{ p: theme.spacing(3) }}>
                {dataCards.map((card) => (
                  <Grid item xs={12} md={4} key={card.id}>
                    <Card
                      sx={{
                        boxShadow: theme.shadows[0],
                        border: `1px solid ${theme.palette.divider}`,
                        height: '100%',
                        bgcolor: card.bgColor,
                        transition: theme.transitions.create(['box-shadow', 'transform']),
                        '&:hover': {
                          transform: 'translateY(-4px)',
                          boxShadow: theme.shadows[4]
                        }
                      }}
                    >
                      <CardContent sx={{ p: 0 }}>
                        <Typography variant="h6" sx={{ p: theme.spacing(3), pb: theme.spacing(1.5), fontWeight: 600 }}>
                          {card.title}
                        </Typography>
                        <Typography variant="body2" sx={{ px: theme.spacing(3), color: theme.palette.text.secondary }}>
                          {card.description}
                        </Typography>

                        <Box
                          sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            my: theme.spacing(3),
                            py: theme.spacing(2),
                            backgroundColor: alpha(card.iconColor, 0.05),
                            mx: theme.spacing(3)
                          }}
                        >
                          <Icon
                            icon={card.icon}
                            width={80}
                            height={80}
                            color={card.iconColor}
                            style={{ filter: `drop-shadow(0 4px 6px ${alpha(card.iconColor, 0.2)})` }}
                          />
                        </Box>

                        <Box sx={{ px: theme.spacing(3), pb: theme.spacing(3) }}>
                          <Typography variant="body2" sx={{ mb: theme.spacing(2), fontWeight: 500 }}>
                            Recently Uploaded:{' '}
                            <Box component="span" sx={{ fontWeight: 600 }}>
                              {card.recent} files
                            </Box>
                          </Typography>

                          <Button
                            fullWidth
                            variant="contained"
                            color={card.id === 'albilad' ? 'primary' : card.id === 'riyadh' ? 'success' : 'warning'}
                            disableElevation
                            onClick={() => handleCustodianUpload(card.title.split(' ')[0])}
                            disabled={loading}
                            startIcon={<Icon icon="mdi:cloud-upload" />}
                            sx={{
                              py: theme.spacing(1),
                              fontWeight: 500,
                              boxShadow: `0 4px 8px ${alpha(card.iconColor, 0.2)}`,
                              transition: theme.transitions.create(['background-color', 'box-shadow', 'transform']),
                              '&:hover': {
                                boxShadow: `0 6px 12px ${alpha(card.iconColor, 0.3)}`,
                                transform: 'translateY(-2px)'
                              }
                            }}
                          >
                            Upload Files
                          </Button>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>

              {/* Recent Uploads */}
              <Paper
                elevation={0}
                sx={{
                  mt: theme.spacing(4),
                  border: `1px solid ${theme.palette.divider}`,
                  overflow: 'hidden',
                  transition: theme.transitions.create('box-shadow'),
                  '&:hover': {
                    boxShadow: theme.shadows[2]
                  }
                }}
              >
                <Box sx={{ p: theme.spacing(3), pb: theme.spacing(2) }}>
                  <Typography variant="h6" fontWeight={600}>
                    Recent Custodian Uploads
                  </Typography>
                </Box>

                <TableContainer>
                  <Table sx={{ minWidth: 650 }}>
                    <TableHead>
                      <TableRow>
                        <TableCell sx={{ fontWeight: 600, color: theme.palette.text.secondary }}>File Name</TableCell>
                        <TableCell align="left" sx={{ fontWeight: 600, color: theme.palette.text.secondary }}>
                          Upload Date
                        </TableCell>
                        <TableCell align="left" sx={{ fontWeight: 600, color: theme.palette.text.secondary }}>
                          Status
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {uploads.map((row) => (
                        <TableRow
                          key={row.name}
                          sx={{
                            '&:last-child td, &:last-child th': { border: 0 },
                            transition: theme.transitions.create('background-color'),
                            '&:hover': {
                              backgroundColor: alpha(theme.palette.primary.main, 0.04)
                            }
                          }}
                        >
                          <TableCell component="th" scope="row">
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <Icon
                                icon={
                                  row.name.includes('csv')
                                    ? 'vscode-icons:file-type-csv'
                                    : row.name.includes('xls')
                                      ? 'vscode-icons:file-type-excel'
                                      : row.name.includes('json')
                                        ? 'vscode-icons:file-type-json'
                                        : row.name.includes('xml')
                                          ? 'vscode-icons:file-type-xml'
                                          : row.name.includes('txt')
                                            ? 'vscode-icons:file-type-text'
                                            : row.name.includes('zip')
                                              ? 'vscode-icons:file-type-zip'
                                              : 'mdi:file'
                                }
                                width={20}
                                height={20}
                                style={{ marginRight: theme.spacing(1) }}
                              />
                              {row.name}
                            </Box>
                          </TableCell>
                          <TableCell align="left">{row.date}</TableCell>
                          <TableCell align="left">
                            <Chip
                              label={row.status}
                              sx={{
                                ...statusStyles[row.status],
                                fontWeight: 500,
                                px: theme.spacing(1)
                              }}
                            />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>

                <Box sx={{ p: theme.spacing(3), pt: theme.spacing(1) }}>
                  <Typography variant="body2" color="text.secondary">
                    A list of your recent data uploads by custodians.
                  </Typography>
                </Box>
              </Paper>
            </>
          )}

          {/* APX TAB Content */}
          {activeTab === 1 && (
            <Box sx={{ p: theme.spacing(3) }}>
              <Paper
                elevation={0}
                sx={{
                  py: theme.spacing(4),
                  px: theme.spacing(3),
                  border: `1px solid ${theme.palette.divider}`,
                  textAlign: 'center',
                  maxWidth: 600,
                  mx: 'auto',
                  transition: theme.transitions.create(['box-shadow', 'transform']),
                  '&:hover': {
                    boxShadow: theme.shadows[4],
                    transform: 'translateY(-4px)'
                  }
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    mb: theme.spacing(3),
                    p: theme.spacing(3),
                    backgroundColor: alpha(theme.palette.primary.main, 0.05),
                    mx: theme.spacing(2)
                  }}
                >
                  <Icon
                    icon="ph:database-duotone"
                    width={100}
                    height={100}
                    color={theme.palette.primary.main}
                    style={{ filter: `drop-shadow(0 4px 6px ${alpha(theme.palette.primary.main, 0.2)})` }}
                  />
                </Box>

                <Typography variant="h5" gutterBottom fontWeight={600}>
                  Load APX Data
                </Typography>

                <Typography variant="body1" paragraph sx={{ mb: theme.spacing(3), maxWidth: 450, mx: 'auto' }}>
                  Click the button below to load or fetch APX data from the backend. This will trigger a process to
                  retrieve and process the latest APX system data.
                </Typography>

                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  disableElevation
                  disabled={loading}
                  onClick={handleLoadAPX}
                  startIcon={<Icon icon="mdi:database-import" />}
                  sx={{
                    px: theme.spacing(4),
                    py: theme.spacing(1.5),
                    fontWeight: 600,
                    boxShadow: `0 4px 8px ${alpha(theme.palette.primary.main, 0.2)}`,
                    transition: theme.transitions.create(['background-color', 'box-shadow', 'transform']),
                    '&:hover': {
                      boxShadow: `0 6px 12px ${alpha(theme.palette.primary.main, 0.3)}`,
                      transform: 'translateY(-2px)'
                    }
                  }}
                >
                  Load APX Data
                </Button>
              </Paper>
            </Box>
          )}
        </>
      )}

      {/* VIEW DATA VIEW */}
      {mainView === 'view' && (
        <Box sx={{ p: theme.spacing(3) }}>
          {/* Data Categories */}
          <Typography variant="h5" gutterBottom fontWeight={600} sx={{ mb: theme.spacing(3) }}>
            Data Categories
          </Typography>

          <Grid container spacing={theme.spacing(3)} sx={{ mb: theme.spacing(4) }}>
            {dataCategories.map((category) => (
              <Grid item xs={12} sm={6} md={3} key={category.id}>
                <Paper
                  elevation={0}
                  sx={{
                    p: theme.spacing(3),
                    border: `1px solid ${theme.palette.divider}`,
                    height: '100%',
                    transition: theme.transitions.create(['box-shadow', 'transform'], {
                      duration: theme.transitions.duration.standard
                    }),
                    '&:hover': {
                      boxShadow: theme.shadows[4],
                      transform: 'translateY(-4px)'
                    },
                    position: 'relative',
                    overflow: 'hidden',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      height: '4px',
                      backgroundColor: category.color,
                      opacity: 0.7
                    }
                  }}
                >
                  <Box sx={{ mb: theme.spacing(2) }}>
                    <Typography variant="h6" fontWeight={600} gutterBottom>
                      {category.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Owner: {category.owner}
                    </Typography>
                  </Box>

                  <Divider sx={{ my: theme.spacing(2) }} />

                  <Grid container spacing={theme.spacing(2)}>
                    <Grid item xs={6}>
                      <Typography variant="caption" color="text.secondary">
                        Records
                      </Typography>
                      <Typography variant="h5" fontWeight={600} sx={{ color: category.color }}>
                        {category.records.toLocaleString()}
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="caption" color="text.secondary">
                        Last Updated
                      </Typography>
                      <Typography variant="body2" fontWeight={500}>
                        {category.lastUpdated.split(' ')[0]}
                      </Typography>
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
            ))}
          </Grid>

          {/* VIEW LOADED DATA */}
          <Box sx={{ mb: theme.spacing(2) }}>
            <Typography variant="h5" fontWeight={600} gutterBottom>
              VIEW LOADED DATA
            </Typography>
          </Box>

          <Paper
            elevation={0}
            sx={{
              border: `1px solid ${theme.palette.divider}`,
              overflow: 'hidden',
              transition: theme.transitions.create('box-shadow'),
              '&:hover': {
                boxShadow: theme.shadows[2]
              }
            }}
          >
            <TableContainer>
              <Table sx={{ minWidth: 650 }}>
                <TableHead sx={{ bgcolor: alpha(theme.palette.primary.main, 0.04) }}>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 600 }}>Data Source Name</TableCell>
                    <TableCell align="center" sx={{ fontWeight: 600 }}>
                      Number of Records
                    </TableCell>
                    <TableCell align="center" sx={{ fontWeight: 600 }}>
                      Last Upload Time
                    </TableCell>
                    <TableCell align="center" sx={{ fontWeight: 600 }}>
                      Upload Status
                    </TableCell>
                    <TableCell align="center" sx={{ fontWeight: 600 }}>
                      Actions
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {loadedData.map((row, index) => (
                    <TableRow
                      key={index}
                      sx={{
                        '&:last-child td, &:last-child th': { border: 0 },
                        transition: theme.transitions.create('background-color'),
                        '&:hover': {
                          bgcolor: alpha(theme.palette.primary.main, 0.04)
                        }
                      }}
                    >
                      <TableCell component="th" scope="row">
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Avatar
                            sx={{
                              width: 32,
                              height: 32,
                              bgcolor: alpha(
                                row.name.includes('Albilad')
                                  ? theme.palette.primary.main
                                  : row.name.includes('Riyadh')
                                    ? theme.palette.success.main
                                    : row.name.includes('AT')
                                      ? theme.palette.warning.main
                                      : row.name.includes('APX')
                                        ? theme.palette.secondary.main
                                        : theme.palette.grey[500],
                                0.1
                              ),
                              color: row.name.includes('Albilad')
                                ? theme.palette.primary.main
                                : row.name.includes('Riyadh')
                                  ? theme.palette.success.main
                                  : row.name.includes('AT')
                                    ? theme.palette.warning.main
                                    : row.name.includes('APX')
                                      ? theme.palette.secondary.main
                                      : theme.palette.grey[500],
                              mr: theme.spacing(1.5)
                            }}
                          >
                            <Icon
                              icon={
                                row.name.includes('Albilad')
                                  ? 'mingcute:bank-line'
                                  : row.name.includes('Riyadh')
                                    ? 'clarity:building-line'
                                    : row.name.includes('AT')
                                      ? 'carbon:network-4'
                                      : row.name.includes('APX')
                                        ? 'ph:database-duotone'
                                        : 'mdi:file-document'
                              }
                              width={18}
                              height={18}
                            />
                          </Avatar>
                          {row.name}
                        </Box>
                      </TableCell>
                      <TableCell align="center">{row.records.toLocaleString()}</TableCell>
                      <TableCell align="center">{row.lastUpload}</TableCell>
                      <TableCell align="center">
                        <Chip
                          label={row.status}
                          sx={{
                            ...statusStyles[row.status],
                            fontWeight: 500,
                            px: theme.spacing(1)
                          }}
                        />
                      </TableCell>
                      <TableCell align="center">
                        <Stack direction="row" spacing={1} justifyContent="center">
                          <Button
                            variant="outlined"
                            size="small"
                            startIcon={<Icon icon="mdi:refresh" width={16} />}
                            sx={{
                              minWidth: 0,
                              px: theme.spacing(1),
                              color: theme.palette.text.secondary,
                              borderColor: theme.palette.divider,
                              '&:hover': {
                                borderColor: theme.palette.primary.main,
                                color: theme.palette.primary.main,
                                bgcolor: alpha(theme.palette.primary.main, 0.04)
                              }
                            }}
                          >
                            Refresh
                          </Button>
                          <Button
                            variant="contained"
                            disableElevation
                            size="small"
                            startIcon={<Icon icon="mdi:eye" width={16} />}
                            sx={{
                              minWidth: 0,
                              px: theme.spacing(1.5),
                              bgcolor: theme.palette.primary.main,
                              transition: theme.transitions.create(['background-color', 'box-shadow']),
                              '&:hover': {
                                bgcolor: theme.palette.primary.dark,
                                boxShadow: `0 2px 6px ${alpha(theme.palette.primary.main, 0.3)}`
                              }
                            }}
                          >
                            View Details
                          </Button>
                        </Stack>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Box>
      )}
    </Card>
  );
}

export default ModernUploadFiles2;
