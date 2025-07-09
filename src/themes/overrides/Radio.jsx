import { alpha } from '@mui/material/styles';

// ==============================|| OVERRIDES - RADIO ||============================== //

export default function Radio(theme) {
  return {
    MuiRadio: {
      defaultProps: {
        color: 'secondary', // Default to GIB Yellow
        size: 'medium'
      },
      styleOverrides: {
        root: {
          color: theme.palette.tertiary.main, // Medium Grey
          padding: 9,
          borderRadius: '50%',
          transition: theme.transitions.create(['color', 'background-color'], {
            duration: theme.transitions.duration.shorter
          }),
          '&:hover': {
            backgroundColor: alpha(theme.palette.secondary.main, 0.1), // 10% Yellow
            '& .MuiSvgIcon-root': {
              color: theme.palette.secondary.main // GIB Yellow
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
              color: theme.palette.secondary.main // GIB Yellow
            },
            '&:hover': {
              backgroundColor: alpha(theme.palette.secondary.main, 0.2) // 20% Yellow
            }
          },
          '&.Mui-disabled': {
            opacity: 0.6,
            color: theme.palette.tertiary.main, // Medium Grey
            '&.Mui-checked': {
              '& .MuiSvgIcon-root': {
                color: theme.palette.tertiary.main // Medium Grey
              }
            }
          },
          '&.Mui-focusVisible': {
            outline: `2px solid ${theme.palette.secondary.main}`, // GIB Yellow
            outlineOffset: 2
          }
        },
        // Color variants
        colorPrimary: {
          '&.Mui-checked': {
            color: theme.palette.primary.main, // Dark Grey
            '&:hover': {
              backgroundColor: alpha(theme.palette.primary.main, 0.1) // 10% Dark Grey
            }
          }
        },
        colorSecondary: {
          '&.Mui-checked': {
            color: theme.palette.secondary.main, // GIB Yellow
            '&:hover': {
              backgroundColor: alpha(theme.palette.secondary.main, 0.2) // 20% Yellow
            }
          }
        },
        colorSuccess: {
          '&.Mui-checked': {
            color: theme.palette.success.main,
            '&:hover': {
              backgroundColor: alpha(theme.palette.success.main, 0.1)
            }
          }
        },
        colorWarning: {
          '&.Mui-checked': {
            color: theme.palette.warning.main,
            '&:hover': {
              backgroundColor: alpha(theme.palette.warning.main, 0.1)
            }
          }
        },
        colorInfo: {
          '&.Mui-checked': {
            color: theme.palette.info.main,
            '&:hover': {
              backgroundColor: alpha(theme.palette.info.main, 0.1)
            }
          }
        },
        colorError: {
          '&.Mui-checked': {
            color: theme.palette.error.main,
            '&:hover': {
              backgroundColor: alpha(theme.palette.error.main, 0.1)
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
          color: theme.palette.primary.main, // Dark Grey
          fontSize: '0.875rem',
          '&.Mui-disabled': {
            color: theme.palette.tertiary.main // Medium Grey
          }
        }
      }
    }
  };
}
