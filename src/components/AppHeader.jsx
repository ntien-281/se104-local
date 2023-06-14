import { useState } from 'react';
import { AppBar, Toolbar, Grid, IconButton, Badge } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from '../../store';
import UserModal from './Modal/userModal';

const AppHeader = ({ children }) => {
  const navigate = useNavigate();
  const username = useUserStore((state) => state.username);
  const token = useUserStore((state) => state.token);
  const setUsername = useUserStore((state) => state.setUsername);
  const setPassword = useUserStore((state) => state.setPassword);
  const setToken = useUserStore((state) => state.setToken);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  // User modal
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <AppBar position="sticky" sx={{ width: '100%' }}>
      <Toolbar>
        <Grid container alignItems="center">
          <Grid item>
            <h1>{children}</h1>
          </Grid>
          <Grid item sm></Grid>

          <Grid item sx={{ display: 'flex', justifyContent: "space-between", alignItems: "center" }}>
            <h1>{username}</h1>
            <IconButton onClick={handleLogout}>
              {error ? (
                <Alert severity="error">
                  {errMsg ? errMsg : "Có lỗi xảy ra"}
                </Alert>
              ) : (
                <></>
              )}
              {isLoading ? (
                <Box sx={{ display: "flex" }}>
                  <CircularProgress />
                </Box>
              ) : (
                <></>
              )}
              <Badge>
                <PowerSettingsNewIcon
                  fontSize="large"
                  sx={{ color: "#fff" }}
                />

              </Badge>
            </IconButton>
            <UserModal open={open} onClose={handleClose} />
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default AppHeader;
