import React, { useState, useMemo } from 'react';
import { Icon } from '@iconify/react';
import {
  Box,
  Chip,
  IconButton,
  Tooltip,
  Typography,
  useTheme,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button
} from '@mui/material';
import { alpha } from '@mui/material/styles';
import ReusableTable from 'components/Table/ReusableTable';

// Format bytes to human readable format
const formatBytes = (bytes, decimals = 2) => {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};

// Raw Data Files Table component using ReusableTable
const RawDataFilesTable = ({ uploadedFiles }) => {
  const theme = useTheme();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [fileToDelete, setFileToDelete] = useState(null);

  // Process data for the table
  const tableData = useMemo(() => {
    return uploadedFiles.flatMap((custodian) =>
      custodian.files.length > 0
        ? custodian.files.map((file) => ({
            id: `${custodian.id}-${file.name}`,
            custodianId: custodian.id,
            custodianName: custodian.name,
            custodianIcon: custodian.icon,
            custodianColor: custodian.color,
            fileName: file.name,
            fileType: file.type,
            fileSize: file.size,
            uploadTime: file.uploadTime,
            status: file.status,
            file: file
          }))
        : [
            {
              id: custodian.id,
              custodianId: custodian.id,
              custodianName: custodian.name,
              custodianIcon: custodian.icon,
              custodianColor: custodian.color,
              isEmpty: true
            }
          ]
    );
  }, [uploadedFiles]);

  // Define table columns
  const columns = useMemo(
    () => [
      {
        accessorKey: 'custodianName',
        header: 'Custodian',
        size: 200,
        Cell: ({ row }) => (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 36,
                height: 36,
                bgcolor: alpha(row.original.custodianColor, 0.15),
                borderRadius: '50%',
                mr: 1.5
              }}
            >
              <Icon icon={row.original.custodianIcon} color={row.original.custodianColor} width={20} />
            </Box>
            <Typography variant="body1">{row.original.custodianName}</Typography>
          </Box>
        )
      },
      {
        accessorKey: 'fileName',
        header: 'File Name',
        size: 350,
        Cell: ({ row }) => {
          if (row.original.isEmpty) {
            return (
              <Typography variant="body2" color="text.secondary" fontStyle="italic">
                No files uploaded yet
              </Typography>
            );
          }
          return (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Icon
                icon={`mdi:file-${row.original.fileType === 'csv' ? 'excel' : row.original.fileType}`}
                width={20}
                color={row.original.custodianColor}
                style={{ marginRight: 8 }}
              />
              <Typography variant="body2">{row.original.fileName}</Typography>
            </Box>
          );
        }
      },
      {
        accessorKey: 'fileType',
        header: 'Type',
        size: 200,
        Cell: ({ row }) => {
          if (row.original.isEmpty) return null;
          return <Chip size="small" label={row.original.fileType.toUpperCase()} />;
        }
      },
      {
        accessorKey: 'fileSize',
        header: 'Size',
        size: 200,
        Cell: ({ row }) => {
          if (row.original.isEmpty) return null;
          return <Typography variant="body2">{formatBytes(row.original.fileSize)}</Typography>;
        }
      },
      {
        accessorKey: 'uploadTime',
        header: 'Upload Time',
        size: 200,
        Cell: ({ row }) => {
          if (row.original.isEmpty) return null;
          return <Typography variant="body2">{row.original.uploadTime}</Typography>;
        }
      },
      {
        accessorKey: 'status',
        header: 'Status',
        size: 150,
        Cell: ({ row }) => {
          if (row.original.isEmpty) {
            return <Chip size="small" label="Ready" color="default" />;
          }
          return (
            <Chip
              size="small"
              label={row.original.status}
              color={
                row.original.status === 'Valid'
                  ? 'success'
                  : row.original.status === 'Processing'
                    ? 'warning'
                    : row.original.status === 'Error'
                      ? 'error'
                      : 'default'
              }
            />
          );
        }
      },
      {
        id: 'actions',
        header: 'Actions',
        size: 150,
        Cell: ({ row }) => {
          if (row.original.isEmpty) return null;
          return (
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
              <Tooltip title="View file">
                <IconButton size="small">
                  <Icon icon="mdi:eye" width={16} />
                </IconButton>
              </Tooltip>
              <Tooltip title="Download file">
                <IconButton size="small">
                  <Icon icon="mdi:download" width={16} />
                </IconButton>
              </Tooltip>
              <Tooltip title="Delete file">
                <IconButton
                  size="small"
                  color="error"
                  onClick={() => {
                    setFileToDelete({
                      custodianId: row.original.custodianId,
                      fileIndex: uploadedFiles
                        .find((c) => c.id === row.original.custodianId)
                        .files.findIndex((f) => f.name === row.original.fileName)
                    });
                    setDeleteDialogOpen(true);
                  }}
                >
                  <Icon icon="mdi:delete" width={16} />
                </IconButton>
              </Tooltip>
            </Box>
          );
        }
      }
    ],
    [uploadedFiles]
  );

  // Handle file delete confirmation
  const handleDeleteConfirm = () => {
    // Here you would add actual delete logic
    console.log(`Deleting file from ${fileToDelete.custodianId}, index: ${fileToDelete.fileIndex}`);
    setDeleteDialogOpen(false);
  };

  // Table props
  const tableProps = {
    enableColumnFilters: false,
    enableFilters: false,
    enableGlobalFilter: true,
    enableColumnActions: false,
    enableDensityToggle: false,
    enableFullScreenToggle: false,
    enableHiding: false,
    enablePagination: tableData.length > 10,
    muiTableContainerProps: {
      sx: {
        maxHeight: tableData.length > 5 ? '500px' : 'unset'
      }
    },
    initialState: {
      density: 'compact',
      pagination: {
        pageSize: 10,
        pageIndex: 0
      }
    },
    renderTopToolbar: ({ table }) => (
      <Box
        sx={{
          p: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          bgcolor: alpha(theme.palette.primary.main, 0.05),
          borderBottom: `1px solid ${theme.palette.divider}`
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Icon
            icon="mdi:file-document-multiple"
            style={{
              marginRight: 10,
              color: theme.palette.primary.main,
              fontSize: 24
            }}
          />
          <Typography variant="h6">Raw Data Files</Typography>
        </Box>
        <Tooltip title="View uploaded raw data files from each custodian. These files contain the original unprocessed data.">
          <IconButton size="small" aria-label="Information about raw data files">
            <Icon icon="mdi:information" width={20} />
          </IconButton>
        </Tooltip>
      </Box>
    ),
    renderEmptyState: () => (
      <Box sx={{ p: 4, textAlign: 'center' }}>
        <Icon
          icon="mdi:file-document-outline"
          style={{ fontSize: 48, opacity: 0.5, marginBottom: 16, color: theme.palette.text.secondary }}
        />
        <Typography variant="h6" color="text.secondary" sx={{ mb: 1 }}>
          No Files Available
        </Typography>
        <Typography variant="body1" color="text.secondary">
          No files have been uploaded yet
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          Use the upload options above to add files
        </Typography>
      </Box>
    )
  };

  return (
    <>
      <ReusableTable columns={columns} data={tableData} tableProps={tableProps} />

      {/* Delete confirmation dialog */}
      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
        <DialogTitle>Delete File</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this file? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)} color="inherit">
            Cancel
          </Button>
          <Button onClick={handleDeleteConfirm} color="error" variant="contained" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default RawDataFilesTable;
