import { alpha } from '@mui/material/styles';

// ==============================|| OVERRIDES - INPUT ||============================== //

export default function Input(theme) {
  return {
    MuiInputBase: {
      styleOverrides: {
        root: {
          '&.Mui-disabled': {
            backgroundColor: alpha(theme.palette.action.disabledBackground, 0.1),
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: alpha(theme.palette.grey[300], 0.5)
            }
          },
          '&.Mui-error': {
            backgroundColor: alpha(theme.palette.error.main, 0.08)
          },
          '&:hover:not(.Mui-disabled):not(.Mui-error):not(.Mui-focused)': {
            backgroundColor: alpha(theme.palette.grey[100], 0.5)
          },
          '&.Mui-focused': {
            backgroundColor: 'transparent'
          }
        },
        input: {
          backgroundColor: 'transparent',
          color: theme.palette.text.primary,
          '&::placeholder': {
            color: theme.palette.text.secondary,
            opacity: 0.7
          },
          '&:-webkit-autofill': {
            WebkitBoxShadow: '0 0 0 100px #fff inset',
            WebkitTextFillColor: 'inherit',
            caretColor: theme.palette.text.primary
          }
        },
        sizeSmall: {
          height: 36
        },
        multiline: {
          padding: 0,
          '&.MuiInputBase-sizeSmall': {
            padding: 0
          }
        }
      }
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          backgroundColor: 'transparent',
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: theme.palette.grey[300],
            borderWidth: 1,
            transition: theme.transitions.create(['border-color', 'box-shadow'])
          },
          '&:hover:not(.Mui-disabled):not(.Mui-error):not(.Mui-focused) .MuiOutlinedInput-notchedOutline': {
            borderColor: theme.palette.primary.main,
            borderWidth: 1
          },
          '&.Mui-focused': {
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: theme.palette.primary.main,
              borderWidth: 2
            },
            boxShadow: `0 0 0 2px ${alpha(theme.palette.primary.main, 0.15)}`
          },
          '&.Mui-error': {
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: theme.palette.error.main,
              borderWidth: 2
            },
            '&.Mui-focused': {
              boxShadow: `0 0 0 2px ${alpha(theme.palette.error.main, 0.15)}`
            }
          },
          '&.Mui-disabled': {
            backgroundColor: alpha(theme.palette.action.disabledBackground, 0.1),
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: alpha(theme.palette.grey[300], 0.5)
            }
          }
        },
        input: {
          padding: '10px 12px',
          '&.MuiInputBase-inputSizeSmall': {
            padding: '7px 12px',
            '&.MuiInputBase-inputAdornedStart': {
              paddingLeft: 0
            }
          },
          '&:-webkit-autofill': {
            WebkitBoxShadow: '0 0 0 100px #fff inset',
            WebkitTextFillColor: 'inherit',
            caretColor: theme.palette.text.primary,
            borderRadius: 'inherit'
          }
        },
        inputAdornedStart: {
          paddingLeft: 4
        },
        notchedOutline: {
          borderRadius: theme.shape.borderRadius,
          transition: theme.transitions.create(['border-color', 'border-width', 'box-shadow'])
        }
      }
    },
    MuiFilledInput: {
      styleOverrides: {
        root: {
          backgroundColor: alpha(theme.palette.grey[100], 0.9),
          '&:hover': {
            backgroundColor: alpha(theme.palette.grey[100], 1)
          },
          '&.Mui-focused': {
            backgroundColor: alpha(theme.palette.grey[100], 0.9)
          },
          '&.Mui-disabled': {
            backgroundColor: alpha(theme.palette.action.disabledBackground, 0.1)
          }
        },
        input: {
          padding: '10px 12px',
          '&.MuiInputBase-inputSizeSmall': {
            padding: '7px 12px'
          }
        }
      }
    },
    MuiInput: {
      styleOverrides: {
        root: {
          '&:before': {
            borderBottom: `1px solid ${theme.palette.grey[300]}`
          },
          '&:hover:not(.Mui-disabled):before': {
            borderBottom: `2px solid ${theme.palette.primary.main}`
          },
          '&.Mui-focused:after': {
            borderBottom: `2px solid ${theme.palette.primary.main}`
          },
          '&.Mui-error:after': {
            borderBottom: `2px solid ${theme.palette.error.main}`
          },
          '&.Mui-disabled:before': {
            borderBottom: `1px solid ${alpha(theme.palette.grey[300], 0.5)}`
          }
        },
        input: {
          padding: '8px 12px',
          '&.MuiInputBase-inputSizeSmall': {
            padding: '4px 12px'
          }
        }
      }
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: theme.palette.grey[600],
          fontSize: '0.875rem',
          '&.Mui-focused': {
            color: theme.palette.primary.main
          },
          '&.Mui-error': {
            color: theme.palette.error.main
          },
          '&.Mui-disabled': {
            color: theme.palette.text.disabled
          }
        },
        outlined: {
          lineHeight: '0.8em',
          '&.MuiInputLabel-sizeSmall': {
            lineHeight: '1em'
          },
          '&.MuiInputLabel-shrink': {
            transform: 'translate(14px, -8px) scale(0.75)',
            backgroundColor: theme.palette.background.paper,
            padding: '0 4px'
          }
        },
        filled: {
          '&.MuiInputLabel-shrink': {
            transform: 'translate(12px, 6px) scale(0.75)'
          }
        }
      }
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          marginLeft: 8,
          marginRight: 8,
          marginTop: 4,
          fontSize: '0.75rem',
          '&.Mui-error': {
            color: theme.palette.error.main
          },
          '&.Mui-disabled': {
            color: theme.palette.text.disabled
          }
        }
      }
    }
  };
}
