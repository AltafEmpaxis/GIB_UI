import { alpha } from '@mui/material/styles';

// ==============================||Textfield||==============================

export default function Input(theme) {
  const isLight = theme.palette.mode === 'light';
  const isDark = theme.palette.mode === 'dark';

  return {
    MuiInputBase: {
      styleOverrides: {
        root: {
          transition: theme.transitions.create(['box-shadow', 'background-color', 'border-color'], {
            duration: theme.transitions.duration.shorter
          }),
          '&.Mui-focused': {
            boxShadow: `0 0 0 2px ${alpha(theme.palette.primary.main, 0.2)}`
          },
          '&.Mui-disabled': {
            '& svg': {
              color: theme.palette.text.disabled
            }
          },
          '& fieldset': {
            borderColor: alpha(theme.palette.divider, 0.2)
          },
          '&:hover fieldset': {
            borderColor: theme.palette.secondary.light
          },
          '&.Mui-focused fieldset': {
            borderColor: theme.palette.secondary.main
          }
        },
        input: {
          '&::placeholder': {
            opacity: 1,
            color: theme.palette.text.disabled
          }
        }
      }
    },
    MuiInput: {
      styleOverrides: {
        underline: {
          '&:before': {
            borderBottomColor: alpha(theme.palette.grey[500], 0.56)
          },
          '&:after': {
            borderBottomColor: theme.palette.secondary.main,
            borderWidth: 2
          },
          '&:hover:not(.Mui-disabled):before': {
            borderBottomColor: alpha(theme.palette.secondary.main, 0.38)
          }
        }
      }
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiInputLabel-root.Mui-focused': {
            color: theme.palette.secondary.main
          },
          '& .MuiFormHelperText-root.Mui-error': {
            animation: 'shake 0.5s',
            '@keyframes shake': {
              '0%, 100%': { transform: 'translateX(0)' },
              '20%, 60%': { transform: 'translateX(-2px)' },
              '40%, 80%': { transform: 'translateX(2px)' }
            }
          }
        }
      }
    },
    MuiFilledInput: {
      styleOverrides: {
        root: {
          borderRadius: theme.shape.borderRadius,
          backgroundColor: alpha(theme.palette.grey[500], 0.08),
          overflow: 'hidden',
          '&:hover': {
            backgroundColor: alpha(theme.palette.grey[500], 0.16)
          },
          '&.Mui-focused': {
            backgroundColor: alpha(theme.palette.grey[500], 0.16),
            '&:after': {
              borderColor: theme.palette.secondary.main,
              transform: 'scaleX(1)'
            }
          },
          '&.Mui-disabled': {
            backgroundColor: theme.palette.action.disabledBackground
          },
          '&:after': {
            content: '""',
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '100%',
            height: 2,
            backgroundColor: theme.palette.secondary.main,
            transform: 'scaleX(0)',
            transformOrigin: 'left',
            transition: theme.transitions.create(['transform'], {
              duration: theme.transitions.duration.shorter
            })
          }
        },
        underline: {
          '&:before, :after': {
            display: 'none'
          }
        }
      }
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: alpha(theme.palette.divider, 0.2),
            borderWidth: 1,
            transition: theme.transitions.create(['border-color', 'box-shadow'], {
              duration: theme.transitions.duration.shorter
            })
          },
          '&:hover:not(.Mui-disabled, .Mui-error) .MuiOutlinedInput-notchedOutline': {
            borderColor: theme.palette.secondary.light,
            borderWidth: 1
          },
          '&.Mui-focused': {
            boxShadow: `0 0 0 2px ${alpha(theme.palette.secondary.main, 0.15)}`,
            '& .MuiOutlinedInput-notchedOutline': {
              borderWidth: 2,
              borderColor: theme.palette.secondary.main
            }
          },
          '&.Mui-disabled': {
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: theme.palette.action.disabledBackground
            }
          },
          '&.Mui-error': {
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: theme.palette.error.main,
              borderWidth: isLight ? 1 : 2
            },
            '&.Mui-focused': {
              boxShadow: `0 0 0 2px ${alpha(theme.palette.error.main, 0.15)}`
            }
          },
          '& fieldset': {
            borderColor: alpha(theme.palette.divider, 0.2)
          },
          '&:hover fieldset': {
            borderColor: theme.palette.secondary.light
          },
          '&.Mui-focused fieldset': {
            borderColor: theme.palette.secondary.main
          }
        },
        notchedOutline: {
          borderRadius: theme.shape.borderRadius
        }
      }
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: theme.palette.text.secondary,
          '&.Mui-focused': {
            color: theme.palette.secondary.main
          }
        },
        outlined: {
          lineHeight: '1em',
          '&.MuiInputLabel-shrink': {
            transform: 'translate(10px, -7px) scale(0.75)',
            background: isDark ? theme.palette.background.paper : '#fff',
            padding: '0 8px'
          }
        }
      }
    }
  };
}
