import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import { IconButton, Tooltip } from '@mui/material';
import React from 'react';

interface Props {
  active?: boolean;
  onClick: () => void;
}

export const PublishButton: React.FC<Props> = ({ active, onClick }) => {
  return (
    <Tooltip title="Published">
      <IconButton onClick={onClick}>
        {active ? <CheckCircleOutlinedIcon color="success" /> : <CircleOutlinedIcon />}
      </IconButton>
    </Tooltip>
  );
};
