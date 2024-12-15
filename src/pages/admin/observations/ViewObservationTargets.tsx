import { Link, Stack, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import {
  useDeleteObservationTargetMutation,
  useGetObservationTargetsQuery,
} from '../../../services/api';
import { CreateItemButton } from '../../../components/links/CreateItemButton';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Link as RouterLink } from 'react-router-dom';
import { DefaultTable } from '../../../components/table/DefaultTable';
import { DeleteButton } from '../../../components/buttons/DeleteButton';
import { EnabledIcon } from '../../../components/icons/EnabledIcon';

export default function ViewObservationTargets() {
  const [deleteObservationTarget, { isLoading: deleteLoading }] = useDeleteObservationTargetMutation();
  const observationTargetQuery = useGetObservationTargetsQuery({ enabledOnly: false });

  const handleDelete = (id: number) => {
    deleteObservationTarget({ id });
  };

  return (
    <Box>
      <Stack direction="row" gap={4}>
        <CreateItemButton />
      </Stack>

      <Box mt={4}>
        <DefaultTable isLoading={observationTargetQuery.isFetching || deleteLoading}>
          <TableHead>
            <TableRow>
              <TableCell colSpan={2}>Mokiniai</TableCell>
              <TableCell width="100px" align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {observationTargetQuery.data?.map((target) => (
              <TableRow hover key={target.id}>
                <TableCell>
                  <EnabledIcon active={target.enabled} />
                </TableCell>
                <TableCell width="100%">
                  <Link component={RouterLink} to={`${target.id}`}>
                    <Typography>{target.name}</Typography>
                  </Link>
                </TableCell>
                <TableCell align="right">
                  <DeleteButton onConfirm={() => handleDelete(target.id)} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </DefaultTable>
      </Box>
    </Box>
  );
}
