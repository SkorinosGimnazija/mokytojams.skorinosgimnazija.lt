import { generatedApi } from './generatedApi';

const enhancedApi = generatedApi.enhanceEndpoints({
  addTagTypes: [
    'Post',
    'Menu',
    'Banner',
    'Course',
    'Bully',
    'Appointments',
    'AppointmentDates',
    'AppointmentHosts',
    'Events',
    'Accomplishments',
  ],
  endpoints: {
    authorize: {},
    getPublicLanguages: {
      keepUnusedDataFor: 600,
    },
    getMenuLocations: {
      keepUnusedDataFor: 600,
    },
    getTeachers: {
      keepUnusedDataFor: 600,
    },
    getAccomplishmentScales: {
      keepUnusedDataFor: 600,
    },
    getAccomplishmentClassrooms: {
      keepUnusedDataFor: 600,
    },
    getAccomplishmentAchievements: {
      keepUnusedDataFor: 600,
    },
    searchPosts: {
      providesTags: ['Post'],
    },
    getPosts: {
      providesTags: ['Post'],
    },
    getPostById: {
      providesTags: ['Post'],
    },
    getPublicPostById: {
      providesTags: ['Post'],
    },
    getPublicPostsByLanguage: {
      providesTags: ['Post'],
    },
    searchPublicPosts: {
      providesTags: ['Post'],
    },
    getPublicPostByMenuLanguageAndPath: {
      providesTags: ['Post'],
    },
    patchPost: {
      invalidatesTags: ['Post'],
    },
    editPost: {
      invalidatesTags: ['Post'],
    },
    createPost: {
      invalidatesTags: ['Post'],
    },
    deletePost: {
      invalidatesTags: ['Post'],
    },
    getMenuById: {
      providesTags: ['Menu'],
    },
    getMenus: {
      providesTags: ['Menu'],
    },
    getPublicMenusByLanguage: {
      providesTags: ['Menu'],
    },
    searchMenus: {
      providesTags: ['Menu'],
    },
    editMenu: {
      invalidatesTags: ['Menu'],
    },
    createMenu: {
      invalidatesTags: ['Menu'],
    },
    deleteMenu: {
      invalidatesTags: ['Menu'],
    },
    getBannerById: {
      providesTags: ['Banner'],
    },
    getBanners: {
      providesTags: ['Banner'],
    },
    searchBanners: {
      providesTags: ['Banner'],
    },
    getPublicBannersByLanguage: {
      providesTags: ['Banner'],
    },
    createBanner: {
      invalidatesTags: ['Banner'],
    },
    editBanner: {
      invalidatesTags: ['Banner'],
    },
    deleteBanner: {
      invalidatesTags: ['Banner'],
    },
    createCourse: {
      invalidatesTags: ['Course'],
    },
    deleteCourse: {
      invalidatesTags: ['Course'],
    },
    editCourse: {
      invalidatesTags: ['Course'],
    },
    getTeacherCoursesByIdAndDate: {
      providesTags: ['Course'],
    },
    getCoursesStatsByDate: {
      providesTags: ['Course'],
    },
    getCourseById: {
      providesTags: ['Course'],
    },
    getMyCourses: {
      providesTags: ['Course'],
    },
    getBullyReports: {
      providesTags: ['Bully'],
    },
    getBullyReportById: {
      providesTags: ['Bully'],
    },
    createPublicBullyReport: {
      invalidatesTags: ['Bully'],
    },
    deleteBullyReport: {
      invalidatesTags: ['Bully'],
    },
    createAppointment: {
      invalidatesTags: ['AppointmentDates', 'Appointments'],
    },
    createAppointmentType: {
      invalidatesTags: ['Appointments'],
    },
    deleteAppointment: {
      invalidatesTags: ['AppointmentDates', 'Appointments'],
    },
    deleteAppointmentType: {
      invalidatesTags: ['Appointments'],
    },
    editAppointmentType: {
      invalidatesTags: ['Appointments'],
    },
    getAllAppointments: {
      providesTags: ['Appointments'],
    },
    getAppointmentById: {
      providesTags: ['Appointments'],
    },
    getAppointmentTypeById: {
      providesTags: ['Appointments'],
    },
    getAppointmentTypes: {
      providesTags: ['Appointments'],
    },
    getMyAppointments: {
      providesTags: ['Appointments'],
    },
    getMyRegistrations: {
      providesTags: ['Appointments'],
    },
    getAppointmentAvailableDates: {
      providesTags: ['AppointmentDates'],
    },
    getAppointmentDates: {
      providesTags: ['AppointmentDates'],
    },
    createAppointmentDate: {
      invalidatesTags: ['AppointmentDates'],
    },
    deleteAppointmentDate: {
      invalidatesTags: ['AppointmentDates'],
    },
    getAppointmentHosts: {
      providesTags: ['AppointmentHosts'],
    },
    getAppointmentAvailableHosts: {
      providesTags: ['AppointmentHosts'],
    },
    createAppointmentHost: {
      invalidatesTags: ['AppointmentHosts'],
    },
    deleteAppointmentHost: {
      invalidatesTags: ['AppointmentHosts'],
    },
    createAccomplishment: {
      invalidatesTags: ['Accomplishments'],
    },
    editAccomplishment: {
      invalidatesTags: ['Accomplishments'],
    },
    deleteAccomplishment: {
      invalidatesTags: ['Accomplishments'],
    },
    getAccomplishmentById: {
      providesTags: ['Accomplishments'],
    },
    getAccomplishmentsByDate: {
      providesTags: ['Accomplishments'],
    },
    getMyAccomplishments: {
      providesTags: ['Accomplishments'],
    },
  },
});

export { enhancedApi as api };

export const {
  useGetAccomplishmentsByDateQuery,
  useGetAccomplishmentScalesQuery,
  useGetAccomplishmentAchievementsQuery,
  useGetAccomplishmentClassroomsQuery,
  useGetMyAccomplishmentsQuery,
  useCreateAccomplishmentMutation,
  useEditAccomplishmentMutation,
  useGetAccomplishmentByIdQuery,
  useDeleteAccomplishmentMutation,
  useGetMyAppointmentsQuery,
  useGetMyRegistrationsQuery,
  useCreateAppointmentMutation,
  useDeleteAppointmentMutation,
  useGetAppointmentByIdQuery,
  useGetAppointmentAvailableHostsQuery,
  useGetAppointmentAvailableDatesQuery,
  useGetAllAppointmentsQuery,
  useDeleteAppointmentTypeMutation,
  useGetAppointmentTypeByIdQuery,
  useEditAppointmentTypeMutation,
  useGetAppointmentTypesQuery,
  useCreateAppointmentTypeMutation,
  useCreateAppointmentHostMutation,
  useDeleteAppointmentHostMutation,
  useGetAppointmentHostsQuery,
  useCreateAppointmentDateMutation,
  useDeleteAppointmentDateMutation,
  useGetAppointmentDatesQuery,
  useGetPublicAppointmentAvailableHostsQuery,
  useGetPublicAppointmentAvailableDatesQuery,
  useCreatePublicAppointmentMutation,
  useAuthorizeMutation,
  useGetBannersQuery,
  useCreateBannerMutation,
  useEditBannerMutation,
  useGetBannerByIdQuery,
  useDeleteBannerMutation,
  useSearchBannersQuery,
  useGetPublicBannersByLanguageQuery,
  useGetBullyReportsQuery,
  useGetBullyReportByIdQuery,
  useDeleteBullyReportMutation,
  useCreatePublicBullyReportMutation,
  useGetCoursesStatsByDateQuery,
  useGetTeacherCoursesByIdAndDateQuery,
  useGetMyCoursesQuery,
  useCreateCourseMutation,
  useEditCourseMutation,
  useGetCourseByIdQuery,
  useDeleteCourseMutation,
  useGetTeachersQuery,
  useGetPublicEventsQuery,
  useGetPublicDayEventsQuery,
  useGetPublicLanguagesQuery,
  useGetMenusQuery,
  useCreateMenuMutation,
  useEditMenuMutation,
  useGetMenuLocationsQuery,
  useGetMenuByIdQuery,
  useDeleteMenuMutation,
  useSearchMenusQuery,
  useGetPublicMenusByLanguageQuery,
  useGetMenusMetaQuery,
  useGetPostsMetaQuery,
  useGetLocalesMetaQuery,
  useGetPostsQuery,
  useCreatePostMutation,
  useEditPostMutation,
  useGetPostByIdQuery,
  usePatchPostMutation,
  useDeletePostMutation,
  useSearchPostsQuery,
  useGetPublicPostByIdQuery,
  useGetPublicPostByMenuLanguageAndPathQuery,
  useGetPublicPostsByLanguageQuery,
  useSearchPublicPostsQuery,
} = enhancedApi;
