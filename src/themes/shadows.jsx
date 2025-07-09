// material-ui
import { alpha } from '@mui/material/styles';

// ==============================|| DEFAULT THEME - SHADOWS  ||============================== //

export default function shadows(theme) {
  const isDark = theme.palette.mode === 'dark';
  const transparent = alpha(theme.palette.common.black, isDark ? 0.25 : 0.15);
  const darkTransparent = alpha(theme.palette.common.black, isDark ? 0.35 : 0.25);

  return [
    'none',
    `0 1px 2px ${transparent}`,
    `0 1px 4px ${transparent}`,
    `0 2px 8px ${transparent}`,
    `0 2px 4px ${transparent}, 0 4px 5px ${darkTransparent}`,
    `0 3px 5px ${transparent}, 0 5px 8px ${darkTransparent}`,
    `0 3px 5px ${transparent}, 0 6px 10px ${darkTransparent}`,
    `0 4px 5px ${transparent}, 0 7px 10px ${darkTransparent}`,
    `0 5px 5px ${transparent}, 0 8px 10px ${darkTransparent}`,
    `0 5px 6px ${transparent}, 0 9px 12px ${darkTransparent}`,
    `0 6px 6px ${transparent}, 0 10px 14px ${darkTransparent}`,
    `0 6px 7px ${transparent}, 0 11px 15px ${darkTransparent}`,
    `0 7px 8px ${transparent}, 0 12px 17px ${darkTransparent}`,
    `0 7px 8px ${transparent}, 0 13px 19px ${darkTransparent}`,
    `0 7px 9px ${transparent}, 0 14px 21px ${darkTransparent}`,
    `0 8px 9px ${transparent}, 0 15px 22px ${darkTransparent}`,
    `0 8px 10px ${transparent}, 0 16px 24px ${darkTransparent}`,
    `0 8px 11px ${transparent}, 0 17px 26px ${darkTransparent}`,
    `0 9px 11px ${transparent}, 0 18px 28px ${darkTransparent}`,
    `0 9px 12px ${transparent}, 0 19px 29px ${darkTransparent}`,
    `0 10px 13px ${transparent}, 0 20px 31px ${darkTransparent}`,
    `0 10px 13px ${transparent}, 0 21px 33px ${darkTransparent}`,
    `0 10px 14px ${transparent}, 0 22px 35px ${darkTransparent}`,
    `0 11px 14px ${transparent}, 0 23px 36px ${darkTransparent}`,
    `0 11px 15px ${transparent}, 0 24px 38px ${darkTransparent}`
  ];
}
