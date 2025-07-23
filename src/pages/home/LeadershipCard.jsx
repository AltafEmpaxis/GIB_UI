import React, { useState, useRef } from 'react';
import { Icon } from '@iconify/react';
import { alpha, Box, Typography, useTheme, Button, Paper, IconButton } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectFade, EffectCards, Autoplay } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/effect-cards';
import 'swiper/css/pagination';
import MainCard from 'components/MainCard';

// GIB Capital leadership team data with real information from gibcapital.com
const testimonials = [
  {
    id: 1,
    name: 'Osamah Mohammed Shaker',
    position: 'Chief Executive Officer and Board Member',
    quote:
      "At GIB Capital, we're committed to providing innovative financial solutions that meet the evolving needs of our clients. Our deep understanding of the Saudi market combined with global expertise allows us to deliver exceptional value across all our services.",
    image: 'https://www.gibcapital.com/media/qmlddf1l/ceo-photo.png',
    flag: 'SA',
    bioUrl: 'https://www.gibcapital.com/senior-management/osamah-mohammed-shaker/'
  },
  {
    id: 2,
    name: 'Ahmed Albarraq',
    position: 'Chief Financial Officer',
    quote:
      'The quality of experience matters more than years. At GIB Capital, we focus on delivering a 360-degree approach to financial services, ensuring our clients receive comprehensive solutions tailored to their specific needs in an ever-changing market.',
    image: 'https://www.gibcapital.com/media/0cab3mov/6.png',
    flag: 'SA',
    bioUrl: 'https://www.gibcapital.com/senior-management/ahmad-albarraq/'
  },
  {
    id: 3,
    name: 'Abdulaziz Al Juraid',
    position: 'Chief Operating Officer',
    quote:
      'Operational excellence is at the heart of what we do. By streamlining our processes and leveraging cutting-edge technology, we ensure that our clients receive seamless service delivery and can focus on their strategic objectives with confidence.',
    image: 'https://www.gibcapital.com/media/130pwtcd/5.png',
    flag: 'SA',
    bioUrl: 'https://www.gibcapital.com/senior-management/abdulaziz-al-juraid/'
  },
  {
    id: 4,
    name: 'Sameer Nawaz',
    position: 'Head of Investment Banking',
    quote:
      "GIB Capital's investment banking team brings unparalleled expertise in capital markets, M&A, and strategic advisory services. We take pride in our track record of successful transactions that have helped shape the financial landscape of the region.",
    image: 'https://www.gibcapital.com/media/kfamkj2u/4.png',
    flag: 'SA',
    bioUrl: 'https://www.gibcapital.com/senior-management/sameer-nawaz/'
  },
  {
    id: 5,
    name: 'Abdulhadi M Shahadah',
    position: 'Head of Financial Markets',
    quote:
      'Our deep understanding of financial markets enables us to navigate complex environments and identify opportunities that drive value for our clients. We combine local market knowledge with global best practices to deliver superior results.',
    image: 'https://www.gibcapital.com/media/i1vflmec/2.png',
    flag: 'SA',
    bioUrl: 'https://www.gibcapital.com/senior-management/abdulhadi-m-shahadah/'
  },
  {
    id: 6,
    name: 'Abdullah S. AlHamed',
    position: 'Head of Client Investment Advisory',
    quote:
      'Client-centricity is our guiding principle. We work closely with each client to understand their unique needs and objectives, providing tailored investment solutions that help them achieve their financial goals in a changing market landscape.',
    image: 'https://www.gibcapital.com/media/qc3p3fv2/3.png',
    flag: 'SA',
    bioUrl: 'https://www.gibcapital.com/senior-management/abdullah-s-al-hamed/'
  },
  {
    id: 7,
    name: 'Ghadah Alnujaydi',
    position: 'Head of Human Resources',
    quote:
      'At GIB Capital, our people are our greatest asset. We strive to create an inclusive workplace culture that attracts, develops, and retains top talent. By investing in our team, we ensure our clients receive exceptional service from passionate professionals.',
    image: 'https://www.gibcapital.com/media/n1wmaxhk/9.png',
    flag: 'SA',
    bioUrl: 'https://www.gibcapital.com/senior-management/ghadah-al-nujaydi/'
  },
  {
    id: 8,
    name: 'Faisal Alruhaymi',
    position: 'Head of Risk Management',
    quote:
      'Effective risk management is fundamental to our success and the success of our clients. We implement robust frameworks that identify, assess, and mitigate risks while enabling strategic growth and capitalizing on market opportunities.',
    image: 'https://www.gibcapital.com/media/dstiyny3/8.png',
    flag: 'SA',
    bioUrl: 'https://www.gibcapital.com/senior-management/faisal-alruhaymi/'
  },
  {
    id: 9,
    name: 'Maha AlQassem',
    position: 'Senior Corporate Communications Manager',
    quote:
      'Clear and transparent communication is essential in building trust with all our stakeholders. At GIB Capital, we are committed to maintaining open channels of communication that strengthen our relationships and enhance our reputation in the market.',
    image: 'https://www.gibcapital.com/media/1bypyrck/maha-photo.png',
    flag: 'SA',
    bioUrl: 'https://www.gibcapital.com/senior-management/maha-alqassem/'
  }
];

const LeadershipCard = () => {
  const theme = useTheme();
  const [activeIndex, setActiveIndex] = useState(0);
  const progressCircle = useRef(null);
  const progressContent = useRef(null);

  // Swiper references
  const cardsSwiperRef = useRef(null);
  const contentSwiperRef = useRef(null);

  // Handle slide change
  const handleSlideChange = (swiperInstance) => {
    setActiveIndex(swiperInstance.activeIndex);

    // Sync the content swiper
    if (contentSwiperRef.current && contentSwiperRef.current.swiper) {
      contentSwiperRef.current.swiper.slideTo(swiperInstance.activeIndex);
    }
  };

  // Navigation functions
  const goToNextSlide = () => {
    if (cardsSwiperRef.current && cardsSwiperRef.current.swiper) {
      cardsSwiperRef.current.swiper.slideNext();
    }
  };

  const goToPrevSlide = () => {
    if (cardsSwiperRef.current && cardsSwiperRef.current.swiper) {
      cardsSwiperRef.current.swiper.slidePrev();
    }
  };

  const goToSlide = (index) => {
    if (cardsSwiperRef.current && cardsSwiperRef.current.swiper) {
      cardsSwiperRef.current.swiper.slideTo(index);
    }
  };

  // Open bio in new tab
  const openBioPage = (url, event) => {
    event.stopPropagation();
    window.open(url, '_blank');
  };

  // Autoplay time left handler
  const onAutoplayTimeLeft = (s, time, progress) => {
    if (progressCircle.current && progressContent.current) {
      progressCircle.current.style.setProperty('--progress', 1 - progress);
      progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
    }
  };

  return (
    <Box>
      {/* Main content container */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: { xs: 650, md: 535 },
          position: 'relative',
          gap: { xs: 4, md: 3 },
          maxWidth: '1200px',
          mx: 'auto'
        }}
      >
        {/* Left side - Content */}
        <Box
          sx={{
            width: { xs: '100%', sm: '90%', md: '50%' },
            position: 'relative',
            zIndex: 2,
            order: { xs: 2, md: 1 }
          }}
        >
          <Swiper
            ref={contentSwiperRef}
            modules={[EffectFade]}
            effect="fade"
            fadeEffect={{ crossFade: true }}
            allowTouchMove={false}
            speed={800}
            style={{ overflow: 'visible' }}
          >
            {testimonials.map((item) => (
              <SwiperSlide key={`content-${item.id}`}>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`content-motion-${activeIndex}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Paper
                      elevation={0}
                      sx={{
                        bgcolor: alpha(theme.palette.primary.dark, 0.85),
                        backdropFilter: 'blur(5px)',
                        p: { xs: 3, sm: 3.5, md: 4 },
                        borderRadius: 2,
                        border: `1px solid ${alpha(theme.palette.secondary.main, 0.2)}`
                      }}
                    >
                      <Box sx={{ position: 'relative' }}>
                        <Icon
                          icon="mdi:format-quote-open"
                          style={{
                            fontSize: 42,
                            opacity: 0.7,
                            color: theme.palette.secondary.main,
                            marginBottom: 16
                          }}
                        />

                        <Typography
                          variant="h5"
                          sx={{
                            fontSize: { xs: '1.05rem', sm: '1.2rem', md: '1.35rem' },
                            lineHeight: 1.6,
                            fontWeight: 400,
                            mb: 3,
                            color: theme.palette.primary.contrastText
                          }}
                        >
                          {item.quote}
                        </Typography>

                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                          <Typography
                            variant="h6"
                            sx={{
                              fontWeight: 600,
                              color: theme.palette.secondary.main,
                              fontSize: { xs: '1rem', md: '1.1rem' }
                            }}
                          >
                            {item.name}
                          </Typography>
                          <Box
                            component="span"
                            sx={{
                              opacity: 0.9,
                              fontSize: '0.75rem',
                              fontWeight: 600,
                              backgroundColor: alpha(theme.palette.secondary.main, 0.15),
                              color: theme.palette.secondary.main,
                              padding: '2px 6px',
                              borderRadius: 1,
                              border: `1px solid ${alpha(theme.palette.secondary.main, 0.3)}`
                            }}
                          >
                            {item.flag}
                          </Box>
                        </Box>

                        <Typography
                          variant="body2"
                          sx={{
                            opacity: 0.7,
                            color: theme.palette.primary.contrastText,
                            mt: 0.5
                          }}
                        >
                          {item.position}
                        </Typography>
                      </Box>
                    </Paper>
                  </motion.div>
                </AnimatePresence>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Navigation controls */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              mt: 3,
              gap: 2
            }}
          >
            <IconButton
              onClick={goToPrevSlide}
              disabled={activeIndex === 0}
              sx={{
                backgroundColor: alpha(theme.palette.secondary.main, 0.12),
                color: theme.palette.secondary.main,
                '&:hover': {
                  backgroundColor: alpha(theme.palette.secondary.main, 0.2)
                },
                '&:disabled': {
                  backgroundColor: alpha(theme.palette.secondary.main, 0.05),
                  color: alpha(theme.palette.secondary.main, 0.5)
                }
              }}
            >
              <Icon icon="mdi:chevron-left" width={28} height={28} style={{ color: 'inherit' }} />
            </IconButton>
            <IconButton
              onClick={goToNextSlide}
              disabled={activeIndex === testimonials.length - 1}
              sx={{
                backgroundColor: alpha(theme.palette.secondary.main, 0.12),
                color: theme.palette.secondary.main,
                '&:hover': {
                  backgroundColor: alpha(theme.palette.secondary.main, 0.2)
                },
                '&:disabled': {
                  backgroundColor: alpha(theme.palette.secondary.main, 0.05),
                  color: alpha(theme.palette.secondary.main, 0.5)
                }
              }}
            >
              <Icon icon="mdi:chevron-right" width={28} height={28} style={{ color: 'inherit' }} />
            </IconButton>
          </Box>
        </Box>

        {/* Right side - Cards */}
        <Box
          sx={{
            width: { xs: '100%', sm: '80%', md: '45%' },
            height: { xs: 480, sm: 500, md: 520 },
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative',
            order: { xs: 1, md: 2 }
          }}
        >
          {/* Card stack */}
          <Box
            sx={{
              width: '100%',
              height: '100%',
              position: 'relative'
            }}
          >
            <Swiper
              ref={cardsSwiperRef}
              effect="cards"
              grabCursor={true}
              modules={[EffectCards, Autoplay]}
              onSlideChange={handleSlideChange}
              autoplay={{ delay: 6000, disableOnInteraction: false }}
              onAutoplayTimeLeft={onAutoplayTimeLeft}
              cardsEffect={{
                slideShadows: true,
                perSlideOffset: 15,
                perSlideRotate: 6,
                rotate: true
              }}
              style={{ width: '100%', height: '100%' }}
            >
              {testimonials.map((item) => (
                <SwiperSlide key={`card-${item.id}`}>
                  <Box
                    sx={{
                      position: 'relative',
                      width: '100%',
                      height: '100%',
                      borderRadius: 2,
                      overflow: 'hidden',
                      border: `1px solid ${alpha(theme.palette.secondary.main, 0.2)}`,
                      boxShadow: theme.customShadows.z8
                    }}
                  >
                    <Box
                      component="img"
                      src={item.image}
                      alt={item.name}
                      sx={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        objectPosition: 'center'
                      }}
                    />

                    {/* Name and Bio Button overlay */}
                    <Box
                      sx={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        py: 2,
                        px: 3,
                        background: `linear-gradient(to top, 
                          rgba(${theme.palette.primary.darker}, 0.9), 
                          rgba(${theme.palette.primary.darker}, 0.6) 60%, 
                          rgba(${theme.palette.primary.darker}, 0))`,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 1.5
                      }}
                    >
                      <Typography
                        variant="subtitle1"
                        sx={{
                          color: '#fff',
                          fontWeight: 600,
                          textShadow: '0 2px 4px rgba(0,0,0,0.5)'
                        }}
                      >
                        {item.name}
                        <Box
                          component="span"
                          sx={{
                            ml: 1,
                            fontSize: '0.7rem',
                            fontWeight: 600,
                            backgroundColor: alpha(theme.palette.secondary.main, 0.2),
                            color: '#fff',
                            padding: '1px 5px',
                            borderRadius: theme.shape.borderRadius / 2,
                            border: `1px solid ${alpha(theme.palette.common.white, 0.3)}`
                          }}
                        >
                          {item.flag}
                        </Box>
                      </Typography>

                      <Button
                        variant="contained"
                        onClick={(e) => openBioPage(item.bioUrl, e)}
                        startIcon={<Icon icon="mdi:account" />}
                        endIcon={<Icon icon="proicons:open" />}
                        size="small"
                        sx={{
                          alignSelf: 'flex-start',
                          backgroundColor: theme.palette.secondary.main,
                          color: theme.palette.secondary.contrastText,
                          '&:hover': {
                            backgroundColor: theme.palette.secondary.dark,
                            boxShadow: theme.customShadows.secondaryButton
                          },
                          textTransform: 'none',
                          fontWeight: 500,
                          px: 2,
                          py: 0.5,
                          borderRadius: theme.shape.borderRadius
                        }}
                      >
                        Read Bio
                      </Button>
                    </Box>
                  </Box>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Circular progress indicator */}
            <Box
              sx={{
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
                boxShadow: theme.customShadows.z4,
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
              }}
            >
              <svg viewBox="0 0 48 48" ref={progressCircle}>
                <circle cx="24" cy="24" r="20"></circle>
              </svg>
              <span ref={progressContent}></span>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Pagination dots */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          my: { xs: 3, md: 3 },
          gap: 1
        }}
      >
        {testimonials.map((_, idx) => (
          <Box
            key={idx}
            onClick={() => goToSlide(idx)}
            component={motion.div}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            sx={{
              width: activeIndex === idx ? 24 : 8,
              height: 8,
              borderRadius: activeIndex === idx ? theme.shape.borderRadius : '50%',
              bgcolor: activeIndex === idx ? theme.palette.secondary.main : alpha(theme.palette.secondary.main, 0.3),
              boxShadow: activeIndex === idx ? `0 0 8px ${alpha(theme.palette.secondary.main, 0.6)}` : 'none',
              transition: 'all 0.3s ease',
              cursor: 'pointer'
            }}
          />
        ))}
      </Box>
    </Box>
  );
};

export default LeadershipCard;
