import { lazy, Suspense } from "react"

import { AppLayout } from "src/layouts/app"

import { SplashScreen } from "src/components/loading-screen"

/** === HomePage */
const HomePage = lazy(() => import("src/pages/home/home-page"))

/** === Registration */
const RegistrationPage = lazy(() => import("src/pages/registration/registration-page"))

const appRoute = [
  {
    path: '/',
    element: (
      <Suspense fallback={<SplashScreen />}>
        <AppLayout />
      </Suspense>
    ),
    children: [
      {
        path: '',
        element: <HomePage />,
        index: true
      },
      {
        path: 'registration',
        element: <RegistrationPage />
      }
    ]
  }
]

export default appRoute