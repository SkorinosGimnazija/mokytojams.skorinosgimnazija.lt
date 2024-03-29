import { SelectChangeEvent, TextField } from '@mui/material';
import Grid from '@mui/material/Grid';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { SaveButton } from '../../../components/buttons/SaveButton';
import { useAuth } from '../../../hooks/useAuth';
import { itemSavedToast } from '../../../lib/toasts';
import {
  useCreateTechJournalReportMutation,
  useEditTechJournalReportMutation,
  useGetTechJournalReportByIdQuery,
} from '../../../services/api';
import { TechJournalReportDto } from '../../../services/generatedApi';

export default function EditFailures() {
  const auth = useAuth();
  const navigate = useNavigate();
  const params = useParams();
  const techId = Number(params.id);
  const [readOnly, setReadOnly] = useState(false);

  const techQuery = useGetTechJournalReportByIdQuery({ id: techId }, { skip: !techId });

  const [createTechMutation, createTechStatus] = useCreateTechJournalReportMutation();
  const [editTechMutation, editTechStatus] = useEditTechJournalReportMutation();

  const [formData, setFormData] = useState({
    id: techId,
    place: '',
    details: '',
  });

  useEffect(() => {
    if (!techQuery.isSuccess || techQuery.isFetching) {
      return;
    }

    setReadOnly(!auth.isAdmin && techQuery.data.userId !== auth.userId);

    setFormData((x) => ({
      ...x,
      place: techQuery.data.place,
      details: techQuery.data.details,
    }));
  }, [techQuery, auth.isAdmin, auth.isTech, auth.userId]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (techId) {
      editTechMutation({ techJournalReportEditDto: formData }).then((response: any) => {
        if (!response.error) {
          itemSavedToast();
          navigate(`../`);
        }
      });
    } else {
      createTechMutation({ techJournalReportCreateDto: formData }).then((response: any) => {
        const techData = response.data as TechJournalReportDto;
        if (techData) {
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
          id="place"
          name="place"
          label="Vieta"
          fullWidth
          required
          value={formData.place}
          onChange={handleChange}
          disabled={readOnly}
        />

        <TextField
          id="details"
          name="details"
          label="Gedimo/defekto apibūdinimas"
          fullWidth
          required
          value={formData.details}
          onChange={handleChange}
          disabled={readOnly}
        />

        <Grid item>
          {!readOnly && (
            <SaveButton
              disabled={createTechStatus.isLoading || editTechStatus.isLoading || techQuery.isFetching}
            />
          )}
        </Grid>
      </Grid>
    </form>
  );
}
