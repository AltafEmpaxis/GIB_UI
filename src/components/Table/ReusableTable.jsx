import { memo } from 'react';
import { alpha, darken, lighten } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table';
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import { motion } from 'framer-motion';

import SimpleBar from 'components/@extended/SimpleBar';

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
  const baseBackgroundColor = isDark
    ? alpha(theme.palette.background.default, 0.85)
    : alpha(theme.palette.background.paper, 0.98);

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
    positionToolbarAlertBanner: 'bottom',
    positionPagination: 'bottom',

    // Enable state persistence
    enablePersistentState: false,

    // Styling Props
    muiTablePaperProps: {
      elevation: 0,
      sx: {
        overflow: 'hidden',
        // borderRadius: theme.shape.borderRadius * .5,
        border: `1px solid ${alpha(theme.palette.divider, isDark ? 0.28 : 0.12)}`,
        backgroundColor: isDark ? alpha(theme.palette.background.paper, 0.98) : theme.palette.background.paper
      }
    },
    muiTableContainerProps: {
      component: SimpleBar,
      sx: {
        maxHeight: '600px',
        '&::-webkit-scrollbar': {
          display: 'none'
        }
      }
    },
    muiTableBodyProps: {
      sx: {
        '& tr:nth-of-type(odd):not([data-selected="true"]):not([data-pinned="true"]) > td': {
          backgroundColor: darken(baseBackgroundColor, isDark ? 0.1 : 0.02)
        },
        '& tr:nth-of-type(odd):not([data-selected="true"]):not([data-pinned="true"]):hover > td': {
          backgroundColor: darken(baseBackgroundColor, isDark ? 0.15 : 0.05)
        },
        '& tr:nth-of-type(even):not([data-selected="true"]):not([data-pinned="true"]) > td': {
          backgroundColor: lighten(baseBackgroundColor, isDark ? 0.05 : 0.02)
        },
        '& tr:nth-of-type(even):not([data-selected="true"]):not([data-pinned="true"]):hover > td': {
          backgroundColor: darken(baseBackgroundColor, isDark ? 0.15 : 0.05)
        }
      }
    },
    muiTableHeadProps: {
      sx: {
        '& .MuiTableCell-head': {
          backgroundColor: isDark ? alpha(theme.palette.grey[800], 0.6) : alpha(theme.palette.primary.lighter, 0.35),
          fontWeight: 600,
          fontSize: '0.875rem',
          color: isDark ? theme.palette.grey[100] : theme.palette.text.primary
        }
      }
    },
    muiTableBodyCellProps: {
      sx: {
        fontSize: '0.875rem',
        borderBottom: `1px solid ${alpha(theme.palette.divider, isDark ? 0.28 : 0.12)}`,
        backgroundColor: isDark ? alpha(theme.palette.grey[900], 0.6) : alpha(theme.palette.grey[50], 0.6)
      }
    },
    muiSearchTextFieldProps: {
      size: 'small',
      variant: 'outlined',
      sx: {
        minWidth: '250px'
      }
    },
    muiFilterTextFieldProps: {
      size: 'small',
      variant: 'outlined',
      sx: {
        minWidth: '150px'
      }
    },
    muiPaginationProps: {
      color: 'primary',
      rowsPerPageOptions: [10, 25, 50, 100],
      shape: 'rounded',
      variant: 'outlined',
      sx: {
        mt: 1,
        mb: 0.5
      }
    },
    displayColumnDefOptions: {
      'mrt-row-actions': {
        size: 150,
        grow: false,
        muiTableHeadCellProps: {
          align: 'center'
        },
        muiTableBodyCellProps: {
          align: 'center'
        }
      }
    },

    // Theme Customization
    mrtTheme: {
      baseBackgroundColor,
      draggingBorderColor: theme.palette.primary.main,
      matchHighlightColor: isDark ? darken(theme.palette.warning.dark, 0.3) : lighten(theme.palette.warning.light, 0.5),
      menuBackgroundColor: lighten(baseBackgroundColor, isDark ? 0.05 : 0.02),
      pinnedRowBackgroundColor: alpha(theme.palette.primary.main, isDark ? 0.15 : 0.08),
      selectedRowBackgroundColor: alpha(theme.palette.primary.main, isDark ? 0.25 : 0.15)
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

    // Additional toolbar customization
    muiTopToolbarProps: {
      sx: {
        display: 'flex',
        gap: '0.5rem',
        p: '0.75rem',
        width: '100%',
        backgroundColor: isDark
          ? alpha(theme.palette.background.paper, 0.98)
          : alpha(theme.palette.background.paper, 0.98),
        borderBottom: `1px solid ${alpha(theme.palette.divider, isDark ? 0.28 : 0.12)}`
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
