// Material UI
import { alpha } from '@mui/material/styles';

// ==============================|| OVERRIDES - MENU ||============================== //

export default function Menu(theme) {
  const isDark = theme.palette.mode === 'dark';

  return {
    MuiMenu: {
      defaultProps: {
        elevation: 0,
        PaperProps: {
          sx: {
            '&::-webkit-scrollbar': {
              width: 8
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: alpha(theme.palette.tertiary.main, 0.3), // Medium Grey
              borderRadius: 4,
              '&:hover': {
                backgroundColor: alpha(theme.palette.tertiary.main, 0.5) // Medium Grey
              }
            },
            '&::-webkit-scrollbar-track': {
              backgroundColor: 'transparent'
            }
          }
        },
        transitionDuration: 200,
        TransitionProps: {
          enter: 100
        }
      },
      styleOverrides: {
        paper: {
          borderRadius: theme.shape.borderRadius,
          border: `1px solid ${alpha(theme.palette.divider, isDark ? 0.28 : 0.12)}`,
          backgroundColor: isDark ? alpha(theme.palette.background.paper, 0.98) : theme.palette.background.paper,
          boxShadow: isDark
            ? `0 4px 8px ${alpha(theme.palette.common.black, 0.4)}`
            : `0 4px 8px ${alpha(theme.palette.common.black, 0.1)}`,
          '& .MuiList-root': {
            padding: theme.spacing(1)
          },
          '& .MuiMenuItem-root': {
            padding: theme.spacing(1, 2),
            fontSize: '0.875rem',
            fontWeight: 400,
            borderRadius: theme.shape.borderRadius,
            color: isDark ? theme.palette.grey[100] : theme.palette.primary.main, // Improved contrast for dark mode
            transition: theme.transitions.create(['background-color', 'color'], {
              duration: theme.transitions.duration.shorter
            }),
            '&:hover': {
              backgroundColor: alpha(theme.palette.secondary.main, 0.1), // 10% Yellow
              color: theme.palette.secondary.main // GIB Yellow
            },
            '&.Mui-selected': {
              backgroundColor: alpha(theme.palette.secondary.main, 0.2), // 20% Yellow
              color: theme.palette.secondary.main, // GIB Yellow
              '&:hover': {
                backgroundColor: alpha(theme.palette.secondary.main, 0.3) // 30% Yellow
              }
            },
            '&.Mui-disabled': {
              opacity: 0.6,
              color: theme.palette.tertiary.main // Medium Grey
            }
          }
        }
      }
    }
  };
}
