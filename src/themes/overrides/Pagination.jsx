// ==============================|| OVERRIDES - PAGINATION ||============================== //

export default function Pagination(theme) {
  return {
    MuiPagination: {
      defaultProps: {
        shape: 'rounded',
        variant: 'outlined',
        color: 'secondary' // Use secondary color (GIB Yellow)
      },
      styleOverrides: {
        root: {
          '& .MuiPaginationItem-root': {
            fontWeight: 600, // Semi-bold per GIB guidelines
            transition: theme.transitions.create(['color', 'background-color'], {
              duration: theme.transitions.duration.shorter
            }),
            '&.Mui-selected': {
              backgroundColor: theme.palette.secondary.main, // GIB Yellow
              color: theme.palette.primary.main, // Dark Grey text
              '&:hover': {
                backgroundColor: theme.palette.secondary.dark // Yellow dark variant
              }
            },
            '&.MuiPaginationItem-outlined': {
              borderColor: theme.palette.tertiary.main, // Medium Grey
              color: theme.palette.primary.main, // Dark Grey text
              '&:hover': {
                backgroundColor: theme.palette.action.hover,
                borderColor: theme.palette.secondary.main // GIB Yellow
              },
              '&.Mui-selected': {
                backgroundColor: theme.palette.secondary.lighter, // Light Yellow
                borderColor: theme.palette.secondary.main, // GIB Yellow
                color: theme.palette.primary.main, // Dark Grey text
                '&:hover': {
                  backgroundColor: theme.palette.secondary.light, // Lighter Yellow
                  borderColor: theme.palette.secondary.dark // Yellow dark variant
                }
              }
            }
          }
        },
        ul: {
          gap: 4
        }
      }
    }
  };
}
