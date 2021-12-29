import React, { lazy } from 'react';
import { AuthRole } from '../store/authSlice';

export const routes: RoutesGroup[] = [
  {
    name: 'CMS',
    routes: [
      {
        name: 'Posts',
        path: '/posts',
        accessRole: 'Admin',
        innerRoutes: [
          {
            path: '',
            lazyElement: lazy(() => import('../pages/posts/ViewPosts')),
          },
          {
            path: 'create',
            lazyElement: lazy(() => import('../pages/posts/EditPost')),
          },
          {
            path: ':id',
            lazyElement: lazy(() => import('../pages/posts/EditPost')),
          },
        ],
      },
      {
        name: 'Menus',
        path: '/menus',
        accessRole: 'Admin',
        innerRoutes: [
          {
            path: '',
            lazyElement: lazy(() => import('../pages/menus/ViewMenus')),
          },
          {
            path: 'create',
            lazyElement: lazy(() => import('../pages/menus/EditMenu')),
          },
          {
            path: ':id',
            lazyElement: lazy(() => import('../pages/menus/EditMenu')),
          },
        ],
      },
      {
        name: 'Banners',
        path: '/banners',
        accessRole: 'Admin',
        innerRoutes: [
          {
            path: '',
            lazyElement: lazy(() => import('../pages/banners/ViewBanners')),
          },
          {
            path: 'create',
            lazyElement: lazy(() => import('../pages/banners/EditBanner')),
          },
          {
            path: ':id',
            lazyElement: lazy(() => import('../pages/banners/EditBanner')),
          },
        ],
      },
    ],
  },
  {
    name: 'Mokytojams',
    routes: [
      {
        name: 'Kvalifikacijos kursai',
        path: '/courses',
        accessRole: 'Teacher',
        innerRoutes: [
          {
            path: '',
            lazyElement: lazy(() => import('../pages/courses/ViewCourses')),
          },
          {
            path: 'create',
            lazyElement: lazy(() => import('../pages/courses/EditCourse')),
          },
          {
            path: ':id',
            lazyElement: lazy(() => import('../pages/courses/EditCourse')),
          },
        ],
      },
    ],
  },
  {
    name: 'Administracija',
    routes: [
      {
        name: 'Kvalifikacijos kursai',
        path: '/admin/courses',
        accessRole: 'Manager',
        innerRoutes: [
          {
            path: '',
            lazyElement: lazy(() => import('../pages/admin/ViewAllCourses')),
          },
        ],
      },
    ],
  },
];

interface RoutesGroup {
  name: string;
  routes: Route[];
}

interface Route {
  name: string;
  path: string;
  accessRole: AuthRole;
  innerRoutes: InnerRoute[];
}

interface InnerRoute {
  path: string;
  lazyElement: React.LazyExoticComponent<() => JSX.Element>;
}
