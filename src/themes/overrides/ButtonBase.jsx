// material-ui
import { alpha } from '@mui/material/styles';

// ==============================|| OVERRIDES - BUTTON BASE ||============================== //

export default function ButtonBase(theme) {
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
              backgroundColor:
                theme.palette.mode === 'dark'
                  ? alpha(theme.palette.secondary.main, 0.1)
                  : alpha(theme.palette.secondary.main, 0.08),
              color: theme.palette.secondary.main
            },
            '&.Mui-selected': {
              backgroundColor:
                theme.palette.mode === 'dark'
                  ? alpha(theme.palette.secondary.main, 0.2)
                  : alpha(theme.palette.secondary.main, 0.1),
              color: theme.palette.secondary.main,
              '&:hover': {
                backgroundColor:
                  theme.palette.mode === 'dark'
                    ? alpha(theme.palette.secondary.main, 0.3)
                    : alpha(theme.palette.secondary.main, 0.2)
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
              backgroundColor:
                theme.palette.mode === 'dark'
                  ? alpha(theme.palette.secondary.main, 0.1)
                  : alpha(theme.palette.secondary.main, 0.08)
            },
            '&.Mui-selected': {
              backgroundColor:
                theme.palette.mode === 'dark'
                  ? alpha(theme.palette.secondary.main, 0.2)
                  : alpha(theme.palette.secondary.main, 0.1),
              '&:hover': {
                backgroundColor:
                  theme.palette.mode === 'dark'
                    ? alpha(theme.palette.secondary.main, 0.3)
                    : alpha(theme.palette.secondary.main, 0.2)
              }
            }
          }
        }
      }
    }
  };
}
