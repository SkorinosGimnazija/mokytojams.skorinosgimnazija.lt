import { Box, Stack, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { CreateItemButton } from '../../../components/links/CreateItemButton';
import {
  useDeleteStudentObservationMutation,
  useGetMyStudentObservationsQuery,
  usePrefetch,
} from '../../../services/api';
import { useNavigate } from 'react-router-dom';
import { DeleteButton } from '../../../components/buttons/DeleteButton';
import { DefaultTable } from '../../../components/table/DefaultTable';
import { toLocalDate } from '../../../lib/dateFormat';

export default function ViewObservations() {
  const navigate = useNavigate();
  const [pageNumber, setPageNumber] = React.useState(0);
  const [pageSize, setPageSize] = React.useState(10);

  const observationQuery = useGetMyStudentObservationsQuery(
    { items: pageSize, page: pageNumber }
    // { refetchOnMountOrArgChange: true }
  );
  const [deleteObservationMutation, deleteObservationStatus] = useDeleteStudentObservationMutation();

  const prefetchTargets = usePrefetch('getObservationTargets');
  const prefetchLessons = usePrefetch('getObservationLessons');
  const prefetchTypes = usePrefetch('getObservationTypes');
  const prefetchObservation = usePrefetch('getStudentObservationById');

  useEffect(() => {
    prefetchTargets({ enabledOnly: true });
    prefetchLessons();
    prefetchTypes();
  }, [prefetchTargets, prefetchLessons, prefetchTypes]);

  function handleDelete(id: number) {
    deleteObservationMutation({ id: id });
  }

  return (
    <Box>
      <Stack direction="row" gap={4}>
        <CreateItemButton />
      </Stack>

      <Box mt={4}>
        <DefaultTable
          totalCount={observationQuery.data?.totalCount}
          pageNumber={pageNumber}
          itemsPerPage={pageSize}
          onPageChange={setPageNumber}
          onRowsPerPageChange={setPageSize}
          isLoading={observationQuery.isFetching || deleteObservationStatus.isLoading}
        >
          <TableHead>
            <TableRow>
              <TableCell width="30%">Jūsų mokiniai</TableCell>
              <TableCell width="40%" align="center">
                Pamoka
              </TableCell>
              <TableCell width={250} align="center">
                Data
              </TableCell>
              <TableCell width={100} align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {observationQuery.data?.items?.map((obs) => (
              <TableRow
                key={obs.id}
                hover
                sx={{ cursor: 'pointer' }}
                onMouseEnter={() => prefetchObservation({ id: obs.id })}
                onClick={() => navigate(`${obs.id}`)}
              >
                <TableCell>
                  <Typography>
                    {obs.target.name} ({obs.types.length})
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography align="center">{obs.lesson.name}</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography>{toLocalDate(obs.date)}</Typography>
                </TableCell>
                <TableCell align="right">
                  <DeleteButton onConfirm={() => handleDelete(obs.id)} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </DefaultTable>
      </Box>
    </Box>
  );
}
