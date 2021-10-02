import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';
import { ListItemButton } from '@mui/material';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import React from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { hideDrawer } from '../drawer/drawerSlice';

interface Props {
  name: string;
  slug: string;
}

export const NavigationButton: React.FC<Props> = ({ name, slug }) => {
  const dispatch = useAppDispatch();

  return (
    <>
      <ListItemButton component={Link} to={slug} onClick={() => dispatch(hideDrawer())}>
        <ListItemIcon>
          <ArrowForwardIosOutlinedIcon color="primary" fontSize="small" />
        </ListItemIcon>
        <ListItemText primary={name} />
      </ListItemButton>
    </>
  );
};
