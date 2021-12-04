import ClearIcon from '@mui/icons-material/Clear';
import { IconButton, InputAdornment, TextField } from '@mui/material';
import React from 'react';
import { useDebounce } from 'react-use';

interface Props {
  onChange: (query: string) => void;
}

export const SearchForm: React.FC<Props> = ({ onChange }) => {
  const [searchInput, setSearchInput] = React.useState('');

  useDebounce(
    () => {
      onChange(searchInput);
    },
    300,
    [searchInput]
  );

  const handleSearchClear = () => {
    setSearchInput('');
    onChange('');
  };

  return (
    <TextField
      label="Paieška"
      variant="standard"
      value={searchInput}
      onChange={(e) => setSearchInput(e.target.value)}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton onClick={handleSearchClear} edge="end">
              <ClearIcon />
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};
