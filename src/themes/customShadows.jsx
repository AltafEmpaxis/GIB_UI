// material-ui
import { alpha } from '@mui/material/styles';

// ==============================|| DEFAULT THEME - CUSTOM SHADOWS  ||============================== //

export default function customShadows(theme) {
  const isDark = theme.palette.mode === 'dark';
  const transparent = alpha(theme.palette.common.black, isDark ? 0.25 : 0.15);

  return {
    button: `0 2px 0 ${transparent}`,
    text: `0 -1px 0 ${transparent}`,
    primary: `0 4px 8px ${alpha(theme.palette.primary.main, isDark ? 0.25 : 0.15)}`,
    secondary: `0 4px 10px ${alpha(theme.palette.secondary.main, isDark ? 0.25 : 0.15)}`,
    error: `0 4px 8px ${alpha(theme.palette.error.main, isDark ? 0.25 : 0.15)}`,
    warning: `0 4px 8px ${alpha(theme.palette.warning.main, isDark ? 0.25 : 0.15)}`,
    info: `0 4px 8px ${alpha(theme.palette.info.main, isDark ? 0.25 : 0.15)}`,
    success: `0 4px 8px ${alpha(theme.palette.success.main, isDark ? 0.25 : 0.15)}`,
    z1: `0 1px 2px ${transparent}`,
    z8: `0 8px 16px ${transparent}`,
    z12: `0 12px 24px ${transparent}`,
    z16: `0 16px 32px ${transparent}`,
    z20: `0 20px 40px ${transparent}`,
    z24: `0 24px 48px ${transparent}`,
    card: `0 2px 8px ${transparent}`,
    drawer: `0 8px 24px ${alpha(theme.palette.common.black, isDark ? 0.4 : 0.1)}`,
    dialog: `0 8px 32px ${alpha(theme.palette.common.black, isDark ? 0.4 : 0.1)}`,
    popup: `0 4px 16px ${alpha(theme.palette.common.black, isDark ? 0.35 : 0.1)}`
  };
}
