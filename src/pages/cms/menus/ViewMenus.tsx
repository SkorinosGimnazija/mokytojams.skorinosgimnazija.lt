import { Stack } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { SearchForm } from '../../../components/forms/SearchForm';
import { CreateItemButton } from '../../../components/links/CreateItemButton';
import { MenusList } from '../../../components/lists/MenusList';
import { useGetMenusQuery, useSearchMenusQuery } from '../../../services/api';

export default function ViewMenus() {
  const [search, setSearch] = React.useState('');
  const [pageNumber, setPageNumber] = React.useState(0);
  const [pageSize, setPageSize] = React.useState(10);
  const menuQuery = useGetMenusQuery({ items: pageSize, page: pageNumber }, { skip: !!search });
  const searchQuery = useSearchMenusQuery(
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
        <MenusList
          data={search ? searchQuery.data?.items : menuQuery.data?.items}
          totalCount={search ? searchQuery.data?.totalCount : menuQuery.data?.totalCount}
          itemsPerPage={pageSize}
          pageNumber={pageNumber}
          isLoading={menuQuery.isFetching || searchQuery.isFetching}
          onPageChange={(e) => setPageNumber(e)}
          onRowsPerPageChange={(e) => setPageSize(e)}
        />
      </Box>
    </Box>
  );
}
