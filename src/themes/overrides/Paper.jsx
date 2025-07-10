// material-ui
import { alpha } from '@mui/material/styles';

// ==============================|| OVERRIDES - PAPER ||============================== //

export default function Paper(theme) {
  const isDark = theme.palette.mode === 'dark';

  return {
    MuiPaper: {
      defaultProps: {
        elevation: 0
      },
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          backgroundColor: theme.palette.background.paper,
          transition: theme.transitions.create(['background-color', 'box-shadow', 'border-color'], {
            duration: theme.transitions.duration.shorter
          }),
          '&[href]': {
            textDecorationLine: 'none'
          },
          '&.MuiPaper-outlined': {
            borderColor: isDark ? alpha(theme.palette.common.white, 0.15) : theme.palette.divider
          }
        },
        outlined: {
          borderColor: isDark ? alpha(theme.palette.common.white, 0.15) : theme.palette.divider,
          background: theme.palette.background.paper
        },
        elevation: {
          '&.MuiPaper-elevation0': {
            boxShadow: 'none'
          },
          '&.MuiPaper-elevation1': {
            boxShadow: isDark ? theme.customShadows?.z1 : theme.shadows[1]
          },
          '&.MuiPaper-elevation4': {
            boxShadow: isDark ? theme.customShadows?.z8 : theme.shadows[4]
          },
          '&.MuiPaper-elevation8': {
            boxShadow: isDark ? theme.customShadows?.z12 : theme.shadows[8]
          },
          '&.MuiPaper-elevation12': {
            boxShadow: isDark ? theme.customShadows?.z16 : theme.shadows[12]
          },
          '&.MuiPaper-elevation16': {
            boxShadow: isDark ? theme.customShadows?.z20 : theme.shadows[16]
          },
          '&.MuiPaper-elevation20': {
            boxShadow: isDark ? theme.customShadows?.z24 : theme.shadows[20]
          },
          '&.MuiPaper-elevation24': {
            boxShadow: isDark ? theme.customShadows?.z24 : theme.shadows[24]
          }
        }
      }
    }
  };
}
