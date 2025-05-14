// ==============================|| OVERRIDES - TOOLTIP ||============================== //

export default function Tooltip(theme) {
  const isLight = theme.palette.mode === 'light';

  return {
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: isLight ? theme.palette.grey[900] : theme.palette.background.paper,
          color: isLight ? theme.palette.common.white : theme.palette.text.primary,
          fontSize: '0.75rem',
          padding: '8px 12px',
          borderRadius: theme.shape.borderRadius || 4,
          border: `1px solid ${isLight ? 'transparent' : theme.palette.divider}`,
          '& .MuiTypography-root': {
            color: isLight ? theme.palette.common.white : theme.palette.text.primary
          },
          '& .MuiTypography-caption': {
            color: isLight ? theme.palette.grey[200] : theme.palette.text.secondary
          }
        },
        arrow: {
          color: isLight ? theme.palette.grey[900] : theme.palette.background.paper,
          '&:before': {
            border: isLight ? 'none' : `1px solid ${theme.palette.divider}`
          }
        }
      }
    }
  };
}
