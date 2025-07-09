import { alpha } from '@mui/material';

// ==============================|| OVERRIDES - DRAWER ||============================== //

export default function Drawer(theme) {
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
            backgroundColor: alpha(theme.palette.primary.main, 0.12),
            '& .MuiListItemIcon-root': {
              color: theme.palette.primary.main
            },
            '& .MuiTypography-root': {
              color: theme.palette.primary.main
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
            backgroundColor: 'rgba(0, 0, 0, 0.5)'
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
