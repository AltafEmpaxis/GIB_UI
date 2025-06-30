import { Icon } from '@iconify/react';
import { Avatar, Box, Button, Card, CardContent, CircularProgress, Typography } from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';
import PropTypes from 'prop-types';
import { useRef, useState } from 'react';
import Swal from 'sweetalert2';

const CustodianUploadAction = ({ title, icon, color, onUpload }) => {
  const theme = useTheme();
  const [isHovered, setIsHovered] = useState(false);
  const [isDropping, setIsDropping] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [isValidating, setIsValidating] = useState(false);
  const fileInputRef = useRef(null);

  // Accepted file types
  const acceptedTypes = {
    'application/vnd.ms-excel': true,
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': true,
    'text/csv': true,
    'application/pdf': true,
    'application/json': true
  };

  const extensions = ['.xlsx', '.xls', '.csv', '.pdf', '.json'];
  const maxFileSize = 10 * 1024 * 1024; // 10MB

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDropping(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDropping(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const validateFiles = (files) => {
    setIsValidating(true);
    const validFiles = [];
    const errors = [];

    Array.from(files).forEach((file) => {
      // Check file type
      const fileType = file.type;
      const extension = '.' + file.name.split('.').pop().toLowerCase();

      if (!acceptedTypes[fileType] && !extensions.includes(extension)) {
        errors.push(`"${file.name}" is not a supported file type. Please upload Excel, CSV, PDF or JSON files.`);
        return;
      }

      // Check file size (10MB max)
      if (file.size > maxFileSize) {
        errors.push(`"${file.name}" exceeds the 10MB size limit.`);
        return;
      }

      validFiles.push(file);
    });

    setIsValidating(false);

    if (errors.length > 0) {
      Swal.fire({
        icon: 'error',
        title: 'Invalid Files',
        html: errors.join('<br>'),
        confirmButtonText: 'Got it'
      });
    }

    return validFiles;
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDropping(false);

    // Simulate file handling
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const validFiles = validateFiles(e.dataTransfer.files);
      if (validFiles.length > 0) {
        setSelectedFiles(validFiles);
        if (validFiles.length > 0) {
          Swal.fire({
            icon: 'success',
            title: 'Files Ready',
            text: `${validFiles.length} files selected for upload. Click "Upload ${title} Data" to continue.`,
            confirmButtonText: 'OK'
          });
        }
      }
    }
  };

  const handleFileInputChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const validFiles = validateFiles(e.target.files);
      if (validFiles.length > 0) {
        setSelectedFiles(validFiles);
        if (validFiles.length > 0) {
          Swal.fire({
            icon: 'success',
            title: 'Files Ready',
            text: `${validFiles.length} files selected for upload. Click "Upload ${title} Data" to continue.`,
            confirmButtonText: 'OK'
          });
        }
      }
    }
  };

  const handleButtonClick = () => {
    if (selectedFiles.length > 0) {
      Swal.fire({
        title: `Upload ${title} Data?`,
        text: `You are about to upload ${selectedFiles.length} files. Do you want to continue?`,
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Yes, Upload',
        cancelButtonText: 'Cancel'
      }).then((result) => {
        if (result.isConfirmed) {
          onUpload(title);
          // Clear selected files after upload
          setTimeout(() => {
            setSelectedFiles([]);
          }, 2000);
        }
      });
    } else {
      fileInputRef.current.click();
    }
  };

  return (
    <Card
      elevation={isDropping ? 8 : isHovered ? 4 : 0}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      sx={{
        border: 1,
        borderStyle: isDropping ? 'dashed' : 'solid',
        borderWidth: isDropping ? 2 : 1,
        borderColor: isDropping ? color : 'divider',
        transition: 'all 0.3s ease',
        transform: isHovered ? 'translateY(-4px)' : 'none',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        overflow: 'hidden',
        bgcolor: isDropping ? alpha(color, 0.05) : 'background.paper',
        '&:hover': {
          boxShadow: theme.shadows[5],
          borderColor: alpha(color, 0.5)
        }
      }}
    >
      {isDropping && (
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            bgcolor: alpha(color, 0.1),
            zIndex: 10
          }}
        >
          <Icon icon="mdi:cloud-upload" width={48} height={48} style={{ color, marginBottom: 8 }} />
          <Typography variant="h6" color={color} sx={{ fontWeight: 600 }}>
            Drop files here
          </Typography>
        </Box>
      )}

      <CardContent sx={{ p: 3, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Avatar
            sx={{
              width: 48,
              height: 48,
              bgcolor: alpha(color, 0.1),
              color: color,
              mr: 2,
              transition: 'all 0.3s',
              transform: isHovered ? 'scale(1.1)' : 'scale(1)'
            }}
          >
            <Icon icon={icon} width={28} height={28} />
          </Avatar>
          <Box>
            <Typography variant="h5">{title}</Typography>
            <Typography variant="body2" color="text.secondary">
              {selectedFiles.length > 0 ? `${selectedFiles.length} files selected` : 'Click or drop files here'}
            </Typography>
          </Box>
        </Box>

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            py: 2,
            flexGrow: 1,
            borderRadius: 1,
            border: '1px dashed',
            borderColor: selectedFiles.length > 0 ? alpha(theme.palette.success.main, 0.5) : alpha(color, 0.3),
            bgcolor: selectedFiles.length > 0 ? alpha(theme.palette.success.main, 0.05) : alpha(color, 0.02),
            transition: 'all 0.2s'
          }}
        >
          {isValidating ? (
            <CircularProgress size={40} sx={{ color: alpha(color, 0.6), mb: 1 }} />
          ) : selectedFiles.length > 0 ? (
            <>
              <Icon
                icon="mdi:check-circle"
                width={40}
                height={40}
                style={{
                  color: theme.palette.success.main,
                  marginBottom: 8
                }}
              />
              <Typography variant="body2" color="success.main" align="center" sx={{ fontWeight: 500 }}>
                {selectedFiles.length} {selectedFiles.length === 1 ? 'file' : 'files'} selected
              </Typography>
            </>
          ) : (
            <>
              <Icon
                icon="mdi:file-upload-outline"
                width={40}
                height={40}
                style={{
                  color: alpha(color, 0.6),
                  marginBottom: 8
                }}
              />
              <Typography variant="body2" color="text.secondary" align="center">
                Drag & drop your {title} files
                <br />
                or click to browse
              </Typography>
              <Typography variant="caption" color="text.secondary" sx={{ mt: 1 }}>
                Accepts Excel, CSV, PDF, JSON • Max 10MB
              </Typography>
            </>
          )}
        </Box>

        <input
          type="file"
          ref={fileInputRef}
          style={{ display: 'none' }}
          multiple
          onChange={handleFileInputChange}
          accept=".xlsx,.xls,.csv,.pdf,.json"
        />

        <Button
          fullWidth
          variant="contained"
          sx={{
            bgcolor: color,
            mt: 2,
            py: 1.2,
            boxShadow: isHovered ? theme.shadows[4] : theme.shadows[1],
            '&:hover': {
              bgcolor: alpha(color, 0.8)
            }
          }}
          startIcon={
            selectedFiles.length > 0 ? (
              <Icon icon="mdi:check-circle" width={20} />
            ) : (
              <Icon icon="mdi:upload" width={20} />
            )
          }
          onClick={handleButtonClick}
          endIcon={selectedFiles.length > 0 && <Icon icon="mdi:arrow-right" width={20} />}
        >
          {selectedFiles.length > 0 ? 'Continue Upload' : `Upload ${title} Data`}
        </Button>
      </CardContent>
    </Card>
  );
};

CustodianUploadAction.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  onUpload: PropTypes.func.isRequired
};

export default CustodianUploadAction;
