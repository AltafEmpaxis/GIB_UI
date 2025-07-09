// ==============================|| OVERRIDES - LINK ||============================== //

export default function Link(theme) {
  return {
    MuiLink: {
      defaultProps: {
        underline: 'hover'
      },
      styleOverrides: {
        root: {
          fontWeight: 500,
          display: 'inline-flex',
          alignItems: 'center',
          gap: 4,
          cursor: 'pointer',
          textDecoration: 'none',
          color: theme.palette.secondary.main, // GIB Yellow
          transition: theme.transitions.create(['color', 'text-decoration']),
          '&:hover': {
            color: theme.palette.secondary.dark, // Yellow dark variant
            textDecoration: 'none'
          },
          '&:active': {
            color: theme.palette.secondary.darker // Yellow darker variant
          },
          '&.MuiLink-underlineNone': {
            textDecoration: 'none',
            '&:hover': {
              textDecoration: 'none'
            }
          },
          '&.MuiLink-underlineHover': {
            textDecoration: 'none',
            '&:hover': {
              textDecoration: 'none'
            }
          },
          '&.MuiLink-underlineAlways': {
            textDecoration: 'underline',
            textUnderlineOffset: 2
          },
          // GIB specific variants
          '&.MuiLink-primary': {
            color: theme.palette.primary.main, // Dark Grey
            '&:hover': {
              color: theme.palette.primary.dark // Dark Grey dark variant
            }
          },
          '&.MuiLink-secondary': {
            color: theme.palette.secondary.main, // GIB Yellow
            '&:hover': {
              color: theme.palette.secondary.dark // Yellow dark variant
            }
          },
          '&.MuiLink-tertiary': {
            color: theme.palette.tertiary.main, // Medium Grey
            '&:hover': {
              color: theme.palette.tertiary.dark // Medium Grey dark variant
            }
          },
          '&.Mui-disabled': {
            color: theme.palette.tertiary.main, // Medium Grey
            pointerEvents: 'none'
          }
        },
        button: {
          '&:hover': {
            backgroundColor: 'transparent',
            color: theme.palette.secondary.dark // Yellow dark variant
          }
        }
      }
    }
  };
}
