import { createContext, useCallback, useMemo, useState, useTransition } from 'react';

import PropTypes from 'prop-types';

import useLocalStorage from 'hooks/useLocalStorage';
import { config } from 'themes/config';

// ==============================|| THEME CONTEXT & PROVIDER ||============================== //

const ThemeContext = createContext(null);

// Default theme settings
const defaultThemeSettings = {
  mode: config.mode,
  fontFamily: config.fontFamily,
  borderRadius: config.borderRadius
};

export const ThemeProvider = ({ children }) => {
  // Use React 19's useTransition for smoother theme updates
  const [isPending, startTransition] = useTransition();

  // Theme state with localStorage persistence - all settings in one object
  const [themeSettings, setThemeSettings] = useLocalStorage('themeSettings', defaultThemeSettings);

  // Extract individual settings from the themeSettings object
  const { mode, fontFamily, borderRadius } = themeSettings;

  // Track animation state separately from the actual theme change
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Helper function to update a specific theme setting
  const updateThemeSetting = useCallback(
    (key, value) => {
      setThemeSettings((prevSettings) => ({
        ...prevSettings,
        [key]: value
      }));
    },
    [setThemeSettings]
  );

  // Optimized mode change handler with transition
  const onChangeMode = useCallback(
    (newMode) => {
      if (newMode !== mode) {
        setIsTransitioning(true);

        // Use transition for non-urgent updates
        startTransition(() => {
          updateThemeSetting('mode', newMode);
        });

        // Set a timeout to complete the transition
        setTimeout(() => setIsTransitioning(false), config.defaultDuration);
      }
    },
    [mode, updateThemeSetting, startTransition]
  );

  // Optimized font family change handler
  const onChangeFontFamily = useCallback(
    (newFontFamily) => {
      startTransition(() => {
        updateThemeSetting('fontFamily', newFontFamily);
      });
    },
    [updateThemeSetting, startTransition]
  );

  // Optimized border radius change handler with validation
  const onChangeBorderRadius = useCallback(
    (newBorderRadius) => {
      // Convert to number if it's a string
      const radiusValue = typeof newBorderRadius === 'string' ? parseInt(newBorderRadius, 10) : newBorderRadius;

      // Validate the value
      if (typeof radiusValue === 'number' && !isNaN(radiusValue) && radiusValue >= 4 && radiusValue <= 24) {
        // Round to nearest even number (since step is 2)
        const roundedValue = Math.round(radiusValue / 2) * 2;

        // Update with transition for smoother UI
        startTransition(() => {
          updateThemeSetting('borderRadius', roundedValue);
        });
      } else {
        console.warn(`Invalid border radius: ${newBorderRadius}, using default value`);
        startTransition(() => {
          updateThemeSetting('borderRadius', config.borderRadius);
        });
      }
    },
    [updateThemeSetting, startTransition]
  );

  // Memoized context value to prevent unnecessary re-renders
  const value = useMemo(
    () => ({
      mode,
      onChangeMode,
      fontFamily,
      onChangeFontFamily,
      borderRadius,
      onChangeBorderRadius,
      isTransitioning,
      isPending,
      themeSettings,
      setThemeSettings
    }),
    [
      mode,
      onChangeMode,
      fontFamily,
      onChangeFontFamily,
      borderRadius,
      onChangeBorderRadius,
      isTransitioning,
      isPending,
      themeSettings,
      setThemeSettings
    ]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

ThemeProvider.propTypes = {
  children: PropTypes.node
};

export default ThemeContext;
