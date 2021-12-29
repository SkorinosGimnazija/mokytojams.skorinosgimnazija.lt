import { Button } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

export const CreateItemButton: React.FC = () => {
  return (
    <Button component={Link} to="create" variant="contained">
      Naujas įrašas
    </Button>
  );
};
