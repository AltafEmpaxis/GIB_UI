import { Icon } from '@iconify/react';
import {
  Avatar,
  Box,
  Button,
  Chip,
  Grid,
  IconButton,
  Paper,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tabs,
  Tooltip,
  Typography,
  useTheme
} from '@mui/material';
import { alpha } from '@mui/material/styles';
import CustodianUploadAction from 'components/Upload/CustodianUploadAction';
import NotificationBar from 'components/Upload/NotificationBar';
import React, { useState } from 'react';
import APXDataFlow from './APXData';

// Format bytes to human readable format
const formatBytes = (bytes, decimals = 2) => {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};

// Upload Steps Component
const UploadSteps = ({ activeStep }) => {
  const theme = useTheme();

  const steps = [
    { label: 'Select Custodian', icon: 'mdi:folder-multiple' },
    { label: 'Upload Files', icon: 'mdi:cloud-upload' },
    { label: 'Processing', icon: 'mdi:cog' },
    { label: 'Complete', icon: 'mdi:check-circle' }
  ];

  return (
    <Paper
      elevation={0}
      sx={{
        p: 2.5,
        mb: 3,
        borderRadius: 2,
        bgcolor: alpha(theme.palette.primary.main, 0.03),
        border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          position: 'relative'
        }}
      >
        {/* Connecting line */}
        <Box
          sx={{
            position: 'absolute',
            top: 20,
            left: 32,
            right: 32,
            height: 4,
            bgcolor: alpha(theme.palette.divider, 0.6),
            zIndex: 0
          }}
        />

        {/* Steps */}
        {steps.map((step, index) => (
          <Box
            key={index}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              position: 'relative',
              zIndex: 1
            }}
          >
            <Avatar
              sx={{
                width: 40,
                height: 40,
                bgcolor:
                  index <= activeStep
                    ? index === activeStep
                      ? theme.palette.primary.main
                      : theme.palette.success.main
                    : alpha(theme.palette.text.secondary, 0.1),
                color: index <= activeStep ? 'white' : theme.palette.text.secondary,
                mb: 1,
                transition: 'all 0.3s',
                transform: index === activeStep ? 'scale(1.1)' : 'scale(1)',
                boxShadow: index === activeStep ? theme.shadows[4] : 'none'
              }}
            >
              <Icon icon={step.icon} width={24} />
            </Avatar>
            <Typography
              variant="body2"
              sx={{
                fontWeight: index <= activeStep ? 600 : 400,
                color: index <= activeStep ? 'text.primary' : 'text.secondary'
              }}
            >
              {step.label}
            </Typography>
          </Box>
        ))}
      </Box>
    </Paper>
  );
};

// Raw Data Table component for custodian uploads
const RawDataTable = ({ uploadedFiles }) => {
  const theme = useTheme();
  const [expandedCustodian, setExpandedCustodian] = useState(null);

  const handleExpandClick = (custodian) => {
    setExpandedCustodian(expandedCustodian === custodian ? null : custodian);
  };

  return (
    <Paper
      elevation={0}
      sx={{
        mt: 3,
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: 2,
        overflow: 'hidden'
      }}
    >
      <Box
        sx={{
          p: 2,
          bgcolor: alpha(theme.palette.primary.main, 0.05),
          borderBottom: `1px solid ${theme.palette.divider}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <Typography variant="h6">Raw Data Files</Typography>
        <Tooltip title="View uploaded raw data files for each custodian">
          <IconButton size="small">
            <Icon icon="mdi:information" width={20} />
          </IconButton>
        </Tooltip>
      </Box>

      {uploadedFiles.length === 0 ? (
        <Box sx={{ p: 3, textAlign: 'center' }}>
          <Icon icon="mdi:file-document-outline" style={{ fontSize: 40, opacity: 0.5, marginBottom: 10 }} />
          <Typography variant="body1" color="textSecondary">
            No files have been uploaded yet
          </Typography>
          <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
            Use the upload options above to add files
          </Typography>
        </Box>
      ) : (
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: alpha(theme.palette.primary.main, 0.05) }}>
                <TableCell width="30%">Custodian</TableCell>
                <TableCell width="40%">Files</TableCell>
                <TableCell align="center" width="15%">
                  Status
                </TableCell>
                <TableCell align="center" width="15%">
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {uploadedFiles.map((custodian) => (
                <React.Fragment key={custodian.id}>
                  <TableRow
                    sx={{
                      '&:hover': { bgcolor: alpha(theme.palette.primary.main, 0.02) },
                      cursor: 'pointer',
                      bgcolor: expandedCustodian === custodian.id ? alpha(custodian.color, 0.05) : 'inherit'
                    }}
                    onClick={() => handleExpandClick(custodian.id)}
                  >
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Avatar
                          sx={{
                            bgcolor: alpha(custodian.color, 0.2),
                            color: custodian.color,
                            width: 36,
                            height: 36,
                            mr: 1.5
                          }}
                        >
                          <Icon icon={custodian.icon} width={20} />
                        </Avatar>
                        <Typography variant="subtitle2">{custodian.name}</Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography variant="body2">
                          {custodian.files.length} {custodian.files.length === 1 ? 'file' : 'files'} uploaded
                        </Typography>
                        {custodian.files.length > 0 && (
                          <Chip
                            size="small"
                            label={`${custodian.files
                              .reduce((total, file) => total + (file.size || 0), 0)
                              .toLocaleString()} bytes`}
                            sx={{ ml: 1, height: 20, fontSize: '0.7rem' }}
                          />
                        )}
                      </Box>
                    </TableCell>
                    <TableCell align="center">
                      <Chip
                        label={custodian.status}
                        size="small"
                        color={
                          custodian.status === 'Processed'
                            ? 'success'
                            : custodian.status === 'Processing'
                              ? 'warning'
                              : custodian.status === 'Error'
                                ? 'error'
                                : 'default'
                        }
                        sx={{ minWidth: 85 }}
                      />
                    </TableCell>
                    <TableCell align="center">
                      <IconButton
                        size="small"
                        color="primary"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleExpandClick(custodian.id);
                        }}
                      >
                        <Icon
                          icon={expandedCustodian === custodian.id ? 'mdi:chevron-up' : 'mdi:chevron-down'}
                          width={20}
                        />
                      </IconButton>
                      {custodian.files.length > 0 && (
                        <IconButton
                          size="small"
                          color="error"
                          onClick={(e) => {
                            e.stopPropagation();
                            // Handle delete action
                          }}
                          sx={{ ml: 1 }}
                        >
                          <Icon icon="mdi:delete-outline" width={20} />
                        </IconButton>
                      )}
                    </TableCell>
                  </TableRow>

                  {/* Expanded section with file details */}
                  {expandedCustodian === custodian.id && (
                    <TableRow>
                      <TableCell colSpan={4} sx={{ p: 0, borderBottom: 0 }}>
                        <Box
                          sx={{
                            p: 2,
                            bgcolor: alpha(custodian.color, 0.03),
                            borderTop: `1px dashed ${alpha(custodian.color, 0.3)}`
                          }}
                        >
                          {custodian.files.length > 0 ? (
                            <TableContainer>
                              <Table size="small">
                                <TableHead>
                                  <TableRow>
                                    <TableCell>File Name</TableCell>
                                    <TableCell align="center">Type</TableCell>
                                    <TableCell align="center">Size</TableCell>
                                    <TableCell align="right">Upload Time</TableCell>
                                    <TableCell align="center">Status</TableCell>
                                  </TableRow>
                                </TableHead>
                                <TableBody>
                                  {custodian.files.map((file, idx) => (
                                    <TableRow key={idx}>
                                      <TableCell>
                                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                          <Icon
                                            icon={`mdi:file-${file.type === 'csv' ? 'excel' : file.type}`}
                                            width={20}
                                            style={{ marginRight: 8 }}
                                          />
                                          <Typography variant="body2">{file.name}</Typography>
                                        </Box>
                                      </TableCell>
                                      <TableCell align="center">
                                        <Chip
                                          label={file.type.toUpperCase()}
                                          size="small"
                                          sx={{ height: 20, fontSize: '0.7rem' }}
                                        />
                                      </TableCell>
                                      <TableCell align="center">{file.size ? formatBytes(file.size) : 'N/A'}</TableCell>
                                      <TableCell align="right">
                                        <Typography variant="caption">{file.uploadTime}</Typography>
                                      </TableCell>
                                      <TableCell align="center">
                                        <Chip
                                          label={file.status || 'Pending'}
                                          size="small"
                                          color={
                                            file.status === 'Valid'
                                              ? 'success'
                                              : file.status === 'Processing'
                                                ? 'warning'
                                                : file.status === 'Error'
                                                  ? 'error'
                                                  : 'default'
                                          }
                                          sx={{ height: 20, fontSize: '0.7rem', minWidth: 60 }}
                                        />
                                      </TableCell>
                                    </TableRow>
                                  ))}
                                </TableBody>
                              </Table>
                            </TableContainer>
                          ) : (
                            <Typography variant="body2" color="textSecondary" align="center">
                              No files for this custodian yet
                            </Typography>
                          )}
                        </Box>
                      </TableCell>
                    </TableRow>
                  )}
                </React.Fragment>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Paper>
  );
};

const UploadData = ({ isLoading }) => {
  const theme = useTheme();
  const [activeTab, setActiveTab] = useState('custodian');
  const [uploadStep, setUploadStep] = useState(0);
  const [notification, setNotification] = useState({
    message: '',
    type: '',
    progress: 0,
    show: false
  });

  // Custodian data state
  const [custodianFiles, setCustodianFiles] = useState([
    {
      id: 'albilad',
      name: 'Albilad',
      icon: 'mdi:bank',
      color: theme.palette.primary.main,
      status: 'Ready',
      files: []
    },
    {
      id: 'riyadh',
      name: 'Riyadh',
      icon: 'mdi:city',
      color: theme.palette.secondary.main,
      status: 'Ready',
      files: []
    },
    {
      id: 'at',
      name: 'AT',
      icon: 'mdi:office-building',
      color: '#FF9800',
      status: 'Ready',
      files: []
    },
    {
      id: 'statestreet',
      name: 'State Street',
      icon: 'mdi:bank-outline',
      color: '#673AB7',
      status: 'Ready',
      files: []
    }
  ]);

  const handleTabChange = (e, newValue) => {
    setActiveTab(newValue);
    // Reset upload steps when switching tabs
    setUploadStep(0);
  };

  // Handle custodian upload
  const handleCustodianUpload = (custodianType) => {
    // Set to upload step
    setUploadStep(1);

    // Show an uploading notification with indeterminate progress first
    setNotification({
      message: `${custodianType} data upload initiated`,
      type: 'info',
      progress: 0,
      show: true
    });

    // Simulate upload progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.floor(Math.random() * 15) + 5; // Random progress between 5-20%

      if (progress >= 50 && uploadStep < 2) {
        // Move to processing step
        setUploadStep(2);
      }

      if (progress >= 100) {
        clearInterval(interval);
        progress = 100;

        // Set to complete step
        setUploadStep(3);

        // Add mock file to the custodian files
        const mockFile = {
          name: `${custodianType}_Data_${new Date().toISOString().split('T')[0]}.xlsx`,
          size: Math.floor(Math.random() * 5000000) + 1000000,
          type: 'xlsx',
          uploadTime: 'Just now',
          status: 'Valid'
        };

        setCustodianFiles((prev) =>
          prev.map((custodian) =>
            custodian.name === custodianType
              ? {
                  ...custodian,
                  files: [...custodian.files, mockFile],
                  status: 'Processing'
                }
              : custodian
          )
        );

        // Show success notification after completion
        setTimeout(() => {
          setNotification({
            message: `${custodianType} data uploaded successfully`,
            type: 'success',
            progress: 100,
            show: true
          });

          // Auto clear notification after 5 seconds
          setTimeout(() => {
            handleCloseNotification();
          }, 5000);
        }, 500);
      } else {
        setNotification({
          message: `Uploading ${custodianType} data...`,
          type: 'info',
          progress,
          show: true
        });
      }
    }, 800); // Update progress every 800ms
  };

  // APX data load handler
  const handleLoadAPXData = () => {
    // Show an initial loading notification
    setNotification({
      message: 'APX Data loading initiated',
      type: 'info',
      progress: 0,
      show: true
    });

    // Simulate multi-step process
    const steps = [
      { message: 'Connecting to APX server...', progress: 10 },
      { message: 'Authenticating connection...', progress: 25 },
      { message: 'Retrieving data catalog...', progress: 40 },
      { message: 'Processing APX data files...', progress: 60 },
      { message: 'Validating data integrity...', progress: 80 },
      { message: 'Finalizing data import...', progress: 95 },
      { message: 'APX Data loaded successfully', progress: 100, type: 'success' }
    ];

    let stepIndex = 0;
    const processStep = () => {
      const currentStep = steps[stepIndex];

      setNotification({
        message: currentStep.message,
        type: currentStep.type || 'info',
        progress: currentStep.progress,
        show: true
      });

      stepIndex++;

      if (stepIndex < steps.length) {
        // Process next step after delay
        setTimeout(processStep, 1000);
      } else {
        // Auto clear notification after completion
        setTimeout(() => {
          handleCloseNotification();
        }, 5000);
      }
    };

    // Start the process
    setTimeout(processStep, 500);
  };

  // Close notification
  const handleCloseNotification = () => {
    setNotification((prev) => ({ ...prev, show: false }));
  };

  // Custom tooltip for instructions
  const InstructionTooltip = ({ text }) => (
    <Tooltip
      title={
        <Box sx={{ p: 0.5 }}>
          <Typography variant="subtitle2" sx={{ mb: 1 }}>
            Instructions:
          </Typography>
          <Typography component="div" variant="body2">
            {text}
          </Typography>
        </Box>
      }
      arrow
      placement="right"
    >
      <IconButton size="small" color="primary">
        <Icon icon="mdi:help-circle" width={20} />
      </IconButton>
    </Tooltip>
  );

  // Custodian options
  const custodianOptions = [
    {
      title: 'Albilad',
      icon: 'mdi:bank',
      color: theme.palette.primary.main,
      handler: () => handleCustodianUpload('Albilad')
    },
    {
      title: 'Riyadh',
      icon: 'mdi:city',
      color: theme.palette.secondary.main,
      handler: () => handleCustodianUpload('Riyadh')
    },
    {
      title: 'AT',
      icon: 'mdi:office-building',
      color: '#FF9800', // Orange
      handler: () => handleCustodianUpload('AT')
    },
    {
      title: 'State Street',
      icon: 'mdi:bank-outline',
      color: '#673AB7', // Deep Purple
      handler: () => handleCustodianUpload('State Street')
    }
  ];

  return (
    <Box sx={{ p: 2 }}>
      {/* Notification */}
      <NotificationBar notification={notification} onClose={handleCloseNotification} />

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
        <>
          <Box sx={{ mt: 1, mb: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <Typography variant="body1" color="text.secondary" sx={{ mr: 1 }}>
                Select a custodian and upload its data
              </Typography>
              <InstructionTooltip
                text="1. Select the custodian type (Albilad, Riyadh, AT, or State Street)
                      2. Click the upload button for the selected custodian
                      3. Wait for confirmation of successful data upload"
              />
            </Box>

            <UploadSteps activeStep={uploadStep} />

            <Grid container spacing={3} sx={{ mt: 2 }}>
              {custodianOptions.map((option, index) => (
                <Grid item xs={12} md={6} lg={3} key={index}>
                  <CustodianUploadAction
                    title={option.title}
                    icon={option.icon}
                    color={option.color}
                    onUpload={option.handler}
                  />
                </Grid>
              ))}
            </Grid>

            {/* Raw Data Table for uploaded files */}
            <RawDataTable uploadedFiles={custodianFiles} />
          </Box>
        </>
      )}

      {/* APX Tab */}
      {activeTab === 'apx' && (
        <>
          <Box sx={{ mt: 1, mb: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <Typography variant="body1" color="text.secondary" sx={{ mr: 1 }}>
                Connect to APX system and import financial data for reconciliation and reporting. The system securely
                retrieves current portfolio data and prepares it for analysis.
              </Typography>
              <Tooltip
                title={
                  <Box sx={{ p: 0.5 }}>
                    <Typography variant="subtitle2" sx={{ mb: 1 }}>
                      APX Process Instructions:
                    </Typography>
                    <Typography component="div" variant="caption">
                      <ol style={{ paddingLeft: '16px', margin: 0 }}>
                        <li>Click the &quot;Connect APX&quot; button to establish connection</li>
                        <li>Select portfolios and date range for retrieval</li>
                        <li>System will process and normalize the data</li>
                        <li>Generated reports will be available for review</li>
                      </ol>
                    </Typography>
                  </Box>
                }
                placement="right"
              >
                <IconButton size="small" color="primary" sx={{ ml: 0.5 }}>
                  <Icon icon="mdi:information-outline" fontSize={20} />
                </IconButton>
              </Tooltip>
            </Box>

            {/* Add global style for animations */}
            <style jsx global>{`
              @keyframes spin {
                from {
                  transform: rotate(0deg);
                }
                to {
                  transform: rotate(360deg);
                }
              }
              .spinning {
                animation: spin 3s linear infinite;
              }
              @keyframes pulse {
                0% {
                  box-shadow: 0 0 0 0 rgba(76, 175, 80, 0.7);
                }
                70% {
                  box-shadow: 0 0 0 10px rgba(76, 175, 80, 0);
                }
                100% {
                  box-shadow: 0 0 0 0 rgba(76, 175, 80, 0);
                }
              }
            `}</style>

            <APXDataFlow />

            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
              <Button
                variant="contained"
                color="primary"
                size="large"
                startIcon={<Icon icon="mdi:database-import" />}
                onClick={() => handleLoadAPXData()}
                sx={{
                  bgcolor: alpha(theme.palette.primary.main, 0.8),
                  '&:hover': { bgcolor: theme.palette.primary.main }
                }}
              >
                Connect APX
              </Button>
            </Box>
          </Box>

          {/* Placeholder for APX data integration */}
          <Box sx={{ mt: 2, mb: 3 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Connected APX Data Sources
            </Typography>

            {/* Render placeholder for APX data sources */}
            <Grid container spacing={2}>
              {/* Placeholders for APX data sources */}
              {[1, 2, 3, 4].map((item) => (
                <Grid item xs={12} sm={6} md={3} key={item}>
                  <Paper
                    elevation={0}
                    sx={{
                      p: 2,
                      border: `1px solid ${theme.palette.divider}`,
                      bgcolor: alpha(theme.palette.background.paper, 0.7),
                      borderRadius: 2,
                      height: '100%'
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
                      <Avatar
                        sx={{
                          bgcolor: alpha(theme.palette.primary.main, 0.1),
                          color: theme.palette.primary.main,
                          width: 34,
                          height: 34,
                          mr: 1.5
                        }}
                      >
                        <Icon
                          icon={['mdi:database', 'mdi:chart-box', 'mdi:file-chart', 'mdi:account-details'][item - 1]}
                          width={20}
                        />
                      </Avatar>
                      <Typography variant="subtitle2">APX Source {item}</Typography>
                    </Box>
                    <Typography variant="body2" color="text.secondary">
                      Last updated: Today
                    </Typography>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Box>
        </>
      )}
    </Box>
  );
};

export default UploadData;
