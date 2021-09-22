import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import { IconButton } from '@mui/material';
import React from 'react';

interface Props {
  active?: boolean;
  onClick: () => void;
}

export const PublishButton: React.FC<Props> = ({ active, onClick }) => {
  return (
    <IconButton onClick={onClick}>
      <CheckCircleOutlinedIcon color={active ? 'success' : 'action'} />
    </IconButton>
  );
};
