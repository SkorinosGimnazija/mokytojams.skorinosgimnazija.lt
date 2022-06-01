import { baseApi as api } from './baseApi';
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    getAllAppointments: build.query<GetAllAppointmentsApiResponse, GetAllAppointmentsApiArg>({
      query: (queryArg) => ({
        url: `/Appointments/all`,
        params: { Items: queryArg.items, Page: queryArg.page },
      }),
    }),
    getMyAppointments: build.query<GetMyAppointmentsApiResponse, GetMyAppointmentsApiArg>({
      query: (queryArg) => ({
        url: `/Appointments`,
        params: { Items: queryArg.items, Page: queryArg.page },
      }),
    }),
    editAppointmentType: build.mutation<EditAppointmentTypeApiResponse, EditAppointmentTypeApiArg>({
      query: (queryArg) => ({
        url: `/Appointments`,
        method: 'PUT',
        body: queryArg.appointmentTypeEditDto,
      }),
    }),
    getAppointmentById: build.query<GetAppointmentByIdApiResponse, GetAppointmentByIdApiArg>({
      query: (queryArg) => ({ url: `/Appointments/${queryArg.id}` }),
    }),
    deleteAppointment: build.mutation<DeleteAppointmentApiResponse, DeleteAppointmentApiArg>({
      query: (queryArg) => ({ url: `/Appointments/${queryArg.id}`, method: 'DELETE' }),
    }),
    deleteAppointmentType: build.mutation<DeleteAppointmentTypeApiResponse, DeleteAppointmentTypeApiArg>(
      {
        query: (queryArg) => ({ url: `/Appointments/type/${queryArg.id}`, method: 'DELETE' }),
      }
    ),
    getAppointmentTypeById: build.query<GetAppointmentTypeByIdApiResponse, GetAppointmentTypeByIdApiArg>(
      {
        query: (queryArg) => ({ url: `/Appointments/type/${queryArg.id}` }),
      }
    ),
    getAppointmentTypes: build.query<GetAppointmentTypesApiResponse, GetAppointmentTypesApiArg>({
      query: () => ({ url: `/Appointments/types` }),
    }),
    createAppointmentType: build.mutation<CreateAppointmentTypeApiResponse, CreateAppointmentTypeApiArg>(
      {
        query: (queryArg) => ({
          url: `/Appointments/type`,
          method: 'POST',
          body: queryArg.appointmentTypeCreateDto,
        }),
      }
    ),
    createAppointmentUser: build.mutation<CreateAppointmentUserApiResponse, CreateAppointmentUserApiArg>(
      {
        query: (queryArg) => ({
          url: `/Appointments/user`,
          method: 'POST',
          body: queryArg.appointmentUserCreateDto,
        }),
      }
    ),
    deleteAppointmentUser: build.mutation<DeleteAppointmentUserApiResponse, DeleteAppointmentUserApiArg>(
      {
        query: (queryArg) => ({ url: `/Appointments/user/${queryArg.id}`, method: 'DELETE' }),
      }
    ),
    getAppointmentUsers: build.query<GetAppointmentUsersApiResponse, GetAppointmentUsersApiArg>({
      query: (queryArg) => ({ url: `/Appointments/user/${queryArg.typeId}` }),
    }),
    createAppointmentDate: build.mutation<CreateAppointmentDateApiResponse, CreateAppointmentDateApiArg>(
      {
        query: (queryArg) => ({
          url: `/Appointments/date`,
          method: 'POST',
          body: queryArg.appointmentDateCreateDto,
        }),
      }
    ),
    deleteAppointmentDate: build.mutation<DeleteAppointmentDateApiResponse, DeleteAppointmentDateApiArg>(
      {
        query: (queryArg) => ({ url: `/Appointments/date/${queryArg.id}`, method: 'DELETE' }),
      }
    ),
    getAppointmentDates: build.query<GetAppointmentDatesApiResponse, GetAppointmentDatesApiArg>({
      query: (queryArg) => ({ url: `/Appointments/date/${queryArg.typeId}` }),
    }),
    createAppointment: build.mutation<CreateAppointmentApiResponse, CreateAppointmentApiArg>({
      query: (queryArg) => ({
        url: `/Appointments/create`,
        method: 'POST',
        body: queryArg.appointmentCreateDto,
      }),
    }),
    getAppointmentAvailableDates: build.query<
      GetAppointmentAvailableDatesApiResponse,
      GetAppointmentAvailableDatesApiArg
    >({
      query: (queryArg) => ({ url: `/Appointments/date/${queryArg['type']}/${queryArg.userName}` }),
    }),
    getPublicAppointmentTypeBySlug: build.query<
      GetPublicAppointmentTypeBySlugApiResponse,
      GetPublicAppointmentTypeBySlugApiArg
    >({
      query: (queryArg) => ({ url: `/Appointments/public/type/${queryArg.slug}` }),
    }),
    getPublicAppointmentAvailableDates: build.query<
      GetPublicAppointmentAvailableDatesApiResponse,
      GetPublicAppointmentAvailableDatesApiArg
    >({
      query: (queryArg) => ({
        url: `/Appointments/public/date/${queryArg['type']}/${queryArg.userName}`,
      }),
    }),
    createPublicAppointment: build.mutation<
      CreatePublicAppointmentApiResponse,
      CreatePublicAppointmentApiArg
    >({
      query: (queryArg) => ({
        url: `/Appointments/public/create`,
        method: 'POST',
        body: queryArg.appointmentPublicCreateDto,
      }),
    }),
    authorize: build.mutation<AuthorizeApiResponse, AuthorizeApiArg>({
      query: (queryArg) => ({ url: `/Auth/authorize`, method: 'POST', body: queryArg.googleAuthDto }),
    }),
    getBanners: build.query<GetBannersApiResponse, GetBannersApiArg>({
      query: (queryArg) => ({ url: `/Banners`, params: { Items: queryArg.items, Page: queryArg.page } }),
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
    searchBanners: build.query<SearchBannersApiResponse, SearchBannersApiArg>({
      query: (queryArg) => ({
        url: `/Banners/search/${queryArg.text}`,
        params: { Items: queryArg.items, Page: queryArg.page },
      }),
    }),
    getPublicBannersByLanguage: build.query<
      GetPublicBannersByLanguageApiResponse,
      GetPublicBannersByLanguageApiArg
    >({
      query: (queryArg) => ({ url: `/Banners/public/${queryArg.language}` }),
    }),
    getBullyReports: build.query<GetBullyReportsApiResponse, GetBullyReportsApiArg>({
      query: (queryArg) => ({
        url: `/BullyReports`,
        params: { Items: queryArg.items, Page: queryArg.page },
      }),
    }),
    getBullyReportById: build.query<GetBullyReportByIdApiResponse, GetBullyReportByIdApiArg>({
      query: (queryArg) => ({ url: `/BullyReports/${queryArg.id}` }),
    }),
    deleteBullyReport: build.mutation<DeleteBullyReportApiResponse, DeleteBullyReportApiArg>({
      query: (queryArg) => ({ url: `/BullyReports/${queryArg.id}`, method: 'DELETE' }),
    }),
    createPublicBullyReport: build.mutation<
      CreatePublicBullyReportApiResponse,
      CreatePublicBullyReportApiArg
    >({
      query: (queryArg) => ({
        url: `/BullyReports/public`,
        method: 'POST',
        body: queryArg.bullyReportCreateDto,
      }),
    }),
    getCoursesStatsByDate: build.query<GetCoursesStatsByDateApiResponse, GetCoursesStatsByDateApiArg>({
      query: (queryArg) => ({
        url: `/Courses/stats`,
        params: { start: queryArg.start, end: queryArg.end },
      }),
    }),
    getTeacherCoursesByIdAndDate: build.query<
      GetTeacherCoursesByIdAndDateApiResponse,
      GetTeacherCoursesByIdAndDateApiArg
    >({
      query: (queryArg) => ({
        url: `/Courses/teacher/${queryArg.id}`,
        params: { start: queryArg.start, end: queryArg.end },
      }),
    }),
    getMyCourses: build.query<GetMyCoursesApiResponse, GetMyCoursesApiArg>({
      query: (queryArg) => ({ url: `/Courses`, params: { Items: queryArg.items, Page: queryArg.page } }),
    }),
    createCourse: build.mutation<CreateCourseApiResponse, CreateCourseApiArg>({
      query: (queryArg) => ({ url: `/Courses`, method: 'POST', body: queryArg.courseCreateDto }),
    }),
    editCourse: build.mutation<EditCourseApiResponse, EditCourseApiArg>({
      query: (queryArg) => ({ url: `/Courses`, method: 'PUT', body: queryArg.courseEditDto }),
    }),
    getCourseById: build.query<GetCourseByIdApiResponse, GetCourseByIdApiArg>({
      query: (queryArg) => ({ url: `/Courses/${queryArg.id}` }),
    }),
    deleteCourse: build.mutation<DeleteCourseApiResponse, DeleteCourseApiArg>({
      query: (queryArg) => ({ url: `/Courses/${queryArg.id}`, method: 'DELETE' }),
    }),
    getTeachers: build.query<GetTeachersApiResponse, GetTeachersApiArg>({
      query: () => ({ url: `/Employees/teachers` }),
    }),
    getPublicEvents: build.query<GetPublicEventsApiResponse, GetPublicEventsApiArg>({
      query: (queryArg) => ({ url: `/Events/public/${queryArg.week}` }),
    }),
    getPublicDayEvents: build.query<GetPublicDayEventsApiResponse, GetPublicDayEventsApiArg>({
      query: () => ({ url: `/Events/public/today` }),
    }),
    getPublicLanguages: build.query<GetPublicLanguagesApiResponse, GetPublicLanguagesApiArg>({
      query: () => ({ url: `/Languages/public` }),
    }),
    getMenus: build.query<GetMenusApiResponse, GetMenusApiArg>({
      query: (queryArg) => ({ url: `/Menus`, params: { Items: queryArg.items, Page: queryArg.page } }),
    }),
    createMenu: build.mutation<CreateMenuApiResponse, CreateMenuApiArg>({
      query: (queryArg) => ({ url: `/Menus`, method: 'POST', body: queryArg.menuCreateDto }),
    }),
    editMenu: build.mutation<EditMenuApiResponse, EditMenuApiArg>({
      query: (queryArg) => ({ url: `/Menus`, method: 'PUT', body: queryArg.menuEditDto }),
    }),
    getMenuLocations: build.query<GetMenuLocationsApiResponse, GetMenuLocationsApiArg>({
      query: () => ({ url: `/Menus/locations` }),
    }),
    getMenuById: build.query<GetMenuByIdApiResponse, GetMenuByIdApiArg>({
      query: (queryArg) => ({ url: `/Menus/${queryArg.id}` }),
    }),
    deleteMenu: build.mutation<DeleteMenuApiResponse, DeleteMenuApiArg>({
      query: (queryArg) => ({ url: `/Menus/${queryArg.id}`, method: 'DELETE' }),
    }),
    searchMenus: build.query<SearchMenusApiResponse, SearchMenusApiArg>({
      query: (queryArg) => ({
        url: `/Menus/search/${queryArg.text}`,
        params: { Items: queryArg.items, Page: queryArg.page },
      }),
    }),
    getPublicMenusByLanguage: build.query<
      GetPublicMenusByLanguageApiResponse,
      GetPublicMenusByLanguageApiArg
    >({
      query: (queryArg) => ({ url: `/Menus/public/${queryArg.language}` }),
    }),
    getMenusMeta: build.query<GetMenusMetaApiResponse, GetMenusMetaApiArg>({
      query: () => ({ url: `/Meta/menus` }),
    }),
    getPostsMeta: build.query<GetPostsMetaApiResponse, GetPostsMetaApiArg>({
      query: () => ({ url: `/Meta/posts` }),
    }),
    getLocalesMeta: build.query<GetLocalesMetaApiResponse, GetLocalesMetaApiArg>({
      query: () => ({ url: `/Meta/locales` }),
    }),
    getPosts: build.query<GetPostsApiResponse, GetPostsApiArg>({
      query: (queryArg) => ({ url: `/Posts`, params: { Items: queryArg.items, Page: queryArg.page } }),
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
    getPublicPostByMenuLanguageAndPath: build.query<
      GetPublicPostByMenuLanguageAndPathApiResponse,
      GetPublicPostByMenuLanguageAndPathApiArg
    >({
      query: (queryArg) => ({ url: `/Posts/public/${queryArg.language}/${queryArg.path}` }),
    }),
    getPublicPostsByLanguage: build.query<
      GetPublicPostsByLanguageApiResponse,
      GetPublicPostsByLanguageApiArg
    >({
      query: (queryArg) => ({
        url: `/Posts/public/${queryArg.language}/all`,
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
export type GetAllAppointmentsApiResponse = /** status 200 Success */ AppointmentDetailsDtoPaginatedList;
export type GetAllAppointmentsApiArg = {
  items?: number;
  page?: number;
};
export type GetMyAppointmentsApiResponse = /** status 200 Success */ AppointmentDetailsDtoPaginatedList;
export type GetMyAppointmentsApiArg = {
  items?: number;
  page?: number;
};
export type EditAppointmentTypeApiResponse = /** status 200 Success */ undefined;
export type EditAppointmentTypeApiArg = {
  appointmentTypeEditDto: AppointmentTypeEditDto;
};
export type GetAppointmentByIdApiResponse = /** status 200 Success */ AppointmentDetailsDto;
export type GetAppointmentByIdApiArg = {
  id: number;
};
export type DeleteAppointmentApiResponse = /** status 204 No Content */ undefined;
export type DeleteAppointmentApiArg = {
  id: number;
};
export type DeleteAppointmentTypeApiResponse = /** status 204 No Content */ undefined;
export type DeleteAppointmentTypeApiArg = {
  id: number;
};
export type GetAppointmentTypeByIdApiResponse = /** status 200 Success */ AppointmentTypeDto;
export type GetAppointmentTypeByIdApiArg = {
  id: number;
};
export type GetAppointmentTypesApiResponse = /** status 200 Success */ AppointmentTypeDto[];
export type GetAppointmentTypesApiArg = void;
export type CreateAppointmentTypeApiResponse = /** status 201 Created */ AppointmentDto;
export type CreateAppointmentTypeApiArg = {
  appointmentTypeCreateDto: AppointmentTypeCreateDto;
};
export type CreateAppointmentUserApiResponse = /** status 201 Created */ AppointmentUserDto;
export type CreateAppointmentUserApiArg = {
  appointmentUserCreateDto: AppointmentUserCreateDto;
};
export type DeleteAppointmentUserApiResponse = /** status 204 No Content */ undefined;
export type DeleteAppointmentUserApiArg = {
  id: number;
};
export type GetAppointmentUsersApiResponse = /** status 200 Success */ AppointmentUserDto[];
export type GetAppointmentUsersApiArg = {
  typeId: number;
};
export type CreateAppointmentDateApiResponse = /** status 201 Created */ AppointmentDateDto;
export type CreateAppointmentDateApiArg = {
  appointmentDateCreateDto: AppointmentDateCreateDto;
};
export type DeleteAppointmentDateApiResponse = /** status 204 No Content */ undefined;
export type DeleteAppointmentDateApiArg = {
  id: number;
};
export type GetAppointmentDatesApiResponse = /** status 200 Success */ AppointmentDateDto[];
export type GetAppointmentDatesApiArg = {
  typeId: number;
};
export type CreateAppointmentApiResponse = /** status 201 Created */ AppointmentDto;
export type CreateAppointmentApiArg = {
  appointmentCreateDto: AppointmentCreateDto;
};
export type GetAppointmentAvailableDatesApiResponse = /** status 200 Success */ AppointmentDateDto[];
export type GetAppointmentAvailableDatesApiArg = {
  type: string;
  userName: string;
};
export type GetPublicAppointmentTypeBySlugApiResponse = /** status 200 Success */ AppointmentTypeDto;
export type GetPublicAppointmentTypeBySlugApiArg = {
  slug: string;
};
export type GetPublicAppointmentAvailableDatesApiResponse =
  /** status 200 Success */ AppointmentDateDto[];
export type GetPublicAppointmentAvailableDatesApiArg = {
  type: string;
  userName: string;
};
export type CreatePublicAppointmentApiResponse = /** status 201 Created */ AppointmentDto;
export type CreatePublicAppointmentApiArg = {
  appointmentPublicCreateDto: AppointmentPublicCreateDto;
};
export type AuthorizeApiResponse = /** status 200 Success */ UserAuthDto;
export type AuthorizeApiArg = {
  googleAuthDto: GoogleAuthDto;
};
export type GetBannersApiResponse = /** status 200 Success */ BannerDtoPaginatedList;
export type GetBannersApiArg = {
  items?: number;
  page?: number;
};
export type CreateBannerApiResponse = /** status 201 Created */ BannerDto;
export type CreateBannerApiArg = {
  body: {
    Title?: string;
    Url?: string;
    IsPublished?: boolean;
    Width?: number;
    Height?: number;
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
    Width?: number;
    Height?: number;
    Order?: number;
    LanguageId?: number;
  };
};
export type GetBannerByIdApiResponse = /** status 200 Success */ BannerDto;
export type GetBannerByIdApiArg = {
  id: number;
};
export type DeleteBannerApiResponse = /** status 204 No Content */ undefined;
export type DeleteBannerApiArg = {
  id: number;
};
export type SearchBannersApiResponse = /** status 200 Success */ BannerDtoPaginatedList;
export type SearchBannersApiArg = {
  text: string;
  items?: number;
  page?: number;
};
export type GetPublicBannersByLanguageApiResponse = /** status 200 Success */ BannerDto[];
export type GetPublicBannersByLanguageApiArg = {
  language: string;
};
export type GetBullyReportsApiResponse = /** status 200 Success */ BullyReportDtoPaginatedList;
export type GetBullyReportsApiArg = {
  items?: number;
  page?: number;
};
export type GetBullyReportByIdApiResponse = /** status 200 Success */ BullyReportDto;
export type GetBullyReportByIdApiArg = {
  id: number;
};
export type DeleteBullyReportApiResponse = /** status 204 No Content */ undefined;
export type DeleteBullyReportApiArg = {
  id: number;
};
export type CreatePublicBullyReportApiResponse = /** status 201 Created */ BullyReportDto;
export type CreatePublicBullyReportApiArg = {
  bullyReportCreateDto: BullyReportCreateDto;
};
export type GetCoursesStatsByDateApiResponse = /** status 200 Success */ CourseStatsDto[];
export type GetCoursesStatsByDateApiArg = {
  start?: string;
  end?: string;
};
export type GetTeacherCoursesByIdAndDateApiResponse = /** status 200 Success */ CourseDto[];
export type GetTeacherCoursesByIdAndDateApiArg = {
  id: number;
  start?: string;
  end?: string;
};
export type GetMyCoursesApiResponse = /** status 200 Success */ CourseDtoPaginatedList;
export type GetMyCoursesApiArg = {
  items?: number;
  page?: number;
};
export type CreateCourseApiResponse = /** status 201 Created */ CourseDto;
export type CreateCourseApiArg = {
  courseCreateDto: CourseCreateDto;
};
export type EditCourseApiResponse = /** status 200 Success */ undefined;
export type EditCourseApiArg = {
  courseEditDto: CourseEditDto;
};
export type GetCourseByIdApiResponse = /** status 200 Success */ CourseDto;
export type GetCourseByIdApiArg = {
  id: number;
};
export type DeleteCourseApiResponse = /** status 204 No Content */ undefined;
export type DeleteCourseApiArg = {
  id: number;
};
export type GetTeachersApiResponse = /** status 200 Success */ EmployeeDto[];
export type GetTeachersApiArg = void;
export type GetPublicEventsApiResponse = /** status 200 Success */ EventDto[];
export type GetPublicEventsApiArg = {
  week: number;
};
export type GetPublicDayEventsApiResponse = /** status 200 Success */ EventDto[];
export type GetPublicDayEventsApiArg = void;
export type GetPublicLanguagesApiResponse = /** status 200 Success */ LanguageDto[];
export type GetPublicLanguagesApiArg = void;
export type GetMenusApiResponse = /** status 200 Success */ MenuDetailsDtoPaginatedList;
export type GetMenusApiArg = {
  items?: number;
  page?: number;
};
export type CreateMenuApiResponse = /** status 201 Created */ MenuDto;
export type CreateMenuApiArg = {
  menuCreateDto: MenuCreateDto;
};
export type EditMenuApiResponse = /** status 200 Success */ undefined;
export type EditMenuApiArg = {
  menuEditDto: MenuEditDto;
};
export type GetMenuLocationsApiResponse = /** status 200 Success */ MenuLocationDto[];
export type GetMenuLocationsApiArg = void;
export type GetMenuByIdApiResponse = /** status 200 Success */ MenuDetailsDto;
export type GetMenuByIdApiArg = {
  id: number;
};
export type DeleteMenuApiResponse = /** status 204 No Content */ undefined;
export type DeleteMenuApiArg = {
  id: number;
};
export type SearchMenusApiResponse = /** status 200 Success */ MenuDetailsDtoPaginatedList;
export type SearchMenusApiArg = {
  text: string;
  items?: number;
  page?: number;
};
export type GetPublicMenusByLanguageApiResponse = /** status 200 Success */ MenuDto[];
export type GetPublicMenusByLanguageApiArg = {
  language: string;
};
export type GetMenusMetaApiResponse = /** status 200 Success */ MenuMetaDto[];
export type GetMenusMetaApiArg = void;
export type GetPostsMetaApiResponse = /** status 200 Success */ PostMetaDto[];
export type GetPostsMetaApiArg = void;
export type GetLocalesMetaApiResponse = /** status 200 Success */ LocaleMetaDto[];
export type GetLocalesMetaApiArg = void;
export type GetPostsApiResponse = /** status 200 Success */ PostDtoPaginatedList;
export type GetPostsApiArg = {
  items?: number;
  page?: number;
};
export type CreatePostApiResponse = /** status 201 Created */ PostDetailsDto;
export type CreatePostApiArg = {
  body: {
    IsFeatured?: boolean;
    NewFiles?: Blob[];
    NewImages?: Blob[];
    NewFeaturedImage?: Blob;
    PublishedAt?: string;
    ModifiedAt?: string;
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
    FeaturedImage?: string;
    IsFeatured?: boolean;
    NewFiles?: Blob[];
    NewImages?: Blob[];
    NewFeaturedImage?: Blob;
    PublishedAt?: string;
    ModifiedAt?: string;
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
export type DeletePostApiResponse = /** status 204 No Content */ undefined;
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
export type GetPublicPostByMenuLanguageAndPathApiResponse = /** status 200 Success */ PostDetailsDto;
export type GetPublicPostByMenuLanguageAndPathApiArg = {
  language: string;
  path: string;
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
export type AppointmentTypeDto = {
  id: number;
  name: string;
  slug: string;
  durationInMinutes: number;
  invitePrincipal: boolean;
  isPublic: boolean;
  registrationEnd: string;
};
export type AppointmentDateDto = {
  id: number;
  date: string;
  type: AppointmentTypeDto;
};
export type AppointmentDetailsDto = {
  id: number;
  eventId: string;
  dateId: number;
  userName: string;
  attendeeName: string;
  attendeeEmail: string;
  date: AppointmentDateDto;
};
export type AppointmentDetailsDtoPaginatedList = {
  items: AppointmentDetailsDto[];
  pageNumber: number;
  totalPages: number;
  totalCount: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
};
export type ProblemDetails = {
  type?: string | null;
  title?: string | null;
  status?: number | null;
  detail?: string | null;
  instance?: string | null;
  [key: string]: any;
};
export type AppointmentTypeEditDto = {
  name: string;
  slug: string;
  durationInMinutes: number;
  invitePrincipal: boolean;
  isPublic: boolean;
  registrationEnd: string;
  id: number;
};
export type AppointmentDto = {
  id: number;
  eventId: string;
  dateId: number;
  userName: string;
  attendeeName: string;
  attendeeEmail: string;
};
export type AppointmentTypeCreateDto = {
  name: string;
  slug: string;
  durationInMinutes: number;
  invitePrincipal: boolean;
  isPublic: boolean;
  registrationEnd: string;
};
export type AppointmentUserDto = {
  id: number;
  typeId: number;
  userName: string;
};
export type AppointmentUserCreateDto = {
  typeId: number;
  userName: string;
};
export type AppointmentDateCreateDto = {
  typeId: number;
  date: string;
};
export type AppointmentCreateDto = {
  dateId: number;
  userName: string;
};
export type AppointmentPublicCreateDto = {
  captchaToken: string;
  dateId: number;
  userName: string;
  attendeeName: string;
  attendeeEmail: string;
};
export type UserAuthDto = {
  token: string;
  displayName: string;
  roles: string[];
};
export type GoogleAuthDto = {
  token: string;
};
export type LanguageDto = {
  id: number;
  name: string;
  slug: string;
};
export type BannerDto = {
  id: number;
  title: string;
  url: string;
  width: number;
  height: number;
  isPublished: boolean;
  pictureUrl: string;
  order: number;
  language: LanguageDto;
};
export type BannerDtoPaginatedList = {
  items: BannerDto[];
  pageNumber: number;
  totalPages: number;
  totalCount: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
};
export type BullyReportDto = {
  id: number;
  bullyInfo: string;
  victimInfo: string;
  details?: string | null;
  location: string;
  date: string;
  createdAt: string;
};
export type BullyReportDtoPaginatedList = {
  items: BullyReportDto[];
  pageNumber: number;
  totalPages: number;
  totalCount: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
};
export type BullyReportCreateDto = {
  bullyInfo: string;
  victimInfo: string;
  details?: string | null;
  location: string;
  captchaToken: string;
  date: string;
};
export type CourseStatsDto = {
  userId: number;
  userDisplayName: string;
  hours: number;
  count: number;
  usefulCount: number;
  price: number;
  lastUpdate: string;
};
export type CourseDto = {
  id: number;
  title: string;
  organizer: string;
  startDate: string;
  endDate: string;
  createdAt: string;
  durationInHours: number;
  certificateNr?: string | null;
  price?: number | null;
  isUseful: boolean;
  userId: number;
};
export type CourseDtoPaginatedList = {
  items: CourseDto[];
  pageNumber: number;
  totalPages: number;
  totalCount: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
};
export type CourseCreateDto = {
  title: string;
  organizer: string;
  startDate: string;
  endDate: string;
  durationInHours: number;
  price?: number | null;
  isUseful: boolean;
  certificateNr?: string | null;
};
export type CourseEditDto = {
  title: string;
  organizer: string;
  startDate: string;
  endDate: string;
  durationInHours: number;
  price?: number | null;
  isUseful: boolean;
  certificateNr?: string | null;
  id: number;
};
export type EmployeeDto = {
  userName: string;
  displayName: string;
};
export type EventDto = {
  id: string;
  title: string;
  startDate?: string | null;
  startDateTime?: string | null;
  endDate?: string | null;
  endDateTime?: string | null;
};
export type MenuDto = {
  id: number;
  order: number;
  url?: string | null;
  title: string;
  slug: string;
  position: string;
  path: string;
  isPublished: boolean;
  parentMenuId?: number | null;
  childMenus: MenuDto[];
};
export type MenuLocationDto = {
  id: number;
  name: string;
  slug: string;
};
export type PostDetailsDto = {
  id: number;
  isFeatured: boolean;
  isPublished: boolean;
  showInFeed: boolean;
  publishedAt: string;
  modifiedAt?: string | null;
  language: LanguageDto;
  slug: string;
  title: string;
  introText?: string | null;
  meta?: string | null;
  featuredImage?: string | null;
  files?: string[] | null;
  images?: string[] | null;
  text?: string | null;
};
export type MenuDetailsDto = {
  id: number;
  order: number;
  url?: string | null;
  title: string;
  slug: string;
  position: string;
  path: string;
  isPublished: boolean;
  parentMenuId?: number | null;
  childMenus: MenuDto[];
  language: LanguageDto;
  menuLocation: MenuLocationDto;
  linkedPost: PostDetailsDto;
};
export type MenuDetailsDtoPaginatedList = {
  items: MenuDetailsDto[];
  pageNumber: number;
  totalPages: number;
  totalCount: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
};
export type MenuCreateDto = {
  order: number;
  title: string;
  url?: string | null;
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
  url?: string | null;
  isPublished: boolean;
  slug: string;
  languageId: number;
  menuLocationId: number;
  linkedPostId?: number | null;
  parentMenuId?: number | null;
  id: number;
};
export type MenuMetaDto = {
  url: string;
  ln: string;
  date: string;
};
export type PostMetaDto = {
  url: string;
  ln: string;
  date: string;
};
export type LocaleMetaDto = {
  url: string;
  ln: string;
  date: string;
};
export type PostDto = {
  id: number;
  isFeatured: boolean;
  isPublished: boolean;
  showInFeed: boolean;
  publishedAt: string;
  modifiedAt?: string | null;
  language: LanguageDto;
  slug: string;
  title: string;
  introText?: string | null;
  meta?: string | null;
  featuredImage?: string | null;
};
export type PostDtoPaginatedList = {
  items: PostDto[];
  pageNumber: number;
  totalPages: number;
  totalCount: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
};
export type PostPatchDto = {
  isFeatured?: boolean | null;
  isPublished?: boolean | null;
};
