// material-ui
import { alpha } from '@mui/material/styles';

// ==============================|| OVERRIDES - TABLE ||============================== //

export default function Table(theme, customShadows) {
  const isDark = theme.palette.mode === 'dark';

  // Theme colors for better visual hierarchy
  const colors = {
    header: {
      bg: isDark ? alpha(theme.palette.grey[900], 0.85) : alpha(theme.palette.primary.main, 0.15),
      text: isDark ? theme.palette.common.white : theme.palette.primary.darker,
      border: isDark
        ? `1px solid ${alpha(theme.palette.primary.main, 0.25)}`
        : `2px solid ${theme.palette.primary.main}`
    },
    body: {
      odd: isDark ? alpha(theme.palette.grey[800], 0.4) : alpha(theme.palette.primary.lighter, 0.2),
      even: isDark ? alpha(theme.palette.grey[900], 0.5) : theme.palette.background.paper,
      hover: isDark ? alpha(theme.palette.primary.main, 0.2) : alpha(theme.palette.primary.lighter, 0.45),
      selected: isDark ? alpha(theme.palette.primary.main, 0.3) : alpha(theme.palette.primary.light, 0.4),
      selectedHover: isDark ? alpha(theme.palette.primary.main, 0.35) : alpha(theme.palette.primary.main, 0.25),
      border: isDark ? alpha(theme.palette.divider, 0.2) : alpha(theme.palette.primary.light, 0.15)
    },
    pagination: {
      bg: isDark ? alpha(theme.palette.grey[900], 0.75) : alpha(theme.palette.primary.lighter, 0.2),
      hover: isDark ? alpha(theme.palette.primary.main, 0.25) : alpha(theme.palette.primary.main, 0.15),
      text: isDark ? theme.palette.grey[300] : theme.palette.primary.darker
    }
  };

  return {
    MuiTableContainer: {
      styleOverrides: {
        root: {
          boxShadow: customShadows.z1,
          borderRadius: theme.shape.borderRadius * 0.05,
          border: `1px solid ${colors.body.border}`,
          background: isDark ? alpha(theme.palette.background.default, 0.9) : theme.palette.background.paper,
          transition: 'all .2s ease-in-out',
          '&:hover': {
            boxShadow: customShadows.z2
          }
        }
      }
    },
    MuiTable: {
      styleOverrides: {
        root: {
          borderCollapse: 'separate',
          borderSpacing: 0
        }
      }
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          backgroundColor: colors.header.bg,
          '.MuiTableCell-root': {
            color: colors.header.text,
            fontSize: '0.75rem',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.13em',
            borderBottom: colors.header.border,
            whiteSpace: 'nowrap',
            overflow: 'visible',
            '&:first-of-type': {
              paddingLeft: 24,
              borderTopLeftRadius: theme.shape.borderRadius
            },
            '&:last-of-type': {
              paddingRight: 24,
              borderTopRightRadius: theme.shape.borderRadius
            },
            '& .Mui-TableHeadCell-Content-Labels': {
              overflow: 'visible'
            }
          }
        }
      }
    },
    MuiTableBody: {
      styleOverrides: {
        root: {
          '& .MuiTableCell-root': {
            fontSize: '0.875rem',
            borderBottom: `1px solid ${colors.body.border}`,
            color: isDark ? theme.palette.grey[100] : theme.palette.text.primary,
            '&:first-of-type': {
              paddingLeft: 24
            },
            '&:last-of-type': {
              paddingRight: 24
            }
          },
          '& .MuiTableRow-root': {
            transition: 'all .25s ease',
            '&:nth-of-type(odd)': {
              backgroundColor: colors.body.odd
            },
            '&:nth-of-type(even)': {
              backgroundColor: colors.body.even
            },
            '&:hover': {
              backgroundColor: colors.body.hover
            },
            '&.Mui-selected': {
              backgroundColor: colors.body.selected,
              '&:hover': {
                backgroundColor: colors.body.selectedHover
              }
            }
          }
        }
      }
    },
    MuiTablePagination: {
      styleOverrides: {
        root: {
          borderTop: `1px solid ${colors.body.border}`,
          backgroundColor: colors.pagination.bg,
          color: colors.pagination.text
        },
        select: {
          '&:focus': {
            backgroundColor: 'transparent'
          }
        },
        selectIcon: {
          color: colors.pagination.text
        },
        displayedRows: {
          color: colors.pagination.text
        },
        actions: {
          '& .MuiIconButton-root': {
            padding: '8px',
            color: colors.pagination.text,
            '&.Mui-disabled': {
              color: alpha(colors.pagination.text, 0.35)
            },
            '&:hover': {
              backgroundColor: colors.pagination.hover,
              boxShadow: customShadows.primary
            }
          }
        }
      }
    },
    MuiTableSortLabel: {
      styleOverrides: {
        root: {
          color: 'inherit',
          '&:hover': {
            color: isDark ? theme.palette.common.white : theme.palette.primary.dark,
            '& .MuiTableSortLabel-icon': {
              opacity: 0.8
            }
          },
          '&.Mui-active': {
            color: isDark ? theme.palette.primary.light : theme.palette.primary.dark,
            fontWeight: 700,
            '& .MuiTableSortLabel-icon': {
              color: isDark ? theme.palette.primary.light : theme.palette.primary.dark,
              opacity: 1
            }
          }
        },
        icon: {
          fontSize: '1rem',
          marginLeft: 8,
          color: isDark ? theme.palette.grey[400] : theme.palette.grey[600],
          opacity: 0.8,
          transition: 'all .2s ease-in-out'
        }
      }
    }
  };
}
