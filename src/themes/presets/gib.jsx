// ==============================|| PRESET THEME - GIB ||============================== //
// Gulf International Bank Brand Theme

const Gib = {
  // Base properties
  paper: '#ffffff',
  backgroundDefault: '#f5f3f1',
  darkPaper: '#111936',
  darkBackground: '#151c2c',

  // Primary color - Dark Grey (Pantone Cool Gray 11C)
  primary: {
    lighter: '#e9e9e9',
    light: '#888a8e',
    main: '#53565A', // Dark Grey - R:83 G:86 B:90
    dark: '#424448',
    darker: '#323438',
    contrastText: '#ffffff'
  },

  // Secondary color - GIB Yellow (Pantone 123C)
  secondary: {
    lighter: '#fff8e1',
    light: '#ffe082',
    main: '#FFC72C', // GIB Yellow - R:255 G:199 B:44
    dark: '#ffb300',
    darker: '#ff8f00',
    contrastText: 'rgba(0, 0, 0, 0.87)'
  },

  // Tertiary color (MUI doesn't have this by default, but we can use it in custom components)
  tertiary: {
    lighter: '#eaecee',
    light: '#cdd1d4',
    main: '#A2AAAD', // Medium Grey - R:162 G:170 B:173
    dark: '#8a9195',
    darker: '#73797e',
    contrastText: 'rgba(0, 0, 0, 0.87)'
  },

  // Standard MUI colors
  error: {
    light: '#ef5350',
    main: '#f44336',
    dark: '#e53935',
    contrastText: '#ffffff'
  },

  warning: {
    light: '#ffb74d',
    main: '#ff9800',
    dark: '#f57c00',
    contrastText: 'rgba(0, 0, 0, 0.87)'
  },

  info: {
    light: '#64b5f6',
    main: '#2196f3',
    dark: '#1976d2',
    contrastText: '#ffffff'
  },

  success: {
    light: '#66bb6a',
    main: '#4caf50',
    dark: '#43a047',
    contrastText: '#ffffff'
  },

  // Grey palette
  grey: {
    50: '#fafafa',
    100: '#f5f5f5',
    200: '#D9D9D6', // Light Grey - R:217 G:217 B:214
    300: '#e0e0e0',
    400: '#bdbdbd',
    500: '#9e9e9e',
    600: '#757575',
    700: '#616161',
    800: '#424242',
    900: '#212121',
    A100: '#f5f5f5',
    A200: '#eeeeee',
    A400: '#bdbdbd',
    A700: '#616161'
  },

  // Text colors
  text: {
    primary: '#53565A', // Dark Grey
    secondary: '#A2AAAD', // Medium Grey
    disabled: 'rgba(0, 0, 0, 0.38)'
  },

  // Action colors - following MUI conventions
  action: {
    active: 'rgba(0, 0, 0, 0.54)',
    hover: 'rgba(0, 0, 0, 0.04)',
    selected: 'rgba(255, 199, 44, 0.16)', // 16% Yellow
    disabled: 'rgba(0, 0, 0, 0.26)',
    disabledBackground: 'rgba(0, 0, 0, 0.12)',
    focus: 'rgba(255, 199, 44, 0.12)' // 12% Yellow
  },

  // Background colors
  background: {
    paper: '#ffffff',
    default: '#f5f3f1'
  },

  // Divider
  divider: 'rgba(0, 0, 0, 0.12)'
};

export { Gib };
