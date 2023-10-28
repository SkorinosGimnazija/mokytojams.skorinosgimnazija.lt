import { Grid, SelectChangeEvent, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { SaveButton } from '../../../../components/buttons/SaveButton';
import { itemSavedToast } from '../../../../lib/toasts';
import {
  useCreateClasstimeMutation,
  useEditClasstimeMutation,
  useGetClasstimeByIdQuery,
} from '../../../../services/api';
import { ClasstimeDto, ClasstimeEditDto } from '../../../../services/generatedApi';

export default function EditClasstime() {
  const navigate = useNavigate();
  const params = useParams();
  const classtimeId = Number(params.id);

  const classtimeQuery = useGetClasstimeByIdQuery({ id: classtimeId }, { skip: !classtimeId });

  const [createClasstimeMutation, createClasstimeStatus] = useCreateClasstimeMutation();
  const [editClasstimeMutation, editClasstimeStatus] = useEditClasstimeMutation();

  const [formData, setFormData] = useState<ClasstimeEditDto>({
    id: classtimeId,
    startTime: '',
    endTime: '',
    endTimeShort: '',
    startTimeShort: '',
    number: '' as any,
  });

  useEffect(() => {
    if (!classtimeQuery.isSuccess || classtimeQuery.isFetching) {
      return;
    }

    setFormData((x) => ({
      ...x,
      startTime: classtimeQuery.data.startTime,
      endTime: classtimeQuery.data.endTime,
      number: classtimeQuery.data.number,
      startTimeShort: classtimeQuery.data.startTimeShort,
      endTimeShort: classtimeQuery.data.endTimeShort,
    }));
  }, [classtimeQuery]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (classtimeId) {
      editClasstimeMutation({ classtimeEditDto: formData }).then((response: any) => {
        if (!response.error) {
          itemSavedToast();
          navigate(`../`);
        }
      });
    } else {
      createClasstimeMutation({ classtimeCreateDto: formData }).then((response: any) => {
        const ClasstimeData = response.data as ClasstimeDto;
        if (ClasstimeData) {
          itemSavedToast();
          navigate(`../`);
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
          id="number"
          name="number"
          label="Numeris"
          autoComplete="classt-num"
          type="number"
          fullWidth
          required
          value={formData.number}
          onChange={handleChange}
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          id="startTime"
          name="startTime"
          label="Pradžia"
          autoComplete="classt-start"
          type="time"
          inputProps={{ step: 1 }}
          fullWidth
          required
          value={formData.startTime}
          onChange={handleChange}
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          id="endTime"
          name="endTime"
          label="Pabaiga"
          autoComplete="classt-end"
          type="time"
          inputProps={{ step: 1 }}
          fullWidth
          required
          value={formData.endTime}
          onChange={handleChange}
          InputLabelProps={{ shrink: true }}
        />

        <TextField
          id="startTimeShort"
          name="startTimeShort"
          label="Pradžia (sutrumpinta)"
          autoComplete="classt-startShort"
          type="time"
          inputProps={{ step: 1 }}
          fullWidth
          required
          value={formData.startTimeShort}
          onChange={handleChange}
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          id="endTimeShort"
          name="endTimeShort"
          label="Pabaiga (sutrumpinta)"
          autoComplete="classt-endShort"
          type="time"
          inputProps={{ step: 1 }}
          fullWidth
          required
          value={formData.endTimeShort}
          onChange={handleChange}
          InputLabelProps={{ shrink: true }}
        />

        <Grid item>
          <SaveButton
            disabled={
              createClasstimeStatus.isLoading ||
              editClasstimeStatus.isLoading ||
              classtimeQuery.isFetching
            }
          />
        </Grid>
      </Grid>
    </form>
  );
}
