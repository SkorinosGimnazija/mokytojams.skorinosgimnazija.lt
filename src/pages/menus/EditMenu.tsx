import {
  Autocomplete,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import Grid from '@mui/material/Grid';
import { Box } from '@mui/system';
import format from 'date-fns/format';
import { Field, Form, Formik } from 'formik';
import React, { useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { SaveButton } from '../../components/buttons/SaveButton';
import { TextEditor } from '../../components/editor/TextEditor';
import { CircularSpinner } from '../../components/loadingSpinners/CircularSpinner';
import { FileUploader } from '../../components/modals/FileUploader';
import { ImageUploader } from '../../components/modals/ImageUploader';
import { slugify } from '../../lib/slugify';
import {
  useCreateMenuMutation,
  useEditMenuMutation,
  useGetMenuByIdQuery,
  useGetMenuLocationsQuery,
  useGetPublicLanguagesQuery,
  useSearchMenusQuery,
  useSearchPostsQuery,
} from '../../services/api';
import { MenuDto } from '../../services/generatedApi';

export default function EditMenu() {
  const params = useParams();
  const navigate = useNavigate();

  const menuId = Number(params.id);

  const [postSearch, setPostSearch] = useState('');
  const [menuSearch, setMenuSearch] = useState('');

  const [skipMenu, setSkipMenu] = useState(false);
  const languageQuery = useGetPublicLanguagesQuery();
  const locationsQuery = useGetMenuLocationsQuery();
  const menuQuery = useGetMenuByIdQuery({ id: menuId }, { skip: !menuId || skipMenu });
  const postSearchQuery = useSearchPostsQuery({ text: postSearch }, { skip: !postSearch });
  const menuSearchQuery = useSearchMenusQuery({ text: menuSearch }, { skip: !menuSearch });

  const [createMenuMutation] = useCreateMenuMutation();
  const [editMenuMutation] = useEditMenuMutation();

  if (menuQuery.isFetching || languageQuery.isFetching || locationsQuery.isFetching) {
    return <CircularSpinner />;
  }

  return (
    <Formik
      enableReinitialize={false}
      initialValues={{
        id: menuId,
        order: menuQuery.data?.order ?? 1,
        title: menuQuery.data?.title ?? '',
        isPublished: menuQuery.data?.isPublished ?? true,
        slug: menuQuery.data?.slug ?? '',
        languageId: languageQuery.data
          ? menuQuery.data?.language?.id ?? languageQuery.data[0].id
          : 0,
        menuLocationId: locationsQuery.data
          ? menuQuery.data?.menuLocation?.id ?? locationsQuery.data[0].id
          : 0,
        linkedPostId: menuQuery.data?.linkedPost?.id ?? 0,
        parentMenuId: menuQuery.data?.parentMenuId ?? 0,
      }}
      onSubmit={(values, { setSubmitting }) => {
        if (menuId) {
          setSkipMenu(true);

          editMenuMutation({ menuEditDto: { ...values } }).then((response: any) => {
            setSubmitting(false);
            if (!response.error) {
              setSkipMenu(false);
            }
          });
        } else {
          createMenuMutation({ menuCreateDto: { ...values } }).then((response: any) => {
            setSubmitting(false);
            const menuData = response.data as MenuDto;
            if (menuData) {
              navigate(`/menus/edit/${menuData.id}`);
            }
          });
        }
      }}
    >
      {({ isSubmitting, setFieldValue, values, handleChange }) => (
        <Form>
          <Grid container gap={4} direction="column" flexWrap="nowrap">
            <Grid item>
              <Grid container gap={4}>
                <Field
                  id="title"
                  label="Title"
                  autoComplete="off"
                  required
                  value={values.title}
                  sx={{ flex: '1 1 300px' }}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    handleChange(e);
                    setFieldValue('slug', slugify(e.target.value));
                  }}
                  component={TextField}
                />

                <Field
                  id="slug"
                  label="Slug"
                  autoComplete="off"
                  required
                  value={values.slug}
                  sx={{ flex: '1 1 300px' }}
                  onChange={handleChange}
                  component={TextField}
                />
              </Grid>
            </Grid>

            <Grid container gap={4}>
              <FormControl sx={{ width: 300 }}>
                <InputLabel id="menuLocationId-label">Location</InputLabel>
                <Select
                  required
                  labelId="menuLocationId-label"
                  id="menuLocationId"
                  name="menuLocationId"
                  value={values.menuLocationId}
                  label="Location"
                  onChange={handleChange}
                >
                  {locationsQuery.data?.map((x) => {
                    return (
                      <MenuItem key={x.id} value={x.id}>
                        {x.name}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>

              <Field
                id="order"
                label="Order"
                required
                value={values.order}
                type="number"
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
                component={TextField}
              />

              <FormControl sx={{ width: 300 }}>
                <InputLabel id="languageId-label">Language</InputLabel>
                <Select
                  required
                  labelId="languageId-label"
                  id="languageId"
                  name="languageId"
                  value={values.languageId}
                  label="Language"
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

            <Grid item>
              <Grid container gap={4}>
                <Autocomplete
                  id="linked-post"
                  onChange={(_, x) => {
                    setFieldValue('linkedPostId', x?.id ?? 0);
                  }}
                  isOptionEqualToValue={(option, value) => option.id === value.id}
                  loading={postSearchQuery.isFetching}
                  inputValue={postSearch}
                  onInputChange={(_, newInputValue) => {
                    setPostSearch(newInputValue);
                  }}
                  options={
                    postSearchQuery.data?.items.map((x) => ({ title: x.title, id: x.id })) ?? []
                  }
                  renderOption={(props, option) => (
                    <Box component="li" {...props} key={option.id}>
                      {option.title}
                    </Box>
                  )}
                  getOptionLabel={(option) => option.title}
                  renderInput={(params) => <TextField {...params} label="Search post" />}
                  sx={{ width: '300px' }}
                />
                <Field
                  id="linkedPostId"
                  label="Post id"
                  value={values.linkedPostId}
                  type="number"
                  onChange={handleChange}
                  InputLabelProps={{ shrink: true }}
                  component={TextField}
                />
              </Grid>
            </Grid>

            <Grid item>
              <Grid container gap={4}>
                <Autocomplete
                  id="parent-menu"
                  onChange={(_, x) => {
                    setFieldValue('parentMenuId', x?.id ?? 0);
                  }}
                  isOptionEqualToValue={(option, value) => option.id === value.id}
                  loading={menuSearchQuery.isFetching}
                  inputValue={menuSearch}
                  onInputChange={(_, newInputValue) => {
                    setMenuSearch(newInputValue);
                  }}
                  options={
                    menuSearchQuery.data?.items.map((x) => ({ title: x.title, id: x.id })) ?? []
                  }
                  renderOption={(props, option) => (
                    <Box component="li" {...props} key={option.id}>
                      {option.title}
                    </Box>
                  )}
                  getOptionLabel={(option) => option.title}
                  renderInput={(params) => <TextField {...params} label="Search menu" />}
                  sx={{ width: '300px' }}
                />
                <Field
                  id="parentMenuId"
                  label="Parent menu id"
                  value={values.parentMenuId}
                  type="number"
                  onChange={handleChange}
                  InputLabelProps={{ shrink: true }}
                  component={TextField}
                />
              </Grid>
            </Grid>

            <Grid item>
              <FormControlLabel
                control={
                  <Checkbox
                    name="isPublished"
                    checked={Boolean(values.isPublished)}
                    onChange={handleChange}
                  />
                }
                label="Published"
              />
            </Grid>
            <Grid item>
              <SaveButton disabled={isSubmitting} />
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  );
}
