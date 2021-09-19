import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { DesktopDrawer } from './components/drawer/DesktopDrawer';
import { MobileDrawer } from './components/drawer/MobileDrawer';
import { Header } from './components/header/Header';
import { SquareLoader } from './components/loadingSpinners/SquareLoader';
import { useAuth } from './hooks/useAuth';
import { Home } from './pages/Home';
import { NotFound } from './pages/NotFound';
import { routes } from './routes/routes';

export const App = () => {
  const auth = useAuth();

  if (auth.isLoading) {
    return (
      <Box height="100vh" width="100vw">
        <SquareLoader />
      </Box>
    );
  }

  const SideNavigation = () => {
    if (!auth.isAuthenticated) {
      return null;
    }

    return (
      <Box component="nav" sx={{ width: { sm: '240px' }, flexShrink: { sm: 0 } }}>
        <MobileDrawer />
        <DesktopDrawer />
      </Box>
    );
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <Header />
      <SideNavigation />

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Switch>
          <Route exact path="/" component={Home} />
          {routes.map((group) => {
            return group.routes.map((route) => {
              return route.innerRoutes.map((innerRoute) => {
                const slug = `${route.slug}${innerRoute.slug}`;

                if (!auth.isAuthenticated || !auth.hasRole(group.accessRole)) {
                  return (
                    <Redirect
                      exact
                      from={slug}
                      to={{ pathname: '/', state: { returnUrl: window.location.href } }}
                    />
                  );
                }

                return <Route exact key={slug} path={slug} component={innerRoute.component} />;
              });
            });
          })}
          <Route component={NotFound} />
        </Switch>
      </Box>
    </Box>
  );
};
