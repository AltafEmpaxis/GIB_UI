import Drawer from '@mui/material/Drawer';
import { styled } from '@mui/material/styles';

import { DRAWER_WIDTH, HEADER_HEIGHT } from 'config';

const openedMixin = (theme) => ({
  width: DRAWER_WIDTH,
  borderRight: `1px solid ${theme.palette.divider}`,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.shorter
  }),
  overflowX: 'hidden',
  boxShadow: theme.customShadows.z1,
  backgroundColor: theme.palette.background.paper,
  [theme.breakpoints.down('lg')]: {
    top: HEADER_HEIGHT,
    height: `calc(100vh - ${HEADER_HEIGHT}px)`
  }
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.shorter
  }),
  overflowX: 'hidden',
  width: theme.spacing(7.5),
  borderRight: `1px solid ${theme.palette.divider}`,
  boxShadow: theme.customShadows.z1,
  backgroundColor: theme.palette.background.paper,
  [theme.breakpoints.down('lg')]: {
    width: 0,
    top: HEADER_HEIGHT,
    height: `calc(100vh - ${HEADER_HEIGHT}px)`
  }
});

const MiniDrawerStyled = styled(Drawer, { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open }) => ({
  width: DRAWER_WIDTH,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  zIndex: theme.zIndex.drawer,
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme)
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme)
  }),
  [theme.breakpoints.down('lg')]: {
    position: 'fixed'
  }
}));

export default MiniDrawerStyled;
