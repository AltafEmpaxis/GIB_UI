import { Icon } from '@iconify/react';
import { Alert, Box, Button, Card, CardContent, Grid, Snackbar, Stack, Tooltip, Typography } from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import useAuth from 'hooks/useAuth';
import { useState } from 'react';
import Swal from 'sweetalert2';

import FileCard from 'components/FilesDropzone/FileCard';
import FilesDropzone from 'components/FilesDropzone/FilesDropzone';
import MainCard from 'components/MainCard';
import axios, { endpoints } from 'utils/axios';

function UploadFiles() {
  const theme = useTheme();
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [files, setFiles] = useState([]);
  const [uploadProgress, setUploadProgress] = useState({});
  const [notification, setNotification] = useState({ message: '', type: '' });

  // Utility function for alerts
  const showAlert = (icon, title, text) => {
    Swal.fire({ icon, title, text });
  };

  // Simplified upload mutation
  const uploadMutation = useMutation({
    mutationFn: async (filesToUpload) => {
      try {
        // Prepare request data
        const formData = new FormData();
        formData.append('File1', filesToUpload[0].file);
        formData.append('File2', filesToUpload[1].file);

        // Get auth token
        const token = localStorage.getItem('accessToken');

        // Configure upload request with progress tracking
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
            UserId: user?.user_id.toString()
          },
          onUploadProgress: (event) => {
            if (event.total) {
              // Cap progress at 99% until server confirms
              const progress = Math.min(Math.round((event.loaded * 99) / event.total), 99);
              setUploadProgress({
                [filesToUpload[0].id]: progress,
                [filesToUpload[1].id]: progress
              });
            }
          }
        };

        // Make the upload request
        const response = await axios.post(endpoints.uploadNormaliseFile, formData, config);

        // Signal completion with 100%
        setUploadProgress({
          [filesToUpload[0].id]: 100,
          [filesToUpload[1].id]: 100
        });

        return response.data;
      } catch (error) {
        const errorMessage = error.response?.data?.message || error.message || 'Upload failed. Please try again.';
        throw new Error(errorMessage);
      }
    },
    onSuccess: () => {
      // Show success message
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Files uploaded successfully',
        timer: 2000,
        showConfirmButton: false
      });
      setNotification({ message: 'Files uploaded successfully', type: 'success' });

      // Only invalidate the specific components that need updating after upload finishes

      // Raw Data components
      queryClient.invalidateQueries({
        queryKey: ['Page', 'ViewData', 'Tab', 'RawData', 'SubTab', 'GenevaTaxLots']
      });
      queryClient.invalidateQueries({
        queryKey: ['Page', 'ViewData', 'Tab', 'RawData', 'SubTab', 'AxysTaxLots']
      });

      // Normalized Data components
      queryClient.invalidateQueries({
        queryKey: ['Page', 'ViewData', 'Tab', 'NormalizedData', 'SubTab', 'NormalizedGenevaData']
      });
      queryClient.invalidateQueries({
        queryKey: ['Page', 'ViewData', 'Tab', 'NormalizedData', 'SubTab', 'NormalizedAxysData']
      });

      // Cleanup
      setTimeout(() => {
        files.forEach((file) => URL.revokeObjectURL(file.url));
        setFiles([]);
        setUploadProgress({});
      }, 1000);
    },
    onError: (error) => {
      // Reset progress
      const progressReset = {};
      files.forEach((file) => {
        progressReset[file.id] = 0;
      });
      setUploadProgress(progressReset);

      // Show error message
      Swal.fire({
        icon: 'error',
        title: 'Upload Failed',
        text: error.message
      });
      setNotification({ message: error.message, type: 'error' });
    }
  });

  // Simplified file validation
  const handleFilesAdded = (newFiles) => {
    if (files.length >= 2) {
      showAlert('warning', 'Maximum Files Reached', 'You can only upload 2 files: APX first, then Custodian');
      return;
    }

    const file = newFiles[0];
    const fileName = file.name.toLowerCase();
    const isGeneva = fileName.includes('geneva');
    const isAxys = fileName.includes('axys');

    // File type validation
    if (!isGeneva && !isAxys) {
      showAlert('error', 'Invalid File', 'File name must contain either "APX" or "Custodian"');
      return;
    }

    // Order validation
    if (files.length === 0 && !isGeneva) {
      showAlert('warning', 'Wrong Order', 'Please upload APX file first');
      return;
    }

    if (files.length === 1 && !isAxys) {
      showAlert('warning', 'Wrong Order', 'Please upload Custodian file second');
      return;
    }

    // Create file object
    const newFile = {
      id: `${file.name}-${Date.now()}`,
      name: file.name,
      size: file.size,
      type: isGeneva ? 'geneva' : 'axys',
      mimeType: file.type,
      file: file,
      url: URL.createObjectURL(file)
    };

    setFiles((prev) => [...prev, newFile]);
  };

  // Simplified file removal
  const handleRemoveFile = (fileId) => {
    if (uploadMutation.isPending) return;

    setFiles((prev) =>
      prev.filter((file) => {
        if (file.id === fileId) {
          URL.revokeObjectURL(file.url);
          return false;
        }
        return true;
      })
    );

    setUploadProgress((prev) => {
      const newProgress = { ...prev };
      delete newProgress[fileId];
      return newProgress;
    });
  };

  const handleRemoveAll = () => {
    if (uploadMutation.isPending) return;

    files.forEach((file) => URL.revokeObjectURL(file.url));
    setFiles([]);
    setUploadProgress({});
  };

  const handleUpload = () => {
    if (files.length !== 2) {
      setNotification({ message: 'Please upload both APX and Custodian files', type: 'error' });
      return;
    }

    if (uploadMutation.isPending) return;
    uploadMutation.mutate(files);
  };

  return (
    <>
      <title>Upload Files - Upload your files for reconciliation</title>
      <meta name="description" content="Upload Files - Upload your files for reconciliation" />
      <meta property="og:title" content="Upload Files - Upload your files for reconciliation" />
      <meta property="og:description" content="Upload Files - Upload your files for reconciliation" />
      <MainCard title="Upload Files" elevation={0}>
        {/* Upload Instructions */}
        <Card
          sx={{
            mb: 2.5,
            background: alpha(theme.palette.primary.main, 0.3)
          }}
        >
          <CardContent>
            <Stack spacing={2}>
              {/* Header */}
              <Stack direction="row" alignItems="center" spacing={1}>
                <Icon icon="solar:document-text-bold-duotone" width={22} height={22} />
                <Typography variant="h6">Upload Instructions</Typography>
              </Stack>

              {/* File List */}
              <Box component="ol" sx={{ m: 0, pl: 3 }}>
                {/* APX File */}
                <Typography component="li">
                  <Stack direction="row" spacing={1}>
                    <Icon
                      icon="solar:file-text-bold-duotone"
                      width={18}
                      height={18}
                      style={{ color: theme.palette.success.main }}
                    />
                    <Box>
                      APX Tax Lots file (File1)
                      <Typography variant="caption" display="block">
                        Example: &quot;20231130-APX-TaxLots_Raw.xlsx&quot;
                      </Typography>
                    </Box>
                  </Stack>
                </Typography>

                {/* Custodian File */}
                <Typography component="li">
                  <Stack direction="row" spacing={1}>
                    <Icon
                      icon="solar:file-text-bold-duotone"
                      width={18}
                      height={18}
                      style={{ color: theme.palette.warning.main, marginTop: 2 }}
                    />
                    <Box>
                      Custodian Tax Lots file (File2)
                      <Typography variant="caption" display="block">
                        Example: &quot;20231130-Custodian-TaxLots_Raw.xlsx&quot;
                      </Typography>
                    </Box>
                  </Stack>
                </Typography>
              </Box>

              {/* Note */}
              <Alert severity="info" icon={<Icon icon="solar:info-circle-bold-duotone" width={20} height={20} />}>
                File names must contain either &quot;APX&quot; or &quot;Custodian&quot; and must be Excel files (.xlsx,
                .xls)
              </Alert>
            </Stack>
          </CardContent>
        </Card>

        <FilesDropzone
          onFilesAdded={handleFilesAdded}
          accept={['.xlsx', '.xls']}
          maxSize={10 * 1024 * 1024}
          multiple={false}
          isUploading={uploadMutation.isPending}
        />

        {/* File List */}
        {files.length > 0 && (
          <Box sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              {files.map((file) => (
                <Grid item xs={12} sm={6} md={4} key={file.id}>
                  <Tooltip title={`File${file.type === 'geneva' ? '1' : '2'}: ${file.name}`}>
                    <div>
                      <FileCard
                        file={file}
                        onRemove={() => handleRemoveFile(file.id)}
                        progress={uploadProgress[file.id]}
                        isUploading={uploadMutation.isPending}
                        uploadStatus={uploadMutation.status}
                      />
                    </div>
                  </Tooltip>
                </Grid>
              ))}
            </Grid>

            {/* Action Buttons */}
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 3 }}>
              <Button
                onClick={handleUpload}
                disabled={uploadMutation.isPending || files.length !== 2}
                color="primary"
                variant="contained"
                startIcon={
                  uploadMutation.isPending ? (
                    <Icon icon="svg-spinners:8-dots-rotate" width="20" height="20" />
                  ) : (
                    <Icon icon="solar:upload-bold-duotone" width="20" height="20" />
                  )
                }
              >
                {uploadMutation.isPending ? 'Uploading...' : 'Upload'}
              </Button>
              <Button
                onClick={handleRemoveAll}
                disabled={uploadMutation.isPending}
                color="error"
                variant="outlined"
                startIcon={<Icon icon="solar:trash-bin-trash-bold-duotone" width="20" height="20" />}
              >
                Remove All
              </Button>
            </Box>
          </Box>
        )}

        {/* Notifications */}
        <Snackbar
          open={!!notification.message}
          autoHideDuration={6000}
          onClose={() => setNotification({ message: '', type: '' })}
        >
          <Alert severity={notification.type} onClose={() => setNotification({ message: '', type: '' })}>
            {notification.message}
          </Alert>
        </Snackbar>
      </MainCard>
    </>
  );
}

export default UploadFiles;
