import { alpha, Box, useTheme } from '@mui/material';
import PropTypes from 'prop-types';

import LogoSection from 'components/logo/index';

import DrawerHeaderStyled from './DrawerHeaderStyled';

const DrawerHeader = ({ open }) => {
  const theme = useTheme();

  return (
    <DrawerHeaderStyled open={open}>
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          justifyContent: open ? 'center' : 'center',
          alignItems: 'center',
          height: '100%',
          position: 'relative',
          px: open ? 0 : 0.25,
          '&:after': {
            content: '""',
            position: 'absolute',
            bottom: 0,
            left: '10%',
            right: '10%',
            height: '1px',
            background: `linear-gradient(90deg, ${alpha(theme.palette.divider, 0)}, ${alpha(theme.palette.divider, theme.palette.mode === 'dark' ? 0.1 : 0.15)}, ${alpha(theme.palette.divider, 0)})`
          }
        }}
      >
        <LogoSection collapsed={!open} sx={{ width: open ? 'auto' : '100%', p: 0 }} />
      </Box>
    </DrawerHeaderStyled>
  );
};

DrawerHeader.propTypes = {
  open: PropTypes.bool
};

export default DrawerHeader;
