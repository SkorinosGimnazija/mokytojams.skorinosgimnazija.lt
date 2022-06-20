import { Link, Typography } from '@mui/material';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { toLocalDate } from '../../lib/dateFormat';
import { useDeleteAccomplishmentMutation } from '../../services/api';
import { AccomplishmentDto } from '../../services/generatedApi';
import { DeleteButton } from '../buttons/DeleteButton';
import { DefaultTable, DefaultTableProps } from '../table/DefaultTable';

interface Props extends DefaultTableProps {
  data?: AccomplishmentDto[];
  preview?: boolean;
}

export const AccomplishmentsList: React.FC<Props> = ({ data, isLoading, preview, ...props }) => {
  const [deleteAccomplishment, { isLoading: deleteLoading }] = useDeleteAccomplishmentMutation();

  const handleDelete = (id: number) => {
    deleteAccomplishment({ id });
  };

  return (
    <>
      <DefaultTable {...props} isLoading={isLoading || deleteLoading}>
        <TableHead>
          <TableRow>
            <TableCell>{preview ? 'Mokinių pasiekimai' : 'Jūsų mokinių pasiekimai'}</TableCell>
            <TableCell width="230px" align="center">
              Mokiniai
            </TableCell>
            <TableCell width="230px" align="center">
              Mokytojai
            </TableCell>
            <TableCell width="150px" align="center">
              Data
            </TableCell>
            {!preview && <TableCell width="100px" align="right"></TableCell>}
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.map((accomplishment) => (
            <TableRow hover key={accomplishment.id}>
              <TableCell>
                {preview ? (
                  <Typography>{accomplishment.name}</Typography>
                ) : (
                  <Link component={RouterLink} to={`${accomplishment.id}`}>
                    <Typography>{accomplishment.name}</Typography>
                  </Link>
                )}
                <Typography>{accomplishment.achievement}</Typography>
                <Typography variant="caption">{accomplishment.scale}</Typography>
              </TableCell>
              <TableCell align="center">
                {accomplishment.students.map((x) => {
                  return (
                    <Typography key={x.id} sx={{ whiteSpace: 'nowrap' }}>
                      {x.name} ({x.classroom.name})
                    </Typography>
                  );
                })}
              </TableCell>
              <TableCell align="center">
                <Typography>{accomplishment.teacherDisplayName}</Typography>
                {accomplishment.additionalTeachers.map((x) => {
                  return (
                    <Typography key={x.id} sx={{ whiteSpace: 'nowrap' }}>
                      {x.name}
                    </Typography>
                  );
                })}
              </TableCell>
              <TableCell align="center">
                <Typography>{toLocalDate(accomplishment.date)}</Typography>
              </TableCell>
              {!preview && (
                <TableCell align="right">
                  <DeleteButton onConfirm={() => handleDelete(accomplishment.id)} />
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </DefaultTable>
    </>
  );
};
