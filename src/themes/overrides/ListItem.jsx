// material-ui
import { alpha } from '@mui/material/styles';

// ==============================|| OVERRIDES - LIST ITEM & ICON ||============================== //

export default function ListItem(theme) {
  return {
    MuiListItem: {
      styleOverrides: {
        root: {
          padding: theme.spacing(1.5),
          '&.Mui-selected': {
            backgroundColor: alpha(theme.palette.secondary.main, 0.2), // 20% Yellow
            color: theme.palette.secondary.main, // GIB Yellow
            '&:hover': {
              backgroundColor: alpha(theme.palette.secondary.main, 0.3) // 30% Yellow
            }
          },
          '&:hover': {
            backgroundColor: alpha(theme.palette.secondary.main, 0.1) // 10% Yellow
          },
          '&:active': {
            backgroundColor: alpha(theme.palette.secondary.main, 0.25) // 25% Yellow
          }
        }
      }
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          borderRadius: theme.shape.borderRadius,
          padding: theme.spacing(1),
          '&.Mui-selected': {
            backgroundColor: alpha(theme.palette.secondary.main, 0.2), // 20% Yellow
            color: theme.palette.secondary.main, // GIB Yellow
            '&:hover': {
              backgroundColor: alpha(theme.palette.secondary.main, 0.3) // 30% Yellow
            }
          },
          '&:hover': {
            backgroundColor: alpha(theme.palette.secondary.main, 0.1) // 10% Yellow
          },
          '&:active': {
            backgroundColor: alpha(theme.palette.secondary.main, 0.25) // 25% Yellow
          }
        }
      }
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          minWidth: 24,
          marginRight: theme.spacing(1),
          color: theme.palette.tertiary.main, // Medium Grey
          '& svg': {
            fontSize: '1.5rem'
          },
          '.MuiListItemButton-root.Mui-selected &': {
            color: theme.palette.secondary.main // GIB Yellow
          }
        }
      }
    },
    MuiListItemText: {
      styleOverrides: {
        primary: {
          color: theme.palette.primary.main // Dark Grey
        },
        secondary: {
          color: theme.palette.tertiary.main // Medium Grey
        }
      }
    }
  };
}
