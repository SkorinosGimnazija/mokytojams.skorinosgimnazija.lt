import { Link, Stack, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import {
  useDeleteObservationLessonMutation,
  useGetObservationLessonsQuery,
} from '../../../services/api';
import { CreateItemButton } from '../../../components/links/CreateItemButton';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Link as RouterLink } from 'react-router-dom';
import { DefaultTable } from '../../../components/table/DefaultTable';
import { DeleteButton } from '../../../components/buttons/DeleteButton';

export default function ViewObservationLessons() {
  const [deleteObservationLesson, { isLoading: deleteLoading }] = useDeleteObservationLessonMutation();
  const observationLessonQuery = useGetObservationLessonsQuery();

  const handleDelete = (id: number) => {
    deleteObservationLesson({ id });
  };

  return (
    <Box>
      <Stack direction="row" gap={4}>
        <CreateItemButton />
      </Stack>

      <Box mt={4}>
        <DefaultTable isLoading={observationLessonQuery.isFetching || deleteLoading}>
          <TableHead>
            <TableRow>
              <TableCell>Pamokos</TableCell>
              <TableCell width="100px" align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {observationLessonQuery.data?.map((lesson) => (
              <TableRow hover key={lesson.id}>
                <TableCell width="100%">
                  <Link component={RouterLink} to={`${lesson.id}`}>
                    <Typography>{lesson.name}</Typography>
                  </Link>
                </TableCell>
                <TableCell align="right">
                  <DeleteButton onConfirm={() => handleDelete(lesson.id)} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </DefaultTable>
      </Box>
    </Box>
  );
}
