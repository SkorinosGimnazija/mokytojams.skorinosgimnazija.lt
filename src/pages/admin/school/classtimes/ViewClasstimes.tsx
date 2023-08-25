import { Stack, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { LocalizationProvider, YearCalendar } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { addDays, addYears, format } from 'date-fns';
import { useState } from 'react';
import { useDeleteClasstimeMutation, useGetClasstimesQuery } from '../../../../services/api';
import { CreateItemButton } from '../../../../components/links/CreateItemButton';
import { DefaultTable } from '../../../../components/table/DefaultTable';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Link as RouterLink } from 'react-router-dom';
import { Link } from '@mui/material';
import { DeleteButton } from '../../../../components/buttons/DeleteButton';

export default function ViewClasstimes() {
  const [deleteClassroom, { isLoading: deleteLoading }] = useDeleteClasstimeMutation();
  const classtimeQuery = useGetClasstimesQuery();

  const handleDelete = (id: number) => {
    deleteClassroom({ id });
  };

  return (
    <Box>
      <Stack direction="row" gap={4}>
        <CreateItemButton />
      </Stack>
      <Box mt={4}>
        <DefaultTable isLoading={classtimeQuery.isFetching || deleteLoading}>
          <TableHead>
            <TableRow>
              <TableCell colSpan={3}>Pamokos</TableCell>
              <TableCell width="100px" align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {classtimeQuery.data?.map((classtime) => (
              <TableRow hover key={classtime.id}>
                <TableCell>
                  <Link component={RouterLink} to={`${classtime.id}`}>
                    <Typography>{classtime.number}</Typography>
                  </Link>
                </TableCell>
                <TableCell>
                  <Link component={RouterLink} to={`${classtime.id}`}>
                    <Typography>{classtime.startTime}</Typography>
                  </Link>
                </TableCell>
                <TableCell>
                  <Link component={RouterLink} to={`${classtime.id}`}>
                    <Typography>{classtime.endTime}</Typography>
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
