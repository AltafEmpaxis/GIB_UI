import React from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography,
  styled,
  useTheme,
  alpha,
  CircularProgress,
  StepConnector,
  Tooltip
} from '@mui/material';
import { stepConnectorClasses } from '@mui/material/StepConnector';
import { Icon } from '@iconify/react';
import CheckIcon from '@mui/icons-material/Check';

// Custom connector with animated gradient progress
const AnimatedConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 22
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage: `linear-gradient(95deg, 
        ${theme.palette.primary.main} 0%, 
        ${theme.palette.secondary.main} 50%, 
        ${theme.palette.primary.dark} 100%)`,
      backgroundSize: '200% 200%',
      animation: 'gradient-animation 2s ease infinite'
    }
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage: `linear-gradient(95deg, 
        ${theme.palette.primary.main} 0%, 
        ${theme.palette.primary.dark} 100%)`
    }
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
    border: 0,
    backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[800] : theme.palette.grey[300],
    borderRadius: 1
  },
  '@keyframes gradient-animation': {
    '0%': {
      backgroundPosition: '0% 50%'
    },
    '50%': {
      backgroundPosition: '100% 50%'
    },
    '100%': {
      backgroundPosition: '0% 50%'
    }
  }
}));

// Custom Step Icon
const GIBStepIconRoot = styled('div')(({ theme, ownerState }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[700] : theme.palette.grey[300],
  zIndex: 1,
  color: '#fff',
  width: 40,
  height: 40,
  display: 'flex',
  borderRadius: '50%',
  justifyContent: 'center',
  alignItems: 'center',
  boxShadow: theme.shadows[1],
  transition: 'transform 0.5s cubic-bezier(0.68, -0.55, 0.27, 1.55), background-color 0.3s ease',
  ...(ownerState.active && {
    backgroundImage: `linear-gradient(135deg, 
      ${theme.palette.primary.main} 0%, 
      ${theme.palette.secondary.main} 50%, 
      ${theme.palette.primary.dark} 100%)`,
    backgroundSize: '200% 200%',
    animation: 'gradient-icon-animation 2s ease infinite',
    transform: 'scale(1.2)',
    boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)'
  }),
  ...(ownerState.completed && {
    backgroundColor: theme.palette.primary.main
  }),
  '@keyframes gradient-icon-animation': {
    '0%': {
      backgroundPosition: '0% 50%'
    },
    '50%': {
      backgroundPosition: '100% 50%'
    },
    '100%': {
      backgroundPosition: '0% 50%'
    }
  },
  '@keyframes spin': {
    '0%': {
      transform: 'rotate(0deg)'
    },
    '100%': {
      transform: 'rotate(360deg)'
    }
  }
}));

// Custom Step Icon Component
function GIBStepIcon(props) {
  const { active, completed, className, icon } = props;
  const theme = useTheme();

  const icons = {
    1: <Icon icon="mdi:folder-multiple" width={20} />,
    2: <Icon icon="mdi:cloud-upload" width={20} className={active ? 'spinning-icon' : ''} />,
    3: <Icon icon="mdi:check-circle" width={20} />
  };

  return (
    <GIBStepIconRoot ownerState={{ completed, active }} className={className}>
      {completed ? (
        <CheckIcon fontSize="small" />
      ) : active && icon === 2 ? (
        <Icon icon="mdi:cog" width={22} className="spinning-icon" />
      ) : (
        icons[String(icon)]
      )}
    </GIBStepIconRoot>
  );
}

GIBStepIcon.propTypes = {
  active: PropTypes.bool,
  className: PropTypes.string,
  completed: PropTypes.bool,
  icon: PropTypes.node
};

// Step instruction tooltips
const getStepTooltip = (step) => {
  switch (step) {
    case 0:
      return 'Step 1: Select a custodian type to upload data from. Accepted formats: XLSX, CSV, XML (max 50MB)';
    case 1:
      return 'Step 2: Files are being uploaded to the server. Please wait until the process completes.';
    case 2:
      return 'Step 3: Upload complete! Review your files or upload additional data.';
    default:
      return '';
  }
};

// Main GIBStepper component
const GIBStepper = ({
  steps,
  activeStep,
  setActiveStep,
  completed = {},
  setCompleted = () => {},
  contentRenderer = null
}) => {
  const theme = useTheme();

  return (
    <Box sx={{ width: '100%' }}>
      {/* Stepper with custom connector and icons */}
      <Box sx={{ position: 'relative' }}>
        <Stepper activeStep={activeStep} alternativeLabel connector={<AnimatedConnector />}>
          {steps.map((label, index) => (
            <Step key={label} completed={completed[index]}>
              <Tooltip title={getStepTooltip(index)} arrow placement="top">
                <StepLabel StepIconComponent={GIBStepIcon}>{label}</StepLabel>
              </Tooltip>
            </Step>
          ))}
        </Stepper>
        {activeStep === 1 && (
          <Box
            sx={{ position: 'absolute', top: 0, left: 0, right: 0, height: '100%', pointerEvents: 'none', zIndex: -1 }}
          >
            <Box
              sx={{
                position: 'absolute',
                top: 22,
                left: 'calc(25% + 20px)',
                right: 'calc(75% - 20px)',
                height: 3,
                background: `linear-gradient(to right, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                backgroundSize: '200% 200%',
                animation: 'progress-animation 1.5s ease infinite',
                borderRadius: 1.5
              }}
            />
          </Box>
        )}
      </Box>

      {/* Content area */}
      <Box sx={{ mt: 4 }}>
        {contentRenderer ? (
          contentRenderer(activeStep)
        ) : (
          <Typography variant="body1" align="center" color="text.secondary">
            {steps[activeStep]}
          </Typography>
        )}
      </Box>

      {/* Add CSS for animations */}
      <style jsx global>{`
        .spinning-icon {
          animation: spin 2s linear infinite;
        }
        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
        @keyframes progress-animation {
          0% {
            backgroundposition: 0% 50%;
          }
          50% {
            backgroundposition: 100% 50%;
          }
          100% {
            backgroundposition: 0% 50%;
          }
        }
      `}</style>
    </Box>
  );
};

GIBStepper.propTypes = {
  steps: PropTypes.array.isRequired,
  activeStep: PropTypes.number.isRequired,
  setActiveStep: PropTypes.func.isRequired,
  completed: PropTypes.object,
  setCompleted: PropTypes.func,
  contentRenderer: PropTypes.func
};

export default GIBStepper;
