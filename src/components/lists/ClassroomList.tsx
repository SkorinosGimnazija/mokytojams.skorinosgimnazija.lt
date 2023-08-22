import { Link, Typography } from '@mui/material';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useDeleteClassroomMutation } from '../../services/api';
import { ClassroomDto } from '../../services/generatedApi';
import { DeleteButton } from '../buttons/DeleteButton';
import { DefaultTable, DefaultTableProps } from '../table/DefaultTable';

interface Props extends Omit<DefaultTableProps, 'children'> {
  data?: ClassroomDto[];
}

export const ClassroomList: React.FC<Props> = ({ data, isLoading, ...props }) => {
  const [deleteClassroom, { isLoading: deleteLoading }] = useDeleteClassroomMutation();

  const handleDelete = (id: number) => {
    deleteClassroom({ id });
  };

  return (
    <DefaultTable {...props} isLoading={isLoading || deleteLoading}>
      <TableHead>
        <TableRow>
          <TableCell colSpan={2}>Klasės</TableCell>
          <TableCell width="100px" align="right"></TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {data?.map((classroom) => (
          <TableRow hover key={classroom.id}>
            <TableCell>
              <Typography noWrap>#{classroom.number}</Typography>
            </TableCell>
            <TableCell width="100%">
              <Link component={RouterLink} to={`${classroom.id}`}>
                <Typography>{classroom.name}</Typography>
              </Link>
            </TableCell>
            <TableCell align="right">
              <DeleteButton onConfirm={() => handleDelete(classroom.id)} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </DefaultTable>
  );
};
