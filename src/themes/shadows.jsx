// material-ui
import { alpha } from '@mui/material/styles';

// ==============================|| DEFAULT THEME - SHADOWS  ||============================== //

export default function shadows(theme) {
  const isDark = theme.palette.mode === 'dark';

  // Base shadows using black with transparency
  const transparent = alpha(theme.palette.common.black, isDark ? 0.25 : 0.15);
  const darkTransparent = alpha(theme.palette.common.black, isDark ? 0.35 : 0.25);

  // GIB brand-specific shadows
  // Use dark grey (primary) for shadows and yellow (secondary) for subtle highlights
  const primaryShadow = alpha(theme.palette.primary.main, isDark ? 0.3 : 0.2);
  const secondaryGlow = alpha(theme.palette.secondary.main, isDark ? 0.2 : 0.1);

  // True neutral dark shadows for dark mode (no blue tint)
  const neutralDarkShadow = isDark ? 'rgba(0, 0, 0, 0.4)' : darkTransparent;
  const neutralDarkerShadow = isDark ? 'rgba(0, 0, 0, 0.5)' : primaryShadow;

  return [
    'none',
    `0 1px 2px ${transparent}`,
    `0 1px 4px ${transparent}`,
    `0 2px 8px ${transparent}`,
    `0 2px 4px ${transparent}, 0 4px 5px ${darkTransparent}`,
    `0 3px 5px ${transparent}, 0 5px 8px ${darkTransparent}`,
    `0 3px 5px ${transparent}, 0 6px 10px ${darkTransparent}`,
    `0 4px 5px ${transparent}, 0 7px 10px ${darkTransparent}`,
    `0 5px 5px ${transparent}, 0 8px 10px ${isDark ? neutralDarkShadow : primaryShadow}`,
    `0 5px 6px ${transparent}, 0 9px 12px ${isDark ? neutralDarkShadow : primaryShadow}`,
    `0 6px 6px ${transparent}, 0 10px 14px ${isDark ? neutralDarkShadow : primaryShadow}`,
    `0 6px 7px ${transparent}, 0 11px 15px ${isDark ? neutralDarkShadow : primaryShadow}`,
    `0 7px 8px ${transparent}, 0 12px 17px ${isDark ? neutralDarkShadow : primaryShadow}`,
    `0 7px 8px ${transparent}, 0 13px 19px ${isDark ? neutralDarkShadow : primaryShadow}`,
    `0 7px 9px ${transparent}, 0 14px 21px ${isDark ? neutralDarkShadow : primaryShadow}`,
    `0 8px 9px ${transparent}, 0 15px 22px ${isDark ? neutralDarkerShadow : primaryShadow}`,
    `0 8px 10px ${transparent}, 0 16px 24px ${isDark ? neutralDarkerShadow : primaryShadow}`,
    `0 8px 11px ${transparent}, 0 17px 26px ${isDark ? neutralDarkerShadow : primaryShadow}`,
    `0 9px 11px ${transparent}, 0 18px 28px ${isDark ? neutralDarkerShadow : primaryShadow}`,
    `0 9px 12px ${transparent}, 0 19px 29px ${isDark ? neutralDarkerShadow : primaryShadow}`,
    isDark
      ? `0 10px 13px ${transparent}, 0 20px 31px ${neutralDarkerShadow}, 0 0 0 1px ${secondaryGlow}`
      : `0 10px 13px ${transparent}, 0 20px 31px ${primaryShadow}`,
    isDark
      ? `0 10px 13px ${transparent}, 0 21px 33px ${neutralDarkerShadow}, 0 0 0 1px ${secondaryGlow}`
      : `0 10px 13px ${transparent}, 0 21px 33px ${primaryShadow}`,
    isDark
      ? `0 10px 14px ${transparent}, 0 22px 35px ${neutralDarkerShadow}, 0 0 0 2px ${secondaryGlow}`
      : `0 10px 14px ${transparent}, 0 22px 35px ${primaryShadow}`,
    isDark
      ? `0 11px 14px ${transparent}, 0 23px 36px ${neutralDarkerShadow}, 0 0 0 2px ${secondaryGlow}`
      : `0 11px 14px ${transparent}, 0 23px 36px ${primaryShadow}`,
    isDark
      ? `0 11px 15px ${transparent}, 0 24px 38px ${neutralDarkerShadow}, 0 0 0 3px ${secondaryGlow}`
      : `0 11px 15px ${transparent}, 0 24px 38px ${primaryShadow}`
  ];
}
