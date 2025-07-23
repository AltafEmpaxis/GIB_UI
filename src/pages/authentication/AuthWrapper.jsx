import { Icon } from '@iconify/react';
import { alpha, Box, Fade, Grow, Typography, useMediaQuery } from '@mui/material';
import Grid from '@mui/material/Grid';
import { useTheme } from '@mui/material/styles';
import PropTypes from 'prop-types';
import { useCallback, useEffect, useRef, useState } from 'react';

// Import Swiper React components and modules
import { Autoplay, EffectFade, Navigation, Pagination, Parallax } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/parallax';

// material-ui
import MainCard from 'components/MainCard';

// project import
import Logo from 'components/logo/index';

// ==============================|| AUTHENTICATION - WRAPPER ||============================== //

export default function AuthWrapper({ children }) {
  const theme = useTheme();
  const matchDownMd = useMediaQuery(theme.breakpoints.down('lg'));
  const isDark = theme.palette.mode === 'dark';
  const progressCircle = useRef(null);
  const progressContent = useRef(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const [swiperInstance, setSwiperInstance] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // Define content with enhanced modern styling
  const sliderContentBase = [
    {
      id: 1,
      titlePrefix: 'Strategic ',
      titleHighlight: 'Investment',
      titleSuffix: ' Excellence',
      description:
        'Delivering superior returns through our disciplined approach to capital allocation and risk management',
      image: 'https://www.gibcapital.com/media/j5imt2wq/gib-hq-building.jpg',
      icon: 'solar:shield-check-bold-duotone',
      alt: 'GIB Capital headquarters building showcasing investment excellence',
      themeType: 'secondary',
      gradient: 'linear-gradient(135deg, rgba(255,193,7,0.1) 0%, rgba(255,193,7,0.05) 100%)'
    },
    {
      id: 2,
      titlePrefix: '',
      titleHighlight: 'Global Financial',
      titleSuffix: ' Expertise',
      description:
        'Access world-class financial services with tailored solutions backed by decades of market experience',
      image: 'https://www.gibcapital.com/media/ya5cf4xz/gib-capital-_-nubul-agreement-ceremony-post-recommended-1.png',
      icon: 'solar:globe-bold-duotone',
      alt: 'GIB Capital partnership ceremony demonstrating global financial expertise',
      themeType: 'primary',
      gradient: 'linear-gradient(135deg, rgba(25,118,210,0.1) 0%, rgba(25,118,210,0.05) 100%)'
    },
    {
      id: 3,
      titlePrefix: 'Secure ',
      titleHighlight: 'Asset',
      titleSuffix: ' Management',
      description:
        'Protecting and growing your investments with industry-leading security protocols and transparent governance',
      image: 'https://www.gibcapital.com/media/uvwd1x1r/newsroom_rebranded-to-gib-capital_113351.jpg',
      icon: 'solar:shield-lock-bold-duotone',
      alt: 'GIB Capital rebranding showcasing secure asset management',
      themeType: 'secondary',
      gradient: 'linear-gradient(135deg, rgba(255,193,7,0.1) 0%, rgba(255,193,7,0.05) 100%)'
    },
    {
      id: 4,
      titlePrefix: '',
      titleHighlight: 'Innovative',
      titleSuffix: ' Financial Solutions',
      description: 'Pioneering advanced portfolio optimization strategies with cutting-edge financial technology',
      image: 'https://www.gibcapital.com/media/x23bc1jk/baseqat-project.jpg',
      icon: 'solar:chart-square-bold-duotone',
      alt: 'GIB Capital innovative project demonstrating financial solutions',
      themeType: 'primary',
      gradient: 'linear-gradient(135deg, rgba(25,118,210,0.1) 0%, rgba(25,118,210,0.05) 100%)'
    }
  ];

  // Apply enhanced theme colors
  const sliderContent = sliderContentBase.map((item) => ({
    ...item,
    iconColor: item.themeType === 'secondary' ? theme.palette.secondary.main : theme.palette.primary.main,
    highlightColor: item.themeType === 'secondary' ? theme.palette.secondary.main : theme.palette.primary.light,
    accentColor: item.themeType === 'secondary' ? theme.palette.secondary.light : theme.palette.primary.dark
  }));

  // Loading effect
  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 300);
    return () => clearTimeout(timer);
  }, []);

  // Initialize slider autoplay
  useEffect(() => {
    if (swiperInstance) {
      swiperInstance.autoplay.start();
    }
  }, [swiperInstance]);

  // Enhanced callbacks
  const onAutoplayTimeLeft = useCallback((s, time, progress) => {
    if (progressCircle.current && progressContent.current) {
      progressCircle.current.style.setProperty('--progress', 1 - progress);
      progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
    }
  }, []);

  const handleSlideChange = useCallback((swiper) => {
    setActiveSlide(swiper.activeIndex);
  }, []);

  return (
    <Fade in={isLoaded} timeout={800}>
      <Box
        sx={{
          minHeight: '100vh',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          background: isDark
            ? `radial-gradient(circle at 20% 80%, ${alpha(theme.palette.primary.dark, 0.3)} 0%, transparent 50%),
               radial-gradient(circle at 80% 20%, ${alpha(theme.palette.secondary.dark, 0.2)} 0%, transparent 50%),
               linear-gradient(135deg, ${theme.palette.primary.darker} 0%, ${theme.palette.background.default} 100%)`
            : `radial-gradient(circle at 20% 80%, ${alpha(theme.palette.primary.light, 0.08)} 0%, transparent 50%),
               radial-gradient(circle at 80% 20%, ${alpha(theme.palette.secondary.light, 0.06)} 0%, transparent 50%),
               linear-gradient(135deg, ${theme.palette.background.default} 0%, ${alpha(theme.palette.grey[50], 0.8)} 100%)`,
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <Box sx={{ flex: 1, display: 'flex', position: 'relative', zIndex: 1 }}>
          <Grid container sx={{ minHeight: '100%' }}>
            {/* Enhanced Left side with Swiper slider */}
            {!matchDownMd && (
              <Grid
                item
                lg={7}
                sx={{
                  position: 'relative',
                  height: '100vh',
                  overflow: 'hidden',
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    width: '1px',
                    height: '100%',
                    background: `linear-gradient(180deg, transparent 0%, ${alpha(theme.palette.divider, 0.3)} 20%, ${alpha(theme.palette.divider, 0.3)} 80%, transparent 100%)`,
                    zIndex: 10
                  }
                }}
              >
                {/* Enhanced Logo Container */}
                <Box
                  sx={{
                    position: 'absolute',
                    top: 24,
                    left: 24,
                    zIndex: 20,
                    bgcolor: alpha(theme.palette.background.paper, 0.1),
                    backdropFilter: 'blur(20px)'
                  }}
                >
                  <Logo />
                </Box>

                {/* Enhanced Progress Indicator */}
                <Box
                  ref={progressCircle}
                  sx={{
                    position: 'absolute',
                    bottom: 50,
                    right: 30,
                    zIndex: 20,
                    width: 46,
                    height: 46,
                    borderRadius: '50%',
                    background: `conic-gradient(${theme.palette.secondary.main} calc(var(--progress, 0) * 1turn), ${alpha(theme.palette.common.white, 0.1)} 0)`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backdropFilter: 'blur(10px)',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      inset: 4,
                      borderRadius: '50%',
                      background: alpha(theme.palette.background.paper, 0.9)
                    }
                  }}
                >
                  <Typography
                    ref={progressContent}
                    variant="caption"
                    sx={{
                      position: 'relative',
                      zIndex: 1,
                      fontWeight: 600,
                      color: theme.palette.secondary.main
                    }}
                  />
                </Box>

                <Swiper
                  spaceBetween={0}
                  centeredSlides={true}
                  effect="fade"
                  speed={1200}
                  autoplay={{
                    delay: 5000,
                    disableOnInteraction: false
                  }}
                  pagination={{
                    clickable: true,
                    dynamicBullets: true
                  }}
                  navigation={true}
                  parallax={true}
                  modules={[Autoplay, EffectFade, Pagination, Navigation, Parallax]}
                  onAutoplayTimeLeft={onAutoplayTimeLeft}
                  onSwiper={setSwiperInstance}
                  onSlideChange={handleSlideChange}
                  style={{
                    height: '100%',
                    width: '100%',
                    '--swiper-navigation-color': theme.palette.secondary.main,
                    '--swiper-pagination-color': theme.palette.secondary.main
                    // '--swiper-navigation-size': '28px'
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
                          justifyContent: 'flex-start',
                          pl: { xs: 4, sm: 6, md: 8, lg: 10 }
                        }}
                      >
                        {/* Enhanced Background with Parallax */}
                        <Box
                          data-swiper-parallax="-300"
                          sx={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '120%',
                            height: '120%',
                            backgroundImage: `url(${slide.image})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            filter: 'brightness(0.75) contrast(1.1)',
                            transition: 'all 1.5s cubic-bezier(0.4, 0, 0.2, 1)',
                            transform: activeSlide === index ? 'scale(1.1)' : 'scale(1.05)',
                            '&::after': {
                              content: '""',
                              position: 'absolute',
                              inset: 0,
                              background: [
                                `linear-gradient(135deg, ${alpha(theme.palette.primary.dark, 0.8)} 0%, ${alpha(theme.palette.primary.main, 0.4)} 40%, ${alpha(slide.accentColor, 0.2)} 100%)`,
                                slide.gradient,
                                'radial-gradient(circle at 30% 70%, rgba(0,0,0,0.3) 0%, transparent 70%)'
                              ].join(', ')
                            }
                          }}
                        />

                        {/* Enhanced Content */}
                        <Box
                          data-swiper-parallax="-100"
                          sx={{
                            position: 'relative',
                            zIndex: 5,
                            maxWidth: '600px',
                            textAlign: 'left'
                          }}
                        >
                          {/* Enhanced Icon Container */}
                          <Fade in={activeSlide === index} timeout={1000}>
                            <Box
                              sx={{
                                mb: 1.5,
                                display: 'inline-flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: 42,
                                height: 42,
                                borderRadius: '20px',
                                background: `linear-gradient(135deg, ${alpha(slide.iconColor, 0.2)} 0%, ${alpha(slide.iconColor, 0.1)} 100%)`,
                                backdropFilter: 'blur(20px)',
                                border: `2px solid ${alpha(slide.iconColor, 0.3)}`,
                                boxShadow: `0 20px 40px ${alpha(slide.iconColor, 0.2)}`,
                                position: 'relative',
                                '&::before': {
                                  content: '""',
                                  position: 'absolute',
                                  inset: -2,
                                  borderRadius: '22px',
                                  background: `linear-gradient(135deg, ${slide.iconColor}, transparent)`,
                                  mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                                  maskComposite: 'xor',
                                  opacity: 0.3
                                }
                              }}
                            >
                              <Icon icon={slide.icon} width={36} height={36} style={{ color: slide.iconColor }} />
                            </Box>
                          </Fade>

                          {/* Enhanced Typography */}
                          <Grow in={activeSlide === index} timeout={1200}>
                            <Typography
                              variant="h1"
                              sx={{
                                color: theme.palette.common.white,
                                fontWeight: 300,
                                fontSize: { xs: '2.25rem', sm: '2.75rem', md: '3.25rem', lg: '3.75rem' },
                                lineHeight: 1.1,
                                mb: 2.5,
                                textShadow: '0 8px 32px rgba(0,0,0,0.3)',
                                letterSpacing: '-0.02em'
                              }}
                            >
                              {slide.titlePrefix}
                              <Box
                                component="span"
                                sx={{
                                  background: `linear-gradient(135deg, ${slide.highlightColor} 0%, ${slide.iconColor} 100%)`,
                                  backgroundClip: 'text',
                                  WebkitBackgroundClip: 'text',
                                  WebkitTextFillColor: 'transparent',
                                  fontWeight: 600,
                                  position: 'relative',
                                  display: 'inline-block',
                                  '&::after': {
                                    content: '""',
                                    position: 'absolute',
                                    bottom: -3,
                                    left: 0,
                                    width: '100%',
                                    height: 3,
                                    background: `linear-gradient(90deg, ${slide.iconColor} 0%, transparent 100%)`,
                                    borderRadius: 2
                                  }
                                }}
                              >
                                {slide.titleHighlight}
                              </Box>
                              {slide.titleSuffix}
                            </Typography>
                          </Grow>

                          <Grow in={activeSlide === index} timeout={1400}>
                            <Typography
                              variant="h5"
                              sx={{
                                color: alpha(theme.palette.common.white, 0.9),
                                fontWeight: 400,
                                fontSize: { xs: '1.05rem', sm: '1.15rem', md: '1.25rem' },
                                lineHeight: 1.6,
                                maxWidth: '500px',
                                textShadow: '0 4px 16px rgba(0,0,0,0.2)',
                                letterSpacing: '0.01em'
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

            {/* Enhanced Right side - Login content */}
            <Grid
              item
              xs={12}
              lg={5}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                minHeight: '100vh'
              }}
            >
              {/* Mobile logo with enhanced styling */}
              <Box
                sx={{
                  display: { xs: 'flex', lg: 'none' },
                  justifyContent: 'center',
                  width: '100%',
                  py: 1.5,
                  mb: 1,
                  position: 'relative'
                }}
              >
                <Logo />
              </Box>

              {/* Enhanced Main content */}
              <Box
                sx={{
                  flex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  p: { xs: 1.5, sm: 1.5, md: 1.5 },
                  position: 'relative'
                }}
              >
                <MainCard
                  sx={{
                    maxWidth: 480,
                    width: '100%',
                    borderRadius: 3,
                    background: alpha(theme.palette.background.paper, isDark ? 0.9 : 0.95),
                    backdropFilter: 'blur(40px)',
                    border: `1px solid ${alpha(theme.palette.divider, isDark ? 0.1 : 0.08)}`,
                    overflow: 'hidden',
                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                    position: 'relative',

                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      height: 4,
                      background: `linear-gradient(90deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 50%, ${theme.palette.primary.main} 100%)`,
                      borderRadius: '12px 12px 0 0'
                    },
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      inset: -1,
                      borderRadius: 'inherit',
                      background: `linear-gradient(135deg, ${alpha(theme.palette.secondary.main, 0.1)} 0%, transparent 50%, ${alpha(theme.palette.primary.main, 0.1)} 100%)`,
                      mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                      maskComposite: 'xor',
                      zIndex: -1
                    }
                  }}
                >
                  <Box
                    sx={{
                      p: { xs: 1.5, sm: 1.5, md: 1.5 },
                      position: 'relative',
                      zIndex: 2,
                      overflow: 'hidden'
                    }}
                  >
                    {children}
                  </Box>
                </MainCard>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Fade>
  );
}

AuthWrapper.propTypes = {
  children: PropTypes.node
};
