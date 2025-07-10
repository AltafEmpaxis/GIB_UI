// material-ui
import { alpha } from '@mui/material/styles';

// Common colors for light and dark modes
const COMMON = {
  black: '#000',
  white: '#fff'
};

// Primary color - Dark Grey (Pantone Cool Gray 11C)
const PRIMARY = {
  lighter: '#e9e9e9',
  light: '#888a8e',
  main: '#53565A', // Dark Grey - R:83 G:86 B:90
  dark: '#424448',
  darker: '#323438',
  100: '#e9e9e9', // Matches lighter
  200: '#d3d3d3',
  300: '#bcbcbc',
  400: '#a6a6a6',
  500: '#8f8f8f',
  600: '#53565A', // Matches main
  700: '#424448', // Matches dark
  800: '#323438', // Matches darker
  900: '#212328',
  contrastText: '#ffffff'
};

// Secondary color - GIB Yellow (Pantone 123C)
const SECONDARY = {
  lighter: '#fff8e1',
  light: '#ffe082',
  main: '#FFC72C', // GIB Yellow - R:255 G:199 B:44
  dark: '#ffb300',
  darker: '#ff8f00',
  100: '#fff8e1', // Matches lighter
  200: '#ffecb3',
  300: '#ffe082', // Matches light
  400: '#ffd54f',
  500: '#ffca28',
  600: '#FFC72C', // Matches main
  700: '#ffb300', // Matches dark
  800: '#ffa000',
  900: '#ff8f00', // Matches darker
  contrastText: 'rgba(0, 0, 0, 0.87)'
};

// Tertiary color - Medium Grey (Pantone 429C)
const TERTIARY = {
  lighter: '#eaecee',
  light: '#cdd1d4',
  main: '#A2AAAD', // Medium Grey - R:162 G:170 B:173
  dark: '#8a9195',
  darker: '#73797e',
  100: '#eaecee', // Matches lighter
  200: '#d5d9dc',
  300: '#c0c5c9',
  400: '#A2AAAD', // Matches main
  500: '#8a9195', // Matches dark
  600: '#73797e', // Matches darker
  700: '#5c6267',
  800: '#444a50',
  900: '#2d3339',
  contrastText: 'rgba(0, 0, 0, 0.87)'
};

// Standard MUI colors
const ERROR = {
  light: '#ef5350',
  main: '#f44336',
  dark: '#e53935',
  contrastText: '#ffffff'
};

const WARNING = {
  light: '#ffb74d',
  main: '#ff9800',
  dark: '#f57c00',
  contrastText: 'rgba(0, 0, 0, 0.87)'
};

const INFO = {
  light: '#64b5f6',
  main: '#2196f3',
  dark: '#1976d2',
  contrastText: '#ffffff'
};

const SUCCESS = {
  light: '#66bb6a',
  main: '#4caf50',
  dark: '#43a047',
  contrastText: '#ffffff'
};

// Grey palette - Updated to align with GIB Light Grey
const GREY = {
  50: '#fafafa',
  100: '#f5f5f5',
  200: '#D9D9D6', // Light Grey - R:217 G:217 B:214 (Pantone Cool Gray 1C)
  300: '#e0e0e0',
  400: '#bdbdbd',
  500: '#9e9e9e',
  600: '#757575',
  700: '#616161',
  800: '#424242',
  900: '#212121',
  A100: '#f5f5f5', // Alternative light backgrounds
  A200: '#eeeeee', // Alternative borders
  A400: '#bdbdbd',
  A700: '#616161',
  main: '#D9D9D6' // Adding main to match guidelines
};

// Text colors
const TEXT = {
  primary: '#53565A', // Dark Grey
  secondary: '#A2AAAD', // Medium Grey
  disabled: 'rgba(0, 0, 0, 0.38)'
};

// Action colors - Updated to match GIB guidelines for opacity variants
const ACTION = {
  active: 'rgba(0, 0, 0, 0.54)',
  hover: 'rgba(255, 199, 44, 0.7)', // 70% Yellow for hover states per guidelines
  selected: 'rgba(255, 199, 44, 0.4)', // 40% Yellow for selected states per guidelines
  disabled: 'rgba(0, 0, 0, 0.26)',
  disabledBackground: 'rgba(0, 0, 0, 0.12)',
  focus: 'rgba(255, 199, 44, 0.1)', // 10% Yellow for focus rings per guidelines
  disabledOpacity: 0.38,
  focusOpacity: 0.12,
  activatedOpacity: 0.24,
  hoverOpacity: 0.08,
  selectedOpacity: 0.16
};

// Background properties - Updated with neutral dark greys (no blue tint)
const BACKGROUND = {
  paper: '#ffffff',
  default: '#f5f3f1',
  dark: {
    paper: '#262626', // Neutral dark grey instead of bluish #111936
    default: '#1E1E1E', // Neutral dark grey instead of bluish #151c2c
    darker: '#121212'
  }
};

// ==============================|| DEFAULT THEME - PALETTE  ||============================== //

export function themePalette(mode = 'light') {
  const isDark = mode === 'dark';

  return {
    mode,
    common: COMMON,

    // Primary color with dark mode handling
    primary: {
      ...PRIMARY,
      main: isDark ? alpha(PRIMARY.main, 0.98) : PRIMARY.main,
      light: isDark ? alpha(PRIMARY.light, 0.98) : PRIMARY.light,
      dark: isDark ? alpha(PRIMARY.dark, 0.98) : PRIMARY.dark
    },

    // Secondary color with dark mode handling
    secondary: {
      ...SECONDARY,
      main: isDark ? alpha(SECONDARY.main, 0.98) : SECONDARY.main,
      light: isDark ? alpha(SECONDARY.light, 0.98) : SECONDARY.light,
      dark: isDark ? alpha(SECONDARY.dark, 0.98) : SECONDARY.dark
    },

    // Tertiary color
    tertiary: {
      ...TERTIARY,
      main: isDark ? alpha(TERTIARY.main, 0.98) : TERTIARY.main,
      light: isDark ? alpha(TERTIARY.light, 0.98) : TERTIARY.light,
      dark: isDark ? alpha(TERTIARY.dark, 0.98) : TERTIARY.dark
    },

    // Standard colors with dark mode handling
    error: {
      ...ERROR,
      main: isDark ? alpha(ERROR.main, 0.98) : ERROR.main,
      light: isDark ? alpha(ERROR.light, 0.98) : ERROR.light,
      dark: isDark ? alpha(ERROR.dark, 0.98) : ERROR.dark
    },
    warning: {
      ...WARNING,
      main: isDark ? alpha(WARNING.main, 0.98) : WARNING.main,
      light: isDark ? alpha(WARNING.light, 0.98) : WARNING.light,
      dark: isDark ? alpha(WARNING.dark, 0.98) : WARNING.dark
    },
    info: {
      ...INFO,
      main: isDark ? alpha(INFO.main, 0.98) : INFO.main,
      light: isDark ? alpha(INFO.light, 0.98) : INFO.light,
      dark: isDark ? alpha(INFO.dark, 0.98) : INFO.dark
    },
    success: {
      ...SUCCESS,
      main: isDark ? alpha(SUCCESS.main, 0.98) : SUCCESS.main,
      light: isDark ? alpha(SUCCESS.light, 0.98) : SUCCESS.light,
      dark: isDark ? alpha(SUCCESS.dark, 0.98) : SUCCESS.dark
    },

    // Grey palette
    grey: GREY,

    // Text colors
    text: {
      primary: isDark ? alpha(COMMON.white, 0.98) : TEXT.primary,
      secondary: isDark ? alpha(COMMON.white, 0.85) : TEXT.secondary,
      disabled: isDark ? alpha(COMMON.white, 0.6) : TEXT.disabled
    },

    // Actions
    action: {
      // Active elements (icons, text, etc.)
      active: isDark ? alpha(SECONDARY.light, 0.8) : ACTION.active,

      // Hover state background
      hover: isDark ? alpha(SECONDARY.main, 0.2) : ACTION.hover,

      // Selected state background
      selected: isDark ? alpha(SECONDARY.main, 0.4) : ACTION.selected,
      selectedText: isDark ? SECONDARY.light : SECONDARY.dark,

      // Disabled text
      disabled: isDark ? alpha(COMMON.white, 0.4) : TERTIARY.main,

      // Disabled background
      disabledBackground: isDark ? alpha(GREY[900], 0.2) : alpha(GREY[200], 0.5),

      // Focus state
      focus: isDark ? alpha(SECONDARY.main, 0.3) : ACTION.focus,

      // Opacity values
      hoverOpacity: ACTION.hoverOpacity,
      selectedOpacity: ACTION.selectedOpacity,
      disabledOpacity: ACTION.disabledOpacity,
      focusOpacity: ACTION.focusOpacity,
      activatedOpacity: ACTION.activatedOpacity
    },

    // Background colors
    background: {
      default: isDark ? BACKGROUND.dark.default : BACKGROUND.default,
      paper: isDark ? BACKGROUND.dark.paper : BACKGROUND.paper,
      neutral: isDark ? alpha(GREY[900], 0.92) : GREY[100],
      darker: isDark ? BACKGROUND.dark.darker : BACKGROUND.default
    },

    // Divider
    divider: isDark ? alpha(GREY[500], 0.28) : GREY[200]
  };
}

export default themePalette;
