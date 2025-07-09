// material-ui

// ==============================|| OVERRIDES - PAPER ||============================== //

export default function Paper(theme) {
  return {
    MuiPaper: {
      defaultProps: {
        elevation: 0
      },
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          backgroundColor: theme.palette.background.paper,
          transition: theme.transitions.create(['background-color', 'box-shadow', 'border-color'], {
            duration: theme.transitions.duration.shorter
          }),
          '&[href]': {
            textDecorationLine: 'none'
          },
          '&.MuiPaper-outlined': {
            borderColor: theme.palette.divider
          }
        },
        outlined: {
          borderColor: theme.palette.divider,
          background: theme.palette.background.paper
        },
        elevation: {
          '&.MuiPaper-elevation0': {
            boxShadow: 'none'
          },
          '&.MuiPaper-elevation1': {
            boxShadow: theme.shadows[1]
          },
          '&.MuiPaper-elevation4': {
            boxShadow: theme.shadows[4]
          },
          '&.MuiPaper-elevation8': {
            boxShadow: theme.shadows[8]
          },
          '&.MuiPaper-elevation12': {
            boxShadow: theme.shadows[12]
          },
          '&.MuiPaper-elevation16': {
            boxShadow: theme.shadows[16]
          },
          '&.MuiPaper-elevation20': {
            boxShadow: theme.shadows[20]
          },
          '&.MuiPaper-elevation24': {
            boxShadow: theme.shadows[24]
          }
        }
      }
    }
  };
}
