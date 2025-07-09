import { Icon } from '@iconify/react';
import { alpha, Box, Card, IconButton, Typography, useTheme } from '@mui/material';
import PropTypes from 'prop-types';

/**
 * MetricCard - A component for displaying metrics following GIB design system
 */
const MetricCard = ({ title, value, subtitle, icon, color, trend, onClick, isActive }) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  return (
    <Card
      onClick={onClick}
      elevation={isActive ? 2 : 0}
      sx={{
        height: '100%',
        position: 'relative',
        // borderRadius: theme.shape.borderRadius,
        backgroundColor: isActive ? alpha(color, isDark ? 0.2 : 0.08) : theme.palette.background.paper,
        border: `1px solid ${isActive ? color : alpha(theme.palette.divider, isDark ? 0.28 : 0.12)}`,
        overflow: 'hidden',
        cursor: 'pointer',
        transition: theme.transitions.create(['background-color', 'box-shadow', 'border-color'], {
          duration: theme.transitions.duration.shorter
        }),
        '&:hover': {
          backgroundColor: alpha(color, isDark ? 0.15 : 0.05),
          borderColor: alpha(color, isDark ? 0.6 : 0.4),
          boxShadow: isActive ? theme.shadows[4] : theme.shadows[2]
        }
      }}
    >
      {/* Accent top bar */}
      <Box
        sx={{
          height: 4,
          width: '100%',
          backgroundColor: color,
          opacity: isActive ? 1 : 0.7
        }}
      />

      <Box sx={{ p: 2.5 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1.5 }}>
          <Typography
            variant="subtitle1"
            sx={{
              fontWeight: 600,
              color: theme.palette.text.primary,
              display: 'flex',
              alignItems: 'center'
            }}
          >
            {title}
            {isActive && (
              <Box
                component="span"
                sx={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  ml: 1,
                  borderRadius: '4px',
                  bgcolor: alpha(color, 0.15),
                  px: 0.8,
                  py: 0.2
                }}
              >
                <Icon icon="mdi:filter" width={10} height={10} style={{ color, marginRight: 4 }} />
                <Typography variant="caption" sx={{ color, fontWeight: 600, fontSize: '0.65rem' }}>
                  ACTIVE
                </Typography>
              </Box>
            )}
          </Typography>

          <IconButton
            sx={{
              backgroundColor: alpha(color, isDark ? 0.2 : 0.12)
            }}
          >
            <Icon icon={icon} width={20} height={20} />
          </IconButton>
        </Box>

        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
            color: theme.palette.text.primary,
            mb: 0.5
          }}
        >
          {value}
        </Typography>

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            mt: 1
          }}
        >
          <Typography
            variant="caption"
            sx={{
              color: theme.palette.text.secondary,
              fontSize: '0.75rem'
            }}
          >
            {subtitle}
          </Typography>

          {trend && (
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                borderRadius: theme.shape.borderRadius / 2,
                px: 0.8,
                py: 0.3,
                backgroundColor: alpha(
                  trend.startsWith('+') ? theme.palette.success.main : theme.palette.error.main,
                  isDark ? 0.2 : 0.1
                )
              }}
            >
              <Icon
                icon={trend.startsWith('+') ? 'mdi:arrow-up' : 'mdi:arrow-down'}
                width={12}
                height={12}
                style={{
                  color: trend.startsWith('+') ? theme.palette.success.main : theme.palette.error.main,
                  marginRight: 3
                }}
              />
              <Typography
                variant="caption"
                color={trend.startsWith('+') ? theme.palette.success.main : theme.palette.error.main}
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
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  subtitle: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  trend: PropTypes.string,
  onClick: PropTypes.func,
  isActive: PropTypes.bool
};

MetricCard.defaultProps = {
  isActive: false,
  onClick: () => {}
};

export default MetricCard;
