import { Link, Stack, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { useDeleteObservationTypeMutation, useGetObservationTypesQuery } from '../../../services/api';
import { CreateItemButton } from '../../../components/links/CreateItemButton';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Link as RouterLink } from 'react-router-dom';
import { DefaultTable } from '../../../components/table/DefaultTable';
import { DeleteButton } from '../../../components/buttons/DeleteButton';

export default function ViewObservationTypes() {
  const [deleteObservationType, { isLoading: deleteLoading }] = useDeleteObservationTypeMutation();
  const observationTypeQuery = useGetObservationTypesQuery();

  const handleDelete = (id: number) => {
    deleteObservationType({ id });
  };

  return (
    <Box>
      <Stack direction="row" gap={4}>
        <CreateItemButton />
      </Stack>

      <Box mt={4}>
        <DefaultTable isLoading={observationTypeQuery.isFetching || deleteLoading}>
          <TableHead>
            <TableRow>
              <TableCell>Pasirinkimai</TableCell>
              <TableCell width="100px" align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {observationTypeQuery.data?.map((type) => (
              <TableRow hover key={type.id}>
                <TableCell width="100%">
                  <Link component={RouterLink} to={`${type.id}`}>
                    <Typography>{type.name}</Typography>
                  </Link>
                </TableCell>
                <TableCell align="right">
                  <DeleteButton onConfirm={() => handleDelete(type.id)} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </DefaultTable>
      </Box>
    </Box>
  );
}
