import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from './baseQuery';
export const api = createApi({
  baseQuery: baseQuery,
  tagTypes: ['type'],
  endpoints: (build) => ({
    getUser: build.query<GetUserApiResponse, GetUserApiArg>({
      query: () => ({ url: `/auth/user` }),
    }),
    logout: build.mutation<LogoutApiResponse, LogoutApiArg>({
      query: () => ({ url: `/auth/logout`, method: 'POST' }),
    }),
    getCategories: build.query<GetCategoriesApiResponse, GetCategoriesApiArg>({
      query: () => ({ url: `/categories` }),
    }),
    createCategory: build.mutation<CreateCategoryApiResponse, CreateCategoryApiArg>({
      query: (queryArg) => ({
        url: `/categories`,
        method: 'POST',
        body: queryArg.categoryCreateDto,
      }),
    }),
    editCategory: build.mutation<EditCategoryApiResponse, EditCategoryApiArg>({
      query: (queryArg) => ({ url: `/categories`, method: 'PUT', body: queryArg.categoryEditDto }),
    }),
    getCategoryById: build.query<GetCategoryByIdApiResponse, GetCategoryByIdApiArg>({
      query: (queryArg) => ({ url: `/categories/${queryArg.id}` }),
    }),
    deleteCategory: build.mutation<DeleteCategoryApiResponse, DeleteCategoryApiArg>({
      query: (queryArg) => ({ url: `/categories/${queryArg.id}`, method: 'DELETE' }),
    }),
    getMenus: build.query<GetMenusApiResponse, GetMenusApiArg>({
      query: () => ({ url: `/menus` }),
    }),
    createMenu: build.mutation<CreateMenuApiResponse, CreateMenuApiArg>({
      query: (queryArg) => ({ url: `/menus`, method: 'POST', body: queryArg.menuCreateDto }),
    }),
    editMenu: build.mutation<EditMenuApiResponse, EditMenuApiArg>({
      query: (queryArg) => ({ url: `/menus`, method: 'PUT', body: queryArg.menuEditDto }),
    }),
    getMenuById: build.query<GetMenuByIdApiResponse, GetMenuByIdApiArg>({
      query: (queryArg) => ({ url: `/menus/${queryArg.id}` }),
    }),
    deleteMenu: build.mutation<DeleteMenuApiResponse, DeleteMenuApiArg>({
      query: (queryArg) => ({ url: `/menus/${queryArg.id}`, method: 'DELETE' }),
    }),
    getPublicMenusByLanguage: build.query<
      GetPublicMenusByLanguageApiResponse,
      GetPublicMenusByLanguageApiArg
    >({
      query: (queryArg) => ({ url: `/menus/public/${queryArg.language}` }),
    }),
    getPosts: build.query<GetPostsApiResponse, GetPostsApiArg>({
      query: (queryArg) => ({
        url: `/posts`,
        params: { Items: queryArg.items, Page: queryArg.page },
      }),
    }),
    createPost: build.mutation<CreatePostApiResponse, CreatePostApiArg>({
      query: (queryArg) => ({ url: `/posts`, method: 'POST', body: queryArg.body }),
    }),
    editPost: build.mutation<EditPostApiResponse, EditPostApiArg>({
      query: (queryArg) => ({ url: `/posts`, method: 'PUT', body: queryArg.postEditDto }),
    }),
    getPostById: build.query<GetPostByIdApiResponse, GetPostByIdApiArg>({
      query: (queryArg) => ({ url: `/posts/${queryArg.id}` }),
    }),
    patchPost: build.mutation<PatchPostApiResponse, PatchPostApiArg>({
      query: (queryArg) => ({
        url: `/posts/${queryArg.id}`,
        method: 'PATCH',
        body: queryArg.postPatchDto,
      }),
    }),
    deletePost: build.mutation<DeletePostApiResponse, DeletePostApiArg>({
      query: (queryArg) => ({ url: `/posts/${queryArg.id}`, method: 'DELETE' }),
    }),
    searchPost: build.query<SearchPostApiResponse, SearchPostApiArg>({
      query: (queryArg) => ({
        url: `/posts/search/${queryArg.text}`,
        params: { Items: queryArg.items, Page: queryArg.page },
      }),
    }),
    getPublicPostById: build.query<GetPublicPostByIdApiResponse, GetPublicPostByIdApiArg>({
      query: (queryArg) => ({ url: `/posts/public/${queryArg.id}` }),
    }),
    getPublicPostsByLanguage: build.query<
      GetPublicPostsByLanguageApiResponse,
      GetPublicPostsByLanguageApiArg
    >({
      query: (queryArg) => ({
        url: `/posts/public/${queryArg.language}`,
        params: { Items: queryArg.items, Page: queryArg.page },
      }),
    }),
    searchPublicPostsByLanguageAndText: build.query<
      SearchPublicPostsByLanguageAndTextApiResponse,
      SearchPublicPostsByLanguageAndTextApiArg
    >({
      query: (queryArg) => ({
        url: `/posts/public/${queryArg.language}/search/${queryArg.text}`,
        params: { Items: queryArg.items, Page: queryArg.page },
      }),
    }),
  }),
});
export type GetUserApiResponse /** status 200 Success */ =
  | UserDto
  | /** status 204 Success */ undefined;
export type GetUserApiArg = void;
export type LogoutApiResponse = unknown;
export type LogoutApiArg = void;
export type GetCategoriesApiResponse = /** status 200 Success */ CategoryDto[];
export type GetCategoriesApiArg = void;
export type CreateCategoryApiResponse = /** status 201 Success */ CategoryDto;
export type CreateCategoryApiArg = {
  categoryCreateDto: CategoryCreateDto;
};
export type EditCategoryApiResponse = /** status 200 Success */ undefined;
export type EditCategoryApiArg = {
  categoryEditDto: CategoryEditDto;
};
export type GetCategoryByIdApiResponse = /** status 200 Success */ CategoryDto;
export type GetCategoryByIdApiArg = {
  id: number;
};
export type DeleteCategoryApiResponse = /** status 204 Success */ undefined;
export type DeleteCategoryApiArg = {
  id: number;
};
export type GetMenusApiResponse = /** status 200 Success */ MenuDto[];
export type GetMenusApiArg = void;
export type CreateMenuApiResponse = /** status 201 Success */ MenuDto;
export type CreateMenuApiArg = {
  menuCreateDto: MenuCreateDto;
};
export type EditMenuApiResponse = /** status 200 Success */ undefined;
export type EditMenuApiArg = {
  menuEditDto: MenuEditDto;
};
export type GetMenuByIdApiResponse = /** status 200 Success */ MenuDto;
export type GetMenuByIdApiArg = {
  id: number;
};
export type DeleteMenuApiResponse = /** status 204 Success */ undefined;
export type DeleteMenuApiArg = {
  id: number;
};
export type GetPublicMenusByLanguageApiResponse = /** status 200 Success */ MenuDto[];
export type GetPublicMenusByLanguageApiArg = {
  language: string;
};
export type GetPostsApiResponse = /** status 200 Success */ PostDto[];
export type GetPostsApiArg = {
  items?: number;
  page?: number;
};
export type CreatePostApiResponse = /** status 201 Success */ PostDetailsDto;
export type CreatePostApiArg = {
  body: {
    IsFeatured?: boolean;
    Files?: Blob[];
    Images?: Blob[];
    PublishDate?: string;
    IntroText?: string;
    IsPublished?: boolean;
    CategoryId?: number;
    Slug?: string;
    Text?: string;
    Title?: string;
  };
};
export type EditPostApiResponse = /** status 200 Success */ undefined;
export type EditPostApiArg = {
  postEditDto: PostEditDto;
};
export type GetPostByIdApiResponse = /** status 200 Success */ PostDetailsDto;
export type GetPostByIdApiArg = {
  id: number;
};
export type PatchPostApiResponse = /** status 200 Success */ undefined;
export type PatchPostApiArg = {
  id: number;
  postPatchDto: PostPatchDto;
};
export type DeletePostApiResponse = /** status 204 Success */ undefined;
export type DeletePostApiArg = {
  id: number;
};
export type SearchPostApiResponse = /** status 200 Success */ PostDto[];
export type SearchPostApiArg = {
  text: string;
  items?: number;
  page?: number;
};
export type GetPublicPostByIdApiResponse = /** status 200 Success */ PostDetailsDto;
export type GetPublicPostByIdApiArg = {
  id: number;
};
export type GetPublicPostsByLanguageApiResponse = /** status 200 Success */ PostDto[];
export type GetPublicPostsByLanguageApiArg = {
  language: string;
  items?: number;
  page?: number;
};
export type SearchPublicPostsByLanguageAndTextApiResponse = /** status 200 Success */ PostDto[];
export type SearchPublicPostsByLanguageAndTextApiArg = {
  language: string;
  text: string;
  items?: number;
  page?: number;
};
export type UserDto = {
  roles?: string[] | null;
  userName?: string | null;
};
export type CategoryDto = {
  id?: number;
  languageId?: number;
  name?: string | null;
  slug?: string | null;
  showOnHomePage?: boolean;
};
export type ProblemDetails = {
  type?: string | null;
  title?: string | null;
  status?: number | null;
  detail?: string | null;
  instance?: string | null;
  [key: string]: any;
};
export type CategoryCreateDto = {
  languageId?: number;
  name?: string | null;
  slug?: string | null;
  showOnHomePage?: boolean;
};
export type CategoryEditDto = {
  id?: number;
  languageId?: number;
  name?: string | null;
  slug?: string | null;
  showOnHomePage?: boolean;
};
export type MenuDto = {
  id?: number;
  order?: number;
  name?: string | null;
  slug?: string | null;
  isPublished?: boolean;
  categoryId?: number;
  url?: string | null;
  parentMenuId?: number | null;
};
export type MenuCreateDto = {
  order?: number;
  name?: string | null;
  isPublished?: boolean;
  slug?: string | null;
  categoryId?: number;
  url?: string | null;
  parentMenuId?: number | null;
};
export type MenuEditDto = {
  id?: number;
  order?: number;
  name?: string | null;
  slug?: string | null;
  isPublished?: boolean;
  categoryId?: number;
  url?: string | null;
  parentMenuId?: number | null;
};
export type PostDto = {
  id?: number;
  isFeatured?: boolean;
  isPublished?: boolean;
  category?: CategoryDto;
  publishDate?: string;
  slug?: string | null;
  title?: string | null;
};
export type PostDetailsDto = {
  id?: number;
  categoryId?: number;
  isFeatured?: boolean;
  files?: string[] | null;
  images?: string[] | null;
  introText?: string | null;
  isPublished?: boolean;
  category?: CategoryDto;
  publishDate?: string;
  slug?: string | null;
  text?: string | null;
  title?: string | null;
};
export type PostEditDto = {
  id?: number;
  isFeatured?: boolean;
  files?: string[] | null;
  images?: string[] | null;
  publishDate?: string;
  introText?: string | null;
  isPublished?: boolean;
  categoryId?: number;
  slug?: string | null;
  text?: string | null;
  title?: string | null;
};
export type PostPatchDto = {
  isFeatured?: boolean | null;
  isPublished?: boolean | null;
};
export const {
  useGetUserQuery,
  useLogoutMutation,
  useGetCategoriesQuery,
  useCreateCategoryMutation,
  useEditCategoryMutation,
  useGetCategoryByIdQuery,
  useDeleteCategoryMutation,
  useGetMenusQuery,
  useCreateMenuMutation,
  useEditMenuMutation,
  useGetMenuByIdQuery,
  useDeleteMenuMutation,
  useGetPublicMenusByLanguageQuery,
  useGetPostsQuery,
  useCreatePostMutation,
  useEditPostMutation,
  useGetPostByIdQuery,
  usePatchPostMutation,
  useDeletePostMutation,
  useSearchPostQuery,
  useGetPublicPostByIdQuery,
  useGetPublicPostsByLanguageQuery,
  useSearchPublicPostsByLanguageAndTextQuery,
} = api;
