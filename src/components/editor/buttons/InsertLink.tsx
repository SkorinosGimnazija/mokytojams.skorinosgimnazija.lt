import { TextField } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Popover from '@mui/material/Popover';
import Select from '@mui/material/Select';
import React, { useState } from 'react';

interface Props {
  onInsert: (e: string) => void;
}

export const InsertLink: React.FC<Props> = ({ onInsert }) => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
  const [url, setUrl] = useState('');
  const [name, setName] = useState('');

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleInsert = () => {
    if (!url || !name) {
      return;
    }

    onInsert(`[${name}](${url})`);
    handleClose();

    setUrl('');
    setName('');
  };

  return (
    <>
      <Button onClick={handleClick}>Insert url</Button>
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <Box sx={{ p: 2, width: 600, display: 'flex', gap: 1 }}>
          <TextField
            fullWidth
            id="link-name"
            label="Name"
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <TextField
            fullWidth
            id="link-url"
            label="Url"
            variant="outlined"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />

          <Button onClick={handleInsert}>Ok</Button>
        </Box>
      </Popover>
    </>
  );
};
