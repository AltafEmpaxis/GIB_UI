// material-ui
import { Icon } from '@iconify/react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { alpha, useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import { AnimatePresence, motion } from 'framer-motion';

// project import
import MainCard from 'components/MainCard';
import useAuth from 'hooks/useAuth';

function WelcomeCard() {
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

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        when: 'beforeChildren',
        staggerChildren: 0.08
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: 'easeOut' }
    }
  };

  const iconVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 15
      }
    },
    hover: {
      scale: 1.15,
      transition: {
        duration: 0.2,
        ease: 'easeInOut'
      }
    }
  };

  const avatarVariants = {
    hidden: { scale: 0, opacity: 0, rotateY: 90 },
    visible: {
      scale: 1,
      opacity: 1,
      rotateY: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15,
        delay: 0.3
      }
    }
  };

  const handVariants = {
    wave: {
      rotate: [0, -20, 20, -20, 20, 0],
      transition: {
        duration: 1.5,
        ease: 'easeInOut',
        times: [0, 0.2, 0.4, 0.6, 0.8, 1],
        repeat: Infinity,
        repeatDelay: 2
      }
    }
  };

  const decorationVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 1 }
    }
  };

  return (
    <AnimatePresence>
      <MainCard
        component={motion.div}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        sx={{
          position: 'relative',
          overflow: 'hidden',
          background: bgGradient,
          border: 0,
          borderRadius: 3,
          boxShadow: theme.palette.mode === 'dark' ? '0 12px 30px rgba(0,0,0,0.3)' : '0 12px 30px rgba(0,0,0,0.15)',
          p: { xs: 0.5, md: 1 }
        }}
      >
        {/* Decorative elements */}
        <Box
          component={motion.div}
          variants={decorationVariants}
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
          component={motion.div}
          variants={decorationVariants}
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

        <Box
          component={motion.div}
          variants={decorationVariants}
          sx={{
            position: 'absolute',
            right: 40,
            bottom: 10,
            width: 20,
            height: 20,
            borderRadius: '50%',
            background: alpha(theme.palette.primary.light, 0.2),
            boxShadow: `0 0 15px ${alpha(theme.palette.primary.light, 0.3)}`,
            zIndex: 0
          }}
        />

        <Stack
          component={motion.div}
          direction={{ xs: 'column', sm: 'row' }}
          justifyContent="space-between"
          alignItems={{ xs: 'flex-start', sm: 'center' }}
          position="relative"
          zIndex={1}
          spacing={2}
          sx={{ p: { xs: 2, md: 3 } }}
        >
          <Box component={motion.div} variants={itemVariants} sx={{ maxWidth: { xs: '100%', md: '75%' } }}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                alignItems: { xs: 'flex-start', sm: 'center' },
                mb: 1.5,
                flexWrap: 'wrap'
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  p: 1,
                  borderRadius: 2,
                  bgcolor: alpha(theme.palette.mode === 'dark' ? '#1a2027' : '#000000', 0.15),
                  backdropFilter: 'blur(8px)',
                  mr: { xs: 0, sm: 2 },
                  mb: { xs: 1, sm: 0 }
                }}
              >
                <Typography
                  variant="h3"
                  component={motion.div}
                  variants={itemVariants}
                  sx={{
                    color: '#ffffff',
                    fontWeight: 700,
                    mr: 1,
                    fontSize: { xs: '1.4rem', md: '1.6rem' },
                    textShadow: '0 2px 4px rgba(0,0,0,0.2)'
                  }}
                >
                  Greetings, {user?.username || 'User'}! &nbsp;
                  <motion.span variants={handVariants} animate="wave" style={{ display: 'inline-block' }}>
                    <Icon icon="twemoji:waving-hand" width={24} height={24} style={{ verticalAlign: 'middle' }} />
                  </motion.span>
                </Typography>
              </Box>

              <Chip
                icon={<Icon icon="solar:clock-circle-bold-duotone" width={24} />}
                label={new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                variant="filled"
                component={motion.div}
                variants={itemVariants}
                size="medium"
                sx={{
                  fontSize: '1rem',
                  fontWeight: 500,
                  height: 28
                }}
              />
            </Box>

            <Typography
              variant="h5"
              component={motion.div}
              variants={itemVariants}
              sx={{
                color: alpha('#ffffff', 0.95),
                mb: 1.5,
                fontWeight: 600,
                letterSpacing: '0.02em',
                fontSize: { xs: '1.1rem', md: '1.25rem' },
                textShadow: '0 1px 3px rgba(0,0,0,0.15)'
              }}
            >
              Welcome to GIB - Investment Excellence Redefined
            </Typography>

            <Box
              component={motion.div}
              variants={itemVariants}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 1.5
              }}
            >
              <Typography
                variant="body1"
                sx={{
                  color: alpha('#ffffff', 0.95),
                  letterSpacing: '0.02em',
                  lineHeight: 1.6,
                  maxWidth: '100%',
                  fontSize: { xs: '0.85rem', md: '0.9rem' },
                  p: 1.25,
                  borderRadius: 1.5,
                  bgcolor: alpha(theme.palette.mode === 'dark' ? '#1a2027' : '#000000', 0.15),
                  backdropFilter: 'blur(5px)',
                  border: `1px solid ${alpha('#ffffff', 0.1)}`
                }}
              >
                Experience the power of our Investment Verification & Reconciliation System, where precision meets
                efficiency. Streamline your portfolio reconciliation process with advanced automation, real-time
                monitoring, and intelligent discrepancy resolution between Custodian and APX platforms.
              </Typography>
            </Box>
          </Box>

          <Box
            component={motion.div}
            variants={avatarVariants}
            sx={{
              display: { xs: 'none', sm: 'flex' },
              flexDirection: 'column',
              alignItems: 'center',
              gap: 1
            }}
          >
            <Avatar
              component={motion.div}
              variants={avatarVariants}
              sx={{
                width: 130,
                height: 130,
                bgcolor: alpha(theme.palette.primary.main, 0.2),
                color: '#ffffff',
                backdropFilter: 'blur(5px)',
                boxShadow: '0 0 25px rgba(255,255,255,0.2), 0 8px 25px rgba(0,0,0,0.2)',
                border: `2px solid ${alpha('#ffffff', 0.4)}`
              }}
            >
              {user?.avatar ? (
                <img src={user.avatar} alt={user?.username || 'User'} style={{ width: '100%', height: '100%' }} />
              ) : (
                <Icon icon="solar:user-bold-duotone" width={65} height={65} />
              )}
            </Avatar>

            <Stack
              direction="row"
              spacing={1}
              component={motion.div}
              initial={{ opacity: 0 }}
              animate={{
                opacity: 1,
                transition: { delay: 0.7, duration: 0.5 }
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 32,
                  height: 32,
                  borderRadius: '50%',
                  bgcolor: alpha(theme.palette.primary.main, 0.8),
                  cursor: 'pointer',
                  '&:hover': {
                    bgcolor: theme.palette.primary.main,
                    transform: 'translateY(-2px)',
                    transition: 'all 0.2s'
                  }
                }}
              >
                <Icon icon="solar:settings-bold-duotone" color="#fff" width={18} />
              </Box>

              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 32,
                  height: 32,
                  borderRadius: '50%',
                  bgcolor: alpha(theme.palette.primary.main, 0.8),
                  cursor: 'pointer',
                  '&:hover': {
                    bgcolor: theme.palette.primary.main,
                    transform: 'translateY(-2px)',
                    transition: 'all 0.2s'
                  }
                }}
              >
                <Icon icon="solar:logout-3-bold-duotone" color="#fff" width={18} />
              </Box>
            </Stack>
          </Box>
        </Stack>
      </MainCard>
    </AnimatePresence>
  );
}

export default WelcomeCard;
