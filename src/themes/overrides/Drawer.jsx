import { alpha } from '@mui/material';

// ==============================|| OVERRIDES - DRAWER ||============================== //

export default function Drawer(theme) {
  return {
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: theme.palette.background.default,
          color: theme.palette.primary.main, // Dark Grey
          borderRight: `1px solid ${alpha(theme.palette.divider, 0.12)}`,
          transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.shorter
          }),
          '& .MuiListItemButton-root:hover': {
            backgroundColor: alpha(theme.palette.secondary.main, 0.1), // 10% Yellow
            '& .MuiListItemIcon-root': {
              color: theme.palette.secondary.main // GIB Yellow
            },
            '& .MuiTypography-root': {
              color: theme.palette.secondary.main // GIB Yellow
            }
          },
          '& .MuiListItemButton-root.Mui-selected': {
            backgroundColor: alpha(theme.palette.secondary.main, 0.2), // 20% Yellow
            '& .MuiListItemIcon-root': {
              color: theme.palette.secondary.main // GIB Yellow
            },
            '& .MuiTypography-root': {
              color: theme.palette.secondary.main // GIB Yellow
            },
            '&:hover': {
              backgroundColor: alpha(theme.palette.secondary.main, 0.3) // 30% Yellow
            }
          }
        },
        paperAnchorLeft: {
          borderRight: `1px solid ${alpha(theme.palette.divider, 0.12)}`
        },
        paperAnchorRight: {
          borderLeft: `1px solid ${alpha(theme.palette.divider, 0.12)}`
        },
        modal: {
          '& .MuiBackdrop-root': {
            backgroundColor: alpha(theme.palette.common.black, 0.5)
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
