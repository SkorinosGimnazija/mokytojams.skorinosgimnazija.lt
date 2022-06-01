import { Checkbox, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { TimeLink } from '../../../components/links/TimeLink';
import { errorToast, itemSavedToast } from '../../../lib/toasts';
import {
  useCreateAppointmentUserMutation,
  useDeleteAppointmentUserMutation,
  useGetAppointmentUsersQuery,
  useGetTeachersQuery,
} from '../../../services/api';

export default function EditAppointmentUsers() {
  const params = useParams();
  const typeId = Number(params.id);
  const [selected, setSelected] = useState<{ [userName: string]: boolean }>({});
  const [loadingUser, setLoadingUser] = useState<string>();

  const usersQuery = useGetAppointmentUsersQuery({ typeId });
  const teachersQuery = useGetTeachersQuery();

  const [createUserMutation, createUserStatus] = useCreateAppointmentUserMutation();
  const [deleteUserMutation, deleteUserStatus] = useDeleteAppointmentUserMutation();

  useEffect(() => {
    if (!usersQuery.isSuccess || usersQuery.isFetching) {
      return;
    }

    setSelected(Object.fromEntries(usersQuery.data.map((x) => [x.userName, true])));
  }, [usersQuery]);

  const handleChange = (userName: string) => () => {
    setLoadingUser(userName);

    if (selected[userName]) {
      const id = usersQuery.data?.find((x) => x.userName === userName)?.id;
      if (!id) {
        errorToast('Unknown user id');
        return;
      }

      deleteUserMutation({ id }).then((x: any) => {
        if (!x.error) {
          itemSavedToast();
          setSelected((x) => ({ ...x, [userName]: false }));
        }
      });
    } else {
      createUserMutation({ appointmentUserCreateDto: { userName, typeId } }).then((x: any) => {
        if (!x.error) {
          itemSavedToast();
          setSelected((x) => ({ ...x, [userName]: true }));
        }
      });
    }
  };

  const isLoading = (userName: string) => {
    return loadingUser === userName && (createUserStatus.isLoading || deleteUserStatus.isLoading);
  };

  return (
    <List dense sx={{ width: '100%', maxWidth: 300 }}>
      {teachersQuery.data?.map((x) => {
        const labelId = `checkbox-list-secondary-label-${x.userName}`;
        return (
          <ListItem key={x.userName} disablePadding secondaryAction={<TimeLink url={`${x.userName}`} />}>
            <ListItemButton disabled={isLoading(x.userName)} onClick={handleChange(x.userName)} dense>
              <ListItemIcon>
                <Checkbox checked={selected[x.userName] ?? false} tabIndex={-1} disableRipple />
              </ListItemIcon>
              <ListItemText id={labelId} primary={x.displayName} />
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  );
}
