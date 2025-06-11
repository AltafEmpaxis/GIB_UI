import { HEADER_HEIGHT } from 'config';

import { FontFamily } from './types';

// ==============================|| THEME CONFIGURATION ||============================== //

/**
 * Theme Preset Options
 * presetColor:
 * - default    : Default theme with neutral colors
 * - theme1     : Blue theme (#1890ff)
 * - theme2     : Purple theme (#673ab7)
 * - theme3     : Green theme (#4caf50)
 * - theme4     : Red theme (#f44336)
 * - theme5     : Orange theme (#ff9800)
 * - theme6     : Cyan theme (#00acc1)
 * - blue       : Blue theme with gradient
 * - purple     : Purple theme with gradient
 * - green      : Green theme with gradient
 * - orange     : Orange theme with gradient
 * - red        : Red theme with gradient
 * - cyan       : Cyan theme with gradient
 * - teal       : Teal theme with gradient
 * - indigo     : Indigo theme with gradient
 * - gib        : GIB theme based on Gulf International Bank colors
 */

export const config = {
  // Layout
  miniDrawer: false,
  container: true,

  // Theme
  mode: 'light', // Options: 'light' | 'dark'
  presetColor: 'gib', // Options: See Theme Preset Options above
  themeDirection: 'ltr', // Options: 'ltr' | 'rtl'

  // Typography
  fontFamily: FontFamily.PUBLIC_SANS,

  // Component defaults
  borderRadius: 8,
  outlinedFilled: true,

  // Layout defaults
  drawerWidth: 260,
  miniDrawerWidth: 80,
  headerHeight: HEADER_HEIGHT,
  containerMaxWidth: 1440,

  // Dialog defaults
  dialogBorderRadius: 12,
  dialogMinWidth: 300,

  // Animation
  enableAnimation: true,
  defaultDuration: 200
};

export default config;
