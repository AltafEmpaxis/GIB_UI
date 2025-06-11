import { lazy } from 'react';

import { Navigate } from 'react-router';

import Loadable from 'components/Loader/Loadable';
import DashboardLayout from 'layout/Dashboard';

import RoleBasedGuard from './Guard/RoleBasedGuard';

// Lazy load components
const Home = Loadable(lazy(() => import('pages/home/home')));
const UserManagement = Loadable(lazy(() => import('pages/UserManagement/UserManagement')));
const DashboardDefault = Loadable(lazy(() => import('pages/dashboard')));
const Viewdata = Loadable(lazy(() => import('pages/ViewData')));
const GeneratedReports = Loadable(lazy(() => import('pages/GeneratedReports')));
const MappingData = Loadable(lazy(() => import('pages/MappingData/MappingData')));
const UploadFiles = Loadable(lazy(() => import('pages/Upload/UploadFiles')));
const ModernUploadFiles = Loadable(lazy(() => import('pages/Upload/ModernUploadFiles')));
const Changelog = Loadable(lazy(() => import('pages/Changelog/Changelog')));
const Profile = Loadable(lazy(() => import('pages/Profile')));
const AccountSettings = Loadable(lazy(() => import('pages/AccountSettings')));
const UnderConstruction = Loadable(lazy(() => import('pages/UnderConstruction')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: (
    // <AuthGuard>
    <DashboardLayout />
    // </AuthGuard>
  ),
  children: [
    {
      path: '/',
      element: <Navigate to="home" replace />
    },
    {
      path: 'home',
      element: <Home />
    },
    {
      path: 'dashboard',
      element: <DashboardDefault />
    },
    {
      path: 'user-management',
      element: (
        <RoleBasedGuard roles={['admin']}>
          <Navigate to="/under-construction" replace />
        </RoleBasedGuard>
      )
    },
    {
      path: 'upload-file',
      element: <ModernUploadFiles />
    },
    {
      path: 'view-data',
      element: <Navigate to="/under-construction" replace />
    },
    {
      path: 'generated-reports',
      element: <Navigate to="/under-construction" replace />
    },
    {
      path: 'mapping-data',
      element: <Navigate to="/under-construction" replace />
    },
    {
      path: 'changelog',
      element: <Navigate to="/under-construction" replace />
    },
    {
      path: 'profile',
      element: <Navigate to="/under-construction" replace />
    },
    {
      path: 'account-settings',
      element: <Navigate to="/under-construction" replace />
    },
    {
      path: 'under-construction',
      element: <UnderConstruction />
    }
  ]
};

export default MainRoutes;
