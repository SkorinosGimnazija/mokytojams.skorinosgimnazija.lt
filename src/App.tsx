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

      <Container component="main" sx={{ p: 2 }} maxWidth="xl">
        <Toolbar />
        <Routes>
          <Route path="/" element={<Home />} />

          {routes.map((group) => {
            return group.routes.map((route) => {
              return (
                <Route key={route.path} path={route.path}>
                  {route.innerRoutes.map((innerRoute) => {
                    return (
                      <Route
                        key={innerRoute.path}
                        path={innerRoute.path}
                        element={
                          <ProtectedRoute authRole={route.accessRole}>
                            <React.Suspense fallback={null}>
                              <innerRoute.lazyElement />
                            </React.Suspense>
                          </ProtectedRoute>
                        }
                      />
                    );
                  })}
                </Route>
              );
            });
          })}

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Container>
    </Box>
  );
};
