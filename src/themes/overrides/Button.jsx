// material-ui
import { alpha } from '@mui/material/styles';

// ==============================|| OVERRIDES - BUTTON ||============================== //

export default function Button(theme) {
  const isDark = theme.palette.mode === 'dark';

  const softVariant = (color) => ({
    color: theme.palette[color]?.main || theme.palette.text.primary,
    backgroundColor: alpha(theme.palette[color]?.main || theme.palette.common.black, isDark ? 0.12 : 0.08),
    '&:hover': {
      backgroundColor: alpha(theme.palette[color]?.main || theme.palette.common.black, isDark ? 0.18 : 0.12)
    },
    '&:active': {
      backgroundColor: alpha(theme.palette[color]?.main || theme.palette.common.black, isDark ? 0.22 : 0.15)
    },
    '&.Mui-disabled': {
      backgroundColor: alpha(theme.palette.grey[500], isDark ? 0.2 : 0.15),
      color: theme.palette.text.disabled
    }
  });

  return {
    MuiButton: {
      defaultProps: {
        disableElevation: true
      },
      styleOverrides: {
        root: {
          fontWeight: 500,
          borderRadius: theme.shape.borderRadius,
          textTransform: 'none',
          transition: theme.transitions.create(['background-color', 'box-shadow', 'transform', 'color'], {
            duration: theme.transitions.duration.shorter
          }),
          '&:focus-visible': {
            outline: `2px solid ${alpha(theme.palette.primary.main, isDark ? 0.6 : 0.5)}`,
            outlineOffset: 2
          },
          '&:active': {
            transform: 'scale(0.98)'
          },
          '&.Mui-disabled': {
            '&.MuiButton-contained': {
              backgroundColor: alpha(theme.palette.grey[500], isDark ? 0.2 : 0.15),
              color: theme.palette.text.disabled
            },
            '&.MuiButton-outlined': {
              borderColor: isDark ? alpha(theme.palette.grey[600], 0.25) : theme.palette.grey[300],
              color: theme.palette.text.disabled
            },
            '&.MuiButton-text': {
              color: theme.palette.text.disabled
            }
          }
        },
        contained: {
          backgroundColor: theme.palette.secondary.main, // #ffc72c - GIB gold
          color: theme.palette.secondary.contrastText,
          boxShadow: 'none',
          '&:hover': {
            boxShadow: 'none',
            backgroundColor: theme.palette.primary.main, // #53565a - GIB dark gray on hover
            opacity: 0.7,
            transition: 'opacity 0.25s ease-in-out'
          },
          '&:active': {
            boxShadow: 'none',
            backgroundColor: theme.palette.primary.dark
          }
        },
        outlined: {
          borderColor: isDark ? alpha(theme.palette.grey[700], 0.8) : theme.palette.grey[400],
          '&:hover': {
            backgroundColor: alpha(theme.palette.secondary.main, isDark ? 0.12 : 0.08),
            borderColor: theme.palette.secondary.main
          },
          '&:active': {
            backgroundColor: alpha(theme.palette.secondary.main, isDark ? 0.18 : 0.15)
          }
        },
        text: {
          '&:hover': {
            backgroundColor: alpha(theme.palette.secondary.main, isDark ? 0.12 : 0.08)
          },
          '&:active': {
            backgroundColor: alpha(theme.palette.secondary.main, isDark ? 0.18 : 0.15)
          }
        },
        // Soft variant
        soft: {
          ...softVariant('secondary')
        },
        softPrimary: {
          ...softVariant('primary')
        },
        softSecondary: {
          ...softVariant('secondary')
        },
        softError: {
          ...softVariant('error')
        },
        softSuccess: {
          ...softVariant('success')
        },
        softInfo: {
          ...softVariant('info')
        },
        softWarning: {
          ...softVariant('warning')
        },
        // Color variants
        containedPrimary: {
          backgroundColor: theme.palette.primary.main, // #53565a - GIB dark gray
          color: theme.palette.primary.contrastText,
          boxShadow: 'none',
          '&:hover': {
            backgroundColor: theme.palette.secondary.main, // #ffc72c - GIB gold on hover
            boxShadow: 'none'
          },
          '&:active': {
            boxShadow: 'none'
          }
        },
        containedSecondary: {
          backgroundColor: theme.palette.secondary.main, // #ffc72c - GIB gold
          color: theme.palette.secondary.contrastText,
          boxShadow: 'none',
          '&:hover': {
            backgroundColor: theme.palette.primary.main, // #53565a - GIB dark gray on hover
            opacity: 0.7,
            boxShadow: 'none',
            transition: 'opacity 0.25s ease-in-out'
          },
          '&:active': {
            boxShadow: 'none'
          }
        },
        containedError: {
          backgroundColor: theme.palette.error.main,
          color: theme.palette.error.contrastText,
          boxShadow: 'none',
          '&:hover': {
            backgroundColor: theme.palette.error.dark,
            boxShadow: 'none'
          },
          '&:active': {
            boxShadow: 'none'
          }
        },
        containedSuccess: {
          backgroundColor: theme.palette.success.main,
          color: theme.palette.success.contrastText,
          boxShadow: 'none',
          '&:hover': {
            backgroundColor: theme.palette.success.dark,
            boxShadow: 'none'
          },
          '&:active': {
            boxShadow: 'none'
          }
        },
        containedInfo: {
          backgroundColor: theme.palette.info.main,
          color: theme.palette.info.contrastText,
          boxShadow: 'none',
          '&:hover': {
            backgroundColor: theme.palette.info.dark,
            boxShadow: 'none'
          },
          '&:active': {
            boxShadow: 'none'
          }
        },
        containedWarning: {
          backgroundColor: theme.palette.warning.main,
          color: theme.palette.warning.contrastText,
          boxShadow: 'none',
          '&:hover': {
            backgroundColor: theme.palette.warning.dark,
            boxShadow: 'none'
          },
          '&:active': {
            boxShadow: 'none'
          }
        },
        // Sizes
        sizeSmall: {
          padding: '6px 16px',
          fontSize: theme.typography.pxToRem(13),
          lineHeight: 1.5,
          height: 30,
          '& .MuiButton-startIcon': {
            marginRight: 8
          },
          '& .MuiButton-endIcon': {
            marginLeft: 8
          }
        },
        sizeMedium: {
          padding: '8px 20px',
          fontSize: theme.typography.pxToRem(14),
          lineHeight: 1.75,
          height: 38,
          '& .MuiButton-startIcon': {
            marginRight: 10
          },
          '& .MuiButton-endIcon': {
            marginLeft: 10
          }
        },
        sizeLarge: {
          padding: '11px 24px',
          fontSize: theme.typography.pxToRem(15),
          lineHeight: 1.75,
          height: 46,
          minWidth: 110,
          '& .MuiButton-startIcon': {
            marginRight: 12
          },
          '& .MuiButton-endIcon': {
            marginLeft: 12
          }
        }
      }
    }
  };
}
