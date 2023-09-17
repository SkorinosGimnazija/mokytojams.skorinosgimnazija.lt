import { baseApi as api } from './baseApi';
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    getAccomplishmentsByDate: build.query<
      GetAccomplishmentsByDateApiResponse,
      GetAccomplishmentsByDateApiArg
    >({
      query: (queryArg) => ({
        url: `/Accomplishment/all`,
        params: { start: queryArg.start, end: queryArg.end },
      }),
    }),
    getAccomplishmentScales: build.query<
      GetAccomplishmentScalesApiResponse,
      GetAccomplishmentScalesApiArg
    >({
      query: () => ({ url: `/Accomplishment/scales` }),
    }),
    getAccomplishmentAchievements: build.query<
      GetAccomplishmentAchievementsApiResponse,
      GetAccomplishmentAchievementsApiArg
    >({
      query: () => ({ url: `/Accomplishment/achievements` }),
    }),
    getMyAccomplishments: build.query<GetMyAccomplishmentsApiResponse, GetMyAccomplishmentsApiArg>({
      query: (queryArg) => ({
        url: `/Accomplishment`,
        params: { Items: queryArg.items, Page: queryArg.page },
      }),
    }),
    createAccomplishment: build.mutation<CreateAccomplishmentApiResponse, CreateAccomplishmentApiArg>({
      query: (queryArg) => ({
        url: `/Accomplishment`,
        method: 'POST',
        body: queryArg.accomplishmentCreateDto,
      }),
    }),
    editAccomplishment: build.mutation<EditAccomplishmentApiResponse, EditAccomplishmentApiArg>({
      query: (queryArg) => ({
        url: `/Accomplishment`,
        method: 'PUT',
        body: queryArg.accomplishmentEditDto,
      }),
    }),
    getAccomplishmentById: build.query<GetAccomplishmentByIdApiResponse, GetAccomplishmentByIdApiArg>({
      query: (queryArg) => ({ url: `/Accomplishment/${queryArg.id}` }),
    }),
    deleteAccomplishment: build.mutation<DeleteAccomplishmentApiResponse, DeleteAccomplishmentApiArg>({
      query: (queryArg) => ({ url: `/Accomplishment/${queryArg.id}`, method: 'DELETE' }),
    }),
    getMyAppointments: build.query<GetMyAppointmentsApiResponse, GetMyAppointmentsApiArg>({
      query: (queryArg) => ({
        url: `/Appointments/my/appointments/${queryArg.typeSlug}`,
        params: { Items: queryArg.items, Page: queryArg.page },
      }),
    }),
    getMyRegistrations: build.query<GetMyRegistrationsApiResponse, GetMyRegistrationsApiArg>({
      query: (queryArg) => ({
        url: `/Appointments/my/registrations/${queryArg.typeSlug}`,
        params: { Items: queryArg.items, Page: queryArg.page },
      }),
    }),
    createAppointment: build.mutation<CreateAppointmentApiResponse, CreateAppointmentApiArg>({
      query: (queryArg) => ({
        url: `/Appointments/create`,
        method: 'POST',
        body: queryArg.appointmentCreateDto,
      }),
    }),
    deleteAppointment: build.mutation<DeleteAppointmentApiResponse, DeleteAppointmentApiArg>({
      query: (queryArg) => ({ url: `/Appointments/${queryArg.id}`, method: 'DELETE' }),
    }),
    getAppointmentById: build.query<GetAppointmentByIdApiResponse, GetAppointmentByIdApiArg>({
      query: (queryArg) => ({ url: `/Appointments/${queryArg.id}` }),
    }),
    getAppointmentAvailableHosts: build.query<
      GetAppointmentAvailableHostsApiResponse,
      GetAppointmentAvailableHostsApiArg
    >({
      query: (queryArg) => ({ url: `/Appointments/hosts/available/${queryArg.typeSlug}` }),
    }),
    getAppointmentAvailableDates: build.query<
      GetAppointmentAvailableDatesApiResponse,
      GetAppointmentAvailableDatesApiArg
    >({
      query: (queryArg) => ({
        url: `/Appointments/dates/available/${queryArg.typeSlug}/${queryArg.userName}`,
      }),
    }),
    getAllAppointments: build.query<GetAllAppointmentsApiResponse, GetAllAppointmentsApiArg>({
      query: (queryArg) => ({
        url: `/Appointments`,
        params: { Items: queryArg.items, Page: queryArg.page, query: queryArg.query },
      }),
    }),
    deleteAppointmentType: build.mutation<DeleteAppointmentTypeApiResponse, DeleteAppointmentTypeApiArg>(
      {
        query: (queryArg) => ({ url: `/Appointments/types/${queryArg.id}`, method: 'DELETE' }),
      }
    ),
    getAppointmentTypeById: build.query<GetAppointmentTypeByIdApiResponse, GetAppointmentTypeByIdApiArg>(
      {
        query: (queryArg) => ({ url: `/Appointments/types/${queryArg.id}` }),
      }
    ),
    editAppointmentType: build.mutation<EditAppointmentTypeApiResponse, EditAppointmentTypeApiArg>({
      query: (queryArg) => ({
        url: `/Appointments/types`,
        method: 'PUT',
        body: queryArg.appointmentTypeEditDto,
      }),
    }),
    getAppointmentTypes: build.query<GetAppointmentTypesApiResponse, GetAppointmentTypesApiArg>({
      query: () => ({ url: `/Appointments/types` }),
    }),
    createAppointmentType: build.mutation<CreateAppointmentTypeApiResponse, CreateAppointmentTypeApiArg>(
      {
        query: (queryArg) => ({
          url: `/Appointments/types`,
          method: 'POST',
          body: queryArg.appointmentTypeCreateDto,
        }),
      }
    ),
    createAppointmentHost: build.mutation<CreateAppointmentHostApiResponse, CreateAppointmentHostApiArg>(
      {
        query: (queryArg) => ({
          url: `/Appointments/hosts`,
          method: 'POST',
          body: queryArg.appointmentExclusiveHostCreateDto,
        }),
      }
    ),
    deleteAppointmentHost: build.mutation<DeleteAppointmentHostApiResponse, DeleteAppointmentHostApiArg>(
      {
        query: (queryArg) => ({ url: `/Appointments/hosts/${queryArg.id}`, method: 'DELETE' }),
      }
    ),
    getAppointmentHosts: build.query<GetAppointmentHostsApiResponse, GetAppointmentHostsApiArg>({
      query: (queryArg) => ({ url: `/Appointments/hosts/${queryArg.typeId}` }),
    }),
    createAppointmentDate: build.mutation<CreateAppointmentDateApiResponse, CreateAppointmentDateApiArg>(
      {
        query: (queryArg) => ({
          url: `/Appointments/dates`,
          method: 'POST',
          body: queryArg.appointmentDateCreateDto,
        }),
      }
    ),
    deleteAppointmentDate: build.mutation<DeleteAppointmentDateApiResponse, DeleteAppointmentDateApiArg>(
      {
        query: (queryArg) => ({ url: `/Appointments/dates/${queryArg.id}`, method: 'DELETE' }),
      }
    ),
    getAppointmentDates: build.query<GetAppointmentDatesApiResponse, GetAppointmentDatesApiArg>({
      query: (queryArg) => ({ url: `/Appointments/dates/${queryArg.typeId}` }),
    }),
    getAppointmentReservedDates: build.query<
      GetAppointmentReservedDatesApiResponse,
      GetAppointmentReservedDatesApiArg
    >({
      query: (queryArg) => ({ url: `/Appointments/dates/reserved/${queryArg.userName}` }),
    }),
    createAppointmentReservedDate: build.mutation<
      CreateAppointmentReservedDateApiResponse,
      CreateAppointmentReservedDateApiArg
    >({
      query: (queryArg) => ({
        url: `/Appointments/dates/reserved`,
        method: 'POST',
        body: queryArg.appointmentReservedDateCreateDto,
      }),
    }),
    deleteAppointmentReservedDate: build.mutation<
      DeleteAppointmentReservedDateApiResponse,
      DeleteAppointmentReservedDateApiArg
    >({
      query: (queryArg) => ({ url: `/Appointments/dates/reserved/${queryArg.id}`, method: 'DELETE' }),
    }),
    getPublicAppointmentAvailableHosts: build.query<
      GetPublicAppointmentAvailableHostsApiResponse,
      GetPublicAppointmentAvailableHostsApiArg
    >({
      query: (queryArg) => ({ url: `/Appointments/public/hosts/available/${queryArg.typeSlug}` }),
    }),
    getPublicAppointmentAvailableDates: build.query<
      GetPublicAppointmentAvailableDatesApiResponse,
      GetPublicAppointmentAvailableDatesApiArg
    >({
      query: (queryArg) => ({
        url: `/Appointments/public/dates/available/${queryArg.typeSlug}/${queryArg.userName}`,
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
    getBullyJournalReports: build.query<GetBullyJournalReportsApiResponse, GetBullyJournalReportsApiArg>(
      {
        query: (queryArg) => ({
          url: `/BullyJournal`,
          params: { Items: queryArg.items, Page: queryArg.page },
        }),
      }
    ),
    createBullyJournalReport: build.mutation<
      CreateBullyJournalReportApiResponse,
      CreateBullyJournalReportApiArg
    >({
      query: (queryArg) => ({
        url: `/BullyJournal`,
        method: 'POST',
        body: queryArg.bullyJournalReportCreateDto,
      }),
    }),
    editBullyJournalReport: build.mutation<
      EditBullyJournalReportApiResponse,
      EditBullyJournalReportApiArg
    >({
      query: (queryArg) => ({
        url: `/BullyJournal`,
        method: 'PUT',
        body: queryArg.bullyJournalReportEditDto,
      }),
    }),
    getBullyJournalReportById: build.query<
      GetBullyJournalReportByIdApiResponse,
      GetBullyJournalReportByIdApiArg
    >({
      query: (queryArg) => ({ url: `/BullyJournal/${queryArg.id}` }),
    }),
    deleteBullyJournalReport: build.mutation<
      DeleteBullyJournalReportApiResponse,
      DeleteBullyJournalReportApiArg
    >({
      query: (queryArg) => ({ url: `/BullyJournal/${queryArg.id}`, method: 'DELETE' }),
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
    getEventsByDate: build.query<GetEventsByDateApiResponse, GetEventsByDateApiArg>({
      query: (queryArg) => ({ url: `/Events`, params: { start: queryArg.start, end: queryArg.end } }),
    }),
    createEvent: build.mutation<CreateEventApiResponse, CreateEventApiArg>({
      query: (queryArg) => ({ url: `/Events`, method: 'POST', body: queryArg.eventCreateDto }),
    }),
    deleteEvent: build.mutation<DeleteEventApiResponse, DeleteEventApiArg>({
      query: (queryArg) => ({ url: `/Events/${queryArg.id}`, method: 'DELETE' }),
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
    getClassrooms: build.query<GetClassroomsApiResponse, GetClassroomsApiArg>({
      query: () => ({ url: `/School/classrooms` }),
    }),
    createClassroom: build.mutation<CreateClassroomApiResponse, CreateClassroomApiArg>({
      query: (queryArg) => ({
        url: `/School/classrooms`,
        method: 'POST',
        body: queryArg.classroomCreateDto,
      }),
    }),
    editClassroom: build.mutation<EditClassroomApiResponse, EditClassroomApiArg>({
      query: (queryArg) => ({
        url: `/School/classrooms`,
        method: 'PUT',
        body: queryArg.classroomEditDto,
      }),
    }),
    getClassroomById: build.query<GetClassroomByIdApiResponse, GetClassroomByIdApiArg>({
      query: (queryArg) => ({ url: `/School/classrooms/${queryArg.id}` }),
    }),
    deleteClassroom: build.mutation<DeleteClassroomApiResponse, DeleteClassroomApiArg>({
      query: (queryArg) => ({ url: `/School/classrooms/${queryArg.id}`, method: 'DELETE' }),
    }),
    getClasstimes: build.query<GetClasstimesApiResponse, GetClasstimesApiArg>({
      query: () => ({ url: `/School/classtimes` }),
    }),
    createClasstime: build.mutation<CreateClasstimeApiResponse, CreateClasstimeApiArg>({
      query: (queryArg) => ({
        url: `/School/classtimes`,
        method: 'POST',
        body: queryArg.classtimeCreateDto,
      }),
    }),
    getClasstimeById: build.query<GetClasstimeByIdApiResponse, GetClasstimeByIdApiArg>({
      query: (queryArg) => ({ url: `/School/classtimes/${queryArg.id}` }),
    }),
    deleteClasstime: build.mutation<DeleteClasstimeApiResponse, DeleteClasstimeApiArg>({
      query: (queryArg) => ({ url: `/School/classtimes/${queryArg.id}`, method: 'DELETE' }),
    }),
    editClasstime: build.mutation<EditClasstimeApiResponse, EditClasstimeApiArg>({
      query: (queryArg) => ({
        url: `/School/classtime`,
        method: 'PUT',
        body: queryArg.classtimeEditDto,
      }),
    }),
    getClassdays: build.query<GetClassdaysApiResponse, GetClassdaysApiArg>({
      query: () => ({ url: `/School/classdays` }),
    }),
    getAnnouncementById: build.query<GetAnnouncementByIdApiResponse, GetAnnouncementByIdApiArg>({
      query: (queryArg) => ({ url: `/School/announcements/${queryArg.id}` }),
    }),
    deleteAnnouncement: build.mutation<DeleteAnnouncementApiResponse, DeleteAnnouncementApiArg>({
      query: (queryArg) => ({ url: `/School/announcements/${queryArg.id}`, method: 'DELETE' }),
    }),
    createAnnouncement: build.mutation<CreateAnnouncementApiResponse, CreateAnnouncementApiArg>({
      query: (queryArg) => ({
        url: `/School/announcements`,
        method: 'POST',
        body: queryArg.announcementCreateDto,
      }),
    }),
    editAnnouncement: build.mutation<EditAnnouncementApiResponse, EditAnnouncementApiArg>({
      query: (queryArg) => ({
        url: `/School/announcements`,
        method: 'PUT',
        body: queryArg.announcementEditDto,
      }),
    }),
    getAnnouncements: build.query<GetAnnouncementsApiResponse, GetAnnouncementsApiArg>({
      query: (queryArg) => ({
        url: `/School/announcements`,
        params: { Items: queryArg.items, Page: queryArg.page },
      }),
    }),
    getPublicAnnouncements: build.query<GetPublicAnnouncementsApiResponse, GetPublicAnnouncementsApiArg>(
      {
        query: () => ({ url: `/School/public/announcements` }),
      }
    ),
    getPublicRandomImage: build.query<GetPublicRandomImageApiResponse, GetPublicRandomImageApiArg>({
      query: () => ({ url: `/School/public/random-image` }),
    }),
    getTechJournalReports: build.query<GetTechJournalReportsApiResponse, GetTechJournalReportsApiArg>({
      query: (queryArg) => ({
        url: `/TechJournal`,
        params: { Items: queryArg.items, Page: queryArg.page, start: queryArg.start, end: queryArg.end },
      }),
    }),
    createTechJournalReport: build.mutation<
      CreateTechJournalReportApiResponse,
      CreateTechJournalReportApiArg
    >({
      query: (queryArg) => ({
        url: `/TechJournal`,
        method: 'POST',
        body: queryArg.techJournalReportCreateDto,
      }),
    }),
    editTechJournalReport: build.mutation<EditTechJournalReportApiResponse, EditTechJournalReportApiArg>(
      {
        query: (queryArg) => ({
          url: `/TechJournal`,
          method: 'PUT',
          body: queryArg.techJournalReportEditDto,
        }),
      }
    ),
    getTechJournalReportById: build.query<
      GetTechJournalReportByIdApiResponse,
      GetTechJournalReportByIdApiArg
    >({
      query: (queryArg) => ({ url: `/TechJournal/${queryArg.id}` }),
    }),
    patchTechJournalReport: build.mutation<
      PatchTechJournalReportApiResponse,
      PatchTechJournalReportApiArg
    >({
      query: (queryArg) => ({
        url: `/TechJournal/${queryArg.id}`,
        method: 'PATCH',
        body: queryArg.techJournalReportPatchDto,
      }),
    }),
    deleteTechJournalReport: build.mutation<
      DeleteTechJournalReportApiResponse,
      DeleteTechJournalReportApiArg
    >({
      query: (queryArg) => ({ url: `/TechJournal/${queryArg.id}`, method: 'DELETE' }),
    }),
    getTimetable: build.query<GetTimetableApiResponse, GetTimetableApiArg>({
      query: (queryArg) => ({
        url: `/Timetable`,
        params: { Items: queryArg.items, Page: queryArg.page },
      }),
    }),
    createTimetable: build.mutation<CreateTimetableApiResponse, CreateTimetableApiArg>({
      query: (queryArg) => ({ url: `/Timetable`, method: 'POST', body: queryArg.timetableCreateDto }),
    }),
    editTimetable: build.mutation<EditTimetableApiResponse, EditTimetableApiArg>({
      query: (queryArg) => ({ url: `/Timetable`, method: 'PUT', body: queryArg.timetableEditDto }),
    }),
    getTimetableById: build.query<GetTimetableByIdApiResponse, GetTimetableByIdApiArg>({
      query: (queryArg) => ({ url: `/Timetable/${queryArg.id}` }),
    }),
    deleteTimetable: build.mutation<DeleteTimetableApiResponse, DeleteTimetableApiArg>({
      query: (queryArg) => ({ url: `/Timetable/${queryArg.id}`, method: 'DELETE' }),
    }),
    importTimetable: build.mutation<ImportTimetableApiResponse, ImportTimetableApiArg>({
      query: (queryArg) => ({
        url: `/Timetable/import`,
        method: 'POST',
        body: queryArg.timetableImportDto,
      }),
    }),
    deleteTimetableDay: build.mutation<DeleteTimetableDayApiResponse, DeleteTimetableDayApiArg>({
      query: (queryArg) => ({
        url: `/Timetable/days`,
        method: 'DELETE',
        body: queryArg.timetableDeleteDayDto,
      }),
    }),
    getPublicTimetable: build.query<GetPublicTimetableApiResponse, GetPublicTimetableApiArg>({
      query: () => ({ url: `/Timetable/public/today` }),
    }),
  }),
  overrideExisting: false,
});
export { injectedRtkApi as generatedApi };
export type GetAccomplishmentsByDateApiResponse = /** status 200 Success */ AccomplishmentDto[];
export type GetAccomplishmentsByDateApiArg = {
  start?: string;
  end?: string;
};
export type GetAccomplishmentScalesApiResponse = /** status 200 Success */ AccomplishmentScaleDto[];
export type GetAccomplishmentScalesApiArg = void;
export type GetAccomplishmentAchievementsApiResponse =
  /** status 200 Success */ AccomplishmentAchievementDto[];
export type GetAccomplishmentAchievementsApiArg = void;
export type GetMyAccomplishmentsApiResponse = /** status 200 Success */ AccomplishmentDtoPaginatedList;
export type GetMyAccomplishmentsApiArg = {
  items?: number;
  page?: number;
};
export type CreateAccomplishmentApiResponse = /** status 201 Created */ AccomplishmentDto;
export type CreateAccomplishmentApiArg = {
  accomplishmentCreateDto: AccomplishmentCreateDto;
};
export type EditAccomplishmentApiResponse = /** status 200 Success */ undefined;
export type EditAccomplishmentApiArg = {
  accomplishmentEditDto: AccomplishmentEditDto;
};
export type GetAccomplishmentByIdApiResponse = /** status 200 Success */ AccomplishmentDetailsDto;
export type GetAccomplishmentByIdApiArg = {
  id: number;
};
export type DeleteAccomplishmentApiResponse = /** status 204 No Content */ undefined;
export type DeleteAccomplishmentApiArg = {
  id: number;
};
export type GetMyAppointmentsApiResponse = /** status 200 Success */ AppointmentDetailsDtoPaginatedList;
export type GetMyAppointmentsApiArg = {
  items?: number;
  page?: number;
  typeSlug: string;
};
export type GetMyRegistrationsApiResponse = /** status 200 Success */ AppointmentDetailsDtoPaginatedList;
export type GetMyRegistrationsApiArg = {
  items?: number;
  page?: number;
  typeSlug: string;
};
export type CreateAppointmentApiResponse = /** status 201 Created */ AppointmentDto;
export type CreateAppointmentApiArg = {
  appointmentCreateDto: AppointmentCreateDto;
};
export type DeleteAppointmentApiResponse = /** status 204 No Content */ undefined;
export type DeleteAppointmentApiArg = {
  id: number;
};
export type GetAppointmentByIdApiResponse = /** status 200 Success */ AppointmentDetailsDto;
export type GetAppointmentByIdApiArg = {
  id: number;
};
export type GetAppointmentAvailableHostsApiResponse = /** status 200 Success */ AppointmentHostDto[];
export type GetAppointmentAvailableHostsApiArg = {
  typeSlug: string;
};
export type GetAppointmentAvailableDatesApiResponse = /** status 200 Success */ AppointmentDateDto[];
export type GetAppointmentAvailableDatesApiArg = {
  typeSlug: string;
  userName: string;
};
export type GetAllAppointmentsApiResponse = /** status 200 Success */ AppointmentDetailsDtoPaginatedList;
export type GetAllAppointmentsApiArg = {
  items?: number;
  page?: number;
  query?: string;
};
export type DeleteAppointmentTypeApiResponse = /** status 204 No Content */ undefined;
export type DeleteAppointmentTypeApiArg = {
  id: number;
};
export type GetAppointmentTypeByIdApiResponse = /** status 200 Success */ AppointmentTypeDto;
export type GetAppointmentTypeByIdApiArg = {
  id: number;
};
export type EditAppointmentTypeApiResponse = /** status 200 Success */ undefined;
export type EditAppointmentTypeApiArg = {
  appointmentTypeEditDto: AppointmentTypeEditDto;
};
export type GetAppointmentTypesApiResponse = /** status 200 Success */ AppointmentTypeDto[];
export type GetAppointmentTypesApiArg = void;
export type CreateAppointmentTypeApiResponse = /** status 201 Created */ AppointmentDto;
export type CreateAppointmentTypeApiArg = {
  appointmentTypeCreateDto: AppointmentTypeCreateDto;
};
export type CreateAppointmentHostApiResponse = /** status 201 Created */ AppointmentExclusiveHostDto;
export type CreateAppointmentHostApiArg = {
  appointmentExclusiveHostCreateDto: AppointmentExclusiveHostCreateDto;
};
export type DeleteAppointmentHostApiResponse = /** status 204 No Content */ undefined;
export type DeleteAppointmentHostApiArg = {
  id: number;
};
export type GetAppointmentHostsApiResponse = /** status 200 Success */ AppointmentExclusiveHostDto[];
export type GetAppointmentHostsApiArg = {
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
export type GetAppointmentReservedDatesApiResponse =
  /** status 200 Success */ AppointmentReservedDateDto[];
export type GetAppointmentReservedDatesApiArg = {
  userName: string;
};
export type CreateAppointmentReservedDateApiResponse =
  /** status 201 Created */ AppointmentReservedDateDto;
export type CreateAppointmentReservedDateApiArg = {
  appointmentReservedDateCreateDto: AppointmentReservedDateCreateDto;
};
export type DeleteAppointmentReservedDateApiResponse = /** status 204 No Content */ undefined;
export type DeleteAppointmentReservedDateApiArg = {
  id: number;
};
export type GetPublicAppointmentAvailableHostsApiResponse =
  /** status 200 Success */ AppointmentHostDto[];
export type GetPublicAppointmentAvailableHostsApiArg = {
  typeSlug: string;
};
export type GetPublicAppointmentAvailableDatesApiResponse =
  /** status 200 Success */ AppointmentDateDto[];
export type GetPublicAppointmentAvailableDatesApiArg = {
  typeSlug: string;
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
export type GetPublicBannersByLanguageApiResponse = /** status 200 Success */ BannerPublicDto[];
export type GetPublicBannersByLanguageApiArg = {
  language: string;
};
export type GetBullyJournalReportsApiResponse =
  /** status 200 Success */ BullyJournalReportDtoPaginatedList;
export type GetBullyJournalReportsApiArg = {
  items?: number;
  page?: number;
};
export type CreateBullyJournalReportApiResponse = /** status 201 Created */ BullyJournalReportDetailsDto;
export type CreateBullyJournalReportApiArg = {
  bullyJournalReportCreateDto: BullyJournalReportCreateDto;
};
export type EditBullyJournalReportApiResponse = /** status 200 Success */ undefined;
export type EditBullyJournalReportApiArg = {
  bullyJournalReportEditDto: BullyJournalReportEditDto;
};
export type GetBullyJournalReportByIdApiResponse =
  /** status 200 Success */ BullyJournalReportDetailsDto;
export type GetBullyJournalReportByIdApiArg = {
  id: number;
};
export type DeleteBullyJournalReportApiResponse = /** status 204 No Content */ undefined;
export type DeleteBullyJournalReportApiArg = {
  id: number;
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
export type GetEventsByDateApiResponse = /** status 200 Success */ EventDto[];
export type GetEventsByDateApiArg = {
  start?: string;
  end?: string;
};
export type CreateEventApiResponse = /** status 201 Created */ EventDto;
export type CreateEventApiArg = {
  eventCreateDto: EventCreateDto;
};
export type DeleteEventApiResponse = /** status 204 No Content */ undefined;
export type DeleteEventApiArg = {
  id: string;
};
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
export type GetPublicMenusByLanguageApiResponse = /** status 200 Success */ MenuPublicDto[];
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
export type GetPublicPostByIdApiResponse = /** status 200 Success */ PostPublicDetailsDto;
export type GetPublicPostByIdApiArg = {
  id: number;
};
export type GetPublicPostByMenuLanguageAndPathApiResponse = /** status 200 Success */ PostDetailsDto;
export type GetPublicPostByMenuLanguageAndPathApiArg = {
  language: string;
  path: string;
};
export type GetPublicPostsByLanguageApiResponse = /** status 200 Success */ PostPublicDto[];
export type GetPublicPostsByLanguageApiArg = {
  language: string;
  items?: number;
  page?: number;
};
export type SearchPublicPostsApiResponse = /** status 200 Success */ PostPublicDtoPaginatedList;
export type SearchPublicPostsApiArg = {
  text: string;
  items?: number;
  page?: number;
};
export type GetClassroomsApiResponse = /** status 200 Success */ ClassroomDto[];
export type GetClassroomsApiArg = void;
export type CreateClassroomApiResponse = /** status 201 Created */ ClassroomDto;
export type CreateClassroomApiArg = {
  classroomCreateDto: ClassroomCreateDto;
};
export type EditClassroomApiResponse = /** status 200 Success */ undefined;
export type EditClassroomApiArg = {
  classroomEditDto: ClassroomEditDto;
};
export type GetClassroomByIdApiResponse = /** status 200 Success */ ClassroomDto;
export type GetClassroomByIdApiArg = {
  id: number;
};
export type DeleteClassroomApiResponse = /** status 204 No Content */ undefined;
export type DeleteClassroomApiArg = {
  id: number;
};
export type GetClasstimesApiResponse = /** status 200 Success */ ClasstimeDto[];
export type GetClasstimesApiArg = void;
export type CreateClasstimeApiResponse = /** status 201 Created */ ClasstimeDto;
export type CreateClasstimeApiArg = {
  classtimeCreateDto: ClasstimeCreateDto;
};
export type GetClasstimeByIdApiResponse = /** status 200 Success */ ClasstimeDto;
export type GetClasstimeByIdApiArg = {
  id: number;
};
export type DeleteClasstimeApiResponse = /** status 204 No Content */ undefined;
export type DeleteClasstimeApiArg = {
  id: number;
};
export type EditClasstimeApiResponse = /** status 200 Success */ undefined;
export type EditClasstimeApiArg = {
  classtimeEditDto: ClasstimeEditDto;
};
export type GetClassdaysApiResponse = /** status 200 Success */ ClassdayDto[];
export type GetClassdaysApiArg = void;
export type GetAnnouncementByIdApiResponse = /** status 200 Success */ AnnouncementDto;
export type GetAnnouncementByIdApiArg = {
  id: number;
};
export type DeleteAnnouncementApiResponse = /** status 204 No Content */ undefined;
export type DeleteAnnouncementApiArg = {
  id: number;
};
export type CreateAnnouncementApiResponse = /** status 201 Created */ AnnouncementDto;
export type CreateAnnouncementApiArg = {
  announcementCreateDto: AnnouncementCreateDto;
};
export type EditAnnouncementApiResponse = /** status 200 Success */ undefined;
export type EditAnnouncementApiArg = {
  announcementEditDto: AnnouncementEditDto;
};
export type GetAnnouncementsApiResponse = /** status 200 Success */ AnnouncementDtoPaginatedList;
export type GetAnnouncementsApiArg = {
  items?: number;
  page?: number;
};
export type GetPublicAnnouncementsApiResponse = /** status 200 Success */ AnnouncementDto[];
export type GetPublicAnnouncementsApiArg = void;
export type GetPublicRandomImageApiResponse = /** status 200 Success */ RandomImageDto;
export type GetPublicRandomImageApiArg = void;
export type GetTechJournalReportsApiResponse =
  /** status 200 Success */ TechJournalReportDtoPaginatedList;
export type GetTechJournalReportsApiArg = {
  items?: number;
  page?: number;
  start?: string;
  end?: string;
};
export type CreateTechJournalReportApiResponse = /** status 201 Created */ TechJournalReportDto;
export type CreateTechJournalReportApiArg = {
  techJournalReportCreateDto: TechJournalReportCreateDto;
};
export type EditTechJournalReportApiResponse = /** status 200 Success */ undefined;
export type EditTechJournalReportApiArg = {
  techJournalReportEditDto: TechJournalReportEditDto;
};
export type GetTechJournalReportByIdApiResponse = /** status 200 Success */ TechJournalReportDto;
export type GetTechJournalReportByIdApiArg = {
  id: number;
};
export type PatchTechJournalReportApiResponse = /** status 200 Success */ undefined;
export type PatchTechJournalReportApiArg = {
  id: number;
  techJournalReportPatchDto: TechJournalReportPatchDto;
};
export type DeleteTechJournalReportApiResponse = /** status 204 No Content */ undefined;
export type DeleteTechJournalReportApiArg = {
  id: number;
};
export type GetTimetableApiResponse = /** status 200 Success */ TimetableDtoPaginatedList;
export type GetTimetableApiArg = {
  items?: number;
  page?: number;
};
export type CreateTimetableApiResponse = /** status 201 Created */ TimetableDto;
export type CreateTimetableApiArg = {
  timetableCreateDto: TimetableCreateDto;
};
export type EditTimetableApiResponse = /** status 200 Success */ undefined;
export type EditTimetableApiArg = {
  timetableEditDto: TimetableEditDto;
};
export type GetTimetableByIdApiResponse = /** status 200 Success */ TimetableDto;
export type GetTimetableByIdApiArg = {
  id: number;
};
export type DeleteTimetableApiResponse = /** status 204 No Content */ undefined;
export type DeleteTimetableApiArg = {
  id: number;
};
export type ImportTimetableApiResponse = /** status 201 Created */ undefined;
export type ImportTimetableApiArg = {
  timetableImportDto: TimetableImportDto;
};
export type DeleteTimetableDayApiResponse = unknown;
export type DeleteTimetableDayApiArg = {
  timetableDeleteDayDto: TimetableDeleteDayDto;
};
export type GetPublicTimetableApiResponse = /** status 200 Success */ TimetablePublicDto;
export type GetPublicTimetableApiArg = void;
export type AccomplishmentTeacherDto = {
  id: number;
  name: string;
};
export type ClassroomDto = {
  id: number;
  name: string;
  number: number;
};
export type AccomplishmentAchievementDto = {
  id: number;
  name: string;
};
export type AccomplishmentStudentDto = {
  id: number;
  name: string;
  classroom: ClassroomDto;
  achievement: AccomplishmentAchievementDto;
};
export type AccomplishmentDto = {
  id: number;
  name: string;
  date: string;
  teacherDisplayName: string;
  userId: number;
  scale: string;
  additionalTeachers: AccomplishmentTeacherDto[];
  students: AccomplishmentStudentDto[];
};
export type AccomplishmentScaleDto = {
  id: number;
  name: string;
};
export type AccomplishmentDtoPaginatedList = {
  items: AccomplishmentDto[];
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
export type AccomplishmentCreateTeacherDto = {
  name: string;
};
export type AccomplishmentCreateStudentDto = {
  classroomId: number;
  achievementId: number;
  name: string;
};
export type AccomplishmentCreateDto = {
  name: string;
  date: string;
  scaleId: number;
  additionalTeachers: AccomplishmentCreateTeacherDto[];
  students: AccomplishmentCreateStudentDto[];
};
export type AccomplishmentEditDto = {
  name: string;
  date: string;
  scaleId: number;
  additionalTeachers: AccomplishmentCreateTeacherDto[];
  students: AccomplishmentCreateStudentDto[];
  id: number;
};
export type AccomplishmentDetailsDto = {
  id: number;
  name: string;
  date: string;
  userId: number;
  scaleId: number;
  additionalTeachers: AccomplishmentTeacherDto[];
  students: AccomplishmentStudentDto[];
};
export type AppointmentTypeDto = {
  id: number;
  name: string;
  slug: string;
  durationInMinutes: number;
  invitePrincipal: boolean;
  isPublic: boolean;
  isOnline: boolean;
  registrationEnd: string;
};
export type AppointmentDateDetailsDto = {
  id: number;
  date: string;
  type: AppointmentTypeDto;
};
export type AppointmentDetailsDto = {
  id: number;
  eventId: string;
  eventMeetingLink: string;
  dateId: number;
  userName: string;
  userDisplayName: string;
  attendeeName: string;
  attendeeEmail: string;
  date: AppointmentDateDetailsDto;
};
export type AppointmentDetailsDtoPaginatedList = {
  items: AppointmentDetailsDto[];
  pageNumber: number;
  totalPages: number;
  totalCount: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
};
export type AppointmentDto = {
  id: number;
  eventId: string;
  dateId: number;
  userName: string;
  attendeeName: string;
  attendeeEmail: string;
};
export type AppointmentCreateDto = {
  dateId: number;
  userName: string;
};
export type AppointmentHostDto = {
  displayName: string;
  userName: string;
};
export type AppointmentDateDto = {
  id: number;
  date: string;
};
export type AppointmentTypeEditDto = {
  name: string;
  slug: string;
  durationInMinutes: number;
  invitePrincipal: boolean;
  isPublic: boolean;
  isOnline: boolean;
  registrationEnd: string;
  id: number;
};
export type AppointmentTypeCreateDto = {
  name: string;
  slug: string;
  durationInMinutes: number;
  invitePrincipal: boolean;
  isPublic: boolean;
  isOnline: boolean;
  registrationEnd: string;
};
export type AppointmentExclusiveHostDto = {
  id: number;
  typeId: number;
  userName: string;
};
export type AppointmentExclusiveHostCreateDto = {
  typeId: number;
  userName: string;
};
export type AppointmentDateCreateDto = {
  typeId: number;
  date: string;
};
export type AppointmentReservedDateDto = {
  id: number;
  dateId: number;
};
export type AppointmentReservedDateCreateDto = {
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
  id: number;
  token: string;
  displayName: string;
  email: string;
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
export type BannerPublicDto = {
  id: number;
  title: string;
  url: string;
  width: number;
  height: number;
  pictureUrl: string;
};
export type BullyJournalReportDto = {
  id: number;
  userId: number;
  userDisplayName: string;
  bullyInfo: string;
  victimInfo: string;
  date: string;
};
export type BullyJournalReportDtoPaginatedList = {
  items: BullyJournalReportDto[];
  pageNumber: number;
  totalPages: number;
  totalCount: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
};
export type BullyJournalReportDetailsDto = {
  id: number;
  userId: number;
  userDisplayName: string;
  bullyInfo: string;
  victimInfo: string;
  date: string;
  details: string;
  actions: string;
};
export type BullyJournalReportCreateDto = {
  bullyInfo: string;
  victimInfo: string;
  details: string;
  actions: string;
  date: string;
};
export type BullyJournalReportEditDto = {
  bullyInfo: string;
  victimInfo: string;
  details: string;
  actions: string;
  date: string;
  id: number;
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
export type EventCreateDto = {
  title: string;
  startDate: string;
  endDate: string;
  allDay: boolean;
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
export type MenuPublicDto = {
  id: number;
  url?: string | null;
  title: string;
  slug: string;
  position: string;
  path: string;
  parentMenuId?: number | null;
  childMenus: MenuPublicDto[];
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
export type PostPublicDetailsDto = {
  id: number;
  publishedAt: string;
  modifiedAt?: string | null;
  slug: string;
  title: string;
  introText?: string | null;
  featuredImage?: string | null;
  images?: string[] | null;
  meta?: string | null;
  text?: string | null;
};
export type PostPublicDto = {
  id: number;
  publishedAt: string;
  modifiedAt?: string | null;
  slug: string;
  title: string;
  introText?: string | null;
  featuredImage?: string | null;
};
export type PostPublicDtoPaginatedList = {
  items: PostPublicDto[];
  pageNumber: number;
  totalPages: number;
  totalCount: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
};
export type ClassroomCreateDto = {
  name: string;
  number: number;
};
export type ClassroomEditDto = {
  name: string;
  number: number;
  id: number;
};
export type ClasstimeDto = {
  id: number;
  number: number;
  startTime: string;
  endTime: string;
};
export type ClasstimeCreateDto = {
  number: number;
  startTime: string;
  endTime: string;
};
export type ClasstimeEditDto = {
  number: number;
  startTime: string;
  endTime: string;
  id: number;
};
export type ClassdayDto = {
  id: number;
  name: string;
  number: number;
};
export type AnnouncementDto = {
  id: number;
  title: string;
  startTime: string;
  endTime: string;
};
export type AnnouncementCreateDto = {
  title: string;
  startTime: string;
  endTime: string;
};
export type AnnouncementEditDto = {
  title: string;
  startTime: string;
  endTime: string;
  id: number;
};
export type AnnouncementDtoPaginatedList = {
  items: AnnouncementDto[];
  pageNumber: number;
  totalPages: number;
  totalCount: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
};
export type RandomImageDto = {
  url: string;
};
export type TechJournalReportDto = {
  id: number;
  userId: number;
  userDisplayName: string;
  isFixed?: boolean | null;
  place: string;
  fixDate?: string | null;
  reportDate: string;
  notes?: string | null;
  details: string;
};
export type TechJournalReportDtoPaginatedList = {
  items: TechJournalReportDto[];
  pageNumber: number;
  totalPages: number;
  totalCount: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
};
export type TechJournalReportCreateDto = {
  place: string;
  details: string;
};
export type TechJournalReportEditDto = {
  place: string;
  details: string;
  id: number;
};
export type TechJournalReportPatchDto = {
  isFixed?: boolean | null;
  notes?: string | null;
};
export type TimetableDto = {
  id: number;
  day: ClassdayDto;
  room: ClassroomDto;
  time: ClasstimeDto;
  className: string;
};
export type TimetableDtoPaginatedList = {
  items: TimetableDto[];
  pageNumber: number;
  totalPages: number;
  totalCount: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
};
export type TimetableCreateDto = {
  dayId: number;
  timeId: number;
  roomId: number;
  className: string;
};
export type TimetableEditDto = {
  dayId: number;
  timeId: number;
  roomId: number;
  className: string;
  id: number;
};
export type TimetableImportDto = {
  timetableList: TimetableCreateDto[];
};
export type TimetableDeleteDayDto = {
  dayIds: number[];
};
export type TimetableSimpleDto = {
  id: number;
  classRoom: string;
  className: string;
};
export type ClasstimeSimpleDto = {
  number: number;
  startTime: string;
  endTime: string;
};
export type TimetablePublicDto = {
  timetable: TimetableSimpleDto[];
  classtime: ClasstimeSimpleDto;
  currentTime: string;
};
