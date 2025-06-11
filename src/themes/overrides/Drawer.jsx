import { alpha } from '@mui/material';

// ==============================|| OVERRIDES - DRAWER ||============================== //

export default function Drawer(theme) {
  const isDark = theme.palette.mode === 'dark';

  return {
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: theme.palette.background.default,
          color: theme.palette.text.primary,
          borderRight: `1px solid ${theme.palette.divider}`,
          transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.shorter
          }),
          '& .MuiListItemButton-root:hover': {
            backgroundColor: isDark
              ? alpha(theme.palette.secondary.main, 0.2)
              : alpha(theme.palette.secondary.main, 0.12),
            '& .MuiListItemIcon-root': {
              color: theme.palette.secondary.main
            },
            '& .MuiTypography-root': {
              color: theme.palette.secondary.main
            }
          }
        },
        paperAnchorLeft: {
          borderRight: `1px solid ${theme.palette.divider}`
        },
        paperAnchorRight: {
          borderLeft: `1px solid ${theme.palette.divider}`
        },
        modal: {
          '& .MuiBackdrop-root': {
            backgroundColor: theme.palette.mode === 'dark' ? 'rgba(0, 0, 0, 0.7)' : 'rgba(0, 0, 0, 0.5)'
          }
        },
        docked: {
          '& .MuiPaper-root': {
            boxShadow: 'none'
          }
        }
      }
    }
  };
}
