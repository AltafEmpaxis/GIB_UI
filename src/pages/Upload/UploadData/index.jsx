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
  Tabs,
  Tooltip,
  Typography,
  useTheme
} from '@mui/material';
import { alpha } from '@mui/material/styles';
import CustodianUploadAction from 'components/Upload/CustodianUploadAction';
import NotificationBar from 'components/Upload/NotificationBar';
import React, { useState } from 'react';
import GIBStepper from './GIBStepper';
import RawDataFilesTable from './RawDataFilesTable';

const UploadData = ({ isLoading }) => {
  const theme = useTheme();
  const [activeTab, setActiveTab] = useState('custodian');
  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState({});
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
    setActiveStep(0);
    setCompleted({});
  };

  // Steps for the stepper
  const steps = ['Select Custodian', 'Upload Files', 'Processing', 'Complete'];

  // Handle custodian upload
  const handleCustodianUpload = (custodianType) => {
    // Set to upload step
    setActiveStep(1);
    setCompleted({ 0: true }); // Mark first step as completed

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

      if (progress >= 50 && activeStep < 2) {
        // Move to processing step
        setActiveStep(2);
        setCompleted({ 0: true, 1: true }); // Mark first and second steps as completed
      }

      if (progress >= 100) {
        clearInterval(interval);
        progress = 100;

        // Set to complete step
        setActiveStep(3);
        setCompleted({ 0: true, 1: true, 2: true }); // Mark all steps as completed

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

  // Custom content renderer for GIBStepper
  const renderStepContent = (step, handleNext, handleBack, handleComplete) => {
    switch (step) {
      case 0: // Select Custodian
        return (
          <Box sx={{ mt: 4 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Select a custodian to upload data
            </Typography>
            <Grid container spacing={3}>
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
          </Box>
        );

      case 1: // Upload Files
        return (
          <Box sx={{ mt: 4 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Uploading Files
            </Typography>
            <Box
              sx={{
                p: 3,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor: alpha(theme.palette.primary.main, 0.05),
                borderRadius: 2,
                border: `1px dashed ${alpha(theme.palette.primary.main, 0.3)}`
              }}
            >
              <Icon icon="mdi:cloud-upload" width={60} height={60} color={theme.palette.primary.main} />
              <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                Your files are being prepared for upload...
              </Typography>
            </Box>
          </Box>
        );

      case 2: // Processing
        return (
          <Box sx={{ mt: 4 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Processing Files
            </Typography>
            <Box
              sx={{
                p: 3,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor: alpha(theme.palette.warning.main, 0.05),
                borderRadius: 2,
                border: `1px dashed ${alpha(theme.palette.warning.main, 0.3)}`
              }}
            >
              <Icon
                icon="mdi:cog"
                className="spinning-icon"
                width={60}
                height={60}
                color={theme.palette.warning.main}
              />
              <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                Your files are currently being processed...
              </Typography>
              <Typography variant="caption" color="text.secondary" sx={{ mt: 1 }}>
                This may take a few moments
              </Typography>
            </Box>
          </Box>
        );

      case 3: // Complete
        return (
          <Box sx={{ mt: 4 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Upload Complete
            </Typography>
            <Box
              sx={{
                p: 3,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor: alpha(theme.palette.success.main, 0.05),
                borderRadius: 2,
                border: `1px dashed ${alpha(theme.palette.success.main, 0.3)}`
              }}
            >
              <Icon icon="mdi:check-circle" width={60} height={60} color={theme.palette.success.main} />
              <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                Your files have been successfully uploaded and processed.
              </Typography>
              <Button
                variant="contained"
                color="primary"
                sx={{ mt: 2, borderRadius: 2 }}
                startIcon={<Icon icon="mdi:file-document-outline" />}
                onClick={() => {
                  // Reset steps to start new upload
                  setActiveStep(0);
                  setCompleted({});
                }}
              >
                Upload More Files
              </Button>
            </Box>
          </Box>
        );

      default:
        return null;
    }
  };

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

            {/* GIB Stepper Component */}
            <Paper
              elevation={0}
              sx={{
                p: 3,
                mb: 3,
                borderRadius: 2,
                bgcolor: alpha(theme.palette.primary.main, 0.03),
                border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`
              }}
            >
              <GIBStepper
                steps={steps}
                activeStep={activeStep}
                setActiveStep={setActiveStep}
                completed={completed}
                setCompleted={setCompleted}
                alternativeLabel={true}
                showControls={false}
                contentRenderer={renderStepContent}
              />
            </Paper>

            {/* Raw Data Table for uploaded files */}
            <RawDataFilesTable uploadedFiles={custodianFiles} />
          </Box>
        </>
      )}

      {/* APX Tab */}
      {activeTab === 'apx' && (
        <>
          <Box sx={{ mt: 1, mb: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <Typography variant="body1" color="text.secondary" sx={{ mr: 1 }}>
                Connect to APX system and import financial data for reconciliation and reporting. The system securely
                retrieves current portfolio data and prepares it for analysis.
              </Typography>
              <InstructionTooltip
                text="1. Click the 'Load APX Data' button to initiate the server-side process
                      2. Wait for confirmation of successful data loading
                      3. The data will be available in the View Data section"
              />
            </Box>

            <Grid container spacing={3} sx={{ mt: 2 }}>
              {/* APX Data Import Card */}
              <Grid item xs={12} md={6} sx={{ mx: 'auto' }}>
                <Paper
                  elevation={0}
                  sx={{
                    height: '100%',
                    borderRadius: 2,
                    border: `1px solid ${alpha(theme.palette.primary.main, 0.3)}`,
                    display: 'flex',
                    flexDirection: 'column'
                  }}
                >
                  <Box
                    sx={{
                      p: 2,
                      bgcolor: alpha(theme.palette.primary.main, 0.05),
                      borderBottom: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Avatar
                        sx={{
                          bgcolor: alpha(theme.palette.primary.main, 0.2),
                          color: theme.palette.primary.main,
                          width: 40,
                          height: 40,
                          mr: 2
                        }}
                      >
                        <Icon icon="mdi:database-import" width={24} />
                      </Avatar>
                      <Typography variant="h6">APX Data Import</Typography>
                    </Box>
                  </Box>

                  <Box sx={{ p: 3, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                      Import financial data from APX system for reconciliation and reporting. Click the button below to
                      start the data loading process.
                    </Typography>

                    <Box
                      sx={{
                        flexGrow: 1,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mb: 3
                      }}
                    >
                      <Box
                        sx={{
                          width: 120,
                          height: 120,
                          borderRadius: '50%',
                          border: `3px dashed ${alpha(theme.palette.primary.main, 0.3)}`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        <Icon icon="mdi:database-import" width={50} height={50} color={theme.palette.primary.main} />
                      </Box>
                    </Box>

                    <Button
                      fullWidth
                      variant="contained"
                      color="primary"
                      size="large"
                      startIcon={<Icon icon="mdi:database-import" width={22} />}
                      onClick={handleLoadAPXData}
                      sx={{
                        py: 1.2,
                        fontSize: '1rem',
                        fontWeight: 500,
                        borderRadius: 2
                      }}
                    >
                      Load APX Data
                    </Button>
                  </Box>
                </Paper>
              </Grid>
            </Grid>
          </Box>
        </>
      )}

      {/* Add CSS for spinning icon animation */}
      <style jsx global>{`
        .spinning-icon {
          animation: spin 2s linear infinite;
        }
        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </Box>
  );
};

export default UploadData;
