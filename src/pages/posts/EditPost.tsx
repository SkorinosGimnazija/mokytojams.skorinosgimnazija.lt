import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from '@mui/material';
import Grid from '@mui/material/Grid';
import format from 'date-fns/format';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { SaveButton } from '../../components/buttons/SaveButton';
import { PostEditor } from '../../components/editor/PostEditor';
import { FileUploader } from '../../components/modals/FileUploader';
import { ImageUploader } from '../../components/modals/ImageUploader';
import { slugify } from '../../lib/slugify';
import {
  useCreatePostMutation,
  useEditPostMutation,
  useGetPostByIdQuery,
  useGetPublicLanguagesQuery,
} from '../../services/api';
import { PostDetailsDto } from '../../services/generatedApi';

export default function EditPost() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const params = useParams();
  const postId = Number(params.id);
  const isNewPost = searchParams.has('new');

  const [priviewMode, setPriviewMode] = useState(false);

  const [skipPostFetch, setSkipPostFetch] = useState(false);

  const languageQuery = useGetPublicLanguagesQuery();
  const postQuery = useGetPostByIdQuery({ id: postId }, { skip: !postId || skipPostFetch });

  const [createPostMutation, createPostStatus] = useCreatePostMutation();
  const [editPostMutation, editPostStatus] = useEditPostMutation();

  const [formData, setFormData] = useState({
    id: postId,
    images: null as string[] | null,
    files: null as string[] | null,
    newImages: null as File[] | null,
    newFiles: null as File[] | null,
    title: '',
    slug: '',
    introText: '',
    text: '',
    meta: '',
    isFeatured: false,
    isPublished: true,
    showInFeed: true,
    optimizeImages: true,
    languageId: 0,
    publishDate: format(new Date(), "yyyy-MM-dd'T'HH:mm"),
    modifiedDate: !postId || isNewPost ? '' : format(new Date(), "yyyy-MM-dd'T'HH:mm"),
  });

  useEffect(() => {
    if (postId || !languageQuery.isSuccess || !languageQuery.data?.length) {
      return;
    }

    setFormData((x) => ({ ...x, languageId: languageQuery.data[0].id }));
  }, [languageQuery, postId, setFormData]);

  useEffect(() => {
    if (!postQuery.isSuccess) {
      return;
    }

    setFormData((x) => ({
      ...x,
      images: postQuery.data.images,
      files: postQuery.data.files,
      title: postQuery.data.title,
      slug: postQuery.data.slug,
      introText: postQuery.data.introText ?? '',
      text: postQuery.data.text ?? '',
      meta: postQuery.data.meta ?? '',
      isFeatured: postQuery.data.isFeatured,
      isPublished: postQuery.data.isPublished,
      showInFeed: postQuery.data.showInFeed,
      languageId: postQuery.data.language.id,
      publishDate: format(new Date(postQuery.data.publishDate), "yyyy-MM-dd'T'HH:mm"),
    }));
  }, [postQuery, setFormData]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setSkipPostFetch(true);

    const form = new FormData();

    for (const [key, value] of Object.entries(formData)) {
      if (key === 'publishDate' || key === 'modifiedDate') {
        if (value) form.set(key, new Date(value as string).toISOString());
      } else if (Array.isArray(value)) {
        Array.from(value as []).forEach((arrayItem) => {
          form.append(key, arrayItem);
        });
      } else {
        form.set(key, value as string);
      }
    }

    if (postId) {
      editPostMutation({ body: form as any }).then((response: any) => {
        if (!response.error) {
          setSkipPostFetch(false);
        }
      });
    } else {
      createPostMutation({ body: form as any }).then((response: any) => {
        const postData = response.data as PostDetailsDto;
        if (postData) {
          navigate({ pathname: `/posts/edit/${postData.id}`, search: 'new' });
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
      <Grid container gap={4} direction="column" wrap="nowrap">
        <Grid item>
          <Grid container gap={4}>
            <TextField
              id="title"
              name="title"
              label="Title"
              autoComplete="off"
              required
              sx={{ flex: '1 1 300px' }}
              value={formData.title}
              onChange={handleChange}
              onBlur={(e) => setFormData((x) => ({ ...x, slug: slugify(e.target.value) }))}
            />

            <TextField
              id="slug"
              name="slug"
              label="Slug"
              autoComplete="off"
              required
              sx={{ flex: '1 1 300px' }}
              value={formData.slug}
              onChange={handleChange}
            />
          </Grid>
        </Grid>

        <Grid item>
          <Grid container direction="row" gap={4}>
            <Grid item sx={{ flex: '2 1 400px' }}>
              <Grid container gap={4} direction="column">
                <PostEditor previewMode={priviewMode} values={formData} setValues={setFormData} />
              </Grid>
            </Grid>
            <Grid item sx={{ flex: '1' }}>
              <Grid container direction="column" gap={2}>
                <TextField
                  id="publishDate"
                  name="publishDate"
                  type="datetime-local"
                  label="Publish date"
                  required
                  value={formData.publishDate}
                  InputLabelProps={{ shrink: true }}
                  onChange={handleChange}
                />

                <TextField
                  id="modifiedDate"
                  name="modifiedDate"
                  type="datetime-local"
                  label="Modified date"
                  value={formData.modifiedDate}
                  InputLabelProps={{ shrink: true }}
                  onChange={handleChange}
                />

                <FormControl>
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

                <FormGroup
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}
                >
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

                  <FormControlLabel
                    label="Show in feed"
                    control={
                      <Checkbox
                        name="showInFeed"
                        checked={formData.showInFeed}
                        onChange={handleCheckboxChange}
                      />
                    }
                  />

                  <FormControlLabel
                    label="Featured"
                    control={
                      <Checkbox
                        name="isFeatured"
                        checked={formData.isFeatured}
                        onChange={handleCheckboxChange}
                      />
                    }
                  />

                  <FormControlLabel
                    label="Optimize gallery"
                    control={
                      <Checkbox
                        name="optimizeImages"
                        checked={formData.optimizeImages}
                        onChange={handleCheckboxChange}
                      />
                    }
                  />
                </FormGroup>

                <ImageUploader setValues={setFormData} values={formData} />

                <FileUploader setValues={setFormData} values={formData} />

                <Button
                  fullWidth
                  variant="outlined"
                  color="primary"
                  component="span"
                  onClick={() => setPriviewMode((x) => !x)}
                >
                  Priview
                </Button>

                <SaveButton disabled={createPostStatus.isLoading || editPostStatus.isLoading} />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
}
