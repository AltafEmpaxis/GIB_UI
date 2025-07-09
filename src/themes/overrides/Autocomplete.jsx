// ==============================|| OVERRIDES - AUTOCOMPLETE ||============================== //

export default function Autocomplete(theme) {
  return {
    MuiAutocomplete: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            padding: '3px 9px'
          }
        },
        paper: {
          boxShadow: theme.shadows[4],
          borderRadius: 8,
          border: `1px solid ${theme.palette.divider}`
        },
        option: {
          padding: '8px 12px',
          '&[aria-selected="true"]': {
            backgroundColor: theme.palette.action.selected
          },
          '&[data-focus="true"]': {
            backgroundColor: theme.palette.action.hover
          }
        },
        noOptions: {
          fontSize: '0.875rem',
          padding: '10px 12px',
          color: theme.palette.text.secondary
        },
        listbox: {
          padding: '8px',
          '& .MuiAutocomplete-option': {
            minHeight: 36,
            fontSize: '0.875rem',
            padding: '8px 12px',
            borderRadius: 4
          }
        },
        tag: {
          margin: 3
        },
        popper: {
          borderRadius: 8
        }
      }
    }
  };
}
