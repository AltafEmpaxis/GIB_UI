// material-ui
import { alpha } from '@mui/material/styles';

// ==============================|| OVERRIDES - TYPOGRAPHY ||============================== //

export default function Typography(theme) {
  const isDark = theme.palette.mode === 'dark';

  return {
    MuiTypography: {
      styleOverrides: {
        // Heading styles - Updated to match themeTypography
        h1: {
          color: isDark ? theme.palette.common.white : theme.palette.primary.main, // White in dark mode, Dark Grey in light mode
          fontWeight: 300 // Light per GIB guidelines
        },
        h2: {
          color: isDark ? theme.palette.common.white : theme.palette.primary.main,
          fontWeight: 400 // Book per GIB guidelines
        },
        h3: {
          color: isDark ? theme.palette.common.white : theme.palette.primary.main,
          fontWeight: 400 // Book per GIB guidelines
        },
        h4: {
          color: isDark ? theme.palette.common.white : theme.palette.primary.main,
          fontWeight: 400 // Book per GIB guidelines
        },
        h5: {
          color: isDark ? theme.palette.common.white : theme.palette.primary.main,
          fontWeight: 400 // Book per GIB guidelines
        },
        h6: {
          color: isDark ? theme.palette.common.white : theme.palette.primary.main,
          fontWeight: 400 // Book per GIB guidelines
        },

        // Subtitle styles
        subtitle1: {
          color: isDark ? theme.palette.common.white : theme.palette.primary.main,
          fontWeight: 500 // Regular per GIB guidelines
        },
        subtitle2: {
          color: isDark ? theme.palette.common.white : theme.palette.primary.main,
          fontWeight: 500 // Regular per GIB guidelines
        },

        // Body styles
        body1: {
          color: isDark ? theme.palette.common.white : theme.palette.primary.main,
          fontWeight: 500 // Regular per GIB guidelines
        },
        body2: {
          color: isDark ? alpha(theme.palette.common.white, 0.8) : theme.palette.tertiary.main, // Slightly dimmed white in dark mode, Medium Grey in light mode
          fontWeight: 500 // Regular per GIB guidelines
        },

        // Caption and overline
        caption: {
          color: isDark ? alpha(theme.palette.common.white, 0.7) : theme.palette.tertiary.main, // Medium Grey with adjusted opacity for dark mode
          fontWeight: 400 // Book per GIB guidelines
        },
        overline: {
          fontWeight: 600, // Semi-bold per GIB guidelines
          letterSpacing: '1px', // Match typography.jsx
          textTransform: 'uppercase',
          color: isDark ? alpha(theme.palette.common.white, 0.7) : theme.palette.tertiary.main // Medium Grey with adjusted opacity for dark mode
        },

        // Button styles - ensure consistent with typography.jsx
        button: {
          fontWeight: 600, // Semi-bold for buttons per GIB guidelines
          textTransform: 'capitalize'
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
