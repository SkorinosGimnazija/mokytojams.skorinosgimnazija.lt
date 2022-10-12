import { Typography } from '@mui/material';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { toLocalDate } from '../../lib/dateFormat';
import { useDeleteBullyJournalReportMutation } from '../../services/api';
import { BullyJournalReportDto } from '../../services/generatedApi';
import { DeleteButton } from '../buttons/DeleteButton';
import { DefaultTable, DefaultTableProps } from '../table/DefaultTable';

interface Props extends Omit<DefaultTableProps, 'children'> {
  data?: BullyJournalReportDto[];
}

export const BullyJournalReportsList: React.FC<Props> = ({ data, isLoading, ...props }) => {
  const [deleteBullyReport, { isLoading: deleteLoading }] = useDeleteBullyJournalReportMutation();
  const navigate = useNavigate();
  const auth = useAuth();

  const handleDelete = (id: number) => {
    deleteBullyReport({ id });
  };

  return (
    <DefaultTable {...props} isLoading={isLoading || deleteLoading}>
      <TableHead>
        <TableRow>
          <TableCell>Mokytojas</TableCell>
          <TableCell align="center">Smurtaujantis/besityčiojantis asmuo</TableCell>
          <TableCell align="center">Smurtą/patyčias patiriantis asmuo</TableCell>
          <TableCell align="center">Data</TableCell>
          <TableCell width="100px" align="right"></TableCell>
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
              <Typography>{bullyReport.userDisplayName}</Typography>
            </TableCell>
            <TableCell>
              <Typography align="center">{bullyReport.bullyInfo}</Typography>
            </TableCell>
            <TableCell align="center">
              <Typography>{bullyReport.victimInfo}</Typography>
            </TableCell>
            <TableCell align="center">
              <Typography>{toLocalDate(bullyReport.date)}</Typography>
            </TableCell>
            <TableCell align="right">
              {(auth.isAdmin || auth.userId === bullyReport.userId) && (
                <DeleteButton onConfirm={() => handleDelete(bullyReport.id)} />
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </DefaultTable>
  );
};
