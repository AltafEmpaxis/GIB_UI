// ==============================|| THEME TYPES  ||============================== //

export const PresetColors = {
  default: 'default',
  theme1: 'theme1',
  theme2: 'theme2',
  theme3: 'theme3',
  theme4: 'theme4',
  theme5: 'theme5',
  theme6: 'theme6',
  blue: 'blue',
  purple: 'purple',
  green: 'green',
  orange: 'orange',
  red: 'red',
  cyan: 'cyan',
  teal: 'teal',
  indigo: 'indigo',
  gib: 'gib'
};

export const FontFamily = {
  PUBLIC_SANS: "'Public Sans', sans-serif",
  PUBLIC_SANS_VARIATION: "'Public Sans Variable', sans-serif",
  ROBOTO: "'Roboto', sans-serif",
  ROBOTO_VARIATION: "'Roboto Variable', sans-serif",
  INTER: "'Inter', sans-serif",
  INTER_VARIATION: "'Inter Variable', sans-serif",
  MONTSERRAT: "'Montserrat', sans-serif",
  MONTSERRAT_VARIATION: "'Montserrat Variable', sans-serif",
  POPPINS: "'Poppins', sans-serif",
  POPPINS_VARIATION: "'Poppins Variable', sans-serif",
  ROBOTO_MONO: "'Roboto Mono', monospace",
  ROBOTO_MONO_VARIATION: "'Roboto Mono Variable', monospace",
  ROBOTO_SERIF: "'Roboto Serif', serif",
  ROBOTO_SERIF_VARIATION: "'Roboto Serif Variable', serif",
  ROBOTO_SLAB: "'Roboto Slab', serif",
  ROBOTO_SLAB_VARIATION: "'Roboto Slab Variable', serif",
  ROBOTO_CONDENSED: "'Roboto Condensed', sans-serif",
  ROBOTO_CONDENSED_VARIATION: "'Roboto Condensed Variable', sans-serif",
  ROBOTO_FLEX: "'Roboto Flex', sans-serif",
  ROBOTO_FLEX_VARIATION: "'Roboto Flex Variable', sans-serif"
};

export const ThemeBreakpoints = {
  xs: 0,
  sm: 768,
  md: 1024,
  lg: 1266,
  xl: 1440,
  mobile: 0,
  tablet: 768,
  laptop: 1024,
  desktop: 1266,
  wide: 1440
};

export const ThemeZIndex = {
  mobileStepper: 1000,
  fab: 1050,
  speedDial: 1050,
  appBar: 1100,
  drawer: 1200,
  modal: 1800,
  snackbar: 1400,
  tooltip: 1500,
  popup: 1600,
  dialog: 1700,
  backdrop: 1800,
  overlay: 2000
};

export const ThemeTransitions = {
  EASING: {
    easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    easeOut: 'cubic-bezier(0.0, 0, 0.2, 1)',
    easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
    sharp: 'cubic-bezier(0.4, 0, 0.6, 1)'
  },
  DURATION: {
    shortest: 150,
    shorter: 200,
    short: 250,
    standard: 300,
    complex: 375,
    enteringScreen: 225,
    leavingScreen: 195,
    ripple: 550
  }
};

export const ThemeShadowVariants = {
  button: 'button',
  text: 'text',
  z1: 'z1',
  primary: 'primary',
  secondary: 'secondary',
  error: 'error',
  warning: 'warning',
  info: 'info',
  success: 'success',
  dialog: 'dialog',
  card: {
    xs: 'card-xs',
    sm: 'card-sm',
    md: 'card-md',
    lg: 'card-lg'
  },
  popup: {
    xs: 'popup-xs',
    sm: 'popup-sm',
    md: 'popup-md',
    lg: 'popup-lg'
  },
  drawer: {
    xs: 'drawer-xs',
    sm: 'drawer-sm',
    md: 'drawer-md',
    lg: 'drawer-lg'
  }
};

export const ThemeDefaults = {
  HEADER_HEIGHT: 64,
  DRAWER_WIDTH: 260,
  MINI_DRAWER_WIDTH: 80,
  CONTAINER_MAX_WIDTH: 1440
};
