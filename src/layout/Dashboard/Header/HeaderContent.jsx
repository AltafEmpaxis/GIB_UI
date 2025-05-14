// material-ui
import { Box, Divider, Stack, useMediaQuery, useTheme } from '@mui/material';

// project import
import useConfig from 'hooks/useConfig';

import MobileSection from './HeaderContent/MobileSection';
import Profile from './HeaderContent/Profile';
import Search from './HeaderContent/Search';

// ==============================|| HEADER - CONTENT ||============================== //

const HeaderContent = () => {
  const { mode, onChangeMode } = useConfig();
  const theme = useTheme();
  const matchDownLG = useMediaQuery(theme.breakpoints.down('lg'));

  const toggleTheme = () => {
    const newMode = mode === 'light' ? 'dark' : 'light';
    onChangeMode(newMode);
  };

  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}
    >
      {/* Left Section - Search */}
      <Box sx={{ display: 'flex', alignItems: 'center', width: matchDownLG ? 'auto' : '100%' }}>
        {!matchDownLG && (
          <>
            <Search />
            <Box sx={{ flexGrow: 1 }} />
          </>
        )}
      </Box>

      {/* Right Section - Theme Toggle & Profile/Mobile */}
      <Stack
        direction="row"
        spacing={1}
        alignItems="center"
        divider={<Divider orientation="vertical" variant="middle" flexItem />}
      >
        {/* Theme Toggle */}
        {/* <Tooltip title={`Switch to ${mode === 'dark' ? 'light' : 'dark'} mode`}>
          <IconButton
            onClick={toggleTheme}
            color="secondary"
            sx={{
              background: alpha(theme.palette.grey[400], 0.2)
            }}
          >
            <Icon
              icon={mode === 'dark' ? 'line-md:sun-rising-filled-loop' : 'line-md:moon-filled-alt-loop'}
              width={24}
              height={24}
            />
          </IconButton>
        </Tooltip>

        <FullscreenToggle /> */}

        {/* Profile/Mobile Section */}
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {!matchDownLG ? <Profile /> : <MobileSection />}
        </Box>
      </Stack>
    </Box>
  );
};

export default HeaderContent;
