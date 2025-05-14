import { lazy } from 'react';

import { Navigate } from 'react-router';

import Loadable from 'components/Loader/Loadable';
import DashboardLayout from 'layout/Dashboard';

import AuthGuard from './Guard/AuthGuard';
import RoleBasedGuard from './Guard/RoleBasedGuard';

// Lazy load components
const UserManagement = Loadable(lazy(() => import('pages/UserManagement/UserManagement')));
const DashboardDefault = Loadable(lazy(() => import('pages/dashboard')));
const Viewdata = Loadable(lazy(() => import('pages/ViewData')));
const GeneratedReports = Loadable(lazy(() => import('pages/GeneratedReports')));
const MappingData = Loadable(lazy(() => import('pages/MappingData/MappingData')));
const UploadFiles = Loadable(lazy(() => import('pages/Upload/UploadFiles')));
const Changelog = Loadable(lazy(() => import('pages/Changelog/Changelog')));
const Profile = Loadable(lazy(() => import('pages/Profile')));
const AccountSettings = Loadable(lazy(() => import('pages/AccountSettings')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: (
    <AuthGuard>
      <DashboardLayout />
    </AuthGuard>
  ),
  children: [
    {
      path: '/',
      element: <Navigate to="dashboard" replace />
    },
    {
      path: 'dashboard',
      element: <DashboardDefault />
    },
    {
      path: 'user-management',
      element: (
        <RoleBasedGuard roles={['admin']}>
          <UserManagement />
        </RoleBasedGuard>
      )
    },
    {
      path: 'upload-file',
      element: <UploadFiles />
    },
    {
      path: 'view-data',
      element: <Viewdata />
    },
    {
      path: 'generated-reports',
      element: <GeneratedReports />
    },
    {
      path: 'mapping-data',
      element: <MappingData />
    },
    {
      path: 'changelog',
      element: <Changelog />
    },
    {
      path: 'profile',
      element: <Profile />
    },
    {
      path: 'account-settings',
      element: <AccountSettings />
    }
  ]
};

export default MainRoutes;
