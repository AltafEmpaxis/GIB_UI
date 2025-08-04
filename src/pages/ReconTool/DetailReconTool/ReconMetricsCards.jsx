import { Icon } from '@iconify/react';
import { alpha, Box, Card, Typography, useTheme } from '@mui/material';
import PropTypes from 'prop-types';

/**
 * MetricCard - A component for displaying metrics following GIB design system
 */
const MetricCard = ({ title = '', value = '', subtitle = '', icon = '', color = '', trend = '', sx = {} }) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  return (
    <Card
      elevation={0}
      sx={{
        height: '100%',
        position: 'relative',
        backgroundColor: theme.palette.background.paper,
        border: `1px solid ${theme.palette.divider}`,
        overflow: 'hidden',
        ...sx
      }}
    >
      {/* Accent top bar */}
      <Box
        sx={{
          height: 4,
          width: '100%',
          backgroundColor: color,
          opacity: 0.7
        }}
      />

      <Box sx={{ p: 2.5 }}>
        <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 38,
              height: 38,
              borderRadius: '8px',
              backgroundColor: alpha(color, isDark ? 0.2 : 0.12),
              color: color,
              mr: 1.5
            }}
          >
            <Icon icon={icon} width={22} height={22} />
          </Box>

          <Box sx={{ flex: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography
                variant="subtitle2"
                sx={{
                  fontWeight: 600,
                  color: theme.palette.text.primary,
                  fontSize: '0.875rem'
                }}
              >
                {title}
              </Typography>
            </Box>

            <Typography
              variant="caption"
              sx={{
                color: theme.palette.text.secondary,
                fontSize: '0.75rem',
                display: 'block',
                mt: 0.3
              }}
            >
              {subtitle}
            </Typography>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              color: theme.palette.text.primary
            }}
          >
            {value}
          </Typography>

          {trend && (
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                borderRadius: '4px',
                px: 0.8,
                py: 0.3,
                backgroundColor: alpha(
                  trend.startsWith('+') ? theme.palette.success.main : theme.palette.error.main,
                  isDark ? 0.15 : 0.08
                )
              }}
            >
              <Icon
                icon={trend.startsWith('+') ? 'solar:arrow-up-bold' : 'solar:arrow-down-bold'}
                width={12}
                height={12}
                style={{
                  color: trend.startsWith('+') ? theme.palette.success.main : theme.palette.error.main,
                  marginRight: 3
                }}
              />
              <Typography
                variant="caption"
                color={trend.startsWith('+') ? 'success.main' : 'error.main'}
                sx={{ fontWeight: 600, fontSize: '0.7rem' }}
              >
                {trend}
              </Typography>
            </Box>
          )}
        </Box>
      </Box>
    </Card>
  );
};

MetricCard.propTypes = {
  title: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  subtitle: PropTypes.string,
  icon: PropTypes.string,
  color: PropTypes.string,
  trend: PropTypes.string,
  onClick: PropTypes.func,
  isActive: PropTypes.bool,
  sx: PropTypes.object
};

MetricCard.defaultProps = {
  isActive: false,
  onClick: () => {}
};

export default MetricCard;
