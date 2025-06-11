import { useRef, useState } from 'react';

import { Icon } from '@iconify/react';
import { AppBar, Box, ClickAwayListener, Fade, IconButton, Paper, Popper, Toolbar } from '@mui/material';
import { useTheme } from '@mui/material/styles';

// import MenuItems from './MenuItems';
import Profile from './Profile';

const MobileSection = () => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  return (
    <>
      <Box sx={{ ml: 1, flexShrink: 0 }}>
        <IconButton
          ref={anchorRef}
          aria-controls={open ? 'menu-list-grow' : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
          sx={{
            color: theme.palette.text.primary,
            bgcolor: open ? theme.palette.action.selected : 'transparent'
          }}
        >
          <Icon icon={open ? 'solar:close-square-bold-duotone' : 'solar:list-bold-duotone'} width={24} height={24} />
        </IconButton>
      </Box>
      <Popper
        placement="bottom-end"
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal={false}
        sx={{
          zIndex: theme.zIndex.popup,
          width: 'auto'
        }}
      >
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <AppBar
                  color="inherit"
                  sx={{
                    boxShadow: 'none',
                    minWidth: 250
                  }}
                >
                  <Toolbar sx={{ justifyContent: 'center', alignItems: 'center', px: 2 }}>
                    <Profile />
                  </Toolbar>
                </AppBar>
              </ClickAwayListener>
            </Paper>
          </Fade>
        )}
      </Popper>
    </>
  );
};

export default MobileSection;
