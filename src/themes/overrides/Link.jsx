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
          color: theme.palette.primary.main,
          transition: theme.transitions.create(['color', 'text-decoration']),
          '&:hover': {
            color: theme.palette.secondary.main,
            textDecoration: 'none'
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
          }
        },
        button: {
          '&:hover': {
            backgroundColor: 'transparent',
            color: theme.palette.secondary.main
          }
        }
      }
    }
  };
}
