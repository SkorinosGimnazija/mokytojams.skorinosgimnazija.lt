import {
  Button,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  FormGroup,
  InputLabel,
  MenuItem,
  Box,
  Select,
  ImageList,
  ImageListItem,
  Stack,
  TextField,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  IconButton,
} from '@mui/material';
import Grid from '@mui/material/Grid';
import format from 'date-fns/format';
import { Field, Form, Formik } from 'formik';
import React from 'react';
import { useHistory, useParams } from 'react-router';
import { useSearchParam } from 'react-use';
import { SaveButton } from '../../components/buttons/SaveButton';
import { SquareLoader } from '../../components/loadingSpinners/SquareLoader';
import { Markdown } from '../../components/markdown/Markdown';
import {
  PostDetailsDto,
  useCreatePostMutation,
  useEditPostMutation,
  useGetCategoriesQuery,
  useGetPostByIdQuery,
} from '../../services/generated.api';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import DeleteIcon from '@mui/icons-material/Delete';
import { NotFound } from '../NotFound';
import { htmlToMarkdown } from '../../lib/converter';

// TODO clean up
export const EditPost = () => {
  const history = useHistory();
  const textAreaRef = React.useRef<HTMLTextAreaElement>();
  const redirected = Boolean(useSearchParam('redirected'));
  const postId = Number(useParams<{ id?: string }>().id);
  const [priviewMode, setPriviewMode] = React.useState(false);
  const [currentImageBlobUrls, setCurrentImageBlobUrls] = React.useState<
    { url: string; file: File }[]
  >([]);
  const [open, setOpen] = React.useState(false);
  const [openFiles, setOpenFiles] = React.useState(false);
  const categoryQuery = useGetCategoriesQuery();
  const postQuery = useGetPostByIdQuery(
    { id: postId },
    { skip: !postId, refetchOnMountOrArgChange: true }
  );

  const [createPostMutation] = useCreatePostMutation();
  const [editPostMutation] = useEditPostMutation();

  if (categoryQuery.isLoading || postQuery.isFetching) {
    return <SquareLoader />;
  }

  return (
    <Formik
      initialValues={{
        id: postId,
        images: postQuery.data?.images,
        files: postQuery.data?.files,
        newImages: null as File[] | null,
        newFiles: null as File[] | null,
        title: postQuery.data?.title ?? 'asd',
        slug: postQuery.data?.slug ?? 'asd',
        introText: postQuery.data?.introText ?? '',
        text: postQuery.data?.text ?? '',
        isFeatured: postQuery.data?.isFeatured ?? false,
        isPublished: postQuery.data?.isPublished ?? false,
        categoryId: postQuery.data?.categoryId ?? categoryQuery.data?.[0]?.id ?? '',
        publishDate: format(
          postQuery.data?.publishDate ? new Date(postQuery.data.publishDate) : new Date(),
          "yyyy-MM-dd'T'HH:mm"
        ),
        modifiedDate: !postId || redirected ? '' : format(new Date(), "yyyy-MM-dd'T'HH:mm"),
      }}
      onSubmit={(values, { setSubmitting, setFieldValue }) => {
        console.log(values);
        // setSubmitting(false);
        // return;
        const formData = new FormData();

        for (const key in values) {
          // @ts-ignore
          const value = values[key];

          if (Array.isArray(value)) {
            Array.from(value).forEach((file) => {
              formData.append(key, file as Blob);
            });
          } else {
            formData.set(key, value);
          }
        }

        if (postId) {
          editPostMutation({ body: formData as any }).then(() => {
            setSubmitting(false);
            setFieldValue('newFiles', null);
            setFieldValue('files', [
              ...(values.files ?? []),
              ...(values.newFiles?.map((x) => `${postId}/${x.name}`) ?? []),
            ]);
          });
        } else {
          createPostMutation({ body: formData as any }).then((response) => {
            const postData = (response as any).data as PostDetailsDto;
            if (postData) {
              history.replace({
                pathname: `/posts/edit/${postData.id}`,
                search: new URLSearchParams({ redirected: String(true) }).toString(),
              });
            } else {
              setSubmitting(false);
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
                    {priviewMode && <Markdown>{values.introText}</Markdown>}
                    {priviewMode && <Divider />}
                    {priviewMode && <Markdown>{values.text}</Markdown>}

                    {/* {!priviewMode && (
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
                    )} */}

                    {!priviewMode && (
                      <Field
                        inputRef={textAreaRef}
                        id="text"
                        label="Full article"
                        autoComplete="off"
                        multiline
                        rows={10}
                        value={values.text}
                        onChange={handleChange}
                        component={TextField}
                        sx={{
                          '& .MuiInputBase-root': {
                            padding: '15px 5px',
                          },
                          '& .MuiInputBase-input': {
                            padding: '0px 20px',
                          },
                        }}
                        onPaste={(e: React.ClipboardEvent<HTMLTextAreaElement>) => {
                          const html = e.clipboardData.getData('text/html');
                          if (!html) {
                            return;
                          }

                          const markdownText = htmlToMarkdown(html);
                          // if (!markdownText) {
                          //   throw 'HTML parsing failed';
                          // }

                          const input = textAreaRef.current;
                          const startText = values.text.slice(0, input?.selectionStart ?? 0);
                          const endText = values.text.slice(input?.selectionEnd ?? 0);

                          setFieldValue('text', startText + markdownText + endText);
                          e.preventDefault();
                        }}
                      />
                    )}
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

                    <Button
                      fullWidth
                      variant="contained"
                      component="span"
                      onClick={() => setOpen(true)}
                    >
                      Gallery
                    </Button>

                    <Button
                      fullWidth
                      variant="contained"
                      component="span"
                      onClick={() => setOpenFiles(true)}
                    >
                      Files
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Stack direction="row" gap={4} mt={4}>
            <SaveButton disabled={isSubmitting} />
            <Button variant="outlined" color="info" onClick={() => setPriviewMode((x) => !x)}>
              Priview
            </Button>
          </Stack>

          <Dialog fullWidth open={open} onClose={() => setOpen(false)}>
            <DialogTitle>Gallery</DialogTitle>
            <DialogContent>
              <label htmlFor="images">
                <input
                  id="images"
                  type="file"
                  accept="image/*"
                  multiple
                  hidden
                  onChange={(e) => {
                    const images = Array.from(e.target.files ?? []);
                    setFieldValue('newImages', [...images, ...(values.newImages ?? [])]);

                    setCurrentImageBlobUrls((x) => {
                      return [
                        ...images.map((z) => ({ url: URL.createObjectURL(z), file: z })),
                        ...x,
                      ];
                    });
                  }}
                />
                <Button fullWidth variant="contained" component="span">
                  Upload
                </Button>
              </label>

              <ImageList cols={3} rowHeight={120} gap={4}>
                {currentImageBlobUrls.map((image) => (
                  <ImageListItem key={image.file.name}>
                    <img src={image.url} alt="preview" style={{ aspectRatio: '16/9' }} />
                    <HighlightOffIcon
                      color="error"
                      sx={{ position: 'absolute', cursor: 'pointer', right: 0 }}
                      onClick={() => {
                        setCurrentImageBlobUrls((x) => x.filter((z) => z !== image));

                        setFieldValue(
                          'newImages',
                          values.newImages?.filter((z) => z.name !== image.file.name)
                        );
                      }}
                    />
                  </ImageListItem>
                ))}
                {values.images?.map((image) => (
                  <ImageListItem key={image}>
                    <img
                      src={`${process.env.REACT_APP_STATIC_URL}/uploads/${image}`}
                      alt="preview"
                      style={{ aspectRatio: '16/9' }}
                    />
                    <HighlightOffIcon
                      color="error"
                      sx={{ position: 'absolute', cursor: 'pointer', right: 0 }}
                      onClick={() => {
                        setFieldValue(
                          'images',
                          values.images?.filter((z) => z !== image)
                        );
                      }}
                    />
                  </ImageListItem>
                ))}
              </ImageList>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOpen(false)}>Ok</Button>
            </DialogActions>
          </Dialog>

          <Dialog fullWidth open={openFiles} onClose={() => setOpenFiles(false)}>
            <DialogTitle>Files</DialogTitle>
            <DialogContent>
              <label htmlFor="files">
                <input
                  id="files"
                  type="file"
                  multiple
                  hidden
                  onChange={(e) => {
                    const files = Array.from(e.target.files ?? []);
                    setFieldValue('newFiles', [...files, ...(values.newFiles ?? [])]);
                  }}
                />
                <Button fullWidth variant="contained" component="span">
                  Upload
                </Button>
              </label>
              <List>
                {values.newFiles?.map((file) => {
                  return (
                    <ListItemButton key={file.name} sx={{ cursor: 'default' }}>
                      <ListItem
                        secondaryAction={
                          <IconButton
                            edge="end"
                            onClick={() => {
                              setFieldValue(
                                'newFiles',
                                values.newFiles?.filter((x) => x.name !== file.name)
                              );
                            }}
                          >
                            <DeleteIcon />
                          </IconButton>
                        }
                      >
                        <ListItemText primary={file.name} />
                      </ListItem>
                    </ListItemButton>
                  );
                })}
                {values.files?.map((file) => {
                  return (
                    <ListItemButton key={file} sx={{ cursor: 'default' }}>
                      <ListItem
                        secondaryAction={
                          <IconButton
                            edge="end"
                            onClick={() => {
                              setFieldValue(
                                'files',
                                values.files?.filter((x) => x !== file)
                              );
                            }}
                          >
                            <DeleteIcon />
                          </IconButton>
                        }
                      >
                        <ListItemText primary={file} />
                      </ListItem>
                    </ListItemButton>
                  );
                })}
              </List>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOpenFiles(false)}>Ok</Button>
            </DialogActions>
          </Dialog>
        </Form>
      )}
    </Formik>
  );
};
