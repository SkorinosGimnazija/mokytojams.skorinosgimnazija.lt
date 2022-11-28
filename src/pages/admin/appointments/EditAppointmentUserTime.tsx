import {
  Checkbox,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toLocalDateTime } from '../../../lib/dateFormat';
import { errorToast, itemSavedToast } from '../../../lib/toasts';
import {
  useCreateAppointmentReservedDateMutation,
  useDeleteAppointmentReservedDateMutation,
  useGetAppointmentDatesQuery,
  useGetAppointmentReservedDatesQuery,
  useGetAppointmentTypeByIdQuery,
  useGetTeachersQuery,
} from '../../../services/api';

export default function EditAppointmentUserTime() {
  const params = useParams();
  const typeId = Number(params.id);
  const userName = params.username!;

  const [loadingTime, setLoadingTime] = useState(-1);
  const [currentTeacher, setCurrentTeacher] = useState('');
  const [currentType, setCurrentType] = useState('');
  const [selected, setSelected] = useState<{ [dateId: number]: boolean }>({});

  const teachersQuery = useGetTeachersQuery();
  const datesQuery = useGetAppointmentDatesQuery({ typeId });
  const typeQuery = useGetAppointmentTypeByIdQuery({ id: typeId });
  const reservedDatesQuery = useGetAppointmentReservedDatesQuery({ userName });

  const [createTimeMutation, createTimeStatus] = useCreateAppointmentReservedDateMutation();
  const [deleteTimeMutation, deleteTimeStatus] = useDeleteAppointmentReservedDateMutation();

  useEffect(() => {
    if (!reservedDatesQuery.isSuccess || reservedDatesQuery.isFetching) {
      return;
    }

    setSelected(Object.fromEntries(reservedDatesQuery.data.map((x) => [x.dateId, true])));
  }, [reservedDatesQuery]);

  useEffect(() => {
    if (!typeQuery.isSuccess || typeQuery.isFetching) {
      return;
    }

    setCurrentType(typeQuery.data.name);
  }, [typeQuery, userName]);

  useEffect(() => {
    if (!teachersQuery.isSuccess || teachersQuery.isFetching) {
      return;
    }

    setCurrentTeacher(teachersQuery.data.find((x) => x.userName === userName)!.displayName);
  }, [teachersQuery, userName]);

  const handleChange = (dateId: number) => () => {
    setLoadingTime(dateId);

    if (selected[dateId]) {
      const id = reservedDatesQuery.data?.find((x) => x.dateId === dateId)?.id;
      if (!id) {
        errorToast('Unknown time id');
        return;
      }

      deleteTimeMutation({ id }).then((x: any) => {
        if (!x.error) {
          itemSavedToast();
          setSelected((x) => ({ ...x, [dateId]: false }));
        }
      });
    } else {
      createTimeMutation({
        appointmentReservedDateCreateDto: { dateId, userName },
      }).then((x: any) => {
        if (!x.error) {
          itemSavedToast();
          setSelected((x) => ({ ...x, [userName]: true }));
        }
      });
    }
  };

  return (
    <>
      <Typography>
        Pažymėkite kada {currentTeacher} <b>negalės</b> dalyvauti {currentType} konsultacijose
      </Typography>
      <List dense sx={{ width: '100%', maxWidth: 300 }}>
        {datesQuery.data?.map((x) => {
          const labelId = `checkbox-list-secondary-label-${x.id}`;
          return (
            <ListItem key={x.id} disablePadding>
              <ListItemButton
                disabled={
                  loadingTime === x.id && (createTimeStatus.isLoading || deleteTimeStatus.isLoading)
                }
                onClick={handleChange(x.id)}
                dense
              >
                <ListItemIcon>
                  <Checkbox checked={selected[x.id] ?? false} tabIndex={-1} disableRipple />
                </ListItemIcon>
                <ListItemText id={labelId} primary={toLocalDateTime(x.date)} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </>
  );
}
