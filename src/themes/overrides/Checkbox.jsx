import { alpha } from '@mui/material/styles';

// ==============================|| OVERRIDES - CHECKBOX ||============================== //

export default function Checkbox(theme) {
  const isDark = theme.palette.mode === 'dark';

  return {
    MuiCheckbox: {
      styleOverrides: {
        root: {
          color: isDark ? theme.palette.grey[400] : theme.palette.grey[600],
          '&:hover': {
            backgroundColor: isDark ? alpha(theme.palette.primary.main, 0.1) : alpha(theme.palette.primary.light, 0.1)
          },
          '&.Mui-checked': {
            color: theme.palette.primary.main,
            '&:hover': {
              backgroundColor: isDark ? alpha(theme.palette.primary.main, 0.2) : alpha(theme.palette.primary.light, 0.2)
            }
          },
          '&.Mui-disabled': {
            color: theme.palette.action.disabled
          }
        }
      }
    }
  };
}
