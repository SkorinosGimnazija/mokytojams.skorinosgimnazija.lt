import DeleteIcon from '@mui/icons-material/Delete';
import { Button, IconButton, List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import uniqBy from 'lodash/uniqBy';
import React from 'react';

interface Props {
  values: { files?: string[] | null; newFiles?: File[] | null };
  setValues: React.Dispatch<React.SetStateAction<any>>;
}

export const FileUploader: React.FC<Props> = ({ values, setValues }) => {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <Button
        fullWidth
        variant="outlined"
        color="info"
        component="span"
        onClick={() => setOpen(true)}
      >
        Files
      </Button>

      <Dialog fullWidth open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Files</DialogTitle>

        <DialogContent>
          <label htmlFor="files">
            <input
              id="files"
              type="file"
              multiple
              hidden
              onChange={(e) => {
                const addedFiles = Array.from(e.target.files ?? []);
                const existingFiles = values.newFiles ?? [];
                const newFiles = uniqBy([...existingFiles, ...addedFiles], (x) => x.name);

                setValues((x: any) => ({ ...x, newFiles }));
              }}
            />
            <Button fullWidth variant="contained" component="span">
              Add
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
                          setValues((x: any) => ({
                            ...x,
                            newFiles: x.newFiles?.filter((z: File) => z.name !== file.name),
                          }));
                        }}
                      >
                        <DeleteIcon color="error" />
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
                          setValues((x: any) => ({
                            ...x,
                            files: x.files?.filter((z: string) => z !== file),
                          }));
                        }}
                      >
                        <DeleteIcon color="error" />
                      </IconButton>
                    }
                  >
                    <ListItemText primary={file.split('/')[1] ?? file} />
                  </ListItem>
                </ListItemButton>
              );
            })}
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Ok</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
