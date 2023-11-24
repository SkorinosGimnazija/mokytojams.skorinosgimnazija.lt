import RestartAltOutlinedIcon from '@mui/icons-material/RestartAltOutlined';
import { IconButton, Tooltip } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import React from 'react';

interface Props {
  onConfirm: () => void;
}

export const ResetButton: React.FC<Props> = ({ onConfirm }) => {
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
      <Tooltip title="Išvalyti">
        <IconButton onClick={handleClickOpen}>
          <RestartAltOutlinedIcon color="warning" />
        </IconButton>
      </Tooltip>

      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle>Išvalyti įrašą?</DialogTitle>
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
