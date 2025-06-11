import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { useIdleTimer } from 'react-idle-timer';
import useAuth from 'hooks/useAuth';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import { Typography, Box, CircularProgress, Alert, Fade, Stack, IconButton } from '@mui/material';
import { useTheme, alpha } from '@mui/material/styles';
import { Icon } from '@iconify/react';
import { formatTime, timeToMilliseconds, millisecondsToTime, secondsToTime } from 'utils/formatNumber';

// ==============================|| TIMEOUT CONFIGURATION ||============================== //

/**
 * Dynamic timeout configuration with support for hours, minutes, and seconds
 * @type {Object}
 */
const TIMEOUT_CONFIG = {
  production: {
    timeout: {
      hours: 0,
      minutes: 30,
      seconds: 0
    },
    warning: {
      hours: 0,
      minutes: 2,
      seconds: 0
    }
  },
  development: {
    timeout: {
      hours: 0,
      minutes: 5,
      seconds: 0
    },
    warning: {
      hours: 0,
      minutes: 0,
      seconds: 30
    }
  }
};

const currentConfig = import.meta.env.PROD ? TIMEOUT_CONFIG.production : TIMEOUT_CONFIG.development;

const TIMEOUT_SETTINGS = {
  timeout: timeToMilliseconds(currentConfig.timeout),
  promptBeforeIdle: timeToMilliseconds(currentConfig.warning)
};

// Pre-calculate seconds for optimization
const PROMPT_SECONDS = Math.floor(TIMEOUT_SETTINGS.promptBeforeIdle / 1000);
const AUTH_ERROR_COUNTDOWN = 10; // seconds

// ==============================|| DIALOG CONFIGURATION ||============================== //

const DIALOG_ICONS = {
  default: <Icon icon="mdi:alert-circle" width={24} height={24} />,
  warning: <Icon icon="mdi:clock-alert" width={24} height={24} />,
  connection: <Icon icon="mdi:wifi-off" width={24} height={24} />,
  auth: <Icon icon="mdi:account-lock" width={24} height={24} />,
  server: <Icon icon="mdi:server-off" width={24} height={24} />
};

const DIALOG_UTILS = {
  /**
   * Determines appropriate icon based on HTTP status code
   * @param {number} status - HTTP status code
   * @returns {JSX.Element} Icon component for the status
   */
  getIconByStatus: (status) => {
    if (status === 0) return DIALOG_ICONS.connection;
    if (status === 401 || status === 403) return DIALOG_ICONS.auth;
    if (status >= 500) return DIALOG_ICONS.server;
    return DIALOG_ICONS.default;
  }
};

// ==============================|| EVENT CONFIGURATION ||============================== //

const IDLE_EVENTS = [
  'mousemove',
  'keydown',
  'wheel',
  'DOMMouseScroll',
  'mousewheel',
  'mousedown',
  'touchstart',
  'touchmove',
  'MSPointerDown',
  'MSPointerMove',
  'visibilitychange',
  'focus'
];

// ==============================|| SESSION TIMEOUT ||============================== //

/**
 * SessionTimeout Component
 * Manages user session with timeout warnings and automatic logout functionality.
 *
 * Features:
 * - Configurable timeout durations for different environments
 * - Warning dialog before session expiration
 * - Visual countdown timer
 * - Cross-tab synchronization
 * - Error handling for API/Auth errors
 * - Automatic logout on session expiration
 *
 * Component Architecture:
 * 1. Configuration Management - Timeout settings and dialog configuration
 * 2. State Management - Dialog state and timer state
 * 3. Timer Logic - Idle detection and countdown management
 * 4. UI Rendering - Dialog display and visual feedback
 * 5. Event Handling - User actions and error handling
 *
 */
function SessionTimeout() {
  const theme = useTheme();
  const { logout, isAuthenticated, isInitialized } = useAuth();
  const logoutTimeoutRef = useRef(null);
  const warningTimeoutRef = useRef(null);

  const [dialogState, setDialogState] = useState({
    open: false,
    type: 'warning',
    message: '',
    status: null,
    statusText: '',
    icon: DIALOG_ICONS.default,
    showCountdown: false,
    forceLogout: false // New flag for forced logout scenarios
  });

  const [remaining, setRemaining] = useState(PROMPT_SECONDS);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const progressValue = useMemo(() => {
    if (dialogState.type === 'warning') {
      return Math.min(100, Math.max(0, (remaining / PROMPT_SECONDS) * 100));
    }
    // For auth errors, count down from 10 seconds
    if (dialogState.showCountdown) {
      return Math.min(100, Math.max(0, (remaining / AUTH_ERROR_COUNTDOWN) * 100));
    }
    return 100;
  }, [remaining, dialogState.type, dialogState.showCountdown]);

  const progressColor = useMemo(() => {
    if (progressValue > 50) return 'success';
    if (progressValue > 25) return 'warning';
    return 'error';
  }, [progressValue]);

  // Format current countdown time and memoize it
  const formattedTime = useMemo(() => formatTime(secondsToTime(remaining)), [remaining]);

  // Memoize timeout messages for better performance
  const timeoutMessages = useMemo(
    () => ({
      timeoutText: formatTime(millisecondsToTime(TIMEOUT_SETTINGS.timeout), { conjunction: 'and' }).verbose,
      warningText: formatTime(millisecondsToTime(TIMEOUT_SETTINGS.promptBeforeIdle), { conjunction: 'and' }).verbose
    }),
    []
  );

  const { timeoutText, warningText } = timeoutMessages;

  /**
   * Reusable countdown progress component
   */
  const CountdownProgress = useCallback(
    ({ value, color, time }) => (
      <Box sx={{ position: 'relative', display: 'inline-flex' }}>
        <CircularProgress variant="determinate" value={value} color={color} size={56} />
        <Box
          sx={{
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            position: 'absolute',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Typography variant="caption" component="div" color="text.secondary">
            {time}
          </Typography>
        </Box>
      </Box>
    ),
    []
  );

  /**
   * Close the dialog
   * @function
   */
  const handleClose = useCallback(() => {
    setDialogState((prev) => ({ ...prev, open: false }));
  }, []);

  /**
   * Handle user logout process
   * @function
   * @async
   * @private
   */
  const handleLogout = useCallback(async () => {
    if (isLoggingOut) return;

    setIsLoggingOut(true);
    try {
      await logout();
      handleClose();
    } catch (error) {
      console.error('Logout failed:', error);
      // Display error to user
      setDialogState((prev) => ({
        ...prev,
        type: 'error',
        message: 'Failed to logout. Please try again.',
        icon: DIALOG_ICONS.default
      }));
    } finally {
      setIsLoggingOut(false);
    }
  }, [isLoggingOut, logout, handleClose]);

  /**
   * Handle idle timeout
   * @function
   * @private
   */
  const onIdle = useCallback(() => {
    if (dialogState.type === 'warning') {
      handleLogout();
    }
  }, [dialogState.type, handleLogout]);

  /**
   * Handle prompt before idle
   * @function
   * @private
   */
  const onPrompt = useCallback(() => {
    if (!dialogState.open || dialogState.type !== 'error') {
      setDialogState({
        open: true,
        type: 'warning',
        message: 'Your session is about to expire',
        icon: DIALOG_ICONS.warning,
        status: null,
        statusText: '',
        showCountdown: false
      });
    }
  }, [dialogState.open, dialogState.type]);

  /**
   * Initialize idle timer with configuration
   * @type {Object}
   */
  const { getRemainingTime, activate, reset } = useIdleTimer({
    onIdle,
    onPrompt,
    onAction: () => {
      if (!isAuthenticated || !isInitialized) return;
      reset();
    },
    onActive: () => {
      if (!isAuthenticated || !isInitialized) return;
      reset();
    },
    timeout: TIMEOUT_SETTINGS.timeout,
    promptBeforeIdle: TIMEOUT_SETTINGS.promptBeforeIdle,
    throttle: 250,
    events: IDLE_EVENTS,
    crossTab: {
      emitOnAllTabs: true,
      syncTimers: 100
    },
    leaderElection: true,
    stopOnIdle: false,
    startManually: true
  });

  /**
   * Handle API and authentication errors
   * @function
   * @param {CustomEvent} event - Error event with status and message details
   * @private
   */
  const handleError = useCallback(
    (event) => {
      const { status, statusText, message: errorMessage } = event.detail;

      // Don't show new error dialog if already showing a warning
      if (dialogState.open && dialogState.type === 'warning') return;

      // For auth errors, always show even if another error is displayed
      const isAuthError = status === 401 || status === 403;
      if (!isAuthError && dialogState.open && dialogState.type === 'error') return;

      const config = {
        open: true,
        type: status === 0 ? 'warning' : 'error',
        status,
        statusText,
        message: errorMessage || 'An error occurred',
        icon: DIALOG_UTILS.getIconByStatus(status),
        showCountdown: isAuthError,
        forceLogout: isAuthError
      };

      setDialogState(config);

      if (isAuthError) {
        setRemaining(AUTH_ERROR_COUNTDOWN);
        // Clear any existing timeouts
        clearTimeout(logoutTimeoutRef.current);
        clearTimeout(warningTimeoutRef.current);
        // Set new timeout for auth error
        logoutTimeoutRef.current = setTimeout(handleLogout, AUTH_ERROR_COUNTDOWN * 1000);
      }
    },
    [dialogState.open, dialogState.type, handleLogout]
  );

  /**
   * Handle user staying active
   * @function
   * @private
   */
  const handleStayActive = useCallback(() => {
    if (!isAuthenticated || !isInitialized || dialogState.forceLogout) {
      handleLogout();
      return;
    }

    try {
      // Clear any existing timeouts
      clearTimeout(logoutTimeoutRef.current);
      clearTimeout(warningTimeoutRef.current);

      reset();
      activate();
      handleClose();
    } catch (error) {
      console.error('Error resetting session:', error);
      handleLogout();
    }
  }, [reset, activate, isAuthenticated, isInitialized, handleLogout, handleClose, dialogState.forceLogout]);

  /**
   * Initialize timer when authenticated
   * @effect
   */
  useEffect(() => {
    if (isAuthenticated && isInitialized) {
      reset();
      activate();
    }
  }, [isAuthenticated, isInitialized, reset, activate]);

  /**
   * Timer effect with cleanup
   * Manages countdown timer and automatic logout
   * @effect
   */
  useEffect(() => {
    if (!dialogState.open || !isAuthenticated || !isInitialized) return;

    // Only start countdown for warning type or auth errors
    if (dialogState.type !== 'warning' && !dialogState.showCountdown) return;

    let isMounted = true;
    let timerId = null;

    const updateRemaining = () => {
      if (!isMounted || !isAuthenticated) return;

      try {
        if (dialogState.type === 'warning') {
          const timeLeft = Math.max(0, Math.ceil(getRemainingTime() / 1000));

          if (timeLeft >= 0) {
            setRemaining(timeLeft);
            if (timeLeft === 0) {
              clearInterval(timerId);
              handleLogout();
            }
          }
        } else if (dialogState.showCountdown) {
          setRemaining((prev) => {
            const newValue = Math.max(0, prev - 1);
            if (newValue === 0) {
              clearInterval(timerId);
              handleLogout();
            }
            return newValue;
          });
        }
      } catch (error) {
        console.error('Error updating remaining time:', error);
        clearInterval(timerId);
        handleLogout();
      }
    };

    updateRemaining();
    timerId = setInterval(updateRemaining, 1000);

    return () => {
      isMounted = false;
      if (timerId) {
        clearInterval(timerId);
      }
    };
  }, [
    dialogState.open,
    dialogState.type,
    dialogState.showCountdown,
    getRemainingTime,
    handleLogout,
    isAuthenticated,
    isInitialized
  ]);

  /**
   * Error event listener setup
   * @effect
   */
  useEffect(() => {
    const handleErrorWithTimeout = (event) => {
      clearTimeout(logoutTimeoutRef.current);
      clearTimeout(warningTimeoutRef.current);
      handleError(event);
    };

    window.addEventListener('auth:error', handleErrorWithTimeout);
    window.addEventListener('api:error', handleErrorWithTimeout);

    return () => {
      clearTimeout(logoutTimeoutRef.current);
      clearTimeout(warningTimeoutRef.current);
      window.removeEventListener('auth:error', handleErrorWithTimeout);
      window.removeEventListener('api:error', handleErrorWithTimeout);
    };
  }, [handleError]);

  // Don't render if not initialized or not authenticated
  if (!isInitialized || !isAuthenticated) return null;

  return (
    <Dialog
      open={dialogState.open}
      onClose={(event, reason) => {
        // Prevent closing for warning dialogs, forced logouts, or during logout
        if (dialogState.type === 'warning' || dialogState.forceLogout || isLoggingOut || reason === 'backdropClick') {
          return;
        }
        handleClose();
      }}
      maxWidth="xs"
      fullWidth
      disableEscapeKeyDown={dialogState.type === 'warning' || dialogState.forceLogout}
    >
      <Fade in={dialogState.open}>
        <Box>
          <DialogTitle
            sx={{
              background:
                theme.palette.mode === 'dark'
                  ? alpha(theme.palette[dialogState.type].dark, 0.12)
                  : alpha(theme.palette[dialogState.type].main, 0.08),
              color: theme.palette[dialogState.type].main,
              display: 'flex',
              alignItems: 'center',
              gap: 1.5,
              p: 1.5,
              position: 'relative'
            }}
          >
            <IconButton
              sx={{
                bgcolor:
                  theme.palette.mode === 'dark'
                    ? alpha(theme.palette[dialogState.type].main, 0.2)
                    : alpha(theme.palette[dialogState.type].main, 0.1)
              }}
            >
              {dialogState.icon}
            </IconButton>
            <Box sx={{ flex: 1 }}>
              <Typography component="div" variant="h6" fontWeight="600" color="inherit">
                {dialogState.type === 'warning' ? 'Session Timeout' : dialogState.statusText}
              </Typography>
              <Typography variant="caption">
                {dialogState.type === 'warning' ? `Auto-logout in ${formattedTime.compact}` : 'Action Required'}
              </Typography>
            </Box>
            {dialogState.type !== 'warning' && (
              <IconButton size="small" onClick={handleClose}>
                <Icon icon="mdi:close" width={20} height={20} />
              </IconButton>
            )}
          </DialogTitle>

          <DialogContent sx={{ my: 1 }}>
            <Stack spacing={2}>
              {dialogState.type === 'warning' || dialogState.showCountdown ? (
                <>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Box sx={{ pt: 0.5 }}>
                      <CountdownProgress value={progressValue} color={progressColor} time={formattedTime.compact} />
                    </Box>
                    <Box>
                      <Typography variant="subtitle2" color="text.primary">
                        {dialogState.message}
                      </Typography>
                      {!dialogState.status && (
                        <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
                          Session expires after {timeoutText} of inactivity
                        </Typography>
                      )}
                    </Box>
                  </Box>
                  {!dialogState.status && (
                    <Alert
                      severity="info"
                      variant="outlined"
                      icon={<Icon icon="mdi:shield-lock-outline" width={20} height={20} />}
                    >
                      <Typography variant="caption">
                        For your security, the session will timeout after {timeoutText} of inactivity. You will be
                        notified {warningText} before timeout.
                      </Typography>
                    </Alert>
                  )}
                </>
              ) : (
                <Alert
                  severity={dialogState.type}
                  variant="outlined"
                  icon={
                    <IconButton size="small" disableRipple>
                      {dialogState.icon}
                    </IconButton>
                  }
                >
                  <Typography variant="subtitle2">{dialogState.message}</Typography>
                  <Typography variant="caption">
                    {`Error ${dialogState.status || ''}: ${dialogState.statusText || 'Unknown Error'}`}
                  </Typography>
                </Alert>
              )}
            </Stack>
          </DialogContent>

          <DialogActions>
            {dialogState.type === 'warning' ? (
              <>
                <Button
                  onClick={handleLogout}
                  color="error"
                  variant="soft"
                  size="large"
                  startIcon={<Icon icon="mdi:logout" width={20} height={20} />}
                  disabled={isLoggingOut}
                  sx={{ flex: 1 }}
                >
                  {isLoggingOut ? 'Logging out...' : 'Logout'}
                </Button>
                <Button
                  onClick={handleStayActive}
                  color="primary"
                  variant="contained"
                  size="large"
                  startIcon={<Icon icon="mdi:refresh" width={20} height={20} />}
                  disabled={isLoggingOut}
                  sx={{ flex: 1 }}
                >
                  Stay Active
                </Button>
              </>
            ) : (
              <>
                <Button variant="soft" onClick={handleClose} size="large">
                  Cancel
                </Button>
                <Button
                  disabled={isLoggingOut || dialogState.showCountdown}
                  variant="soft"
                  color="info"
                  onClick={() => window.location.reload()}
                  startIcon={<Icon icon="mdi:refresh" width={20} height={20} />}
                  size="large"
                >
                  Refresh
                </Button>
                <Button
                  onClick={handleLogout}
                  color="primary"
                  variant="contained"
                  startIcon={<Icon icon="mdi:logout" width={20} height={20} />}
                  size="large"
                  fullWidth
                >
                  {isLoggingOut ? 'Logging out...' : 'Logout'}
                </Button>
              </>
            )}
          </DialogActions>
        </Box>
      </Fade>
    </Dialog>
  );
}

export default SessionTimeout;
