import { baseApi as api } from './baseApi';
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    authorize: build.mutation<AuthorizeApiResponse, AuthorizeApiArg>({
      query: (queryArg) => ({
        url: `/Auth/authorize`,
        method: 'POST',
        body: queryArg.googleAuthDto,
      }),
    }),
    getBanners: build.query<GetBannersApiResponse, GetBannersApiArg>({
      query: () => ({ url: `/Banners` }),
    }),
    createBanner: build.mutation<CreateBannerApiResponse, CreateBannerApiArg>({
      query: (queryArg) => ({ url: `/Banners`, method: 'POST', body: queryArg.body }),
    }),
    editBanner: build.mutation<EditBannerApiResponse, EditBannerApiArg>({
      query: (queryArg) => ({ url: `/Banners`, method: 'PUT', body: queryArg.body }),
    }),
    getBannerById: build.query<GetBannerByIdApiResponse, GetBannerByIdApiArg>({
      query: (queryArg) => ({ url: `/Banners/${queryArg.id}` }),
    }),
    deleteBanner: build.mutation<DeleteBannerApiResponse, DeleteBannerApiArg>({
      query: (queryArg) => ({ url: `/Banners/${queryArg.id}`, method: 'DELETE' }),
    }),
    getPublicBannersByLanguage: build.query<
      GetPublicBannersByLanguageApiResponse,
      GetPublicBannersByLanguageApiArg
    >({
      query: (queryArg) => ({ url: `/Banners/public/${queryArg.language}` }),
    }),
    getPublicLanguages: build.query<GetPublicLanguagesApiResponse, GetPublicLanguagesApiArg>({
      query: () => ({ url: `/public` }),
    }),
    getMenus: build.query<GetMenusApiResponse, GetMenusApiArg>({
      query: () => ({ url: `/Menus` }),
    }),
    createMenu: build.mutation<CreateMenuApiResponse, CreateMenuApiArg>({
      query: (queryArg) => ({ url: `/Menus`, method: 'POST', body: queryArg.menuCreateDto }),
    }),
    editMenu: build.mutation<EditMenuApiResponse, EditMenuApiArg>({
      query: (queryArg) => ({ url: `/Menus`, method: 'PUT', body: queryArg.menuEditDto }),
    }),
    getMenuById: build.query<GetMenuByIdApiResponse, GetMenuByIdApiArg>({
      query: (queryArg) => ({ url: `/Menus/${queryArg.id}` }),
    }),
    deleteMenu: build.mutation<DeleteMenuApiResponse, DeleteMenuApiArg>({
      query: (queryArg) => ({ url: `/Menus/${queryArg.id}`, method: 'DELETE' }),
    }),
    getPublicMenusByLanguageAndLocation: build.query<
      GetPublicMenusByLanguageAndLocationApiResponse,
      GetPublicMenusByLanguageAndLocationApiArg
    >({
      query: (queryArg) => ({ url: `/Menus/public/${queryArg.language}/${queryArg.location}` }),
    }),
    getPosts: build.query<GetPostsApiResponse, GetPostsApiArg>({
      query: (queryArg) => ({
        url: `/Posts`,
        params: { Items: queryArg.items, Page: queryArg.page },
      }),
    }),
    createPost: build.mutation<CreatePostApiResponse, CreatePostApiArg>({
      query: (queryArg) => ({ url: `/Posts`, method: 'POST', body: queryArg.body }),
    }),
    editPost: build.mutation<EditPostApiResponse, EditPostApiArg>({
      query: (queryArg) => ({ url: `/Posts`, method: 'PUT', body: queryArg.body }),
    }),
    getPostById: build.query<GetPostByIdApiResponse, GetPostByIdApiArg>({
      query: (queryArg) => ({ url: `/Posts/${queryArg.id}` }),
    }),
    patchPost: build.mutation<PatchPostApiResponse, PatchPostApiArg>({
      query: (queryArg) => ({
        url: `/Posts/${queryArg.id}`,
        method: 'PATCH',
        body: queryArg.postPatchDto,
      }),
    }),
    deletePost: build.mutation<DeletePostApiResponse, DeletePostApiArg>({
      query: (queryArg) => ({ url: `/Posts/${queryArg.id}`, method: 'DELETE' }),
    }),
    searchPosts: build.query<SearchPostsApiResponse, SearchPostsApiArg>({
      query: (queryArg) => ({
        url: `/Posts/search/${queryArg.text}`,
        params: { Items: queryArg.items, Page: queryArg.page },
      }),
    }),
    getPublicPostById: build.query<GetPublicPostByIdApiResponse, GetPublicPostByIdApiArg>({
      query: (queryArg) => ({ url: `/Posts/public/${queryArg.id}` }),
    }),
    getPublicPostsByLanguage: build.query<
      GetPublicPostsByLanguageApiResponse,
      GetPublicPostsByLanguageApiArg
    >({
      query: (queryArg) => ({
        url: `/Posts/public/${queryArg.language}`,
        params: { Items: queryArg.items, Page: queryArg.page },
      }),
    }),
    searchPublicPosts: build.query<SearchPublicPostsApiResponse, SearchPublicPostsApiArg>({
      query: (queryArg) => ({
        url: `/Posts/public/search/${queryArg.text}`,
        params: { Items: queryArg.items, Page: queryArg.page },
      }),
    }),
  }),
  overrideExisting: false,
});
export { injectedRtkApi as generatedApi };
export type AuthorizeApiResponse = /** status 200 Success */ UserAuthDto;
export type AuthorizeApiArg = {
  googleAuthDto: GoogleAuthDto;
};
export type GetBannersApiResponse = /** status 200 Success */ BannerDto[];
export type GetBannersApiArg = void;
export type CreateBannerApiResponse = /** status 201 Success */ BannerDto;
export type CreateBannerApiArg = {
  body: {
    Title?: string;
    Url?: string;
    IsPublished?: boolean;
    Picture?: Blob;
    Order?: number;
    LanguageId?: number;
  };
};
export type EditBannerApiResponse = /** status 200 Success */ undefined;
export type EditBannerApiArg = {
  body: {
    Id?: number;
    Picture?: Blob;
    Title?: string;
    Url?: string;
    IsPublished?: boolean;
    Order?: number;
    LanguageId?: number;
  };
};
export type GetBannerByIdApiResponse = /** status 200 Success */ BannerDto;
export type GetBannerByIdApiArg = {
  id: number;
};
export type DeleteBannerApiResponse = /** status 204 Success */ undefined;
export type DeleteBannerApiArg = {
  id: number;
};
export type GetPublicBannersByLanguageApiResponse = /** status 200 Success */ BannerDto[];
export type GetPublicBannersByLanguageApiArg = {
  language: string;
};
export type GetPublicLanguagesApiResponse = /** status 200 Success */ LanguageDto[];
export type GetPublicLanguagesApiArg = void;
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
export type GetPublicMenusByLanguageAndLocationApiResponse = /** status 200 Success */ MenuDto[];
export type GetPublicMenusByLanguageAndLocationApiArg = {
  language: string;
  location: string;
};
export type GetPostsApiResponse = /** status 200 Success */ PostDtoPaginatedList;
export type GetPostsApiArg = {
  items?: number;
  page?: number;
};
export type CreatePostApiResponse = /** status 201 Success */ PostDetailsDto;
export type CreatePostApiArg = {
  body: {
    IsFeatured?: boolean;
    NewFiles?: Blob[];
    NewImages?: Blob[];
    PublishDate?: string;
    ModifiedDate?: string;
    IntroText?: string;
    IsPublished?: boolean;
    ShowInFeed?: boolean;
    OptimizeImages?: boolean;
    LanguageId?: number;
    Slug?: string;
    Text?: string;
    Meta?: string;
    Title?: string;
  };
};
export type EditPostApiResponse = /** status 200 Success */ undefined;
export type EditPostApiArg = {
  body: {
    Id?: number;
    Files?: string[];
    Images?: string[];
    IsFeatured?: boolean;
    NewFiles?: Blob[];
    NewImages?: Blob[];
    PublishDate?: string;
    ModifiedDate?: string;
    IntroText?: string;
    IsPublished?: boolean;
    ShowInFeed?: boolean;
    OptimizeImages?: boolean;
    LanguageId?: number;
    Slug?: string;
    Text?: string;
    Meta?: string;
    Title?: string;
  };
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
export type SearchPostsApiResponse = /** status 200 Success */ PostDtoPaginatedList;
export type SearchPostsApiArg = {
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
export type SearchPublicPostsApiResponse = /** status 200 Success */ PostDtoPaginatedList;
export type SearchPublicPostsApiArg = {
  text: string;
  items?: number;
  page?: number;
};
export type UserAuthDto = {
  token: string;
  displayName: string;
  roles: string[];
};
export type ProblemDetails = {
  type?: string | null;
  title?: string | null;
  status?: number | null;
  detail?: string | null;
  instance?: string | null;
  [key: string]: any;
};
export type GoogleAuthDto = {
  token: string;
};
export type BannerDto = {
  id: number;
  title: string;
  url: string;
  isPublished: boolean;
  pictureUrl: string;
  order: number;
  languageId: number;
};
export type LanguageDto = {
  id: number;
  name: string;
  slug: string;
};
export type MenuLocationDto = {
  id: number;
  name: string;
  slug: string;
};
export type PostDto = {
  id: number;
  isFeatured: boolean;
  isPublished: boolean;
  showInFeed: boolean;
  publishDate: string;
  modifiedDate?: string | null;
  language: LanguageDto;
  slug: string;
  title: string;
  introText?: string | null;
  meta?: string | null;
};
export type MenuDto = {
  id: number;
  order: number;
  title: string;
  slug: string;
  path: string;
  isPublished: boolean;
  language: LanguageDto;
  menuLocation: MenuLocationDto;
  linkedPost: PostDto;
  parentMenuId?: number | null;
  childMenus: MenuDto[];
};
export type MenuCreateDto = {
  order: number;
  title: string;
  isPublished: boolean;
  slug: string;
  languageId: number;
  menuLocationId: number;
  linkedPostId?: number | null;
  parentMenuId?: number | null;
};
export type MenuEditDto = {
  order: number;
  title: string;
  isPublished: boolean;
  slug: string;
  languageId: number;
  menuLocationId: number;
  linkedPostId?: number | null;
  parentMenuId?: number | null;
  id: number;
};
export type PostDtoPaginatedList = {
  items: PostDto[];
  pageNumber: number;
  totalPages: number;
  totalCount: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
};
export type PostDetailsDto = {
  id: number;
  isFeatured: boolean;
  isPublished: boolean;
  showInFeed: boolean;
  publishDate: string;
  modifiedDate?: string | null;
  language: LanguageDto;
  slug: string;
  title: string;
  introText?: string | null;
  meta?: string | null;
  files: string[];
  images: string[];
  text?: string | null;
};
export type PostPatchDto = {
  isFeatured?: boolean | null;
  isPublished?: boolean | null;
};
