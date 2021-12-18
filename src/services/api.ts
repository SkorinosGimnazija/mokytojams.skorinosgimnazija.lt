import { generatedApi } from './generatedApi';

const enhancedApi = generatedApi.enhanceEndpoints({
  addTagTypes: ['Post', 'Menu', 'Banner'],
  endpoints: {
    getPublicLanguages: {
      keepUnusedDataFor: 600,
    },
    getMenuLocations: {
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
  useGetPublicPostByMenuPathQuery,
  useGetPublicPostsByLanguageQuery,
  useSearchPublicPostsQuery,
} = enhancedApi;
