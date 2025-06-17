import { useState } from 'react';

// material-ui
import { Icon } from '@iconify/react';
import { alpha, Avatar, Box, Card, CardContent, Chip, IconButton, Stack, Typography, useTheme } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';

// project imports
import MainCard from 'components/MainCard';

// ==============================|| LEADERSHIP CARD ||============================== //

const LeadershipCard = () => {
  const theme = useTheme();
  const [currentLeader, setCurrentLeader] = useState(0);

  // Sample leadership data - in a real app, this would come from an API or CMS
  const leaders = [
    {
      id: 1,
      name: 'Ahmed Al-Sayed',
      position: 'Chief Executive Officer',
      message:
        'Our commitment to excellence and innovation drives everything we do at GIB. Together, we are building a stronger future for our clients and partners.',
      image: 'https://i.pravatar.cc/150?img=33'
    },
    {
      id: 2,
      name: 'Sarah Al-Mahmoud',
      position: 'Chief Financial Officer',
      message:
        'Financial integrity and transparency are the foundations of our business. We strive to create sustainable value for all our stakeholders.',
      image: 'https://i.pravatar.cc/150?img=32'
    },
    {
      id: 3,
      name: 'Mohammed Al-Harbi',
      position: 'Chief Technology Officer',
      message:
        'Technology is transforming the investment landscape. Our innovative solutions help clients navigate complexity and achieve their goals.',
      image: 'https://i.pravatar.cc/150?img=65'
    }
  ];

  const handleNext = () => {
    setCurrentLeader((prev) => (prev + 1) % leaders.length);
  };

  const handlePrevious = () => {
    setCurrentLeader((prev) => (prev - 1 + leaders.length) % leaders.length);
  };

  const leader = leaders[currentLeader];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  const cardVariants = {
    initial: {
      opacity: 0,
      y: 20,
      scale: 0.98
    },
    animate: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: 'easeOut'
      }
    },
    exit: {
      opacity: 0,
      scale: 0.98,
      transition: {
        duration: 0.3
      }
    }
  };

  return (
    <MainCard
      component={motion.div}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      title={
        <Stack direction="row" alignItems="center" spacing={1.5}>
          <Avatar
            sx={{
              width: 34,
              height: 34,
              bgcolor: alpha(theme.palette.primary.main, 0.2),
              color: theme.palette.primary.main
            }}
          >
            <Icon icon="solar:users-group-rounded-bold-duotone" width={22} height={22} />
          </Avatar>
          <Typography variant="h5">Leadership Insights</Typography>
        </Stack>
      }
      secondary={
        <Chip
          label={`${currentLeader + 1}/${leaders.length}`}
          size="small"
          variant="filled"
          color="primary"
          sx={{
            fontSize: '0.75rem',
            height: 24
          }}
        />
      }
      sx={{
        height: '100%',
        borderRadius: 2,
        overflow: 'hidden',
        boxShadow: theme.palette.mode === 'dark' ? '0 3px 14px rgba(0,0,0,0.3)' : '0 3px 14px rgba(58,53,65,0.1)'
      }}
    >
      <AnimatePresence mode="wait">
        <Card
          component={motion.div}
          key={leader.id}
          variants={cardVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          elevation={0}
          sx={{
            bgcolor: alpha(theme.palette.primary.main, 0.07),
            p: 0,
            borderRadius: 2,
            position: 'relative',
            height: 'calc(100% - 16px)',
            overflow: 'hidden',
            '&::before': {
              content: '""',
              position: 'absolute',
              width: 210,
              height: 210,
              background: `linear-gradient(140.9deg, ${theme.palette.primary.light} -14.02%, rgba(144, 202, 249, 0) 70.58%)`,
              borderRadius: '50%',
              top: -85,
              right: -95,
              opacity: 0.12
            }
          }}
        >
          <CardContent sx={{ height: '100%', p: { xs: 1.5, sm: 2.5 }, display: 'flex', flexDirection: 'column' }}>
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              spacing={2}
              alignItems={{ xs: 'flex-start', sm: 'center' }}
              sx={{ mb: 3 }}
            >
              <Box
                sx={{
                  position: 'relative',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                {/* Circular border using pseudo-element for better browser compatibility */}
                <Box
                  sx={{
                    position: 'absolute',
                    width: 86,
                    height: 86,
                    borderRadius: '50%',
                    background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.3)}, ${alpha(theme.palette.primary.light, 0.3)})`,
                    zIndex: 0
                  }}
                />
                <Avatar
                  src={leader.image}
                  alt={leader.name}
                  sx={{
                    width: 80,
                    height: 80,
                    border: `3px solid ${theme.palette.background.paper}`,
                    zIndex: 1
                  }}
                />
              </Box>
              <Box sx={{ flexGrow: 1 }}>
                <Typography variant="h5" color="primary.main" sx={{ fontWeight: 600, mb: 0.5 }}>
                  {leader.name}
                </Typography>
                <Chip
                  label={leader.position}
                  size="small"
                  sx={{
                    bgcolor: alpha(theme.palette.primary.main, 0.15),
                    color: theme.palette.primary.main,
                    borderRadius: 1,
                    fontSize: '0.75rem',
                    height: 24
                  }}
                />
              </Box>
            </Stack>

            <Box
              sx={{
                position: 'relative',
                p: { xs: 1.5, sm: 2 },
                borderRadius: 2,
                bgcolor: alpha(theme.palette.background.paper, 0.7),
                boxShadow: `inset 0 1px 5px ${alpha(theme.palette.common.black, 0.05)}`,
                border: `1px solid ${alpha(theme.palette.divider, 0.2)}`,
                mb: 2,
                flexGrow: 1,
                display: 'flex',
                alignItems: 'center'
              }}
            >
              <Box sx={{ position: 'relative', pl: { xs: 4, sm: 6 } }}>
                <Box
                  sx={{
                    position: 'absolute',
                    left: 0,
                    top: -5,
                    fontSize: '2rem',
                    lineHeight: 1,
                    color: alpha(theme.palette.primary.main, 0.2),
                    fontFamily: 'Georgia, serif'
                  }}
                >
                  "
                </Box>
                <Typography
                  variant="body1"
                  sx={{
                    fontStyle: 'italic',
                    color: theme.palette.text.primary
                  }}
                >
                  {leader.message}
                </Typography>
              </Box>
            </Box>

            <Stack
              direction="row"
              spacing={1.5}
              justifyContent="space-between"
              sx={{
                pt: 2,
                borderTop: `1px solid ${alpha(theme.palette.divider, 0.2)}`
              }}
            >
              <IconButton
                onClick={handlePrevious}
                size="small"
                aria-label="Previous leader"
                sx={{
                  bgcolor: alpha(theme.palette.primary.main, 0.15),
                  color: theme.palette.primary.main,
                  '&:hover': {
                    bgcolor: alpha(theme.palette.primary.main, 0.25),
                    transform: 'translateX(-2px)'
                  },
                  transition: 'all 0.2s ease-in-out',
                  width: 36,
                  height: 36
                }}
              >
                <Icon icon="solar:arrow-left-bold-duotone" width={20} height={20} />
              </IconButton>

              <IconButton
                onClick={handleNext}
                size="small"
                aria-label="Next leader"
                sx={{
                  bgcolor: alpha(theme.palette.primary.main, 0.15),
                  color: theme.palette.primary.main,
                  '&:hover': {
                    bgcolor: alpha(theme.palette.primary.main, 0.25),
                    transform: 'translateX(2px)'
                  },
                  transition: 'all 0.2s ease-in-out',
                  width: 36,
                  height: 36
                }}
              >
                <Icon icon="solar:arrow-right-bold-duotone" width={20} height={20} />
              </IconButton>
            </Stack>
          </CardContent>
        </Card>
      </AnimatePresence>
    </MainCard>
  );
};

export default LeadershipCard;
