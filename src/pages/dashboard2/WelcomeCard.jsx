// material-ui
import { Icon } from '@iconify/react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { alpha, useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import Chip from '@mui/material/Chip';

// project import
import Skeleton from '@mui/material/Skeleton';
import MainCard from 'components/MainCard';
import useAuth from 'hooks/useAuth';

function WelcomeCard({ isLoading = false }) {
  const theme = useTheme();
  const { user } = useAuth();

  // Modern gradient based on theme
  const primaryMain = theme.palette.primary.main;
  const primaryDark = theme.palette.primary.dark;
  const secondaryDark = theme.palette.mode === 'dark' ? theme.palette.grey[800] : theme.palette.secondary.dark;

  const bgGradient =
    theme.palette.mode === 'dark'
      ? `linear-gradient(125deg, ${alpha(secondaryDark, 0.95)} 0%, ${alpha(primaryDark, 0.92)} 70%, ${alpha(theme.palette.primary.dark, 0.9)} 100%)`
      : `linear-gradient(125deg, ${alpha(primaryDark, 0.92)} 0%, ${alpha(primaryMain, 0.85)} 70%, ${alpha(theme.palette.primary.main, 0.8)} 100%)`;

  if (isLoading) {
    return (
      <MainCard
        sx={{
          mb: 2,
          position: 'relative',
          overflow: 'hidden',
          background: bgGradient,
          border: 0
        }}
      >
        <Stack spacing={2}>
          <Skeleton variant="text" height={40} width="70%" />
          <Skeleton variant="text" height={30} width="50%" />
          <Skeleton variant="text" height={60} width="90%" />
        </Stack>
      </MainCard>
    );
  }

  return (
    <MainCard
      sx={{
        position: 'relative',
        overflow: 'hidden',
        background: bgGradient,
        border: 0,
        boxShadow: theme.palette.mode === 'dark' ? '0 8px 24px rgba(0,0,0,0.3)' : '0 8px 24px rgba(0,0,0,0.12)',
        borderRadius: 3,
        mb: 2
      }}
    >
      {/* Decorative elements */}
      <Box
        sx={{
          position: 'absolute',
          top: -100,
          right: -60,
          width: 200,
          height: 200,
          borderRadius: '50%',
          background: alpha('#fff', 0.04),
          zIndex: 0
        }}
      />

      <Box
        sx={{
          position: 'absolute',
          bottom: -40,
          left: '30%',
          width: 100,
          height: 100,
          borderRadius: '50%',
          background: alpha('#fff', 0.06),
          zIndex: 0
        }}
      />

      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        position="relative"
        zIndex={1}
        sx={{ p: { xs: 2, md: 3 } }}
      >
        <Box>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              p: 1,
              borderRadius: 2,
              bgcolor: alpha(theme.palette.mode === 'dark' ? '#1a2027' : '#000000', 0.15),
              backdropFilter: 'blur(8px)',
              mb: 1
            }}
          >
            <Typography
              variant="h4"
              sx={{
                color: '#ffffff',
                fontWeight: 700,
                mb: 0.5
              }}
            >
              Hello, {user?.username || 'User'}! &nbsp;
              <span style={{ display: 'inline-block' }}>
                <Icon icon="twemoji:waving-hand" width={28} height={28} style={{ verticalAlign: 'middle' }} />
              </span>
            </Typography>
          </Box>

          <Typography
            variant="h5"
            sx={{
              color: alpha('#ffffff', 0.95),
              mb: 1,
              fontWeight: 600,
              letterSpacing: '0.02em'
            }}
          >
            Welcome to GIB Investment Solutions
          </Typography>

          <Typography
            variant="body2"
            sx={{
              color: alpha('#ffffff', 0.95),
              letterSpacing: '0.02em',
              lineHeight: 1.6,
              maxWidth: '90%'
            }}
          >
            Experience the power of GIB's Investment Verification & Reconciliation System. Our platform delivers
            industry-leading investment solutions focused on Treasury, Capital Markets, and Asset Management that adhere
            to Shariah-compliant standards for our Saudi clients.
          </Typography>
        </Box>

        <Avatar
          sx={{
            width: 70,
            height: 70,
            bgcolor: alpha('#ffffff', 0.2),
            color: '#ffffff',
            boxShadow: '0 0 20px rgba(255,255,255,0.15)',
            '&:hover': {
              bgcolor: alpha('#ffffff', 0.3)
            }
          }}
        >
          <Icon icon="solar:user-bold-duotone" width={32} height={32} />
        </Avatar>
      </Stack>
    </MainCard>
  );
}

WelcomeCard.propTypes = {
  isLoading: PropTypes.bool
};

export default WelcomeCard;
