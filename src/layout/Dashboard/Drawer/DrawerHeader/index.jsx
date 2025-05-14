import { Box } from '@mui/material';
import PropTypes from 'prop-types';

import LogoSection from 'components/logo/index';

import DrawerHeaderStyled from './DrawerHeaderStyled';

const DrawerHeader = ({ open }) => {
  return (
    <DrawerHeaderStyled open={open}>
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          justifyContent: open ? 'flex-start' : 'center',
          alignItems: 'center',
          height: '100%'
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
