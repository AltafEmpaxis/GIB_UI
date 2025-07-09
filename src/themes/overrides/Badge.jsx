// ==============================|| OVERRIDES - BADGE ||============================== //

export default function Badge(theme) {
  return {
    MuiBadge: {
      styleOverrides: {
        badge: {
          '&.MuiBadge-dot': {
            minWidth: 8,
            height: 8,
            borderRadius: '50%',
            boxShadow: `0 0 0 1px ${theme.palette.background.paper}`,
            padding: 0,
            zIndex: 10
          },

          '&.MuiBadge-colorPrimary': {
            backgroundColor: theme.palette.primary.main, // Dark Grey
            color: theme.palette.common.white
          },

          '&.MuiBadge-colorSecondary': {
            backgroundColor: theme.palette.secondary.main, // GIB Yellow
            color: theme.palette.primary.main // Dark Grey text on yellow
          },

          '&.MuiBadge-colorError': {
            backgroundColor: theme.palette.error.main,
            color: theme.palette.error.contrastText
          },

          '&.MuiBadge-colorSuccess': {
            backgroundColor: theme.palette.success.main,
            color: theme.palette.success.contrastText
          },

          '&.MuiBadge-colorWarning': {
            backgroundColor: theme.palette.warning.main,
            color: theme.palette.warning.contrastText
          },

          '&.MuiBadge-colorInfo': {
            backgroundColor: theme.palette.info.main,
            color: theme.palette.info.contrastText
          },

          // Standard badge styles
          fontSize: '0.75rem',
          fontWeight: 600, // Semi-bold per GIB guidelines
          padding: '0 6px',
          minWidth: 20,
          height: 20,
          borderRadius: 10
        },

        // Badge positions
        anchorOriginTopRight: {
          top: 4,
          right: 4
        },

        anchorOriginBottomRight: {
          '&.MuiBadge-anchorOriginBottomRight': {
            bottom: 5,
            right: 5,

            '&.MuiBadge-overlapCircular .MuiBadge-badge': {
              transform: 'translate(25%, 25%)',
              transformOrigin: '100% 100%'
            }
          }
        }
      }
    }
  };
}
