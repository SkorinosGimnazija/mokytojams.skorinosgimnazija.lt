import { baseApi as api } from "./baseApi";
export const addTagTypes = [
  "Teachers",
  "Users",
  "Settings",
  "School",
  "Posts",
  "Public",
  "Observation-Students",
  "Observations",
  "Observation-Options",
  "Observation-Lessons",
  "Menus",
  "Languages",
  "Failure-Reports",
  "Events",
  "Courses",
  "Bully-Reports",
  "Featured",
  "Auth",
  "Appointments",
  "Achievements",
] as const;
const injectedRtkApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (build) => ({
      listTeachers: build.query<ListTeachersApiResponse, ListTeachersApiArg>({
        query: () => ({ url: `/teachers` }),
        providesTags: ["Teachers"],
      }),
      listUsers: build.query<ListUsersApiResponse, ListUsersApiArg>({
        query: () => ({ url: `/users` }),
        providesTags: ["Users"],
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
      listClassdays: build.query<ListClassdaysApiResponse, ListClassdaysApiArg>(
        {
          query: () => ({ url: `/school/classdays` }),
          providesTags: ["School"],
        },
      ),
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
      getPostByUrlPublic: build.query<
        GetPostByUrlPublicApiResponse,
        GetPostByUrlPublicApiArg
      >({
        query: (queryArg) => ({
          url: `/public/${queryArg.languageId}/posts/menu/${queryArg.menuUrl}`,
        }),
        providesTags: ["Public"],
      }),
      getPost: build.query<GetPostApiResponse, GetPostApiArg>({
        query: (queryArg) => ({ url: `/posts/${queryArg}` }),
        providesTags: ["Posts"],
      }),
      deletePost: build.mutation<DeletePostApiResponse, DeletePostApiArg>({
        query: (queryArg) => ({ url: `/posts/${queryArg}`, method: "DELETE" }),
        invalidatesTags: ["Posts"],
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
      listLanguages: build.query<ListLanguagesApiResponse, ListLanguagesApiArg>(
        {
          query: () => ({ url: `/languages` }),
          providesTags: ["Languages"],
        },
      ),
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
      refreshToken: build.mutation<RefreshTokenApiResponse, RefreshTokenApiArg>(
        {
          query: () => ({ url: `/auth/refresh-token`, method: "POST" }),
          invalidatesTags: ["Auth"],
        },
      ),
      logout: build.mutation<LogoutApiResponse, LogoutApiArg>({
        query: () => ({ url: `/auth/logout`, method: "POST" }),
        invalidatesTags: ["Auth"],
      }),
      login: build.mutation<LoginApiResponse, LoginApiArg>({
        query: (queryArg) => ({
          url: `/auth/login`,
          method: "POST",
          body: queryArg,
        }),
        invalidatesTags: ["Auth"],
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
      listAppointmentTypeAvailableHosts: build.query<
        ListAppointmentTypeAvailableHostsApiResponse,
        ListAppointmentTypeAvailableHostsApiArg
      >({
        query: (queryArg) => ({ url: `/appointments/types/${queryArg}/hosts` }),
        providesTags: ["Appointments"],
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
      listAppointmentTypeDates: build.query<
        ListAppointmentTypeDatesApiResponse,
        ListAppointmentTypeDatesApiArg
      >({
        query: (queryArg) => ({ url: `/appointments/types/${queryArg}/dates` }),
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
      listAppointmentTypeAvailableDates: build.query<
        ListAppointmentTypeAvailableDatesApiResponse,
        ListAppointmentTypeAvailableDatesApiArg
      >({
        query: (queryArg) => ({
          url: `/appointments/types/${queryArg.typeId}/hosts/${queryArg.hostId}/dates`,
        }),
        providesTags: ["Appointments"],
      }),
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
      listAchievementScales: build.query<
        ListAchievementScalesApiResponse,
        ListAchievementScalesApiArg
      >({
        query: () => ({ url: `/achievements/scales` }),
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
    }),
    overrideExisting: false,
  });
export { injectedRtkApi as generatedApi };
export type ListTeachersApiResponse = /** status 200 Success */ UserResponse[];
export type ListTeachersApiArg = void;
export type ListUsersApiResponse = /** status 200 Success */ UserResponse[];
export type ListUsersApiArg = void;
export type GetRandomImageSettingsApiResponse =
  /** status 200 Success */ RandomImageSettings;
export type GetRandomImageSettingsApiArg = void;
export type PostRandomImageSettingsApiResponse = unknown;
export type PostRandomImageSettingsApiArg = RandomImageSettings;
export type GetTimetableStatsApiResponse =
  /** status 200 Success */ TimetableStatsResponse[];
export type GetTimetableStatsApiArg = void;
export type DeleteTimetableApiResponse = unknown;
export type DeleteTimetableApiArg = number[];
export type CreateTimetableApiResponse = unknown;
export type CreateTimetableApiArg = CreateTimetableRequest[];
export type UpdateShortDayApiResponse =
  /** status 200 Success */ ShortDayResponse;
export type UpdateShortDayApiArg = UpdateShortDayRequest;
export type ListShortDaysApiResponse =
  /** status 200 Success */ ShortDayResponse[];
export type ListShortDaysApiArg = void;
export type CreateShortDayApiResponse =
  /** status 200 Success */ ShortDayResponse;
export type CreateShortDayApiArg = CreateShortDayRequest;
export type GetShortDayApiResponse = /** status 200 Success */ ShortDayResponse;
export type GetShortDayApiArg = number;
export type DeleteShortDayApiResponse = unknown;
export type DeleteShortDayApiArg = number;
export type UpsertClasstimeApiResponse =
  /** status 200 Success */ ClasstimeResponse;
export type UpsertClasstimeApiArg = UpsertClasstimeRequest;
export type ListClasstimesApiResponse =
  /** status 200 Success */ ClasstimeResponse[];
export type ListClasstimesApiArg = void;
export type GetClasstimeApiResponse =
  /** status 200 Success */ ClasstimeResponse;
export type GetClasstimeApiArg = number;
export type DeleteClasstimeApiResponse = unknown;
export type DeleteClasstimeApiArg = number;
export type UpsertClassroomApiResponse =
  /** status 200 Success */ ClassroomResponse;
export type UpsertClassroomApiArg = UpsertClassroomRequest;
export type ListClassroomsApiResponse =
  /** status 200 Success */ ClassroomResponse[];
export type ListClassroomsApiArg = void;
export type GetClassroomApiResponse =
  /** status 200 Success */ ClassroomResponse;
export type GetClassroomApiArg = number;
export type DeleteClassroomApiResponse = unknown;
export type DeleteClassroomApiArg = number;
export type ListClassdaysApiResponse =
  /** status 200 Success */ ClassdayResponse[];
export type ListClassdaysApiArg = void;
export type UpdatePostApiResponse = /** status 200 Success */ PostResponse;
export type UpdatePostApiArg = UpdatePostRequest;
export type ListPostsApiResponse =
  /** status 200 Success */ PaginatedListResponseOfPostResponse;
export type ListPostsApiArg = {
  searchTerm?: string | null;
  items: number;
  page: number;
};
export type CreatePostApiResponse = /** status 200 Success */ PostResponse;
export type CreatePostApiArg = CreatePostRequest;
export type GetPostByUrlPublicApiResponse =
  /** status 200 Success */ GetPostPublicResponse;
export type GetPostByUrlPublicApiArg = {
  languageId: string;
  menuUrl: string;
};
export type GetPostApiResponse = /** status 200 Success */ PostResponse;
export type GetPostApiArg = number;
export type DeletePostApiResponse = unknown;
export type DeletePostApiArg = number;
export type UpdateObservationStudentApiResponse =
  /** status 200 Success */ ObservationStudentResponse;
export type UpdateObservationStudentApiArg = UpdateObservationStudentRequest;
export type ListObservationStudentsApiResponse =
  /** status 200 Success */ ObservationStudentResponse[];
export type ListObservationStudentsApiArg = (boolean | null) | undefined;
export type CreateObservationStudentApiResponse =
  /** status 200 Success */ ObservationStudentResponse;
export type CreateObservationStudentApiArg = CreateObservationStudentRequest;
export type GetObservationStudentApiResponse =
  /** status 200 Success */ ObservationStudentResponse;
export type GetObservationStudentApiArg = number;
export type DeleteObservationStudentApiResponse = unknown;
export type DeleteObservationStudentApiArg = number;
export type GetObservationStatsApiResponse =
  /** status 200 Success */ GetObservationStatsResponse;
export type GetObservationStatsApiArg = {
  studentId: number;
  startDate: string;
  endDate: string;
};
export type UpdateObservationOptionApiResponse =
  /** status 200 Success */ ObservationOptionResponse;
export type UpdateObservationOptionApiArg = UpdateObservationOptionRequest;
export type ListObservationOptionsApiResponse =
  /** status 200 Success */ ObservationOptionResponse[];
export type ListObservationOptionsApiArg = void;
export type CreateObservationOptionApiResponse =
  /** status 200 Success */ ObservationOptionResponse;
export type CreateObservationOptionApiArg = CreateObservationOptionRequest;
export type GetObservationOptionApiResponse =
  /** status 200 Success */ ObservationOptionResponse;
export type GetObservationOptionApiArg = number;
export type DeleteObservationOptionApiResponse = unknown;
export type DeleteObservationOptionApiArg = number;
export type UpdateObservationLessonApiResponse =
  /** status 200 Success */ ObservationLessonResponse;
export type UpdateObservationLessonApiArg = UpdateObservationLessonRequest;
export type ListObservationLessonsApiResponse =
  /** status 200 Success */ ObservationLessonResponse[];
export type ListObservationLessonsApiArg = void;
export type CreateObservationLessonApiResponse =
  /** status 200 Success */ ObservationLessonResponse;
export type CreateObservationLessonApiArg = CreateObservationLessonRequest;
export type GetObservationLessonApiResponse =
  /** status 200 Success */ ObservationLessonResponse;
export type GetObservationLessonApiArg = number;
export type DeleteObservationLessonApiResponse = unknown;
export type DeleteObservationLessonApiArg = number;
export type UpdateObservationApiResponse =
  /** status 200 Success */ ObservationResponse;
export type UpdateObservationApiArg = UpdateObservationRequest;
export type ListObservationsApiResponse =
  /** status 200 Success */ PaginatedListResponseOfObservationResponse;
export type ListObservationsApiArg = {
  creatorId?: number | null;
  items: number;
  page: number;
};
export type CreateObservationApiResponse =
  /** status 200 Success */ ObservationResponse;
export type CreateObservationApiArg = CreateObservationRequest;
export type GetObservationApiResponse =
  /** status 200 Success */ ObservationResponse;
export type GetObservationApiArg = number;
export type DeleteObservationApiResponse = unknown;
export type DeleteObservationApiArg = number;
export type UpdateMenuApiResponse = /** status 200 Success */ MenuResponse;
export type UpdateMenuApiArg = UpdateMenuRequest;
export type ListMenusApiResponse = /** status 200 Success */ MenuResponse[];
export type ListMenusApiArg = (string | null) | undefined;
export type CreateMenuApiResponse = /** status 200 Success */ MenuResponse;
export type CreateMenuApiArg = CreateMenuRequest;
export type GetMenuApiResponse = /** status 200 Success */ MenuResponse;
export type GetMenuApiArg = number;
export type DeleteMenuApiResponse = unknown;
export type DeleteMenuApiArg = number;
export type ListLanguagesApiResponse =
  /** status 200 Success */ LanguageResponse[];
export type ListLanguagesApiArg = void;
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
export type ListCalendarEventsApiResponse =
  /** status 200 Success */ CalendarEvent[];
export type ListCalendarEventsApiArg = {
  startDate: string;
  endDate: string;
};
export type CreateCalendarEventApiResponse =
  /** status 200 Success */ CreateCalendarEventResponse;
export type CreateCalendarEventApiArg = CreateCalendarEventRequest;
export type DeleteCalendarEventApiResponse = unknown;
export type DeleteCalendarEventApiArg = string;
export type UpdateCourseApiResponse = /** status 200 Success */ CourseResponse;
export type UpdateCourseApiArg = UpdateCourseRequest;
export type ListCoursesApiResponse =
  /** status 200 Success */ PaginatedListResponseOfCourseResponse;
export type ListCoursesApiArg = {
  userId?: number | null;
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
export type UpdateBullyReportApiResponse =
  /** status 200 Success */ BullyReportResponse;
export type UpdateBullyReportApiArg = UpdateBullyReportRequest;
export type PatchBullyReportApiResponse = unknown;
export type PatchBullyReportApiArg = PatchBullyReportRequest;
export type ListBullyReportsApiResponse =
  /** status 200 Success */ PaginatedListResponseOfBullyReportResponse;
export type ListBullyReportsApiArg = {
  userId?: number | null;
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
export type UpdateBannerApiResponse = /** status 200 Success */ BannerResponse;
export type UpdateBannerApiArg = UpdateBannerRequest;
export type ListBannersApiResponse = /** status 200 Success */ BannerResponse[];
export type ListBannersApiArg = void;
export type CreateBannerApiResponse = /** status 200 Success */ BannerResponse;
export type CreateBannerApiArg = CreateBannerRequest;
export type GetBannerApiResponse = /** status 200 Success */ BannerResponse;
export type GetBannerApiArg = number;
export type DeleteBannerApiResponse = unknown;
export type DeleteBannerApiArg = number;
export type RefreshTokenApiResponse =
  /** status 200 Success */ AuthorizationResponse;
export type RefreshTokenApiArg = void;
export type LogoutApiResponse = unknown;
export type LogoutApiArg = void;
export type LoginApiResponse = /** status 200 Success */ AuthorizationResponse;
export type LoginApiArg = LoginRequest;
export type ListAppointmentsApiResponse =
  /** status 200 Success */ PaginatedListResponseOfAppointmentResponse;
export type ListAppointmentsApiArg = {
  userId?: number | null;
  items: number;
  page: number;
};
export type CreateAppointmentApiResponse =
  /** status 200 Success */ AppointmentResponse;
export type CreateAppointmentApiArg = CreateAppointmentRequest;
export type DeleteAppointmentApiResponse = unknown;
export type DeleteAppointmentApiArg = string;
export type UpdateAppointmentTypeApiResponse =
  /** status 200 Success */ AppointmentTypeDetailedResponse;
export type UpdateAppointmentTypeApiArg = UpdateAppointmentTypeRequest;
export type ListAppointmentTypesApiResponse =
  /** status 200 Success */ AppointmentTypeDetailedResponse[];
export type ListAppointmentTypesApiArg = (boolean | null) | undefined;
export type CreateAppointmentTypeApiResponse =
  /** status 200 Success */ AppointmentTypeDetailedResponse;
export type CreateAppointmentTypeApiArg = CreateAppointmentTypeRequest;
export type ResetAppointmentTypeApiResponse = unknown;
export type ResetAppointmentTypeApiArg = number;
export type GetAppointmentTypeApiResponse =
  /** status 200 Success */ AppointmentTypeDetailedResponse;
export type GetAppointmentTypeApiArg = number;
export type DeleteAppointmentTypeApiResponse = unknown;
export type DeleteAppointmentTypeApiArg = number;
export type UpdateAppointmentReservedDatesApiResponse = unknown;
export type UpdateAppointmentReservedDatesApiArg =
  UpdateAppointmentReservedDatesRequest;
export type ListAppointmentTypeAvailableHostsApiResponse =
  /** status 200 Success */ AppointmentHostResponse[];
export type ListAppointmentTypeAvailableHostsApiArg = number;
export type UpdateAppointmentDatesApiResponse = unknown;
export type UpdateAppointmentDatesApiArg = UpdateAppointmentDatesRequest;
export type ListAppointmentTypeDatesApiResponse =
  /** status 200 Success */ AppointmentDateResponse[];
export type ListAppointmentTypeDatesApiArg = number;
export type ListAppointmentTypeStatusDatesApiResponse =
  /** status 200 Success */ AppointmentDateStatusResponse[];
export type ListAppointmentTypeStatusDatesApiArg = {
  typeId: number;
  hostId: number;
};
export type ListAppointmentTypeAvailableDatesApiResponse =
  /** status 200 Success */ AppointmentDateResponse[];
export type ListAppointmentTypeAvailableDatesApiArg = {
  typeId: number;
  hostId: number;
};
export type UpdateAchievementApiResponse =
  /** status 200 Success */ AchievementResponse;
export type UpdateAchievementApiArg = UpdateAchievementRequest;
export type ListAchievementsApiResponse =
  /** status 200 Success */ PaginatedListResponseOfAchievementResponse;
export type ListAchievementsApiArg = {
  userId?: number | null;
  items: number;
  page: number;
};
export type CreateAchievementApiResponse =
  /** status 200 Success */ AchievementResponse;
export type CreateAchievementApiArg = CreateAchievementRequest;
export type GetAchievementStatsApiResponse =
  /** status 200 Success */ GetAchievementStatsResponse;
export type GetAchievementStatsApiArg = {
  startDate: string;
  endDate: string;
};
export type ListAchievementTypesApiResponse =
  /** status 200 Success */ AchievementTypeResponse[];
export type ListAchievementTypesApiArg = void;
export type ListAchievementScalesApiResponse =
  /** status 200 Success */ AchievementScaleResponse[];
export type ListAchievementScalesApiArg = void;
export type GetAchievementApiResponse =
  /** status 200 Success */ AchievementResponse;
export type GetAchievementApiArg = number;
export type DeleteAchievementApiResponse = unknown;
export type DeleteAchievementApiArg = number;
export type UserResponse = {
  id: number;
  name: string;
  normalizedName: string;
};
export type RandomImageSettings = {
  cacheDurationInMinutes: number;
  forcedPostId?: number | null;
};
export type TimetableStatsResponse = {
  roomId: number;
  roomName: string;
  countsByDay: {
    [key: string]: number;
  };
  overrideDates: string[];
};
export type ProblemDetailsError = {
  /** the name of the error or property of the dto that caused the error */
  name: string;
  /** the reason for the error */
  reason: string;
  /** the code of the error */
  code?: string | null;
  /** the severity of the error */
  severity?: string | null;
};
export type ProblemDetails = {
  type: string;
  title: string;
  status: number;
  instance: string;
  traceId: string;
  /** the details of the error */
  detail?: string | null;
  errors: ProblemDetailsError[];
};
export type CreateTimetableRequest = {
  dayId: number;
  timeId: number;
  roomId: number;
  className: string;
};
export type ShortDayResponse = {
  id: number;
  date: string;
};
export type CreateShortDayRequest = {
  date: string;
};
export type UpdateShortDayRequest = CreateShortDayRequest & {
  id: number;
};
export type ClasstimeResponse = {
  id: number;
  startTime: string;
  startTimeShort: string;
  endTime: string;
  endTimeShort: string;
};
export type UpsertClasstimeRequest = {
  id: number;
  startTime: string;
  startTimeShort: string;
  endTime: string;
  endTimeShort: string;
};
export type ClassroomResponse = {
  id: number;
  name: string;
};
export type UpsertClassroomRequest = {
  id: number;
  name: string;
};
export type ClassdayResponse = {
  id: number;
  name: string;
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
  introText?: string | null;
  text?: string | null;
  featuredImage?: string | null;
  meta?: string | null;
  modifiedAt?: string | null;
  files?: string[] | null;
  images?: string[] | null;
};
export type CreatePostRequest = {
  isFeatured: boolean;
  isPublished: boolean;
  showInFeed: boolean;
  optimizeImages: boolean;
  publishedAt: string;
  modifiedAt?: string | null;
  languageId: string;
  title: string;
  slug: string;
  introText?: string | null;
  text?: string | null;
  newFeaturedImage?: Blob | null;
  meta?: string | null;
  newFiles?: Blob[] | null;
  newImages?: Blob[] | null;
};
export type UpdatePostRequest = CreatePostRequest & {
  id: number;
  oldImages?: string[] | null;
  oldFeaturedImage?: string | null;
};
export type PaginatedListResponseOfPostResponse = {
  items: PostResponse[];
  page: number;
  totalItems: number;
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
};
export type GetPostPublicResponse = {
  id: number;
  slug: string;
  publishedAt: string;
  modifiedAt?: string | null;
  title: string;
  text?: string | null;
  meta?: string | null;
  images?: string[] | null;
};
export type ObservationStudentResponse = {
  id: number;
  name: string;
  isActive: boolean;
};
export type CreateObservationStudentRequest = {
  name: string;
  isActive: boolean;
};
export type UpdateObservationStudentRequest =
  CreateObservationStudentRequest & {
    id: number;
  };
export type GetObservationStatsResponseTeacherRecordCount = {
  id: string;
  name: string;
  count: number;
};
export type GetObservationStatsResponseNote = {
  id: number;
  text: string;
  creatorName: string;
};
export type GetObservationStatsResponse = {
  teacherRecordsCount: GetObservationStatsResponseTeacherRecordCount[];
  stats: {
    [key: string]: {
      [key: string]: number;
    };
  };
  notes: GetObservationStatsResponseNote[];
};
export type ObservationOptionResponse = {
  id: number;
  name: string;
};
export type CreateObservationOptionRequest = {
  name: string;
};
export type UpdateObservationOptionRequest = CreateObservationOptionRequest & {
  id: number;
};
export type ObservationLessonResponse = {
  id: number;
  name: string;
};
export type CreateObservationLessonRequest = {
  name: string;
};
export type UpdateObservationLessonRequest = CreateObservationLessonRequest & {
  id: number;
};
export type ObservationResponse = {
  id: number;
  date: string;
  note?: string | null;
  creatorName: string;
  studentName: string;
  studentId: number;
  lessonName: string;
  lessonId: number;
  optionIds: number[];
};
export type CreateObservationRequest = {
  date: string;
  note?: string | null;
  studentId: number;
  lessonId: number;
  optionIds: number[];
};
export type UpdateObservationRequest = CreateObservationRequest & {
  id: number;
};
export type PaginatedListResponseOfObservationResponse = {
  items: ObservationResponse[];
  page: number;
  totalItems: number;
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
};
export type MenuResponse = {
  id: number;
  order: number;
  isPublished: boolean;
  isHidden: boolean;
  title: string;
  url?: string | null;
  postId?: number | null;
  postTitle?: string | null;
  languageName: string;
  languageId: string;
  parentMenuId?: number | null;
  children?: MenuResponse[] | null;
};
export type CreateMenuRequest = {
  order: number;
  isPublished: boolean;
  isHidden: boolean;
  title: string;
  languageId: string;
  url?: string | null;
  postId?: number | null;
  parentMenuId?: number | null;
};
export type UpdateMenuRequest = CreateMenuRequest & {
  id: number;
};
export type LanguageResponse = {
  id: string;
  name: string;
};
export type FailureReportResponse = {
  id: number;
  creatorName: string;
  creatorId: number;
  details: string;
  location: string;
  isFixed?: boolean | null;
  reportDate: string;
  fixDate?: string | null;
};
export type CreateFailureReportRequest = {
  location: string;
  details: string;
};
export type UpdateFailureReportRequest = CreateFailureReportRequest & {
  id: number;
};
export type PatchFailureReportRequest = {
  id: number;
  isFixed?: boolean | null;
  note?: string | null;
};
export type PaginatedListResponseOfFailureReportResponse = {
  items: FailureReportResponse[];
  page: number;
  totalItems: number;
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
};
export type CalendarEvent = {
  id: string;
  title: string;
  startDate: string;
  endDate: string;
  allDay: boolean;
};
export type CreateCalendarEventResponse = {
  id: string;
  title: string;
  startDate: string;
  endDate: string;
};
export type CreateCalendarEventRequest = {
  title: string;
  startDate: string;
  endDate: string;
  allDay: boolean;
};
export type CourseResponse = {
  id: number;
  title: string;
  organizer: string;
  startDate: string;
  endDate: string;
  durationInHours: number;
  certificate?: string | null;
  isUseful: boolean;
  creatorId: number;
  creatorName: string;
};
export type CreateCourseRequest = {
  title: string;
  organizer: string;
  startDate: string;
  endDate: string;
  durationInHours: number;
  certificate?: string | null;
  isUseful: boolean;
};
export type UpdateCourseRequest = CreateCourseRequest & {
  id: number;
};
export type PaginatedListResponseOfCourseResponse = {
  items: CourseResponse[];
  page: number;
  totalItems: number;
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
};
export type GetCourseStatsResponseTeacherStatsResponse = {
  id: number;
  name: string;
  recordsCount: number;
  totalDuration: number;
};
export type GetCourseStatsResponse = {
  recordsCount: number;
  totalDuration: number;
  teachers: GetCourseStatsResponseTeacherStatsResponse[];
};
export type BullyReportResponse = {
  id: number;
  isPublicReport: boolean;
  createdAt: string;
  date: string;
  victimName: string;
  bullyName: string;
  location: string;
  details: string;
  observers?: string | null;
  actions?: string | null;
  creatorName?: string | null;
  creatorId?: number | null;
};
export type CreateBullyReportRequest = {
  date: string;
  victimName: string;
  bullyName: string;
  location: string;
  details: string;
  actions?: string | null;
};
export type UpdateBullyReportRequest = CreateBullyReportRequest & {
  id: number;
  observers?: string | null;
};
export type PatchBullyReportRequest = {
  id: number;
  actions?: string | null;
};
export type PaginatedListResponseOfBullyReportResponse = {
  items: BullyReportResponse[];
  page: number;
  totalItems: number;
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
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
export type BannerRequest = {
  title: string;
  url: string;
  isPublished: boolean;
  order: number;
  languageId: string;
};
export type UpdateBannerRequest = BannerRequest & {
  id: number;
  image?: Blob | null;
};
export type CreateBannerRequest = BannerRequest & {
  image: Blob;
};
export type AuthorizationResponse = {
  id: number;
  token: string;
  name: string;
  email: string;
  roles: string[];
};
export type LoginRequest = {
  token: string;
};
export type AppointmentResponse = {
  id: string;
  link?: string | null;
  date: string;
  dateId: number;
  typeName: string;
  note?: string | null;
  hostName: string;
  hostId: number;
  attendeeName: string;
  attendeeEmail: string;
};
export type PaginatedListResponseOfAppointmentResponse = {
  items: AppointmentResponse[];
  page: number;
  totalItems: number;
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
};
export type CreateAppointmentRequest = {
  typeId: number;
  hostId: number;
  dateId: number;
};
export type AppointmentTypeResponse = {
  id: number;
  name: string;
  description: string;
  registrationEndsAt: string;
};
export type AppointmentTypeDetailedResponse = AppointmentTypeResponse & {
  durationInMinutes: number;
  isPublic: boolean;
  isOnline: boolean;
  additionalInviteeIds: number[];
  exclusiveHostIds: number[];
};
export type CreateAppointmentTypeRequest = {
  name: string;
  description: string;
  durationInMinutes: number;
  isOnline: boolean;
  isPublic: boolean;
  registrationEndsAt: string;
  additionalInviteeIds: number[];
  exclusiveHostIds: number[];
};
export type UpdateAppointmentTypeRequest = CreateAppointmentTypeRequest & {
  id: number;
};
export type UpdateAppointmentReservedDatesRequest = {
  id: number;
  dateIds: number[];
};
export type AppointmentHostResponse = {
  id: number;
  name: string;
  normalizedName: string;
};
export type UpdateAppointmentDatesRequest = {
  id: number;
  dates: string[];
};
export type AppointmentDateResponse = {
  id: number;
  date: string;
};
export type AppointmentDateStatusResponse = AppointmentDateResponse & {
  isRegistered: boolean;
  isReserved: boolean;
};
export type AchievementStudentResponse = {
  id: number;
  name: string;
  classroomId: number;
  classroomName: string;
  achievementTypeId: number;
  achievementTypeName: string;
};
export type AchievementResponse = {
  id: number;
  name: string;
  date: string;
  creatorId: number;
  creatorName: string;
  scaleId: number;
  scaleName: string;
  additionalTeachers: UserResponse[];
  students: AchievementStudentResponse[];
};
export type AchievementStudentRequest = {
  name: string;
  achievementTypeId: number;
  classroomId: number;
};
export type CreateAchievementRequest = {
  name: string;
  date: string;
  scaleId: number;
  additionalTeachers: number[];
  students: AchievementStudentRequest[];
};
export type UpdateAchievementRequest = CreateAchievementRequest & {
  id: number;
};
export type PaginatedListResponseOfAchievementResponse = {
  items: AchievementResponse[];
  page: number;
  totalItems: number;
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
};
export type GetAchievementStatsResponseTypeStatsResponse = {
  id: number;
  name: string;
  count: number;
};
export type GetAchievementStatsResponse = {
  recordsCount: number;
  studentsCount: number;
  teachersCount: number;
  typeStats: GetAchievementStatsResponseTypeStatsResponse[];
};
export type AchievementTypeResponse = {
  id: number;
  name: string;
};
export type AchievementScaleResponse = {
  id: number;
  name: string;
};
export const {
  useListTeachersQuery,
  useListUsersQuery,
  useGetRandomImageSettingsQuery,
  usePostRandomImageSettingsMutation,
  useGetTimetableStatsQuery,
  useDeleteTimetableMutation,
  useCreateTimetableMutation,
  useUpdateShortDayMutation,
  useListShortDaysQuery,
  useCreateShortDayMutation,
  useGetShortDayQuery,
  useDeleteShortDayMutation,
  useUpsertClasstimeMutation,
  useListClasstimesQuery,
  useGetClasstimeQuery,
  useDeleteClasstimeMutation,
  useUpsertClassroomMutation,
  useListClassroomsQuery,
  useGetClassroomQuery,
  useDeleteClassroomMutation,
  useListClassdaysQuery,
  useUpdatePostMutation,
  useListPostsQuery,
  useCreatePostMutation,
  useGetPostByUrlPublicQuery,
  useGetPostQuery,
  useDeletePostMutation,
  useUpdateObservationStudentMutation,
  useListObservationStudentsQuery,
  useCreateObservationStudentMutation,
  useGetObservationStudentQuery,
  useDeleteObservationStudentMutation,
  useGetObservationStatsQuery,
  useUpdateObservationOptionMutation,
  useListObservationOptionsQuery,
  useCreateObservationOptionMutation,
  useGetObservationOptionQuery,
  useDeleteObservationOptionMutation,
  useUpdateObservationLessonMutation,
  useListObservationLessonsQuery,
  useCreateObservationLessonMutation,
  useGetObservationLessonQuery,
  useDeleteObservationLessonMutation,
  useUpdateObservationMutation,
  useListObservationsQuery,
  useCreateObservationMutation,
  useGetObservationQuery,
  useDeleteObservationMutation,
  useUpdateMenuMutation,
  useListMenusQuery,
  useCreateMenuMutation,
  useGetMenuQuery,
  useDeleteMenuMutation,
  useListLanguagesQuery,
  useUpdateFailureReportMutation,
  usePatchFailureReportMutation,
  useListFailureReportsQuery,
  useCreateFailureReportMutation,
  useGetFailureReportQuery,
  useDeleteFailureReportMutation,
  useListCalendarEventsQuery,
  useCreateCalendarEventMutation,
  useDeleteCalendarEventMutation,
  useUpdateCourseMutation,
  useListCoursesQuery,
  useCreateCourseMutation,
  useGetCourseStatsQuery,
  useGetCourseQuery,
  useDeleteCourseMutation,
  useUpdateBullyReportMutation,
  usePatchBullyReportMutation,
  useListBullyReportsQuery,
  useCreateBullyReportMutation,
  useGetBullyReportQuery,
  useDeleteBullyReportMutation,
  useUpdateBannerMutation,
  useListBannersQuery,
  useCreateBannerMutation,
  useGetBannerQuery,
  useDeleteBannerMutation,
  useRefreshTokenMutation,
  useLogoutMutation,
  useLoginMutation,
  useListAppointmentsQuery,
  useCreateAppointmentMutation,
  useDeleteAppointmentMutation,
  useUpdateAppointmentTypeMutation,
  useListAppointmentTypesQuery,
  useCreateAppointmentTypeMutation,
  useResetAppointmentTypeMutation,
  useGetAppointmentTypeQuery,
  useDeleteAppointmentTypeMutation,
  useUpdateAppointmentReservedDatesMutation,
  useListAppointmentTypeAvailableHostsQuery,
  useUpdateAppointmentDatesMutation,
  useListAppointmentTypeDatesQuery,
  useListAppointmentTypeStatusDatesQuery,
  useListAppointmentTypeAvailableDatesQuery,
  useUpdateAchievementMutation,
  useListAchievementsQuery,
  useCreateAchievementMutation,
  useGetAchievementStatsQuery,
  useListAchievementTypesQuery,
  useListAchievementScalesQuery,
  useGetAchievementQuery,
  useDeleteAchievementMutation,
} = injectedRtkApi;
