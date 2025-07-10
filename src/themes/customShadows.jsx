// material-ui
import { alpha } from '@mui/material/styles';

// ==============================|| DEFAULT THEME - CUSTOM SHADOWS  ||============================== //

export default function customShadows(theme) {
  const isDark = theme.palette.mode === 'dark';

  // Base transparent shadows
  const transparent = alpha(theme.palette.common.black, isDark ? 0.25 : 0.15);

  // GIB brand color shadows
  const primaryShadow = alpha(theme.palette.primary.main, isDark ? 0.35 : 0.2);
  const secondaryShadow = alpha(theme.palette.secondary.main, isDark ? 0.25 : 0.15);
  const tertiaryShadow = alpha(theme.palette.tertiary.main, isDark ? 0.3 : 0.15);

  // Yellow glow for highlighting
  const secondaryGlow = alpha(theme.palette.secondary.main, isDark ? 0.2 : 0.1);

  // Dark mode shadows - using neutral greys
  const darkShadow = isDark ? 'rgba(0, 0, 0, 0.5)' : 'rgba(0, 0, 0, 0.1)';
  const darkShadowLight = isDark ? 'rgba(0, 0, 0, 0.4)' : 'rgba(0, 0, 0, 0.08)';

  return {
    button: `0 2px 0 ${primaryShadow}`,
    text: `0 -1px 0 ${transparent}`,
    primary: `0 4px 8px ${alpha(theme.palette.primary.main, isDark ? 0.25 : 0.15)}`,
    secondary: `0 4px 10px ${alpha(theme.palette.secondary.main, isDark ? 0.25 : 0.15)}`,
    tertiary: `0 4px 8px ${alpha(theme.palette.tertiary.main, isDark ? 0.25 : 0.15)}`,
    error: `0 4px 8px ${alpha(theme.palette.error.main, isDark ? 0.25 : 0.15)}`,
    warning: `0 4px 8px ${alpha(theme.palette.warning.main, isDark ? 0.25 : 0.15)}`,
    info: `0 4px 8px ${alpha(theme.palette.info.main, isDark ? 0.25 : 0.15)}`,
    success: `0 4px 8px ${alpha(theme.palette.success.main, isDark ? 0.25 : 0.15)}`,
    z1: `0 1px 2px ${transparent}`,
    z8: `0 8px 16px ${primaryShadow}`,
    z12: `0 12px 24px ${primaryShadow}`,
    z16: `0 16px 32px ${primaryShadow}`,
    z20: `0 20px 40px ${primaryShadow}`,
    z24: `0 24px 48px ${primaryShadow}`,
    card: isDark ? `0 2px 8px ${darkShadowLight}, 0 0 0 1px ${secondaryGlow}` : `0 2px 8px ${primaryShadow}`,
    drawer: isDark
      ? `0 8px 24px ${darkShadow}, 0 0 0 1px ${secondaryGlow}`
      : `0 8px 24px ${alpha(theme.palette.common.black, 0.1)}`,
    dialog: isDark
      ? `0 8px 32px ${darkShadow}, 0 0 0 1px ${secondaryGlow}`
      : `0 8px 32px ${alpha(theme.palette.common.black, 0.1)}`,
    popup: isDark
      ? `0 4px 16px ${darkShadowLight}, 0 0 0 1px ${secondaryGlow}`
      : `0 4px 16px ${alpha(theme.palette.common.black, 0.1)}`,
    yellowHighlight: `0 0 0 2px ${secondaryShadow}`,
    yellowGlow: `0 0 8px 2px ${alpha(theme.palette.secondary.main, 0.4)}`,
    greyGlow: `0 0 8px 1px ${tertiaryShadow}`
  };
}
