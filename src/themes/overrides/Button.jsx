// material-ui
import { alpha } from '@mui/material/styles';

// ==============================|| OVERRIDES - BUTTON ||============================== //

export default function Button(theme) {
  // Soft variant helper function
  const softVariant = (color) => ({
    color: theme.palette[color]?.main || theme.palette.text.primary,
    backgroundColor: alpha(
      theme.palette[color]?.main || theme.palette.common.black,
      theme.palette.mode === 'dark' ? 0.12 : 0.08
    ),
    '&:hover': {
      backgroundColor: alpha(
        theme.palette[color]?.main || theme.palette.common.black,
        theme.palette.mode === 'dark' ? 0.18 : 0.12
      )
    },
    '&:active': {
      backgroundColor: alpha(
        theme.palette[color]?.main || theme.palette.common.black,
        theme.palette.mode === 'dark' ? 0.22 : 0.15
      )
    },
    '&.Mui-disabled': {
      backgroundColor: alpha(theme.palette.grey[500], theme.palette.mode === 'dark' ? 0.2 : 0.15),
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
            outline: `2px solid ${alpha(theme.palette.primary.main, theme.palette.mode === 'dark' ? 0.6 : 0.5)}`,
            outlineOffset: 2
          },
          '&:active': {
            transform: 'scale(0.98)'
          },
          '&.Mui-disabled': {
            '&.MuiButton-contained': {
              backgroundColor: alpha(theme.palette.grey[500], theme.palette.mode === 'dark' ? 0.2 : 0.15),
              color: theme.palette.text.disabled
            },
            '&.MuiButton-outlined': {
              borderColor:
                theme.palette.mode === 'dark' ? alpha(theme.palette.grey[600], 0.25) : theme.palette.grey[300],
              color: theme.palette.text.disabled
            },
            '&.MuiButton-text': {
              color: theme.palette.text.disabled
            }
          }
        },
        contained: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: 'none'
          },
          '&:active': {
            boxShadow: 'none'
          }
        },
        outlined: {
          borderColor: theme.palette.mode === 'dark' ? alpha(theme.palette.grey[700], 0.8) : theme.palette.grey[400],
          '&:hover': {
            backgroundColor: alpha(theme.palette.primary.main, theme.palette.mode === 'dark' ? 0.12 : 0.08),
            borderColor: theme.palette.primary.main
          },
          '&:active': {
            backgroundColor: alpha(theme.palette.primary.main, theme.palette.mode === 'dark' ? 0.18 : 0.15)
          }
        },
        text: {
          '&:hover': {
            backgroundColor: alpha(theme.palette.primary.main, theme.palette.mode === 'dark' ? 0.12 : 0.08)
          },
          '&:active': {
            backgroundColor: alpha(theme.palette.primary.main, theme.palette.mode === 'dark' ? 0.18 : 0.15)
          }
        },
        // Soft variant
        soft: {
          ...softVariant('primary')
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
          backgroundColor: theme.palette.primary.main,
          color: theme.palette.primary.contrastText,
          '&:hover': {
            backgroundColor: theme.palette.primary.dark
          }
        },
        containedSecondary: {
          backgroundColor: theme.palette.secondary.main,
          color: theme.palette.secondary.contrastText,
          '&:hover': {
            backgroundColor: theme.palette.secondary.dark
          }
        },
        containedError: {
          backgroundColor: theme.palette.error.main,
          color: theme.palette.error.contrastText,
          '&:hover': {
            backgroundColor: theme.palette.error.dark
          }
        },
        containedSuccess: {
          backgroundColor: theme.palette.success.main,
          color: theme.palette.success.contrastText,
          '&:hover': {
            backgroundColor: theme.palette.success.dark
          }
        },
        containedInfo: {
          backgroundColor: theme.palette.info.main,
          color: theme.palette.info.contrastText,
          '&:hover': {
            backgroundColor: theme.palette.info.dark
          }
        },
        containedWarning: {
          backgroundColor: theme.palette.warning.main,
          color: theme.palette.warning.contrastText,
          '&:hover': {
            backgroundColor: theme.palette.warning.dark
          }
        },
        // Sizes
        sizeSmall: {
          padding: {
            xs: '4px 12px',
            sm: '6px 16px'
          },
          fontSize: {
            xs: theme.typography.pxToRem(12),
            sm: theme.typography.pxToRem(13)
          },
          lineHeight: 1.5
        },
        sizeMedium: {
          padding: {
            xs: '6px 16px',
            sm: '8px 20px'
          },
          fontSize: {
            xs: theme.typography.pxToRem(13),
            sm: theme.typography.pxToRem(14)
          },
          lineHeight: 1.75
        },
        sizeLarge: {
          padding: {
            xs: '8px 24px',
            sm: '10px 28px'
          },
          fontSize: {
            xs: theme.typography.pxToRem(14),
            sm: theme.typography.pxToRem(16)
          },
          lineHeight: 1.75
        },
        // Icons
        startIcon: {
          marginRight: 8
        },
        endIcon: {
          marginLeft: 8
        }
      }
    }
  };
}
