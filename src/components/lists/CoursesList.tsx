import { Link, Typography } from '@mui/material';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { toLocalDate } from '../../lib/dateFormat';
import { useDeleteCourseMutation } from '../../services/api';
import { CourseDto } from '../../services/generatedApi';
import { DeleteButton } from '../buttons/DeleteButton';
import { DefaultTable, DefaultTableProps } from '../table/DefaultTable';

interface Props extends Omit<DefaultTableProps, 'children'> {
  data?: CourseDto[];
  preview?: boolean;
}

export const CoursesList: React.FC<Props> = ({ data, isLoading, preview, ...props }) => {
  const [deleteCourse, { isLoading: deleteLoading }] = useDeleteCourseMutation();

  const handleDelete = (id: number) => {
    deleteCourse({ id });
  };

  return (
    <DefaultTable {...props} isLoading={isLoading || deleteLoading}>
      <TableHead>
        <TableRow>
          <TableCell>{preview ? 'Kursai' : 'Jūsų kursai'}</TableCell>
          <TableCell width="250px" align="right">
            Pažymėjimas
          </TableCell>
          <TableCell width="175px" align="center">
            Data
          </TableCell>
          {!preview && <TableCell width="100px" align="right"></TableCell>}
        </TableRow>
      </TableHead>
      <TableBody>
        {data?.map((course) => (
          <TableRow hover key={course.id}>
            <TableCell>
              {preview ? (
                <Typography>{course.title}</Typography>
              ) : (
                <Link component={RouterLink} to={`${course.id}`}>
                  <Typography>{course.title}</Typography>
                </Link>
              )}
              <Typography variant="caption">{course.organizer}</Typography>
            </TableCell>
            <TableCell align="right">
              <Typography>{course.certificateNr}</Typography>
            </TableCell>
            <TableCell align="center">
              <Typography>{toLocalDate(course.startDate)}</Typography>
              <Typography variant="caption">{toLocalDate(course.endDate)}</Typography>
            </TableCell>
            {!preview && (
              <TableCell align="right">
                <DeleteButton onConfirm={() => handleDelete(course.id)} />
              </TableCell>
            )}
          </TableRow>
        ))}
      </TableBody>
    </DefaultTable>
  );
};
