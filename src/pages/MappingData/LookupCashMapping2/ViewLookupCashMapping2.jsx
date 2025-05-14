import { useState } from 'react';
import {
  Box,
  Typography,
  IconButton,
  Stack,
  Tooltip,
  Button,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import { MRT_EditActionButtons } from 'material-react-table';
import Swal from 'sweetalert2';
import ExportData from 'components/Export/ExportData';
import axios, { endpoints } from 'utils/axios';
import { ViewMappingColumns } from 'components/Table/Columns/Columns';
import { Icon } from '@iconify/react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import ReusableTable from 'components/Table/ReusableTable';
import { useTheme } from '@mui/material/styles';

const validateMapping = (values) => {
  const errors = {};
  if (!values.original) {
    errors.original = 'Original value is required';
  }
  if (!values.alternative) {
    errors.alternative = 'Alternative value is required';
  }
  return errors;
};

export default function ViewLookupCashMapping2() {
  const theme = useTheme();
  const columns = ViewMappingColumns();
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
    pageCount: 0,
    totalRecords: 0
  });
  const [columnFilters, setColumnFilters] = useState([]);
  const [globalFilter, setGlobalFilter] = useState('');
  const [sorting, setSorting] = useState([]);
  const queryClient = useQueryClient();

  const { data, isLoading, error, isError, isPending } = useQuery({
    queryKey: ['Page>MappingData>Tab>LookupCashMapping2', pagination.pageIndex, pagination.pageSize],
    queryFn: async () => {
      try {
        const response = await axios.get(endpoints.getLookupCashMapping2, {
          params: {
            pageNumber: pagination.pageIndex + 1,
            pageSize: pagination.pageSize
          }
        });
        return response.data;
      } catch (error) {
        console.error('Error fetching View Lookup CashMapping2:', error);
        throw error;
      }
    },
    keepPreviousData: true
  });

  const tableData = data?.data ?? [];
  const rowCount = data?.totalRecords ?? 0;
  const pageCount = data?.totalPages ?? 0;

  // Create mutation
  const { mutateAsync: createMapping } = useMutation({
    mutationFn: async (values) => {
      const response = await axios.post(endpoints.createLookupCashMapping2, values);
      return response.data;
    },
    onMutate: async () => {
      await queryClient.cancelQueries(['Page>MappingData>Tab>LookupCashMapping2']);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['Page>MappingData>Tab>LookupCashMapping2']);
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Mapping created successfully',
        showConfirmButton: false,
        timer: 1500
      });
    },
    onError: (error) => {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error?.response?.data?.message || error?.message || error?.response || error || 'Failed to create mapping'
      });
    }
  });

  // Update mutation
  const { mutateAsync: updateMapping } = useMutation({
    mutationFn: async (values) => {
      const response = await axios.put(`${endpoints.updateLookupCashMapping2}/${values.id}`, values);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['Page>MappingData>Tab>LookupCashMapping2']);
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Mapping updated successfully',
        showConfirmButton: false,
        timer: 1500
      });
    },
    onError: (error) => {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error?.response?.data?.message || error?.message || error?.response || error || 'Failed to update mapping'
      });
    }
  });

  // Delete mutation
  const { mutateAsync: deleteMapping } = useMutation({
    mutationFn: async (id) => {
      await axios.delete(`${endpoints.deleteLookupCashMapping2}/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['Page>MappingData>Tab>LookupCashMapping2']);
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Mapping deleted successfully',
        showConfirmButton: false,
        timer: 1500
      });
    },
    onError: (error) => {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error?.response?.data?.message || error?.message || error?.response || error || 'Failed to delete mapping'
      });
    }
  });

  const handleCreateMapping = async ({ values, table }) => {
    const errors = validateMapping(values);
    if (Object.keys(errors).length > 0) {
      Swal.fire({
        icon: 'error',
        title: 'Validation Error',
        text: Object.values(errors).join(', ')
      });
      return;
    }
    await createMapping(values);
    table.setCreatingRow(null);
  };

  const handleUpdateMapping = async ({ values, table }) => {
    const errors = validateMapping(values);
    if (Object.keys(errors).length > 0) {
      Swal.fire({
        icon: 'error',
        title: 'Validation Error',
        text: Object.values(errors).join(', ')
      });
      return;
    }
    await updateMapping(values);
    table.setEditingRow(null);
  };

  const handleDeleteMapping = async (row) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!'
    });

    if (result.isConfirmed) {
      await deleteMapping(row.original.id);
    }
  };

  const tableProps = {
    columns,
    data: tableData,
    enableEditing: true,
    createDisplayMode: 'modal',
    editDisplayMode: 'modal',
    positionActionsColumn: 'last',
    initialState: {
      density: 'compact',
      pagination: { pageSize: 10, pageIndex: 0 },
      showColumnFilters: true,
      showGlobalFilter: true,
      columnVisibility: { id: true }
    },
    getRowId: (row) => row.id,
    muiToolbarAlertBannerProps: isError
      ? {
          color: 'error',
          children: error?.response?.data?.message || error?.message || error || 'Failed to fetch data'
        }
      : undefined,
    renderCreateRowDialogContent: ({ table, row, internalEditComponents }) => {
      return (
        <>
          <DialogTitle variant="h5">Create New Mapping</DialogTitle>
          <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: '1rem', my: 2 }}>
            {internalEditComponents}
          </DialogContent>
          <DialogActions>
            <MRT_EditActionButtons variant="text" table={table} row={row} />
          </DialogActions>
        </>
      );
    },
    renderEditRowDialogContent: ({ table, row, internalEditComponents }) => (
      <>
        <DialogTitle variant="h5">Edit Mapping</DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {internalEditComponents}
        </DialogContent>
        <DialogActions>
          <MRT_EditActionButtons variant="text" table={table} row={row} />
        </DialogActions>
      </>
    ),
    renderRowActions: ({ row, table }) => (
      <Stack direction="row" spacing={1} alignItems="center" justifyContent="center">
        <Tooltip title="Edit Mapping" arrow>
          <IconButton color="primary" onClick={() => table.setEditingRow(row)}>
            <Icon icon="solar:pen-bold" style={{ color: theme.palette.primary.main }} />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete Mapping" arrow>
          <IconButton color="error" onClick={() => handleDeleteMapping(row)}>
            <Icon
              icon="solar:trash-bin-trash-bold"
              style={{
                color: theme.palette.error.main
              }}
            />
          </IconButton>
        </Tooltip>
      </Stack>
    ),
    renderTopToolbarCustomActions: ({ table }) => (
      <Box sx={{ display: 'flex', gap: 2, p: 1 }}>
        <ExportData
          data={tableData}
          columns={columns.filter((col) => !['actions', 'mrt-row-actions'].includes(col.id))}
          exportTypes={['csv', 'excel', 'pdf', 'txt', 'xml', 'json']}
          ExportFileName="View_LookupCashMapping2"
          isLoading={isLoading}
          variant="contained"
          color="primary"
          size="small"
          componentVariant="Menu"
          aria-label="Export Lookup Cash Mapping2"
        />
        <Button
          variant="contained"
          size="small"
          onClick={() => table.setCreatingRow(true)}
          startIcon={<Icon icon="solar:add-circle-bold" />}
        >
          Create New Mapping
        </Button>
      </Box>
    ),
    renderBottomToolbarCustomActions: () => {
      if (!rowCount) return null;

      const start = pagination.pageSize * pagination.pageIndex + 1;
      const end = Math.min(pagination.pageSize * (pagination.pageIndex + 1), rowCount);

      return (
        <Box px={2}>
          <Typography variant="body2" color="text.secondary">
            {start}-{end} of {rowCount}
          </Typography>
        </Box>
      );
    },
    state: {
      isLoading: isPending,
      showAlertBanner: isError,
      showProgressBars: isLoading,
      pagination,
      columnFilters,
      globalFilter,
      sorting
    },
    manualPagination: true,
    rowCount,
    pageCount,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
    onCreatingRowSave: handleCreateMapping,
    onEditingRowSave: handleUpdateMapping
  };

  return <ReusableTable tableProps={tableProps} />;
}
