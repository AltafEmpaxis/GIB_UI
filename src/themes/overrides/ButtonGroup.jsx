// material-ui
import { alpha } from '@mui/material/styles';

// ==============================|| OVERRIDES - BUTTON GROUP ||============================== //

export default function ButtonGroup(theme) {
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
                ? theme.palette.primary.main // For secondary (gold) buttons, hover to dark gray
                : theme.palette.mode === 'dark'
                  ? alpha(colors.main, 0.85)
                  : colors.dark
          },
          '&.Mui-disabled': {
            backgroundColor: theme.palette.action.disabledBackground,
            color: theme.palette.action.disabled
          }
        },
        // Outlined
        '&.MuiButton-outlined': {
          borderColor: alpha(colors.main, 0.5),
          color: colors.main,
          '&:hover': {
            backgroundColor: alpha(colors.main, 0.08),
            borderColor: colors.main
          },
          '&.Mui-disabled': {
            color: theme.palette.action.disabled,
            borderColor: theme.palette.action.disabledBackground
          }
        },
        // Text
        '&.MuiButton-text': {
          color: colors.main,
          '&:hover': {
            backgroundColor: alpha(colors.main, 0.08)
          },
          '&.Mui-disabled': {
            color: theme.palette.action.disabled
          }
        }
      }
    };
  };

  return {
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
            borderColor: theme.palette.action.disabledBackground
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
          // Default to secondary color (gold/yellow) for contained buttons
          backgroundColor: theme.palette.secondary.main,
          color: theme.palette.secondary.contrastText,
          '&:hover': {
            boxShadow: 'none',
            backgroundColor: theme.palette.primary.main, // Change to dark gray on hover
            color: theme.palette.primary.contrastText
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
          backgroundColor:
            theme.palette.mode === 'dark'
              ? alpha(theme.palette.secondary.main, 0.1)
              : alpha(theme.palette.secondary.main, 0.1),
          '& .MuiButtonGroup-grouped': {
            color: theme.palette.secondary.main,
            '&:hover': {
              backgroundColor:
                theme.palette.mode === 'dark'
                  ? alpha(theme.palette.secondary.main, 0.2)
                  : alpha(theme.palette.secondary.main, 0.2)
            },
            '&.Mui-disabled': {
              color: theme.palette.action.disabled
            }
          }
        }
      }
    }
  };
}
