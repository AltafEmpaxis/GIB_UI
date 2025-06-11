// material-ui
import { alpha } from '@mui/material/styles';

// ==============================|| DEFAULT THEME - CUSTOM SHADOWS  ||============================== //

export default function customShadows(theme) {
  const isDark = theme.palette.mode === 'dark';
  const transparent = alpha(theme.palette.common.black, isDark ? 0.25 : 0.15);
  const darkTransparent = alpha(theme.palette.common.black, isDark ? 0.35 : 0.25);

  const shadows = {
    z1: isDark
      ? `0 1px 2px ${darkTransparent}, 0 1px 4px ${darkTransparent}`
      : `0 1px 2px ${transparent}, 0 1px 4px ${transparent}`,
    z2: isDark
      ? `0 3px 6px ${darkTransparent}, 0 1px 4px ${darkTransparent}`
      : `0 3px 6px ${transparent}, 0 1px 4px ${transparent}`,
    z3: isDark
      ? `0 10px 20px ${darkTransparent}, 0 1px 4px ${darkTransparent}`
      : `0 10px 20px ${transparent}, 0 1px 4px ${transparent}`,
    z8: isDark
      ? `0 5px 10px ${darkTransparent}, 0 16px 24px ${darkTransparent}`
      : `0 5px 10px ${transparent}, 0 16px 24px ${transparent}`,
    z12: isDark
      ? `0 7px 14px ${darkTransparent}, 0 24px 36px ${darkTransparent}`
      : `0 7px 14px ${transparent}, 0 24px 36px ${transparent}`,
    z16: isDark
      ? `0 8px 16px ${darkTransparent}, 0 32px 48px ${darkTransparent}`
      : `0 8px 16px ${transparent}, 0 32px 48px ${transparent}`,
    z20: isDark
      ? `0 10px 20px ${darkTransparent}, 0 40px 60px ${darkTransparent}`
      : `0 10px 20px ${transparent}, 0 40px 60px ${transparent}`,
    z24: isDark
      ? `0 12px 24px ${darkTransparent}, 0 48px 72px ${darkTransparent}`
      : `0 12px 24px ${transparent}, 0 48px 72px ${transparent}`,
    button: `0 2px 0 ${transparent}`,
    text: `0 -1px 0 ${transparent}`,
    primary: `0 4px 8px ${alpha(theme.palette.primary.main, isDark ? 0.25 : 0.15)}`,
    secondary: `0 4px 8px ${alpha(theme.palette.secondary.main, isDark ? 0.25 : 0.15)}`,
    error: `0 4px 8px ${alpha(theme.palette.error.main, isDark ? 0.25 : 0.15)}`,
    warning: `0 4px 8px ${alpha(theme.palette.warning.main, isDark ? 0.25 : 0.15)}`,
    info: `0 4px 8px ${alpha(theme.palette.info.main, isDark ? 0.25 : 0.15)}`,
    success: `0 4px 8px ${alpha(theme.palette.success.main, isDark ? 0.25 : 0.15)}`,
    dialog: isDark
      ? `0 8px 32px ${alpha(theme.palette.common.black, 0.35)}`
      : `0 8px 32px ${alpha(theme.palette.common.black, 0.08)}`,
    card: {
      xs: isDark ? `0 2px 4px ${darkTransparent}` : `0 2px 4px ${transparent}`,
      sm: isDark ? `0 4px 8px ${darkTransparent}` : `0 4px 8px ${transparent}`,
      md: isDark ? `0 8px 16px ${darkTransparent}` : `0 8px 16px ${transparent}`,
      lg: isDark ? `0 12px 24px ${darkTransparent}` : `0 12px 24px ${transparent}`
    },
    popup: {
      xs: isDark ? `0 2px 4px ${darkTransparent}` : `0 2px 4px ${transparent}`,
      sm: isDark ? `0 4px 8px ${darkTransparent}` : `0 4px 8px ${transparent}`,
      md: isDark ? `0 8px 16px ${darkTransparent}` : `0 8px 16px ${transparent}`,
      lg: isDark ? `0 12px 24px ${darkTransparent}` : `0 12px 24px ${transparent}`
    },
    drawer: {
      xs: isDark ? `0 2px 4px ${darkTransparent}` : `0 2px 4px ${transparent}`,
      sm: isDark ? `0 4px 8px ${darkTransparent}` : `0 4px 8px ${transparent}`,
      md: isDark ? `0 8px 16px ${darkTransparent}` : `0 8px 16px ${transparent}`,
      lg: isDark ? `0 12px 24px ${darkTransparent}` : `0 12px 24px ${transparent}`
    },
    fab: isDark
      ? `0 4px 8px ${darkTransparent}, 0 1px 2px ${transparent}`
      : `0 4px 8px ${transparent}, 0 1px 2px ${transparent}`,
    menu: isDark ? `0 2px 8px ${darkTransparent}` : `0 2px 8px ${transparent}`,
    tooltip: isDark ? `0 2px 4px ${darkTransparent}` : `0 2px 4px ${transparent}`
  };

  return shadows;
}
