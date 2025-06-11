import { Icon } from '@iconify/react';
import {
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
  Box,
  Tooltip,
  useTheme,
  LinearProgress,
  alpha
} from '@mui/material';
import PropTypes from 'prop-types';

import bytesToSize from 'utils/bytesToSize';

function FileCard({ file, onRemove, progress, isUploading, uploadStatus }) {
  const theme = useTheme();
  const isImage = file.mimeType.startsWith('image/');

  const getFileTypeConfig = (extension) => {
    const types = {
      xlsx: { icon: 'vscode-icons:file-type-excel', color: '#217346', label: 'Excel Spreadsheet' },
      xls: { icon: 'vscode-icons:file-type-excel2', color: '#217346', label: 'Excel Spreadsheet' },
      pdf: { icon: 'vscode-icons:file-type-pdf2', color: '#FF0000', label: 'PDF Document' },
      csv: { icon: 'hugeicons:csv-02', color: '#4B4B4B', label: 'CSV File' },
      jpg: { icon: 'uiw:file-jpg', color: '#00C2FF', label: 'Image' },
      jpeg: { icon: 'simple-icons:jpeg', color: '#00C2FF', label: 'Image' },
      png: { icon: 'hugeicons:png-02', color: '#00C2FF', label: 'Image' },
      gif: { icon: 'teenyicons:gif-solid', color: '#00C2FF', label: 'Image' },
      default: { icon: 'solar:file-bold-duotone', color: '#8C8C8C', label: 'Unknown File' }
    };
    return types[extension] || types.default;
  };

  const getFileIcon = () => {
    const extension = file.name.split('.').pop().toLowerCase();
    const { icon, color } = getFileTypeConfig(extension);
    return <Icon icon={icon} style={{ fontSize: '64px', color }} />;
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = file.url;
    link.download = file.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const extension = file.name.split('.').pop().toLowerCase();
  const { label: fileTypeLabel } = getFileTypeConfig(extension);

  const getProgressStatus = (progress, isUploading, uploadStatus) => {
    if (progress === undefined) return '';
    if (progress === 0 && !isUploading) return 'Ready to upload';
    if (isUploading) {
      if (progress === 100) return 'Finalizing...';
      return `Uploading... ${progress}%`;
    }
    if (uploadStatus === 'success') return 'Upload complete';
    if (uploadStatus === 'error') return 'Upload failed';
    return 'Processing...';
  };

  const getProgressColor = (progress, isUploading, uploadStatus) => {
    if (uploadStatus === 'success') return theme.palette.success.main;
    if (uploadStatus === 'error') return theme.palette.error.main;
    if (progress === 0 && !isUploading) return theme.palette.text.secondary;
    if (isUploading) {
      if (progress === 100) return theme.palette.warning.main;
      return theme.palette.primary.main;
    }
    return theme.palette.info.main;
  };

  const getProgressValue = (progress, isUploading, uploadStatus) => {
    if (uploadStatus === 'error') return 0;
    if (isUploading && progress === 100) return 99; // Show 99% while finalizing
    return progress || 0;
  };

  return (
    <Card
      sx={{
        position: 'relative',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'all 0.3s ease-in-out',
        transform: isUploading ? 'scale(1.02)' : 'none',
        '&:hover': {
          transform: isUploading ? 'scale(1.02)' : 'translateY(-4px)',
          boxShadow: theme.shadows[8]
        }
      }}
    >
      {/* Upload Overlay */}
      {isUploading && (
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: alpha(theme.palette.background.paper, 0.3),
            backdropFilter: 'blur(0.25px)',
            zIndex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 'inherit'
          }}
        >
          <Icon
            icon="svg-spinners:8-dots-rotate"
            width={40}
            height={40}
            style={{ color: getProgressColor(progress, isUploading, uploadStatus) }}
          />
          <Typography
            variant="body2"
            sx={{
              mt: 1,
              color: getProgressColor(progress, isUploading, uploadStatus),
              fontWeight: 600
            }}
          >
            {getProgressStatus(progress, isUploading, uploadStatus)}
          </Typography>
        </Box>
      )}

      <Box sx={{ position: 'relative', flexGrow: 1 }}>
        {isImage ? (
          <CardMedia
            component="img"
            height="160"
            image={file.url}
            alt={file.name}
            sx={{
              objectFit: 'cover',
              backgroundColor: theme.palette.background.neutral,
              filter: isUploading ? 'grayscale(50%)' : 'none',
              transition: 'filter 0.3s ease-in-out'
            }}
          />
        ) : (
          <Box
            sx={{
              height: 160,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor:
                theme.palette.mode === 'dark' ? theme.palette.background.neutral : theme.palette.grey[50],
              transition: 'all 0.3s ease-in-out',
              filter: isUploading ? 'grayscale(50%)' : 'none'
            }}
          >
            {getFileIcon()}
            <Typography
              variant="caption"
              sx={{
                mt: 1,
                color: isUploading ? theme.palette.text.disabled : theme.palette.text.secondary,
                textTransform: 'uppercase',
                fontSize: '0.7rem',
                letterSpacing: '0.5px',
                transition: 'color 0.3s ease-in-out'
              }}
            >
              {fileTypeLabel}
            </Typography>
          </Box>
        )}
      </Box>

      <CardContent
        sx={{
          p: 2,
          '&:last-child': { pb: 2 },
          borderTop: `1px solid ${theme.palette.divider}`,
          backgroundColor: isUploading ? alpha(theme.palette.background.paper, 0.8) : theme.palette.background.paper,
          transition: 'background-color 0.3s ease-in-out'
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 1
          }}
        >
          <Box sx={{ overflow: 'hidden', flexGrow: 1 }}>
            <Typography
              variant="subtitle2"
              noWrap
              sx={{
                fontWeight: 600,
                color: isUploading ? theme.palette.text.disabled : theme.palette.text.primary,
                transition: 'color 0.3s ease-in-out'
              }}
            >
              {file.name}
            </Typography>
            <Typography
              variant="caption"
              sx={{
                color: isUploading ? theme.palette.text.disabled : theme.palette.text.secondary,
                display: 'block',
                transition: 'color 0.3s ease-in-out'
              }}
            >
              {bytesToSize(file.size)}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 0.5 }}>
            <Tooltip title={isUploading ? 'Upload in progress...' : 'Download file'}>
              <span>
                <IconButton
                  onClick={handleDownload}
                  size="large"
                  disabled={isUploading}
                  sx={{
                    color: theme.palette.primary.main,
                    opacity: isUploading ? 0.5 : 1,
                    '&:hover': {
                      backgroundColor: theme.palette.primary.lighter
                    }
                  }}
                >
                  <Icon icon="solar:download-bold-duotone" width="20" height="20" />
                </IconButton>
              </span>
            </Tooltip>
            <Tooltip title={isUploading ? 'Upload in progress...' : 'Remove file'}>
              <span>
                <IconButton
                  onClick={() => onRemove(file.id)}
                  size="large"
                  disabled={isUploading}
                  sx={{
                    color: theme.palette.error.main,
                    opacity: isUploading ? 0.5 : 1,
                    '&:hover': {
                      backgroundColor: theme.palette.error.lighter
                    }
                  }}
                >
                  <Icon icon="solar:trash-bin-trash-bold-duotone" width="20" height="20" />
                </IconButton>
              </span>
            </Tooltip>
          </Box>
        </Box>
      </CardContent>

      {progress !== undefined && (
        <Box
          sx={{
            p: 2,
            pt: 1.5,
            borderTop: `1px solid ${theme.palette.divider}`,
            backgroundColor:
              theme.palette.mode === 'dark'
                ? alpha(theme.palette.grey[900], isUploading ? 0.8 : 1)
                : alpha(theme.palette.grey[50], isUploading ? 0.8 : 1),
            transition: 'all 0.3s ease-in-out'
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 0.5 }}>
            <Box sx={{ flex: 1 }}>
              <LinearProgress
                variant={isUploading ? 'determinate' : 'indeterminate'}
                value={getProgressValue(progress, isUploading, uploadStatus)}
                sx={{
                  height: 8,
                  borderRadius: 4,
                  backgroundColor:
                    theme.palette.mode === 'dark'
                      ? alpha(theme.palette.grey[800], 0.8)
                      : alpha(theme.palette.grey[200], 0.8),
                  '& .MuiLinearProgress-bar': {
                    borderRadius: 4,
                    backgroundColor: getProgressColor(progress, isUploading, uploadStatus),
                    transition: 'all 0.3s ease-in-out',
                    boxShadow: isUploading
                      ? `0 0 10px ${getProgressColor(progress, isUploading, uploadStatus)}`
                      : 'none'
                  }
                }}
              />
            </Box>
            <Typography
              variant="body2"
              sx={{
                minWidth: '45px',
                fontWeight: 600,
                color: getProgressColor(progress, isUploading, uploadStatus)
              }}
            >
              {isUploading && progress === 100 ? '99%' : `${Math.round(progress || 0)}%`}
            </Typography>
          </Box>
          <Typography
            variant="caption"
            sx={{
              display: 'block',
              textAlign: 'left',
              color: getProgressColor(progress, isUploading, uploadStatus),
              transition: 'color 0.3s ease-in-out',
              fontWeight: isUploading ? 600 : 400
            }}
          >
            {getProgressStatus(progress, isUploading, uploadStatus)}
          </Typography>
        </Box>
      )}
    </Card>
  );
}

FileCard.propTypes = {
  file: PropTypes.shape({
    id: PropTypes.string.isRequired,
    mimeType: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    size: PropTypes.number.isRequired
  }).isRequired,
  onRemove: PropTypes.func.isRequired,
  progress: PropTypes.number,
  isUploading: PropTypes.bool,
  uploadStatus: PropTypes.string
};

export default FileCard;
