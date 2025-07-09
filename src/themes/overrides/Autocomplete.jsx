import { alpha } from '@mui/material/styles';

// ==============================|| OVERRIDES - AUTOCOMPLETE ||============================== //

export default function Autocomplete(theme) {
  return {
    MuiAutocomplete: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            padding: '3px 9px'
          }
        },
        paper: {
          boxShadow: theme.shadows[4],
          borderRadius: 8,
          border: `1px solid ${theme.palette.divider}`
        },
        option: {
          padding: '8px 12px',
          '&[aria-selected="true"]': {
            backgroundColor: alpha(theme.palette.secondary.main, 0.1), // 10% Yellow
            color: theme.palette.secondary.main // GIB Yellow
          },
          '&[data-focus="true"]': {
            backgroundColor: alpha(theme.palette.secondary.main, 0.08) // 8% Yellow
          }
        },
        noOptions: {
          fontSize: '0.875rem',
          padding: '10px 12px',
          color: theme.palette.tertiary.main // Medium Grey
        },
        listbox: {
          padding: '8px',
          '& .MuiAutocomplete-option': {
            minHeight: 36,
            fontSize: '0.875rem',
            padding: '8px 12px',
            borderRadius: 4,
            '&:hover': {
              backgroundColor: alpha(theme.palette.secondary.main, 0.08) // 8% Yellow
            }
          }
        },
        tag: {
          margin: 3,
          backgroundColor: alpha(theme.palette.secondary.main, 0.1), // 10% Yellow
          color: theme.palette.primary.main, // Dark Grey
          borderRadius: 4,
          '& .MuiChip-deleteIcon': {
            color: theme.palette.tertiary.main, // Medium Grey
            '&:hover': {
              color: theme.palette.secondary.main // GIB Yellow
            }
          }
        },
        popper: {
          borderRadius: 8
        },
        popupIndicator: {
          color: theme.palette.tertiary.main, // Medium Grey
          '&:hover': {
            color: theme.palette.secondary.main // GIB Yellow
          }
        },
        clearIndicator: {
          color: theme.palette.tertiary.main, // Medium Grey
          '&:hover': {
            color: theme.palette.secondary.main // GIB Yellow
          }
        },
        endAdornment: {
          '& .MuiAutocomplete-clearIndicator': {
            color: theme.palette.tertiary.main, // Medium Grey
            '&:hover': {
              color: theme.palette.secondary.main // GIB Yellow
            }
          }
        }
      }
    }
  };
}
