import React from 'react';

import {
  Add as AddIcon,
  Refresh as RefreshIcon,
  Print as PrintIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
  RestartAlt as ResetIcon,
  ViewColumn as ColumnIcon,
  FilterList as FilterIcon,
  Sort as SortIcon,
  Download as DownloadIcon
} from '@mui/icons-material';
import { Button, IconButton, Tooltip, Stack } from '@mui/material';

// Essential table actions
export const tableActions = (table) => (
  <>
    <Tooltip title="Reset All">
      <IconButton
        color="secondary"
        onClick={() => {
          table.reset();
          table.setColumnFilters([]);
          table.setGlobalFilter('');
          table.setSorting([]);
          table.setColumnVisibility({});
          table.setColumnOrder([]);
          table.setPagination({
            pageIndex: 0,
            pageSize: 10
          });
          if (table.getIsSomeRowsSelected()) {
            table.resetRowSelection();
          }
          if (table.getState().columnPinning) {
            table.setColumnPinning({});
          }
        }}
      >
        <ResetIcon />
      </IconButton>
    </Tooltip>

    <Tooltip title="Refresh">
      <IconButton onClick={() => table.resetRowSelection()}>
        <RefreshIcon />
      </IconButton>
    </Tooltip>

    <Tooltip title="Column Settings">
      <IconButton onClick={() => table.setShowColumnFilters((prev) => !prev)}>
        <ColumnIcon />
      </IconButton>
    </Tooltip>

    <Tooltip title="Filter">
      <IconButton onClick={() => table.setShowFilters((prev) => !prev)}>
        <FilterIcon />
      </IconButton>
    </Tooltip>

    <Tooltip title="Sort">
      <IconButton onClick={() => table.setSorting([])}>
        <SortIcon />
      </IconButton>
    </Tooltip>
  </>
);

// CRUD operations toolbar
export const crudActions = (table) => {
  const hasSelection = table.getIsSomeRowsSelected();
  const hasSingleSelection = hasSelection && table.getSelectedRowModel().rows.length === 1;

  return (
    <Stack direction="row" spacing={1}>
      <Tooltip title="Add New">
        <IconButton color="primary" onClick={() => console.log('Add')}>
          <AddIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Edit">
        <span>
          <IconButton color="info" onClick={() => console.log('Edit')} disabled={!hasSingleSelection}>
            <EditIcon />
          </IconButton>
        </span>
      </Tooltip>
      <Tooltip title="Delete">
        <span>
          <IconButton color="error" onClick={() => console.log('Delete')} disabled={!hasSelection}>
            <DeleteIcon />
          </IconButton>
        </span>
      </Tooltip>

      <Tooltip title="Print">
        <IconButton onClick={() => window.print()}>
          <PrintIcon />
        </IconButton>
      </Tooltip>
    </Stack>
  );
};
