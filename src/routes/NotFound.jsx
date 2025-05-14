import { Icon } from '@iconify/react';
import {
  Box,
  Button,
  Container,
  Typography,
  useMediaQuery,
  useTheme,
  Stack,
  Paper,
  Divider,
  alpha
} from '@mui/material';
import { motion } from 'framer-motion';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router';

import useAuth from 'hooks/useAuth';

// ==============================|| 404 - NOT FOUND ||============================== //

const NotFound = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const matchDownSM = useMediaQuery(theme.breakpoints.down('sm'));
  const { state, pathname } = useLocation();
  const requestedPath = state?.from?.pathname || pathname;

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        when: 'beforeChildren',
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <Container>
      <Box
        component={motion.div}
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          textAlign: 'center',
          padding: theme.spacing(3),
          gap: 2
        }}
      >
        <Paper
          elevation={24}
          sx={{
            p: 4,
            borderRadius: 4,
            maxWidth: 480,
            width: '100%',
            bgcolor: alpha(theme.palette.background.paper, 0.9),
            backdropFilter: 'blur(8px)',
            boxShadow: theme.customShadows?.primary || 'none',
            border:
              theme.palette.mode === 'dark'
                ? `1px solid ${theme.palette.divider}`
                : `1px solid ${theme.palette.grey[200]}`
          }}
        >
          <Stack spacing={3} alignItems="center">
            <motion.div variants={itemVariants}>
              <Typography
                variant="h1"
                sx={{
                  background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  fontSize: matchDownSM ? '8rem' : '12rem',
                  fontWeight: 900,
                  lineHeight: 1,
                  mb: 2,
                  filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))'
                }}
              >
                404
              </Typography>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Typography variant="h4" color="textPrimary" gutterBottom fontWeight="bold">
                Sorry, page not found!
              </Typography>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Typography variant="body1" color="textSecondary" sx={{ mb: 2 }}>
                Sorry, we couldn&apos;t find the page you&apos;re looking for. Perhaps you&apos;ve mistyped the URL? Be
                sure to check your spelling.
              </Typography>
            </motion.div>

            {requestedPath !== '/not-found' && (
              <motion.div variants={itemVariants} style={{ width: '100%' }}>
                <Paper
                  sx={{
                    p: 2,
                    bgcolor: alpha(theme.palette.error.lighter, 0.8),
                    borderRadius: 2,
                    border: `1px solid ${theme.palette.error.light}`
                  }}
                >
                  <Typography variant="body2" color="error.dark">
                    Requested path: {requestedPath}
                  </Typography>
                </Paper>
              </motion.div>
            )}

            <Divider sx={{ width: '100%', my: 2 }} />

            <motion.div variants={itemVariants}>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <Button
                  onClick={handleGoBack}
                  variant="outlined"
                  color="primary"
                  startIcon={<Icon icon="solar:arrow-left-bold-duotone" />}
                  sx={{
                    borderRadius: 2,
                    minWidth: 130,
                    '&:hover': {
                      boxShadow: theme.customShadows?.primary || 'none'
                    }
                  }}
                >
                  Go Back
                </Button>

                <Button
                  component={RouterLink}
                  to={isAuthenticated ? '/dashboard' : '/login'}
                  variant="contained"
                  color="primary"
                  startIcon={<Icon icon="solar:home-2-bold-duotone" />}
                  sx={{
                    borderRadius: 2,
                    minWidth: 130,
                    boxShadow: theme.customShadows?.primary || 'none',
                    '&:hover': {
                      boxShadow: 'none'
                    }
                  }}
                >
                  {isAuthenticated ? 'Dashboard' : 'Login'}
                </Button>
              </Stack>
            </motion.div>
          </Stack>
        </Paper>
      </Box>
    </Container>
  );
};

export default NotFound;

{
  /* Optional: Add a 404 illustration or animation here */
}
{
  /* <Box
          component="img"
          src="/404-illustration.svg" // Add your 404 illustration
          alt="404"
          sx={{
            maxWidth: 320,
            width: '100%',
            display: { xs: 'none', md: 'block' }
          }}
        /> */
}
