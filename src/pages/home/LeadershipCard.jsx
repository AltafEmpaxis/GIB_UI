import React, { useRef, useState } from 'react';

// material-ui
import { Icon } from '@iconify/react';
import { alpha, Avatar, Box, Chip, Stack, Typography, useTheme, useMediaQuery } from '@mui/material';
import { motion } from 'framer-motion';

// Swiper components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// project imports
import MainCard from 'components/MainCard';

// ==============================|| LEADERSHIP CARD ||============================== //

const LeadershipCard = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const [activeIndex, setActiveIndex] = useState(0);
  const progressCircle = useRef(null);
  const progressContent = useRef(null);
  const swiperRef = useRef(null);
  const navigationPrevRef = useRef(null);
  const navigationNextRef = useRef(null);

  // Handle autoplay progress
  const onAutoplayTimeLeft = (s, time, progress) => {
    if (progressCircle.current) {
      progressCircle.current.style.setProperty('--progress', 1 - progress);
    }
    if (progressContent.current) {
      progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
    }
  };

  // Sample leadership data with theme colors
  const leaders = [
    {
      id: 1,
      name: 'Ahmed Al-Sayed',
      position: 'Chief Executive Officer',
      message:
        'Our commitment to excellence and innovation drives everything we do at GIB. Together, we are building a stronger future for our clients and partners.',
      image: 'https://i.pravatar.cc/300?img=33',
      color: theme.palette.primary,
      icon: 'solar:star-bold-duotone'
    },
    {
      id: 2,
      name: 'Sarah Al-Mahmoud',
      position: 'Chief Financial Officer',
      message:
        'Financial integrity and transparency are the foundations of our business. We strive to create sustainable value for all our stakeholders.',
      image: 'https://i.pravatar.cc/300?img=32',
      color: theme.palette.success,
      icon: 'solar:chart-bold-duotone'
    },
    {
      id: 3,
      name: 'Mohammed Al-Harbi',
      position: 'Chief Technology Officer',
      message:
        'Technology is transforming the investment landscape. Our innovative solutions help clients navigate complexity and achieve their goals.',
      image: 'https://i.pravatar.cc/300?img=65',
      color: theme.palette.warning,
      icon: 'solar:server-bold-duotone'
    },
    {
      id: 4,
      name: 'Fatima Al-Zahra',
      position: 'Chief Investment Officer',
      message:
        'Strategic investment decisions require deep market insights and analytical rigor. We focus on creating long-term value through disciplined investment approaches.',
      image: 'https://i.pravatar.cc/300?img=5',
      color: theme.palette.error,
      icon: 'solar:chart-line-bold-duotone'
    }
  ];

  return (
    <MainCard
      component={motion.div}
      initial="hidden"
      animate="visible"
      title={
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Avatar
            sx={{
              width: 40,
              height: 40,
              bgcolor: alpha(theme.palette.primary.main, 0.12),
              color: theme.palette.primary.main,
              mr: 1.5,
              backdropFilter: 'blur(5px)',
              boxShadow: `0 3px 8px ${alpha(theme.palette.primary.main, 0.25)}`
            }}
          >
            <Icon icon="solar:users-group-rounded-bold-duotone" width={24} height={24} />
          </Avatar>
          <Typography variant="h5" sx={{ fontWeight: 600, letterSpacing: '0.02em' }}>
            Leadership Insights
          </Typography>
        </Box>
      }
      secondary={
        <Chip
          label={`${activeIndex + 1} / ${leaders.length}`}
          size="small"
          color="primary"
          variant="filled"
          sx={{
            height: 26,
            fontWeight: 500,
            boxShadow: `0 2px 8px ${alpha(theme.palette.primary.main, 0.25)}`
          }}
        />
      }
      sx={{
        height: '100%',
        width: '100%',
        overflow: 'hidden',
        borderRadius: { xs: 2, sm: 2.5 },
        boxShadow: theme.palette.mode === 'dark' ? '0 8px 24px rgba(0,0,0,0.4)' : '0 10px 40px rgba(58,53,65,0.12)',
        background:
          theme.palette.mode === 'dark'
            ? `linear-gradient(145deg, ${alpha(theme.palette.background.paper, 0.9)}, ${alpha(theme.palette.background.paper, 0.85)})`
            : `linear-gradient(145deg, ${theme.palette.background.paper}, ${alpha(theme.palette.background.default, 0.98)})`,
        backdropFilter: 'blur(10px)',
        position: 'relative',
        border: `1px solid ${alpha(theme.palette.divider, 0.08)}`
      }}
    >
      <Box />

      <Box
        component={motion.div}
        sx={{
          height: '100%',
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          p: { xs: 1, sm: 2, md: 3 },
          position: 'relative',
          zIndex: 1
        }}
      >
        {/* Custom navigation buttons - only show on non-mobile */}
        {!isMobile && (
          <>
            <Box
              ref={navigationPrevRef}
              sx={{
                position: 'absolute',
                left: { xs: 5, sm: 5, md: 10 },
                top: '50%',
                transform: 'translateY(-50%)',
                zIndex: 10,
                width: { xs: 36, sm: 36, md: 40 },
                height: { xs: 36, sm: 36, md: 40 },
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: alpha(theme.palette.background.paper, 0.9),
                color: theme.palette.primary.main,
                cursor: 'pointer',
                boxShadow: `0 3px 10px ${alpha(theme.palette.common.black, 0.1)}`,
                transition: 'all 0.2s ease',
                '&:hover': {
                  backgroundColor: theme.palette.primary.main,
                  color: '#fff',
                  transform: 'translateY(-50%) scale(1.1)'
                }
              }}
            >
              <Icon icon="solar:arrow-left-bold-duotone" width={20} height={20} />
            </Box>

            <Box
              ref={navigationNextRef}
              sx={{
                position: 'absolute',
                right: { xs: 5, sm: 5, md: 10 },
                top: '50%',
                transform: 'translateY(-50%)',
                zIndex: 10,
                width: { xs: 36, sm: 36, md: 40 },
                height: { xs: 36, sm: 36, md: 40 },
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: alpha(theme.palette.background.paper, 0.9),
                color: theme.palette.primary.main,
                cursor: 'pointer',
                boxShadow: `0 3px 10px ${alpha(theme.palette.common.black, 0.1)}`,
                transition: 'all 0.2s ease',
                '&:hover': {
                  backgroundColor: theme.palette.primary.main,
                  color: '#fff',
                  transform: 'translateY(-50%) scale(1.1)'
                }
              }}
            >
              <Icon icon="solar:arrow-right-bold-duotone" width={20} height={20} />
            </Box>
          </>
        )}

        {/* Swiper carousel */}
        <Box
          sx={{
            width: '100%',
            height: '100%',
            maxHeight: { xs: 'auto', sm: 520 },
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            '.swiper': {
              width: '100%',
              height: '100%',
              paddingBottom: { xs: '60px', sm: '60px' },
              paddingTop: { xs: '5px', sm: '10px' }
            },
            '.swiper-pagination': {
              bottom: { xs: '10px !important', sm: '10px !important' },
              width: '100%'
            },
            '.swiper-pagination-bullet': {
              opacity: 0.5,
              backgroundColor: `${theme.palette.primary.main} !important`,
              width: 8,
              height: 8,
              margin: '0 4px',
              transition: 'all 0.3s ease'
            },
            '.swiper-pagination-bullet-active': {
              opacity: 1,
              backgroundColor: `${theme.palette.primary.main} !important`,
              transform: 'scale(1.2)'
            },
            '.autoplay-progress': {
              position: 'absolute',
              right: { xs: 10, sm: 16 },
              bottom: { xs: 15, sm: 25 },
              zIndex: 10,
              width: { xs: 32, sm: 36 },
              height: { xs: 32, sm: 36 },
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 'bold',
              color: theme.palette.primary.main
            },
            '.autoplay-progress svg': {
              '--progress': 0,
              position: 'absolute',
              left: 0,
              top: 0,
              zIndex: 10,
              width: '100%',
              height: '100%',
              strokeWidth: 4,
              stroke: theme.palette.primary.main,
              fill: 'none',
              strokeDasharray: '125.6'
            },
            '.autoplay-progress svg circle': {
              strokeDashoffset: 'calc(125.6 * (1 - var(--progress)))',
              transformOrigin: 'center',
              transform: 'rotate(-90deg)'
            },
            '.autoplay-progress span': {
              fontSize: '0.7rem'
            },
            // Hide default navigation
            '.swiper-button-next, .swiper-button-prev': {
              display: 'none'
            },
            '.swiper-slide': {
              height: 'auto',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            },
            '.swiper-wrapper': {
              alignItems: 'center'
            }
          }}
        >
          <Swiper
            slidesPerView={1}
            spaceBetween={20}
            centeredSlides={true}
            loop={true}
            breakpoints={{
              // when window width is >= 600px (sm)
              600: {
                slidesPerView: 1,
                spaceBetween: 20,
                centeredSlides: true
              },
              // when window width is >= 960px (md)
              960: {
                slidesPerView: 1,
                spaceBetween: 30,
                centeredSlides: true
              },
              // when window width is >= 1280px (lg)
              1280: {
                slidesPerView: 1,
                spaceBetween: 40,
                centeredSlides: true
              }
            }}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false
            }}
            pagination={{
              el: '.swiper-pagination',
              clickable: true,
              dynamicBullets: true
            }}
            navigation={{
              prevEl: navigationPrevRef.current,
              nextEl: navigationNextRef.current
            }}
            onBeforeInit={(swiper) => {
              // Assign navigation elements to Swiper
              swiper.params.navigation.prevEl = navigationPrevRef.current;
              swiper.params.navigation.nextEl = navigationNextRef.current;
              // Re-initialize navigation
              swiper.navigation.init();
              swiper.navigation.update();
            }}
            modules={[Autoplay, Pagination, Navigation]}
            onAutoplayTimeLeft={onAutoplayTimeLeft}
            onSlideChange={(swiper) => {
              setActiveIndex(swiper.realIndex);
            }}
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            style={{
              width: '100%'
            }}
          >
            {leaders.map((leader) => (
              <SwiperSlide key={leader.id}>
                <LeaderCard leader={leader} theme={theme} />
              </SwiperSlide>
            ))}

            {/* Progress and pagination */}
            <div className="autoplay-progress" slot="container-end">
              <svg viewBox="0 0 48 48" ref={progressCircle}>
                <circle cx="24" cy="24" r="20"></circle>
              </svg>
              <span ref={progressContent}></span>
            </div>
            <div className="swiper-pagination"></div>
          </Swiper>
        </Box>
      </Box>
    </MainCard>
  );
};

// Individual leader card component
const LeaderCard = ({ leader, theme }) => {
  const { color } = leader;
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));

  const imageVariants = {
    rest: { scale: 1 },
    hover: { scale: 1.05, transition: { duration: 0.3 } }
  };

  const contentVariants = {
    rest: { y: 0 },
    hover: { y: -5, transition: { duration: 0.3 } }
  };

  return (
    <Box
      component={motion.div}
      initial="rest"
      whileHover="hover"
      sx={{
        height: 'auto',
        minHeight: { xs: 'auto', sm: 'auto', md: 450 },
        width: '100%',
        maxWidth: { xs: 280, sm: 280, md: 320 },
        borderRadius: { xs: '14px', sm: '16px', md: '20px' },
        overflow: 'hidden',
        boxShadow: '0 15px 35px rgba(0,0,0,0.1), 0 5px 15px rgba(0,0,0,0.05)',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        transition: 'all 0.3s ease',
        backgroundColor: alpha(theme.palette.background.paper, 0.9),
        border: `1px solid ${alpha(theme.palette.divider, 0.08)}`,
        backdropFilter: 'blur(10px)',
        mx: 'auto',
        transformStyle: 'preserve-3d',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '30%',
          background: `linear-gradient(to bottom, ${alpha(color.main, 0.15)}, transparent)`,
          zIndex: 0
        }
      }}
    >
      {/* Decorative patterns */}
      <Box
        sx={{
          position: 'absolute',
          top: '10%',
          right: '15%',
          width: { xs: 60, sm: 70, md: 80 },
          height: { xs: 60, sm: 70, md: 80 },
          borderRadius: '50%',
          background: alpha(color.light, 0.15),
          filter: 'blur(2px)',
          zIndex: 0
        }}
      />

      <Box
        sx={{
          position: 'absolute',
          bottom: '20%',
          left: '10%',
          width: { xs: 30, sm: 40, md: 50 },
          height: { xs: 30, sm: 40, md: 50 },
          borderRadius: '50%',
          background: alpha(color.light, 0.1),
          filter: 'blur(1px)',
          zIndex: 0
        }}
      />

      {/* Dotted pattern */}
      <Box
        sx={{
          position: 'absolute',
          top: '25%',
          right: '10%',
          width: '40%',
          height: '30%',
          opacity: 0.05,
          backgroundImage: `radial-gradient(${color.main} 1px, transparent 1px)`,
          backgroundSize: '8px 8px',
          transform: 'rotate(-5deg)',
          zIndex: 0
        }}
      />

      {/* Header with image */}
      <Box
        component={motion.div}
        variants={contentVariants}
        sx={{
          p: { xs: 2, sm: 2.5, md: 3 },
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          position: 'relative',
          zIndex: 1
        }}
      >
        {/* Role icon badge */}
        <Box
          component={motion.div}
          initial={{ scale: 0 }}
          animate={{
            scale: 1,
            transition: {
              delay: 0.2,
              type: 'spring'
            }
          }}
          sx={{
            position: 'absolute',
            top: { xs: 14, sm: 16, md: 20 },
            right: { xs: 14, sm: 16, md: 20 },
            width: { xs: 32, sm: 36, md: 40 },
            height: { xs: 32, sm: 36, md: 40 },
            borderRadius: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: alpha(color.main, 0.9),
            color: '#fff',
            boxShadow: `0 6px 16px ${alpha(color.main, 0.35)}`,
            zIndex: 2
          }}
        >
          <Icon icon={leader.icon} width={isMobile ? 18 : 20} height={isMobile ? 18 : 20} />
        </Box>

        <Box
          sx={{
            position: 'relative',
            mb: { xs: 1.5, sm: 2, md: 2.5 },
            width: { xs: 100, sm: 120, md: 140 },
            height: { xs: 100, sm: 120, md: 140 },
            borderRadius: { xs: '12px', sm: '14px', md: '16px' },
            overflow: 'hidden',
            boxShadow: `0 12px 24px ${alpha(color.main, 0.2)}`,
            border: `3px solid ${alpha(theme.palette.background.paper, 0.9)}`,
            transform: 'perspective(1000px)',
            '&::after': {
              content: '""',
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: '30%',
              background: `linear-gradient(to top, ${alpha(color.main, 0.3)}, transparent)`,
              zIndex: 1
            }
          }}
        >
          <Box
            component={motion.div}
            variants={imageVariants}
            sx={{
              width: '100%',
              height: '100%',
              backgroundImage: `url(${leader.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          />
        </Box>

        <Box sx={{ textAlign: 'center', width: '100%' }}>
          <Typography
            variant={isMobile ? 'h6' : isTablet ? 'h5' : 'h4'}
            sx={{
              fontWeight: 600,
              color: color.dark,
              mb: 0.75,
              letterSpacing: '0.02em',
              fontSize: { xs: '1.1rem', sm: '1.25rem', md: '1.5rem' },
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              lineHeight: 1.3
            }}
          >
            {leader.name}
          </Typography>
          <Chip
            label={leader.position}
            size="small"
            sx={{
              bgcolor: alpha(color.main, 0.12),
              color: color.dark,
              borderRadius: 2,
              fontSize: { xs: '0.7rem', sm: '0.75rem', md: '0.8rem' },
              fontWeight: 500,
              height: { xs: 22, sm: 24, md: 26 },
              maxWidth: '100%',
              overflow: 'hidden',
              '& .MuiChip-label': {
                padding: { xs: '0 6px', sm: '0 8px', md: '0 10px' },
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap'
              },
              boxShadow: `0 3px 8px ${alpha(color.main, 0.15)}`
            }}
          />
        </Box>
      </Box>

      {/* Quote section */}
      <Box
        component={motion.div}
        variants={contentVariants}
        sx={{
          px: { xs: 2, sm: 2.5, md: 3 },
          py: { xs: 1, sm: 1.5, md: 2 },
          flexGrow: 1,
          display: 'flex',
          alignItems: 'center',
          position: 'relative',
          zIndex: 1,
          width: '100%'
        }}
      >
        <Box
          sx={{
            position: 'relative',
            width: '100%',
            bgcolor: alpha(theme.palette.background.paper, 0.75),
            p: { xs: 1.75, sm: 2, md: 2.5 },
            borderRadius: 2.5,
            boxShadow: `0 8px 24px ${alpha(theme.palette.common.black, 0.04)}`,
            border: `1px solid ${alpha(theme.palette.divider, 0.05)}`,
            backdropFilter: 'blur(10px)'
          }}
        >
          {/* Modern quote shape */}
          <Box
            sx={{
              position: 'absolute',
              top: -12,
              left: 16,
              width: { xs: 22, sm: 24, md: 26 },
              height: { xs: 22, sm: 24, md: 26 },
              borderRadius: '0 8px 8px 8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: `linear-gradient(135deg, ${color.main} 0%, ${alpha(color.light, 0.8)} 100%)`,
              color: '#fff',
              boxShadow: `0 4px 12px ${alpha(color.main, 0.25)}`
            }}
          >
            <Icon icon="solar:quote-up-square-bold" width={isMobile ? 12 : 14} height={isMobile ? 12 : 14} />
          </Box>

          <Typography
            variant="body2"
            sx={{
              fontStyle: 'italic',
              color: theme.palette.text.primary,
              lineHeight: 1.5,
              position: 'relative',
              fontSize: { xs: '0.8rem', sm: '0.85rem', md: '0.9rem' },
              zIndex: 1,
              pt: 0.5,
              fontWeight: 400,
              display: '-webkit-box',
              overflow: 'hidden',
              WebkitBoxOrient: 'vertical',
              WebkitLineClamp: { xs: 4, sm: 5, md: 6 }
            }}
          >
            {leader.message}
          </Typography>
        </Box>
      </Box>

      {/* Company logo watermark */}
      <Box
        sx={{
          position: 'absolute',
          bottom: 16,
          right: 16,
          opacity: 0.03,
          zIndex: 0
        }}
      >
        <Icon icon="solar:buildings-3-bold-duotone" width={isMobile ? 40 : 50} height={isMobile ? 40 : 50} />
      </Box>
    </Box>
  );
};

export default LeadershipCard;
