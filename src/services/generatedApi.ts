import { baseApi as api } from "./baseApi";
export const addTagTypes = [
  "Accomplishment",
  "Appointments",
  "Auth",
  "Banners",
  "BullyJournal",
  "BullyReports",
  "Courses",
  "Employees",
  "Events",
  "Languages",
  "Menus",
  "Meta",
  "ObservationLessons",
  "ObservationTargets",
  "ObservationTypes",
  "Posts",
  "School",
  "StudentObservation",
  "TechJournal",
  "Timetable",
] as const;
const injectedRtkApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (build) => ({
      getAccomplishmentsByDate: build.query<
        GetAccomplishmentsByDateApiResponse,
        GetAccomplishmentsByDateApiArg
      >({
        query: (queryArg) => ({
          url: `/accomplishment/all`,
          params: {
            start: queryArg.start,
            end: queryArg.end,
          },
        }),
        providesTags: ["Accomplishment"],
      }),
      getAccomplishmentScales: build.query<
        GetAccomplishmentScalesApiResponse,
        GetAccomplishmentScalesApiArg
      >({
        query: () => ({ url: `/accomplishment/scales` }),
        providesTags: ["Accomplishment"],
      }),
      getAccomplishmentAchievements: build.query<
        GetAccomplishmentAchievementsApiResponse,
        GetAccomplishmentAchievementsApiArg
      >({
        query: () => ({ url: `/accomplishment/achievements` }),
        providesTags: ["Accomplishment"],
      }),
      getMyAccomplishments: build.query<
        GetMyAccomplishmentsApiResponse,
        GetMyAccomplishmentsApiArg
      >({
        query: (queryArg) => ({
          url: `/accomplishment`,
          params: {
            Items: queryArg.items,
            Page: queryArg.page,
          },
        }),
        providesTags: ["Accomplishment"],
      }),
      createAccomplishment: build.mutation<
        CreateAccomplishmentApiResponse,
        CreateAccomplishmentApiArg
      >({
        query: (queryArg) => ({
          url: `/accomplishment`,
          method: "POST",
          body: queryArg.accomplishmentCreateDto,
        }),
        invalidatesTags: ["Accomplishment"],
      }),
      editAccomplishment: build.mutation<
        EditAccomplishmentApiResponse,
        EditAccomplishmentApiArg
      >({
        query: (queryArg) => ({
          url: `/accomplishment`,
          method: "PUT",
          body: queryArg.accomplishmentEditDto,
        }),
        invalidatesTags: ["Accomplishment"],
      }),
      getAccomplishmentById: build.query<
        GetAccomplishmentByIdApiResponse,
        GetAccomplishmentByIdApiArg
      >({
        query: (queryArg) => ({ url: `/accomplishment/${queryArg.id}` }),
        providesTags: ["Accomplishment"],
      }),
      deleteAccomplishment: build.mutation<
        DeleteAccomplishmentApiResponse,
        DeleteAccomplishmentApiArg
      >({
        query: (queryArg) => ({
          url: `/accomplishment/${queryArg.id}`,
          method: "DELETE",
        }),
        invalidatesTags: ["Accomplishment"],
      }),
      getMyAppointments: build.query<
        GetMyAppointmentsApiResponse,
        GetMyAppointmentsApiArg
      >({
        query: (queryArg) => ({
          url: `/appointments/my/appointments/${queryArg.typeSlug}`,
          params: {
            Items: queryArg.items,
            Page: queryArg.page,
          },
        }),
        providesTags: ["Appointments"],
      }),
      getMyRegistrations: build.query<
        GetMyRegistrationsApiResponse,
        GetMyRegistrationsApiArg
      >({
        query: (queryArg) => ({
          url: `/appointments/my/registrations/${queryArg.typeSlug}`,
          params: {
            Items: queryArg.items,
            Page: queryArg.page,
          },
        }),
        providesTags: ["Appointments"],
      }),
      createAppointment: build.mutation<
        CreateAppointmentApiResponse,
        CreateAppointmentApiArg
      >({
        query: (queryArg) => ({
          url: `/appointments/create`,
          method: "POST",
          body: queryArg.appointmentCreateDto,
        }),
        invalidatesTags: ["Appointments"],
      }),
      deleteAppointment: build.mutation<
        DeleteAppointmentApiResponse,
        DeleteAppointmentApiArg
      >({
        query: (queryArg) => ({
          url: `/appointments/${queryArg.id}`,
          method: "DELETE",
        }),
        invalidatesTags: ["Appointments"],
      }),
      getAppointmentById: build.query<
        GetAppointmentByIdApiResponse,
        GetAppointmentByIdApiArg
      >({
        query: (queryArg) => ({ url: `/appointments/${queryArg.id}` }),
        providesTags: ["Appointments"],
      }),
      getAppointmentAvailableHosts: build.query<
        GetAppointmentAvailableHostsApiResponse,
        GetAppointmentAvailableHostsApiArg
      >({
        query: (queryArg) => ({
          url: `/appointments/hosts/available/${queryArg.typeSlug}`,
        }),
        providesTags: ["Appointments"],
      }),
      getAppointmentAvailableDates: build.query<
        GetAppointmentAvailableDatesApiResponse,
        GetAppointmentAvailableDatesApiArg
      >({
        query: (queryArg) => ({
          url: `/appointments/dates/available/${queryArg.typeSlug}/${queryArg.userName}`,
        }),
        providesTags: ["Appointments"],
      }),
      getAllAppointments: build.query<
        GetAllAppointmentsApiResponse,
        GetAllAppointmentsApiArg
      >({
        query: (queryArg) => ({
          url: `/appointments`,
          params: {
            Items: queryArg.items,
            Page: queryArg.page,
            query: queryArg.query,
          },
        }),
        providesTags: ["Appointments"],
      }),
      deleteAppointmentType: build.mutation<
        DeleteAppointmentTypeApiResponse,
        DeleteAppointmentTypeApiArg
      >({
        query: (queryArg) => ({
          url: `/appointments/types/${queryArg.id}`,
          method: "DELETE",
        }),
        invalidatesTags: ["Appointments"],
      }),
      getAppointmentTypeById: build.query<
        GetAppointmentTypeByIdApiResponse,
        GetAppointmentTypeByIdApiArg
      >({
        query: (queryArg) => ({ url: `/appointments/types/${queryArg.id}` }),
        providesTags: ["Appointments"],
      }),
      resetAppointmentType: build.mutation<
        ResetAppointmentTypeApiResponse,
        ResetAppointmentTypeApiArg
      >({
        query: (queryArg) => ({
          url: `/appointments/types/reset/${queryArg.id}`,
          method: "POST",
        }),
        invalidatesTags: ["Appointments"],
      }),
      editAppointmentType: build.mutation<
        EditAppointmentTypeApiResponse,
        EditAppointmentTypeApiArg
      >({
        query: (queryArg) => ({
          url: `/appointments/types`,
          method: "PUT",
          body: queryArg.appointmentTypeEditDto,
        }),
        invalidatesTags: ["Appointments"],
      }),
      getAppointmentTypes: build.query<
        GetAppointmentTypesApiResponse,
        GetAppointmentTypesApiArg
      >({
        query: () => ({ url: `/appointments/types` }),
        providesTags: ["Appointments"],
      }),
      createAppointmentType: build.mutation<
        CreateAppointmentTypeApiResponse,
        CreateAppointmentTypeApiArg
      >({
        query: (queryArg) => ({
          url: `/appointments/types`,
          method: "POST",
          body: queryArg.appointmentTypeCreateDto,
        }),
        invalidatesTags: ["Appointments"],
      }),
      createAppointmentHost: build.mutation<
        CreateAppointmentHostApiResponse,
        CreateAppointmentHostApiArg
      >({
        query: (queryArg) => ({
          url: `/appointments/hosts`,
          method: "POST",
          body: queryArg.appointmentExclusiveHostCreateDto,
        }),
        invalidatesTags: ["Appointments"],
      }),
      deleteAppointmentHost: build.mutation<
        DeleteAppointmentHostApiResponse,
        DeleteAppointmentHostApiArg
      >({
        query: (queryArg) => ({
          url: `/appointments/hosts/${queryArg.id}`,
          method: "DELETE",
        }),
        invalidatesTags: ["Appointments"],
      }),
      getAppointmentHosts: build.query<
        GetAppointmentHostsApiResponse,
        GetAppointmentHostsApiArg
      >({
        query: (queryArg) => ({
          url: `/appointments/hosts/${queryArg.typeId}`,
        }),
        providesTags: ["Appointments"],
      }),
      createAppointmentDate: build.mutation<
        CreateAppointmentDateApiResponse,
        CreateAppointmentDateApiArg
      >({
        query: (queryArg) => ({
          url: `/appointments/dates`,
          method: "POST",
          body: queryArg.appointmentDateCreateDto,
        }),
        invalidatesTags: ["Appointments"],
      }),
      deleteAppointmentDate: build.mutation<
        DeleteAppointmentDateApiResponse,
        DeleteAppointmentDateApiArg
      >({
        query: (queryArg) => ({
          url: `/appointments/dates/${queryArg.id}`,
          method: "DELETE",
        }),
        invalidatesTags: ["Appointments"],
      }),
      getAppointmentDates: build.query<
        GetAppointmentDatesApiResponse,
        GetAppointmentDatesApiArg
      >({
        query: (queryArg) => ({
          url: `/appointments/dates/${queryArg.typeId}`,
        }),
        providesTags: ["Appointments"],
      }),
      getAppointmentReservedDates: build.query<
        GetAppointmentReservedDatesApiResponse,
        GetAppointmentReservedDatesApiArg
      >({
        query: (queryArg) => ({
          url: `/appointments/dates/reserved/${queryArg.userName}`,
        }),
        providesTags: ["Appointments"],
      }),
      createAppointmentReservedDate: build.mutation<
        CreateAppointmentReservedDateApiResponse,
        CreateAppointmentReservedDateApiArg
      >({
        query: (queryArg) => ({
          url: `/appointments/dates/reserved`,
          method: "POST",
          body: queryArg.appointmentReservedDateCreateDto,
        }),
        invalidatesTags: ["Appointments"],
      }),
      deleteAppointmentReservedDate: build.mutation<
        DeleteAppointmentReservedDateApiResponse,
        DeleteAppointmentReservedDateApiArg
      >({
        query: (queryArg) => ({
          url: `/appointments/dates/reserved/${queryArg.id}`,
          method: "DELETE",
        }),
        invalidatesTags: ["Appointments"],
      }),
      getPublicAppointmentAvailableHosts: build.query<
        GetPublicAppointmentAvailableHostsApiResponse,
        GetPublicAppointmentAvailableHostsApiArg
      >({
        query: (queryArg) => ({
          url: `/appointments/public/hosts/available/${queryArg.typeSlug}`,
        }),
        providesTags: ["Appointments"],
      }),
      getPublicAppointmentAvailableDates: build.query<
        GetPublicAppointmentAvailableDatesApiResponse,
        GetPublicAppointmentAvailableDatesApiArg
      >({
        query: (queryArg) => ({
          url: `/appointments/public/dates/available/${queryArg.typeSlug}/${queryArg.userName}`,
        }),
        providesTags: ["Appointments"],
      }),
      createPublicAppointment: build.mutation<
        CreatePublicAppointmentApiResponse,
        CreatePublicAppointmentApiArg
      >({
        query: (queryArg) => ({
          url: `/appointments/public/create`,
          method: "POST",
          body: queryArg.appointmentPublicCreateDto,
        }),
        invalidatesTags: ["Appointments"],
      }),
      authorize: build.mutation<AuthorizeApiResponse, AuthorizeApiArg>({
        query: (queryArg) => ({
          url: `/auth/authorize`,
          method: "POST",
          body: queryArg.googleAuthDto,
        }),
        invalidatesTags: ["Auth"],
      }),
      getBanners: build.query<GetBannersApiResponse, GetBannersApiArg>({
        query: (queryArg) => ({
          url: `/banners`,
          params: {
            Items: queryArg.items,
            Page: queryArg.page,
          },
        }),
        providesTags: ["Banners"],
      }),
      createBanner: build.mutation<CreateBannerApiResponse, CreateBannerApiArg>(
        {
          query: (queryArg) => ({
            url: `/banners`,
            method: "POST",
            body: queryArg.body,
          }),
          invalidatesTags: ["Banners"],
        },
      ),
      editBanner: build.mutation<EditBannerApiResponse, EditBannerApiArg>({
        query: (queryArg) => ({
          url: `/banners`,
          method: "PUT",
          body: queryArg.body,
        }),
        invalidatesTags: ["Banners"],
      }),
      getBannerById: build.query<GetBannerByIdApiResponse, GetBannerByIdApiArg>(
        {
          query: (queryArg) => ({ url: `/banners/${queryArg.id}` }),
          providesTags: ["Banners"],
        },
      ),
      deleteBanner: build.mutation<DeleteBannerApiResponse, DeleteBannerApiArg>(
        {
          query: (queryArg) => ({
            url: `/banners/${queryArg.id}`,
            method: "DELETE",
          }),
          invalidatesTags: ["Banners"],
        },
      ),
      searchBanners: build.query<SearchBannersApiResponse, SearchBannersApiArg>(
        {
          query: (queryArg) => ({
            url: `/banners/search/${queryArg.text}`,
            params: {
              Items: queryArg.items,
              Page: queryArg.page,
            },
          }),
          providesTags: ["Banners"],
        },
      ),
      getPublicBannersByLanguage: build.query<
        GetPublicBannersByLanguageApiResponse,
        GetPublicBannersByLanguageApiArg
      >({
        query: (queryArg) => ({ url: `/banners/public/${queryArg.language}` }),
        providesTags: ["Banners"],
      }),
      getBullyJournalReports: build.query<
        GetBullyJournalReportsApiResponse,
        GetBullyJournalReportsApiArg
      >({
        query: (queryArg) => ({
          url: `/bullyjournal`,
          params: {
            Items: queryArg.items,
            Page: queryArg.page,
          },
        }),
        providesTags: ["BullyJournal"],
      }),
      createBullyJournalReport: build.mutation<
        CreateBullyJournalReportApiResponse,
        CreateBullyJournalReportApiArg
      >({
        query: (queryArg) => ({
          url: `/bullyjournal`,
          method: "POST",
          body: queryArg.bullyJournalReportCreateDto,
        }),
        invalidatesTags: ["BullyJournal"],
      }),
      editBullyJournalReport: build.mutation<
        EditBullyJournalReportApiResponse,
        EditBullyJournalReportApiArg
      >({
        query: (queryArg) => ({
          url: `/bullyjournal`,
          method: "PUT",
          body: queryArg.bullyJournalReportEditDto,
        }),
        invalidatesTags: ["BullyJournal"],
      }),
      getBullyJournalReportById: build.query<
        GetBullyJournalReportByIdApiResponse,
        GetBullyJournalReportByIdApiArg
      >({
        query: (queryArg) => ({ url: `/bullyjournal/${queryArg.id}` }),
        providesTags: ["BullyJournal"],
      }),
      deleteBullyJournalReport: build.mutation<
        DeleteBullyJournalReportApiResponse,
        DeleteBullyJournalReportApiArg
      >({
        query: (queryArg) => ({
          url: `/bullyjournal/${queryArg.id}`,
          method: "DELETE",
        }),
        invalidatesTags: ["BullyJournal"],
      }),
      getBullyReports: build.query<
        GetBullyReportsApiResponse,
        GetBullyReportsApiArg
      >({
        query: (queryArg) => ({
          url: `/bullyreports`,
          params: {
            Items: queryArg.items,
            Page: queryArg.page,
          },
        }),
        providesTags: ["BullyReports"],
      }),
      getBullyReportById: build.query<
        GetBullyReportByIdApiResponse,
        GetBullyReportByIdApiArg
      >({
        query: (queryArg) => ({ url: `/bullyreports/${queryArg.id}` }),
        providesTags: ["BullyReports"],
      }),
      deleteBullyReport: build.mutation<
        DeleteBullyReportApiResponse,
        DeleteBullyReportApiArg
      >({
        query: (queryArg) => ({
          url: `/bullyreports/${queryArg.id}`,
          method: "DELETE",
        }),
        invalidatesTags: ["BullyReports"],
      }),
      createPublicBullyReport: build.mutation<
        CreatePublicBullyReportApiResponse,
        CreatePublicBullyReportApiArg
      >({
        query: (queryArg) => ({
          url: `/bullyreports/public`,
          method: "POST",
          body: queryArg.bullyReportCreateDto,
        }),
        invalidatesTags: ["BullyReports"],
      }),
      getCoursesStatsByDate: build.query<
        GetCoursesStatsByDateApiResponse,
        GetCoursesStatsByDateApiArg
      >({
        query: (queryArg) => ({
          url: `/courses/stats`,
          params: {
            start: queryArg.start,
            end: queryArg.end,
          },
        }),
        providesTags: ["Courses"],
      }),
      getTeacherCoursesByIdAndDate: build.query<
        GetTeacherCoursesByIdAndDateApiResponse,
        GetTeacherCoursesByIdAndDateApiArg
      >({
        query: (queryArg) => ({
          url: `/courses/teacher/${queryArg.id}`,
          params: {
            start: queryArg.start,
            end: queryArg.end,
          },
        }),
        providesTags: ["Courses"],
      }),
      getMyCourses: build.query<GetMyCoursesApiResponse, GetMyCoursesApiArg>({
        query: (queryArg) => ({
          url: `/courses`,
          params: {
            Items: queryArg.items,
            Page: queryArg.page,
          },
        }),
        providesTags: ["Courses"],
      }),
      createCourse: build.mutation<CreateCourseApiResponse, CreateCourseApiArg>(
        {
          query: (queryArg) => ({
            url: `/courses`,
            method: "POST",
            body: queryArg.courseCreateDto,
          }),
          invalidatesTags: ["Courses"],
        },
      ),
      editCourse: build.mutation<EditCourseApiResponse, EditCourseApiArg>({
        query: (queryArg) => ({
          url: `/courses`,
          method: "PUT",
          body: queryArg.courseEditDto,
        }),
        invalidatesTags: ["Courses"],
      }),
      getCourseById: build.query<GetCourseByIdApiResponse, GetCourseByIdApiArg>(
        {
          query: (queryArg) => ({ url: `/courses/${queryArg.id}` }),
          providesTags: ["Courses"],
        },
      ),
      deleteCourse: build.mutation<DeleteCourseApiResponse, DeleteCourseApiArg>(
        {
          query: (queryArg) => ({
            url: `/courses/${queryArg.id}`,
            method: "DELETE",
          }),
          invalidatesTags: ["Courses"],
        },
      ),
      getTeachers: build.query<GetTeachersApiResponse, GetTeachersApiArg>({
        query: () => ({ url: `/employees/teachers` }),
        providesTags: ["Employees"],
      }),
      getEventsByDate: build.query<
        GetEventsByDateApiResponse,
        GetEventsByDateApiArg
      >({
        query: (queryArg) => ({
          url: `/events`,
          params: {
            start: queryArg.start,
            end: queryArg.end,
          },
        }),
        providesTags: ["Events"],
      }),
      createEvent: build.mutation<CreateEventApiResponse, CreateEventApiArg>({
        query: (queryArg) => ({
          url: `/events`,
          method: "POST",
          body: queryArg.eventCreateDto,
        }),
        invalidatesTags: ["Events"],
      }),
      deleteEvent: build.mutation<DeleteEventApiResponse, DeleteEventApiArg>({
        query: (queryArg) => ({
          url: `/events/${queryArg.id}`,
          method: "DELETE",
        }),
        invalidatesTags: ["Events"],
      }),
      getPublicEvents: build.query<
        GetPublicEventsApiResponse,
        GetPublicEventsApiArg
      >({
        query: (queryArg) => ({ url: `/events/public/${queryArg.week}` }),
        providesTags: ["Events"],
      }),
      getPublicDayEvents: build.query<
        GetPublicDayEventsApiResponse,
        GetPublicDayEventsApiArg
      >({
        query: () => ({ url: `/events/public/today` }),
        providesTags: ["Events"],
      }),
      getPublicLanguages: build.query<
        GetPublicLanguagesApiResponse,
        GetPublicLanguagesApiArg
      >({
        query: () => ({ url: `/languages/public` }),
        providesTags: ["Languages"],
      }),
      getMenus: build.query<GetMenusApiResponse, GetMenusApiArg>({
        query: (queryArg) => ({
          url: `/menus`,
          params: {
            Items: queryArg.items,
            Page: queryArg.page,
          },
        }),
        providesTags: ["Menus"],
      }),
      createMenu: build.mutation<CreateMenuApiResponse, CreateMenuApiArg>({
        query: (queryArg) => ({
          url: `/menus`,
          method: "POST",
          body: queryArg.menuCreateDto,
        }),
        invalidatesTags: ["Menus"],
      }),
      editMenu: build.mutation<EditMenuApiResponse, EditMenuApiArg>({
        query: (queryArg) => ({
          url: `/menus`,
          method: "PUT",
          body: queryArg.menuEditDto,
        }),
        invalidatesTags: ["Menus"],
      }),
      getMenuLocations: build.query<
        GetMenuLocationsApiResponse,
        GetMenuLocationsApiArg
      >({
        query: () => ({ url: `/menus/locations` }),
        providesTags: ["Menus"],
      }),
      getMenuById: build.query<GetMenuByIdApiResponse, GetMenuByIdApiArg>({
        query: (queryArg) => ({ url: `/menus/${queryArg.id}` }),
        providesTags: ["Menus"],
      }),
      deleteMenu: build.mutation<DeleteMenuApiResponse, DeleteMenuApiArg>({
        query: (queryArg) => ({
          url: `/menus/${queryArg.id}`,
          method: "DELETE",
        }),
        invalidatesTags: ["Menus"],
      }),
      searchMenus: build.query<SearchMenusApiResponse, SearchMenusApiArg>({
        query: (queryArg) => ({
          url: `/menus/search/${queryArg.text}`,
          params: {
            Items: queryArg.items,
            Page: queryArg.page,
          },
        }),
        providesTags: ["Menus"],
      }),
      getPublicMenusByLanguage: build.query<
        GetPublicMenusByLanguageApiResponse,
        GetPublicMenusByLanguageApiArg
      >({
        query: (queryArg) => ({ url: `/menus/public/${queryArg.language}` }),
        providesTags: ["Menus"],
      }),
      getMenusMeta: build.query<GetMenusMetaApiResponse, GetMenusMetaApiArg>({
        query: () => ({ url: `/meta/menus` }),
        providesTags: ["Meta"],
      }),
      getPostsMeta: build.query<GetPostsMetaApiResponse, GetPostsMetaApiArg>({
        query: () => ({ url: `/meta/posts` }),
        providesTags: ["Meta"],
      }),
      getLocalesMeta: build.query<
        GetLocalesMetaApiResponse,
        GetLocalesMetaApiArg
      >({
        query: () => ({ url: `/meta/locales` }),
        providesTags: ["Meta"],
      }),
      getObservationLessons: build.query<
        GetObservationLessonsApiResponse,
        GetObservationLessonsApiArg
      >({
        query: () => ({ url: `/studentobservation/lessons` }),
        providesTags: ["ObservationLessons"],
      }),
      createObservationLesson: build.mutation<
        CreateObservationLessonApiResponse,
        CreateObservationLessonApiArg
      >({
        query: (queryArg) => ({
          url: `/studentobservation/lessons`,
          method: "POST",
          body: queryArg.observationLessonCreateDto,
        }),
        invalidatesTags: ["ObservationLessons"],
      }),
      editObservationLesson: build.mutation<
        EditObservationLessonApiResponse,
        EditObservationLessonApiArg
      >({
        query: (queryArg) => ({
          url: `/studentobservation/lessons`,
          method: "PUT",
          body: queryArg.observationLessonEditDto,
        }),
        invalidatesTags: ["ObservationLessons"],
      }),
      getObservationLessonById: build.query<
        GetObservationLessonByIdApiResponse,
        GetObservationLessonByIdApiArg
      >({
        query: (queryArg) => ({
          url: `/studentobservation/lessons/${queryArg.id}`,
        }),
        providesTags: ["ObservationLessons"],
      }),
      deleteObservationLesson: build.mutation<
        DeleteObservationLessonApiResponse,
        DeleteObservationLessonApiArg
      >({
        query: (queryArg) => ({
          url: `/studentobservation/lessons/${queryArg.id}`,
          method: "DELETE",
        }),
        invalidatesTags: ["ObservationLessons"],
      }),
      getObservationTargets: build.query<
        GetObservationTargetsApiResponse,
        GetObservationTargetsApiArg
      >({
        query: (queryArg) => ({
          url: `/studentobservation/targets`,
          params: {
            enabledOnly: queryArg.enabledOnly,
          },
        }),
        providesTags: ["ObservationTargets"],
      }),
      createObservationTarget: build.mutation<
        CreateObservationTargetApiResponse,
        CreateObservationTargetApiArg
      >({
        query: (queryArg) => ({
          url: `/studentobservation/targets`,
          method: "POST",
          body: queryArg.observationTargetCreateDto,
        }),
        invalidatesTags: ["ObservationTargets"],
      }),
      editObservationTarget: build.mutation<
        EditObservationTargetApiResponse,
        EditObservationTargetApiArg
      >({
        query: (queryArg) => ({
          url: `/studentobservation/targets`,
          method: "PUT",
          body: queryArg.observationTargetEditDto,
        }),
        invalidatesTags: ["ObservationTargets"],
      }),
      getObservationTargetById: build.query<
        GetObservationTargetByIdApiResponse,
        GetObservationTargetByIdApiArg
      >({
        query: (queryArg) => ({
          url: `/studentobservation/targets/${queryArg.id}`,
        }),
        providesTags: ["ObservationTargets"],
      }),
      deleteObservationTarget: build.mutation<
        DeleteObservationTargetApiResponse,
        DeleteObservationTargetApiArg
      >({
        query: (queryArg) => ({
          url: `/studentobservation/targets/${queryArg.id}`,
          method: "DELETE",
        }),
        invalidatesTags: ["ObservationTargets"],
      }),
      getObservationTypes: build.query<
        GetObservationTypesApiResponse,
        GetObservationTypesApiArg
      >({
        query: () => ({ url: `/studentobservation/types` }),
        providesTags: ["ObservationTypes"],
      }),
      createObservationType: build.mutation<
        CreateObservationTypeApiResponse,
        CreateObservationTypeApiArg
      >({
        query: (queryArg) => ({
          url: `/studentobservation/types`,
          method: "POST",
          body: queryArg.observationTypeCreateDto,
        }),
        invalidatesTags: ["ObservationTypes"],
      }),
      editObservationType: build.mutation<
        EditObservationTypeApiResponse,
        EditObservationTypeApiArg
      >({
        query: (queryArg) => ({
          url: `/studentobservation/types`,
          method: "PUT",
          body: queryArg.observationTypeEditDto,
        }),
        invalidatesTags: ["ObservationTypes"],
      }),
      getObservationTypeById: build.query<
        GetObservationTypeByIdApiResponse,
        GetObservationTypeByIdApiArg
      >({
        query: (queryArg) => ({
          url: `/studentobservation/types/${queryArg.id}`,
        }),
        providesTags: ["ObservationTypes"],
      }),
      deleteObservationType: build.mutation<
        DeleteObservationTypeApiResponse,
        DeleteObservationTypeApiArg
      >({
        query: (queryArg) => ({
          url: `/studentobservation/types/${queryArg.id}`,
          method: "DELETE",
        }),
        invalidatesTags: ["ObservationTypes"],
      }),
      getPosts: build.query<GetPostsApiResponse, GetPostsApiArg>({
        query: (queryArg) => ({
          url: `/posts`,
          params: {
            Items: queryArg.items,
            Page: queryArg.page,
          },
        }),
        providesTags: ["Posts"],
      }),
      createPost: build.mutation<CreatePostApiResponse, CreatePostApiArg>({
        query: (queryArg) => ({
          url: `/posts`,
          method: "POST",
          body: queryArg.body,
        }),
        invalidatesTags: ["Posts"],
      }),
      editPost: build.mutation<EditPostApiResponse, EditPostApiArg>({
        query: (queryArg) => ({
          url: `/posts`,
          method: "PUT",
          body: queryArg.body,
        }),
        invalidatesTags: ["Posts"],
      }),
      getPostById: build.query<GetPostByIdApiResponse, GetPostByIdApiArg>({
        query: (queryArg) => ({ url: `/posts/${queryArg.id}` }),
        providesTags: ["Posts"],
      }),
      patchPost: build.mutation<PatchPostApiResponse, PatchPostApiArg>({
        query: (queryArg) => ({
          url: `/posts/${queryArg.id}`,
          method: "PATCH",
          body: queryArg.postPatchDto,
        }),
        invalidatesTags: ["Posts"],
      }),
      deletePost: build.mutation<DeletePostApiResponse, DeletePostApiArg>({
        query: (queryArg) => ({
          url: `/posts/${queryArg.id}`,
          method: "DELETE",
        }),
        invalidatesTags: ["Posts"],
      }),
      searchPosts: build.query<SearchPostsApiResponse, SearchPostsApiArg>({
        query: (queryArg) => ({
          url: `/posts/search/${queryArg.text}`,
          params: {
            Items: queryArg.items,
            Page: queryArg.page,
          },
        }),
        providesTags: ["Posts"],
      }),
      getPublicPostById: build.query<
        GetPublicPostByIdApiResponse,
        GetPublicPostByIdApiArg
      >({
        query: (queryArg) => ({ url: `/posts/public/${queryArg.id}` }),
        providesTags: ["Posts"],
      }),
      getPublicPostByMenuLanguageAndPath: build.query<
        GetPublicPostByMenuLanguageAndPathApiResponse,
        GetPublicPostByMenuLanguageAndPathApiArg
      >({
        query: (queryArg) => ({
          url: `/posts/public/${queryArg.language}/${queryArg.path}`,
        }),
        providesTags: ["Posts"],
      }),
      getPublicPostsByLanguage: build.query<
        GetPublicPostsByLanguageApiResponse,
        GetPublicPostsByLanguageApiArg
      >({
        query: (queryArg) => ({
          url: `/posts/public/${queryArg.language}/all`,
          params: {
            Items: queryArg.items,
            Page: queryArg.page,
          },
        }),
        providesTags: ["Posts"],
      }),
      searchPublicPosts: build.query<
        SearchPublicPostsApiResponse,
        SearchPublicPostsApiArg
      >({
        query: (queryArg) => ({
          url: `/posts/public/search/${queryArg.text}`,
          params: {
            Items: queryArg.items,
            Page: queryArg.page,
          },
        }),
        providesTags: ["Posts"],
      }),
      getClassrooms: build.query<GetClassroomsApiResponse, GetClassroomsApiArg>(
        {
          query: () => ({ url: `/school/classrooms` }),
          providesTags: ["School"],
        },
      ),
      createClassroom: build.mutation<
        CreateClassroomApiResponse,
        CreateClassroomApiArg
      >({
        query: (queryArg) => ({
          url: `/school/classrooms`,
          method: "POST",
          body: queryArg.classroomCreateDto,
        }),
        invalidatesTags: ["School"],
      }),
      editClassroom: build.mutation<
        EditClassroomApiResponse,
        EditClassroomApiArg
      >({
        query: (queryArg) => ({
          url: `/school/classrooms`,
          method: "PUT",
          body: queryArg.classroomEditDto,
        }),
        invalidatesTags: ["School"],
      }),
      getClassroomById: build.query<
        GetClassroomByIdApiResponse,
        GetClassroomByIdApiArg
      >({
        query: (queryArg) => ({ url: `/school/classrooms/${queryArg.id}` }),
        providesTags: ["School"],
      }),
      deleteClassroom: build.mutation<
        DeleteClassroomApiResponse,
        DeleteClassroomApiArg
      >({
        query: (queryArg) => ({
          url: `/school/classrooms/${queryArg.id}`,
          method: "DELETE",
        }),
        invalidatesTags: ["School"],
      }),
      getClasstimes: build.query<GetClasstimesApiResponse, GetClasstimesApiArg>(
        {
          query: () => ({ url: `/school/classtimes` }),
          providesTags: ["School"],
        },
      ),
      createClasstime: build.mutation<
        CreateClasstimeApiResponse,
        CreateClasstimeApiArg
      >({
        query: (queryArg) => ({
          url: `/school/classtimes`,
          method: "POST",
          body: queryArg.classtimeCreateDto,
        }),
        invalidatesTags: ["School"],
      }),
      getClasstimeById: build.query<
        GetClasstimeByIdApiResponse,
        GetClasstimeByIdApiArg
      >({
        query: (queryArg) => ({ url: `/school/classtimes/${queryArg.id}` }),
        providesTags: ["School"],
      }),
      deleteClasstime: build.mutation<
        DeleteClasstimeApiResponse,
        DeleteClasstimeApiArg
      >({
        query: (queryArg) => ({
          url: `/school/classtimes/${queryArg.id}`,
          method: "DELETE",
        }),
        invalidatesTags: ["School"],
      }),
      editClasstime: build.mutation<
        EditClasstimeApiResponse,
        EditClasstimeApiArg
      >({
        query: (queryArg) => ({
          url: `/school/classtime`,
          method: "PUT",
          body: queryArg.classtimeEditDto,
        }),
        invalidatesTags: ["School"],
      }),
      getClasstimesShortDays: build.query<
        GetClasstimesShortDaysApiResponse,
        GetClasstimesShortDaysApiArg
      >({
        query: (queryArg) => ({
          url: `/school/classtimesshort`,
          params: {
            Items: queryArg.items,
            Page: queryArg.page,
          },
        }),
        providesTags: ["School"],
      }),
      createClasstimeShortDay: build.mutation<
        CreateClasstimeShortDayApiResponse,
        CreateClasstimeShortDayApiArg
      >({
        query: (queryArg) => ({
          url: `/school/classtimesshort`,
          method: "POST",
          body: queryArg.classtimeShortDayCreateDto,
        }),
        invalidatesTags: ["School"],
      }),
      editClasstimeShortDay: build.mutation<
        EditClasstimeShortDayApiResponse,
        EditClasstimeShortDayApiArg
      >({
        query: (queryArg) => ({
          url: `/school/classtimesshort`,
          method: "PUT",
          body: queryArg.classtimeShortDayEditDto,
        }),
        invalidatesTags: ["School"],
      }),
      getClasstimeShortDayById: build.query<
        GetClasstimeShortDayByIdApiResponse,
        GetClasstimeShortDayByIdApiArg
      >({
        query: (queryArg) => ({
          url: `/school/classtimesshort/${queryArg.id}`,
        }),
        providesTags: ["School"],
      }),
      deleteClasstimeShortDay: build.mutation<
        DeleteClasstimeShortDayApiResponse,
        DeleteClasstimeShortDayApiArg
      >({
        query: (queryArg) => ({
          url: `/school/classtimesshort/${queryArg.id}`,
          method: "DELETE",
        }),
        invalidatesTags: ["School"],
      }),
      getClassdays: build.query<GetClassdaysApiResponse, GetClassdaysApiArg>({
        query: () => ({ url: `/school/classdays` }),
        providesTags: ["School"],
      }),
      getAnnouncementById: build.query<
        GetAnnouncementByIdApiResponse,
        GetAnnouncementByIdApiArg
      >({
        query: (queryArg) => ({ url: `/school/announcements/${queryArg.id}` }),
        providesTags: ["School"],
      }),
      deleteAnnouncement: build.mutation<
        DeleteAnnouncementApiResponse,
        DeleteAnnouncementApiArg
      >({
        query: (queryArg) => ({
          url: `/school/announcements/${queryArg.id}`,
          method: "DELETE",
        }),
        invalidatesTags: ["School"],
      }),
      createAnnouncement: build.mutation<
        CreateAnnouncementApiResponse,
        CreateAnnouncementApiArg
      >({
        query: (queryArg) => ({
          url: `/school/announcements`,
          method: "POST",
          body: queryArg.announcementCreateDto,
        }),
        invalidatesTags: ["School"],
      }),
      editAnnouncement: build.mutation<
        EditAnnouncementApiResponse,
        EditAnnouncementApiArg
      >({
        query: (queryArg) => ({
          url: `/school/announcements`,
          method: "PUT",
          body: queryArg.announcementEditDto,
        }),
        invalidatesTags: ["School"],
      }),
      getAnnouncements: build.query<
        GetAnnouncementsApiResponse,
        GetAnnouncementsApiArg
      >({
        query: (queryArg) => ({
          url: `/school/announcements`,
          params: {
            Items: queryArg.items,
            Page: queryArg.page,
          },
        }),
        providesTags: ["School"],
      }),
      getPublicAnnouncements: build.query<
        GetPublicAnnouncementsApiResponse,
        GetPublicAnnouncementsApiArg
      >({
        query: () => ({ url: `/school/public/announcements` }),
        providesTags: ["School"],
      }),
      getPublicRandomImage: build.query<
        GetPublicRandomImageApiResponse,
        GetPublicRandomImageApiArg
      >({
        query: () => ({ url: `/school/public/random-image` }),
        providesTags: ["School"],
      }),
      getStudentObservations: build.query<
        GetStudentObservationsApiResponse,
        GetStudentObservationsApiArg
      >({
        query: (queryArg) => ({
          url: `/studentobservation`,
          params: {
            Items: queryArg.items,
            Page: queryArg.page,
          },
        }),
        providesTags: ["StudentObservation"],
      }),
      createStudentObservation: build.mutation<
        CreateStudentObservationApiResponse,
        CreateStudentObservationApiArg
      >({
        query: (queryArg) => ({
          url: `/studentobservation`,
          method: "POST",
          body: queryArg.studentObservationCreateDto,
        }),
        invalidatesTags: ["StudentObservation"],
      }),
      editStudentObservation: build.mutation<
        EditStudentObservationApiResponse,
        EditStudentObservationApiArg
      >({
        query: (queryArg) => ({
          url: `/studentobservation`,
          method: "PUT",
          body: queryArg.studentObservationEditDto,
        }),
        invalidatesTags: ["StudentObservation"],
      }),
      getMyStudentObservations: build.query<
        GetMyStudentObservationsApiResponse,
        GetMyStudentObservationsApiArg
      >({
        query: (queryArg) => ({
          url: `/studentobservation/my`,
          params: {
            Items: queryArg.items,
            Page: queryArg.page,
          },
        }),
        providesTags: ["StudentObservation"],
      }),
      getStudentObservationById: build.query<
        GetStudentObservationByIdApiResponse,
        GetStudentObservationByIdApiArg
      >({
        query: (queryArg) => ({ url: `/studentobservation/${queryArg.id}` }),
        providesTags: ["StudentObservation"],
      }),
      deleteStudentObservation: build.mutation<
        DeleteStudentObservationApiResponse,
        DeleteStudentObservationApiArg
      >({
        query: (queryArg) => ({
          url: `/studentobservation/${queryArg.id}`,
          method: "DELETE",
        }),
        invalidatesTags: ["StudentObservation"],
      }),
      getTechJournalReports: build.query<
        GetTechJournalReportsApiResponse,
        GetTechJournalReportsApiArg
      >({
        query: (queryArg) => ({
          url: `/techjournal`,
          params: {
            Items: queryArg.items,
            Page: queryArg.page,
            start: queryArg.start,
            end: queryArg.end,
          },
        }),
        providesTags: ["TechJournal"],
      }),
      createTechJournalReport: build.mutation<
        CreateTechJournalReportApiResponse,
        CreateTechJournalReportApiArg
      >({
        query: (queryArg) => ({
          url: `/techjournal`,
          method: "POST",
          body: queryArg.techJournalReportCreateDto,
        }),
        invalidatesTags: ["TechJournal"],
      }),
      editTechJournalReport: build.mutation<
        EditTechJournalReportApiResponse,
        EditTechJournalReportApiArg
      >({
        query: (queryArg) => ({
          url: `/techjournal`,
          method: "PUT",
          body: queryArg.techJournalReportEditDto,
        }),
        invalidatesTags: ["TechJournal"],
      }),
      getTechJournalReportById: build.query<
        GetTechJournalReportByIdApiResponse,
        GetTechJournalReportByIdApiArg
      >({
        query: (queryArg) => ({ url: `/techjournal/${queryArg.id}` }),
        providesTags: ["TechJournal"],
      }),
      patchTechJournalReport: build.mutation<
        PatchTechJournalReportApiResponse,
        PatchTechJournalReportApiArg
      >({
        query: (queryArg) => ({
          url: `/techjournal/${queryArg.id}`,
          method: "PATCH",
          body: queryArg.techJournalReportPatchDto,
        }),
        invalidatesTags: ["TechJournal"],
      }),
      deleteTechJournalReport: build.mutation<
        DeleteTechJournalReportApiResponse,
        DeleteTechJournalReportApiArg
      >({
        query: (queryArg) => ({
          url: `/techjournal/${queryArg.id}`,
          method: "DELETE",
        }),
        invalidatesTags: ["TechJournal"],
      }),
      getTimetable: build.query<GetTimetableApiResponse, GetTimetableApiArg>({
        query: (queryArg) => ({
          url: `/timetable`,
          params: {
            Items: queryArg.items,
            Page: queryArg.page,
          },
        }),
        providesTags: ["Timetable"],
      }),
      createTimetable: build.mutation<
        CreateTimetableApiResponse,
        CreateTimetableApiArg
      >({
        query: (queryArg) => ({
          url: `/timetable`,
          method: "POST",
          body: queryArg.timetableCreateDto,
        }),
        invalidatesTags: ["Timetable"],
      }),
      editTimetable: build.mutation<
        EditTimetableApiResponse,
        EditTimetableApiArg
      >({
        query: (queryArg) => ({
          url: `/timetable`,
          method: "PUT",
          body: queryArg.timetableEditDto,
        }),
        invalidatesTags: ["Timetable"],
      }),
      getTimetableById: build.query<
        GetTimetableByIdApiResponse,
        GetTimetableByIdApiArg
      >({
        query: (queryArg) => ({ url: `/timetable/${queryArg.id}` }),
        providesTags: ["Timetable"],
      }),
      deleteTimetable: build.mutation<
        DeleteTimetableApiResponse,
        DeleteTimetableApiArg
      >({
        query: (queryArg) => ({
          url: `/timetable/${queryArg.id}`,
          method: "DELETE",
        }),
        invalidatesTags: ["Timetable"],
      }),
      importTimetable: build.mutation<
        ImportTimetableApiResponse,
        ImportTimetableApiArg
      >({
        query: (queryArg) => ({
          url: `/timetable/import`,
          method: "POST",
          body: queryArg.timetableImportDto,
        }),
        invalidatesTags: ["Timetable"],
      }),
      deleteTimetableDay: build.mutation<
        DeleteTimetableDayApiResponse,
        DeleteTimetableDayApiArg
      >({
        query: (queryArg) => ({
          url: `/timetable/days`,
          method: "DELETE",
          body: queryArg.timetableDeleteDayDto,
        }),
        invalidatesTags: ["Timetable"],
      }),
      getPublicTimetable: build.query<
        GetPublicTimetableApiResponse,
        GetPublicTimetableApiArg
      >({
        query: () => ({ url: `/timetable/public/today` }),
        providesTags: ["Timetable"],
      }),
    }),
    overrideExisting: false,
  });
export { injectedRtkApi as generatedApi };
export type GetAccomplishmentsByDateApiResponse =
  /** status 200 OK */ AccomplishmentDto[];
export type GetAccomplishmentsByDateApiArg = {
  start?: string;
  end?: string;
};
export type GetAccomplishmentScalesApiResponse =
  /** status 200 OK */ AccomplishmentScaleDto[];
export type GetAccomplishmentScalesApiArg = void;
export type GetAccomplishmentAchievementsApiResponse =
  /** status 200 OK */ AccomplishmentAchievementDto[];
export type GetAccomplishmentAchievementsApiArg = void;
export type GetMyAccomplishmentsApiResponse =
  /** status 200 OK */ AccomplishmentDtoPaginatedListRead;
export type GetMyAccomplishmentsApiArg = {
  items?: number;
  page?: number;
};
export type CreateAccomplishmentApiResponse =
  /** status 201 Created */ AccomplishmentDto;
export type CreateAccomplishmentApiArg = {
  accomplishmentCreateDto: AccomplishmentCreateDto;
};
export type EditAccomplishmentApiResponse = unknown;
export type EditAccomplishmentApiArg = {
  accomplishmentEditDto: AccomplishmentEditDto;
};
export type GetAccomplishmentByIdApiResponse =
  /** status 200 OK */ AccomplishmentDetailsDto;
export type GetAccomplishmentByIdApiArg = {
  id: number;
};
export type DeleteAccomplishmentApiResponse = unknown;
export type DeleteAccomplishmentApiArg = {
  id: number;
};
export type GetMyAppointmentsApiResponse =
  /** status 200 OK */ AppointmentDetailsDtoPaginatedListRead;
export type GetMyAppointmentsApiArg = {
  items?: number;
  page?: number;
  typeSlug: string;
};
export type GetMyRegistrationsApiResponse =
  /** status 200 OK */ AppointmentDetailsDtoPaginatedListRead;
export type GetMyRegistrationsApiArg = {
  items?: number;
  page?: number;
  typeSlug: string;
};
export type CreateAppointmentApiResponse =
  /** status 201 Created */ AppointmentDto;
export type CreateAppointmentApiArg = {
  appointmentCreateDto: AppointmentCreateDto;
};
export type DeleteAppointmentApiResponse = unknown;
export type DeleteAppointmentApiArg = {
  id: number;
};
export type GetAppointmentByIdApiResponse =
  /** status 200 OK */ AppointmentDetailsDto;
export type GetAppointmentByIdApiArg = {
  id: number;
};
export type GetAppointmentAvailableHostsApiResponse =
  /** status 200 OK */ AppointmentHostDto[];
export type GetAppointmentAvailableHostsApiArg = {
  typeSlug: string;
};
export type GetAppointmentAvailableDatesApiResponse =
  /** status 200 OK */ AppointmentDateDto[];
export type GetAppointmentAvailableDatesApiArg = {
  typeSlug: string;
  userName: string;
};
export type GetAllAppointmentsApiResponse =
  /** status 200 OK */ AppointmentDetailsDtoPaginatedListRead;
export type GetAllAppointmentsApiArg = {
  items?: number;
  page?: number;
  query?: string;
};
export type DeleteAppointmentTypeApiResponse = unknown;
export type DeleteAppointmentTypeApiArg = {
  id: number;
};
export type GetAppointmentTypeByIdApiResponse =
  /** status 200 OK */ AppointmentTypeDto;
export type GetAppointmentTypeByIdApiArg = {
  id: number;
};
export type ResetAppointmentTypeApiResponse = unknown;
export type ResetAppointmentTypeApiArg = {
  id: number;
};
export type EditAppointmentTypeApiResponse = unknown;
export type EditAppointmentTypeApiArg = {
  appointmentTypeEditDto: AppointmentTypeEditDto;
};
export type GetAppointmentTypesApiResponse =
  /** status 200 OK */ AppointmentTypeDto[];
export type GetAppointmentTypesApiArg = void;
export type CreateAppointmentTypeApiResponse =
  /** status 201 Created */ AppointmentDto;
export type CreateAppointmentTypeApiArg = {
  appointmentTypeCreateDto: AppointmentTypeCreateDto;
};
export type CreateAppointmentHostApiResponse =
  /** status 201 Created */ AppointmentExclusiveHostDto;
export type CreateAppointmentHostApiArg = {
  appointmentExclusiveHostCreateDto: AppointmentExclusiveHostCreateDto;
};
export type DeleteAppointmentHostApiResponse = unknown;
export type DeleteAppointmentHostApiArg = {
  id: number;
};
export type GetAppointmentHostsApiResponse =
  /** status 200 OK */ AppointmentExclusiveHostDto[];
export type GetAppointmentHostsApiArg = {
  typeId: number;
};
export type CreateAppointmentDateApiResponse =
  /** status 201 Created */ AppointmentDateDto;
export type CreateAppointmentDateApiArg = {
  appointmentDateCreateDto: AppointmentDateCreateDto;
};
export type DeleteAppointmentDateApiResponse = unknown;
export type DeleteAppointmentDateApiArg = {
  id: number;
};
export type GetAppointmentDatesApiResponse =
  /** status 200 OK */ AppointmentDateDto[];
export type GetAppointmentDatesApiArg = {
  typeId: number;
};
export type GetAppointmentReservedDatesApiResponse =
  /** status 200 OK */ AppointmentReservedDateDto[];
export type GetAppointmentReservedDatesApiArg = {
  userName: string;
};
export type CreateAppointmentReservedDateApiResponse =
  /** status 201 Created */ AppointmentReservedDateDto;
export type CreateAppointmentReservedDateApiArg = {
  appointmentReservedDateCreateDto: AppointmentReservedDateCreateDto;
};
export type DeleteAppointmentReservedDateApiResponse = unknown;
export type DeleteAppointmentReservedDateApiArg = {
  id: number;
};
export type GetPublicAppointmentAvailableHostsApiResponse =
  /** status 200 OK */ AppointmentHostDto[];
export type GetPublicAppointmentAvailableHostsApiArg = {
  typeSlug: string;
};
export type GetPublicAppointmentAvailableDatesApiResponse =
  /** status 200 OK */ AppointmentDateDto[];
export type GetPublicAppointmentAvailableDatesApiArg = {
  typeSlug: string;
  userName: string;
};
export type CreatePublicAppointmentApiResponse =
  /** status 201 Created */ AppointmentDto;
export type CreatePublicAppointmentApiArg = {
  appointmentPublicCreateDto: AppointmentPublicCreateDto;
};
export type AuthorizeApiResponse = /** status 200 OK */ UserAuthDto;
export type AuthorizeApiArg = {
  googleAuthDto: GoogleAuthDto;
};
export type GetBannersApiResponse =
  /** status 200 OK */ BannerDtoPaginatedListRead;
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
export type EditBannerApiResponse = unknown;
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
export type GetBannerByIdApiResponse = /** status 200 OK */ BannerDto;
export type GetBannerByIdApiArg = {
  id: number;
};
export type DeleteBannerApiResponse = unknown;
export type DeleteBannerApiArg = {
  id: number;
};
export type SearchBannersApiResponse =
  /** status 200 OK */ BannerDtoPaginatedListRead;
export type SearchBannersApiArg = {
  text: string;
  items?: number;
  page?: number;
};
export type GetPublicBannersByLanguageApiResponse =
  /** status 200 OK */ BannerPublicDto[];
export type GetPublicBannersByLanguageApiArg = {
  language: string;
};
export type GetBullyJournalReportsApiResponse =
  /** status 200 OK */ BullyJournalReportDtoPaginatedListRead;
export type GetBullyJournalReportsApiArg = {
  items?: number;
  page?: number;
};
export type CreateBullyJournalReportApiResponse =
  /** status 201 Created */ BullyJournalReportDetailsDto;
export type CreateBullyJournalReportApiArg = {
  bullyJournalReportCreateDto: BullyJournalReportCreateDto;
};
export type EditBullyJournalReportApiResponse = unknown;
export type EditBullyJournalReportApiArg = {
  bullyJournalReportEditDto: BullyJournalReportEditDto;
};
export type GetBullyJournalReportByIdApiResponse =
  /** status 200 OK */ BullyJournalReportDetailsDto;
export type GetBullyJournalReportByIdApiArg = {
  id: number;
};
export type DeleteBullyJournalReportApiResponse = unknown;
export type DeleteBullyJournalReportApiArg = {
  id: number;
};
export type GetBullyReportsApiResponse =
  /** status 200 OK */ BullyReportDtoPaginatedListRead;
export type GetBullyReportsApiArg = {
  items?: number;
  page?: number;
};
export type GetBullyReportByIdApiResponse = /** status 200 OK */ BullyReportDto;
export type GetBullyReportByIdApiArg = {
  id: number;
};
export type DeleteBullyReportApiResponse = unknown;
export type DeleteBullyReportApiArg = {
  id: number;
};
export type CreatePublicBullyReportApiResponse =
  /** status 201 Created */ BullyReportDto;
export type CreatePublicBullyReportApiArg = {
  bullyReportCreateDto: BullyReportCreateDto;
};
export type GetCoursesStatsByDateApiResponse =
  /** status 200 OK */ CourseStatsDto[];
export type GetCoursesStatsByDateApiArg = {
  start?: string;
  end?: string;
};
export type GetTeacherCoursesByIdAndDateApiResponse =
  /** status 200 OK */ CourseDto[];
export type GetTeacherCoursesByIdAndDateApiArg = {
  id: number;
  start?: string;
  end?: string;
};
export type GetMyCoursesApiResponse =
  /** status 200 OK */ CourseDtoPaginatedListRead;
export type GetMyCoursesApiArg = {
  items?: number;
  page?: number;
};
export type CreateCourseApiResponse = /** status 201 Created */ CourseDto;
export type CreateCourseApiArg = {
  courseCreateDto: CourseCreateDto;
};
export type EditCourseApiResponse = unknown;
export type EditCourseApiArg = {
  courseEditDto: CourseEditDto;
};
export type GetCourseByIdApiResponse = /** status 200 OK */ CourseDto;
export type GetCourseByIdApiArg = {
  id: number;
};
export type DeleteCourseApiResponse = unknown;
export type DeleteCourseApiArg = {
  id: number;
};
export type GetTeachersApiResponse = /** status 200 OK */ EmployeeDto[];
export type GetTeachersApiArg = void;
export type GetEventsByDateApiResponse = /** status 200 OK */ EventDto[];
export type GetEventsByDateApiArg = {
  start?: string;
  end?: string;
};
export type CreateEventApiResponse = /** status 201 Created */ EventDto;
export type CreateEventApiArg = {
  eventCreateDto: EventCreateDto;
};
export type DeleteEventApiResponse = unknown;
export type DeleteEventApiArg = {
  id: string;
};
export type GetPublicEventsApiResponse = /** status 200 OK */ EventDto[];
export type GetPublicEventsApiArg = {
  week: number;
};
export type GetPublicDayEventsApiResponse = /** status 200 OK */ EventDto[];
export type GetPublicDayEventsApiArg = void;
export type GetPublicLanguagesApiResponse = /** status 200 OK */ LanguageDto[];
export type GetPublicLanguagesApiArg = void;
export type GetMenusApiResponse =
  /** status 200 OK */ MenuDetailsDtoPaginatedListRead;
export type GetMenusApiArg = {
  items?: number;
  page?: number;
};
export type CreateMenuApiResponse = /** status 201 Created */ MenuDto;
export type CreateMenuApiArg = {
  menuCreateDto: MenuCreateDto;
};
export type EditMenuApiResponse = unknown;
export type EditMenuApiArg = {
  menuEditDto: MenuEditDto;
};
export type GetMenuLocationsApiResponse =
  /** status 200 OK */ MenuLocationDto[];
export type GetMenuLocationsApiArg = void;
export type GetMenuByIdApiResponse = /** status 200 OK */ MenuDetailsDto;
export type GetMenuByIdApiArg = {
  id: number;
};
export type DeleteMenuApiResponse = unknown;
export type DeleteMenuApiArg = {
  id: number;
};
export type SearchMenusApiResponse =
  /** status 200 OK */ MenuDetailsDtoPaginatedListRead;
export type SearchMenusApiArg = {
  text: string;
  items?: number;
  page?: number;
};
export type GetPublicMenusByLanguageApiResponse =
  /** status 200 OK */ MenuPublicDto[];
export type GetPublicMenusByLanguageApiArg = {
  language: string;
};
export type GetMenusMetaApiResponse = /** status 200 OK */ MenuMetaDto[];
export type GetMenusMetaApiArg = void;
export type GetPostsMetaApiResponse = /** status 200 OK */ PostMetaDto[];
export type GetPostsMetaApiArg = void;
export type GetLocalesMetaApiResponse = /** status 200 OK */ LocaleMetaDto[];
export type GetLocalesMetaApiArg = void;
export type GetObservationLessonsApiResponse =
  /** status 200 OK */ ObservationLessonDto[];
export type GetObservationLessonsApiArg = void;
export type CreateObservationLessonApiResponse =
  /** status 201 Created */ ObservationLessonDto;
export type CreateObservationLessonApiArg = {
  observationLessonCreateDto: ObservationLessonCreateDto;
};
export type EditObservationLessonApiResponse = unknown;
export type EditObservationLessonApiArg = {
  observationLessonEditDto: ObservationLessonEditDto;
};
export type GetObservationLessonByIdApiResponse =
  /** status 200 OK */ ObservationLessonDto;
export type GetObservationLessonByIdApiArg = {
  id: number;
};
export type DeleteObservationLessonApiResponse = unknown;
export type DeleteObservationLessonApiArg = {
  id: number;
};
export type GetObservationTargetsApiResponse =
  /** status 200 OK */ ObservationTargetDto[];
export type GetObservationTargetsApiArg = {
  enabledOnly?: boolean;
};
export type CreateObservationTargetApiResponse =
  /** status 201 Created */ ObservationTargetDto;
export type CreateObservationTargetApiArg = {
  observationTargetCreateDto: ObservationTargetCreateDto;
};
export type EditObservationTargetApiResponse = unknown;
export type EditObservationTargetApiArg = {
  observationTargetEditDto: ObservationTargetEditDto;
};
export type GetObservationTargetByIdApiResponse =
  /** status 200 OK */ ObservationTargetDto;
export type GetObservationTargetByIdApiArg = {
  id: number;
};
export type DeleteObservationTargetApiResponse = unknown;
export type DeleteObservationTargetApiArg = {
  id: number;
};
export type GetObservationTypesApiResponse =
  /** status 200 OK */ ObservationTypeDto[];
export type GetObservationTypesApiArg = void;
export type CreateObservationTypeApiResponse =
  /** status 201 Created */ ObservationTypeDto;
export type CreateObservationTypeApiArg = {
  observationTypeCreateDto: ObservationTypeCreateDto;
};
export type EditObservationTypeApiResponse = unknown;
export type EditObservationTypeApiArg = {
  observationTypeEditDto: ObservationTypeEditDto;
};
export type GetObservationTypeByIdApiResponse =
  /** status 200 OK */ ObservationTypeDto;
export type GetObservationTypeByIdApiArg = {
  id: number;
};
export type DeleteObservationTypeApiResponse = unknown;
export type DeleteObservationTypeApiArg = {
  id: number;
};
export type GetPostsApiResponse = /** status 200 OK */ PostDtoPaginatedListRead;
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
export type EditPostApiResponse = unknown;
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
export type GetPostByIdApiResponse = /** status 200 OK */ PostDetailsDto;
export type GetPostByIdApiArg = {
  id: number;
};
export type PatchPostApiResponse = unknown;
export type PatchPostApiArg = {
  id: number;
  postPatchDto: PostPatchDto;
};
export type DeletePostApiResponse = unknown;
export type DeletePostApiArg = {
  id: number;
};
export type SearchPostsApiResponse =
  /** status 200 OK */ PostDtoPaginatedListRead;
export type SearchPostsApiArg = {
  text: string;
  items?: number;
  page?: number;
};
export type GetPublicPostByIdApiResponse =
  /** status 200 OK */ PostPublicDetailsDto;
export type GetPublicPostByIdApiArg = {
  id: number;
};
export type GetPublicPostByMenuLanguageAndPathApiResponse =
  /** status 200 OK */ PostDetailsDto;
export type GetPublicPostByMenuLanguageAndPathApiArg = {
  language: string;
  path: string;
};
export type GetPublicPostsByLanguageApiResponse =
  /** status 200 OK */ PostPublicDto[];
export type GetPublicPostsByLanguageApiArg = {
  language: string;
  items?: number;
  page?: number;
};
export type SearchPublicPostsApiResponse =
  /** status 200 OK */ PostPublicDtoPaginatedListRead;
export type SearchPublicPostsApiArg = {
  text: string;
  items?: number;
  page?: number;
};
export type GetClassroomsApiResponse = /** status 200 OK */ ClassroomDto[];
export type GetClassroomsApiArg = void;
export type CreateClassroomApiResponse = /** status 201 Created */ ClassroomDto;
export type CreateClassroomApiArg = {
  classroomCreateDto: ClassroomCreateDto;
};
export type EditClassroomApiResponse = unknown;
export type EditClassroomApiArg = {
  classroomEditDto: ClassroomEditDto;
};
export type GetClassroomByIdApiResponse = /** status 200 OK */ ClassroomDto;
export type GetClassroomByIdApiArg = {
  id: number;
};
export type DeleteClassroomApiResponse = unknown;
export type DeleteClassroomApiArg = {
  id: number;
};
export type GetClasstimesApiResponse = /** status 200 OK */ ClasstimeDto[];
export type GetClasstimesApiArg = void;
export type CreateClasstimeApiResponse = /** status 201 Created */ ClasstimeDto;
export type CreateClasstimeApiArg = {
  classtimeCreateDto: ClasstimeCreateDto;
};
export type GetClasstimeByIdApiResponse = /** status 200 OK */ ClasstimeDto;
export type GetClasstimeByIdApiArg = {
  id: number;
};
export type DeleteClasstimeApiResponse = unknown;
export type DeleteClasstimeApiArg = {
  id: number;
};
export type EditClasstimeApiResponse = unknown;
export type EditClasstimeApiArg = {
  classtimeEditDto: ClasstimeEditDto;
};
export type GetClasstimesShortDaysApiResponse =
  /** status 200 OK */ ClasstimeShortDayDtoPaginatedListRead;
export type GetClasstimesShortDaysApiArg = {
  items?: number;
  page?: number;
};
export type CreateClasstimeShortDayApiResponse =
  /** status 201 Created */ ClasstimeShortDayDto;
export type CreateClasstimeShortDayApiArg = {
  classtimeShortDayCreateDto: ClasstimeShortDayCreateDto;
};
export type EditClasstimeShortDayApiResponse = unknown;
export type EditClasstimeShortDayApiArg = {
  classtimeShortDayEditDto: ClasstimeShortDayEditDto;
};
export type GetClasstimeShortDayByIdApiResponse =
  /** status 200 OK */ ClasstimeShortDayDto;
export type GetClasstimeShortDayByIdApiArg = {
  id: number;
};
export type DeleteClasstimeShortDayApiResponse = unknown;
export type DeleteClasstimeShortDayApiArg = {
  id: number;
};
export type GetClassdaysApiResponse = /** status 200 OK */ ClassdayDto[];
export type GetClassdaysApiArg = void;
export type GetAnnouncementByIdApiResponse =
  /** status 200 OK */ AnnouncementDto;
export type GetAnnouncementByIdApiArg = {
  id: number;
};
export type DeleteAnnouncementApiResponse = unknown;
export type DeleteAnnouncementApiArg = {
  id: number;
};
export type CreateAnnouncementApiResponse =
  /** status 201 Created */ AnnouncementDto;
export type CreateAnnouncementApiArg = {
  announcementCreateDto: AnnouncementCreateDto;
};
export type EditAnnouncementApiResponse = unknown;
export type EditAnnouncementApiArg = {
  announcementEditDto: AnnouncementEditDto;
};
export type GetAnnouncementsApiResponse =
  /** status 200 OK */ AnnouncementDtoPaginatedListRead;
export type GetAnnouncementsApiArg = {
  items?: number;
  page?: number;
};
export type GetPublicAnnouncementsApiResponse =
  /** status 200 OK */ AnnouncementDto[];
export type GetPublicAnnouncementsApiArg = void;
export type GetPublicRandomImageApiResponse =
  /** status 200 OK */ RandomImageDto;
export type GetPublicRandomImageApiArg = void;
export type GetStudentObservationsApiResponse =
  /** status 200 OK */ StudentObservationDtoPaginatedListRead;
export type GetStudentObservationsApiArg = {
  items?: number;
  page?: number;
};
export type CreateStudentObservationApiResponse =
  /** status 201 Created */ StudentObservationDto;
export type CreateStudentObservationApiArg = {
  studentObservationCreateDto: StudentObservationCreateDto;
};
export type EditStudentObservationApiResponse = unknown;
export type EditStudentObservationApiArg = {
  studentObservationEditDto: StudentObservationEditDto;
};
export type GetMyStudentObservationsApiResponse =
  /** status 200 OK */ StudentObservationDtoPaginatedListRead;
export type GetMyStudentObservationsApiArg = {
  items?: number;
  page?: number;
};
export type GetStudentObservationByIdApiResponse =
  /** status 200 OK */ StudentObservationDto;
export type GetStudentObservationByIdApiArg = {
  id: number;
};
export type DeleteStudentObservationApiResponse = unknown;
export type DeleteStudentObservationApiArg = {
  id: number;
};
export type GetTechJournalReportsApiResponse =
  /** status 200 OK */ TechJournalReportDtoPaginatedListRead;
export type GetTechJournalReportsApiArg = {
  items?: number;
  page?: number;
  start?: string;
  end?: string;
};
export type CreateTechJournalReportApiResponse =
  /** status 201 Created */ TechJournalReportDto;
export type CreateTechJournalReportApiArg = {
  techJournalReportCreateDto: TechJournalReportCreateDto;
};
export type EditTechJournalReportApiResponse = unknown;
export type EditTechJournalReportApiArg = {
  techJournalReportEditDto: TechJournalReportEditDto;
};
export type GetTechJournalReportByIdApiResponse =
  /** status 200 OK */ TechJournalReportDto;
export type GetTechJournalReportByIdApiArg = {
  id: number;
};
export type PatchTechJournalReportApiResponse = unknown;
export type PatchTechJournalReportApiArg = {
  id: number;
  techJournalReportPatchDto: TechJournalReportPatchDto;
};
export type DeleteTechJournalReportApiResponse = unknown;
export type DeleteTechJournalReportApiArg = {
  id: number;
};
export type GetTimetableApiResponse =
  /** status 200 OK */ TimetableDtoPaginatedListRead;
export type GetTimetableApiArg = {
  items?: number;
  page?: number;
};
export type CreateTimetableApiResponse = /** status 201 Created */ TimetableDto;
export type CreateTimetableApiArg = {
  timetableCreateDto: TimetableCreateDto;
};
export type EditTimetableApiResponse = unknown;
export type EditTimetableApiArg = {
  timetableEditDto: TimetableEditDto;
};
export type GetTimetableByIdApiResponse = /** status 200 OK */ TimetableDto;
export type GetTimetableByIdApiArg = {
  id: number;
};
export type DeleteTimetableApiResponse = unknown;
export type DeleteTimetableApiArg = {
  id: number;
};
export type ImportTimetableApiResponse = unknown;
export type ImportTimetableApiArg = {
  timetableImportDto: TimetableImportDto;
};
export type DeleteTimetableDayApiResponse = unknown;
export type DeleteTimetableDayApiArg = {
  timetableDeleteDayDto: TimetableDeleteDayDto;
};
export type GetPublicTimetableApiResponse =
  /** status 200 OK */ TimetablePublicDto;
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
  totalCount: number;
};
export type AccomplishmentDtoPaginatedListRead = {
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
  totalCount: number;
};
export type AppointmentDetailsDtoPaginatedListRead = {
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
  totalCount: number;
};
export type BannerDtoPaginatedListRead = {
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
  totalCount: number;
};
export type BullyJournalReportDtoPaginatedListRead = {
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
  totalCount: number;
};
export type BullyReportDtoPaginatedListRead = {
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
  totalCount: number;
};
export type CourseDtoPaginatedListRead = {
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
  language: LanguageDto;
  menuLocation: MenuLocationDto;
  linkedPost: PostDetailsDto;
};
export type MenuDetailsDtoPaginatedList = {
  items: MenuDetailsDto[];
  pageNumber: number;
  totalCount: number;
};
export type MenuDetailsDtoPaginatedListRead = {
  items: MenuDetailsDto[];
  pageNumber: number;
  totalPages: number;
  totalCount: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
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
export type ObservationLessonDto = {
  id: number;
  name: string;
};
export type ObservationLessonCreateDto = {
  name: string;
};
export type ObservationLessonEditDto = {
  name: string;
  id: number;
};
export type ObservationTargetDto = {
  id: number;
  name: string;
  enabled: boolean;
};
export type ObservationTargetCreateDto = {
  name: string;
  enabled: boolean;
};
export type ObservationTargetEditDto = {
  name: string;
  enabled: boolean;
  id: number;
};
export type ObservationTypeDto = {
  id: number;
  name: string;
};
export type ObservationTypeCreateDto = {
  name: string;
};
export type ObservationTypeEditDto = {
  name: string;
  id: number;
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
  totalCount: number;
};
export type PostDtoPaginatedListRead = {
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
  totalCount: number;
};
export type PostPublicDtoPaginatedListRead = {
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
  startTimeShort: string;
  endTime: string;
  endTimeShort: string;
};
export type ClasstimeCreateDto = {
  number: number;
  startTime: string;
  startTimeShort: string;
  endTime: string;
  endTimeShort: string;
};
export type ClasstimeEditDto = {
  number: number;
  startTime: string;
  startTimeShort: string;
  endTime: string;
  endTimeShort: string;
  id: number;
};
export type ClasstimeShortDayDto = {
  id: number;
  date: string;
};
export type ClasstimeShortDayDtoPaginatedList = {
  items: ClasstimeShortDayDto[];
  pageNumber: number;
  totalCount: number;
};
export type ClasstimeShortDayDtoPaginatedListRead = {
  items: ClasstimeShortDayDto[];
  pageNumber: number;
  totalPages: number;
  totalCount: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
};
export type ClasstimeShortDayCreateDto = {
  date: string;
};
export type ClasstimeShortDayEditDto = {
  date: string;
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
  totalCount: number;
};
export type AnnouncementDtoPaginatedListRead = {
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
export type IdNameDto = {
  id: number;
  name: string;
};
export type StudentObservationDto = {
  id: number;
  note?: string | null;
  date: string;
  target: IdNameDto;
  teacher: IdNameDto;
  lesson: IdNameDto;
  types: ObservationTypeDto[];
};
export type StudentObservationDtoPaginatedList = {
  items: StudentObservationDto[];
  pageNumber: number;
  totalCount: number;
};
export type StudentObservationDtoPaginatedListRead = {
  items: StudentObservationDto[];
  pageNumber: number;
  totalPages: number;
  totalCount: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
};
export type StudentObservationCreateDto = {
  note?: string | null;
  date: string;
  targetId: number;
  lessonId: number;
  typeIds: number[];
};
export type StudentObservationEditDto = {
  note?: string | null;
  date: string;
  targetId: number;
  lessonId: number;
  typeIds: number[];
  id: number;
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
  totalCount: number;
};
export type TechJournalReportDtoPaginatedListRead = {
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
  totalCount: number;
};
export type TimetableDtoPaginatedListRead = {
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
export const {
  useGetAccomplishmentsByDateQuery,
  useGetAccomplishmentScalesQuery,
  useGetAccomplishmentAchievementsQuery,
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
  useResetAppointmentTypeMutation,
  useEditAppointmentTypeMutation,
  useGetAppointmentTypesQuery,
  useCreateAppointmentTypeMutation,
  useCreateAppointmentHostMutation,
  useDeleteAppointmentHostMutation,
  useGetAppointmentHostsQuery,
  useCreateAppointmentDateMutation,
  useDeleteAppointmentDateMutation,
  useGetAppointmentDatesQuery,
  useGetAppointmentReservedDatesQuery,
  useCreateAppointmentReservedDateMutation,
  useDeleteAppointmentReservedDateMutation,
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
  useGetBullyJournalReportsQuery,
  useCreateBullyJournalReportMutation,
  useEditBullyJournalReportMutation,
  useGetBullyJournalReportByIdQuery,
  useDeleteBullyJournalReportMutation,
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
  useGetEventsByDateQuery,
  useCreateEventMutation,
  useDeleteEventMutation,
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
  useGetObservationLessonsQuery,
  useCreateObservationLessonMutation,
  useEditObservationLessonMutation,
  useGetObservationLessonByIdQuery,
  useDeleteObservationLessonMutation,
  useGetObservationTargetsQuery,
  useCreateObservationTargetMutation,
  useEditObservationTargetMutation,
  useGetObservationTargetByIdQuery,
  useDeleteObservationTargetMutation,
  useGetObservationTypesQuery,
  useCreateObservationTypeMutation,
  useEditObservationTypeMutation,
  useGetObservationTypeByIdQuery,
  useDeleteObservationTypeMutation,
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
  useGetClassroomsQuery,
  useCreateClassroomMutation,
  useEditClassroomMutation,
  useGetClassroomByIdQuery,
  useDeleteClassroomMutation,
  useGetClasstimesQuery,
  useCreateClasstimeMutation,
  useGetClasstimeByIdQuery,
  useDeleteClasstimeMutation,
  useEditClasstimeMutation,
  useGetClasstimesShortDaysQuery,
  useCreateClasstimeShortDayMutation,
  useEditClasstimeShortDayMutation,
  useGetClasstimeShortDayByIdQuery,
  useDeleteClasstimeShortDayMutation,
  useGetClassdaysQuery,
  useGetAnnouncementByIdQuery,
  useDeleteAnnouncementMutation,
  useCreateAnnouncementMutation,
  useEditAnnouncementMutation,
  useGetAnnouncementsQuery,
  useGetPublicAnnouncementsQuery,
  useGetPublicRandomImageQuery,
  useGetStudentObservationsQuery,
  useCreateStudentObservationMutation,
  useEditStudentObservationMutation,
  useGetMyStudentObservationsQuery,
  useGetStudentObservationByIdQuery,
  useDeleteStudentObservationMutation,
  useGetTechJournalReportsQuery,
  useCreateTechJournalReportMutation,
  useEditTechJournalReportMutation,
  useGetTechJournalReportByIdQuery,
  usePatchTechJournalReportMutation,
  useDeleteTechJournalReportMutation,
  useGetTimetableQuery,
  useCreateTimetableMutation,
  useEditTimetableMutation,
  useGetTimetableByIdQuery,
  useDeleteTimetableMutation,
  useImportTimetableMutation,
  useDeleteTimetableDayMutation,
  useGetPublicTimetableQuery,
} = injectedRtkApi;
