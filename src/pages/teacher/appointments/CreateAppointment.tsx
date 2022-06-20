import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import LoopIcon from '@mui/icons-material/Loop';
import LoadingButton from '@mui/lab/LoadingButton';
import { FormControl, Grid, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toLocalDateTime } from '../../../lib/dateFormat';
import { successToast } from '../../../lib/toasts';
import {
  useCreateAppointmentMutation,
  useGetAppointmentAvailableDatesQuery,
  useGetAppointmentAvailableHostsQuery,
} from '../../../services/api';
import { AppointmentDto } from '../../../services/generatedApi';

interface FormState {
  userName: string;
  dateId: number;
}

export default function CreateAppointment() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormState>({ userName: '', dateId: 0 });

  const hostsQuery = useGetAppointmentAvailableHostsQuery({ typeSlug: 'yearly' });
  const datesQuery = useGetAppointmentAvailableDatesQuery(
    { typeSlug: 'yearly', userName: formData.userName },
    { skip: !formData.userName }
  );

  const [createAppointmentMutation, createAppointmentStatus] = useCreateAppointmentMutation();

  const handleChange = (e: SelectChangeEvent<any>) => {
    setFormData((x) => ({ ...x, [e.target.name]: e.target.value }));
  };

  const datesList = () => {
    if (!datesQuery.data) {
      return null;
    }

    if (datesQuery.data.length === 0) {
      return <MenuItem>Laisvo laiko nėra</MenuItem>;
    }

    return datesQuery.data?.map((x) => {
      return (
        <MenuItem key={x.id} value={x.id}>
          {toLocalDateTime(x.date)}
        </MenuItem>
      );
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    createAppointmentMutation({ appointmentCreateDto: formData }).then((response: any) => {
      const appointmentData = response.data as AppointmentDto;
      if (appointmentData) {
        successToast('Registracija sėkminga');
        navigate('../');
      }
    });
  };

  return (
    <form autoComplete="off" onSubmit={handleSubmit}>
      <Grid container gap={2} direction="column" wrap="nowrap">
        <FormControl>
          <InputLabel id="userName-label">Vadovas</InputLabel>
          <Select
            id="userName"
            name="userName"
            labelId="userName-label"
            label="Vadovas"
            required
            IconComponent={hostsQuery.isFetching ? LoopIcon : ArrowDropDownIcon}
            sx={{ width: '300px' }}
            MenuProps={{ PaperProps: { sx: { maxHeight: 300 } } }}
            disabled={hostsQuery.isFetching}
            value={formData.userName}
            onChange={handleChange}
          >
            {hostsQuery.data?.map((x) => {
              return (
                <MenuItem key={x.userName} value={x.userName}>
                  {x.displayName}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>

        <FormControl>
          <InputLabel id="dateId-label">Laikas</InputLabel>
          <Select
            id="dateId"
            name="dateId"
            labelId="dateId-label"
            label="Laikas"
            required
            IconComponent={datesQuery.isFetching ? LoopIcon : ArrowDropDownIcon}
            disabled={datesQuery.isFetching || datesQuery.isUninitialized}
            sx={{ width: '300px' }}
            MenuProps={{ PaperProps: { sx: { maxHeight: 300 } } }}
            value={formData.dateId || ''}
            onChange={handleChange}
          >
            {datesList()}
          </Select>
        </FormControl>

        <Grid item>
          <LoadingButton loading={createAppointmentStatus.isLoading} variant="contained" type="submit">
            Registruotis
          </LoadingButton>
        </Grid>
      </Grid>
    </form>
  );
}
