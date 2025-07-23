import { lazy } from 'react';

import { Navigate } from 'react-router';
// Components
import Loadable from 'components/Loader/Loadable';
import DashboardLayout from 'layout/Dashboard';
import AuthGuard from 'routes/Guard/AuthGuard';

// Lazy load components
const Home = Loadable(lazy(() => import('pages/home')));
const DashboardDefault = Loadable(lazy(() => import('pages/dashboard')));
const ReconTool = Loadable(lazy(() => import('pages/ReconTool')));
const DetailReconTool = Loadable(lazy(() => import('pages/ReconTool/DetailReconTool')));
const InvestmentPerformance = Loadable(lazy(() => import('pages/Report/InvestmentPerformance')));
const QualityControl = Loadable(lazy(() => import('pages/Report/QualityControl')));

const UserManagement = Loadable(lazy(() => import('pages/UserManagement/UserManagement')));
// ==============================|| ROUTING RENDER ||============================== //

const UnderConstruction = Loadable(lazy(() => import('pages/UnderConstruction')));

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
      path: 'recon-tool',
      element: <ReconTool />
    },
    {
      path: 'detail-recon-tool',
      element: <DetailReconTool />
    },
    {
      path: 'user-management',
      element: <UserManagement />
    },
    {
      path: 'investment-performance',
      element: <InvestmentPerformance />
    },
    {
      path: 'quality-control',
      element: <QualityControl />
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
