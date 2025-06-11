import { useEffect, useState } from 'react';

import { Backdrop, Box, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Outlet } from 'react-router';

import SessionTimeout from 'components/SessionTimeout/index';
import { DRAWER_WIDTH, HEADER_HEIGHT } from 'config';

import Drawer from './Drawer';
import Header from './Header';

const DashboardLayout = () => {
  const theme = useTheme();
  const matchDownLG = useMediaQuery(theme.breakpoints.down('lg'));
  const [open, setOpen] = useState(!matchDownLG);

  useEffect(() => {
    setOpen(!matchDownLG);
  }, [matchDownLG]);

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  const handleBackdropClick = () => {
    if (matchDownLG) {
      setOpen(false);
    }
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <Header open={open} handleDrawerToggle={handleDrawerToggle} />
      <Drawer open={open} handleDrawerToggle={handleDrawerToggle} />
      {matchDownLG && open && (
        <Backdrop
          open={true}
          onClick={handleBackdropClick}
          sx={{
            zIndex: theme.zIndex.drawer - 1,
            backgroundColor: 'rgba(0, 0, 0, 0.5)'
          }}
        />
      )}
      <Box
        component="main"
        sx={{
          position: 'relative',
          flexGrow: 1,
          width: {
            xs: '100%',
            lg: `calc(100% - ${open ? DRAWER_WIDTH : theme.spacing(7.5)}px)`
          },
          minHeight: '100vh',
          backgroundColor: theme.palette.background.default,
          pt: `${HEADER_HEIGHT}px`,
          ml: { xs: 0, lg: 0 },
          transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.shorter
          })
        }}
      >
        <Box
          sx={{
            p: { xs: 1.25, sm: 1.75, lg: 2.5 },
            minHeight: `calc(100vh - ${HEADER_HEIGHT + 10}px)`,
            backgroundColor: theme.palette.background.default,
            borderRadius: {
              xs: 0,
              lg: `${theme.shape.borderRadius}px ${theme.shape.borderRadius}px 0 0`
            }
          }}
        >
          <Outlet />
        </Box>
      </Box>

      {/* Session Timeout Dialog */}
      <SessionTimeout />
    </Box>
  );
};

export default DashboardLayout;
