// material-ui
import { Box, Stack, useMediaQuery, useTheme } from '@mui/material';

// project import
import useConfig from 'hooks/useConfig';

import MobileSection from './HeaderContent/MobileSection';
import Profile from './HeaderContent/Profile';

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
        justifyContent: 'flex-end'
      }}
    >
      {/* Right Section - Profile/Mobile */}
      <Stack direction="row" spacing={1} alignItems="center">
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {!matchDownLG ? <Profile /> : <MobileSection />}
        </Box>
      </Stack>
    </Box>
  );
};

export default HeaderContent;
