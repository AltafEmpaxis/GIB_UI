import { alpha } from '@mui/material/styles';

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
          backgroundColor: theme.palette.secondary.main, // GIB Yellow
          '&.MuiSlider-markActive': {
            opacity: 1,
            backgroundColor: theme.palette.background.paper,
            borderColor: theme.palette.secondary.main // GIB Yellow
          }
        },
        markLabel: {
          fontSize: '0.75rem',
          color: theme.palette.tertiary.main, // Medium Grey
          '&.MuiSlider-markLabelActive': {
            color: theme.palette.primary.main // Dark Grey
          }
        },
        valueLabel: {
          backgroundColor: theme.palette.primary.main, // Dark Grey
          color: theme.palette.common.white
        },
        track: {
          height: 2,
          border: 'none'
        },
        rail: {
          height: 2,
          opacity: 0.38,
          backgroundColor: theme.palette.tertiary.main // Medium Grey
        },
        thumb: {
          width: 12,
          height: 12,
          border: `2px solid ${theme.palette.secondary.main}`, // GIB Yellow
          backgroundColor: theme.palette.background.paper,
          boxShadow: theme.shadows[2],
          '&:hover': {
            boxShadow: `0 0 0 8px ${alpha(theme.palette.secondary.main, 0.3)}` // 30% Yellow
          },
          '&.Mui-focusVisible': {
            boxShadow: `0 0 0 6px ${alpha(theme.palette.secondary.main, 0.5)}` // 50% Yellow
          },
          '&.Mui-active': {
            boxShadow: `0 0 0 8px ${alpha(theme.palette.secondary.main, 0.5)}` // 50% Yellow
          },
          '&.Mui-disabled': {
            border: `2px solid ${theme.palette.tertiary.main}`, // Medium Grey
            boxShadow: 'none'
          }
        },
        // Size variations
        sizeSmall: {
          '& .MuiSlider-thumb': {
            width: 8,
            height: 8,
            '&:hover': {
              boxShadow: `0 0 0 6px ${alpha(theme.palette.secondary.main, 0.3)}` // 30% Yellow
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
            borderColor: theme.palette.primary.main, // Dark Grey
            '&:hover': {
              boxShadow: `0 0 0 8px ${alpha(theme.palette.primary.main, 0.3)}` // 30% Dark Grey
            }
          },
          '& .MuiSlider-track': {
            backgroundColor: theme.palette.primary.main // Dark Grey
          },
          '& .MuiSlider-mark': {
            backgroundColor: theme.palette.primary.main, // Dark Grey
            '&.MuiSlider-markActive': {
              borderColor: theme.palette.primary.main // Dark Grey
            }
          }
        },
        secondary: {
          '& .MuiSlider-thumb': {
            borderColor: theme.palette.secondary.main, // GIB Yellow
            '&:hover': {
              boxShadow: `0 0 0 8px ${alpha(theme.palette.secondary.main, 0.3)}` // 30% Yellow
            }
          },
          '& .MuiSlider-track': {
            backgroundColor: theme.palette.secondary.main // GIB Yellow
          },
          '& .MuiSlider-mark': {
            backgroundColor: theme.palette.secondary.main, // GIB Yellow
            '&.MuiSlider-markActive': {
              borderColor: theme.palette.secondary.main // GIB Yellow
            }
          }
        }
      },
      defaultProps: {
        color: 'secondary' // Default to GIB Yellow
      }
    }
  };
}
