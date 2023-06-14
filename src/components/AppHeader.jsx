import React, { useState } from 'react';
import { AppBar, Toolbar, Grid, IconButton, Badge, Box, CircularProgress, Alert } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from '../../store';
import { logout } from '../api/user';

const AppHeader = ({ children }) => {
  const navigate = useNavigate();
  const username = useUserStore((state) => state.username);
  const token = useUserStore((state) => state.token);
  const setUsername = useUserStore((state) => state.setUsername);
  const setPassword = useUserStore((state) => state.setPassword);
  const setToken = useUserStore((state) => state.setToken);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  return (
    <AppBar position="sticky" sx={{ width: '100%' }}>
      <Toolbar>
        <Grid container alignItems="center">
          <Grid item>
            <h1>{children}</h1>
          </Grid>
          <Grid item sm></Grid>
          <Grid item sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2>{username}</h2>
            <IconButton>
              <Badge>
                <AccountCircleIcon fontSize="medium" sx={{ color: '#fff' }} />
              </Badge>
            </IconButton>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default AppHeader;
