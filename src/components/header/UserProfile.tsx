import Logout from '@mui/icons-material/Logout';
import { ListItem } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useLogoutMutation } from '../../services/generated.api';

export const UserProfile = () => {
  const auth = useAuth();
  const [logout] = useLogoutMutation();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  if (!auth.isAuthenticated) {
    return null;
  }

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <React.Fragment>
      <Box alignItems="center" display="flex">
        <IconButton onClick={handleClick} size="small" sx={{ ml: 2 }}>
          <Avatar sx={{ bgcolor: (theme) => theme.palette.secondary.main }}>
            {auth.userName?.[0]}
          </Avatar>
        </IconButton>
      </Box>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{ sx: { mt: 1.5 } }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <ListItem>
          <Typography component="span">{auth.userName}</Typography>
        </ListItem>
        <Divider />
        <MenuItem onClick={() => logout()}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Atsijungti
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
};
