import { lazy, Suspense } from "react";
import { LoadingScreen } from "src/components/loading-screen";
import { AppLayout } from "src/layouts/app";

const ConfigPage = lazy(() => import("src/pages/config/config-page"))

export const configRoute = [
  {
    path: '',
    element: (
      <Suspense fallback={<LoadingScreen />}>
        <AppLayout />
      </Suspense>
    ),
    children: [
      {
        path: 'config',
        element: <ConfigPage />
      }
    ]

  }
]