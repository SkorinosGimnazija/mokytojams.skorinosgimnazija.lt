import Grid from '@mui/material/Grid';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { SaveButton } from '../../../components/buttons/SaveButton';
import { useAuth } from '../../../hooks/useAuth';
import { itemSavedToast } from '../../../lib/toasts';
import {
  useCreateTechJournalReportMutation,
  useCreateTimetableMutation,
  useEditTechJournalReportMutation,
  useEditTimetableMutation,
  useGetClassdaysQuery,
  useGetClassroomsQuery,
  useGetClasstimesQuery,
  useGetTechJournalReportByIdQuery,
  useGetTimetableByIdQuery,
} from '../../../services/api';
import { TechJournalReportDto, TimetableDto, TimetableEditDto } from '../../../services/generatedApi';
import {
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';

export default function EditTimetable() {
  const navigate = useNavigate();
  const params = useParams();
  const timetableId = Number(params.id);

  const timetableQuery = useGetTimetableByIdQuery({ id: timetableId }, { skip: !timetableId });

  const [createTimetableMutation, createTimetableStatus] = useCreateTimetableMutation();
  const [editTimetableMutation, editTimetableStatus] = useEditTimetableMutation();

  const roomsQuery = useGetClassroomsQuery();
  const daysQuery = useGetClassdaysQuery();
  const timeQuery = useGetClasstimesQuery();

  const [formData, setFormData] = useState<TimetableEditDto>({
    id: timetableId,
    dayId: '' as any,
    roomId: '' as any,
    timeId: '' as any,
    className: '',
  });

  useEffect(() => {
    if (!timetableQuery.isSuccess || timetableQuery.isFetching) {
      return;
    }

    setFormData((x) => ({
      ...x,
      className: timetableQuery.data.className,
      dayId: timetableQuery.data.day.id,
      roomId: timetableQuery.data.room.id,
      timeId: timetableQuery.data.time.id,
    }));
  }, [timetableQuery]);

  const getNextTimeId = (timeId: number) => {
    const times = timeQuery.data!;
    const nextIndex = times.findIndex((x) => x.id === timeId) + 1;

    if (nextIndex >= times.length) {
      return times[0].id;
    }

    return times[nextIndex].id;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (timetableId) {
      editTimetableMutation({ timetableEditDto: formData }).then((response: any) => {
        if (!response.error) {
          itemSavedToast();
          navigate(`../`);
        }
      });
    } else {
      createTimetableMutation({ timetableCreateDto: formData }).then((response: any) => {
        const dto = response.data as TimetableDto;
        if (dto) {
          itemSavedToast();
          setFormData((x) => ({ ...x, className: '', timeId: getNextTimeId(x.timeId) }));
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

  const handlePaste = (e: React.ClipboardEvent<HTMLDivElement>) => {
    e.preventDefault();

    const text = e.clipboardData
      .getData('text/plain')
      .replaceAll('/', ' / ')
      .replace(/\s+/g, ' ')
      .replace(/-{2,}/g, '----')
      .trim();

    setFormData((x) => ({ ...x, className: text }));
  };

  return (
    <form autoComplete="off" onSubmit={handleSubmit}>
      <Grid container gap={4} direction="column" flexWrap="nowrap">
        <TextField
          id="className"
          name="className"
          label="Pamoka"
          fullWidth
          required
          value={formData.className ?? ''}
          onChange={handleChange}
          onPaste={handlePaste}
        />

        <FormControl>
          <InputLabel id="roomId-label">Klasė</InputLabel>
          <Select
            id="roomId"
            name="roomId"
            labelId="roomId-label"
            label="Klasė"
            required
            value={formData.roomId}
            onChange={handleChange}
            sx={{ width: '300px' }}
          >
            {roomsQuery.data?.map((x) => {
              return (
                <MenuItem key={x.id} value={x.id}>
                  {x.name}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>

        <FormControl>
          <InputLabel id="dayId-label">Diena</InputLabel>
          <Select
            id="dayId"
            name="dayId"
            labelId="dayId-label"
            label="Diena"
            required
            value={formData.dayId}
            onChange={handleChange}
            sx={{ width: '300px' }}
          >
            {daysQuery.data?.map((x) => {
              return (
                <MenuItem key={x.id} value={x.id}>
                  {x.name}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>

        <FormControl>
          <InputLabel id="timeId-label">Laikas</InputLabel>
          <Select
            id="timeId"
            name="timeId"
            labelId="timeId-label"
            label="Laikas"
            required
            value={formData.timeId}
            onChange={handleChange}
            sx={{ width: '300px' }}
          >
            {timeQuery.data?.map((x) => {
              return (
                <MenuItem key={x.id} value={x.id}>
                  {x.number}. {x.startTime.slice(0, 5)}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>

        <Grid item>
          <SaveButton
            disabled={
              createTimetableStatus.isLoading ||
              editTimetableStatus.isLoading ||
              timetableQuery.isFetching ||
              timeQuery.isFetching ||
              daysQuery.isFetching ||
              roomsQuery.isFetching
            }
          />
        </Grid>
      </Grid>
    </form>
  );
}
