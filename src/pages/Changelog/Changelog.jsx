import { Icon } from '@iconify/react';
import {
  Alert,
  AlertTitle,
  Avatar,
  Badge,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Chip,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Fade,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  Menu,
  MenuItem,
  OutlinedInput,
  Paper,
  Select,
  Slide,
  Snackbar,
  Tab,
  Tabs,
  Tooltip,
  Typography,
  useTheme
} from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Markdown from 'components/@extended/Markdown';
import ExportData from 'components/Export/ExportData';
import MainCard from 'components/MainCard';
import ReusableTable from 'components/Table/ReusableTable';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useCallback, useEffect, useMemo, useState } from 'react';

// Initialize dayjs plugins
dayjs.extend(relativeTime);

// Initialize SweetAlert2
const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN;
const REPO_OWNER = 'AltafEmpaxis';
const REPO_NAME = 'IEVERS_UI';

const githubApi = axios.create({
  baseURL: 'https://api.github.com',
  headers: {
    Accept: 'application/vnd.github.v3+json',
    Authorization: `Bearer ${GITHUB_TOKEN}`
  }
});

const BRANCH_CONFIG = {
  main: {
    color: 'success',
    icon: 'mdi:rocket-launch',
    label: 'Production',
    description: 'Stable production release'
  },
  dev: {
    color: 'warning',
    icon: 'mdi:code-braces',
    label: 'Development',
    description: 'Pre-release development version'
  },
  qa: {
    color: 'info',
    icon: 'mdi:test-tube',
    label: 'QA',
    description: 'Quality Assurance testing version'
  },
  uat: {
    color: 'secondary',
    icon: 'mdi:account-check',
    label: 'UAT',
    description: 'User Acceptance Testing version'
  },
  hotfix: {
    color: 'error',
    icon: 'mdi:fire',
    label: 'Hotfix',
    description: 'Emergency fix version'
  }
};

const getBranchInfo = (branchName) => {
  const branch = branchName.toLowerCase();
  if (branch.startsWith('hotfix/')) return BRANCH_CONFIG.hotfix;
  return (
    BRANCH_CONFIG[branch] || {
      color: 'default',
      icon: 'mdi:source-branch',
      label: branchName,
      description: 'Custom branch'
    }
  );
};

const ReleaseTypeChip = ({ isPrerelease, isDraft }) => {
  const theme = useTheme();
  const chipColor = isDraft ? 'default' : isPrerelease ? 'warning' : 'success';
  const chipIcon = isDraft ? (
    <Icon icon="mdi:file-document-outline" width={15} height={15} style={{ color: theme.palette[chipColor].lighter }} />
  ) : isPrerelease ? (
    <Icon icon="mdi:package-variant" width={15} height={15} style={{ color: theme.palette[chipColor].lighter }} />
  ) : (
    <Icon
      icon="mdi:package-variant-closed"
      width={15}
      height={15}
      style={{ color: theme.palette[chipColor].lighter }}
    />
  );
  const chipLabel = isDraft ? 'Draft' : isPrerelease ? 'Pre-release' : 'Stable';
  const tooltipTitle = isDraft
    ? 'Draft release - not yet published'
    : isPrerelease
      ? 'Pre-release version - may contain bugs'
      : 'Stable release - production ready';

  return (
    <Tooltip title={tooltipTitle} arrow>
      <Chip icon={chipIcon} label={chipLabel} size="small" color={chipColor} />
    </Tooltip>
  );
};

const BranchChip = ({ branch }) => {
  const branchInfo = getBranchInfo(branch);
  const theme = useTheme();
  return (
    <Tooltip title={branchInfo.description} arrow>
      <Chip
        icon={
          <Icon
            icon={branchInfo.icon}
            width={15}
            height={15}
            style={{ color: theme.palette[branchInfo.color].lighter }}
          />
        }
        label={branchInfo.label}
        size="small"
        color={branchInfo.color}
      />
    </Tooltip>
  );
};

const DateDisplay = ({ date }) => {
  const theme = useTheme();
  const formattedDate = dayjs(date).format('MMM D, YYYY');
  const formattedTime = dayjs(date).format('h:mm A');
  const relativeTimeStr = dayjs(date).fromNow();

  return (
    <Tooltip title={`${dayjs(date).format('MMMM D, YYYY h:mm A')} (${relativeTimeStr})`} arrow>
      <Box>
        <Typography variant="body2" color="primary">
          {formattedDate}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <Icon icon="mdi:clock-outline" width={16} height={16} style={{ color: theme.palette.text.secondary }} />
          <Typography variant="caption" color="text.secondary">
            {formattedTime} ({relativeTimeStr})
          </Typography>
        </Box>
      </Box>
    </Tooltip>
  );
};

const AuthorInfo = ({ author, releaseType, createdAt, publishedAt, body }) => {
  const theme = useTheme();
  const releaseInfo = `Released by ${author.login}`;
  const timeSinceCreation = dayjs(createdAt).fromNow();
  const timeSincePublish = dayjs(publishedAt).fromNow();

  const tooltipContent = (
    <Box sx={{ p: 1 }}>
      <Typography variant="subtitle2" sx={{ mb: 1 }}>
        {releaseInfo}
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Icon icon="mdi:calendar-plus" width={20} height={20} style={{ color: theme.palette.primary.main }} />
          <Typography variant="caption">
            Created: {dayjs(createdAt).format('MMM D, YYYY h:mm A')} ({timeSinceCreation})
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Icon icon="mdi:calendar-check" width={20} height={20} style={{ color: theme.palette.success.main }} />
          <Typography variant="caption">
            Published: {dayjs(publishedAt).format('MMM D, YYYY h:mm A')} ({timeSincePublish})
          </Typography>
        </Box>
      </Box>
      {body && (
        <Box sx={{ mt: 1, pt: 1, borderTop: 1, borderColor: 'divider' }}>
          <Typography variant="caption" sx={{ fontStyle: 'italic' }}>
            {body.split('\n')[0]}
          </Typography>
        </Box>
      )}
    </Box>
  );

  return (
    <Tooltip title={tooltipContent} arrow placement="left">
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Avatar src={author.avatar_url} alt={author.login} sx={{ width: 32, height: 32 }} />
        <Box>
          <Typography variant="body2">{author.login}</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <Icon
              icon={releaseType ? 'mdi:package-variant' : 'mdi:package-variant-closed'}
              width={16}
              height={16}
              style={{ color: theme.palette[releaseType ? 'warning' : 'success'].main }}
            />
            <Typography variant="caption" color="text.secondary">
              {releaseType ? 'Pre-release' : 'Release'} author
            </Typography>
          </Box>
        </Box>
      </Box>
    </Tooltip>
  );
};

const ReleaseNotes = ({ notes, version, publishedAt }) => {
  const theme = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  if (!notes) return null;

  const previewText = notes.length > 150 ? `${notes.slice(0, 150)}...` : notes;
  const firstLine = notes.split('\n')[0].replace(/^#+\s+/, '');
  const hasMoreContent = notes.length > 150 || notes.split('\n').length > 3;

  return (
    <>
      <Box
        onClick={() => setIsOpen(true)}
        sx={{
          cursor: 'pointer',
          border: `1px solid ${theme.palette.divider}`,
          p: 1,
          borderRadius: 1,
          overflow: 'hidden',
          '&:hover': {
            bgcolor: 'action.hover'
          }
        }}
      >
        <Typography variant="subtitle2" color="primary" gutterBottom>
          {firstLine}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden'
          }}
        >
          {previewText.replace(firstLine, '')}
        </Typography>
        {hasMoreContent && (
          <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5, gap: 0.5 }}>
            <Typography variant="caption" color="primary">
              Read more
            </Typography>
            <Icon icon="mdi:chevron-right" width={16} height={16} style={{ color: theme.palette.primary.main }} />
          </Box>
        )}
      </Box>

      <Dialog open={isOpen} onClose={() => setIsOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box>
              <Typography variant="h5">
                <Icon
                  icon="mdi:text-box-outline"
                  width={24}
                  height={24}
                  style={{ color: theme.palette.primary.main }}
                />{' '}
                Release Notes
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
                <Chip
                  label={version}
                  size="small"
                  color="primary"
                  icon={<Icon icon="mdi:tag" width={20} height={20} style={{ color: theme.palette.primary.main }} />}
                />
                <Typography variant="caption" color="text.secondary">
                  Published {dayjs(publishedAt).format('MMMM D, YYYY')} ({dayjs(publishedAt).fromNow()})
                </Typography>
              </Box>
            </Box>
            <IconButton onClick={() => setIsOpen(false)} size="small">
              <Icon icon="mdi:close" width={20} height={20} style={{ color: theme.palette.text.secondary }} />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          <Markdown source={notes} />
        </DialogContent>
      </Dialog>
    </>
  );
};

const ActionButtons = ({ release, repoOwner, repoName, onDownload }) => {
  const zipUrl = `https://github.com/${repoOwner}/${repoName}/archive/refs/tags/${release.tag_name}.zip`;
  const tarUrl = `https://github.com/${repoOwner}/${repoName}/archive/refs/tags/${release.tag_name}.tar.gz`;
  const buildAsset = release.assets?.find((asset) => asset.name.toLowerCase() === 'my-build.zip');

  const buttons = [
    {
      tooltip: 'View Release Details',
      icon: <Icon icon="mdi:information-outline" width={20} height={20} style={{ color: 'inherit' }} />,
      label: 'Details',
      color: 'primary',
      onClick: () => window.open(release.html_url, '_blank')
    },
    {
      tooltip: `Download ${release.tag_name} as ZIP`,
      icon: <Icon icon="mdi:folder-zip" width={20} height={20} style={{ color: 'inherit' }} />,
      label: 'ZIP',
      color: 'success',
      onClick: () => window.open(zipUrl, '_blank')
    },
    {
      tooltip: `Download ${release.tag_name} as TAR.GZ`,
      icon: <Icon icon="mdi:folder-zip" width={20} height={20} style={{ color: 'inherit' }} />,
      label: 'TAR',
      color: 'warning',
      onClick: () => window.open(tarUrl, '_blank')
    },
    buildAsset && {
      tooltip: `Download Build Package (${(buildAsset.size / (1024 * 1024)).toFixed(2)} MB)`,
      icon: <Icon icon="mdi:package-variant" width={20} height={20} style={{ color: 'inherit' }} />,
      label: 'Build',
      color: 'info',
      onClick: () => window.open(buildAsset.browser_download_url, '_blank')
    }
  ].filter(Boolean);

  return (
    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
      {buttons.map((button, index) => (
        <Tooltip key={index} title={button.tooltip} arrow>
          <Button
            size="small"
            variant="contained"
            color={button.color}
            startIcon={button.icon}
            onClick={button.onClick}
          >
            {button.label}
          </Button>
        </Tooltip>
      ))}
    </Box>
  );
};

const DocumentationDialog = ({ open, onClose, activeTab, onTabChange, readmeData, changelogData, initialBranch }) => {
  const theme = useTheme();
  const [isLoading, setIsLoading] = useState(true);
  const [selectedBranch, setSelectedBranch] = useState(initialBranch || 'main');
  const [branchOptions, setBranchOptions] = useState([]);
  const [branchReadmeData, setBranchReadmeData] = useState(readmeData);
  const [branchChangelogData, setBranchChangelogData] = useState(changelogData);

  useEffect(() => {
    if (open) {
      if (initialBranch) {
        setSelectedBranch(initialBranch);
      }

      const fetchBranches = async () => {
        try {
          const response = await githubApi.get(`/repos/${REPO_OWNER}/${REPO_NAME}/branches`);
          setBranchOptions(response.data.map((branch) => branch.name));
        } catch (error) {
          console.error('Failed to fetch branches:', error);
          setBranchOptions(['main']);
        }
      };

      fetchBranches();
    }
  }, [open, initialBranch]);

  useEffect(() => {
    if (selectedBranch && open) {
      setIsLoading(true);

      const fetchBranchDocumentation = async () => {
        try {
          const readmeResponse = await githubApi.get(`/repos/${REPO_OWNER}/${REPO_NAME}/readme`, {
            headers: {
              Accept: 'application/vnd.github.raw+json'
            },
            params: {
              ref: selectedBranch
            }
          });
          setBranchReadmeData(readmeResponse.data);

          try {
            const changelogResponse = await githubApi.get(`/repos/${REPO_OWNER}/${REPO_NAME}/contents/CHANGELOG.md`, {
              headers: {
                Accept: 'application/vnd.github.raw+json'
              },
              params: {
                ref: selectedBranch
              }
            });
            setBranchChangelogData(changelogResponse.data);
          } catch (changelogError) {
            setBranchChangelogData(
              `# Changelog not available for ${selectedBranch}\n\nThe CHANGELOG.md file could not be found in the ${selectedBranch} branch.`
            );
          }
        } catch (error) {
          console.error(`Failed to fetch documentation for branch ${selectedBranch}:`, error);
          setBranchReadmeData(
            `# README not available for ${selectedBranch}\n\nThe README.md file could not be found in the ${selectedBranch} branch.`
          );
        } finally {
          setTimeout(() => {
            setIsLoading(false);
          }, 500);
        }
      };

      fetchBranchDocumentation();
    }
  }, [selectedBranch, open]);

  useEffect(() => {
    if (open) {
      setIsLoading(true);
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [open, activeTab]);

  const handleBranchChange = (event) => {
    setSelectedBranch(event.target.value);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle sx={{ pb: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
          <Typography variant="h5">
            <Icon
              icon="mdi:file-document-outline"
              width={24}
              height={24}
              style={{ color: theme.palette.primary.main }}
            />{' '}
            Documentation
          </Typography>
          <IconButton onClick={onClose} size="small">
            <Icon icon="mdi:close" width={20} height={20} style={{ color: theme.palette.text.secondary }} />
          </IconButton>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Tabs value={activeTab} onChange={onTabChange}>
            <Tab
              icon={<Icon icon="mdi:book" width={20} height={20} style={{ color: 'inherit' }} />}
              iconPosition="start"
              label="README"
            />
            <Tab
              icon={<Icon icon="mdi:history" width={20} height={20} style={{ color: 'inherit' }} />}
              iconPosition="start"
              label="CHANGELOG"
            />
          </Tabs>

          <FormControl size="small" sx={{ minWidth: 150 }}>
            <InputLabel>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <Icon icon="mdi:source-branch" width={20} height={20} style={{ color: theme.palette.primary.main }} />
                Branch
              </Box>
            </InputLabel>
            <Select
              value={selectedBranch}
              onChange={handleBranchChange}
              input={
                <OutlinedInput
                  label={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <Icon
                        icon="mdi:source-branch"
                        width={20}
                        height={20}
                        style={{ color: theme.palette.primary.main }}
                      />
                      Branch
                    </Box>
                  }
                />
              }
            >
              {branchOptions.map((branch) => (
                <MenuItem key={branch} value={branch}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Icon
                      icon={getBranchInfo(branch).icon}
                      width={20}
                      height={20}
                      style={{ color: theme.palette[getBranchInfo(branch).color].main }}
                    />
                    <Typography>{branch}</Typography>
                  </Box>
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </DialogTitle>
      <DialogContent>
        {isLoading ? (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              height: '60vh',
              gap: 2
            }}
          >
            <CircularProgress size={40} color={activeTab === 0 ? 'primary' : 'success'} />
            <Typography variant="body2" color="text.secondary">
              Loading {activeTab === 0 ? 'README' : 'CHANGELOG'} for {selectedBranch} branch...
            </Typography>
          </Box>
        ) : (
          <Box>
            <Box sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
              <BranchChip branch={selectedBranch} />
              <Typography variant="caption" color="text.secondary">
                Viewing documentation from the {selectedBranch} branch
              </Typography>
            </Box>
            <Markdown source={activeTab === 0 ? branchReadmeData : branchChangelogData} />
          </Box>
        )}
      </DialogContent>
    </Dialog>
  );
};

const RepositorySummary = ({ repoData, releases }) => {
  const theme = useTheme();
  const totalReleases = releases.length;
  const stableReleases = releases.filter((r) => !r.prerelease && !r.draft).length;
  const preReleases = releases.filter((r) => r.prerelease).length;
  const draftReleases = releases.filter((r) => r.draft).length;
  const latestRelease = releases[0];
  const latestStableRelease = releases.find((r) => !r.prerelease && !r.draft);

  const stats = [
    {
      title: 'Total Releases',
      value: totalReleases,
      icon: 'mdi:tag-multiple',
      color: 'primary',
      description: 'All versions released',
      trend: '+1 this week',
      trendUp: true,
      details: [
        {
          label: 'This Month',
          value: releases.filter((r) => dayjs(r.published_at).isAfter(dayjs().subtract(1, 'month'))).length,
          icon: 'mdi:calendar-month'
        },
        {
          label: 'This Year',
          value: releases.filter((r) => dayjs(r.published_at).isAfter(dayjs().subtract(1, 'year'))).length,
          icon: 'mdi:calendar-year'
        }
      ]
    },
    {
      title: 'Stable Releases',
      value: stableReleases,
      icon: 'mdi:check-circle',
      color: 'success',
      description: 'Production-ready versions',
      trend: 'Latest: ' + (latestStableRelease?.tag_name || 'N/A'),
      trendUp: true,
      details: [
        {
          label: 'Success Rate',
          value: Math.round((stableReleases / totalReleases) * 100) + '%',
          icon: 'mdi:chart-line'
        },
        {
          label: 'Last Release',
          value: latestStableRelease ? dayjs(latestStableRelease.published_at).fromNow() : 'N/A',
          icon: 'mdi:clock-outline'
        }
      ]
    },
    {
      title: 'Pre-releases',
      value: preReleases,
      icon: 'mdi:alert-circle',
      color: 'warning',
      description: 'Beta and testing versions',
      trend: preReleases > 0 ? 'Active development' : 'No beta versions',
      trendUp: null,
      details: [
        {
          label: 'In Testing',
          value: preReleases,
          icon: 'mdi:test-tube'
        },
        {
          label: 'Conversion Rate',
          value: Math.round((stableReleases / (stableReleases + preReleases)) * 100) + '%',
          icon: 'mdi:chart-bell-curve'
        }
      ]
    },
    {
      title: 'Draft Releases',
      value: draftReleases,
      icon: 'mdi:file-document-edit',
      color: 'info',
      description: 'Unpublished versions',
      trend: draftReleases > 0 ? 'Pending review' : 'All published',
      trendUp: false,
      details: [
        {
          label: 'Drafts',
          value: draftReleases,
          icon: 'mdi:file-document'
        },
        {
          label: 'Completion',
          value: Math.round(((totalReleases - draftReleases) / totalReleases) * 100) + '%',
          icon: 'mdi:progress-check'
        }
      ]
    }
  ];

  return (
    <Grid container spacing={3} sx={{ mb: 3 }}>
      {stats.map((stat, index) => (
        <Grid item xs={12} sm={6} md={3} key={index}>
          <Card elevation={3}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 3 }}>
                <Box>
                  <Typography
                    variant="h3"
                    color={`${stat.color}.main`}
                    sx={{
                      mb: 1
                    }}
                  >
                    {stat.value}
                  </Typography>
                  <Typography variant="subtitle1" color="text.primary">
                    {stat.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {stat.description}
                  </Typography>
                </Box>
                <Avatar
                  sx={{
                    width: 50,
                    height: 50,
                    border: `1px solid ${theme.palette[stat.color].main}`
                  }}
                >
                  <Icon icon={stat.icon} width={24} height={24} style={{ color: theme.palette[stat.color].main }} />
                </Avatar>
              </Box>

              <Box sx={{ mb: 2 }}>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    border: `1px solid ${theme.palette[stat.color].main}`,
                    p: 1.5,
                    borderRadius: 1.5
                  }}
                >
                  {stat.trendUp !== null && (
                    <Icon
                      icon={stat.trendUp ? 'mdi:trending-up' : 'mdi:trending-down'}
                      width={20}
                      height={20}
                      style={{ color: stat.trendUp ? theme.palette.success.main : theme.palette.error.main }}
                    />
                  )}
                  <Typography
                    variant="body2"
                    color={stat.trendUp ? 'success.main' : 'text.secondary'}
                    sx={{ fontWeight: 500 }}
                  >
                    {stat.trend}
                  </Typography>
                </Box>
              </Box>

              <Divider sx={{ mb: 2 }} />

              <Box sx={{ pt: 1 }}>
                {stat.details.map((detail, idx) => (
                  <Box
                    key={idx}
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      mb: 1,
                      p: 1.5,
                      borderRadius: 2,
                      '&:hover': {
                        bgcolor: theme.palette[stat.color].main
                      }
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Icon
                        icon={detail.icon}
                        width={20}
                        height={20}
                        style={{ color: theme.palette[stat.color].main }}
                      />
                      <Typography variant="body2" color="text.secondary">
                        {detail.label}
                      </Typography>
                    </Box>
                    <Typography variant="subtitle2" color={stat.color} sx={{ fontWeight: 600 }}>
                      {detail.value}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      ))}

      {latestRelease && (
        <Grid item xs={12}>
          <Card elevation={3} sx={{}}>
            <CardHeader
              title={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Avatar
                    sx={{
                      bgcolor: 'primary.lighter',
                      width: 48,
                      height: 48,
                      border: `2px solid ${theme.palette.primary.main}`
                    }}
                  >
                    <Icon icon="mdi:new-box" width={24} height={24} style={{ color: theme.palette.primary.main }} />
                  </Avatar>
                  <Box>
                    <Typography variant="h5">Latest Release</Typography>
                    <Typography variant="body2" color="text.secondary">
                      Version {latestRelease.tag_name}
                    </Typography>
                  </Box>
                  <ReleaseTypeChip isPrerelease={latestRelease.prerelease} isDraft={latestRelease.draft} />
                </Box>
              }
              action={
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <Button
                    variant="outlined"
                    startIcon={<Icon icon="mdi:github" width={20} height={20} style={{ color: 'inherit' }} />}
                    onClick={() => window.open(latestRelease.html_url, '_blank')}
                  >
                    View on GitHub
                  </Button>
                  <Button
                    variant="contained"
                    startIcon={<Icon icon="mdi:download" width={20} height={20} style={{ color: 'inherit' }} />}
                    color="primary"
                    onClick={() =>
                      window.open(`${latestRelease.html_url}/archive/refs/tags/${latestRelease.tag_name}.zip`, '_blank')
                    }
                  >
                    Download
                  </Button>
                </Box>
              }
            />
            <Divider />
            <CardContent>
              <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                    <Box>
                      <Typography variant="h4" color="primary" gutterBottom>
                        {latestRelease.name}
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Icon icon="mdi:tag" style={{ color: theme.palette.primary.main }} />
                        <Typography variant="subtitle1" color="text.primary">
                          Version {latestRelease.tag_name}
                        </Typography>
                      </Box>
                    </Box>

                    <Paper
                      elevation={0}
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 2,
                        p: 2,
                        borderRadius: 2,
                        border: `1px solid ${theme.palette.divider}`
                      }}
                    >
                      <Avatar>
                        <Icon icon="mdi:calendar" width={24} height={24} style={{ color: theme.palette.info.main }} />
                      </Avatar>
                      <Box>
                        <Typography variant="subtitle2" color="text.primary">
                          Released {dayjs(latestRelease.published_at).format('MMMM D, YYYY')}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {dayjs(latestRelease.published_at).fromNow()}
                        </Typography>
                      </Box>
                    </Paper>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <BranchChip branch={latestRelease.target_commitish} />
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Avatar
                          src={latestRelease.author?.avatar_url}
                          alt={latestRelease.author?.login}
                          sx={{
                            width: 24,
                            height: 24
                          }}
                        />
                        <Typography variant="body2" color="text.secondary">
                          by {latestRelease.author?.login || 'Unknown'}
                        </Typography>
                      </Box>
                    </Box>

                    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                      {latestRelease.assets?.map((asset, index) => (
                        <Chip
                          key={index}
                          icon={<Icon icon="mdi:file-download" width={20} height={20} />}
                          label={`${asset.name} (${(asset.size / 1024 / 1024).toFixed(2)} MB)`}
                          variant="outlined"
                          color="primary"
                          onClick={() => window.open(asset.browser_download_url, '_blank')}
                        />
                      ))}
                    </Box>
                  </Box>
                </Grid>

                <Grid item xs={12} md={8}>
                  <Paper
                    variant="outlined"
                    sx={{
                      p: 2
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Icon icon="mdi:text-box" style={{ color: theme.palette.primary.main }} />
                        <Typography variant="h6" color="primary">
                          Release Notes
                        </Typography>
                      </Box>
                      <Button
                        variant="outlined"
                        size="small"
                        endIcon={<Icon icon="mdi:chevron-right" width={20} height={20} />}
                        onClick={() => window.open(latestRelease.html_url, '_blank')}
                      >
                        Read full notes
                      </Button>
                    </Box>
                    <Box>
                      <Typography
                        variant="body2"
                        color="text.primary"
                        sx={{
                          whiteSpace: 'pre-line',
                          lineHeight: 1.8
                        }}
                      >
                        {latestRelease.body || 'No release notes available.'}
                      </Typography>
                    </Box>
                  </Paper>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      )}
    </Grid>
  );
};

const useGitHubData = () => {
  // Helper function to handle API errors
  const handleApiError = (err, defaultMessage) => {
    console.error(defaultMessage, err);

    if (err.response?.status === 401) {
      return 'Authentication failed. Please check your GitHub token.';
    } else if (err.response?.status === 404) {
      return 'Resource not found. Please check repository configuration.';
    } else if (err.response?.status === 403) {
      return 'API rate limit exceeded. Please try again later.';
    }

    return defaultMessage;
  };

  const { data: repoData } = useQuery({
    queryKey: ['github-repo'],
    queryFn: async () => {
      try {
        const response = await githubApi.get(`/repos/${REPO_OWNER}/${REPO_NAME}`);
        return response.data;
      } catch (err) {
        throw new Error(handleApiError(err, 'Failed to fetch repository information'));
      }
    }
  });

  const { data: readmeData } = useQuery({
    queryKey: ['github-readme'],
    queryFn: async () => {
      try {
        const response = await githubApi.get(`/repos/${REPO_OWNER}/${REPO_NAME}/readme`, {
          headers: {
            Accept: 'application/vnd.github.raw+json'
          }
        });
        return response.data;
      } catch (err) {
        return `# README not available\n\n${handleApiError(err, 'The README content could not be loaded.')}`;
      }
    }
  });

  const { data: changelogData } = useQuery({
    queryKey: ['github-changelog'],
    queryFn: async () => {
      try {
        const response = await githubApi.get(`/repos/${REPO_OWNER}/${REPO_NAME}/contents/CHANGELOG.md`, {
          headers: {
            Accept: 'application/vnd.github.raw+json'
          }
        });
        return response.data;
      } catch (err) {
        return `# Changelog not available\n\n${handleApiError(err, 'The CHANGELOG content could not be loaded.')}`;
      }
    }
  });

  const { data, isLoading, error, isError, isPending } = useQuery({
    queryKey: ['github-releases'],
    queryFn: async () => {
      try {
        if (!GITHUB_TOKEN) {
          throw new Error(
            'GitHub token is not configured. Please add VITE_GITHUB_TOKEN to your environment variables.'
          );
        }
        const response = await githubApi.get(`/repos/${REPO_OWNER}/${REPO_NAME}/releases`);
        return { data: response.data };
      } catch (err) {
        throw new Error(handleApiError(err, 'Failed to fetch GitHub releases'));
      }
    },
    keepPreviousData: true
  });

  return {
    repoData,
    readmeData,
    changelogData,
    releases: data?.data ?? [],
    isLoading,
    error,
    isError,
    isPending
  };
};

const Changelog = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const [readmeOpen, setReadmeOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [notification, setNotification] = useState({
    open: false,
    message: '',
    severity: 'info',
    autoHideDuration: 6000,
    action: null
  });
  const [selectedDocBranch, setSelectedDocBranch] = useState('');
  const [branchMenuAnchor, setBranchMenuAnchor] = useState(null);
  const [availableBranches, setAvailableBranches] = useState([]);

  const { repoData, readmeData, changelogData, releases, isLoading, error, isError, isPending } = useGitHubData();

  useEffect(() => {
    if (repoData) {
      const fetchBranches = async () => {
        try {
          const response = await githubApi.get(`/repos/${REPO_OWNER}/${REPO_NAME}/branches`);
          setAvailableBranches(response.data.map((branch) => branch.name));
        } catch (error) {
          console.error('Failed to fetch branches:', error);
          setAvailableBranches([repoData.default_branch]);
        }
      };

      fetchBranches();
    }
  }, [repoData]);

  const showNotification = useCallback((message, severity = 'info', autoHideDuration = 6000, action = null) => {
    setNotification({
      open: true,
      message,
      severity,
      autoHideDuration,
      action
    });
  }, []);

  const handleCloseNotification = (event, reason) => {
    if (reason === 'clickaway') return;
    setNotification((prev) => ({ ...prev, open: false }));
  };

  const handleViewDocs = (branch) => {
    setSelectedDocBranch(branch);
    setReadmeOpen(true);
    setBranchMenuAnchor(null);
  };

  const handleOpenBranchMenu = (event) => {
    setBranchMenuAnchor(event.currentTarget);
  };

  const handleCloseBranchMenu = () => {
    setBranchMenuAnchor(null);
  };

  const downloadFile = useCallback(async (url, filename) => {
    try {
      // Show loading notification
      setNotification({
        open: true,
        message: (
          <Box>
            <AlertTitle>Starting Download</AlertTitle>
            <Typography variant="body2" color="text.secondary">
              Your download will begin shortly...
            </Typography>
          </Box>
        ),
        severity: 'info',
        autoHideDuration: 2000
      });

      // Open URL in new tab to trigger download
      window.open(url, '_blank');

      // Show success notification
      setNotification({
        open: true,
        message: `Download started for ${filename}`,
        severity: 'success',
        autoHideDuration: 3000
      });
    } catch (error) {
      console.error('Download failed:', error);
      // Show error notification
      setNotification({
        open: true,
        message: 'Failed to start download. Please try again.',
        severity: 'error',
        autoHideDuration: 5000,
        action: (
          <Button color="inherit" size="small" onClick={() => downloadFile(url, filename)}>
            Try Again
          </Button>
        )
      });
    }
  }, []);

  const handleDefaultBranchDownload = () => {
    if (!repoData) return;

    const url = `${repoData.html_url}/archive/refs/heads/${repoData.default_branch}.zip`;
    const filename = `${repoData.name}-${repoData.default_branch}.zip`;
    downloadFile(url, filename);
  };

  const columns = useMemo(
    () => [
      {
        accessorKey: 'name',
        header: 'Version',
        size: 250
      },
      {
        accessorKey: 'prerelease',
        header: 'Release Type',
        size: 250,
        Cell: ({ row }) => <ReleaseTypeChip isPrerelease={row.original.prerelease} isDraft={row.original.draft} />
      },
      {
        accessorKey: 'target_commitish',
        header: 'Branch',
        size: 250,
        Cell: ({ cell }) => <BranchChip branch={cell.getValue()} />
      },
      {
        accessorKey: 'body',
        header: 'Release Notes',
        size: 450,
        Cell: ({ cell, row }) => (
          <ReleaseNotes notes={cell.getValue()} version={row.original.name} publishedAt={row.original.published_at} />
        )
      },
      {
        accessorKey: 'published_at',
        header: 'Date',
        size: 250,
        Cell: ({ cell }) => <DateDisplay date={cell.getValue()} />
      },
      {
        accessorKey: 'author',
        header: 'Author',
        size: 250,
        Cell: ({ row }) => (
          <AuthorInfo
            author={row.original.author}
            releaseType={row.original.prerelease}
            createdAt={row.original.created_at}
            publishedAt={row.original.published_at}
            body={row.original.body}
          />
        )
      },
      {
        accessorKey: 'actions',
        header: 'Actions',
        size: 450,
        Cell: ({ row }) => (
          <ActionButtons release={row.original} repoOwner={REPO_OWNER} repoName={REPO_NAME} onDownload={downloadFile} />
        )
      }
    ],
    [downloadFile]
  );

  const tableProps = {
    columns,
    data: releases,
    initialState: {
      density: 'comfortable',
      pagination: { pageSize: 10, pageIndex: 0 },
      showColumnFilters: true,
      showGlobalFilter: true
    },
    enableRowSelection: false,
    state: {
      isLoading: isPending,
      showAlertBanner: isError,
      showProgressBars: isLoading
    },
    muiToolbarAlertBannerProps: error
      ? {
          color: 'error',
          children: error?.message || 'Failed to fetch GitHub releases'
        }
      : undefined
  };

  return (
    <Box>
      {repoData && (
        <Fade in={true} timeout={800}>
          <MainCard
            sx={{
              mb: 2
            }}
            title={
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Avatar>
                  <Icon icon="mdi:github" width="24" height="24" />
                </Avatar>
                <Box>
                  <Typography variant="h4">{repoData.name}</Typography>
                  <Typography variant="caption" color="textSecondary">
                    {repoData.full_name}
                  </Typography>
                </Box>
              </Box>
            }
            secondary={
              <Badge badgeContent={repoData.stargazers_count} color="warning" max={999}>
                <Tooltip title="Star this repository">
                  <IconButton color="warning" onClick={() => window.open(repoData.html_url, '_blank')}>
                    <Icon icon="mdi:star" />
                  </IconButton>
                </Tooltip>
              </Badge>
            }
          >
            <Typography variant="body1" paragraph>
              {repoData.description}
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, mb: 2, flexWrap: 'wrap' }}>
              <Chip
                icon={<Icon icon="mdi:star" />}
                label={`${repoData.stargazers_count} Stars`}
                variant="outlined"
                color="warning"
              />
              <Chip
                icon={<Icon icon="mdi:source-fork" />}
                label={`${repoData.forks_count} Forks`}
                variant="outlined"
                color="info"
              />
              <Chip
                icon={<Icon icon="mdi:eye" />}
                label={`${repoData.watchers_count} Watchers`}
                variant="outlined"
                color="success"
              />
              <Chip
                icon={<Icon icon="mdi:source-branch" />}
                label={`Default: ${repoData.default_branch}`}
                variant="outlined"
                color="primary"
              />
              <Chip
                icon={<Icon icon="mdi:license" />}
                label={repoData.license?.name || 'No License'}
                variant="outlined"
                color="secondary"
              />
            </Box>
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
              <Button
                variant="contained"
                startIcon={<Icon icon="mdi:github" />}
                onClick={() => window.open(repoData.html_url, '_blank')}
              >
                View on GitHub
              </Button>
              <Button
                variant="contained"
                startIcon={<Icon icon="mdi:book" />}
                onClick={() => setReadmeOpen(true)}
                color="primary"
              >
                View Documentation
              </Button>
              <Button
                variant="contained"
                startIcon={<Icon icon="mdi:source-branch" />}
                endIcon={<Icon icon="mdi:chevron-down" />}
                onClick={handleOpenBranchMenu}
                color="secondary"
              >
                Branch Docs
              </Button>
              <Menu anchorEl={branchMenuAnchor} open={Boolean(branchMenuAnchor)} onClose={handleCloseBranchMenu}>
                {availableBranches.map((branch) => (
                  <MenuItem key={branch} onClick={() => handleViewDocs(branch)}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Icon
                        icon={getBranchInfo(branch).icon}
                        style={{ color: theme.palette[getBranchInfo(branch).color].main }}
                      />
                      <Typography>{branch}</Typography>
                    </Box>
                  </MenuItem>
                ))}
              </Menu>
              <Button
                variant="contained"
                startIcon={<Icon icon="mdi:download" />}
                onClick={handleDefaultBranchDownload}
                color="success"
              >
                Download Latest {repoData.default_branch}
              </Button>
            </Box>
          </MainCard>
        </Fade>
      )}

      {repoData && releases.length > 0 && <RepositorySummary repoData={repoData} releases={releases} />}

      <Fade in={true} timeout={1000}>
        <MainCard
          contentSX={{
            p: '0 !important'
          }}
          title={
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Icon icon="mdi:history" width="24" height="24" />
              <Typography variant="h5">Release History</Typography>
            </Box>
          }
          secondary={
            <ExportData
              data={releases}
              columns={columns}
              exportTypes={['csv', 'excel', 'pdf']}
              ExportFileName="IEVERS_UI_Changelog"
              isLoading={isLoading}
              variant="contained"
              color="primary"
              size="small"
              componentVariant="Menu"
              aria-label="Export Changelog"
            />
          }
        >
          <Box sx={{ p: 1.5, display: 'flex', alignItems: 'center', gap: 1 }}>
            <Icon icon="mdi:information-outline" />
            <Typography variant="body2" color="textSecondary">
              Track all releases and updates for GIB UI application. For detailed changelog information, please
              <Button
                startIcon={<Icon icon="mdi:book" />}
                size="small"
                variant="text"
                onClick={() => setReadmeOpen(true)}
                sx={{ mx: 0.5 }}
              >
                view the documentation
              </Button>
            </Typography>
          </Box>
          <ReusableTable tableProps={tableProps} />
        </MainCard>
      </Fade>

      <DocumentationDialog
        open={readmeOpen}
        onClose={() => setReadmeOpen(false)}
        activeTab={activeTab}
        onTabChange={(e, newValue) => setActiveTab(newValue)}
        readmeData={readmeData}
        changelogData={changelogData}
        initialBranch={selectedDocBranch}
      />

      <Snackbar
        open={notification.open}
        autoHideDuration={notification.autoHideDuration}
        onClose={handleCloseNotification}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        TransitionComponent={Slide}
        TransitionProps={{ direction: 'up' }}
      >
        <Alert
          onClose={handleCloseNotification}
          severity={notification.severity}
          variant="filled"
          action={notification.action}
        >
          {notification.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Changelog;
