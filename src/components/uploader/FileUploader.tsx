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
  setFieldValue: (field: string, value: any) => void;
}

export const FileUploader: React.FC<Props> = ({ setFieldValue, values }) => {
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

                setFieldValue('newFiles', newFiles);
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
                          setFieldValue(
                            'newFiles',
                            values.newFiles?.filter((x) => x.name !== file.name)
                          );
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
                          setFieldValue(
                            'files',
                            values.files?.filter((x) => x !== file)
                          );
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
