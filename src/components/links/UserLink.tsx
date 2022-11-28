import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import { IconButton, Tooltip } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

interface Props {
  url: string;
}

export const UserLink: React.FC<Props> = ({ url }) => {
  return (
    <Link to={url}>
      <Tooltip title="Mokytojai">
        <IconButton>
          <PersonOutlineIcon />
        </IconButton>
      </Tooltip>
    </Link>
  );
};
