import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import { IconButton, Tooltip } from '@mui/material';
import React from 'react';

interface Props {
  active?: boolean;
}

export const EnabledIcon: React.FC<Props> = ({ active }) => {
  if (active) {
    return <CheckCircleOutlinedIcon sx={{ display: 'block' }} color="success" />;
  }

  return <CircleOutlinedIcon sx={{ display: 'block' }} />;
};
