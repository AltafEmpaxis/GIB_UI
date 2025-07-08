import { Navigate, useLocation, useRoutes } from 'react-router';

import UnderConstruction from 'pages/UnderConstruction';
import LoginRoutes from './LoginRoutes';
import MainRoutes from './MainRoutes';

// ==============================|| ROUTING RENDER ||============================== //

const IndexRoutes = () => {
  const location = useLocation();

  const routes = [
    MainRoutes,
    LoginRoutes,
    {
      path: '/',
      element: <Navigate to="/login" replace />
    },
    {
      path: '/not-found',
      element: <UnderConstruction />
    },
    {
      path: '*',
      element: <Navigate to={`/not-found`} replace state={{ from: location }} />
    }
  ];

  return useRoutes(routes);
};

export default IndexRoutes;
