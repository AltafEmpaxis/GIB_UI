import { Icon } from '@iconify/react';
import { alpha, Box, Typography, useMediaQuery } from '@mui/material';
import Grid from '@mui/material/Grid';
import { useTheme } from '@mui/material/styles';
import PropTypes from 'prop-types';
import { useRef } from 'react';

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

// Slider content data
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
    icon: 'solar:shield-keyhole-bold'
  },
  {
    id: 3,
    title: 'Secure Asset Management',
    description: 'Protecting and growing your investments with industry-leading security',
    image: 'https://www.gibcapital.com/media/uvwd1x1r/newsroom_rebranded-to-gib-capital_113351.jpg',
    icon: 'solar:shield-keyhole-bold'
  },
  {
    id: 4,
    title: 'Investment Excellence',
    description: 'Delivering superior returns through strategic investment solutions',
    image: 'https://www.gibcapital.com/media/x23bc1jk/baseqat-project.jpg',
    icon: 'solar:shield-keyhole-bold'
  }
];

// ==============================|| AUTHENTICATION - WRAPPER ||============================== //

export default function AuthWrapper({ children }) {
  const theme = useTheme();
  const matchDownMd = useMediaQuery(theme.breakpoints.down('lg'));
  const isDark = theme.palette.mode === 'dark';
  const progressCircle = useRef(null);
  const progressContent = useRef(null);

  const onAutoplayTimeLeft = (s, time, progress) => {
    if (progressCircle.current && progressContent.current) {
      progressCircle.current.style.setProperty('--progress', 1 - progress);
      progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        width: '100%',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <Box sx={{ flex: 1, display: 'flex' }}>
        <Grid container sx={{ minHeight: '100%' }}>
          {/* Left side with Swiper slider */}
          {!matchDownMd && (
            <Grid
              item
              lg={7}
              sx={{
                position: 'relative',
                height: '100vh',
                overflow: 'hidden'
              }}
            >
              <Box
                sx={{
                  position: 'absolute',
                  top: '20px',
                  left: '20px',
                  zIndex: 10,
                  bgcolor: alpha(theme.palette.background.paper, 0.1),
                  boxShadow: '0 10px 40px rgba(83, 86, 90, 0.15)',
                  borderRadius: '5px'
                }}
              >
                <Logo />
              </Box>

              <Swiper
                spaceBetween={0}
                centeredSlides={true}
                effect="fade"
                autoplay={{
                  delay: 5000,
                  disableOnInteraction: false
                }}
                pagination={{
                  clickable: true
                }}
                navigation={true}
                modules={[Autoplay, EffectFade, Pagination, Navigation]}
                onAutoplayTimeLeft={onAutoplayTimeLeft}
                style={{
                  height: '100%',
                  width: '100%',
                  '--swiper-navigation-color': theme.palette.secondary.main,
                  '--swiper-pagination-color': theme.palette.secondary.main
                }}
                className="auth-swiper"
              >
                {sliderContent.map((slide) => (
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
                            )} 0%, ${alpha(theme.palette.primary.dark, 0.6)} 100%)`,
                            boxShadow: 'inset 0 0 100px rgba(0,0,0,0.2)'
                          }
                        }}
                      />

                      {/* Content */}
                      <Box
                        sx={{
                          position: 'relative',
                          zIndex: 5,
                          px: { xs: 4, sm: 6, md: 8 },
                          maxWidth: '700px',
                          textAlign: 'left',
                          mt: -6
                        }}
                      >
                        <Box
                          sx={{
                            mb: 3,
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            p: 1.5,
                            borderRadius: '50%',
                            bgcolor: alpha(theme.palette.secondary.main, 0.3),
                            backdropFilter: 'blur(4px)',
                            border: `1px solid ${alpha(theme.palette.secondary.main, 0.4)}`
                          }}
                        >
                          <Icon
                            icon={slide.icon}
                            width={36}
                            height={36}
                            style={{ color: theme.palette.secondary.main }}
                          />
                        </Box>

                        <Typography
                          variant="h1"
                          sx={{
                            color: '#FFFFFF',
                            fontWeight: 300,
                            fontSize: { md: '3.25rem', lg: '3.75rem' },
                            lineHeight: 1.2,
                            mb: 2,
                            textShadow: '0 2px 8px rgba(0,0,0,0.15)'
                          }}
                        >
                          {slide.title}
                        </Typography>

                        <Typography
                          variant="h4"
                          sx={{
                            color: theme.palette.secondary.light,
                            fontWeight: 400,
                            fontSize: { md: '1.25rem', lg: '1.5rem' },
                            maxWidth: '600px',
                            lineHeight: 1.5,
                            mb: 4,
                            textShadow: '0 1px 4px rgba(0,0,0,0.1)'
                          }}
                        >
                          {slide.description}
                        </Typography>
                      </Box>
                    </Box>
                  </SwiperSlide>
                ))}
              </Swiper>

              {/* GIB Capital branding overlay */}
              <Box
                sx={{
                  position: 'absolute',
                  bottom: '40px',
                  right: '40px',
                  zIndex: 10,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1.5,
                  backdropFilter: 'blur(8px)',
                  bgcolor: alpha(theme.palette.background.paper, 0.1),
                  borderRadius: '30px',
                  py: 1,
                  px: 2,
                  border: `1px solid ${alpha('#FFFFFF', 0.2)}`
                }}
              >
                <Icon
                  icon="solar:verified-check-bold"
                  width={20}
                  height={20}
                  style={{ color: theme.palette.secondary.main }}
                />
                <Typography
                  variant="caption"
                  sx={{
                    color: '#FFFFFF',
                    fontWeight: 500,
                    letterSpacing: '0.5px',
                    fontSize: '0.75rem'
                  }}
                >
                  GIB CAPITAL
                </Typography>
              </Box>
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
              height: { xs: 'auto', lg: '100vh' }
            }}
          >
            {/* Mobile logo */}
            <Box
              sx={{
                display: { xs: 'flex', lg: 'none' },
                justifyContent: 'center',
                width: '100%',
                py: 4,
                mb: 2
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
                p: { xs: 2, sm: 3, md: 4 }
              }}
            >
              <MainCard
                sx={{
                  maxWidth: 450,
                  width: '100%',
                  borderRadius: 3,
                  boxShadow: isDark ? '0 10px 40px rgba(0, 0, 0, 0.4)' : '0 8px 40px rgba(83, 86, 90, 0.1)',
                  background: isDark
                    ? alpha(theme.palette.background.paper, 0.9)
                    : alpha(theme.palette.background.paper, 0.95),
                  backdropFilter: 'blur(20px)',
                  border: `1px solid ${alpha(theme.palette.divider, isDark ? 0.15 : 0.05)}`,
                  overflow: 'hidden'
                }}
              >
                {children}
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
