import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { Button, ImageList, ImageListItem } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import uniqBy from 'lodash/uniqBy';
import React, { useEffect, useState } from 'react';

interface Props {
  values: { images?: string[] | null; newImages?: File[] | null };
  setValues: React.Dispatch<React.SetStateAction<any>>;
}

export const ImageUploader: React.FC<Props> = ({ values, setValues }) => {
  const [open, setOpen] = React.useState(false);
  const [imagePreviews, setImagePreviews] = useState<{ url: string; file: File }[]>([]);

  useEffect(() => {
    return () => {
      imagePreviews.forEach((x) => {
        URL.revokeObjectURL(x.url);
      });
    };
  }, [imagePreviews]);

  return (
    <>
      <Button
        fullWidth
        variant="outlined"
        color="info"
        component="span"
        onClick={() => setOpen(true)}
      >
        Gallery
      </Button>

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
                const addedImages = Array.from(e.target.files ?? []);
                const existingImages = values.newImages ?? [];
                const newImages = uniqBy([...existingImages, ...addedImages], (x) => x.name);

                setValues((x: any) => ({ ...x, newImages }));
                setImagePreviews(newImages.map((x) => ({ url: URL.createObjectURL(x), file: x })));
              }}
            />
            <Button fullWidth variant="contained" component="span">
              Add
            </Button>
          </label>

          <ImageList cols={3} rowHeight={120} gap={4}>
            {values.newImages?.map((image) => (
              <ImageListItem key={image.name}>
                <img
                  src={imagePreviews.find((x) => x.file.name === image.name)?.url}
                  alt="preview"
                  style={{ aspectRatio: '16/9' }}
                />
                <HighlightOffIcon
                  color="error"
                  sx={{ position: 'absolute', cursor: 'pointer', right: 0 }}
                  onClick={() => {
                    const newImages = values.newImages!.filter((z) => z.name !== image.name);

                    setValues((x: any) => ({ ...x, newImages }));
                    setImagePreviews(
                      newImages.map((x) => ({ url: URL.createObjectURL(x), file: x }))
                    );
                  }}
                />
              </ImageListItem>
            ))}

            {values.images?.map((image) => (
              <ImageListItem key={image}>
                <img
                  src={`${process.env.REACT_APP_STATIC_URL}/${image}`}
                  alt="preview"
                  style={{ aspectRatio: '16/9' }}
                />
                <HighlightOffIcon
                  color="error"
                  sx={{ position: 'absolute', cursor: 'pointer', right: 0 }}
                  onClick={() => {
                    setValues((x: any) => ({
                      ...x,
                      images: x.images?.filter((z: string) => z !== image),
                    }));
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
    </>
  );
};
