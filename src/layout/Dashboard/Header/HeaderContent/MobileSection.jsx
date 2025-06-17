import { useRef, useState, useCallback, useEffect } from 'react';

import { Icon } from '@iconify/react';
import {
  AppBar,
  Box,
  ClickAwayListener,
  Fade,
  IconButton,
  Paper,
  Popper,
  Toolbar,
  Tooltip,
  Stack
} from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';

import useConfig from 'hooks/useConfig';
import NotificationSection from './NotificationSection';
import Profile from './Profile';

const MobileSection = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const { mode, onChangeMode } = useConfig();
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);

  // State for fullscreen
  const [isFullscreen, setIsFullscreen] = useState(document.fullscreenElement !== null);

  // Toggle theme
  const toggleTheme = () => {
    const newMode = mode === 'light' ? 'dark' : 'light';
    onChangeMode(newMode);
  };

  // Toggle fullscreen
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((e) => {
        console.error(`Error attempting to enable fullscreen: ${e.message}`);
      });
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  // Update fullscreen state when it changes
  const handleFullscreenChange = useCallback(() => {
    setIsFullscreen(document.fullscreenElement !== null);
  }, []);

  useEffect(() => {
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, [handleFullscreenChange]);

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
            bgcolor: open ? theme.palette.action.selected : 'transparent',
            borderRadius: 1.5,
            width: 40,
            height: 40,
            transition: 'all 0.2s ease-in-out',
            '&:hover': {
              bgcolor: isDark ? alpha(theme.palette.primary.main, 0.15) : alpha(theme.palette.primary.lighter, 0.5)
            }
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
            <Paper
              sx={{
                boxShadow: theme.customShadows.z1,
                borderRadius: theme.shape.borderRadius,
                border: `1px solid ${alpha(theme.palette.divider, 0.1)}`
              }}
            >
              <ClickAwayListener onClickAway={handleClose}>
                <AppBar
                  color="inherit"
                  sx={{
                    boxShadow: 'none',
                    minWidth: 250
                  }}
                >
                  <Toolbar sx={{ justifyContent: 'space-between', alignItems: 'center', px: 2 }}>
                    <Profile />

                    <Stack direction="row" spacing={1} alignItems="center">
                      {/* Notification */}
                      <NotificationSection />

                      {/* Dark/Light Mode Toggle */}
                      <Tooltip title={`Switch to ${mode === 'light' ? 'dark' : 'light'} mode`}>
                        <IconButton
                          onClick={toggleTheme}
                          color="secondary"
                          sx={{
                            color: theme.palette.text.primary,
                            bgcolor: 'transparent',
                            borderRadius: 1.5,
                            width: 40,
                            height: 40,
                            '&:hover': {
                              bgcolor: isDark
                                ? alpha(theme.palette.primary.main, 0.15)
                                : alpha(theme.palette.primary.lighter, 0.5)
                            }
                          }}
                        >
                          {isDark ? (
                            <Icon icon="solar:sun-bold-duotone" width={24} height={24} />
                          ) : (
                            <Icon icon="solar:moon-bold-duotone" width={24} height={24} />
                          )}
                        </IconButton>
                      </Tooltip>

                      {/* Fullscreen Toggle */}
                      <Tooltip title={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}>
                        <IconButton
                          onClick={toggleFullscreen}
                          color="secondary"
                          sx={{
                            color: theme.palette.text.primary,
                            bgcolor: 'transparent',
                            borderRadius: 1.5,
                            width: 40,
                            height: 40,
                            '&:hover': {
                              bgcolor: isDark
                                ? alpha(theme.palette.primary.main, 0.15)
                                : alpha(theme.palette.primary.lighter, 0.5)
                            }
                          }}
                        >
                          {isFullscreen ? (
                            <Icon icon="solar:exit-bold-duotone" width={22} height={22} />
                          ) : (
                            <Icon icon="solar:full-screen-bold-duotone" width={22} height={22} />
                          )}
                        </IconButton>
                      </Tooltip>
                    </Stack>
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
