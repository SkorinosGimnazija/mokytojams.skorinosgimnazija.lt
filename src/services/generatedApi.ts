import { baseApi as api } from "./baseApi";
export const addTagTypes = [
  "Achievements",
  "Appointments",
  "Auth",
  "Bully-Reports",
  "Courses",
  "Events",
  "Failure-Reports",
  "Featured",
  "Languages",
  "Menus",
  "Observations",
  "Observation-Lessons",
  "Observation-Options",
  "Observation-Students",
  "Posts",
  "Public",
  "School",
  "Settings",
  "Teachers",
  "Users",
] as const;
const injectedRtkApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (build) => ({
      updateAchievement: build.mutation<
        UpdateAchievementApiResponse,
        UpdateAchievementApiArg
      >({
        query: (queryArg) => ({
          url: `/achievements`,
          method: "PUT",
          body: queryArg,
        }),
        invalidatesTags: ["Achievements"],
      }),
      listAchievements: build.query<
        ListAchievementsApiResponse,
        ListAchievementsApiArg
      >({
        query: (queryArg) => ({
          url: `/achievements`,
          params: {
            userId: queryArg.userId,
            items: queryArg.items,
            page: queryArg.page,
          },
        }),
        providesTags: ["Achievements"],
      }),
      createAchievement: build.mutation<
        CreateAchievementApiResponse,
        CreateAchievementApiArg
      >({
        query: (queryArg) => ({
          url: `/achievements`,
          method: "POST",
          body: queryArg,
        }),
        invalidatesTags: ["Achievements"],
      }),
      listAchievementScales: build.query<
        ListAchievementScalesApiResponse,
        ListAchievementScalesApiArg
      >({
        query: () => ({ url: `/achievements/scales` }),
        providesTags: ["Achievements"],
      }),
      getAchievementStats: build.query<
        GetAchievementStatsApiResponse,
        GetAchievementStatsApiArg
      >({
        query: (queryArg) => ({
          url: `/achievements/stats`,
          params: {
            startDate: queryArg.startDate,
            endDate: queryArg.endDate,
          },
        }),
        providesTags: ["Achievements"],
      }),
      listAchievementTypes: build.query<
        ListAchievementTypesApiResponse,
        ListAchievementTypesApiArg
      >({
        query: () => ({ url: `/achievements/types` }),
        providesTags: ["Achievements"],
      }),
      getAchievement: build.query<
        GetAchievementApiResponse,
        GetAchievementApiArg
      >({
        query: (queryArg) => ({ url: `/achievements/${queryArg}` }),
        providesTags: ["Achievements"],
      }),
      deleteAchievement: build.mutation<
        DeleteAchievementApiResponse,
        DeleteAchievementApiArg
      >({
        query: (queryArg) => ({
          url: `/achievements/${queryArg}`,
          method: "DELETE",
        }),
        invalidatesTags: ["Achievements"],
      }),
      listAppointments: build.query<
        ListAppointmentsApiResponse,
        ListAppointmentsApiArg
      >({
        query: (queryArg) => ({
          url: `/appointments`,
          params: {
            userId: queryArg.userId,
            items: queryArg.items,
            page: queryArg.page,
          },
        }),
        providesTags: ["Appointments"],
      }),
      createAppointment: build.mutation<
        CreateAppointmentApiResponse,
        CreateAppointmentApiArg
      >({
        query: (queryArg) => ({
          url: `/appointments`,
          method: "POST",
          body: queryArg,
        }),
        invalidatesTags: ["Appointments"],
      }),
      updateAppointmentDates: build.mutation<
        UpdateAppointmentDatesApiResponse,
        UpdateAppointmentDatesApiArg
      >({
        query: (queryArg) => ({
          url: `/appointments/dates`,
          method: "POST",
          body: queryArg,
        }),
        invalidatesTags: ["Appointments"],
      }),
      updateAppointmentReservedDates: build.mutation<
        UpdateAppointmentReservedDatesApiResponse,
        UpdateAppointmentReservedDatesApiArg
      >({
        query: (queryArg) => ({
          url: `/appointments/dates/reserved`,
          method: "POST",
          body: queryArg,
        }),
        invalidatesTags: ["Appointments"],
      }),
      resetAppointmentType: build.mutation<
        ResetAppointmentTypeApiResponse,
        ResetAppointmentTypeApiArg
      >({
        query: (queryArg) => ({
          url: `/appointments/type/${queryArg}/reset`,
          method: "POST",
        }),
        invalidatesTags: ["Appointments"],
      }),
      updateAppointmentType: build.mutation<
        UpdateAppointmentTypeApiResponse,
        UpdateAppointmentTypeApiArg
      >({
        query: (queryArg) => ({
          url: `/appointments/types`,
          method: "PUT",
          body: queryArg,
        }),
        invalidatesTags: ["Appointments"],
      }),
      listAppointmentTypes: build.query<
        ListAppointmentTypesApiResponse,
        ListAppointmentTypesApiArg
      >({
        query: (queryArg) => ({
          url: `/appointments/types`,
          params: {
            showPrivateOnly: queryArg,
          },
        }),
        providesTags: ["Appointments"],
      }),
      createAppointmentType: build.mutation<
        CreateAppointmentTypeApiResponse,
        CreateAppointmentTypeApiArg
      >({
        query: (queryArg) => ({
          url: `/appointments/types`,
          method: "POST",
          body: queryArg,
        }),
        invalidatesTags: ["Appointments"],
      }),
      getAppointmentType: build.query<
        GetAppointmentTypeApiResponse,
        GetAppointmentTypeApiArg
      >({
        query: (queryArg) => ({ url: `/appointments/types/${queryArg}` }),
        providesTags: ["Appointments"],
      }),
      deleteAppointmentType: build.mutation<
        DeleteAppointmentTypeApiResponse,
        DeleteAppointmentTypeApiArg
      >({
        query: (queryArg) => ({
          url: `/appointments/types/${queryArg}`,
          method: "DELETE",
        }),
        invalidatesTags: ["Appointments"],
      }),
      listAppointmentTypeDates: build.query<
        ListAppointmentTypeDatesApiResponse,
        ListAppointmentTypeDatesApiArg
      >({
        query: (queryArg) => ({ url: `/appointments/types/${queryArg}/dates` }),
        providesTags: ["Appointments"],
      }),
      listAppointmentTypeAvailableHosts: build.query<
        ListAppointmentTypeAvailableHostsApiResponse,
        ListAppointmentTypeAvailableHostsApiArg
      >({
        query: (queryArg) => ({ url: `/appointments/types/${queryArg}/hosts` }),
        providesTags: ["Appointments"],
      }),
      listAppointmentTypeAvailableDates: build.query<
        ListAppointmentTypeAvailableDatesApiResponse,
        ListAppointmentTypeAvailableDatesApiArg
      >({
        query: (queryArg) => ({
          url: `/appointments/types/${queryArg.typeId}/hosts/${queryArg.hostId}/dates`,
        }),
        providesTags: ["Appointments"],
      }),
      listAppointmentTypeStatusDates: build.query<
        ListAppointmentTypeStatusDatesApiResponse,
        ListAppointmentTypeStatusDatesApiArg
      >({
        query: (queryArg) => ({
          url: `/appointments/types/${queryArg.typeId}/hosts/${queryArg.hostId}/dates/status`,
        }),
        providesTags: ["Appointments"],
      }),
      deleteAppointment: build.mutation<
        DeleteAppointmentApiResponse,
        DeleteAppointmentApiArg
      >({
        query: (queryArg) => ({
          url: `/appointments/${queryArg}`,
          method: "DELETE",
        }),
        invalidatesTags: ["Appointments"],
      }),
      login: build.mutation<LoginApiResponse, LoginApiArg>({
        query: (queryArg) => ({
          url: `/auth/login`,
          method: "POST",
          body: queryArg,
        }),
        invalidatesTags: ["Auth"],
      }),
      logout: build.mutation<LogoutApiResponse, LogoutApiArg>({
        query: () => ({ url: `/auth/logout`, method: "POST" }),
        invalidatesTags: ["Auth"],
      }),
      refreshToken: build.mutation<RefreshTokenApiResponse, RefreshTokenApiArg>(
        {
          query: () => ({ url: `/auth/refresh-token`, method: "POST" }),
          invalidatesTags: ["Auth"],
        },
      ),
      updateBullyReport: build.mutation<
        UpdateBullyReportApiResponse,
        UpdateBullyReportApiArg
      >({
        query: (queryArg) => ({
          url: `/bully-reports`,
          method: "PUT",
          body: queryArg,
        }),
        invalidatesTags: ["Bully-Reports"],
      }),
      patchBullyReport: build.mutation<
        PatchBullyReportApiResponse,
        PatchBullyReportApiArg
      >({
        query: (queryArg) => ({
          url: `/bully-reports`,
          method: "PATCH",
          body: queryArg,
        }),
        invalidatesTags: ["Bully-Reports"],
      }),
      listBullyReports: build.query<
        ListBullyReportsApiResponse,
        ListBullyReportsApiArg
      >({
        query: (queryArg) => ({
          url: `/bully-reports`,
          params: {
            userId: queryArg.userId,
            items: queryArg.items,
            page: queryArg.page,
          },
        }),
        providesTags: ["Bully-Reports"],
      }),
      createBullyReport: build.mutation<
        CreateBullyReportApiResponse,
        CreateBullyReportApiArg
      >({
        query: (queryArg) => ({
          url: `/bully-reports`,
          method: "POST",
          body: queryArg,
        }),
        invalidatesTags: ["Bully-Reports"],
      }),
      getBullyReport: build.query<
        GetBullyReportApiResponse,
        GetBullyReportApiArg
      >({
        query: (queryArg) => ({ url: `/bully-reports/${queryArg}` }),
        providesTags: ["Bully-Reports"],
      }),
      deleteBullyReport: build.mutation<
        DeleteBullyReportApiResponse,
        DeleteBullyReportApiArg
      >({
        query: (queryArg) => ({
          url: `/bully-reports/${queryArg}`,
          method: "DELETE",
        }),
        invalidatesTags: ["Bully-Reports"],
      }),
      updateCourse: build.mutation<UpdateCourseApiResponse, UpdateCourseApiArg>(
        {
          query: (queryArg) => ({
            url: `/courses`,
            method: "PUT",
            body: queryArg,
          }),
          invalidatesTags: ["Courses"],
        },
      ),
      listCourses: build.query<ListCoursesApiResponse, ListCoursesApiArg>({
        query: (queryArg) => ({
          url: `/courses`,
          params: {
            userId: queryArg.userId,
            items: queryArg.items,
            page: queryArg.page,
          },
        }),
        providesTags: ["Courses"],
      }),
      createCourse: build.mutation<CreateCourseApiResponse, CreateCourseApiArg>(
        {
          query: (queryArg) => ({
            url: `/courses`,
            method: "POST",
            body: queryArg,
          }),
          invalidatesTags: ["Courses"],
        },
      ),
      getCourseStats: build.query<
        GetCourseStatsApiResponse,
        GetCourseStatsApiArg
      >({
        query: (queryArg) => ({
          url: `/courses/stats`,
          params: {
            startDate: queryArg.startDate,
            endDate: queryArg.endDate,
          },
        }),
        providesTags: ["Courses"],
      }),
      getCourse: build.query<GetCourseApiResponse, GetCourseApiArg>({
        query: (queryArg) => ({ url: `/courses/${queryArg}` }),
        providesTags: ["Courses"],
      }),
      deleteCourse: build.mutation<DeleteCourseApiResponse, DeleteCourseApiArg>(
        {
          query: (queryArg) => ({
            url: `/courses/${queryArg}`,
            method: "DELETE",
          }),
          invalidatesTags: ["Courses"],
        },
      ),
      listCalendarEvents: build.query<
        ListCalendarEventsApiResponse,
        ListCalendarEventsApiArg
      >({
        query: (queryArg) => ({
          url: `/events`,
          params: {
            startDate: queryArg.startDate,
            endDate: queryArg.endDate,
          },
        }),
        providesTags: ["Events"],
      }),
      createCalendarEvent: build.mutation<
        CreateCalendarEventApiResponse,
        CreateCalendarEventApiArg
      >({
        query: (queryArg) => ({
          url: `/events`,
          method: "POST",
          body: queryArg,
        }),
        invalidatesTags: ["Events"],
      }),
      deleteCalendarEvent: build.mutation<
        DeleteCalendarEventApiResponse,
        DeleteCalendarEventApiArg
      >({
        query: (queryArg) => ({ url: `/events/${queryArg}`, method: "DELETE" }),
        invalidatesTags: ["Events"],
      }),
      updateFailureReport: build.mutation<
        UpdateFailureReportApiResponse,
        UpdateFailureReportApiArg
      >({
        query: (queryArg) => ({
          url: `/failure-reports`,
          method: "PUT",
          body: queryArg,
        }),
        invalidatesTags: ["Failure-Reports"],
      }),
      patchFailureReport: build.mutation<
        PatchFailureReportApiResponse,
        PatchFailureReportApiArg
      >({
        query: (queryArg) => ({
          url: `/failure-reports`,
          method: "PATCH",
          body: queryArg,
        }),
        invalidatesTags: ["Failure-Reports"],
      }),
      listFailureReports: build.query<
        ListFailureReportsApiResponse,
        ListFailureReportsApiArg
      >({
        query: (queryArg) => ({
          url: `/failure-reports`,
          params: {
            startDate: queryArg.startDate,
            endDate: queryArg.endDate,
            items: queryArg.items,
            page: queryArg.page,
          },
        }),
        providesTags: ["Failure-Reports"],
      }),
      createFailureReport: build.mutation<
        CreateFailureReportApiResponse,
        CreateFailureReportApiArg
      >({
        query: (queryArg) => ({
          url: `/failure-reports`,
          method: "POST",
          body: queryArg,
        }),
        invalidatesTags: ["Failure-Reports"],
      }),
      getFailureReport: build.query<
        GetFailureReportApiResponse,
        GetFailureReportApiArg
      >({
        query: (queryArg) => ({ url: `/failure-reports/${queryArg}` }),
        providesTags: ["Failure-Reports"],
      }),
      deleteFailureReport: build.mutation<
        DeleteFailureReportApiResponse,
        DeleteFailureReportApiArg
      >({
        query: (queryArg) => ({
          url: `/failure-reports/${queryArg}`,
          method: "DELETE",
        }),
        invalidatesTags: ["Failure-Reports"],
      }),
      updateBanner: build.mutation<UpdateBannerApiResponse, UpdateBannerApiArg>(
        {
          query: (queryArg) => ({
            url: `/featured`,
            method: "PUT",
            body: queryArg,
          }),
          invalidatesTags: ["Featured"],
        },
      ),
      listBanners: build.query<ListBannersApiResponse, ListBannersApiArg>({
        query: () => ({ url: `/featured` }),
        providesTags: ["Featured"],
      }),
      createBanner: build.mutation<CreateBannerApiResponse, CreateBannerApiArg>(
        {
          query: (queryArg) => ({
            url: `/featured`,
            method: "POST",
            body: queryArg,
          }),
          invalidatesTags: ["Featured"],
        },
      ),
      getBanner: build.query<GetBannerApiResponse, GetBannerApiArg>({
        query: (queryArg) => ({ url: `/featured/${queryArg}` }),
        providesTags: ["Featured"],
      }),
      deleteBanner: build.mutation<DeleteBannerApiResponse, DeleteBannerApiArg>(
        {
          query: (queryArg) => ({
            url: `/featured/${queryArg}`,
            method: "DELETE",
          }),
          invalidatesTags: ["Featured"],
        },
      ),
      listLanguages: build.query<ListLanguagesApiResponse, ListLanguagesApiArg>(
        {
          query: () => ({ url: `/languages` }),
          providesTags: ["Languages"],
        },
      ),
      updateMenu: build.mutation<UpdateMenuApiResponse, UpdateMenuApiArg>({
        query: (queryArg) => ({ url: `/menus`, method: "PUT", body: queryArg }),
        invalidatesTags: ["Menus"],
      }),
      listMenus: build.query<ListMenusApiResponse, ListMenusApiArg>({
        query: (queryArg) => ({
          url: `/menus`,
          params: {
            languageId: queryArg,
          },
        }),
        providesTags: ["Menus"],
      }),
      createMenu: build.mutation<CreateMenuApiResponse, CreateMenuApiArg>({
        query: (queryArg) => ({
          url: `/menus`,
          method: "POST",
          body: queryArg,
        }),
        invalidatesTags: ["Menus"],
      }),
      getMenu: build.query<GetMenuApiResponse, GetMenuApiArg>({
        query: (queryArg) => ({ url: `/menus/${queryArg}` }),
        providesTags: ["Menus"],
      }),
      deleteMenu: build.mutation<DeleteMenuApiResponse, DeleteMenuApiArg>({
        query: (queryArg) => ({ url: `/menus/${queryArg}`, method: "DELETE" }),
        invalidatesTags: ["Menus"],
      }),
      updateObservation: build.mutation<
        UpdateObservationApiResponse,
        UpdateObservationApiArg
      >({
        query: (queryArg) => ({
          url: `/observations`,
          method: "PUT",
          body: queryArg,
        }),
        invalidatesTags: ["Observations"],
      }),
      listObservations: build.query<
        ListObservationsApiResponse,
        ListObservationsApiArg
      >({
        query: (queryArg) => ({
          url: `/observations`,
          params: {
            creatorId: queryArg.creatorId,
            items: queryArg.items,
            page: queryArg.page,
          },
        }),
        providesTags: ["Observations"],
      }),
      createObservation: build.mutation<
        CreateObservationApiResponse,
        CreateObservationApiArg
      >({
        query: (queryArg) => ({
          url: `/observations`,
          method: "POST",
          body: queryArg,
        }),
        invalidatesTags: ["Observations"],
      }),
      updateObservationLesson: build.mutation<
        UpdateObservationLessonApiResponse,
        UpdateObservationLessonApiArg
      >({
        query: (queryArg) => ({
          url: `/observations/lessons`,
          method: "PUT",
          body: queryArg,
        }),
        invalidatesTags: ["Observation-Lessons", "Observations"],
      }),
      listObservationLessons: build.query<
        ListObservationLessonsApiResponse,
        ListObservationLessonsApiArg
      >({
        query: () => ({ url: `/observations/lessons` }),
        providesTags: ["Observation-Lessons"],
      }),
      createObservationLesson: build.mutation<
        CreateObservationLessonApiResponse,
        CreateObservationLessonApiArg
      >({
        query: (queryArg) => ({
          url: `/observations/lessons`,
          method: "POST",
          body: queryArg,
        }),
        invalidatesTags: ["Observation-Lessons", "Observations"],
      }),
      getObservationLesson: build.query<
        GetObservationLessonApiResponse,
        GetObservationLessonApiArg
      >({
        query: (queryArg) => ({ url: `/observations/lessons/${queryArg}` }),
        providesTags: ["Observation-Lessons"],
      }),
      deleteObservationLesson: build.mutation<
        DeleteObservationLessonApiResponse,
        DeleteObservationLessonApiArg
      >({
        query: (queryArg) => ({
          url: `/observations/lessons/${queryArg}`,
          method: "DELETE",
        }),
        invalidatesTags: ["Observation-Lessons", "Observations"],
      }),
      updateObservationOption: build.mutation<
        UpdateObservationOptionApiResponse,
        UpdateObservationOptionApiArg
      >({
        query: (queryArg) => ({
          url: `/observations/options`,
          method: "PUT",
          body: queryArg,
        }),
        invalidatesTags: ["Observation-Options", "Observations"],
      }),
      listObservationOptions: build.query<
        ListObservationOptionsApiResponse,
        ListObservationOptionsApiArg
      >({
        query: () => ({ url: `/observations/options` }),
        providesTags: ["Observation-Options"],
      }),
      createObservationOption: build.mutation<
        CreateObservationOptionApiResponse,
        CreateObservationOptionApiArg
      >({
        query: (queryArg) => ({
          url: `/observations/options`,
          method: "POST",
          body: queryArg,
        }),
        invalidatesTags: ["Observation-Options", "Observations"],
      }),
      getObservationOption: build.query<
        GetObservationOptionApiResponse,
        GetObservationOptionApiArg
      >({
        query: (queryArg) => ({ url: `/observations/options/${queryArg}` }),
        providesTags: ["Observation-Options"],
      }),
      deleteObservationOption: build.mutation<
        DeleteObservationOptionApiResponse,
        DeleteObservationOptionApiArg
      >({
        query: (queryArg) => ({
          url: `/observations/options/${queryArg}`,
          method: "DELETE",
        }),
        invalidatesTags: ["Observation-Options", "Observations"],
      }),
      getObservationStats: build.query<
        GetObservationStatsApiResponse,
        GetObservationStatsApiArg
      >({
        query: (queryArg) => ({
          url: `/observations/stats`,
          params: {
            studentId: queryArg.studentId,
            startDate: queryArg.startDate,
            endDate: queryArg.endDate,
          },
        }),
        providesTags: ["Observations"],
      }),
      updateObservationStudent: build.mutation<
        UpdateObservationStudentApiResponse,
        UpdateObservationStudentApiArg
      >({
        query: (queryArg) => ({
          url: `/observations/students`,
          method: "PUT",
          body: queryArg,
        }),
        invalidatesTags: ["Observation-Students", "Observations"],
      }),
      listObservationStudents: build.query<
        ListObservationStudentsApiResponse,
        ListObservationStudentsApiArg
      >({
        query: (queryArg) => ({
          url: `/observations/students`,
          params: {
            showEnabledOnly: queryArg,
          },
        }),
        providesTags: ["Observation-Students"],
      }),
      createObservationStudent: build.mutation<
        CreateObservationStudentApiResponse,
        CreateObservationStudentApiArg
      >({
        query: (queryArg) => ({
          url: `/observations/students`,
          method: "POST",
          body: queryArg,
        }),
        invalidatesTags: ["Observation-Students", "Observations"],
      }),
      getObservationStudent: build.query<
        GetObservationStudentApiResponse,
        GetObservationStudentApiArg
      >({
        query: (queryArg) => ({ url: `/observations/students/${queryArg}` }),
        providesTags: ["Observation-Students"],
      }),
      deleteObservationStudent: build.mutation<
        DeleteObservationStudentApiResponse,
        DeleteObservationStudentApiArg
      >({
        query: (queryArg) => ({
          url: `/observations/students/${queryArg}`,
          method: "DELETE",
        }),
        invalidatesTags: ["Observation-Students", "Observations"],
      }),
      getObservation: build.query<
        GetObservationApiResponse,
        GetObservationApiArg
      >({
        query: (queryArg) => ({ url: `/observations/${queryArg}` }),
        providesTags: ["Observations"],
      }),
      deleteObservation: build.mutation<
        DeleteObservationApiResponse,
        DeleteObservationApiArg
      >({
        query: (queryArg) => ({
          url: `/observations/${queryArg}`,
          method: "DELETE",
        }),
        invalidatesTags: ["Observations"],
      }),
      updatePost: build.mutation<UpdatePostApiResponse, UpdatePostApiArg>({
        query: (queryArg) => ({ url: `/posts`, method: "PUT", body: queryArg }),
        invalidatesTags: ["Posts"],
      }),
      listPosts: build.query<ListPostsApiResponse, ListPostsApiArg>({
        query: (queryArg) => ({
          url: `/posts`,
          params: {
            searchTerm: queryArg.searchTerm,
            items: queryArg.items,
            page: queryArg.page,
          },
        }),
        providesTags: ["Posts"],
      }),
      createPost: build.mutation<CreatePostApiResponse, CreatePostApiArg>({
        query: (queryArg) => ({
          url: `/posts`,
          method: "POST",
          body: queryArg,
        }),
        invalidatesTags: ["Posts"],
      }),
      getPost: build.query<GetPostApiResponse, GetPostApiArg>({
        query: (queryArg) => ({ url: `/posts/${queryArg}` }),
        providesTags: ["Posts"],
      }),
      deletePost: build.mutation<DeletePostApiResponse, DeletePostApiArg>({
        query: (queryArg) => ({ url: `/posts/${queryArg}`, method: "DELETE" }),
        invalidatesTags: ["Posts"],
      }),
      getPostByUrlPublic: build.query<
        GetPostByUrlPublicApiResponse,
        GetPostByUrlPublicApiArg
      >({
        query: (queryArg) => ({
          url: `/public/${queryArg.languageId}/posts/menu/${queryArg.menuUrl}`,
        }),
        providesTags: ["Public"],
      }),
      listClassdays: build.query<ListClassdaysApiResponse, ListClassdaysApiArg>(
        {
          query: () => ({ url: `/school/classdays` }),
          providesTags: ["School"],
        },
      ),
      upsertClassroom: build.mutation<
        UpsertClassroomApiResponse,
        UpsertClassroomApiArg
      >({
        query: (queryArg) => ({
          url: `/school/classrooms`,
          method: "PUT",
          body: queryArg,
        }),
        invalidatesTags: ["School"],
      }),
      listClassrooms: build.query<
        ListClassroomsApiResponse,
        ListClassroomsApiArg
      >({
        query: () => ({ url: `/school/classrooms` }),
        providesTags: ["School"],
      }),
      getClassroom: build.query<GetClassroomApiResponse, GetClassroomApiArg>({
        query: (queryArg) => ({ url: `/school/classrooms/${queryArg}` }),
        providesTags: ["School"],
      }),
      deleteClassroom: build.mutation<
        DeleteClassroomApiResponse,
        DeleteClassroomApiArg
      >({
        query: (queryArg) => ({
          url: `/school/classrooms/${queryArg}`,
          method: "DELETE",
        }),
        invalidatesTags: ["School"],
      }),
      upsertClasstime: build.mutation<
        UpsertClasstimeApiResponse,
        UpsertClasstimeApiArg
      >({
        query: (queryArg) => ({
          url: `/school/classtimes`,
          method: "PUT",
          body: queryArg,
        }),
        invalidatesTags: ["School"],
      }),
      listClasstimes: build.query<
        ListClasstimesApiResponse,
        ListClasstimesApiArg
      >({
        query: () => ({ url: `/school/classtimes` }),
        providesTags: ["School"],
      }),
      getClasstime: build.query<GetClasstimeApiResponse, GetClasstimeApiArg>({
        query: (queryArg) => ({ url: `/school/classtimes/${queryArg}` }),
        providesTags: ["School"],
      }),
      deleteClasstime: build.mutation<
        DeleteClasstimeApiResponse,
        DeleteClasstimeApiArg
      >({
        query: (queryArg) => ({
          url: `/school/classtimes/${queryArg}`,
          method: "DELETE",
        }),
        invalidatesTags: ["School"],
      }),
      updateShortDay: build.mutation<
        UpdateShortDayApiResponse,
        UpdateShortDayApiArg
      >({
        query: (queryArg) => ({
          url: `/school/short-days`,
          method: "PUT",
          body: queryArg,
        }),
        invalidatesTags: ["School"],
      }),
      listShortDays: build.query<ListShortDaysApiResponse, ListShortDaysApiArg>(
        {
          query: () => ({ url: `/school/short-days` }),
          providesTags: ["School"],
        },
      ),
      createShortDay: build.mutation<
        CreateShortDayApiResponse,
        CreateShortDayApiArg
      >({
        query: (queryArg) => ({
          url: `/school/short-days`,
          method: "POST",
          body: queryArg,
        }),
        invalidatesTags: ["School"],
      }),
      getShortDay: build.query<GetShortDayApiResponse, GetShortDayApiArg>({
        query: (queryArg) => ({ url: `/school/short-days/${queryArg}` }),
        providesTags: ["School"],
      }),
      deleteShortDay: build.mutation<
        DeleteShortDayApiResponse,
        DeleteShortDayApiArg
      >({
        query: (queryArg) => ({
          url: `/school/short-days/${queryArg}`,
          method: "DELETE",
        }),
        invalidatesTags: ["School"],
      }),
      getTimetableStats: build.query<
        GetTimetableStatsApiResponse,
        GetTimetableStatsApiArg
      >({
        query: () => ({ url: `/school/timetable` }),
        providesTags: ["School"],
      }),
      deleteTimetable: build.mutation<
        DeleteTimetableApiResponse,
        DeleteTimetableApiArg
      >({
        query: (queryArg) => ({
          url: `/school/timetable`,
          method: "DELETE",
          body: queryArg,
        }),
        invalidatesTags: ["School"],
      }),
      createTimetable: build.mutation<
        CreateTimetableApiResponse,
        CreateTimetableApiArg
      >({
        query: (queryArg) => ({
          url: `/school/timetable`,
          method: "POST",
          body: queryArg,
        }),
        invalidatesTags: ["School"],
      }),
      getRandomImageSettings: build.query<
        GetRandomImageSettingsApiResponse,
        GetRandomImageSettingsApiArg
      >({
        query: () => ({ url: `/settings/random-image` }),
        providesTags: ["Settings"],
      }),
      postRandomImageSettings: build.mutation<
        PostRandomImageSettingsApiResponse,
        PostRandomImageSettingsApiArg
      >({
        query: (queryArg) => ({
          url: `/settings/random-image`,
          method: "POST",
          body: queryArg,
        }),
        invalidatesTags: ["Settings"],
      }),
      listTeachers: build.query<ListTeachersApiResponse, ListTeachersApiArg>({
        query: () => ({ url: `/teachers` }),
        providesTags: ["Teachers"],
      }),
      listUsers: build.query<ListUsersApiResponse, ListUsersApiArg>({
        query: () => ({ url: `/users` }),
        providesTags: ["Users"],
      }),
    }),
    overrideExisting: false,
  });
export { injectedRtkApi as generatedApi };
export type UpdateAchievementApiResponse =
  /** status 200 Success */ AchievementResponse;
export type UpdateAchievementApiArg = UpdateAchievementRequest;
export type ListAchievementsApiResponse =
  /** status 200 Success */ PaginatedListResponseOfAchievementResponse;
export type ListAchievementsApiArg = {
  userId?: null | number;
  items: number;
  page: number;
};
export type CreateAchievementApiResponse =
  /** status 200 Success */ AchievementResponse;
export type CreateAchievementApiArg = CreateAchievementRequest;
export type ListAchievementScalesApiResponse =
  /** status 200 Success */ IEnumerableOfAchievementScaleResponse;
export type ListAchievementScalesApiArg = void;
export type GetAchievementStatsApiResponse =
  /** status 200 Success */ GetAchievementStatsResponse;
export type GetAchievementStatsApiArg = {
  startDate: string;
  endDate: string;
};
export type ListAchievementTypesApiResponse =
  /** status 200 Success */ IEnumerableOfAchievementTypeResponse;
export type ListAchievementTypesApiArg = void;
export type GetAchievementApiResponse =
  /** status 200 Success */ AchievementResponse;
export type GetAchievementApiArg = number;
export type DeleteAchievementApiResponse = unknown;
export type DeleteAchievementApiArg = number;
export type ListAppointmentsApiResponse =
  /** status 200 Success */ PaginatedListResponseOfAppointmentResponse;
export type ListAppointmentsApiArg = {
  userId?: null | number;
  items: number;
  page: number;
};
export type CreateAppointmentApiResponse =
  /** status 200 Success */ AppointmentResponse;
export type CreateAppointmentApiArg = CreateAppointmentRequest;
export type UpdateAppointmentDatesApiResponse = unknown;
export type UpdateAppointmentDatesApiArg = UpdateAppointmentDatesRequest;
export type UpdateAppointmentReservedDatesApiResponse = unknown;
export type UpdateAppointmentReservedDatesApiArg =
  UpdateAppointmentReservedDatesRequest;
export type ResetAppointmentTypeApiResponse = unknown;
export type ResetAppointmentTypeApiArg = number;
export type UpdateAppointmentTypeApiResponse =
  /** status 200 Success */ AppointmentTypeDetailedResponse;
export type UpdateAppointmentTypeApiArg = UpdateAppointmentTypeRequest;
export type ListAppointmentTypesApiResponse =
  /** status 200 Success */ IEnumerableOfAppointmentTypeDetailedResponse;
export type ListAppointmentTypesApiArg = (null | boolean) | undefined;
export type CreateAppointmentTypeApiResponse =
  /** status 200 Success */ AppointmentTypeDetailedResponse;
export type CreateAppointmentTypeApiArg = CreateAppointmentTypeRequest;
export type GetAppointmentTypeApiResponse =
  /** status 200 Success */ AppointmentTypeDetailedResponse;
export type GetAppointmentTypeApiArg = number;
export type DeleteAppointmentTypeApiResponse = unknown;
export type DeleteAppointmentTypeApiArg = number;
export type ListAppointmentTypeDatesApiResponse =
  /** status 200 Success */ ListOfAppointmentDateResponse;
export type ListAppointmentTypeDatesApiArg = number;
export type ListAppointmentTypeAvailableHostsApiResponse =
  /** status 200 Success */ IEnumerableOfAppointmentHostResponse;
export type ListAppointmentTypeAvailableHostsApiArg = number;
export type ListAppointmentTypeAvailableDatesApiResponse =
  /** status 200 Success */ IEnumerableOfAppointmentDateResponse;
export type ListAppointmentTypeAvailableDatesApiArg = {
  typeId: number;
  hostId: number;
};
export type ListAppointmentTypeStatusDatesApiResponse =
  /** status 200 Success */ ListOfAppointmentDateStatusResponse;
export type ListAppointmentTypeStatusDatesApiArg = {
  typeId: number;
  hostId: number;
};
export type DeleteAppointmentApiResponse = unknown;
export type DeleteAppointmentApiArg = string;
export type LoginApiResponse = /** status 200 Success */ AuthorizationResponse;
export type LoginApiArg = LoginRequest;
export type LogoutApiResponse = unknown;
export type LogoutApiArg = void;
export type RefreshTokenApiResponse =
  /** status 200 Success */ AuthorizationResponse;
export type RefreshTokenApiArg = void;
export type UpdateBullyReportApiResponse =
  /** status 200 Success */ BullyReportResponse;
export type UpdateBullyReportApiArg = UpdateBullyReportRequest;
export type PatchBullyReportApiResponse = unknown;
export type PatchBullyReportApiArg = PatchBullyReportRequest;
export type ListBullyReportsApiResponse =
  /** status 200 Success */ PaginatedListResponseOfBullyReportResponse;
export type ListBullyReportsApiArg = {
  userId?: null | number;
  items: number;
  page: number;
};
export type CreateBullyReportApiResponse =
  /** status 200 Success */ BullyReportResponse;
export type CreateBullyReportApiArg = CreateBullyReportRequest;
export type GetBullyReportApiResponse =
  /** status 200 Success */ BullyReportResponse;
export type GetBullyReportApiArg = number;
export type DeleteBullyReportApiResponse = unknown;
export type DeleteBullyReportApiArg = number;
export type UpdateCourseApiResponse = /** status 200 Success */ CourseResponse;
export type UpdateCourseApiArg = UpdateCourseRequest;
export type ListCoursesApiResponse =
  /** status 200 Success */ PaginatedListResponseOfCourseResponse;
export type ListCoursesApiArg = {
  userId?: null | number;
  items: number;
  page: number;
};
export type CreateCourseApiResponse = /** status 200 Success */ CourseResponse;
export type CreateCourseApiArg = CreateCourseRequest;
export type GetCourseStatsApiResponse =
  /** status 200 Success */ GetCourseStatsResponse;
export type GetCourseStatsApiArg = {
  startDate: string;
  endDate: string;
};
export type GetCourseApiResponse = /** status 200 Success */ CourseResponse;
export type GetCourseApiArg = number;
export type DeleteCourseApiResponse = unknown;
export type DeleteCourseApiArg = number;
export type ListCalendarEventsApiResponse =
  /** status 200 Success */ ListOfCalendarEvent;
export type ListCalendarEventsApiArg = {
  startDate: string;
  endDate: string;
};
export type CreateCalendarEventApiResponse =
  /** status 200 Success */ ListOfCreateCalendarEventResponse;
export type CreateCalendarEventApiArg = ListOfCreateCalendarEventRequest;
export type DeleteCalendarEventApiResponse = unknown;
export type DeleteCalendarEventApiArg = null | string;
export type UpdateFailureReportApiResponse =
  /** status 200 Success */ FailureReportResponse;
export type UpdateFailureReportApiArg = UpdateFailureReportRequest;
export type PatchFailureReportApiResponse = unknown;
export type PatchFailureReportApiArg = PatchFailureReportRequest;
export type ListFailureReportsApiResponse =
  /** status 200 Success */ PaginatedListResponseOfFailureReportResponse;
export type ListFailureReportsApiArg = {
  startDate: string;
  endDate: string;
  items: number;
  page: number;
};
export type CreateFailureReportApiResponse =
  /** status 200 Success */ FailureReportResponse;
export type CreateFailureReportApiArg = CreateFailureReportRequest;
export type GetFailureReportApiResponse =
  /** status 200 Success */ FailureReportResponse;
export type GetFailureReportApiArg = number;
export type DeleteFailureReportApiResponse = unknown;
export type DeleteFailureReportApiArg = number;
export type UpdateBannerApiResponse = /** status 200 Success */ BannerResponse;
export type UpdateBannerApiArg = UpdateBannerRequest;
export type ListBannersApiResponse =
  /** status 200 Success */ IEnumerableOfBannerResponse;
export type ListBannersApiArg = void;
export type CreateBannerApiResponse = /** status 200 Success */ BannerResponse;
export type CreateBannerApiArg = CreateBannerRequest;
export type GetBannerApiResponse = /** status 200 Success */ BannerResponse;
export type GetBannerApiArg = number;
export type DeleteBannerApiResponse = unknown;
export type DeleteBannerApiArg = number;
export type ListLanguagesApiResponse =
  /** status 200 Success */ IEnumerableOfLanguageResponse;
export type ListLanguagesApiArg = void;
export type UpdateMenuApiResponse = /** status 200 Success */ MenuResponse;
export type UpdateMenuApiArg = UpdateMenuRequest;
export type ListMenusApiResponse =
  /** status 200 Success */ IEnumerableOfMenuResponse;
export type ListMenusApiArg = (null | string) | undefined;
export type CreateMenuApiResponse = /** status 200 Success */ MenuResponse;
export type CreateMenuApiArg = CreateMenuRequest;
export type GetMenuApiResponse = /** status 200 Success */ MenuResponse;
export type GetMenuApiArg = number;
export type DeleteMenuApiResponse = unknown;
export type DeleteMenuApiArg = number;
export type UpdateObservationApiResponse =
  /** status 200 Success */ ObservationResponse;
export type UpdateObservationApiArg = UpdateObservationRequest;
export type ListObservationsApiResponse =
  /** status 200 Success */ PaginatedListResponseOfObservationResponse;
export type ListObservationsApiArg = {
  creatorId?: null | number;
  items: number;
  page: number;
};
export type CreateObservationApiResponse =
  /** status 200 Success */ ObservationResponse;
export type CreateObservationApiArg = CreateObservationRequest;
export type UpdateObservationLessonApiResponse =
  /** status 200 Success */ ObservationLessonResponse;
export type UpdateObservationLessonApiArg = UpdateObservationLessonRequest;
export type ListObservationLessonsApiResponse =
  /** status 200 Success */ IEnumerableOfObservationLessonResponse;
export type ListObservationLessonsApiArg = void;
export type CreateObservationLessonApiResponse =
  /** status 200 Success */ ObservationLessonResponse;
export type CreateObservationLessonApiArg = CreateObservationLessonRequest;
export type GetObservationLessonApiResponse =
  /** status 200 Success */ ObservationLessonResponse;
export type GetObservationLessonApiArg = number;
export type DeleteObservationLessonApiResponse = unknown;
export type DeleteObservationLessonApiArg = number;
export type UpdateObservationOptionApiResponse =
  /** status 200 Success */ ObservationOptionResponse;
export type UpdateObservationOptionApiArg = UpdateObservationOptionRequest;
export type ListObservationOptionsApiResponse =
  /** status 200 Success */ IEnumerableOfObservationOptionResponse;
export type ListObservationOptionsApiArg = void;
export type CreateObservationOptionApiResponse =
  /** status 200 Success */ ObservationOptionResponse;
export type CreateObservationOptionApiArg = CreateObservationOptionRequest;
export type GetObservationOptionApiResponse =
  /** status 200 Success */ ObservationOptionResponse;
export type GetObservationOptionApiArg = number;
export type DeleteObservationOptionApiResponse = unknown;
export type DeleteObservationOptionApiArg = number;
export type GetObservationStatsApiResponse =
  /** status 200 Success */ GetObservationStatsResponse;
export type GetObservationStatsApiArg = {
  studentId: number;
  startDate: string;
  endDate: string;
};
export type UpdateObservationStudentApiResponse =
  /** status 200 Success */ ObservationStudentResponse;
export type UpdateObservationStudentApiArg = UpdateObservationStudentRequest;
export type ListObservationStudentsApiResponse =
  /** status 200 Success */ IEnumerableOfObservationStudentResponse;
export type ListObservationStudentsApiArg = (null | boolean) | undefined;
export type CreateObservationStudentApiResponse =
  /** status 200 Success */ ObservationStudentResponse;
export type CreateObservationStudentApiArg = CreateObservationStudentRequest;
export type GetObservationStudentApiResponse =
  /** status 200 Success */ ObservationStudentResponse;
export type GetObservationStudentApiArg = number;
export type DeleteObservationStudentApiResponse = unknown;
export type DeleteObservationStudentApiArg = number;
export type GetObservationApiResponse =
  /** status 200 Success */ ObservationResponse;
export type GetObservationApiArg = number;
export type DeleteObservationApiResponse = unknown;
export type DeleteObservationApiArg = number;
export type UpdatePostApiResponse = /** status 200 Success */ PostResponse;
export type UpdatePostApiArg = UpdatePostRequest;
export type ListPostsApiResponse =
  /** status 200 Success */ PaginatedListResponseOfPostResponse;
export type ListPostsApiArg = {
  searchTerm?: null | string;
  items: number;
  page: number;
};
export type CreatePostApiResponse = /** status 200 Success */ PostResponse;
export type CreatePostApiArg = CreatePostRequest;
export type GetPostApiResponse = /** status 200 Success */ PostResponse;
export type GetPostApiArg = number;
export type DeletePostApiResponse = unknown;
export type DeletePostApiArg = number;
export type GetPostByUrlPublicApiResponse =
  /** status 200 Success */ GetPostPublicResponse;
export type GetPostByUrlPublicApiArg = {
  menuUrl: string;
  languageId: string;
};
export type ListClassdaysApiResponse =
  /** status 200 Success */ IEnumerableOfClassdayResponse;
export type ListClassdaysApiArg = void;
export type UpsertClassroomApiResponse =
  /** status 200 Success */ ClassroomResponse;
export type UpsertClassroomApiArg = UpsertClassroomRequest;
export type ListClassroomsApiResponse =
  /** status 200 Success */ IEnumerableOfClassroomResponse;
export type ListClassroomsApiArg = void;
export type GetClassroomApiResponse =
  /** status 200 Success */ ClassroomResponse;
export type GetClassroomApiArg = number;
export type DeleteClassroomApiResponse = unknown;
export type DeleteClassroomApiArg = number;
export type UpsertClasstimeApiResponse =
  /** status 200 Success */ ClasstimeResponse;
export type UpsertClasstimeApiArg = UpsertClasstimeRequest;
export type ListClasstimesApiResponse =
  /** status 200 Success */ IEnumerableOfClasstimeResponse;
export type ListClasstimesApiArg = void;
export type GetClasstimeApiResponse =
  /** status 200 Success */ ClasstimeResponse;
export type GetClasstimeApiArg = number;
export type DeleteClasstimeApiResponse = unknown;
export type DeleteClasstimeApiArg = number;
export type UpdateShortDayApiResponse =
  /** status 200 Success */ ShortDayResponse;
export type UpdateShortDayApiArg = UpdateShortDayRequest;
export type ListShortDaysApiResponse =
  /** status 200 Success */ IEnumerableOfShortDayResponse;
export type ListShortDaysApiArg = void;
export type CreateShortDayApiResponse =
  /** status 200 Success */ ShortDayResponse;
export type CreateShortDayApiArg = CreateShortDayRequest;
export type GetShortDayApiResponse = /** status 200 Success */ ShortDayResponse;
export type GetShortDayApiArg = number;
export type DeleteShortDayApiResponse = unknown;
export type DeleteShortDayApiArg = number;
export type GetTimetableStatsApiResponse =
  /** status 200 Success */ IEnumerableOfTimetableStatsResponse;
export type GetTimetableStatsApiArg = void;
export type DeleteTimetableApiResponse = unknown;
export type DeleteTimetableApiArg = ListOfInt32;
export type CreateTimetableApiResponse = unknown;
export type CreateTimetableApiArg = ListOfCreateTimetableRequest;
export type GetRandomImageSettingsApiResponse =
  /** status 200 Success */ RandomImageSettings;
export type GetRandomImageSettingsApiArg = void;
export type PostRandomImageSettingsApiResponse =
  /** status 200 Success */ RandomImageSettings;
export type PostRandomImageSettingsApiArg = RandomImageSettings;
export type ListTeachersApiResponse =
  /** status 200 Success */ IEnumerableOfUserResponse;
export type ListTeachersApiArg = void;
export type ListUsersApiResponse =
  /** status 200 Success */ IEnumerableOfUserResponse;
export type ListUsersApiArg = void;
export type DateOnly = string;
export type UserResponse = {
  id: number;
  name: string;
  normalizedName: string;
};
export type ListOfUserResponse = UserResponse[];
export type AchievementStudentResponse = {
  id: number;
  name: string;
  classroomId: number;
  classroomName: string;
  achievementTypeId: number;
  achievementTypeName: string;
};
export type ListOfAchievementStudentResponse = AchievementStudentResponse[];
export type AchievementResponse = {
  id: number;
  name: string;
  date: DateOnly;
  creatorId: number;
  creatorName: string;
  scaleId: number;
  scaleName: string;
  additionalTeachers: ListOfUserResponse;
  students: ListOfAchievementStudentResponse;
};
export type ListOfInt32 = number[];
export type AchievementStudentRequest = {
  name: string;
  achievementTypeId: number;
  classroomId: number;
};
export type ListOfAchievementStudentRequest = AchievementStudentRequest[];
export type UpdateAchievementRequest = {
  id: number;
  name: string;
  date: DateOnly;
  scaleId: number;
  additionalTeachers: ListOfInt32;
  students: ListOfAchievementStudentRequest;
};
export type ListOfAchievementResponse = AchievementResponse[];
export type PaginatedListResponseOfAchievementResponse = {
  items: ListOfAchievementResponse;
  page: number;
  totalItems: number;
  totalPages: number;
  hasPreviousPage?: boolean;
  hasNextPage?: boolean;
};
export type CreateAchievementRequest = {
  name: string;
  date: DateOnly;
  scaleId: number;
  additionalTeachers: ListOfInt32;
  students: ListOfAchievementStudentRequest;
};
export type AchievementScaleResponse = {
  id: number;
  name: string;
};
export type IEnumerableOfAchievementScaleResponse = AchievementScaleResponse[];
export type GetAchievementStatsResponseTypeStatsResponse = {
  id: number;
  name: string;
  count: number;
};
export type ListOfTypeStatsResponse =
  GetAchievementStatsResponseTypeStatsResponse[];
export type GetAchievementStatsResponse = {
  recordsCount: number;
  studentsCount: number;
  teachersCount: number;
  typeStats: ListOfTypeStatsResponse;
};
export type AchievementTypeResponse = {
  id: number;
  name: string;
};
export type IEnumerableOfAchievementTypeResponse = AchievementTypeResponse[];
export type AppointmentResponse = {
  id: string;
  link: null | string;
  date: string;
  dateId?: number;
  typeName: string;
  note: null | string;
  hostName: string;
  hostId: number;
  attendeeName: string;
  attendeeEmail: string;
};
export type ListOfAppointmentResponse = AppointmentResponse[];
export type PaginatedListResponseOfAppointmentResponse = {
  items: ListOfAppointmentResponse;
  page: number;
  totalItems: number;
  totalPages: number;
  hasPreviousPage?: boolean;
  hasNextPage?: boolean;
};
export type ProblemDetails = {
  type?: null | string;
  title?: null | string;
  status?: number;
  instance?: string;
  traceId?: string;
  /** the details of the error */
  detail?: null | string;
  errors?: {
    /** the name of the error or property of the dto that caused the error */
    name?: string;
    /** the reason for the error */
    reason?: string;
    /** the code of the error */
    code?: null | string;
    /** the severity of the error */
    severity?: null | string;
  }[];
};
export type CreateAppointmentRequest = {
  typeId: number;
  hostId: number;
  dateId: number;
};
export type HashSetOfDateTime = string[];
export type UpdateAppointmentDatesRequest = {
  id: number;
  dates: HashSetOfDateTime;
};
export type HashSetOfInt32 = number[];
export type UpdateAppointmentReservedDatesRequest = {
  id: number;
  hostId: number;
  dateIds: HashSetOfInt32;
};
export type AppointmentTypeDetailedResponse = {
  durationInMinutes: number;
  isPublic: boolean;
  isOnline: boolean;
  additionalInviteeIds: ListOfInt32;
  exclusiveHostIds: ListOfInt32;
  id: number;
  name: string;
  description: string;
  registrationEndsAt: string;
};
export type UpdateAppointmentTypeRequest = {
  id: number;
  name: string;
  description: string;
  durationInMinutes: number;
  isOnline: boolean;
  isPublic: boolean;
  registrationEndsAt: string;
  additionalInviteeIds: ListOfInt32;
  exclusiveHostIds: ListOfInt32;
};
export type IEnumerableOfAppointmentTypeDetailedResponse =
  AppointmentTypeDetailedResponse[];
export type CreateAppointmentTypeRequest = {
  name: string;
  description: string;
  durationInMinutes: number;
  isOnline: boolean;
  isPublic: boolean;
  registrationEndsAt: string;
  additionalInviteeIds: ListOfInt32;
  exclusiveHostIds: ListOfInt32;
};
export type AppointmentDateResponse = {
  id: number;
  date: string;
};
export type ListOfAppointmentDateResponse = AppointmentDateResponse[];
export type AppointmentHostResponse = {
  id: number;
  name: string;
  normalizedName: string;
};
export type IEnumerableOfAppointmentHostResponse = AppointmentHostResponse[];
export type IEnumerableOfAppointmentDateResponse = AppointmentDateResponse[];
export type AppointmentDateStatusResponse = {
  isRegistered: boolean;
  isReserved: boolean;
  id: number;
  date: string;
};
export type ListOfAppointmentDateStatusResponse =
  AppointmentDateStatusResponse[];
export type ListOfString = string[];
export type AuthorizationResponse = {
  id: number;
  token: string;
  name: string;
  email: string;
  roles: ListOfString;
};
export type LoginRequest = {
  token: string;
};
export type BullyReportResponse = {
  id: number;
  isPublicReport: boolean;
  createdAt: string;
  date: DateOnly;
  victimName: string;
  bullyName: string;
  location: string;
  details: string;
  observers?: null | string;
  actions?: null | string;
  creatorName?: null | string;
  creatorId?: null | number;
};
export type UpdateBullyReportRequest = {
  id: number;
  observers?: null | string;
  date: DateOnly;
  victimName: string;
  bullyName: string;
  location: string;
  details: string;
  actions?: null | string;
};
export type PatchBullyReportRequest = {
  id: number;
  actions?: null | string;
};
export type ListOfBullyReportResponse = BullyReportResponse[];
export type PaginatedListResponseOfBullyReportResponse = {
  items: ListOfBullyReportResponse;
  page: number;
  totalItems: number;
  totalPages: number;
  hasPreviousPage?: boolean;
  hasNextPage?: boolean;
};
export type CreateBullyReportRequest = {
  date: DateOnly;
  victimName: string;
  bullyName: string;
  location: string;
  details: string;
  actions?: null | string;
};
export type CourseResponse = {
  id: number;
  title: string;
  organizer: string;
  startDate: DateOnly;
  endDate: DateOnly;
  durationInHours: number;
  certificate?: null | string;
  isUseful: boolean;
  creatorId: number;
  creatorName: string;
};
export type UpdateCourseRequest = {
  id: number;
  title: string;
  organizer: string;
  startDate: DateOnly;
  endDate: DateOnly;
  durationInHours: number;
  certificate?: null | string;
  isUseful: boolean;
};
export type ListOfCourseResponse = CourseResponse[];
export type PaginatedListResponseOfCourseResponse = {
  items: ListOfCourseResponse;
  page: number;
  totalItems: number;
  totalPages: number;
  hasPreviousPage?: boolean;
  hasNextPage?: boolean;
};
export type CreateCourseRequest = {
  title: string;
  organizer: string;
  startDate: DateOnly;
  endDate: DateOnly;
  durationInHours: number;
  certificate?: null | string;
  isUseful: boolean;
};
export type GetCourseStatsResponseTeacherStatsResponse = {
  id: number;
  name: string;
  recordsCount: number;
  totalDuration: number;
};
export type ListOfTeacherStatsResponse =
  GetCourseStatsResponseTeacherStatsResponse[];
export type GetCourseStatsResponse = {
  recordsCount: number;
  totalDuration: number;
  teachers: ListOfTeacherStatsResponse;
};
export type CalendarEvent = {
  id: string;
  title: string;
  startDate: string;
  endDate: string;
  allDay: boolean;
};
export type ListOfCalendarEvent = CalendarEvent[];
export type CreateCalendarEventResponse = {
  id: string;
  title: string;
  startDate: string;
  endDate: string;
};
export type ListOfCreateCalendarEventResponse = CreateCalendarEventResponse[];
export type CreateCalendarEventRequest = {
  title: string;
  startDate: string;
  endDate: string;
  allDay: boolean;
};
export type ListOfCreateCalendarEventRequest = CreateCalendarEventRequest[];
export type FailureReportResponse = {
  id: number;
  creatorName: string;
  creatorId: number;
  details: string;
  location: string;
  isFixed: null | boolean;
  reportDate: string;
  fixDate: null | string;
};
export type UpdateFailureReportRequest = {
  id: number;
  location: string;
  details: string;
};
export type PatchFailureReportRequest = {
  id: number;
  isFixed?: null | boolean;
  note?: null | string;
};
export type ListOfFailureReportResponse = FailureReportResponse[];
export type PaginatedListResponseOfFailureReportResponse = {
  items: ListOfFailureReportResponse;
  page: number;
  totalItems: number;
  totalPages: number;
  hasPreviousPage?: boolean;
  hasNextPage?: boolean;
};
export type CreateFailureReportRequest = {
  location: string;
  details: string;
};
export type BannerResponse = {
  id: number;
  title: string;
  url: string;
  width: number;
  height: number;
  isPublished: boolean;
  imageUrl: string;
  order: number;
  languageId: string;
  language: string;
};
export type UpdateBannerRequest = {
  id: number;
  image?: null | Blob;
  title: string;
  url: string;
  width: number;
  height: number;
  isPublished: boolean;
  order: number;
  languageId: string;
};
export type IEnumerableOfBannerResponse = BannerResponse[];
export type CreateBannerRequest = {
  image: Blob;
  title: string;
  url: string;
  width: number;
  height: number;
  isPublished: boolean;
  order: number;
  languageId: string;
};
export type LanguageResponse = {
  id: string;
  name: string;
};
export type IEnumerableOfLanguageResponse = LanguageResponse[];
export type MenuResponse = {
  id: number;
  order: number;
  isPublished: boolean;
  isHidden: boolean;
  title: string;
  url?: null | string;
  postId?: null | number;
  postTitle?: null | string;
  languageName: string;
  languageId: string;
  parentMenuId?: null | number;
  children?: null | MenuResponse[];
};
export type UpdateMenuRequest = {
  id: number;
  order: number;
  isPublished: boolean;
  isHidden: boolean;
  title: string;
  languageId: string;
  url?: null | string;
  postId?: null | number;
  parentMenuId?: null | number;
};
export type IEnumerableOfMenuResponse = MenuResponse[];
export type CreateMenuRequest = {
  order: number;
  isPublished: boolean;
  isHidden: boolean;
  title: string;
  languageId: string;
  url?: null | string;
  postId?: null | number;
  parentMenuId?: null | number;
};
export type ObservationResponse = {
  id: number;
  date: DateOnly;
  note?: null | string;
  creatorName: string;
  studentName: string;
  studentId: number;
  lessonName: string;
  lessonId: number;
  optionIds: ListOfInt32;
};
export type UpdateObservationRequest = {
  id: number;
  date: DateOnly;
  note?: null | string;
  studentId: number;
  lessonId: number;
  optionIds: ListOfInt32;
};
export type ListOfObservationResponse = ObservationResponse[];
export type PaginatedListResponseOfObservationResponse = {
  items: ListOfObservationResponse;
  page: number;
  totalItems: number;
  totalPages: number;
  hasPreviousPage?: boolean;
  hasNextPage?: boolean;
};
export type CreateObservationRequest = {
  date: DateOnly;
  note?: null | string;
  studentId: number;
  lessonId: number;
  optionIds: ListOfInt32;
};
export type ObservationLessonResponse = {
  id: number;
  name: string;
};
export type UpdateObservationLessonRequest = {
  id: number;
  name: string;
};
export type IEnumerableOfObservationLessonResponse =
  ObservationLessonResponse[];
export type CreateObservationLessonRequest = {
  name: string;
};
export type ObservationOptionResponse = {
  id: number;
  name: string;
};
export type UpdateObservationOptionRequest = {
  id: number;
  name: string;
};
export type IEnumerableOfObservationOptionResponse =
  ObservationOptionResponse[];
export type CreateObservationOptionRequest = {
  name: string;
};
export type GetObservationStatsResponseTeacherRecordCount = {
  id: string;
  name: string;
  count: number;
};
export type ListOfTeacherRecordCount =
  GetObservationStatsResponseTeacherRecordCount[];
export type DictionaryOfInt32AndInt32 = {
  [key: string]: number;
};
export type DictionaryOfStringAndDictionaryOfInt32AndInt32 = {
  [key: string]: DictionaryOfInt32AndInt32;
};
export type GetObservationStatsResponseNote = {
  id: number;
  text: string;
  creatorName: string;
};
export type ListOfNote = GetObservationStatsResponseNote[];
export type GetObservationStatsResponse = {
  teacherRecordsCount: ListOfTeacherRecordCount;
  stats: DictionaryOfStringAndDictionaryOfInt32AndInt32;
  notes: ListOfNote;
};
export type ObservationStudentResponse = {
  id: number;
  name: string;
  isActive: boolean;
};
export type UpdateObservationStudentRequest = {
  id: number;
  name: string;
  isActive: boolean;
};
export type IEnumerableOfObservationStudentResponse =
  ObservationStudentResponse[];
export type CreateObservationStudentRequest = {
  name: string;
  isActive: boolean;
};
export type PostResponse = {
  id: number;
  isFeatured: boolean;
  isPublished: boolean;
  showInFeed: boolean;
  publishedAt: string;
  languageId: string;
  language: string;
  title: string;
  slug: string;
  introText?: null | string;
  text?: null | string;
  featuredImage?: null | string;
  meta?: null | string;
  modifiedAt?: null | string;
  files?: null | string[];
  images?: null | string[];
};
export type UpdatePostRequest = {
  id: number;
  oldImages?: null | string[];
  oldFeaturedImage?: null | string;
  isFeatured: boolean;
  isPublished: boolean;
  showInFeed: boolean;
  optimizeImages: boolean;
  publishedAt: string;
  modifiedAt?: null | string;
  languageId: string;
  title: string;
  slug: string;
  introText?: null | string;
  text?: null | string;
  newFeaturedImage?: null | Blob;
  meta?: null | string;
  newFiles?: null | Blob[];
  newImages?: null | Blob[];
};
export type ListOfPostResponse = PostResponse[];
export type PaginatedListResponseOfPostResponse = {
  items: ListOfPostResponse;
  page: number;
  totalItems: number;
  totalPages: number;
  hasPreviousPage?: boolean;
  hasNextPage?: boolean;
};
export type CreatePostRequest = {
  isFeatured: boolean;
  isPublished: boolean;
  showInFeed: boolean;
  optimizeImages: boolean;
  publishedAt: string;
  modifiedAt?: null | string;
  languageId: string;
  title: string;
  slug: string;
  introText?: null | string;
  text?: null | string;
  newFeaturedImage?: null | Blob;
  meta?: null | string;
  newFiles?: null | Blob[];
  newImages?: null | Blob[];
};
export type GetPostPublicResponse = {
  id: number;
  slug: string;
  publishedAt: string;
  modifiedAt?: null | string;
  title: string;
  text?: null | string;
  meta?: null | string;
  images?: null | string[];
  menuUrl?: null | string;
  languageId: string;
};
export type ClassdayResponse = {
  id: number;
  name: string;
};
export type IEnumerableOfClassdayResponse = ClassdayResponse[];
export type ClassroomResponse = {
  id: number;
  name: string;
};
export type UpsertClassroomRequest = {
  id: number;
  name: string;
};
export type IEnumerableOfClassroomResponse = ClassroomResponse[];
export type ClasstimeResponse = {
  id: number;
  startTime: string;
  startTimeShort?: null | string;
  endTime: string;
  endTimeShort?: null | string;
};
export type TimeOnly = string;
export type NullableOfTimeOnly = string;
export type UpsertClasstimeRequest = {
  id: number;
  startTime: TimeOnly;
  startTimeShort?: null | NullableOfTimeOnly;
  endTime: TimeOnly;
  endTimeShort?: null | NullableOfTimeOnly;
};
export type IEnumerableOfClasstimeResponse = ClasstimeResponse[];
export type ShortDayResponse = {
  id: number;
  date: DateOnly;
};
export type UpdateShortDayRequest = {
  id: number;
  date: DateOnly;
};
export type IEnumerableOfShortDayResponse = ShortDayResponse[];
export type CreateShortDayRequest = {
  date: DateOnly;
};
export type DictionaryOfDateOnlyAndInt32 = {
  [key: string]: number;
};
export type TimetableStatsResponse = {
  roomId: number;
  roomName: string;
  countsByDay: DictionaryOfInt32AndInt32;
  overrideDates: DictionaryOfDateOnlyAndInt32;
};
export type IEnumerableOfTimetableStatsResponse = TimetableStatsResponse[];
export type CreateTimetableRequest = {
  dayId: number;
  timeId: number;
  roomId: number;
  className: string;
};
export type ListOfCreateTimetableRequest = CreateTimetableRequest[];
export type RandomImageSettings = {
  cacheDurationInMinutes?: number;
  forcedPostId?: null | number;
};
export type IEnumerableOfUserResponse = UserResponse[];
export const {
  useUpdateAchievementMutation,
  useListAchievementsQuery,
  useCreateAchievementMutation,
  useListAchievementScalesQuery,
  useGetAchievementStatsQuery,
  useListAchievementTypesQuery,
  useGetAchievementQuery,
  useDeleteAchievementMutation,
  useListAppointmentsQuery,
  useCreateAppointmentMutation,
  useUpdateAppointmentDatesMutation,
  useUpdateAppointmentReservedDatesMutation,
  useResetAppointmentTypeMutation,
  useUpdateAppointmentTypeMutation,
  useListAppointmentTypesQuery,
  useCreateAppointmentTypeMutation,
  useGetAppointmentTypeQuery,
  useDeleteAppointmentTypeMutation,
  useListAppointmentTypeDatesQuery,
  useListAppointmentTypeAvailableHostsQuery,
  useListAppointmentTypeAvailableDatesQuery,
  useListAppointmentTypeStatusDatesQuery,
  useDeleteAppointmentMutation,
  useLoginMutation,
  useLogoutMutation,
  useRefreshTokenMutation,
  useUpdateBullyReportMutation,
  usePatchBullyReportMutation,
  useListBullyReportsQuery,
  useCreateBullyReportMutation,
  useGetBullyReportQuery,
  useDeleteBullyReportMutation,
  useUpdateCourseMutation,
  useListCoursesQuery,
  useCreateCourseMutation,
  useGetCourseStatsQuery,
  useGetCourseQuery,
  useDeleteCourseMutation,
  useListCalendarEventsQuery,
  useCreateCalendarEventMutation,
  useDeleteCalendarEventMutation,
  useUpdateFailureReportMutation,
  usePatchFailureReportMutation,
  useListFailureReportsQuery,
  useCreateFailureReportMutation,
  useGetFailureReportQuery,
  useDeleteFailureReportMutation,
  useUpdateBannerMutation,
  useListBannersQuery,
  useCreateBannerMutation,
  useGetBannerQuery,
  useDeleteBannerMutation,
  useListLanguagesQuery,
  useUpdateMenuMutation,
  useListMenusQuery,
  useCreateMenuMutation,
  useGetMenuQuery,
  useDeleteMenuMutation,
  useUpdateObservationMutation,
  useListObservationsQuery,
  useCreateObservationMutation,
  useUpdateObservationLessonMutation,
  useListObservationLessonsQuery,
  useCreateObservationLessonMutation,
  useGetObservationLessonQuery,
  useDeleteObservationLessonMutation,
  useUpdateObservationOptionMutation,
  useListObservationOptionsQuery,
  useCreateObservationOptionMutation,
  useGetObservationOptionQuery,
  useDeleteObservationOptionMutation,
  useGetObservationStatsQuery,
  useUpdateObservationStudentMutation,
  useListObservationStudentsQuery,
  useCreateObservationStudentMutation,
  useGetObservationStudentQuery,
  useDeleteObservationStudentMutation,
  useGetObservationQuery,
  useDeleteObservationMutation,
  useUpdatePostMutation,
  useListPostsQuery,
  useCreatePostMutation,
  useGetPostQuery,
  useDeletePostMutation,
  useGetPostByUrlPublicQuery,
  useListClassdaysQuery,
  useUpsertClassroomMutation,
  useListClassroomsQuery,
  useGetClassroomQuery,
  useDeleteClassroomMutation,
  useUpsertClasstimeMutation,
  useListClasstimesQuery,
  useGetClasstimeQuery,
  useDeleteClasstimeMutation,
  useUpdateShortDayMutation,
  useListShortDaysQuery,
  useCreateShortDayMutation,
  useGetShortDayQuery,
  useDeleteShortDayMutation,
  useGetTimetableStatsQuery,
  useDeleteTimetableMutation,
  useCreateTimetableMutation,
  useGetRandomImageSettingsQuery,
  usePostRandomImageSettingsMutation,
  useListTeachersQuery,
  useListUsersQuery,
} = injectedRtkApi;
