import React from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Typography,
  Skeleton,
  Divider,
  IconButton,
  Button,
  Stack,
  Checkbox,
  FormControlLabel,
  Badge,
  Tooltip
} from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';
import { Icon } from '@iconify/react';
import { motion } from 'framer-motion';

// project import
import MainCard from 'components/MainCard';

// ==============================|| QUICK TASKS WIDGET ||============================== //

const QuickTasksWidget = ({ isLoading }) => {
  const theme = useTheme();

  const tasks = [
    {
      id: 'task1',
      title: 'Review ARAMCO Q3 reconciliation',
      priority: 'high',
      dueDate: 'Today',
      completed: false,
      icon: 'solar:document-bold-duotone'
    },
    {
      id: 'task2',
      title: 'Approve SABB trade verification',
      priority: 'medium',
      dueDate: 'Tomorrow',
      completed: false,
      icon: 'solar:check-square-bold-duotone'
    },
    {
      id: 'task3',
      title: 'Review Al Rajhi portfolio update',
      priority: 'low',
      dueDate: '21 Nov',
      completed: true,
      icon: 'solar:widget-add-bold-duotone'
    },
    {
      id: 'task4',
      title: 'Finalize SEC position report',
      priority: 'medium',
      dueDate: '23 Nov',
      completed: false,
      icon: 'solar:file-csv-bold-duotone'
    }
  ];

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return theme.palette.error.main;
      case 'medium':
        return theme.palette.warning.main;
      case 'low':
        return theme.palette.success.main;
      default:
        return theme.palette.primary.main;
    }
  };

  if (isLoading) {
    return (
      <MainCard
        title={<Skeleton variant="text" width={120} height={20} />}
        secondary={<Skeleton variant="circular" width={24} height={24} />}
      >
        <Stack spacing={2}>
          {[1, 2, 3, 4].map((item) => (
            <Box key={item} sx={{ display: 'flex', alignItems: 'center' }}>
              <Skeleton variant="circular" width={24} height={24} sx={{ mr: 2 }} />
              <Skeleton variant="text" width="90%" height={24} />
            </Box>
          ))}
        </Stack>
        <Box sx={{ mt: 2 }}>
          <Skeleton variant="rectangular" width="100%" height={36} />
        </Box>
      </MainCard>
    );
  }

  return (
    <MainCard
      contentSX={{ p: '0.5rem !important' }}
      title="Pending Tasks"
      secondary={
        <Stack direction="row" spacing={1}>
          <Badge badgeContent={3} color="error" sx={{ '& .MuiBadge-badge': { right: -4, top: 4 } }}>
            <IconButton size="small">
              <Icon icon="solar:bell-bold-duotone" width={20} />
            </IconButton>
          </Badge>
          <IconButton size="small">
            <Icon icon="solar:add-square-bold-duotone" width={20} />
          </IconButton>
        </Stack>
      }
      sx={{ height: '100%' }}
    >
      <Stack spacing={0.5} divider={<Divider sx={{ opacity: 0.5 }} />} sx={{ mb: 2 }}>
        {tasks.map((task, index) => (
          <Box
            key={task.id}
            component={motion.div}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                py: 1.5,
                px: 1,
                borderRadius: 1,
                transition: 'all 0.2s',
                '&:hover': { bgcolor: alpha(theme.palette.primary.main, 0.08) }
              }}
            >
              <FormControlLabel
                control={
                  <Checkbox
                    checked={task.completed}
                    sx={{
                      color: getPriorityColor(task.priority),
                      '&.Mui-checked': {
                        color: getPriorityColor(task.priority)
                      }
                    }}
                  />
                }
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Icon
                      icon={task.icon}
                      style={{
                        marginRight: theme.spacing(1.5),
                        color: task.completed ? alpha(theme.palette.text.primary, 0.5) : theme.palette.primary.main
                      }}
                      width={20}
                      height={20}
                    />
                    <Typography
                      variant="body1"
                      sx={{
                        textDecoration: task.completed ? 'line-through' : 'none',
                        color: task.completed ? alpha(theme.palette.text.primary, 0.5) : 'text.primary'
                      }}
                    >
                      {task.title}
                    </Typography>
                  </Box>
                }
                sx={{ width: '100%' }}
              />
              <Stack direction="row" spacing={1} alignItems="center">
                <Tooltip title={`Priority: ${task.priority}`}>
                  <Box
                    sx={{
                      width: 10,
                      height: 10,
                      borderRadius: '50%',
                      bgcolor: getPriorityColor(task.priority)
                    }}
                  />
                </Tooltip>
                <Typography
                  variant="caption"
                  sx={{
                    color:
                      theme.palette.mode === 'dark'
                        ? alpha(theme.palette.text.primary, 0.6)
                        : alpha(theme.palette.text.primary, 0.7),
                    display: 'flex',
                    alignItems: 'center'
                  }}
                >
                  <Icon icon="solar:calendar-mark-bold-duotone" style={{ marginRight: 4 }} width={14} />
                  {task.dueDate}
                </Typography>
              </Stack>
            </Box>
          </Box>
        ))}
      </Stack>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', pt: 0.5 }}>
        <Button
          variant="text"
          size="small"
          startIcon={<Icon icon="solar:eye-bold-duotone" />}
          sx={{ fontSize: '0.75rem' }}
        >
          Show Completed
        </Button>
        <Button
          variant="text"
          size="small"
          startIcon={<Icon icon="solar:list-bold-duotone" />}
          sx={{ fontSize: '0.75rem' }}
        >
          View All Tasks
        </Button>
      </Box>
    </MainCard>
  );
};

QuickTasksWidget.propTypes = {
  isLoading: PropTypes.bool
};

export default QuickTasksWidget;
