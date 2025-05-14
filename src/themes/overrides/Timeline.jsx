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
          padding: '12px 16px'
        }
      }
    },
    MuiTimelineDot: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
          margin: 0,
          '&.MuiTimelineDot-filled': {
            boxShadow: theme.customShadows?.primary
          }
        }
      }
    },
    MuiTimelineConnector: {
      styleOverrides: {
        root: {
          backgroundColor: theme.palette.divider
        }
      }
    }
  };
}
