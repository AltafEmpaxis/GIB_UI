import { Icon } from '@iconify/react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Divider,
  LinearProgress,
  Stack,
  Typography,
  useMediaQuery,
  useTheme
} from '@mui/material';
import { AnimatePresence, motion } from 'framer-motion';
import { A11y, Autoplay, EffectFade, Navigation, Pagination, Keyboard, Mousewheel } from 'swiper/modules';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

import { useRef, useState } from 'react';
import { alpha } from '@mui/material/styles';

// Slide data array
const slides = [
  {
    title: 'Our Mission',
    subtitle: 'Empowering financial success through innovation',
    content:
      'To provide innovative financial solutions that empower our clients to achieve their investment goals through exceptional service and expertise.',
    icon: 'fluent:target-arrow-24-filled',
    backgroundImage:
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8Y29ycG9yYXRlJTIwYnVpbGRpbmd8ZW58MHx8MHx8&auto=format&fit=crop&w=1920&q=80',
    btnText: 'Learn More',
    stats: [
      { value: '100+', label: 'Global Clients' },
      { value: '24/7', label: 'Support' }
    ]
  },
  {
    title: 'Our Vision',
    subtitle: 'Leading the future of investment management',
    content:
      'To become the leading global investment partner recognized for excellence, integrity and sustainable value creation.',
    icon: 'fluent:eye-tracking-20-filled',
    backgroundImage:
      'https://images.unsplash.com/photo-1579532537598-459ecdaf39cc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1887&q=80',
    btnText: 'Explore Vision',
    stats: [
      { value: '15+', label: 'Years Experience' },
      { value: '4.8/5', label: 'Client Rating' }
    ]
  },
  {
    title: 'Core Values',
    subtitle: 'The principles that guide our every action',
    content:
      'Excellence, Integrity, Innovation, Client Focus, and Teamwork guide every aspect of our operations and relationships.',
    icon: 'fluent:diamond-24-filled',
    backgroundImage:
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8c3VzdGFpbmFiaWxpdHl8ZW58MHx8MHx8&auto=format&fit=crop&w=1920&q=80',
    btnText: 'Discover Values',
    stats: [
      { value: '85%', label: 'ESG Compliance' },
      { value: '$2.5B', label: 'Assets Managed' }
    ]
  },
  {
    title: 'Our Approach',
    subtitle: 'Technology meets financial expertise',
    content:
      'We combine cutting-edge technology with deep market expertise to deliver personalized investment strategies that meet the unique needs of each client.',
    icon: 'fluent:building-bank-20-filled',
    backgroundImage:
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fGZpbmFuY2UlMjBidWlsZGluZ3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=1920&q=80',
    btnText: 'View Strategies',
    stats: [
      { value: '20+', label: 'Strategies' },
      { value: '9.2%', label: 'Annual Returns' }
    ]
  }
];

function ProgressBarNav({ activeIndex, slidesLength, progress }) {
  const swiper = useSwiper();

  return (
    <Box
      sx={{
        position: 'absolute',
        bottom: { xs: 10, sm: 10, md: 5 },
        left: 0,
        right: 0,
        zIndex: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        px: { xs: 2, sm: 0 }
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%',
          maxWidth: '500px',
          backdropFilter: 'blur(10px)',
          background: (theme) => alpha(theme.palette.background.paper, 0.1),
          borderRadius: '20px',
          border: (theme) => `1px solid ${alpha(theme.palette.common.white, 0.1)}`,
          py: 1.5
        }}
      >
        {/* Single container for progress, navigation, and pagination */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            px: 3
          }}
        >
          {/* Top row with progress and navigation */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%'
            }}
          >
            {/* Left navigation button */}
            <Button
              onClick={() => swiper.slidePrev()}
              disabled={swiper.isBeginning}
              sx={(theme) => ({
                minWidth: '40px',
                width: '40px',
                height: '40px',
                p: 0,
                borderRadius: '50%',
                backgroundColor: alpha(theme.palette.secondary.main, 0.15),
                backdropFilter: 'blur(8px)',
                border: `1px solid ${alpha(theme.palette.secondary.main, 0.3)}`,
                color: theme.palette.secondary.main,
                transition: 'all 0.3s ease',
                opacity: swiper.isBeginning ? 0.35 : 1,
                '&:hover': {
                  backgroundColor: alpha(theme.palette.secondary.main, 0.2),
                  transform: 'scale(1.05)',
                  boxShadow: `0 0 15px ${alpha(theme.palette.secondary.main, 0.5)}`
                }
              })}
            >
              <Icon icon="mdi:chevron-left" style={{ fontSize: '20px' }} />
            </Button>

            {/* Linear progress bar */}
            <Box
              sx={{
                flexGrow: 1,
                mx: 2,
                mt: 2.5
              }}
            >
              <LinearProgress
                variant="determinate"
                value={progress}
                sx={(theme) => ({
                  height: 5,
                  borderRadius: 3,
                  backgroundColor: alpha(theme.palette.common.white, 0.2),
                  '& .MuiLinearProgress-bar': {
                    backgroundColor: theme.palette.secondary.main,
                    borderRadius: 3,
                    boxShadow: `0 0 8px ${alpha(theme.palette.secondary.main, 0.7)}`
                  }
                })}
              />
              {/* Bottom row with slide count and bullets */}
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '100%',
                  mt: 0.5
                }}
              >
                {/* Slide count */}
                <Typography
                  variant="body2"
                  sx={(theme) => ({
                    color: theme.palette.common.white,
                    fontWeight: 600,
                    mr: 2
                  })}
                >
                  {activeIndex + 1}/{slidesLength}
                </Typography>

                {/* Bullets */}
                <Box sx={{ display: 'flex', gap: 0.8 }}>
                  {Array.from({ length: slidesLength }).map((_, index) => (
                    <Box
                      key={index}
                      onClick={() => swiper.slideTo(index)}
                      sx={(theme) => ({
                        width: activeIndex === index ? '24px' : '8px',
                        height: '8px',
                        borderRadius: activeIndex === index ? '4px' : '50%',
                        backgroundColor:
                          activeIndex === index
                            ? theme.palette.secondary.main
                            : alpha(theme.palette.secondary.main, 0.6),
                        transition: 'all 0.3s ease',
                        cursor: 'pointer',
                        opacity: activeIndex === index ? 1 : 0.6,
                        border: `1px solid ${alpha(theme.palette.common.white, 0.5)}`,
                        boxShadow:
                          activeIndex === index ? `0 0 10px ${alpha(theme.palette.secondary.main, 0.6)}` : 'none',
                        '&:hover': {
                          opacity: 0.8,
                          transform: 'scale(1.05)'
                        }
                      })}
                    />
                  ))}
                </Box>
              </Box>
            </Box>

            {/* Right navigation button */}
            <Button
              onClick={() => swiper.slideNext()}
              disabled={swiper.isEnd}
              sx={(theme) => ({
                minWidth: '40px',
                width: '40px',
                height: '40px',
                p: 0,
                borderRadius: '50%',
                backgroundColor: alpha(theme.palette.secondary.main, 0.15),
                backdropFilter: 'blur(8px)',
                border: `1px solid ${alpha(theme.palette.secondary.main, 0.3)}`,
                color: theme.palette.secondary.main,
                transition: 'all 0.3s ease',
                opacity: swiper.isEnd ? 0.35 : 1,
                '&:hover': {
                  backgroundColor: alpha(theme.palette.secondary.main, 0.2),
                  transform: 'scale(1.05)',
                  boxShadow: `0 0 15px ${alpha(theme.palette.secondary.main, 0.5)}`
                }
              })}
            >
              <Icon icon="mdi:chevron-right" style={{ fontSize: '20px' }} />
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

const MissionVisionSlider = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const swiperRef = useRef(null);
  const progressCircle = useRef(null);
  const progressContent = useRef(null);

  const handleSlideChange = (swiper) => {
    setActiveIndex(swiper.activeIndex);
  };

  const handleProgress = (swiper) => {
    setProgress(swiper.progress * 100);
  };

  const onAutoplayTimeLeft = (s, time, progress) => {
    if (progressCircle.current && progressContent.current) {
      progressCircle.current.style.setProperty('--progress', 1 - progress);
      progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
    }
  };

  return (
    <Box
      sx={{
        height: { xs: '85vh', sm: '88vh', md: '90vh' },
        maxHeight: '900px',
        minHeight: { xs: '550px', sm: '600px' },
        width: '100%',
        position: 'relative',
        overflow: 'hidden',
        borderRadius: { xs: 0, md: 2 },
        boxShadow: `0 10px 40px ${alpha(theme.palette.common.black, 0.2)}`,
        '& .swiper': {
          width: '100%',
          height: '100%',
          position: 'relative'
        },

        '& .autoplay-progress': {
          position: 'absolute',
          right: '20px',
          bottom: '20px',
          zIndex: 20,
          width: '52px',
          height: '52px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: theme.palette.secondary.main,
          background: alpha(theme.palette.background.paper, 0.1),
          backdropFilter: 'blur(8px)',
          borderRadius: '50%',
          border: `1px solid ${alpha(theme.palette.secondary.main, 0.2)}`,
          boxShadow: theme.shadows[4],
          '& svg': {
            width: '100%',
            height: '100%',
            transform: 'rotate(-90deg)',
            '& circle': {
              fill: 'none',
              stroke: theme.palette.secondary.main,
              strokeWidth: '2.5',
              strokeDashoffset: 'calc(125.6 * (1 - var(--progress)))',
              strokeDasharray: '125.6'
            }
          },
          '& span': {
            position: 'absolute',
            fontSize: '0.8rem',
            fontWeight: 600
          }
        }
      }}
    >
      <Swiper
        ref={swiperRef}
        modules={[EffectFade, Pagination, Navigation, Autoplay, A11y, Keyboard, Mousewheel]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        spaceBetween={0}
        slidesPerView={1}
        pagination={false} // Disable default pagination
        navigation={false} // Disable default navigation
        autoplay={{ delay: 6000, disableOnInteraction: false }}
        keyboard={{ enabled: true }}
        mousewheel={{ invert: false }}
        speed={800}
        onSlideChange={handleSlideChange}
        onProgress={handleProgress}
        onAutoplayTimeLeft={onAutoplayTimeLeft}
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            {({ isActive }) => (
              <AnimatePresence mode="wait">
                {isActive && (
                  <Box
                    sx={{
                      position: 'relative',
                      width: '100%',
                      height: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      overflow: 'hidden'
                    }}
                  >
                    {/* Background Image with Overlay */}
                    <Box
                      component={motion.div}
                      initial={{ opacity: 0.7, scale: 1.05 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0.7, scale: 1.05 }}
                      transition={{ duration: 0.8 }}
                      sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        backgroundImage: `url(${slide.backgroundImage})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        willChange: 'opacity, transform',
                        '&::after': {
                          content: '""',
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          width: '100%',
                          height: '100%',
                          background: `linear-gradient(45deg, ${alpha(theme.palette.primary.darker || '#000', 0.7)} 0%, ${alpha(
                            theme.palette.primary.dark,
                            0.5
                          )} 100%)`,
                          backdropFilter: 'brightness(0.95)'
                        }
                      }}
                    />

                    {/* Slide Number */}
                    <Box
                      sx={{
                        position: 'absolute',
                        top: { xs: 30, sm: 40, md: 60 },
                        left: { xs: 20, sm: 30, md: 60 },
                        zIndex: 5,
                        pointerEvents: 'none'
                      }}
                    >
                      <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -30 }}
                        transition={{ duration: 0.6 }}
                      >
                        <Typography
                          sx={{
                            color: alpha(theme.palette.secondary.main, 0.8),
                            fontSize: { xs: '2.5rem', sm: '4rem', md: '6rem' },
                            fontWeight: 800,
                            textShadow: '0 5px 30px rgba(0,0,0,0.3)',
                            opacity: 0.4,
                            letterSpacing: '0.02em',
                            WebkitTextStroke: `1px ${alpha(theme.palette.secondary.main, 0.4)}`
                          }}
                        >
                          0{index + 1}
                        </Typography>
                      </motion.div>
                    </Box>

                    {/* Content */}
                    <Box
                      className="content-container"
                      sx={{
                        position: 'relative',
                        zIndex: 3,
                        width: '100%',
                        maxWidth: '1200px',
                        px: { xs: 3, sm: 4, md: 8 },
                        py: { xs: 4, md: 0 },
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        mt: { xs: '40px', sm: 0 }
                      }}
                    >
                      <Stack
                        direction={{ xs: 'column', md: 'row' }}
                        spacing={{ xs: 4, md: 6 }}
                        alignItems={{ xs: 'center', md: 'flex-start' }}
                        justifyContent="space-between"
                        sx={{ width: '100%' }}
                      >
                        {/* Left Content */}
                        <Box
                          sx={{
                            maxWidth: { xs: '100%', md: '60%' },
                            textAlign: { xs: 'center', md: 'left' },
                            width: '100%',
                            pr: { xs: 0, md: 2 }
                          }}
                        >
                          {/* Decorative line */}
                          <Box
                            sx={{
                              width: { xs: '80px', md: '120px' },
                              height: '3px',
                              background: `linear-gradient(to right, ${theme.palette.secondary.main}, ${alpha(
                                theme.palette.secondary.main,
                                0.1
                              )})`,
                              mb: 3,
                              mx: { xs: 'auto', md: 0 }
                            }}
                          />

                          <Box sx={{ mb: 2, display: 'flex', justifyContent: { xs: 'center', md: 'flex-start' } }}>
                            <motion.div
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -20 }}
                              transition={{ duration: 0.5 }}
                            >
                              <Chip
                                icon={
                                  <Icon
                                    icon={slide.icon}
                                    style={{ fontSize: '20px', color: theme.palette.secondary.main }}
                                  />
                                }
                                label="GIB Capital"
                                sx={{
                                  bgcolor: alpha(theme.palette.secondary.main, 0.15),
                                  color: theme.palette.common.white,
                                  borderRadius: '16px',
                                  px: 1,
                                  py: 2.5,
                                  height: 'auto',
                                  backdropFilter: 'blur(10px)',
                                  border: `1px solid ${alpha(theme.palette.secondary.main, 0.3)}`,
                                  boxShadow: theme.shadows[3],
                                  '& .MuiChip-label': {
                                    px: 1,
                                    fontWeight: 600,
                                    fontSize: '0.9rem',
                                    letterSpacing: '0.02em'
                                  },
                                  '& .MuiChip-icon': {
                                    ml: 1
                                  }
                                }}
                              />
                            </motion.div>
                          </Box>

                          <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -50 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                          >
                            <Typography
                              variant="h1"
                              sx={{
                                color: theme.palette.common.white,
                                fontWeight: 700,
                                fontSize: { xs: '2.2rem', sm: '2.7rem', md: '3.5rem' },
                                lineHeight: 1.1,
                                textShadow: '0 2px 15px rgba(0,0,0,0.3)',
                                mb: 1.5,
                                letterSpacing: '0.01em',
                                display: 'flex',
                                alignItems: 'center',
                                flexWrap: 'wrap',
                                justifyContent: { xs: 'center', md: 'flex-start' },
                                '&::after': {
                                  content: '""',
                                  display: 'inline-block',
                                  width: '10px',
                                  height: '10px',
                                  borderRadius: '50%',
                                  backgroundColor: theme.palette.secondary.main,
                                  ml: 2,
                                  boxShadow: `0 0 10px ${theme.palette.secondary.main}`
                                }
                              }}
                            >
                              {slide.title}
                            </Typography>
                          </motion.div>

                          <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -30 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                          >
                            <Typography
                              variant="h4"
                              sx={{
                                color: theme.palette.secondary.light,
                                mb: 2,
                                fontWeight: 500,
                                fontSize: { xs: '1.15rem', md: '1.35rem' },
                                textShadow: '0 2px 8px rgba(0,0,0,0.2)',
                                letterSpacing: '0.02em'
                              }}
                            >
                              {slide.subtitle}
                            </Typography>
                          </motion.div>

                          <Divider
                            sx={{
                              my: 2,
                              width: { xs: '60px', md: '80px' },
                              mx: { xs: 'auto', md: 0 },
                              borderColor: alpha(theme.palette.secondary.light, 0.4),
                              opacity: 0.8
                            }}
                          />

                          <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -30 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                          >
                            <Typography
                              variant="body1"
                              sx={{
                                color: alpha(theme.palette.common.white, 0.9),
                                mb: 4,
                                maxWidth: '600px',
                                fontSize: { xs: '0.95rem', md: '1.05rem' },
                                lineHeight: 1.7,
                                textShadow: '0 1px 2px rgba(0,0,0,0.2)',
                                mx: { xs: 'auto', md: 0 },
                                fontWeight: 400,
                                letterSpacing: '0.01em'
                              }}
                            >
                              {slide.content}
                            </Typography>
                          </motion.div>

                          {/* Buttons */}
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                          >
                            <Stack
                              direction={{ xs: 'column', sm: 'row' }}
                              spacing={2}
                              sx={{ justifyContent: { xs: 'center', md: 'flex-start' } }}
                            >
                              <Button
                                variant="contained"
                                color="secondary"
                                endIcon={<Icon icon="fluent:arrow-right-24-filled" />}
                                sx={{
                                  borderRadius: '8px',
                                  px: { xs: 2.5, sm: 3 },
                                  py: 1.2,
                                  textTransform: 'none',
                                  fontWeight: 600,
                                  letterSpacing: '0.01em',
                                  boxShadow: `0 8px 20px ${alpha(theme.palette.secondary.main, 0.25)}`,
                                  transition: 'all 0.3s ease',
                                  '&:hover': {
                                    transform: 'translateY(-2px)',
                                    boxShadow: `0 10px 25px ${alpha(theme.palette.secondary.main, 0.35)}`
                                  }
                                }}
                              >
                                {slide.btnText}
                              </Button>
                              <Button
                                variant="outlined"
                                color="secondary"
                                sx={{
                                  borderRadius: '8px',
                                  px: { xs: 2.5, sm: 3 },
                                  py: 1.2,
                                  textTransform: 'none',
                                  fontWeight: 600,
                                  letterSpacing: '0.01em',
                                  borderWidth: '1.5px',
                                  transition: 'all 0.3s ease',
                                  '&:hover': {
                                    borderWidth: '1.5px',
                                    background: alpha(theme.palette.secondary.main, 0.1)
                                  }
                                }}
                              >
                                About Us
                              </Button>
                            </Stack>
                          </motion.div>
                        </Box>

                        {/* Stats Cards - only show on tablet and above */}
                        {!isMobile && (
                          <Box
                            sx={{
                              display: { xs: 'none', sm: 'flex' },
                              flexDirection: 'column',
                              gap: 3,
                              alignItems: 'center',
                              width: { sm: '220px', md: '240px' },
                              ml: 'auto',
                              mt: { sm: 5, md: 0 }
                            }}
                          >
                            {slide.stats.map((stat, i) => (
                              <motion.div
                                key={i}
                                initial={{ opacity: 0, x: 50 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 50 }}
                                transition={{ duration: 0.6, delay: 0.3 + i * 0.15 }}
                              >
                                <Card
                                  elevation={0}
                                  sx={{
                                    background: alpha(theme.palette.background.paper, 0.08),
                                    backdropFilter: 'blur(15px)',
                                    borderRadius: 2,
                                    width: '100%',
                                    textAlign: 'center',
                                    border: `1px solid ${alpha(theme.palette.secondary.main, 0.2)}`,
                                    boxShadow: theme.shadows[5],
                                    overflow: 'hidden',
                                    position: 'relative',
                                    transition: 'all 0.3s ease',
                                    '&:hover': {
                                      transform: 'translateY(-5px)',
                                      boxShadow: `0 12px 24px ${alpha(theme.palette.common.black, 0.2)}`,
                                      '& .stat-decoration': {
                                        opacity: 0.9,
                                        transform: 'scale(1.1)'
                                      }
                                    },
                                    '&::before': {
                                      content: '""',
                                      position: 'absolute',
                                      top: 0,
                                      left: 0,
                                      width: '100%',
                                      height: '3px',
                                      background: `linear-gradient(to right, ${theme.palette.secondary.main}, ${alpha(
                                        theme.palette.secondary.light,
                                        0.3
                                      )})`
                                    }
                                  }}
                                >
                                  <CardContent sx={{ p: 2.5 }}>
                                    {/* Decorative element */}
                                    <Box
                                      className="stat-decoration"
                                      sx={{
                                        position: 'absolute',
                                        top: -15,
                                        right: -15,
                                        width: '40px',
                                        height: '40px',
                                        borderRadius: '50%',
                                        background: alpha(theme.palette.secondary.main, 0.15),
                                        opacity: 0.5,
                                        transition: 'all 0.4s ease',
                                        zIndex: 0
                                      }}
                                    />
                                    <Typography
                                      variant="h3"
                                      sx={{
                                        color: theme.palette.secondary.main,
                                        fontWeight: 700,
                                        mb: 0.5,
                                        fontSize: { sm: '1.8rem', md: '2.2rem' },
                                        position: 'relative',
                                        zIndex: 1
                                      }}
                                    >
                                      {stat.value}
                                    </Typography>
                                    <Typography
                                      variant="body2"
                                      sx={{
                                        color: alpha(theme.palette.common.white, 0.9),
                                        fontWeight: 500,
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.08em',
                                        fontSize: '0.7rem',
                                        position: 'relative',
                                        zIndex: 1
                                      }}
                                    >
                                      {stat.label}
                                    </Typography>
                                  </CardContent>
                                </Card>
                              </motion.div>
                            ))}
                          </Box>
                        )}
                      </Stack>
                    </Box>
                  </Box>
                )}
              </AnimatePresence>
            )}
          </SwiperSlide>
        ))}

        {/* Circular progress indicator */}
        <div className="autoplay-progress" slot="container-end">
          <svg viewBox="0 0 48 48" ref={progressCircle}>
            <circle cx="24" cy="24" r="20"></circle>
          </svg>
          <span ref={progressContent}></span>
        </div>

        {/* Progress bar with integrated navigation buttons and pagination */}
        <ProgressBarNav activeIndex={activeIndex} slidesLength={slides.length} progress={progress} />
      </Swiper>
    </Box>
  );
};

export default MissionVisionSlider;
