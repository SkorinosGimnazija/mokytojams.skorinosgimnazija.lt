import React, { lazy } from 'react';
import { AuthRole } from '../store/authSlice';

export const routes: RoutesGroup[] = [
  {
    name: 'CMS',
    accessRole: 'Admin',
    routes: [
      {
        name: 'Posts',
        slug: '/posts',
        innerRoutes: [
          {
            slug: '/',
            lazyElement: lazy(() => import('../pages/posts/ViewPosts')),
          },
          {
            slug: '/create',
            lazyElement: lazy(() => import('../pages/posts/EditPost')),
          },
          {
            slug: '/edit/:id',
            lazyElement: lazy(() => import('../pages/posts/EditPost')),
          },
        ],
      },
      {
        name: 'Menus',
        slug: '/menus',
        innerRoutes: [
          {
            slug: '/',
            lazyElement: lazy(() => import('../pages/menus/ViewMenus')),
          },
          {
            slug: '/create',
            lazyElement: lazy(() => import('../pages/menus/EditMenu')),
          },
          {
            slug: '/edit/:id',
            lazyElement: lazy(() => import('../pages/menus/EditMenu')),
          },
        ],
      },
    ],
  },
];

interface RoutesGroup {
  name: string;
  routes: Route[];
  accessRole: AuthRole;
}

interface Route {
  name: string;
  slug: string;
  innerRoutes: InnerRoute[];
}

interface InnerRoute {
  slug: string;
  lazyElement: React.LazyExoticComponent<() => JSX.Element>;
}
