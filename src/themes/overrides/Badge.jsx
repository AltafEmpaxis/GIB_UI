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
            backgroundColor: theme.palette.primary.main
          },

          '&.MuiBadge-colorSecondary': {
            backgroundColor: theme.palette.secondary.main
          },

          '&.MuiBadge-colorError': {
            backgroundColor: theme.palette.error.main
          },

          '&.MuiBadge-colorSuccess': {
            backgroundColor: theme.palette.success.main
          },

          '&.MuiBadge-colorWarning': {
            backgroundColor: theme.palette.warning.main
          },

          '&.MuiBadge-colorInfo': {
            backgroundColor: theme.palette.info.main
          }
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
