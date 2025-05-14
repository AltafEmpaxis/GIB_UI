import { Navigate, useLocation, useRoutes } from 'react-router';

import LoginRoutes from './LoginRoutes';
import MainRoutes from './MainRoutes';
import NotFound from './NotFound';

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
      element: <NotFound />
    },
    {
      path: '*',
      element: <Navigate to={`/not-found`} replace state={{ from: location }} />
    }
  ];

  return useRoutes(routes);
};

export default IndexRoutes;
