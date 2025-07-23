// material-ui
import { alpha } from '@mui/material/styles';

// ==============================|| OVERRIDES - CARD ||============================== //

export default function Card(theme) {
  const isDark = theme.palette.mode === 'dark';

  const getColorStyle = (color) => ({
    backgroundColor: alpha(theme.palette[color].main, 0.05),
    borderColor: alpha(theme.palette[color].main, 0.25),
    '&:hover': {
      backgroundColor: alpha(theme.palette[color].main, 0.1)
    }
  });

  return {
    MuiCard: {
      styleOverrides: {
        root: {
          position: 'relative',
          borderRadius: theme.shape.borderRadius,
          border: '1px solid',
          borderColor: isDark ? alpha(theme.palette.common.white, 0.08) : alpha(theme.palette.grey[300], 0.8),
          transition: theme.transitions.create(['background-color', 'box-shadow', 'border-color'], {
            duration: theme.transitions.duration.short
          }),
          boxShadow: theme.customShadows.card,
          '&.MuiPaper-outlined': {
            borderColor: isDark ? alpha(theme.palette.common.white, 0.12) : theme.palette.divider
          },
          '&.card-background': {
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat'
          },
          '&.card-hover': {
            '&:hover': {
              boxShadow: isDark ? theme.customShadows.z8 : theme.customShadows.z1,
              transform: 'translateY(-2px)'
            }
          },
          // Color variants following GIB guidelines
          '&.card-primary': getColorStyle('primary'),
          '&.card-secondary': getColorStyle('secondary'),
          '&.card-tertiary': getColorStyle('tertiary'),
          '&.card-error': getColorStyle('error'),
          '&.card-warning': getColorStyle('warning'),
          '&.card-info': getColorStyle('info'),
          '&.card-success': getColorStyle('success'),

          // MainCard specific styling - will apply to all MainCard components
          '&.MainCard': {
            backgroundColor: isDark ? alpha(theme.palette.background.paper, 0.9) : theme.palette.background.paper,
            '&:hover': {
              boxShadow: isDark ? theme.customShadows.z8 : theme.customShadows.z1
            }
          }
        }
      }
    },
    MuiCardHeader: {
      styleOverrides: {
        root: {
          padding: '24px',
          '& + .MuiCardContent-root, & + .MuiCardActions-root, & + .MuiCollapse-root .MuiCardContent-root': {
            paddingTop: 0
          },
          '& .MuiCardHeader-subheader': {
            fontSize: '0.875rem',
            color: theme.palette.text.secondary
          }
        },
        title: {
          fontSize: '1rem',
          fontWeight: 500,
          color: theme.palette.text.primary
        },
        action: {
          marginTop: 0,
          marginRight: 0
        }
      }
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: '24px',
          '&:last-child': {
            paddingBottom: '24px'
          },
          '& + .MuiCardActions-root': {
            paddingTop: 0
          }
        }
      }
    },
    MuiCardActions: {
      styleOverrides: {
        root: {
          padding: '24px',
          '&.card-action-dense': {
            padding: '12px 24px'
          },
          '& .MuiButton-text': {
            paddingLeft: '12px',
            paddingRight: '12px'
          },
          '&.MuiCardActions-spacing > :not(:first-of-type)': {
            marginLeft: '8px'
          }
        }
      }
    },
    MuiCardMedia: {
      styleOverrides: {
        root: {
          backgroundColor: isDark ? theme.palette.background.default : theme.palette.grey[200],
          borderRadius: `${theme.shape.borderRadius}px ${theme.shape.borderRadius}px 0 0`,
          '&.card-media-hover': {
            transition: theme.transitions.create('transform', {
              duration: theme.transitions.duration.standard
            }),
            '&:hover': {
              transform: 'scale(1.05)'
            }
          }
        },
        media: {
          width: '100%'
        }
      }
    }
  };
}
