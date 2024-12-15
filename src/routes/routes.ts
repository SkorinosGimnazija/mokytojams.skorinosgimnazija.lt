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
      {
        name: 'Events',
        path: '/cms/events',
        accessRole: 'Admin',
        innerRoutes: [
          {
            path: '',
            lazyElement: lazy(() => import('../pages/cms/events/ViewEvents')),
          },
          {
            path: 'create',
            lazyElement: lazy(() => import('../pages/cms/events/EditEvent')),
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
          {
            path: ':id',
            lazyElement: lazy(() => import('../pages/teacher/accomplishments/EditAccomplishment')),
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
        accessRole: 'Manager',
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
          {
            path: 'types/:id/users/:username',
            lazyElement: lazy(() => import('../pages/admin/appointments/EditAppointmentUserTime')),
          },
        ],
      },
      {
        name: 'Klasės',
        path: '/school/classrooms',
        accessRole: 'Admin',
        innerRoutes: [
          {
            path: '',
            lazyElement: lazy(() => import('../pages/admin/school/classrooms/ViewClassrooms')),
          },
          {
            path: 'create',
            lazyElement: lazy(() => import('../pages/admin/school/classrooms/EditClassroom')),
          },
          {
            path: ':id',
            lazyElement: lazy(() => import('../pages/admin/school/classrooms/EditClassroom')),
          },
        ],
      },
      {
        name: 'Pamokos',
        path: '/school/classtimes',
        accessRole: 'Admin',
        innerRoutes: [
          {
            path: '',
            lazyElement: lazy(() => import('../pages/admin/school/classtimes/ViewClasstimes')),
          },
          {
            path: 'create',
            lazyElement: lazy(() => import('../pages/admin/school/classtimes/EditClasstime')),
          },
          {
            path: ':id',
            lazyElement: lazy(() => import('../pages/admin/school/classtimes/EditClasstime')),
          },
          {
            path: 'shortdays',
            lazyElement: lazy(() => import('../pages/admin/school/classtimes/ViewShortDays')),
          },
          {
            path: 'shortdays/create',
            lazyElement: lazy(() => import('../pages/admin/school/classtimes/EditShortDay')),
          },
          {
            path: 'shortdays/:id',
            lazyElement: lazy(() => import('../pages/admin/school/classtimes/EditShortDay')),
          },
        ],
      },
      {
        name: 'Tvarkaraštis',
        path: '/admin/timetable',
        accessRole: 'Manager',
        innerRoutes: [
          {
            path: '',
            lazyElement: lazy(() => import('../pages/admin/timetable/ViewTimetable')),
          },
          {
            path: ':id',
            lazyElement: lazy(() => import('../pages/admin/timetable/EditTimetable')),
          },
          {
            path: 'create',
            lazyElement: lazy(() => import('../pages/admin/timetable/EditTimetable')),
          },
          {
            path: 'prune',
            lazyElement: lazy(() => import('../pages/admin/timetable/DeleteTimetableDay')),
          },
          {
            path: 'import',
            lazyElement: lazy(() => import('../pages/admin/timetable/ImportTimetable')),
          },
        ],
      },
      {
        name: 'Skelbimai',
        path: '/admin/announcements',
        accessRole: 'Manager',
        innerRoutes: [
          {
            path: '',
            lazyElement: lazy(() => import('../pages/admin/school/announcements/ViewAnnouncements')),
          },
          {
            path: ':id',
            lazyElement: lazy(() => import('../pages/admin/school/announcements/EditAnnouncement')),
          },
          {
            path: 'create',
            lazyElement: lazy(() => import('../pages/admin/school/announcements/EditAnnouncement')),
          },
        ],
      },
      {
        name: 'Stebėjimo kortelė',
        path: '/admin/observations',
        accessRole: 'Manager',
        innerRoutes: [
          {
            path: '',
            lazyElement: lazy(() => import('../pages/admin/observations/ViewObservations')),
          },
          {
            path: ':id',
            lazyElement: lazy(() => import('../pages/admin/observations/EditObservation')),
          },
          {
            path: 'types',
            lazyElement: lazy(() => import('../pages/admin/observations/ViewObservationTypes')),
          },
          {
            path: 'types/:id',
            lazyElement: lazy(() => import('../pages/admin/observations/EditObservationType')),
          },
          {
            path: 'lessons',
            lazyElement: lazy(() => import('../pages/admin/observations/ViewObservationLessons')),
          },
          {
            path: 'lessons/:id',
            lazyElement: lazy(() => import('../pages/admin/observations/EditObservationLesson')),
          },
          {
            path: 'targets',
            lazyElement: lazy(() => import('../pages/admin/observations/ViewObservationTargets')),
          },
          {
            path: 'targets/:id',
            lazyElement: lazy(() => import('../pages/admin/observations/EditObservationTarget')),
          },
        ],
      },
    ],
  },
  {
    name: 'Mokytojams',
    routes: [
      {
        name: 'Patyčių žurnalas',
        path: '/teacher/bullies',
        accessRole: 'Teacher',
        innerRoutes: [
          {
            path: '',
            lazyElement: lazy(() => import('../pages/teacher/bullies/ViewBullies')),
          },
          {
            path: 'create',
            lazyElement: lazy(() => import('../pages/teacher/bullies/EditBully')),
          },
          {
            path: ':id',
            lazyElement: lazy(() => import('../pages/teacher/bullies/EditBully')),
          },
        ],
      },
      {
        name: 'Gedimų žurnalas',
        path: '/teacher/failures',
        accessRole: 'Teacher',
        innerRoutes: [
          {
            path: '',
            lazyElement: lazy(() => import('../pages/teacher/failures/ViewFailures')),
          },
          {
            path: 'create',
            lazyElement: lazy(() => import('../pages/teacher/failures/EditFailures')),
          },
          {
            path: ':id',
            lazyElement: lazy(() => import('../pages/teacher/failures/EditFailures')),
          },
          {
            path: ':id/fix',
            lazyElement: lazy(() => import('../pages/teacher/failures/EditFailuresStatus')),
          },
        ],
      },
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
        name: 'Stebėjimo kortelė',
        path: '/teacher/observations',
        accessRole: 'Teacher',
        innerRoutes: [
          {
            path: '',
            lazyElement: lazy(() => import('../pages/teacher/observations/ViewObservations')),
          },
          {
            path: 'create',
            lazyElement: lazy(() => import('../pages/teacher/observations/EditObservation')),
          },
          {
            path: ':id',
            lazyElement: lazy(() => import('../pages/teacher/observations/EditObservation')),
          },
        ],
      },
      {
        name: 'Tėvų dienos',
        path: '/teacher/appointments/parents',
        accessRole: 'Teacher',
        innerRoutes: [
          {
            path: '',
            lazyElement: lazy(() => import('../pages/teacher/appointments/ViewMyAppointments')),
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
