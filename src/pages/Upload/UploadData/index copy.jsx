import { Icon } from '@iconify/react';
import {
  Alert,
  AlertTitle,
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
  Tabs,
  Typography,
  useTheme
} from '@mui/material';
import { alpha } from '@mui/material/styles';
import CustodianUploadAction from 'components/Upload/CustodianUploadAction';
import NotificationBar from 'components/Upload/NotificationBar';
import { useState } from 'react';
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
    <Box sx={{ p: { xs: 1, sm: 2, md: 3 } }}>
      {/* Notification */}
      <NotificationBar notification={notification} onClose={handleCloseNotification} />

      {/* Welcome Section */}
      <Card
        elevation={0}
        sx={{
          mb: 3,
          background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.08)} 0%, ${alpha(
            theme.palette.secondary.main,
            0.05
          )} 100%)`,
          border: `1px solid ${alpha(theme.palette.primary.main, 0.12)}`
        }}
      >
        <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems="center">
            <Avatar
              sx={{
                width: { xs: 48, sm: 56 },
                height: { xs: 48, sm: 56 },
                bgcolor: alpha(theme.palette.primary.main, 0.1),
                color: theme.palette.primary.main
              }}
            >
              <Icon icon="mdi:cloud-upload" width={28} />
            </Avatar>
            <Box sx={{ textAlign: { xs: 'center', sm: 'left' }, flexGrow: 1 }}>
              <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>
                Data Upload Center
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                Upload and manage your financial data files from various custodians or import directly from APX systems.
              </Typography>
              <Stack direction="row" spacing={1} sx={{ justifyContent: { xs: 'center', sm: 'flex-start' } }}>
                <Chip
                  icon={<Icon icon="mdi:shield-check" width={16} />}
                  label="Secure Upload"
                  size="small"
                  color="primary"
                  variant="outlined"
                />
                <Chip
                  icon={<Icon icon="mdi:file-check" width={16} />}
                  label="Auto Validation"
                  size="small"
                  color="secondary"
                  variant="outlined"
                />
              </Stack>
            </Box>
          </Stack>
        </CardContent>
      </Card>

      {/* Tab selection */}
      <Paper
        elevation={0}
        sx={{
          mb: 3,
          border: `1px solid ${alpha(theme.palette.divider, 0.12)}`,
          borderRadius: 2,
          overflow: 'hidden'
        }}
      >
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          aria-label="upload data tabs"
          variant="fullWidth"
          sx={{
            '& .MuiTabs-indicator': {
              height: 3,
              borderTopLeftRadius: 3,
              borderTopRightRadius: 3,
              background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`
            },
            '& .Mui-selected': {
              fontWeight: 600,
              color: theme.palette.primary.main
            },
            '& .MuiTab-root': {
              minHeight: 64,
              textTransform: 'none',
              fontSize: '1rem'
            }
          }}
        >
          <Tab
            icon={<Icon icon="mdi:folder-multiple" width={24} />}
            iconPosition="start"
            label={
              <Box>
                <Typography variant="subtitle1" sx={{ fontWeight: 'inherit' }}>
                  Custodian Data
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Upload files from banks & institutions
                </Typography>
              </Box>
            }
            value="custodian"
            sx={{ px: 2 }}
          />
          <Tab
            icon={<Icon icon="mdi:chart-box" width={24} />}
            iconPosition="start"
            label={
              <Box>
                <Typography variant="subtitle1" sx={{ fontWeight: 'inherit' }}>
                  APX Integration
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Import directly from APX system
                </Typography>
              </Box>
            }
            value="apx"
            sx={{ px: 2 }}
          />
        </Tabs>
      </Paper>

      {/* Custodian Tab */}
      {activeTab === 'custodian' && (
        <Box sx={{ mb: 4 }}>
          {/* Instructions Section */}
          <Alert
            severity="info"
            icon={<Icon icon="mdi:information" width={20} />}
            sx={{
              mb: 3,
              borderRadius: 2,
              '& .MuiAlert-message': { width: '100%' }
            }}
          >
            <AlertTitle sx={{ fontWeight: 600, mb: 1 }}>How to Upload Custodian Data</AlertTitle>
            <Stack spacing={1}>
              <Typography variant="body2">
                • <strong>Step 1:</strong> Select your custodian type (Albilad, Riyadh, AT, or State Street)
              </Typography>
              <Typography variant="body2">
                • <strong>Step 2:</strong> Drag & drop files or click to browse and select your data files
              </Typography>
              <Typography variant="body2">
                • <strong>Step 3:</strong> Review and confirm your upload - files will be automatically validated
              </Typography>
            </Stack>
            <Divider sx={{ my: 2 }} />
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <Chip
                icon={<Icon icon="mdi:file-excel" width={16} />}
                label="Supported: .xlsx, .csv, .xls"
                size="small"
                variant="outlined"
                color="info"
              />
              <Chip
                icon={<Icon icon="mdi:file-upload" width={16} />}
                label="Max size: 50MB per file"
                size="small"
                variant="outlined"
                color="info"
              />
            </Stack>
          </Alert>

          {/* GIB Stepper Component */}
          <Paper
            elevation={0}
            sx={{
              p: { xs: 2, sm: 3 },
              mb: 3,
              borderRadius: 2,
              bgcolor: alpha(theme.palette.primary.main, 0.02),
              border: `1px solid ${alpha(theme.palette.primary.main, 0.08)}`
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
      )}

      {/* APX Tab */}
      {activeTab === 'apx' && (
        <Box sx={{ mb: 4 }}>
          {/* APX Instructions Section */}
          <Alert
            severity="info"
            icon={<Icon icon="mdi:information" width={20} />}
            sx={{
              mb: 3,
              borderRadius: 2,
              '& .MuiAlert-message': { width: '100%' }
            }}
          >
            <AlertTitle sx={{ fontWeight: 600, mb: 1 }}>APX System Integration</AlertTitle>
            <Typography variant="body2" sx={{ mb: 2 }}>
              Connect to your APX system and import financial data for reconciliation and reporting. The system securely
              retrieves current portfolio data and prepares it for analysis.
            </Typography>
            <Stack spacing={1}>
              <Typography variant="body2">
                • <strong>Step 1:</strong> Click "Load APX Data" to initiate the server connection
              </Typography>
              <Typography variant="body2">
                • <strong>Step 2:</strong> Wait for the system to authenticate and retrieve data
              </Typography>
              <Typography variant="body2">
                • <strong>Step 3:</strong> Data will be automatically processed and available in View Data section
              </Typography>
            </Stack>
          </Alert>

          <Grid container spacing={3} justifyContent="center">
            {/* APX Data Import Card */}
            <Grid item xs={12} md={8} lg={6}>
              <Card
                elevation={0}
                sx={{
                  height: '100%',
                  borderRadius: 3,
                  border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
                  background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.02)} 0%, ${alpha(
                    theme.palette.secondary.main,
                    0.02
                  )} 100%)`,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: theme.shadows[4]
                  }
                }}
              >
                <Box
                  sx={{
                    p: 3,
                    background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.08)} 0%, ${alpha(
                      theme.palette.secondary.main,
                      0.05
                    )} 100%)`,
                    borderBottom: `1px solid ${alpha(theme.palette.primary.main, 0.12)}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <Avatar
                    sx={{
                      bgcolor: alpha(theme.palette.primary.main, 0.1),
                      color: theme.palette.primary.main,
                      width: 56,
                      height: 56,
                      mr: 2
                    }}
                  >
                    <Icon icon="mdi:database-import" width={28} />
                  </Avatar>
                  <Box>
                    <Typography variant="h5" sx={{ fontWeight: 600 }}>
                      APX Data Import
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Secure connection to APX system
                    </Typography>
                  </Box>
                </Box>

                <CardContent sx={{ p: 4, textAlign: 'center' }}>
                  <Box
                    sx={{
                      width: 140,
                      height: 140,
                      borderRadius: '50%',
                      border: `3px dashed ${alpha(theme.palette.primary.main, 0.3)}`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mx: 'auto',
                      mb: 3,
                      background: `radial-gradient(circle, ${alpha(theme.palette.primary.main, 0.05)} 0%, transparent 70%)`
                    }}
                  >
                    <Icon icon="mdi:database-import" width={60} height={60} color={theme.palette.primary.main} />
                  </Box>

                  <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                    Ready to import your APX portfolio data. This process will securely connect to your APX system and
                    retrieve the latest financial information.
                  </Typography>

                  <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    size="large"
                    startIcon={<Icon icon="mdi:database-import" width={22} />}
                    onClick={handleLoadAPXData}
                    sx={{
                      py: 1.5,
                      fontSize: '1.1rem',
                      fontWeight: 600,
                      borderRadius: 2,
                      background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
                      '&:hover': {
                        background: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`
                      }
                    }}
                  >
                    Load APX Data
                  </Button>

                  <Stack direction="row" spacing={1} sx={{ mt: 2, justifyContent: 'center' }}>
                    <Chip
                      icon={<Icon icon="mdi:shield-lock" width={14} />}
                      label="Secure"
                      size="small"
                      variant="outlined"
                      color="primary"
                    />
                    <Chip
                      icon={<Icon icon="mdi:clock-fast" width={14} />}
                      label="Real-time"
                      size="small"
                      variant="outlined"
                      color="secondary"
                    />
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
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
