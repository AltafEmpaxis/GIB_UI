import { lazy } from 'react';

import { Navigate, Outlet } from 'react-router';

// project import
import Loadable from 'components/Loader/Loadable';

import GuestGuard from './Guard/GuestGuard';

// Lazy load components
const AuthLogin = Loadable(lazy(() => import('pages/authentication/login')));

// ==============================|| AUTH ROUTING ||============================== //

const LoginRoutes = {
  path: '/',
  element: (
    <GuestGuard>
      <Outlet />
    </GuestGuard>
  ),
  children: [
    {
      path: '/',
      element: <Navigate to="login" replace />
    },
    {
      path: 'login',
      element: <AuthLogin />
    }
  ]
};

export default LoginRoutes;
