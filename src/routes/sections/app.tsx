import { lazy, Suspense } from "react"

import { AppLayout } from "src/layouts/app"

import { SplashScreen } from "src/components/loading-screen"

/** === HomePage */
const HomePage = lazy(() => import("src/pages/home/home-page"))

/** === Registration */
const RegistrationPage = lazy(() => import("src/pages/registration/registration-page"))

/** === CheckinPage */
const CheckinPage = lazy(() => import("src/pages/checkin/checkin-page"))

/** === EncounterPage */
const EncounterPage = lazy(() => import("src/pages/encounter/encounter-page"))

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
      },
      {
        path: 'checkin',
        element: <CheckinPage />
      },
      {
        path: 'encounter',
        element: <EncounterPage />
      },
    ]
  }
]

export default appRoute