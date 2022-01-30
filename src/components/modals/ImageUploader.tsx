import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { Button, ImageList, ImageListItem } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import React, { useMemo, useRef } from 'react';
import { useUnmount } from 'react-use';
import { toArray } from '../../lib/utils';

interface Props {
  name: string;
  multiple?: boolean;
  newImages?: File[] | File | null;
  oldImages?: string[] | string | null;
  onDelete?: (imageName: string) => void;
  onAdd: (images: File[]) => void;
}

export const ImageUploader: React.FC<Props> = ({
  newImages,
  oldImages,
  onDelete,
  onAdd,
  multiple,
  name,
}) => {
  const [open, setOpen] = React.useState(false);
  const imagePreviews = useRef<Record<string, string>>({});
  const newImagesNormalized = useMemo(() => toArray(newImages), [newImages]);
  const oldImagesNormalized = useMemo(() => toArray(oldImages), [oldImages]);

  useUnmount(() => Object.values(imagePreviews.current).forEach(URL.revokeObjectURL));

  return (
    <>
      <Button fullWidth variant="outlined" color="info" component="span" onClick={() => setOpen(true)}>
        {name}
      </Button>

      <Dialog fullWidth open={open} onClose={() => setOpen(false)}>
        <DialogTitle>{name}</DialogTitle>

        <DialogContent>
          <label htmlFor="images">
            <input
              id="images"
              type="file"
              accept="image/*"
              hidden
              multiple={multiple}
              onChange={(e) => {
                const addedImages = Array.from(e.target.files ?? []);
                const images = addedImages.filter((x) =>
                  newImagesNormalized.every((z) => z.name !== x.name)
                );

                for (const image of images) {
                  imagePreviews.current[image.name] = URL.createObjectURL(image);
                }

                onAdd(multiple ? [...images, ...newImagesNormalized] : images);
              }}
            />
            <Button fullWidth variant="contained" component="span">
              {multiple ? 'Add' : 'Set'}
            </Button>
          </label>

          <ImageList cols={3} rowHeight={120} gap={4}>
            {newImagesNormalized.map((image) => (
              <ImageListItem key={image.name}>
                <img
                  src={imagePreviews.current[image.name]}
                  alt="preview new"
                  style={{ aspectRatio: '16/9' }}
                />
                {onDelete && (
                  <HighlightOffIcon
                    color="error"
                    sx={{ position: 'absolute', cursor: 'pointer', right: 0 }}
                    onClick={() => onDelete(image.name)}
                  />
                )}
              </ImageListItem>
            ))}

            {(!newImagesNormalized.length || multiple) &&
              oldImagesNormalized.map((imageUrl) => (
                <ImageListItem key={imageUrl}>
                  <img
                    src={`${process.env.REACT_APP_STATIC_URL}/${imageUrl}`}
                    alt="preview old"
                    style={{ aspectRatio: '16/9' }}
                  />
                  {onDelete && (
                    <HighlightOffIcon
                      color="error"
                      sx={{ position: 'absolute', cursor: 'pointer', right: 0 }}
                      onClick={() => onDelete(imageUrl)}
                    />
                  )}
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
