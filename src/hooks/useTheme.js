import { useContext } from 'react';

import ThemeContext from 'contexts/ThemeContext';

// ==============================|| THEME HOOKS ||============================== //

const useTheme = () => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }

  const {
    mode,
    onChangeMode,
    presetColor,
    onChangePresetColor,
    fontFamily,
    onChangeFontFamily,
    borderRadius,
    onChangeBorderRadius,
    isTransitioning,
    themeSettings,
    setThemeSettings,
    ...rest
  } = context;

  return {
    mode,
    onChangeMode,
    presetColor,
    onChangePresetColor,
    fontFamily,
    onChangeFontFamily,
    borderRadius,
    onChangeBorderRadius,
    isTransitioning,
    themeSettings,
    setThemeSettings,
    ...rest
  };
};

export default useTheme;
