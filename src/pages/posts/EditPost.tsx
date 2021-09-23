import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from '@mui/material';
import Grid from '@mui/material/Grid';
import format from 'date-fns/format';
import { Field, Form, Formik } from 'formik';
import React from 'react';
import { useHistory, useParams } from 'react-router';
import { SaveButton } from '../../components/buttons/SaveButton';
import { SquareLoader } from '../../components/loadingSpinners/SquareLoader';
import {
  PostDetailsDto,
  useCreatePostMutation,
  useEditPostMutation,
  useGetCategoriesQuery,
  useGetPostByIdQuery,
} from '../../services/generated.api';

export const EditPost = () => {
  const history = useHistory();
  const postId = Number(useParams<{ id?: string }>().id);
  const postQuery = useGetPostByIdQuery(
    { id: postId },
    { skip: !postId, refetchOnMountOrArgChange: true }
  );
  const categoryQuery = useGetCategoriesQuery();

  const [createPostMutation] = useCreatePostMutation();
  const [editPostMutation] = useEditPostMutation();

  if (categoryQuery.isLoading || postQuery.isFetching) {
    return <SquareLoader />;
  }

  return (
    <Formik
      initialValues={{
        id: postId,
        images: [] as string[],
        files: [] as string[],
        title: postQuery.data?.title ?? 'asd',
        slug: postQuery.data?.slug ?? 'asd',
        introText: postQuery.data?.introText ?? '',
        text: postQuery.data?.text ?? '',
        isFeatured: postQuery.data?.isFeatured ?? false,
        isPublished: postQuery.data?.isPublished ?? false,
        categoryId: postQuery.data?.categoryId ?? categoryQuery.data?.[0]?.id ?? '',
        publishDate: format(new Date(), "yyyy-MM-dd'T'HH:mm"),
      }}
      onSubmit={(values, { setSubmitting }) => {
        const formData = new FormData();

        for (const key in values) {
          // @ts-ignore
          const value = values[key];

          if (Array.isArray(value)) {
            Array.from(value).forEach((file) => {
              formData.append(key, file);
            });
          } else {
            formData.set(key, value);
          }
        }

        if (postId) {
          // @ts-ignore
          editPostMutation({ body: formData }).then(() => setSubmitting(false));
        } else {
          // @ts-ignore
          createPostMutation({ body: formData }).then((response) => {
            const postData = (response as any).data as PostDetailsDto;
            if (postData) {
              history.push(`/posts/edit/${postData.id}`);
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
                  onChange={handleChange}
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
                    <Field
                      id="introText"
                      label="Intro"
                      autoComplete="off"
                      multiline
                      rows={3}
                      value={values.introText}
                      onChange={handleChange}
                      component={TextField}
                    />
                    <Field
                      id="text"
                      label="Full article"
                      autoComplete="off"
                      multiline
                      rows={10}
                      value={values.text}
                      onChange={handleChange}
                      component={TextField}
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
                    />

                    <FormControl>
                      <InputLabel id="categoryId-label">Category</InputLabel>
                      <Select
                        labelId="categoryId-label"
                        id="categoryId"
                        name="categoryId"
                        value={values.categoryId}
                        label="Category"
                        onChange={handleChange}
                        required
                      >
                        {categoryQuery.data?.map((x) => {
                          return (
                            <MenuItem key={x.id} value={x.id}>
                              {x.name} ({x.language.slug})
                            </MenuItem>
                          );
                        })}
                      </Select>
                    </FormControl>

                    <FormGroup>
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
                            name="isFeatured"
                            checked={Boolean(values.isFeatured)}
                            onChange={handleChange}
                          />
                        }
                        label="Featured"
                      />
                    </FormGroup>

                    <label htmlFor="images">
                      <input
                        id="images"
                        type="file"
                        accept="image/*"
                        multiple
                        hidden
                        onChange={(e) => {
                          const files = e.target.files ?? [];
                          setFieldValue('images', Array.from(files));
                        }}
                      />
                      <Button fullWidth variant="contained" component="span">
                        Gallery
                      </Button>
                    </label>

                    <label htmlFor="files">
                      <input
                        id="files"
                        type="file"
                        multiple
                        hidden
                        onChange={(e) => {
                          const files = e.target.files ?? [];
                          setFieldValue('files', Array.from(files));
                        }}
                      />
                      <Button fullWidth variant="contained" component="span">
                        Files
                      </Button>
                    </label>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Stack direction="row" gap={4} mt={4}>
            <SaveButton disabled={isSubmitting} />
          </Stack>
        </Form>
      )}
    </Formik>
  );
};
