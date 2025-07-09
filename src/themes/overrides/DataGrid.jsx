// material-ui
import { alpha } from '@mui/material/styles';

// ==============================|| OVERRIDES - DATA GRID ||============================== //

export default function DataGrid(theme) {
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
    MuiDataGrid: {
      defaultProps: {
        autoHeight: true,
        disableColumnMenu: true,
        disableColumnFilter: false,
        disableSelectionOnClick: true,
        disableColumnSelector: false,
        disableDensitySelector: false
      },
      styleOverrides: {
        root: {
          borderRadius: theme.shape.borderRadius,
          border: `1px solid ${theme.palette.divider}`,
          '& .MuiDataGrid-main': {
            '& .MuiDataGrid-columnHeaders': {
              backgroundColor: colors.header.bg,
              borderBottom: colors.header.border,
              '& .MuiDataGrid-columnHeader': {
                color: colors.header.text,
                fontWeight: 600, // Semi-bold per GIB guidelines
                fontSize: '0.875rem'
              }
            },
            '& .MuiDataGrid-cell': {
              borderColor: theme.palette.divider,
              fontSize: '0.875rem',
              padding: '12px 16px',
              '&:focus': {
                outline: 'none'
              },
              '&:focus-within': {
                outline: 'none'
              }
            },
            '& .MuiDataGrid-row': {
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
        },
        toolbarContainer: {
          padding: '8px 16px',
          backgroundColor: colors.header.bg,
          '& .MuiButton-root': {
            marginRight: 8,
            color: colors.header.text,
            '&:hover': {
              backgroundColor: alpha(theme.palette.secondary.main, 0.2) // 20% Yellow
            }
          }
        },
        columnHeaders: {
          borderTop: `1px solid ${theme.palette.divider}`,
          '& .MuiDataGrid-columnHeader': {
            '&:focus': {
              outline: 'none'
            },
            '&:focus-within': {
              outline: 'none'
            }
          },
          '& .MuiDataGrid-columnHeaderTitle': {
            color: colors.header.text,
            fontSize: '0.875rem',
            fontWeight: 600, // Semi-bold per GIB guidelines
            textTransform: 'uppercase',
            letterSpacing: '0.1em'
          }
        },
        columnHeaderCheckbox: {
          '& .MuiSvgIcon-root': {
            fontSize: '1.1rem',
            color: theme.palette.tertiary.main // Medium Grey
          }
        },
        cell: {
          '&:focus': {
            outline: 'none'
          },
          '&:focus-within': {
            outline: 'none'
          }
        },
        cellCheckbox: {
          '& .MuiSvgIcon-root': {
            fontSize: '1.1rem',
            color: theme.palette.tertiary.main // Medium Grey
          }
        },
        footer: {
          borderTop: `2px solid ${theme.palette.divider}`,
          backgroundColor: colors.pagination.bg
        },
        columnSeparator: {
          color: theme.palette.divider
        },
        menuList: {
          backgroundColor: theme.palette.background.paper,
          padding: '8px 0',
          '& .MuiMenuItem-root': {
            fontSize: '0.875rem',
            '&:hover': {
              backgroundColor: alpha(theme.palette.secondary.main, 0.1) // 10% Yellow
            }
          }
        },
        sortIcon: {
          fontSize: '1rem',
          marginLeft: 8,
          color: theme.palette.tertiary.main // Medium Grey
        },
        menuIcon: {
          fontSize: '1.25rem',
          marginLeft: 4,
          color: theme.palette.tertiary.main // Medium Grey
        },
        filterIcon: {
          fontSize: '1.25rem',
          color: theme.palette.tertiary.main // Medium Grey
        },
        row: {
          '&.Mui-selected': {
            backgroundColor: colors.body.selected,
            '&:hover': {
              backgroundColor: colors.body.selectedHover
            }
          }
        },
        virtualScroller: {
          '&::-webkit-scrollbar': {
            width: 8,
            height: 8
          },
          '&::-webkit-scrollbar-track': {
            background: isDark ? theme.palette.grey[800] : theme.palette.grey[100]
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: theme.palette.tertiary.main, // Medium Grey
            borderRadius: 4,
            '&:hover': {
              background: theme.palette.tertiary.dark // Medium Grey dark variant
            }
          }
        },
        selectedRowCount: {
          margin: '0 8px',
          color: colors.pagination.text
        }
      }
    }
  };
}
