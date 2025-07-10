// ==============================|| DEFAULT THEME - TYPOGRAPHY  ||============================== //

/**
 * Typography configuration for theme
 *
 * Configured according to GIB brand guidelines:
 * - Display heading: 32px+, line-height 1.25
 * - Section/sub-heading: 24-28px, line-height 1.3
 * - Body copy: 16px, line-height 1.5
 * - Caption & labels: 12-14px, line-height 1.4
 *
 * FS Emeric font weights:
 * - 300: Light (for large display headings)
 * - 400: Book (for subheadings & captions)
 * - 500: Regular (for body text)
 * - 600: SemiBold (for buttons, key labels)
 */
export function themeTypography(fontFamily) {
  return {
    fontFamily,
    h1: {
      fontWeight: 300, // Light weight for large display headings
      fontSize: {
        xs: '2rem', // 32px
        sm: '2.25rem', // 36px
        md: '2.5rem' // 40px
      },
      lineHeight: 1.25,
      letterSpacing: '-0.5px'
    },
    h2: {
      fontWeight: 400, // Book weight for subheadings per GIB guidelines
      fontSize: {
        xs: '1.5rem', // 24px
        sm: '1.625rem', // 26px
        md: '1.75rem' // 28px
      },
      lineHeight: 1.3,
      letterSpacing: '-0.25px'
    },
    h3: {
      fontWeight: 400, // Book weight for subheadings per GIB guidelines
      fontSize: {
        xs: '1.5rem', // 24px - updated to match 24px minimum for subheadings
        sm: '1.625rem', // 26px
        md: '1.75rem' // 28px
      },
      lineHeight: 1.3,
      letterSpacing: '0'
    },
    h4: {
      fontWeight: 400, // Book weight for smaller headings
      fontSize: '1.25rem', // 20px
      lineHeight: 1.4,
      letterSpacing: '0.15px'
    },
    h5: {
      fontWeight: 400, // Book weight
      fontSize: '1rem', // 16px
      lineHeight: 1.5,
      letterSpacing: '0'
    },
    h6: {
      fontWeight: 400, // Book weight
      fontSize: '0.875rem', // 14px
      lineHeight: 1.4,
      letterSpacing: '0.15px'
    },
    subtitle1: {
      fontSize: '0.875rem', // 14px
      fontWeight: 500, // Regular weight for emphasis
      lineHeight: 1.4,
      letterSpacing: '0.1px'
    },
    subtitle2: {
      fontSize: '0.75rem', // 12px
      fontWeight: 500, // Regular weight for emphasis
      lineHeight: 1.4,
      letterSpacing: '0.1px'
    },
    body1: {
      fontSize: '1rem', // 16px per guideline for body copy
      fontWeight: 500, // Regular weight for body text
      lineHeight: 1.5,
      letterSpacing: '0.15px'
    },
    body2: {
      fontSize: '0.875rem', // 14px
      fontWeight: 500, // Regular weight
      lineHeight: 1.4,
      letterSpacing: '0.15px'
    },
    button: {
      textTransform: 'capitalize',
      fontWeight: 600, // Semi-bold for buttons per guideline
      letterSpacing: '0.4px',
      fontSize: {
        xs: '0.875rem', // 14px - updated to match 14px minimum for buttons
        sm: '0.9375rem', // 15px
        md: '1rem', // 16px
        lg: '1.125rem' // 18px
      },
      lineHeight: 1.4
    },
    caption: {
      fontSize: '0.75rem', // 12px
      fontWeight: 400, // Book weight for captions per guideline
      lineHeight: 1.4,
      letterSpacing: '0.4px'
    },
    overline: {
      fontSize: '0.75rem', // 12px
      fontWeight: 600, // Semi-bold
      letterSpacing: '1px',
      lineHeight: 1.4,
      textTransform: 'uppercase'
    }
  };
}

export default themeTypography;
