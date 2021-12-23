import { Button } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

interface Props {
  to: string;
}

export const CreateItemLink: React.FC<Props> = ({ to }) => {
  return (
    <Button component={Link} to={to} variant="contained">
      Naujas įrašas
    </Button>
  );
};
