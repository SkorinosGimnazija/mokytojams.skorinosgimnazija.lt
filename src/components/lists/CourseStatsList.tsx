import { TableFooter, Typography } from '@mui/material';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Box } from '@mui/system';
import round from 'lodash/round';
import React, { useMemo, useState } from 'react';
import { toLocalDate } from '../../lib/dateFormat';
import { CourseStatsDto } from '../../services/generatedApi';
import { DefaultTable, DefaultTableProps } from '../table/DefaultTable';
import { CoursesAdminList } from './CoursesAdminList';

interface Props extends Omit<DefaultTableProps, 'children'> {
  coursesData?: CourseStatsDto[];
  dateRange: { start: string; end: string };
}

export const CourseStatsList: React.FC<Props> = ({ coursesData, dateRange, ...props }) => {
  const [expanded, setExpanded] = useState<Record<string, boolean | undefined>>({});

  const totals = useMemo(() => {
    const sum = (coursesData ?? []).reduce(
      (acc, cur) => {
        return {
          hours: acc.hours + cur.hours,
          price: acc.price + cur.price,
          count: acc.count + cur.count,
          usefulCount: acc.usefulCount + cur.usefulCount,
        };
      },
      { price: 0, hours: 0, count: 0, usefulCount: 0 }
    );

    sum.hours = round(sum.hours, 2);
    sum.price = round(sum.price, 2);

    return sum;
  }, [coursesData]);

  const handleExpand = (userId: number) => {
    setExpanded((state) => ({ ...state, [userId]: !state[userId] }));
  };

  return (
    <DefaultTable {...props}>
      <TableHead>
        <TableRow>
          <TableCell>Mokytojų kursai</TableCell>
          <TableCell width="150px" align="center">
            Kiekis
          </TableCell>
          <TableCell width="150px" align="center">
            Kaina
          </TableCell>
          <TableCell width="150px" align="center">
            Trukmė
          </TableCell>
          <TableCell width="150px" align="center">
            Atnaujinta
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {coursesData?.map((teacher) => {
          return (
            <React.Fragment key={teacher.userId}>
              <TableRow hover sx={{ cursor: 'pointer' }} onClick={() => handleExpand(teacher.userId)}>
                <TableCell>
                  <Typography>{teacher.userDisplayName}</Typography>
                </TableCell>

                <TableCell align="center">
                  <Typography>
                    {teacher.count} ({teacher.usefulCount})
                  </Typography>
                </TableCell>

                <TableCell align="center">
                  <Typography>{teacher.price} €</Typography>
                </TableCell>

                <TableCell align="center">
                  <Typography>{teacher.hours} val.</Typography>
                </TableCell>

                <TableCell align="center">
                  <Typography>{toLocalDate(teacher.lastUpdate)}</Typography>
                </TableCell>
              </TableRow>
              {expanded[teacher.userId] && (
                <TableRow>
                  <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={5}>
                    <Box sx={{ margin: 2 }}>
                      <CoursesAdminList dateRange={dateRange} teacherId={teacher.userId} />
                    </Box>
                  </TableCell>
                </TableRow>
              )}
            </React.Fragment>
          );
        })}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell align="right">
            <Typography>Iš viso:</Typography>
          </TableCell>
          <TableCell align="center">
            <Typography>
              {totals.count} ({totals.usefulCount})
            </Typography>
          </TableCell>
          <TableCell align="center">
            <Typography>{totals.price} €</Typography>
          </TableCell>
          <TableCell align="center">
            <Typography>{totals.hours} val.</Typography>
          </TableCell>
        </TableRow>
      </TableFooter>
    </DefaultTable>
  );
};
