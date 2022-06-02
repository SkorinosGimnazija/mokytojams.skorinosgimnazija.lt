import VideoCallIcon from '@mui/icons-material/VideoCall';
import { IconButton, Tooltip, Typography } from '@mui/material';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import { toLocalDateTime } from '../../lib/dateFormat';
import { AppointmentDetailsDto } from '../../services/generatedApi';
import { DefaultTable, DefaultTableProps } from '../table/DefaultTable';

interface Props extends DefaultTableProps {
  data?: AppointmentDetailsDto[];
}

export const AppointmentsList: React.FC<Props> = ({ data, isLoading, ...props }) => {
  const auth = useAuth();

  return (
    <>
      <DefaultTable {...props} isLoading={isLoading}>
        <TableHead>
          <TableRow>
            <TableCell>Pas Jūs užsiregistravo</TableCell>
            <TableCell width="250px" align="center">
              Data
            </TableCell>
            <TableCell width="250px" align="center">
              Google Meet
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.map((reg) => (
            <TableRow hover key={reg.id}>
              <TableCell>
                <Typography>{reg.attendeeName}</Typography>
              </TableCell>
              <TableCell align="center">
                <Typography>{toLocalDateTime(reg.date.date)}</Typography>
              </TableCell>
              <TableCell align="center">
                <Tooltip title="Prisijungti prie vaizdo susitikimo">
                  <a
                    href={`${reg.eventMeetingLink}?authuser=${auth.email}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <IconButton>
                      <VideoCallIcon color="info" />
                    </IconButton>
                  </a>
                </Tooltip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </DefaultTable>
    </>
  );
};
