// material-ui
import { Icon } from '@iconify/react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { alpha, useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { AnimatePresence, motion } from 'framer-motion';

// project import
import MainCard from 'components/MainCard';
import useAuth from 'hooks/useAuth';

const MotionAvatar = motion.create(Avatar);
const MotionStack = motion.create(Stack);
const MotionBox = motion.create(Box);

function WelcomeCard() {
  const theme = useTheme();
  const { user } = useAuth();

  const bgColor =
    theme.palette.mode === 'dark'
      ? `linear-gradient(75deg, ${alpha(theme.palette.primary.darker, 0.85)} 0%, ${theme.palette.primary.dark} 100%)`
      : `linear-gradient(75deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`;

  const overlayColor =
    theme.palette.mode === 'dark' ? alpha(theme.palette.common.white, 0.1) : alpha(theme.palette.primary.light, 0.25);

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        when: 'beforeChildren',
        staggerChildren: 0.1
      }
    },
    hover: {
      scale: 1.01,
      transition: {
        duration: 0.2,
        ease: 'easeInOut'
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5 }
    }
  };

  const avatarVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        type: 'spring',
        stiffness: 200,
        damping: 20
      }
    },
    hover: {
      scale: 1.1,
      rotate: 10,
      transition: {
        type: 'spring',
        stiffness: 400,
        damping: 10
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

  return (
    <AnimatePresence>
      <MainCard
        component={motion.div}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        whileHover="hover"
        sx={{
          position: 'relative',
          overflow: 'hidden',
          background: bgColor,
          border: 0,
          cursor: 'pointer',
          '&:after': {
            content: '""',
            position: 'absolute',
            width: 300,
            height: 300,
            right: -60,
            top: -80,
            borderRadius: '100%',
            background: `linear-gradient(210.04deg, ${overlayColor} 0%, ${alpha(theme.palette.primary.darker, 0)} 77.16%)`,
            transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
          },
          '&:before': {
            content: '""',
            position: 'absolute',
            width: 200,
            height: 200,
            right: -40,
            top: -40,
            borderRadius: '100%',
            background: `linear-gradient(140.9deg, ${alpha(overlayColor, 0.5)} 0%, ${alpha(theme.palette.primary.darker, 0)} 77.16%)`,
            transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
          },
          '&:hover': {
            '&:after': {
              transform: 'translateX(-20px) translateY(20px) scale(1.1)',
              opacity: theme.palette.mode === 'dark' ? 0.3 : 0.8
            },
            '&:before': {
              transform: 'translateX(20px) translateY(-20px) scale(1.15)',
              opacity: theme.palette.mode === 'dark' ? 0.4 : 0.8
            }
          },
          mb: 2
        }}
      >
        <MotionStack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          position="relative"
          zIndex={1}
          variants={itemVariants}
        >
          <MotionBox variants={itemVariants}>
            <Typography
              variant="h4"
              component={motion.div}
              variants={itemVariants}
              sx={{
                color: theme.palette.mode === 'dark' ? 'primary.lighter' : 'common.white',
                fontWeight: 700,
                mb: 1
              }}
            >
              Greetings, {user?.username || 'User'}! &nbsp;
              <motion.span variants={handVariants} animate="wave" style={{ display: 'inline-block' }}>
                <Icon icon="twemoji:waving-hand" width="32" height="32" style={{ verticalAlign: 'middle' }} />
              </motion.span>
            </Typography>
            <Typography
              variant="h5"
              component={motion.div}
              variants={itemVariants}
              sx={{
                color: alpha(theme.palette.primary.lighter, 0.95),
                mb: 1,
                fontWeight: 600,
                letterSpacing: '0.02em'
              }}
            >
              Welcome to GIB - Investment Excellence Redefined
            </Typography>
            <Typography
              variant="body2"
              component={motion.div}
              variants={itemVariants}
              sx={{
                color: alpha(theme.palette.primary.lighter, 0.95),
                letterSpacing: '0.02em',
                lineHeight: 1.6,
                maxWidth: '90%'
              }}
            >
              Experience the power of our Investment Verification & Reconciliation System, where precision meets
              efficiency. Streamline your portfolio reconciliation process with advanced automation, real-time
              monitoring, and intelligent discrepancy resolution between Custodian and APX platforms.
            </Typography>
          </MotionBox>
          <MotionAvatar
            variants={avatarVariants}
            whileHover="hover"
            sx={{
              width: 70,
              height: 70,
              bgcolor:
                theme.palette.mode === 'dark'
                  ? alpha(theme.palette.common.white, 0.1)
                  : alpha(theme.palette.primary.lighter, 0.25),
              color: 'common.white',
              cursor: 'pointer',
              boxShadow: theme.palette.mode === 'dark' ? '0 0 20px rgba(255,255,255,0.1)' : '0 0 20px rgba(0,0,0,0.1)',
              '&:hover': {
                bgcolor:
                  theme.palette.mode === 'dark'
                    ? alpha(theme.palette.common.white, 0.2)
                    : alpha(theme.palette.primary.lighter, 0.35)
              }
            }}
          >
            <Icon icon="solar:user-bold-duotone" width={32} height={32} />
          </MotionAvatar>
        </MotionStack>
      </MainCard>
    </AnimatePresence>
  );
}

export default WelcomeCard;
