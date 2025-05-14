// ==============================|| OVERRIDES - PAGINATION ||============================== //

export default function Pagination(theme) {
  return {
    MuiPagination: {
      defaultProps: {
        shape: 'rounded',
        variant: 'outlined',
        color: 'primary'
      },
      styleOverrides: {
        root: {
          '& .MuiPaginationItem-root': {
            fontWeight: 500,
            transition: theme.transitions.create(['color', 'background-color'], {
              duration: theme.transitions.duration.shorter
            }),
            '&.Mui-selected': {
              backgroundColor: theme.palette.primary.main,
              color: theme.palette.primary.contrastText,
              '&:hover': {
                backgroundColor: theme.palette.primary.dark
              }
            },
            '&.MuiPaginationItem-outlined': {
              borderColor: theme.palette.mode === 'dark' ? theme.palette.grey[800] : theme.palette.grey[300],
              '&:hover': {
                backgroundColor: theme.palette.action.hover,
                borderColor: theme.palette.primary.main
              },
              '&.Mui-selected': {
                backgroundColor: theme.palette.primary.lighter,
                borderColor: theme.palette.primary.main,
                color: theme.palette.primary.main,
                '&:hover': {
                  backgroundColor: theme.palette.primary.lighter,
                  borderColor: theme.palette.primary.dark
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
