import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
import { Link, Tooltip } from '@mui/material';
import React from 'react';

interface Props {
  status?: boolean | null;
  notes?: string | null;
}

const tooltipTitle = (notes?: string | null) => {
  if (notes == null || notes.length === 0) {
    return null;
  }

  if (notes.startsWith('http')) {
    return (
      <Link
        href={notes}
        color="inherit"
        target="_blank"
        rel="noreferrer noopener"
        onClick={(e) => e.stopPropagation()}
      >
        {notes}
      </Link>
    );
  }

  return notes;
};

export const StatusIcon: React.FC<Props> = ({ status, notes }) => {
  const StatusIcon = () => {
    if (status === true) {
      return <CheckCircleOutlinedIcon color="success" />;
    }

    if (status === false) {
      return <CancelOutlinedIcon color="error" />;
    }

    return null;
  };

  const NotesIcon = () => {
    if (notes == null || notes.length === 0) {
      return null;
    }

    return <ErrorOutlineOutlinedIcon color="warning" />;
  };

  return (
    <Tooltip title={tooltipTitle(notes)}>
      <span>
        <StatusIcon />
        <NotesIcon />
      </span>
    </Tooltip>
  );
};
