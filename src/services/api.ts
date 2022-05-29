import { generatedApi } from './generatedApi';

const enhancedApi = generatedApi.enhanceEndpoints({
  addTagTypes: [
    'Post',
    'Menu',
    'Banner',
    'Course',
    'Bully',
    'Appointments',
    'AppointmentsDate',
    'Events',
  ],
  endpoints: {
    authorize: {},
    getPublicLanguages: {
      keepUnusedDataFor: 600,
    },
    getMenuLocations: {
      keepUnusedDataFor: 600,
    },
    getPublicTeachers: {
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
      invalidatesTags: ['Appointments'],
    },
    createAppointmentType: {
      invalidatesTags: ['Appointments'],
    },
    deleteAppointment: {
      invalidatesTags: ['Appointments'],
    },
    deleteAppointmentType: {
      invalidatesTags: ['Appointments'],
    },
    editAppointmentType: {
      invalidatesTags: ['Appointments'],
    },
    createPublicAppointment: {
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
    getPublicAppointmentTypeBySlug: {
      providesTags: ['Appointments'],
    },
    getAppointmentAvailableDates: {
      providesTags: ['AppointmentsDate'],
    },
    getAppointmentDates: {
      providesTags: ['AppointmentsDate'],
    },
    getPublicAppointmentAvailableDates: {
      providesTags: ['AppointmentsDate'],
    },
    createAppointmentDate: {
      invalidatesTags: ['AppointmentsDate'],
    },
    deleteAppointmentDate: {
      invalidatesTags: ['AppointmentsDate'],
    },
    getPublicDayEvents: {
      providesTags: ['Events'],
    },
    getPublicEvents: {
      providesTags: ['Events'],
    },
  },
});

export { enhancedApi as api };

export const {
  useGetAllAppointmentsQuery,
  useGetMyAppointmentsQuery,
  useEditAppointmentTypeMutation,
  useGetAppointmentByIdQuery,
  useDeleteAppointmentMutation,
  useDeleteAppointmentTypeMutation,
  useGetAppointmentTypeByIdQuery,
  useGetAppointmentTypesQuery,
  useCreateAppointmentTypeMutation,
  useCreateAppointmentMutation,
  useCreateAppointmentDateMutation,
  useDeleteAppointmentDateMutation,
  useGetAppointmentDatesQuery,
  useGetAppointmentAvailableDatesQuery,
  useGetPublicAppointmentTypeBySlugQuery,
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
  useGetPublicTeachersQuery,
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
