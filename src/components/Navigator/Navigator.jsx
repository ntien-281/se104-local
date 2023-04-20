import { NavLink } from 'react-router-dom';
import { publicRoutes } from '../Router/routes';
import { useState } from 'react';
import { CssBaseline, List, ListItemButton } from '@mui/material';
import { Box, Drawer, Icon, ToggleButtonGroup, ToggleButton, Typography } from '@mui/material';

const Navigator = () => {
  let drawerWidth = 250;
  let buttonWidth = 200;
  let iconSize = 25;
  const [view, setView] = useState(0);
  const handleChange = (event, nextView) => {
    if (nextView !== null) setView(nextView);
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
                <Typography sx={{ fontSize: '1.25rem' }}>{route.name}</Typography>
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
        </Drawer>
      </Box>
    </>
  );
};

export default Navigator;
