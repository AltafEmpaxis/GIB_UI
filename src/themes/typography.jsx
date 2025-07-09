// ==============================|| DEFAULT THEME - TYPOGRAPHY  ||============================== //

/**
 * Typography configuration for theme
 *
 * This typography setup provides consistent text presentation across the UI.
 *
 * Key features:
 * - Responsive font sizes for different breakpoints
 * - Consistent line heights and letter spacing
 * - Optimized for readability
 *
 * @param {string} fontFamily - The font family to use throughout the application
 * @returns {Object} Typography configuration object for MUI theme
 */
export function themeTypography(fontFamily) {
  return {
    fontFamily,
    h1: {
      fontWeight: 600,
      fontSize: {
        xs: '1.875rem', // 30px
        sm: '2.125rem', // 34px
        md: '2.375rem' // 38px
      },
      lineHeight: 1.21,
      letterSpacing: '-0.5px'
    },
    h2: {
      fontWeight: 600,
      fontSize: {
        xs: '1.5rem', // 24px
        sm: '1.675rem', // 26.8px
        md: '1.875rem' // 30px
      },
      lineHeight: 1.27,
      letterSpacing: '-0.5px'
    },
    h3: {
      fontWeight: 600,
      fontSize: {
        xs: '1.25rem', // 20px
        sm: '1.375rem', // 22px
        md: '1.5rem' // 24px
      },
      lineHeight: 1.33,
      letterSpacing: '0'
    },
    h4: {
      fontWeight: 600,
      fontSize: {
        xs: '1.125rem', // 18px
        md: '1.25rem' // 20px
      },
      lineHeight: 1.4,
      letterSpacing: '0.15px'
    },
    h5: {
      fontWeight: 600,
      fontSize: '1rem', // 16px
      lineHeight: 1.5,
      letterSpacing: '0'
    },
    h6: {
      fontWeight: 400,
      fontSize: '0.875rem', // 14px
      lineHeight: 1.57,
      letterSpacing: '0.15px'
    },
    subtitle1: {
      fontSize: '0.875rem', // 14px
      fontWeight: 500,
      lineHeight: 1.57,
      letterSpacing: '0.1px'
    },
    subtitle2: {
      fontSize: '0.75rem', // 12px
      fontWeight: 500,
      lineHeight: 1.66,
      letterSpacing: '0.1px'
    },
    body1: {
      fontSize: '0.875rem', // 14px
      lineHeight: 1.57,
      letterSpacing: '0.15px'
    },
    body2: {
      fontSize: '0.75rem', // 12px
      lineHeight: 1.66,
      letterSpacing: '0.15px'
    },
    button: {
      textTransform: 'capitalize',
      fontWeight: 500,
      letterSpacing: '0.4px',
      fontSize: {
        xs: '0.8125rem', // 13px
        sm: '0.875rem' // 14px
      }
    },
    caption: {
      fontSize: '0.75rem', // 12px
      fontWeight: 400,
      lineHeight: 1.66,
      letterSpacing: '0.4px'
    },
    overline: {
      fontSize: '0.75rem', // 12px
      fontWeight: 600,
      letterSpacing: '1px',
      lineHeight: 2.5,
      textTransform: 'uppercase'
    },
    // Custom text styles
    customHeading: {
      fontWeight: 700,
      fontSize: '1.5rem',
      lineHeight: 1.3,
      letterSpacing: '-0.25px',
      marginBottom: '1rem'
    },
    customSubheading: {
      fontWeight: 600,
      fontSize: '1.125rem',
      lineHeight: 1.4,
      marginBottom: '0.75rem'
    },
    accent: {
      fontWeight: 600
    },
    customCaption: {
      fontSize: '0.75rem',
      fontWeight: 400,
      lineHeight: 1.5,
      fontStyle: 'italic'
    }
  };
}

export default themeTypography;
