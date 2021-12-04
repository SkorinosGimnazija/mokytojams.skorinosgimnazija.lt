import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import StarOutlinedIcon from '@mui/icons-material/StarOutlined';
import { IconButton, Tooltip } from '@mui/material';
import React from 'react';

interface Props {
  active?: boolean;
  onClick: () => void;
}

export const FeatureButton: React.FC<Props> = ({ active, onClick }) => {
  return (
    <Tooltip title="Featured">
      <IconButton onClick={onClick}>
        {active ? <StarOutlinedIcon color="warning" /> : <StarBorderOutlinedIcon />}
      </IconButton>
    </Tooltip>
  );
};
