import { Typography } from '@mui/material';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { toLocalDateTime } from '../../lib/dateFormat';
import { useDeleteBullyReportMutation } from '../../services/api';
import { BullyReportDto } from '../../services/generatedApi';
import { DeleteButton } from '../buttons/DeleteButton';
import { DefaultTable, DefaultTableProps } from '../table/DefaultTable';

interface Props extends Omit<DefaultTableProps, 'children'> {
  data?: BullyReportDto[];
}

export const BullyReportsList: React.FC<Props> = ({ data, isLoading, ...props }) => {
  const [deleteBullyReport, { isLoading: deleteLoading }] = useDeleteBullyReportMutation();
  const navigate = useNavigate();
  const auth = useAuth();

  const handleDelete = (id: number) => {
    deleteBullyReport({ id });
  };

  return (
    <DefaultTable {...props} isLoading={isLoading || deleteLoading}>
      <TableHead>
        <TableRow>
          <TableCell>Kas patyrė patyčias</TableCell>
          <TableCell align="center">Kas tyčiojosi</TableCell>
          <TableCell align="center">Kada įvyko patyčios</TableCell>
          <TableCell align="center">Apie įvykį pranešta</TableCell>
          {auth.hasRole('Admin') && <TableCell width="100px" align="right"></TableCell>}
        </TableRow>
      </TableHead>
      <TableBody>
        {data?.map((bullyReport) => (
          <TableRow
            sx={{ cursor: 'pointer' }}
            hover
            key={bullyReport.id}
            onClick={() => navigate(`${bullyReport.id}`)}
          >
            <TableCell>
              <Typography>{bullyReport.victimInfo}</Typography>
            </TableCell>
            <TableCell align="center">
              <Typography>{bullyReport.bullyInfo}</Typography>
            </TableCell>
            <TableCell align="center">
              <Typography>{toLocalDateTime(bullyReport.date)}</Typography>
            </TableCell>
            <TableCell align="center">
              <Typography>{toLocalDateTime(bullyReport.createdAt)}</Typography>
            </TableCell>
            {auth.hasRole('Admin') && (
              <TableCell align="right">
                <DeleteButton onConfirm={() => handleDelete(bullyReport.id)} />
              </TableCell>
            )}
          </TableRow>
        ))}
      </TableBody>
    </DefaultTable>
  );
};
