import { useState, useCallback, useEffect, useRef } from 'react';

// ==============================|| LOCAL STORAGE HOOK ||============================== //

/**
 * Custom hook for persistent storage with localStorage
 * Optimized for React 19 with debouncing and error handling
 *
 * @param {string} key - The localStorage key
 * @param {any} defaultValue - Default value if key doesn't exist
 * @param {number} debounceTime - Optional debounce time in ms (default: 300)
 * @returns {[any, Function]} - [storedValue, setValue]
 */
export default function useLocalStorage(key, defaultValue, debounceTime = 300) {
  // Store the value in state
  const [storedValue, setStoredValue] = useState(() => {
    try {
      // Get from local storage by key
      const item = window.localStorage.getItem(key);
      // Parse stored json or return defaultValue
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return defaultValue;
    }
  });

  // Use a ref for the timeout to properly handle cleanup
  const timeoutRef = useRef(null);

  // Debounced localStorage update
  useEffect(() => {
    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Set a new timeout to update localStorage
    timeoutRef.current = setTimeout(() => {
      try {
        window.localStorage.setItem(key, JSON.stringify(storedValue));
      } catch (error) {
        console.error(`Error saving to localStorage key "${key}":`, error);
      }
    }, debounceTime);

    // Cleanup on unmount or key/value change
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [key, storedValue, debounceTime]);

  // Memoized setValue function
  const setValue = useCallback(
    (value) => {
      try {
        // Allow value to be a function for previous state pattern
        const valueToStore = value instanceof Function ? value(storedValue) : value;

        // For numeric values, ensure they're properly formatted
        const formattedValue = typeof valueToStore === 'number' && isNaN(valueToStore) ? defaultValue : valueToStore;

        // Special handling for themeSettings object
        if (key === 'themeSettings' && typeof formattedValue === 'object') {
          // Ensure all required properties exist
          const finalValue = {
            mode: formattedValue.mode || defaultValue.mode,
            presetColor: formattedValue.presetColor || defaultValue.presetColor,
            fontFamily: formattedValue.fontFamily || defaultValue.fontFamily,
            borderRadius: formattedValue.borderRadius || defaultValue.borderRadius
          };

          // Save state
          setStoredValue(finalValue);
        } else {
          // Save state for non-themeSettings values
          setStoredValue(formattedValue);
        }

        // localStorage update is handled by the useEffect
      } catch (error) {
        console.error(`Error in setValue for localStorage key "${key}":`, error);
      }
    },
    [key, storedValue, defaultValue]
  );

  return [storedValue, setValue];
}
