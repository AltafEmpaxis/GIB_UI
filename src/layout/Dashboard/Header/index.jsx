import { Icon } from '@iconify/react';
import { AppBar, IconButton, Toolbar, useMediaQuery } from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';
import PropTypes from 'prop-types';

// material-ui

// project import
import AppBarStyled from './AppBarStyled';
import HeaderContent from './HeaderContent';

// assets

// ==============================|| MAIN LAYOUT - HEADER ||============================== //

const Header = ({ open, handleDrawerToggle }) => {
  const theme = useTheme();
  const matchDownMD = useMediaQuery(theme.breakpoints.down('lg'));

  // common header
  const mainHeader = (
    <Toolbar
      sx={{
        px: { xs: 2, sm: 3, lg: 4 },
        minHeight: theme.mixins.toolbar.minHeight,
        transition: theme.transitions.create('all'),
        justifyContent: 'space-between' // Use space-between to distribute items evenly
      }}
    >
      {/* Left - Hamburger Menu */}
      <IconButton
        disableRipple
        aria-label="open drawer"
        onClick={handleDrawerToggle}
        edge="start"
        color="secondary"
        size="medium"
      >
        {open ? (
          <Icon icon="solar:close-square-bold-duotone" width={24} height={24} />
        ) : (
          <Icon icon="solar:list-bold-duotone" width={24} height={24} />
        )}
      </IconButton>

      {/* Right - Profile controls */}
      <HeaderContent />
    </Toolbar>
  );

  // app-bar params
  const appBar = {
    position: 'fixed',
    color: 'inherit',
    elevation: 0,
    sx: {
      backgroundColor: theme.palette.background.paper,
      boxShadow: 'none',
      borderBottom: `1px solid ${theme.palette.divider}`
    }
  };

  return (
    <>
      {!matchDownMD ? (
        <AppBarStyled open={open} {...appBar}>
          {mainHeader}
        </AppBarStyled>
      ) : (
        <AppBar {...appBar}>{mainHeader}</AppBar>
      )}
    </>
  );
};

Header.propTypes = {
  open: PropTypes.bool,
  handleDrawerToggle: PropTypes.func
};

export default Header;
