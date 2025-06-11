import { ButtonBase, Stack } from '@mui/material';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

import Logo from './LogoMain';

// ==============================|| MAIN LOGO ||============================== //

const LogoSection = ({ sx, to, collapsed = false }) => {
  return (
    <ButtonBase
      disableRipple
      component={Link}
      to={!to ? '/dashboard' : to}
      sx={{
        width: '100%',
        p: collapsed ? 0.5 : 1,
        display: 'flex',
        justifyContent: collapsed ? 'center' : 'flex-start',
        ...sx
      }}
    >
      <Stack
        direction="row"
        spacing={collapsed ? 0 : 1}
        alignItems="center"
        justifyContent={collapsed ? 'center' : 'flex-start'}
        sx={{
          width: '100%',
          minHeight: collapsed ? 40 : 55
        }}
      >
        {/* <Logo collapsed={collapsed} /> */}
        {/* To use the GIB image logo */}
        <Logo useImage={true} height="60px" className="gib-primary-text" sx={{ maxWidth: '180px' }} />
      </Stack>
    </ButtonBase>
  );
};

LogoSection.propTypes = {
  sx: PropTypes.object,
  to: PropTypes.string,
  collapsed: PropTypes.bool
};

export default LogoSection;
