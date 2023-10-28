import { Grid, SelectChangeEvent, TextField } from '@mui/material';
import format from 'date-fns/format';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { SaveButton } from '../../../../components/buttons/SaveButton';
import { itemSavedToast } from '../../../../lib/toasts';
import {
  useCreateClasstimeShortDayMutation,
  useEditClasstimeShortDayMutation,
  useGetClasstimeShortDayByIdQuery,
} from '../../../../services/api';
import { ClasstimeShortDayDto, ClasstimeShortDayEditDto } from '../../../../services/generatedApi';

export default function EditShortDay() {
  const navigate = useNavigate();
  const params = useParams();
  const classtimeDayId = Number(params.id);

  const classtimeDayQuery = useGetClasstimeShortDayByIdQuery(
    { id: classtimeDayId },
    { skip: !classtimeDayId }
  );

  const [createClasstimeMutation, createClasstimeStatus] = useCreateClasstimeShortDayMutation();
  const [editClasstimeMutation, editClasstimeStatus] = useEditClasstimeShortDayMutation();

  const [formData, setFormData] = useState<ClasstimeShortDayEditDto>({
    id: classtimeDayId,
    date: '',
  });

  useEffect(() => {
    if (!classtimeDayQuery.isSuccess || classtimeDayQuery.isFetching) {
      return;
    }

    setFormData((x) => ({
      ...x,
      date: format(new Date(classtimeDayQuery.data.date), 'yyyy-MM-dd'),
    }));
  }, [classtimeDayQuery]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (classtimeDayId) {
      editClasstimeMutation({ classtimeShortDayEditDto: formData }).then((response: any) => {
        if (!response.error) {
          itemSavedToast();
          navigate(`../shortdays`);
        }
      });
    } else {
      createClasstimeMutation({ classtimeShortDayCreateDto: formData }).then((response: any) => {
        const ClasstimeData = response.data as ClasstimeShortDayDto;
        if (ClasstimeData) {
          itemSavedToast();
          navigate(`../shortdays`);
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
          id="date"
          name="date"
          label="Data"
          type="date"
          required
          value={formData.date}
          onChange={handleChange}
          InputLabelProps={{ shrink: true }}
        />

        <Grid item>
          <SaveButton
            disabled={
              createClasstimeStatus.isLoading ||
              editClasstimeStatus.isLoading ||
              classtimeDayQuery.isFetching
            }
          />
        </Grid>
      </Grid>
    </form>
  );
}
