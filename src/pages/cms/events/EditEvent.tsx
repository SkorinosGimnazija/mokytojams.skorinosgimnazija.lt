import { Checkbox, FormControlLabel, SelectChangeEvent, TextField } from '@mui/material';
import Grid from '@mui/material/Grid';
import { addHours } from 'date-fns';
import format from 'date-fns/format';
import React, { useState } from 'react';
import { SaveButton } from '../../../components/buttons/SaveButton';
import { formatTime } from '../../../lib/dateFormat';
import { itemSavedToast } from '../../../lib/toasts';
import { useCreateEventMutation } from '../../../services/api';
import { EventDto } from '../../../services/generatedApi';

export default function EditEvent() {
  const [startDate, setStartDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endDate, setEndDate] = useState('');
  const [endTime, setEndTime] = useState('');

  const [createEventMutation, createEventStatus] = useCreateEventMutation();

  const [formData, setFormData] = useState({
    title: '',
    startDate: '',
    endDate: '',
    allDay: true,
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = {
      ...formData,
      startDate: new Date(startDate + (formData.allDay ? '' : 'T' + startTime)).toISOString(),
      endDate: new Date(endDate + (formData.allDay ? '' : 'T' + endTime)).toISOString(),
    };

    createEventMutation({ eventCreateDto: data }).then((response: any) => {
      const responseData = response.data as EventDto;
      if (responseData) {
        setFormData({ title: '', allDay: true, endDate: '', startDate: '' });
        itemSavedToast();
      }
    });
  };

  const handleChange = (
    e: SelectChangeEvent<any> | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((x) => ({ ...x, [e.target.name]: e.target.value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>, value: boolean) => {
    setFormData((x) => ({ ...x, [e.target.name]: value }));
  };

  const reformatStartEndTime = (forceStartTime?: string) => {
    const time = formatTime(forceStartTime ?? startTime);
    const [hours, mins] = time.split(':');
    const date = new Date().setHours(Number(hours), Number(mins), 0, 0);

    setStartTime(time);
    setEndTime(format(addHours(date, 1), 'HH:mm'));
  };

  return (
    <form autoComplete="off" onSubmit={handleSubmit}>
      <Grid container gap={4} direction="column" flexWrap="nowrap">
        <Grid container item direction="row" gap={4}>
          <TextField
            id="title"
            name="title"
            label="Title"
            required
            sx={{ flex: '1 1 300px' }}
            value={formData.title}
            onChange={handleChange}
            onPaste={(e) => {
              if (formData.title) {
                return;
              }

              e.preventDefault();

              const text = e.clipboardData
                .getData('text/plain')
                .trim()
                .replace(/\s+/g, ' ')
                .replace(/\sAts\..*$/g, '')
                .replace(/(?<!kl)\.$/g, '');
              const regex = /^(\d{1,2})(?:\.|:)(\d{2})(?:\s?val\.\s?–\s?)(.*)$/g;
              const match = regex.exec(text);

              if (!match) {
                setFormData((x) => ({ ...x, title: text }));
                return;
              }

              reformatStartEndTime(`${match[1]}:${match[2]}`);
              setFormData((x) => ({ ...x, allDay: false, title: match[3] }));
            }}
          />
        </Grid>

        <Grid container item direction="row" gap={4}>
          <FormControlLabel
            label="All day"
            control={
              <Checkbox name="allDay" checked={formData.allDay} onChange={handleCheckboxChange} />
            }
          />
        </Grid>

        <Grid container item direction="row" gap={4}>
          <TextField
            id="startDate"
            name="startDate"
            label="Start date"
            type="date"
            required
            value={startDate}
            onFocus={(e) => {
              // @ts-ignore
              e.target.showPicker?.();
            }}
            onChange={(e) => {
              setStartDate(e.target.value);
              setEndDate(e.target.value);
            }}
            InputLabelProps={{ shrink: true }}
          />

          {!formData.allDay && (
            <TextField
              id="startTime"
              name="startTime"
              label="Start time"
              required
              value={startTime}
              onFocus={(e) => e.target.select()}
              onBlur={() => reformatStartEndTime()}
              onChange={(e) => setStartTime(e.target.value)}
            />
          )}
        </Grid>

        <Grid container item direction="row" gap={4}>
          <TextField
            id="endDate"
            name="endDate"
            label="End date"
            type="date"
            required
            value={endDate}
            onFocus={(e) => {
              // @ts-ignore
              e.target.showPicker?.();
            }}
            onChange={(e) => {
              setEndDate(e.target.value);
            }}
            InputLabelProps={{ shrink: true }}
          />

          {!formData.allDay && (
            <TextField
              id="endTime"
              name="endTime"
              label="End time"
              required
              value={endTime}
              onFocus={(e) => e.target.select()}
              onBlur={(e) => setEndTime(formatTime(endTime))}
              onChange={(e) => setEndTime(e.target.value)}
            />
          )}
        </Grid>

        <Grid>
          <SaveButton disabled={createEventStatus.isLoading} />
        </Grid>
      </Grid>
    </form>
  );
}
