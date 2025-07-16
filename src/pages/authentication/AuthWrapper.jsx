import { Icon } from '@iconify/react';
import { alpha, Box, Typography, useMediaQuery, Fade, Grow } from '@mui/material';
import Grid from '@mui/material/Grid';
import { useTheme } from '@mui/material/styles';
import PropTypes from 'prop-types';
import { useRef, useState, useEffect } from 'react';

// Import Swiper React components and modules
import { Autoplay, EffectFade, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// material-ui
import MainCard from 'components/MainCard';

// project import
import Logo from 'components/logo/index';

// Slider content data with GIB-specific messaging
const sliderContent = [
  {
    id: 1,
    title: 'Investment Excellence',
    description: 'Delivering superior returns through strategic investment solutions',
    image: 'https://www.gibcapital.com/media/j5imt2wq/gib-hq-building.jpg',
    icon: 'solar:shield-keyhole-bold'
  },
  {
    id: 2,
    title: 'Global Financial Expertise',
    description: 'Access world-class financial services backed by decades of experience',
    image: 'https://www.gibcapital.com/media/ya5cf4xz/gib-capital-_-nubul-agreement-ceremony-post-recommended-1.png',
    icon: 'solar:briefcase-minimalistic-bold'
  },
  {
    id: 3,
    title: 'Secure Asset Management',
    description: 'Protecting and growing your investments with industry-leading security',
    image: 'https://www.gibcapital.com/media/uvwd1x1r/newsroom_rebranded-to-gib-capital_113351.jpg',
    icon: 'solar:lock-keyhole-bold'
  },
  {
    id: 4,
    title: 'Innovative Financial Solutions',
    description: 'Pioneering new ways to manage and optimize your portfolio',
    image: 'https://www.gibcapital.com/media/x23bc1jk/baseqat-project.jpg',
    icon: 'solar:chart-bold'
  }
];

// ==============================|| AUTHENTICATION - WRAPPER ||============================== //

export default function AuthWrapper({ children }) {
  const theme = useTheme();
  const matchDownMd = useMediaQuery(theme.breakpoints.down('lg'));
  const isDark = theme.palette.mode === 'dark';
  const progressCircle = useRef(null);
  const progressContent = useRef(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const [swiperInstance, setSwiperInstance] = useState(null);

  // Initialize slider autoplay
  useEffect(() => {
    if (swiperInstance) {
      swiperInstance.autoplay.start();
    }
  }, [swiperInstance]);

  const onAutoplayTimeLeft = (s, time, progress) => {
    if (progressCircle.current && progressContent.current) {
      progressCircle.current.style.setProperty('--progress', 1 - progress);
      progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
    }
  };

  return (
    <Box
      sx={{
        minHeight: 'calc(100vh - 1px)', // Account for footer
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        background: isDark 
          ? `linear-gradient(135deg, ${theme.palette.background.darker} 0%, ${alpha(theme.palette.background.default, 0.9)} 100%)` 
          : `linear-gradient(135deg, ${alpha(theme.palette.background.default, 0.7)} 0%, ${theme.palette.background.paper} 100%)`,
        position: 'relative',
        // pb: '36px', // Space for footer
        overflow: 'hidden'
      }}
    >
      <Box sx={{ flex: 1, display: 'flex', position: 'relative', zIndex: 1 }}>
        <Grid container sx={{ minHeight: '100%' }}>
          {/* Left side with Swiper slider */}
          {!matchDownMd && (
            <Grid
              item
              lg={7}
              sx={{
                position: 'relative',
                height: '100%',
                overflow: 'visible',
                boxShadow: theme.customShadows.z16
              }}
            >
              <Box
                sx={{
                  position: 'absolute',
                  top: '32px',
                  left: '32px',
                  zIndex: 10,
                  bgcolor: alpha(theme.palette.background.paper, 0.15),
                  boxShadow: theme.customShadows.popup - 2,
                  // borderRadius: 1,
                  // p: 1.5,
                  backdropFilter: 'blur(10px)',
                  // border: `0.5px solid ${alpha(theme.palette.common.white, 0.1)}`
                }}
              >
                <Logo />
              </Box>

              <Swiper
                spaceBetween={0}
                centeredSlides={true}
                effect="fade"
                speed={1000}
                autoplay={{
                  delay: 6000,
                  disableOnInteraction: false
                }}
                pagination={{
                  clickable: true
                }}
                navigation={true}
                modules={[Autoplay, EffectFade, Pagination, Navigation]}
                onAutoplayTimeLeft={onAutoplayTimeLeft}
                onSwiper={setSwiperInstance}
                onSlideChange={(swiper) => setActiveSlide(swiper.activeIndex)}
                style={{
                  height: '100%',
                  width: '100%',
                  '--swiper-navigation-color': theme.palette.secondary.main,
                  '--swiper-pagination-color': theme.palette.secondary.main
                }}
                className="auth-swiper"
              >
                {sliderContent.map((slide, index) => (
                  <SwiperSlide key={slide.id}>
                    <Box
                      sx={{
                        height: '100%',
                        width: '100%',
                        position: 'relative',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      {/* Background Image with Overlay */}
                      <Box
                        sx={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          width: '100%',
                          height: '100%',
                          backgroundImage: `url(${slide.image})`,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center',
                          filter: 'brightness(0.85)',
                          transition: 'filter 1s ease, transform 8s ease',
                          transform: activeSlide === index ? 'scale(1.05)' : 'scale(1)',
                          '&::after': {
                            content: '""',
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            background: `linear-gradient(75deg, ${alpha(
                              theme.palette.primary.darker,
                              0.85
                            )} 0%, ${alpha(theme.palette.primary.dark, 0.55)} 100%)`,
                            boxShadow: 'inset 0 0 120px rgba(0,0,0,0.25)'
                          }
                        }}
                      />

                      {/* Content with animations */}
                      <Box
                        sx={{
                          position: 'relative',
                          zIndex: 5,
                          px: { xs: 4, sm: 6, md: 8 },
                          maxWidth: '800px',
                          textAlign: 'left',
                          mt: -4,
                          mb: 4
                        }}
                      >
                        <Fade in={activeSlide === index} timeout={800}>
                          <Box
                            sx={{
                              mb: 3,
                              display: 'inline-flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              p: 2.5,
                              borderRadius: '50%',
                              bgcolor: alpha(theme.palette.secondary.main, 0.2),
                              backdropFilter: 'blur(8px)',
                              border: `1px solid ${alpha(theme.palette.secondary.main, 0.35)}`,
                              boxShadow: theme.customShadows.secondary
                            }}
                          >
                            <Icon
                              icon={slide.icon}
                              width={48}
                              height={48}
                              style={{ color: theme.palette.secondary.main }}
                            />
                          </Box>
                        </Fade>

                        <Grow in={activeSlide === index} timeout={1000}>
                          <Typography
                            variant="h1"
                            sx={{
                              color: theme.palette.common.white,
                              fontWeight: 300, // Light weight from global-styles.css
                              fontSize: { xs: '2rem', sm: '2.25rem', md: '2.5rem', lg: '3rem' },
                              lineHeight: 1.2,
                              mb: 2,
                              textShadow: '0 4px 12px rgba(0,0,0,0.2)'
                            }}
                          >
                            {slide.title}
                          </Typography>
                        </Grow>

                        <Grow in={activeSlide === index} timeout={1200}>
                          <Typography
                            variant="h4"
                            sx={{
                              color: alpha(theme.palette.common.white, 0.9),
                              fontWeight: 400, // Book weight from global-styles.css
                              fontSize: { xs: '1rem', sm: '1.125rem', md: '1.25rem' },
                              lineHeight: 1.5,
                              maxWidth: '650px',
                              mb: 4,
                              textShadow: '0 2px 6px rgba(0,0,0,0.15)'
                            }}
                          >
                            {slide.description}
                          </Typography>
                        </Grow>
                      </Box>
                    </Box>
                  </SwiperSlide>
                ))}
              </Swiper>
            </Grid>
          )}

          {/* Right side - Login content */}
          <Grid
            item
            xs={12}
            lg={5}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              position: 'relative',
              height: '100%',
            }}
          >
            {/* Mobile logo */}
            <Box
              sx={{
                display: { xs: 'flex', lg: 'none' },
                justifyContent: 'center',
                width: '100%',
                py: 3,
                mb: 1,
                bgcolor: alpha(theme.palette.background.paper, 0.05),
                position: 'relative',
                zIndex: 1
              }}
            >
              <Logo />
            </Box>

            {/* Main content */}
            <Box
              sx={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                p: { xs: 2, sm: 3, md: 4 },
                position: 'relative',
                zIndex: 1
              }}
            >
              <MainCard
                sx={{
                  maxWidth: 450,
                  width: '100%',
                  // borderRadius: theme.shape.borderRadius,
                  // boxShadow: theme.customShadows.card,
                  // background: alpha(theme.palette.background.paper, isDark ? 0.85 : 0.95),
                  // backdropFilter: 'blur(20px)',
                  // border: `1px solid ${alpha(theme.palette.divider, isDark ? 0.08 : 0.04)}`,
                  overflow: 'hidden',
                  transition: 'all 0.3s ease',
                  position: 'relative',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '3px',
                    background: `linear-gradient(90deg, ${theme.palette.secondary.main}, ${theme.palette.secondary.light})`,
                    zIndex: 1
                  }
                }}
              >
                <Box sx={{ p: { xs: 2, sm: 2, md: 3 } }}>
                  {children}
                </Box>
              </MainCard>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

AuthWrapper.propTypes = {
  children: PropTypes.node
};
