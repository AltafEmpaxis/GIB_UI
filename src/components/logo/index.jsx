import { ButtonBase, Stack } from '@mui/material';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { HEADER_HEIGHT } from 'config';

import Logo from './LogoMain';

// ==============================|| MAIN LOGO ||============================== //

const LogoSection = ({ sx, to, collapsed = false }) => {
  // Logo aspect ratio is approximately 3.4:1 (3238:951)
  // Calculate logo size based on header height with minimal padding
  const headerPadding = 6; // 3px padding on top and bottom
  const maxLogoHeight = HEADER_HEIGHT - headerPadding;
  const logoHeight = collapsed ? 52 : maxLogoHeight;
  const logoWidth = collapsed ? 52 : Math.round(logoHeight * 3.4); // Maintain aspect ratio

  return (
    <ButtonBase
      disableRipple
      component={Link}
      to={!to ? '/dashboard' : to}
      sx={{
        width: '100%',
        p: collapsed ? 0.25 : 0.5,
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
          height: '100%',
          minHeight: collapsed ? 52 : HEADER_HEIGHT - 6
        }}
      >
        {/* <Logo collapsed={collapsed} /> */}
        {/* To use the GIB image logo */}
        <Logo
          useImage={true}
          width={logoWidth}
          height={logoHeight}
          className="gib-primary-text"
          sx={{
            maxWidth: collapsed ? '52px' : '280px',
            maxHeight: `${maxLogoHeight}px`,
            objectFit: 'contain'
          }}
        />
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
