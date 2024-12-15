import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  useCreateObservationLessonMutation,
  useEditObservationLessonMutation,
  useGetObservationLessonByIdQuery,
} from '../../../services/api';
import { ObservationLessonDto, ObservationLessonEditDto } from '../../../services/generatedApi';
import { Grid, SelectChangeEvent, TextField } from '@mui/material';
import { itemSavedToast } from '../../../lib/toasts';
import { SaveButton } from '../../../components/buttons/SaveButton';

export default function EditObservationLesson() {
  const navigate = useNavigate();
  const params = useParams();
  const observationLessonId = Number(params.id);
  const observationLessonQuery = useGetObservationLessonByIdQuery(
    { id: observationLessonId },
    { skip: !observationLessonId }
  );
  const [createObservationLessonMutation, createObservationLessonStatus] =
    useCreateObservationLessonMutation();
  const [editObservationLessonMutation, editObservationLessonStatus] =
    useEditObservationLessonMutation();

  const [formData, setFormData] = useState<ObservationLessonEditDto>({
    id: observationLessonId,
    name: '',
  });

  useEffect(() => {
    if (!observationLessonQuery.isSuccess || observationLessonQuery.isFetching) {
      return;
    }

    setFormData((x) => ({
      ...x,
      name: observationLessonQuery.data.name,
    }));
  }, [observationLessonQuery]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (observationLessonId) {
      editObservationLessonMutation({ observationLessonEditDto: formData }).then((response: any) => {
        if (!response.error) {
          itemSavedToast();
          navigate('../lessons');
        }
      });
    } else {
      createObservationLessonMutation({ observationLessonCreateDto: formData }).then((response: any) => {
        const observationLessonData = response.data as ObservationLessonDto;
        if (observationLessonData) {
          itemSavedToast();
          navigate('../lessons');
        }
      });
    }
  };

  const handleChange = (
    e: SelectChangeEvent<any> | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((x) => ({ ...x, [e.target.name]: e.target.value }));
  };

  return (
    <form autoComplete="off" onSubmit={handleSubmit}>
      <Grid container gap={4} direction="column" flexWrap="nowrap">
        <TextField
          id="name"
          name="name"
          label="Pavadinimas"
          autoComplete="class-name"
          fullWidth
          required
          value={formData.name}
          onChange={handleChange}
        />
        <Grid item>
          <SaveButton
            disabled={
              createObservationLessonStatus.isLoading ||
              editObservationLessonStatus.isLoading ||
              observationLessonQuery.isFetching
            }
          />
        </Grid>
      </Grid>
    </form>
  );
}
