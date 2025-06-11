// material-ui
import { alpha } from '@mui/material/styles';

// ==============================|| OVERRIDES - LIST ITEM & ICON ||============================== //

export default function ListItem(theme) {
  const isDark = theme.palette.mode === 'dark';

  return {
    MuiListItem: {
      styleOverrides: {
        root: {
          padding: theme.spacing(1.5),
          '&.Mui-selected': {
            backgroundColor: isDark
              ? alpha(theme.palette.secondary.main, 0.2)
              : alpha(theme.palette.secondary.main, 0.12),
            color: theme.palette.secondary.main,
            '&:hover': {
              backgroundColor: isDark
                ? alpha(theme.palette.secondary.main, 0.3)
                : alpha(theme.palette.secondary.main, 0.18)
            }
          },
          '&:hover': {
            backgroundColor: isDark
              ? alpha(theme.palette.secondary.main, 0.1)
              : alpha(theme.palette.secondary.main, 0.08)
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
            backgroundColor: isDark
              ? alpha(theme.palette.secondary.main, 0.2)
              : alpha(theme.palette.secondary.main, 0.12),
            color: theme.palette.secondary.main,
            '&:hover': {
              backgroundColor: isDark
                ? alpha(theme.palette.secondary.main, 0.3)
                : alpha(theme.palette.secondary.main, 0.18)
            }
          },
          '&:hover': {
            backgroundColor: isDark
              ? alpha(theme.palette.secondary.main, 0.1)
              : alpha(theme.palette.secondary.main, 0.08)
          }
        }
      }
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          minWidth: 24,
          marginRight: theme.spacing(2),
          color: isDark ? theme.palette.grey[400] : theme.palette.grey[700],
          '& svg': {
            fontSize: '1.5rem'
          },
          '.MuiListItemButton-root.Mui-selected &': {
            color: theme.palette.secondary.main
          }
        }
      }
    },
    MuiListItemText: {
      styleOverrides: {
        primary: {
          color: isDark ? theme.palette.grey[100] : theme.palette.grey[900]
        },
        secondary: {
          color: theme.palette.text.secondary
        }
      }
    }
  };
}
