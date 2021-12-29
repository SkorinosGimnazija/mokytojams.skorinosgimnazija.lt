import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton, Tooltip } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import React from 'react';

interface Props {
  onConfirm: () => void;
}

export const DeleteButton: React.FC<Props> = ({ onConfirm }) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    setOpen(true);
  };

  const handleClose = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    setOpen(false);
  };

  const handleConfirm = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    setOpen(false);
    onConfirm();
  };

  return (
    <>
      <Tooltip title="Ištrinti">
        <IconButton onClick={handleClickOpen}>
          <DeleteIcon color="error" />
        </IconButton>
      </Tooltip>

      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle>Ištrinti įrašą?</DialogTitle>
        <DialogActions>
          <Button onClick={handleClose}>Ne</Button>
          <Button color="error" onClick={handleConfirm} autoFocus>
            Taip
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
