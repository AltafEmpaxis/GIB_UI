// material-ui
import { alpha } from '@mui/material/styles';

// ==============================|| OVERRIDES - TABLE ||============================== //

export default function Table(theme) {
  const isDark = theme.palette.mode === 'dark';

  // Theme colors for better visual hierarchy
  const colors = {
    header: {
      bg: isDark ? alpha(theme.palette.grey[900], 0.85) : alpha(theme.palette.secondary.main, 0.1), // 10% Yellow
      text: isDark ? theme.palette.common.white : theme.palette.primary.main, // Dark Grey
      border: isDark
        ? `1px solid ${alpha(theme.palette.secondary.main, 0.25)}`
        : `2px solid ${theme.palette.secondary.main}` // GIB Yellow
    },
    body: {
      odd: isDark ? alpha(theme.palette.grey[800], 0.4) : alpha(theme.palette.secondary.main, 0.05), // 5% Yellow
      even: isDark ? alpha(theme.palette.grey[900], 0.5) : theme.palette.background.paper,
      hover: isDark ? alpha(theme.palette.secondary.main, 0.2) : alpha(theme.palette.secondary.main, 0.1), // 10-20% Yellow
      selected: isDark ? alpha(theme.palette.secondary.main, 0.3) : alpha(theme.palette.secondary.main, 0.2), // 20-30% Yellow
      selectedHover: isDark ? alpha(theme.palette.secondary.main, 0.35) : alpha(theme.palette.secondary.main, 0.3), // 30-35% Yellow
      border: isDark ? alpha(theme.palette.divider, 0.2) : alpha(theme.palette.tertiary.main, 0.15) // Medium Grey
    },
    pagination: {
      bg: isDark ? alpha(theme.palette.grey[900], 0.75) : alpha(theme.palette.secondary.main, 0.05), // 5% Yellow
      hover: isDark ? alpha(theme.palette.secondary.main, 0.25) : alpha(theme.palette.secondary.main, 0.15), // 15-25% Yellow
      text: isDark ? theme.palette.grey[300] : theme.palette.primary.main // Dark Grey
    }
  };

  return {
    MuiTableContainer: {
      styleOverrides: {
        root: {
          boxShadow: theme.shadows[1],
          borderRadius: theme.shape.borderRadius * 0.05,
          border: `1px solid ${colors.body.border}`,
          background: isDark ? alpha(theme.palette.background.default, 0.9) : theme.palette.background.paper,
          transition: 'all .2s ease-in-out',
          '&:hover': {
            boxShadow: theme.shadows[2]
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
            fontWeight: 600, // Semi-bold per GIB guidelines
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
            color: isDark ? theme.palette.grey[100] : theme.palette.primary.main, // Dark Grey
            '&:first-of-type': {
              paddingLeft: 24
            },
            '&:last-of-type': {
              paddingRight: 24
            }
          },
          '& .MuiTableRow-root': {
            transition: 'all .2s cubic-bezier(0.4, 0, 0.2, 1)',
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
              boxShadow: theme.shadows[4]
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
            color: isDark ? theme.palette.common.white : theme.palette.secondary.dark, // Yellow dark variant
            '& .MuiTableSortLabel-icon': {
              opacity: 0.8
            }
          },
          '&.Mui-active': {
            color: isDark ? theme.palette.secondary.light : theme.palette.secondary.dark, // Yellow variants
            fontWeight: 600, // Semi-bold per GIB guidelines
            '& .MuiTableSortLabel-icon': {
              color: isDark ? theme.palette.secondary.light : theme.palette.secondary.dark, // Yellow variants
              opacity: 1
            }
          }
        },
        icon: {
          fontSize: '1rem',
          marginLeft: 8,
          color: theme.palette.tertiary.main, // Medium Grey
          opacity: 0.8,
          transition: 'all .2s ease-in-out'
        }
      }
    }
  };
}
