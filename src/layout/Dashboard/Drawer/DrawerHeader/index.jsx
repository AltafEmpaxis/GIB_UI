import { Box, alpha, useTheme } from '@mui/material';
import PropTypes from 'prop-types';

import LogoSection from 'components/logo/index';

import DrawerHeaderStyled from './DrawerHeaderStyled';

const DrawerHeader = ({ open }) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  return (
    <DrawerHeaderStyled open={open}>
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          justifyContent: open ? 'flex-start' : 'center',
          alignItems: 'center',
          height: '100%',
          position: 'relative',
          '&:after': {
            content: '""',
            position: 'absolute',
            bottom: 0,
            left: '10%',
            right: '10%',
            height: '1px',
            background: isDark
              ? `linear-gradient(90deg, ${alpha(theme.palette.divider, 0)}, ${alpha(theme.palette.divider, 0.1)}, ${alpha(theme.palette.divider, 0)})`
              : `linear-gradient(90deg, ${alpha(theme.palette.divider, 0)}, ${alpha(theme.palette.divider, 0.15)}, ${alpha(theme.palette.divider, 0)})`
          }
        }}
      >
        <LogoSection collapsed={!open} />
      </Box>
    </DrawerHeaderStyled>
  );
};

DrawerHeader.propTypes = {
  open: PropTypes.bool
};

export default DrawerHeader;
