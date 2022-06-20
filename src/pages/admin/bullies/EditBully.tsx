import { TextField } from '@mui/material';
import Grid from '@mui/material/Grid';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toLocalDateTime } from '../../../lib/dateFormat';
import { useGetBullyReportByIdQuery } from '../../../services/api';

export default function EditBully() {
  const params = useParams();
  const bullyId = Number(params.id);

  const bullyQuery = useGetBullyReportByIdQuery({ id: bullyId });

  const [formData, setFormData] = useState({
    id: bullyId,
    victimInfo: '',
    bullyInfo: '',
    date: '',
    createdAt: '',
    location: '',
    details: null as string | undefined | null,
  });

  useEffect(() => {
    if (!bullyQuery.isSuccess || bullyQuery.isFetching) {
      return;
    }

    setFormData((x) => ({
      ...x,
      victimInfo: bullyQuery.data.victimInfo,
      bullyInfo: bullyQuery.data.bullyInfo,
      date: toLocalDateTime(bullyQuery.data.date).toString(),
      createdAt: toLocalDateTime(bullyQuery.data.createdAt).toString(),
      location: bullyQuery.data.location,
      details: bullyQuery.data.details,
    }));
  }, [bullyQuery]);

  return (
    <form autoComplete="off">
      <Grid container gap={4} direction="column" flexWrap="nowrap">
        <Grid container item direction="row" gap={4}>
          <TextField
            id="victimInfo"
            name="victimInfo"
            label="Auka"
            sx={{ flex: '1 1 300px' }}
            InputLabelProps={{ shrink: true }}
            value={formData.victimInfo}
            onChange={() => {}}
          />

          <TextField
            id="bullyInfo"
            name="bullyInfo"
            label="Skriaudėjas"
            sx={{ flex: '1 1 300px' }}
            InputLabelProps={{ shrink: true }}
            value={formData.bullyInfo}
            onChange={() => {}}
          />
        </Grid>

        <Grid container item direction="row" gap={4}>
          <TextField
            id="location"
            name="location"
            label="Įvykio vieta"
            sx={{ flex: '1 1 300px' }}
            InputLabelProps={{ shrink: true }}
            value={formData.location}
            onChange={() => {}}
          />

          <TextField
            id="date"
            name="date"
            label="Įvykio data"
            // type="datetime-local"
            InputLabelProps={{ shrink: true }}
            value={formData.date}
            onChange={() => {}}
          />

          <TextField
            id="createdAt"
            name="createdAt"
            label="Pranešimo data"
            // type="datetime-local"
            InputLabelProps={{ shrink: true }}
            value={formData.createdAt}
            onChange={() => {}}
          />
        </Grid>

        <TextField
          id="details"
          name="details"
          label="Plačiau"
          multiline
          rows={5}
          InputLabelProps={{ shrink: true }}
          value={formData.details ?? ''}
          onChange={() => {}}
        />
      </Grid>
    </form>
  );
}
