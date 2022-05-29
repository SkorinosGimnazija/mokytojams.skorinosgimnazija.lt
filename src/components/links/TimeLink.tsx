import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { IconButton, Tooltip } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

interface Props {
  url: string;
}

export const TimeLink: React.FC<Props> = ({ url }) => {
  return (
    <Link to={url}>
      <Tooltip title="Time">
        <IconButton>
          <AccessTimeIcon />
        </IconButton>
      </Tooltip>
    </Link>
  );
};
