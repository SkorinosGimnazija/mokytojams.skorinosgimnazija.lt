import { Grid, SelectChangeEvent, TextField } from '@mui/material';
import format from 'date-fns/format';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { SaveButton } from '../../../../components/buttons/SaveButton';
import { itemSavedToast } from '../../../../lib/toasts';
import {
  useCreateAnnouncementMutation,
  useEditAnnouncementMutation,
  useGetAnnouncementByIdQuery,
} from '../../../../services/api';
import { AnnouncementEditDto, ClassroomDto } from '../../../../services/generatedApi';

export default function EditAnnouncement() {
  const navigate = useNavigate();
  const params = useParams();
  const announcementId = Number(params.id);

  const announcementQuery = useGetAnnouncementByIdQuery(
    { id: announcementId },
    { skip: !announcementId }
  );

  const [createAnnouncementMutation, createAnnouncementStatus] = useCreateAnnouncementMutation();
  const [editAnnouncementMutation, editAnnouncementStatus] = useEditAnnouncementMutation();

  const [formData, setFormData] = useState<AnnouncementEditDto>({
    id: announcementId,
    title: '',
    startTime: format(new Date(), 'yyyy-MM-dd'),
    endTime: format(new Date(), 'yyyy-MM-dd'),
  });

  useEffect(() => {
    if (!announcementQuery.isSuccess || announcementQuery.isFetching) {
      return;
    }

    setFormData((x) => ({
      ...x,
      title: announcementQuery.data.title,
      startTime: announcementQuery.data.startTime,
      endTime: announcementQuery.data.endTime,
    }));
  }, [announcementQuery]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (announcementId) {
      editAnnouncementMutation({ announcementEditDto: formData }).then((response: any) => {
        if (!response.error) {
          itemSavedToast();
          navigate(`../`);
        }
      });
    } else {
      createAnnouncementMutation({ announcementCreateDto: formData }).then((response: any) => {
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
          id="title"
          name="title"
          label="Skelbimas"
          autoComplete="title-ann"
          fullWidth
          required
          value={formData.title}
          onChange={handleChange}
        />
        <Grid item>
          <Grid container gap={4}>
            <TextField
              id="startTime"
              name="startTime"
              label="Nuo"
              type="date"
              required
              value={formData.startTime}
              onChange={(e) => {
                handleChange(e);

                if (!formData.endTime || new Date(e.target.value) > new Date(formData.endTime)) {
                  setFormData((x) => ({ ...x, endTime: e.target.value }));
                }
              }}
              InputLabelProps={{ shrink: true }}
            />

            <TextField
              id="endTime"
              name="endTime"
              label="Iki"
              type="date"
              required
              value={formData.endTime}
              onChange={(e) => {
                handleChange(e);

                if (!formData.startTime || new Date(formData.startTime) > new Date(e.target.value)) {
                  setFormData((x) => ({ ...x, startTime: e.target.value }));
                }
              }}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
        </Grid>

        <Grid item>
          <SaveButton
            disabled={
              createAnnouncementStatus.isLoading ||
              editAnnouncementStatus.isLoading ||
              announcementQuery.isFetching
            }
          />
        </Grid>
      </Grid>
    </form>
  );
}
