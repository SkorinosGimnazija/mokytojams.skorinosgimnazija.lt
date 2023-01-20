import {
  Divider,
  FormControlLabel,
  Radio,
  RadioGroup,
  SelectChangeEvent,
  TextField,
} from '@mui/material';
import Grid from '@mui/material/Grid';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { SaveButton } from '../../../components/buttons/SaveButton';
import { useAuth } from '../../../hooks/useAuth';
import { itemSavedToast } from '../../../lib/toasts';
import {
  useCreateTechJournalReportMutation,
  useGetTechJournalReportByIdQuery,
  usePatchTechJournalReportMutation,
} from '../../../services/api';

export default function EditFailuresStatus() {
  const auth = useAuth();
  const navigate = useNavigate();
  const params = useParams();
  const techId = Number(params.id);

  const techQuery = useGetTechJournalReportByIdQuery({ id: techId }, { skip: !techId });

  const [createTechMutation, createTechStatus] = useCreateTechJournalReportMutation();
  const [patchTechMutation, patchTechStatus] = usePatchTechJournalReportMutation();

  const [formData, setFormData] = useState({
    id: techId,
    place: '',
    details: '',
    notes: '' as string | null | undefined,
    isFixed: 'null',
  });

  useEffect(() => {
    if (!techQuery.isSuccess || techQuery.isFetching) {
      return;
    }

    setFormData((x) => ({
      ...x,
      place: techQuery.data.place,
      details: techQuery.data.details,
      notes: techQuery.data.notes,
      isFixed: techQuery.data.isFixed == null ? 'null' : String(techQuery.data.isFixed),
    }));
  }, [techQuery, auth.isAdmin, auth.isTech, auth.userId]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const sendFormData = {
      id: formData.id,
      notes: formData.notes,
      isFixed: formData.isFixed === 'null' ? null : formData.isFixed === 'false' ? false : true,
    };

    patchTechMutation({ id: techId, techJournalReportPatchDto: sendFormData }).then((response: any) => {
      if (!response.error) {
        itemSavedToast();
        navigate(`../`);
      }
    });
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
          id="place"
          name="place"
          label="Vieta"
          fullWidth
          required
          value={formData.place}
          onChange={handleChange}
          disabled
        />

        <TextField
          id="details"
          name="details"
          label="Gedimo/defekto apibūdinimas"
          fullWidth
          required
          value={formData.details}
          onChange={handleChange}
          disabled
        />

        <Divider />

        <Grid item>
          <Grid container gap={3}>
            <RadioGroup name="isFixed" value={formData.isFixed} onChange={handleChange}>
              <FormControlLabel value="null" control={<Radio />} label="Gedimas tvarkomas" />
              <FormControlLabel value="true" control={<Radio />} label="Gedimas sutvarkytas" />
              <FormControlLabel value="false" control={<Radio />} label="Gedimas nesutvarkytas" />
            </RadioGroup>

            <TextField
              id="notes"
              name="notes"
              label="Pastabos"
              fullWidth
              value={formData.notes ?? ''}
              onChange={handleChange}
            />
          </Grid>
        </Grid>

        <Grid item>
          <SaveButton
            disabled={createTechStatus.isLoading || patchTechStatus.isLoading || techQuery.isFetching}
          />
        </Grid>
      </Grid>
    </form>
  );
}
