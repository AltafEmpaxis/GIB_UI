import { useCallback, useContext, useEffect, useMemo, useRef } from 'react';

import AuthContext from 'contexts/AuthContext';
import ThemeContext from 'contexts/ThemeContext';

import useLocalStorage from './useLocalStorage';

// ==============================|| CONFIG HOOKS ||============================== //

/**
 * @typedef {Object} ThemeConfig
 * @property {string} mode - Current theme mode ('light' | 'dark')
 * @property {string} fontFamily - Current font family
 * @property {number} borderRadius - Current border radius
 * @property {function} onChangeMode - Function to change theme mode
 * @property {function} onChangeFontFamily - Function to change font family
 * @property {function} onChangeBorderRadius - Function to change border radius
 * @property {boolean} isTransitioning - Whether theme is transitioning
 * @property {boolean} isPending - Whether theme changes are pending (React 19)
 * @property {Object} themeSettings - Complete theme settings object
 * @property {function} setThemeSettings - Function to update entire theme settings object
 */

/**
 * @typedef {Object} AuthConfig
 * @property {boolean} isAuthenticated - Whether user is authenticated
 * @property {boolean} isInitialized - Whether auth is initialized
 * @property {Object} user - User data
 * @property {function} login - Login function
 * @property {function} logout - Logout function
 */

/**
 * @typedef {Object} StorageConfig
 * @property {function} getStorage - Get value from localStorage
 * @property {function} setStorage - Set value to localStorage
 * @property {any} storageValue - Current storage value
 * @property {function} setStorageValue - Set storage value
 */

/**
 * Custom hook for global configuration management
 * Optimized for React 19 with improved memoization
 *
 * @returns {Object} Configuration object with hooks and direct access
 *
 * @example
 * // Direct access to all configs
 * const { mode, isAuthenticated, user } = useConfig();
 *
 * @example
 * // Using the theme hook
 * const { useTheme } = useConfig();
 * const { mode, onChangeMode } = useTheme();
 *
 * @example
 * // Using the auth hook
 * const { useAuth } = useConfig();
 * const { isAuthenticated, login, logout } = useAuth();
 *
 * @example
 * // Using the storage hook
 * const { useStorage } = useConfig();
 * const { getStorage, setStorage } = useStorage();
 * const value = getStorage('key', defaultValue);
 * setStorage('key', newValue);
 *
 * @example
 * // Using direct localStorage hook
 * const { useLocalStorage } = useConfig();
 * const [value, setValue] = useLocalStorage('key', defaultValue);
 *
 * @example
 * // Using script ref hook
 * const { useScriptRef } = useConfig();
 * const scriptedRef = useScriptRef();
 *
 * useEffect(() => {
 *   if (scriptedRef.current) {
 *     // Component is mounted
 *   }
 *   return () => {
 *     // Component will unmount
 *   };
 * }, [scriptedRef]);
 */
const defaultConfig = {
  mode: 'light',
  fontFamily: 'PUBLIC_SANS',
  borderRadius: 8,
  isTransitioning: false,
  isPending: false
};

/**
 * Custom hook for local storage wrapper
 * @returns {Object} Local storage value and setter
 */
const useLocalStorageInner = () => {
  const [value, setValue] = useLocalStorage('config', defaultConfig);
  return { value, setValue };
};

/**
 * Script reference hook for component mount status
 * @returns {React.MutableRefObject<boolean>} Reference to component mount status
 */
const useScriptRefInner = () => {
  const scripted = useRef(true);

  useEffect(() => {
    return () => {
      scripted.current = false;
    };
  }, []);

  return scripted;
};

const useConfig = () => {
  const themeContext = useContext(ThemeContext);
  const authContext = useContext(AuthContext);

  // Call hooks at the top level
  const localStorageData = useLocalStorageInner();

  // Create fallback theme context with warning
  const fallbackTheme = useMemo(() => {
    if (!themeContext) {
      console.warn('useConfig: ThemeContext not found, using default theme settings');
      return {
        mode: 'light',
        fontFamily: 'Public Sans',
        borderRadius: 8,
        onChangeMode: () => {},
        onChangeFontFamily: () => {},
        onChangeBorderRadius: () => {},
        isTransitioning: false,
        isPending: false,
        themeSettings: {},
        setThemeSettings: () => {}
      };
    }
    return themeContext;
  }, [themeContext]);

  // Create fallback auth context with warning
  const fallbackAuth = useMemo(() => {
    if (!authContext) {
      console.warn('useConfig: AuthContext not found, using default auth settings');
      return {
        isAuthenticated: false,
        isInitialized: false,
        user: null,
        login: () => Promise.resolve(),
        logout: () => Promise.resolve()
      };
    }
    return authContext;
  }, [authContext]);

  // Extract theme values
  const {
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
  } = fallbackTheme;

  // Extract auth values
  const { isAuthenticated, isInitialized, user, login, logout } = fallbackAuth;

  /**
   * Theme configuration hook - memoized for React 19
   * @returns {ThemeConfig} Theme configuration object
   */
  const useTheme = useCallback(() => {
    if (!themeContext) {
      throw new Error('useTheme must be used within a ThemeProvider');
    }
    return fallbackTheme;
  }, [themeContext, fallbackTheme]);

  /**
   * Authentication hook - memoized for React 19
   * @returns {AuthConfig} Authentication configuration object
   */
  const useAuth = useCallback(() => {
    if (!authContext) {
      throw new Error('useAuth must be used within an AuthProvider');
    }
    return fallbackAuth;
  }, [authContext, fallbackAuth]);

  /**
   * Storage utility hook
   */
  const useStorage = useCallback(() => {
    const { value, setValue } = localStorageData;

    const getStorage = (key, defaultValue) => {
      // If key is themeSettings, return the entire object
      if (key === 'themeSettings') {
        return themeSettings || defaultValue;
      }
      return value[key] || defaultValue;
    };

    const setStorage = (key, newValue) => {
      // If key is themeSettings, set the entire object
      if (key === 'themeSettings') {
        setThemeSettings(newValue);
        return;
      }

      setValue((prev) => ({
        ...prev,
        [key]: newValue
      }));
    };

    return {
      getStorage,
      setStorage,
      storageValue: value,
      setStorageValue: setValue,
      themeSettings,
      setThemeSettings
    };
  }, [themeSettings, setThemeSettings, localStorageData]);

  // Return memoized config object
  return useMemo(
    () => ({
      // Theme properties
      mode,
      onChangeMode,
      fontFamily,
      onChangeFontFamily,
      borderRadius,
      onChangeBorderRadius,
      isTransitioning,
      isPending,
      themeSettings,
      setThemeSettings,

      // Auth properties
      isAuthenticated,
      isInitialized,
      user,
      login,
      logout,

      // Utility hooks
      useTheme,
      useAuth,
      useStorage,
      useLocalStorage,
      useScriptRef: useScriptRefInner
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
      setThemeSettings,
      isAuthenticated,
      isInitialized,
      user,
      login,
      logout,
      useTheme,
      useAuth,
      useStorage
    ]
  );
};

export default useConfig;
