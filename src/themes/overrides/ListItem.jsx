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
            backgroundColor: alpha(theme.palette.primary.main, 0.12),
            color: theme.palette.primary.main,
            '&:hover': {
              backgroundColor: alpha(theme.palette.primary.main, 0.18)
            }
          },
          '&:hover': {
            backgroundColor: alpha(theme.palette.primary.main, 0.08)
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
            backgroundColor: alpha(theme.palette.primary.main, 0.12),
            color: theme.palette.primary.main,
            '&:hover': {
              backgroundColor: alpha(theme.palette.primary.main, 0.18)
            }
          },
          '&:hover': {
            backgroundColor: alpha(theme.palette.primary.main, 0.08)
          }
        }
      }
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          minWidth: 24,
          marginRight: theme.spacing(2),
          color: theme.palette.grey[700],
          '& svg': {
            fontSize: '1.5rem'
          },
          '.MuiListItemButton-root.Mui-selected &': {
            color: theme.palette.primary.main
          }
        }
      }
    },
    MuiListItemText: {
      styleOverrides: {
        primary: {
          color: theme.palette.text.primary
        },
        secondary: {
          color: theme.palette.text.secondary
        }
      }
    }
  };
}
