import { SelectChangeEvent, TextField } from '@mui/material';
import Grid from '@mui/material/Grid';
import format from 'date-fns/format';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { SaveButton } from '../../../components/buttons/SaveButton';
import { useAuth } from '../../../hooks/useAuth';
import { itemSavedToast } from '../../../lib/toasts';
import {
  useCreateBullyJournalReportMutation,
  useEditBullyJournalReportMutation,
  useGetBullyJournalReportByIdQuery,
} from '../../../services/api';
import { BullyReportDto } from '../../../services/generatedApi';

export default function EditBully() {
  const auth = useAuth();
  const navigate = useNavigate();
  const params = useParams();
  const bullyId = Number(params.id);
  const [readOnly, setReadOnly] = useState(false);

  const bullyQuery = useGetBullyJournalReportByIdQuery({ id: bullyId }, { skip: !bullyId });

  const [createBullyMutation, createBullyStatus] = useCreateBullyJournalReportMutation();
  const [editBullyMutation, editBullyStatus] = useEditBullyJournalReportMutation();

  const [formData, setFormData] = useState({
    id: bullyId,
    bullyInfo: '',
    victimInfo: '',
    details: '',
    actions: '',
    date: format(new Date(), 'yyyy-MM-dd'),
  });

  useEffect(() => {
    if (!bullyQuery.isSuccess || bullyQuery.isFetching) {
      return;
    }

    setReadOnly(!auth.isAdmin && bullyQuery.data.userId !== auth.userId);

    setFormData((x) => ({
      ...x,
      bullyInfo: bullyQuery.data.bullyInfo,
      victimInfo: bullyQuery.data.victimInfo,
      details: bullyQuery.data.details,
      actions: bullyQuery.data.actions,
      date: format(new Date(bullyQuery.data.date), 'yyyy-MM-dd'),
    }));
  }, [bullyQuery, auth.isAdmin, auth.userId]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (bullyId) {
      editBullyMutation({ bullyJournalReportEditDto: formData }).then((response: any) => {
        if (!response.error) {
          itemSavedToast();
          navigate(`../`);
        }
      });
    } else {
      createBullyMutation({ bullyJournalReportCreateDto: formData }).then((response: any) => {
        const bullyData = response.data as BullyReportDto;
        if (bullyData) {
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
          id="bullyInfo"
          name="bullyInfo"
          label="Smurtaujantis/besityčiojantis asmuo"
          fullWidth
          required
          value={formData.bullyInfo}
          onChange={handleChange}
          disabled={readOnly}
        />

        <TextField
          id="victimInfo"
          name="victimInfo"
          label="Smurtą/patyčias patiriantis asmuo"
          fullWidth
          required
          value={formData.victimInfo}
          onChange={handleChange}
          disabled={readOnly}
        />

        <TextField
          id="details"
          name="details"
          label="Patyčios"
          fullWidth
          required
          value={formData.details}
          onChange={handleChange}
          disabled={readOnly}
        />

        <TextField
          id="actions"
          name="actions"
          label="Taikytos priemonės (pagalba)"
          fullWidth
          required
          value={formData.actions}
          onChange={handleChange}
          disabled={readOnly}
        />

        <Grid item>
          <Grid container gap={4}>
            <TextField
              id="date"
              name="date"
              label="Data"
              type="date"
              required
              value={formData.date}
              onFocus={(e) => {
                // @ts-ignore
                e.target.showPicker?.();
              }}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
              disabled={readOnly}
            />
          </Grid>
        </Grid>

        <Grid item>
          {!readOnly && (
            <SaveButton
              disabled={
                createBullyStatus.isLoading || editBullyStatus.isLoading || bullyQuery.isFetching
              }
            />
          )}
        </Grid>
      </Grid>
    </form>
  );
}
