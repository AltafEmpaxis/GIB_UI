// material-ui
import { alpha } from '@mui/material/styles';

// ==============================|| OVERRIDES - CARD ||============================== //

export default function Card(theme) {
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
          borderColor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(230,230,230,0.8)',
          transition: theme.transitions.create(['background-color', 'box-shadow', 'border-color'], {
            duration: theme.transitions.duration.shorter
          }),
          '&.MuiPaper-outlined': {
            borderColor: theme.palette.divider
          },
          '&.card-background': {
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat'
          },
          '&.card-hover': {
            '&:hover': {
              boxShadow: theme.shadows[8]
            }
          },
          // Color variants
          '&.card-primary': getColorStyle('primary'),
          '&.card-secondary': getColorStyle('secondary'),
          '&.card-error': getColorStyle('error'),
          '&.card-warning': getColorStyle('warning'),
          '&.card-info': getColorStyle('info'),
          '&.card-success': getColorStyle('success')
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
          backgroundColor: theme.palette.grey[200],
          '&.card-media-hover': {
            transition: theme.transitions.create('transform'),
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
