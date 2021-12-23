import React, { lazy } from 'react';
import { AuthRole } from '../store/authSlice';

export const routes: RoutesGroup[] = [
  {
    name: 'CMS',
    routes: [
      {
        name: 'Posts',
        slug: '/posts',
        accessRole: 'Admin',
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
        accessRole: 'Admin',
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
      {
        name: 'Banners',
        slug: '/banners',
        accessRole: 'Admin',
        innerRoutes: [
          {
            slug: '/',
            lazyElement: lazy(() => import('../pages/banners/ViewBanners')),
          },
          {
            slug: '/create',
            lazyElement: lazy(() => import('../pages/banners/EditBanner')),
          },
          {
            slug: '/edit/:id',
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
        slug: '/courses',
        accessRole: 'Teacher',
        innerRoutes: [
          {
            slug: '/',
            lazyElement: lazy(() => import('../pages/courses/ViewCourses')),
          },
          {
            slug: '/create',
            lazyElement: lazy(() => import('../pages/courses/EditCourse')),
          },
          {
            slug: '/edit/:id',
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
        slug: '/admin/courses',
        accessRole: 'Manager',
        innerRoutes: [
          {
            slug: '/',
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
  slug: string;
  accessRole: AuthRole;
  innerRoutes: InnerRoute[];
}

interface InnerRoute {
  slug: string;
  lazyElement: React.LazyExoticComponent<() => JSX.Element>;
}
