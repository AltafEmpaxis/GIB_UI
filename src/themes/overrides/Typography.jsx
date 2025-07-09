// ==============================|| OVERRIDES - TYPOGRAPHY ||============================== //

export default function Typography(theme) {
  return {
    MuiTypography: {
      styleOverrides: {
        // Heading styles
        h1: {
          color: theme.palette.primary.main, // Dark Grey
          fontWeight: 300 // Light per GIB guidelines
        },
        h2: {
          color: theme.palette.primary.main, // Dark Grey
          fontWeight: 300 // Light per GIB guidelines
        },
        h3: {
          color: theme.palette.primary.main, // Dark Grey
          fontWeight: 300 // Light per GIB guidelines
        },
        h4: {
          color: theme.palette.primary.main, // Dark Grey
          fontWeight: 400 // Book per GIB guidelines
        },
        h5: {
          color: theme.palette.primary.main, // Dark Grey
          fontWeight: 400 // Book per GIB guidelines
        },
        h6: {
          color: theme.palette.primary.main, // Dark Grey
          fontWeight: 400 // Book per GIB guidelines
        },

        // Subtitle styles
        subtitle1: {
          color: theme.palette.primary.main, // Dark Grey
          fontWeight: 500 // Regular per GIB guidelines
        },
        subtitle2: {
          color: theme.palette.primary.main, // Dark Grey
          fontWeight: 500 // Regular per GIB guidelines
        },

        // Body styles
        body1: {
          color: theme.palette.primary.main, // Dark Grey
          fontWeight: 500 // Regular per GIB guidelines
        },
        body2: {
          color: theme.palette.tertiary.main, // Medium Grey
          fontWeight: 500 // Regular per GIB guidelines
        },

        // Caption and overline
        caption: {
          color: theme.palette.tertiary.main, // Medium Grey
          fontWeight: 500 // Regular per GIB guidelines
        },
        overline: {
          fontWeight: 600, // Semi-bold per GIB guidelines
          letterSpacing: '0.5px',
          textTransform: 'uppercase',
          color: theme.palette.tertiary.main // Medium Grey
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
