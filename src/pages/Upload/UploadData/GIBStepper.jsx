import React from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Stepper,
  Step,
  StepLabel,
  StepButton,
  StepConnector,
  Button,
  Typography,
  styled,
  useTheme,
  alpha
} from '@mui/material';
import { stepConnectorClasses } from '@mui/material/StepConnector';
import { Icon } from '@iconify/react';
import CheckIcon from '@mui/icons-material/Check';

// Custom connector with GIB theme colors
const GIBConnector = styled(StepConnector)(({ theme }) => {
  const isDark = theme.palette.mode === 'dark';
  
  return {
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
      top: 22,
      left: 'calc(-50% + 20px)',
      right: 'calc(50% + 20px)',
    },
    [`&.${stepConnectorClasses.active}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        backgroundImage: `linear-gradient(95deg, 
          ${theme.palette.primary.main} 0%, 
          ${theme.palette.secondary.main} 50%, 
          ${theme.palette.primary.dark} 100%)`,
      },
    },
    [`&.${stepConnectorClasses.completed}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        backgroundImage: `linear-gradient(95deg, 
          ${theme.palette.secondary.main} 0%, 
          ${theme.palette.secondary.dark} 100%)`,
      },
    },
    [`& .${stepConnectorClasses.line}`]: {
      height: 3,
      border: 0,
      backgroundColor: isDark ? theme.palette.grey[700] : theme.palette.grey[300],
      borderRadius: 1,
    },
  };
});

// Custom Step Icon
const GIBStepIconRoot = styled('div')(({ theme, ownerState }) => {
  const isDark = theme.palette.mode === 'dark';
  
  return {
    backgroundColor: isDark ? theme.palette.grey[700] : theme.palette.grey[300],
    zIndex: 1,
    color: '#fff',
    width: 50,
    height: 50,
    display: 'flex',
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    boxShadow: theme.shadows[1],
    transition: 'all 0.3s ease',
    ...(ownerState.active && {
      backgroundImage: `linear-gradient(136deg, 
        ${theme.palette.primary.main} 0%, 
        ${theme.palette.secondary.main} 50%, 
        ${theme.palette.primary.dark} 100%)`,
      boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
      transform: 'scale(1.1)'
    }),
    ...(ownerState.completed && {
      backgroundImage: `linear-gradient(136deg, 
        ${theme.palette.secondary.main} 0%, 
        ${theme.palette.secondary.dark} 100%)`,
    }),
  };
});

// Custom Step Icon Component
function GIBStepIcon(props) {
  const { active, completed, className, icon } = props;
  const theme = useTheme();

  const icons = {
    1: <Icon icon="mdi:folder-multiple" width={24} />,
    2: <Icon icon="mdi:cloud-upload" width={24} />,
    3: <Icon icon="mdi:cog" width={24} />,
    4: <Icon icon="mdi:check-circle" width={24} />
  };

  return (
    <GIBStepIconRoot ownerState={{ completed, active }} className={className}>
      {completed ? <CheckIcon /> : icons[String(icon)]}
    </GIBStepIconRoot>
  );
}

GIBStepIcon.propTypes = {
  active: PropTypes.bool,
  className: PropTypes.string,
  completed: PropTypes.bool,
  icon: PropTypes.node
};

// Main GIBStepper component
const GIBStepper = ({ 
  steps, 
  activeStep, 
  setActiveStep, 
  completed = {}, 
  setCompleted = () => {},
  skippable = false,
  showControls = true,
  alternativeLabel = true,
  nonLinear = false,
  orientation = 'horizontal',
  className = '',
  contentRenderer = null
}) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  // Helper functions for stepper control
  const totalSteps = () => steps.length;
  const completedSteps = () => Object.keys(completed).length;
  const isLastStep = () => activeStep === totalSteps() - 1;
  const allStepsCompleted = () => completedSteps() === totalSteps();

  // Check if a step is optional (can be customized)
  const isStepOptional = (step) => {
    return skippable && step === 1; // Example: second step is optional
  };

  // Check if a step has been skipped
  const isStepSkipped = (step) => {
    return Object.keys(completed).some(skippedStep => 
      parseInt(skippedStep) > step && !completed[step]
    );
  };

  // Handle next button click
  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed
          steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  // Handle back button click
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  // Handle step click (for non-linear stepper)
  const handleStep = (step) => () => {
    if (nonLinear) {
      setActiveStep(step);
    }
  };

  // Handle complete step
  const handleComplete = () => {
    const newCompleted = { ...completed };
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    
    if (!isLastStep()) {
      handleNext();
    }
  };

  // Handle skip step
  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    
    const newCompleted = { ...completed };
    newCompleted[activeStep] = false; // Mark as skipped
    setCompleted(newCompleted);
  };

  // Handle reset
  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };

  // Render step content
  const renderStepContent = () => {
    if (contentRenderer) {
      return contentRenderer(activeStep, handleNext, handleBack, handleComplete);
    }

    if (allStepsCompleted()) {
      return (
        <React.Fragment>
          <Box 
            sx={{ 
              mt: 4, 
              mb: 2, 
              p: 3, 
              borderRadius: 2,
              bgcolor: alpha(theme.palette.success.main, 0.1),
              border: `1px solid ${alpha(theme.palette.success.main, 0.3)}`
            }}
          >
            <Typography variant="h6" color="success.main" align="center" sx={{ mb: 1 }}>
              <Icon icon="mdi:check-circle" style={{ verticalAlign: 'middle', marginRight: 8 }} width={24} />
              All steps completed successfully
            </Typography>
            <Typography variant="body2" color="text.secondary" align="center">
              You have completed all the required steps in this process.
            </Typography>
          </Box>
          {showControls && (
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Box sx={{ flex: '1 1 auto' }} />
              <Button 
                variant="outlined"
                color="secondary"
                onClick={handleReset}
                sx={{ 
                  borderRadius: 2,
                  px: 3
                }}
              >
                Reset
              </Button>
            </Box>
          )}
        </React.Fragment>
      );
    }

    return (
      <React.Fragment>
        <Box 
          sx={{ 
            mt: 4, 
            mb: 2, 
            p: 3, 
            borderRadius: 2,
            bgcolor: alpha(theme.palette.primary.main, 0.05),
            border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`
          }}
        >
          <Typography variant="h6" sx={{ mb: 1 }}>
            {steps[activeStep]}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {`Step ${activeStep + 1} of ${steps.length}`}
          </Typography>
        </Box>
        
        {showControls && (
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ 
                mr: 1,
                borderRadius: 2,
                px: 3,
                color: theme.palette.text.secondary
              }}
            >
              Back
            </Button>
            <Box sx={{ flex: '1 1 auto' }} />
            
            {isStepOptional(activeStep) && (
              <Button 
                color="inherit" 
                onClick={handleSkip} 
                sx={{ 
                  mr: 1,
                  borderRadius: 2,
                  px: 3,
                  color: theme.palette.text.secondary
                }}
              >
                Skip
              </Button>
            )}
            
            {activeStep === totalSteps() - 1 ? (
              <Button 
                variant="contained"
                color="secondary"
                onClick={handleComplete}
                sx={{ 
                  borderRadius: 2,
                  px: 4,
                  py: 1
                }}
              >
                Finish
              </Button>
            ) : completed[activeStep] ? (
              <Button 
                variant="contained"
                color="primary"
                onClick={handleNext}
                sx={{ 
                  borderRadius: 2,
                  px: 4,
                  py: 1
                }}
              >
                Next
              </Button>
            ) : (
              <Button 
                variant="contained"
                color="secondary"
                onClick={handleComplete}
                sx={{ 
                  borderRadius: 2,
                  px: 4,
                  py: 1
                }}
              >
                Complete Step
              </Button>
            )}
          </Box>
        )}
      </React.Fragment>
    );
  };

  return (
    <Box sx={{ width: '100%' }} className={className}>
      {nonLinear ? (
        <Stepper 
          nonLinear 
          activeStep={activeStep} 
          alternativeLabel={alternativeLabel} 
          orientation={orientation}
          connector={<GIBConnector />}
        >
          {steps.map((label, index) => (
            <Step key={label} completed={completed[index]}>
              <StepButton 
                color="inherit" 
                onClick={handleStep(index)}
                optional={
                  isStepOptional(index) ? (
                    <Typography variant="caption" sx={{ color: theme.palette.secondary.main }}>
                      Optional
                    </Typography>
                  ) : null
                }
              >
                <StepLabel StepIconComponent={GIBStepIcon}>{label}</StepLabel>
              </StepButton>
            </Step>
          ))}
        </Stepper>
      ) : (
        <Stepper 
          activeStep={activeStep} 
          alternativeLabel={alternativeLabel} 
          orientation={orientation}
          connector={<GIBConnector />}
          className="GIB-stepper-gradient"
        >
          {steps.map((label, index) => {
            const stepProps = {};
            const labelProps = {};
            
            if (isStepOptional(index)) {
              labelProps.optional = (
                <Typography variant="caption" sx={{ color: theme.palette.secondary.main }}>
                  Optional
                </Typography>
              );
            }
            
            if (isStepSkipped(index)) {
              stepProps.completed = false;
            }
            
            return (
              <Step key={label} {...stepProps}>
                <StepLabel StepIconComponent={GIBStepIcon} {...labelProps}>
                  {label}
                </StepLabel>
              </Step>
            );
          })}
        </Stepper>
      )}
      
      {renderStepContent()}
    </Box>
  );
};

GIBStepper.propTypes = {
  steps: PropTypes.array.isRequired,
  activeStep: PropTypes.number.isRequired,
  setActiveStep: PropTypes.func.isRequired,
  completed: PropTypes.object,
  setCompleted: PropTypes.func,
  skippable: PropTypes.bool,
  showControls: PropTypes.bool,
  alternativeLabel: PropTypes.bool,
  nonLinear: PropTypes.bool,
  orientation: PropTypes.oneOf(['horizontal', 'vertical']),
  className: PropTypes.string,
  contentRenderer: PropTypes.func
};

export default GIBStepper; 