import {
  Autocomplete,
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
import { SaveButton } from '../../components/buttons/SaveButton';
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
  const navigate = useNavigate();
  const params = useParams();
  const menuId = Number(params.id);

  const [postSearch, setPostSearch] = useState('');
  const [menuSearch, setMenuSearch] = useState('');

  const [skipMenuFetch, setSkipMenuFetch] = useState(false);

  const languageQuery = useGetPublicLanguagesQuery();
  const locationsQuery = useGetMenuLocationsQuery();
  const menuQuery = useGetMenuByIdQuery({ id: menuId }, { skip: !menuId || skipMenuFetch });
  const postSearchQuery = useSearchPostsQuery({ text: postSearch || '*' });
  const menuSearchQuery = useSearchMenusQuery({ text: menuSearch || '*' });

  const [createMenuMutation, createMenuStatus] = useCreateMenuMutation();
  const [editMenuMutation, editMenuStatus] = useEditMenuMutation();

  const [formData, setFormData] = useState({
    id: menuId,
    order: 0,
    title: '',
    slug: '',
    isPublished: true,
    languageId: 0,
    menuLocationId: 0,
    url: null as string | undefined | null,
    linkedPostId: null as number | undefined | null,
    parentMenuId: null as number | undefined | null,
  });

  useEffect(() => {
    if (menuId || !languageQuery.isSuccess || !languageQuery.data?.length) {
      return;
    }

    setFormData((x) => ({ ...x, languageId: languageQuery.data[0].id }));
  }, [languageQuery, menuId, setFormData]);

  useEffect(() => {
    if (menuId || !locationsQuery.isSuccess || !locationsQuery.data?.length) {
      return;
    }

    setFormData((x) => ({ ...x, menuLocationId: locationsQuery.data[0].id }));
  }, [locationsQuery, menuId, setFormData]);

  useEffect(() => {
    if (!menuQuery.isSuccess) {
      return;
    }

    setFormData((x) => ({
      ...x,
      order: menuQuery.data.order,
      title: menuQuery.data.title,
      slug: menuQuery.data.slug,
      isPublished: menuQuery.data.isPublished,
      languageId: menuQuery.data.language.id,
      menuLocationId: menuQuery.data.menuLocation.id,
      linkedPostId: menuQuery.data.linkedPost?.id,
      parentMenuId: menuQuery.data.parentMenuId,
      url: menuQuery.data.url,
    }));
  }, [menuQuery, setFormData]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setSkipMenuFetch(true);

    if (menuId) {
      editMenuMutation({ menuEditDto: formData }).then((response: any) => {
        if (!response.error) {
          setSkipMenuFetch(false);
        }
      });
    } else {
      createMenuMutation({ menuCreateDto: formData }).then((response: any) => {
        const menuData = response.data as MenuDto;
        if (menuData) {
          navigate(`/menus/edit/${menuData.id}`);
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
              id="slug"
              name="slug"
              label="Slug"
              autoComplete="off"
              required
              value={formData.slug}
              sx={{ flex: '1 1 300px' }}
              onChange={handleChange}
            />
          </Grid>
        </Grid>

        <Grid container gap={4}>
          <FormControl sx={{ width: 300 }}>
            <InputLabel id="menuLocationId-label">Location</InputLabel>
            <Select
              id="menuLocationId"
              name="menuLocationId"
              labelId="menuLocationId-label"
              label="Location"
              required
              value={formData.menuLocationId || ''}
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

        <Grid item>
          <Grid container gap={4}>
            <Autocomplete
              id="linked-post"
              onChange={(_, post) => {
                setFormData((x) => ({ ...x, linkedPostId: post?.id }));
              }}
              isOptionEqualToValue={(option, value) => option.id === value.id}
              loading={postSearchQuery.isFetching}
              inputValue={postSearch}
              onInputChange={(_, newInputValue) => {
                setPostSearch(newInputValue);
              }}
              options={postSearchQuery.data?.items.map((x) => ({ title: x.title, id: x.id })) ?? []}
              renderOption={(props, option) => (
                <Box component="li" {...props} key={option.id}>
                  {option.title}
                </Box>
              )}
              getOptionLabel={(option) => option.title}
              renderInput={(params) => <TextField {...params} label="Search post" />}
              sx={{ width: '300px' }}
            />
            <TextField
              id="linkedPostId"
              name="linkedPostId"
              label="Post id"
              type="number"
              value={formData.linkedPostId || ''}
              onChange={handleNullableChange}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
        </Grid>

        <Grid item>
          <Grid container gap={4}>
            <Autocomplete
              id="parent-menu"
              onChange={(_, menu) => {
                setFormData((x) => ({ ...x, parentMenuId: menu?.id }));
              }}
              isOptionEqualToValue={(option, value) => option.id === value.id}
              loading={menuSearchQuery.isFetching}
              inputValue={menuSearch}
              onInputChange={(_, newInputValue) => {
                setMenuSearch(newInputValue);
              }}
              options={menuSearchQuery.data?.items.map((x) => ({ title: x.title, id: x.id })) ?? []}
              renderOption={(props, option) => (
                <Box component="li" {...props} key={option.id}>
                  {option.title}
                </Box>
              )}
              getOptionLabel={(option) => option.title}
              renderInput={(params) => <TextField {...params} label="Search menu" />}
              sx={{ width: '300px' }}
            />
            <TextField
              id="parentMenuId"
              name="parentMenuId"
              label="Parent menu id"
              type="number"
              value={formData.parentMenuId || ''}
              onChange={handleNullableChange}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
        </Grid>

        <Grid item>
          <TextField
            id="url"
            name="url"
            label="Url"
            autoComplete="off"
            value={formData.url ?? ''}
            sx={{ width: 300 }}
            onChange={handleNullableChange}
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
          <SaveButton disabled={createMenuStatus.isLoading || editMenuStatus.isLoading} />
        </Grid>
      </Grid>
    </form>
  );
}
