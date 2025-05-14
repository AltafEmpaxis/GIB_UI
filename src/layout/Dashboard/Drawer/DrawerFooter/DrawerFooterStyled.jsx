// material-ui
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

const DrawerFooterStyled = styled(Box, { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open }) => ({
  ...theme.mixins.toolbar,
  display: 'flex',
  alignItems: 'center',
  justifyContent: open ? 'flex-start' : 'center',
  padding: theme.spacing(open ? 0.5 : 1),
  backgroundColor: theme.palette.background.paper,
  borderTop: `1px solid ${theme.palette.divider}`,
  transition: theme.transitions.create(['height', 'min-height', 'padding'], {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter
  })
}));

export default DrawerFooterStyled;
