import { Icon } from '@iconify/react';
import { alpha, lighten } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { motion } from 'framer-motion';
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table';
import PropTypes from 'prop-types';
import { memo } from 'react';

// Animation variants for icons
const iconAnimation = {
  initial: {
    scale: 1,
    rotate: 0,
    y: 0
  },
  hover: {
    scale: 1.1,
    rotate: [0, -3, 3, 0],
    y: -1,
    filter: 'brightness(1.1)',
    transition: {
      rotate: {
        duration: 0.4,
        ease: 'easeInOut',
        repeat: Infinity,
        repeatType: 'reverse'
      },
      scale: {
        type: 'spring',
        stiffness: 300,
        damping: 15
      },
      y: {
        type: 'spring',
        stiffness: 250,
        damping: 15
      }
    }
  },
  tap: {
    scale: 0.95,
    rotate: 0,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 15
    }
  }
};

// Wrapper component for animated icons
const AnimatedIcon = ({ icon, width, height, ...props }) => (
  <motion.div
    initial="initial"
    whileHover="hover"
    whileTap="tap"
    variants={iconAnimation}
    style={{
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '4px',
      borderRadius: '6px',
      background: 'transparent',
      transition: 'background 0.2s ease'
    }}
  >
    <Icon icon={icon} width={width} height={height} {...props} />
  </motion.div>
);

AnimatedIcon.propTypes = {
  icon: PropTypes.string.isRequired,
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
};

const tableIcons = {
  // ArrowDownwardIcon: (props) => (
  //   <Icon icon="solar:sort-from-bottom-to-top-bold-duotone" width="25" height="25" {...props} />
  // ),
  ClearAllIcon: () => <AnimatedIcon icon="solar:restart-bold-duotone" width="22" height="22" />,
  DensityLargeIcon: () => <AnimatedIcon icon="oui:table-density-expanded" width="22" height="22" />,
  DensityMediumIcon: () => <AnimatedIcon icon="oui:table-density-normal" width="22" height="22" />,
  DensitySmallIcon: () => <AnimatedIcon icon="oui:table-density-compact" width="22" height="22" />,
  DragHandleIcon: () => <AnimatedIcon icon="hugeicons:drag-02" width="22" height="22" style={{ cursor: 'grab' }} />,
  FilterListIcon: (props) => <AnimatedIcon icon="solar:filter-bold-duotone" width="22" height="22" {...props} />,
  FilterListOffIcon: () => <AnimatedIcon icon="line-md:filter-off-twotone" width="22" height="22" />,
  FullscreenExitIcon: () => <AnimatedIcon icon="solar:minimize-square-bold-duotone" width="22" height="22" />,
  FullscreenIcon: () => <AnimatedIcon icon="solar:maximize-square-bold-duotone" width="22" height="22" />,
  SearchIcon: (props) => <AnimatedIcon icon="solar:magnifer-zoom-in-bold-duotone" width="22" height="22" {...props} />,
  SearchOffIcon: () => <AnimatedIcon icon="solar:magnifer-zoom-out-bold-duotone" width="22" height="22" />,
  ViewColumnIcon: () => <AnimatedIcon icon="solar:widget-5-bold-duotone" width="22" height="22" />,
  // MoreVertIcon: () => <Icon icon="solar:menu-dots-vertical-bold-duotone" width="22" height="22" />,
  MoreHorizIcon: () => <AnimatedIcon icon="solar:menu-dots-bold-duotone" width="22" height="22" />,
  // SortIcon: (props) => <Icon icon="solar:sort-from-top-to-bottom-bold-duotone" width="22" height="22" {...props} />,
  PushPinIcon: (props) => <AnimatedIcon icon="solar:pin-list-bold-duotone" width="22" height="22" {...props} />,
  VisibilityOffIcon: () => <AnimatedIcon icon="solar:eye-closed-bold-duotone" width="22" height="22" />,
  VisibilityIcon: () => <AnimatedIcon icon="solar:eye-bold-duotone" width="22" height="22" />,
  CheckIcon: () => <AnimatedIcon icon="solar:check-circle-bold-duotone" width="22" height="22" />,
  CloseIcon: () => <AnimatedIcon icon="solar:close-circle-bold-duotone" width="22" height="22" />,
  EditIcon: () => <AnimatedIcon icon="solar:pen-new-square-bold-duotone" width="22" height="22" />,
  DeleteIcon: () => <AnimatedIcon icon="solar:trash-bin-minimalistic-bold-duotone" width="22" height="22" />
};

const ReusableTable = ({ columns, data, initialState = {}, tableProps = {} }) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  // GIB brand-aligned background colors
  const baseBackgroundColor = isDark ? alpha(theme.palette.background.paper, 0.95) : theme.palette.background.paper;

  const alternateRowColor = isDark ? alpha(theme.palette.grey[800], 0.3) : alpha(theme.palette.grey[200], 0.4); // Using GIB Light Grey

  const hoverRowColor = isDark
    ? alpha(theme.palette.secondary.main, 0.15) // GIB Yellow for hover
    : alpha(theme.palette.secondary.main, 0.08);

  const selectedRowColor = isDark
    ? alpha(theme.palette.secondary.main, 0.25) // GIB Yellow for selection
    : alpha(theme.palette.secondary.main, 0.15);

  const headerBackgroundColor = isDark
    ? alpha(theme.palette.primary.dark, 0.8) // Dark Grey variant
    : alpha(theme.palette.grey[200], 0.6); // Light Grey for headers

  const defaultProps = {
    // Core Features
    enableColumnResizing: true,
    enableColumnDragging: true,
    enableColumnOrdering: true,
    enablePinning: true,
    enablePagination: true,
    enableFilters: true,
    enableGlobalFilter: true,
    enableSorting: true,
    enableDensityToggle: true,
    enableFullScreenToggle: true,
    enableColumnFilters: true,
    enableHiding: true,
    enableStickyHeader: true,
    enableStickyFooter: true,
    enableRowPinning: true,
    enableColumnPinning: true,
    rowPinningDisplayMode: 'select-sticky',
    columnPinningDisplayMode: 'select-sticky',
    enableColumnFilterModes: true,
    positionActionsColumn: 'last',

    // Toolbar Options
    enableToolbarInternalActions: true,
    enableTopToolbar: true,

    // Display Options
    enableRowNumbers: true,
    rowNumberDisplayMode: 'static',
    paginationDisplayMode: 'pages',
    positionToolbarAlertBanner: 'top',
    positionPagination: 'bottom',

    // Enable state persistence
    enablePersistentState: false,

    // Styling Props - GIB brand aligned
    muiTablePaperProps: {
      elevation: 0,
      sx: {
        overflow: 'hidden',
        // borderRadius: theme.shape.borderRadius,
        border: `1px solid ${isDark ? alpha(theme.palette.divider) : alpha(theme.palette.grey[200], 0.5)}`,
        backgroundColor: baseBackgroundColor,
        boxShadow: isDark ? theme.customShadows.card : theme.shadows[1]
      }
    },
    muiTableContainerProps: {
      // component: SimpleBar,
      sx: {
        maxHeight: '600px',
        backgroundColor: baseBackgroundColor
        // '&::-webkit-scrollbar': {
        //   width: 8,
        //   height: 8,
        //   display: 'none'
        // }
        // '&::-webkit-scrollbar-track': {
        //   background: isDark ? alpha(theme.palette.grey[900], 0.4) : alpha(theme.palette.grey[200], 0.8)
        // },
        // '&::-webkit-scrollbar-thumb': {
        //   backgroundColor: isDark ? alpha(theme.palette.grey[700], 0.9) : alpha(theme.palette.grey[400], 0.9),
        //   borderRadius: 4,
        //   '&:hover': {
        //     backgroundColor: alpha(theme.palette.secondary.main, isDark ? 0.8 : 0.7) // GIB Yellow on hover
        //   }
        // }
      }
    },
    muiTableBodyProps: {
      sx: {
        // Alternating row colors using GIB brand colors
        '& tr:nth-of-type(odd):not([data-selected="true"]):not([data-pinned="true"]) > td': {
          backgroundColor: baseBackgroundColor
        },
        '& tr:nth-of-type(even):not([data-selected="true"]):not([data-pinned="true"]) > td': {
          backgroundColor: alternateRowColor
        },
        // Hover states with GIB Yellow
        '& tr:not([data-selected="true"]):not([data-pinned="true"]):hover > td': {
          backgroundColor: hoverRowColor,
          transition: theme.transitions.create(['background-color'], {
            duration: theme.transitions.duration.shorter
          })
        },
        // Selected rows with GIB Yellow
        '& tr[data-selected="true"] > td': {
          backgroundColor: selectedRowColor
          // borderColor: isDark ? alpha(theme.palette.secondary.main, 0.5) : alpha(theme.palette.secondary.main, 0.3)
        },
        // Pinned rows styling
        '& tr[data-pinned="true"] > td': {
          backgroundColor: isDark ? alpha(theme.palette.primary.main, 0.2) : alpha(theme.palette.primary.lighter, 0.3)
          // borderBottom: `2px solid ${theme.palette.secondary.main}`
        }
      }
    },
    muiTableHeadProps: {
      sx: {
        '& .MuiTableCell-head': {
          backgroundColor: headerBackgroundColor,
          fontWeight: theme.typography.subtitle1.fontWeight, // 500 per GIB guidelines
          fontSize: theme.typography.subtitle1.fontSize, // 14px per GIB guidelines
          color: isDark ? theme.palette.common.white : theme.palette.primary.main, // Dark Grey text
          // borderBottom: `2px solid ${isDark ? alpha(theme.palette.secondary.main, 0.3) : theme.palette.grey[300]}`,
          textTransform: 'uppercase',
          letterSpacing: '0.5px',
          padding: theme.spacing(1.5, 2),
          '&:hover': {
            backgroundColor: isDark
              ? alpha(theme.palette.secondary.main, 0.1)
              : alpha(theme.palette.secondary.main, 0.05)
          }
        }
      }
    },
    muiTableFooterRowProps: {
      sx: {
        backgroundColor: headerBackgroundColor,
        borderTop: `1px solid ${isDark ? alpha(theme.palette.primary.dark, 0.8) : alpha(theme.palette.grey[200], 0.6)}`,
        '& td': {
          fontWeight: 'bold',
          borderTop: `1px solid ${isDark ? alpha(theme.palette.primary.dark, 0.8) : alpha(theme.palette.grey[200], 0.6)}`,
          py: 2
        }
      }
    },
    muiTableBodyCellProps: {
      sx: {
        fontSize: theme.typography.body2.fontSize, // 14px per GIB guidelines
        fontWeight: theme.typography.body2.fontWeight, // 500 per GIB guidelines
        color: isDark ? theme.palette.common.white : theme.palette.text.primary,
        // borderBottom: `1px solid ${isDark ? alpha(theme.palette.divider, 0.25) : theme.palette.grey[200]}`,
        padding: theme.spacing(1.25, 2),
        transition: theme.transitions.create(['background-color', 'color'], {
          duration: theme.transitions.duration.shorter
        })
      }
    },
    muiSearchTextFieldProps: {
      size: 'small',
      variant: 'outlined',
      sx: {
        minWidth: '250px',
        '& .MuiOutlinedInput-root': {
          // backgroundColor: isDark ? alpha(theme.palette.background.paper, 0.8) : theme.palette.background.paper,
          // borderRadius: theme.shape.borderRadius,
          // '&:hover .MuiOutlinedInput-notchedOutline': {
          //   borderColor: theme.palette.secondary.main // GIB Yellow on hover
          // }
          // '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
          //   borderColor: theme.palette.secondary.main,
          //   borderWidth: 2
          // }
        },
        '& .MuiInputLabel-root.Mui-focused': {
          // color: theme.palette.secondary.main
        }
      }
    },
    muiFilterTextFieldProps: {
      size: 'small',
      variant: 'outlined',
      sx: {
        minWidth: '150px',
        '& .MuiOutlinedInput-root': {
          // backgroundColor: isDark ? alpha(theme.palette.background.paper, 0.8) : theme.palette.background.paper,
          '&:hover .MuiOutlinedInput-notchedOutline': {
            // borderColor: theme.palette.secondary.main
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            // borderColor: theme.palette.secondary.main,
            // borderWidth: 2
          }
        },
        '& .MuiInputLabel-root.Mui-focused': {
          // color: theme.palette.secondary.main
        }
      }
    },
    muiPaginationProps: {
      color: 'secondary', // Use GIB Yellow for pagination
      rowsPerPageOptions: [10, 25, 50, 100],
      shape: 'rounded',
      variant: 'outlined',
      sx: {
        mt: 1,
        mb: 0.5
        // '& .MuiPaginationItem-root': {
        //   borderColor: isDark ? alpha(theme.palette.grey[600], 0.5) : theme.palette.grey[300],
        //   color: isDark ? theme.palette.common.white : theme.palette.text.primary,
        //   '&:hover': {
        //     backgroundColor: alpha(theme.palette.secondary.main, 0.1),
        //     borderColor: theme.palette.secondary.main
        //   },
        //   '&.Mui-selected': {
        //     backgroundColor: theme.palette.secondary.main,
        //     color: theme.palette.secondary.contrastText,
        //     borderColor: theme.palette.secondary.main,
        //     '&:hover': {
        //       backgroundColor: theme.palette.secondary.dark
        //     }
        //   }
        // }
      }
    },
    displayColumnDefOptions: {
      'mrt-row-actions': {
        size: 150,
        grow: false,
        muiTableHeadCellProps: {
          align: 'center',
          sx: {
            backgroundColor: headerBackgroundColor,
            borderBottom: `2px solid ${isDark ? alpha(theme.palette.secondary.main, 0.3) : theme.palette.grey[300]}`
          }
        },
        muiTableBodyCellProps: {
          align: 'center'
          // sx: {
          //   '& .MuiIconButton-root': {
          //     color: isDark ? theme.palette.common.white : theme.palette.text.primary,
          //     '&:hover': {
          //       backgroundColor: alpha(theme.palette.secondary.main, 0.1),
          //       color: theme.palette.secondary.main
          //     }
          //   }
          // }
        }
      },
      'mrt-row-numbers': {
        muiTableHeadCellProps: {
          sx: {
            backgroundColor: headerBackgroundColor
          }
        },
        muiTableBodyCellProps: {
          sx: {
            color: isDark ? theme.palette.grey[400] : theme.palette.text.secondary,
            fontWeight: theme.typography.caption.fontWeight
          }
        }
      }
    },

    // Theme Customization - GIB brand aligned
    mrtTheme: {
      baseBackgroundColor,
      draggingBorderColor: theme.palette.secondary.main, // GIB Yellow for dragging
      matchHighlightColor: isDark ? alpha(theme.palette.secondary.main, 0.4) : alpha(theme.palette.secondary.main, 0.2), // GIB Yellow for search highlights
      menuBackgroundColor: isDark ? alpha(theme.palette.background.paper, 0.95) : theme.palette.background.paper,
      pinnedRowBackgroundColor: isDark
        ? alpha(theme.palette.primary.main, 0.2)
        : alpha(theme.palette.primary.lighter, 0.3),
      selectedRowBackgroundColor: selectedRowColor
    },

    // Initial State with proper defaults
    initialState: {
      density: 'compact',
      pagination: { pageSize: 25, pageIndex: 0 },
      showColumnFilters: false,
      showGlobalFilter: true,
      showFilters: false,
      columnFilters: [],
      globalFilter: '',
      sorting: [],
      columnVisibility: {},
      columnOrder: [],
      columnPinning: {},
      ...initialState
    },

    // Icons configuration
    icons: tableIcons,

    // Additional toolbar customization - GIB brand aligned
    muiTopToolbarProps: {
      sx: {
        // display: 'flex',
        // alignItems: 'center',
        // justifyContent: 'center',
        // gap: theme.spacing(1),
        // p: theme.spacing(1.5),
        // width: '100%',
        backgroundColor: isDark ? alpha(theme.palette.background.paper, 0.95) : lighten(theme.palette.grey[200], 0.5), // Subtle GIB Light Grey background
        borderBottom: `2px solid ${isDark ? alpha(theme.palette.secondary.main, 0.2) : theme.palette.grey[300]}`
        // '& .MuiIconButton-root': {
        //   color: isDark ? theme.palette.common.white : theme.palette.text.primary,
        //   '&:hover': {
        //     backgroundColor: alpha(theme.palette.secondary.main, 0.1),
        //     color: theme.palette.secondary.main
        //   }
        // }
        // '& .MuiButton-root': {
        //   borderRadius: theme.shape.borderRadius,
        //   textTransform: 'none',
        //   fontWeight: theme.typography.button.fontWeight,
        //   '&.MuiButton-contained': {
        //     backgroundColor: theme.palette.secondary.main,
        //     color: theme.palette.secondary.contrastText,
        //     '&:hover': {
        //       backgroundColor: theme.palette.secondary.dark
        //     }
        //   },
        //   '&.MuiButton-outlined': {
        //     borderColor: isDark ? theme.palette.grey[600] : theme.palette.grey[400],
        //     color: isDark ? theme.palette.common.white : theme.palette.text.primary,
        //     '&:hover': {
        //       borderColor: theme.palette.secondary.main,
        //       backgroundColor: alpha(theme.palette.secondary.main, 0.1)
        //     }
        //   }
        // }
      }
    }
  };

  const table = useMaterialReactTable({
    columns,
    data,
    ...defaultProps,
    ...tableProps
  });

  return <MaterialReactTable table={table} />;
};

ReusableTable.propTypes = {
  columns: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  initialState: PropTypes.object,
  tableProps: PropTypes.object
};

// Export a memoized version of the component directly
export default memo(ReusableTable);
