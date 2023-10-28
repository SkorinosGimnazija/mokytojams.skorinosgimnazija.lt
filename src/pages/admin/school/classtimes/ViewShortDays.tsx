import { Link, Stack, Typography } from '@mui/material';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Box } from '@mui/system';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { DeleteButton } from '../../../../components/buttons/DeleteButton';
import { CreateItemButton } from '../../../../components/links/CreateItemButton';
import { DefaultTable } from '../../../../components/table/DefaultTable';
import { toLocalDate } from '../../../../lib/dateFormat';
import {
  useDeleteClasstimeShortDayMutation,
  useGetClasstimesShortDaysQuery,
} from '../../../../services/api';

export default function ViewShortDays() {
  const [pageNumber, setPageNumber] = React.useState(0);
  const [pageSize, setPageSize] = React.useState(10);
  const classtimeQuery = useGetClasstimesShortDaysQuery({ items: pageSize, page: pageNumber });
  const [deleteClasstimeShortDay, { isLoading: deleteLoading }] = useDeleteClasstimeShortDayMutation();

  const handleDelete = (id: number) => {
    deleteClasstimeShortDay({ id });
  };

  return (
    <Box>
      <Stack direction="row" gap={4}>
        <CreateItemButton />
      </Stack>
      <Box mt={4}>
        <DefaultTable
          isLoading={classtimeQuery.isFetching || deleteLoading}
          totalCount={classtimeQuery.data?.totalCount}
          itemsPerPage={pageSize}
          pageNumber={pageNumber}
          onPageChange={(e) => setPageNumber(e)}
          onRowsPerPageChange={(e) => setPageSize(e)}
        >
          <TableHead>
            <TableRow>
              <TableCell>Dienos</TableCell>
              <TableCell width="100px" align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {classtimeQuery.data?.items?.map((classtime) => (
              <TableRow hover key={classtime.id}>
                <TableCell>
                  <Link component={RouterLink} to={`${classtime.id}`}>
                    <Typography>{toLocalDate(classtime.date)}</Typography>
                  </Link>
                </TableCell>
                <TableCell align="right">
                  <DeleteButton onConfirm={() => handleDelete(classtime.id)} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </DefaultTable>
      </Box>
    </Box>
  );
}
