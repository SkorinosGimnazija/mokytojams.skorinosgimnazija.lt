import React, { useEffect, useState, useRef } from 'react';
import { useDeleteTimetableDayMutation, useGetClassdaysQuery } from '../../../services/api';
import { TimetableDeleteDayDto } from '../../../services/generatedApi';
import Grid from '@mui/material/Grid';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { SaveButton } from '../../../components/buttons/SaveButton';
import { itemSavedToast } from '../../../lib/toasts';
import { useNavigate } from 'react-router-dom';

export default function DeleteTimetableDay() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<number[]>([]);
  const daysQuery = useGetClassdaysQuery();
  const [deleteTimetableDayMutation, deleteTimetableDayStatus] = useDeleteTimetableDayMutation();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    deleteTimetableDayMutation({ timetableDeleteDayDto: { dayIds: formData } }).then((response: any) => {
      if (!response.error) {
        itemSavedToast();
        navigate(`../`);
      }
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setFormData((x) => [...x, Number(e.target.value)]);
    } else {
      setFormData((x) => x.filter((z) => z !== Number(e.target.value)));
    }
  };

  return (
    <form autoComplete="off" onSubmit={handleSubmit}>
      <Grid item mb={2}>
        Ištrinti tvarkaraštį
      </Grid>
      <Grid container gap={4} direction="column" flexWrap="nowrap">
        <FormGroup>
          {daysQuery.data?.map((x) => {
            return (
              <FormControlLabel
                key={x.id}
                value={x.id}
                label={x.name}
                control={<Checkbox onChange={handleChange} checked={formData.some((z) => z === x.id)} />}
              />
            );
          })}
        </FormGroup>

        <Grid item>
          <SaveButton disabled={daysQuery.isFetching || deleteTimetableDayStatus.isLoading} />
        </Grid>
      </Grid>
    </form>
  );
}
