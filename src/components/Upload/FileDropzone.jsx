import { Icon } from '@iconify/react';
import { Avatar, Box, Button, Paper, Typography } from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';
import PropTypes from 'prop-types';
import { useRef, useState } from 'react';
import Swal from 'sweetalert2';
import FileItem from './FileItem';

const FileDropzone = ({ onFilesAdded, custodianType, color }) => {
  const theme = useTheme();
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
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

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const validateFiles = (files) => {
    return Array.from(files).filter((file) => {
      // Check file type
      const fileType = file.type;
      const extension = '.' + file.name.split('.').pop().toLowerCase();

      if (!acceptedTypes[fileType] && !extensions.includes(extension)) {
        // Show error for invalid file type
        Swal.fire({
          icon: 'error',
          title: 'Invalid File Type',
          text: `"${file.name}" is not a supported file type. Please upload Excel, CSV, PDF or JSON files.`
        });
        return false;
      }

      // Check file size (10MB max)
      if (file.size > 10 * 1024 * 1024) {
        Swal.fire({
          icon: 'error',
          title: 'File Too Large',
          text: `"${file.name}" exceeds the 10MB size limit.`
        });
        return false;
      }

      return true;
    });
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const droppedFiles = e.dataTransfer.files;
    if (droppedFiles?.length > 0) {
      const validFiles = validateFiles(droppedFiles);

      if (validFiles.length > 0) {
        setSelectedFiles((prev) => [...prev, ...validFiles]);
        onFilesAdded(validFiles, custodianType);
      }
    }
  };

  const handleFileSelect = (e) => {
    const selectedFiles = e.target.files;
    if (selectedFiles?.length > 0) {
      const validFiles = validateFiles(selectedFiles);

      if (validFiles.length > 0) {
        setSelectedFiles((prev) => [...prev, ...validFiles]);
        onFilesAdded(validFiles, custodianType);
      }
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleRemoveFile = (index) => {
    const newFiles = [...selectedFiles];
    newFiles.splice(index, 1);
    setSelectedFiles(newFiles);
  };

  return (
    <Box sx={{ mt: 2 }}>
      <Paper
        elevation={0}
        onDragEnter={handleDragEnter}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        sx={{
          border: '2px dashed',
          borderColor: isDragging ? color : alpha(theme.palette.divider, 0.8),
          borderRadius: 2,
          bgcolor: isDragging ? alpha(color, 0.04) : 'background.paper',
          transition: 'all 0.3s ease',
          p: 3,
          textAlign: 'center',
          cursor: 'pointer'
        }}
        onClick={handleButtonClick}
      >
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: 'none' }}
          multiple
          onChange={handleFileSelect}
          accept=".xlsx,.xls,.csv,.pdf,.json"
        />

        <Box sx={{ mb: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Avatar
            sx={{
              width: 60,
              height: 60,
              bgcolor: alpha(color, 0.1),
              color: color,
              mb: 2
            }}
          >
            <Icon icon={isDragging ? 'mdi:file-upload' : 'mdi:file-multiple'} width={32} />
          </Avatar>

          <Typography variant="h6" sx={{ mb: 1 }}>
            {isDragging ? 'Drop files here' : `Upload ${custodianType} Files`}
          </Typography>

          <Typography variant="body2" color="text.secondary">
            Drag & drop files here, or click to browse
          </Typography>

          <Typography variant="caption" color="text.secondary" sx={{ mt: 1 }}>
            Accepts Excel, CSV, PDF and JSON files (max 10MB each)
          </Typography>
        </Box>

        <Button
          variant="outlined"
          startIcon={<Icon icon="mdi:file-plus" />}
          sx={{
            borderColor: alpha(color, 0.5),
            color: color,
            '&:hover': {
              borderColor: color,
              bgcolor: alpha(color, 0.1)
            }
          }}
        >
          Select Files
        </Button>
      </Paper>

      {selectedFiles.length > 0 && (
        <Box sx={{ mt: 2 }}>
          <Typography variant="subtitle2" sx={{ mb: 1 }}>
            Selected Files ({selectedFiles.length})
          </Typography>

          <Paper variant="outlined" sx={{ maxHeight: 200, overflow: 'auto', p: 1 }}>
            {selectedFiles.map((file, index) => (
              <FileItem
                key={index}
                file={file}
                onRemove={() => handleRemoveFile(index)}
                progress={file.progress || undefined}
              />
            ))}
          </Paper>

          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
            <Button
              variant="contained"
              color="success"
              startIcon={<Icon icon="mdi:cloud-upload" />}
              sx={{ mr: 1 }}
              onClick={() => onFilesAdded(selectedFiles, custodianType, true)}
            >
              Upload All Files
            </Button>

            <Button
              variant="outlined"
              color="error"
              startIcon={<Icon icon="mdi:delete" />}
              onClick={() => setSelectedFiles([])}
            >
              Clear All
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
};

FileDropzone.propTypes = {
  onFilesAdded: PropTypes.func.isRequired,
  custodianType: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired
};

export default FileDropzone;
