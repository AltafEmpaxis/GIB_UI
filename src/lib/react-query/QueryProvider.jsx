import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useEffect, useState, memo } from 'react';
import PropTypes from 'prop-types';
import { queryClient, verifyQueryClientHealth } from './queryClient';
import { Alert, AlertTitle, Button, Fade, Snackbar } from '@mui/material';
import WifiOffIcon from '@mui/icons-material/WifiOff';
import WifiIcon from '@mui/icons-material/Wifi';

// Development-only logger
const devLog = (...args) => {
  if (import.meta.env.MODE === 'development') {
    console.log('QueryProvider:', ...args);
  }
};

// Network status alert component
const NetworkStatusAlert = memo(({ isOnline, showReconnected }) => {
  if (!isOnline) {
    return (
      <Alert
        severity="error"
        variant="filled"
        icon={<WifiOffIcon />}
        sx={{ position: 'fixed', bottom: 20, right: 20, zIndex: 9999, maxWidth: 350 }}
        action={
          <Button size="small" color="inherit" onClick={() => window.location.reload()}>
            Retry
          </Button>
        }
      >
        <AlertTitle>You're offline</AlertTitle>
        Some features may be unavailable until connection is restored.
      </Alert>
    );
  }

  if (showReconnected) {
    return (
      <Snackbar
        open={true}
        autoHideDuration={4000}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        TransitionComponent={Fade}
      >
        <Alert severity="success" variant="filled" icon={<WifiIcon />}>
          <AlertTitle>Connected</AlertTitle>
          Your data is now syncing.
        </Alert>
      </Snackbar>
    );
  }

  return null;
});

NetworkStatusAlert.propTypes = {
  isOnline: PropTypes.bool.isRequired,
  showReconnected: PropTypes.bool.isRequired
};

// React Query Provider Component
export function QueryProvider({ children }) {
  const [isOnline, setIsOnline] = useState(navigator?.onLine ?? true);
  const [showReconnected, setShowReconnected] = useState(false);
  const isDev = import.meta.env.MODE === 'development';

  useEffect(() => {
    // Network status handlers
    const handleOnline = () => {
      setIsOnline(true);
      setShowReconnected(true);
      setTimeout(() => setShowReconnected(false), 4000);
      queryClient.resumePausedMutations().then(() => queryClient.invalidateQueries());
    };

    const handleOffline = () => {
      setIsOnline(false);
      setShowReconnected(false);
    };

    // Add event listeners
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Development monitoring
    let healthCheckInterval;
    if (isDev) {
      devLog('React Query Provider Mounted');
      healthCheckInterval = setInterval(() => verifyQueryClientHealth(), 30000);
    }

    // Cleanup
    return () => {
      if (healthCheckInterval) clearInterval(healthCheckInterval);
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {isDev && <ReactQueryDevtools initialIsOpen={false} position="right" />}
      <NetworkStatusAlert isOnline={isOnline} showReconnected={showReconnected} />
    </QueryClientProvider>
  );
}

QueryProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export default QueryProvider;
