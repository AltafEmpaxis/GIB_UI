// ==============================|| OVERRIDES - RADIO ||============================== //

export default function Radio(theme) {
  return {
    MuiRadio: {
      defaultProps: {
        color: 'primary',
        size: 'medium'
      },
      styleOverrides: {
        root: {
          color: theme.palette.text.secondary,
          padding: 9,
          borderRadius: '50%',
          transition: theme.transitions.create(['color', 'background-color'], {
            duration: theme.transitions.duration.shorter
          }),
          '&:hover': {
            backgroundColor: theme.palette.action.hover,
            '& .MuiSvgIcon-root': {
              color: theme.palette.primary.light
            }
          },
          '& .MuiSvgIcon-root': {
            fontSize: '1.25rem',
            transition: theme.transitions.create('transform', {
              duration: theme.transitions.duration.shorter
            })
          },
          '&.Mui-checked': {
            '& .MuiSvgIcon-root': {
              transform: 'scale(1.1)',
              color: theme.palette.primary.main
            },
            '&:hover': {
              backgroundColor: theme.palette.primary.lighter
            }
          },
          '&.Mui-disabled': {
            opacity: 0.6,
            color: theme.palette.action.disabled,
            '&.Mui-checked': {
              '& .MuiSvgIcon-root': {
                color: theme.palette.action.disabled
              }
            }
          },
          '&.Mui-focusVisible': {
            outline: `2px solid ${theme.palette.primary.main}`,
            outlineOffset: 2
          }
        },
        // Color variants
        colorPrimary: {
          '&.Mui-checked': {
            color: theme.palette.primary.main,
            '&:hover': {
              backgroundColor: theme.palette.primary.lighter
            }
          }
        },
        colorSecondary: {
          '&.Mui-checked': {
            color: theme.palette.secondary.main,
            '&:hover': {
              backgroundColor: theme.palette.secondary.lighter
            }
          }
        },
        colorSuccess: {
          '&.Mui-checked': {
            color: theme.palette.success.main,
            '&:hover': {
              backgroundColor: theme.palette.success.lighter
            }
          }
        },
        colorWarning: {
          '&.Mui-checked': {
            color: theme.palette.warning.main,
            '&:hover': {
              backgroundColor: theme.palette.warning.lighter
            }
          }
        },
        colorInfo: {
          '&.Mui-checked': {
            color: theme.palette.info.main,
            '&:hover': {
              backgroundColor: theme.palette.info.lighter
            }
          }
        },
        colorError: {
          '&.Mui-checked': {
            color: theme.palette.error.main,
            '&:hover': {
              backgroundColor: theme.palette.error.lighter
            }
          }
        },
        // Size variants
        sizeSmall: {
          padding: 4,
          '& .MuiSvgIcon-root': {
            fontSize: '0.875rem'
          }
        },
        sizeMedium: {
          padding: 9,
          '& .MuiSvgIcon-root': {
            fontSize: '1.25rem'
          }
        },
        sizeLarge: {
          padding: 12,
          '& .MuiSvgIcon-root': {
            fontSize: '1.5rem'
          }
        }
      }
    },
    // Radio Group styles
    MuiFormControlLabel: {
      styleOverrides: {
        root: {
          '& .MuiRadio-root': {
            marginRight: theme.spacing(1)
          }
        },
        label: {
          color: theme.palette.text.primary,
          fontSize: '0.875rem',
          '&.Mui-disabled': {
            color: theme.palette.text.disabled
          }
        }
      }
    }
  };
}
