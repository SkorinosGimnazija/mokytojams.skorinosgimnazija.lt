import { Stack } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { SearchForm } from '../../components/forms/SearchForm';
import { CreateItemLink } from '../../components/links/CreateItemLink';
import { PostsList } from '../../components/list/posts/PostsList';
import { SquareLoader } from '../../components/loadingSpinners/SquareLoader';
import { useAppSelector } from '../../hooks/useAppSelector';
import { useSearchPostsQuery } from '../../services/enhanced.api';
import { useGetPostsQuery } from '../../services/api';
import { selectPosts, selectSearchedPosts } from '../../store/postsSlice';
import { useSearchParams } from 'react-router-dom';

export default function ViewPosts() {
  const searchParams = useSearchParams('q');
  const posts = useAppSelector(selectPosts);
  const searchedPosts = useAppSelector(selectSearchedPosts);
  const postsQuery = useGetPostsQuery({ items: 20, page: 0 }, { refetchOnMountOrArgChange: true });
  // const searchQuery = useSearchPostsQuery({ text: searchParams! }, { skip: !searchParams });

  return (
    <Box>
      <Stack direction="row" gap={4}>
        <CreateItemLink to="/posts/create" />
        <SearchForm />
      </Stack>
      {/* <Box mt={4}>
        {postsQuery.isLoading || searchQuery.isFetching ? (
          <SquareLoader />
        ) : (
          <PostsList data={searchParams ? searchedPosts : posts} />
        )}
      </Box> */}
    </Box>
  );
}
