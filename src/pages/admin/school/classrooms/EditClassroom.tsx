import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  useCreateClassroomMutation,
  useEditClassroomMutation,
  useGetClassroomByIdQuery,
} from '../../../../services/api';
import { ClassroomCreateDto, ClassroomDto, ClassroomEditDto } from '../../../../services/generatedApi';
import { Grid, TextField, SelectChangeEvent } from '@mui/material';
import { itemSavedToast } from '../../../../lib/toasts';
import { SaveButton } from '../../../../components/buttons/SaveButton';

export default function EditClassroom() {
  const navigate = useNavigate();
  const params = useParams();
  const classroomId = Number(params.id);

  const classroomQuery = useGetClassroomByIdQuery({ id: classroomId }, { skip: !classroomId });

  const [createClassroomMutation, createClassroomStatus] = useCreateClassroomMutation();
  const [editClassroomMutation, editClassroomStatus] = useEditClassroomMutation();

  const [formData, setFormData] = useState<ClassroomEditDto>({
    id: classroomId,
    name: '',
    number: '' as any,
  });

  useEffect(() => {
    if (!classroomQuery.isSuccess || classroomQuery.isFetching) {
      return;
    }

    setFormData((x) => ({
      ...x,
      name: classroomQuery.data.name,
      number: classroomQuery.data.number,
    }));
  }, [classroomQuery]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (classroomId) {
      editClassroomMutation({ classroomEditDto: formData }).then((response: any) => {
        if (!response.error) {
          itemSavedToast();
          navigate(`../`);
        }
      });
    } else {
      createClassroomMutation({ classroomCreateDto: formData }).then((response: any) => {
        const classroomData = response.data as ClassroomDto;
        if (classroomData) {
          itemSavedToast();
          navigate(`../`);
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
          id="number"
          name="number"
          label="Numeris"
          autoComplete="class-num"
          type="number"
          fullWidth
          required
          value={formData.number}
          onChange={handleChange}
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          id="name"
          name="name"
          label="Klasė"
          autoComplete="class-name"
          fullWidth
          required
          value={formData.name}
          onChange={handleChange}
        />
        <Grid item>
          <SaveButton
            disabled={
              createClassroomStatus.isLoading ||
              editClassroomStatus.isLoading ||
              classroomQuery.isFetching
            }
          />
        </Grid>
      </Grid>
    </form>
  );
}
