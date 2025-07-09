import { alpha } from '@mui/material/styles';
import { HEADER_HEIGHT } from 'config';

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
          color: theme.palette.primary.main, // Dark Grey text
          transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.shorter
          }),
          borderBottom: `1px solid ${alpha(theme.palette.divider, 0.12)}`,
          '&.MuiAppBar-colorDefault': {
            backgroundColor: isDark ? alpha(theme.palette.background.paper, 0.98) : theme.palette.background.paper,
            color: theme.palette.primary.main // Dark Grey text
          },
          // GIB specific AppBar styles
          '&.MuiAppBar-colorPrimary': {
            backgroundColor: theme.palette.primary.main, // Dark Grey
            color: theme.palette.common.white
          },
          '&.MuiAppBar-colorSecondary': {
            backgroundColor: theme.palette.secondary.main, // GIB Yellow
            color: theme.palette.primary.main // Dark Grey text on yellow
          },
          // Elevation styles
          '&.MuiPaper-elevation0': {
            boxShadow: 'none',
            borderBottom: `1px solid ${alpha(theme.palette.divider, 0.12)}`
          },
          '&.MuiPaper-elevation1': {
            boxShadow: `0 2px 4px ${alpha(theme.palette.common.black, 0.08)}`
          }
        }
      }
    }
  };
}
