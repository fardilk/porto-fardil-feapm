import { Navigate, useRoutes } from 'react-router-dom';

import appRoute from './app';
import { configRoute } from './config';
import devRoute from './dev';
import { mainRoutes } from './main';

// ----------------------------------------------------------------------

export function Router() {
  return useRoutes([
    ...appRoute,

    // Config
    ...configRoute,

    // Main
    ...mainRoutes,

    // Handsome Dev
    ...devRoute,

    // No match
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}
