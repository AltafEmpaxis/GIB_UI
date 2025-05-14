// ==============================|| DEFAULT THEME - TYPOGRAPHY  ||============================== //

export function themeTypography(fontFamily) {
  return {
    fontFamily,
    h1: {
      fontWeight: 600,
      fontSize: '2.375rem',
      lineHeight: 1.21,
      letterSpacing: '-0.5px'
    },
    h2: {
      fontWeight: 600,
      fontSize: '1.875rem',
      lineHeight: 1.27,
      letterSpacing: '-0.5px'
    },
    h3: {
      fontWeight: 600,
      fontSize: '1.5rem',
      lineHeight: 1.33,
      letterSpacing: '0'
    },
    h4: {
      fontWeight: 600,
      fontSize: '1.25rem',
      lineHeight: 1.4,
      letterSpacing: '0.15px'
    },
    h5: {
      fontWeight: 600,
      fontSize: '1rem',
      lineHeight: 1.5,
      letterSpacing: '0'
    },
    h6: {
      fontWeight: 400,
      fontSize: '0.875rem',
      lineHeight: 1.57,
      letterSpacing: '0.15px'
    },
    subtitle1: {
      fontSize: '0.875rem',
      fontWeight: 500,
      lineHeight: 1.57,
      letterSpacing: '0.1px'
    },
    subtitle2: {
      fontSize: '0.75rem',
      fontWeight: 500,
      lineHeight: 1.66,
      letterSpacing: '0.1px'
    },
    body1: {
      fontSize: '0.875rem',
      lineHeight: 1.57,
      letterSpacing: '0.15px'
    },
    body2: {
      fontSize: '0.75rem',
      lineHeight: 1.66,
      letterSpacing: '0.15px'
    },
    button: {
      textTransform: 'capitalize',
      fontWeight: 500,
      letterSpacing: '0.4px'
    },
    caption: {
      fontSize: '0.75rem',
      fontWeight: 400,
      lineHeight: 1.66,
      letterSpacing: '0.4px'
    },
    overline: {
      fontSize: '0.75rem',
      fontWeight: 600,
      letterSpacing: '1px',
      lineHeight: 2.5,
      textTransform: 'uppercase'
    }
  };
}

export default themeTypography;
