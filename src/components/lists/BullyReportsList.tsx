import { Link, Typography } from '@mui/material';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { toLocalDateTime } from '../../lib/dateFormat';
import { useDeleteBullyReportMutation } from '../../services/api';
import { BullyReportDto } from '../../services/generatedApi';
import { DeleteButton } from '../buttons/DeleteButton';
import { DefaultTable, DefaultTableProps } from '../table/DefaultTable';

interface Props extends DefaultTableProps {
  data?: BullyReportDto[];
}

export const BullyReportsList: React.FC<Props> = ({ data, isLoading, ...props }) => {
  const auth = useAuth();
  const [deleteBullyReport, { isLoading: deleteLoading }] = useDeleteBullyReportMutation();

  const handleDelete = (id: number) => {
    deleteBullyReport({ id });
  };

  return (
    <>
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
            <TableRow hover key={bullyReport.id}>
              <TableCell>
                <Link component={RouterLink} to={`${bullyReport.id}`}>
                  <Typography>{bullyReport.victimInfo}</Typography>
                </Link>
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
    </>
  );
};
