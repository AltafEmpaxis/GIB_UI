import { alpha } from '@mui/material/styles';

// ==============================|| OVERRIDES - INPUT ||============================== //

export default function Input(theme) {
  const isDark = theme.palette.mode === 'dark';

  return {
    MuiInputBase: {
      styleOverrides: {
        root: {
          '&.Mui-disabled': {
            backgroundColor: alpha(theme.palette.action.disabledBackground, 0.1),
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: alpha(theme.palette.tertiary.main, 0.5) // Medium Grey
            }
          },
          '&.Mui-error': {
            backgroundColor: alpha(theme.palette.error.main, 0.08)
          },
          '&:hover:not(.Mui-disabled):not(.Mui-error):not(.Mui-focused)': {
            backgroundColor: isDark ? alpha(theme.palette.common.black, 0.1) : alpha(theme.palette.grey[100], 0.5)
          },
          '&.Mui-focused': {
            backgroundColor: 'transparent'
          }
        },
        input: {
          backgroundColor: 'transparent',
          color: isDark ? theme.palette.common.white : theme.palette.primary.main, // White in dark mode, Dark Grey in light mode
          '&::placeholder': {
            color: isDark ? alpha(theme.palette.common.white, 0.5) : theme.palette.tertiary.main, // Medium Grey with proper opacity
            opacity: 0.7
          },
          '&:-webkit-autofill': {
            WebkitBoxShadow: isDark ? '0 0 0 100px #262626 inset' : '0 0 0 100px #fff inset',
            WebkitTextFillColor: isDark ? theme.palette.common.white : theme.palette.primary.main,
            caretColor: isDark ? theme.palette.common.white : theme.palette.primary.main
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
            borderColor: isDark ? alpha(theme.palette.common.white, 0.3) : theme.palette.tertiary.main, // Adjusted for dark mode
            borderWidth: 1,
            transition: theme.transitions.create(['border-color', 'box-shadow'])
          },
          '&:hover:not(.Mui-disabled):not(.Mui-error):not(.Mui-focused) .MuiOutlinedInput-notchedOutline': {
            borderColor: theme.palette.secondary.main, // GIB Yellow
            borderWidth: 1
          },
          '&.Mui-focused': {
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: theme.palette.secondary.main, // GIB Yellow
              borderWidth: 2
            },
            boxShadow: `0 0 0 2px ${alpha(theme.palette.secondary.main, 0.15)}` // 15% Yellow
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
            backgroundColor: isDark
              ? alpha(theme.palette.common.black, 0.2)
              : alpha(theme.palette.action.disabledBackground, 0.1),
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: alpha(theme.palette.tertiary.main, 0.5) // Medium Grey
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
            WebkitBoxShadow: isDark ? '0 0 0 100px #262626 inset' : '0 0 0 100px #fff inset',
            WebkitTextFillColor: isDark ? theme.palette.common.white : 'inherit',
            caretColor: isDark ? theme.palette.common.white : theme.palette.primary.main,
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
          backgroundColor: isDark ? alpha(theme.palette.common.black, 0.2) : alpha(theme.palette.grey[100], 0.9),
          '&:hover': {
            backgroundColor: isDark ? alpha(theme.palette.common.black, 0.3) : alpha(theme.palette.grey[100], 1)
          },
          '&.Mui-focused': {
            backgroundColor: isDark ? alpha(theme.palette.common.black, 0.25) : alpha(theme.palette.grey[100], 0.9)
          },
          '&.Mui-disabled': {
            backgroundColor: isDark
              ? alpha(theme.palette.common.black, 0.2)
              : alpha(theme.palette.action.disabledBackground, 0.1)
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
            borderBottom: isDark
              ? `1px solid ${alpha(theme.palette.common.white, 0.3)}`
              : `1px solid ${theme.palette.tertiary.main}` // Medium Grey
          },
          '&:hover:not(.Mui-disabled):before': {
            borderBottom: `2px solid ${theme.palette.secondary.main}` // GIB Yellow
          },
          '&.Mui-focused:after': {
            borderBottom: `2px solid ${theme.palette.secondary.main}` // GIB Yellow
          },
          '&.Mui-error:after': {
            borderBottom: `2px solid ${theme.palette.error.main}`
          },
          '&.Mui-disabled:before': {
            borderBottom: isDark
              ? `1px solid ${alpha(theme.palette.common.white, 0.15)}`
              : `1px solid ${alpha(theme.palette.tertiary.main, 0.5)}` // Medium Grey
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
          color: isDark ? alpha(theme.palette.common.white, 0.7) : theme.palette.tertiary.main, // Medium Grey
          fontSize: '0.875rem',
          '&.Mui-focused': {
            color: theme.palette.secondary.main // GIB Yellow
          },
          '&.Mui-error': {
            color: theme.palette.error.main
          },
          '&.Mui-disabled': {
            color: isDark ? alpha(theme.palette.common.white, 0.3) : alpha(theme.palette.tertiary.main, 0.5) // Medium Grey
          }
        },
        outlined: {
          lineHeight: '0.8em',
          '&.MuiInputLabel-sizeSmall': {
            lineHeight: '1em'
          },
          '&.MuiInputLabel-shrink': {
            transform: 'translate(14px, -8px) scale(0.75)',
            backgroundColor: isDark ? theme.palette.background.paper : theme.palette.background.paper,
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
          color: isDark ? alpha(theme.palette.common.white, 0.6) : theme.palette.tertiary.main, // Medium Grey
          '&.Mui-error': {
            color: theme.palette.error.main
          },
          '&.Mui-disabled': {
            color: isDark ? alpha(theme.palette.common.white, 0.3) : alpha(theme.palette.tertiary.main, 0.5) // Medium Grey
          }
        }
      }
    }
  };
}
