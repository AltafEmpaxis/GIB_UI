// material-ui
import { alpha } from '@mui/material/styles';

// project import
import { presetPalettes } from './presets';

// Common colors for light and dark modes
const commonColors = {
  black: '#000',
  white: '#fff'
};

// ==============================|| DEFAULT THEME - PALETTE  ||============================== //

export function themePalette(mode = 'light', presetColor = 'default') {
  const colors = presetPalettes[presetColor || 'default'];
  const isDark = mode === 'dark';

  return {
    mode,
    common: commonColors,

    // Primary color with dark mode handling
    primary: {
      ...colors.primary,
      main: isDark ? alpha(colors.primary.main, 0.98) : colors.primary.main,
      light: isDark ? alpha(colors.primary.light, 0.98) : colors.primary.light,
      dark: isDark ? alpha(colors.primary.dark, 0.98) : colors.primary.dark
    },

    // Secondary color with dark mode handling
    secondary: {
      ...colors.secondary,
      main: isDark ? alpha(colors.secondary.main, 0.98) : colors.secondary.main,
      light: isDark ? alpha(colors.secondary.light, 0.98) : colors.secondary.light,
      dark: isDark ? alpha(colors.secondary.dark, 0.98) : colors.secondary.dark
    },

    // Dynamically add tertiary color if available in the preset
    ...(colors.tertiary && {
      tertiary: {
        ...colors.tertiary,
        main: isDark ? alpha(colors.tertiary.main, 0.98) : colors.tertiary.main,
        light: isDark ? alpha(colors.tertiary.light, 0.98) : colors.tertiary.light,
        dark: isDark ? alpha(colors.tertiary.dark, 0.98) : colors.tertiary.dark
      }
    }),

    // Standard colors with dark mode handling
    error: {
      ...colors.error,
      main: isDark ? alpha(colors.error.main, 0.98) : colors.error.main,
      light: isDark ? alpha(colors.error.light, 0.98) : colors.error.light,
      dark: isDark ? alpha(colors.error.dark, 0.98) : colors.error.dark
    },
    warning: {
      ...colors.warning,
      main: isDark ? alpha(colors.warning.main, 0.98) : colors.warning.main,
      light: isDark ? alpha(colors.warning.light, 0.98) : colors.warning.light,
      dark: isDark ? alpha(colors.warning.dark, 0.98) : colors.warning.dark
    },
    info: {
      ...colors.info,
      main: isDark ? alpha(colors.info.main, 0.98) : colors.info.main,
      light: isDark ? alpha(colors.info.light, 0.98) : colors.info.light,
      dark: isDark ? alpha(colors.info.dark, 0.98) : colors.info.dark
    },
    success: {
      ...colors.success,
      main: isDark ? alpha(colors.success.main, 0.98) : colors.success.main,
      light: isDark ? alpha(colors.success.light, 0.98) : colors.success.light,
      dark: isDark ? alpha(colors.success.dark, 0.98) : colors.success.dark
    },

    // Grey palette
    grey: colors.grey,

    // Text colors
    text: {
      primary: isDark ? alpha(commonColors.white, 0.98) : colors.grey[900],
      secondary: isDark ? alpha(commonColors.white, 0.85) : colors.grey[700],
      disabled: isDark ? alpha(commonColors.white, 0.6) : colors.grey[500]
    },

    // Actions
    action: {
      active: isDark ? alpha(commonColors.white, 0.9) : colors.grey[700],
      hover: isDark ? alpha(commonColors.white, 0.12) : alpha(colors.grey[700], 0.08),
      selected: isDark ? alpha(commonColors.white, 0.2) : alpha(colors.grey[700], 0.14),
      disabled: isDark ? alpha(commonColors.white, 0.6) : colors.grey[500],
      disabledBackground: isDark ? alpha(colors.grey[900], 0.3) : alpha(colors.grey[200], 0.3),
      focus: isDark ? alpha(commonColors.white, 0.16) : alpha(colors.grey[700], 0.12),
      hoverOpacity: 0.08,
      selectedOpacity: 0.16,
      disabledOpacity: 0.38,
      focusOpacity: 0.12,
      activatedOpacity: 0.24
    },

    // Background colors - dynamically use custom dark background if defined in theme
    background: {
      default: isDark ? colors.darkBackground || colors.darkPaper : colors.backgroundDefault,
      paper: isDark ? alpha(colors.darkBackground || colors.darkPaper, 0.98) : colors.paper,
      neutral: isDark ? alpha(colors.grey[900], 0.92) : colors.grey[100]
    },

    // Divider
    divider: isDark ? alpha(colors.grey[500], 0.28) : colors.grey[200]
  };
}

export default themePalette;
