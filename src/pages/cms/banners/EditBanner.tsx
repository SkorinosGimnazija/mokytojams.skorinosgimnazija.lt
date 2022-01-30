import {
  Checkbox,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from '@mui/material';
import Grid from '@mui/material/Grid';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { SaveButton } from '../../../components/buttons/SaveButton';
import { ImageUploader } from '../../../components/modals/ImageUploader';
import { useImageInfo } from '../../../hooks/useImageInfo';
import { slugify } from '../../../lib/slugify';
import {
  useCreateBannerMutation,
  useEditBannerMutation,
  useGetBannerByIdQuery,
  useGetPublicLanguagesQuery,
} from '../../../services/api';
import { BannerDto } from '../../../services/generatedApi';

export default function EditBanner() {
  const navigate = useNavigate();
  const params = useParams();
  const bannerId = Number(params.id);
  const { getImageDimensions } = useImageInfo();

  const [imagePreview, setImagePreview] = useState<string>();
  const [skipBannerFetch, setSkipBannerFetch] = useState(false);

  const languageQuery = useGetPublicLanguagesQuery();
  const bannerQuery = useGetBannerByIdQuery({ id: bannerId }, { skip: !bannerId || skipBannerFetch });

  const [createBannerMutation, createBannerStatus] = useCreateBannerMutation();
  const [editBannerMutation, editBannerStatus] = useEditBannerMutation();

  const [formData, setFormData] = useState({
    id: bannerId,
    order: 0,
    title: '',
    url: '',
    languageId: 0,
    width: 0,
    height: 0,
    isPublished: true,
    picture: null as File | string | null,
  });

  useEffect(() => {
    return () => {
      if (imagePreview) URL.revokeObjectURL(imagePreview);
    };
  }, [imagePreview]);

  useEffect(() => {
    if (bannerId || !languageQuery.isSuccess || !languageQuery.data?.length) {
      return;
    }

    setFormData((x) => ({ ...x, languageId: languageQuery.data[0].id }));
  }, [languageQuery, bannerId]);

  useEffect(() => {
    if (!bannerQuery.isSuccess || bannerQuery.isFetching) {
      return;
    }

    setFormData((x) => ({
      ...x,
      order: bannerQuery.data.order,
      title: bannerQuery.data.title,
      url: bannerQuery.data.url,
      width: bannerQuery.data.width,
      height: bannerQuery.data.height,
      isPublished: bannerQuery.data.isPublished,
      languageId: bannerQuery.data.language.id,
      picture: bannerQuery.data.pictureUrl,
    }));
  }, [bannerQuery]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setSkipBannerFetch(true);

    const form = new FormData();

    for (const [key, value] of Object.entries(formData)) {
      form.set(key, value as any);
    }

    if (bannerId) {
      editBannerMutation({ body: form as any }).then((response: any) => {
        if (!response.error) {
          setSkipBannerFetch(false);
        }
      });
    } else {
      createBannerMutation({ body: form as any }).then((response: any) => {
        const bannerData = response.data as BannerDto;
        if (bannerData) {
          navigate(`../${bannerData.id}`);
        }
      });
    }
  };

  const handleChange = (
    e: SelectChangeEvent<any> | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((x) => ({ ...x, [e.target.name]: e.target.value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>, value: boolean) => {
    setFormData((x) => ({ ...x, [e.target.name]: value }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container gap={4} direction="column" flexWrap="nowrap">
        <Grid item>
          <Grid container gap={4}>
            <TextField
              id="title"
              name="title"
              label="Title"
              autoComplete="off"
              required
              value={formData.title}
              sx={{ flex: '1 1 300px' }}
              onChange={handleChange}
              onBlur={(e) => setFormData((x) => ({ ...x, slug: slugify(e.target.value) }))}
            />

            <TextField
              id="url"
              name="url"
              label="Url"
              autoComplete="off"
              required
              value={formData.url}
              sx={{ flex: '1 1 300px' }}
              onChange={handleChange}
            />
          </Grid>
        </Grid>

        <Grid container gap={4}>
          <TextField
            id="order"
            name="order"
            label="Order"
            type="number"
            required
            value={formData.order}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
          />

          <FormControl sx={{ width: 300 }}>
            <InputLabel id="languageId-label">Language</InputLabel>
            <Select
              id="languageId"
              name="languageId"
              labelId="languageId-label"
              label="Language"
              required
              value={formData.languageId || ''}
              onChange={handleChange}
            >
              {languageQuery.data?.map((x) => {
                return (
                  <MenuItem key={x.id} value={x.id}>
                    {x.name}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Grid>

        <Grid container gap={4} direction="column">
          <Grid item sx={{ width: '150px' }}>
            <ImageUploader
              name="Picture"
              newImages={typeof formData.picture !== 'string' ? formData.picture : null}
              oldImages={typeof formData.picture === 'string' ? formData.picture : null}
              onAdd={(files) => {
                getImageDimensions(files[0]).then((dimensions) => {
                  setFormData((x) => ({ ...x, picture: files[0], ...dimensions }));
                });
              }}
            />
          </Grid>

          <Grid item>
            <FormControlLabel
              label="Published"
              control={
                <Checkbox
                  name="isPublished"
                  checked={formData.isPublished}
                  onChange={handleCheckboxChange}
                />
              }
            />
          </Grid>

          <Grid item>
            <SaveButton
              disabled={
                createBannerStatus.isLoading || editBannerStatus.isLoading || bannerQuery.isFetching
              }
            />
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
}
