import { Icon } from '@iconify/react';
import { Box, Slider, Stack, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import PropTypes from 'prop-types';
import React, { useState, useEffect, useTransition } from 'react';

// ==============================|| BORDER RADIUS SLIDER ||============================== //

// Pre-defined marks for the slider
const marks = [
  { value: 4, label: '4px' },
  { value: 8, label: '8px' },
  { value: 12, label: '12px' },
  { value: 16, label: '16px' },
  { value: 20, label: '20px' },
  { value: 24, label: '24px' }
];

// Pure function for value formatting
const valueLabelFormat = (value) => `${value}px`;

const BorderRadiusSlider = ({ value, onChange }) => {
  const theme = useTheme();
  const [isPending, startTransition] = useTransition();

  // Local state to track slider value
  const [localValue, setLocalValue] = useState(value);

  // Update local value when prop value changes
  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  // Debounce timer reference
  const timerRef = React.useRef(null);

  // Handle slider change
  const handleChange = (_, newValue) => {
    // Update local state immediately for responsive UI
    setLocalValue(newValue);

    // Clear any existing timeout
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    // Set a new timeout to update the parent component
    timerRef.current = setTimeout(() => {
      startTransition(() => {
        onChange(null, newValue);
      });
    }, 50); // Short delay for better performance
  };

  // Clean up timer on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  return (
    <Box>
      <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
        <Icon icon="solar:shapes-bold-duotone" width={20} />
        <Typography variant="subtitle2" color="text.secondary">
          Border Radius
        </Typography>
      </Stack>
      <Box px={0.5}>
        <Slider
          aria-label="Border Radius"
          value={localValue}
          onChange={handleChange}
          getAriaValueText={valueLabelFormat}
          valueLabelFormat={valueLabelFormat}
          valueLabelDisplay="auto"
          step={2}
          marks={marks}
          min={4}
          max={24}
          sx={{
            opacity: isPending ? 0.7 : 1,
            transition: 'opacity 0.2s',
            '& .MuiSlider-markLabel': {
              fontSize: '0.75rem'
            },
            '& .MuiSlider-valueLabel': {
              background: theme.palette.primary.main
            }
          }}
        />
      </Box>
    </Box>
  );
};

BorderRadiusSlider.propTypes = {
  value: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired
};

export default React.memo(BorderRadiusSlider);
