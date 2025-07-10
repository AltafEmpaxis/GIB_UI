import { alpha } from '@mui/material';

// ==============================|| OVERRIDES - DRAWER ||============================== //

export default function Drawer(theme) {
  const isDark = theme.palette.mode === 'dark';

  return {
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: theme.palette.background.default,
          color: isDark ? theme.palette.common.white : theme.palette.primary.main, // White in dark mode, Dark Grey in light mode
          borderRight: `1px solid ${isDark ? alpha(theme.palette.common.white, 0.1) : alpha(theme.palette.divider, 0.12)}`,
          transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.shorter
          }),
          '& .MuiListItemButton-root:hover': {
            backgroundColor: alpha(theme.palette.secondary.main, isDark ? 0.15 : 0.1), // Adjusted Yellow opacity
            '& .MuiListItemIcon-root': {
              color: theme.palette.secondary.main // GIB Yellow
            },
            '& .MuiTypography-root': {
              color: theme.palette.secondary.main // GIB Yellow
            }
          },
          '& .MuiListItemButton-root.Mui-selected': {
            backgroundColor: alpha(theme.palette.secondary.main, isDark ? 0.25 : 0.2), // Adjusted Yellow opacity
            '& .MuiListItemIcon-root': {
              color: theme.palette.secondary.main // GIB Yellow
            },
            '& .MuiTypography-root': {
              color: theme.palette.secondary.main // GIB Yellow
            },
            '&:hover': {
              backgroundColor: alpha(theme.palette.secondary.main, isDark ? 0.35 : 0.3) // Adjusted Yellow opacity
            }
          }
        },
        paperAnchorLeft: {
          borderRight: `1px solid ${isDark ? alpha(theme.palette.common.white, 0.1) : alpha(theme.palette.divider, 0.12)}`
        },
        paperAnchorRight: {
          borderLeft: `1px solid ${isDark ? alpha(theme.palette.common.white, 0.1) : alpha(theme.palette.divider, 0.12)}`
        },
        modal: {
          '& .MuiBackdrop-root': {
            backgroundColor: alpha(theme.palette.common.black, isDark ? 0.6 : 0.5)
          }
        },
        docked: {
          '& .MuiPaper-root': {
            boxShadow: isDark ? theme.customShadows?.drawer : 'none'
          }
        }
      }
    }
  };
}
