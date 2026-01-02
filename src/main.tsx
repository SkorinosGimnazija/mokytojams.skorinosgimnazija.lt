import 'dayjs/locale/lt'
import '@mantine/core/styles.css'
import '@mantine/dates/styles.css'
import '@mantine/notifications/styles.css'
import '@mantine/nprogress/styles.css'
import '@mantine/charts/styles.css'
import '@/theme/global.css'
import { App } from '@/App.tsx'
import { ProtectedRoute } from '@/components/auth/ProtectedRoute'
import { AuthProvider } from '@/context/AuthProvider.tsx'
import { ErrorPage } from '@/ErrorPage.tsx'
import { NotFoundPage } from '@/NotFoundPage.tsx'
import { routes } from '@/routes.ts'
import { store } from '@/store/store.ts'
import { theme } from '@/theme/theme.ts'
import { ColorSchemeScript, MantineProvider } from '@mantine/core'
import { DatesProvider } from '@mantine/dates'
import { ModalsProvider } from '@mantine/modals'
import { Notifications } from '@mantine/notifications'
import dayjs from 'dayjs'
import React, { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { createBrowserRouter, RouterProvider } from 'react-router'

dayjs.locale('lt')

const router = createBrowserRouter([{
  element: <App/>,
  children: [
    {
      path: '/',
      element: <ProtectedRoute/>,
      errorElement: <ErrorPage/>,
      HydrateFallback: () => null,
      children: [
        {
          children: [
            // {
            //   index: true,
            //   element: <>Home page</>
            // },
            ...routes
          ]
        },
        {
          path: '*',
          element: <NotFoundPage/>
        }
      ]
    }
  ]
}])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ColorSchemeScript defaultColorScheme="auto"/>
    <MantineProvider theme={theme} defaultColorScheme="auto">
      <Provider store={store}>
        <DatesProvider settings={{ locale: 'lt' }}>
          <AuthProvider>
            <ModalsProvider labels={{ confirm: 'Taip', cancel: 'Ne' }}>
              <Notifications/>
              <RouterProvider router={router}/>
            </ModalsProvider>
          </AuthProvider>
        </DatesProvider>
      </Provider>
    </MantineProvider>
  </StrictMode>
)