import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import React from 'react';
import { Route, Routes } from 'react-router';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { NavDrawer } from './components/drawer/NavDrawer';
import { Header } from './components/header/Header';
import { SquareLoader } from './components/loadingSpinners/SquareLoader';
import { Home } from './pages/Home';
import { NotFound } from './pages/NotFound';
import { routes } from './routes/routes';

export const App = () => {
  const theme = useTheme();

  return (
    <Box sx={{ display: 'flex', backgroundColor: theme.palette.primary.light, minHeight: '100vh' }}>
      <Header />
      <NavDrawer />

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Routes>
          <Route path="/" element={<Home />} />

          {routes.map((group) => {
            return group.routes.map((route) => {
              return route.innerRoutes.map((innerRoute) => {
                const slug = `${route.slug}${innerRoute.slug}`;
                return (
                  <Route
                    key={slug}
                    path={slug}
                    element={
                      <ProtectedRoute authRole={group.accessRole}>
                        <React.Suspense fallback={<SquareLoader />}>
                          <innerRoute.lazyElement />
                        </React.Suspense>
                      </ProtectedRoute>
                    }
                  />
                );
              });
            });
          })}

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Box>
    </Box>
  );
};
