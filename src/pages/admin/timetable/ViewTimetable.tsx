import { Button, Stack, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { LocalizationProvider, YearCalendar } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { addDays, addYears, format } from 'date-fns';
import React, { useState } from 'react';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Link as RouterLink } from 'react-router-dom';
import { Link } from '@mui/material';
import { useDeleteTimetableMutation, useGetTimetableQuery } from '../../../services/api';
import { CreateItemButton } from '../../../components/links/CreateItemButton';
import { DefaultTable } from '../../../components/table/DefaultTable';
import { DeleteButton } from '../../../components/buttons/DeleteButton';

export default function ViewTimetable() {
  const [pageNumber, setPageNumber] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  const [deleteClassroom, { isLoading: deleteLoading }] = useDeleteTimetableMutation();
  const timetableQuery = useGetTimetableQuery({ page: pageNumber, items: pageSize });

  const handleDelete = (id: number) => {
    deleteClassroom({ id });
  };

  return (
    <Box>
      <Stack direction="row" gap={4}>
        <CreateItemButton />
        <Button color="error" component={RouterLink} to="prune" variant="contained">
          Ištrinti tvarkaraštį
        </Button>
      </Stack>
      <Box mt={4}>
        <DefaultTable
          isLoading={timetableQuery.isFetching || deleteLoading}
          totalCount={timetableQuery.data?.totalCount}
          itemsPerPage={pageSize}
          pageNumber={pageNumber}
          onPageChange={(e) => setPageNumber(e)}
          onRowsPerPageChange={(e) => setPageSize(e)}
        >
          <TableHead>
            <TableRow>
              <TableCell width="30%">Pamokos</TableCell>
              <TableCell width="30%">Klasė</TableCell>
              <TableCell colSpan={2}>Laikas</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {timetableQuery.data?.items.map((timetable) => (
              <TableRow hover key={timetable.id}>
                <TableCell>
                  <Link component={RouterLink} to={`${timetable.id}`}>
                    <Typography>{timetable.className}</Typography>
                  </Link>
                </TableCell>
                <TableCell>
                  <Typography>{timetable.room.name}</Typography>
                </TableCell>
                <TableCell>
                  <Typography>{timetable.day.name}</Typography>
                  <Typography>
                    {timetable.time.number}. {timetable.time.startTime.slice(0, 5)}
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <DeleteButton onConfirm={() => handleDelete(timetable.id)} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </DefaultTable>
      </Box>
    </Box>
  );
}
