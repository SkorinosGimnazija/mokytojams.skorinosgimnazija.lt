import { Collapse, Typography } from '@mui/material';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Box } from '@mui/system';
import React, { useMemo, useState } from 'react';
import { CourseDto, TeacherDto } from '../../services/generatedApi';
import { DefaultTable, DefaultTableProps } from '../table/DefaultTable';
import { CoursesList } from './CoursesList';

interface Props extends DefaultTableProps {
  coursesData?: CourseDto[];
  teachersData?: TeacherDto[];
}

export const CoursesAdminList: React.FC<Props> = ({ coursesData, teachersData, ...props }) => {
  const [expand, setExpand] = useState<string[]>([]);

  const normalizedCourses = useMemo(() => {
    const normalized = {} as {
      [userName: string]:
        | {
            courses: CourseDto[];
            duration: number;
            lastModify: Date;
            lastModifyLocalized: string;
          }
        | undefined;
    };

    for (const course of coursesData ?? []) {
      const userName = course.user.userName;
      const modifiedDate = new Date(course.modifyDate);

      const saved = normalized[userName];

      if (saved) {
        saved.duration += course.durationInHours;
        saved.courses.push(course);
        if (modifiedDate > saved.lastModify) {
          saved.lastModify = modifiedDate;
          saved.lastModifyLocalized = modifiedDate.toLocaleDateString('lt');
        }
      } else {
        normalized[userName] = {
          courses: [course],
          duration: course.durationInHours,
          lastModify: modifiedDate,
          lastModifyLocalized: modifiedDate.toLocaleDateString('lt'),
        };
      }
    }

    return normalized;
  }, [coursesData]);

  const handleExpand = (userName: string) => {
    setExpand((state) =>
      state.includes(userName) ? state.filter((z) => z !== userName) : [...state, userName]
    );
  };

  return (
    <>
      <DefaultTable {...props}>
        <TableHead>
          <TableRow>
            <TableCell>Mokytojų kursai</TableCell>
            <TableCell width="100px" align="right">
              Kiekis
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
                <TableRow hover sx={{ cursor: 'pointer' }} onClick={() => handleExpand(teacher.userName)}>
                  <TableCell>
                    <Typography>{teacher.displayName}</Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography>{normalizedCourses[teacher.userName]?.courses.length ?? 0}</Typography>
                    <Typography variant="body2">
                      {normalizedCourses[teacher.userName]?.duration ?? 0} val.
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography>{normalizedCourses[teacher.userName]?.lastModifyLocalized}</Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={3}>
                    <Collapse in={expand.includes(teacher.userName)} timeout="auto" unmountOnExit>
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
