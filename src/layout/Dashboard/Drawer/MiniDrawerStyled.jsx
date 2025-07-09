import Drawer from '@mui/material/Drawer';
import { alpha, styled } from '@mui/material/styles';

import { DRAWER_WIDTH, HEADER_HEIGHT } from 'config';

const openedMixin = (theme) => {
  return {
    width: DRAWER_WIDTH,
    borderRight: `1px solid ${alpha(theme.palette.divider, theme.palette.mode === 'dark' ? 0.08 : 0.06)}`,
    transition: theme.transitions.create(['width', 'box-shadow', 'border'], {
      easing: theme.transitions.easing.easeInOut,
      duration: theme.transitions.duration.standard
    }),
    overflowX: 'hidden',
    boxShadow: theme.palette.mode === 'dark' ? theme.customShadows?.drawer?.sm : '0 3px 10px 0 rgba(0, 0, 0, 0.03)',
    background: theme.palette.background.paper,
    '&:before': {
      content: '""',
      position: 'absolute',
      width: 3,
      height: '30%',
      top: '35%',
      left: 0,
      backgroundColor: theme.palette.secondary.main, // GIB Yellow
      opacity: 0,
      borderRadius: '0 2px 2px 0',
      transition: theme.transitions.create(['opacity', 'height', 'top'], {
        duration: theme.transitions.duration.standard
      }),
      pointerEvents: 'none'
    },
    '&:hover:before': {
      opacity: 0.1,
      height: '40%',
      top: '30%'
    },
    [theme.breakpoints.down('lg')]: {
      top: HEADER_HEIGHT,
      height: `calc(100vh - ${HEADER_HEIGHT}px)`
    }
  };
};

const closedMixin = (theme) => {
  return {
    transition: theme.transitions.create(['width', 'box-shadow', 'border'], {
      easing: theme.transitions.easing.easeInOut,
      duration: theme.transitions.duration.standard
    }),
    overflowX: 'hidden',
    width: theme.spacing(7.5),
    borderRight: `1px solid ${alpha(theme.palette.divider, theme.palette.mode === 'dark' ? 0.05 : 0.04)}`,
    boxShadow: theme.palette.mode === 'dark' ? theme.customShadows?.drawer?.xs : '0 2px 8px 0 rgba(0, 0, 0, 0.02)',
    background: theme.palette.background.paper,
    '&:before': {
      content: '""',
      position: 'absolute',
      width: 3,
      height: '15%',
      top: '42.5%',
      left: 0,
      backgroundColor: theme.palette.secondary.main, // GIB Yellow
      opacity: 0,
      borderRadius: '0 2px 2px 0',
      transition: theme.transitions.create(['opacity', 'height', 'top'], {
        duration: theme.transitions.duration.standard
      }),
      pointerEvents: 'none'
    },
    '&:hover:before': {
      opacity: 0.1,
      height: '25%',
      top: '37.5%'
    },
    [theme.breakpoints.down('lg')]: {
      width: 0,
      top: HEADER_HEIGHT,
      height: `calc(100vh - ${HEADER_HEIGHT}px)`
    }
  };
};

const MiniDrawerStyled = styled(Drawer, { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open }) => ({
  width: DRAWER_WIDTH,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  zIndex: theme.zIndex.drawer,
  transition: theme.transitions.create(['width', 'box-shadow'], {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.standard
  }),
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
