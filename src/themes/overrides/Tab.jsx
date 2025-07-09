import { alpha } from '@mui/material/styles';

// ==============================|| OVERRIDES - TAB ||============================== //

export default function Tab(theme) {
  return {
    MuiTab: {
      styleOverrides: {
        root: {
          minHeight: 46,
          color: theme.palette.tertiary.main, // Medium Grey
          textAlign: 'center',
          padding: theme.spacing(1.5, 3),
          fontWeight: theme.typography.fontWeightMedium,
          borderRadius: theme.shape.borderRadius,
          '&:hover': {
            backgroundColor: alpha(theme.palette.secondary.main, 0.08), // 8% Yellow
            color: theme.palette.secondary.main // GIB Yellow
          },
          '&.Mui-selected': {
            color: theme.palette.secondary.main, // GIB Yellow
            backgroundColor: alpha(theme.palette.secondary.main, 0.12), // 12% Yellow
            '&:hover': {
              backgroundColor: alpha(theme.palette.secondary.main, 0.2) // 20% Yellow
            }
          },
          '& .MuiSvgIcon-root': {
            fontSize: '1.25rem',
            marginBottom: 1
          },
          '&.Mui-disabled': {
            color: theme.palette.tertiary.main // Medium Grey
          }
        },
        labelIcon: {
          minHeight: 48,
          gap: theme.spacing(0.5),
          '& .MuiSvgIcon-root': {
            marginRight: theme.spacing(0.5)
          }
        },
        wrapped: {
          fontSize: '0.75rem',
          lineHeight: 1.3
        }
      }
    },
    MuiTabs: {
      defaultProps: {
        variant: 'scrollable',
        scrollButtons: 'auto',
        allowScrollButtonsMobile: true
      },
      styleOverrides: {
        root: {
          borderBottom: `1px solid ${alpha(theme.palette.divider, 0.12)}`,
          textAlign: 'center',
          position: 'relative',

          '& .MuiTabs-indicator': {
            backgroundColor: theme.palette.secondary.main, // GIB Yellow
            height: '2px',
            borderRadius: '2px 2px 0 0',
            transition: theme.transitions.create(['left', 'right', 'width'], {
              easing: theme.transitions.easing.easeOut,
              duration: theme.transitions.duration.shorter
            })
          },
          '& .MuiTabs-flexContainer': {
            gap: theme.spacing(0.1)
          }
        },
        vertical: {
          borderRight: `1px solid ${alpha(theme.palette.divider, 0.12)}`,
          '& .MuiTabs-indicator': {
            width: '3px',
            borderRadius: '0 3px 3px 0'
          }
        },
        scrollButtons: {
          width: theme.spacing(3.5),
          '&.Mui-disabled': {
            opacity: 0.4,
            backgroundColor: 'transparent'
          },
          '& .MuiSvgIcon-root': {
            fontSize: '1.1rem',
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
