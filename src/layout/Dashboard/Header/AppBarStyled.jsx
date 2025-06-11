import MuiAppBar from '@mui/material/AppBar';
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';

import { DRAWER_WIDTH } from 'config';

const AppBarStyled = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open'
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.text.primary,
  height: theme.mixins.toolbar.minHeight,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.shorter
  }),
  boxShadow: 'none',
  borderBottom: `1px solid ${theme.palette.divider}`,

  [theme.breakpoints.up('lg')]: {
    width: `calc(100% - ${open ? DRAWER_WIDTH : theme.spacing(7.5)}px)`,
    marginLeft: open ? DRAWER_WIDTH : theme.spacing(7.5)
  },

  [theme.breakpoints.down('lg')]: {
    width: '100%',
    marginLeft: 0,
    position: 'fixed',
    top: 0,
    left: 0
  }
}));

AppBarStyled.propTypes = {
  open: PropTypes.bool
};

export default AppBarStyled;
