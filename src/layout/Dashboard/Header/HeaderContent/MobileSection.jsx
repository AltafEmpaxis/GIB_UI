import { useRef, useState } from 'react';

import { Icon } from '@iconify/react';
import { AppBar, Box, ClickAwayListener, IconButton, Paper, Popper, Toolbar, Fade } from '@mui/material';
import { useTheme } from '@mui/material/styles';

import Profile from './Profile';
import Search from './Search';

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
          <Icon icon="eva:more-vertical-fill" width={20} />
        </IconButton>
      </Box>
      <Popper
        placement="bottom"
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal={false}
        sx={{
          zIndex: theme.zIndex.popup,
          width: '100%'
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

                    width: '100%'
                  }}
                >
                  <Toolbar sx={{ width: '100%', justifyContent: 'space-between', alignItems: 'center', px: 2 }}>
                    <Search />
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
