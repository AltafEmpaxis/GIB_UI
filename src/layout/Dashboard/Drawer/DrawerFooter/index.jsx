import BugReportIcon from '@mui/icons-material/BugReport';
import BuildIcon from '@mui/icons-material/Build';
import CodeIcon from '@mui/icons-material/Code';
import NewReleasesIcon from '@mui/icons-material/NewReleases';
import VerifiedIcon from '@mui/icons-material/Verified';
import { Box, Chip, Tooltip } from '@mui/material';
import PropTypes from 'prop-types';

import { version } from '../../../../../package.json';

import DrawerFooterStyled from './DrawerFooterStyled';

const DrawerFooter = ({ open }) => {
  // Environment configurations for semantic-release
  const ENV_CONFIG = {
    development: {
      label: 'DEV',
      color: 'info',
      icon: <CodeIcon />,
      description: 'Development Build'
    },
    production: {
      label: 'PROD',
      color: 'success',
      icon: <VerifiedIcon />,
      description: 'Production Release'
    },
    qa: {
      label: 'QA',
      color: 'warning',
      icon: <BugReportIcon />,
      description: 'Quality Assurance'
    },
    uat: {
      label: 'UAT',
      color: 'secondary',
      icon: <BuildIcon />,
      description: 'User Acceptance'
    },
    hotfix: {
      label: 'HOTFIX',
      color: 'error',
      icon: <NewReleasesIcon />,
      description: 'Emergency Fix'
    }
  };

  // Get current environment and config
  const mode = import.meta.env.MODE;
  const envConfig = ENV_CONFIG[mode] || {
    label: mode.toUpperCase(),
    color: 'default',
    icon: <CodeIcon />,
    description: 'Custom Environment'
  };

  // Format version display
  const versionDisplay = `v${version}`;

  // Tooltip content with version and environment info
  const tooltipContent = (
    <div>
      <strong>{envConfig.description}</strong>
      <br />
      Version: {versionDisplay}
      <br />
      Environment: {mode}
    </div>
  );

  return (
    <DrawerFooterStyled open={open}>
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
          px: 2
        }}
      >
        {open ? (
          <Tooltip title={tooltipContent} arrow placement="top">
            <Chip
              label={`${versionDisplay} (${envConfig.label})`}
              color={envConfig.color}
              icon={envConfig.icon}
              variant="outlined"
              size="small"
            />
          </Tooltip>
        ) : (
          <Tooltip title={tooltipContent} arrow placement="right">
            <Chip
              label={envConfig.label}
              color={envConfig.color}
              icon={envConfig.icon}
              variant="outlined"
              size="small"
            />
          </Tooltip>
        )}
      </Box>
    </DrawerFooterStyled>
  );
};

DrawerFooter.propTypes = {
  open: PropTypes.bool
};

export default DrawerFooter;
