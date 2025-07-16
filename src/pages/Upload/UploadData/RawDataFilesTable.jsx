import React, { useMemo } from 'react';
import { Icon } from '@iconify/react';
import {
  Avatar,
  Box,
  Chip,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
  useTheme
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

// Raw Data Files Table component using Material React Table
const RawDataFilesTable = ({ uploadedFiles }) => {
  const theme = useTheme();

  // Define columns for the table
  const columns = useMemo(
    () => [
      {
        accessorKey: 'name',
        header: 'Custodian',
        Cell: ({ row }) => (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Avatar
              sx={{
                bgcolor: alpha(row.original.color, 0.2),
                color: row.original.color,
                width: 36,
                height: 36,
                mr: 1.5
              }}
            >
              <Icon icon={row.original.icon} width={20} />
            </Avatar>
            <Typography variant="subtitle2">{row.original.name}</Typography>
          </Box>
        ),
        size: 250
      },
      {
        accessorKey: 'files',
        header: 'Files',
        Cell: ({ row }) => (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="body2">
              {row.original.files.length} {row.original.files.length === 1 ? 'file' : 'files'} uploaded
            </Typography>
            {row.original.files.length > 0 && (
              <Chip
                size="small"
                label={`${row.original.files
                  .reduce((total, file) => total + (file.size || 0), 0)
                  .toLocaleString()} bytes`}
                sx={{ ml: 1, height: 20, fontSize: '0.7rem' }}
              />
            )}
          </Box>
        ),
        size: 250
      },
      {
        accessorKey: 'status',
        header: 'Status',
        Cell: ({ row }) => (
          <Chip
            label={row.original.status}
            size="small"
            color={
              row.original.status === 'Processed'
                ? 'success'
                : row.original.status === 'Processing'
                  ? 'warning'
                  : row.original.status === 'Error'
                    ? 'error'
                    : 'default'
            }
            sx={{ minWidth: 85 }}
          />
        ),
        size: 150
      }
    ],
    []
  );

  // Configure table props
  const tableProps = {
    enableExpandAll: false,
    enableColumnActions: false,
    enableColumnFilters: false,
    enablePagination: false,
    enableFilters: false,
    enableGlobalFilter: false,
    enableColumnResizing: false,
    enableRowNumbers: false,
    enableBottomToolbar: false,
    enableColumnDragging: false,
    enableColumnOrdering: false,
    enablePinning: false,
    enableSorting: true,
    enableTopToolbar: true,
    // muiTableContainerProps: {
    //   sx: {
    //     maxHeight: 'unset'
    //   }
    // },

    // // Custom expand button rotation
    // muiExpandButtonProps: ({ row, table }) => ({
    //   onClick: () => table.setExpanded({ [row.id]: !row.getIsExpanded() }), // Only 1 detail panel open at a time
    //   sx: {
    //     transform: row.getIsExpanded() ? 'rotate(0deg)' : 'rotate(-90deg)',
    //     transition: 'transform 0.2s'
    //   }
    // }),

    // // Detail panel styling
    // muiDetailPanelProps: ({ row }) => ({
    //   sx: {
    //     bgcolor: alpha(row.original.color || theme.palette.primary.main, 0.02),
    //     borderTop: `1px dashed ${alpha(row.original.color || theme.palette.primary.main, 0.2)}`
    //   }
    // }),

    // Custom top toolbar with Raw Data Files heading
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
        <Tooltip title="View uploaded raw data files for each custodian">
          <IconButton size="small">
            <Icon icon="mdi:information" width={20} />
          </IconButton>
        </Tooltip>
      </Box>
    ),

    // Detail panel content with tabular format
    renderDetailPanel: ({ row }) => (
      <Box sx={{ p: 0 }}>
        {row.original.files.length > 0 ? (
          <TableContainer
            component={Paper}
            elevation={0}
            sx={{
              border: `1px solid ${alpha(theme.palette.divider, 0.7)}`,
              borderRadius: 0,
              overflow: 'hidden'
            }}
          >
            <Table sx={{ minWidth: 950 }}>
              <TableHead sx={{ bgcolor: alpha(row.original.color || theme.palette.primary.main, 0.05) }}>
                <TableRow>
                  <TableCell width="5%">#</TableCell>
                  <TableCell width="30%">File Name</TableCell>
                  <TableCell width="8%">Type</TableCell>
                  <TableCell width="12%">Size</TableCell>
                  <TableCell width="10%">Status</TableCell>
                  <TableCell width="12%">Uploaded By</TableCell>
                  <TableCell width="13%">Upload Time</TableCell>
                  <TableCell width="10%" align="center">
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {row.original.files.map((file, idx) => (
                  <TableRow
                    key={idx}
                    sx={{
                      '&:hover': {
                        bgcolor: alpha(theme.palette.primary.main, 0.02)
                      }
                    }}
                  >
                    <TableCell>{idx + 1}</TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Avatar
                          sx={{
                            bgcolor: alpha(row.original.color, 0.2),
                            color: row.original.color,
                            width: 32,
                            height: 32,
                            mr: 1.5
                          }}
                        >
                          <Icon icon={`mdi:file-${file.type === 'csv' ? 'excel' : file.type}`} width={18} />
                        </Avatar>
                        <Box>
                          <Typography variant="body2" fontWeight={500}>
                            {file.name}
                          </Typography>
                          {file.processingInfo && (
                            <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
                              {file.processingInfo}
                            </Typography>
                          )}
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Chip label={file.type.toUpperCase()} size="small" sx={{ height: 20, fontSize: '0.7rem' }} />
                    </TableCell>
                    <TableCell>{file.size ? formatBytes(file.size) : 'N/A'}</TableCell>
                    <TableCell>
                      <Chip
                        label={file.status || 'Pending'}
                        size="small"
                        color={
                          file.status === 'Valid'
                            ? 'success'
                            : file.status === 'Processing'
                              ? 'warning'
                              : file.status === 'Error'
                                ? 'error'
                                : 'default'
                        }
                        sx={{ height: 20, fontSize: '0.7rem', minWidth: 60 }}
                      />
                    </TableCell>
                    <TableCell>{file.uploadedBy || 'System User'}</TableCell>
                    <TableCell>{file.uploadTime}</TableCell>
                    <TableCell align="center">
                      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Tooltip title="View file details">
                          <IconButton size="small" color="primary">
                            <Icon icon="mdi:eye" width={16} />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Download file">
                          <IconButton size="small" color="secondary" sx={{ ml: 0.5 }}>
                            <Icon icon="mdi:download" width={16} />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete file">
                          <IconButton size="small" color="error" sx={{ ml: 0.5 }}>
                            <Icon icon="mdi:delete-outline" width={16} />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <Box sx={{ p: 4, textAlign: 'center' }}>
            <Icon
              icon="mdi:folder-open-outline"
              style={{ fontSize: 48, opacity: 0.5, marginBottom: 16, color: theme.palette.text.secondary }}
            />
            <Typography variant="body1" color="text.secondary">
              No files for this custodian yet
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              Use the upload options above to add files
            </Typography>
          </Box>
        )}
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

  return <ReusableTable columns={columns} data={uploadedFiles} tableProps={tableProps} />;
};

export default RawDataFilesTable;
