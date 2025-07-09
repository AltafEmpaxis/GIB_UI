import { alpha } from '@mui/material';

//===================================| OVERRIDES - PROGRESS BAR |===============================================

const COLORS = ['primary', 'secondary', 'info', 'success', 'warning', 'error'];

export default function Progress(theme) {
  const rootStyle = (ownerState) => {
    const bufferVariant = ownerState.variant === 'buffer';

    const defaultStyle = {
      borderRadius: 3,
      '& .MuiLinearProgress-bar': {
        borderRadius: 3
      },
      ...(bufferVariant && {
        backgroundColor: 'transparent'
      })
    };

    const colorStyle = COLORS.map((color) => ({
      ...(ownerState.color === color && {
        backgroundColor: alpha(theme.palette[color].main, 0.24)
      })
    }));

    return [...colorStyle, defaultStyle];
  };

  return {
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          height: 2,
          borderRadius: 3,
          overflow: 'hidden',
          backgroundColor: theme.palette.grey[200], // Light Grey
          ...({ ownerState }) => rootStyle(ownerState)
        },
        bar: {
          borderRadius: 3
        },
        // Color variants
        colorPrimary: {
          backgroundColor: alpha(theme.palette.primary.main, 0.12), // 12% Dark Grey
          '& .MuiLinearProgress-bar': {
            backgroundColor: theme.palette.primary.main // Dark Grey
          }
        },
        colorSecondary: {
          backgroundColor: alpha(theme.palette.secondary.main, 0.12), // 12% GIB Yellow
          '& .MuiLinearProgress-bar': {
            backgroundColor: theme.palette.secondary.main // GIB Yellow
          }
        },
        colorSuccess: {
          backgroundColor: alpha(theme.palette.success.main, 0.12),
          '& .MuiLinearProgress-bar': {
            backgroundColor: theme.palette.success.main
          }
        },
        colorError: {
          backgroundColor: alpha(theme.palette.error.main, 0.12),
          '& .MuiLinearProgress-bar': {
            backgroundColor: theme.palette.error.main
          }
        },
        colorWarning: {
          backgroundColor: alpha(theme.palette.warning.main, 0.12),
          '& .MuiLinearProgress-bar': {
            backgroundColor: theme.palette.warning.main
          }
        },
        colorInfo: {
          backgroundColor: alpha(theme.palette.info.main, 0.12),
          '& .MuiLinearProgress-bar': {
            backgroundColor: theme.palette.info.main
          }
        },
        // Variants
        determinate: {
          '& .MuiLinearProgress-bar': {
            transition: theme.transitions.create('transform', {
              duration: theme.transitions.duration.standard,
              easing: theme.transitions.easing.easeInOut
            })
          }
        },
        indeterminate: {
          '& .MuiLinearProgress-bar1': {
            width: 'auto'
          },
          '& .MuiLinearProgress-bar2': {
            width: 'auto',
            animation: 'mui-indeterminate2 2.1s cubic-bezier(0.165, 0.84, 0.44, 1) infinite',
            animationDelay: '1.15s'
          }
        },
        // Sizes
        buffer: {
          backgroundColor: 'transparent'
        },
        query: {
          transform: 'rotate(180deg)'
        }
      },
      defaultProps: {
        color: 'secondary' // Default to GIB Yellow
      }
    }
  };
}
