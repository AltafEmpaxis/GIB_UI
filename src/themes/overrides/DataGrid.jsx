// material-ui
import { alpha } from '@mui/material/styles';

// ==============================|| OVERRIDES - DATA GRID ||============================== //

export default function DataGrid(theme) {
  const isDark = theme.palette.mode === 'dark';

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
              backgroundColor: isDark ? alpha(theme.palette.grey[800], 0.5) : alpha(theme.palette.primary.lighter, 0.3),
              borderBottom: `2px solid ${isDark ? theme.palette.divider : theme.palette.primary.light}`,
              '& .MuiDataGrid-columnHeader': {
                color: isDark ? theme.palette.grey[100] : theme.palette.text.primary,
                fontWeight: 700,
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
                backgroundColor: isDark ? alpha(theme.palette.grey[800], 0.3) : alpha(theme.palette.grey[100], 0.5)
              },
              '&:nth-of-type(even)': {
                backgroundColor: isDark ? alpha(theme.palette.grey[900], 0.3) : theme.palette.background.paper
              },
              '&:hover': {
                backgroundColor: isDark
                  ? alpha(theme.palette.primary.dark, 0.15)
                  : alpha(theme.palette.primary.lighter, 0.35)
              },
              '&.Mui-selected': {
                backgroundColor: isDark
                  ? alpha(theme.palette.primary.darker, 0.2)
                  : alpha(theme.palette.primary.lighter, 0.35),
                '&:hover': {
                  backgroundColor: isDark
                    ? alpha(theme.palette.primary.darker, 0.25)
                    : alpha(theme.palette.primary.lighter, 0.45)
                }
              }
            }
          }
        },
        toolbarContainer: {
          padding: '8px 16px',
          backgroundColor: isDark ? alpha(theme.palette.grey[800], 0.5) : alpha(theme.palette.primary.lighter, 0.2),
          '& .MuiButton-root': {
            marginRight: 8,
            color: theme.palette.text.secondary,
            '&:hover': {
              backgroundColor: isDark ? alpha(theme.palette.primary.main, 0.1) : alpha(theme.palette.primary.main, 0.05)
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
            color: isDark ? theme.palette.grey[100] : theme.palette.grey[900],
            fontSize: '0.875rem',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.1em'
          }
        },
        columnHeaderCheckbox: {
          '& .MuiSvgIcon-root': {
            fontSize: '1.1rem',
            color: isDark ? theme.palette.grey[400] : theme.palette.grey[600]
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
            color: isDark ? theme.palette.grey[400] : theme.palette.grey[600]
          }
        },
        footer: {
          borderTop: `2px solid ${theme.palette.divider}`,
          backgroundColor: isDark ? alpha(theme.palette.grey[800], 0.3) : alpha(theme.palette.primary.lighter, 0.1)
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
              backgroundColor: isDark ? alpha(theme.palette.primary.main, 0.1) : alpha(theme.palette.primary.main, 0.05)
            }
          }
        },
        sortIcon: {
          fontSize: '1rem',
          marginLeft: 8,
          color: isDark ? theme.palette.grey[400] : theme.palette.grey[600]
        },
        menuIcon: {
          fontSize: '1.25rem',
          marginLeft: 4,
          color: isDark ? theme.palette.grey[400] : theme.palette.grey[600]
        },
        filterIcon: {
          fontSize: '1.25rem',
          color: isDark ? theme.palette.grey[400] : theme.palette.grey[600]
        },
        row: {
          '&.Mui-selected': {
            backgroundColor: isDark
              ? alpha(theme.palette.primary.darker, 0.2)
              : alpha(theme.palette.primary.lighter, 0.35),
            '&:hover': {
              backgroundColor: isDark
                ? alpha(theme.palette.primary.darker, 0.25)
                : alpha(theme.palette.primary.lighter, 0.45)
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
            backgroundColor: isDark ? theme.palette.grey[600] : theme.palette.grey[400],
            borderRadius: 4,
            '&:hover': {
              background: isDark ? theme.palette.grey[500] : theme.palette.grey[500]
            }
          }
        },
        selectedRowCount: {
          margin: '0 8px',
          color: theme.palette.text.secondary
        }
      }
    }
  };
}
