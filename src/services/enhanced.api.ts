import { api } from './generated.api';

const enhancedApi = api.enhanceEndpoints({
  endpoints: {
    searchPost: {
      keepUnusedDataFor: 0,
    },
  },
});

export const { useSearchPostQuery } = enhancedApi;
