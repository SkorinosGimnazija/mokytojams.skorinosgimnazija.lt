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
import { SaveButton } from '../../../components/buttons/SaveButton';
import { PostEditor } from '../../../components/editor/PostEditor';
import { FileUploader } from '../../../components/modals/FileUploader';
import { ImageUploader } from '../../../components/modals/ImageUploader';
import { slugify } from '../../../lib/slugify';
import {
  useCreatePostMutation,
  useEditPostMutation,
  useGetPostByIdQuery,
  useGetPublicLanguagesQuery,
} from '../../../services/api';
import { PostDetailsDto } from '../../../services/generatedApi';

interface FormState {
  id: number;
  images?: string[] | null;
  files?: string[] | null;
  featuredImage?: string | null;
  newImages?: File[] | null;
  newFiles?: File[] | null;
  newFeaturedImage?: File | null;
  title: string;
  slug: string;
  introText: string;
  text: string;
  meta: string;
  isFeatured: boolean;
  isPublished: boolean;
  showInFeed: boolean;
  optimizeImages: boolean;
  languageId: number;
  publishedAt: string;
  modifiedAt: string;
}

export default function EditPost() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const params = useParams();
  const postId = Number(params.id);
  const isNewPost = searchParams.has('new');

  const [previewMode, setPreviewMode] = useState(false);

  const [skipPostFetch, setSkipPostFetch] = useState(false);

  const languageQuery = useGetPublicLanguagesQuery();
  const postQuery = useGetPostByIdQuery({ id: postId }, { skip: !postId || skipPostFetch });

  const [createPostMutation, createPostStatus] = useCreatePostMutation();
  const [editPostMutation, editPostStatus] = useEditPostMutation();

  const [formData, setFormData] = useState<FormState>({
    id: postId,
    newImages: [],
    newFiles: [],
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
    publishedAt: format(new Date(), "yyyy-MM-dd'T'HH:mm"),
    modifiedAt: !postId || isNewPost ? '' : format(new Date(), "yyyy-MM-dd'T'HH:mm"),
  });

  useEffect(() => {
    if (postId || !languageQuery.isSuccess || !languageQuery.data?.length) {
      return;
    }

    setFormData((x) => ({ ...x, languageId: languageQuery.data[0].id }));
  }, [languageQuery, postId]);

  useEffect(() => {
    if (!postQuery.isSuccess || postQuery.isFetching) {
      return;
    }

    setFormData((x) => ({
      ...x,
      newFeaturedImage: null,
      newFiles: null,
      newImages: null,
      images: postQuery.data.images,
      files: postQuery.data.files,
      featuredImage: postQuery.data.featuredImage,
      title: postQuery.data.title,
      slug: postQuery.data.slug,
      introText: postQuery.data.introText ?? '',
      text: postQuery.data.text ?? '',
      meta: postQuery.data.meta ?? '',
      isFeatured: postQuery.data.isFeatured,
      isPublished: postQuery.data.isPublished,
      showInFeed: postQuery.data.showInFeed,
      languageId: postQuery.data.language.id,
      publishedAt: format(new Date(postQuery.data.publishedAt), "yyyy-MM-dd'T'HH:mm"),
    }));
  }, [postQuery]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setSkipPostFetch(true);

    const form = new FormData();

    for (const [key, value] of Object.entries(formData) as [keyof FormState, any][]) {
      if (key === 'publishedAt' || key === 'modifiedAt') {
        if (value) form.set(key, new Date(value).toISOString());
      } else if (Array.isArray(value)) {
        Array.from(value).forEach((x) => form.append(key, x));
      } else if (value != null) {
        form.set(key, value);
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
          navigate({ pathname: `../${postData.id}`, search: 'new' });
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
      <Grid container gap={2} direction="column" wrap="nowrap">
        <Grid item>
          <Grid container gap={2}>
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
          <Grid container direction="row" gap={2}>
            <Grid item sx={{ flex: '3' }}>
              <Grid container gap={2} direction="column">
                <PostEditor previewMode={previewMode} values={formData} setValues={setFormData} />
              </Grid>
            </Grid>
            <Grid item sx={{ flex: '1' }}>
              <Grid container direction="column" gap={2}>
                <TextField
                  id="publishedAt"
                  name="publishedAt"
                  type="datetime-local"
                  label="Publish date"
                  required
                  value={formData.publishedAt}
                  InputLabelProps={{ shrink: true }}
                  onChange={handleChange}
                  onFocus={async () => {
                    try {
                      const text = await navigator.clipboard.readText();
                      if (!text) {
                        return;
                      }

                      const date = new Date(text);
                      if (isNaN(date.getTime())) {
                        return;
                      }

                      setFormData((x) => ({ ...x, publishedAt: format(date, "yyyy-MM-dd'T'HH:mm") }));
                    } catch (error) {}
                  }}
                />

                <TextField
                  id="modifiedAt"
                  name="modifiedAt"
                  type="datetime-local"
                  label="Modified date"
                  value={formData.modifiedAt}
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

                <Grid container gap={1} direction="column">
                  <ImageUploader
                    name="Featured image"
                    oldImages={formData.featuredImage}
                    newImages={formData.newFeaturedImage}
                    onDelete={() =>
                      setFormData((x) => ({ ...x, featuredImage: null, newFeaturedImage: null }))
                    }
                    onAdd={(files) => setFormData((x) => ({ ...x, newFeaturedImage: files[0] }))}
                  />

                  <ImageUploader
                    name="Gallery"
                    multiple
                    oldImages={formData.images}
                    newImages={formData.newImages}
                    onDelete={(file) =>
                      setFormData((x) => ({
                        ...x,
                        images: x.images?.filter((z) => z !== file),
                        newImages: x.newImages?.filter((z) => z.name !== file),
                      }))
                    }
                    onAdd={(files) => setFormData((x) => ({ ...x, newImages: files }))}
                  />

                  <FileUploader setValues={setFormData} values={formData} />

                  <Button
                    fullWidth
                    variant="outlined"
                    color="primary"
                    component="span"
                    onClick={() => setPreviewMode((x) => !x)}
                  >
                    Preview
                  </Button>
                </Grid>

                <SaveButton
                  disabled={
                    createPostStatus.isLoading || editPostStatus.isLoading || postQuery.isFetching
                  }
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
}
