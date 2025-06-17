// material-ui
import { Icon } from '@iconify/react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { alpha, useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { AnimatePresence, motion } from 'framer-motion';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

// project import
import MainCard from 'components/MainCard';
import useAuth from 'hooks/useAuth';
import Skeleton from '@mui/material/Skeleton';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';

const MotionAvatar = motion(Avatar);
const MotionStack = motion(Stack);
const MotionBox = motion(Box);
const MotionDivider = motion(Divider);
const MotionChip = motion(Chip);

function WelcomeCard({ isLoading = false }) {
  const theme = useTheme();
  const { user } = useAuth();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [greeting, setGreeting] = useState('');

  // Update time and greeting
  useEffect(() => {
    const getGreeting = () => {
      const hour = currentTime.getHours();
      if (hour >= 5 && hour < 12) {
        return 'Sabah Al-Khair'; // Good morning in Arabic
      } else if (hour >= 12 && hour < 17) {
        return 'Masaa Al-Khair'; // Good afternoon in Arabic
      } else {
        return 'Masaa Al-Noor'; // Good evening in Arabic
      }
    };

    setGreeting(getGreeting());

    const timeInterval = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(timeInterval);
  }, [currentTime]);

  // Format date for Islamic calendar
  const getIslamicDate = () => {
    const months = [
      'Muharram',
      'Safar',
      'Rabi al-Awwal',
      'Rabi al-Thani',
      'Jumada al-Awwal',
      'Jumada al-Thani',
      'Rajab',
      'Shaban',
      'Ramadan',
      'Shawwal',
      'Dhul Qadah',
      'Dhul Hijjah'
    ];

    // Simulate Islamic date - in production, use a proper Hijri calendar library
    const day = Math.min(currentTime.getDate() + 5, 30);
    const month = months[currentTime.getMonth()];
    const year = 1446; // Approximate current Hijri year

    return `${day} ${month}, ${year} AH`;
  };

  // Modern gradient using theme colors
  const primaryMain = theme.palette.primary.main;
  const primaryDark = theme.palette.primary.dark;
  const secondaryDark = theme.palette.mode === 'dark' ? theme.palette.grey[800] : theme.palette.secondary.dark;

  // Improved gradient with better contrast
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
        staggerChildren: 0.06
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

  const chipVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.3 }
    },
    hover: {
      y: -2,
      boxShadow: '0 3px 6px rgba(0,0,0,0.15)',
      transition: { duration: 0.2 }
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

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  if (isLoading) {
    return (
      <MainCard
        sx={{
          position: 'relative',
          overflow: 'hidden',
          background: bgGradient,
          border: 0,
          borderRadius: 3,
          boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
          p: { xs: 2.5, md: 3.5 }
        }}
      >
        <Stack spacing={2.5}>
          <Skeleton variant="text" height={40} width="70%" sx={{ bgcolor: alpha('#fff', 0.2) }} />
          <Skeleton variant="text" height={30} width="50%" sx={{ bgcolor: alpha('#fff', 0.15) }} />
          <Skeleton variant="text" height={60} width="90%" sx={{ bgcolor: alpha('#fff', 0.1) }} />
        </Stack>
      </MainCard>
    );
  }

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

        <MotionStack
          direction={{ xs: 'column', sm: 'row' }}
          justifyContent="space-between"
          alignItems={{ xs: 'flex-start', sm: 'center' }}
          position="relative"
          zIndex={1}
          spacing={2}
        >
          <MotionBox variants={itemVariants} sx={{ maxWidth: { xs: '100%', md: '80%' } }}>
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
                  {greeting}, {user?.username || 'User'}! &nbsp;
                  <motion.span variants={handVariants} animate="wave" style={{ display: 'inline-block' }}>
                    <Icon icon="twemoji:waving-hand" width={24} height={24} style={{ verticalAlign: 'middle' }} />
                  </motion.span>
                </Typography>
              </Box>

              <MotionChip
                icon={<Icon icon="solar:clock-circle-bold-duotone" width={24} />}
                label={formatTime(currentTime)}
                variant="filled"
                size="small"
                component={motion.div}
                variants={chipVariants}
                whileHover="hover"
                sx={{
                  fontSize: '1rem',
                  fontWeight: 500,
                  height: 28
                }}
              />
            </Box>

            <Box
              component={motion.div}
              variants={itemVariants}
              sx={{
                color: alpha('#ffffff', 0.9),
                mb: 1.5,
                display: 'flex',
                alignItems: 'center',
                fontSize: '0.8rem',
                backdropFilter: 'blur(8px)',
                p: 1.25,
                borderRadius: 2,
                bgcolor: alpha(theme.palette.mode === 'dark' ? '#1a2027' : '#000000', 0.2),
                border: `1px solid ${alpha('#ffffff', 0.2)}`,
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                position: 'relative',
                overflow: 'hidden',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  background: `linear-gradient(90deg, ${alpha('#fff', 0.1)}, transparent 50%)`,
                  zIndex: 0
                }
              }}
            >
              <Box
                component={motion.div}
                variants={iconVariants}
                whileHover="hover"
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 32,
                  height: 32,
                  borderRadius: '50%',
                  bgcolor: alpha(theme.palette.primary.main, 0.2),
                  mr: 1.5,
                  boxShadow: `0 2px 8px ${alpha(theme.palette.primary.main, 0.3)}`,
                  zIndex: 1
                }}
              >
                <Icon
                  icon="solar:calendar-bold-duotone"
                  style={{
                    fontSize: '24px',
                    color: '#fff'
                  }}
                />
              </Box>
              <Box sx={{ position: 'relative', zIndex: 1 }}>
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: 500,
                    fontSize: '0.8rem',
                    color: alpha('#ffffff', 0.95)
                  }}
                >
                  {getIslamicDate()}
                </Typography>
                <Typography
                  variant="caption"
                  sx={{
                    opacity: 0.9,
                    fontSize: '0.75rem',
                    color: alpha('#ffffff', 0.9)
                  }}
                >
                  {currentTime.toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </Typography>
              </Box>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
              <Box
                component={motion.div}
                variants={iconVariants}
                whileHover="hover"
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 36,
                  height: 36,
                  borderRadius: '50%',
                  bgcolor: alpha(theme.palette.primary.main, 0.2),
                  mr: 1.5,
                  boxShadow: `0 2px 8px ${alpha(theme.palette.primary.main, 0.3)}`
                }}
              >
                <Icon
                  icon="solar:star-bold-duotone"
                  style={{
                    fontSize: '24px',
                    color: '#fff'
                  }}
                />
              </Box>
              <Typography
                variant="h5"
                component={motion.div}
                variants={itemVariants}
                sx={{
                  color: alpha('#ffffff', 0.95),
                  fontWeight: 600,
                  letterSpacing: '0.02em',
                  fontSize: { xs: '1.1rem', md: '1.25rem' },
                  textShadow: '0 1px 3px rgba(0,0,0,0.15)'
                }}
              >
                Welcome to GIB Investment Solutions
              </Typography>
            </Box>

            <MotionDivider
              variants={itemVariants}
              sx={{
                bgcolor: alpha('#ffffff', 0.2),
                mb: 1.5
              }}
            />

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
                Experience the power of GIB's Investment Verification & Reconciliation System. Our platform delivers
                industry-leading investment solutions focused on Treasury, Capital Markets, and Asset Management that
                adhere to Shariah-compliant standards for our Saudi clients.
              </Typography>
            </Box>
          </MotionBox>

          <MotionBox
            variants={avatarVariants}
            sx={{
              display: { xs: 'none', sm: 'flex' },
              flexDirection: 'column',
              alignItems: 'center',
              gap: 1
            }}
          >
            <Box sx={{ position: 'relative' }}>
              <MotionAvatar
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
                  <Icon icon="solar:user-bold-duotone" width={40} height={40} />
                )}
              </MotionAvatar>
            </Box>

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
                  width: 28,
                  height: 28,
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
                  width: 28,
                  height: 28,
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
          </MotionBox>
        </MotionStack>
      </MainCard>
    </AnimatePresence>
  );
}

WelcomeCard.propTypes = {
  isLoading: PropTypes.bool
};

export default WelcomeCard;
