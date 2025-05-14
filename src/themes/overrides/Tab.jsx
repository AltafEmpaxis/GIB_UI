import { alpha } from '@mui/material/styles';

// ==============================|| OVERRIDES - TAB ||============================== //

export default function Tab(theme) {
  const isDark = theme.palette.mode === 'dark';

  return {
    MuiTab: {
      styleOverrides: {
        root: {
          minHeight: 46,
          color: theme.palette.text.secondary,
          textAlign: 'center',
          padding: theme.spacing(1.5, 3),
          fontWeight: theme.typography.fontWeightMedium,
          '&:hover': {
            backgroundColor: isDark ? alpha(theme.palette.primary.main, 0.1) : theme.palette.primary.lighter,
            color: isDark ? theme.palette.primary.lighter : theme.palette.primary.main,
            borderRadius: theme.shape.borderRadius
          },
          '&.Mui-selected': {
            color: isDark ? theme.palette.primary.lighter : theme.palette.primary.main,
            backgroundColor: isDark ? alpha(theme.palette.primary.main, 0.15) : theme.palette.primary.lighter,
            '&:hover': {
              backgroundColor: isDark
                ? alpha(theme.palette.primary.main, 0.25)
                : alpha(theme.palette.primary.lighter, 0.8)
            }
          },
          '& .MuiSvgIcon-root': {
            fontSize: '1.25rem',
            marginBottom: 1
          },
          '&.Mui-disabled': {
            color: isDark ? alpha(theme.palette.grey[400], 0.6) : theme.palette.text.disabled
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
          borderBottom: `1px solid ${alpha(theme.palette.divider, isDark ? 0.28 : 0.12)}`,
          textAlign: 'center',
          position: 'relative',

          '& .MuiTabs-indicator': {
            backgroundColor: theme.palette.primary.main,
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
          borderRight: `1px solid ${alpha(theme.palette.divider, isDark ? 0.28 : 0.12)}`,
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
            color: theme.palette.text.secondary,
            '&:hover': {
              color: theme.palette.text.primary
            }
          }
        }
      }
    }
  };
}
