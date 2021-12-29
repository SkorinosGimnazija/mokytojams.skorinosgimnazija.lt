import { generatedApi } from './generatedApi';

const enhancedApi = generatedApi.enhanceEndpoints({
  addTagTypes: ['Post', 'Menu', 'Banner', 'Course'],
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
    getPublicMenusByLanguageAndLocation: {
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
    getAllCoursesByDate: {
      providesTags: ['Course'],
    },
    getCourseById: {
      providesTags: ['Course'],
    },
    getMyCourses: {
      providesTags: ['Course'],
    },
  },
});

export { enhancedApi as api };

export const {
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
  useGetAllCoursesByDateQuery,
  useGetMyCoursesQuery,
  useCreateCourseMutation,
  useEditCourseMutation,
  useGetCourseByIdQuery,
  useDeleteCourseMutation,
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
  useGetPublicMenusByLanguageAndLocationQuery,
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
  useGetPublicTeachersQuery,
} = enhancedApi;
