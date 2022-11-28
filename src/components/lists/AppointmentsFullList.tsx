import VideoCallIcon from '@mui/icons-material/VideoCall';
import { IconButton, Tooltip, Typography } from '@mui/material';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import { toLocalDateTime } from '../../lib/dateFormat';
import { useDeleteAppointmentMutation } from '../../services/api';
import { AppointmentDetailsDto } from '../../services/generatedApi';
import { DeleteButton } from '../buttons/DeleteButton';
import { DefaultTable, DefaultTableProps } from '../table/DefaultTable';

interface Props extends Omit<DefaultTableProps, 'children'> {
  data?: AppointmentDetailsDto[];
}

export const AppointmentsFullList: React.FC<Props> = ({ data, isLoading, ...props }) => {
  const auth = useAuth();
  const [deleteAppointment, { isLoading: deleteLoading }] = useDeleteAppointmentMutation();

  const handleDelete = (id: number) => {
    deleteAppointment({ id });
  };

  return (
    <DefaultTable {...props} isLoading={isLoading || deleteLoading}>
      <TableHead>
        <TableRow>
          <TableCell>Mokytojas</TableCell>
          <TableCell>Dalyvis</TableCell>
          <TableCell width="250px" align="center">
            Data
          </TableCell>
          <TableCell width="100px" align="right"></TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {data?.map((reg) => (
          <TableRow hover key={reg.id}>
            <TableCell>
              <Typography>{reg.userDisplayName}</Typography>
              <Typography variant="caption">{reg.date.type.name}</Typography>
            </TableCell>
            <TableCell>
              <Typography>{reg.attendeeName}</Typography>
              <Typography variant="caption">{reg.attendeeEmail}</Typography>
            </TableCell>
            <TableCell align="center">
              <Typography>{toLocalDateTime(reg.date.date)}</Typography>
            </TableCell>
            <TableCell align="right">
              {auth.isAdmin && <DeleteButton onConfirm={() => handleDelete(reg.id)} />}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </DefaultTable>
  );
};
