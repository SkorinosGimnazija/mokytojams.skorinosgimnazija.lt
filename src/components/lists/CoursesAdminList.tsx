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
import { CourseDto, TeacherDto } from '../../services/generatedApi';
import { DefaultTable, DefaultTableProps } from '../table/DefaultTable';
import { CoursesList } from './CoursesList';

interface Props extends DefaultTableProps {
  coursesData?: CourseDto[];
  teachersData?: TeacherDto[];
}

export const CoursesAdminList: React.FC<Props> = ({ coursesData, teachersData, ...props }) => {
  const [expanded, setExpanded] = useState<Record<string, boolean | undefined>>({});

  const normalizedCourses = useMemo(() => {
    const normalized: Record<
      string,
      {
        courses: CourseDto[];
        hours: number;
        days: number;
        lastUpdate: Date;
      }
    > = {};

    for (const [userName, courses] of Object.entries(groupBy(coursesData, (x) => x.user.userName))) {
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

      normalized[userName] = { courses, ...totals };
    }

    return normalized;
  }, [coursesData]);

  const handleExpand = (userName: string) => {
    setExpanded((state) => ({ ...state, [userName]: !state[userName] }));
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
          {teachersData?.map((teacher) => {
            return (
              <React.Fragment key={teacher.userName}>
                <TableRow
                  hover
                  sx={{ cursor: 'pointer' }}
                  onClick={() => handleExpand(teacher.userName)}
                >
                  <TableCell>
                    <Typography>{teacher.displayName}</Typography>
                  </TableCell>

                  <TableCell align="center">
                    <Typography>{normalizedCourses[teacher.userName]?.courses.length ?? 0}</Typography>
                  </TableCell>

                  <TableCell align="center">
                    <Typography>{normalizedCourses[teacher.userName]?.days ?? 0} d.</Typography>
                  </TableCell>

                  <TableCell align="center">
                    <Typography>{normalizedCourses[teacher.userName]?.hours ?? 0} val.</Typography>
                  </TableCell>

                  <TableCell align="center">
                    <Typography>
                      {toLocalDate(normalizedCourses[teacher.userName]?.lastUpdate)}
                    </Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={5}>
                    <Collapse in={expanded[teacher.userName]} timeout="auto" unmountOnExit>
                      <Box sx={{ margin: 2 }}>
                        <CoursesList data={normalizedCourses[teacher.userName]?.courses} preview />
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
