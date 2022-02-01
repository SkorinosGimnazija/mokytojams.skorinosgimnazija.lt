import React, { lazy } from 'react';
import { AuthRole } from '../store/authSlice';

export const routes: RoutesGroup[] = [
  {
    name: 'CMS',
    routes: [
      {
        name: 'Posts',
        path: '/cms/posts',
        accessRole: 'Admin',
        innerRoutes: [
          {
            path: '',
            lazyElement: lazy(() => import('../pages/cms/posts/ViewPosts')),
          },
          {
            path: 'create',
            lazyElement: lazy(() => import('../pages/cms/posts/EditPost')),
          },
          {
            path: ':id',
            lazyElement: lazy(() => import('../pages/cms/posts/EditPost')),
          },
        ],
      },
      {
        name: 'Menus',
        path: '/cms/menus',
        accessRole: 'Admin',
        innerRoutes: [
          {
            path: '',
            lazyElement: lazy(() => import('../pages/cms/menus/ViewMenus')),
          },
          {
            path: 'create',
            lazyElement: lazy(() => import('../pages/cms/menus/EditMenu')),
          },
          {
            path: ':id',
            lazyElement: lazy(() => import('../pages/cms/menus/EditMenu')),
          },
        ],
      },
      {
        name: 'Banners',
        path: '/cms/banners',
        accessRole: 'Admin',
        innerRoutes: [
          {
            path: '',
            lazyElement: lazy(() => import('../pages/cms/banners/ViewBanners')),
          },
          {
            path: 'create',
            lazyElement: lazy(() => import('../pages/cms/banners/EditBanner')),
          },
          {
            path: ':id',
            lazyElement: lazy(() => import('../pages/cms/banners/EditBanner')),
          },
        ],
      },
    ],
  },
  {
    name: 'Administracija',
    routes: [
      {
        name: 'Patyčių dėžutė',
        path: '/admin/bullies',
        accessRole: 'Admin', // 'Bully',
        innerRoutes: [
          {
            path: '',
            lazyElement: lazy(() => import('../pages/admin/bullies/ViewBullies')),
          },
          {
            path: ':id',
            lazyElement: lazy(() => import('../pages/admin/bullies/EditBully')),
          },
        ],
      },
      {
        name: 'Kvalifikacijos kursai',
        path: '/admin/courses',
        accessRole: 'Manager',
        innerRoutes: [
          {
            path: '',
            lazyElement: lazy(() => import('../pages/admin/courses/ViewAllCourses')),
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
        path: '/teacher/courses',
        accessRole: 'Teacher',
        innerRoutes: [
          {
            path: '',
            lazyElement: lazy(() => import('../pages/teacher/courses/ViewCourses')),
          },
          {
            path: 'create',
            lazyElement: lazy(() => import('../pages/teacher/courses/EditCourse')),
          },
          {
            path: ':id',
            lazyElement: lazy(() => import('../pages/teacher/courses/EditCourse')),
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
