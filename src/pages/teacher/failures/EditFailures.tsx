import { Checkbox, Divider, FormControlLabel, SelectChangeEvent, TextField } from '@mui/material';
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
  usePatchTechJournalReportMutation,
} from '../../../services/api';
import { TechJournalReportDto } from '../../../services/generatedApi';

export default function EditFailures() {
  const auth = useAuth();
  const navigate = useNavigate();
  const params = useParams();
  const techId = Number(params.id);
  const [readOnly, setReadOnly] = useState(false);
  const [canPatch, setCanPatch] = useState(false);

  const techQuery = useGetTechJournalReportByIdQuery({ id: techId }, { skip: !techId });

  const [createTechMutation, createTechStatus] = useCreateTechJournalReportMutation();
  const [editTechMutation, editTechStatus] = useEditTechJournalReportMutation();
  const [patchTechMutation, patchTechStatus] = usePatchTechJournalReportMutation();

  const [formData, setFormData] = useState({
    id: techId,
    place: '',
    details: '',
    notes: '' as string | null | undefined,
    isFixed: false,
  });

  useEffect(() => {
    if (!techQuery.isSuccess || techQuery.isFetching) {
      return;
    }

    setReadOnly(!auth.isAdmin && techQuery.data.userId !== auth.userId);
    setCanPatch(Boolean(auth.isTech));

    setFormData((x) => ({
      ...x,
      place: techQuery.data.place,
      details: techQuery.data.details,
      notes: techQuery.data.notes,
      isFixed: techQuery.data.isFixed ?? false,
    }));
  }, [techQuery, auth.isAdmin, auth.isTech, auth.userId]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (techId) {
      if (canPatch) {
        patchTechMutation({ id: techId, techJournalReportPatchDto: formData }).then((response: any) => {
          if (!response.error) {
            itemSavedToast();
            navigate(`../`);
          }
        });
      } else {
        editTechMutation({ techJournalReportEditDto: formData }).then((response: any) => {
          if (!response.error) {
            itemSavedToast();
            navigate(`../`);
          }
        });
      }
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

        {canPatch && (
          <>
            <Divider />

            <Grid item>
              <Grid container gap={2}>
                <TextField
                  id="notes"
                  name="notes"
                  label="Pastabos"
                  fullWidth
                  value={formData.notes ?? ''}
                  onChange={handleChange}
                />

                <FormControlLabel
                  label="Gedimas sutvarkytas"
                  control={
                    <Checkbox
                      checked={formData.isFixed}
                      onChange={(e) => setFormData((x) => ({ ...x, isFixed: e.target.checked }))}
                    />
                  }
                />
              </Grid>
            </Grid>
          </>
        )}

        <Grid item>
          {(!readOnly || canPatch) && (
            <SaveButton
              disabled={
                createTechStatus.isLoading ||
                patchTechStatus.isLoading ||
                editTechStatus.isLoading ||
                techQuery.isFetching
              }
            />
          )}
        </Grid>
      </Grid>
    </form>
  );
}
