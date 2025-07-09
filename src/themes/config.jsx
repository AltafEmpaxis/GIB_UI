import { HEADER_HEIGHT } from 'config';

import { FontFamily } from './types';

// ==============================|| THEME CONFIGURATION ||============================== //

export const config = {
  // Layout
  miniDrawer: false,
  container: true,

  // Theme
  mode: 'light', // Options: 'light' | 'dark'
  themeDirection: 'ltr', // Options: 'ltr' | 'rtl'

  // Typography
  fontFamily: FontFamily.FS_EMERIC,

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
