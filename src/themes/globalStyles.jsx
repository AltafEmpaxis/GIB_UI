import { GlobalStyles as MuiGlobalStyles } from '@mui/material';
import { alpha } from '@mui/material/styles';

// ==============================|| GLOBAL STYLES ||============================== //

export default function GlobalStyles() {
  return (
    <MuiGlobalStyles
      styles={(theme) => ({
        // Reset & Base styles
        '*': {
          boxSizing: 'border-box',
          margin: 0,
          padding: 0
        },
        html: {
          WebkitFontSmoothing: 'antialiased',
          MozOsxFontSmoothing: 'grayscale',
          height: '100%',
          width: '100%'
        },
        body: {
          height: '100%',
          width: '100%'
        },
        '#root': {
          height: '100%',
          width: '100%'
        },

        // Text Selection Styling
        '::selection': {
          backgroundColor: alpha(theme.palette.primary.main, 0.2),
          color: theme.palette.text.primary
        },

        // Scrollbar styles
        '::-webkit-scrollbar': {
          width: 8,
          height: 8
        },
        '::-webkit-scrollbar-track': {
          background: alpha(theme.palette.grey[200], 0.8)
        },
        '::-webkit-scrollbar-thumb': {
          backgroundColor: alpha(theme.palette.grey[400], 0.9),
          borderRadius: 4,
          transition: 'background-color 0.2s'
        },
        '::-webkit-scrollbar-thumb:hover': {
          backgroundColor: alpha(theme.palette.primary.main, 0.7)
        },

        // Enhanced ApexCharts Custom Styles
        '.apexcharts-canvas': {
          fontFamily: theme.typography.fontFamily,

          // Theme-aware colors for chart elements
          '& .apexcharts-theme-light': {
            '& .apexcharts-selection-icon:not(.apexcharts-selected):hover svg, & .apexcharts-zoom-icon:not(.apexcharts-selected):hover svg, & .apexcharts-zoomin-icon:hover svg, & .apexcharts-zoomout-icon:hover svg, & .apexcharts-reset-icon:hover svg, & .apexcharts-menu-icon:hover svg':
              {
                fill: theme.palette.primary.main
              }
          },

          // Enhanced Title & Text styles
          '& .apexcharts-title-text': {
            fill: theme.palette.text.primary,
            ...theme.typography.h6
          },

          '& .apexcharts-text, & .apexcharts-tooltip-text': {
            fill: theme.palette.text.primary,
            ...theme.typography.body2
          },

          '& .apexcharts-xaxis-label, & .apexcharts-yaxis-label': {
            fill: theme.palette.text.secondary,
            ...theme.typography.body2
          },

          // Grid & Lines with theme colors
          '& .apexcharts-grid line': {
            stroke: theme.palette.divider
          },

          // Enhanced Tooltip
          '& .apexcharts-tooltip': {
            backgroundColor: alpha(theme.palette.background.paper, 0.95),
            borderColor: theme.palette.divider,
            boxShadow: theme.shadows[3],
            borderRadius: theme.shape.borderRadius,
            backdropFilter: 'blur(8px)',

            '& .apexcharts-tooltip-title': {
              backgroundColor: alpha(theme.palette.grey[200], 0.8),
              borderColor: theme.palette.divider,
              ...theme.typography.subtitle2
            },

            '& .apexcharts-tooltip-series-group': {
              '&.active': {
                backgroundColor: alpha(theme.palette.primary.main, 0.2)
              }
            }
          },

          // Theme-aware toolbar
          '& .apexcharts-toolbar': {
            '& .apexcharts-menu': {
              backgroundColor: theme.palette.background.paper,
              border: `1px solid ${theme.palette.divider}`,
              borderRadius: theme.shape.borderRadius,
              boxShadow: theme.shadows[3],
              backdropFilter: 'blur(8px)',

              '& .apexcharts-menu-item:hover': {
                backgroundColor: alpha(theme.palette.primary.main, 0.1)
              }
            }
          },

          // Series colors based on theme palette
          '& .apexcharts-series': {
            '&.apexcharts-pie-series path, &.apexcharts-donut-series path': {
              stroke: theme.palette.background.paper
            },
            '& .apexcharts-bar, & .apexcharts-candlestick-area, & .apexcharts-rangebar-area': {
              '&:hover': {
                filter: `brightness(${theme.palette.mode === 'dark' ? 1.2 : 0.9})`
              }
            }
          },

          // Theme-specific markers
          '& .apexcharts-marker': {
            stroke: theme.palette.background.paper
          }
        },

        // Chart Type Specific Styles
        '.apexcharts-bar-series .apexcharts-bar, .apexcharts-candlestick-series .apexcharts-candlestick': {
          '&:hover': {
            filter: `brightness(${theme.palette.mode === 'dark' ? 1.2 : 0.9})`
          }
        },

        '.apexcharts-pie-series path': {
          stroke: 'none',
          transition: 'filter 0.2s ease-in-out',
          '&:hover': {
            filter: `brightness(${theme.palette.mode === 'dark' ? 1.2 : 0.9})`
          }
        },

        // Sweetalert2 Custom Styles
        '.swal2-container': {
          zIndex: theme.zIndex.modal + 1,
          '& .swal2-backdrop-show': {
            backgroundColor: alpha(theme.palette.grey[900], 0.4)
          }
        },
        '.swal2-popup': {
          backgroundColor: theme.palette.background.paper,
          borderRadius: theme.shape.borderRadius * 1.5,
          padding: theme.spacing(3),
          fontFamily: theme.typography.fontFamily,
          boxShadow: theme.shadows[8],
          border: `1px solid ${theme.palette.divider}`,
          backdropFilter: 'blur(8px)',

          // Title
          '& .swal2-title': {
            color: theme.palette.text.primary,
            ...theme.typography.h5,
            marginBottom: theme.spacing(1)
          },

          // Content
          '& .swal2-html-container': {
            color: theme.palette.text.secondary,
            ...theme.typography.body1,
            marginBottom: theme.spacing(2)
          },

          // Close Button
          '& .swal2-close': {
            color: theme.palette.text.secondary,
            transition: theme.transitions.create(['color']),
            '&:hover': {
              color: theme.palette.primary.main,
              backgroundColor: 'transparent'
            },
            '&:focus': {
              boxShadow: 'none',
              outline: `2px solid ${theme.palette.primary.main}`
            }
          },

          // Icons - Fix size and colors
          '& .swal2-icon': {
            width: 80,
            height: 80,
            margin: `${theme.spacing(2)} auto`,
            border: '4px solid transparent',
            position: 'relative',
            display: 'flex',
            boxSizing: 'content-box',
            justifyContent: 'center',
            transition: 'all 0.2s ease-in-out',

            '&.swal2-success': {
              borderColor: alpha(theme.palette.success.main, 0.9),
              '&::before, &::after': {
                backgroundColor: 'transparent',
                content: '""',
                borderRadius: '50%',
                position: 'absolute'
              },
              '& .swal2-success-circular-line-left, & .swal2-success-circular-line-right, & .swal2-success-fix': {
                backgroundColor: 'transparent'
              },
              '& .swal2-success-ring': {
                borderColor: alpha(theme.palette.success.main, 0.3),
                position: 'absolute',
                top: -4,
                left: -4,
                width: 80,
                height: 80,
                border: `4px solid ${alpha(theme.palette.success.main, 0.3)}`,
                borderRadius: '50%',
                zIndex: 2,
                boxSizing: 'content-box'
              },
              '& .swal2-success-line-tip, & .swal2-success-line-long': {
                display: 'block',
                position: 'absolute',
                height: 5,
                background: theme.palette.success.main,
                borderRadius: 2
              },
              '& .swal2-success-line-tip': {
                width: 25,
                left: 14,
                top: 46,
                transform: 'rotate(45deg)'
              },
              '& .swal2-success-line-long': {
                width: 47,
                right: 8,
                top: 38,
                transform: 'rotate(-45deg)'
              }
            },

            '&.swal2-error': {
              borderColor: alpha(theme.palette.error.main, 0.9),
              '& .swal2-x-mark': {
                position: 'relative',
                display: 'block',
                flex: 1
              },
              '& .swal2-x-mark-line-left, & .swal2-x-mark-line-right': {
                display: 'block',
                position: 'absolute',
                height: 5,
                width: 47,
                background: theme.palette.error.main,
                borderRadius: 2,
                top: 37,
                left: 17
              },
              '& .swal2-x-mark-line-right': {
                transform: 'rotate(45deg)'
              },
              '& .swal2-x-mark-line-left': {
                transform: 'rotate(-45deg)'
              }
            },

            '&.swal2-warning, &.swal2-info, &.swal2-question': {
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              '& .swal2-icon-content': {
                fontSize: '3.75em',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%'
              }
            },

            '&.swal2-warning': {
              borderColor: alpha(theme.palette.warning.main, 0.9),
              color: theme.palette.warning.main
            },

            '&.swal2-info': {
              borderColor: alpha(theme.palette.info.main, 0.9),
              color: theme.palette.info.main
            },

            '&.swal2-question': {
              borderColor: alpha(theme.palette.primary.main, 0.9),
              color: theme.palette.primary.main
            }
          },

          // Buttons - Fix styling
          '& .swal2-actions': {
            marginTop: theme.spacing(3),
            gap: theme.spacing(1),

            '& .swal2-styled': {
              margin: 0,
              borderRadius: theme.shape.borderRadius,
              padding: theme.spacing(0.75, 2),
              fontSize: theme.typography.button.fontSize,
              fontWeight: theme.typography.button.fontWeight,
              textTransform: 'uppercase',
              minWidth: 96,
              boxShadow: 'none',
              transition: theme.transitions.create(['background-color', 'box-shadow']),
              '&:focus': {
                boxShadow: `0 0 0 2px ${alpha(theme.palette.primary.main, 0.2)}`
              }
            },

            '& .swal2-confirm': {
              backgroundColor: `${theme.palette.primary.main} !important`,
              color: `${theme.palette.primary.contrastText} !important`,
              '&:hover': {
                backgroundColor: `${theme.palette.primary.dark} !important`,
                boxShadow: theme.shadows[2]
              }
            },

            '& .swal2-cancel': {
              backgroundColor: `${alpha(theme.palette.grey[300], 0.9)} !important`,
              color: `${theme.palette.grey[800]} !important`,
              '&:hover': {
                backgroundColor: `${alpha(theme.palette.grey[400], 0.9)} !important`,
                color: `${theme.palette.common.white} !important`,
                boxShadow: theme.shadows[2]
              }
            },

            '& .swal2-deny': {
              backgroundColor: `${theme.palette.error.main} !important`,
              color: `${theme.palette.error.contrastText} !important`,
              '&:hover': {
                backgroundColor: `${theme.palette.error.dark} !important`,
                boxShadow: theme.shadows[2]
              }
            }
          }
        }
      })}
    />
  );
}
