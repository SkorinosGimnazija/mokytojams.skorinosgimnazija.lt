import { createSlice } from '@reduxjs/toolkit';
import { RootState } from './store';
import { api, PostDto } from '../services/generated.api';
import uniqBy from 'lodash/uniqBy';
import merge from 'lodash/merge';

interface State {
  posts: PostDto[];
  searchedPosts: PostDto[];
}

const initialState: State = {
  posts: [],
  searchedPosts: [],
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    clearSearch(state) {
      state.searchedPosts = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(api.endpoints.getPosts.matchFulfilled, (state, action) => {
        const payload = action.payload;
        const args = action.meta.arg.originalArgs;

        if (!args.page) {
          state.posts = payload;
        } else {
          state.posts = uniqBy([...payload, ...state.posts], 'id');
        }
      })
      .addMatcher(api.endpoints.patchPost.matchPending, (state, action) => {
        const { id: postId, postPatchDto: args } = action.meta.arg.originalArgs;
        const post = state.posts.find((x) => x.id === postId);

        if (post) {
          merge(post, args);
        }
      })
      .addMatcher(api.endpoints.deletePost.matchPending, (state, action) => {
        const { id: postId } = action.meta.arg.originalArgs;
        state.posts = state.posts.filter((x) => x.id !== postId);
      })
      .addMatcher(api.endpoints.searchPost.matchFulfilled, (state, action) => {
        const payload = action.payload;
        const args = action.meta.arg.originalArgs;

        if (!args.page) {
          state.searchedPosts = payload;
        } else {
          state.searchedPosts = uniqBy([...payload, ...state.searchedPosts], 'id');
        }
      });
  },
});

export const { clearSearch } = postsSlice.actions;

export const selectPosts = (state: RootState) => {
  return state.posts.posts;
};

export const selectSearchedPosts = (state: RootState) => {
  return state.posts.searchedPosts;
};

export default postsSlice.reducer;
