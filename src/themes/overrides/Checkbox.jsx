import { alpha } from '@mui/material/styles';

// ==============================|| OVERRIDES - CHECKBOX ||============================== //

export default function Checkbox(theme) {
  return {
    MuiCheckbox: {
      defaultProps: {
        color: 'secondary' // Default to GIB Yellow
      },
      styleOverrides: {
        root: {
          color: theme.palette.tertiary.main, // Medium Grey
          '&:hover': {
            backgroundColor: alpha(theme.palette.secondary.main, 0.1) // 10% Yellow
          },
          '&.Mui-checked': {
            color: theme.palette.secondary.main, // GIB Yellow
            '&:hover': {
              backgroundColor: alpha(theme.palette.secondary.main, 0.2) // 20% Yellow
            }
          },
          '&.Mui-disabled': {
            color: alpha(theme.palette.tertiary.main, 0.5) // Medium Grey with 50% opacity
          }
        },
        // Color variants
        colorPrimary: {
          color: theme.palette.tertiary.main, // Medium Grey
          '&.Mui-checked': {
            color: theme.palette.primary.main, // Dark Grey
            '&:hover': {
              backgroundColor: alpha(theme.palette.primary.main, 0.1) // 10% Dark Grey
            }
          }
        },
        colorSecondary: {
          color: theme.palette.tertiary.main, // Medium Grey
          '&.Mui-checked': {
            color: theme.palette.secondary.main, // GIB Yellow
            '&:hover': {
              backgroundColor: alpha(theme.palette.secondary.main, 0.1) // 10% Yellow
            }
          }
        }
      }
    },
    // Form control label styles
    MuiFormControlLabel: {
      styleOverrides: {
        root: {
          '& .MuiCheckbox-root': {
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
