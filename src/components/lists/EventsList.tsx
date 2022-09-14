import { Typography } from '@mui/material';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import React from 'react';
import { toLocalDate, toLocalDateTime } from '../../lib/dateFormat';
import { useDeleteEventMutation } from '../../services/api';
import { EventDto } from '../../services/generatedApi';
import { DeleteButton } from '../buttons/DeleteButton';
import { DefaultTable, DefaultTableProps } from '../table/DefaultTable';

interface Props extends Omit<DefaultTableProps, 'children'> {
  eventsData?: EventDto[];
}

export const EventsList: React.FC<Props> = ({ eventsData, isLoading, ...props }) => {
  const [deleteEvent, { isLoading: deleteLoading }] = useDeleteEventMutation();

  const handleDelete = (id: string) => {
    deleteEvent({ id });
  };

  return (
    <DefaultTable {...props} isLoading={isLoading || deleteLoading}>
      <TableHead>
        <TableRow>
          <TableCell>Renginiai</TableCell>
          <TableCell width="300px" align="center">
            Data
          </TableCell>
          <TableCell width="100px" align="right"></TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {eventsData?.map((event) => {
          return (
            <React.Fragment key={event.id}>
              {/* <TableRow hover sx={{ cursor: 'pointer' }} onClick={() => {}}> */}
              <TableRow hover>
                <TableCell>
                  <Typography>{event.title}</Typography>
                </TableCell>

                <TableCell align="center">
                  <Typography>
                    {event.startDate
                      ? toLocalDate(event.startDate)
                      : toLocalDateTime(event.startDateTime)}
                  </Typography>

                  <Typography>
                    {event.endDate ? toLocalDate(event.endDate) : toLocalDateTime(event.endDateTime)}
                  </Typography>
                </TableCell>

                <TableCell align="right">
                  <DeleteButton onConfirm={() => handleDelete(event.id)} />
                </TableCell>
              </TableRow>
            </React.Fragment>
          );
        })}
      </TableBody>
    </DefaultTable>
  );
};
