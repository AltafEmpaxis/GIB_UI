import { Box, Button, LinearProgress, Snackbar, Typography, Alert } from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';
import PropTypes from 'prop-types';

// Import custom icons from Alert.jsx
import CheckCircleOutlineRounded from '@mui/icons-material/CheckCircleOutlineRounded';
import ErrorOutlineRounded from '@mui/icons-material/ErrorOutlineRounded';
import InfoOutlined from '@mui/icons-material/InfoOutlined';
import WarningAmberRounded from '@mui/icons-material/WarningAmberRounded';

const NotificationBar = ({ notification, onClose }) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  if (!notification.show) return null;

  const getIcon = () => {
    switch (notification.type) {
      case 'success':
        return <CheckCircleOutlineRounded />;
      case 'error':
        return <ErrorOutlineRounded />;
      case 'warning':
        return <WarningAmberRounded />;
      default:
        return <InfoOutlined />;
    }
  };

  // Determine background color based on notification type and theme
  const getBackgroundColor = () => {
    switch (notification.type) {
      case 'success':
        return alpha(theme.palette.success.main, isDark ? 0.12 : 0.08);
      case 'error':
        return alpha(theme.palette.error.main, isDark ? 0.12 : 0.08);
      case 'warning':
        return alpha(theme.palette.secondary.main, 0.1); // Yellow for warning per Alert.jsx
      default: // info
        return alpha(theme.palette.info.main, 0.1);
    }
  };

  // Determine icon color based on notification type and theme
  const getIconColor = () => {
    switch (notification.type) {
      case 'success':
        return theme.palette.success[isDark ? 200 : 'main'];
      case 'error':
        return theme.palette.error[isDark ? 200 : 'main'];
      case 'warning':
        return theme.palette.secondary.main; // Yellow for warning per Alert.jsx
      default: // info
        return theme.palette.info[isDark ? 200 : 'main'];
    }
  };

  return (
    <Snackbar open={notification.show} anchorOrigin={{ vertical: 'top', horizontal: 'center' }} sx={{ top: 20 }}>
      <Alert
        severity={notification.type}
        variant="standard"
        icon={false}
        onClose={onClose}
        sx={{
          width: '100%',
          maxWidth: 700,
          boxShadow: theme.shadows[1],
          display: 'flex',
          alignItems: 'center',
          borderRadius: theme.shape.borderRadius,
          backgroundColor: getBackgroundColor(),
          padding: theme.spacing(1.5, 2),
          '& .MuiAlert-message': {
            width: '100%',
            padding: theme.spacing(1, 0),
            color: theme.palette.primary.main
          }
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
          <Box
            sx={{
              mr: 1.5,
              fontSize: 20,
              opacity: 0.9,
              display: 'flex',
              alignItems: 'center',
              color: getIconColor()
            }}
          >
            {getIcon()}
          </Box>
          <Box sx={{ flexGrow: 1 }}>
            <Typography
              variant="subtitle2"
              sx={{
                fontWeight: 500,
                mb: notification.progress ? 1 : 0,
                color: theme.palette.primary.main
              }}
            >
              {notification.message}
            </Typography>

            {notification.progress !== undefined && (
              <LinearProgress
                variant={notification.progress === 0 ? 'indeterminate' : 'determinate'}
                value={notification.progress}
                color={notification.type === 'success' ? 'success' : 'primary'}
                sx={{
                  mt: 1,
                  height: 6,
                  borderRadius: 1,
                  backgroundColor: alpha(theme.palette.common.white, 0.2)
                }}
              />
            )}
          </Box>

          {notification.action && notification.progress === 100 && (
            <Button
              size="small"
              variant="contained"
              color="inherit"
              onClick={notification.action}
              sx={{
                ml: 2,
                minWidth: '100%',
                color: 'primary.main',
                bgcolor: 'common.white',
                '&:hover': {
                  backgroundColor: alpha(theme.palette.common.white, 0.9)
                }
              }}
            >
              View
            </Button>
          )}
        </Box>
      </Alert>
    </Snackbar>
  );
};

NotificationBar.propTypes = {
  notification: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired
};

export default NotificationBar;
