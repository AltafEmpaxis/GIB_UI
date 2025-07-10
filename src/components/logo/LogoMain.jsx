import { Box } from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';
import gibLogo from 'assets/logo/gib_logo.svg';
import PropTypes from 'prop-types';

const Logo = ({
  collapsed = false,
  sx = {},
  variant = 'primary',
  useImage = false,
  width,
  height,
  imageWidth, // kept for backward compatibility
  imageHeight, // kept for backward compatibility
  className,
  ...other
}) => {
  const theme = useTheme();

  const getGradientColors = () => {
    const color = theme.palette[variant] || theme.palette.primary;
    return {
      start: alpha(color.dark, 0.9),
      middle: color.main,
      end: alpha(color.light, 0.9),
      shadow: alpha(color.dark, 0.2)
    };
  };

  const colors = getGradientColors();

  // Logo aspect ratio is 3238:951 (approximately 3.4:1)
  const aspectRatio = 3.4;

  // Default dimensions based on collapsed state
  const defaultWidth = collapsed ? 52 : 240;
  const defaultHeight = collapsed ? 52 : Math.round(defaultWidth / aspectRatio);

  // Determine final dimensions (priority: direct props > custom props > defaults)
  const finalWidth = width || imageWidth || defaultWidth;
  const finalHeight =
    height || imageHeight || (typeof finalWidth === 'number' ? Math.round(finalWidth / aspectRatio) : defaultHeight);

  // Common box props
  const boxProps = {
    component: 'div',
    className,
    sx: {
      width: finalWidth,
      height: finalHeight,
      transform: collapsed ? 'none' : 'translate(0, 0)',
      transition: 'all 0.3s ease-in-out',
      objectFit: 'contain',
      maxWidth: '100%',
      display: 'block',
      ...sx
    },
    ...other
  };

  if (useImage) {
    return (
      <Box
        {...boxProps}
        component="img"
        src={gibLogo}
        alt="GIB Logo"
        sx={{
          ...boxProps.sx,
          objectFit: 'contain',
          // No hover effects
          '&:hover': {
            transform: 'none',
            opacity: 1
          }
        }}
      />
    );
  }

  return (
    <Box
      {...boxProps}
      sx={{
        ...boxProps.sx,
        '&:hover': {
          transform: 'none',
          opacity: 1
        },
        '& path': {
          strokeDasharray: 7000,
          strokeDashoffset: 7000,
          animation: 'drawLogo 3s cubic-bezier(0.37, 0, 0.63, 1) forwards',
          stroke: `url(#${variant}Gradient)`,
          strokeWidth: 20,
          fill: 'none',
          transformOrigin: 'center',
          transition: 'transform 0.3s ease-in-out, filter 0.3s ease-in-out',
          '&:hover': {
            animation: 'cubic-bezier(0.36, 0, 0.66, 1) forwards',
            cursor: 'pointer'
          }
        },
        '@keyframes drawLogo': {
          '0%': {
            strokeDashoffset: 7000,
            fill: 'none',
            transform: 'scale(1)'
          },
          '90%': {
            strokeDashoffset: 0,
            fill: 'none',
            transform: 'scale(1)'
          },
          '100%': {
            strokeDashoffset: 0,
            fill: `url(#${variant}Gradient)`,
            transform: 'scale(1)'
          }
        }
      }}
    >
      <svg
        viewBox="555 310 420 150"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: '100%', height: 'auto', display: 'block' }}
      >
        <defs>
          <linearGradient id={`${variant}Gradient`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style={{ stopColor: colors.start, stopOpacity: 1 }} />
            <stop offset="50%" style={{ stopColor: colors.middle, stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: colors.end, stopOpacity: 1 }} />
          </linearGradient>
        </defs>
        <g transform="translate(0,768) scale(0.10,-0.10)">
          <path d="M0 3840 l0 -3840 7680 0 7680 0 0 3840 0 3840 -7680 0 -7680 0 0 -3840z m5970 495 l0 -56 -137 3 -138 3 -3 53 -3 52 140 0 141 0 0 -55z m820 0 l0 -55 -51 0 c-39 0 -50 -3 -46 -14 14 -36 155 -451 205 -603 31 -95 59 -172 62 -173 3 0 21 51 41 113 20 61 80 238 133 392 53 154 96 281 96 283 0 1 -22 2 -50 2 l-50 0 0 55 0 55 175 0 175 0 0 -55 0 -55 -44 0 -43 0 -178 -482 c-98 -266 -180 -489 -183 -495 -3 -9 -27 -13 -72 -13 l-68 0 -21 58 c-11 31 -93 252 -181 491 -88 238 -160 435 -160 437 0 2 -99 4 -220 4 l-220 0 0 55 0 55 350 0 350 0 0 -55z m1090 0 l0 -55 -140 0 -140 0 0 55 0 55 140 0 140 0 0 -55z m707 40 c72 -21 136 -74 167 -137 65 -137 32 -294 -78 -367 -34 -23 -37 -26 -21 -36 81 -46 119 -117 129 -239 4 -44 13 -95 21 -113 19 -46 83 -73 186 -80 l79 -6 0 -53 0 -54 -112 0 c-127 0 -176 16 -236 73 -50 48 -62 78 -77 197 -23 191 -58 219 -267 220 l-128 0 0 -190 0 -190 55 0 55 0 0 -55 0 -55 -180 0 -180 0 0 55 0 55 55 0 55 0 0 440 0 440 -55 0 -55 0 0 55 0 55 268 0 c209 0 280 -3 319 -15z m895 -14 c32 -12 79 -37 105 -55 l48 -33 3 -106 3 -107 -55 0 c-61 0 -60 -1 -72 85 -9 69 -16 79 -72 103 -100 43 -248 38 -319 -11 -70 -48 -93 -144 -50 -208 30 -45 119 -91 237 -124 229 -63 337 -158 348 -307 6 -77 -19 -145 -73 -206 -63 -70 -162 -102 -315 -102 l-80 0 0 55 0 55 48 0 c81 1 175 18 201 38 41 30 71 91 71 143 0 96 -69 149 -260 203 -232 65 -350 171 -350 316 0 118 96 231 233 276 69 22 277 13 349 -15z m-3512 -636 l0 -435 -135 0 -135 0 0 55 0 54 58 3 57 3 3 378 2 377 75 0 75 0 0 -435z m589 130 c12 -31 21 -58 21 -60 0 -3 -110 -5 -245 -5 l-245 0 0 60 0 60 224 0 225 0 20 -55z m1321 -5 l0 -60 -270 0 c-148 0 -270 2 -270 5 0 2 9 29 21 60 l20 55 250 0 249 0 0 -60z m-1136 -497 c9 -26 16 -50 16 -55 0 -4 -151 -8 -335 -8 l-335 0 0 55 0 55 319 0 319 0 16 -47z m1136 -8 l0 -55 -364 0 -364 0 21 55 20 55 343 0 344 0 0 -55z" />
          <path d="M8250 4085 l0 -185 118 0 c64 0 134 5 155 11 93 25 144 122 118 224 -28 111 -73 135 -259 135 l-132 0 0 -185z" />
        </g>
      </svg>
    </Box>
  );
};

Logo.propTypes = {
  collapsed: PropTypes.bool,
  sx: PropTypes.object,
  variant: PropTypes.oneOf(['primary', 'secondary', 'error', 'warning', 'info', 'success']),
  useImage: PropTypes.bool,
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  imageWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]), // deprecated
  imageHeight: PropTypes.oneOfType([PropTypes.number, PropTypes.string]), // deprecated
  className: PropTypes.string
};

export default Logo;
