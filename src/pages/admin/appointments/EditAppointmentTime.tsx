import { LoadingButton } from '@mui/lab';
import { Button, Chip, Grid, ListItem, TextField } from '@mui/material';
import { Box } from '@mui/system';
import { addMinutes } from 'date-fns';
import format from 'date-fns/format';
import groupBy from 'lodash/groupBy';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { toLocalDateTime } from '../../../lib/dateFormat';
import { itemSavedToast } from '../../../lib/toasts';
import {
  useCreateAppointmentDateMutation,
  useDeleteAppointmentDateMutation,
  useGetAppointmentDatesQuery,
} from '../../../services/api';

export default function EditAppointmentTime() {
  const params = useParams();
  const typeId = Number(params.id);
  const [newDate, setNewDate] = useState('');

  const timesQuery = useGetAppointmentDatesQuery({ typeId }, { skip: !typeId });
  const groupedTimes = Object.entries(
    groupBy(timesQuery.data, (x) => format(new Date(x.date), 'yyyy-MM-dd')) ?? []
  );

  const [createDateMutation, createDateStatus] = useCreateAppointmentDateMutation();
  const [deleteDateMutation, deleteDateStatus] = useDeleteAppointmentDateMutation();

  const handleDelete = (id: number) => () => {
    deleteDateMutation({ id }).then((x: any) => {
      if (!x.error) {
        itemSavedToast();
      }
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    createDateMutation({
      appointmentDateCreateDto: { date: new Date(newDate).toISOString(), typeId },
    }).then((x: any) => {
      if (!x.error) {
        itemSavedToast();
      }
    });
  };

  const addTime = (mins: number) => () => {
    setNewDate((x) => {
      if (!x) {
        return '';
      }

      return format(addMinutes(new Date(x), mins), "yyyy-MM-dd'T'HH:mm");
    });
  };

  return (
    <Box sx={{ marginTop: '10px' }}>
      <form autoComplete="off" onSubmit={handleSubmit}>
        <Grid container gap={4} alignItems="center">
          <TextField
            id="newDate"
            name="newDate"
            type="datetime-local"
            label="Date"
            required
            value={newDate}
            InputLabelProps={{ shrink: true }}
            onChange={(x) => setNewDate(x.target.value)}
          />
          <LoadingButton
            loading={createDateStatus.isLoading || timesQuery.isFetching}
            variant="contained"
            type="submit"
          >
            Add
          </LoadingButton>

          <Grid gap={1} display={'flex'}>
            <Button variant="outlined" type="button" onClick={addTime(15)}>
              +15
            </Button>
            <Button variant="outlined" type="button" onClick={addTime(30)}>
              +30
            </Button>
            <Button variant="outlined" type="button" onClick={addTime(45)}>
              +45
            </Button>
            <Button variant="outlined" type="button" onClick={addTime(60)}>
              +60
            </Button>
          </Grid>
        </Grid>
      </form>

      <Grid container sx={{ marginTop: '20px' }} gap={3}>
        {groupedTimes.map(([key, times]) => {
          return (
            <Grid key={key} item component="ul">
              {times.map((data) => {
                return (
                  <ListItem key={data.id}>
                    <Chip
                      disabled={deleteDateStatus.isLoading}
                      label={toLocalDateTime(data.date)}
                      onDelete={handleDelete(data.id)}
                    />
                  </ListItem>
                );
              })}
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}
