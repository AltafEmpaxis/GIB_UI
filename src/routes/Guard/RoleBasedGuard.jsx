import PropTypes from 'prop-types';
import { Navigate } from 'react-router';

import useAuth from 'hooks/useAuth';

// ==============================|| ROLE BASED GUARD ||============================== //

export default function RoleBasedGuard({ children, roles }) {
  const { user } = useAuth();

  // If no user data, redirect to login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // For User Management, always require admin regardless of roles prop
  if (window.location.pathname === '/user-management' && user.isAdmin !== 1) {
    return <Navigate to="/404" replace />;
  }

  const userRole = user?.isAdmin === 1 ? 'admin' : 'user';

  // If no roles are required, allow access
  if (!roles?.length) {
    return <>{children}</>;
  }

  // Check if user has required role
  if (!roles.includes(userRole)) {
    return <Navigate to="/404" replace />;
  }

  // Render children if user has required role
  return <>{children}</>;
}

RoleBasedGuard.propTypes = {
  children: PropTypes.node,
  roles: PropTypes.arrayOf(PropTypes.string)
};
