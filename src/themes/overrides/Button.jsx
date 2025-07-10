// material-ui
import { alpha } from '@mui/material/styles';

// ==============================|| OVERRIDES - BUTTON, BUTTONBASE, BUTTONGROUP ||============================== //

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
      // transform: 'translateY(-1px)'
    },
    '&:active': {
      backgroundColor: alpha(
        theme.palette[color]?.main || theme.palette.common.black,
        theme.palette.mode === 'dark' ? 0.22 : 0.15
      )
    },
    '&.Mui-disabled': {
      backgroundColor: theme.palette.tertiary.main,
      color: theme.palette.text.disabled
    }
  });

  // Get color style for button group
  const getColorStyle = (color) => {
    const colors = theme.palette[color];

    return {
      '& .MuiButtonGroup-grouped': {
        '&:not(:last-of-type)': {
          borderColor: alpha(colors.main, 0.5)
        },
        // Contained
        '&.MuiButton-contained': {
          color: colors.contrastText,
          backgroundColor: colors.main,
          '&:hover': {
            backgroundColor:
              color === 'secondary'
                ? theme.palette.primary.main // For secondary (GIB Yellow) buttons, hover to dark gray
                : theme.palette.mode === 'dark'
                  ? alpha(colors.main, 0.85)
                  : colors.dark
            // transform: 'translateY(-1px)'
          },
          '&.Mui-disabled': {
            backgroundColor: theme.palette.tertiary.main,
            color: theme.palette.text.disabled
          }
        },
        // Outlined
        '&.MuiButton-outlined': {
          borderColor: alpha(colors.main, 0.5),
          color: colors.main,
          '&:hover': {
            backgroundColor: alpha(colors.main, 0.08),
            borderColor: colors.main
            // transform: 'translateY(-1px)'
          },
          '&.Mui-disabled': {
            color: theme.palette.text.disabled,
            borderColor: theme.palette.tertiary.main
          }
        },
        // Text
        '&.MuiButton-text': {
          color: colors.main,
          '&:hover': {
            backgroundColor: alpha(colors.main, 0.08)
            // transform: 'translateY(-1px)'
          },
          '&.Mui-disabled': {
            color: theme.palette.text.disabled
          }
        }
      }
    };
  };

  return {
    MuiButtonBase: {
      defaultProps: {
        disableRipple: false
      },
      styleOverrides: {
        root: {
          fontFamily: theme.typography.fontFamily,
          fontWeight: 600, // Semi-bold for buttons per GIB guidelines
          outline: 'none',
          transition: theme.transitions.create(['background-color', 'box-shadow', 'border-color', 'transform'], {
            duration: theme.transitions.duration.shorter
          }),
          '&:focus-visible': {
            outline: `2px solid ${alpha(theme.palette.secondary.main, 0.5)}`,
            outlineOffset: 2
          },
          '&.MuiListItemButton-root': {
            fontSize: '0.875rem',
            fontWeight: 400,
            padding: '10px 16px',
            borderRadius: theme.shape.borderRadius,
            color: theme.palette.text.primary,
            '&:hover': {
              backgroundColor: alpha(theme.palette.secondary.main, 0.08),
              color: theme.palette.secondary.main
              // transform: 'translateY(-1px)'
            },
            '&.Mui-selected': {
              backgroundColor: alpha(theme.palette.secondary.main, 0.1),
              color: theme.palette.secondary.main,
              '&:hover': {
                backgroundColor: alpha(theme.palette.secondary.main, 0.2)
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
              backgroundColor: alpha(theme.palette.secondary.main, 0.08)
              // transform: 'translateY(-1px)'
            },
            '&.Mui-selected': {
              backgroundColor: alpha(theme.palette.secondary.main, 0.1),
              '&:hover': {
                backgroundColor: alpha(theme.palette.secondary.main, 0.2)
              }
            }
          }
        }
      }
    },
    MuiButton: {
      defaultProps: {
        disableElevation: true
      },
      styleOverrides: {
        root: {
          fontWeight: 600, // Semi-bold for buttons per GIB guidelines
          borderRadius: theme.shape.borderRadius,
          textTransform: 'none',
          transition: theme.transitions.create(['background-color', 'box-shadow', 'transform', 'color'], {
            duration: theme.transitions.duration.shorter
          }),
          '&:focus-visible': {
            outline: `2px solid ${alpha(theme.palette.secondary.main, 0.5)}`,
            outlineOffset: 2
          },
          '&:active': {
            transform: 'scale(0.98)'
          },
          // '&:hover': {
          //    transform: 'translateY(-1px)'
          // },
          '&.Mui-disabled': {
            '&.MuiButton-contained': {
              backgroundColor: theme.palette.tertiary.main,
              color: theme.palette.text.disabled
            },
            '&.MuiButton-outlined': {
              borderColor: theme.palette.grey[200], // Light Grey
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
            // transform: 'translateY(-1px)'
          },
          '&:active': {
            boxShadow: 'none'
          }
        },
        outlined: {
          borderColor: theme.palette.mode === 'dark' ? alpha(theme.palette.grey[700], 0.8) : theme.palette.grey[400],
          '&:hover': {
            backgroundColor: alpha(theme.palette.secondary.main, 0.08),
            borderColor: theme.palette.secondary.main
            //transform: 'translateY(-1px)'
          },
          '&:active': {
            backgroundColor: alpha(theme.palette.secondary.main, 0.15)
          }
        },
        text: {
          '&:hover': {
            backgroundColor: alpha(theme.palette.secondary.main, 0.08)
            // transform: 'translateY(-1px)'
          },
          '&:active': {
            backgroundColor: alpha(theme.palette.secondary.main, 0.15)
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
          backgroundColor: theme.palette.primary.main, // Dark Grey
          color: '#ffffff',
          '&:hover': {
            backgroundColor: theme.palette.primary.dark
            // transform: 'translateY(-1px)'
          }
        },
        containedSecondary: {
          backgroundColor: theme.palette.secondary.main, // GIB Yellow
          color: theme.palette.primary.main, // Dark Grey text on yellow buttons
          '&:hover': {
            backgroundColor: theme.palette.secondary.dark // ffb300
            // transform: 'translateY(-1px)'
          }
        },
        containedError: {
          backgroundColor: theme.palette.error.main,
          color: theme.palette.error.contrastText,
          '&:hover': {
            backgroundColor: theme.palette.error.dark
            // transform: 'translateY(-1px)'
          }
        },
        containedSuccess: {
          backgroundColor: theme.palette.success.main,
          color: theme.palette.success.contrastText,
          '&:hover': {
            backgroundColor: theme.palette.success.dark
            // transform: 'translateY(-1px)'
          }
        },
        containedInfo: {
          backgroundColor: theme.palette.info.main,
          color: theme.palette.info.contrastText,
          '&:hover': {
            backgroundColor: theme.palette.info.dark
            // transform: 'translateY(-1px)'
          }
        },
        containedWarning: {
          backgroundColor: theme.palette.warning.main,
          color: theme.palette.warning.contrastText,
          '&:hover': {
            backgroundColor: theme.palette.warning.dark
            // transform: 'translateY(-1px)'
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
    },
    MuiButtonGroup: {
      styleOverrides: {
        root: {
          borderRadius: theme.shape.borderRadius,
          boxShadow: 'none',
          transition: theme.transitions.create(['box-shadow', 'background-color', 'border-color']),

          // Color variations
          '&.MuiButtonGroup-colorPrimary': getColorStyle('primary'),
          '&.MuiButtonGroup-colorSecondary': getColorStyle('secondary'),
          '&.MuiButtonGroup-colorError': getColorStyle('error'),
          '&.MuiButtonGroup-colorWarning': getColorStyle('warning'),
          '&.MuiButtonGroup-colorInfo': getColorStyle('info'),
          '&.MuiButtonGroup-colorSuccess': getColorStyle('success'),

          // Hover state
          '&:hover': {
            boxShadow: 'none'
          }
        },

        // Grouped buttons
        grouped: {
          borderRadius: theme.shape.borderRadius,
          '&:not(:last-of-type)': {
            borderColor: theme.palette.divider
          },
          '&.Mui-disabled': {
            borderColor: theme.palette.grey[200]
          }
        },

        // Size variations
        sizeLarge: {
          height: {
            xs: 44,
            sm: 48
          }
        },
        sizeMedium: {
          height: {
            xs: 36,
            sm: 40
          }
        },
        sizeSmall: {
          height: {
            xs: 28,
            sm: 32
          }
        },

        // Orientation styles
        groupedHorizontal: {
          '&:not(:first-of-type)': {
            marginLeft: -1
          },
          '&:not(:last-of-type)': {
            borderRight: `1px solid ${theme.palette.divider}`
          }
        },
        groupedVertical: {
          '&:not(:first-of-type)': {
            marginTop: -1
          },
          '&:not(:last-of-type)': {
            borderBottom: `1px solid ${theme.palette.divider}`
          }
        },

        // Variant styles
        contained: {
          boxShadow: 'none',
          // Default to secondary color (GIB Yellow) for contained buttons
          backgroundColor: theme.palette.secondary.main,
          color: theme.palette.primary.main, // Dark Grey text on yellow
          '&:hover': {
            boxShadow: 'none',
            backgroundColor: theme.palette.secondary.dark // ffb300
          }
        },
        outlined: {
          '&:hover': {
            backgroundColor: alpha(theme.palette.secondary.main, 0.08)
          }
        },
        text: {
          '&:hover': {
            backgroundColor: alpha(theme.palette.secondary.main, 0.08)
          }
        },

        // Soft variant
        groupedSoft: {
          backgroundColor: alpha(theme.palette.secondary.main, 0.1),
          '& .MuiButtonGroup-grouped': {
            color: theme.palette.secondary.main,
            '&:hover': {
              backgroundColor: alpha(theme.palette.secondary.main, 0.2)
            },
            '&.Mui-disabled': {
              color: theme.palette.text.disabled
            }
          }
        }
      }
    }
  };
}
