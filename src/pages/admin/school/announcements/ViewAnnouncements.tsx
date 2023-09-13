import { Link, Stack, Typography } from '@mui/material';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Box } from '@mui/system';
import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { DeleteButton } from '../../../../components/buttons/DeleteButton';
import { CreateItemButton } from '../../../../components/links/CreateItemButton';
import { DefaultTable } from '../../../../components/table/DefaultTable';
import { toLocalDate } from '../../../../lib/dateFormat';
import { useDeleteAnnouncementMutation, useGetAnnouncementsQuery } from '../../../../services/api';

export default function ViewAnnouncements() {
  const [pageNumber, setPageNumber] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  const [deleteAnnouncement, { isLoading: deleteLoading }] = useDeleteAnnouncementMutation();
  const announcementQuery = useGetAnnouncementsQuery({ page: pageNumber, items: pageSize });

  const handleDelete = (id: number) => {
    deleteAnnouncement({ id });
  };

  return (
    <Box>
      <Stack direction="row" gap={4}>
        <CreateItemButton />
      </Stack>
      <Box mt={4}>
        <DefaultTable
          isLoading={announcementQuery.isFetching || deleteLoading}
          totalCount={announcementQuery.data?.totalCount}
          itemsPerPage={pageSize}
          pageNumber={pageNumber}
          onPageChange={(e) => setPageNumber(e)}
          onRowsPerPageChange={(e) => setPageSize(e)}
        >
          <TableHead>
            <TableRow>
              <TableCell>Skelbimai</TableCell>
              <TableCell width="20%" colSpan={2}>
                Data
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {announcementQuery.data?.items.map((ann) => (
              <TableRow hover key={ann.id}>
                <TableCell>
                  <Link component={RouterLink} to={`${ann.id}`}>
                    <Typography>{ann.title}</Typography>
                  </Link>
                </TableCell>
                <TableCell>
                  <Typography>{toLocalDate(ann.startTime)}</Typography>
                  <Typography>{toLocalDate(ann.endTime)}</Typography>
                </TableCell>
                <TableCell align="right">
                  <DeleteButton onConfirm={() => handleDelete(ann.id)} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </DefaultTable>
      </Box>
    </Box>
  );
}
