import { api } from './api';

const enhancedApi = api.enhanceEndpoints({
  endpoints: {
    searchPosts: {
      keepUnusedDataFor: 0,
    },
  },
});

export const { useSearchPostsQuery } = enhancedApi;
