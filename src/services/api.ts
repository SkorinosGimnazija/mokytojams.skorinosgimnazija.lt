import { generatedApi } from './generatedApi';
export * from './generatedApi';
export { generatedApi as api };
export const { usePrefetch } = generatedApi;

// add more if prefetching
generatedApi.enhanceEndpoints({
  addTagTypes: ['StudentObservationById'],
  endpoints: {
    getStudentObservationById: {
      providesTags: (result, error, arg) => {
        if (error) {
          return [];
        }

        return [{ type: 'StudentObservationById', id: arg.id }];
      },
    },
    editStudentObservation: {
      invalidatesTags: (result, error, arg) => {
        if (error) {
          return [];
        }

        return [
          { type: 'StudentObservationById', id: arg.studentObservationEditDto.id },
          { type: 'StudentObservation' }, // delete if using refetchOnMountOrArgChange
        ];
      },
    },
  },
});

//
//
// function providesTags<T>(
//   result: unknown,
//   error: unknown,
//   arg: any,
//   tagType: T
// ): { type: T; id: string }[] {
//   if (error) {
//     return [];
//   }
//
//   return [{ type: tagType, id: arg.id }];
// }
