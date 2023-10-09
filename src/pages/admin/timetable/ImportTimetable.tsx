import { Grid, TextField } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SaveButton } from '../../../components/buttons/SaveButton';
import { errorToast, itemSavedToast } from '../../../lib/toasts';
import {
  useGetClassdaysQuery,
  useGetClassroomsQuery,
  useGetClasstimesQuery,
  useImportTimetableMutation,
} from '../../../services/api';
import { TimetableCreateDto } from '../../../services/generatedApi';

export default function ImportTimetable() {
  const navigate = useNavigate();

  const [timetable, setTimetable] = useState('');
  const [formData, setFormData] = useState<TimetableCreateDto[]>([]);

  const roomsQuery = useGetClassroomsQuery();
  const daysQuery = useGetClassdaysQuery();
  const timeQuery = useGetClasstimesQuery();

  const [imporTimetableMutation, importTimetableStatus] = useImportTimetableMutation();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    imporTimetableMutation({ timetableImportDto: { timetableList: formData } }).then((response: any) => {
      if (!response.error) {
        itemSavedToast();
        navigate(`../`);
      }
    });
  };

  const getDayId = (body: string) => {
    if (!daysQuery.data) {
      return -1;
    }

    const foundDays: number[] = [];

    for (const day of daysQuery.data) {
      if (body.match(new RegExp(day.name, 'i'))) {
        foundDays.push(day.id);
      }
    }

    if (foundDays.length !== 1) {
      return -1;
    }

    return foundDays[0];
  };

  const getTimeId = (timeName: string) => {
    if (!timeQuery.data) {
      return -1;
    }

    const timeNumber = parseInt(timeName);

    for (const time of timeQuery.data) {
      if (time.number === timeNumber) {
        return time.id;
      }
    }

    return -1;
  };

  const getRoomId = (roomName: string) => {
    if (!roomsQuery.data) {
      return -1;
    }

    const normalizeName = (name: string) => {
      return name
        .replaceAll(/kl(?:\.|asė)/gi, '')
        .replaceAll(/\(\d+?\)/gi, '')
        .replaceAll(/\s/g, '')
        .toUpperCase();
    };

    const roomNameNormalized = normalizeName(roomName);

    for (const room of roomsQuery.data) {
      if (roomNameNormalized === normalizeName(room.name)) {
        return room.id;
      }
    }

    return -1;
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLDivElement>) => {
    e.preventDefault();

    const html = e.clipboardData.getData('text/html');
    if (!html) {
      return;
    }

    try {
      const parser = new DOMParser();
      const doc = parser.parseFromString(html.replaceAll(/\n|\r/g, ' '), 'text/html');
      const body = doc.body;

      if (body.innerHTML.includes('rowspan') || body.innerHTML.includes('colspan')) {
        errorToast('rowspan');
        return;
      }

      const tableRows = body.querySelectorAll('tr');
      if (tableRows.length < 2) {
        return;
      }

      const dayId = getDayId(body.innerText);
      const [header, ...rows] = Array.from(tableRows);
      const [_, ...rooms] = Array.from(header.querySelectorAll('td'));

      const data: TimetableCreateDto[] = [];

      for (const row of rows) {
        const tds = row.querySelectorAll('td');
        const [classNr, ...classes] = Array.from(tds);

        for (let i = 0; i < classes.length; i++) {
          const td = classes[i];

          const className = td.innerText
            .replaceAll('/', ' / ')
            .replace(/\s+/g, ' ')
            .replace(/-{2,}/g, '----')
            .trim();

          if (!className) {
            continue;
          }

          data.push({
            className,
            dayId,
            timeId: getTimeId(classNr.innerText),
            roomId: getRoomId(rooms[i].innerText),
          });
        }
      }

      setTimetable(body.innerText);
      setFormData(data);
    } catch {
      errorToast('Importavimo klaida');
    }
  };

  return (
    <form autoComplete="off" onSubmit={handleSubmit}>
      <Grid container gap={2} direction="column" wrap="nowrap">
        <TextField
          id="import"
          label="Tvarkaraštis"
          autoComplete="off"
          multiline
          rows={3}
          value={timetable}
          onChange={(e) => e.preventDefault()}
          disabled={daysQuery.isFetching || roomsQuery.isFetching || timeQuery.isFetching}
          onPaste={handlePaste}
        />

        <Grid item>
          <SaveButton
            disabled={
              importTimetableStatus.isLoading ||
              timeQuery.isFetching ||
              daysQuery.isFetching ||
              roomsQuery.isFetching
            }
          />
        </Grid>
      </Grid>

      <div>
        <pre>{JSON.stringify(formData, null, 2)}</pre>
      </div>
    </form>
  );
}
