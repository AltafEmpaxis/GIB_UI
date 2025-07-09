// ==============================|| OVERRIDES - TYPOGRAPHY ||============================== //

export default function Typography(theme) {
  return {
    MuiTypography: {
      styleOverrides: {
        // Heading styles
        h1: {
          color: theme.palette.text.primary
        },
        h2: {
          color: theme.palette.text.primary
        },
        h3: {
          color: theme.palette.text.primary
        },
        h4: {
          color: theme.palette.text.primary
        },
        h5: {
          color: theme.palette.text.primary
        },
        h6: {
          color: theme.palette.text.primary
        },

        // Subtitle styles
        subtitle1: {
          color: theme.palette.text.secondary,
          fontWeight: 500
        },
        subtitle2: {
          color: theme.palette.text.secondary,
          fontWeight: 500
        },

        // Body styles
        body1: {
          color: theme.palette.text.primary
        },
        body2: {
          color: theme.palette.text.secondary
        },

        // Caption and overline
        caption: {
          color: theme.palette.text.secondary
        },
        overline: {
          fontWeight: 500,
          letterSpacing: '0.5px',
          textTransform: 'uppercase',
          color: theme.palette.text.secondary
        },

        // Common styles
        gutterBottom: {
          marginBottom: 12
        },
        paragraph: {
          marginBottom: 16
        }
      }
    }
  };
}
