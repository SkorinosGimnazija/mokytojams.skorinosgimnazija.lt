import {
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
  useCreatePostMutation,
  useEditPostMutation,
  useGetPostByIdQuery,
  useGetPublicLanguagesQuery,
} from '../../services/api';
import { PostDetailsDto } from '../../services/generatedApi';

export default function EditPost() {
  const params = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [priviewMode, setPriviewMode] = useState(false);

  const postId = Number(params.id);
  const isNewPost = searchParams.has('new');

  const [skipPost, setSkipPost] = useState(false);
  const languageQuery = useGetPublicLanguagesQuery();
  const postQuery = useGetPostByIdQuery({ id: postId }, { skip: !postId || skipPost });

  const [createPostMutation] = useCreatePostMutation();
  const [editPostMutation] = useEditPostMutation();

  if (postQuery.isFetching || languageQuery.isFetching) {
    return <CircularSpinner />;
  }

  return (
    <Formik
      enableReinitialize={false}
      initialValues={{
        id: postId,
        images: postQuery.data?.images,
        files: postQuery.data?.files,
        newImages: null as File[] | null,
        newFiles: null as File[] | null,
        title: postQuery.data?.title ?? '',
        slug: postQuery.data?.slug ?? '',
        introText: postQuery.data?.introText ?? '',
        text: postQuery.data?.text ?? '',
        meta: postQuery.data?.meta ?? '',
        isFeatured: postQuery.data?.isFeatured ?? false,
        isPublished: postQuery.data?.isPublished ?? true,
        showInFeed: postQuery.data?.showInFeed ?? true,
        optimizeImages: true,
        languageId: languageQuery.data
          ? postQuery.data?.language?.id ?? languageQuery.data[0].id
          : '',
        publishDate: format(
          new Date(postQuery.data?.publishDate ?? new Date()),
          "yyyy-MM-dd'T'HH:mm"
        ),
        modifiedDate: !postId || isNewPost ? '' : format(new Date(), "yyyy-MM-dd'T'HH:mm"),
      }}
      onSubmit={(values, { setSubmitting }) => {
        const formData = new FormData();

        for (const key in values) {
          // @ts-ignore
          const value = values[key];

          if (key === 'publishDate' || key === 'modifiedDate') {
            if (value) formData.set(key, new Date(value).toISOString());
          } else if (Array.isArray(value)) {
            Array.from(value).forEach((file) => {
              formData.append(key, file as Blob);
            });
          } else {
            formData.set(key, value);
          }
        }

        if (postId) {
          setSkipPost(true);

          editPostMutation({ body: formData as any }).then((response: any) => {
            setSubmitting(false);
            if (!response.error) {
              setSkipPost(false);
            }
          });
        } else {
          createPostMutation({ body: formData as any }).then((response: any) => {
            const postData = response.data as PostDetailsDto;
            if (postData) {
              navigate({ pathname: `/posts/edit/${postData.id}`, search: 'new' });
            }
          });
        }
      }}
    >
      {({ isSubmitting, setFieldValue, values, handleChange }) => (
        <Form>
          <Grid container gap={4} direction="column" wrap="nowrap">
            <Grid item>
              <Grid container gap={4}>
                <Field
                  id="title"
                  label="Title"
                  autoComplete="off"
                  required
                  sx={{ flex: '1 1 300px' }}
                  value={values.title}
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
                  sx={{ flex: '1 1 300px' }}
                  value={values.slug}
                  onChange={handleChange}
                  component={TextField}
                />
              </Grid>
            </Grid>

            <Grid item>
              <Grid container direction="row" gap={4}>
                <Grid item sx={{ flex: '2 1 400px' }}>
                  <Grid container gap={4} direction="column">
                    <TextEditor
                      previewMode={priviewMode}
                      values={values}
                      setFieldValue={setFieldValue}
                    />
                  </Grid>
                </Grid>
                <Grid item sx={{ flex: '1' }}>
                  <Grid container direction="column" gap={2}>
                    <Field
                      type="datetime-local"
                      id="publishDate"
                      label="Publish date"
                      required
                      value={values.publishDate}
                      onChange={handleChange}
                      component={TextField}
                      InputLabelProps={{ shrink: true }}
                    />

                    <Field
                      type="datetime-local"
                      id="modifiedDate"
                      label="Modified date"
                      value={values.modifiedDate}
                      onChange={handleChange}
                      component={TextField}
                      InputLabelProps={{ shrink: true }}
                    />

                    <FormControl>
                      <InputLabel id="languageId-label">Language</InputLabel>
                      <Select
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

                    <FormGroup
                      sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}
                    >
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

                      <FormControlLabel
                        control={
                          <Checkbox
                            name="showInFeed"
                            checked={Boolean(values.showInFeed)}
                            onChange={handleChange}
                          />
                        }
                        label="Show in feed"
                      />

                      <FormControlLabel
                        control={
                          <Checkbox
                            name="isFeatured"
                            checked={Boolean(values.isFeatured)}
                            onChange={handleChange}
                          />
                        }
                        label="Featured"
                      />

                      <FormControlLabel
                        control={
                          <Checkbox
                            name="optimizeImages"
                            checked={Boolean(values.optimizeImages)}
                            onChange={handleChange}
                          />
                        }
                        label="Optimize gallery"
                      />
                    </FormGroup>

                    <ImageUploader setFieldValue={setFieldValue} values={values} />

                    <FileUploader setFieldValue={setFieldValue} values={values} />

                    <Button
                      fullWidth
                      variant="outlined"
                      color="primary"
                      component="span"
                      onClick={() => setPriviewMode((x) => !x)}
                    >
                      Priview
                    </Button>

                    <SaveButton disabled={isSubmitting} />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  );
}
