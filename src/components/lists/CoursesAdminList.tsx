import { Collapse, TableFooter, Typography } from '@mui/material';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Box } from '@mui/system';
import { differenceInCalendarDays } from 'date-fns';
import groupBy from 'lodash/groupBy';
import React, { useMemo, useState } from 'react';
import { toLocalDate } from '../../lib/dateFormat';
import { useGetTeacherCoursesByIdAndDateQuery } from '../../services/api';
import { CourseDto, CourseStatsDto } from '../../services/generatedApi';
import { DefaultTable, DefaultTableProps } from '../table/DefaultTable';
import { CoursesList } from './CoursesList';

interface Props extends DefaultTableProps {
  coursesData?: CourseStatsDto[];
}

export const CoursesAdminList: React.FC<Props> = ({ coursesData, ...props }) => {
  const [expanded, setExpanded] = useState<Record<string, boolean | undefined>>({});

  const totals = useMemo(() => {
    return (coursesData ?? []).reduce(
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
  }, [coursesData]);

  const handleExpand = (userId: number) => {
    setExpanded((state) => ({ ...state, [userId]: !state[userId] }));
  };

  return (
    <>
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
                <TableRow>
                  <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={5}>
                    <Collapse in={expanded[teacher.userId]} timeout="auto" unmountOnExit>
                      <Box sx={{ margin: 2 }}>
                        {/* <CoursesList data={teacher.courses} preview /> */}
                      </Box>
                    </Collapse>
                  </TableCell>
                </TableRow>
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
    </>
  );
};
