// ==============================|| OVERRIDES - SWITCH ||============================== //

export default function Switch(theme) {
  return {
    MuiSwitch: {
      defaultProps: {
        color: 'primary'
      },
      styleOverrides: {
        root: {
          width: 42,
          height: 26,
          padding: 0,
          margin: theme.spacing(1),
          '& .MuiSwitch-switchBase': {
            padding: 0,
            margin: 2,
            transitionDuration: '300ms',
            '&.Mui-checked': {
              transform: 'translateX(16px)',
              color: theme.palette.common.white,
              '& + .MuiSwitch-track': {
                backgroundColor: theme.palette.primary.main,
                opacity: 1,
                border: 0
              }
            },
            '&.Mui-disabled': {
              '& + .MuiSwitch-track': {
                opacity: theme.palette.mode === 'light' ? 0.7 : 0.3
              },
              '& .MuiSwitch-thumb': {
                backgroundColor: theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[600]
              }
            },
            '&.Mui-focusVisible .MuiSwitch-thumb': {
              color: theme.palette.primary.main,
              border: `6px solid ${theme.palette.common.white}`
            }
          },
          '& .MuiSwitch-thumb': {
            boxSizing: 'border-box',
            width: 22,
            height: 22,
            backgroundColor: theme.palette.mode === 'light' ? theme.palette.common.white : theme.palette.grey[300],
            boxShadow: theme.customShadows.z1,
            transition: theme.transitions.create(['transform', 'background-color'], {
              duration: 200
            })
          },
          '& .MuiSwitch-track': {
            borderRadius: 13,
            backgroundColor: theme.palette.mode === 'light' ? theme.palette.grey[300] : theme.palette.grey[700],
            opacity: 1,
            transition: theme.transitions.create(['background-color'], {
              duration: 500
            }),
            '&:before, &:after': {
              content: '""',
              position: 'absolute',
              top: '50%',
              transform: 'translateY(-50%)',
              width: 16,
              height: 16
            },
            '&:before': {
              backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
                theme.palette.grey[500]
              )}" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"/></svg>')`,
              left: 4
            },
            '&:after': {
              backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
                theme.palette.grey[500]
              )}" d="M19,13H5V11H19V13Z" /></svg>')`,
              right: 4
            }
          }
        },
        sizeMedium: {
          width: 42,
          height: 26,
          '& .MuiSwitch-thumb': {
            width: 22,
            height: 22
          }
        },
        sizeSmall: {
          width: 34,
          height: 22,
          '& .MuiSwitch-thumb': {
            width: 18,
            height: 18
          },
          '& .MuiSwitch-switchBase': {
            '&.Mui-checked': {
              transform: 'translateX(12px)'
            }
          },
          '& .MuiSwitch-track': {
            '&:before': {
              width: 14,
              height: 14,
              left: 3
            },
            '&:after': {
              width: 14,
              height: 14,
              right: 3
            }
          }
        },
        colorPrimary: {
          '& .MuiSwitch-thumb': {
            '&:hover': {
              backgroundColor: theme.palette.primary.lighter
            }
          },
          '& .MuiSwitch-switchBase': {
            '&.Mui-checked': {
              '& + .MuiSwitch-track': {
                backgroundColor: theme.palette.primary.main
              },
              '& .MuiSwitch-thumb': {
                backgroundColor: theme.palette.common.white
              }
            }
          }
        },
        colorSecondary: {
          '& .MuiSwitch-switchBase': {
            '&.Mui-checked': {
              '& + .MuiSwitch-track': {
                backgroundColor: theme.palette.secondary.main
              }
            }
          }
        }
      }
    }
  };
}
