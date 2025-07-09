import { useMemo } from 'react';

import { CssBaseline } from '@mui/material';
import { createTheme, StyledEngineProvider, ThemeProvider } from '@mui/material/styles';
import PropTypes from 'prop-types';

// Theme config
import useConfig from 'hooks/useConfig';

import { config } from './config';
import customShadows from './customShadows';
import GlobalStyles from './globalStyles';
import componentStyleOverrides from './overrides';
import { themePalette } from './palette';
import shadows from './shadows';
import { ThemeBreakpoints, ThemeTransitions, ThemeZIndex } from './types';
import { themeTypography } from './typography';

// ==============================|| DEFAULT THEME - MAIN ||============================== //

export default function ThemeCustomization({ children }) {
  const { mode, fontFamily, borderRadius } = useConfig();

  const theme = useMemo(() => {
    try {
      // Create base theme with default options
      const baseTheme = createTheme({
        breakpoints: {
          values: {
            ...ThemeBreakpoints
          }
        },
        direction: config.themeDirection,
        mixins: {
          toolbar: {
            minHeight: config.headerHeight,
            padding: 0,
            '@media (min-width: 600px)': {
              minHeight: config.headerHeight
            }
          }
        },
        palette: themePalette(mode),
        shape: {
          borderRadius: borderRadius || config.borderRadius,
          borderRadiusXs: Math.max(2, (borderRadius || config.borderRadius) - 6),
          borderRadiusSm: Math.max(4, (borderRadius || config.borderRadius) - 4),
          borderRadiusMd: borderRadius || config.borderRadius,
          borderRadiusLg: (borderRadius || config.borderRadius) + 4,
          borderRadiusXl: (borderRadius || config.borderRadius) + 8
        },
        transitions: {
          easing: {
            ...ThemeTransitions.EASING
          },
          duration: {
            ...ThemeTransitions.DURATION
          }
        },
        typography: themeTypography(fontFamily || config.fontFamily),
        zIndex: {
          ...ThemeZIndex
        }
      });

      // Add shadows to the theme
      baseTheme.shadows = shadows(baseTheme);

      // Add custom shadows
      baseTheme.customShadows = customShadows(baseTheme);

      // Create final theme with component overrides
      const finalTheme = createTheme(baseTheme, {
        components: componentStyleOverrides(baseTheme)
      });

      return finalTheme;
    } catch (error) {
      console.error('Theme creation error:', error);
      // Return a minimal fallback theme
      return createTheme();
    }
  }, [mode, fontFamily, borderRadius]);

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline enableColorScheme />
        <GlobalStyles />
        {children}
      </ThemeProvider>
    </StyledEngineProvider>
  );
}

ThemeCustomization.propTypes = {
  children: PropTypes.node
};
