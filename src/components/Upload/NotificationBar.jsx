import { Icon } from '@iconify/react';
import { Alert, Box, Button, LinearProgress, Snackbar, Typography } from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';
import PropTypes from 'prop-types';

const NotificationBar = ({ notification, onClose }) => {
  const theme = useTheme();

  if (!notification.show) return null;

  const getIcon = () => {
    switch (notification.type) {
      case 'success':
        return <Icon icon="mdi:check-circle" width={24} style={{ color: theme.palette.success.main }} />;
      case 'error':
        return <Icon icon="mdi:alert-circle" width={24} style={{ color: theme.palette.error.main }} />;
      case 'warning':
        return <Icon icon="mdi:alert" width={24} style={{ color: theme.palette.warning.main }} />;
      default:
        return <Icon icon="mdi:information" width={24} style={{ color: theme.palette.info.main }} />;
    }
  };

  return (
    <Snackbar open={notification.show} anchorOrigin={{ vertical: 'top', horizontal: 'center' }} sx={{ top: 20 }}>
      <Alert
        severity={notification.type}
        variant="filled"
        icon={false}
        onClose={onClose}
        sx={{
          width: '100%',
          maxWidth: 500,
          boxShadow: theme.shadows[3],
          display: 'flex',
          alignItems: 'center',
          borderRadius: 2,
          '& .MuiAlert-message': { width: '100%' }
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
          <Box sx={{ mr: 1.5 }}>{getIcon()}</Box>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 500, mb: notification.progress ? 1 : 0 }}>
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
                  borderRadius: 3,
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
              sx={{ ml: 2, minWidth: 'auto', color: 'primary.main', bgcolor: 'white' }}
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
