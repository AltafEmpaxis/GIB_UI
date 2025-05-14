// ==============================|| OVERRIDES - TYPOGRAPHY ||============================== //

export function typographyOverrides(theme) {
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
          color: theme.palette.text.secondary
        },
        subtitle2: {
          color: theme.palette.text.secondary
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
          fontWeight: 600,
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
      },
      defaultProps: {
        variantMapping: {
          h1: 'h1',
          h2: 'h2',
          h3: 'h3',
          h4: 'h4',
          h5: 'h5',
          h6: 'h6',
          subtitle1: 'h6',
          subtitle2: 'h6',
          body1: 'p',
          body2: 'p',
          caption: 'span',
          overline: 'span'
        }
      }
    }
  };
}

export default typographyOverrides;
