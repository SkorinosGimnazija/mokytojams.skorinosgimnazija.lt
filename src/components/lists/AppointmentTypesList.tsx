import { Link, Typography } from '@mui/material';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { toLocalDateTime } from '../../lib/dateFormat';
import { useDeleteAppointmentTypeMutation, useResetAppointmentTypeMutation } from '../../services/api';
import { AppointmentTypeDto } from '../../services/generatedApi';
import { DeleteButton } from '../buttons/DeleteButton';
import { TimeLink } from '../links/TimeLink';
import { UserLink } from '../links/UserLink';
import { DefaultTable, DefaultTableProps } from '../table/DefaultTable';
import { ResetButton } from '../buttons/ResetButton';

interface Props extends Omit<DefaultTableProps, 'children'> {
  data?: AppointmentTypeDto[];
}

export const AppointmentTypesList: React.FC<Props> = ({ data, isLoading, ...props }) => {
  const [deleteType, { isLoading: deleteLoading }] = useDeleteAppointmentTypeMutation();
  const [resetType, { isLoading: resetLoading }] = useResetAppointmentTypeMutation();

  const handleDelete = (id: number) => {
    deleteType({ id });
  };

  const handleReset = (id: number) => {
    resetType({ id });
  };

  return (
    <DefaultTable {...props} isLoading={isLoading || deleteLoading || resetLoading}>
      <TableHead>
        <TableRow>
          <TableCell>Pavadinimas</TableCell>
          <TableCell width="200px" align="center">
            Registracijos pabaiga
          </TableCell>
          <TableCell width="200px" align="center"></TableCell>
          <TableCell width="200px" align="right"></TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {data?.map((type) => (
          <TableRow hover key={type.id}>
            <TableCell>
              <Link component={RouterLink} to={`${type.id}`}>
                <Typography>{type.name}</Typography>
              </Link>
              <Typography variant="caption">{type.slug}</Typography>
            </TableCell>
            <TableCell align="center">
              <Typography>{toLocalDateTime(type.registrationEnd)}</Typography>
            </TableCell>
            <TableCell align="center">
              <TimeLink url={`${type.id}/time`} />
              <UserLink url={`${type.id}/users`} />
            </TableCell>
            <TableCell align="right">
              <ResetButton onConfirm={() => handleReset(type.id)} />
              <DeleteButton onConfirm={() => handleDelete(type.id)} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </DefaultTable>
  );
};
