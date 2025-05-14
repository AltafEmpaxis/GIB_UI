// ==============================|| OVERRIDES - SLIDER ||============================== //

export default function Slider(theme) {
  return {
    MuiSlider: {
      styleOverrides: {
        root: {
          '&.Mui-disabled': {
            opacity: 0.4
          }
        },
        mark: {
          width: 4,
          height: 4,
          borderRadius: '50%',
          border: `2px solid ${theme.palette.background.paper}`,
          backgroundColor: theme.palette.primary.main,
          '&.MuiSlider-markActive': {
            opacity: 1,
            backgroundColor: theme.palette.background.paper,
            borderColor: theme.palette.primary.main
          }
        },
        markLabel: {
          fontSize: '0.75rem',
          color: theme.palette.text.secondary,
          '&.MuiSlider-markLabelActive': {
            color: theme.palette.text.primary
          }
        },
        valueLabel: {
          backgroundColor: theme.palette.grey[700],
          color: theme.palette.common.white
        },
        track: {
          height: 2,
          border: 'none'
        },
        rail: {
          height: 2,
          opacity: 0.38,
          backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[500] : theme.palette.grey[400]
        },
        thumb: {
          width: 12,
          height: 12,
          border: `2px solid ${theme.palette.primary.main}`,
          backgroundColor: theme.palette.background.paper,
          boxShadow: theme.shadows[2],
          '&:hover': {
            boxShadow: `0 0 0 8px ${
              theme.palette.mode === 'dark' ? theme.palette.primary.darker + '29' : theme.palette.primary.lighter + '29'
            }`
          },
          '&.Mui-focusVisible': {
            boxShadow: `0 0 0 6px ${
              theme.palette.mode === 'dark' ? theme.palette.primary.darker + '59' : theme.palette.primary.lighter + '59'
            }`
          },
          '&.Mui-active': {
            boxShadow: `0 0 0 8px ${
              theme.palette.mode === 'dark' ? theme.palette.primary.darker + '59' : theme.palette.primary.lighter + '59'
            }`
          },
          '&.Mui-disabled': {
            border: `2px solid ${theme.palette.grey[400]}`,
            boxShadow: 'none'
          }
        },
        // Size variations
        sizeSmall: {
          '& .MuiSlider-thumb': {
            width: 8,
            height: 8,
            '&:hover': {
              boxShadow: `0 0 0 6px ${
                theme.palette.mode === 'dark'
                  ? theme.palette.primary.darker + '29'
                  : theme.palette.primary.lighter + '29'
              }`
            }
          },
          '& .MuiSlider-track': {
            height: 1
          },
          '& .MuiSlider-rail': {
            height: 1
          }
        },
        // Color variations
        primary: {
          '& .MuiSlider-thumb': {
            borderColor: theme.palette.primary.main,
            '&:hover': {
              boxShadow: `0 0 0 8px ${theme.palette.primary.main + '29'}`
            }
          },
          '& .MuiSlider-track': {
            backgroundColor: theme.palette.primary.main
          },
          '& .MuiSlider-mark': {
            backgroundColor: theme.palette.primary.main,
            '&.MuiSlider-markActive': {
              borderColor: theme.palette.primary.main
            }
          }
        },
        secondary: {
          '& .MuiSlider-thumb': {
            borderColor: theme.palette.secondary.main,
            '&:hover': {
              boxShadow: `0 0 0 8px ${theme.palette.secondary.main + '29'}`
            }
          },
          '& .MuiSlider-track': {
            backgroundColor: theme.palette.secondary.main
          },
          '& .MuiSlider-mark': {
            backgroundColor: theme.palette.secondary.main,
            '&.MuiSlider-markActive': {
              borderColor: theme.palette.secondary.main
            }
          }
        }
      }
    }
  };
}
