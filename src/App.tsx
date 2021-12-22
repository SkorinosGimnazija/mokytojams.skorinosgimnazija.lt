import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { NavDrawer } from './components/drawer/NavDrawer';
import { Header } from './components/header/Header';
import { Home } from './pages/Home';
import { NotFound } from './pages/NotFound';
import { routes } from './routes/routes';

export const App = () => {
  return (
    <Box sx={{ display: 'flex', backgroundColor: 'primary.light', minHeight: '100vh' }}>
      <Header />
      <NavDrawer />

      <Container component="main" sx={{ p: 3 }} maxWidth="xl">
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
                        <React.Suspense fallback={null}>
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
      </Container>
    </Box>
  );
};
