import {
  Checkbox,
  FormControl,
  FormControlLabel,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import Grid from '@mui/material/Grid';
import { Box } from '@mui/system';
import format from 'date-fns/format';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { SaveButton } from '../../../components/buttons/SaveButton';
import { itemSavedToast } from '../../../lib/toasts';
import {
  useCreateAccomplishmentMutation,
  useEditAccomplishmentMutation,
  useGetAccomplishmentByIdQuery,
  useGetAccomplishmentScalesQuery,
} from '../../../services/api';
import {
  AccomplishmentDto,
  AccomplishmentStudentDto,
  AccomplishmentTeacherDto,
} from '../../../services/generatedApi';
import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined';

export default function EditAccomplishment() {
  const navigate = useNavigate();
  const params = useParams();
  const accomplishmentId = Number(params.id);

  const scaleQuery = useGetAccomplishmentScalesQuery();
  const accomplishmentQuery = useGetAccomplishmentByIdQuery(
    { id: accomplishmentId },
    { skip: !accomplishmentId }
  );

  const [createAccomplishmentMutation, createAccomplishmentStatus] = useCreateAccomplishmentMutation();
  const [editAccomplishmentMutation, editAccomplishmentStatus] = useEditAccomplishmentMutation();

  const [studentsCount, setStudentsCount] = useState(0);
  const [teachersCount, setTeachersCount] = useState(0);

  const [formData, setFormData] = useState({
    id: accomplishmentId,
    name: '',
    achievement: '',
    date: '',
    scaleId: 0,
    students: [] as string[],
    additionalTeachers: [] as string[],
  });

  useEffect(() => {
    if (accomplishmentId || !scaleQuery.isSuccess || !scaleQuery.data?.length) {
      return;
    }

    setFormData((x) => ({ ...x, scaleId: scaleQuery.data[0].id }));
  }, [scaleQuery, accomplishmentId]);

  useEffect(() => {
    if (!accomplishmentQuery.isSuccess || accomplishmentQuery.isFetching) {
      return;
    }

    setTeachersCount(accomplishmentQuery.data.additionalTeachers.length);
    setStudentsCount(accomplishmentQuery.data.students.length);

    setFormData((x) => ({
      ...x,
      name: accomplishmentQuery.data.name,
      achievement: accomplishmentQuery.data.achievement,
      additionalTeachers: accomplishmentQuery.data.additionalTeachers.map((x) => x.name),
      students: accomplishmentQuery.data.students.map((x) => x.name),
      scaleId: accomplishmentQuery.data.scaleId,
      date: format(new Date(accomplishmentQuery.data.date), 'yyyy-MM-dd'),
    }));
  }, [accomplishmentQuery]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log(formData);

    if (accomplishmentId) {
      editAccomplishmentMutation({ accomplishmentEditDto: formData }).then((response: any) => {
        if (!response.error) {
          itemSavedToast();
          navigate(`../`);
        }
      });
    } else {
      createAccomplishmentMutation({ accomplishmentCreateDto: formData }).then((response: any) => {
        const AccomplishmentData = response.data as AccomplishmentDto;
        if (AccomplishmentData) {
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

  const studentInputFields = () => {
    const inputs: React.ReactNode[] = [];

    for (let i = 0; i < studentsCount; i++) {
      inputs.push(
        <TextField
          key={i}
          id={`student-${i}`}
          label="Vardas pavardė"
          variant="outlined"
          autoComplete="off"
          value={formData.students[i] ?? ''}
          onChange={(e) => {
            setFormData((x) => ({
              ...x,
              students: [...x.students.slice(0, i), e.target.value, ...x.students.slice(i + 1)],
            }));
          }}
        />
      );
    }

    return inputs;
  };

  const teacherInputFields = () => {
    const inputs: React.ReactNode[] = [];

    for (let i = 0; i < teachersCount; i++) {
      inputs.push(
        <TextField
          key={i}
          id={`teacher-${i}`}
          label="Vardas pavardė"
          variant="outlined"
          autoComplete="off"
          value={formData.additionalTeachers[i] ?? ''}
          onChange={(e) => {
            setFormData((x) => ({
              ...x,
              additionalTeachers: [
                ...x.additionalTeachers.slice(0, i),
                e.target.value,
                ...x.additionalTeachers.slice(i + 1),
              ],
            }));
          }}
        />
      );
    }

    return inputs;
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container gap={4} direction="column" flexWrap="nowrap">
        <TextField
          id="name"
          name="name"
          label="Renginio pavadinimas"
          autoComplete="off"
          fullWidth
          required
          value={formData.name}
          onChange={handleChange}
        />

        <TextField
          id="achievement"
          name="achievement"
          label="Laimėjimas (vieta, laipsnis, nominacija ar pan.)"
          autoComplete="off"
          fullWidth
          required
          value={formData.achievement}
          onChange={handleChange}
        />

        <Grid item>
          <Grid container gap={4}>
            <FormControl>
              <InputLabel id="scaleId-label">Renginio mastas</InputLabel>
              <Select
                id="scaleId"
                name="scaleId"
                labelId="scaleId-label"
                label="Renginio mastas"
                required
                value={formData.scaleId || ''}
                onChange={handleChange}
                sx={{ width: '200px' }}
              >
                {scaleQuery.data?.map((x) => {
                  return (
                    <MenuItem key={x.id} value={x.id}>
                      {x.name}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>

            <TextField
              id="date"
              name="date"
              label="Renginio data"
              type="date"
              required
              value={formData.date}
              onFocus={(e) => {
                // @ts-ignore
                e.target.showPicker?.();
              }}
              onChange={(e) => {
                handleChange(e);
                setFormData((x) => ({ ...x, date: e.target.value }));
              }}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
        </Grid>

        <Grid item>
          <Grid container gap={4} sx={{ alignItems: 'start' }}>
            <Paper
              variant="outlined"
              sx={{
                width: '35%',
                padding: '20px',
                backgroundColor: 'transparent',
                display: 'flex',
                flexDirection: 'column',
                gap: '20px',
              }}
            >
              <Grid container alignItems="center">
                <Grid item>
                  <Typography>Mokiniai</Typography>
                </Grid>
                <Grid item>
                  <Tooltip title="Pridėti mokinį">
                    <IconButton color="success" onClick={() => setStudentsCount((x) => x + 1)}>
                      <PersonAddAltOutlinedIcon />
                    </IconButton>
                  </Tooltip>
                </Grid>
              </Grid>
              {studentInputFields()}
            </Paper>

            <Paper
              variant="outlined"
              sx={{
                width: '35%',
                padding: '20px',
                backgroundColor: 'transparent',
                display: 'flex',
                flexDirection: 'column',
                gap: '20px',
              }}
            >
              <Grid container alignItems="center">
                <Grid item>
                  <Typography>Papildomai prisidėję mokytojai</Typography>
                </Grid>
                <Grid item>
                  <Tooltip title="Pridėti mokytoją">
                    <IconButton color="success" onClick={() => setTeachersCount((x) => x + 1)}>
                      <PersonAddAltOutlinedIcon />
                    </IconButton>
                  </Tooltip>
                </Grid>
              </Grid>
              {teacherInputFields()}
            </Paper>
          </Grid>
        </Grid>

        <Grid item>
          <SaveButton
            disabled={
              createAccomplishmentStatus.isLoading ||
              editAccomplishmentStatus.isLoading ||
              accomplishmentQuery.isFetching
            }
          />
        </Grid>
      </Grid>
    </form>
  );
}
