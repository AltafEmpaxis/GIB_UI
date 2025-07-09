import { alpha } from '@mui/material/styles';

export default function Dialog(theme) {
  return {
    MuiDialog: {
      defaultProps: {
        PaperProps: {
          elevation: 0
        },
        slotProps: {
          backdrop: {
            timeout: 500
          }
        }
      },
      styleOverrides: {
        paper: {
          backgroundColor: theme.palette.background.paper,
          backgroundImage: 'none',
          borderRadius: Number(theme.shape.borderRadius) * 2,
          border: `1px solid ${alpha(theme.palette.divider, 0.12)}`,
          boxShadow: theme.shadows[24],
          '&.MuiPaper-rounded': {
            borderRadius: Number(theme.shape.borderRadius) * 2
          },
          '&.MuiDialog-paperFullScreen': {
            borderRadius: 0,
            border: 'none'
          },
          '@media (max-width: 600px)': {
            margin: theme.spacing(2)
          },
          '@media (max-width: 663.95px)': {
            '&.MuiDialog-paperWidthSm.MuiDialog-paperScrollBody': {
              maxWidth: '100%'
            }
          },
          margin: theme.spacing(2),
          maxHeight: `calc(100% - ${theme.spacing(4)})`,
          [`@media (max-width: ${theme.breakpoints.values.sm}px)`]: {
            margin: theme.spacing(2),
            maxWidth: `calc(100% - ${theme.spacing(4)})`,
            minWidth: `calc(100% - ${theme.spacing(4)})`
          }
        },
        paperFullScreen: {
          margin: 0,
          maxHeight: '100%',
          maxWidth: '100%',
          borderRadius: 0
        },
        paperFullWidth: {
          width: '100%'
        },
        paperScrollPaper: {
          maxHeight: `calc(100% - ${theme.spacing(4)})`,
          '& > .MuiDialogTitle-root + .MuiDialogContent-root': {
            paddingTop: 0
          }
        },
        container: {
          backdropFilter: 'blur(8px)'
        }
      }
    },
    MuiDialogTitle: {
      styleOverrides: {
        root: {
          padding: theme.spacing(3),
          paddingBottom: theme.spacing(1),
          fontSize: theme.typography.h5.fontSize,
          fontWeight: theme.typography.h5.fontWeight,
          color: theme.palette.text.primary,
          [`@media (max-width: ${theme.breakpoints.values.sm}px)`]: {
            padding: theme.spacing(2)
          }
        }
      }
    },
    MuiDialogContent: {
      styleOverrides: {
        root: {
          padding: theme.spacing(3),
          '& + .MuiDialogContent-root': {
            paddingTop: 0
          },
          '& .MuiFormControl-root + .MuiFormControl-root': {
            marginTop: theme.spacing(2)
          },
          [`@media (max-width: ${theme.breakpoints.values.sm}px)`]: {
            padding: theme.spacing(2)
          }
        },
        dividers: {
          borderTop: `1px dashed ${alpha(theme.palette.divider, 0.12)}`,
          borderBottom: `1px dashed ${alpha(theme.palette.divider, 0.12)}`,
          padding: theme.spacing(3)
        }
      }
    },
    MuiDialogActions: {
      styleOverrides: {
        root: {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          gap: theme.spacing(1),
          padding: theme.spacing(2, 3),
          '& .MuiButton-root': {
            margin: 0
          },
          [`@media (max-width: ${theme.breakpoints.values.sm}px)`]: {
            padding: theme.spacing(1.5, 2),
            gap: theme.spacing(0.75)
          }
        }
      }
    }
  };
}
