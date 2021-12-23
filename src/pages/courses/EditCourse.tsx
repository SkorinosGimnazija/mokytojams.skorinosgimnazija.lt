import { SelectChangeEvent, TextField } from '@mui/material';
import Grid from '@mui/material/Grid';
import format from 'date-fns/format';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { SaveButton } from '../../components/buttons/SaveButton';
import { itemSavedToast } from '../../lib/toasts';
import {
  useCreateCourseMutation,
  useEditCourseMutation,
  useGetCourseByIdQuery,
} from '../../services/api';
import { CourseDto } from '../../services/generatedApi';

export default function EditCourse() {
  const navigate = useNavigate();
  const params = useParams();
  const courseId = Number(params.id);

  const endDateTouched = useRef(false);

  const courseQuery = useGetCourseByIdQuery({ id: courseId }, { skip: !courseId });

  const [createCourseMutation, createCourseStatus] = useCreateCourseMutation();
  const [editCourseMutation, editCourseStatus] = useEditCourseMutation();

  const [formData, setFormData] = useState({
    id: courseId,
    title: '',
    organizer: '',
    startDate: '',
    endDate: '',
    durationInHours: 0,
    certificateNr: null as string | undefined | null,
  });

  useEffect(() => {
    if (!courseQuery.isSuccess) {
      return;
    }

    setFormData((x) => ({
      ...x,
      title: courseQuery.data.title,
      organizer: courseQuery.data.organizer,
      startDate: format(new Date(courseQuery.data.startDate), 'yyyy-MM-dd'),
      endDate: format(new Date(courseQuery.data.endDate), 'yyyy-MM-dd'),
      durationInHours: courseQuery.data.durationInHours,
      certificateNr: courseQuery.data.certificateNr,
    }));
  }, [courseQuery, setFormData]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (courseId) {
      editCourseMutation({ courseEditDto: formData }).then((response: any) => {
        if (!response.error) {
          itemSavedToast();
          navigate(`/courses`);
        }
      });
    } else {
      createCourseMutation({ courseCreateDto: formData }).then((response: any) => {
        const courseData = response.data as CourseDto;
        if (courseData) {
          itemSavedToast();
          navigate(`/courses`);
        }
      });
    }
  };

  const handleChange = (
    e: SelectChangeEvent<any> | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((x) => ({ ...x, [e.target.name]: e.target.value }));
  };

  const handleNullableChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((x) => ({ ...x, [e.target.name]: e.target.value || null }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container gap={4} direction="column" flexWrap="nowrap">
        <TextField
          id="title"
          name="title"
          label="Kursų/Mokymų/Seminaro ir pan. pavadinimas"
          autoComplete="off"
          fullWidth
          required
          value={formData.title}
          onChange={handleChange}
        />

        <TextField
          id="organizer"
          name="organizer"
          label="Mokymus organizavo"
          fullWidth
          required
          value={formData.organizer}
          onChange={handleChange}
        />

        <TextField
          id="certificateNr"
          name="certificateNr"
          label="Gauto pažymėjimo numeris"
          autoComplete="off"
          fullWidth
          value={formData.certificateNr || ''}
          onChange={handleNullableChange}
        />

        <Grid item>
          <Grid container gap={4}>
            <TextField
              id="startDate"
              name="startDate"
              label="Nuo"
              type="date"
              required
              value={formData.startDate}
              onChange={(e) => {
                handleChange(e);

                if (
                  !endDateTouched.current ||
                  !formData.endDate ||
                  new Date(e.target.value) > new Date(formData.endDate)
                ) {
                  setFormData((x) => ({ ...x, endDate: e.target.value }));
                }
              }}
              InputLabelProps={{ shrink: true }}
            />

            <TextField
              id="endDate"
              name="endDate"
              label="Iki"
              type="date"
              required
              onFocus={() => (endDateTouched.current = true)}
              value={formData.endDate}
              onChange={(e) => {
                handleChange(e);

                if (!formData.startDate || new Date(formData.startDate) > new Date(e.target.value)) {
                  setFormData((x) => ({ ...x, startDate: e.target.value }));
                }
              }}
              InputLabelProps={{ shrink: true }}
            />

            <TextField
              id="durationInHours"
              name="durationInHours"
              label="Mokymų trukmė valandomis"
              type="number"
              required
              value={formData.durationInHours || ''}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
        </Grid>

        <Grid item>
          <SaveButton disabled={createCourseStatus.isLoading || editCourseStatus.isLoading} />
        </Grid>
      </Grid>
    </form>
  );
}
