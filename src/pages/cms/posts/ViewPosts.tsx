import { Stack } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { SearchForm } from '../../../components/forms/SearchForm';
import { CreateItemButton } from '../../../components/links/CreateItemButton';
import { PostsList } from '../../../components/lists/PostsList';
import { useGetPostsQuery, useSearchPostsQuery } from '../../../services/api';

export default function ViewPosts() {
  const [search, setSearch] = React.useState('');
  const [pageNumber, setPageNumber] = React.useState(0);
  const [pageSize, setPageSize] = React.useState(10);
  const postsQuery = useGetPostsQuery({ items: pageSize, page: pageNumber }, { skip: !!search });
  const searchQuery = useSearchPostsQuery(
    { text: encodeURIComponent(search), items: pageSize, page: pageNumber },
    { skip: !search }
  );

  return (
    <Box>
      <Stack direction="row" gap={4}>
        <CreateItemButton />
        <SearchForm
          onChange={(e) => {
            setPageNumber(0);
            setSearch(e);
          }}
        />
      </Stack>
      <Box mt={4}>
        <PostsList
          data={search ? searchQuery.data?.items : postsQuery.data?.items}
          totalCount={search ? searchQuery.data?.totalCount : postsQuery.data?.totalCount}
          itemsPerPage={pageSize}
          pageNumber={pageNumber}
          isLoading={postsQuery.isFetching || searchQuery.isFetching}
          onPageChange={(e) => setPageNumber(e)}
          onRowsPerPageChange={(e) => setPageSize(e)}
        />
      </Box>
    </Box>
  );
}
