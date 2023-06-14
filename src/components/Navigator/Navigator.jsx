import { NavLink } from 'react-router-dom';
import { publicRoutes } from '../Router/routes';
import { useState } from 'react';
import { CssBaseline, Box, Drawer, Icon, ToggleButtonGroup, ToggleButton, Typography } from '@mui/material';
import { ControlButton } from '../Controls';
import LogoutModal from '../Modal/LogoutModal';

const Navigator = () => {
  const drawerWidth = 250;
  const buttonWidth = 200;
  const buttonHeight = 36;
  const iconSize = 24;
  const [view, setView] = useState(0);
  const [open, setOpen] = useState(false);
  const handleChange = (event, nextView) => {
    if (nextView !== null) setView(nextView);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Box>
        <CssBaseline />
        <Drawer variant="permanent" anchor="left">
          <ToggleButtonGroup
            orientation="vertical"
            value={view}
            exclusive
            onChange={handleChange}
            sx={{
              width: drawerWidth,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '20px',
            }}
          >
            {publicRoutes.map((route, index) => (
              <ToggleButton
                key={index}
                component={NavLink}
                to={route.path}
                element={<route.component />}
                value={index}
                aria-label={index}
                color="primary"
                sx={{ width: buttonWidth, display: 'flex', justifyContent: 'flex-start' }}
              >
                <Icon sx={{ width: iconSize, height: iconSize, marginLeft: '5px', marginRight: '10px' }}>
                  <route.icon sx={{ width: iconSize, height: iconSize }} />
                </Icon>
                <Typography sx={{ fontSize: '1.2rem' }}>{route.name}</Typography>
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
          <Box width={drawerWidth} sx={{ display: 'flex', justifyContent: 'center' }}>
            <ControlButton
              variant="contained"
              width={buttonWidth}
              height={buttonHeight}
              fontSize="1.2rem"
              color="error"
              onClick={handleOpen}
            >
              Đăng xuất
            </ControlButton>
            <LogoutModal open={open} onClose={handleClose} />
          </Box>
        </Drawer>
      </Box>
    </>
  );
};

export default Navigator;
