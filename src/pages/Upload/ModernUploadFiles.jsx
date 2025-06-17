import { Icon } from '@iconify/react';
import {
  Alert,
  Avatar,
  Badge,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  Divider,
  Grid,
  IconButton,
  LinearProgress,
  List,
  ListItem,
  ListItemAvatar,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Paper,
  Snackbar,
  Stack,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tabs,
  Tooltip,
  Typography
} from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';
import { useQueryClient } from '@tanstack/react-query';
import useAuth from 'hooks/useAuth';
import PropTypes from 'prop-types';
import { useMemo, useRef, useState } from 'react';
import Swal from 'sweetalert2';

// Components
import MainCard from 'components/MainCard';

// File type icons
const getFileIcon = (fileType) => {
  switch (fileType?.toLowerCase()) {
    case 'image':
    case 'jpg':
    case 'jpeg':
    case 'png':
    case 'gif':
    case 'svg':
      return <Icon icon="material-symbols:image" width={24} height={24} />;
    case 'pdf':
      return <Icon icon="material-symbols:picture-as-pdf" width={24} height={24} />;
    case 'doc':
    case 'docx':
      return <Icon icon="material-symbols:document" width={24} height={24} />;
    case 'xls':
    case 'xlsx':
    case 'csv':
      return <Icon icon="mdi:file-excel" width={24} height={24} />;
    case 'ppt':
    case 'pptx':
      return <Icon icon="mdi:file-powerpoint" width={24} height={24} />;
    case 'zip':
    case 'rar':
      return <Icon icon="mdi:zip-box" width={24} height={24} />;
    case 'audio':
    case 'mp3':
    case 'wav':
      return <Icon icon="mdi:file-music" width={24} height={24} />;
    case 'video':
    case 'mp4':
    case 'avi':
      return <Icon icon="mdi:file-video" width={24} height={24} />;
    case 'geneva':
      return <Icon icon="mdi:file-chart" width={24} height={24} color="#4CAF50" />;
    case 'axys':
      return <Icon icon="mdi:file-chart" width={24} height={24} color="#2196F3" />;
    default:
      return <Icon icon="mdi:file-document" width={24} height={24} />;
  }
};

// Format bytes to human readable format
const formatBytes = (bytes, decimals = 2) => {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};

// View selector component
const ViewSelector = ({ currentView, onChangeView }) => {
  return (
    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
      <Tabs value={currentView} onChange={(e, newValue) => onChangeView(newValue)} aria-label="file view options">
        <Tab
          icon={<Icon icon="mdi:view-list" width={20} />}
          iconPosition="start"
          label="List View"
          value="list"
          sx={{ minHeight: 48, px: 1 }}
        />
        <Tab
          icon={<Icon icon="mdi:view-grid" width={20} />}
          iconPosition="start"
          label="Grid View"
          value="grid"
          sx={{ minHeight: 48, px: 1 }}
        />
        <Tab
          icon={<Icon icon="mdi:view-column" width={20} />}
          iconPosition="start"
          label="Column View"
          value="column"
          sx={{ minHeight: 48, px: 1 }}
        />
      </Tabs>
    </Box>
  );
};

ViewSelector.propTypes = {
  currentView: PropTypes.string.isRequired,
  onChangeView: PropTypes.func.isRequired
};

// File Item component
const FileItem = ({ file, onRemove, progress }) => {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleRemove = () => {
    handleMenuClose();
    onRemove(file.id);
  };

  // Determine file type for icon
  const fileExtension = file.name.split('.').pop().toLowerCase();

  return (
    <Paper
      elevation={1}
      sx={{
        p: 1,
        mb: 1,
        position: 'relative',
        borderRadius: 1,
        transition: 'all 0.2s',
        '&:hover': {
          boxShadow: theme.shadows[3],
          transform: 'translateY(-2px)'
        }
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', pr: 6 }}>
        <Box sx={{ p: 1, bgcolor: alpha(theme.palette.primary.main, 0.08), borderRadius: 1, mr: 2 }}>
          {getFileIcon(file.type || fileExtension)}
        </Box>
        <Box sx={{ flexGrow: 1, minWidth: 0 }}>
          <Typography variant="subtitle2" noWrap title={file.name}>
            {file.name}
          </Typography>
          <Typography variant="caption" color="textSecondary">
            {formatBytes(file.size)}{' '}
            {file.type && <Chip size="small" label={file.type} sx={{ ml: 1, height: 18, fontSize: '0.6rem' }} />}
          </Typography>

          {/* Progress bar */}
          {progress !== undefined && (
            <Box sx={{ width: '100%', mt: 1 }}>
              <LinearProgress
                variant="determinate"
                value={progress}
                sx={{
                  height: 5,
                  borderRadius: 5,
                  bgcolor: alpha(theme.palette.primary.main, 0.12),
                  '.MuiLinearProgress-bar': {
                    borderRadius: 5,
                    bgcolor: progress === 100 ? theme.palette.success.main : theme.palette.primary.main
                  }
                }}
              />
              <Typography variant="caption" sx={{ display: 'block', textAlign: 'right', mt: 0.5 }}>
                {progress}%
              </Typography>
            </Box>
          )}
        </Box>
      </Box>

      {/* Action buttons */}
      <Box sx={{ position: 'absolute', top: 8, right: 8 }}>
        <IconButton size="small" onClick={handleMenuOpen} color="default">
          <Icon icon="mdi:dots-vertical" />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          PaperProps={{
            elevation: 3,
            sx: { minWidth: 120 }
          }}
        >
          <MenuItem onClick={handleRemove}>
            <Icon icon="mdi:delete-outline" style={{ marginRight: 8 }} />
            Remove
          </MenuItem>
          <MenuItem onClick={handleMenuClose}>
            <Icon icon="mdi:file-replace-outline" style={{ marginRight: 8 }} />
            Replace
          </MenuItem>
        </Menu>
      </Box>
    </Paper>
  );
};

FileItem.propTypes = {
  file: PropTypes.object.isRequired,
  onRemove: PropTypes.func.isRequired,
  progress: PropTypes.number
};

// Storage usage component
const StorageUsageCard = ({ files }) => {
  const theme = useTheme();

  // Calculate total size
  const totalSize = useMemo(() => {
    return files.reduce((sum, file) => sum + file.size, 0);
  }, [files]);

  // Mock data for visualization
  const storageData = [
    { name: 'APX Files', size: totalSize * 0.6, color: theme.palette.primary.main },
    { name: 'Custodian Files', size: totalSize * 0.4, color: theme.palette.secondary.main },
    { name: 'Other', size: 1024 * 1024 * 2, color: theme.palette.grey[400] } // 2 MB of other files
  ];

  // Mock total storage allocation
  const totalAllocated = 1024 * 1024 * 100; // 100 MB
  const usedStorage = totalSize + storageData[2].size;
  const percentUsed = (usedStorage / totalAllocated) * 100;

  return (
    <Card elevation={0} sx={{ height: '100%', border: 1, borderColor: 'divider' }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          My Storage
        </Typography>

        {/* Storage visualization */}
        <Box sx={{ position: 'relative', display: 'flex', justifyContent: 'center', my: 2 }}>
          <Box sx={{ position: 'relative', width: 180, height: 180 }}>
            {/* Circular progress backgrounds */}
            {storageData.map((item, index) => (
              <CircularProgress
                key={index}
                variant="determinate"
                value={100}
                size={180 - index * 16}
                thickness={4}
                sx={{
                  position: 'absolute',
                  top: index * 8,
                  left: index * 8,
                  color: alpha(item.color, 0.2),
                  transform: 'rotate(0deg)'
                }}
              />
            ))}

            {/* Circular progress values */}
            {storageData.map((item, index) => (
              <CircularProgress
                key={`value-${index}`}
                variant="determinate"
                value={(item.size / totalAllocated) * 100}
                size={180 - index * 16}
                thickness={4}
                sx={{
                  position: 'absolute',
                  top: index * 8,
                  left: index * 8,
                  color: item.color,
                  transform: 'rotate(0deg)'
                }}
              />
            ))}

            {/* Center text */}
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Typography variant="h4" component="div" color="text.secondary">
                {formatBytes(usedStorage, 1)}
              </Typography>
              <Typography variant="caption" component="div" color="text.secondary">
                of {formatBytes(totalAllocated, 0)}
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Legend */}
        <Stack spacing={1} mt={2}>
          {storageData.map((item, index) => (
            <Box key={index} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box
                  sx={{
                    width: 12,
                    height: 12,
                    borderRadius: '50%',
                    bgcolor: item.color,
                    mr: 1
                  }}
                />
                <Typography variant="body2">{item.name}</Typography>
              </Box>
              <Typography variant="body2" color="text.secondary">
                {formatBytes(item.size)}
              </Typography>
            </Box>
          ))}
        </Stack>
      </CardContent>
    </Card>
  );
};

StorageUsageCard.propTypes = {
  files: PropTypes.array.isRequired
};

// Recent Activity component
const RecentActivityCard = ({ activities }) => {
  return (
    <Card elevation={0} sx={{ mt: 2, border: 1, borderColor: 'divider' }}>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
          <Typography variant="h6">Recent Activity</Typography>
          <IconButton size="small">
            <Icon icon="mdi:dots-horizontal" width={20} />
          </IconButton>
        </Box>

        <List disablePadding>
          {activities.map((activity, index) => (
            <Box key={index}>
              <ListItem disableGutters sx={{ py: 1.5 }}>
                <ListItemAvatar>
                  <Avatar sx={{ backgroundColor: activity.iconColor }}>
                    <Icon icon={activity.icon} width={20} />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={<Typography variant="subtitle2">{activity.title}</Typography>}
                  secondary={
                    <Typography variant="caption" color="text.secondary">
                      {activity.date}
                    </Typography>
                  }
                />
              </ListItem>
              {index < activities.length - 1 && <Divider />}
            </Box>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};

RecentActivityCard.propTypes = {
  activities: PropTypes.array.isRequired
};

// APX Data View Card
const APXDataCard = ({ data, onClick }) => {
  const theme = useTheme();

  return (
    <Card
      elevation={0}
      sx={{
        border: 1,
        borderColor: 'divider',
        transition: 'all 0.2s',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: theme.shadows[10],
          borderColor: theme.palette.primary.main
        },
        height: '100%',
        cursor: 'pointer'
      }}
      onClick={onClick}
    >
      <Box
        sx={{
          p: 0.5,
          bgcolor: alpha(theme.palette.primary.main, 0.8),
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <Typography variant="subtitle1" sx={{ pl: 1.5, color: 'white', fontWeight: 500 }}>
          {data.title}
        </Typography>
        <Badge
          color="success"
          variant="dot"
          sx={{
            mr: 1.5,
            '& .MuiBadge-dot': {
              width: 10,
              height: 10,
              borderRadius: '50%'
            }
          }}
        />
      </Box>
      <CardContent>
        <Stack spacing={1.5}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Avatar src="/static/images/avatar/1.jpg" alt={data.owner} sx={{ width: 32, height: 32, mr: 1.5 }} />
            <Box>
              <Typography variant="caption" color="text.secondary">
                Owner
              </Typography>
              <Typography variant="body2" fontWeight={500}>
                {data.owner}
              </Typography>
            </Box>
          </Box>

          <Divider />

          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box>
              <Typography variant="caption" color="text.secondary">
                Total Records
              </Typography>
              <Typography variant="h6" color="primary" fontWeight={600}>
                {data.records}
              </Typography>
            </Box>
            <Box sx={{ textAlign: 'right' }}>
              <Typography variant="caption" color="text.secondary">
                Last Updated
              </Typography>
              <Typography variant="body2">{data.lastUpdated}</Typography>
            </Box>
          </Box>

          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              mt: 1,
              p: 1,
              borderRadius: 1,
              bgcolor:
                theme.palette.mode === 'dark'
                  ? alpha(theme.palette.primary.main, 0.1)
                  : alpha(theme.palette.primary.light, 0.1)
            }}
          >
            <Icon icon="mdi:chart-line" color={theme.palette.primary.main} width={20} height={20} />
            <Typography variant="caption" sx={{ ml: 1, color: theme.palette.primary.main }}>
              View Details
            </Typography>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
};

APXDataCard.propTypes = {
  data: PropTypes.object.isRequired,
  onClick: PropTypes.func
};

// APX Data Table component
const APXDataTable = ({ data }) => {
  const theme = useTheme();

  return (
    <TableContainer
      component={Paper}
      sx={{
        mt: 3,
        border: 1,
        borderColor: 'divider',
        borderRadius: 1,
        boxShadow: 'none'
      }}
    >
      <Table>
        <TableHead>
          <TableRow sx={{ bgcolor: alpha(theme.palette.primary.main, 0.05) }}>
            <TableCell>Account Name</TableCell>
            <TableCell align="right">Records Count</TableCell>
            <TableCell align="center">Last Upload Time</TableCell>
            <TableCell align="center">Status</TableCell>
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
                      bgcolor: row.status === 'Active' ? theme.palette.success.light : theme.palette.grey[300]
                    }}
                  >
                    <Icon icon={row.icon || 'mdi:file'} width={16} />
                  </Avatar>
                  <Typography variant="body2" fontWeight={500}>
                    {row.name}
                  </Typography>
                </Box>
              </TableCell>
              <TableCell align="right">
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
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

APXDataTable.propTypes = {
  data: PropTypes.array.isRequired
};

// APX Tab title with info tooltip
const APXTabTitle = ({ title, tooltipText }) => (
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

APXTabTitle.propTypes = {
  title: PropTypes.string.isRequired,
  tooltipText: PropTypes.string.isRequired
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

TitleWithInfo.propTypes = {
  title: PropTypes.string.isRequired,
  tooltipText: PropTypes.string.isRequired
};

// Data category card component
const DataCategoryCard = ({ data, onClick, isActive }) => {
  const theme = useTheme();
  const [isHovered, setIsHovered] = useState(false);

  // Generate random chart/preview data
  const getRandomChartData = () => {
    const dataType = Math.floor(Math.random() * 3);
    switch (dataType) {
      case 0: // Bar chart preview
        return (
          <Box sx={{ display: 'flex', height: 40, alignItems: 'flex-end', justifyContent: 'space-between' }}>
            {[...Array(6)].map((_, i) => (
              <Box
                key={i}
                sx={{
                  height: `${20 + Math.random() * 20}px`,
                  width: 8,
                  bgcolor: alpha(data.color, 0.7 - i * 0.1),
                  borderTopLeftRadius: 3,
                  borderTopRightRadius: 3
                }}
              />
            ))}
          </Box>
        );
      case 1: // Line chart preview
        return (
          <Box sx={{ height: 40, position: 'relative', mt: 1 }}>
            <Box
              sx={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'flex-end'
              }}
            >
              <Box
                sx={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  height: '100%',
                  width: '100%'
                }}
              >
                <svg width="100%" height="100%" viewBox="0 0 100 40" preserveAspectRatio="none">
                  <path
                    d={`M0,40 L0,${30 - Math.random() * 15} C${10 + Math.random() * 10},${15 + Math.random() * 10} ${20 + Math.random() * 10},${20 + Math.random() * 10} ${30 + Math.random() * 5},${15 + Math.random() * 10} S${50 + Math.random() * 10},${5 + Math.random() * 10} ${70 + Math.random() * 10},${10 + Math.random() * 10} S${90 + Math.random() * 5},${20 + Math.random() * 10} 100,${5 + Math.random() * 20} V40 Z`}
                    fill={alpha(data.color, 0.2)}
                    stroke={alpha(data.color, 0.8)}
                    strokeWidth="2"
                  />
                </svg>
              </Box>
            </Box>
          </Box>
        );
      default: // Pie chart preview
        return (
          <Box sx={{ height: 40, position: 'relative', mt: 1 }}>
            <Box
              sx={{
                position: 'absolute',
                left: '50%',
                transform: 'translateX(-50%)',
                width: 40,
                height: 40,
                borderRadius: '50%',
                overflow: 'hidden',
                display: 'flex'
              }}
            >
              <Box sx={{ width: '60%', height: '100%', bgcolor: alpha(data.color, 0.8) }} />
              <Box sx={{ width: '40%', height: '100%', bgcolor: alpha(data.color, 0.4) }} />
              <Box
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  borderRadius: '50%',
                  border: `2px solid ${theme.palette.background.paper}`
                }}
              />
            </Box>
          </Box>
        );
    }
  };

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
            {data.title.substring(0, 1)}
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
            transition: 'transform 0.3s',
            transform: isHovered ? 'scale(1.02)' : 'scale(1)'
          }}
        >
          {getRandomChartData()}
        </Paper>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Avatar
              src={data.ownerAvatar}
              sx={{
                width: 24,
                height: 24,
                mr: 1,
                border: `2px solid ${theme.palette.background.paper}`
              }}
            />
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

      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ p: 2, pt: 1.5, pb: 1.5 }}>
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
      </Stack>
    </Card>
  );
};

DataCategoryCard.propTypes = {
  data: PropTypes.object.isRequired,
  onClick: PropTypes.func,
  isActive: PropTypes.bool
};

// FileDropzone component for batch uploads
const FileDropzone = ({ onFilesAdded, custodianType, color }) => {
  const theme = useTheme();
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const fileInputRef = useRef(null);

  // Accepted file types
  const acceptedTypes = {
    'application/vnd.ms-excel': true,
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': true,
    'text/csv': true,
    'application/pdf': true,
    'application/json': true
  };

  const extensions = ['.xlsx', '.xls', '.csv', '.pdf', '.json'];

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const validateFiles = (files) => {
    return Array.from(files).filter((file) => {
      // Check file type
      const fileType = file.type;
      const extension = '.' + file.name.split('.').pop().toLowerCase();

      if (!acceptedTypes[fileType] && !extensions.includes(extension)) {
        // Show error for invalid file type
        Swal.fire({
          icon: 'error',
          title: 'Invalid File Type',
          text: `"${file.name}" is not a supported file type. Please upload Excel, CSV, PDF or JSON files.`
        });
        return false;
      }

      // Check file size (10MB max)
      if (file.size > 10 * 1024 * 1024) {
        Swal.fire({
          icon: 'error',
          title: 'File Too Large',
          text: `"${file.name}" exceeds the 10MB size limit.`
        });
        return false;
      }

      return true;
    });
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const droppedFiles = e.dataTransfer.files;
    if (droppedFiles?.length > 0) {
      const validFiles = validateFiles(droppedFiles);

      if (validFiles.length > 0) {
        setSelectedFiles((prev) => [...prev, ...validFiles]);
        onFilesAdded(validFiles, custodianType);
      }
    }
  };

  const handleFileSelect = (e) => {
    const selectedFiles = e.target.files;
    if (selectedFiles?.length > 0) {
      const validFiles = validateFiles(selectedFiles);

      if (validFiles.length > 0) {
        setSelectedFiles((prev) => [...prev, ...validFiles]);
        onFilesAdded(validFiles, custodianType);
      }
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleRemoveFile = (index) => {
    const newFiles = [...selectedFiles];
    newFiles.splice(index, 1);
    setSelectedFiles(newFiles);
  };

  return (
    <Box sx={{ mt: 2 }}>
      <Paper
        elevation={0}
        onDragEnter={handleDragEnter}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        sx={{
          border: '2px dashed',
          borderColor: isDragging ? color : alpha(theme.palette.divider, 0.8),
          borderRadius: 2,
          bgcolor: isDragging ? alpha(color, 0.04) : 'background.paper',
          transition: 'all 0.3s ease',
          p: 3,
          textAlign: 'center',
          cursor: 'pointer'
        }}
        onClick={handleButtonClick}
      >
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: 'none' }}
          multiple
          onChange={handleFileSelect}
          accept=".xlsx,.xls,.csv,.pdf,.json"
        />

        <Box sx={{ mb: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Avatar
            sx={{
              width: 60,
              height: 60,
              bgcolor: alpha(color, 0.1),
              color: color,
              mb: 2
            }}
          >
            <Icon icon={isDragging ? 'mdi:file-upload' : 'mdi:file-multiple'} width={32} />
          </Avatar>

          <Typography variant="h6" sx={{ mb: 1 }}>
            {isDragging ? 'Drop files here' : `Upload ${custodianType} Files`}
          </Typography>

          <Typography variant="body2" color="text.secondary">
            Drag & drop files here, or click to browse
          </Typography>

          <Typography variant="caption" color="text.secondary" sx={{ mt: 1 }}>
            Accepts Excel, CSV, PDF and JSON files (max 10MB each)
          </Typography>
        </Box>

        <Button
          variant="outlined"
          startIcon={<Icon icon="mdi:file-plus" />}
          sx={{
            borderColor: alpha(color, 0.5),
            color: color,
            '&:hover': {
              borderColor: color,
              bgcolor: alpha(color, 0.1)
            }
          }}
        >
          Select Files
        </Button>
      </Paper>

      {selectedFiles.length > 0 && (
        <Box sx={{ mt: 2 }}>
          <Typography variant="subtitle2" sx={{ mb: 1 }}>
            Selected Files ({selectedFiles.length})
          </Typography>

          <Paper variant="outlined" sx={{ maxHeight: 200, overflow: 'auto', p: 1 }}>
            {selectedFiles.map((file, index) => (
              <FileItem
                key={index}
                file={file}
                onRemove={() => handleRemoveFile(index)}
                progress={file.progress || undefined}
              />
            ))}
          </Paper>

          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
            <Button
              variant="contained"
              color="success"
              startIcon={<Icon icon="mdi:cloud-upload" />}
              sx={{ mr: 1 }}
              onClick={() => onFilesAdded(selectedFiles, custodianType, true)}
            >
              Upload All Files
            </Button>

            <Button
              variant="outlined"
              color="error"
              startIcon={<Icon icon="mdi:delete" />}
              onClick={() => setSelectedFiles([])}
            >
              Clear All
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
};

FileDropzone.propTypes = {
  onFilesAdded: PropTypes.func.isRequired,
  custodianType: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired
};

// RecentUploads component
const RecentUploads = ({ data, onReuse }) => {
  const theme = useTheme();

  return (
    <Paper
      elevation={0}
      sx={{
        mt: 3,
        p: 2,
        border: '1px solid',
        borderColor: theme.palette.divider,
        borderRadius: 2
      }}
    >
      <Typography variant="h6" sx={{ mb: 2 }}>
        Recent Uploads
      </Typography>

      <Grid container spacing={2}>
        {data.map((item, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Paper
              variant="outlined"
              sx={{
                p: 2,
                borderRadius: 1,
                display: 'flex',
                alignItems: 'center',
                transition: 'all 0.2s',
                '&:hover': {
                  boxShadow: theme.shadows[2],
                  borderColor: alpha(theme.palette.primary.main, 0.5),
                  bgcolor: alpha(theme.palette.primary.main, 0.02)
                }
              }}
            >
              <Avatar sx={{ bgcolor: alpha(item.color, 0.1), color: item.color, mr: 2 }}>
                <Icon icon={item.icon} width={20} />
              </Avatar>

              <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                <Typography variant="subtitle2" noWrap>
                  {item.name}
                </Typography>
                <Typography variant="caption" color="text.secondary" noWrap>
                  {item.date} • {item.files} files
                </Typography>
              </Box>

              <Tooltip title="Reuse files">
                <IconButton size="small" color="primary" onClick={() => onReuse(item)}>
                  <Icon icon="mdi:reload" width={18} />
                </IconButton>
              </Tooltip>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
};

RecentUploads.propTypes = {
  data: PropTypes.array.isRequired,
  onReuse: PropTypes.func.isRequired
};

// CustodianUploadAction component
const CustodianUploadAction = ({ title, icon, color, onUpload }) => {
  const theme = useTheme();
  const [isHovered, setIsHovered] = useState(false);
  const [isDropping, setIsDropping] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [isValidating, setIsValidating] = useState(false);
  const fileInputRef = useRef(null);

  // Accepted file types
  const acceptedTypes = {
    'application/vnd.ms-excel': true,
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': true,
    'text/csv': true,
    'application/pdf': true,
    'application/json': true
  };

  const extensions = ['.xlsx', '.xls', '.csv', '.pdf', '.json'];
  const maxFileSize = 10 * 1024 * 1024; // 10MB

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDropping(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDropping(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const validateFiles = (files) => {
    setIsValidating(true);
    const validFiles = [];
    const errors = [];

    Array.from(files).forEach((file) => {
      // Check file type
      const fileType = file.type;
      const extension = '.' + file.name.split('.').pop().toLowerCase();

      if (!acceptedTypes[fileType] && !extensions.includes(extension)) {
        errors.push(`"${file.name}" is not a supported file type. Please upload Excel, CSV, PDF or JSON files.`);
        return;
      }

      // Check file size (10MB max)
      if (file.size > maxFileSize) {
        errors.push(`"${file.name}" exceeds the 10MB size limit.`);
        return;
      }

      validFiles.push(file);
    });

    setIsValidating(false);

    if (errors.length > 0) {
      Swal.fire({
        icon: 'error',
        title: 'Invalid Files',
        html: errors.join('<br>'),
        confirmButtonText: 'Got it'
      });
    }

    return validFiles;
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDropping(false);

    // Simulate file handling
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const validFiles = validateFiles(e.dataTransfer.files);
      if (validFiles.length > 0) {
        setSelectedFiles(validFiles);
        if (validFiles.length > 0) {
          Swal.fire({
            icon: 'success',
            title: 'Files Ready',
            text: `${validFiles.length} files selected for upload. Click "Upload ${title} Data" to continue.`,
            confirmButtonText: 'OK'
          });
        }
      }
    }
  };

  const handleFileInputChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const validFiles = validateFiles(e.target.files);
      if (validFiles.length > 0) {
        setSelectedFiles(validFiles);
        if (validFiles.length > 0) {
          Swal.fire({
            icon: 'success',
            title: 'Files Ready',
            text: `${validFiles.length} files selected for upload. Click "Upload ${title} Data" to continue.`,
            confirmButtonText: 'OK'
          });
        }
      }
    }
  };

  const handleButtonClick = () => {
    if (selectedFiles.length > 0) {
      Swal.fire({
        title: `Upload ${title} Data?`,
        text: `You are about to upload ${selectedFiles.length} files. Do you want to continue?`,
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Yes, Upload',
        cancelButtonText: 'Cancel'
      }).then((result) => {
        if (result.isConfirmed) {
          onUpload(title);
          // Clear selected files after upload
          setTimeout(() => {
            setSelectedFiles([]);
          }, 2000);
        }
      });
    } else {
      fileInputRef.current.click();
    }
  };

  return (
    <Card
      elevation={isDropping ? 8 : isHovered ? 4 : 0}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      sx={{
        border: 1,
        borderStyle: isDropping ? 'dashed' : 'solid',
        borderWidth: isDropping ? 2 : 1,
        borderColor: isDropping ? color : 'divider',
        transition: 'all 0.3s ease',
        transform: isHovered ? 'translateY(-4px)' : 'none',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        overflow: 'hidden',
        bgcolor: isDropping ? alpha(color, 0.05) : 'background.paper',
        '&:hover': {
          boxShadow: theme.shadows[5],
          borderColor: alpha(color, 0.5)
        }
      }}
    >
      {isDropping && (
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            bgcolor: alpha(color, 0.1),
            zIndex: 10
          }}
        >
          <Icon icon="mdi:cloud-upload" width={48} height={48} style={{ color, marginBottom: 8 }} />
          <Typography variant="h6" color={color} sx={{ fontWeight: 600 }}>
            Drop files here
          </Typography>
        </Box>
      )}

      <CardContent sx={{ p: 3, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Avatar
            sx={{
              width: 48,
              height: 48,
              bgcolor: alpha(color, 0.1),
              color: color,
              mr: 2,
              transition: 'all 0.3s',
              transform: isHovered ? 'scale(1.1)' : 'scale(1)'
            }}
          >
            <Icon icon={icon} width={28} height={28} />
          </Avatar>
          <Box>
            <Typography variant="h5">{title}</Typography>
            <Typography variant="body2" color="text.secondary">
              {selectedFiles.length > 0 ? `${selectedFiles.length} files selected` : 'Click or drop files here'}
            </Typography>
          </Box>
        </Box>

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            py: 2,
            flexGrow: 1,
            borderRadius: 1,
            border: '1px dashed',
            borderColor: selectedFiles.length > 0 ? alpha(theme.palette.success.main, 0.5) : alpha(color, 0.3),
            bgcolor: selectedFiles.length > 0 ? alpha(theme.palette.success.main, 0.05) : alpha(color, 0.02),
            transition: 'all 0.2s'
          }}
        >
          {isValidating ? (
            <CircularProgress size={40} sx={{ color: alpha(color, 0.6), mb: 1 }} />
          ) : selectedFiles.length > 0 ? (
            <>
              <Icon
                icon="mdi:check-circle"
                width={40}
                height={40}
                style={{
                  color: theme.palette.success.main,
                  marginBottom: 8
                }}
              />
              <Typography variant="body2" color="success.main" align="center" sx={{ fontWeight: 500 }}>
                Files selected
              </Typography>
              <Box sx={{ mt: 1, display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                {selectedFiles.slice(0, 3).map((file, index) => (
                  <Chip
                    key={index}
                    label={file.name.length > 15 ? file.name.substring(0, 12) + '...' : file.name}
                    size="small"
                    icon={
                      <Icon
                        icon={file.type.includes('excel') || file.name.endsWith('.csv') ? 'mdi:file-excel' : 'mdi:file'}
                      />
                    }
                    sx={{ m: 0.5 }}
                  />
                ))}
                {selectedFiles.length > 3 && (
                  <Chip label={`+${selectedFiles.length - 3} more`} size="small" sx={{ m: 0.5 }} />
                )}
              </Box>
            </>
          ) : (
            <>
              <Icon
                icon="mdi:file-upload-outline"
                width={40}
                height={40}
                style={{
                  color: alpha(color, 0.6),
                  marginBottom: 8
                }}
              />
              <Typography variant="body2" color="text.secondary" align="center">
                Drag & drop your {title} files
                <br />
                or click to browse
              </Typography>
              <Typography variant="caption" color="text.secondary" sx={{ mt: 1 }}>
                Accepts Excel, CSV, PDF, JSON • Max 10MB
              </Typography>
            </>
          )}
        </Box>

        <input
          type="file"
          ref={fileInputRef}
          style={{ display: 'none' }}
          multiple
          onChange={handleFileInputChange}
          accept=".xlsx,.xls,.csv,.pdf,.json"
        />

        <Button
          fullWidth
          variant="contained"
          sx={{
            bgcolor: color,
            mt: 2,
            py: 1.2,
            boxShadow: isHovered ? theme.shadows[4] : theme.shadows[1],
            '&:hover': {
              bgcolor: alpha(color, 0.8)
            }
          }}
          startIcon={
            selectedFiles.length > 0 ? (
              <Icon icon="mdi:check-circle" width={20} />
            ) : (
              <Icon icon="mdi:upload" width={20} />
            )
          }
          onClick={handleButtonClick}
          endIcon={selectedFiles.length > 0 && <Icon icon="mdi:arrow-right" width={20} />}
        >
          {selectedFiles.length > 0 ? 'Continue Upload' : `Upload ${title} Data`}
        </Button>
      </CardContent>
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

                    <List dense disablePadding>
                      <ListItem disableGutters divider sx={{ pb: 1.5, pt: 1 }}>
                        <ListItemIcon sx={{ minWidth: 36 }}>
                          <Icon icon="mdi:calendar" width={20} />
                        </ListItemIcon>
                        <ListItemText
                          primary="Upload Date"
                          secondary={detailsModal.data.lastUpload}
                          primaryTypographyProps={{ variant: 'body2', color: 'text.secondary' }}
                          secondaryTypographyProps={{ variant: 'body2', fontWeight: 500 }}
                        />
                      </ListItem>
                      <ListItem disableGutters divider sx={{ pb: 1.5, pt: 1 }}>
                        <ListItemIcon sx={{ minWidth: 36 }}>
                          <Icon icon="mdi:account" width={20} />
                        </ListItemIcon>
                        <ListItemText
                          primary="Uploaded By"
                          secondary="Md Altaf Raja"
                          primaryTypographyProps={{ variant: 'body2', color: 'text.secondary' }}
                          secondaryTypographyProps={{ variant: 'body2', fontWeight: 500 }}
                        />
                      </ListItem>
                      <ListItem disableGutters divider sx={{ pb: 1.5, pt: 1 }}>
                        <ListItemIcon sx={{ minWidth: 36 }}>
                          <Icon icon="mdi:file-multiple" width={20} />
                        </ListItemIcon>
                        <ListItemText
                          primary="File Count"
                          secondary="3 files"
                          primaryTypographyProps={{ variant: 'body2', color: 'text.secondary' }}
                          secondaryTypographyProps={{ variant: 'body2', fontWeight: 500 }}
                        />
                      </ListItem>
                      <ListItem disableGutters sx={{ pb: 0, pt: 1 }}>
                        <ListItemIcon sx={{ minWidth: 36 }}>
                          <Icon icon="mdi:file-check" width={20} />
                        </ListItemIcon>
                        <ListItemText
                          primary="Processing Time"
                          secondary="45 seconds"
                          primaryTypographyProps={{ variant: 'body2', color: 'text.secondary' }}
                          secondaryTypographyProps={{ variant: 'body2', fontWeight: 500 }}
                        />
                      </ListItem>
                    </List>
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

DataTable.propTypes = {
  data: PropTypes.array.isRequired
};

// Notification Bar component
const NotificationBar = ({ notification, onClose }) => {
  const theme = useTheme();

  if (!notification.show) return null;

  const getIcon = () => {
    switch (notification.type) {
      case 'success':
        return <Icon icon="mdi:check-circle" width={24} style={{ color: theme.palette.success.main }} />;
      case 'error':
        return <Icon icon="mdi:alert-circle" width={24} style={{ color: theme.palette.error.main }} />;
      case 'warning':
        return <Icon icon="mdi:alert" width={24} style={{ color: theme.palette.warning.main }} />;
      default:
        return <Icon icon="mdi:information" width={24} style={{ color: theme.palette.info.main }} />;
    }
  };

  return (
    <Snackbar open={notification.show} anchorOrigin={{ vertical: 'top', horizontal: 'center' }} sx={{ top: 20 }}>
      <Alert
        severity={notification.type}
        variant="filled"
        icon={false}
        onClose={onClose}
        sx={{
          width: '100%',
          maxWidth: 500,
          boxShadow: theme.shadows[3],
          display: 'flex',
          alignItems: 'center',
          borderRadius: 2,
          '& .MuiAlert-message': { width: '100%' }
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
          <Box sx={{ mr: 1.5 }}>{getIcon()}</Box>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 500, mb: notification.progress ? 1 : 0 }}>
              {notification.message}
            </Typography>

            {notification.progress !== undefined && (
              <LinearProgress
                variant={notification.progress === 0 ? 'indeterminate' : 'determinate'}
                value={notification.progress}
                color={notification.type === 'success' ? 'success' : 'primary'}
                sx={{
                  mt: 1,
                  height: 6,
                  borderRadius: 3,
                  backgroundColor: alpha(theme.palette.common.white, 0.2)
                }}
              />
            )}
          </Box>

          {notification.action && notification.progress === 100 && (
            <Button
              size="small"
              variant="contained"
              color="inherit"
              onClick={notification.action}
              sx={{ ml: 2, minWidth: 'auto', color: 'primary.main', bgcolor: 'white' }}
            >
              View
            </Button>
          )}
        </Box>
      </Alert>
    </Snackbar>
  );
};

NotificationBar.propTypes = {
  notification: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired
};

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

DataSummary.propTypes = {
  onFilterClick: PropTypes.func.isRequired
};

// Upload Steps Component
const UploadSteps = ({ activeStep }) => {
  const theme = useTheme();

  const steps = [
    { label: 'Select Custodian', icon: 'mdi:folder-multiple' },
    { label: 'Upload Files', icon: 'mdi:cloud-upload' },
    { label: 'Processing', icon: 'mdi:cog' },
    { label: 'Complete', icon: 'mdi:check-circle' }
  ];

  return (
    <Paper
      elevation={0}
      sx={{
        p: 2.5,
        mb: 3,
        borderRadius: 2,
        bgcolor: alpha(theme.palette.primary.main, 0.03),
        border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          position: 'relative'
        }}
      >
        {/* Connecting line */}
        <Box
          sx={{
            position: 'absolute',
            top: 20,
            left: 32,
            right: 32,
            height: 4,
            bgcolor: alpha(theme.palette.divider, 0.6),
            zIndex: 0
          }}
        />

        {/* Steps */}
        {steps.map((step, index) => (
          <Box
            key={index}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              position: 'relative',
              zIndex: 1
            }}
          >
            <Avatar
              sx={{
                width: 40,
                height: 40,
                bgcolor:
                  index <= activeStep
                    ? index === activeStep
                      ? theme.palette.primary.main
                      : theme.palette.success.main
                    : alpha(theme.palette.text.secondary, 0.1),
                color: index <= activeStep ? 'white' : theme.palette.text.secondary,
                mb: 1,
                transition: 'all 0.3s',
                transform: index === activeStep ? 'scale(1.1)' : 'scale(1)',
                boxShadow: index === activeStep ? theme.shadows[4] : 'none'
              }}
            >
              <Icon icon={step.icon} width={24} />
            </Avatar>
            <Typography
              variant="body2"
              sx={{
                fontWeight: index <= activeStep ? 600 : 400,
                color: index <= activeStep ? 'text.primary' : 'text.secondary'
              }}
            >
              {step.label}
            </Typography>
          </Box>
        ))}
      </Box>
    </Paper>
  );
};

UploadSteps.propTypes = {
  activeStep: PropTypes.number.isRequired
};

// Main component
const ModernUploadFiles = () => {
  const theme = useTheme();
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [files, setFiles] = useState([]);
  const [uploadProgress, setUploadProgress] = useState({});
  const [notification, setNotification] = useState({ message: '', type: '', progress: 0, show: false });
  const [currentView, setCurrentView] = useState('upload'); // 'upload' or 'view'
  const [activeTab, setActiveTab] = useState('custodian'); // 'custodian' or 'apx'
  const [selectedDataCategory, setSelectedDataCategory] = useState(null);
  const [uploadStep, setUploadStep] = useState(0); // Track upload step for the progress indicator
  const [activeFilter, setActiveFilter] = useState(null); // New state to track active filter
  const [recentUploads, setRecentUploads] = useState([
    {
      id: 1,
      name: 'Monthly Reports',
      date: '2025-05-29',
      files: 5,
      icon: 'mdi:bank',
      color: theme.palette.primary.main,
      custodian: 'Albilad'
    },
    {
      id: 2,
      name: 'Transaction Data',
      date: '2025-05-28',
      files: 3,
      icon: 'mdi:city',
      color: theme.palette.secondary.main,
      custodian: 'Riyadh'
    },
    {
      id: 3,
      name: 'Portfolio Summary',
      date: '2025-05-26',
      files: 2,
      icon: 'mdi:office-building',
      color: '#FF9800',
      custodian: 'AT'
    }
  ]);

  // Process instructions for tooltips
  const processInstructions = {
    custodian: `
      1. Select the custodian type (Albilad, Riyadh, or AT)
      2. Click the upload button for the selected custodian
      3. Wait for confirmation of successful data upload
      4. Switch to View Data to see the uploaded information
    `,
    apx: `
      1. Click the "Load APX Data" button to initiate the server-side process
      2. Wait for confirmation of successful data loading
      3. Switch to View Data to see the loaded APX data
      4. Click on data cards to see detailed information
    `
  };

  // Custodian upload options
  const custodianOptions = [
    {
      title: 'Albilad',
      icon: 'mdi:bank',
      color: theme.palette.primary.main,
      handler: () => handleCustodianUpload('Albilad')
    },
    {
      title: 'Riyadh',
      icon: 'mdi:city',
      color: theme.palette.secondary.main,
      handler: () => handleCustodianUpload('Riyadh')
    },
    {
      title: 'AT',
      icon: 'mdi:office-building',
      color: '#FF9800', // Orange
      handler: () => handleCustodianUpload('AT')
    }
  ];

  // Data categories for View Data page
  const dataCategories = [
    {
      id: 'albilad',
      title: 'Albilad Data',
      owner: 'Md Altaf Raja',
      ownerAvatar: '/static/images/avatar/1.jpg',
      records: '2,458',
      lastUpdated: '2025-05-29 14:30 PM',
      color: theme.palette.primary.main,
      status: 'active'
    },
    {
      id: 'riyadh',
      title: 'Riyadh Data',
      owner: 'Md Altaf Raja',
      ownerAvatar: '/static/images/avatar/2.jpg',
      records: '1,872',
      lastUpdated: '2025-05-30 09:15 AM',
      color: theme.palette.secondary.main,
      status: 'active'
    },
    {
      id: 'at',
      title: 'AT Data',
      owner: 'Md Altaf Raja',
      ownerAvatar: '/static/images/avatar/3.jpg',
      records: '945',
      lastUpdated: '2025-05-28 16:45 PM',
      color: '#FF9800', // Orange
      status: 'inactive'
    },
    {
      id: 'apx',
      title: 'APX Data',
      owner: 'Sayantan Roy',
      ownerAvatar: '/static/images/avatar/4.jpg',
      records: '1,234',
      lastUpdated: '2025-05-31 10:45 AM',
      color: '#4CAF50', // Green
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

  // Utility function for alerts
  const showAlert = (icon, title, text) => {
    Swal.fire({ icon, title, text });
  };

  // Custodian upload handler
  const handleCustodianUpload = (custodianType) => {
    // Set to upload step
    setUploadStep(1);

    // Show an uploading notification with indeterminate progress first
    setNotification({
      message: `${custodianType} data upload initiated`,
      type: 'info',
      progress: 0,
      show: true
    });

    // Simulate upload progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.floor(Math.random() * 15) + 5; // Random progress between 5-20%

      if (progress >= 50 && uploadStep < 2) {
        // Move to processing step
        setUploadStep(2);
      }

      if (progress >= 100) {
        clearInterval(interval);
        progress = 100;

        // Set to complete step
        setUploadStep(3);

        // Show success notification after completion
        setTimeout(() => {
          setNotification({
            message: `${custodianType} data uploaded successfully`,
            type: 'success',
            progress: 100,
            show: true,
            action: () => setCurrentView('view')
          });

          // Auto clear notification after 5 seconds
          setTimeout(() => {
            handleCloseNotification();
          }, 5000);
        }, 500);
      } else {
        setNotification({
          message: `Uploading ${custodianType} data...`,
          type: 'info',
          progress,
          show: true
        });
      }
    }, 800); // Update progress every 800ms
  };

  // APX data load handler
  const handleLoadAPXData = () => {
    // Show an initial loading notification
    setNotification({
      message: 'APX Data loading initiated',
      type: 'info',
      progress: 0,
      show: true
    });

    // Simulate multi-step process
    const steps = [
      { message: 'Connecting to APX server...', progress: 10 },
      { message: 'Authenticating connection...', progress: 25 },
      { message: 'Retrieving data catalog...', progress: 40 },
      { message: 'Processing APX data files...', progress: 60 },
      { message: 'Validating data integrity...', progress: 80 },
      { message: 'Finalizing data import...', progress: 95 },
      { message: 'APX Data loaded successfully', progress: 100, type: 'success' }
    ];

    let stepIndex = 0;
    const processStep = () => {
      const currentStep = steps[stepIndex];

      setNotification({
        message: currentStep.message,
        type: currentStep.type || 'info',
        progress: currentStep.progress,
        show: true,
        ...(currentStep.progress === 100 ? { action: () => setCurrentView('view') } : {})
      });

      stepIndex++;

      if (stepIndex < steps.length) {
        // Process next step after delay
        setTimeout(processStep, 1000);
      } else {
        // Auto clear notification after completion
        setTimeout(() => {
          handleCloseNotification();
        }, 5000);
      }
    };

    // Start the process
    setTimeout(processStep, 500);
  };

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
      message: `Filtered to show only ${filterType} data`,
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

    // Remove notification completely after animation
    setTimeout(() => {
      setNotification({ message: '', type: '', progress: 0, show: false });
    }, 300);
  };

  // Reset upload state when tab changes
  const handleTabChange = (e, newValue) => {
    setActiveTab(newValue);
    setUploadStep(0); // Reset upload steps
  };

  // Handle reuse of previously uploaded files
  const handleReuseFiles = (item) => {
    Swal.fire({
      title: `Reuse ${item.name}?`,
      text: `Do you want to reuse the ${item.files} files from ${item.date}?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, Reuse Files',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        handleCustodianUpload(item.custodian);
      }
    });
  };

  return (
    <Grid container spacing={3}>
      {/* Notification */}
      <NotificationBar notification={notification} onClose={handleCloseNotification} />

      {/* Main content - full width */}
      <Grid item xs={12}>
        <MainCard
          title={currentView === 'upload' ? 'Upload Data' : 'View Data'}
          secondary={
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button
                variant={currentView === 'upload' ? 'contained' : 'outlined'}
                startIcon={<Icon icon="mdi:cloud-upload" />}
                onClick={() => setCurrentView('upload')}
                color="primary"
              >
                Upload Data
              </Button>
              <Button
                variant={currentView === 'view' ? 'contained' : 'outlined'}
                startIcon={<Icon icon="mdi:eye" />}
                onClick={() => setCurrentView('view')}
                color="secondary"
              >
                View Data
              </Button>
            </Box>
          }
          sx={{
            '& .MuiCardHeader-root': {
              p: 2.5
            }
          }}
        >
          {/* Upload Data View */}
          {currentView === 'upload' && (
            <>
              {/* Tab selection */}
              <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
                <Tabs
                  value={activeTab}
                  onChange={handleTabChange}
                  aria-label="upload tabs"
                  sx={{
                    '& .MuiTabs-indicator': {
                      height: 3,
                      borderTopLeftRadius: 3,
                      borderTopRightRadius: 3
                    },
                    '& .Mui-selected': {
                      fontWeight: 600
                    }
                  }}
                >
                  <Tab
                    icon={<Icon icon="mdi:folder-multiple" width={20} />}
                    iconPosition="start"
                    label="Custodian"
                    value="custodian"
                    sx={{ minHeight: 48, px: 2 }}
                  />
                  <Tab
                    icon={<Icon icon="mdi:chart-box" width={20} />}
                    iconPosition="start"
                    label="APX"
                    value="apx"
                    sx={{ minHeight: 48, px: 2 }}
                  />
                </Tabs>
              </Box>

              {/* Custodian Tab */}
              {activeTab === 'custodian' && (
                <>
                  <Box sx={{ mt: 1, mb: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <Typography variant="body1" color="text.secondary" sx={{ mr: 1 }}>
                        Select a custodian and upload its data
                      </Typography>
                      <Tooltip
                        title={
                          <Box sx={{ p: 0.5 }}>
                            <Typography variant="subtitle2" sx={{ mb: 1 }}>
                              Custodian Upload Instructions:
                            </Typography>
                            <Typography component="div" variant="body2">
                              1. Select the custodian type (Albilad, Riyadh, or AT)
                              <br />
                              2. Click the upload button for the selected custodian
                              <br />
                              3. Wait for confirmation of successful data upload
                              <br />
                              4. Switch to View Data to see the uploaded information
                            </Typography>
                          </Box>
                        }
                        arrow
                        placement="right"
                        sx={{
                          '& .MuiTooltip-tooltip': {
                            maxWidth: 320,
                            bgcolor: (theme) =>
                              theme.palette.mode === 'dark'
                                ? alpha(theme.palette.primary.dark, 0.95)
                                : alpha(theme.palette.primary.light, 0.95),
                            color: (theme) =>
                              theme.palette.mode === 'dark' ? theme.palette.common.white : theme.palette.common.black,
                            boxShadow: (theme) => theme.shadows[3],
                            borderRadius: 1.5
                          }
                        }}
                      >
                        <IconButton size="small" color="primary">
                          <Icon icon="mdi:help-circle" width={20} />
                        </IconButton>
                      </Tooltip>
                    </Box>

                    <UploadSteps activeStep={uploadStep} />

                    <Grid container spacing={3} sx={{ mt: 2 }}>
                      {custodianOptions.map((option, index) => (
                        <Grid item xs={12} md={4} key={index}>
                          <CustodianUploadAction
                            title={option.title}
                            icon={option.icon}
                            color={option.color}
                            onUpload={option.handler}
                          />
                        </Grid>
                      ))}
                    </Grid>
                  </Box>
                </>
              )}

              {/* APX Tab */}
              {activeTab === 'apx' && (
                <>
                  <Box sx={{ mt: 1, mb: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <Typography variant="body1" color="text.secondary" sx={{ mr: 1 }}>
                        Connect to APX system and import financial data for reconciliation and reporting. The system
                        securely retrieves current portfolio data and prepares it for analysis.
                      </Typography>
                      <Tooltip
                        title={
                          <Box sx={{ p: 0.5 }}>
                            <Typography variant="subtitle2" sx={{ mb: 1 }}>
                              APX Process Instructions:
                            </Typography>
                            <Typography component="div" variant="body2">
                              1. Click the "Load APX Data" button to initiate the server-side process
                              <br />
                              2. Wait for confirmation of successful data loading
                              <br />
                              3. Switch to View Data to see the loaded APX data
                              <br />
                              4. Click on data cards to see detailed information
                            </Typography>
                          </Box>
                        }
                        arrow
                        placement="right"
                        sx={{
                          '& .MuiTooltip-tooltip': {
                            maxWidth: 320,
                            bgcolor: (theme) =>
                              theme.palette.mode === 'dark'
                                ? alpha(theme.palette.primary.dark, 0.95)
                                : alpha(theme.palette.primary.light, 0.95),
                            color: (theme) =>
                              theme.palette.mode === 'dark' ? theme.palette.common.white : theme.palette.common.black,
                            boxShadow: (theme) => theme.shadows[3],
                            borderRadius: 1.5
                          }
                        }}
                      >
                        <IconButton size="small" color="primary">
                          <Icon icon="mdi:help-circle" width={20} />
                        </IconButton>
                      </Tooltip>
                    </Box>

                    <Paper
                      elevation={0}
                      sx={{
                        mt: 3,
                        p: 0,
                        borderRadius: 2,
                        border: 1,
                        borderColor: alpha(theme.palette.success.main, 0.3),
                        overflow: 'hidden'
                      }}
                    >
                      <Box
                        sx={{
                          width: '100%',
                          height: 120,
                          position: 'relative',
                          bgcolor: alpha(theme.palette.success.main, 0.05),
                          borderBottom: 1,
                          borderColor: alpha(theme.palette.success.main, 0.2)
                        }}
                      >
                        <Box
                          sx={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}
                        >
                          <Box
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              flexDirection: 'column'
                            }}
                          >
                            <Box
                              sx={{
                                display: 'flex',
                                alignItems: 'center',
                                mb: 1
                              }}
                            >
                              <Box
                                sx={{
                                  display: 'flex',
                                  flexDirection: 'column',
                                  alignItems: 'center',
                                  mr: 2
                                }}
                              >
                                <Avatar
                                  sx={{
                                    width: 48,
                                    height: 48,
                                    bgcolor: alpha(theme.palette.success.main, 0.2),
                                    color: theme.palette.success.main,
                                    mb: 1
                                  }}
                                >
                                  <Icon icon="mdi:server" width={24} />
                                </Avatar>
                                <Typography variant="caption" color="text.secondary">
                                  APX Server
                                </Typography>
                              </Box>

                              <Box
                                sx={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  width: 80,
                                  height: 4,
                                  mx: 2,
                                  bgcolor: alpha(theme.palette.primary.main, 0.1),
                                  borderRadius: 2,
                                  position: 'relative',
                                  overflow: 'hidden'
                                }}
                              >
                                <Box
                                  sx={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    height: '100%',
                                    width: '30%',
                                    bgcolor: theme.palette.primary.main,
                                    animation: 'pulse 1.5s infinite',
                                    '@keyframes pulse': {
                                      '0%': {
                                        transform: 'translateX(-100%)'
                                      },
                                      '100%': {
                                        transform: 'translateX(400%)'
                                      }
                                    }
                                  }}
                                />
                              </Box>

                              <Box
                                sx={{
                                  display: 'flex',
                                  flexDirection: 'column',
                                  alignItems: 'center',
                                  ml: 2
                                }}
                              >
                                <Avatar
                                  sx={{
                                    width: 48,
                                    height: 48,
                                    bgcolor: alpha(theme.palette.primary.main, 0.2),
                                    color: theme.palette.primary.main,
                                    mb: 1
                                  }}
                                >
                                  <Icon icon="mdi:database" width={24} />
                                </Avatar>
                                <Typography variant="caption" color="text.secondary">
                                  Your System
                                </Typography>
                              </Box>
                            </Box>

                            {/* Add system status indicator */}
                            <Box
                              sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                mt: 1
                              }}
                            >
                              <Box
                                sx={{
                                  width: 10,
                                  height: 10,
                                  borderRadius: '50%',
                                  bgcolor: theme.palette.success.main,
                                  mr: 1
                                }}
                              />
                              <Typography variant="caption" color="success.main">
                                System Ready
                              </Typography>
                              <Divider orientation="vertical" flexItem sx={{ mx: 2, height: 14 }} />
                              <Icon
                                icon="mdi:clock-outline"
                                width={14}
                                style={{ color: theme.palette.text.secondary, marginRight: 4 }}
                              />
                              <Typography variant="caption" color="text.secondary">
                                Last sync: Today, 10:45 AM
                              </Typography>
                            </Box>
                          </Box>
                        </Box>
                      </Box>
                    </Paper>
                  </Box>

                  <Box sx={{ p: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Avatar
                        sx={{
                          bgcolor: theme.palette.success.main,
                          mr: 2,
                          width: 44,
                          height: 44
                        }}
                      >
                        <Icon icon="mdi:database-import" width={24} />
                      </Avatar>
                      <Box>
                        <Typography variant="h5">APX Data Loading</Typography>
                        <Typography variant="body2" color="text.secondary">
                          Load financial data from APX system
                        </Typography>
                      </Box>
                    </Box>

                    {/* Data types section */}
                    <Box sx={{ mb: 3, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                      <Chip
                        icon={<Icon icon="mdi:file-chart" width={16} />}
                        label="Portfolio Data"
                        size="small"
                        sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1) }}
                      />
                      <Chip
                        icon={<Icon icon="mdi:chart-timeline" width={16} />}
                        label="Transactions"
                        size="small"
                        sx={{ bgcolor: alpha(theme.palette.secondary.main, 0.1) }}
                      />
                      <Chip
                        icon={<Icon icon="mdi:currency-usd" width={16} />}
                        label="Holdings"
                        size="small"
                        sx={{ bgcolor: alpha(theme.palette.info.main, 0.1) }}
                      />
                      <Chip
                        icon={<Icon icon="mdi:account-cash" width={16} />}
                        label="Cash Balances"
                        size="small"
                        sx={{ bgcolor: alpha(theme.palette.warning.main, 0.1) }}
                      />
                    </Box>

                    <Button
                      fullWidth
                      variant="contained"
                      color="success"
                      size="large"
                      startIcon={<Icon icon="mdi:database-import" width={22} />}
                      onClick={handleLoadAPXData}
                      sx={{
                        py: 1.2,
                        fontSize: '1rem',
                        fontWeight: 500,
                        borderRadius: 2,
                        boxShadow: theme.shadows[5],
                        '&:hover': {
                          boxShadow: theme.shadows[8]
                        }
                      }}
                    >
                      Load APX Data
                    </Button>

                    {/* Data loading process information */}
                    <Paper
                      elevation={0}
                      sx={{
                        mt: 3,
                        p: 2,
                        bgcolor: alpha(theme.palette.info.main, 0.05),
                        border: `1px solid ${alpha(theme.palette.info.main, 0.2)}`,
                        borderRadius: 1
                      }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <Icon
                          icon="mdi:information-outline"
                          style={{ color: theme.palette.info.main, marginRight: 8 }}
                        />
                        <Typography variant="subtitle2" color="info.main">
                          About APX Data Loading
                        </Typography>
                      </Box>

                      <Typography variant="body2" color="text.secondary">
                        The APX data loading process retrieves current financial data through a secure connection to the
                        APX server. This data includes portfolio details, current positions, transactions, and cash
                        balances.
                      </Typography>

                      <Grid container spacing={2} sx={{ mt: 1 }}>
                        <Grid item xs={6}>
                          <List dense disablePadding>
                            <ListItem disableGutters>
                              <ListItemIcon sx={{ minWidth: 36 }}>
                                <Icon icon="mdi:check-circle" style={{ color: theme.palette.success.main }} />
                              </ListItemIcon>
                              <ListItemText
                                primary="Automated data retrieval"
                                primaryTypographyProps={{ variant: 'caption' }}
                              />
                            </ListItem>
                            <ListItem disableGutters>
                              <ListItemIcon sx={{ minWidth: 36 }}>
                                <Icon icon="mdi:check-circle" style={{ color: theme.palette.success.main }} />
                              </ListItemIcon>
                              <ListItemText
                                primary="Encrypted data transfer"
                                primaryTypographyProps={{ variant: 'caption' }}
                              />
                            </ListItem>
                          </List>
                        </Grid>
                        <Grid item xs={6}>
                          <List dense disablePadding>
                            <ListItem disableGutters>
                              <ListItemIcon sx={{ minWidth: 36 }}>
                                <Icon icon="mdi:check-circle" style={{ color: theme.palette.success.main }} />
                              </ListItemIcon>
                              <ListItemText
                                primary="Automated validation"
                                primaryTypographyProps={{ variant: 'caption' }}
                              />
                            </ListItem>
                            <ListItem disableGutters>
                              <ListItemIcon sx={{ minWidth: 36 }}>
                                <Icon icon="mdi:check-circle" style={{ color: theme.palette.success.main }} />
                              </ListItemIcon>
                              <ListItemText
                                primary="Full data reconciliation"
                                primaryTypographyProps={{ variant: 'caption' }}
                              />
                            </ListItem>
                          </List>
                        </Grid>
                      </Grid>
                    </Paper>
                  </Box>
                </>
              )}
            </>
          )}

          {/* View Data View */}
          {currentView === 'view' && (
            <>
              <DataSummary onFilterClick={handleSummaryItemClick} />

              <Box sx={{ mt: 1, mb: 3 }}>
                <TitleWithInfo
                  title="Data Categories"
                  tooltipText="View summary information for each data category. Click on a card to see detailed data."
                />

                <Grid container spacing={3} sx={{ mt: 2 }}>
                  {dataCategories.map((category, index) => (
                    <Grid item xs={12} sm={6} md={3} key={index}>
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
                              return (
                                item.name.toLowerCase().includes('at') || item.name.toLowerCase().includes('investment')
                              );
                            case 'apx':
                              return item.name.toLowerCase().includes('apx');
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
            </>
          )}
        </MainCard>
      </Grid>
    </Grid>
  );
};

export default ModernUploadFiles;
