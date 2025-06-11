import { Icon } from '@iconify/react';
import { Alert, Box, Typography, useTheme } from '@mui/material';
import { alpha } from '@mui/material/styles';
import PropTypes from 'prop-types';
import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';

import UploadFileImg from 'assets/images/upload-file.svg';
import bytesToSize from 'utils/bytesToSize';

function FilesDropzone({ onFilesAdded, accept = [], maxSize = null, multiple = true, isUploading = false, ...rest }) {
  const theme = useTheme();
  const [errorMessages, setErrorMessages] = useState([]);

  // Convert file extensions to proper accept object format for react-dropzone
  const getAcceptObject = (extensions) => {
    if (!Array.isArray(extensions)) return {};
    const acceptObj = {};
    extensions.forEach((ext) => {
      switch (ext.toLowerCase()) {
        case '.csv':
          acceptObj['text/csv'] = ['.csv'];
          break;
        case '.xls':
          acceptObj['application/vnd.ms-excel'] = ['.xls'];
          break;
        case '.xlsx':
          acceptObj['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'] = ['.xlsx'];
          break;
        case '.pdf':
          acceptObj['application/pdf'] = ['.pdf'];
          break;
        case '.png':
          acceptObj['image/png'] = ['.png'];
          break;
        case '.jpg':
        case '.jpeg':
          acceptObj['image/jpeg'] = ['.jpg', '.jpeg'];
          break;
        case '.gif':
          acceptObj['image/gif'] = ['.gif'];
          break;
      }
    });
    return acceptObj;
  };

  const handleDrop = useCallback(
    (acceptedFiles, fileRejections) => {
      if (isUploading) return; // Prevent file drops during upload

      const errors = [];
      if (fileRejections.length > 0) {
        fileRejections.forEach(({ errors: fileErrors, file }) => {
          fileErrors.forEach((e) => {
            if (e.code === 'file-too-large') {
              errors.push(`${file.name} exceeds the size limit of ${bytesToSize(maxSize)}.`);
            } else if (e.code === 'file-invalid-type') {
              errors.push(`${file.name} is not an accepted file type. Accepted types: ${accept.join(', ')}`);
            } else {
              errors.push(`${file.name}: ${e.message}`);
            }
          });
        });
      }

      setErrorMessages(errors);

      if (acceptedFiles.length > 0) {
        if (!multiple && acceptedFiles.length > 1) {
          setErrorMessages(['Only one file can be uploaded at a time.']);
        } else {
          onFilesAdded(acceptedFiles);
        }
      }
    },
    [onFilesAdded, maxSize, multiple, accept, isUploading]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: handleDrop,
    accept: getAcceptObject(accept),
    maxSize,
    multiple,
    disabled: isUploading // Disable dropzone during upload
  });

  return (
    <Box {...rest}>
      {/* Dropzone */}
      <Box
        {...getRootProps()}
        sx={{
          position: 'relative',
          border: `2px dashed ${isUploading ? theme.palette.action.disabled : theme.palette.divider}`,
          padding: theme.spacing(5),
          borderRadius: theme.spacing(2),
          textAlign: 'center',
          backgroundColor: isUploading
            ? theme.palette.action.disabledBackground
            : isDragActive
              ? theme.palette.action.hover
              : 'transparent',
          cursor: isUploading ? 'not-allowed' : 'pointer',
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            backgroundColor: isUploading ? theme.palette.action.disabledBackground : theme.palette.action.hover,
            borderColor: isUploading ? theme.palette.action.disabled : theme.palette.primary.main
          },
          opacity: isUploading ? 0.7 : 1
        }}
      >
        {isUploading && (
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: alpha(theme.palette.background.paper, 0.7),
              zIndex: 1,
              borderRadius: 'inherit'
            }}
          >
            <Box sx={{ textAlign: 'center' }}>
              <Icon icon="svg-spinners:8-dots-rotate" width={40} height={40} color={theme.palette.primary.main} />
              <Typography variant="body2" color="primary" sx={{ mt: 1 }}>
                Upload in progress...
              </Typography>
            </Box>
          </Box>
        )}

        <input {...getInputProps()} disabled={isUploading} />
        <img
          alt="Select file"
          style={{
            width: 100,
            marginBottom: theme.spacing(2),
            opacity: isDragActive ? 0.7 : 1,
            transition: 'opacity 0.2s ease-in-out',
            filter: isUploading ? 'grayscale(100%)' : 'none'
          }}
          src={UploadFileImg}
        />
        <Typography variant="h6" color={isUploading ? 'text.disabled' : 'primary'}>
          {isDragActive ? 'Drop files here...' : 'Drag & drop files here, or click to select files'}
        </Typography>
        <Typography variant="body2" color={isUploading ? 'text.disabled' : 'textSecondary'} sx={{ mt: 1 }}>
          {accept.length > 0 ? `Accepted file types: ${accept.join(', ')}` : 'Any file type is accepted'}
        </Typography>
        {maxSize && (
          <Typography variant="body2" color={isUploading ? 'text.disabled' : 'textSecondary'}>
            {`Maximum file size: ${bytesToSize(maxSize)}`}
          </Typography>
        )}
      </Box>

      {errorMessages.length > 0 && (
        <Box mt={2}>
          {errorMessages.map((message, index) => (
            <Alert
              severity="error"
              key={index}
              sx={{
                mb: 1,
                '& .MuiAlert-message': {
                  width: '100%'
                }
              }}
            >
              {message}
            </Alert>
          ))}
        </Box>
      )}
    </Box>
  );
}

FilesDropzone.propTypes = {
  onFilesAdded: PropTypes.func.isRequired,
  accept: PropTypes.arrayOf(PropTypes.string),
  maxSize: PropTypes.number,
  multiple: PropTypes.bool,
  isUploading: PropTypes.bool
};

export default FilesDropzone;
