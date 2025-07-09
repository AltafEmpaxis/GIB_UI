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
              color: theme.palette.primary.main // Dark Grey
            }
          },
          '&.MuiIconButton-sizeMedium': {
            width: 40,
            height: 40,
            '& > *:first-of-type': {
              fontSize: 21,
              color: theme.palette.tertiary.main // Medium Grey
            }
          },
          '&.MuiIconButton-sizeSmall': {
            width: 32,
            height: 32,
            '& > *:first-of-type': {
              fontSize: 18,
              color: theme.palette.tertiary.main // Medium Grey
            }
          },

          // Hover states with improved visual feedback
          '&:hover': {
            backgroundColor: alpha(theme.palette.secondary.main, 0.1), // 10% Yellow
            '& > *:first-of-type': {
              color: theme.palette.secondary.main // GIB Yellow
            },
            // Secondary color hover (Yellow)
            '&.MuiIconButton-colorSecondary': {
              backgroundColor: alpha(theme.palette.secondary.main, 0.2), // 20% Yellow
              '& > *:first-of-type': {
                color: theme.palette.secondary.dark // Yellow dark variant
              }
            },

            // Primary color hover (Dark Grey)
            '&.MuiIconButton-colorPrimary': {
              backgroundColor: alpha(theme.palette.primary.main, 0.1), // 10% Dark Grey
              '& > *:first-of-type': {
                color: theme.palette.primary.dark // Dark Grey dark variant
              }
            },

            // Error color hover
            '&.MuiIconButton-colorError': {
              backgroundColor: alpha(theme.palette.error.main, 0.1),
              '& > *:first-of-type': {
                color: theme.palette.error.dark
              }
            },

            // Info color hover
            '&.MuiIconButton-colorInfo': {
              backgroundColor: alpha(theme.palette.info.main, 0.1),
              '& > *:first-of-type': {
                color: theme.palette.info.dark
              }
            }
          },

          // Active/pressed state with enhanced feedback
          '&:active': {
            backgroundColor: alpha(theme.palette.secondary.main, 0.3), // 30% Yellow
            '& > *:first-of-type': {
              color: theme.palette.secondary.darker // Yellow darker variant
            }
          },

          // Focus state with improved accessibility
          '&.Mui-focusVisible': {
            outline: `2px solid ${alpha(theme.palette.secondary.main, 0.5)}`,
            outlineOffset: 2,
            backgroundColor: alpha(theme.palette.secondary.main, 0.1) // 10% Yellow
          },

          // Disabled state with better visual indication
          '&.Mui-disabled': {
            backgroundColor: 'transparent',
            color: theme.palette.tertiary.main, // Medium Grey
            '& > *:first-of-type': {
              color: theme.palette.tertiary.main // Medium Grey
            }
          }
        }
      },
      variants: [
        {
          props: { color: 'secondary' },
          style: {
            color: theme.palette.secondary.main, // GIB Yellow
            '& > *:first-of-type': {
              color: theme.palette.secondary.main // GIB Yellow
            },
            '&:hover': {
              backgroundColor: alpha(theme.palette.secondary.main, 0.2) // 20% Yellow
            }
          }
        },
        {
          props: { color: 'primary' },
          style: {
            color: theme.palette.primary.main, // Dark Grey
            '& > *:first-of-type': {
              color: theme.palette.primary.main // Dark Grey
            },
            '&:hover': {
              backgroundColor: alpha(theme.palette.primary.main, 0.1) // 10% Dark Grey
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
              backgroundColor: alpha(theme.palette.error.main, 0.1)
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
              backgroundColor: alpha(theme.palette.info.main, 0.1)
            }
          }
        }
      ]
    }
  };
}
