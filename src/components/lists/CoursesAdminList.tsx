import React from 'react';
import { useGetTeacherCoursesByIdAndDateQuery } from '../../services/api';
import { CoursesList } from './CoursesList';

interface Props {
  dateRange: { start: string; end: string };
  teacherId: number;
}

export const CoursesAdminList: React.FC<Props> = ({ dateRange, teacherId }) => {
  const coursesQuery = useGetTeacherCoursesByIdAndDateQuery({ ...dateRange, id: teacherId });

  return (
    <>
      <CoursesList data={coursesQuery.data} isLoading={coursesQuery.isLoading} preview />
    </>
  );
};
