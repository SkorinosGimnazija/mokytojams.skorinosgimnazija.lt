import { Button, Stack, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import {
  useDeleteStudentObservationMutation,
  useGetStudentObservationsQuery,
} from '../../../services/api';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { ProtectedComponent } from '../../../components/auth/ProtectedComponent';
import { DeleteButton } from '../../../components/buttons/DeleteButton';
import { DefaultTable } from '../../../components/table/DefaultTable';
import { toLocalDate } from '../../../lib/dateFormat';

export default function ViewObservations() {
  const navigate = useNavigate();
  const [pageNumber, setPageNumber] = React.useState(0);
  const [pageSize, setPageSize] = React.useState(10);

  const observationQuery = useGetStudentObservationsQuery({ items: pageSize, page: pageNumber });
  const [deleteObservationMutation, deleteObservationStatus] = useDeleteStudentObservationMutation();

  function handleDelete(id: number) {
    deleteObservationMutation({ id: id });
  }

  return (
    <Box>
      <Stack direction="row" gap={4}>
        <ProtectedComponent authRole="Admin">
          <Button color="info" component={RouterLink} to="targets" variant="contained">
            Mokiniai
          </Button>
          <Button color="info" component={RouterLink} to="lessons" variant="contained">
            Pamokos
          </Button>
          <Button color="info" component={RouterLink} to="types" variant="contained">
            Pasirinkimai
          </Button>
        </ProtectedComponent>
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
              <TableCell width="30%">Mokytojai</TableCell>
              <TableCell width="40%" align="center">
                Mokinys
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
                onClick={() => navigate(`${obs.id}`)}
              >
                <TableCell>
                  <Typography>{obs.teacher.name}</Typography>
                  <Typography variant="caption">{obs.lesson.name}</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography>
                    {obs.target.name} ({obs.types.length})
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography>{toLocalDate(obs.date)}</Typography>
                </TableCell>
                <TableCell align="right">
                  <ProtectedComponent authRole={'Admin'}>
                    <DeleteButton onConfirm={() => handleDelete(obs.id)} />
                  </ProtectedComponent>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </DefaultTable>
      </Box>
    </Box>
  );
}
