import { Box } from '@mui/material';
import PropTypes from 'prop-types';
import { Navigate, useLocation } from 'react-router';

import Loader from 'components/Loader/Loader';
import useAuth from 'hooks/useAuth';

// ==============================|| AUTH GUARD ||============================== //

export default function AuthGuard({ children }) {
  const { isAuthenticated, isInitialized, user } = useAuth();
  const location = useLocation();

  // Show loader while authentication is being initialized
  if (!isInitialized) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <Loader />
      </Box>
    );
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated || !user) {
    const currentPath = `${location.pathname}${location.search}`;
    const encodedReturnTo = encodeURIComponent(currentPath);
    return <Navigate to={`/login?returnTo=${encodedReturnTo}`} replace />;
  }

  return children;
}

AuthGuard.propTypes = {
  children: PropTypes.node
};
