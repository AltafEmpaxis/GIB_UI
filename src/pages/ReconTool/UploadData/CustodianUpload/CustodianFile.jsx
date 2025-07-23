import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import { Box, Button, Chip, Grid, Paper, Typography, useTheme, LinearProgress } from '@mui/material';
import { alpha } from '@mui/material/styles';
import CustodianUploadAction from 'components/Upload/CustodianUploadAction';
import NotificationBar from 'components/Upload/NotificationBar';
import GIBStepper from './GIBStepper';
import RawDataFilesTable from './RawDataFilesTable';

export default function CustodianFile() {
  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState({});
  const [notification, setNotification] = useState({
    message: '',
    type: '',
    progress: 0,
    show: false
  });
  const [selectedFiles, setSelectedFiles] = useState([]);

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

  // Steps for the stepper
  const steps = ['Select Files', 'Upload', 'Complete'];

  // Handle file selection
  const handleFileSelect = (files, custodianType) => {
    const fileList = Array.from(files).map((file) => ({
      name: file.name,
      size: file.size,
      type: file.name.split('.').pop().toLowerCase(),
      custodian: custodianType
    }));

    setSelectedFiles(fileList);
    setActiveStep(1);
    setCompleted({ 0: true });
  };

  // Handle custodian upload
  const handleCustodianUpload = (custodianType) => {
    // Simulate file selection (in real implementation this would use a file input)
    const mockFiles = [
      new File([''], `${custodianType}_data_${Date.now()}.xlsx`, {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      })
    ];

    handleFileSelect(mockFiles, custodianType);

    // Show an uploading notification with indeterminate progress first
    setNotification({
      message: `Uploading ${custodianType} data...`,
      type: 'info',
      progress: 0,
      show: true
    });

    // Simulate upload progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.floor(Math.random() * 15) + 5; // Random progress between 5-20%

      if (progress >= 100) {
        clearInterval(interval);
        progress = 100;

        // Set to complete step
        setActiveStep(2);
        setCompleted({ 0: true, 1: true }); // Mark steps as completed

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
                  status: 'Ready'
                }
              : custodian
          )
        );

        // Show success notification after completion
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
      } else {
        setNotification({
          message: `Uploading ${custodianType} data...`,
          type: 'info',
          progress,
          show: true
        });
      }
    }, 500);
  };

  // Close notification
  const handleCloseNotification = () => {
    setNotification((prev) => ({ ...prev, show: false }));
  };

  // Format bytes to human readable format
  const formatBytes = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  // Custom content renderer for GIBStepper
  const renderStepContent = (step) => {
    switch (step) {
      case 0: // Select Files
        return (
          <Box sx={{ mt: 3 }}>
            <Grid container spacing={3}>
              {custodianFiles.map((custodian, index) => (
                <Grid item xs={12} sm={6} md={3} key={index}>
                  <CustodianUploadAction
                    title={custodian.name}
                    icon={custodian.icon}
                    color={custodian.color}
                    onUpload={() => handleCustodianUpload(custodian.name)}
                  />
                </Grid>
              ))}
            </Grid>
          </Box>
        );

      case 1: // Upload
        return (
          <Box sx={{ mt: 3 }}>
            <Paper
              elevation={0}
              sx={{
                p: 3,
                border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
                borderRadius: 1
              }}
            >
              <Typography variant="h6" gutterBottom>
                Uploading Files
              </Typography>

              {/* Files list with single progress indicator */}
              <Grid container spacing={2} sx={{ mb: 3 }}>
                {selectedFiles.map((file, index) => (
                  <Grid item xs={12} key={index}>
                    <Paper
                      elevation={0}
                      sx={{
                        p: 2,
                        borderRadius: 1,
                        border: `1px solid ${alpha(theme.palette.divider, 0.2)}`,
                        bgcolor: alpha(theme.palette.background.paper, 0.6),
                        display: 'flex',
                        alignItems: 'center'
                      }}
                    >
                      <Box
                        sx={{
                          width: 48,
                          height: 48,
                          borderRadius: 1,
                          mr: 2,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          bgcolor: alpha(theme.palette.primary.main, 0.1),
                          color: theme.palette.primary.main
                        }}
                      >
                        <Icon icon={`mdi:file-${file.type === 'csv' ? 'excel' : file.type}`} width={28} height={28} />
                      </Box>

                      <Box sx={{ flexGrow: 1 }}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                          {file.name}
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
                          <Chip size="small" label={file.type.toUpperCase()} sx={{ height: 20, fontSize: '0.7rem' }} />
                          <Typography variant="caption" color="text.secondary">
                            {formatBytes(file.size)}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {file.custodian}
                          </Typography>
                        </Box>
                      </Box>

                      <Chip
                        size="small"
                        color="warning"
                        label="Uploading"
                        icon={<Icon icon="mdi:upload" width={14} />}
                        sx={{ ml: 2 }}
                      />
                    </Paper>
                  </Grid>
                ))}
              </Grid>

              {/* Single progress indicator */}
              <Box
                sx={{
                  p: 2,
                  borderRadius: 1,
                  bgcolor: alpha(theme.palette.background.paper, 0.8),
                  border: `1px dashed ${alpha(theme.palette.primary.main, 0.2)}`
                }}
              >
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center' }}>
                    <Icon icon="mdi:information-outline" style={{ marginRight: 8 }} width={18} />
                    Upload Progress ({selectedFiles.length} {selectedFiles.length === 1 ? 'file' : 'files'})
                  </Typography>
                  <Typography variant="body2" fontWeight={600}>
                    {notification.progress}% complete
                  </Typography>
                </Box>

                <LinearProgress
                  variant="determinate"
                  value={notification.progress}
                  sx={{
                    height: 10,
                    borderRadius: 5,
                    mb: 1,
                    bgcolor: alpha(theme.palette.primary.main, 0.1),
                    '& .MuiLinearProgress-bar': {
                      background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`
                    }
                  }}
                />

                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                  <Typography variant="caption" color="text.secondary">
                    Upload speed: {Math.round(Math.random() * 2 + 1)} MB/s
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {notification.progress < 100
                      ? `Estimated completion in ${Math.round((100 - notification.progress) / 20)} minute(s)`
                      : 'Complete'}
                  </Typography>
                </Box>
              </Box>
            </Paper>
          </Box>
        );

      case 2: // Complete
        return (
          <Box sx={{ mt: 3 }}>
            {/* Success header with status */}
            <Box
              sx={{
                p: 3,
                mb: 3,
                borderRadius: 1,
                bgcolor: alpha(theme.palette.success.light, 0.15),
                border: `1px solid ${alpha(theme.palette.success.main, 0.3)}`,
                display: 'flex',
                alignItems: 'center'
              }}
            >
              <Box
                sx={{
                  width: 48,
                  height: 48,
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  bgcolor: alpha(theme.palette.success.main, 0.2),
                  mr: 2
                }}
              >
                <Icon icon="mdi:check-circle" color={theme.palette.success.main} width={28} />
              </Box>
              <Box sx={{ flexGrow: 1 }}>
                <Typography variant="h6" color="success.main">
                  Upload Complete
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {selectedFiles.length} {selectedFiles.length === 1 ? 'file has' : 'files have'} been uploaded
                  successfully
                </Typography>
              </Box>
            </Box>

            {/* File summary */}
            <Grid container spacing={3}>
              {selectedFiles.map((file, index) => (
                <Grid item xs={12} md={6} key={index}>
                  <Paper
                    elevation={0}
                    sx={{
                      p: 2,
                      borderRadius: 1,
                      border: `1px solid ${alpha(theme.palette.divider, 0.2)}`,
                      display: 'flex',
                      alignItems: 'center'
                    }}
                  >
                    <Icon
                      icon={`mdi:file-${file.type === 'csv' ? 'excel' : file.type}`}
                      width={24}
                      style={{ marginRight: 16, color: theme.palette.primary.main }}
                    />
                    <Box sx={{ flexGrow: 1 }}>
                      <Typography variant="subtitle2">{file.name}</Typography>
                      <Typography variant="caption" color="text.secondary">
                        {formatBytes(file.size)} • {file.custodian}
                      </Typography>
                    </Box>
                    <Chip
                      size="small"
                      color="success"
                      label="Valid"
                      icon={<Icon icon="mdi:check-circle" width={14} />}
                    />
                  </Paper>
                </Grid>
              ))}
            </Grid>

            {/* Action buttons */}
            <Box sx={{ mt: 3, display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
              <Button variant="outlined" color="inherit" startIcon={<Icon icon="mdi:eye" />}>
                View Data
              </Button>
              <Button
                variant="contained"
                color="primary"
                startIcon={<Icon icon="mdi:upload" />}
                onClick={() => {
                  setActiveStep(0);
                  setCompleted({});
                  setSelectedFiles([]);
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

      {/* GIB Stepper Component */}
      <Paper
        elevation={0}
        sx={{
          p: 3,
          mb: 3,
          borderRadius: 1,
          border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`
        }}
      >
        <GIBStepper
          steps={steps}
          activeStep={activeStep}
          setActiveStep={setActiveStep}
          completed={completed}
          setCompleted={setCompleted}
          contentRenderer={renderStepContent}
        />
      </Paper>

      <RawDataFilesTable uploadedFiles={custodianFiles} />
    </Box>
  );
}
