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
      {
        name: 'Mokinių pasiekimai',
        path: '/admin/accomplishments',
        accessRole: 'Manager',
        innerRoutes: [
          {
            path: '',
            lazyElement: lazy(() => import('../pages/admin/accomplishments/ViewAllAccomplishments')),
          },
        ],
      },
      {
        name: 'Metiniai pokalbiai',
        path: '/manager/appointments/yearly',
        accessRole: 'Manager',
        innerRoutes: [
          {
            path: '',
            lazyElement: lazy(() => import('../pages/admin/appointments/ViewMyAppointments')),
          },
        ],
      },
      {
        name: 'Registracijos',
        path: '/admin/appointments',
        accessRole: 'Admin',
        innerRoutes: [
          {
            path: '',
            lazyElement: lazy(() => import('../pages/admin/appointments/ViewAllAppointments')),
          },
          {
            path: 'types',
            lazyElement: lazy(() => import('../pages/admin/appointments/ViewAllAppointmentTypes')),
          },
          {
            path: 'types/create',
            lazyElement: lazy(() => import('../pages/admin/appointments/EditAppointmentType')),
          },
          {
            path: 'types/:id',
            lazyElement: lazy(() => import('../pages/admin/appointments/EditAppointmentType')),
          },
          {
            path: 'types/:id/time',
            lazyElement: lazy(() => import('../pages/admin/appointments/EditAppointmentTime')),
          },
          {
            path: 'types/:id/users',
            lazyElement: lazy(() => import('../pages/admin/appointments/EditAppointmentUsers')),
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
      {
        name: 'Mokinių pasiekimai',
        path: '/teacher/accomplishments',
        accessRole: 'Teacher',
        innerRoutes: [
          {
            path: '',
            lazyElement: lazy(() => import('../pages/teacher/accomplishments/ViewAccomplishments')),
          },
          {
            path: 'create',
            lazyElement: lazy(() => import('../pages/teacher/accomplishments/EditAccomplishment')),
          },
          {
            path: ':id',
            lazyElement: lazy(() => import('../pages/teacher/accomplishments/EditAccomplishment')),
          },
        ],
      },
      {
        name: 'Metiniai pokalbiai',
        path: '/teacher/appointments/yearly',
        accessRole: 'Teacher',
        innerRoutes: [
          {
            path: '',
            lazyElement: lazy(() => import('../pages/teacher/appointments/ViewMyRegistrations')),
          },
          {
            path: 'create',
            lazyElement: lazy(() => import('../pages/teacher/appointments/CreateAppointment')),
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
