import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import React from 'react';

interface Props {
  icon?: boolean;
  onConfirm: () => void;
}

export const DeleteButton: React.FC<Props> = ({ icon, onConfirm }) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirm = () => {
    setOpen(false);
    onConfirm();
  };

  const deleteIcon = () => {
    return (
      <IconButton onClick={handleClickOpen}>
        <DeleteIcon color="error" />
      </IconButton>
    );
  };

  const deleteButton = () => {
    return (
      <Button variant="outlined" color="error" onClick={handleClickOpen}>
        Ištrinti
      </Button>
    );
  };

  return (
    <>
      {icon && deleteIcon()}
      {!icon && deleteButton()}

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
