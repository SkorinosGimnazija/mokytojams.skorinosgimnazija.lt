import { baseApi } from '@/services/baseApi.ts'
import type {
  addTagTypes,
  ListAchievementsApiArg,
  ListAchievementsApiResponse,
  ListAppointmentsApiArg,
  ListAppointmentsApiResponse,
  ListBullyReportsApiArg,
  ListBullyReportsApiResponse,
  ListCoursesApiArg,
  ListCoursesApiResponse,
  ListFailureReportsApiArg,
  ListFailureReportsApiResponse,
  ListObservationsApiArg,
  ListObservationsApiResponse,
  ListPostsApiArg,
  ListPostsApiResponse,
} from '@/services/generatedApi.ts'
import type { InfiniteQueryConfigOptions } from '@reduxjs/toolkit/query'

const infiniteQueryDefaultOptions:
  InfiniteQueryConfigOptions<{ hasNextPage: boolean }, number, unknown> = {
  initialPageParam: 1,
  getNextPageParam: (lastPage, _allPages, lastPageParam) => {
    if (!lastPage.hasNextPage) {
      return undefined
    }

    return lastPageParam + 1
  },
} as const

const injectedApi = baseApi.enhanceEndpoints({
  addTagTypes: [
    'Posts',
    'Observations',
    'Appointments',
    'Failure-Reports',
    'Bully-Reports',
    'Achievements',
    'Courses'
  ] satisfies (typeof addTagTypes)[number][],
}).injectEndpoints({
  overrideExisting: true,
  endpoints: (build) => ({
    listObservations: build.infiniteQuery<
      ListObservationsApiResponse,
      Omit<ListObservationsApiArg, 'page'>,
      number>
    ({
      infiniteQueryOptions: infiniteQueryDefaultOptions,
      providesTags: ['Observations'],
      query: ({ pageParam, queryArg }) => ({
        url: '/observations',
        params: { ...queryArg, page: pageParam },
      }),
    }),
    listAppointments: build.infiniteQuery<
      ListAppointmentsApiResponse,
      Omit<ListAppointmentsApiArg, 'page'>,
      number>
    ({
      infiniteQueryOptions: infiniteQueryDefaultOptions,
      providesTags: ['Appointments'],
      query: ({ pageParam, queryArg }) => ({
        url: '/appointments',
        params: { ...queryArg, page: pageParam },
      }),
    }),
    listFailureReports: build.infiniteQuery<
      ListFailureReportsApiResponse,
      Omit<ListFailureReportsApiArg, 'page'>,
      number>
    ({
      infiniteQueryOptions: infiniteQueryDefaultOptions,
      providesTags: ['Failure-Reports'],
      query: ({ pageParam, queryArg }) => ({
        url: '/failure-reports',
        params: { ...queryArg, page: pageParam },
      }),
    }),
    listBullyReports: build.infiniteQuery<
      ListBullyReportsApiResponse,
      Omit<ListBullyReportsApiArg, 'page'>,
      number>
    ({
      infiniteQueryOptions: infiniteQueryDefaultOptions,
      providesTags: ['Bully-Reports'],
      query: ({ pageParam, queryArg }) => ({
        url: '/bully-reports',
        params: { ...queryArg, page: pageParam },
      }),
    }),
    listPosts: build.infiniteQuery<
      ListPostsApiResponse,
      Omit<ListPostsApiArg, 'page'>,
      number>
    ({
      infiniteQueryOptions: infiniteQueryDefaultOptions,
      providesTags: ['Posts'],
      query: ({ pageParam, queryArg }) => ({
        url: '/posts',
        params: { ...queryArg, page: pageParam },
      }),
    }),
    listAchievements: build.infiniteQuery<
      ListAchievementsApiResponse,
      Omit<ListAchievementsApiArg, 'page'>,
      number>
    ({
      infiniteQueryOptions: infiniteQueryDefaultOptions,
      providesTags: ['Achievements'],
      query: ({ pageParam, queryArg }) => ({
        url: '/achievements',
        params: { ...queryArg, page: pageParam },
      }),
    }),
    listCourses: build.infiniteQuery<
      ListCoursesApiResponse,
      Omit<ListCoursesApiArg, 'page'>,
      number>
    ({
      infiniteQueryOptions: infiniteQueryDefaultOptions,
      providesTags: ['Courses'],
      query: ({ pageParam, queryArg }) => ({
        url: '/courses',
        params: { ...queryArg, page: pageParam },
      }),
    }),
  }),
})

export const {
  useListAchievementsInfiniteQuery,
  useListObservationsInfiniteQuery,
  useListAppointmentsInfiniteQuery,
  useListFailureReportsInfiniteQuery,
  useListBullyReportsInfiniteQuery,
  useListPostsInfiniteQuery,
  useListCoursesInfiniteQuery,
} = injectedApi