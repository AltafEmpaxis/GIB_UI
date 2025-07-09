import { Box, alpha, useTheme } from '@mui/material';

import SimpleBar from 'components/@extended/SimpleBar';
import { HEADER_HEIGHT } from 'config';

import Navigation from './Navigation';

const DrawerContent = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        height: `calc(100vh - ${HEADER_HEIGHT}px)`,
        overflow: 'hidden',
        position: 'relative',
        transition: theme.transitions.create(['background', 'box-shadow'], {
          duration: theme.transitions.duration.standard
        }),
        '&:after': {
          content: '""',
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          height: '60px',
          background: `linear-gradient(to top,
            ${theme.palette.background.paper},
            ${alpha(theme.palette.background.paper, 0)})`,
          zIndex: 2,
          pointerEvents: 'none',
          opacity: 0.9
        },
        '&:before': {
          content: '""',
          position: 'absolute',
          left: 0,
          right: 0,
          top: 0,
          height: '30px',
          background: `linear-gradient(to bottom,
            ${theme.palette.background.paper},
            ${alpha(theme.palette.background.paper, 0)})`,
          zIndex: 2,
          pointerEvents: 'none',
          opacity: 0.7
        }
      }}
    >
      <SimpleBar
        sx={{
          '& .simplebar-content': {
            display: 'flex',
            flexDirection: 'column'
          },
          '& .simplebar-scrollbar': {
            width: '4px'
          }
        }}
      >
        <Navigation />
      </SimpleBar>
    </Box>
  );
};

export default DrawerContent;
