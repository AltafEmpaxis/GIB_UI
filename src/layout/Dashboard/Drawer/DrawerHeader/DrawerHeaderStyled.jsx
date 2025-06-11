// material-ui
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

import { HEADER_HEIGHT } from 'config';

const DrawerHeaderStyled = styled(Box, { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open }) => ({
  ...theme.mixins.toolbar,
  height: HEADER_HEIGHT,
  minHeight: HEADER_HEIGHT,
  display: 'flex',
  alignItems: 'center',
  justifyContent: open ? 'flex-start' : 'center',
  padding: theme.spacing(open ? 0.5 : 1),
  backgroundColor: theme.palette.background.paper,
  borderBottom: `1px solid ${theme.palette.divider}`,
  transition: theme.transitions.create(['height', 'min-height', 'padding'], {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter
  })
}));

export default DrawerHeaderStyled;
