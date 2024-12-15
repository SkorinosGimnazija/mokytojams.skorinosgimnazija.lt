import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  useCreateObservationTargetMutation,
  useEditObservationTargetMutation,
  useGetObservationTargetByIdQuery,
} from '../../../services/api';
import { ObservationTargetDto, ObservationTargetEditDto } from '../../../services/generatedApi';
import { Checkbox, FormControlLabel, Grid, SelectChangeEvent, TextField } from '@mui/material';
import { itemSavedToast } from '../../../lib/toasts';
import { SaveButton } from '../../../components/buttons/SaveButton';

export default function EditObservationTarget() {
  const navigate = useNavigate();
  const params = useParams();
  const observationTargetId = Number(params.id);
  const observationTargetQuery = useGetObservationTargetByIdQuery(
    { id: observationTargetId },
    { skip: !observationTargetId }
  );
  const [createObservationTargetMutation, createObservationTargetStatus] =
    useCreateObservationTargetMutation();
  const [editObservationTargetMutation, editObservationTargetStatus] =
    useEditObservationTargetMutation();

  const [formData, setFormData] = useState<ObservationTargetEditDto>({
    id: observationTargetId,
    enabled: true,
    name: '',
  });

  useEffect(() => {
    if (!observationTargetQuery.isSuccess || observationTargetQuery.isFetching) {
      return;
    }

    setFormData((x) => ({
      ...x,
      enabled: observationTargetQuery.data.enabled,
      name: observationTargetQuery.data.name,
    }));
  }, [observationTargetQuery]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (observationTargetId) {
      editObservationTargetMutation({ observationTargetEditDto: formData }).then((response: any) => {
        if (!response.error) {
          itemSavedToast();
          navigate('..', { relative: 'path' });
        }
      });
    } else {
      createObservationTargetMutation({ observationTargetCreateDto: formData }).then((response: any) => {
        const observationTargetData = response.data as ObservationTargetDto;
        if (observationTargetData) {
          itemSavedToast();
          navigate('..', { relative: 'path' });
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
        <TextField
          id="name"
          name="name"
          label="Vardas"
          autoComplete="observe-target-name"
          fullWidth
          required
          value={formData.name}
          onChange={handleChange}
        />

        <FormControlLabel
          label="Aktyvus"
          control={
            <Checkbox name="enabled" checked={formData.enabled} onChange={handleCheckboxChange} />
          }
        />

        <Grid item>
          <SaveButton
            disabled={
              createObservationTargetStatus.isLoading ||
              editObservationTargetStatus.isLoading ||
              observationTargetQuery.isFetching
            }
          />
        </Grid>
      </Grid>
    </form>
  );
}
