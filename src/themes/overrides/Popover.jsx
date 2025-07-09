// material-ui
import { alpha } from '@mui/material/styles';

// ==============================|| OVERRIDES - POPOVER ||============================== //

export default function Popover(theme) {
  const isDark = theme.palette.mode === 'dark';

  return {
    MuiPopover: {
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
        }
      },
      styleOverrides: {
        root: {
          '& .custom-scroll': {
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
        paper: {
          boxShadow: isDark
            ? `0 4px 8px ${alpha(theme.palette.common.black, 0.4)}`
            : `0 4px 8px ${alpha(theme.palette.common.black, 0.1)}`,
          borderRadius: theme.shape.borderRadius,
          border: `1px solid ${alpha(theme.palette.divider, 0.12)}`,
          backgroundColor: isDark ? alpha(theme.palette.background.paper, 0.98) : theme.palette.background.paper,
          maxHeight: 'calc(100vh - 64px)',
          overflowX: 'hidden'
        }
      }
    }
  };
}
