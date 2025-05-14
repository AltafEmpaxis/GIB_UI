import { useCallback } from 'react';

import { Icon } from '@iconify/react';
import { Box, Typography, Badge, Avatar, useTheme } from '@mui/material';
import { alpha } from '@mui/material/styles';
import PropTypes from 'prop-types';
import { useDropzone } from 'react-dropzone';
import Swal from 'sweetalert2';

const AvatarDropzone = ({ currentImage, onImageUpload, username, size = 80, disabled = false }) => {
  const theme = useTheme();

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif']
    },
    maxFiles: 1,
    multiple: false,
    maxSize: 5242880, // 5MB
    disabled,
    onDrop: useCallback(
      (acceptedFiles, rejectedFiles) => {
        if (rejectedFiles?.length > 0) {
          const error = rejectedFiles[0].errors[0];
          let errorMessage = 'Invalid file';

          if (error.code === 'file-too-large') {
            errorMessage = 'File is too large. Maximum size is 5MB';
          } else if (error.code === 'file-invalid-type') {
            errorMessage = 'Invalid file type. Please upload an image file';
          }

          Swal.fire({
            icon: 'error',
            title: 'Upload Error',
            text: errorMessage
          });
          return;
        }

        if (acceptedFiles?.[0]) {
          const file = acceptedFiles[0];
          // Create a preview URL
          const previewUrl = URL.createObjectURL(file);
          onImageUpload(file, previewUrl);
        }
      },
      [onImageUpload]
    )
  });

  // Calculate the small avatar size based on the main avatar size
  const smallAvatarSize = Math.max(24, size * 0.3);

  return (
    <Box
      sx={{
        position: 'relative',
        width: size,
        height: size
      }}
    >
      <Badge
        overlap="circular"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        badgeContent={
          !disabled && (
            <Avatar
              {...getRootProps()}
              sx={{
                width: smallAvatarSize,
                height: smallAvatarSize,
                backgroundColor: theme.palette.primary.light,
                color: theme.palette.primary.contrastText,
                cursor: 'pointer',
                border: `2px solid ${theme.palette.background.paper}`,
                transition: 'all 0.2s ease',
                '&:hover': {
                  backgroundColor: theme.palette.primary.main,
                  transform: 'scale(1.1)'
                }
              }}
            >
              <input {...getInputProps()} accept="image/*" />
              <Icon
                icon="solar:camera-bold"
                width={Math.max(16, smallAvatarSize * 0.6)}
                height={Math.max(16, smallAvatarSize * 0.6)}
              />
            </Avatar>
          )
        }
      >
        <Avatar
          src={currentImage}
          alt={`${username}'s avatar`}
          sx={{
            width: size,
            height: size,
            border: `3px solid ${theme.palette.background.paper}`,
            cursor: disabled ? 'default' : 'pointer',
            backgroundColor: theme.palette.primary.lighter,
            color: theme.palette.primary.dark,
            fontSize: `${Math.max(16, size * 0.4)}px`,
            fontWeight: 600
          }}
          {...(!disabled && getRootProps())}
        >
          {username?.charAt(0).toUpperCase()}
        </Avatar>
      </Badge>

      {/* Drag and Drop Overlay */}
      {!disabled && (
        <Box
          {...getRootProps()}
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            borderRadius: '50%',
            backgroundColor: isDragActive ? alpha(theme.palette.primary.main, 0.15) : 'transparent',
            border: isDragActive ? `2px dashed ${theme.palette.primary.main}` : '2px dashed transparent',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            opacity: isDragActive ? 1 : 0,
            transition: 'all 0.2s ease-in-out',
            cursor: 'pointer',
            zIndex: 0, // Lower z-index so badge appears above
            '&:hover': {
              opacity: 1,
              backgroundColor: alpha(theme.palette.primary.main, 0.1),
              border: `2px dashed ${theme.palette.primary.main}`
            }
          }}
        >
          <input {...getInputProps()} accept="image/*" />
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: alpha(theme.palette.background.paper, 0.8),
              borderRadius: '50%',
              width: '70%',
              height: '70%',
              padding: 1
            }}
          >
            {isDragActive ? (
              <>
                <Icon
                  icon="solar:upload-minimalistic-bold"
                  width={Math.max(20, size * 0.25)}
                  height={Math.max(20, size * 0.25)}
                  color={theme.palette.primary.main}
                />
                <Typography
                  variant="caption"
                  sx={{
                    color: theme.palette.primary.main,
                    fontWeight: 'bold',
                    textAlign: 'center',
                    fontSize: Math.max(10, size * 0.12),
                    mt: 0.5
                  }}
                >
                  Drop now
                </Typography>
              </>
            ) : (
              <>
                <Icon
                  icon="solar:gallery-bold"
                  width={Math.max(20, size * 0.22)}
                  height={Math.max(20, size * 0.22)}
                  color={theme.palette.text.secondary}
                />
                <Typography
                  variant="caption"
                  sx={{
                    color: theme.palette.text.secondary,
                    fontWeight: 'medium',
                    textAlign: 'center',
                    fontSize: Math.max(9, size * 0.1),
                    mt: 0.5
                  }}
                >
                  Upload photo
                </Typography>
              </>
            )}
          </Box>
        </Box>
      )}
    </Box>
  );
};

AvatarDropzone.propTypes = {
  currentImage: PropTypes.string,
  onImageUpload: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  size: PropTypes.number,
  disabled: PropTypes.bool
};

export default AvatarDropzone;
