// material-ui
import { alpha } from '@mui/material/styles';

// ==============================|| OVERRIDES - PAPER ||============================== //

export default function Paper(theme, customShadows) {
  const isDark = theme.palette.mode === 'dark';

  return {
    MuiPaper: {
      defaultProps: {
        elevation: 0
      },
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          backgroundColor: isDark ? alpha(theme.palette.background.paper, 0.98) : theme.palette.background.paper,
          transition: theme.transitions.create(['background-color', 'box-shadow', 'border-color'], {
            duration: theme.transitions.duration.shorter
          }),
          '&[href]': {
            textDecorationLine: 'none'
          },
          '&.MuiPaper-outlined': {
            borderColor: theme.palette.divider
          }
        },
        outlined: {
          borderColor: theme.palette.divider,
          background: isDark ? alpha(theme.palette.background.paper, 0.98) : theme.palette.background.paper
        },
        elevation: {
          '&.MuiPaper-elevation0': {
            boxShadow: 'none'
          },
          '&.MuiPaper-elevation1': {
            boxShadow: customShadows.z1
          },
          '&.MuiPaper-elevation4': {
            boxShadow: customShadows.z4
          },
          '&.MuiPaper-elevation8': {
            boxShadow: customShadows.z8
          },
          '&.MuiPaper-elevation12': {
            boxShadow: customShadows.z12
          },
          '&.MuiPaper-elevation16': {
            boxShadow: customShadows.z16
          },
          '&.MuiPaper-elevation20': {
            boxShadow: customShadows.z20
          },
          '&.MuiPaper-elevation24': {
            boxShadow: customShadows.z24
          }
        }
      }
    }
  };
}
