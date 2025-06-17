import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Grid,
  Box,
  Typography,
  Button,
  TextField,
  InputAdornment,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Chip,
  Skeleton,
  IconButton,
  useMediaQuery
} from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';
import { motion } from 'framer-motion';
import { Icon } from '@iconify/react';

// project imports
import MainCard from 'components/MainCard';

// Report card component
const ReportCard = ({ report }) => {
  const theme = useTheme();

  return (
    <Card
      component={motion.div}
      whileHover={{
        y: -5,
        boxShadow: theme.palette.mode === 'dark' ? '0 8px 24px rgba(0,0,0,0.2)' : '0 8px 24px rgba(0,0,0,0.1)'
      }}
      sx={{
        height: '100%',
        borderRadius: 2,
        p: 0,
        transition: 'all 0.3s ease',
        border: '1px solid',
        borderColor: alpha(theme.palette.divider, 0.6),
        boxShadow: theme.palette.mode === 'dark' ? '0 4px 12px rgba(0,0,0,0.1)' : '0 4px 12px rgba(0,0,0,0.05)'
      }}
    >
      <CardContent sx={{ p: 0 }}>
        {/* Report header with icon */}
        <Box
          sx={{
            p: { xs: 1.5, md: 2 },
            display: 'flex',
            alignItems: 'center',
            borderBottom: '1px solid',
            borderColor: alpha(theme.palette.divider, 0.6),
            bgcolor: alpha(theme.palette.primary.main, 0.05)
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 40,
              height: 40,
              borderRadius: '50%',
              bgcolor: alpha(report.iconColor, 0.12),
              color: report.iconColor,
              mr: 1.5
            }}
          >
            <Icon icon={report.icon} width={20} height={20} />
          </Box>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, fontSize: '0.9rem' }}>
              {report.title}
            </Typography>
            <Typography variant="caption" color="textSecondary">
              {report.category}
            </Typography>
          </Box>
          <Chip
            label={report.frequency}
            size="small"
            sx={{
              bgcolor: alpha(theme.palette.primary.main, 0.1),
              color: theme.palette.primary.main,
              fontSize: '0.7rem',
              height: 22
            }}
          />
        </Box>

        {/* Report details */}
        <Box sx={{ p: { xs: 1.5, md: 2 } }}>
          <Typography variant="body2" color="textSecondary" sx={{ mb: 1.5, fontSize: '0.8125rem' }}>
            {report.description}
          </Typography>

          <Grid container spacing={1} sx={{ mb: 1.5 }}>
            <Grid item xs={6}>
              <Typography variant="caption" color="textSecondary" sx={{ fontSize: '0.75rem' }}>
                Last Generated
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: 500 }}>
                {report.lastGenerated}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="caption" color="textSecondary" sx={{ fontSize: '0.75rem' }}>
                Format
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: 500 }}>
                {report.format}
              </Typography>
            </Grid>
          </Grid>

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              mt: 2
            }}
          >
            <Button
              variant="outlined"
              size="small"
              startIcon={<Icon icon="solar:eye-bold-duotone" width={16} />}
              sx={{ fontSize: '0.75rem' }}
            >
              Preview
            </Button>
            <Button
              variant="contained"
              size="small"
              startIcon={<Icon icon="solar:download-bold-duotone" width={16} />}
              sx={{ fontSize: '0.75rem' }}
            >
              Download
            </Button>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

ReportCard.propTypes = {
  report: PropTypes.object.isRequired
};

// Reports Tab component
const ReportsTab = ({ isLoading }) => {
  const theme = useTheme();
  const matchDownMD = useMediaQuery(theme.breakpoints.down('lg'));
  const [activeCategory, setActiveCategory] = useState('All');

  // Sample report data
  const reports = [
    {
      id: 1,
      title: 'Portfolio Valuation Report',
      category: 'Portfolio',
      description: 'Comprehensive valuation of all holdings across portfolios with market performance metrics.',
      frequency: 'Daily',
      lastGenerated: 'Today, 09:15 AM',
      format: 'PDF, Excel',
      icon: 'solar:dollar-minimalistic-bold-duotone',
      iconColor: theme.palette.primary.main
    },
    {
      id: 2,
      title: 'Trading Activity Summary',
      category: 'Trading',
      description: 'Summary of all buy and sell transactions with execution statistics and broker details.',
      frequency: 'Daily',
      lastGenerated: 'Today, 08:30 AM',
      format: 'PDF, Excel',
      icon: 'solar:graph-up-bold-duotone',
      iconColor: theme.palette.success.main
    },
    {
      id: 3,
      title: 'Compliance Exceptions Report',
      category: 'Compliance',
      description: 'Details of all compliance exceptions and breaches with remediation status.',
      frequency: 'Weekly',
      lastGenerated: 'Nov 18, 2023',
      format: 'PDF',
      icon: 'solar:shield-warning-bold-duotone',
      iconColor: theme.palette.warning.main
    },
    {
      id: 4,
      title: 'Reconciliation Summary',
      category: 'Operations',
      description: 'Daily reconciliation results between internal systems and custodian records.',
      frequency: 'Daily',
      lastGenerated: 'Today, 10:45 AM',
      format: 'PDF, Excel',
      icon: 'solar:check-square-bold-duotone',
      iconColor: theme.palette.info.main
    },
    {
      id: 5,
      title: 'Portfolio Performance Analysis',
      category: 'Performance',
      description: 'Detailed performance attribution analysis of portfolios against benchmarks.',
      frequency: 'Monthly',
      lastGenerated: 'Nov 01, 2023',
      format: 'PDF, PowerPoint',
      icon: 'solar:chart-bold-duotone',
      iconColor: theme.palette.primary.main
    },
    {
      id: 6,
      title: 'Corporate Actions Report',
      category: 'Corporate',
      description: 'Summary of all corporate actions affecting portfolio holdings with status updates.',
      frequency: 'Weekly',
      lastGenerated: 'Nov 17, 2023',
      format: 'PDF, Excel',
      icon: 'solar:widget-add-bold-duotone',
      iconColor: theme.palette.secondary.main
    },
    {
      id: 7,
      title: 'Risk Exposure Analysis',
      category: 'Risk',
      description: 'Comprehensive risk exposure metrics across various dimensions with VaR analysis.',
      frequency: 'Weekly',
      lastGenerated: 'Nov 17, 2023',
      format: 'PDF, Excel',
      icon: 'solar:danger-triangle-bold-duotone',
      iconColor: theme.palette.error.main
    },
    {
      id: 8,
      title: 'Cash Flow Forecast',
      category: 'Finance',
      description: 'Projected cash flows based on investment activity and corporate actions.',
      frequency: 'Weekly',
      lastGenerated: 'Nov 17, 2023',
      format: 'PDF, Excel',
      icon: 'solar:wallet-money-bold-duotone',
      iconColor: theme.palette.success.main
    }
  ];

  // Report categories
  const categories = [
    { name: 'All', icon: 'solar:document-text-bold-duotone' },
    { name: 'Portfolio', icon: 'solar:folder-bold-duotone' },
    { name: 'Trading', icon: 'solar:graph-up-bold-duotone' },
    { name: 'Compliance', icon: 'solar:shield-warning-bold-duotone' },
    { name: 'Performance', icon: 'solar:chart-bold-duotone' },
    { name: 'Risk', icon: 'solar:danger-triangle-bold-duotone' },
    { name: 'Operations', icon: 'solar:check-square-bold-duotone' },
    { name: 'Finance', icon: 'solar:wallet-money-bold-duotone' },
    { name: 'Corporate', icon: 'solar:widget-add-bold-duotone' }
  ];

  // Filtered reports based on active category
  const filteredReports =
    activeCategory === 'All' ? reports : reports.filter((report) => report.category === activeCategory);

  const itemVariant = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15
      }
    }
  };

  if (isLoading) {
    return (
      <Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1.5 }}>
          <Skeleton variant="text" width={180} height={32} />
          <Skeleton variant="rectangular" width={120} height={36} sx={{ borderRadius: 1 }} />
        </Box>

        <Grid container spacing={matchDownMD ? 1 : 1.5}>
          <Grid item xs={12} md={3}>
            <Skeleton variant="rectangular" height={320} sx={{ borderRadius: 2 }} />
          </Grid>
          <Grid item xs={12} md={9}>
            <Grid container spacing={matchDownMD ? 1 : 1.5}>
              {[1, 2, 3, 4].map((item) => (
                <Grid item xs={12} sm={6} key={item}>
                  <Skeleton variant="rectangular" height={200} sx={{ borderRadius: 2 }} />
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Box>
    );
  }

  return (
    <Box>
      {/* Tab Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1.5 }}>
        <Typography variant="h5" sx={{ fontWeight: 600, fontSize: '1.1rem' }}>
          Investment Reports
        </Typography>
        <Button
          variant="contained"
          size="small"
          startIcon={<Icon icon="solar:file-text-bold-duotone" width={18} />}
          sx={{
            backgroundColor: theme.palette.primary.main,
            px: 1.5,
            py: 0.75,
            fontSize: '0.8125rem'
          }}
        >
          Generate New Report
        </Button>
      </Box>

      <Grid container spacing={matchDownMD ? 1 : 1.5}>
        {/* Left sidebar - categories */}
        <Grid item xs={12} md={3}>
          <MainCard
            sx={{
              height: '100%',
              '& .MuiCardContent-root': { p: { xs: 1.5, md: 2 } }
            }}
          >
            <Box sx={{ mb: 2 }}>
              <TextField
                fullWidth
                size="small"
                placeholder="Search reports..."
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Icon icon="solar:magnifer-bold-duotone" width={18} />
                    </InputAdornment>
                  )
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    fontSize: '0.8125rem',
                    height: 40
                  }
                }}
              />
            </Box>

            <Typography variant="subtitle2" sx={{ mb: 1, color: 'text.secondary', fontSize: '0.75rem' }}>
              REPORT CATEGORIES
            </Typography>

            <List
              sx={{
                '& .MuiListItem-root': {
                  px: 1.5,
                  py: 0.75,
                  mb: 0.5,
                  borderRadius: 1
                }
              }}
            >
              {categories.map((category) => (
                <ListItem
                  button
                  key={category.name}
                  selected={activeCategory === category.name}
                  onClick={() => setActiveCategory(category.name)}
                  sx={{
                    bgcolor: activeCategory === category.name ? alpha(theme.palette.primary.main, 0.1) : 'transparent',
                    '&.Mui-selected': {
                      bgcolor: alpha(theme.palette.primary.main, 0.1),
                      '&:hover': {
                        bgcolor: alpha(theme.palette.primary.main, 0.15)
                      }
                    },
                    '&:hover': {
                      bgcolor: alpha(theme.palette.primary.main, 0.05)
                    }
                  }}
                >
                  <ListItemIcon
                    sx={{
                      color: activeCategory === category.name ? theme.palette.primary.main : 'text.secondary',
                      minWidth: 32
                    }}
                  >
                    <Icon icon={category.icon} width={18} />
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Typography
                        variant="body2"
                        sx={{
                          fontWeight: activeCategory === category.name ? 600 : 400,
                          color: activeCategory === category.name ? theme.palette.primary.main : 'text.primary'
                        }}
                      >
                        {category.name}
                      </Typography>
                    }
                  />
                  {category.name !== 'All' && (
                    <Chip
                      label={
                        reports.filter((report) => category.name === 'All' || report.category === category.name).length
                      }
                      size="small"
                      sx={{
                        height: 20,
                        minWidth: 20,
                        fontSize: '0.7rem',
                        bgcolor:
                          activeCategory === category.name
                            ? theme.palette.primary.main
                            : alpha(theme.palette.text.secondary, 0.1),
                        color: activeCategory === category.name ? 'white' : 'text.secondary'
                      }}
                    />
                  )}
                </ListItem>
              ))}
            </List>

            <Divider sx={{ my: 2 }} />

            <Typography variant="subtitle2" sx={{ mb: 1, color: 'text.secondary', fontSize: '0.75rem' }}>
              SCHEDULED REPORTS
            </Typography>

            <List
              sx={{
                '& .MuiListItem-root': {
                  px: 1.5,
                  py: 0.75,
                  mb: 0.5,
                  borderRadius: 1
                }
              }}
            >
              <ListItem
                sx={{
                  bgcolor: alpha(theme.palette.success.main, 0.1),
                  '&:hover': {
                    bgcolor: alpha(theme.palette.success.main, 0.15)
                  }
                }}
              >
                <ListItemIcon
                  sx={{
                    color: theme.palette.success.main,
                    minWidth: 32
                  }}
                >
                  <Icon icon="solar:clock-circle-bold-duotone" width={18} />
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Typography
                      variant="body2"
                      sx={{
                        fontWeight: 500,
                        color: theme.palette.success.dark
                      }}
                    >
                      Today's Summary
                    </Typography>
                  }
                  secondary={
                    <Typography variant="caption" sx={{ color: alpha(theme.palette.success.dark, 0.7) }}>
                      Scheduled for 5:00 PM
                    </Typography>
                  }
                />
                <IconButton size="small" sx={{ width: 24, height: 24 }}>
                  <Icon icon="solar:settings-bold-duotone" width={14} />
                </IconButton>
              </ListItem>
            </List>
          </MainCard>
        </Grid>

        {/* Right side - reports */}
        <Grid item xs={12} md={9}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mb: 1.5,
              px: 0.5
            }}
          >
            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
              {activeCategory === 'All' ? 'All Reports' : `${activeCategory} Reports`}
              <Typography component="span" variant="caption" sx={{ ml: 1, color: 'text.secondary' }}>
                ({filteredReports.length} reports)
              </Typography>
            </Typography>

            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button
                variant="outlined"
                size="small"
                startIcon={<Icon icon="solar:sort-from-bottom-to-top-bold-duotone" width={16} />}
                sx={{
                  fontSize: '0.75rem',
                  px: 1.5,
                  height: 32
                }}
              >
                Sort
              </Button>
              <Button
                variant="outlined"
                size="small"
                startIcon={<Icon icon="solar:filter-bold-duotone" width={16} />}
                sx={{
                  fontSize: '0.75rem',
                  px: 1.5,
                  height: 32
                }}
              >
                Filter
              </Button>
            </Box>
          </Box>

          <Grid container spacing={matchDownMD ? 1 : 1.5}>
            {filteredReports.map((report, index) => (
              <Grid
                item
                xs={12}
                sm={6}
                key={report.id}
                component={motion.div}
                variants={itemVariant}
                initial="hidden"
                animate="visible"
                transition={{ delay: index * 0.1 }}
              >
                <ReportCard report={report} />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

ReportsTab.propTypes = {
  isLoading: PropTypes.bool
};

export default ReportsTab;
