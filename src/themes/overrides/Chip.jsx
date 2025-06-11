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
            backgroundColor: isDark ? theme.palette.primary.dark : theme.palette.primary.main,
            color: theme.palette.primary.contrastText
          },
          '&.MuiChip-colorSecondary': {
            backgroundColor: isDark ? theme.palette.secondary.dark : theme.palette.secondary.main,
            color: theme.palette.secondary.contrastText
          },
          '&.MuiChip-colorInfo': {
            backgroundColor: isDark ? theme.palette.info.dark : theme.palette.info.main,
            color: theme.palette.info.contrastText
          },
          '&.MuiChip-colorSuccess': {
            backgroundColor: isDark ? theme.palette.success.dark : theme.palette.success.main,
            color: theme.palette.success.contrastText
          },
          '&.MuiChip-colorWarning': {
            backgroundColor: isDark ? theme.palette.warning.dark : theme.palette.warning.main,
            color: theme.palette.warning.contrastText
          },
          '&.MuiChip-colorError': {
            backgroundColor: isDark ? theme.palette.error.dark : theme.palette.error.main,
            color: theme.palette.error.contrastText
          }
        },
        // Outlined variant
        outlined: {
          borderWidth: 1,
          '&.MuiChip-colorDefault': {
            borderColor: isDark ? theme.palette.grey[400] : theme.palette.grey[500],
            color: isDark ? theme.palette.grey[100] : theme.palette.grey[900],
            '&:hover': {
              backgroundColor: isDark ? theme.palette.grey[700] : theme.palette.grey[100]
            }
          },
          '&.MuiChip-colorPrimary': {
            borderColor: theme.palette.primary.main,
            color: theme.palette.primary.main,
            '&:hover': {
              backgroundColor: theme.palette.primary.lighter,
              color: isDark ? theme.palette.primary.light : theme.palette.primary.dark
            }
          },
          '&.MuiChip-colorSecondary': {
            borderColor: theme.palette.secondary.main,
            color: theme.palette.secondary.main,
            '&:hover': {
              backgroundColor: theme.palette.secondary.lighter,
              color: isDark ? theme.palette.secondary.light : theme.palette.secondary.dark
            }
          },
          '&.MuiChip-colorInfo': {
            borderColor: theme.palette.info.main,
            color: theme.palette.info.main,
            '&:hover': {
              backgroundColor: theme.palette.info.lighter,
              color: isDark ? theme.palette.info.light : theme.palette.info.dark
            }
          },
          '&.MuiChip-colorSuccess': {
            borderColor: theme.palette.success.main,
            color: theme.palette.success.main,
            '&:hover': {
              backgroundColor: theme.palette.success.lighter,
              color: isDark ? theme.palette.success.light : theme.palette.success.dark
            }
          },
          '&.MuiChip-colorWarning': {
            borderColor: theme.palette.warning.main,
            color: theme.palette.warning.main,
            '&:hover': {
              backgroundColor: theme.palette.warning.lighter,
              color: isDark ? theme.palette.warning.light : theme.palette.warning.dark
            }
          },
          '&.MuiChip-colorError': {
            borderColor: theme.palette.error.main,
            color: theme.palette.error.main,
            '&:hover': {
              backgroundColor: theme.palette.error.lighter,
              color: isDark ? theme.palette.error.light : theme.palette.error.dark
            }
          }
        },
        // Label styles
        label: {
          fontWeight: 500,
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
