// material-ui
import { alpha } from '@mui/material/styles';

// ==============================|| OVERRIDES - BUTTON BASE ||============================== //

export default function ButtonBase(theme) {
  const isDark = theme.palette.mode === 'dark';

  return {
    MuiButtonBase: {
      defaultProps: {
        disableRipple: false
      },
      styleOverrides: {
        root: {
          outline: 'none',
          transition: theme.transitions.create(['background-color', 'box-shadow', 'border-color'], {
            duration: theme.transitions.duration.shorter
          }),
          '&:focus-visible': {
            outline: `2px solid ${alpha(theme.palette.primary.main, 0.5)}`,
            outlineOffset: 2
          },
          '&.MuiListItemButton-root': {
            fontSize: '0.875rem',
            fontWeight: 400,
            padding: '10px 16px',
            borderRadius: theme.shape.borderRadius,
            color: theme.palette.text.primary,
            '&:hover': {
              backgroundColor: isDark ? alpha(theme.palette.primary.main, 0.1) : theme.palette.primary.lighter,
              color: theme.palette.primary.main
            },
            '&.Mui-selected': {
              backgroundColor: isDark ? alpha(theme.palette.primary.main, 0.2) : theme.palette.primary.lighter,
              color: theme.palette.primary.main,
              '&:hover': {
                backgroundColor: isDark
                  ? alpha(theme.palette.primary.main, 0.3)
                  : alpha(theme.palette.primary.lighter, 0.8)
              }
            },
            '&.Mui-disabled': {
              opacity: 0.6,
              color: theme.palette.text.disabled
            }
          },
          '&.MuiMenuItem-root': {
            fontSize: '0.875rem',
            fontWeight: 400,
            padding: '10px 16px',
            borderRadius: theme.shape.borderRadius,
            '&:hover': {
              backgroundColor: isDark ? alpha(theme.palette.primary.main, 0.1) : theme.palette.primary.lighter
            },
            '&.Mui-selected': {
              backgroundColor: isDark ? alpha(theme.palette.primary.main, 0.2) : theme.palette.primary.lighter,
              '&:hover': {
                backgroundColor: isDark
                  ? alpha(theme.palette.primary.main, 0.3)
                  : alpha(theme.palette.primary.lighter, 0.8)
              }
            }
          }
        }
      }
    }
  };
}
