// material-ui
import { alpha } from '@mui/material/styles';
import { stepConnectorClasses } from '@mui/material/StepConnector';

// ==============================|| OVERRIDES - STEPPER ||============================== //

export default function Stepper(theme) {
  const isDark = theme.palette.mode === 'dark';

  return {
    MuiStepper: {
      styleOverrides: {
        root: {
          padding: theme.spacing(2, 1),
          '&.MuiStepper-alternativeLabel': {
            width: '100%'
          }
        }
      }
    },
    MuiStepConnector: {
      styleOverrides: {
        root: {
          '&.Mui-disabled': {
            '.MuiStepConnector-line': {
              borderColor: isDark ? alpha(theme.palette.grey[600], 0.3) : alpha(theme.palette.grey[300], 0.7)
            }
          }
        },
        line: {
          borderWidth: 2,
          borderColor: 'transparent',
          backgroundImage: `linear-gradient(90deg, 
            ${theme.palette.primary.main} 0%, 
            ${theme.palette.secondary.main} 50%, 
            ${theme.palette.primary.dark} 100%)`,
          backgroundSize: '200% 200%',
          height: 3,
          borderRadius: 1,
          opacity: 0.5,
          transition: theme.transitions.create(['opacity', 'background-position'], {
            duration: theme.transitions.duration.standard
          })
        },
        alternativeLabel: {
          top: 22,
          left: 'calc(-50% + 20px)',
          right: 'calc(50% + 20px)',
          [`&.${stepConnectorClasses.active}`]: {
            [`& .${stepConnectorClasses.line}`]: {
              borderColor: 'transparent',
              backgroundImage: `linear-gradient(95deg, 
                ${theme.palette.primary.main} 0%, 
                ${theme.palette.secondary.main} 50%, 
                ${theme.palette.primary.dark} 100%)`,
              backgroundSize: '200% 200%',
              animation: 'gradient-animation 2s ease infinite',
              height: 3,
              borderRadius: 1,
              opacity: 1
            }
          },
          [`&.${stepConnectorClasses.completed}`]: {
            [`& .${stepConnectorClasses.line}`]: {
              borderColor: 'transparent',
              backgroundImage: `linear-gradient(95deg, 
                ${theme.palette.primary.main} 0%, 
                ${theme.palette.primary.dark} 100%)`,
              height: 3,
              borderRadius: 1,
              opacity: 1
            }
          }
        }
      }
    },
    MuiStepContent: {
      styleOverrides: {
        root: {
          borderColor: isDark ? theme.palette.grey[700] : theme.palette.grey[300],
          borderWidth: 2,
          marginLeft: theme.spacing(2.5)
        }
      }
    },
    MuiStepLabel: {
      styleOverrides: {
        root: {
          '&.Mui-disabled': {
            '& .MuiStepLabel-label': {
              color: theme.palette.text.disabled
            }
          }
        },
        label: {
          fontSize: '0.875rem',
          color: theme.palette.text.secondary,
          fontWeight: 500,
          '&.Mui-active': {
            color: isDark ? theme.palette.primary.lighter : theme.palette.primary.main,
            fontWeight: 600
          },
          '&.Mui-completed': {
            color: isDark ? theme.palette.primary.lighter : theme.palette.primary.dark,
            fontWeight: 600
          }
        },
        iconContainer: {
          '& .MuiStepIcon-root': {
            color: isDark ? theme.palette.grey[700] : theme.palette.grey[300],
            '&.Mui-active': {
              color: theme.palette.primary.main
            },
            '&.Mui-completed': {
              color: theme.palette.primary.main
            },
            '& .MuiStepIcon-text': {
              fill: isDark ? theme.palette.grey[100] : theme.palette.common.white,
              fontWeight: 600
            }
          }
        }
      }
    },
    MuiStepIcon: {
      styleOverrides: {
        root: {
          width: 40,
          height: 40,
          borderRadius: '50%',
          padding: 0,
          fontSize: '1rem',
          color: isDark ? theme.palette.grey[700] : theme.palette.grey[300],
          '&.Mui-active': {
            color: 'transparent',
            backgroundImage: `linear-gradient(135deg, 
              ${theme.palette.primary.main} 0%, 
              ${theme.palette.secondary.main} 50%, 
              ${theme.palette.primary.dark} 100%)`,
            backgroundSize: '200% 200%',
            animation: 'gradient-icon-animation 2s ease infinite',
            boxShadow: `0 4px 10px 0 ${alpha(theme.palette.primary.main, 0.3)}`,
            transform: 'scale(1.1)',
            transition: 'transform 0.3s cubic-bezier(0.68, -0.55, 0.27, 1.55), background-color 0.2s ease'
          },
          '&.Mui-completed': {
            color: theme.palette.primary.main
          }
        },
        text: {
          fill: isDark ? theme.palette.grey[100] : theme.palette.common.white,
          fontWeight: 600
        }
      }
    },
    MuiStep: {
      styleOverrides: {
        root: {
          '&.Mui-completed + .MuiStep-root.Mui-active::before': {
            content: '""',
            position: 'absolute',
            left: '-24px',
            top: '50%',
            transform: 'translateY(-50%)',
            width: '12px',
            height: '12px',
            borderRadius: '50%',
            backgroundColor: theme.palette.primary.main,
            boxShadow: `0 0 0 2px ${alpha(theme.palette.primary.main, 0.2)}`,
            zIndex: 1
          }
        }
      }
    },
    // Custom color variants for GIB theme
    '.GIB-stepper-primary': {
      '& .MuiStepConnector-line': {
        borderColor: theme.palette.primary.main
      },
      '& .MuiStepIcon-root': {
        color: theme.palette.primary.main
      }
    },
    '.GIB-stepper-secondary': {
      '& .MuiStepConnector-line': {
        borderColor: theme.palette.secondary.main
      },
      '& .MuiStepIcon-root': {
        color: theme.palette.secondary.main
      }
    },
    '.GIB-stepper-gradient': {
      '& .MuiStepConnector-line': {
        borderColor: 'transparent',
        background: `linear-gradient(90deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
        height: 3
      }
    },
    '@keyframes gradient-animation': {
      '0%': {
        backgroundPosition: '0% 50%'
      },
      '50%': {
        backgroundPosition: '100% 50%'
      },
      '100%': {
        backgroundPosition: '0% 50%'
      }
    },
    '@keyframes gradient-icon-animation': {
      '0%': {
        backgroundPosition: '0% 50%'
      },
      '50%': {
        backgroundPosition: '100% 50%'
      },
      '100%': {
        backgroundPosition: '0% 50%'
      }
    },
    '@keyframes spinning-icon': {
      '0%': {
        transform: 'rotate(0deg)'
      },
      '100%': {
        transform: 'rotate(360deg)'
      }
    }
  };
}
