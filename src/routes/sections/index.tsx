import { Navigate, useRoutes } from 'react-router-dom';

import appRoute from './app';
import { authRoutes } from './auth';
import { authDemoRoutes } from './auth-demo';
import { componentsRoutes } from './components';
import { configRoute } from './config';
import { dashboardRoutes } from './dashboard';
import devRoute from './dev';
import { mainRoutes } from './main';

// ----------------------------------------------------------------------

export function Router() {
  return useRoutes([
    // {
    //   path: '/',
    //   /**
    //    * Skip home page
    //    * element: <Navigate to={CONFIG.auth.redirectPath} replace />,
    //    */
    //   element: (
    //     <Suspense fallback={<SplashScreen />}>
    //       <MainLayout>
    //         <HomePage />
    //       </MainLayout>
    //     </Suspense>
    //   ),
    // },

    ...appRoute,

    // Config
    ...configRoute,

    // Auth
    ...authRoutes,
    ...authDemoRoutes,

    // Dashboard
    ...dashboardRoutes,

    // Main
    ...mainRoutes,

    // Components
    ...componentsRoutes,

    // Handsome Dev
    ...devRoute,

    // No match
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}
