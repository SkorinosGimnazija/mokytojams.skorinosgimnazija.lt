import {
  Autocomplete,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Grid,
  SelectChangeEvent,
  Stack,
  TextField,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { SaveButton } from '../../../components/buttons/SaveButton';
import {
  StudentObservationEditDto,
  useCreateStudentObservationMutation,
  useEditStudentObservationMutation,
  useGetObservationLessonsQuery,
  useGetObservationTargetsQuery,
  useGetObservationTypesQuery,
  useGetStudentObservationByIdQuery,
} from '../../../services/api';
import { useParamId } from '../../../hooks/useParamId';
import format from 'date-fns/format';
import { CircularSpinner } from '../../../components/loadingSpinners/CircularSpinner';
import { useResponse } from '../../../hooks/useResponse';

export default function EditObservation() {
  const { redirectOnSuccess } = useResponse();
  const paramId = useParamId();
  const observationQuery = useGetStudentObservationByIdQuery({ id: paramId }, { skip: !paramId });

  const [createObservationMutation, createObservationStatus] = useCreateStudentObservationMutation();
  const [editObservationMutation, editObservationStatus] = useEditStudentObservationMutation();

  const studentsQuery = useGetObservationTargetsQuery({ enabledOnly: true });
  const lessonsQuery = useGetObservationLessonsQuery();
  const typesQuery = useGetObservationTypesQuery();

  const [formData, setFormData] = useState<StudentObservationEditDto>({
    id: paramId,
    date: format(new Date(), 'yyyy-MM-dd'),
    note: null,
    lessonId: 0,
    targetId: 0,
    typeIds: [],
  });

  useEffect(() => {
    if (!observationQuery.isSuccess || observationQuery.isFetching) {
      return;
    }

    setFormData((x) => ({
      ...x,
      date: observationQuery.data.date,
      note: observationQuery.data.note,
      lessonId: observationQuery.data.lesson.id,
      targetId: observationQuery.data.target.id,
      typeIds: observationQuery.data.types.map((x) => x.id),
    }));
  }, [observationQuery]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (paramId) {
      editObservationMutation({ studentObservationEditDto: formData }).then(redirectOnSuccess);
    } else {
      createObservationMutation({ studentObservationCreateDto: formData }).then(redirectOnSuccess);
    }
  };

  const handleChange = (
    e: SelectChangeEvent<any> | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((x) => ({ ...x, [e.target.name]: e.target.value }));
  };

  const handleAutocompleteChange = (formName: keyof typeof formData, id: number) => {
    setFormData((x) => ({ ...x, [formName]: id }));
  };

  if (
    observationQuery.isLoading ||
    studentsQuery.isFetching ||
    lessonsQuery.isFetching ||
    typesQuery.isFetching
  ) {
    return <CircularSpinner />;
  }

  return (
    <form autoComplete="off" onSubmit={handleSubmit}>
      <Grid container gap={4} direction="column" flexWrap="nowrap">
        <Stack direction="row" gap={4} flexWrap="wrap">
          <Autocomplete
            options={studentsQuery.data ?? []}
            getOptionLabel={(x) => x.name}
            getOptionKey={(x) => x.id}
            loading={studentsQuery.isFetching}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            defaultValue={studentsQuery.data?.find((x) => x.id === observationQuery.data?.target?.id)}
            sx={{ width: 350 }}
            onChange={(_, value) => {
              handleAutocompleteChange('targetId', value?.id ?? 0);
            }}
            renderInput={(params) => <TextField {...params} required label="Mokinys" />}
          />

          <Autocomplete
            options={lessonsQuery.data ?? []}
            getOptionLabel={(x) => x.name}
            getOptionKey={(x) => x.id}
            loading={lessonsQuery.isFetching}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            defaultValue={lessonsQuery.data?.find((x) => x.id === observationQuery.data?.lesson?.id)}
            sx={{ width: 350 }}
            onChange={(_, value) => {
              handleAutocompleteChange('lessonId', value?.id ?? 0);
            }}
            renderInput={(params) => <TextField {...params} required label="Pamoka" />}
          />

          <TextField
            name="date"
            type="date"
            label="Data"
            required
            sx={{ width: 200 }}
            value={formData.date}
            onFocus={(e) => {
              // @ts-ignore
              e.target.showPicker?.();
            }}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
          />
        </Stack>

        <FormGroup>
          {typesQuery.data?.map((type) => {
            return (
              <FormControlLabel
                key={type.id}
                label={type.name}
                control={
                  <Checkbox
                    defaultChecked={observationQuery.data?.types.some((x) => x.id === type.id)}
                    onChange={(_, value) => {
                      setFormData((f) => ({
                        ...f,
                        typeIds: value
                          ? [...f.typeIds, type.id]
                          : f.typeIds.filter((x) => x !== type.id),
                      }));
                    }}
                  />
                }
              />
            );
          })}
        </FormGroup>

        <TextField
          id="note"
          name="note"
          label="Pastaba"
          fullWidth
          value={formData.note ?? ''}
          onChange={handleChange}
        />

        <Grid item>
          <SaveButton disabled={createObservationStatus.isLoading || editObservationStatus.isLoading} />
        </Grid>
      </Grid>
    </form>
  );
}
