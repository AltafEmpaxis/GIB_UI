import { Icon } from '@iconify/react';
import { Box, Chip, IconButton, LinearProgress, Menu, MenuItem, Paper, Typography } from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';
import PropTypes from 'prop-types';
import { useState } from 'react';

// Format bytes to human readable format
export const formatBytes = (bytes, decimals = 2) => {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};

// File type icons
export const getFileIcon = (fileType) => {
  switch (fileType?.toLowerCase()) {
    case 'image':
    case 'jpg':
    case 'jpeg':
    case 'png':
    case 'gif':
    case 'svg':
      return <Icon icon="material-symbols:image" width={24} height={24} />;
    case 'pdf':
      return <Icon icon="material-symbols:picture-as-pdf" width={24} height={24} />;
    case 'doc':
    case 'docx':
      return <Icon icon="material-symbols:document" width={24} height={24} />;
    case 'xls':
    case 'xlsx':
    case 'csv':
      return <Icon icon="mdi:file-excel" width={24} height={24} />;
    case 'ppt':
    case 'pptx':
      return <Icon icon="mdi:file-powerpoint" width={24} height={24} />;
    case 'zip':
    case 'rar':
      return <Icon icon="mdi:zip-box" width={24} height={24} />;
    case 'audio':
    case 'mp3':
    case 'wav':
      return <Icon icon="mdi:file-music" width={24} height={24} />;
    case 'video':
    case 'mp4':
    case 'avi':
      return <Icon icon="mdi:file-video" width={24} height={24} />;
    case 'geneva':
      return <Icon icon="mdi:file-chart" width={24} height={24} color="#4CAF50" />;
    case 'axys':
      return <Icon icon="mdi:file-chart" width={24} height={24} color="#2196F3" />;
    default:
      return <Icon icon="mdi:file-document" width={24} height={24} />;
  }
};

const FileItem = ({ file, onRemove, progress }) => {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleRemove = () => {
    handleMenuClose();
    onRemove(file.id);
  };

  // Determine file type for icon
  const fileExtension = file.name.split('.').pop().toLowerCase();

  return (
    <Paper
      elevation={1}
      sx={{
        p: 1,
        mb: 1,
        position: 'relative',
        borderRadius: 1,
        transition: 'all 0.2s',
        '&:hover': {
          boxShadow: theme.shadows[3],
          transform: 'translateY(-2px)'
        }
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', pr: 6 }}>
        <Box sx={{ p: 1, bgcolor: alpha(theme.palette.primary.main, 0.08), borderRadius: 1, mr: 2 }}>
          {getFileIcon(file.type || fileExtension)}
        </Box>
        <Box sx={{ flexGrow: 1, minWidth: 0 }}>
          <Typography variant="subtitle2" noWrap title={file.name}>
            {file.name}
          </Typography>
          <Typography variant="caption" color="textSecondary">
            {formatBytes(file.size)}{' '}
            {file.type && <Chip size="small" label={file.type} sx={{ ml: 1, height: 18, fontSize: '0.6rem' }} />}
          </Typography>

          {/* Progress bar */}
          {progress !== undefined && (
            <Box sx={{ width: '100%', mt: 1 }}>
              <LinearProgress
                variant="determinate"
                value={progress}
                sx={{
                  height: 5,
                  borderRadius: 5,
                  bgcolor: alpha(theme.palette.primary.main, 0.12),
                  '.MuiLinearProgress-bar': {
                    borderRadius: 5,
                    bgcolor: progress === 100 ? theme.palette.success.main : theme.palette.primary.main
                  }
                }}
              />
              <Typography variant="caption" sx={{ display: 'block', textAlign: 'right', mt: 0.5 }}>
                {progress}%
              </Typography>
            </Box>
          )}
        </Box>
      </Box>

      {/* Action buttons */}
      <Box sx={{ position: 'absolute', top: 8, right: 8 }}>
        <IconButton size="small" onClick={handleMenuOpen} color="default">
          <Icon icon="mdi:dots-vertical" />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          PaperProps={{
            elevation: 3,
            sx: { minWidth: 120 }
          }}
        >
          <MenuItem onClick={handleRemove}>
            <Icon icon="mdi:delete-outline" style={{ marginRight: 8 }} />
            Remove
          </MenuItem>
          <MenuItem onClick={handleMenuClose}>
            <Icon icon="mdi:file-replace-outline" style={{ marginRight: 8 }} />
            Replace
          </MenuItem>
        </Menu>
      </Box>
    </Paper>
  );
};

FileItem.propTypes = {
  file: PropTypes.object.isRequired,
  onRemove: PropTypes.func.isRequired,
  progress: PropTypes.number
};

export default FileItem;
