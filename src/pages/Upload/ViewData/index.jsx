import { Icon } from '@iconify/react';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  Divider,
  Grid,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Paper,
  Stack,
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
import NotificationBar from 'components/Upload/NotificationBar';
import { useState } from 'react';
import Swal from 'sweetalert2';

// Data Summary component
const DataSummary = ({ onFilterClick }) => {
  const theme = useTheme();

  const summaryStats = [
    {
      id: 'all_records',
      title: 'Total Records',
      value: '6,509',
      icon: 'mdi:database',
      color: theme.palette.primary.main,
      change: '+12%',
      positive: true
    },
    {
      id: 'active_sources',
      title: 'Active Sources',
      value: '3',
      icon: 'mdi:check-circle',
      color: theme.palette.success.main,
      change: '+1',
      positive: true
    },
    {
      id: 'latest',
      title: 'Last Update',
      value: 'Today',
      icon: 'mdi:calendar-clock',
      color: theme.palette.info.main,
      change: '10:45 AM',
      positive: null
    },
    {
      id: 'errors',
      title: 'Data Errors',
      value: '2',
      icon: 'mdi:alert-circle',
      color: theme.palette.error.main,
      change: '-5',
      positive: true
    }
  ];

  return (
    <Box sx={{ mb: 4 }}>
      <Paper
        elevation={0}
        sx={{
          p: 2,
          borderRadius: 2,
          bgcolor: alpha(theme.palette.background.default, 0.7),
          border: `1px solid ${theme.palette.divider}`,
          overflow: 'hidden'
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', px: 1, mb: 2 }}>
          <Typography variant="h5" sx={{ fontWeight: 600 }}>
            Data Summary
          </Typography>

          {/* Add clear filters button */}
          <Button startIcon={<Icon icon="mdi:filter-off" />} size="small" onClick={() => onFilterClick(null)}>
            Clear Filters
          </Button>
        </Box>

        <Grid container spacing={2}>
          {summaryStats.map((stat, index) => (
            <Grid item xs={6} md={3} key={index}>
              <Paper
                elevation={0}
                onClick={() => onFilterClick(stat.id)}
                sx={{
                  p: 2,
                  height: '100%',
                  borderRadius: 2,
                  bgcolor: alpha(stat.color, 0.05),
                  border: `1px solid ${alpha(stat.color, 0.1)}`,
                  transition: 'all 0.3s',
                  cursor: 'pointer',
                  '&:hover': {
                    boxShadow: theme.shadows[4],
                    bgcolor: alpha(stat.color, 0.08),
                    transform: 'translateY(-2px)'
                  }
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Avatar
                    sx={{
                      bgcolor: alpha(stat.color, 0.2),
                      color: stat.color,
                      width: 40,
                      height: 40,
                      mr: 1.5
                    }}
                  >
                    <Icon icon={stat.icon} width={22} />
                  </Avatar>
                  <Typography variant="h6" color="text.primary" sx={{ fontWeight: 600 }}>
                    {stat.value}
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Typography variant="body2" color="text.secondary">
                    {stat.title}
                  </Typography>

                  {stat.change && (
                    <Chip
                      label={stat.change}
                      size="small"
                      sx={{
                        height: 20,
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        bgcolor:
                          stat.positive !== null
                            ? alpha(stat.positive ? theme.palette.success.main : theme.palette.error.main, 0.1)
                            : alpha(theme.palette.info.main, 0.1),
                        color:
                          stat.positive !== null
                            ? stat.positive
                              ? theme.palette.success.main
                              : theme.palette.error.main
                            : theme.palette.info.main
                      }}
                    />
                  )}
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Paper>
    </Box>
  );
};

// Info with tooltip component
const TitleWithInfo = ({ title, tooltipText }) => (
  <Box sx={{ display: 'flex', alignItems: 'center' }}>
    <Typography variant="h6" sx={{ mr: 1 }}>
      {title}
    </Typography>
    <Tooltip
      title={
        <Typography variant="body2" sx={{ p: 1 }}>
          {tooltipText}
        </Typography>
      }
      arrow
      placement="top"
    >
      <IconButton size="small" color="primary" sx={{ p: 0.5 }}>
        <Icon icon="mdi:information" width={18} />
      </IconButton>
    </Tooltip>
  </Box>
);

// Data category card component
const DataCategoryCard = ({ data, onClick, isActive }) => {
  const theme = useTheme();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'all 0.3s',
        position: 'relative',
        borderRadius: 2,
        border: `1px solid ${alpha(data.color, isHovered || isActive ? 0.5 : 0.2)}`,
        bgcolor: isActive ? alpha(data.color, 0.08) : isHovered ? alpha(data.color, 0.02) : 'background.paper',
        boxShadow: isActive ? `0 0 0 2px ${data.color}` : isHovered ? theme.shadows[5] : 'none',
        transform: isHovered || isActive ? 'translateY(-4px)' : 'none',
        '&:hover': {
          cursor: 'pointer',
          boxShadow: theme.shadows[5],
          borderColor: alpha(data.color, 0.5)
        }
      }}
      onClick={() => onClick?.(data.id)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Status indicator */}
      <Box
        sx={{
          position: 'absolute',
          top: 12,
          right: 12,
          width: 12,
          height: 12,
          borderRadius: '50%',
          bgcolor: data.status === 'active' ? theme.palette.success.main : theme.palette.grey[400],
          border: `2px solid ${theme.palette.background.paper}`,
          boxShadow: theme.shadows[1]
        }}
      />

      {/* Active filter indicator */}
      {isActive && (
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '4px',
            bgcolor: data.color,
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8
          }}
        />
      )}

      <CardContent sx={{ p: 3, pb: 1, flexGrow: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Avatar
            sx={{
              bgcolor: alpha(data.color, 0.1),
              color: data.color,
              fontWeight: 600,
              width: 48,
              height: 48
            }}
          >
            <Icon icon={data.icon} width={24} />
          </Avatar>
          <Box sx={{ ml: 2 }}>
            <Typography variant="h5" component="div" sx={{ fontWeight: 600 }}>
              {data.title}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
              <Icon icon="mdi:database" width={16} style={{ color: theme.palette.text.secondary }} />
              <Typography variant="body2" color="text.secondary" sx={{ ml: 0.5 }}>
                {data.records} records
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Data preview visualization */}
        <Paper
          elevation={0}
          sx={{
            p: 2,
            mt: 1,
            mb: 2,
            borderRadius: 1.5,
            bgcolor: alpha(theme.palette.background.default, 0.7),
            border: `1px solid ${alpha(theme.palette.divider, 0.5)}`,
            height: 60,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Typography variant="body2" color="text.secondary">
            {data.title} Data Preview
          </Typography>
        </Paper>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Avatar
              sx={{
                width: 24,
                height: 24,
                mr: 1,
                border: `2px solid ${theme.palette.background.paper}`
              }}
            >
              <Icon icon="mdi:account" width={16} />
            </Avatar>
            <Typography variant="body2" color="text.secondary">
              {data.owner}
            </Typography>
          </Box>
          <Chip
            size="small"
            label={data.status === 'active' ? 'Active' : 'Inactive'}
            sx={{
              bgcolor:
                data.status === 'active' ? alpha(theme.palette.success.main, 0.1) : alpha(theme.palette.grey[500], 0.1),
              color: data.status === 'active' ? theme.palette.success.main : theme.palette.text.secondary,
              fontWeight: 500,
              height: 24
            }}
          />
        </Box>
      </CardContent>

      <Divider sx={{ opacity: 0.6 }} />

      <Box sx={{ p: 2, pt: 1.5, pb: 1.5, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Icon icon="mdi:calendar-clock" width={16} style={{ color: theme.palette.text.secondary }} />
          <Typography variant="caption" color="text.secondary" sx={{ ml: 0.5, fontWeight: 500 }}>
            {data.lastUpdated}
          </Typography>
        </Box>

        <Typography
          variant="caption"
          color="primary"
          sx={{
            display: 'flex',
            alignItems: 'center',
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'color 0.2s',
            '&:hover': { color: theme.palette.primary.dark }
          }}
        >
          View Details
          <Icon icon="mdi:arrow-right" width={16} style={{ marginLeft: 4 }} />
        </Typography>
      </Box>
    </Card>
  );
};

// Data Table component
const DataTable = ({ data }) => {
  const theme = useTheme();
  const [detailsModal, setDetailsModal] = useState({ open: false, data: null });
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null);

  const handleMenuOpen = (event, row) => {
    setAnchorEl(event.currentTarget);
    setSelectedRow(row);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedRow(null);
  };

  const handleViewDetails = (row) => {
    handleMenuClose();
    setDetailsModal({ open: true, data: row });
  };

  const handleCloseDetailsModal = () => {
    setDetailsModal({ open: false, data: null });
  };

  const handleRefreshData = (row) => {
    handleMenuClose();
    // Show a loading notification
    Swal.fire({
      title: 'Refreshing Data',
      text: `Updating ${row.name} data...`,
      icon: 'info',
      allowOutsideClick: false,
      showConfirmButton: false,
      willOpen: () => {
        Swal.showLoading();
      }
    });

    // Simulate refresh
    setTimeout(() => {
      Swal.fire({
        title: 'Data Refreshed',
        text: `${row.name} has been successfully updated`,
        icon: 'success',
        timer: 2000,
        showConfirmButton: false
      });
    }, 1500);
  };

  const handleExportData = (row) => {
    handleMenuClose();
    // Simulate export
    Swal.fire({
      title: 'Exporting Data',
      text: `Preparing ${row.name} for export...`,
      icon: 'info',
      timer: 1500,
      showConfirmButton: false
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed':
        return theme.palette.success;
      case 'Processing':
        return theme.palette.warning;
      case 'Failed':
        return theme.palette.error;
      default:
        return theme.palette.info;
    }
  };

  return (
    <>
      <TableContainer
        component={Paper}
        sx={{
          mt: 2,
          border: 1,
          borderColor: 'divider',
          borderRadius: 1,
          boxShadow: 'none'
        }}
      >
        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: alpha(theme.palette.primary.main, 0.05) }}>
              <TableCell>Data Source Name</TableCell>
              <TableCell align="center">Number of Records</TableCell>
              <TableCell align="center">Last Upload Time</TableCell>
              <TableCell align="center">Upload Status</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, index) => (
              <TableRow
                key={index}
                sx={{
                  '&:hover': { bgcolor: alpha(theme.palette.primary.main, 0.02) },
                  '&:last-child td, &:last-child th': { border: 0 }
                }}
              >
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Avatar
                      sx={{
                        width: 30,
                        height: 30,
                        mr: 1.5,
                        bgcolor: row.color || theme.palette.primary.light
                      }}
                    >
                      <Icon icon={row.icon || 'mdi:file'} width={16} />
                    </Avatar>
                    <Typography variant="body2" fontWeight={500}>
                      {row.name}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="body2" fontWeight={500}>
                    {row.records}
                  </Typography>
                </TableCell>
                <TableCell align="center">{row.lastUpload}</TableCell>
                <TableCell align="center">
                  <Chip
                    label={row.status}
                    size="small"
                    color={
                      row.status === 'Completed'
                        ? 'success'
                        : row.status === 'Processing'
                          ? 'warning'
                          : row.status === 'Failed'
                            ? 'error'
                            : 'default'
                    }
                    sx={{ fontWeight: 500, minWidth: 80 }}
                  />
                </TableCell>
                <TableCell align="center">
                  <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
                    <Button
                      variant="contained"
                      size="small"
                      startIcon={<Icon icon="mdi:eye" width={16} />}
                      color="primary"
                      onClick={() => handleViewDetails(row)}
                      sx={{
                        px: 2,
                        py: 0.5,
                        fontSize: '0.75rem',
                        boxShadow: 'none',
                        '&:hover': {
                          boxShadow: theme.shadows[2]
                        }
                      }}
                    >
                      View
                    </Button>
                    <IconButton
                      size="small"
                      onClick={(e) => handleMenuOpen(e, row)}
                      sx={{
                        border: `1px solid ${theme.palette.divider}`,
                        '&:hover': {
                          bgcolor: alpha(theme.palette.primary.main, 0.05)
                        }
                      }}
                    >
                      <Icon icon="mdi:dots-vertical" width={18} />
                    </IconButton>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Action Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        PaperProps={{
          elevation: 3,
          sx: {
            minWidth: 180,
            '& .MuiMenuItem-root': {
              py: 1
            }
          }
        }}
      >
        <MenuItem onClick={() => selectedRow && handleRefreshData(selectedRow)}>
          <ListItemIcon>
            <Icon icon="mdi:refresh" width={18} style={{ color: theme.palette.primary.main }} />
          </ListItemIcon>
          <ListItemText primary="Refresh Data" />
        </MenuItem>
        <MenuItem onClick={() => selectedRow && handleExportData(selectedRow)}>
          <ListItemIcon>
            <Icon icon="mdi:export" width={18} style={{ color: theme.palette.secondary.main }} />
          </ListItemIcon>
          <ListItemText primary="Export Data" />
        </MenuItem>
        <Divider />
        {selectedRow && selectedRow.status === 'Failed' && (
          <MenuItem onClick={handleMenuClose}>
            <ListItemIcon>
              <Icon icon="mdi:restart" width={18} style={{ color: theme.palette.warning.main }} />
            </ListItemIcon>
            <ListItemText primary="Retry Upload" />
          </MenuItem>
        )}
        <MenuItem onClick={handleMenuClose}>
          <ListItemIcon>
            <Icon icon="mdi:delete-outline" width={18} style={{ color: theme.palette.error.main }} />
          </ListItemIcon>
          <ListItemText primary="Remove Data" />
        </MenuItem>
      </Menu>

      {/* Details Modal */}
      <Dialog
        open={detailsModal.open}
        onClose={handleCloseDetailsModal}
        maxWidth="md"
        fullWidth
        PaperProps={{
          elevation: 5,
          sx: {
            borderRadius: 2,
            overflow: 'hidden'
          }
        }}
      >
        {detailsModal.data && (
          <>
            <Box
              sx={{
                bgcolor: alpha(getStatusColor(detailsModal.data.status).main, 0.1),
                borderBottom: `1px solid ${alpha(getStatusColor(detailsModal.data.status).main, 0.2)}`,
                px: 3,
                py: 2,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Avatar
                  sx={{
                    width: 42,
                    height: 42,
                    bgcolor: alpha(detailsModal.data.color || theme.palette.primary.main, 0.2),
                    color: detailsModal.data.color || theme.palette.primary.main,
                    mr: 2
                  }}
                >
                  <Icon icon={detailsModal.data.icon || 'mdi:file'} width={24} />
                </Avatar>
                <Box>
                  <Typography variant="h5">{detailsModal.data.name}</Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
                    <Chip
                      label={detailsModal.data.status}
                      size="small"
                      color={
                        detailsModal.data.status === 'Completed'
                          ? 'success'
                          : detailsModal.data.status === 'Processing'
                            ? 'warning'
                            : detailsModal.data.status === 'Failed'
                              ? 'error'
                              : 'default'
                      }
                      sx={{ fontWeight: 500, mr: 1, height: 20 }}
                    />
                    <Typography variant="caption" color="text.secondary">
                      Last updated: {detailsModal.data.lastUpload}
                    </Typography>
                  </Box>
                </Box>
              </Box>
              <IconButton onClick={handleCloseDetailsModal}>
                <Icon icon="mdi:close" width={20} />
              </IconButton>
            </Box>

            <DialogContent sx={{ p: 3 }}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={8}>
                  {/* Data Stats */}
                  <Paper
                    elevation={0}
                    sx={{
                      p: 2,
                      mb: 3,
                      borderRadius: 2,
                      border: `1px solid ${theme.palette.divider}`
                    }}
                  >
                    <Typography variant="h6" sx={{ mb: 2 }}>
                      Data Overview
                    </Typography>

                    <Grid container spacing={2}>
                      <Grid item xs={6} sm={3}>
                        <Box sx={{ textAlign: 'center', p: 1 }}>
                          <Typography variant="h4" color="primary.main" fontWeight={600}>
                            {detailsModal.data.records}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Total Records
                          </Typography>
                        </Box>
                      </Grid>
                      <Grid item xs={6} sm={3}>
                        <Box sx={{ textAlign: 'center', p: 1 }}>
                          <Typography variant="h4" color="success.main" fontWeight={600}>
                            {Math.floor(detailsModal.data.records * 0.95)}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Valid Records
                          </Typography>
                        </Box>
                      </Grid>
                      <Grid item xs={6} sm={3}>
                        <Box sx={{ textAlign: 'center', p: 1 }}>
                          <Typography variant="h4" color="warning.main" fontWeight={600}>
                            {Math.floor(detailsModal.data.records * 0.03)}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Warnings
                          </Typography>
                        </Box>
                      </Grid>
                      <Grid item xs={6} sm={3}>
                        <Box sx={{ textAlign: 'center', p: 1 }}>
                          <Typography variant="h4" color="error.main" fontWeight={600}>
                            {Math.floor(detailsModal.data.records * 0.02)}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Errors
                          </Typography>
                        </Box>
                      </Grid>
                    </Grid>
                  </Paper>

                  {/* Sample Data Table */}
                  <Paper
                    elevation={0}
                    sx={{
                      borderRadius: 2,
                      border: `1px solid ${theme.palette.divider}`,
                      overflow: 'hidden'
                    }}
                  >
                    <Box sx={{ p: 2, borderBottom: `1px solid ${theme.palette.divider}` }}>
                      <Typography variant="h6">Sample Data Preview</Typography>
                    </Box>
                    <TableContainer sx={{ maxHeight: 240 }}>
                      <Table size="small" stickyHeader>
                        <TableHead>
                          <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Account</TableCell>
                            <TableCell align="right">Amount</TableCell>
                            <TableCell align="center">Date</TableCell>
                            <TableCell align="center">Status</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {[...Array(6)].map((_, i) => (
                            <TableRow key={i}>
                              <TableCell>{1000 + i}</TableCell>
                              <TableCell>ACC-{10000 + Math.floor(Math.random() * 5000)}</TableCell>
                              <TableCell align="right">${(1000 + Math.random() * 9000).toFixed(2)}</TableCell>
                              <TableCell align="center">2025-05-{20 + i}</TableCell>
                              <TableCell align="center">
                                <Chip
                                  label={i % 5 === 0 ? 'Error' : i % 4 === 0 ? 'Warning' : 'Success'}
                                  size="small"
                                  color={i % 5 === 0 ? 'error' : i % 4 === 0 ? 'warning' : 'success'}
                                  sx={{ height: 20, fontSize: '0.7rem' }}
                                />
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Paper>
                </Grid>

                <Grid item xs={12} md={4}>
                  {/* Upload Info */}
                  <Paper
                    elevation={0}
                    sx={{
                      p: 2,
                      borderRadius: 2,
                      border: `1px solid ${theme.palette.divider}`,
                      mb: 3
                    }}
                  >
                    <Typography variant="h6" sx={{ mb: 2 }}>
                      Upload Information
                    </Typography>

                    <Box sx={{ mb: 2 }}>
                      <Typography variant="body2" color="text.secondary">
                        Upload Date
                      </Typography>
                      <Typography variant="body1">{detailsModal.data.lastUpload}</Typography>
                    </Box>

                    <Box sx={{ mb: 2 }}>
                      <Typography variant="body2" color="text.secondary">
                        Uploaded By
                      </Typography>
                      <Typography variant="body1">Md Altaf Raja</Typography>
                    </Box>

                    <Box sx={{ mb: 2 }}>
                      <Typography variant="body2" color="text.secondary">
                        File Count
                      </Typography>
                      <Typography variant="body1">3 files</Typography>
                    </Box>

                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        Processing Time
                      </Typography>
                      <Typography variant="body1">45 seconds</Typography>
                    </Box>
                  </Paper>

                  {/* Actions */}
                  <Paper
                    elevation={0}
                    sx={{
                      p: 2,
                      borderRadius: 2,
                      border: `1px solid ${theme.palette.divider}`
                    }}
                  >
                    <Typography variant="h6" sx={{ mb: 2 }}>
                      Actions
                    </Typography>

                    <Stack spacing={1.5}>
                      <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        startIcon={<Icon icon="mdi:refresh" width={18} />}
                        onClick={() => handleRefreshData(detailsModal.data)}
                      >
                        Refresh Data
                      </Button>
                      <Button
                        fullWidth
                        variant="outlined"
                        color="secondary"
                        startIcon={<Icon icon="mdi:export" width={18} />}
                        onClick={() => handleExportData(detailsModal.data)}
                      >
                        Export Data
                      </Button>
                      <Button
                        fullWidth
                        variant="outlined"
                        color="info"
                        startIcon={<Icon icon="mdi:chart-box" width={18} />}
                      >
                        View Analytics
                      </Button>
                      {detailsModal.data.status === 'Failed' && (
                        <Button
                          fullWidth
                          variant="outlined"
                          color="warning"
                          startIcon={<Icon icon="mdi:restart" width={18} />}
                        >
                          Retry Upload
                        </Button>
                      )}
                    </Stack>
                  </Paper>
                </Grid>
              </Grid>
            </DialogContent>

            <DialogActions sx={{ px: 3, py: 2, borderTop: `1px solid ${theme.palette.divider}` }}>
              <Button onClick={handleCloseDetailsModal} color="inherit">
                Close
              </Button>
              <Button
                variant="contained"
                onClick={() => {
                  handleCloseDetailsModal();
                  handleRefreshData(detailsModal.data);
                }}
                startIcon={<Icon icon="mdi:database-edit" width={18} />}
              >
                Update Data
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </>
  );
};

const ViewData = ({ isLoading }) => {
  const theme = useTheme();
  const [activeFilter, setActiveFilter] = useState(null);
  const [notification, setNotification] = useState({
    message: '',
    type: '',
    progress: 0,
    show: false
  });
  const [selectedDataCategory, setSelectedDataCategory] = useState(null);

  // Data categories
  const dataCategories = [
    {
      id: 'albilad',
      title: 'Albilad Data',
      owner: 'Md Altaf Raja',
      icon: 'mdi:bank',
      records: '2,458',
      lastUpdated: '2025-05-29 14:30 PM',
      color: theme.palette.primary.main,
      status: 'active'
    },
    {
      id: 'riyadh',
      title: 'Riyadh Data',
      owner: 'Md Altaf Raja',
      icon: 'mdi:city',
      records: '1,872',
      lastUpdated: '2025-05-30 09:15 AM',
      color: theme.palette.secondary.main,
      status: 'active'
    },
    {
      id: 'at',
      title: 'AT Data',
      owner: 'Md Altaf Raja',
      icon: 'mdi:office-building',
      records: '945',
      lastUpdated: '2025-05-28 16:45 PM',
      color: '#FF9800',
      status: 'inactive'
    },
    {
      id: 'statestreet',
      title: 'State Street Data',
      owner: 'Md Altaf Raja',
      icon: 'mdi:bank-outline',
      records: '1,563',
      lastUpdated: '2025-05-31 11:20 AM',
      color: '#673AB7',
      status: 'active'
    },
    {
      id: 'apx',
      title: 'APX Data',
      owner: 'Sayantan Roy',
      icon: 'mdi:chart-box',
      records: '1,234',
      lastUpdated: '2025-05-31 10:45 AM',
      color: '#4CAF50',
      status: 'active'
    }
  ];

  // Table data for View Loaded Data section
  const tableData = [
    {
      name: 'Albilad Financial Reports',
      records: 1245,
      lastUpload: '2025-05-29 14:30 PM',
      status: 'Completed',
      icon: 'mdi:bank',
      color: theme.palette.primary.main
    },
    {
      name: 'Riyadh Transaction Data',
      records: 873,
      lastUpload: '2025-05-30 09:15 AM',
      status: 'Completed',
      icon: 'mdi:city',
      color: theme.palette.secondary.main
    },
    {
      name: 'AT Investment Portfolio',
      records: 945,
      lastUpload: '2025-05-28 16:45 PM',
      status: 'Processing',
      icon: 'mdi:office-building',
      color: '#FF9800'
    },
    {
      name: 'State Street Securities',
      records: 1563,
      lastUpload: '2025-05-31 11:20 AM',
      status: 'Completed',
      icon: 'mdi:bank-outline',
      color: '#673AB7'
    },
    {
      name: 'APX System Data',
      records: 1234,
      lastUpload: '2025-05-31 10:45 AM',
      status: 'Completed',
      icon: 'mdi:chart-box',
      color: '#4CAF50'
    },
    {
      name: 'Legacy System Import',
      records: 523,
      lastUpload: '2025-05-25 11:20 AM',
      status: 'Failed',
      icon: 'mdi:database',
      color: theme.palette.error.main
    }
  ];

  // Data category click handler
  const handleDataCategoryClick = (categoryId) => {
    setSelectedDataCategory(categoryId);
    setActiveFilter(categoryId); // Set the active filter based on the clicked category

    // Show a notification about the filter being applied
    setNotification({
      message: `Filtered to show only ${categoryId} data`,
      type: 'info',
      progress: 100,
      show: true
    });

    // Auto clear notification after a few seconds
    setTimeout(() => {
      handleCloseNotification();
    }, 3000);
  };

  // Summary item click handler for filtering
  const handleSummaryItemClick = (filterType) => {
    setActiveFilter(filterType);

    // Show a notification about the filter being applied
    setNotification({
      message: `Filtered to show ${filterType} data`,
      type: 'info',
      progress: 100,
      show: true
    });

    // Auto clear notification after a few seconds
    setTimeout(() => {
      handleCloseNotification();
    }, 3000);
  };

  // Clear filter handler
  const handleClearFilter = () => {
    setActiveFilter(null);

    // Show a notification about clearing the filter
    setNotification({
      message: 'Showing all data',
      type: 'success',
      progress: 100,
      show: true
    });

    // Auto clear notification after a few seconds
    setTimeout(() => {
      handleCloseNotification();
    }, 3000);
  };

  // Close notification
  const handleCloseNotification = () => {
    setNotification((prev) => ({ ...prev, show: false }));
  };

  return (
    <Box sx={{ p: 2 }}>
      {/* Notification */}
      <NotificationBar notification={notification} onClose={handleCloseNotification} />

      {/* Data Summary */}
      <DataSummary onFilterClick={handleSummaryItemClick} />

      {/* Data Categories */}
      <Box sx={{ mt: 3, mb: 3 }}>
        <TitleWithInfo
          title="Data Categories"
          tooltipText="View summary information for each data category. Click on a card to see detailed data."
        />

        <Grid container spacing={3} sx={{ mt: 2 }}>
          {dataCategories.map((category, index) => (
            <Grid item xs={12} sm={6} md={4} lg={2.4} key={index}>
              <DataCategoryCard
                data={category}
                onClick={() => handleDataCategoryClick(category.id)}
                isActive={category.id === activeFilter}
              />
            </Grid>
          ))}
        </Grid>
      </Box>

      <Divider sx={{ my: 4 }} />

      {/* View Loaded Data */}
      <Box sx={{ mt: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <TitleWithInfo
            title="VIEW LOADED DATA"
            tooltipText="This table shows a summary of all loaded data across different sources."
          />

          {activeFilter && (
            <Chip
              label={`Filtered by: ${activeFilter}`}
              onDelete={handleClearFilter}
              color="primary"
              size="small"
              icon={<Icon icon="mdi:filter" width={16} />}
              sx={{ fontWeight: 500 }}
            />
          )}
        </Box>

        <DataTable
          data={
            activeFilter
              ? tableData.filter((item) => {
                  // Filter based on different criteria
                  switch (activeFilter) {
                    case 'albilad':
                      return item.name.toLowerCase().includes('albilad');
                    case 'riyadh':
                      return item.name.toLowerCase().includes('riyadh');
                    case 'at':
                      return item.name.toLowerCase().includes('at') || item.name.toLowerCase().includes('investment');
                    case 'apx':
                      return item.name.toLowerCase().includes('apx');
                    case 'statestreet':
                      return item.name.toLowerCase().includes('state street');
                    case 'all_records':
                      return true; // Show all
                    case 'active_sources':
                      return item.status === 'Completed'; // Show completed ones
                    case 'latest':
                      // Show the most recently updated records (today)
                      return item.lastUpload.includes('2025-05-31');
                    case 'errors':
                      return item.status === 'Failed';
                    default:
                      return true;
                  }
                })
              : tableData
          }
        />
      </Box>
    </Box>
  );
};

export default ViewData;
