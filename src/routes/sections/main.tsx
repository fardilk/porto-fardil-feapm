import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { SplashScreen } from 'src/components/loading-screen';
import { SimpleLayout } from 'src/layouts/simple';

// ----------------------------------------------------------------------

const ComingSoonPage = lazy(() => import('src/pages/coming-soon'));

const Page500 = lazy(() => import('src/pages/error/500'));
const Page403 = lazy(() => import('src/pages/error/403'));
const Page404 = lazy(() => import('src/pages/error/404'));

// ----------------------------------------------------------------------

export const mainRoutes = [
  {
    element: (
      <Suspense fallback={<SplashScreen />}>
        <Outlet />
      </Suspense>
    ),
    children: [
      {
        path: 'coming-soon',
        element: (
          <SimpleLayout content={{ compact: true }}>
            <ComingSoonPage />
          </SimpleLayout>
        ),
      },
      { path: '500', element: <Page500 /> },
      { path: '404', element: <Page404 /> },
      { path: '403', element: <Page403 /> },
    ],
  },
];
