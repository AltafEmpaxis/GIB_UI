import { alpha } from '@mui/material/styles';

// ==============================|| OVERRIDES - CHIP ||============================== //

export default function Chip(theme) {
  const isDark = theme.palette.mode === 'dark';

  return {
    MuiChip: {
      styleOverrides: {
        root: {
          margin: '1px !important',
          padding: '1px !important',
          borderRadius: 4,
          '&:active': {
            boxShadow: 'none'
          },
          transition: 'all 0.2s ease-in-out',
          alignItems: 'center'
        },
        // Size variants
        sizeMedium: {
          height: 24,
          fontSize: '0.875rem',
          '.MuiChip-icon': {
            fontSize: '1rem'
          },
          '.MuiChip-avatar': {
            width: 20,
            height: 20
          },
          '.MuiChip-deleteIcon': {
            fontSize: '1rem',
            marginRight: 4
          },
          '.MuiChip-label': {
            paddingLeft: 10,
            paddingRight: 10,
            lineHeight: '24px'
          }
        },
        sizeSmall: {
          height: 16,
          fontSize: '0.625rem',
          '.MuiChip-icon': {
            fontSize: '0.75rem'
          },
          '.MuiChip-avatar': {
            width: 14,
            height: 14
          },
          '.MuiChip-deleteIcon': {
            fontSize: '0.75rem',
            marginRight: 4
          },
          '.MuiChip-label': {
            paddingLeft: 6,
            paddingRight: 6,
            lineHeight: '16px'
          }
        },
        // Filled variant
        filled: {
          '&.MuiChip-colorDefault': {
            backgroundColor: isDark ? theme.palette.grey[700] : theme.palette.grey[300],
            color: isDark ? theme.palette.grey[100] : theme.palette.grey[900]
          },
          '&.MuiChip-colorPrimary': {
            backgroundColor: theme.palette.primary.main, // Dark Grey
            color: theme.palette.common.white
          },
          '&.MuiChip-colorSecondary': {
            backgroundColor: theme.palette.secondary.main, // GIB Yellow
            color: theme.palette.primary.main // Dark Grey text on yellow
          },
          '&.MuiChip-colorInfo': {
            backgroundColor: theme.palette.info.main,
            color: theme.palette.info.contrastText
          },
          '&.MuiChip-colorSuccess': {
            backgroundColor: theme.palette.success.main,
            color: theme.palette.success.contrastText
          },
          '&.MuiChip-colorWarning': {
            backgroundColor: theme.palette.warning.main,
            color: theme.palette.warning.contrastText
          },
          '&.MuiChip-colorError': {
            backgroundColor: theme.palette.error.main,
            color: theme.palette.error.contrastText
          }
        },
        // Outlined variant
        outlined: {
          borderWidth: 1,
          '&.MuiChip-colorDefault': {
            borderColor: theme.palette.tertiary.main, // Medium Grey
            color: theme.palette.primary.main, // Dark Grey
            '&:hover': {
              backgroundColor: alpha(theme.palette.tertiary.main, 0.1) // 10% Medium Grey
            }
          },
          '&.MuiChip-colorPrimary': {
            borderColor: theme.palette.primary.main, // Dark Grey
            color: theme.palette.primary.main, // Dark Grey
            '&:hover': {
              backgroundColor: alpha(theme.palette.primary.main, 0.1) // 10% Dark Grey
            }
          },
          '&.MuiChip-colorSecondary': {
            borderColor: theme.palette.secondary.main, // GIB Yellow
            color: theme.palette.secondary.main, // GIB Yellow
            '&:hover': {
              backgroundColor: alpha(theme.palette.secondary.main, 0.1) // 10% Yellow
            }
          },
          '&.MuiChip-colorInfo': {
            borderColor: theme.palette.info.main,
            color: theme.palette.info.main,
            '&:hover': {
              backgroundColor: alpha(theme.palette.info.main, 0.1)
            }
          },
          '&.MuiChip-colorSuccess': {
            borderColor: theme.palette.success.main,
            color: theme.palette.success.main,
            '&:hover': {
              backgroundColor: alpha(theme.palette.success.main, 0.1)
            }
          },
          '&.MuiChip-colorWarning': {
            borderColor: theme.palette.warning.main,
            color: theme.palette.warning.main,
            '&:hover': {
              backgroundColor: alpha(theme.palette.warning.main, 0.1)
            }
          },
          '&.MuiChip-colorError': {
            borderColor: theme.palette.error.main,
            color: theme.palette.error.main,
            '&:hover': {
              backgroundColor: alpha(theme.palette.error.main, 0.1)
            }
          }
        },
        // Label styles
        label: {
          fontWeight: 600, // Semi-bold per GIB guidelines
          display: 'inline-flex',
          alignItems: 'center'
        },
        // Icon styles
        icon: {
          color: 'inherit',
          display: 'inline-flex',
          alignItems: 'center'
        },
        // Avatar styles
        avatar: {
          color: 'inherit',
          backgroundColor: 'transparent',
          display: 'inline-flex',
          alignItems: 'center'
        },
        // Delete icon styles
        deleteIcon: {
          color: 'inherit',
          opacity: 0.7,
          display: 'inline-flex',
          alignItems: 'center',
          '&:hover': {
            opacity: 1,
            color: 'inherit'
          },
          '&.MuiChip-deleteIconColorPrimary:hover': {
            color: theme.palette.primary.light
          },
          '&.MuiChip-deleteIconColorSecondary:hover': {
            color: theme.palette.secondary.light
          },
          '&.MuiChip-deleteIconColorInfo:hover': {
            color: theme.palette.info.light
          },
          '&.MuiChip-deleteIconColorSuccess:hover': {
            color: theme.palette.success.light
          },
          '&.MuiChip-deleteIconColorWarning:hover': {
            color: theme.palette.warning.light
          },
          '&.MuiChip-deleteIconColorError:hover': {
            color: theme.palette.error.light
          }
        }
      }
    }
  };
}
