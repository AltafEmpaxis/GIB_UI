import { Box, alpha, useTheme } from '@mui/material';

import SimpleBar from 'components/@extended/SimpleBar';
import { HEADER_HEIGHT } from 'config';

import Navigation from './Navigation';

const DrawerContent = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  return (
    <Box
      sx={{
        height: `calc(100vh - ${HEADER_HEIGHT}px)`,
        overflow: 'hidden',
        position: 'relative',
        '&:after': {
          content: '""',
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          height: '40px',
          background: `linear-gradient(to top, ${theme.palette.background.paper}, ${alpha(theme.palette.background.paper, 0)})`,
          zIndex: 2,
          pointerEvents: 'none'
        }
      }}
    >
      <SimpleBar
        sx={{
          '& .simplebar-content': {
            display: 'flex',
            flexDirection: 'column'
          },
          '& .simplebar-scrollbar:before': {
            background: isDark ? alpha(theme.palette.primary.light, 0.35) : alpha(theme.palette.primary.main, 0.25)
          }
        }}
      >
        <Navigation />
      </SimpleBar>
    </Box>
  );
};

export default DrawerContent;
