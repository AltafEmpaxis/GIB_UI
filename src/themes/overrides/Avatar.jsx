// ==============================|| OVERRIDES - AVATAR ||============================== //

export default function Avatar(theme) {
  return {
    MuiAvatar: {
      styleOverrides: {
        root: {
          color: theme.palette.background.paper,
          backgroundColor: theme.palette.primary.lighter,
          transition: 'all .2s ease-in-out',
          '&:hover': {
            backgroundColor: theme.palette.primary.light
          }
        },
        rounded: {
          borderRadius: theme.shape.borderRadius
        },
        circular: {
          '& .MuiSvgIcon-root': {
            fontSize: '1.1rem'
          }
        },
        colorDefault: {
          background: theme.palette.primary.lighter,
          color: theme.palette.primary.main,
          '&:hover': {
            background: theme.palette.primary.light
          }
        },
        small: {
          width: 28,
          height: 28,
          fontSize: '0.75rem',
          '& .MuiSvgIcon-root': {
            fontSize: '1rem'
          }
        },
        medium: {
          width: 36,
          height: 36,
          fontSize: '0.875rem',
          '& .MuiSvgIcon-root': {
            fontSize: '1.25rem'
          }
        },
        large: {
          width: 44,
          height: 44,
          fontSize: '1rem',
          '& .MuiSvgIcon-root': {
            fontSize: '1.5rem'
          }
        }
      }
    },
    MuiAvatarGroup: {
      styleOverrides: {
        root: {
          '& .MuiAvatar-root': {
            borderColor: theme.palette.background.paper,
            fontSize: '0.875rem',
            '&:first-of-type': {
              border: `2px solid ${theme.palette.background.paper}`
            }
          }
        },
        avatar: {
          border: `2px solid ${theme.palette.background.paper}`,
          boxSizing: 'content-box',
          marginLeft: -8,
          '&:last-child': {
            marginLeft: -8
          },
          '&:hover': {
            borderColor: theme.palette.primary.light,
            cursor: 'pointer'
          }
        }
      }
    }
  };
}
