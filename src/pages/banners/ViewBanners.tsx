import { Stack } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { json } from 'stream/consumers';
import { SearchForm } from '../../components/forms/SearchForm';
import { CreateItemButton } from '../../components/links/CreateItemButton';
import { BannersList } from '../../components/lists/BannersList';
import { MenusList } from '../../components/lists/MenusList';
import { PostsList } from '../../components/lists/PostsList';
import { useGetBannersQuery, useGetMenusQuery, useSearchBannersQuery } from '../../services/api';

export default function ViewBanners() {
  const [search, setSearch] = React.useState('');
  const [pageNumber, setPageNumber] = React.useState(0);
  const [pageSize, setPageSize] = React.useState(10);
  const bannersQuery = useGetBannersQuery({ items: pageSize, page: pageNumber }, { skip: !!search });
  const searchQuery = useSearchBannersQuery(
    { text: search, items: pageSize, page: pageNumber },
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
        <BannersList
          data={search ? searchQuery.data?.items : bannersQuery.data?.items}
          totalCount={search ? searchQuery.data?.totalCount : bannersQuery.data?.totalCount}
          itemsPerPage={pageSize}
          pageNumber={pageNumber}
          isLoading={bannersQuery.isFetching || searchQuery.isFetching}
          onPageChange={(e) => setPageNumber(e)}
          onRowsPerPageChange={(e) => setPageSize(e)}
        />
      </Box>
    </Box>
  );
}
