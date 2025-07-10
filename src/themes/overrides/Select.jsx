// material-ui
import { alpha } from '@mui/material/styles';

// ==============================|| OVERRIDES - SELECT ||============================== //

export default function Select(theme) {
  return {
    MuiSelect: {
      styleOverrides: {
        select: {
          '&:focus': {
            backgroundColor: 'transparent'
          },
          '&.Mui-disabled': {
            backgroundColor: alpha(theme.palette.grey[100], 0.1)
          }
        },
        icon: {
          color: theme.palette.tertiary.main, // Medium Grey
          transition: theme.transitions.create(['transform', 'color'], {
            duration: theme.transitions.duration.shorter
          }),
          '.MuiSelect-select:hover ~ &': {
            color: theme.palette.secondary.main // GIB Yellow
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
            borderColor: theme.palette.tertiary.main, // Medium Grey
            transition: theme.transitions.create(['border-color', 'box-shadow'])
          },
          '&:hover:not(.Mui-focused):not(.Mui-disabled):not(.Mui-error) .MuiOutlinedInput-notchedOutline': {
            borderColor: theme.palette.secondary.main, // GIB Yellow
            borderWidth: 1
          },
          '&.Mui-focused': {
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: theme.palette.secondary.main, // GIB Yellow
              borderWidth: 2,
              boxShadow: `0 0 0 3px ${alpha(theme.palette.secondary.main, 0.2)}`
            }
          },
          '&.Mui-error': {
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: theme.palette.error.main
            }
          },
          '&.Mui-disabled': {
            backgroundColor: alpha(theme.palette.action.disabledBackground, 0.1),
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: alpha(theme.palette.tertiary.main, 0.5) // Medium Grey
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
              backgroundColor: alpha(theme.palette.secondary.main, 0.1) // 10% Yellow
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
          color: theme.palette.tertiary.main, // Medium Grey
          '&.Mui-error': {
            color: theme.palette.error.main
          },
          '&.Mui-disabled': {
            color: theme.palette.tertiary.main // Medium Grey
          }
        }
      }
    }
  };
}
