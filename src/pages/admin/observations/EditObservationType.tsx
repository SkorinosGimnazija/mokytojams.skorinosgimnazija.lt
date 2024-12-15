import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  useCreateObservationTypeMutation,
  useEditObservationTypeMutation,
  useGetObservationTypeByIdQuery,
} from '../../../services/api';
import { ObservationTypeDto, ObservationTypeEditDto } from '../../../services/generatedApi';
import { Grid, SelectChangeEvent, TextField } from '@mui/material';
import { itemSavedToast } from '../../../lib/toasts';
import { SaveButton } from '../../../components/buttons/SaveButton';

export default function EditObservationType() {
  const navigate = useNavigate();
  const params = useParams();
  const observationTypeId = Number(params.id);
  const observationTypeQuery = useGetObservationTypeByIdQuery(
    { id: observationTypeId },
    { skip: !observationTypeId }
  );
  const [createObservationTypeMutation, createObservationTypeStatus] =
    useCreateObservationTypeMutation();
  const [editObservationTypeMutation, editObservationTypeStatus] = useEditObservationTypeMutation();

  const [formData, setFormData] = useState<ObservationTypeEditDto>({
    id: observationTypeId,
    name: '',
  });

  useEffect(() => {
    if (!observationTypeQuery.isSuccess || observationTypeQuery.isFetching) {
      return;
    }

    setFormData((x) => ({
      ...x,
      name: observationTypeQuery.data.name,
    }));
  }, [observationTypeQuery]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (observationTypeId) {
      editObservationTypeMutation({ observationTypeEditDto: formData }).then((response: any) => {
        if (!response.error) {
          itemSavedToast();
          navigate('../types');
        }
      });
    } else {
      createObservationTypeMutation({ observationTypeCreateDto: formData }).then((response: any) => {
        const observationTypeData = response.data as ObservationTypeDto;
        if (observationTypeData) {
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

  return (
    <form autoComplete="off" onSubmit={handleSubmit}>
      <Grid container gap={4} direction="column" flexWrap="nowrap">
        <TextField
          id="name"
          name="name"
          label="Pavadinimas"
          autoComplete="class-type-name"
          fullWidth
          required
          value={formData.name}
          onChange={handleChange}
        />
        <Grid item>
          <SaveButton
            disabled={
              createObservationTypeStatus.isLoading ||
              editObservationTypeStatus.isLoading ||
              observationTypeQuery.isFetching
            }
          />
        </Grid>
      </Grid>
    </form>
  );
}
