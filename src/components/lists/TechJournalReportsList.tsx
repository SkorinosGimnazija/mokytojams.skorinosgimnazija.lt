import BuildRoundedIcon from '@mui/icons-material/BuildRounded';
import { IconButton, Tooltip, Typography } from '@mui/material';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Box } from '@mui/system';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { toLocalDate } from '../../lib/dateFormat';
import { useDeleteTechJournalReportMutation } from '../../services/api';
import { TechJournalReportDto } from '../../services/generatedApi';
import { DeleteButton } from '../buttons/DeleteButton';
import { StatusIcon } from '../icons/StatusIcon';
import { DefaultTable, DefaultTableProps } from '../table/DefaultTable';

interface Props extends Omit<DefaultTableProps, 'children'> {
  data?: TechJournalReportDto[];
}

export const TechJournalReportsList: React.FC<Props> = ({ data, isLoading, ...props }) => {
  const [deleteTechReport, { isLoading: deleteLoading }] = useDeleteTechJournalReportMutation();
  const navigate = useNavigate();
  const auth = useAuth();

  const handleDelete = (id: number) => {
    deleteTechReport({ id });
  };

  const handleFixClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, id: number) => {
    e.stopPropagation();
  };

  return (
    <DefaultTable {...props} isLoading={isLoading || deleteLoading}>
      <TableHead>
        <TableRow>
          <TableCell width="80px"></TableCell>
          <TableCell>Mokytojas</TableCell>
          <TableCell width="200px" align="center">
            Vieta
          </TableCell>
          <TableCell width="500px" align="center">
            Gedimo/defekto apibūdinimas
          </TableCell>
          <TableCell align="center">Data</TableCell>
          <TableCell width="150px" align="right"></TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {data?.map((techReport) => {
          const canEdit = auth.isAdmin || auth.userId === techReport.userId;
          const canFix = auth.isAdmin || auth.isTech;
          return (
            <TableRow
              sx={{ cursor: canEdit ? 'pointer' : null }}
              hover
              key={techReport.id}
              onClick={() => canEdit && navigate(`${techReport.id}`)}
            >
              <TableCell sx={{ padding: '0' }}>
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                  <StatusIcon status={techReport.isFixed} notes={techReport.notes} />
                </Box>
              </TableCell>
              <TableCell>
                <Typography>{techReport.userDisplayName}</Typography>
              </TableCell>
              <TableCell>
                <Typography align="center">{techReport.place}</Typography>
              </TableCell>
              <TableCell align="center">
                <Typography>{techReport.details}</Typography>
              </TableCell>
              <TableCell align="center">
                <Typography>{toLocalDate(techReport.reportDate)}</Typography>
                <Typography variant="caption">{toLocalDate(techReport.fixDate)}</Typography>
              </TableCell>
              <TableCell align="right">
                {canFix && (
                  <Link to={`${techReport.id}/fix`} onClick={(e) => e.stopPropagation()}>
                    <Tooltip title="Gedimas">
                      <IconButton>
                        <BuildRoundedIcon color="info" />
                      </IconButton>
                    </Tooltip>
                  </Link>
                )}
                {canEdit && <DeleteButton onConfirm={() => handleDelete(techReport.id)} />}
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </DefaultTable>
  );
};
