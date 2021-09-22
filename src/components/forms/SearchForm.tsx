import ClearIcon from '@mui/icons-material/Clear';
import { IconButton, InputAdornment, TextField } from '@mui/material';
import React from 'react';
import { useHistory } from 'react-router';
import { useDebounce, useMount, useUpdateEffect } from 'react-use';

export const SearchForm: React.FC = () => {
  const [searchInput, setSearchInput] = React.useState('');
  const history = useHistory();

  useMount(() => {
    const searchParam = new URLSearchParams(history.location.search).get('q');
    if (searchParam) setSearchInput(searchParam);
  });

  useUpdateEffect(() => {
    if (!searchInput) history.push({});
  }, [searchInput]);

  useDebounce(
    () => {
      if (searchInput) {
        history.push({ search: new URLSearchParams({ q: searchInput }).toString() });
      }
    },
    500,
    [searchInput]
  );

  const handleSearchClear = () => {
    setSearchInput('');
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
