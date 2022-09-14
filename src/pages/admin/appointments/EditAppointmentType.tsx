import { Checkbox, FormControlLabel, InputAdornment, SelectChangeEvent, TextField } from '@mui/material';
import Grid from '@mui/material/Grid';
import format from 'date-fns/format';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { SaveButton } from '../../../components/buttons/SaveButton';
import { itemSavedToast } from '../../../lib/toasts';
import {
  useCreateAppointmentTypeMutation,
  useEditAppointmentTypeMutation,
  useGetAppointmentTypeByIdQuery,
} from '../../../services/api';
import { AppointmentTypeDto } from '../../../services/generatedApi';

export default function EditAppointmentType() {
  const navigate = useNavigate();
  const params = useParams();
  const typeId = Number(params.id);

  const typeQuery = useGetAppointmentTypeByIdQuery({ id: typeId }, { skip: !typeId });

  const [createTypeMutation, createTypeStatus] = useCreateAppointmentTypeMutation();
  const [editTypeMutation, editTypeStatus] = useEditAppointmentTypeMutation();

  const [formData, setFormData] = useState({
    id: typeId,
    name: '',
    slug: '',
    durationInMinutes: 0,
    invitePrincipal: false,
    isPublic: false,
    registrationEnd: '',
  });

  useEffect(() => {
    if (!typeQuery.isSuccess || typeQuery.isFetching) {
      return;
    }

    setFormData((x) => ({
      ...x,
      name: typeQuery.data.name,
      slug: typeQuery.data.slug,
      durationInMinutes: typeQuery.data.durationInMinutes,
      invitePrincipal: typeQuery.data.invitePrincipal,
      isPublic: typeQuery.data.isPublic,
      registrationEnd: format(new Date(typeQuery.data.registrationEnd), "yyyy-MM-dd'T'HH:mm"),
    }));
  }, [typeQuery]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = { ...formData, registrationEnd: new Date(formData.registrationEnd).toISOString() };

    if (typeId) {
      editTypeMutation({ appointmentTypeEditDto: data }).then((response: any) => {
        if (!response.error) {
          itemSavedToast();
          navigate('../types');
        }
      });
    } else {
      createTypeMutation({ appointmentTypeCreateDto: data }).then((response: any) => {
        const responseData = response.data as AppointmentTypeDto;
        if (responseData) {
          itemSavedToast();
          navigate('../types');
        }
      });
    }
  };

  const handleChange = (
    e: SelectChangeEvent<any> | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((x) => ({ ...x, [e.target.name]: e.target.value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>, value: boolean) => {
    setFormData((x) => ({ ...x, [e.target.name]: value }));
  };

  return (
    <form autoComplete="off" onSubmit={handleSubmit}>
      <Grid container gap={4} direction="column" flexWrap="nowrap">
        <Grid container item direction="row" gap={4}>
          <TextField
            id="name"
            name="name"
            label="Name"
            required
            sx={{ flex: '1 1 300px' }}
            value={formData.name}
            onChange={handleChange}
          />

          <TextField
            id="slug"
            name="slug"
            label="Slug"
            required
            sx={{ flex: '1 1 300px' }}
            value={formData.slug}
            onChange={handleChange}
          />
        </Grid>

        <Grid container item direction="row" gap={4}>
          <TextField
            id="registrationEnd"
            name="registrationEnd"
            type="datetime-local"
            label="Registration end date"
            required
            value={formData.registrationEnd}
            InputLabelProps={{ shrink: true }}
            onChange={handleChange}
          />

          <TextField
            id="durationInMinutes"
            name="durationInMinutes"
            label="Duration"
            type="number"
            required
            value={formData.durationInMinutes || ''}
            onChange={handleChange}
            InputProps={{ endAdornment: <InputAdornment position="end">min.</InputAdornment> }}
            inputProps={{ min: '0.1', step: '0.1' }}
          />

          <FormControlLabel
            label="Invite principal"
            control={
              <Checkbox
                name="invitePrincipal"
                checked={formData.invitePrincipal}
                onChange={handleCheckboxChange}
              />
            }
          />

          <FormControlLabel
            label="Is public"
            control={
              <Checkbox name="isPublic" checked={formData.isPublic} onChange={handleCheckboxChange} />
            }
          />
        </Grid>

        <Grid>
          <SaveButton
            disabled={createTypeStatus.isLoading || editTypeStatus.isLoading || typeQuery.isFetching}
          />
        </Grid>
      </Grid>
    </form>
  );
}
