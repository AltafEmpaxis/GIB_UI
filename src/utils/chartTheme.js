import { alpha } from '@mui/material/styles';

// ==============================|| CHART THEME UTILITIES ||============================== //

/**
 * Get theme-based color configuration for charts
 * @param {object} theme - MUI theme object
 * @param {string} type - Chart type ('area', 'bar', 'line')
 * @param {object} customColors - Optional custom colors override
 * @returns {object} Chart color configuration
 */
export const getChartTheme = (theme, type = 'area', customColors = null) => {
  // Ensure theme object exists
  if (!theme || !theme.palette) {
    console.warn('Theme object is missing or invalid');
    return {
      colors: {},
      options: {
        chart: {
          background: 'transparent'
        }
      }
    };
  }

  const isDark = theme?.palette?.mode === 'dark';
  const borderRadius = theme?.shape?.borderRadius || 4;

  // Safe access helper
  const safeAccess = (obj, path, fallback) => {
    try {
      return path.split('.').reduce((acc, key) => acc?.[key], obj) ?? fallback;
    } catch (error) {
      console.warn(`Error accessing ${path}:`, error);
      return fallback;
    }
  };

  // Enhanced opacity values with better dark mode handling
  const opacityValues = {
    area: {
      fill: isDark ? 0.35 : 0.65,
      hover: isDark ? 0.45 : 0.35,
      line: isDark ? 0.85 : 0.8,
      background: isDark ? 0.25 : 0.15
    },
    bar: {
      fill: isDark ? 0.65 : 0.75,
      hover: isDark ? 0.55 : 0.7,
      background: isDark ? 0.25 : 0.15,
      border: isDark ? 0.35 : 0.2
    },
    line: {
      main: isDark ? 0.85 : 0.95,
      hover: isDark ? 0.65 : 0.55,
      area: isDark ? 0.25 : 0.15
    }
  };

  // Enhanced color generation with better fallbacks
  const getColorWithFallback = (palette, variant) => {
    if (!palette) return null;
    const color =
      safeAccess(palette, variant, null) || safeAccess(palette, 'main', null) || (isDark ? '#ffffff' : '#000000');
    return alpha(color, 0.85);
  };

  // Safe color generation with enhanced alpha handling
  const generateSafeColor = (palette, variant, opacity) => {
    try {
      const color = getColorWithFallback(palette, variant);
      return color ? alpha(color, opacity) : alpha(isDark ? '#ffffff' : '#000000', opacity);
    } catch (error) {
      console.warn(`Error generating color for ${variant}:`, error);
      return alpha(isDark ? '#ffffff' : '#000000', opacity);
    }
  };

  // Enhanced default colors with better shade handling
  const defaultColors = {
    primary: {
      main: alpha(safeAccess(theme.palette, 'primary.main', isDark ? '#90caf9' : '#1976d2'), 0.85),
      light: generateSafeColor(theme.palette.primary, isDark ? '300' : '200', opacityValues[type].fill),
      dark: generateSafeColor(theme.palette.primary, isDark ? '700' : '800', opacityValues[type].line),
      contrastText: safeAccess(theme.palette, 'primary.contrastText', isDark ? '#000000' : '#ffffff'),
      shades: {
        100: getColorWithFallback(theme.palette.primary, '100'),
        200: getColorWithFallback(theme.palette.primary, '200'),
        300: getColorWithFallback(theme.palette.primary, '300'),
        400: getColorWithFallback(theme.palette.primary, '400'),
        500: getColorWithFallback(theme.palette.primary, '500'),
        600: getColorWithFallback(theme.palette.primary, '600'),
        700: getColorWithFallback(theme.palette.primary, '700'),
        800: getColorWithFallback(theme.palette.primary, '800'),
        900: getColorWithFallback(theme.palette.primary, '900')
      }
    },
    secondary: {
      main: alpha(safeAccess(theme.palette, 'secondary.main', isDark ? '#ce93d8' : '#9c27b0'), 0.85),
      light: generateSafeColor(theme.palette.secondary, isDark ? '300' : '200', opacityValues[type].fill),
      dark: generateSafeColor(theme.palette.secondary, isDark ? '700' : '800', opacityValues[type].line),
      contrastText: safeAccess(theme.palette, 'secondary.contrastText', isDark ? '#000000' : '#ffffff'),
      shades: {
        100: getColorWithFallback(theme.palette.secondary, '100'),
        200: getColorWithFallback(theme.palette.secondary, '200'),
        300: getColorWithFallback(theme.palette.secondary, '300'),
        400: getColorWithFallback(theme.palette.secondary, '400'),
        500: getColorWithFallback(theme.palette.secondary, '500'),
        600: getColorWithFallback(theme.palette.secondary, '600'),
        700: getColorWithFallback(theme.palette.secondary, '700'),
        800: getColorWithFallback(theme.palette.secondary, '800'),
        900: getColorWithFallback(theme.palette.secondary, '900')
      }
    }
  };

  // Add other colors with enhanced handling
  const addColorSet = (name, defaultMain) => {
    if (theme.palette[name]) {
      defaultColors[name] = {
        main: alpha(safeAccess(theme.palette, `${name}.main`, defaultMain), 0.85),
        light: generateSafeColor(theme.palette[name], isDark ? '300' : '200', opacityValues[type].fill),
        dark: generateSafeColor(theme.palette[name], isDark ? '700' : '800', opacityValues[type].line),
        contrastText: safeAccess(theme.palette, `${name}.contrastText`, isDark ? '#000000' : '#ffffff'),
        shades: {
          100: getColorWithFallback(theme.palette[name], '100'),
          200: getColorWithFallback(theme.palette[name], '200'),
          300: getColorWithFallback(theme.palette[name], '300'),
          400: getColorWithFallback(theme.palette[name], '400'),
          500: getColorWithFallback(theme.palette[name], '500'),
          600: getColorWithFallback(theme.palette[name], '600'),
          700: getColorWithFallback(theme.palette[name], '700'),
          800: getColorWithFallback(theme.palette[name], '800'),
          900: getColorWithFallback(theme.palette[name], '900')
        }
      };
    }
  };

  addColorSet('success', isDark ? '#69f0ae' : '#2e7d32');
  addColorSet('error', isDark ? '#f44336' : '#d32f2f');
  addColorSet('warning', isDark ? '#ffa726' : '#ed6c02');
  addColorSet('info', isDark ? '#29b6f6' : '#0288d1');

  // Merge custom colors with defaults
  const colors = customColors ? { ...defaultColors, ...customColors } : defaultColors;

  // Enhanced common chart options
  const commonOptions = {
    chart: {
      background: 'transparent',
      foreColor: safeAccess(theme.palette, 'text.primary', isDark ? '#ffffff' : '#000000'),
      toolbar: {
        show: true,
        tools: {
          download: true,
          selection: true,
          zoom: true,
          zoomin: true,
          zoomout: true,
          pan: true,
          reset: true
        },
        autoSelected: 'zoom'
      },
      zoom: {
        enabled: true,
        type: 'x',
        autoScaleYaxis: true,
        zoomedArea: {
          fill: {
            color: alpha(
              safeAccess(theme.palette, 'primary.main', isDark ? '#90caf9' : '#1976d2'),
              isDark ? 0.15 : 0.1
            ),
            opacity: 1
          },
          stroke: {
            color: alpha(safeAccess(theme.palette, 'primary.main', isDark ? '#90caf9' : '#1976d2'), isDark ? 0.5 : 0.4),
            opacity: isDark ? 0.5 : 0.4,
            width: 1
          }
        }
      },
      animations: {
        enabled: true,
        easing: 'easeinout',
        speed: 800,
        animateGradually: {
          enabled: true,
          delay: 150
        },
        dynamicAnimation: {
          enabled: true,
          speed: 350
        }
      }
    },
    theme: {
      mode: isDark ? 'dark' : 'light',
      palette: 'palette1',
      monochrome: {
        enabled: false,
        color: alpha(safeAccess(theme.palette, 'primary.main', isDark ? '#90caf9' : '#1976d2'), 0.85),
        shadeTo: isDark ? 'dark' : 'light',
        shadeIntensity: isDark ? 0.65 : 0.45
      }
    },
    grid: {
      borderColor: alpha(
        safeAccess(theme.palette, 'divider', isDark ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.12)'),
        0.85
      ),
      strokeDashArray: 4,
      padding: {
        top: 5,
        right: 5,
        bottom: 5,
        left: 5
      },
      xaxis: {
        lines: {
          show: true
        }
      },
      yaxis: {
        lines: {
          show: true
        }
      }
    },
    tooltip: {
      theme: isDark ? 'dark' : 'light',
      style: {
        fontSize: '12px',
        fontFamily: safeAccess(theme, 'typography.fontFamily', 'inherit')
      },
      x: {
        show: true,
        format: 'dd MMM yyyy'
      },
      y: {
        formatter: (value) => value?.toString() || '0'
      },
      marker: {
        show: true,
        size: 6,
        strokeWidth: 2,
        strokeColor: alpha(isDark ? theme.palette.grey[800] : theme.palette.background.paper, 0.85),
        fillColor: alpha(isDark ? theme.palette.grey[100] : theme.palette.grey[900], 0.85)
      },
      fixed: {
        enabled: false,
        position: 'topRight',
        offsetX: 0,
        offsetY: 0
      }
    },
    states: {
      hover: {
        filter: {
          type: isDark ? 'lighten' : 'darken',
          value: isDark ? 0.15 : 0.1
        }
      },
      active: {
        allowMultipleDataPointsSelection: false,
        filter: {
          type: isDark ? 'darken' : 'lighten',
          value: isDark ? 0.15 : 0.1
        }
      }
    },
    responsive: [
      {
        breakpoint: safeAccess(theme, 'breakpoints.values.md', 960),
        options: {
          plotOptions: {
            bar: {
              columnWidth: '50%'
            }
          }
        }
      }
    ]
  };

  // Enhanced type-specific configurations
  const typeConfigs = {
    area: {
      fill: {
        type: 'gradient',
        gradient: {
          shadeIntensity: isDark ? 0.35 : 0.95,
          opacityFrom: opacityValues.area.fill,
          opacityTo: opacityValues.area.hover,
          stops: [0, 90, 100]
        }
      },
      stroke: {
        curve: 'smooth',
        width: 2,
        lineCap: 'round'
      }
    },
    bar: {
      plotOptions: {
        bar: {
          borderRadius,
          distributed: true,
          columnWidth: '40%',
          barHeight: '40%',
          dataLabels: {
            position: 'top'
          },
          colors: {
            backgroundBarOpacity: isDark ? 0.85 : 1,
            backgroundBarRadius: borderRadius
          }
        }
      },
      dataLabels: {
        style: {
          fontSize: '13px',
          fontFamily: safeAccess(theme, 'typography.fontFamily', 'inherit'),
          fontWeight: safeAccess(theme, 'typography.fontWeightMedium', 500),
          colors: [alpha(safeAccess(theme.palette, 'background.paper', isDark ? '#424242' : '#ffffff'), 0.85)]
        }
      }
    },
    line: {
      stroke: {
        curve: 'smooth',
        width: 2.5,
        lineCap: 'round'
      },
      markers: {
        size: 5,
        strokeWidth: 2,
        strokeColors: alpha(isDark ? theme.palette.grey[800] : theme.palette.background.paper, 0.85),
        fillColors: alpha(isDark ? theme.palette.grey[100] : theme.palette.grey[900], 0.85),
        hover: {
          size: 7,
          sizeOffset: 3
        }
      },
      fill: {
        type: 'solid',
        opacity: opacityValues.line.area
      }
    }
  };

  return {
    colors,
    options: {
      ...commonOptions,
      ...(typeConfigs[type] || {})
    }
  };
};

/**
 * Generate gradient colors for charts with enhanced preset support
 * @param {object} theme - MUI theme object
 * @param {string} colorKey - Color key from theme palette
 * @param {number} index - Optional index for multiple gradients
 * @returns {object} Gradient color configuration
 */
export const getChartGradient = (theme, colorKey = 'primary', index = 0) => {
  // Ensure theme object exists
  if (!theme || !theme.palette) {
    console.warn('Theme object is missing or invalid');
    return {
      main: '#000',
      gradient: [
        { offset: 0, color: '#000', opacity: 0.7 },
        { offset: 98, color: '#000', opacity: 0.3 },
        { offset: 100, color: '#000', opacity: 0.2 }
      ]
    };
  }

  const isDark = theme?.palette?.mode === 'dark';
  const color = theme.palette[colorKey] || theme.palette.primary;

  // Enhanced color fallback handling
  const getColorWithFallback = (palette, variant) => {
    if (!palette) return null;
    const baseColor = palette[variant] || palette.main || (isDark ? '#ffffff' : '#000000');
    return alpha(baseColor, 0.85);
  };

  // Use enhanced variations for better gradient control
  const lightColor = getColorWithFallback(color, isDark ? '300' : '200') || color.light || color.main;
  const darkColor = getColorWithFallback(color, isDark ? '700' : '800') || color.dark || color.main;
  const mainColor = alpha(color.main || (isDark ? '#ffffff' : '#000000'), 0.85);

  // Enhanced gradient configuration
  return {
    main: mainColor,
    gradient: [
      {
        offset: 0,
        color: mainColor,
        opacity: isDark ? 0.45 : 0.75
      },
      {
        offset: 98,
        color: lightColor,
        opacity: isDark ? 0.35 : 0.35
      },
      {
        offset: 100,
        color: darkColor,
        opacity: isDark ? 0.45 : 0.25
      }
    ]
  };
};
