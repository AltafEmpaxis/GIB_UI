// material-ui
import { alpha } from '@mui/material/styles';

// ==============================|| OVERRIDES - SELECT ||============================== //

export default function Select(theme) {
  const isDark = theme.palette.mode === 'dark';

  return {
    MuiSelect: {
      styleOverrides: {
        select: {
          '&:focus': {
            backgroundColor: 'transparent'
          },
          '&.Mui-disabled': {
            backgroundColor: isDark ? alpha(theme.palette.background.paper, 0.15) : alpha(theme.palette.grey[100], 0.1)
          }
        },
        icon: {
          color: theme.palette.text.secondary,
          transition: theme.transitions.create(['transform', 'color'], {
            duration: theme.transitions.duration.shorter
          }),
          '.MuiSelect-select:hover ~ &': {
            color: theme.palette.text.primary
          },
          '.MuiSelect-select:focus ~ &': {
            transform: 'rotate(180deg)'
          }
        }
      }
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: theme.shape.borderRadius,
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: isDark ? alpha(theme.palette.grey[500], 0.32) : theme.palette.grey[300],
            transition: theme.transitions.create(['border-color', 'box-shadow'])
          },
          '&:hover:not(.Mui-focused):not(.Mui-disabled):not(.Mui-error) .MuiOutlinedInput-notchedOutline': {
            borderColor: theme.palette.primary.light,
            borderWidth: 1
          },
          '&.Mui-focused': {
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: theme.palette.primary.main,
              borderWidth: 2,
              boxShadow: isDark ? `0 0 0 2px ${alpha(theme.palette.primary.main, 0.2)}` : 'none'
            }
          },
          '&.Mui-error': {
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: theme.palette.error.main,
              boxShadow: isDark ? `0 0 0 2px ${alpha(theme.palette.error.main, 0.2)}` : 'none'
            }
          },
          '&.Mui-disabled': {
            backgroundColor: isDark
              ? alpha(theme.palette.background.paper, 0.15)
              : alpha(theme.palette.action.disabledBackground, 0.1),
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: isDark ? alpha(theme.palette.grey[600], 0.25) : alpha(theme.palette.grey[300], 0.5)
            }
          }
        },
        input: {
          padding: '10.5px 14px',
          fontSize: theme.typography.pxToRem(14),
          '&.MuiSelect-select': {
            paddingRight: '32px',
            backgroundColor: 'transparent',
            '&:focus': {
              backgroundColor: 'transparent'
            },
            '&[aria-expanded="true"]': {
              backgroundColor: isDark ? alpha(theme.palette.grey[500], 0.12) : alpha(theme.palette.grey[500], 0.08)
            }
          }
        },
        inputSizeSmall: {
          padding: '7.5px 12px',
          fontSize: theme.typography.pxToRem(13)
        },
        multiline: {
          padding: 0
        }
      }
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          marginLeft: 0,
          marginRight: 0,
          marginTop: 8,
          fontSize: theme.typography.pxToRem(12),
          lineHeight: 1.2,
          color: theme.palette.text.secondary,
          '&.Mui-error': {
            color: theme.palette.error.main
          },
          '&.Mui-disabled': {
            color: isDark ? alpha(theme.palette.grey[400], 0.6) : theme.palette.text.disabled
          }
        }
      }
    }
  };
}
