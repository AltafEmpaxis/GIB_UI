import { alpha } from '@mui/material/styles';

// ==============================|| OVERRIDES - TAB ||============================== //

export default function Tab(theme) {
  // Gradient colors
  const gradientStart = theme.palette.primary.main;
  const gradientMiddle = theme.palette.secondary.main;
  const gradientEnd = theme.palette.primary.dark;

  return {
    MuiTab: {
      styleOverrides: {
        root: {
          minHeight: 46,
          color: theme.palette.tertiary.main, // Medium Grey
          textAlign: 'center',
          padding: theme.spacing(1.5, 3),
          fontWeight: theme.typography.fontWeightMedium,
          borderTopLeftRadius: theme.shape.borderRadius,
          borderTopRightRadius: theme.shape.borderRadius,
          position: 'relative',
          transition: theme.transitions.create(['color', 'background-color', 'border-color'], {
            duration: theme.transitions.duration.standard
          }),
          '&:hover': {
            backgroundColor: alpha(theme.palette.secondary.main, 0.08), // 8% Yellow
            color: theme.palette.secondary.main, // GIB Yellow
            '&::after': {
              opacity: 0.5
            }
          },
          '&.Mui-selected': {
            color: theme.palette.secondary.main, // GIB Yellow
            backgroundColor: alpha(theme.palette.secondary.main, 0.12), // 12% Yellow
            '&::after': {
              opacity: 1
            },
            '&:hover': {
              backgroundColor: alpha(theme.palette.secondary.main, 0.2) // 20% Yellow
            }
          },
          // '&::after': {
          //   content: '""',
          //   position: 'absolute',
          //   top: 0,
          //   left: 0,
          //   right: 0,
          //   height: 3,
          //   background: `linear-gradient(90deg,
          //     ${gradientStart} 0%,
          //     ${gradientMiddle} 50%,
          //     ${gradientEnd} 100%)`,
          //   opacity: 0,
          //   transition: theme.transitions.create('opacity', {
          //     duration: theme.transitions.duration.standard
          //   }),
          //   borderTopLeftRadius: theme.shape.borderRadius,
          //   borderTopRightRadius: theme.shape.borderRadius
          // },
          // '&:focus-visible': {
          //   outline: `2px solid ${alpha(theme.palette.secondary.main, 0.5)}`,
          //   outlineOffset: 2
          // },
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
            background: `linear-gradient(90deg, 
              ${gradientStart} 0%, 
              ${gradientMiddle} 50%, 
              ${gradientEnd} 100%)`,
            height: '3px',
            borderRadius: '3px 3px 0 0',
            transition: theme.transitions.create(['left', 'right', 'width'], {
              easing: theme.transitions.easing.easeOut,
              duration: theme.transitions.duration.shorter
            }),
            boxShadow: `0 1px 3px ${alpha(gradientMiddle, 0.3)}`
          },
          '& .MuiTabs-flexContainer': {
            gap: theme.spacing(0.1)
          }
        },
        vertical: {
          borderRight: `1px solid ${alpha(theme.palette.divider, 0.12)}`,
          '& .MuiTabs-indicator': {
            width: '3px',
            borderRadius: '0 3px 3px 0',
            background: `linear-gradient(to bottom, 
              ${gradientStart} 0%, 
              ${gradientMiddle} 50%, 
              ${gradientEnd} 100%)`
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
