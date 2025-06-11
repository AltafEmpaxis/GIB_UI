import { alpha } from '@mui/material';

// ==============================|| OVERRIDES - ICON BUTTON ||============================== //

export default function IconButton(theme) {
  const isDark = theme.palette.mode === 'dark';

  return {
    MuiIconButton: {
      defaultProps: {
        disableRipple: false
      },
      styleOverrides: {
        root: {
          borderRadius: theme.shape.borderRadius,
          transition: theme.transitions.create(['background-color', 'box-shadow', 'transform']),

          // Size variants with improved sizing and spacing
          '&.MuiIconButton-sizeLarge': {
            width: 48,
            height: 48,
            '& > *:first-of-type': {
              fontSize: 25,
              color: theme.palette.text.primary
            }
          },
          '&.MuiIconButton-sizeMedium': {
            width: 40,
            height: 40,
            '& > *:first-of-type': {
              fontSize: 21,
              color: theme.palette.text.secondary
            }
          },
          '&.MuiIconButton-sizeSmall': {
            width: 32,
            height: 32,
            '& > *:first-of-type': {
              fontSize: 18,
              color: theme.palette.text.secondary
            }
          },

          // Hover states with improved visual feedback
          '&:hover': {
            backgroundColor: isDark
              ? alpha(theme.palette.secondary.main, 0.2)
              : alpha(theme.palette.secondary.main, 0.12),
            '& > *:first-of-type': {
              color: theme.palette.secondary.main
            },
            // Secondary color hover
            '&.MuiIconButton-colorSecondary': {
              backgroundColor: isDark
                ? alpha(theme.palette.secondary.main, 0.3)
                : alpha(theme.palette.secondary.main, 0.18),
              '& > *:first-of-type': {
                color: theme.palette.secondary.main
              }
            },

            // Primary color hover
            '&.MuiIconButton-colorPrimary': {
              backgroundColor: isDark
                ? alpha(theme.palette.primary.main, 0.2)
                : alpha(theme.palette.primary.main, 0.12),
              '& > *:first-of-type': {
                color: theme.palette.primary.main
              }
            },

            // Error color hover
            '&.MuiIconButton-colorError': {
              backgroundColor: isDark ? alpha(theme.palette.error.main, 0.2) : alpha(theme.palette.error.main, 0.12),
              '& > *:first-of-type': {
                color: theme.palette.error.main
              }
            },

            // Info color hover
            '&.MuiIconButton-colorInfo': {
              backgroundColor: isDark ? alpha(theme.palette.info.main, 0.2) : alpha(theme.palette.info.main, 0.12),
              '& > *:first-of-type': {
                color: theme.palette.info.main
              }
            }
          },

          // Active/pressed state with enhanced feedback
          '&:active': {
            backgroundColor: isDark
              ? alpha(theme.palette.secondary.main, 0.3)
              : alpha(theme.palette.secondary.main, 0.2)
          },

          // Focus state with improved accessibility
          '&.Mui-focusVisible': {
            outline: `2px solid ${alpha(theme.palette.primary.main, 0.25)}`,
            outlineOffset: 2,
            backgroundColor: isDark ? alpha(theme.palette.primary.main, 0.12) : alpha(theme.palette.primary.main, 0.08)
          },

          // Disabled state with better visual indication
          '&.Mui-disabled': {
            backgroundColor: 'transparent',
            color: theme.palette.action.disabled,
            '& > *:first-of-type': {
              color: isDark ? alpha(theme.palette.text.disabled, 0.48) : theme.palette.action.disabled
            }
          }
        }
      },
      variants: [
        {
          props: { color: 'secondary' },
          style: {
            color: theme.palette.text.secondary,
            '& > *:first-of-type': {
              color: theme.palette.secondary.main
            },
            '&:hover': {
              backgroundColor: isDark
                ? alpha(theme.palette.secondary.main, 0.3)
                : alpha(theme.palette.secondary.main, 0.18)
            }
          }
        },
        {
          props: { color: 'primary' },
          style: {
            color: theme.palette.primary.main,
            '& > *:first-of-type': {
              color: theme.palette.primary.main
            },
            '&:hover': {
              backgroundColor: isDark ? alpha(theme.palette.primary.main, 0.2) : alpha(theme.palette.primary.main, 0.12)
            }
          }
        },
        {
          props: { color: 'error' },
          style: {
            color: theme.palette.error.main,
            '& > *:first-of-type': {
              color: theme.palette.error.main
            },
            '&:hover': {
              backgroundColor: isDark ? alpha(theme.palette.error.main, 0.2) : alpha(theme.palette.error.main, 0.12)
            }
          }
        },
        {
          props: { color: 'info' },
          style: {
            color: theme.palette.info.main,
            '& > *:first-of-type': {
              color: theme.palette.info.main
            },
            '&:hover': {
              backgroundColor: isDark ? alpha(theme.palette.info.main, 0.2) : alpha(theme.palette.info.main, 0.12)
            }
          }
        }
      ]
    }
  };
}
