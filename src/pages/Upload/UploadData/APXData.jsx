'use client';

import { Icon } from '@iconify/react';
import { Avatar, Box, Card, Typography, alpha, useTheme } from '@mui/material';
import PropTypes from 'prop-types';
import { forwardRef, useEffect, useId, useRef, useState } from 'react';

// Enhanced Animated Beam implementation with better animation
const AnimatedBeam = ({
  containerRef,
  fromRef,
  toRef,
  curvature = 50,
  reverse = false,
  duration = Math.random() * 3 + 4,
  delay = 0,
  pathColor,
  pathWidth = 2,
  pathOpacity = 0.2,
  gradientStartColor,
  gradientStopColor,
  startXOffset = 0,
  startYOffset = 0,
  endXOffset = 0,
  endYOffset = 0
}) => {
  const theme = useTheme();
  const id = useId();
  const [pathD, setPathD] = useState('');
  const [svgDimensions, setSvgDimensions] = useState({ width: 0, height: 0 });

  // Determine colors based on theme and provided colors
  const actualPathColor = pathColor || theme.palette.divider;
  const actualGradientStartColor = gradientStartColor || theme.palette.primary.main;
  const actualGradientStopColor = gradientStopColor || theme.palette.secondary.main;

  // Animation keyframes for gradient movement with more natural easing
  const [keyframe, setKeyframe] = useState(0);

  useEffect(() => {
    const updatePath = () => {
      if (containerRef?.current && fromRef?.current && toRef?.current) {
        const containerRect = containerRef.current.getBoundingClientRect();
        const rectA = fromRef.current.getBoundingClientRect();
        const rectB = toRef.current.getBoundingClientRect();

        const svgWidth = containerRect.width;
        const svgHeight = containerRect.height;
        setSvgDimensions({ width: svgWidth, height: svgHeight });

        const startX = rectA.left - containerRect.left + rectA.width / 2 + startXOffset;
        const startY = rectA.top - containerRect.top + rectA.height / 2 + startYOffset;
        const endX = rectB.left - containerRect.left + rectB.width / 2 + endXOffset;
        const endY = rectB.top - containerRect.top + rectB.height / 2 + endYOffset;

        const controlX = (startX + endX) / 2;
        const controlY = Math.min(startY, endY) - curvature;

        const d = `M ${startX},${startY} Q ${controlX},${controlY} ${endX},${endY}`;
        setPathD(d);
      }
    };

    // Initial update
    updatePath();

    // Set up ResizeObserver for container
    const resizeObserver = new ResizeObserver(() => {
      updatePath();
    });

    if (containerRef?.current) {
      resizeObserver.observe(containerRef.current);
    }

    // Animation loop for gradient movement
    let startTime;
    const animateDot = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = (timestamp - startTime) / (duration * 1000);

      // Calculate position with easing (ease-in-out)
      let easedProgress;
      const normalizedProgress = progress % 1; // Keep between 0-1

      // Easing function to make animation more natural
      if (normalizedProgress < 0.5) {
        easedProgress = 2 * normalizedProgress * normalizedProgress;
      } else {
        easedProgress = -1 + (4 - 2 * normalizedProgress) * normalizedProgress;
      }

      // Set position (0-100)
      setKeyframe(easedProgress * 100);

      animationFrameId = requestAnimationFrame(animateDot);
    };

    let animationFrameId = requestAnimationFrame(animateDot);

    return () => {
      resizeObserver.disconnect();
      cancelAnimationFrame(animationFrameId);
    };
  }, [containerRef, fromRef, toRef, curvature, duration, startXOffset, startYOffset, endXOffset, endYOffset]);

  if (!pathD) return null;

  return (
    <Box
      sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 5
      }}
    >
      <svg
        width={svgDimensions.width}
        height={svgDimensions.height}
        xmlns="http://www.w3.org/2000/svg"
        style={{ position: 'absolute', top: 0, left: 0 }}
        fill="none"
        viewBox={`0 0 ${svgDimensions.width} ${svgDimensions.height}`}
      >
        {/* Base path with low opacity */}
        <path
          d={pathD}
          stroke={actualPathColor}
          strokeWidth={pathWidth}
          strokeOpacity={pathOpacity}
          strokeLinecap="round"
          fill="none"
        />

        {/* Animated path with gradient */}
        <path d={pathD} stroke={`url(#${id})`} strokeWidth={pathWidth} strokeLinecap="round" fill="none" />

        {/* Create moving dot effect */}
        <circle cx="0" cy="0" r={pathWidth * 1.5} fill={actualGradientStartColor}>
          <animateMotion dur={`${duration}s`} begin={`${delay}s`} repeatCount="indefinite" path={pathD} />
        </circle>

        <defs>
          <linearGradient
            id={id}
            gradientUnits="userSpaceOnUse"
            x1={reverse ? '90%' : '10%'}
            y1="0%"
            x2={reverse ? '0%' : '100%'}
            y2="0%"
          >
            <stop offset="0%" stopColor={actualGradientStartColor} stopOpacity="0" />
            <stop offset={`${Math.max(0, keyframe - 20)}%`} stopColor={actualGradientStartColor} stopOpacity="0" />
            <stop offset={`${keyframe}%`} stopColor={actualGradientStartColor} stopOpacity="1" />
            <stop offset={`${Math.min(100, keyframe + 10)}%`} stopColor={actualGradientStopColor} stopOpacity="1" />
            <stop offset={`${Math.min(100, keyframe + 30)}%`} stopColor={actualGradientStopColor} stopOpacity="0.5" />
            <stop offset="100%" stopColor={actualGradientStopColor} stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
    </Box>
  );
};

AnimatedBeam.propTypes = {
  containerRef: PropTypes.object.isRequired,
  fromRef: PropTypes.object.isRequired,
  toRef: PropTypes.object.isRequired,
  curvature: PropTypes.number,
  reverse: PropTypes.bool,
  duration: PropTypes.number,
  delay: PropTypes.number,
  pathColor: PropTypes.string,
  pathWidth: PropTypes.number,
  pathOpacity: PropTypes.number,
  gradientStartColor: PropTypes.string,
  gradientStopColor: PropTypes.string,
  startXOffset: PropTypes.number,
  startYOffset: PropTypes.number,
  endXOffset: PropTypes.number,
  endYOffset: PropTypes.number
};

const Circle = forwardRef(({ className, children, sx, color }, ref) => {
  const theme = useTheme();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Avatar
      ref={ref}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      sx={{
        position: 'relative',
        zIndex: 10,
        bgcolor: alpha(color || theme.palette.primary.main, isHovered ? 0.18 : 0.12),
        color: color || theme.palette.primary.main,
        width: 48,
        height: 48,
        border: `2px solid ${alpha(color || theme.palette.primary.main, isHovered ? 0.5 : 0.3)}`,
        boxShadow: isHovered ? '0 0 20px -8px rgba(0,0,0,0.7)' : '0 0 15px -12px rgba(0,0,0,0.5)',
        transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
        transform: isHovered ? 'scale(1.1) translateY(-2px)' : 'scale(1) translateY(0)',
        cursor: 'pointer',
        ...sx
      }}
    >
      {children}
    </Avatar>
  );
});

Circle.displayName = 'Circle';

Circle.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  sx: PropTypes.object,
  color: PropTypes.string
};

export function APXDataFlow() {
  const theme = useTheme();
  const containerRef = useRef(null);

  // Custodian nodes
  const albilad = useRef(null);
  const riyadh = useRef(null);
  const at = useRef(null);
  const stateStreet = useRef(null);

  // APX node (center)
  const apx = useRef(null);

  // Output node
  const output = useRef(null);

  // Add isProcessing state
  const [isProcessing, setIsProcessing] = useState(false);

  // Toggle processing state
  const toggleProcessing = () => {
    setIsProcessing((prev) => !prev);
  };

  // Define colors to match the custodian UI
  const colors = {
    albilad: theme.palette.primary.main,
    riyadh: theme.palette.secondary.main,
    at: '#FF9800', // Orange
    stateStreet: '#673AB7', // Deep Purple
    apx: '#4CAF50' // Green
  };

  return (
    <Card
      elevation={1}
      sx={{
        borderRadius: 2,
        border: `1px solid ${theme.palette.divider}`,
        mt: 3,
        mb: 3,
        overflow: 'hidden',
        transition: 'all 0.3s ease',
        '&:hover': {
          boxShadow: theme.shadows[3]
        }
      }}
    >
      <Box
        sx={{
          p: 2,
          bgcolor: alpha(colors.apx, 0.08),
          borderBottom: `1px solid ${theme.palette.divider}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Avatar
            sx={{
              bgcolor: alpha(colors.apx, 0.2),
              color: colors.apx,
              width: 40,
              height: 40,
              mr: 2
            }}
          >
            <Icon icon="mdi:database-import" width={24} />
          </Avatar>
          <Typography variant="h6">APX Data Integration Flow</Typography>
        </Box>
        <Box
          onClick={toggleProcessing}
          sx={{
            display: 'flex',
            alignItems: 'center',
            cursor: 'pointer',
            py: 0.5,
            px: 1.5,
            borderRadius: 1,
            bgcolor: alpha(isProcessing ? theme.palette.success.main : theme.palette.warning.main, 0.1),
            border: `1px solid ${alpha(isProcessing ? theme.palette.success.main : theme.palette.warning.main, 0.3)}`,
            transition: 'all 0.2s ease'
          }}
        >
          <Box
            sx={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              bgcolor: isProcessing ? theme.palette.success.main : theme.palette.warning.main,
              mr: 1,
              boxShadow: isProcessing
                ? `0 0 0 3px ${alpha(theme.palette.success.main, 0.2)}`
                : `0 0 0 3px ${alpha(theme.palette.warning.main, 0.2)}`,
              animation: isProcessing ? 'pulse 1.5s infinite' : 'none',
              '@keyframes pulse': {
                '0%': {
                  boxShadow: `0 0 0 0 ${alpha(theme.palette.success.main, 0.4)}`
                },
                '70%': {
                  boxShadow: `0 0 0 6px ${alpha(theme.palette.success.main, 0)}`
                },
                '100%': {
                  boxShadow: `0 0 0 0 ${alpha(theme.palette.success.main, 0)}`
                }
              }
            }}
          />
          <Typography variant="caption" fontWeight={500} color={isProcessing ? 'success.main' : 'warning.main'}>
            {isProcessing ? 'Processing Active' : 'Click to Activate'}
          </Typography>
        </Box>
      </Box>

      <Box
        ref={containerRef}
        sx={{
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          minHeight: 300,
          p: 3,
          bgcolor: alpha(theme.palette.background.default, 0.5)
        }}
      >
        <Box
          sx={{
            display: 'flex',
            width: '100%',
            maxWidth: '100%',
            alignItems: 'center',
            justifyContent: 'space-between',
            px: 2
          }}
        >
          {/* Left section - Custodian Sources */}
          <Box
            sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 2.5, minHeight: 240 }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Circle ref={albilad} color={colors.albilad}>
                <Icon icon="mdi:bank" width={24} />
              </Circle>
              <Typography variant="subtitle2" sx={{ ml: 1.5, fontWeight: 500 }}>
                Albilad
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Circle ref={riyadh} color={colors.riyadh}>
                <Icon icon="mdi:city" width={24} />
              </Circle>
              <Typography variant="subtitle2" sx={{ ml: 1.5, fontWeight: 500 }}>
                Riyadh
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Circle ref={at} color={colors.at}>
                <Icon icon="mdi:office-building" width={24} />
              </Circle>
              <Typography variant="subtitle2" sx={{ ml: 1.5, fontWeight: 500 }}>
                AT
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Circle ref={stateStreet} color={colors.stateStreet}>
                <Icon icon="mdi:bank-outline" width={24} />
              </Circle>
              <Typography variant="subtitle2" sx={{ ml: 1.5, fontWeight: 500 }}>
                State Street
              </Typography>
            </Box>
          </Box>

          {/* Center - APX System */}
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <Circle
              ref={apx}
              color={colors.apx}
              sx={{
                width: 72,
                height: 72,
                animation: isProcessing ? 'pulse 2s infinite' : 'none',
                '@keyframes pulse': {
                  '0%': {
                    boxShadow: `0 0 0 0 ${alpha(colors.apx, 0.7)}`
                  },
                  '70%': {
                    boxShadow: `0 0 0 10px ${alpha(colors.apx, 0)}`
                  },
                  '100%': {
                    boxShadow: `0 0 0 0 ${alpha(colors.apx, 0)}`
                  }
                }
              }}
            >
              <Icon
                icon={isProcessing ? 'mdi:cog-sync' : 'mdi:chart-box'}
                width={36}
                className={isProcessing ? 'spinning' : ''}
                style={{
                  animation: isProcessing ? 'spin 3s linear infinite' : 'none',
                  '@keyframes spin': {
                    '0%': {
                      transform: 'rotate(0deg)'
                    },
                    '100%': {
                      transform: 'rotate(360deg)'
                    }
                  }
                }}
              />
            </Circle>
            <Typography variant="subtitle2" sx={{ mt: 1, fontWeight: 600, color: colors.apx }}>
              APX System
            </Typography>
            <Typography
              variant="caption"
              sx={{
                textAlign: 'center',
                maxWidth: 120,
                color: isProcessing ? 'success.main' : 'text.secondary'
              }}
            >
              {isProcessing ? 'Active Processing' : 'Data Processing'}
            </Typography>
          </Box>

          {/* Right - Output/Reporting */}
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Circle
              ref={output}
              sx={{
                width: 56,
                height: 56,
                bgcolor: isProcessing ? alpha(theme.palette.info.main, 0.12) : alpha(theme.palette.grey[500], 0.12),
                color: isProcessing ? theme.palette.info.main : theme.palette.grey[500],
                border: `2px solid ${isProcessing ? alpha(theme.palette.info.main, 0.3) : alpha(theme.palette.grey[500], 0.3)}`
              }}
            >
              <Icon icon="mdi:file-chart" width={28} />
            </Circle>
            <Typography variant="subtitle2" sx={{ mt: 1, fontWeight: 600 }}>
              Reconciliation
            </Typography>
            <Typography variant="caption" sx={{ textAlign: 'center', maxWidth: 120 }}>
              {isProcessing ? 'Reports Ready' : 'Generated Reports'}
            </Typography>
          </Box>
        </Box>

        {/* Enhanced animated connection beams */}
        {isProcessing && (
          <>
            <AnimatedBeam
              containerRef={containerRef}
              fromRef={albilad}
              toRef={apx}
              curvature={60}
              duration={5}
              delay={0}
              gradientStartColor={colors.albilad}
              gradientStopColor={colors.apx}
              pathColor={alpha(colors.albilad, 0.3)}
              pathWidth={3}
            />
            <AnimatedBeam
              containerRef={containerRef}
              fromRef={riyadh}
              toRef={apx}
              curvature={40}
              duration={4.5}
              delay={0.5}
              gradientStartColor={colors.riyadh}
              gradientStopColor={colors.apx}
              pathColor={alpha(colors.riyadh, 0.3)}
              pathWidth={3}
            />
            <AnimatedBeam
              containerRef={containerRef}
              fromRef={at}
              toRef={apx}
              curvature={30}
              duration={4}
              delay={1}
              gradientStartColor={colors.at}
              gradientStopColor={colors.apx}
              pathColor={alpha(colors.at, 0.3)}
              pathWidth={3}
            />
            <AnimatedBeam
              containerRef={containerRef}
              fromRef={stateStreet}
              toRef={apx}
              curvature={20}
              duration={3.5}
              delay={1.5}
              gradientStartColor={colors.stateStreet}
              gradientStopColor={colors.apx}
              pathColor={alpha(colors.stateStreet, 0.3)}
              pathWidth={3}
            />
            <AnimatedBeam
              containerRef={containerRef}
              fromRef={apx}
              toRef={output}
              reverse={true}
              curvature={30}
              duration={3}
              delay={2.5}
              gradientStartColor={colors.apx}
              gradientStopColor={theme.palette.info.main}
              pathColor={alpha(colors.apx, 0.3)}
              pathWidth={3}
            />
          </>
        )}

        {!isProcessing && (
          <>
            <AnimatedBeam
              containerRef={containerRef}
              fromRef={albilad}
              toRef={apx}
              curvature={60}
              duration={8}
              delay={0}
              gradientStartColor={colors.albilad}
              gradientStopColor={colors.apx}
              pathColor={alpha(colors.albilad, 0.1)}
              pathOpacity={0.1}
            />
            <AnimatedBeam
              containerRef={containerRef}
              fromRef={riyadh}
              toRef={apx}
              curvature={40}
              duration={8}
              delay={0}
              gradientStartColor={colors.riyadh}
              gradientStopColor={colors.apx}
              pathColor={alpha(colors.riyadh, 0.1)}
              pathOpacity={0.1}
            />
            <AnimatedBeam
              containerRef={containerRef}
              fromRef={at}
              toRef={apx}
              curvature={30}
              duration={8}
              delay={0}
              gradientStartColor={colors.at}
              gradientStopColor={colors.apx}
              pathColor={alpha(colors.at, 0.1)}
              pathOpacity={0.1}
            />
            <AnimatedBeam
              containerRef={containerRef}
              fromRef={stateStreet}
              toRef={apx}
              curvature={20}
              duration={8}
              delay={0}
              gradientStartColor={colors.stateStreet}
              gradientStopColor={colors.apx}
              pathColor={alpha(colors.stateStreet, 0.1)}
              pathOpacity={0.1}
            />
          </>
        )}
      </Box>

      <Box
        sx={{
          p: 2,
          borderTop: `1px solid ${theme.palette.divider}`,
          bgcolor: alpha(theme.palette.background.default, 0.7),
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <Typography variant="body2" color="text.secondary">
          Data flows from custodians through the APX system for processing and reconciliation
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box
            sx={{
              width: 10,
              height: 10,
              borderRadius: '50%',
              bgcolor: isProcessing ? theme.palette.success.main : theme.palette.warning.main,
              mr: 0.5
            }}
          />
          <Typography variant="caption" color={isProcessing ? 'success.main' : 'warning.main'} fontWeight={500}>
            {isProcessing ? 'Live Connection' : 'Ready to Connect'}
          </Typography>
        </Box>
      </Box>

      <style jsx global>{`
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        .spinning {
          animation: spin 3s linear infinite;
        }
      `}</style>
    </Card>
  );
}

export default APXDataFlow;
