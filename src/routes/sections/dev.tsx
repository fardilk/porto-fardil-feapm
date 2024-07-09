import { lazy, Suspense } from "react"

import { AppLayout } from "src/layouts/app"

import { SplashScreen } from "src/components/loading-screen"

const DevPage = lazy(() => import("src/pages/dev"))

const devRoute = [
  {
    path: '/',
    element: (
      <Suspense fallback={<SplashScreen />}>
        <AppLayout />
      </Suspense>
    ),
    children: [
      {
        path: 'dev',
        element: <DevPage />,
        index: true
      },
    ]
  }
]

export default devRoute