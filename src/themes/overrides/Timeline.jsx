// ==============================|| OVERRIDES - TIMELINE ||============================== //

export default function Timeline(theme) {
  return {
    MuiTimelineItem: {
      styleOverrides: {
        root: {
          '&:before': {
            padding: 0
          }
        }
      }
    },
    MuiTimelineContent: {
      styleOverrides: {
        root: {
          padding: '12px 16px',
          color: theme.palette.primary.main // Dark Grey
        }
      }
    },
    MuiTimelineDot: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
          margin: 0,
          '&.MuiTimelineDot-filled': {
            boxShadow: theme.customShadows?.secondary || 'none', // Use secondary shadow (Yellow-based)
            backgroundColor: theme.palette.secondary.main // GIB Yellow
          },
          '&.MuiTimelineDot-outlined': {
            borderColor: theme.palette.secondary.main, // GIB Yellow
            color: theme.palette.secondary.main // GIB Yellow
          }
        }
      }
    },
    MuiTimelineConnector: {
      styleOverrides: {
        root: {
          backgroundColor: theme.palette.tertiary.main // Medium Grey
        }
      }
    }
  };
}
