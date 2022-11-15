import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
import { Tooltip } from '@mui/material';
import React from 'react';

interface Props {
  status?: boolean | null;
  notes?: string | null;
}

export const StatusIcon: React.FC<Props> = ({ status, notes }) => {
  if (status == null) {
    return null;
  }

  return (
    <Tooltip title={notes}>
      <span>
        {status ? <CheckCircleOutlinedIcon color="success" /> : <CancelOutlinedIcon color="error" />}
        {notes && <ErrorOutlineOutlinedIcon color="warning" />}
      </span>
    </Tooltip>
  );
};
