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
  useGetAccomplishmentAchievementsQuery,
  useGetAccomplishmentByIdQuery,
  useGetAccomplishmentClassroomsQuery,
  useGetAccomplishmentScalesQuery,
} from '../../../services/api';
import {
  AccomplishmentCreateStudentDto,
  AccomplishmentCreateTeacherDto,
  AccomplishmentDto,
  AccomplishmentStudentDto,
  AccomplishmentTeacherDto,
} from '../../../services/generatedApi';
import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined';

export default function EditAccomplishment() {
  const navigate = useNavigate();
  const params = useParams();
  const accomplishmentId = Number(params.id);

  const achievementQuery = useGetAccomplishmentAchievementsQuery();
  const classroomQuery = useGetAccomplishmentClassroomsQuery();
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
    date: '',
    scaleId: 0,
    students: [] as AccomplishmentCreateStudentDto[],
    additionalTeachers: [] as AccomplishmentCreateTeacherDto[],
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
      additionalTeachers: accomplishmentQuery.data.additionalTeachers.map((x) => ({ name: x.name })),
      students: accomplishmentQuery.data.students.map((x) => ({
        name: x.name,
        classroomId: x.classroom.id,
        achievementId: x.achievement.id,
      })),
      scaleId: accomplishmentQuery.data.scaleId,
      date: format(new Date(accomplishmentQuery.data.date), 'yyyy-MM-dd'),
    }));
  }, [accomplishmentQuery]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

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
        <Grid key={i} container gap={2} wrap="nowrap">
          <Grid item flexGrow="1">
            <TextField
              id={`student-${i}`}
              label="Vardas pavardė"
              variant="outlined"
              autoComplete="accomplishment-student"
              fullWidth
              value={formData.students[i]?.name ?? ''}
              onChange={(e) => {
                setFormData((x) => ({
                  ...x,
                  students: [
                    ...x.students.slice(0, i),
                    {
                      ...x.students[i],
                      name: e.target.value,
                    },
                    ...x.students.slice(i + 1),
                  ],
                }));
              }}
            />
          </Grid>
          <Grid item>
            <FormControl>
              <InputLabel id={`student-achievement-${i}-label`}>Laimėjimas</InputLabel>
              <Select
                id={`student-achievement-${i}`}
                labelId={`student-achievement-${i}-label`}
                label="Laimėjimas"
                value={formData.students[i]?.achievementId || ''}
                onChange={(e) => {
                  setFormData((x) => ({
                    ...x,
                    students: [
                      ...x.students.slice(0, i),
                      {
                        ...x.students[i],
                        achievementId: Number(e.target.value),
                      },
                      ...x.students.slice(i + 1),
                    ],
                  }));
                }}
                sx={{ width: '200px' }}
              >
                {achievementQuery.data?.map((x) => {
                  return (
                    <MenuItem key={x.id} value={x.id}>
                      {x.name}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Grid>
          <Grid item>
            <FormControl>
              <InputLabel id={`student-classroom-${i}-label`}>Klasė</InputLabel>
              <Select
                id={`student-classroom-${i}`}
                labelId={`student-classroom-${i}-label`}
                label="Klasė"
                value={formData.students[i]?.classroomId || ''}
                onChange={(e) => {
                  setFormData((x) => ({
                    ...x,
                    students: [
                      ...x.students.slice(0, i),
                      {
                        ...x.students[i],
                        classroomId: Number(e.target.value),
                      },
                      ...x.students.slice(i + 1),
                    ],
                  }));
                }}
                sx={{ width: '200px' }}
              >
                {classroomQuery.data?.map((x) => {
                  return (
                    <MenuItem key={x.id} value={x.id}>
                      {x.name}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
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
          autoComplete="accomplishment-teacher"
          value={formData.additionalTeachers[i]?.name ?? ''}
          onChange={(e) => {
            setFormData((x) => ({
              ...x,
              additionalTeachers: [
                ...x.additionalTeachers.slice(0, i),
                { name: e.target.value },
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
    <form autoComplete="off" onSubmit={handleSubmit}>
      <Grid container gap={4} direction="column" flexWrap="nowrap">
        <TextField
          id="name"
          name="name"
          label="Renginio pavadinimas"
          autoComplete="accomplishment-event-name"
          fullWidth
          required
          value={formData.name}
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
                width: '65%',
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
                    <IconButton
                      color="success"
                      onClick={() => {
                        setFormData((x) => ({
                          ...x,
                          students: [
                            ...x.students,
                            {
                              name: '',
                              classroomId: classroomQuery.data?.[0]?.id ?? 1,
                              achievementId: achievementQuery.data?.[0]?.id ?? 1,
                            },
                          ],
                        }));
                        setStudentsCount((x) => x + 1);
                      }}
                    >
                      <PersonAddAltOutlinedIcon />
                    </IconButton>
                  </Tooltip>
                </Grid>
              </Grid>
              {studentInputFields()}
            </Paper>
          </Grid>
        </Grid>

        <Grid item>
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
                  <IconButton
                    color="success"
                    onClick={() => {
                      setFormData((x) => ({
                        ...x,
                        additionalTeachers: [...x.additionalTeachers, { name: '' }],
                      }));
                      setTeachersCount((x) => x + 1);
                    }}
                  >
                    <PersonAddAltOutlinedIcon />
                  </IconButton>
                </Tooltip>
              </Grid>
            </Grid>
            {teacherInputFields()}
          </Paper>
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
