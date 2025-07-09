// material-ui
import { Icon } from '@iconify/react';
import { Box, IconButton, Stack, Tooltip } from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';
import { useCallback, useEffect, useState } from 'react';

// project import
import useConfig from 'hooks/useConfig';
import NotificationSection from './HeaderContent/NotificationSection';
import UserProfile from './HeaderContent/Profile';

// ==============================|| HEADER - CONTENT ||============================== //

const HeaderContent = () => {
  const { mode, onChangeMode } = useConfig();
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

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

  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end'
      }}
    >
      {/* Action Buttons */}
      <Stack direction="row" spacing={1} alignItems="center" sx={{ mr: 1 }}>
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
              borderRadius: 1,
              width: 40,
              height: 40,
              transition: 'all 0.2s ease-in-out',
              '&:hover': {
                bgcolor: isDark ? alpha(theme.palette.secondary.main, 0.15) : alpha(theme.palette.secondary.main, 0.1)
              }
            }}
          >
            {theme.palette.mode === 'dark' ? (
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
              borderRadius: 1,
              width: 40,
              height: 40,
              transition: 'all 0.2s ease-in-out',
              '&:hover': {
                bgcolor: isDark ? alpha(theme.palette.secondary.main, 0.15) : alpha(theme.palette.secondary.main, 0.1)
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

      {/* Profile Section */}
      <UserProfile />
    </Box>
  );
};

export default HeaderContent;
