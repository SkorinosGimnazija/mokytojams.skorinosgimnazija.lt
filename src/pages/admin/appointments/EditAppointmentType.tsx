import { Checkbox, FormControlLabel, InputAdornment, SelectChangeEvent, TextField } from '@mui/material';
import Grid from '@mui/material/Grid';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { SaveButton } from '../../../components/buttons/SaveButton';
import { toLocalDateTime } from '../../../lib/dateFormat';
import { itemSavedToast } from '../../../lib/toasts';
import format from 'date-fns/format';
import {
  useCreateAppointmentTypeMutation,
  useEditAppointmentTypeMutation,
  useGetAppointmentTypeByIdQuery,
  useGetBullyReportByIdQuery,
} from '../../../services/api';
import {
  AppointmentTypeCreateDto,
  AppointmentTypeDto,
  AppointmentTypeEditDto,
} from '../../../services/generatedApi';

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
    start: '',
    end: '',
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
      start: format(new Date(typeQuery.data.start), "yyyy-MM-dd'T'HH:mm"),
      end: format(new Date(typeQuery.data.end), "yyyy-MM-dd'T'HH:mm"),
      registrationEnd: format(new Date(typeQuery.data.registrationEnd), "yyyy-MM-dd'T'HH:mm"),
    }));
  }, [typeQuery]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (typeId) {
      editTypeMutation({ appointmentTypeEditDto: formData }).then((response: any) => {
        if (!response.error) {
          itemSavedToast();
          // navigate(`../`);
        }
      });
    } else {
      createTypeMutation({ appointmentTypeCreateDto: formData }).then((response: any) => {
        const courseData = response.data as AppointmentTypeDto;
        if (courseData) {
          itemSavedToast();
          // navigate(`../`);
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
    <form onSubmit={handleSubmit}>
      <Grid container gap={4} direction="column" flexWrap="nowrap">
        <Grid container item direction="row" gap={4}>
          <TextField
            id="name"
            name="name"
            label="Name"
            required
            sx={{ flex: '1 1 300px' }}
            InputLabelProps={{ shrink: true }}
            value={formData.name}
            onChange={handleChange}
          />

          <TextField
            id="slug"
            name="slug"
            label="Slug"
            required
            sx={{ flex: '1 1 300px' }}
            InputLabelProps={{ shrink: true }}
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
            InputLabelProps={{ shrink: true }}
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

        <TextField
          id="start"
          name="start"
          type="datetime-local"
          label="Start date"
          required
          value={formData.start}
          InputLabelProps={{ shrink: true }}
          onChange={handleChange}
        />

        <TextField
          id="end"
          name="end"
          type="datetime-local"
          label="End date"
          required
          value={formData.end}
          InputLabelProps={{ shrink: true }}
          onChange={handleChange}
        />

        <Grid>
          <SaveButton
            disabled={createTypeStatus.isLoading || editTypeStatus.isLoading || typeQuery.isFetching}
          />
        </Grid>
      </Grid>
    </form>
  );
}
