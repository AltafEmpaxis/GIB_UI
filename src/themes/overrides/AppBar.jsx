import { HEADER_HEIGHT } from 'config';
import { alpha } from '@mui/material/styles';

// ==============================|| OVERRIDES - APP BAR ||============================== //

export default function AppBar(theme) {
  const isDark = theme.palette.mode === 'dark';

  return {
    MuiAppBar: {
      styleOverrides: {
        root: {
          height: HEADER_HEIGHT,
          minHeight: HEADER_HEIGHT,
          backgroundColor: isDark ? alpha(theme.palette.background.paper, 0.98) : theme.palette.background.paper,
          color: theme.palette.text.primary,
          transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.shorter
          }),
          borderBottom: `1px solid ${theme.palette.divider}`,
          '&.MuiAppBar-colorDefault': {
            backgroundColor: isDark ? alpha(theme.palette.background.paper, 0.98) : theme.palette.background.paper,
            color: theme.palette.text.primary
          }
        }
      }
    }
  };
}
