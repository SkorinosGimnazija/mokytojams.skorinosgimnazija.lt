import { Link, TableFooter, Typography } from '@mui/material';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import React, { useMemo } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { toLocalDate } from '../../lib/dateFormat';
import {
  useDeleteAccomplishmentMutation,
  useGetAccomplishmentAchievementsQuery,
} from '../../services/api';
import { AccomplishmentDto } from '../../services/generatedApi';
import { DeleteButton } from '../buttons/DeleteButton';
import { DefaultTable, DefaultTableProps } from '../table/DefaultTable';

interface Props extends Omit<DefaultTableProps, 'children'> {
  data?: AccomplishmentDto[];
  adminView?: boolean;
}

export const AccomplishmentsList: React.FC<Props> = ({ data, isLoading, adminView, ...props }) => {
  const [deleteAccomplishment, { isLoading: deleteLoading }] = useDeleteAccomplishmentMutation();
  const achievementQuery = useGetAccomplishmentAchievementsQuery();

  const totals = useMemo(() => {
    const allStudents = data?.flatMap((x) => x.students) ?? [];
    const achievements =
      achievementQuery.data?.map((x) => ({
        name: x.name,
        id: x.id,
        count: allStudents.filter((z) => z.achievement.id === x.id).length,
      })) ?? [];
    const achievementsCount = achievements.reduce((acc, cur) => acc + cur.count, 0);

    return {
      achievements,
      achievementsCount,
      teachersCount: (data?.flatMap((x) => x.additionalTeachers)?.length ?? 0) + (data?.length ?? 0),
      accomplishmentsCount: data?.length ?? 0,
    };
  }, [data, achievementQuery]);

  const handleDelete = (id: number) => {
    deleteAccomplishment({ id });
  };

  return (
    <DefaultTable {...props} isLoading={isLoading || deleteLoading}>
      <TableHead>
        <TableRow>
          <TableCell>{adminView ? 'Mokinių pasiekimai' : 'Jūsų mokinių pasiekimai'}</TableCell>
          <TableCell width="230px" align="center">
            Mokiniai
          </TableCell>
          <TableCell width="230px" align="center">
            Mokytojai
          </TableCell>
          <TableCell width="150px" align="center">
            Data
          </TableCell>
          <TableCell width="100px" align="right"></TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {data?.map((accomplishment) => (
          <TableRow hover key={accomplishment.id}>
            <TableCell>
              <Link component={RouterLink} to={`${accomplishment.id}`}>
                <Typography>{accomplishment.name}</Typography>
              </Link>
              <Typography variant="caption">{accomplishment.scale}</Typography>
            </TableCell>
            <TableCell align="center">
              {accomplishment.students.map((x) => {
                return (
                  <Typography key={x.id} sx={{ whiteSpace: 'nowrap' }}>
                    {x.name} ({x.achievement.name}) ({x.classroom.name})
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
            <TableCell align="right">
              <DeleteButton onConfirm={() => handleDelete(accomplishment.id)} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      {adminView && (
        <TableFooter>
          <TableRow>
            <TableCell align="right">
              <Typography>Iš viso:</Typography>
            </TableCell>
            <TableCell align="center">
              {totals.achievements.map((x) => {
                return (
                  <Typography key={x.id}>
                    {x.name}: {x.count}/{totals.achievementsCount}
                  </Typography>
                );
              })}
            </TableCell>
            <TableCell align="center">
              <Typography>{totals.teachersCount}</Typography>
            </TableCell>
            <TableCell align="center">
              <Typography>{totals.accomplishmentsCount}</Typography>
            </TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableFooter>
      )}
    </DefaultTable>
  );
};
