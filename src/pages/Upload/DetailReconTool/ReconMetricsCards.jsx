import { Icon } from '@iconify/react';
import { alpha, Box, Card, Typography, useTheme } from '@mui/material';
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
      elevation={isActive ? 1 : 0}
      sx={{
        height: '100%',
        position: 'relative',
        backgroundColor: isActive ? alpha(color, isDark ? 0.15 : 0.08) : theme.palette.background.paper,
        border: `1px solid ${isActive ? color : theme.palette.divider}`,
        overflow: 'hidden',
        cursor: 'pointer',
        transition: theme.transitions.create(['background-color', 'border-color', 'box-shadow', 'transform'], {
          duration: theme.transitions.duration.shorter
        }),
        '&:hover': {
          backgroundColor: alpha(color, isDark ? 0.12 : 0.06),
          borderColor: alpha(color, 0.6),
          boxShadow: theme.shadows[2],
          transform: 'translateY(-2px)'
        },
        '&:active': {
          transform: 'translateY(0px)',
          boxShadow: theme.shadows[1]
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
              mr: 1.5,
              transition: 'transform 0.2s ease-in-out',
              ...(isActive && {
                transform: 'scale(1.05)',
                boxShadow: `0 0 8px ${alpha(color, 0.4)}`
              })
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
                  color: isActive ? color : theme.palette.text.primary,
                  fontSize: '0.875rem'
                }}
              >
                {title}
              </Typography>

              {isActive && (
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '4px',
                    bgcolor: alpha(color, isDark ? 0.25 : 0.15),
                    px: 0.8,
                    py: 0.3,
                    ml: 1,
                    boxShadow: `0 0 4px ${alpha(color, 0.3)}`
                  }}
                >
                  <Icon icon="solar:filter-bold" width={12} height={12} style={{ color, marginRight: 4 }} />
                  <Typography variant="caption" sx={{ color, fontWeight: 600, fontSize: '0.65rem' }}>
                    ACTIVE
                  </Typography>
                </Box>
              )}
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
              color: theme.palette.text.primary,
              transition: 'color 0.2s ease-in-out',
              ...(isActive && {
                color: isDark ? theme.palette.text.primary : theme.palette.text.primary
              })
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
