import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';
import { ListItem, ListItemButton } from '@mui/material';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import React from 'react';
import { Link, useMatch } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { hideDrawer } from '../../store/drawerSlice';

interface Props {
  name: string;
  slug: string;
}

export const NavigationButton: React.FC<Props> = ({ name, slug }) => {
  const dispatch = useAppDispatch();
  const routeMatch = useMatch({ path: slug, end: false });

  return (
    <ListItem sx={{ paddingY: 0 }}>
      <ListItemButton
        selected={Boolean(routeMatch)}
        component={Link}
        to={slug}
        sx={{ borderRadius: 2 }}
        onClick={() => dispatch(hideDrawer())}
      >
        <ListItemIcon sx={{ minWidth: '2rem' }}>
          <ArrowForwardIosOutlinedIcon color="primary" fontSize="small" />
        </ListItemIcon>
        <ListItemText primary={name} />
      </ListItemButton>
    </ListItem>
  );
};
