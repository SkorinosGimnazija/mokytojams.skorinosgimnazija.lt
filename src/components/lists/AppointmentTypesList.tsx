import { Link, Typography } from '@mui/material';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useDeleteAppointmentTypeMutation, useDeleteMenuMutation } from '../../services/api';
import { MenuDetailsDto } from '../../services/generatedApi';
import { DeleteButton } from '../buttons/DeleteButton';
import { PublishButton } from '../buttons/PublishButton';
import { DefaultTable, DefaultTableProps } from '../table/DefaultTable';
import { AppointmentTypeDto } from '../../services/generatedApi';
import { toLocalDate, toLocalDateTime } from '../../lib/dateFormat';
import { TimeLink } from '../links/TimeLink';
import { UserLink } from '../links/UserLink';

interface Props extends DefaultTableProps {
  data?: AppointmentTypeDto[];
}

export const AppointmentTypesList: React.FC<Props> = ({ data, isLoading, ...props }) => {
  const [deleteType, { isLoading: deleteLoading }] = useDeleteAppointmentTypeMutation();

  const handleDelete = (id: number) => {
    deleteType({ id });
  };

  return (
    <>
      <DefaultTable {...props} isLoading={isLoading || deleteLoading}>
        <TableHead>
          <TableRow>
            <TableCell>Pavadinimas</TableCell>
            <TableCell width="200px" align="center">
              Registracijos pabaiga
            </TableCell>
            <TableCell width="200px" align="center"></TableCell>
            <TableCell width="100px" align="right"></TableCell>
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
                <DeleteButton onConfirm={() => handleDelete(type.id)} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </DefaultTable>
    </>
  );
};
