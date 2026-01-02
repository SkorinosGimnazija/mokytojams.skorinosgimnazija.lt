import { AdminViewAchievements } from '@/pages/admin/achievements/AdminViewAchievements.tsx'
import { ViewAchievementsStats } from '@/pages/admin/achievements/ViewAchievementsStats.tsx'
import { UpdateAppointmentTime } from '@/pages/admin/appointments/UpdateAppointmentTime.tsx'
import { UpdateAppointmentType } from '@/pages/admin/appointments/UpdateAppointmentType.tsx'
import { UpdateAppointmentUserTime } from '@/pages/admin/appointments/UpdateAppointmentUserTime.tsx'
import { ViewAppointments as ViewAppointmentsAdmin } from '@/pages/admin/appointments/ViewAppointments.tsx'
import { ViewAppointmentTypes } from '@/pages/admin/appointments/ViewAppointmentTypes.tsx'
import { ResolveBullyReportAdmin } from '@/pages/admin/bullies/ResolveBullyReportAdmin.tsx'
import { UpdateBullyReportAdmin } from '@/pages/admin/bullies/UpdateBullyReportAdmin.tsx'
import { ViewBullyReports as ViewBullyReportsAdmin } from '@/pages/admin/bullies/ViewBullyReports.tsx'
import { UpdateClassroom } from '@/pages/admin/classrooms/UpdateClassroom.tsx'
import { ViewClassrooms } from '@/pages/admin/classrooms/ViewClassrooms.tsx'
import { UpdateClasstime } from '@/pages/admin/classtimes/UpdateClasstime.tsx'
import { ViewClasstimes } from '@/pages/admin/classtimes/ViewClasstimes.tsx'
import { AdminViewCourses } from '@/pages/admin/courses/AdminViewCourses.tsx'
import { ViewCourseStats } from '@/pages/admin/courses/ViewCourseStats.tsx'
import { UpdateObservationLesson } from '@/pages/admin/observations/UpdateObservationLesson.tsx'
import { UpdateObservationOption } from '@/pages/admin/observations/UpdateObservationOption.tsx'
import { UpdateObservationStudent } from '@/pages/admin/observations/UpdateObservationStudent.tsx'
import { ViewObservationLessons } from '@/pages/admin/observations/ViewObservationLessons.tsx'
import { ViewObservationOptions } from '@/pages/admin/observations/ViewObservationOptions.tsx'
import { ViewObservations as ViewObservationsAdmin } from '@/pages/admin/observations/ViewObservations.tsx'
import { ViewObservationStats } from '@/pages/admin/observations/ViewObservationStats.tsx'
import { ViewObservationStudents } from '@/pages/admin/observations/ViewObservationStudents.tsx'
import { UpdateShortDay } from '@/pages/admin/shortdays/UpdateShortDay.tsx'
import { ViewShortDays } from '@/pages/admin/shortdays/ViewShortDays.tsx'
import { DeleteTimetable } from '@/pages/admin/timetable/DeleteTimetable.tsx'
import { ViewTimetable } from '@/pages/admin/timetable/ViewTimetable.tsx'
import { UpdateBanner } from '@/pages/cms/banners/UpdateBanner.tsx'
import { ViewBanners } from '@/pages/cms/banners/ViewBanners.tsx'
import { CreateCalendarEvent } from '@/pages/cms/events/CreateCalendarEvent.tsx'
import { ViewCalendarEvents } from '@/pages/cms/events/ViewCalendarEvents.tsx'
import { UpdateMenu } from '@/pages/cms/menus/UpdateMenu.tsx'
import { ViewMenus } from '@/pages/cms/menus/ViewMenus.tsx'
import { UpdatePost } from '@/pages/cms/posts/UpdatePost.tsx'
import { ViewPosts } from '@/pages/cms/posts/ViewPosts.tsx'
import { UpdateAchievement } from '@/pages/teacher/achievements/UpdateAchievement.tsx'
import { ViewAchievements } from '@/pages/teacher/achievements/ViewAchievements.tsx'
import { CreateAppointment } from '@/pages/teacher/appointments/CreateAppointment.tsx'
import { ViewAppointments } from '@/pages/teacher/appointments/ViewAppointments.tsx'
import { UpdateBullyReport } from '@/pages/teacher/bullies/UpdateBullyReport.tsx'
import { ViewBullyReports } from '@/pages/teacher/bullies/ViewBullyReports.tsx'
import { UpdateCourse } from '@/pages/teacher/courses/UpdateCourse.tsx'
import { ViewCourses } from '@/pages/teacher/courses/ViewCourses.tsx'
import { UpdateFailure } from '@/pages/teacher/failures/UpdateFailure.tsx'
import { UpdateFailureState } from '@/pages/teacher/failures/UpdateFailureState.tsx'
import { ViewFailures } from '@/pages/teacher/failures/ViewFailures.tsx'
import { UpdateObservation } from '@/pages/teacher/observations/UpdateObservation.tsx'
import { ViewObservations } from '@/pages/teacher/observations/ViewObservations.tsx'
import { ViewUtaPage } from '@/pages/teacher/uta/ViewUtaPage.tsx'
import type { AuthRole } from '@/store/authSlice'
import type { Icon } from '@phosphor-icons/react'
import { ArticleIcon, BookIcon, KeyIcon } from '@phosphor-icons/react'
import type { NonIndexRouteObject } from 'react-router'

export const routes: RoutesGroup[] = [
  {
    path: 'cms',
    icon: ArticleIcon,
    handle: { breadcrumb: { title: 'Svetainė', noLink: true } },
    children: [
      {
        path: 'posts',
        accessRole: ['Admin'],
        handle: { breadcrumb: { title: 'Naujienos' } },
        children: [
          { index: true, Component: ViewPosts },
          { path: 'new', Component: UpdatePost },
          { path: ':id', Component: UpdatePost },
        ]
      },
      {
        path: 'menus',
        accessRole: ['Admin'],
        handle: { breadcrumb: { title: 'Meniu' } },
        Component: ViewMenus,
        children: [
          { path: 'new', Component: UpdateMenu },
          { path: ':id', Component: UpdateMenu },
        ]
      },
      {
        path: 'banners',
        accessRole: ['Admin'],
        handle: { breadcrumb: { title: 'Baneriai' } },
        Component: ViewBanners,
        children: [
          { path: 'new', Component: UpdateBanner, },
          { path: ':id', Component: UpdateBanner },
        ]
      },
      {
        path: 'events',
        accessRole: ['Admin'],
        handle: { breadcrumb: { title: 'Renginiai' } },
        Component: ViewCalendarEvents,
        children: [
          { path: 'new', Component: CreateCalendarEvent },
        ]
      }
    ]
  },

  // ---------------------------------------------------------------------

  {
    path: 'admin',
    icon: KeyIcon,
    handle: { breadcrumb: { title: 'Administracija', noLink: true } },
    children: [
      {
        path: 'courses',
        accessRole: ['Manager'],
        handle: { breadcrumb: { title: 'Kvalifikacijos kursai' } },
        children: [
          {
            Component: AdminViewCourses,
            children: [
              { index: true, Component: null },
              { path: ':id', Component: UpdateCourse },
            ]
          },
          {
            path: 'stats',
            handle: { breadcrumb: { title: 'Statistika' } },
            Component: ViewCourseStats,
          },
        ],
      },
      {
        path: 'achievements',
        accessRole: ['Manager'],
        handle: { breadcrumb: { title: 'Mokinių pasiekimai' } },
        children: [
          {
            Component: AdminViewAchievements,
            children: [
              { index: true, Component: null },
              { path: ':id', Component: UpdateAchievement, }
            ]
          },
          {
            path: 'stats',
            handle: { breadcrumb: { title: 'Statistika' } },
            Component: ViewAchievementsStats
          }
        ],
      },
      {
        path: 'observations',
        accessRole: ['Manager', 'Social'],
        handle: { breadcrumb: { title: 'Stebėjimo kortelė' } },
        children: [
          {
            Component: ViewObservationsAdmin,
            children: [
              { index: true, Component: null },
              { path: ':id', Component: UpdateObservation },
            ],
          },
          {
            path: 'stats',
            handle: { breadcrumb: { title: 'Statistika' } },
            Component: ViewObservationStats,
          },
          {
            path: 'students',
            handle: { breadcrumb: { title: 'Mokiniai' } },
            Component: ViewObservationStudents,
            children: [
              { path: 'new', Component: UpdateObservationStudent },
              { path: ':id', Component: UpdateObservationStudent },
            ]
          },
          {
            path: 'lessons',
            handle: { breadcrumb: { title: 'Pamokos' } },
            Component: ViewObservationLessons,
            children: [
              { path: 'new', Component: UpdateObservationLesson },
              { path: ':id', Component: UpdateObservationLesson },
            ],
          },
          {
            path: 'types',
            handle: { breadcrumb: { title: 'Pasirinkimai' } },
            Component: ViewObservationOptions,
            children: [
              { path: 'new', Component: UpdateObservationOption },
              { path: ':id', Component: UpdateObservationOption },
            ],
          },
        ],
      },
      {
        path: 'bullies',
        accessRole: ['Manager', 'Social'],
        handle: { breadcrumb: { title: 'Patyčių pranešimai' } },
        Component: ViewBullyReportsAdmin,
        children: [
          { path: ':id', Component: UpdateBullyReportAdmin },
          { path: ':id/resolve', Component: ResolveBullyReportAdmin },
        ]
      },
      {
        path: 'appointments',
        accessRole: ['Manager'],
        handle: { breadcrumb: { title: 'Registracijos' } },
        children: [
          { index: true, Component: ViewAppointmentsAdmin },
          {
            path: 'types',
            handle: { breadcrumb: { title: 'Nustatymai' } },
            Component: ViewAppointmentTypes,
            children: [
              { path: 'new', Component: UpdateAppointmentType },
              { path: ':id', Component: UpdateAppointmentType },
              { path: ':id/dates', Component: UpdateAppointmentTime },
              { path: ':id/users', Component: UpdateAppointmentUserTime },
            ]
          },
        ],
      },
      {
        path: 'timetable',
        accessRole: ['Admin'],
        handle: { breadcrumb: { title: 'Tvarkaraštis' } },
        children: [
          {
            Component: ViewTimetable,
            children: [
              { index: true, Component: null },
              { path: 'delete', Component: DeleteTimetable },
            ]
          },
          {
            path: 'classrooms',
            handle: { breadcrumb: { title: 'Klasės' } },
            children: [
              {
                Component: ViewClassrooms,
                children: [
                  { index: true, Component: null },
                  { path: 'new', Component: UpdateClassroom },
                  { path: ':id', Component: UpdateClassroom },
                ]
              }
            ]
          },
          {
            path: 'classtimes',
            handle: { breadcrumb: { title: 'Pamokos' } },
            children: [
              {
                Component: ViewClasstimes,
                children: [
                  { index: true, Component: null },
                  { path: 'new', Component: UpdateClasstime },
                  { path: ':id', Component: UpdateClasstime },
                ]
              }
            ]
          },
          {
            path: 'short-days',
            handle: { breadcrumb: { title: 'Sutrumpintos dienos' } },
            children: [
              {
                Component: ViewShortDays,
                children: [
                  { index: true, Component: null },
                  { path: 'new', Component: UpdateShortDay },
                  { path: ':id', Component: UpdateShortDay },
                ]
              }
            ]
          },
        ]
      },
    ]
  },

  // ---------------------------------------------------------------------

  {
    path: 'teacher',
    icon: BookIcon,
    handle: { breadcrumb: { title: 'Mokytojams', noLink: true } },
    children: [
      {
        path: 'failures',
        accessRole: ['Teacher', 'Tech'],
        handle: { breadcrumb: { title: 'Gedimų žurnalas' } },
        Component: ViewFailures,
        children: [
          { path: 'new', Component: UpdateFailure },
          { path: ':id', Component: UpdateFailure },
          { path: ':id/fix', Component: UpdateFailureState },
        ],
      },
      {
        path: 'bullies',
        accessRole: ['Teacher'],
        handle: { breadcrumb: { title: 'Patyčių žurnalas' } },
        Component: ViewBullyReports,
        children: [
          { path: 'new', Component: UpdateBullyReport },
          { path: ':id', Component: UpdateBullyReport },
        ],
      },
      {
        path: 'observations',
        accessRole: ['Teacher'],
        handle: { breadcrumb: { title: 'Stebėjimo kortelė' } },
        Component: ViewObservations,
        children: [
          { path: 'new', Component: UpdateObservation },
          { path: ':id', Component: UpdateObservation },
        ],
      },
      {
        path: 'achievements',
        accessRole: ['Teacher'],
        handle: { breadcrumb: { title: 'Mokinių pasiekimai' } },
        Component: ViewAchievements,
        children: [
          { path: 'new', Component: UpdateAchievement },
          { path: ':id', Component: UpdateAchievement },
        ],
      },
      {
        path: 'courses',
        accessRole: ['Teacher'],
        handle: { breadcrumb: { title: 'Kvalifikacijos kursai' } },
        Component: ViewCourses,
        children: [
          { path: 'new', Component: UpdateCourse },
          { path: ':id', Component: UpdateCourse },
        ],
      },
      {
        path: 'appointments',
        handle: { breadcrumb: { title: 'Registracijos' } },
        accessRole: ['Teacher'],
        Component: ViewAppointments,
        children: [
          { path: 'new', Component: CreateAppointment },
        ],
      },
      {
        path: 'uta',
        handle: { breadcrumb: { title: 'UTA bankas' } },
        accessRole: ['Teacher'],
        Component: ViewUtaPage,
      },
    ]
  },
]

type RoutesGroup = Omit<NonIndexRouteObject, 'handle' | 'children'> & {
  path: string;
  icon: Icon;
  handle: BreadcrumbHandle;
  children: ChildRoute[]
}

type ChildRoute = Omit<NonIndexRouteObject, 'handle'> & {
  accessRole: AuthRole[];
  handle: BreadcrumbHandle;
}

export type BreadcrumbHandle = {
  breadcrumb: {
    title: string;
    noLink?: boolean;
  }
}