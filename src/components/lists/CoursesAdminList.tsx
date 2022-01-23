import { Collapse, Typography } from '@mui/material';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Box } from '@mui/system';
import { differenceInCalendarDays } from 'date-fns';
import groupBy from 'lodash/groupBy';
import React, { useMemo, useState } from 'react';
import { toLocalDate } from '../../lib/dateFormat';
import { CourseDto } from '../../services/generatedApi';
import { DefaultTable, DefaultTableProps } from '../table/DefaultTable';
import { CoursesList } from './CoursesList';

interface Props extends DefaultTableProps {
  coursesData?: CourseDto[];
}

export const CoursesAdminList: React.FC<Props> = ({ coursesData, ...props }) => {
  const [expanded, setExpanded] = useState<Record<string, boolean | undefined>>({});

  const normalizedCourses = useMemo(() => {
    const data = Object.values(groupBy(coursesData, (x) => x.user.id)).map((courses) => {
      const user = courses[0].user;

      const totals = courses.reduce(
        (acc, cur) => {
          const createDate = new Date(cur.createdAt);
          const startDate = new Date(cur.startDate);
          const endDate = new Date(cur.endDate);

          return {
            hours: acc.hours + cur.durationInHours,
            days: acc.days + differenceInCalendarDays(endDate, startDate) + 1,
            lastUpdate: createDate > acc.lastUpdate ? createDate : acc.lastUpdate,
          };
        },
        { hours: 0, days: 0, lastUpdate: new Date(0) }
      );

      return { displayName: user.displayName, userId: user.id, courses: courses, ...totals };
    });

    return data;
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
            <TableCell width="100px" align="center">
              Kiekis
            </TableCell>
            <TableCell width="100px" align="center">
              Dienos
            </TableCell>
            <TableCell width="100px" align="center">
              Valandos
            </TableCell>
            <TableCell width="200px" align="center">
              Atnaujinta
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {normalizedCourses?.map((teacher) => {
            return (
              <React.Fragment key={teacher.userId}>
                <TableRow hover sx={{ cursor: 'pointer' }} onClick={() => handleExpand(teacher.userId)}>
                  <TableCell>
                    <Typography>{teacher.displayName}</Typography>
                  </TableCell>

                  <TableCell align="center">
                    <Typography>{teacher.courses.length}</Typography>
                  </TableCell>

                  <TableCell align="center">
                    <Typography>{teacher.days} d.</Typography>
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
                        <CoursesList data={teacher.courses} preview />
                      </Box>
                    </Collapse>
                  </TableCell>
                </TableRow>
              </React.Fragment>
            );
          })}
        </TableBody>
      </DefaultTable>
    </>
  );
};
