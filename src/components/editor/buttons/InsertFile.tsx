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
  values: { files?: string[] | null; newFiles?: File[] | null };
}

const FILE_REPLACE_TEMPLATE = '{auto-link}';

export const InsertFile: React.FC<Props> = ({ onInsert, values }) => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
  const [file, setFile] = useState('');
  const [fileName, setFileName] = useState('');

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleInsert = () => {
    if (!file) {
      return;
    }

    onInsert(`[${fileName}](${FILE_REPLACE_TEMPLATE}/${file})`);
    handleClose();

    setFile('');
    setFileName('');
  };

  const files = [
    ...(values.files?.map((x) => x.split('/')[1] ?? x) ?? []),
    ...(values.newFiles?.map((x) => x.name) ?? []),
  ];

  return (
    <>
      <Button onClick={handleClick}>Insert file</Button>
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
          <FormControl fullWidth>
            <InputLabel id="fileId-label">File</InputLabel>
            <Select
              labelId="fileId-label"
              id="fileId"
              value={file}
              label="File"
              onChange={(e) => setFile(e.target.value)}
            >
              {files.map((x, i) => {
                return (
                  <MenuItem key={i} value={x}>
                    {x}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>

          <TextField
            fullWidth
            id="file-name"
            label="Name"
            variant="outlined"
            value={fileName}
            onChange={(e) => setFileName(e.target.value)}
          />

          <Button onClick={handleInsert}>Ok</Button>
        </Box>
      </Popover>
    </>
  );
};
