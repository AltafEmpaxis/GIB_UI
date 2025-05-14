import { Icon } from '@iconify/react';
import { IconButton, Tooltip } from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';
import PropTypes from 'prop-types';
import React, { useEffect, useState, useTransition } from 'react';

// ==============================|| FULLSCREEN TOGGLE ||============================== //

const FullscreenToggle = ({ sx }) => {
  const theme = useTheme();
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const toggleFullScreen = () => {
    startTransition(() => {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch((e) => {
          console.error(`Error attempting to enable full-screen mode: ${e.message}`);
        });
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        }
      }
    });
  };

  // Effect for handling fullscreen changes
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  // Pre-compute icon based on state
  const iconName = isFullscreen ? 'solar:minimize-square-bold-duotone' : 'solar:maximize-square-bold-duotone';

  const tooltipTitle = isFullscreen ? 'Exit Fullscreen' : 'Fullscreen';

  return (
    <Tooltip title={tooltipTitle}>
      <IconButton
        onClick={toggleFullScreen}
        color="secondary"
        sx={{
          background: alpha(theme.palette.grey[400], 0.2),
          opacity: isPending ? 0.7 : 1,
          transition: 'opacity 0.2s',
          ...sx
        }}
      >
        <Icon icon={iconName} width={24} height={24} />
      </IconButton>
    </Tooltip>
  );
};

FullscreenToggle.propTypes = {
  sx: PropTypes.object
};

FullscreenToggle.defaultProps = {
  sx: {}
};

export default React.memo(FullscreenToggle);
