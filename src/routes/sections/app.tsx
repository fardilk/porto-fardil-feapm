import { lazy, Suspense } from "react"

import { AppLayout } from "src/layouts/app"

import { SplashScreen } from "src/components/loading-screen"

const DevPage = lazy(() => import("src/pages/dev"))

/** === HomePage */
const HomePage = lazy(() => import("src/pages/home/home-page"))

/** === Registration */
const RegistrationPage = lazy(() => import("src/pages/registration/registration-page"))

/** === CheckinPage */
const CheckinPage = lazy(() => import("src/pages/checkin/checkin-page"))

/** === EncounterPage */
const EncounterPage = lazy(() => import("src/pages/encounter/encounter-page"))

/** === ReservationPage */
const ReservationPage = lazy(() => import("src/pages/reservation/reservation-page"))

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
        path: 'registration/:encryptedNIK',
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
      {
        path: 'reservation',
        element: <ReservationPage />
      },
    ]
  }
]

export default appRoute
