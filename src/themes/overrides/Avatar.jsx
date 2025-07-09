// ==============================|| OVERRIDES - AVATAR ||============================== //

export default function Avatar(theme) {
  // Helper to get readable text color based on background
  const getContrastText = (bg) => {
    if (theme.palette.getContrastText) return theme.palette.getContrastText(bg);
    if (bg === theme.palette.secondary.main) return theme.palette.primary.main;
    if (bg === theme.palette.primary.main) return '#fff';
    return '#fff';
  };

  return {
    MuiAvatar: {
      styleOverrides: {
        root: {
          color: getContrastText(theme.palette.secondary.main),
          backgroundColor: theme.palette.secondary.main,
          transition: 'all .2s ease-in-out',
          '&:hover': {
            backgroundColor: theme.palette.secondary.dark
          },
          '&.Mui-disabled': {
            backgroundColor: theme.palette.grey[200],
            color: theme.palette.tertiary.main
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
          background: theme.palette.secondary.main,
          color: getContrastText(theme.palette.secondary.main),
          '&:hover': {
            background: theme.palette.secondary.dark
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
            // Odd/even: odd (1st, 3rd, ...) = GIB Yellow, even (2nd, 4th, ...) = Dark Grey
            // Use nth-of-type(odd/even) for CSS selectors
            backgroundColor: theme.palette.secondary.main,
            color: getContrastText(theme.palette.secondary.main),
            '&:nth-of-type(even)': {
              backgroundColor: theme.palette.primary.main,
              color: getContrastText(theme.palette.primary.main)
            },
            border: `2px solid ${theme.palette.background.paper}`
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
            borderColor: theme.palette.secondary.dark,
            cursor: 'pointer'
          }
        }
      }
    }
  };
}
