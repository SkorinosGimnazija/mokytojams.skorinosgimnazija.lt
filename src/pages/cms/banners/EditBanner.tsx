import {
  Autocomplete,
  Button,
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
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { SaveButton } from '../../../components/buttons/SaveButton';
import { slugify } from '../../../lib/slugify';
import {
  useCreateBannerMutation,
  useCreateMenuMutation,
  useEditBannerMutation,
  useEditMenuMutation,
  useGetBannerByIdQuery,
  useGetMenuByIdQuery,
  useGetMenuLocationsQuery,
  useGetPublicLanguagesQuery,
  useSearchMenusQuery,
  useSearchPostsQuery,
} from '../../../services/api';
import { BannerDto, MenuDto } from '../../../services/generatedApi';

export default function EditBanner() {
  const navigate = useNavigate();
  const params = useParams();
  const bannerId = Number(params.id);

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
    isPublished: true,
    picture: null as File | string | null,
  });

  useEffect(() => {
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  useEffect(() => {
    if (bannerId || !languageQuery.isSuccess || !languageQuery.data?.length) {
      return;
    }

    setFormData((x) => ({ ...x, languageId: languageQuery.data[0].id }));
  }, [languageQuery, bannerId, setFormData]);

  useEffect(() => {
    if (!bannerQuery.isSuccess) {
      return;
    }

    setFormData((x) => ({
      ...x,
      order: bannerQuery.data.order,
      title: bannerQuery.data.title,
      url: bannerQuery.data.url,
      isPublished: bannerQuery.data.isPublished,
      languageId: bannerQuery.data.language.id,
      picture: bannerQuery.data.pictureUrl,
    }));
  }, [bannerQuery, setFormData]);

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

  const handleNullableChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((x) => ({ ...x, [e.target.name]: e.target.value || null }));
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

        <Grid container gap={10}>
          <Grid item>
            <Grid container gap={4} direction="column">
              <label htmlFor="images">
                <input
                  id="images"
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={(e) => {
                    const image = e.target.files?.[0];
                    if (!image) {
                      return;
                    }

                    setImagePreview(URL.createObjectURL(image));
                    setFormData((x) => ({ ...x, picture: image }));
                  }}
                />
                <Button variant="outlined" component="span">
                  Picture
                </Button>
              </label>
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
                <SaveButton disabled={createBannerStatus.isLoading || editBannerStatus.isLoading} />
              </Grid>
            </Grid>
          </Grid>

          <Grid item>
            <Box marginLeft={4} maxWidth={400}>
              <img
                style={{ maxWidth: 400, maxHeight: 200 }}
                src={
                  imagePreview ??
                  (bannerQuery.data?.pictureUrl
                    ? `${process.env.REACT_APP_STATIC_URL}/${bannerQuery.data?.pictureUrl}`
                    : '')
                }
              />
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
}
