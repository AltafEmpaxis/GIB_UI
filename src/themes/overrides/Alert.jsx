import CheckCircleOutlineRounded from '@mui/icons-material/CheckCircleOutlineRounded';
import ErrorOutlineRounded from '@mui/icons-material/ErrorOutlineRounded';
import InfoOutlined from '@mui/icons-material/InfoOutlined';
import WarningAmberRounded from '@mui/icons-material/WarningAmberRounded';
import { alpha } from '@mui/material/styles';

// ==============================|| OVERRIDES - ALERT ||============================== //

const COLORS = ['primary', 'secondary', 'info', 'success', 'warning', 'error'];

export default function Alert(theme) {
  const isDark = theme.palette.mode === 'dark';

  const rootStyle = (ownerState) => {
    const standardVariant = ownerState.variant === 'standard';
    const filledVariant = ownerState.variant === 'filled';
    const outlinedVariant = ownerState.variant === 'outlined';
    const softVariant = ownerState.variant === 'soft';

    const colorStyle = COLORS.map((color) => ({
      ...(ownerState.severity === color && {
        // STANDARD
        ...(standardVariant && {
          color: theme.palette[color][isDark ? 200 : 800],
          backgroundColor: alpha(theme.palette[color].main, isDark ? 0.12 : 0.08),
          '& .MuiAlert-icon': {
            color: theme.palette[color][isDark ? 200 : 'main']
          },
          '&:hover': {
            backgroundColor: alpha(theme.palette[color].main, isDark ? 0.16 : 0.12)
          },
          '& .MuiAlert-action': {
            '& .MuiIconButton-root': {
              color: theme.palette[color][isDark ? 200 : 500],
              '&:hover': {
                backgroundColor: alpha(theme.palette[color].main, 0.08)
              }
            }
          }
        }),
        // FILLED
        ...(filledVariant && {
          color: theme.palette[color].contrastText,
          backgroundColor: theme.palette[color][isDark ? 600 : 'main'],
          '& .MuiAlert-icon': {
            color: theme.palette[color].contrastText
          },
          '&:hover': {
            backgroundColor: theme.palette[color][isDark ? 500 : 'dark']
          },
          '& .MuiAlert-action': {
            '& .MuiIconButton-root': {
              color: alpha(theme.palette[color].contrastText, 0.9),
              '&:hover': {
                backgroundColor: alpha(theme.palette.common.white, 0.16)
              }
            }
          }
        }),
        // OUTLINED
        ...(outlinedVariant && {
          color: theme.palette[color][isDark ? 200 : 800],
          backgroundColor: alpha(theme.palette[color].main, 0.02),
          border: `1px solid ${alpha(theme.palette[color].main, 0.15)}`,
          '& .MuiAlert-icon': {
            color: theme.palette[color][isDark ? 200 : 'main'],
            opacity: 0.8
          },
          '&:hover': {
            backgroundColor: alpha(theme.palette[color].main, isDark ? 0.08 : 0.04)
          },
          '& .MuiAlert-action': {
            '& .MuiIconButton-root': {
              color: theme.palette[color][isDark ? 200 : 500],
              '&:hover': {
                backgroundColor: alpha(theme.palette[color].main, 0.08)
              }
            }
          }
        }),
        // SOFT
        ...(softVariant && {
          color: theme.palette[color][isDark ? 200 : 800],
          backgroundColor: alpha(theme.palette[color].main, isDark ? 0.12 : 0.08),
          '& .MuiAlert-icon': {
            color: theme.palette[color][isDark ? 200 : 'main'],
            opacity: 0.8
          },
          '&:hover': {
            backgroundColor: alpha(theme.palette[color].main, isDark ? 0.16 : 0.12)
          }
        })
      })
    }));

    return [
      {
        padding: theme.spacing(1.5, 2),
        borderRadius: theme.shape.borderRadius,
        '& .MuiAlert-message': {
          padding: theme.spacing(1, 0),
          width: '100%',
          color: theme.palette.primary.main // Dark Grey
        },
        '& .MuiAlert-icon': {
          fontSize: 20,
          opacity: 0.9,
          marginRight: theme.spacing(1.5),
          color: theme.palette.primary.main, // Dark Grey
          display: 'flex',
          alignItems: 'center',
          '& .MuiSvgIcon-root': {
            fontSize: 20
          }
        },
        '& .MuiAlert-action': {
          marginRight: -4,
          '& .MuiIconButton-root': {
            padding: 4,
            '&:hover': {
              borderRadius: theme.shape.borderRadius
            }
          }
        },
        // Typography styles
        '& .MuiTypography-subtitle2': {
          fontWeight: 500,
          marginBottom: theme.spacing(0.5)
        },
        '& .MuiTypography-caption': {
          color: theme.palette.tertiary.main, // Medium Grey
          display: 'block'
        }
      },
      ...colorStyle
    ];
  };

  return {
    MuiAlert: {
      defaultProps: {
        iconMapping: {
          info: <InfoOutlined />,
          success: <CheckCircleOutlineRounded />,
          warning: <WarningAmberRounded />,
          error: <ErrorOutlineRounded />
        },
        variant: 'standard'
      },
      styleOverrides: {
        root: ({ ownerState }) => rootStyle(ownerState),
        icon: {
          opacity: 1
        },
        message: {
          padding: theme.spacing(1, 0)
        },
        action: {
          padding: theme.spacing(0, 1, 0, 0)
        },
        // GIB specific alert styles
        standardWarning: {
          backgroundColor: alpha(theme.palette.secondary.main, 0.1), // 10% Yellow
          color: theme.palette.primary.main, // Dark Grey
          '& .MuiAlert-icon': {
            color: theme.palette.secondary.main // GIB Yellow
          }
        },
        standardInfo: {
          backgroundColor: alpha(theme.palette.info.main, 0.1),
          color: theme.palette.primary.main // Dark Grey
        },
        standardSuccess: {
          backgroundColor: alpha(theme.palette.success.main, 0.1),
          color: theme.palette.primary.main // Dark Grey
        },
        standardError: {
          backgroundColor: alpha(theme.palette.error.main, 0.1),
          color: theme.palette.primary.main // Dark Grey
        }
      },
      variants: [
        {
          props: { variant: 'soft' },
          style: {}
        }
      ]
    },
    MuiAlertTitle: {
      styleOverrides: {
        root: {
          fontWeight: 600, // Semi-bold per GIB guidelines
          marginBottom: theme.spacing(0.5),
          color: 'inherit'
        }
      }
    }
  };
}
