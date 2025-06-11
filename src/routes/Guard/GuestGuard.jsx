import { Box } from '@mui/material';
import PropTypes from 'prop-types';
import { Navigate, useLocation } from 'react-router';

import Loader from 'components/Loader/Loader';
import useAuth from 'hooks/useAuth';

// ==============================|| GUEST GUARD ||============================== //

export default function GuestGuard({ children }) {
  const { isAuthenticated, isInitialized, user } = useAuth();
  const location = useLocation();

  // Get returnTo from query parameters
  const searchParams = new URLSearchParams(location.search);
  const returnTo = searchParams.get('returnTo');
  const redirectPath = returnTo ? decodeURIComponent(returnTo) : '/dashboard';

  // Show loader while authentication is being initialized
  if (!isInitialized) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <Loader />
      </Box>
    );
  }

  // Redirect to dashboard if authenticated
  if (isAuthenticated && user) {
    return <Navigate to={redirectPath} replace />;
  }

  return children;
}

GuestGuard.propTypes = {
  children: PropTypes.node
};
